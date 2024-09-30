"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  handleIncrement: (productId: string) => void;
  handleDecrement: (productId: string) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleClearCart: () => void;
  itemExistInCart: (productId: string) => boolean;
  handleAddToCart: (
    productId: string,
    title: string,
    slug: string,
    description: string,
    price: number,
    image: string,
    availableSizes: string[],
    selectedSize: string,
    colorOptions: {
      _id: string;
      title: string;
      color: string;
    }[],
    colorTitle: string,
    color: string,
    categorySlug: string
  ) => void;
  handleColorSize: (
    action: string,
    productId: string,
    color?: { title: string; color: string },
    size?: string
  ) => void;
  favProducts: string[];
  handleAddProductToWhistlist: (productId: string) => void;
  handleRemoveProductFromWishlist: (productId: string) => void;
  productExistInWishlist: (productId: string) => boolean;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favProducts, setFavProducts] = useState<string[]>(
    session?.user?.favProducts || []
  );

  const fetchCart = useCallback(async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const res = await fetch(
          `/api/products/read/get-user-cart-items/${session.user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCart(data || []);
      } catch (error) {
        // toast({
        //   title: "Error fetching cart",
        //   description: "Please try again later.",
        //   variant: "destructive",
        // });
      }
    }
  }, [status, session?.user?.id]);

  const itemExistInCart = useCallback(
    (productId: string): boolean => {
      return cart.some((item) => item.productId === productId);
    },
    [cart]
  );

  const handleAddToCart = useCallback(
    async (
      productId: string,
      title: string,
      slug: string,
      description: string,
      price: number,
      image: string,
      availableSizes: string[],
      selectedSize: string,
      colorOptions: {
        _id: string;
        title: string;
        color: string;
      }[],
      colorTitle: string,
      color: string,
      categorySlug: string
    ) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      if (itemExistInCart(productId)) {
        return toast({
          title: "Product already in cart!",
          description: "This product is already in your cart.",
        });
      }

      const newItem: CartItem = {
        productId,
        title,
        slug,
        description,
        price,
        image,
        quantity: 1,
        availableSizes,
        selectedSize,
        colorOptions,
        selectedColor: {
          title: colorTitle,
          color,
        },
        categorySlug,
      };

      try {
        const res = await fetch("/api/products/create/create-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.id,
            newCartItem: newItem,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setCart((prevCart) => [...prevCart, newItem]);
          toast({
            imgSrc: image,
            title: data.message || "Product added to cart.",
            description: "You can view the product in your cart.",
          });
        } else {
          toast({
            title: data.error || "Failed to add product to cart.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, itemExistInCart, router, session]
  );

  const handleRemoveFromCart = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/remove",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCart((prevCart) => {
            const updatedCart = prevCart.filter(
              (item) => item.productId !== productId
            );

            const removedItem = prevCart.find(
              (item) => item.productId === productId
            );
            if (removedItem) {
              toast({
                imgSrc: removedItem.image,
                title: data.message || "Product removed successfully.",
                variant: "destructive",
              });
            } else {
              toast({
                title: data.message || "Product removed successfully.",
              });
            }
            return updatedCart;
          });
        } else {
          toast({
            title: data.error || "Failed to remove product.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, router, session]
  );
  // 
  const handleClearCart = useCallback(
    async () => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      try {
        const res = await fetch(`/api/products/delete/delete-users-all-cart-items/${session.user.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCart([]);

          // toast({
          //   title: data.message || "All items removed successfully.",
          //   variant: "destructive",
          // });
        } else {
          toast({
            title: data.error || "Failed to clear the cart.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error clearing the cart:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, router, session]
  );

// 
  const handleIncrement = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      const item = cart.find((item) => item.productId === productId);

      if (!item) return;

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/increment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
          // toast({
          //   title: data.message || "Quantity incremented successfully.",
          // });
        } else {
          toast({
            title: data.error || "Failed to increment quantity.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error incrementing quantity:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, cart, router, session]
  );

  const handleDecrement = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      const item = cart.find((item) => item.productId === productId);

      if (!item || item.quantity === 1) {
        // if (item) handleRemoveFromCart(item.productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/decrement",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          // toast({
          //   title: data.message || "Quantity decremented successfully.",
          // });
        } else {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
          toast({
            title: data.error || "Failed to decrement quantity.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error decrementing quantity:", error);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, cart, router, session]
  );

  const handleColorSize = useCallback(
    async (
      action: string,
      productId: string,
      color?: { title: string; color: string },
      size?: string
    ) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      const item = cart.find((item) => item.productId === productId);

      if (!item) {
        return;
      }

      try {
        const res = await fetch(
          `/api/products/update/update-cart-items/${action}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId,
              color,
              size,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          // toast({
          //   title: data.message || "Updated Size or Color successfully.",
          // });
          setCart((prevCart) =>
            prevCart.map((cartItem) =>
              cartItem.productId === productId
                ? {
                    ...cartItem,
                    selectedColor:
                      action === "upd-color" && color
                        ? color
                        : cartItem.selectedColor,
                    selectedSize:
                      action === "upd-size" && size
                        ? size
                        : cartItem.selectedSize,
                  }
                : cartItem
            )
          );
        } else {
          toast({
            title: data.error || "Failed to update fields.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error updating color or size:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, cart, router, session]
  );

  const handleAddProductToWhistlist = async (productId: string) => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
      return;
    }

    try {
      const res = await fetch("/api/products/create/create-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          productId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFavProducts((prevFavProducts) => [...prevFavProducts, productId]);
        toast({
          title: data.message || "Added to wishlist successfully!",
        });
      } else {
        toast({
          title: data.error || "Failed to add to wishlist.",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveProductFromWishlist = async (productId: string) => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
      return;
    }

    try {
      const res = await fetch("/api/products/delete/remove-from-wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          productId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFavProducts((prevFavProducts) =>
          prevFavProducts.filter((id) => id !== productId)
        );
        toast({
          title: data.message || "Removed from wishlist successfully!",
        });
      } else {
        toast({
          title: data.error || "Failed to remove from wishlist.",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const productExistInWishlist = useCallback(
    (productId: string): boolean => {
      return favProducts.includes(productId);
    },
    [favProducts]
  );

  useEffect(() => {
    if (status === "authenticated") fetchCart();
  }, [status, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isOpen,
        setOpen,
        handleIncrement,
        handleDecrement,
        handleAddToCart,
        itemExistInCart,
        handleRemoveFromCart,
        handleClearCart,
        handleColorSize,
        favProducts,
        handleAddProductToWhistlist,
        handleRemoveProductFromWishlist,
        productExistInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

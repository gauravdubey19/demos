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
import { CartItem, } from "@/lib/types";
import { useGlobalContext } from "./GlobalProvider";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  handleIncrement: (
    productId: string,
    quantityInStock: number,
    currentCount: number
  ) => void;
  handleDecrement: (productId: string) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleClearCart: () => void;
  itemExistInCart: (productId: string) => boolean;
  handleAddToCart: (
    images_collection: Array<{
      color: string;
      color_name: string;
      image_link: string;
      quantity: Array<{
        size: string;
        quantity: number;
      }>;
    }>,
    discount: number,
    productId: string,
    title: string,
    slug: string,
    description: string,
    price: number,
    image: string,
    // availableSizes: string[],
    selectedSize: string,
    // colorOptions: {
    //   _id: string;
    //   title: string;
    //   color: string;
    // }[],
    colorTitle: string,
    color: string,
    categorySlug: string,
    quantityInStock: number,
    quantity: number
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
  cartLoading: string | null;
  setCartLoading: React.Dispatch<React.SetStateAction<string | null>>;
  wishlisting: boolean;
  setWishlisting: React.Dispatch<React.SetStateAction<boolean>>;
  finalCouponDiscount: number;
  setfinalCouponDiscount: React.Dispatch<React.SetStateAction<number>>;
  finalCouponCode: string;
  setfinalCouponCode: React.Dispatch<React.SetStateAction<string>>;
  finalTotalAmount: number;
  setFinalTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  resetQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { userData } = useGlobalContext();
  // console.log(userData);
  const [finalTotalAmount, setFinalTotalAmount] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favProducts, setFavProducts] = useState<string[]>(
    userData?.favProducts || []
  );
  const [finalCouponDiscount, setfinalCouponDiscount] = useState<number>(0);
  const [finalCouponCode, setfinalCouponCode] = useState<string>("");
  useEffect(() => {
    if (userData?.favProducts) setFavProducts(userData.favProducts);
    else setFavProducts([]);
  }, [userData?.favProducts]);

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
      return cart.some((item) => item.productId._id === productId);
    },
    [cart]
  );

  const handleAddToCart = useCallback(
    async (
      images_collection: Array<{
        color: string;
        color_name: string;
        image_link: string;
        quantity: Array<{
          size: string;
          quantity: number;
        }>;
      }>,
      discount: number,
      productId: string,
      title: string,
      slug: string,
      description: string,
      price: number,
      image: string,
      // availableSizes: string[],
      selectedSize: string,
      // colorOptions: {
      //   _id: string;
      //   title: string;
      //   color: string;
      // }[],
      colorTitle: string,
      color: string,
      categorySlug: string,
      quantityInStock: number,
      quantity: number
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
        discount,
        productId:{
          _id: productId,
          images_collection,
        },
        title,
        slug,
        description,
        price,
        image,
        quantity: quantity || 1,
        selectedSize,
        selectedColor: {
          title: colorTitle,
          color,
        },
        categorySlug,
      };
      console.log("New Item added to cart: ", newItem);
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
            method: "PUT",
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
              (item) => item.productId._id !== productId
            );

            const removedItem = prevCart.find(
              (item) => item.productId._id === productId
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

  const handleClearCart = useCallback(async () => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
      return;
    }

    try {
      const res = await fetch(
        `/api/products/delete/delete-users-all-cart-items/${session.user.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
  }, [status, router, session]);

  const [cartLoading, setCartLoading] = useState<string | null>(null);
  const [wishlisting, setWishlisting] = useState(false);

  const handleIncrement = useCallback(
    async (
      productId: string,
      quantityInStock: number,
      currentCount: number
    ) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      console.log(
        "Quantity In stock and currentCount",
        quantityInStock,
        currentCount
      );
      if (quantityInStock <= currentCount) {
        return toast({
          title: "Product out of stock!",
          description: "Uh oh! Can't add more than available stock.",
          variant: "destructive",
        });
      }

      const item = cart.find((item) => item.productId._id === productId);

      if (!item) return;

      // Set loading state to disable the button
      setCartLoading(productId);

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/increment",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId._id,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productId._id === productId
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
      } finally {
        // Reset loading state
        setCartLoading(null);
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

      const item = cart.find((item) => item.productId._id === productId);

      if (!item || item.quantity === 1) {
        // if (item) handleRemoveFromCart(item.productId);
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/decrement",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId._id,
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
              item.productId._id === productId
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
            item.productId._id === productId
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

  const resetQuantity = useCallback(
    async (productId: string) => {
      if (status !== "authenticated") {
        router.replace("/sign-in");
        return;
      }

      const item = cart.find((item) => item.productId._id === productId);

      if (!item) {
        return;
      }

      try {
        const res = await fetch(
          "/api/products/update/update-cart-items/resetQuantity",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId._id,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productId._id === productId
                ? { ...item, quantity: 1 }
                : item
            )
          );
          // toast({
          //   title: data.message || "Quantity reset successfully.",
          // });
        } else {
          toast({
            title: data.error || "Failed to reset quantity.",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error resetting quantity:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
    [status, cart, router, session] )

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

      const item = cart.find((item) => item.productId._id === productId);

      if (!item) {
        return;
      }

      try {
        const res = await fetch(
          `/api/products/update/update-cart-items/${action}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              productId: item.productId._id,
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
              cartItem.productId._id === productId
                ? {
                    ...cartItem,
                    selectedColor:
                      action === "upd-color" && color
                        ? color
                        : cartItem.selectedColor,
                    selectedSize:
                      action === "upd-color" && size
                        ? size
                        : action === "upd-size" && size
                        ? size
                        : cartItem.selectedSize,
                    quantity: 1,
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
      setWishlisting(true);
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
    } finally {
      setWishlisting(false);
    }
  };

  const handleRemoveProductFromWishlist = async (productId: string) => {
    if (status !== "authenticated") {
      router.replace("/sign-in");
      return;
    }

    try {
      setWishlisting(true);
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
    } finally {
      setWishlisting(false);
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
        cartLoading,
        setCartLoading,
        wishlisting,
        setWishlisting, 
        finalCouponDiscount, setfinalCouponCode, setfinalCouponDiscount, finalCouponCode,
        finalTotalAmount, setFinalTotalAmount,
        resetQuantity
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

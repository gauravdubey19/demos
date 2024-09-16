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
  itemExistInCart: (productId: string) => boolean;
  handleAddToCart: (
    productId: string,
    title: string,
    slug: string,
    description: string,
    price: number,
    image: string
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

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
        toast({
          title: "Error fetching cart",
          description: "Please try again later.",
          variant: "destructive",
        });
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
      image: string
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
          toast({
            title: data.message || "Quantity incremented successfully.",
          });
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
          toast({
            title: data.message || "Quantity decremented successfully.",
          });
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

  useEffect(() => {
    if (status === "authenticated") fetchCart();
  }, [status, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setOpen,
        handleIncrement,
        handleDecrement,
        handleAddToCart,
        itemExistInCart,
        handleRemoveFromCart,
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

import { IoCart } from "react-icons/io5";
import ReactCountUp from "../ui/ReactCountUp";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";

const Cart = () => {
  const { cart, isOpen, setOpen } = useCart();
  const handleCartClick = () => setOpen(!isOpen);

  // calculating the total price and total quantity of the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalProducts = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div
            onClick={handleCartClick}
            className="relative w-12 h-12 md:w-10 md:h-10 rounded-full border border-[#D3D3D3] flex-center group cursor-pointer"
          >
            <ReactCountUp
              className="absolute -top-2 -right-2 md:-top-1.5 md:-right-1.5 w-1.5 h-1.5 text-primary rounded-full text-md md:text-sm"
              amt={cart?.length}
            />
            <IoCart
              size={25}
              className="fill-primary lg:fill-[#717171] group-hover:fill-primary ease-in-out duration-300"
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="top-[3.7rem] text-white backdrop-blur-sm bg-white/20 z-50 border-none outline-none p-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          closeIcon={true}
        >
          <div className="relative w-full h-full">
            <div
              id="checkout-panel"
              className="absolute bottom-[3.7rem] left-0 right-0 h-fit w-full rounded-t-2xl z-50 bg-white/10 space-y-1 p-2"
            >
              <p>Total</p>
              <div className="w-full mb-2 px-1 flex-between text-white select-none">
                <span>
                  Products:{" "}
                  <ReactCountUp amt={totalProducts} className="text-primary" />
                </span>
                <span>
                  <ReactCountUp
                    prefix="₹"
                    amt={totalPrice}
                    decimals={true}
                    // className="text-primary"
                  />
                </span>
              </div>
              <Button
                size="sm"
                className="w-full select-none text-lg rounded-none hover:shadow-md active:translate-y-0.5 ease-in-out duration-300"
              >
                Checkout
              </Button>
            </div>
            <div className="p-2">
              <SheetTitle className="text-white p-2">Cart Items</SheetTitle>
              <CartItems />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const CartItems = () => {
  const { cart, handleIncrement, handleDecrement, handleRemoveFromCart } =
    useCart();

  return (
    <div className="relative mt-2 w-full h-[68vh] text-white overflow-hidden">
      <div className="w-full h-full space-y-4 overflow-y-scroll overflow-x-hidden">
        {cart.map((item) => (
          <div
            key={item.slug}
            className="relative w-full h-20 group flex gap-2 bg-white/20 rounded-md p-1 shadow-md hover:shadow-lg scale-95 hover:scale-100 ease-in-out duration-300"
          >
            <div
              onClick={() => handleRemoveFromCart(item.productId)}
              className={`absolute right-2 top-0 z-10 cursor-pointer opacity-0 group-hover:opacity-100 ${
                item.quantity !== 1
                  ? "text-zinc-300 hover:text-primary"
                  : "text-primary"
              }`}
            >
              x
            </div>

            <div className="img w-[20%] h-full flex-center select-none">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="details relative w-[80%] h-full">
              <h3 className="w-[95%] text-md line-clamp-1">{item.title}</h3>
              <p className="text-xs text-zinc-200 line-clamp-1 select-none">
                {item.description}
              </p>

              <div className="absolute bottom-0 right-0 w-full h-fit flex-between gap-2 p-1">
                <ReactCountUp
                  className="text-primary"
                  prefix="₹"
                  amt={item.price * item.quantity}
                  decimals={true}
                />
                <div className="flex-center gap-2 select-none">
                  <AiOutlineMinus
                    onClick={() => handleDecrement(item.productId)}
                    className={
                      item.quantity !== 1
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }
                  />
                  <span className="text-sm text-primary select-none">
                    {item.quantity}
                  </span>
                  <AiOutlinePlus
                    onClick={() => handleIncrement(item.productId)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

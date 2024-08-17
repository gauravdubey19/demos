import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoMdStar } from "react-icons/io";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ProductDetail = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <ImageGallery />
      <Details />
    </div>
  );
};

export default ProductDetail;

const ImageGallery = () => {
  return (
    // lg:sticky top-20
    <div className="grid md:grid-cols-[100px_1fr] gap-4 items-start">
      {/* Thumbnail Images */}
      <div className="hidden md:flex flex-col gap-3">
        {["1", "2", "3"].map((num) => (
          <button
            key={num}
            className="border hover:border-primary rounded-lg overflow-hidden transition-colors"
            aria-label={`View Image ${num}`}
          >
            <Image
              src={`/assets/card.jpeg`}
              alt={`Preview thumbnail ${num}`}
              width={100}
              height={120}
              className="aspect-[5/6] object-cover"
            />
            <span className="sr-only">View Image {num}</span>
          </button>
        ))}
      </div>

      {/* Main Product Image */}
      <div className="relative w-full">
        <Image
          src="/assets/card.jpeg"
          alt="Product Image"
          layout="responsive"
          width={500}
          height={600}
          className="aspect-[5/6] object-cover border rounded-lg overflow-hidden"
        />
      </div>

      {/* Thumbnail Navigation for Smaller Screens */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-2">
        {["1", "2", "3"].map((num) => (
          <button
            key={num}
            className="border hover:border-primary rounded-lg overflow-hidden transition-colors"
            aria-label={`View Image ${num}`}
          >
            <Image
              src={`/assets/card.jpeg`}
              alt={`Preview thumbnail ${num}`}
              width={100}
              height={120}
              className="aspect-[5/6] object-cover"
            />
            <span className="sr-only">View Image {num}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold">Bold Red Shirt</h1>
          <p className="text-muted-foreground mt-2">
            This bold red shirt is made from high-quality cotton and features a
            classic button-down design with a modern twist.
          </p>
        </div>

        <div className="flex-between">
          {/* Pricing and Discount */}
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">$49.99</span>
            <span className="text-sm text-green-500 font-medium">20% off</span>
          </div>
          {/* Ratings and Reviews */}
          <div className="flex-center flex-col md:flex-row gap-1 md:gap-4">
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <IoMdStar key={index} color="yellow" size={15} />
                ))}
            </div>
            <Link href="#" className="text-primary" prefetch={false}>
              42 reviews
            </Link>
          </div>
        </div>

        {/* Size Selection and Buttons */}
        <div className="grid gap-4">
          {/* Size Selection */}
          <div className="grid gap-2">
            <label htmlFor="size" className="text-base font-medium">
              Size
            </label>
            <Select defaultValue="m">
              <SelectTrigger className="w-full bg-transparent border border-primary text-primary rounded-none">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Small</SelectItem>
                <SelectItem value="m">Medium</SelectItem>
                <SelectItem value="l">Large</SelectItem>
                <SelectItem value="xl">X-Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-2">
            <Button
              size="lg"
              className="w-full flex gap-1 bg-transparent text-lg text-primary border border-primary rounded-none"
            >
              Add to cart<span className="text-2xl">{"+"}</span>
            </Button>
            <Button size="lg" className="w-full text-lg rounded-none">
              Buy now
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-sm text-muted-foreground">
          Free returns within 30 days.
        </div>
      </div>
    </>
  );
};

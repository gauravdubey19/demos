"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import ReactCountUp from "@/components/ui/ReactCountUp";
import { reverseSlug } from "@/lib/utils";

interface Product {
  title: string;
  description: string;
  price: number;
  material: string;
  fabric_type: string;
  care_instructions: string;
  origin: string;
  brand: string;
  categories: [{ title: string; slug: string }];
  type: string[];
  faqs: [{ question: string; answer: string }];
  sale_price: number;
  sale_price_effective_date: string;
  pattern: string;
  availability: string;
  availability_date: string;
  sell_on_google_quantity: number;
  product_highlights: string[];
  images_collection: [
    {
      image_link: string;
      color: string;
      color_name: string;
      images: string[];
      quantity: [{ size: string; quantity: number }];
    }
  ];
}

const AddProductsInBulk = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);

  // Sort products
  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const handleSort = (key: keyof Product) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast({
        title: "Please upload a valid CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      Papa.parse(file, {
        complete: (results) => {
          //   console.log("CSV Parsing Results:", results);

          if (results.errors.length > 0) {
            toast({
              title: "Error parsing CSV file",
              variant: "destructive",
            });
            console.error(results.errors);
            return;
          }

          const csvData = results.data as any[];
          const headers = Object.keys(csvData[0]); // extracting headers from the first row
          //   console.log("Parsed Headers:", headers);

          // Validate required headers
          const requiredHeaders = ["title", "price", "material"];
          const missingHeaders = requiredHeaders.filter(
            (header) => !headers.includes(header)
          );

          if (missingHeaders.length > 0) {
            toast({
              title: `Missing required columns: ${missingHeaders.join(", ")}`,
              variant: "destructive",
            });
            return;
          }

          const parsedProducts = csvData.map((row) => {
            const product: any = {
              title: row["title"] || "",
              description: row["description"] || "",
              price: Number(row["price"]) || 0,
              material: row["material"] || "",
              fabric_type: row["fabric_type"] || "",
              care_instructions: row["care_instructions"] || "",
              origin: row["origin"] || "India",
              brand: row["brand"] || "Chimanlal Suresh Kumar (CSK) Textiles",
              categories: parseCategories(row["categories"]),
              type: parseArray(row["type"]),
              faqs: parseFaqs(row["faqs"]),
              sale_price: Number(row["sale_price"]) || 0,
              sale_price_effective_date: row["sale_price_effective_date"] || "",
              pattern: row["pattern"] || "",
              availability: row["availability"] || "in_stock",
              availability_date: row["availability_date"] || "",
              sell_on_google_quantity:
                Number(row["sell_on_google_quantity"]) || 0,
              product_highlights: parseArray(row["product_highlights"]),
              images_collection: parseImagesCollection(
                row["images_collection"]
              ),
            };
            return product;
          });
          console.log(parsedProducts);
          setProducts(parsedProducts);
        },
        error: (error) => {
          toast({
            title: "Something went wrong, please reupload the file",
            variant: "destructive",
          });
          console.log(error.message);
        },
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // automatically convert numbers
      });
    } catch (err) {
      toast({
        title: "Failed to process file",
        variant: "destructive",
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // helper functions to parse complex fields
  const parseArray = (str: string): string[] => {
    try {
      return JSON.parse(str || "[]");
    } catch {
      return [""];
    }
  };

  const parseCategories = (str: string): { title: string; slug: string }[] => {
    try {
      return JSON.parse(str || '[{"title":"","slug":""}]');
    } catch {
      return [{ title: "", slug: "" }];
    }
  };

  const parseFaqs = (str: string): { question: string; answer: string }[] => {
    try {
      return JSON.parse(str || '[{"question":"","answer":""}]');
    } catch {
      return [{ question: "", answer: "" }];
    }
  };

  const parseImagesCollection = (str: string) => {
    try {
      const parsed = JSON.parse(
        str ||
          '[{"image_link":"","color":"","color_name":"","images":[""],"quantity":[{"size":"","quantity":0}]}]'
      );

      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          image_link: item.image_link || "",
          color: item.color || "",
          color_name: item.color_name || "",
          images: Array.isArray(item.images) ? item.images : [""],
          quantity: Array.isArray(item.quantity)
            ? item.quantity.map((q: { size: string; quantity: number }) => ({
                size: q.size || "",
                quantity: q.quantity || 0,
              }))
            : [{ size: "", quantity: 0 }],
        }));
      }
    } catch (error) {
      console.error("Error parsing images collection:", error);
    }

    return [
      {
        image_link: "",
        color: "",
        color_name: "",
        images: [""],
        quantity: [{ size: "", quantity: 0 }],
      },
    ];
  };
  const handleSave = async () => {
    setLoading(true);
    console.log(products);
    try {
      const res = await fetch("/api/products/create/create-multiple-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });

      const data = await res.json();
      toast({
        title: data.message || data.error,
        description: data.message || "Products created successfully!",
        variant: data.error ? "destructive" : "default",
      });
      if (res.ok) {
        setSuccess(true);
        router.push("/admin/all-products");
      }
    } catch (error) {
      console.error("Error sending Products:", error);
      toast({
        title: "Error sending Products",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="w-full h-full select-none overflow-hidden">
        <header className="w-full h-fit flex flex-col gap-4 p-4 md:py-6">
          <div className="flex justify-between items-center">
            <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight animate-slide-down">
              Add New Products in Bulk
            </h2>
            <div className="flex items-center gap-2 animate-slide-down">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffb433d3] file:text-white hover:file:bg-[#ffb433]"
              />
            </div>
          </div>

          {products.length > 0 && (
            <div className="w-full h-fit flex lg:items-center justify-between flex-col lg:flex-row animate-slide-up gap-2">
              <h2 className="capitalize text-md md:text-lg lg:text-xl">
                Total Products: <ReactCountUp amt={products.length} />
              </h2>
              <div className="w-fit h-fit flex justify-end flex-col lg:flex-row gap-2 md:gap-4">
                <Button
                  variant="destructive"
                  onClick={() => router.push("/admin/all-products")}
                  className=""
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading || success}
                  className="text-white"
                >
                  {loading ? "Saving..." : success ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          )}
        </header>

        <div
          id="product-records-table"
          className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-scroll overflow-x-hidden"
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center animate-slide-down">
              <div className="animate-pulse text-center">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-500">Processing CSV file...</p>
              </div>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg animate-accordion-down">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    {[
                      "Title",
                      "Price",
                      "Material",
                      "Fabric Type",
                      "Categories",
                      "Type",
                      "Pattern",
                      "Availability",
                      "Quantity",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 cursor-pointer bg-[#EAEAEA] shadow-sm hover:bg-[#ffb4334e] ease-in-out duration-300"
                        onClick={() =>
                          handleSort(header.toLowerCase() as keyof Product)
                        }
                      >
                        <div className="flex-between gap-2">
                          {header}
                          {sortConfig?.key === header.toLowerCase() && (
                            <span className="text-lg">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {product.title}
                      </td>
                      <td className="px-6 py-4">₹{product.price}</td>
                      <td className="px-6 py-4">{product.material}</td>
                      <td className="px-6 py-4">{product.fabric_type}</td>
                      <td className="px-6 py-4">
                        {product.categories.map((cat) => cat.title).join(", ")}
                      </td>
                      <td className="px-6 py-4">{product.type.join(", ")}</td>
                      <td className="px-6 py-4">{product.pattern}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.availability === "in_stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reverseSlug(product.availability)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.images_collection.reduce(
                          (total, img) =>
                            total +
                            img.quantity.reduce(
                              (sum, q) => sum + q.quantity,
                              0
                            ),
                          0
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-4">
              <div className="text-center">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-sm text-gray-400 mt-2">
                  {products.length === 0
                    ? "Upload a CSV file to see products here"
                    : "Try adjusting your search criteria"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AddProductsInBulk;

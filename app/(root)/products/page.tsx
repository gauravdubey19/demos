import { redirect } from "next/navigation";
import React from "react";

export default function ProductsPage() {
  redirect("/products/all");
  return <div>ProductsPage</div>;
}

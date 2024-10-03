"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeFile, uploadNewFile } from "@/utils/actions/fileUpload.action";
import { capitalizeString, generateSlug } from "@/lib/utils";
import { CategoryCollectionValues, CategoryReq, Type } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoSearchOutline } from "react-icons/io5";
import { BsPlus, BsTrash } from "react-icons/bs";

const AddCategory: React.FC = () => {
  const router = useRouter();
  const [categoryImage, setCategoryImage] = useState<string>("");
  const [loadingImageUpload, setLoadingImageUpload] = useState<boolean>(false);
  const [loadingSaving, setLoadingSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [category, setCategory] = useState<CategoryCollectionValues>({
    _id: "",
    createdAt: "",
    title: "",
    slug: "",
    description: "",
    image: "",
    types: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => {
      const updatedCategory = {
        ...prevCategory,
        [name]: value,
      };

      if (name === "title") {
        updatedCategory.title = capitalizeString(value);
        updatedCategory.slug = generateSlug(value);
      }
      return updatedCategory;
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryImageFile = e.target.files?.[0];
    if (!categoryImageFile) return;

    setLoadingImageUpload(true);

    if (categoryImage) {
      const rmImage = await removeFile(categoryImage);
      if (!rmImage) {
        toast({
          title: "Failed to remove old category image.",
          description: "Please try again later...",
          variant: "destructive",
        });
        setLoadingImageUpload(false);
        return;
      }
    }

    const categoryImageFileFormData = new FormData();
    categoryImageFileFormData.append("file", categoryImageFile);
    const categoryImageUrl = (await uploadNewFile(
      categoryImageFileFormData
    )) as string;

    if (!categoryImageUrl) {
      toast({
        title: "Category image upload failed.",
        description: "Please try again later...",
        variant: "destructive",
      });
      setLoadingImageUpload(false);
      return;
    }

    setCategoryImage(categoryImageUrl);
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: categoryImageUrl,
    }));
    setLoadingImageUpload(false);
  };

  const handleAddTypes = (newTypes: Type[]) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      types: [...prevCategory.types, ...newTypes],
    }));
  };

  const handleRemoveType = (slug: string) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      types: prevCategory.types.filter((type) => type.slug !== slug),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, slug, description, image, types } = category;
    const hasTypes = types.some((type) => type.title.trim() !== "");

    if (!title || !slug || !description || !categoryImage || !image || !hasTypes) {
      toast({
        title: "Missing Fields",
        description:
          "Please fill in all required fields, including at least one type.",
        variant: "destructive",
      });
      return;
    }

    setLoadingSaving(true);

    try {
      const category: CategoryReq = {
        image,
        title,
        slug,
        description,
        types,
      };

      console.log(category);

      const res = await fetch("/api/products/create/create-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      const data = await res.json();

      toast({
        title: data.message || data.error,
        description: data.message
          ? "Now you can view the Category."
          : "Please try again later...",
        variant: data.error ? "destructive" : undefined,
      });

      if (data.message) {
        setLoadingSaving(false);
        setSuccess(true);
        router.push("/admin/all-categories");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoadingSaving(false);
    }
  };

  return (
    <section className="w-full h-full overflow-hidden">
      <header className="w-full h-fit flex justify-between p-4 md:py-6">
        <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          Add New Category
        </h2>
        <div className="w-fit flex-center gap-2 md:gap-4">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-red-500 text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loadingSaving || success}
            onClick={handleSubmit}
            className="text-white"
          >
            {/* {!loadingSaving ? "Save" : "Saving..."} */}
            {loadingSaving ? "Saving..." : success ? "Saved" : "Save"}
          </Button>
        </div>
      </header>
      <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
        <div className="w-full h-[55vh] border-2 border-gray-200 space-y-2 rounded-xl px-4 py-2 overflow-hidden">
          <h3 className="w-full h-fit capitalize text-lg md:text-xl lg:text-2xl font-semibold">
            Category Details
          </h3>
          <div className="w-full h-[44vh] flex gap-2">
            <div className="w-[30%] h-full p-2 space-y-2">
              <h4 className="w-full h-fit capitalize text-md md:text-lg lg:text-xl font-medium">
                Category Image
              </h4>
              <div className="relative w-full h-[37vh] bg-[#EAEAEA] border-2 border-gray-200 rounded-2xl flex-center group overflow-hidden">
                {loadingImageUpload ? (
                  <div className="absolute inset-0 z-20 bg-gray-300 flex-center animate-pulse cursor-not-allowed">
                    Uploading Image...
                  </div>
                ) : category.image ? (
                  <Image
                    src={category.image}
                    alt="Category Image"
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full rounded-2xl cursor-pointer overflow-hidden"
                  />
                ) : (
                  <div className="w-full h-full flex-center text-gray-500 cursor-pointer">
                    Chooes Image
                  </div>
                )}
                {!loadingImageUpload && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 z-30 opacity-0 cursor-pointer"
                  />
                )}
                <div className="absolute inset-0 z-10 group-hover:bg-black/10 ease-in-out duration-300" />
                {category.image && !loadingImageUpload && (
                  <>
                    <div className="absolute inset-0 z-20 hidden group-hover:flex-center text-primary">
                      Change Image
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="w-[70%] h-full p-2 space-y-3">
              <div className="space-y-1">
                <label className="w-full h-fit capitalize text-md md:text-lg lg:text-xl font-medium">
                  Category Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={category.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  className="w-full bg-[#EAEAEA] border-2 border-gray-200 p-2 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="w-full h-fit capitalize text-md md:text-lg lg:text-xl font-medium">
                  Category Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  disabled
                  value={category.slug}
                  onChange={handleInputChange}
                  placeholder="Enter slug"
                  className="w-full bg-[#EAEAEA] border-2 border-gray-200 p-2 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="w-full h-fit capitalize text-md md:text-lg lg:text-xl font-medium">
                  Category Description
                </label>
                <textarea
                  name="description"
                  value={category.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full bg-[#EAEAEA] border-2 border-gray-200 p-2 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <CategoryTypesTable
          types={category.types}
          onAddTypes={handleAddTypes}
          onRemoveType={handleRemoveType}
        />
      </div>
    </section>
  );
};

export default AddCategory;

interface CategoryTypesTableProps {
  types: Type[];
  onAddTypes: (newType: Type[]) => void;
  onRemoveType: (slug: string) => void;
}

export const CategoryTypesTable: React.FC<CategoryTypesTableProps> = ({
  types,
  onAddTypes,
  onRemoveType,
}) => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const filteredTypes = types.filter((type) =>
    type.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full space-y-2 rounded-xl border-2 border-gray-200 p-4 select-none">
        <div className="w-full h-fit flex-between">
          <div className="w-fit capitalize text-md md:text-lg lg:text-xl font-medium">
            Category Types
          </div>
          <div className="w-fit h-fit flex-between gap-2">
            <div className="w-fit flex-center gap-1 cursor-pointer bg-white border border-primary py-1 px-2">
              <IoSearchOutline size={20} className="text-primary" />
              <input
                type="text"
                placeholder="Search by Type title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="placeholder:text-primary bg-none border-none outline-none"
              />
            </div>
            <Button
              onClick={() => setIsAddOpen(true)}
              className="h-fit text-white rounded-none"
            >
              <BsPlus size={20} className="mr-1" />
              Add Type
            </Button>
          </div>
        </div>

        <div className="relative w-full h-fit max-h-[72vh] border border-gray-200 rounded-2xl overflow-auto">
          <table className="w-full bg-white rounded-2xl">
            <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
              <tr className="border-b">
                <th className="w-fit text-center px-4 py-2">Serial No.</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Slug</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            {filteredTypes.length === 0 ? (
              <tbody className="relative w-full h-10">
                <div className="absolute inset-0 flex-center text-lg md:text-lg lg:text-xl font-semibold">
                  No Types in this category created
                </div>
              </tbody>
            ) : (
              <tbody>
                {filteredTypes.map((type, index) => (
                  <tr
                    key={index}
                    className="h-fit group border-b hover:bg-[#ffb43335] ease-in-out duration-300"
                  >
                    <td className="w-fit px-4 py-2 text-primary text-center font-bold">
                      {index + 1}.
                    </td>
                    <td className="px-4 py-2">{type.title}</td>
                    <td className="px-4 py-2">{type.slug}</td>
                    <td className="w-fit h-full px-4 py-2 flex-center gap-2 mt-2">
                      <button
                        onClick={() => onRemoveType(type.slug)}
                        className="p-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
                      >
                        <BsTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {isAddOpen && (
        <PopUpAddType
          isAddOpen={isAddOpen}
          handleAddClose={() => setIsAddOpen(false)}
          onAddTypes={onAddTypes}
        />
      )}
    </>
  );
};

export const PopUpAddType: React.FC<{
  isAddOpen: boolean;
  handleAddClose: () => void;
  onAddTypes: (newType: Type[]) => void;
}> = ({ isAddOpen, handleAddClose, onAddTypes }) => {
  const [newType, setNewType] = useState<string>("");
  const [typeList, setTypeList] = useState<Type[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddType = () => {
    if (newType.trim() !== "") {
      const newEntry: Type = {
        title: capitalizeString(newType),
        slug: generateSlug(newType),
      };
      setTypeList((prevTypes) => [...prevTypes, newEntry]);
      setNewType("");
    }
  };

  const handleRemoveType = (slug: string) => {
    setTypeList((prevTypes) => prevTypes.filter((type) => type.slug !== slug));
  };

  const handleSaveTypes = async () => {
    setLoading(true);
    await onAddTypes(typeList);
    setLoading(false);
    handleAddClose();
    setTypeList([]);
  };

  return (
    <Dialog open={isAddOpen} onOpenChange={handleAddClose}>
      <DialogContent className="w-full h-fit max-h-[85%] flex-center flex-col gap-8">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          Add New Types
        </DialogTitle>

        <div className="w-full h-fit max-h-[50%] flex flex-col gap-4 overflow-x-hidden overflow-y-scroll">
          {typeList
            .slice()
            .reverse()
            .map((type, index) => (
              <div
                key={index}
                className="w-full flex-between border border-[#EAEAEA] px-4 py-2"
              >
                <p>{type.title}</p>
                <button
                  onClick={() => handleRemoveType(type.slug)}
                  className="text-red-600 hover:text-red-800"
                >
                  &#10006;
                </button>
              </div>
            ))}
        </div>

        <div className="w-full flex flex-col gap-2">
          <input
            placeholder="Enter new type name"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
          />
          <Button
            onClick={handleAddType}
            className="w-full bg-yellow-400 text-white rounded-none"
          >
            + Add New Types
          </Button>
        </div>

        <div className="w-full flex-between gap-4 mt-4">
          <Button
            onClick={handleAddClose}
            className="w-full h-full bg-transparent border border-primary text-primary rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveTypes}
            disabled={typeList.length === 0 || loading}
            className="w-full h-full text-white rounded-none bg-primary"
          >
            {!loading ? `Save Types (${typeList.length})` : "Saving..."}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

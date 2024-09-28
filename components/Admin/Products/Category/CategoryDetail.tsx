"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  capitalizeString,
  formatTimestamp,
  generateSlug,
  reverseSlug,
} from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { DetailRow } from "../../Customers/CustomersDetail";
import { CategoryCollectionValues } from "@/lib/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { BsPencilSquare, BsPlus, BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";

const CategoryDetail: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const [category, setCategory] = useState<CategoryCollectionValues | null>(
    null
  );
  const [isCategoryEditOpen, setIsCategoryEditOpen] = useState<boolean>(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `/api/products/read/admin/category-detail/${categoryId}`
        );
        const data = await res.json();
        // console.log(data);

        setCategory(data as CategoryCollectionValues);
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    if (!category) fetchCategory();
  }, [category, categoryId]);

  if (!category) return <Loader />;

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <header className="w-full h-fit flex justify-between p-4 md:py-6">
          <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Category Details
          </h2>
          <div className="w-fit flex-center gap-2 md:gap-4">
            <Button
              onClick={() => setIsCategoryEditOpen(true)}
              className="bg-transparent border border-primary text-primary"
            >
              Edit
              <BsPencilSquare className="ml-1" />
            </Button>
            <Button
              onClick={() => setIsDeleteCategoryOpen(true)}
              className="bg-red-500 text-white"
            >
              Delete
              <RiDeleteBinLine className="ml-1" />
            </Button>
          </div>
        </header>
        <div className="w-full h-[calc(100vh-90px)] space-y-2 p-4 overflow-y-auto">
          <CategoryInfo category={category} />
          <CategoryTypesTable categoryId={categoryId} types={category.types} />
        </div>
      </section>
      {isCategoryEditOpen && category && (
        <PopUpEditCategory
          category={category}
          isCategoryEditOpen={isCategoryEditOpen}
          handleCategoryEditClose={() => setIsCategoryEditOpen(false)}
          setCategory={setCategory}
        />
      )}
      {isDeleteCategoryOpen && category && (
        <DeletePopUp
          action="delete-category"
          id={categoryId}
          title={category.title}
          isDeleteOpen={isDeleteCategoryOpen}
          handleDeleteClose={() => setIsDeleteCategoryOpen(false)}
        />
      )}
    </>
  );
};

export const PopUpEditCategory: React.FC<{
  category: CategoryCollectionValues;
  isCategoryEditOpen: boolean;
  handleCategoryEditClose: () => void;
  setCategory: React.Dispatch<
    React.SetStateAction<CategoryCollectionValues | null>
  >;
}> = ({
  category,
  isCategoryEditOpen,
  handleCategoryEditClose,
  setCategory,
}) => {
  const [title, setTitle] = useState<string>(category.title);
  const [slug, setSlug] = useState<string>(category.slug);
  const [description, setDescription] = useState<string>(category.description);
  const [image, setImage] = useState<string>(category.image);
  const [loading, setLoading] = useState<boolean>(false);
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);

  const isChanged =
    title !== category.title ||
    slug !== category.slug ||
    description !== category.description ||
    image !== category.image ||
    isImageRemoved;

  const handleUpdateCategory = async () => {
    setLoading(true);
    const updatedCategory = {
      title,
      slug,
      description,
      image,
    };

    try {
      const res = await fetch("/api/products/update/admin/update-category", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: category._id, updatedCategory }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the category with the new data
        setCategory((prevCategory) => {
          if (!prevCategory) return null;

          return {
            ...prevCategory,
            ...updatedCategory, // Merge the updated fields
          };
        });

        toast({
          title: data.message || "Category updated successfully!",
          description: "Now you can view the updated category.",
          variant: "default",
        });

        handleCategoryEditClose();
      } else {
        toast({
          title:
            data.error || "Something went wrong while updating the category",
          description: "Please try again later...",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description:
          "Failed to update the category. Please check your connection and try again.",
        variant: "destructive",
      });
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsImageRemoved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage("");
    setIsImageRemoved(true);
  };

  return (
    <Dialog open={isCategoryEditOpen} onOpenChange={handleCategoryEditClose}>
      <DialogContent className="w-full h-fit max-h-[85%] flex-center flex-col gap-8 overflow-hidden">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          Edit Category - <span className="text-primary">{title}</span>
        </DialogTitle>

        <div className="w-full h-fit max-h-[60%] flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
          {!isImageRemoved && image && (
            <div className="flex flex-col items-center">
              <Image
                src={image}
                alt="Category"
                width={400}
                height={400}
                className="w-full h-full max-h-40 object-contain mb-2"
              />
              <Button
                size="sm"
                onClick={removeImage}
                className="bg-red-500 text-white"
              >
                Remove Image
              </Button>
            </div>
          )}

          {isImageRemoved && (
            <>
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
              />
            </>
          )}

          <input
            // value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Category Title - ${title}`}
            className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
          />
          <input
            // value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={`Category Slug - ${slug}`}
            className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
          />
          <textarea
            // value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Category Description - ${description}`}
            rows={3}
            className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
          />
        </div>

        <div className="w-full flex-between gap-4 mt-4">
          <Button
            onClick={handleCategoryEditClose}
            className="w-full h-full bg-transparent border border-primary text-primary rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCategory}
            disabled={loading || !isChanged}
            className="w-full h-full bg-yellow-400 text-white rounded-none"
          >
            {!loading ? "Save" : "Saving..."}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CategoryInfo: React.FC<{ category: CategoryCollectionValues }> = ({
  category,
}) => {
  return (
    <div className="w-full h-[55vh] flex gap-2 bg-gray-100 rounded-xl p-4">
      <div className="pfp w-[30%] h-full flex-center border-r">
        <Image
          src={category?.image ?? "/logo.png"}
          alt="Profile Picture"
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-[70%] h-full overflow-hidden">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold">
          {category.title}
        </h2>
        <h4 className="text-xs md:text-sm lg:text-md">
          {category.description}
        </h4>
        <div className="w-full h-full max-h-[44vh] px-2 md:px-4 space-y-4 mt-4 overflow-x-hidden overflow-y-scroll">
          <DetailRow label="Slug" value={category.slug} />
          <DetailRow
            label="Total numbers of types"
            value={category.types.length}
          />
          <DetailRow
            label="Created at"
            value={formatTimestamp(category.createdAt)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;

interface Type {
  title: string;
  slug: string;
}

interface CategoryTypesTableProps {
  noData?: boolean;
  categoryId: string;
  types: {
    title: string;
    slug: string;
  }[];
}

export const CategoryTypesTable: React.FC<CategoryTypesTableProps> = ({
  categoryId,
  types,
  noData = false,
}) => {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [typesArray, setTypesArray] = useState<Type[]>(types);
  const [selectedCategoryTypeSlug, setSelectedCategoryTypeSlug] =
    useState<string>("");
  const [selectedType, setSelectedType] = useState<Type | null>(null);

  const filteredTypes = typesArray.filter((type) =>
    type.title.toLowerCase().includes(search.toLowerCase())
  );

  const updateTypesArray = (
    typeList?: Type[],
    typeSlug?: string,
    updateType?: Type
  ) => {
    if (typeList && typeList.length > 0) {
      return setTypesArray((prevTypes) => {
        const newTypes = typeList.filter(
          (newType) =>
            !prevTypes.some(
              (existingType) => existingType.slug === newType.slug
            )
        );
        return [...prevTypes, ...newTypes];
      });
    }
    if (updateType && typeSlug) {
      return setTypesArray((prevTypes) =>
        prevTypes.map((existingType) =>
          existingType.slug === typeSlug ? updateType : existingType
        )
      );
    }

    if (typeSlug && !updateType) {
      return setTypesArray((prevTypes) =>
        prevTypes.filter((existingType) => existingType.slug !== typeSlug)
      );
    }
  };

  const handlePopupDeleteClick = (typeSlug: string) => {
    setSelectedCategoryTypeSlug(typeSlug);
    setIsDeleteOpen(true);
  };

  const handlePopupDeleteClose = () => {
    setSelectedCategoryTypeSlug("");
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="w-full space-y-2 rounded-xl bg-[#F8F8F8] p-4 select-none">
        <div className="w-full h-fit flex-between">
          <div className="w-fit font-semibold">Category types</div>
          <div className="w-fit h-fit flex-between gap-2">
            {/* Search Bar */}
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
            {/* add type */}
            <Button
              onClick={() => setIsAddOpen(true)}
              className="h-fit text-white rounded-none"
            >
              <BsPlus size={20} className="mr-1" />
              Add Type
            </Button>
          </div>
        </div>

        <div className="relative w-full h-fit max-h-[72vh] border border-gray-300 rounded-2xl overflow-auto">
          <table className="w-full bg-white rounded-2xl">
            <thead className="sticky top-0 bg-[#EAEAEA] shadow-sm z-10">
              <tr className="border-b">
                <th className="w-fit text-center px-4 py-2">Serial No.</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Slug</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            {noData ? (
              // <></>
              <tbody className="relative w-full h-40">
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
                        onClick={() => {
                          setSelectedType(type);
                          setIsEditOpen(true);
                        }}
                        className="p-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                      >
                        <BsPencilSquare size={16} />
                      </button>
                      <button
                        onClick={() => handlePopupDeleteClick(type.slug)}
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
          categoryId={categoryId}
          isAddOpen={isAddOpen}
          handleAddClose={() => setIsAddOpen(false)}
          updateTypesArray={updateTypesArray}
        />
      )}
      {isDeleteOpen && (
        <PopUpDelete
          categoryId={categoryId}
          typeSlug={selectedCategoryTypeSlug}
          isDeleteOpen={isDeleteOpen}
          handleClose={handlePopupDeleteClose}
          updateTypesArray={updateTypesArray}
        />
      )}
      {isEditOpen && selectedType && (
        <PopUpEditType
          categoryId={categoryId}
          isEditOpen={isEditOpen}
          handleEditClose={() => setIsEditOpen(false)}
          updateTypesArray={updateTypesArray}
          selectedType={selectedType}
        />
      )}
    </>
  );
};

export const PopUpAddType: React.FC<{
  categoryId: string;
  updateTypesArray: (typesArray: Type[]) => void;
  isAddOpen: boolean;
  handleAddClose: () => void;
}> = ({ categoryId, updateTypesArray, isAddOpen, handleAddClose }) => {
  const [newType, setNewType] = useState<string>("");
  const [typeList, setTypeList] = useState<Type[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddType = () => {
    if (newType.trim() !== "") {
      const newEntry = {
        title: capitalizeString(newType),
        slug: generateSlug(newType),
      };
      setTypeList((prevTypes) => [...prevTypes, newEntry]);
      setNewType("");
    }
  };

  const AddNewTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "/api/products/update/admin/add-category-new-types",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: categoryId,
            types: typeList,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        updateTypesArray(typeList);

        toast({
          title: data.message || "Types added successfully!",
          description: "Now you can view the updated category.",
          variant: "default",
        });

        handleAddClose();
      } else {
        toast({
          title: data.error || "Something went wrong while adding new types",
          description: "Please try again later...",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding new types:", error);
      toast({
        title: "Error creating category",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveType = (slug: string) => {
    setTypeList((prevTypes) => prevTypes.filter((type) => type.slug !== slug));
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
            disabled={typeList.length === 0 || loading}
            onClick={AddNewTypes} // Add the onClick to trigger AddNewTypes function
            className="w-full h-full text-white rounded-none"
          >
            {!loading ? "Save Types" : "Save Types..."}{" "}
            {typeList.length !== 0 && `(${typeList.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PopUpDelete: React.FC<{
  categoryId: string;
  typeSlug: string;
  updateTypesArray: (typeList?: Type[], typeSlug?: string) => void;
  isDeleteOpen: boolean;
  handleClose: () => void;
}> = ({
  categoryId,
  typeSlug,
  updateTypesArray,
  isDeleteOpen,
  handleClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteType = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "/api/products/update/admin/delete-category-type",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: categoryId, typeSlug }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        updateTypesArray([], typeSlug);
        handleClose();
        toast({
          title: data.message || "Type deleted successfully!",
          description: "The category type has been removed.",
          variant: "default",
        });
      } else {
        toast({
          title: data.error || "Something went wrong while deleting the type",
          description: "Please try again later...",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting category type:", error);
      toast({
        title: "Error deleting category type",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-fit flex flex-col gap-8">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          Are you sure you want to delete this category type:
          <br />
          <span className="text-primary">{reverseSlug(typeSlug)}?</span>
        </DialogTitle>
        <div className="w-full flex justify-between gap-4">
          <Button
            onClick={handleClose}
            className="w-full h-full bg-transparent border border-primary text-primary rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteType}
            disabled={loading}
            className="w-full h-full bg-red-600 text-white rounded-none"
          >
            {!loading ? "Delete" : "Deleting..."} <BsTrash className="ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PopUpEditType: React.FC<{
  categoryId: string;
  updateTypesArray: (
    typeList?: Type[],
    typeSlug?: string,
    updateType?: Type
  ) => void;
  isEditOpen: boolean;
  handleEditClose: () => void;
  selectedType: Type;
}> = ({
  categoryId,
  updateTypesArray,
  isEditOpen,
  handleEditClose,
  selectedType,
}) => {
  const [newTypeTitle, setNewTypeTitle] = useState<string>(selectedType.title);
  const typeSlug = selectedType.slug;
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateType = async () => {
    if (!newTypeTitle.trim()) return;
    setLoading(true);
    const updatedType = {
      ...selectedType,
      title: capitalizeString(newTypeTitle),
      slug: generateSlug(newTypeTitle),
    };

    try {
      const res = await fetch(
        "/api/products/update/admin/update-category-type",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: categoryId,
            updatedType,
            typeSlug,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        updateTypesArray([], typeSlug, updatedType);
        toast({
          title: data.message || "Type updated successfully!",
          description: "You can now view the updated category.",
          variant: "default",
        });
        handleEditClose();
      } else {
        toast({
          title: data.error || "Something went wrong while updating the type",
          description: "Please try again later...",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating type:", error);
      toast({
        title: "Error updating type",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={handleEditClose}>
      <DialogContent className="w-full h-fit max-h-[85%] flex-center flex-col gap-8">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          Edit Type
        </DialogTitle>

        <div className="w-full flex flex-col gap-2">
          <input
            placeholder={selectedType.title}
            // value={newTypeTitle}
            onChange={(e) => setNewTypeTitle(e.target.value)}
            className="w-full bg-[#EAEAEA] outline-none px-4 py-2"
          />
        </div>

        <div className="w-full flex-between gap-4 mt-4">
          <Button
            onClick={handleEditClose}
            className="w-full h-full bg-transparent border border-primary text-primary rounded-none"
          >
            Cancel
          </Button>
          <Button
            disabled={loading || newTypeTitle === selectedType.title}
            onClick={handleUpdateType}
            className="w-full h-full bg-yellow-400 text-white rounded-none"
          >
            {!loading ? "Save" : "Saving..."}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DeletePopUp: React.FC<{
  action: string;
  id: string;
  title: string;
  isDeleteOpen: boolean;
  handleDeleteClose: () => void;
}> = ({ action, id, title, isDeleteOpen, handleDeleteClose }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/delete/admin/${action}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: data.message || "Category deleted successfully!",
          description: "The category has been removed.",
          variant: "default",
        });
        handleDeleteClose();
        router.push("/admin/all-categories");
      } else {
        toast({
          title: data.error || "Error deleting the category",
          description: "Please try again later...",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error deleting category",
        description: "Please try again later...",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDeleteOpen} onOpenChange={handleDeleteClose}>
      <DialogContent className="w-full h-fit flex flex-col gap-8">
        <DialogTitle className="text-lg md:text-xl lg:text-2xl text-center">
          Are you sure you want to delete this category:
          <br />
          <span className="text-primary">{title}?</span>
        </DialogTitle>
        <div className="w-full flex justify-between gap-4">
          <Button
            onClick={handleDeleteClose}
            className="w-full h-full bg-transparent border border-primary text-primary rounded-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCategory}
            disabled={loading}
            className="w-full h-full bg-red-600 text-white rounded-none"
          >
            {!loading ? "Delete" : "Deleting..."} <BsTrash className="ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import { FormEvent, useState } from "react";
import AddNewCategoryForm from "./add-new-category-form";
import addItemToMenu from "@/app/lib/actions/inventory/addItemToMenu";
import { toast } from "react-toastify";
import { Cafeteria } from "@/app/types/cafeteria";

const AddItemForm = ({ cafeteria }: { cafeteria: Cafeteria }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    imgUrl: "",
    description: "",
    available: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await addItemToMenu(formData);
    if (response) {
      setIsLoading(false);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          name: "",
          category: "",
          price: "",
          imgUrl: "",
          description: "",
          available: false,
        });
      } else {
        toast.error(response.message);
      }
    } else {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-4">
        <label className="mb-1" htmlFor="item-name">
          Name of food item <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
          className="w-full"
          type="text"
          name="item-name"
          id="item-name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1" htmlFor="category">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            name="category"
            value={formData.category}
            id="category"
            className="flex-1"
          >
            <option value="" disabled>
              Pick a category
            </option>
            {cafeteria.menuCategories.map((menuCategory) => (
              <option
                key={menuCategory._id.toString()}
                value={menuCategory.name}
              >
                {menuCategory.name}
              </option>
            ))}
          </select>
          <AddNewCategoryForm />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1" htmlFor="price">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          value={formData.price}
          className="w-full"
          type="text"
          name="price"
          id="price"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1" htmlFor="image-url">
          Image URL <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
          value={formData.imgUrl}
          className="w-full"
          type="text"
          name="image-url"
          id="image-url"
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-1" htmlFor="description">
          Description
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
          className="w-full"
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input
          onChange={(e) =>
            setFormData({ ...formData, available: e.target.checked })
          }
          checked={formData.available}
          type="checkbox"
          name="available"
          id="available"
          required
        />
        <label htmlFor="available">
          This item is currently available{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="btn mb-2 w-full bg-primary-one py-2 text-white"
      >
        {isLoading ? "Adding item..." : "Add +"}
      </button>
    </form>
  );
};

export default AddItemForm;

"use client";

import createCategory from "@/app/lib/actions/inventory/createCategory";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Drawer } from "vaul";

const AddNewCategoryForm = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createCategory(categoryName.toLowerCase());
    if (response) {
      setIsLoading(false);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="rounded-xl bg-primary-one/10 px-4 font-medium text-primary-three">
        New category +
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-fit flex-col rounded-t-3xl bg-gray-100 outline-none sm:mx-auto sm:w-3/4 lg:w-2/4">
          <div className="flex-1 rounded-t-3xl bg-white p-4">
            <div
              aria-hidden
              className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
            />
            <div className="p-4">
              <Drawer.Title className="mb-4 text-2xl font-semibold text-neutral-dark01">
                Create a new category
              </Drawer.Title>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="mb-1" htmlFor="categoryName">
                    Name of category
                  </label>
                  <input
                    onChange={(e) => setCategoryName(e.target.value)}
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    placeholder="e.g. Mains, Sides, Soups, etc."
                    className="w-full"
                    required
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn mb-2 w-full bg-primary-one py-2 text-white"
                >
                  {isLoading ? "Creating category..." : "Create category"}
                </button>
              </form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default AddNewCategoryForm;

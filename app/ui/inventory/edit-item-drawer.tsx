import editItem from "@/app/lib/actions/inventory/editItem";
import { DriveFileRenameOutline } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import { Drawer } from "vaul";

const EditItemDrawer = ({
  itemId,
  category,
  name,
  price,
}: {
  itemId: string;
  category: string;
  name: string;
  price: number;
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name, price });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await editItem(
      itemId,
      category,
      formData.name,
      formData.price,
    );
    if (response) {
      setIsLoading(false);
      if (response.success) {
        toast.success(response.message);
        setOpen(false);
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
      <Drawer.Trigger className="text-primary-one">
        <DriveFileRenameOutline />
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
                Edit item
              </Drawer.Title>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label className="mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={formData.name}
                    type="text"
                    name="name"
                    id="name"
                    className="w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-1" htmlFor="price">
                    Price
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    value={formData.price}
                    type="text"
                    name="price"
                    id="price"
                    className="w-full"
                    required
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn mb-2 w-full bg-primary-one py-2 text-white"
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
                <button
                  className="w-full rounded-xl bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default EditItemDrawer;

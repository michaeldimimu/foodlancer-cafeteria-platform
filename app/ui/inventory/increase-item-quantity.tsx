import increaseMenuItemQuantity from "@/app/lib/actions/inventory/increaseMenuItemQuantity";
import { MenuItem } from "@/app/types/cafeteria";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const IncreaseItemQuantity = ({
  setIsShowingIncreaseQuantityPopup,
  item,
  category,
}: {
  setIsShowingIncreaseQuantityPopup: any;
  item: MenuItem;
  category: string;
}) => {
  const initialValues = {
    quantity: "1",
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .positive()
      .integer()
      .required("Quantity is required"),
  });

  const handleSubmit = async (values: { quantity: string }) => {
    const id = toast.loading("Please wait...");
    const response = await increaseMenuItemQuantity(
      item.food._id,
      category,
      Number(values.quantity),
    );
    if (response) {
      toast.dismiss(id);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    }
  };
  return (
    <>
      <div
        onClick={() => setIsShowingIncreaseQuantityPopup(false)}
        className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-[50%]">
            <p className="mb-4 flex items-center justify-between gap-2 text-lg font-medium text-neutral-dark01">
              <span>Increase quantity</span>
              <span className="rounded-lg bg-primary-two p-2 text-white">
                {Number(values.quantity) + item.quantity}
              </span>
            </p>

            <div className="my-4">
              <label htmlFor="quantity" className="mb-2">
                Amount to add (currently {item.quantity})
              </label>
              <Field
                type="number"
                name="quantity"
                min="1"
                id="quantity"
                className="darker-grotesque-font mb-2 w-full text-center text-4xl font-semibold"
              />

              <p>
                Always make sure you have extra in your cafeteria in case there
                is a conflict with multiple orders.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-primary-one px-4 py-2 font-medium text-white"
              >
                Increase by {values.quantity}
              </button>
              <button
                onClick={() => setIsShowingIncreaseQuantityPopup(false)}
                type="button"
                className="rounded-lg bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default IncreaseItemQuantity;

import { updateMenuItemQuantity } from "@/app/lib/actions";
import { MenuItem } from "@/app/types/cafeteria";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const UpdateItemQuantity = ({
  setIsShowingEditItemPopup,
  item,
  category,
}: {
  setIsShowingEditItemPopup: any;
  item: MenuItem;
  category: string;
}) => {
  const initialValues = {
    quantity: item.quantity.toString(),
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .positive()
      .integer()
      .required("Quantity is required"),
  });

  const handleSubmit = async (values: { quantity: string }) => {
    const id = toast.loading("Please wait...");
    const response = await updateMenuItemQuantity(
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
        onClick={() => setIsShowingEditItemPopup(false)}
        className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-[50%]">
          <div className="my-4">
            <label htmlFor="quantity" className="mb-2">
              Quantity:
            </label>
            <Field
              type="number"
              name="quantity"
              min="1"
              id="quantity"
              className="darker-grotesque-font mb-2 w-full text-center text-4xl font-semibold"
            />

            <p>
              Try to reduce the quantity by at least 5 to give room for
              conflicting orders. For example, if you have 20 items, enter 15
              instead.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary-one px-4 py-2 font-medium text-white"
            >
              Update
            </button>
            <button
              onClick={() => setIsShowingEditItemPopup(false)}
              type="button"
              className="rounded-lg bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateItemQuantity;

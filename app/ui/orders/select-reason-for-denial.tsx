import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../text-error";

const SelectReasonForDenial = ({
  setIsShowingDenialPopup,
  handleSetOrderStatus,
  value,
}: {
  setIsShowingDenialPopup: any;
  handleSetOrderStatus: ({
    value,
    message,
  }: {
    value: string;
    message: string;
  }) => void;
  value: string;
}) => {
  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("Please pick a reason for the denial"),
  });

  const handleSubmit = ({ message }: { message: string }) => {
    handleSetOrderStatus({ value, message });
    setIsShowingDenialPopup(false);
  };

  return (
    <>
      <div
        onClick={() => setIsShowingDenialPopup(false)}
        className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
      />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="fixed left-1/2 top-1/2 z-20 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 sm:w-[50%]">
          <p className="text-lg font-medium text-neutral-dark01">
            Select reason for denial
          </p>
          <p className="mb-2">
            When you deny a user&apos;s order, you have to specify the reason
            for the denial
          </p>

          <div className="mb-2 flex items-center gap-2">
            <Field
              type="radio"
              name="message"
              value="One or more items are no longer available"
            />
            <label htmlFor="message">
              One or more items are no longer available
            </label>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Field
              type="radio"
              name="message"
              value="We are not taking orders at the moment"
            />
            <label htmlFor="message">
              We are not taking orders at the moment
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Field type="radio" name="message" value="Undisclosed reason" />
            <label htmlFor="message">Other</label>
          </div>

          <ErrorMessage name="message" component={TextError} />

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-primary-one px-4 py-2 font-medium text-white"
            >
              Submit
            </button>
            <button
              type="button"
              className="rounded-xl bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
              onClick={() => setIsShowingDenialPopup(false)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SelectReasonForDenial;

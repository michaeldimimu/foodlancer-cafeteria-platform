"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../text-error";
import { useState } from "react";
import { PopulatedOrder } from "@/app/types/order";
import axios from "axios";
import { ErrorOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const FindOrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<PopulatedOrder | null>(null);

  const router = useRouter();

  const initialValues = {
    confirmationId: "",
  };

  const validationSchema = Yup.object({
    confirmationId: Yup.number()
      .positive()
      .integer()
      .min(1000, "Confirmation ID must be at least 4 digits")
      .max(9999, "Confirmation ID must be at most 4 digits")
      .required("Confirmation ID is required"),
  });

  const handleSubmitForm = (values: { confirmationId: string }) => {
    setIsLoading(true);
    axios
      .get(`/api/fetchOrderByConfirmationId/${values.confirmationId}`)
      .then((response) => {
        setOrder(response.data);
        if (response.data) {
          setError("");
          router.push(`/order/${response.data._id}`);
        } else {
          setError(
            `No order with Confirmation ID ${values.confirmationId} was found!`,
          );
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("An error occurred while fetching the order");
      });
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmitForm}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Confirmation ID:</label>
          <Field
            className="w-full p-4 text-center text-4xl"
            type="text"
            name="confirmationId"
            id="confirmationId"
          />
          <ErrorMessage name="confirmationId" component={TextError} />

          <button type="submit" className="btn btn-accent mt-2 w-full p-4">
            Find order
          </button>
        </Form>
      </Formik>

      <div className="mt-8">
        {isLoading ? (
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary-one border-t-transparent" />
            <span className="text-xs sm:text-sm">Loading order</span>
          </div>
        ) : (
          !order &&
          error && (
            <div className="text-center">
              <ErrorOutlined color="error" className="text-9xl" />
              <p className="mx-auto mt-4 max-w-[30ch] text-lg leading-tight text-neutral-dark02">
                {error}
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FindOrderForm;

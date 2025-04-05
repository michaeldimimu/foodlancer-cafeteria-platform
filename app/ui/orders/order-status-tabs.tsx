"use client";

import setOrderStatus from "@/app/lib/actions/order/setOrderStatus";
import {
  AccessTimeOutlined,
  CheckCircleOutlined,
  DeliveryDiningOutlined,
  HighlightOffOutlined,
  PaidOutlined,
  ShoppingBagOutlined,
  SwapHorizOutlined,
} from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Drawer } from "vaul";

const possibleOrderStatuses = [
  {
    id: 0,
    status: "confirming",
    icon: <AccessTimeOutlined fontSize="inherit" />,
    styles: "border-yellow-700 bg-yellow-100 text-yellow-700",
  },
  {
    id: 1,
    status: "confirmed",
    icon: <CheckCircleOutlined fontSize="inherit" />,
    styles: "border-green-700 bg-green-100 text-green-700",
  },
  {
    id: 2,
    status: "denied",
    icon: <HighlightOffOutlined fontSize="inherit" />,
    styles: "border-red-700 bg-red-100 text-red-700",
  },
  {
    id: 3,
    status: "cancelled",
    icon: <HighlightOffOutlined fontSize="inherit" />,
    styles: "border-gray-500 bg-gray-100 text-gray-500",
  },
  {
    id: 4,
    status: "paid",
    icon: <PaidOutlined fontSize="inherit" />,
    styles: "border-green-700 bg-green-100 text-green-700",
  },
  {
    id: 5,
    status: "delivering",
    icon: <DeliveryDiningOutlined fontSize="inherit" />,
    styles: "border-yellow-700 bg-yellow-100 text-yellow-700",
  },
  {
    id: 7,
    status: "claimed",
    icon: <ShoppingBagOutlined fontSize="inherit" />,
    styles: "border-primary-three bg-primary-one/10 text-primary-three",
  },
];

const possibleReasonsForDenial = [
  {
    id: 0,
    reason: "One or more items are no longer available",
  },
  {
    id: 1,
    reason: "Not taking orders at the moment",
  },
  {
    id: 2,
    reason: "Order is invalid",
  },
  {
    id: 3,
    reason: "No pick up",
  },
  {
    id: 4,
    reason: "Other",
  },
];

const uneditableStatuses = ["cancelled", "paid", "delivering", "delivered"];

const OrderStatusTabs = ({
  status,
  message,
  confirmationId,
}: {
  status: string;
  message: string;
  confirmationId: number;
}) => {
  const [orderStatusDetails, setOrderStatusDetails] = useState({
    status,
    message,
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatingStatus = toast.loading("Please wait...");
    const response = await setOrderStatus(
      confirmationId,
      orderStatusDetails.status,
      orderStatusDetails.message,
    );
    if (response) {
      toast.dismiss(updatingStatus);
      setOpen(false);
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    } else {
      toast.dismiss(updatingStatus);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mb-2">
      <p className="font-medium text-neutral-dark01">Order status</p>

      <div className="flex items-center gap-4">
        {possibleOrderStatuses.map((possibleOrderStatus) => {
          if (status === possibleOrderStatus.status) {
            return (
              <div
                key={possibleOrderStatus.id}
                className={`flex w-fit items-center gap-1 rounded-full border px-4 py-1 ${possibleOrderStatus.styles}`}
              >
                <span>{possibleOrderStatus.status}</span>
                {possibleOrderStatus.icon}
              </div>
            );
          }
        })}

        {!uneditableStatuses.includes(status) && (
          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger className="flex items-center gap-1 rounded-xl bg-primary-one p-2 pl-3 pr-4 font-medium text-white">
              <SwapHorizOutlined fontSize="small" />
              <span>Change</span>
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
                    <Drawer.Title className="mb-1 text-2xl font-semibold text-neutral-dark01">
                      Update order status
                    </Drawer.Title>
                    <Drawer.Description className="mb-4">
                      Change the status of this order
                    </Drawer.Description>

                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="mb-4">
                        <label htmlFor="status" className="mb-2">
                          Select status
                        </label>
                        <select
                          name="status"
                          id="status"
                          onChange={(e) =>
                            setOrderStatusDetails({
                              ...orderStatusDetails,
                              status: e.target.value,
                            })
                          }
                          defaultValue={orderStatusDetails.status}
                          required
                          className="w-full"
                        >
                          {possibleOrderStatuses.map((possibleOrderStatus) => {
                            if (
                              !uneditableStatuses.includes(
                                possibleOrderStatus.status,
                              )
                            ) {
                              return (
                                <option
                                  key={possibleOrderStatus.id}
                                  value={possibleOrderStatus.status}
                                >
                                  {possibleOrderStatus.status}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>

                      {orderStatusDetails.status === "denied" ? (
                        <div className="mb-4">
                          <label htmlFor="message" className="mb-2">
                            Select reason for denial
                          </label>
                          <select
                            name="message"
                            id="message"
                            onChange={(e) =>
                              setOrderStatusDetails({
                                ...orderStatusDetails,
                                message: e.target.value,
                              })
                            }
                            defaultValue=""
                            required
                            className="w-full"
                          >
                            <option value="" disabled>
                              Reason for denial
                            </option>
                            {possibleReasonsForDenial.map((possibleReason) => (
                              <option
                                key={possibleReason.id}
                                value={possibleReason.reason}
                              >
                                {possibleReason.reason}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <label htmlFor="message" className="mb-2">
                            Add a message (optional)
                          </label>
                          <textarea
                            name="message"
                            id="message"
                            onChange={(e) =>
                              setOrderStatusDetails({
                                ...orderStatusDetails,
                                message: e.target.value,
                              })
                            }
                            defaultValue={orderStatusDetails.message}
                            className="w-full"
                          ></textarea>
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="submit"
                          disabled={
                            status === orderStatusDetails.status &&
                            message === orderStatusDetails.message
                          }
                          className="flex-1 rounded-xl bg-primary-one px-4 py-2 font-medium text-white"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="flex-1 rounded-xl bg-primary-one/10 px-4 py-2 font-medium text-primary-three"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          // <button className="flex items-center gap-1 rounded-xl bg-primary-one p-2 pl-3 pr-4 font-medium text-white">
          //   <SwapHorizOutlined fontSize="small" />
          //   <span>Change</span>
          // </button>
        )}
      </div>
    </div>
  );
};

export default OrderStatusTabs;

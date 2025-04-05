import setOrderStatus from "@/app/lib/actions/order/setOrderStatus";
import {
  possibleOrderStatuses,
  possibleReasonsForDenial,
  uneditableStatuses,
} from "@/app/utils/staticData";
import { SwapHorizOutlined } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Drawer } from "vaul";

const ChangeOrderStatus = ({
  status,
  message,
  confirmationId,
}: {
  status: string;
  message: string;
  confirmationId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [orderStatusDetails, setOrderStatusDetails] = useState({
    status,
    message,
  });

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
                        status: e.target.value,
                        message: "",
                      })
                    }
                    defaultValue={orderStatusDetails.status}
                    required
                    className="w-full"
                  >
                    {possibleOrderStatuses.map((possibleOrderStatus) => {
                      if (
                        !uneditableStatuses.includes(possibleOrderStatus.status)
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
  );
};

export default ChangeOrderStatus;

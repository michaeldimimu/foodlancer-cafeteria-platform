"use client";

import {
  possibleOrderStatuses,
  uneditableStatuses,
} from "@/app/utils/staticData";
import ChangeOrderStatus from "./change-order-status";

const OrderStatusTabs = ({
  status,
  message,
  confirmationId,
}: {
  status: string;
  message: string;
  confirmationId: number;
}) => {
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
                <possibleOrderStatus.icon fontSize="inherit" />
              </div>
            );
          }
        })}

        {!uneditableStatuses.includes(status) && (
          <ChangeOrderStatus
            status={status}
            message={message}
            confirmationId={confirmationId}
          />
        )}
      </div>
    </div>
  );
};

export default OrderStatusTabs;

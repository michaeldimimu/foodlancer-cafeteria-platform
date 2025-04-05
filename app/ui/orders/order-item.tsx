import Link from "next/link";

import { Order } from "@/app/types/order";

import {
  AccessTimeOutlined,
  ArrowForwardIosOutlined,
  CancelScheduleSendOutlined,
  CheckCircleOutlined,
  CircleOutlined,
  DeliveryDiningOutlined,
  HighlightOffOutlined,
  PaidOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

const OrderItem = ({ order }: { order: Order }) => {
  return (
    <Link
      href={`/order/${order._id}`}
      className="mt-2 flex items-center justify-between rounded-xl border border-gray-300 bg-white p-4 text-neutral-dark01"
    >
      <div className="flex items-center gap-4">
        {order.orderStatus.value === "confirming" ? (
          <AccessTimeOutlined fontSize="large" className="text-yellow-500" />
        ) : order.orderStatus.value === "confirmed" ? (
          <CheckCircleOutlined fontSize="large" className="text-green-500" />
        ) : order.orderStatus.value === "denied" ? (
          <HighlightOffOutlined fontSize="large" className="text-red-500" />
        ) : order.orderStatus.value === "cancelled" ? (
          <CancelScheduleSendOutlined
            fontSize="large"
            className="text-gray-500"
          />
        ) : order.orderStatus.value === "paid" ? (
          <PaidOutlined fontSize="large" className="text-green-500" />
        ) : order.orderStatus.value === "delivering" ? (
          <DeliveryDiningOutlined
            fontSize="large"
            className="text-yellow-500"
          />
        ) : order.orderStatus.value === "delivered" ? (
          <ShoppingBagOutlined fontSize="large" className="text-primary-one" />
        ) : order.orderStatus.value === "claimed" ? (
          <ShoppingBagOutlined fontSize="large" className="text-primary-one" />
        ) : (
          <CircleOutlined fontSize="large" className="text-gray-500" />
        )}

        <div>
          <div className="flex items-center gap-1 text-xs text-neutral-dark03">
            <span>{new Date(order.createdAt).toDateString()}</span>
            <span className="text-neutral-dark02">•</span>
            <span>
              {new Date(order.createdAt).toLocaleTimeString("en-US", {
                timeZone: "Africa/Lagos",
              })}
            </span>
          </div>
          <p>
            {order.plates.length} {order.plates.length > 1 ? "plates" : "plate"}{" "}
            from {order.cafeteria} |{" "}
            <span className="font-semibold">&#8358;{order.total}</span>
          </p>
        </div>
      </div>
      <ArrowForwardIosOutlined fontSize="inherit" />
    </Link>
  );
};

export default OrderItem;

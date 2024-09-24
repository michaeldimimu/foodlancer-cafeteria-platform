import Link from "next/link";

import { Order } from "@/app/types/order";

import {
  AccessTimeOutlined,
  ArrowForwardIosOutlined,
  CheckCircleOutlined,
  HighlightOffOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

const OrderItem = ({ order }: { order: Order }) => {
  return (
    <Link
      href={`/order/${order._id}`}
      className="mt-2 flex items-center justify-between rounded-xl border border-gray-300 bg-white p-4 text-neutral-dark01"
    >
      <div className="flex items-center gap-4">
        {order.orderStatus.value === "ready" ? (
          <CheckCircleOutlined fontSize="large" className="text-green-600" />
        ) : order.orderStatus.value === "preparing" ? (
          <AccessTimeOutlined fontSize="large" className="text-yellow-500" />
        ) : order.orderStatus.value === "denied" ? (
          <HighlightOffOutlined fontSize="large" className="text-red-500" />
        ) : (
          <ShoppingBagOutlined fontSize="large" className="text-primary-one" />
        )}

        <div>
          <div className="flex items-center gap-1 text-xs text-neutral-dark03">
            <span>{order.createdAt.toDateString()}</span>
            <span className="text-neutral-dark02">•</span>
            <span>
              {order.createdAt.toLocaleTimeString("en-US", {
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

import { AccessTimeOutlined, CheckCircleOutlined, HighlightOffOutlined, PaidOutlined, DeliveryDiningOutlined, ShoppingBagOutlined } from "@mui/icons-material";

export const possibleOrderStatuses = [
    {
      id: 0,
      status: "confirming",
      icon: AccessTimeOutlined,
      styles: "border-yellow-700 bg-yellow-100 text-yellow-700",
    },
    {
      id: 1,
      status: "confirmed",
      icon: CheckCircleOutlined,
      styles: "border-green-700 bg-green-100 text-green-700",
    },
    {
      id: 2,
      status: "denied",
      icon: HighlightOffOutlined,
      styles: "border-red-700 bg-red-100 text-red-700",
    },
    {
      id: 3,
      status: "cancelled",
      icon: HighlightOffOutlined,
      styles: "border-gray-500 bg-gray-100 text-gray-500",
    },
    {
      id: 4,
      status: "paid",
      icon: PaidOutlined,
      styles: "border-green-700 bg-green-100 text-green-700",
    },
    {
      id: 5,
      status: "delivering",
      icon: DeliveryDiningOutlined,
      styles: "border-yellow-700 bg-yellow-100 text-yellow-700",
    },
    {
      id: 7,
      status: "claimed",
      icon: ShoppingBagOutlined,
      styles: "border-primary-three bg-primary-one/10 text-primary-three",
    },
  ];
  
  export const possibleReasonsForDenial = [
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
  
  export const uneditableStatuses = ["cancelled", "paid", "delivering", "delivered"];
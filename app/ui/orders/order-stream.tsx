"use client";

import { useEffect, useState } from "react";
import OrderItem from "./order-item";
import { Order } from "@/app/types/order";
import fetchOrderStream from "@/app/lib/data/fetchOrderStream";
import { useInView } from "react-intersection-observer";

type OrderListProps = {
  initialOrders: Order[];
};

const NUMBER_OF_ORDERS_TO_FETCH = 20;

const OrderStream = ({ initialOrders }: OrderListProps) => {
  const [offset, setOffset] = useState(NUMBER_OF_ORDERS_TO_FETCH);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isShowingLoadingSpinner, setIsShowingLoadingSpinner] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreOrders = async () => {
    const fetchedOrders = await fetchOrderStream(
      offset,
      NUMBER_OF_ORDERS_TO_FETCH,
    );
    if (fetchedOrders) {
      if (fetchedOrders.length > 0) {
        setOrders((orders) => [...orders, ...fetchedOrders]);
        setOffset((offset) => offset + NUMBER_OF_ORDERS_TO_FETCH);
      } else {
        setIsShowingLoadingSpinner(false);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreOrders();
    }
  }, [inView]);

  return (
    <>
      {orders?.map((order) => (
        <OrderItem key={order._id.toString()} order={order} />
      ))}

      {isShowingLoadingSpinner && (
        <div
          ref={ref}
          className="mx-auto mt-4 h-8 w-8 animate-spin rounded-full border-2 border-primary-one border-t-transparent"
        />
      )}
    </>
  );
};

export default OrderStream;

import React, { useState } from "react";
import styled from "styled-components";
import { IconChevronRight, IconFileAdd } from "../assets/icons";
import photo1 from "../assets/photo-1.avif";
import photo2 from "../assets/photo-2.avif";
import photo3 from "../assets/photo-3.avif";
import photo4 from "../assets/photo-4.avif";
import photo5 from "../assets/photo-5.avif";
import OrderCard from "./orderCard";

const OrderTable = (): React.ReactElement => {
  const [orderViewActive, setOrderViewActive] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    user: { name: string; avatar: string };
    date: string;
    amount: string;
    status: string;
    remover: () => void;
  }>();

  const toggleOrderView = () => {
    setOrderViewActive(!orderViewActive);
  };

  const orders = [
    {
      user: { name: "Marcus Bergson", avatar: photo1 },
      date: "Nov 15, 2023",
      amount: "$80,000",
      status: "Paid",
    },
    {
      user: { name: "Jaydon Vaccaro", avatar: photo2 },
      date: "Nov 15, 2023",
      amount: "$150,000",
      status: "Refund",
    },
    {
      user: { name: "Corey Schleifer", avatar: photo3 },
      date: "Nov 14, 2023",
      amount: "$87,000",
      status: "Paid",
    },
    {
      user: { name: "Cooper Press", avatar: photo4 },
      date: "Nov 14, 2023",
      amount: "$100,000",
      status: "Refund",
    },
    {
      user: { name: "Philip Lubin", avatar: photo5 },
      date: "Nov 13, 2023",
      amount: "$78,000",
      status: "Paid",
    },
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    toggleOrderView();
  };

  return (
    <OrderTableRenderer id="order_table">
      <header>
        <h3>Last Orders</h3>
        <span>
          See All <IconChevronRight className="icon-viewmore" />
        </span>
      </header>
      <div className="thead">
        <span>Name</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Invoice</span>
      </div>

      {orders.map((order, i: number) => (
        <div className="order-details" key={i}>
          <div className="user_avatar" onClick={() => handleViewOrder(order)}>
            <img src={order.user.avatar} alt="user-avatar" />
            <span>{order.user.name}</span>
          </div>

          <span title="Date" className="date">
            {order.date}
          </span>
          <span title="Amount" className="amount">
            {order.amount}
          </span>
          <span
            title="Status"
            className="status"
            style={{
              color: `${order.status === "Paid" ? "#39C9A0" : "crimson"}`,
            }}
          >
            {order.status}
          </span>
          <span
            title="Invoice"
            className="invoice"
            onClick={() => handleViewOrder(order)}
          >
            <IconFileAdd /> View
          </span>
        </div>
      ))}

      {orderViewActive && selectedOrder && (
        <OrderCard
          user={selectedOrder.user}
          date={selectedOrder.date}
          amount={selectedOrder.amount}
          status={selectedOrder.status}
          remover={toggleOrderView}
        />
      )}
    </OrderTableRenderer>
  );
};

export default OrderTable;

const OrderTableRenderer = styled.div`
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  header span,
  h3 {
    cursor: pointer;
  }

  header span {
    font-size: 12px;
    color: #39c9a0;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .icon-viewmore {
    fill: #39c9a0;
  }

  .thead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 25px;
  }

  .thead span {
    font-size: 13px;
    color: #8b8e98;
  }

  .order-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px 10px 5px;
    border-top: 1px solid #ededed;
    background-color: #fff;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  .order-details:hover {
    background-color: #94f4d9;
    border-radius: 4px;
  }

  .user_avatar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .user_avatar img {
    width: 25px;
    height: 25px;
    border: 1px solid #ededed;
    border-radius: 50%;
  }

  .order-details span {
    font-size: 13px;
  }

  .order-details .date {
    color: #8b8e98;
  }

  @media (max-width: 767px) {
    header h3 {
      font-size: 13px;
    }

    .thead {
      padding: 10px 5px 5px 15px;
    }

    .order-details {
      padding: 10px 5px;
    }

    .thead span {
      font-size: 12px;
    }

    .order-details span {
      font-size: 10px;
    }
  }
`;

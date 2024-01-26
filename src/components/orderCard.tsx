import React from "react";
import styled from "styled-components";
import { IconRemoveFill } from "../assets/icons";

const OrderCard = ({
  user,
  date,
  amount,
  status,
  remover,
}: {
  user: { name: string; avatar: string };
  date: string;
  amount: string;
  status: string;
  remover: () => void;
}) => {
  return (
    <OrderCardRenderer>
      <div className="order">
        <div className="order-header">
          <span className="order-date">{date}</span>
          <span onClick={remover}>
            <IconRemoveFill className="remove-icon" />
          </span>
        </div>
        <div className="order-details">
          <div className="avatar">
            <img src={user.avatar} alt="order-img" />
            <span className="user-name">{user.name}</span>
          </div>
          <span className="order-amount">Amount: <b>{amount}</b></span>
          <span className="order-status">Status: {status}</span>
        </div>
      </div>
    </OrderCardRenderer>
  );
};

export default OrderCard;

const OrderCardRenderer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  transform: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .order {
    width: 80%;
    max-width: 500px;
    height: fit-content;
    position: relative;
    z-index: 1000;
    background: #ffffff;
    border-radius: 12px;
   border:1px solid #ededed;
    overflow: hidden;
  }

  .order-header {
    padding: 10px;
    background-color: #39c9a0;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .order-details {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    flex-direction:row;
    justify-content: center;
    gap:10px;

  }

  .avatar {
    display:flex;
    flex-direction:column;
    margin-bottom: 15px;
    text-align: center;
    padding-left:5px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-name {
      margin-top: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .order-amount,
  .order-status {
    margin-bottom: 10px;
    font-size: 13px;
    color: #333333;
  }
  .order-status{
    background-color:crimson;
    color: #fff;
    padding:5px 10px;
  }

  .remove-icon {
    fill: #ffffff;
    cursor: pointer;
  }
  .order-date{
    font-size:12px;
  }
`;

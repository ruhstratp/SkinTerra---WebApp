import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import "../assets/css/orders.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
// import OrderSummaryCard from "./OrderSummaryCard";
import "../assets/css/orderSummaryCard.css";
import OrderModal from "./OrderModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [animationClasses, setAnimationClasses] = useState({});
  const initialDailyOrders = useRef(0);
  const initialDailyTotal = useRef(0);

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
  };
  const getDailyStats = (orders) => {
    const today = new Date();
    const dailyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    });

    const dailyTotal = dailyOrders.reduce(
      (total, order) => total + parseFloat(order.total),
      0
    );

    return {
      dailyOrders: dailyOrders.length,
      dailyTotal: dailyTotal.toFixed(2),
    };
  };

  const getOrderStatusCounts = (orders) => {
    const statusCounts = orders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {});

    return statusCounts;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
      handleStatusUpdate(orderId, newStatus);
      console.log(orderId);
    } catch (error) {
      return <ErrorPage />;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders?populate=products");
      setOrders(response.data.data);
      const { dailyOrders, dailyTotal } = getDailyStats(response.data.data);
      initialDailyOrders.current = dailyOrders;
      initialDailyTotal.current = dailyTotal;
    } catch (error) {
      return <ErrorPage />;
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      return <ErrorPage />;
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setAnimationClasses((prevClasses) => ({
      ...prevClasses,
      [orderId]: "background-slide",
    }));

    setTimeout(() => {
      setAnimationClasses((prevClasses) => ({
        ...prevClasses,
        [orderId]: "",
      }));
    }, 2000);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="orders-page">
        {/* <h1>Orders</h1> */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              {/* <th>User ID</th> */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>Street Address</th>
              <th>City</th>
              <th>County</th>
              <th>Postal Code</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              // <tr key={order._id} className={animationClasses[order._id] || ""}>
              <tr key={order._id}>
                <td>
                  <a
                    className="order-id"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(order);
                    }}
                  >
                    {order._id}
                  </a>
                </td>
                {/* <td>{order.user._id}</td> */}
                <td>{order.user.firstName}</td>
                <td>{order.user.lastName}</td>
                <td>{order.user.email}</td>
                <td>{order.user.streetAddress}</td>
                <td>{order.user.country}</td>
                <td>{order.user.city}</td>
                <td>{order.user.postalCode}</td>
                <td>${order.total.toFixed(2)}</td>
                <td
                  className={`${
                    animationClasses[order._id]
                  } status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <OrderModal
          key={selectedOrder ? selectedOrder._id : null}
          selectedOrder={selectedOrder}
          closeModal={closeModal}
          updateOrderStatus={updateOrderStatus}
        />
      </div>
      {/* <div className="order-summary-cards">
        <OrderSummaryCard
          title="Today's Orders"
          value={initialDailyOrders.current}
        />
        <OrderSummaryCard
          title="Today's Income"
          value={`$${initialDailyTotal.current}`}
        />
      </div> */}
      <Footer />
    </>
  );
};

export default Orders;

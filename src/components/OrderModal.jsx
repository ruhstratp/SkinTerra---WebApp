import React, { useCallback } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import "../assets/css/orderModal.css";

const OrderModal = ({
  selectedOrder,
  closeModal,
  updateOrderStatus,
  handleStatusUpdate,
}) => {
  const handleUpdateStatus = useCallback(
    async (orderId, newStatus) => {
      try {
        await updateOrderStatus(orderId, newStatus);
        // handleStatusUpdate(orderId, newStatus);
        closeModal(); // Close the modal after updating the status
      } catch (error) {
        return <ErrorPage />;
      }
    },
    // [closeModal, updateOrderStatus, handleStatusUpdate]
    [closeModal, updateOrderStatus]
  );

  if (!selectedOrder) return null;

  const products = selectedOrder.items.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));

  return (
    <ReactModal
      isOpen={!!selectedOrder}
      onRequestClose={closeModal}
      className="order-detail-modal"
      overlayClassName="order-detail-modal-overlay"
    >
      <h2>Order Details</h2>
      <div>
        <h4>Products:</h4>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {product.image && (
                  <img src={require(`../assets/img/${product.image}`)} />
                )}
              </td>
              <td className="modal-product-name">{product.name}</td>
              <td className="modal-product-quantity">{product.quantity}</td>
              {/* <td>${product.price ? product.price.toFixed(2) : "N/A"}</td> */}
              <td className="modal-product-price">
                $
                {product.price && product.quantity
                  ? (product.price * product.quantity).toFixed(2)
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <div className="order-details">
        <label htmlFor={`status-${selectedOrder._id}`}>Status:</label>
        <select
          className="status-select"
          id={`status-${selectedOrder._id}`}
          value={selectedOrder.status}
          onChange={(e) =>
            handleUpdateStatus(selectedOrder._id, e.target.value)
          }
        >
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button className="close-btn" onClick={closeModal}>
        Close
      </button>
    </ReactModal>
  );
};

export default OrderModal;

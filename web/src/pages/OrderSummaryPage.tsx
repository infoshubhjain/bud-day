/**
 * Order summary screen
 * Shows selected items and quantities
 * Large confirm button
 * Clear cancellation path
 * Back button returns to Item selection
 */

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./OrderSummaryPage.css";

interface OrderItem {
  id: string;
  name: string;
  icon: string;
  quantity: number;
}

export const OrderSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = (location.state as { category?: string })?.category || "";
  const items = (location.state as { items?: OrderItem[] })?.items || [];

  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    estimatedDelivery: string;
  } | null>(null);

  const handleConfirm = async () => {
    setIsPlacing(true);
    try {
      const result = await mockApi.placeOrder({
        category,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity }))
      });
      setOrderDetails(result);
      setOrderPlaced(true);
    } catch (err) {
      // Error handling
    } finally {
      setIsPlacing(false);
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      navigate("/order");
    }
  };

  if (orderPlaced && orderDetails) {
    return (
      <div className="order-summary-page">
        <TopBar title="Order placed" backTo="/home" />
        <div className="order-success">
          <div className="order-success-icon">✓</div>
          <h2 className="order-success-title">Order placed!</h2>
          <p className="order-success-text">
            Your order has been confirmed.
          </p>
          <p className="order-success-text">
            Order ID: <strong>{orderDetails.orderId}</strong>
          </p>
          <p className="order-success-text">
            Estimated delivery: {orderDetails.estimatedDelivery}
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/home")}
            style={{ marginTop: "var(--spacing-lg)" }}
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <TopBar title="Review order" backTo="/order/items" />
      <p className="page-subtitle">Please confirm your order before placing it.</p>

      <div className="order-summary-section">
        <h2 className="order-section-title">Category</h2>
        <p className="order-section-value">{category}</p>
      </div>

      <div className="order-summary-section">
        <h2 className="order-section-title">Items</h2>
        <div className="order-items-summary">
          {items.map((item) => (
            <div key={item.id} className="order-item-summary">
              <span className="order-item-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="order-item-name">{item.name}</span>
              <span className="order-item-quantity">× {item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="order-actions">
        <button
          className="btn-primary"
          onClick={handleConfirm}
          disabled={isPlacing}
        >
          {isPlacing ? "Placing order..." : "Confirm and place order"}
        </button>
        <button
          className="btn-secondary"
          onClick={handleCancel}
          disabled={isPlacing}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

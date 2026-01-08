/**
 * Order essentials - item selection screen
 * Shows frequent items for selected category
 * Quantity selector with plus/minus only
 * Continue to summary
 * Back button returns to Category selection
 */

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { TopBar } from "../components/navigation/TopBar";
import "./OrderItemsPage.css";

interface Item {
  id: string;
  name: string;
  icon: string;
}

interface OrderItem extends Item {
  quantity: number;
}

export const OrderItemsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = (location.state as { category?: string })?.category || "GROCERIES";

  const [frequentItems, setFrequentItems] = useState<Item[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi
      .getFrequentItems(category)
      .then((items) => {
        setFrequentItems(items);
        setOrderItems(
          items.map((item) => ({ ...item, quantity: 0 }))
        );
      })
      .catch(() => setFrequentItems([]))
      .finally(() => setIsLoading(false));
  }, [category]);

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleContinue = () => {
    const selectedItems = orderItems.filter((item) => item.quantity > 0);
    if (selectedItems.length > 0) {
      navigate("/order/summary", {
        state: { category, items: selectedItems }
      });
    }
  };

  const selectedCount = orderItems.filter((item) => item.quantity > 0).length;

  if (isLoading) {
    return (
      <div className="page-loading">
        <div className="loading" aria-label="Loading items"></div>
        <p>Loading items...</p>
      </div>
    );
  }

  return (
    <div className="order-items-page">
      <TopBar title="Select items" backTo="/order" />
      <p className="page-subtitle">
        Choose what you need. Use plus and minus to set quantity.
      </p>

      <div className="items-list">
        {orderItems.map((item) => (
          <div key={item.id} className="item-row">
            <div className="item-info">
              <span className="item-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="item-name">{item.name}</span>
            </div>
            <div className="quantity-selector">
              <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, -1)}
                aria-label={`Decrease quantity of ${item.name}`}
                disabled={item.quantity === 0}
              >
                −
              </button>
              <span className="quantity-display" aria-label={`Quantity: ${item.quantity}`}>
                {item.quantity}
              </span>
              <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCount > 0 && (
        <div className="order-continue">
          <p className="order-summary-text">
            {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
          </p>
          <button className="btn-primary" onClick={handleContinue}>
            Continue to summary
          </button>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { api } from "../api/client";

export const OrderEssentials = () => {
  const categories = [
    { key: "GROCERIES", label: "Groceries" },
    { key: "MEDICINES", label: "Medicines" },
    { key: "MEALS", label: "Meals" }
  ] as const;

  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handlePlace = () => {
    if (!selected || !items.trim()) return;
    setStatus("Placing your order...");
    const list = items
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    api
      .placeOrder(selected, list)
      .then(() => setStatus("Your order was placed. We will keep you updated."))
      .catch(() => setStatus("We could not place the order. Please try again."));
  };

  return (
    <div className="screen" aria-label="Order essentials">
      <h1 className="screen-title">Order essentials</h1>
      <ul className="list">
        {categories.map((c) => {
          const iconMap: Record<string, string> = {
            GROCERIES: "🛒",
            MEDICINES: "💊",
            MEALS: "🍽️"
          };
          return (
            <li key={c.key}>
              <button
                className="category-button"
                type="button"
                onClick={() => setSelected(c.key)}
              >
                <span className="category-icon" aria-hidden="true">{iconMap[c.key]}</span>
                <span>{c.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {selected && (
        <div className="order-panel">
          <p className="helper-text">
            Tell us what you need. For example: milk, bread, eggs.
          </p>
          <label className="field-label">
            Items
            <textarea
              className="field-input"
              rows={3}
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
          </label>
          <button type="button" className="large-button" onClick={handlePlace}>
            <span className="large-button-icon" aria-hidden="true">✓</span>
            <span className="large-button-label">Confirm order</span>
          </button>
        </div>
      )}
      {status && (
        <div className="status-message" role="status">
          {status}
        </div>
      )}
    </div>
  );
};




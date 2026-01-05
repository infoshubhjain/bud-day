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
        {categories.map((c) => (
          <li key={c.key}>
            <button
              className="list-item-button"
              type="button"
              onClick={() => setSelected(c.key)}
            >
              {c.label}
            </button>
          </li>
        ))}
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
            Confirm order
          </button>
        </div>
      )}
      {status && (
        <p className="helper-text" role="status">
          {status}
        </p>
      )}
    </div>
  );
};




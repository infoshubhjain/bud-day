/**
 * Order essentials - category selection screen
 * Groceries, medicines, meals
 * Large buttons with icons
 * Back button returns to Home
 */

import { useNavigate } from "react-router-dom";
import { TopBar } from "../components/navigation/TopBar";
import "./OrderCategoryPage.css";

const CATEGORIES = [
  { id: "GROCERIES", name: "Groceries", icon: "🛒" },
  { id: "MEDICINES", name: "Medicines", icon: "💊" },
  { id: "MEALS", name: "Meals", icon: "🍽️" }
];

export const OrderCategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="order-category-page">
      <TopBar title="Order essentials" backTo="/home" />
      <p className="page-subtitle">What would you like to order?</p>

      <div className="category-list">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className="category-button"
            onClick={() => navigate("/order/items", { state: { category: category.id } })}
            aria-label={`Order ${category.name}`}
          >
            <span className="category-icon" aria-hidden="true">
              {category.icon}
            </span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

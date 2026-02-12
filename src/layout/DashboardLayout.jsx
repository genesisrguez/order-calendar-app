import { useState } from "react";
import "../styles/dashboard.css";

function DashboardLayout({ renderPage }) {
  const [active, setActive] = useState("create");

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="logo">OrderSys</h2>

        <button
          className={active === "create" ? "active" : ""}
          onClick={() => setActive("create")}
        >
          Create Order
        </button>

        <button
          className={active === "calendar" ? "active" : ""}
          onClick={() => setActive("calendar")}
        >
          Calendars
        </button>

        <button
          className={active === "orders" ? "active" : ""}
          onClick={() => setActive("orders")}
        >
          Orders List
        </button>
      </div>

      <div className="dashboard-content">
        {renderPage(active, setActive)}
      </div>
    </div>
  );
}

export default DashboardLayout;
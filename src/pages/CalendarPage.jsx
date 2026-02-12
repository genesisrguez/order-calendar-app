import { useState } from "react";
import { format } from "date-fns";
import OrderCard from "../components/OrderCard";
import "../styles/calendar.css";

function CalendarPage({ orders }) {
  const today = new Date();
  const formattedDate = format(today, "MMMM dd, yyyy");

  const currentHour = new Date();

  // 🔹 Generar horas del día (00:00 - 23:00)
  const hours = Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(i, 0, 0, 0);
    return date;
  });

  // 🔹 Estado del filtro
  const [locationFilter, setLocationFilter] = useState("All");

  return (
    <div className="calendar-container">
      {/* HEADER */}
      <div className="calendar-header">
        <div className="header-left">
          <h1>Orders Calendar</h1>
          <p className="calendar-date">{formattedDate}</p>
        </div>
      </div>

      {/* 🔹 TOGGLE FILTER */}
      <div className="filter-container">
        <button
          className={locationFilter === "All" ? "active-filter" : ""}
          onClick={() => setLocationFilter("All")}
        >
          All
        </button>

        <button
          className={locationFilter === "Mesa" ? "active-filter" : ""}
          onClick={() => setLocationFilter("Mesa")}
        >
          Mesa
        </button>

        <button
          className={locationFilter === "Phoenix" ? "active-filter" : ""}
          onClick={() => setLocationFilter("Phoenix")}
        >
          Phoenix
        </button>
      </div>

      {/* 🔹 HOURS GRID */}
      <div className="hours-wrapper">
        {hours.map((hour, index) => {
          const hourString = format(hour, "HH:00");

          // 🔹 FILTRO POR HORA + LOCATION
          const filteredOrders = orders.filter((order) => {
            if (!order.deliveryTime) return false;

            const orderHour =
              order.deliveryTime.slice(0, 2) + ":00";

            const matchesHour = orderHour === hourString;

            const matchesLocation =
              locationFilter === "All" ||
              order.location === locationFilter;

            return matchesHour && matchesLocation;
          });

          const isCurrentHour =
            format(currentHour, "HH:00") === hourString;

          return (
            <div
              key={index}
              className={`hour-column ${
                isCurrentHour ? "current-hour" : ""
              }`}
            >
              <div className="hour-title">
                {hourString} ({filteredOrders.length})
              </div>

              {filteredOrders.length === 0 && (
                <p className="no-orders">No orders</p>
              )}

              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarPage;
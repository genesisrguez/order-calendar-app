import { format } from "date-fns";
import OrderCard from "../components/OrderCard";
import "../styles/calendar.css";

function CalendarPage({ orders, onBack }) {
  const now = new Date();

  const currentHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    0,
    0
  );

  const hours = [
    currentHour,
    new Date(currentHour.getTime() + 60 * 60 * 1000),
    new Date(currentHour.getTime() + 2 * 60 * 60 * 1000),
  ];

  const today = new Date();
  const formattedDate = format(today, "MMMM dd, yyyy");

  return (
  <div className="calendar-container">
    {/* HEADER */}
    <div className="calendar-header">
      <div className="header-left">
        <h1>Orders Calendar</h1>
        <p className="calendar-date">{formattedDate}</p>
      </div>

      <div className="header-right">
        <button className="back-button" onClick={onBack}>
          ← Back to Form
        </button>
      </div>
    </div>

    <div className="hours-wrapper">
      {hours.map((hour, index) => {
        const hourString = format(hour, "HH:00");

        const filteredOrders = orders.filter((order) => {
          const orderHour = order.deliveryTime.slice(0, 2) + ":00";
          return orderHour === hourString;
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

            {filteredOrders.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </div>
        );
      })}
    </div>
  </div>
);
}

export default CalendarPage;
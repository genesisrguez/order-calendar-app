import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import OrderCard from "../components/OrderCard";
import "../styles/calendar.css";

function CalendarPage({ orders = [] }) {

  const today = new Date();
  const formattedDate = format(today, "MMMM dd, yyyy");

  const [locationFilter, setLocationFilter] = useState("All");
  const calendarRef = useRef(null);

  // Horas laborales
  
  const now = new Date();
  const currentHour = now.getHours();
  const nextHour = currentHour + 1;

  const nextHourOrders = orders.filter((order) => {
    if (!order.deliveryTime) return false;

    const orderHour = parseInt(order.deliveryTime.slice(0, 2));
    return orderHour === nextHour;
  });

  const upcomingOrders = orders
  .filter((order) => order.deliveryTime)
  .sort((a, b) => a.deliveryTime.localeCompare(b.deliveryTime));

  const nextDelivery = upcomingOrders.find((order) => {
    const orderTime = order.deliveryTime;
    const currentTime = now.toTimeString().slice(0, 5);

    return orderTime >= currentTime;
  });

  useEffect(() => {
  if (!calendarRef.current) return;

  const currentHourElement = calendarRef.current.querySelector(".current-hour");

  if (currentHourElement) {
    currentHourElement.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}, []);

  const startHour = 6;
  const endHour = 18;

  const hours = [];

  for (let i = startHour; i <= endHour; i++) {
    const date = new Date();
    date.setHours(i, 0, 0, 0);
    hours.push(date);
  }


  return (

    <div className="calendar-container">

      <div className="calendar-header">
        <div className="header-left">
          <h1>Orders Calendar</h1>
          <p className="calendar-date">{formattedDate}</p>
        </div>
      </div>

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

      <div className="next-panel">

  <div className="next-hour">
    ⚡ Next Hour
    <p>{nextHourOrders.length} Orders Incoming</p>
  </div>

  <div className="next-delivery">
    🚚 Next Delivery
    {nextDelivery ? (
      <p>
        {nextDelivery.deliveryTime} — {nextDelivery.location}
      </p>
    ) : (
      <p>No upcoming deliveries</p>
    )}
  </div>

</div>
      <div className="calendar-hours" ref={calendarRef}>

        {hours.map((hour, index) => {

          const hourString = format(hour, "HH:00");

          const filteredOrders = orders.filter((order) => {

            if (!order.deliveryTime) return false;

            const orderHour = order.deliveryTime.slice(0, 2) + ":00";

            const matchesHour = orderHour === hourString;

            const matchesLocation =
              locationFilter === "All" ||
              order.location === locationFilter;

            return matchesHour && matchesLocation;
          });

          const isCurrentHour =
            format(now, "HH:00") === hourString;

          return (
            <div
              key={index}
              className={`hour-column ${isCurrentHour ? "current-hour" : ""}`}
            >

              <div className="hour-title">
                {format(hour, "h a")} ({filteredOrders.length})
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
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import OrderCard from "../components/OrderCard";
import "../styles/calendar.css";
import { supabase } from "../lib/supabaseClient";

function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [locationFilter, setLocationFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const calendarRef = useRef(null);

  // Horas del calendario
  const startHour = 7;
  const endHour = 16;
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    const date = new Date();
    date.setHours(i, 0, 0, 0);
    hours.push(date);
  }

  const now = new Date();



  // Filtra las órdenes según la fecha seleccionada y ubicación
  const filteredOrders = orders.filter((order) => {
    if (!order.date_needed_by) return false;

    // Tomamos solo YYYY-MM-DD del campo date_needed_by
    const orderDate = order.date_needed_by.slice(0, 10);

    const matchesDate = orderDate === selectedDate;
    const matchesLocation = locationFilter === "All" || order.location === locationFilter;

    return matchesDate && matchesLocation;
  });

    //Ordenes ASAP
  const asapOrders = filteredOrders.filter((order) => {
  if (!order.delivery_time) return false;

  const orderTime = new Date(`1970-01-01T${order.delivery_time}`);
  const currentTime = new Date();

  const diffMinutes = (orderTime - currentTime) / 60000;

  return diffMinutes <= 30 && diffMinutes >= -30;
});

  // Próxima hora
  const nextHour = now.getHours() + 1;
  const nextHourOrders = filteredOrders.filter((order) => {
    if (!order.delivery_time) return false;
    const orderHour = parseInt(order.delivery_time.slice(0, 2));
    return orderHour === nextHour;
  });

  // Próxima entrega
  if(!orders) return null;

  const upcomingOrders = filteredOrders
  .filter((order) => order.delivery_time)
  .sort((a, b) => a.delivery_time.localeCompare(b.delivery_time));

  const nextDelivery = upcomingOrders.find((order) => {
    if (!order.delivery_time) return false;
    const orderTime = order.delivery_time;
    const currentTime = format(now, "HH:mm");
    return orderTime >= currentTime;
  });

  // Fetch de órdenes desde Supabase
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) {
      console.error("Error loading orders:", error);
    } else {
      setOrders(data || []);
      setLoadingOrders(false);
    }
  }

  // Scroll automático al current hour
  useEffect(() => {
    if (!calendarRef.current) return;
    const currentHourElement =
    calendarRef.current?.querySelector(".current-hour");
    if (currentHourElement) {
      currentHourElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [filteredOrders, selectedDate]);

  if(loadingOrders) {
    return (
        <div className="calendar-loading">
        <div className="calendar-spinner"></div>
        <p>Loading calendar...</p>
      </div>
    );
    }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-left">
          <h1>Orders Calendar</h1>
          <p className="calendar-date">
            {format(new Date(selectedDate), "MM/dd/yyyy")}
          </p>
          <input
            type="date"
            lang="en-US"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-container">
        {["All", "Mesa", "Phoenix"].map((loc) => (
          <button
            key={loc}
            className={locationFilter === loc ? "active-filter" : ""}
            onClick={() => setLocationFilter(loc)}
          >
            {loc}
          </button>
        ))}
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
              {nextDelivery.delivery_time} — {nextDelivery.location}
            </p>
          ) : (
            <p>No upcoming deliveries</p>
          )}
        </div>
      </div>

      <div className="calendar-hours" ref={calendarRef}>

         {/* ASAP COLUMN */}
        <div className="hour-column asap-column">
          <div className="asap-header">
            ⚡ ASAP
          </div>

          {asapOrders.length === 0 && (
            <p className="no-orders">No urgent orders</p>
          )}

          {asapOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {hours.map((hour, index) => {
          const hourString = format(hour, "HH:00");

          const hourOrders = filteredOrders.filter((order) => {
            if (!order.delivery_time) return false;
            const orderHour = order.delivery_time.slice(0, 2) + ":00";
            return orderHour === hourString;
          });

          const currentHour = now.getHours();
          const isCurrentHour = currentHour >= startHour && currentHour <= endHour
            ? format(now, "HH:00") === hourString
            : false;

          return (
            <div
              key={index}
              className={`hour-column ${isCurrentHour ? "current-hour" : ""}`}
            >
              <div className="hour-title">
                {format(hour, "h a")} ({hourOrders.length})
              </div>

              {hourOrders.length === 0 && <p className="no-orders">No orders</p>}

              {hourOrders.map((order) => (
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
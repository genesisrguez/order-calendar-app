import { format } from "date-fns";
import OrderCard from "../components/OrderCard";

function CalendarPage({ orders, onBack }) {
  const now = new Date();

  // Redondear hora actual hacia abajo
  const currentHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    0,
    0
  );

  // Crear arreglo con hora actual + siguientes 2
  const hours = [
    currentHour,
    new Date(currentHour.getTime() + 60 * 60 * 1000),
    new Date(currentHour.getTime() + 2 * 60 * 60 * 1000),
  ];

  return (
    <div style={{ padding: "40px" }}>
      {/* Botón para regresar */}
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ← Back to Form
      </button>

      {/* Fecha actual */}
      <h2>{format(new Date(), "MMMM dd, yyyy")}</h2>

      {/* Columnas de horas */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {hours.map((hour, index) => {
          const hourString = format(hour, "HH:00");

          const filteredOrders = orders.filter((order) => {
            const orderHour = order.deliveryTime.slice(0, 2) + ":00";
            return orderHour === hourString;
          });

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                width: "300px",
                minHeight: "300px",
                borderRadius: "8px",
              }}
            >
              <h3>{hourString}</h3>

              {filteredOrders.length === 0 && (
                <p style={{ color: "#999" }}>No orders</p>
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
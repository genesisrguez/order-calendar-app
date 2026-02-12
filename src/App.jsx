import { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import FormPage from "./pages/FormPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const [orders, setOrders] = useState([]);

  const handleAddOrder = (order, navigate) => {
    setOrders([...orders, { ...order, id: Date.now() }]);
    navigate("calendar"); // Cambia automáticamente al calendario
  };

  return (
    <DashboardLayout
      renderPage={(active, setActive) => {
        if (active === "create") {
          return (
            <FormPage
              onSubmit={(order) =>
                handleAddOrder(order, setActive)
              }
            />
          );
        }

        if (active === "calendar") {
          return <CalendarPage orders={orders} />;
        }

        if (active === "orders") {
          return (
            <div style={{ padding: "40px" }}>
              <h1>Orders List</h1>
              <p>Coming soon...</p>
            </div>
          );
        }
      }}
    />
  );
}

export default App;
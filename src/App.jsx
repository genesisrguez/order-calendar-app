import { useState } from "react";
import FormPage from "./pages/FormPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const [orders, setOrders] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddOrder = (order) => {
    setOrders([...orders, order]);
    setShowCalendar(true);
  };

  return (
    <>
      {showCalendar ? (
        <CalendarPage orders={orders} />
      ) : (
        <FormPage onSubmit={handleAddOrder} />
      )}
    </>
  );
}

export default App;

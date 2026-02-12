import { useState } from "react";
import FormPage from "./pages/FormPage";

function App() {
  const [orders, setOrders] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddOrder = (order) => {
    setOrders([...orders, order]);
    setShowCalendar(true);
  };

  return (
    <>
      {!showCalendar && (
        <FormPage onSubmit={handleAddOrder} />
      )}
    </>
  );
}

export default App;

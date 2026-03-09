import { useState } from "react";
import FormPage from "./FormPage";
import CalendarPage from "./CalendarPage";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function DashboardPage() {
  const [activePage, setActivePage] = useState("form"); // 'form' o 'calendar'

  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="dashboard-content">
        {activePage === "form" && <FormPage />}
        {activePage === "calendar" && <CalendarPage />}
      </div>
    </div>
  );
}

export default DashboardPage;
import { supabase } from "../lib/supabaseClient";
import "../styles/sidebar.css";

export default function Sidebar({ activePage, setActivePage }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // redirige a login
  };

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <h1>JSM Calendar</h1>
        <button
          className={activePage === "form" ? "active" : ""}
          onClick={() => setActivePage("form")}
        >
          New Order
        </button>
        <button
          className={activePage === "calendar" ? "active" : ""}
          onClick={() => setActivePage("calendar")}
        >
          Calendar
        </button>
      </div>

      <div className="sidebar-bottom">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
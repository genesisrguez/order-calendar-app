function OrderCard({ order }) {
  const locationColor =
    order.location === "Mesa" ? "#1d4ed8" : "#60a5fa";

  const statusColor = {
    Scheduled: "#5f5f5f",
    "On hold": "#ff9c12",
    "In Production": "#dc2626",
    Ready: "#0342ff",
    Completed: "#16a34a"
  };

  return (
    <div
      className="order-card"
      style={{ borderLeft: `5px solid ${statusColor[order.status]}` }}
    >
      <div
        className="order-location"
        style={{ color: locationColor }}
      >
        {order.location}
      </div>

      <div className="order-row">
        <strong>Invoice:</strong> {order.invoice_number}
      </div>

      <div className="order-row">
        <strong>Company:</strong> {order.company_name}
      </div>

      <div className="order-row">
        <strong>Job name:</strong> {order.job_name}
      </div>

      <div className="order-description">
        {order.description}
      </div>

      <div
        className="order-status"
        style={{ color: statusColor[order.status] }}
      >
        {order.status}
      </div>
    </div>
  );
}

export default OrderCard;
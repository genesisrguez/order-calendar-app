function OrderCard({ order }) {
  const locationColor =
    order.location === "Mesa" ? "#1d4ed8" : "#60a5fa";

  const statusColor = {
    Fabrication: "#dc2626",
    "on hold": "#f59e0b",
    Finished: "#16a34a",
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
        <strong>Invoice:</strong> {order.invoiceNumber}
      </div>

      <div className="order-row">
        <strong>Company:</strong> {order.companyName}
      </div>

      <div className="order-description">
        {order.productDescription}
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
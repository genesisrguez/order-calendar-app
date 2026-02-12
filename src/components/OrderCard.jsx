function OrderCard({ order }) {
  const locationColor =
    order.location === "Mesa" ? "#1d4ed8" : "#93c5fd";

  const statusColor = {
    Fabrication: "#dc2626",
    "on hold": "#f59e0b",
    Finished: "#16a34a",
  };

  return (
    <div
      className="order-card"
      style={{ borderLeft: `6px solid ${statusColor[order.status]}` }}
    >
      <div
        className="order-location"
        style={{ color: locationColor }}
      >
        {order.location}
      </div>

      <div><strong>Invoice:</strong> {order.invoiceNumber}</div>
      <div><strong>Company:</strong> {order.companyName}</div>
      <div>{order.productDescription}</div>

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
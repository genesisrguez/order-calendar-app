function OrderCard({ order }) {
  const locationColor =
    order.location === "Mesa" ? "#003366" : "#66a3ff";

  const statusColor = {
    Fabrication: "red",
    "on hold": "orange",
    Finished: "green",
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div style={{ color: locationColor, fontWeight: "bold" }}>
        {order.location}
      </div>

      <div>Invoice: {order.invoiceNumber}</div>
      <div>Company: {order.companyName}</div>
      <div>Description: {order.productDescription}</div>

      <div style={{ color: statusColor[order.status], fontWeight: "bold" }}>
        {order.status}
      </div>
    </div>
  );
}

export default OrderCard;
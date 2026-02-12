import { useState } from "react";
import "../styles/form.css";

function FormPage({ onSubmit }) {
  const [formData, setFormData] = useState({
    location: "",
    invoiceNumber: "",
    companyName: "",
    jobName: "",
    dateNeeded: "",
    deliveryTime: "",
    deliveryType: "",
    productDescription: "",
    orderForm: null,
    status: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "orderForm") {
      setFormData({ ...formData, orderForm: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      location: "",
      invoiceNumber: "",
      companyName: "",
      jobName: "",
      dateNeeded: "",
      deliveryTime: "",
      deliveryType: "",
      productDescription: "",
      orderForm: null,
      status: "",
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create New Order</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Location</label>
              <select name="location" value={formData.location} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Mesa">Mesa</option>
                <option value="Phoenix">Phoenix</option>
              </select>
            </div>

            <div className="form-group">
              <label>Invoice Number</label>
              <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Job Name</label>
              <input type="text" name="jobName" value={formData.jobName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Date Needed</label>
              <input type="date" name="dateNeeded" value={formData.dateNeeded} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Delivery Time</label>
              <select
  name="deliveryTime"
  value={formData.deliveryTime}
  onChange={handleChange}
  required
>
  <option value="">Select time</option>

  {Array.from({ length: 13 }, (_, i) => {
    const hour = i + 6;
    const formatted = hour.toString().padStart(2, "0") + ":00";

    return (
      <option key={hour} value={formatted}>
        {formatted}
      </option>
    );
  })}
</select>
            </div>

            <div className="form-group">
              <label>Delivery Type</label>
              <select name="deliveryType" value={formData.deliveryType} onChange={handleChange}>
                <option value="">Select</option>
                <option value="outside">Outside</option>
                <option value="location">Location</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Fabrication">Fabrication</option>
                <option value="on hold">On hold</option>
                <option value="Finished">Finished</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Product Description</label>
              <textarea
                name="productDescription"
                rows="3"
                value={formData.productDescription}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Order Form (jpg, png, pdf)</label>
              <input
                type="file"
                name="orderForm"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
                className="file-input"
              />
            </div>

          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormPage;
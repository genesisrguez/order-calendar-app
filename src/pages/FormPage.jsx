import { useState } from "react";

function FormPage({ onSubmit }) {
  const initialState = {
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
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Order</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Location</label>
          <select name="location" onChange={handleChange} required>
            <option value="">Select Location</option>
            <option value="Mesa">Mesa</option>
            <option value="Phoenix">Phoenix</option>
          </select>
        </div>

        <div>
          <input
            name="invoiceNumber"
            placeholder="Invoice Number"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            name="jobName"
            placeholder="Job Name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date Needed</label>
          <input
            type="date"
            name="dateNeeded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Delivery Time</label>
          <input
            type="time"
            name="deliveryTime"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Delivery Type</label>
          <select name="deliveryType" onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="outside">outside</option>
            <option value="location">location</option>
          </select>
        </div>

        <div>
          <input
            name="productDescription"
            placeholder="Product Description"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Order Form</label>
          <input
            type="file"
            name="orderForm"
            accept=".jpg,.png,.pdf"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status</label>
          <select name="status" onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Fabrication">Fabrication</option>
            <option value="on hold">on hold</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <br />

        <button type="submit">Enviar</button>
        <button type="button" onClick={handleReset}>
          Restablecer
        </button>
      </form>
    </div>
  );
}

export default FormPage;
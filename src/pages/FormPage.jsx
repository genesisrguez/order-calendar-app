import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/form.css";

function FormPage({ onSubmit }) {
  const [formData, setFormData] = useState({
    location: "",
    invoiceNumber: "",
    companyName: "",
    jobName: "",
    dateNeeded: "",
    dateOrdered: "",
    deliveryTime: "",
    status: "",
    productDescription: "",
    orderForm: null
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
  const newErrors = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (!value) newErrors[key] = "This field is required"; // ahora TODOS los campos, incluido orderForm
  });
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (submitting) return;

  setSuccessMessage("");
  setErrorMessage("");

  if (!validateForm()) {
    setErrorMessage("Please complete all required fields.");
    return;
  }

  setSubmitting(true);

  try {

    let orderUrl = null;

    if (formData.orderForm) {

      const fileName = `${Date.now()}-${formData.orderForm.name}`;

      const { error: uploadError } = await supabase.storage
        .from("order-forms")
        .upload(fileName, formData.orderForm);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("order-forms")
        .getPublicUrl(fileName);

      orderUrl = data.publicUrl;
    }

    let finalDeliveryTime = formData.deliveryTime;

    if (formData.deliveryTime === "ASAP") {

      const now = new Date();

      finalDeliveryTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");
    }

    const { error } = await supabase
      .from("orders")
      .insert([{
        location: formData.location,
        invoice_number: formData.invoiceNumber,
        company_name: formData.companyName,
        job_name: formData.jobName,
        date_ordered: formData.dateOrdered,
        date_needed_by: formData.dateNeeded,
        delivery_time: finalDeliveryTime,
        status: formData.status,
        description: formData.productDescription,
        order_url: orderUrl
      }]);

    if (error) throw error;

    setSuccessMessage("Order created successfully!");

    setFormData({
      location: "",
      invoiceNumber: "",
      companyName: "",
      jobName: "",
      dateNeeded: "",
      dateOrdered: "",
      deliveryTime: "",
      status: "",
      productDescription: "",
      orderForm: null
    });

    if (onSubmit) onSubmit();

    setTimeout(() => setSuccessMessage(""), 3000);

  } catch (err) {

    console.error(err);
    setErrorMessage("Error saving order.");

  } finally {

    setSubmitting(false);

  }
};

  const handleReset = () => {
    setFormData({
      location: "",
      invoiceNumber: "",
      companyName: "",
      jobName: "",
      dateNeeded: "",
      dateOrdered: "",
      deliveryTime: "",
      status: "",
      productDescription: "",
      orderForm: null
    });
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
  };

  const timeOptions = [
  "ASAP",
  ...Array.from({ length: 20 }, (_, i) => {
    const hour = 7 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? 0 : 30;

    const date = new Date();
    date.setHours(hour, minutes, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  })
];

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Create New Order</h2>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-banner">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Location</label>
              <select name="location" value={formData.location} onChange={handleChange} className={errors.location ? "input-error" : ""}>
                <option value="">Select</option>
                <option value="Mesa">Mesa</option>
                <option value="Phoenix">Phoenix</option>
              </select>
              {errors.location && <p className="error-text">{errors.location}</p>}
            </div>

            <div className="form-group">
              <label>Invoice Number</label>
              <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className={errors.invoiceNumber ? "input-error" : ""}/>
              {errors.invoiceNumber && <p className="error-text">{errors.invoiceNumber}</p>}
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={errors.companyName ? "input-error" : ""}/>
              {errors.companyName && <p className="error-text">{errors.companyName}</p>}
            </div>

            <div className="form-group">
              <label>Job Name</label>
              <input type="text" name="jobName" value={formData.jobName} onChange={handleChange} className={errors.jobName ? "input-error" : ""}/>
              {errors.jobName && <p className="error-text">{errors.jobName}</p>}
            </div>

            <div className="form-group">
              <label>Date Ordered</label>
              <input type="date" name="dateOrdered" value={formData.dateOrdered} onChange={handleChange} className={errors.dateOrdered ? "input-error" : ""}/>
              {errors.dateOrdered && <p className="error-text">{errors.dateOrdered}</p>}
            </div>

            <div className="form-group">
              <label>Date Needed By</label>
              <input type="date" name="dateNeeded" value={formData.dateNeeded} onChange={handleChange} className={errors.dateNeeded ? "input-error" : ""}/>
              {errors.dateNeeded && <p className="error-text">{errors.dateNeeded}</p>}
            </div>

            <div className="form-group">
              <label>Delivery Time</label>
              <select name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className={errors.deliveryTime ? "input-error" : ""}>
                <option value="">Select time</option>
                {timeOptions.map((t, i) => (
                  <option key={i} value={t}>
                    {t === "ASAP" ? "⚡ ASAP" : t}
                  </option>
                ))}
              </select>
              {errors.deliveryTime && <p className="error-text">{errors.deliveryTime}</p>}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={errors.status ? "input-error" : ""}>
                <option value="">Select</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Production">In Production</option>
                <option value="Ready">Ready</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && <p className="error-text">{errors.status}</p>}
            </div>

            <div className="form-group full-width">
              <label>Product Description</label>
              <textarea name="productDescription" rows="3" value={formData.productDescription} onChange={handleChange} className={errors.productDescription ? "input-error" : ""}/>
              {errors.productDescription && <p className="error-text">{errors.productDescription}</p>}
            </div>

            <div className="form-group full-width">
              <label>Order Form (jpg, png, pdf)</label>
              <input type="file" name="orderForm" accept=".jpg,.png,.pdf" onChange={handleChange} className={errors.orderForm ? "input-error" : ""} />
              {errors.orderForm && <p className="error-text">{errors.orderForm}</p>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
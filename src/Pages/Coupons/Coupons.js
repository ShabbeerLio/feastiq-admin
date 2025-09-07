import React, { useEffect, useState } from "react";
import Host from "../../Components/Host/Host";
import "./Coupons.css";
import { MdDelete, MdEdit } from "react-icons/md";

const CouponManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: "",
    type: "subscription",
    discount: "",
    status: "enable",
  });
  const [editId, setEditId] = useState(null);
  const openModal = () => {
    setForm({
    code: "",
    discount: "",
    type: "subscription",
    status: "enable",
  });
  setEditId(null);
  setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const res = await fetch(`${Host}/coupons`);
    const data = await res.json();
    setCoupons(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalOpen(false);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${Host}/coupons/${editId}` : `${Host}/coupons/create`;
    console.log(url, "url");

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data, "data");
      if (!res.ok) throw new Error(data.error);

      setForm({
        code: "",
        discount: "",
        type: "subscription",
        status: "enable",
      });
      setEditId(null);
      fetchCoupons();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (coupon) => {
    setModalOpen(true);
    setForm({
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      status: coupon.status,
    });
    setEditId(coupon._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    await fetch(`${Host}/coupons/${id}`, { method: "DELETE" });
    fetchCoupons();
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`${Host}/coupons/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchCoupons();
  };

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-button">
          <h3>Coupons</h3>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openModal()}
          >
            Add Coupon
          </button>
        </div>

        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.code}</td>
                  <td>{c.discount}%</td>
                  <td>{c.type}</td>
                  <td>
                    <div className="frm-input-box">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c._id, e.target.value)}
                      >
                        <option value="enable">Enable</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </td>
                  <td className="product-action">
                    <p onClick={() => handleEdit(c)}>
                      <MdEdit />
                    </p>
                    <p onClick={() => handleDelete(c._id)}>
                      <MdDelete />
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && (
        <>
          <div className="modal-container">
            <div className="modal-body">
              <div className="modal-header">
                <h2>{editId ? "Edit Coupon" : "Create Coupon"}</h2>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="frm-input-box">
                  <label htmlFor="code">Code:</label>
                  <input
                    name="code"
                    placeholder="Code"
                    value={form.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="frm-input-box">
                  <label htmlFor="discount">Discount:</label>
                  <input
                    name="discount"
                    type="number"
                    placeholder="Discount (%)"
                    value={form.discount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="frm-input-box">
                  <label htmlFor="planet_name">Type:</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
                <div className="frm-input-box">
                  <label htmlFor="planet_name">Status:</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="enable">Enable</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closeModal}
                  >
                    Cancle
                  </button>
                  <button type="submit" className="btn-primary">
                    {editId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
            <div
              className="modal-backdrop"
              onClick={closeModal}
              style={{ background: "#c1c1c179" }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CouponManager;

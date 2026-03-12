import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addMethod, deleteMethod } from "../../../Redux/slices/paymentSlice";
import Icon from "../../../components/AppIcon";

const PaymentMethodList = () => {
  const dispatch = useDispatch();
  // Pulling data from Redux store
  const { items: methods, loading, isSubmitting } = useSelector((state) => state.payments);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ channel_type: "", channel_id: "", account: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ channel_type: "", channel_id: "", account: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMethod(form)).then((result) => {
      if (!result.error) closeModal();
      else alert(result.payload);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this channel?")) {
      dispatch(deleteMethod(id));
    }
  };

  const getIcon = (type) => {
    const map = { mobile_money: "Smartphone", bank: "Landmark", paybill: "Receipt", till: "Store" };
    return map[type] || "Hash";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b bg-muted/20">
          <div>
            <h3 className="font-bold text-base">Payment Channels</h3>
            <p className="text-xs text-muted-foreground">Manage payout destinations via Redux</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/10">
            <Icon name="Plus" size={14} /> Add New
          </button>
        </div>

        {/* List Content */}
        <div className="p-5 space-y-3">
          {loading && methods.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground animate-pulse">Syncing with store...</div>
          ) : methods.length === 0 ? (
            <div className="py-8 text-center border border-dashed rounded-xl text-muted-foreground text-sm">No channels found.</div>
          ) : (
            methods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/5 transition-colors bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-primary">
                    <Icon name={getIcon(method.channel_type)} size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold capitalize">{method.channel_type.replace("_", " ")}</p>
                    <p className="text-xs text-muted-foreground font-mono">{method.channel_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">{method.account}</p>
                    <p className="text-[9px] text-muted-foreground mt-1 capitalize">{method.status}</p>
                  </div>
                  <button onClick={() => handleDelete(method.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all">
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Section (Abstracted for brevity) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-background w-full max-w-md rounded-2xl p-6 shadow-2xl border">
            <h3 className="text-lg font-bold mb-6">New Payment Channel</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select name="channel_type" value={form.channel_type} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm bg-muted/20 outline-none" required>
                <option value="">Select Category</option>
                <option value="bank">Bank Account</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="paybill">Paybill</option>
                <option value="till">Till Number</option>
              </select>
              <input name="channel_id" placeholder="Identifier (ID/Number)" value={form.channel_id} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm bg-muted/20 outline-none" required />
              <input name="account" placeholder="Account/Phone" value={form.account} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm bg-muted/20 outline-none" required />
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 text-sm font-bold border rounded-xl hover:bg-muted transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-xl disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Channel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodList;
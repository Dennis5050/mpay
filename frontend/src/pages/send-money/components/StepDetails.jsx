const StepDetails = ({ formData, setFormData }) => {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Enter Details</h2>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          className="w-full border rounded-lg p-3"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded-lg p-3"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default StepDetails;
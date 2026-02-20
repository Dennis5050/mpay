const StepReview = ({ formData }) => {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Review Transaction</h2>

      <div className="space-y-2 text-sm">
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>Method:</strong> {formData.method}</p>
        <p><strong>Amount:</strong> KES {formData.amount}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
      </div>
    </div>
  );
};

export default StepReview;
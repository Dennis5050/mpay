const StepMethod = ({ formData, setFormData }) => {
  const methods = ["Mobile Money", "Bank Transfer"];

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method}
            onClick={() => setFormData({ ...formData, method })}
            className={`w-full p-3 border rounded-lg text-left ${
              formData.method === method
                ? "border-primary bg-primary/5"
                : ""
            }`}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepMethod;
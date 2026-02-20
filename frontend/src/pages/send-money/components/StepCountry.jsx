const StepCountry = ({ formData, setFormData }) => {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold mb-4">Select Country</h2>

      <select
        className="w-full border rounded-lg p-3"
        value={formData.country}
        onChange={(e) =>
          setFormData({ ...formData, country: e.target.value })
        }
      >
        <option value="">Select country</option>
        <option value="Kenya">Kenya</option>
        <option value="Ghana">Ghana</option>
        <option value="Nigeria">Nigeria</option>
      </select>
    </div>
  );
};

export default StepCountry;
export default function PersonalInfoStep({ form, updateForm, next }) {
  const handleChange = (e) => {
    updateForm({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="input"
      />

      <input
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        className="input"
      />

      <input
        name="idNumber"
        placeholder="National ID Number"
        value={form.idNumber}
        onChange={handleChange}
        className="input"
      />

      <button onClick={next} className="btn-primary w-full">
        Continue
      </button>
    </div>
  );
}
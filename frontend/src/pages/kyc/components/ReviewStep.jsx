import { completeKYC } from "../../services/authService";

export default function ReviewStep({ form, back }) {

  const handleSubmit = async () => {
    try {
      await completeKYC(form);
      alert("KYC submitted successfully");
    } catch (err) {
      alert(err.message || "KYC submission failed");
    }
  };

  return (
    <div className="space-y-4">
      <p><strong>Name:</strong> {form.fullName}</p>
      <p><strong>ID:</strong> {form.idNumber}</p>

      <div className="flex gap-2">
        <button onClick={back} className="btn-secondary w-full">
          Back
        </button>

        <button onClick={handleSubmit} className="btn-primary w-full">
          Submit KYC
        </button>
      </div>
    </div>
  );
}
export default function ReviewStep({ form, back, submit }) {
  return (
    <div className="space-y-4">
      <p><strong>Name:</strong> {form.fullName}</p>
      <p><strong>ID:</strong> {form.idNumber}</p>

      <div className="flex gap-2">
        <button onClick={back} className="btn-secondary w-full">
          Back
        </button>
        <button onClick={submit} className="btn-primary w-full">
          Submit KYC
        </button>
      </div>
    </div>
  );
}
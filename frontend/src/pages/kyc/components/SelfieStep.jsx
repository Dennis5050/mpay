export default function SelfieStep({ updateForm, next, back }) {
  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateForm({ selfie: e.target.files[0] })}
      />

      <div className="flex gap-2">
        <button onClick={back} className="btn-secondary w-full">
          Back
        </button>
        <button onClick={next} className="btn-primary w-full">
          Continue
        </button>
      </div>
    </div>
  );
}
function FileInput({ label, onChange }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  );
}

export default function DocumentStep({ updateForm, next, back }) {
  return (
    <div className="space-y-4">
      <FileInput
        label="ID Front"
        onChange={(e) => updateForm({ idFront: e.target.files[0] })}
      />

      <FileInput
        label="ID Back"
        onChange={(e) => updateForm({ idBack: e.target.files[0] })}
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
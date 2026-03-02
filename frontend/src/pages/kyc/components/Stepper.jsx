export default function Stepper({ steps, current }) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium
            ${index <= current ? "bg-green-500 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </div>
          <p className="text-xs mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
}
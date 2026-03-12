import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  completeKYC,
  getCountries,
  getDashboardSummary,
} from "../../services/authService";

import {
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Globe,
  Calendar,
  FileText,
  CheckCircle2,
  X,
  MapPin,
  Camera,
  Info,
  Lock,
  UserCheck,
  CreditCard,
  ScanFace,
} from "lucide-react";

/* ----------------------------------------------------
   STEP INDICATOR
---------------------------------------------------- */

const Stepper = ({ currentStep }) => {
  const steps = [
    { label: "Profile", icon: UserCheck },
    { label: "Documents", icon: CreditCard },
    { label: "Security", icon: ScanFace },
  ];

  return (
    <div className="flex items-center justify-between mb-12 relative">

      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2" />

      {steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i <= currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all
                ${
                  isCurrent
                    ? "bg-[#A32A29] border-red-100 scale-110 shadow-lg"
                    : isActive
                    ? "bg-green-500 border-green-100"
                    : "bg-white border-slate-100 text-slate-400"
                }`}
            >
              {isActive && i < currentStep ? (
                <CheckCircle2 size={18} className="text-white" />
              ) : (
                <Icon size={18} className={isActive ? "text-white" : ""} />
              )}
            </div>

            <span
              className={`text-[10px] font-black uppercase tracking-tight ${
                isActive ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {s.label}
            </span>

          </div>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------
   INPUT COMPONENT
---------------------------------------------------- */

const Input = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-2">

    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {label}
    </label>

    <div className="relative">

      {Icon && (
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      )}

      <input
        {...props}
        className={`w-full border-2 rounded-xl py-4 pr-4 text-sm font-semibold outline-none
        ${Icon ? "pl-12" : "pl-4"}
        ${
          error
            ? "border-red-200 bg-red-50"
            : "border-slate-100 focus:border-[#A32A29]"
        }`}
      />

    </div>
  </div>
);

/* ----------------------------------------------------
   FILE UPLOAD
---------------------------------------------------- */

const FileUpload = ({ label, subtitle, value, onUpload, onClear }) => (
  <div className="space-y-3">

    <div>
      <p className="text-xs font-bold uppercase">{label}</p>
      <p className="text-[11px] text-slate-400">{subtitle}</p>
    </div>

    {!value ? (
      <div className="relative group">

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => onUpload(e.target.files[0])}
        />

        <div className="border-2 border-dashed border-slate-200 p-8 rounded-2xl text-center">

          <Camera className="mx-auto mb-2 text-slate-400" size={24} />

          <p className="text-xs font-bold text-slate-500">
            Tap to upload
          </p>

        </div>

      </div>
    ) : (
      <div className="flex items-center gap-4 border-2 border-green-200 p-4 rounded-xl">

        <CheckCircle2 className="text-green-500" />

        <span className="text-sm flex-1 truncate">
          {value.name}
        </span>

        <button onClick={onClear}>
          <X />
        </button>

      </div>
    )}
  </div>
);

/* ----------------------------------------------------
   MAIN PAGE
---------------------------------------------------- */

const KYCPage = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [kycStatus, setKycStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const [countries, setCountries] = useState([]);

  const [form, setForm] = useState({
    id_number: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    address_line: "",
    idFront: null,
    idBack: null,
    selfie: null,
  });

  /* ----------------------------------------------------
     CHECK KYC STATUS
  ---------------------------------------------------- */

  useEffect(() => {

    const checkStatus = async () => {

      try {

        const summary = await getDashboardSummary();

        const status = summary?.onboarding?.kyc_status;

        console.log("KYC STATUS:", status);

        setKycStatus(status);

        if (status === "verified") {
          navigate("/kyc/verified");
          return;
        }

        if (status === "pending") {
          navigate("/kyc/verified");
          return;
        }

      } catch (err) {
        console.error("KYC check failed:", err);
      } finally {
        setCheckingStatus(false);
      }

    };

    checkStatus();

    getCountries().then(setCountries);

  }, []);

  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking verification status...
      </div>
    );
  }

/* ----------------------------------------------------
   NAVIGATION
---------------------------------------------------- */

const handleNext = () => {

  if (step < 2) {
    setStep((s) => s + 1);
  }

};

const handleBack = () => {

  if (step > 0) {
    setStep((s) => s - 1);
  }

};


/* ----------------------------------------------------
   SUBMIT KYC
---------------------------------------------------- */

const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    const response = await completeKYC(form);

    console.log("KYC SUBMIT RESPONSE:", response);

    // After submitting KYC we fetch the updated status
    const summary = await getDashboardSummary();

    const status = summary?.onboarding?.kyc_status;

    console.log("UPDATED KYC STATUS:", status);

    if (status === "verified") {

      navigate("/kyc/verified");

    } else if (status === "pending") {

      navigate("/kyc/pending");

    } else {

      // fallback if backend returns something unexpected
      navigate("/dashboard");

    }

  } catch (err) {

    console.error("KYC submission failed:", err);

    alert(err.message || "Verification failed");

  } finally {

    setLoading(false);

  }

};
  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">

      {/* LEFT PANEL */}

      <div className="lg:w-[450px] bg-[#A32A29] text-white p-16">

        <div className="flex items-center gap-3 mb-16">
          <ShieldCheck size={24} />
          <span className="font-black text-xl">Vault Guard</span>
        </div>

        <h1 className="text-4xl font-black mb-4">
          Secure Your Account
        </h1>

        <p className="text-red-200">
          Identity verification keeps the platform secure.
        </p>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center p-10">

        <div className="max-w-xl w-full">

          <Stepper currentStep={step} />

          {kycStatus === "failed" && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 text-red-600 text-sm">
              Your previous verification failed. Please submit correct documents.
            </div>
          )}

          <div className="bg-white p-10 rounded-3xl shadow-xl">

            {step === 0 && (
              <div className="space-y-6">

                <Input
                  label="National ID"
                  icon={FileText}
                  value={form.id_number}
                  onChange={(e) =>
                    setForm({ ...form, id_number: e.target.value })
                  }
                />

                <Input
                  label="Date of Birth"
                  icon={Calendar}
                  type="date"
                  value={form.dob}
                  onChange={(e) =>
                    setForm({ ...form, dob: e.target.value })
                  }
                />

                <button
                  onClick={handleNext}
                  className="w-full bg-[#A32A29] text-white py-4 rounded-xl"
                >
                  Continue
                </button>

              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">

                <FileUpload
                  label="ID Front"
                  subtitle="Upload clear image"
                  value={form.idFront}
                  onUpload={(f) => setForm({ ...form, idFront: f })}
                  onClear={() => setForm({ ...form, idFront: null })}
                />

                <FileUpload
                  label="ID Back"
                  subtitle="Upload back side"
                  value={form.idBack}
                  onUpload={(f) => setForm({ ...form, idBack: f })}
                  onClear={() => setForm({ ...form, idBack: null })}
                />

                <div className="flex gap-4">
                  <button onClick={handleBack}>Back</button>
                  <button onClick={handleNext}>Next</button>
                </div>

              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">

                <FileUpload
                  label="Selfie"
                  subtitle="Take a selfie"
                  value={form.selfie}
                  onUpload={(f) => setForm({ ...form, selfie: f })}
                  onClear={() => setForm({ ...form, selfie: null })}
                />

                <div className="flex gap-4">
                  <button onClick={handleBack}>Back</button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-[#A32A29] text-white py-4 rounded-xl"
                  >
                    {loading ? "Submitting..." : "Submit Verification"}
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default KYCPage;
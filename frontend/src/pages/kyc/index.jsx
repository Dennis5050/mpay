import React, { useState, useEffect } from "react";
import { MemoryRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Globe,
  Quote,
  User,
  Calendar,
  FileText,
  Camera,
  CheckCircle2,
  AlertCircle,
  Clock,
  UploadCloud,
  X
} from "lucide-react";

/**
 * UI COMPONENTS
 */

const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="w-full space-y-1.5 text-left">
    {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/40">
          <Icon size={18} />
        </div>
      )}
      <input
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all outline-none focus:ring-4 focus:ring-emerald-500/10
          ${Icon ? 'pl-11' : ''}
          ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-emerald-600'}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
  </div>
);

const Button = ({ children, loading, variant = 'primary', fullWidth, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200",
    outline: "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    secondary: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`} disabled={loading} {...props}>
      {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : children}
    </button>
  );
};

const FileUpload = ({ label, description, value, onUpload, onClear, error }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    {!value ? (
      <div 
        onClick={() => onUpload()} 
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-400
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50/30'}`}
      >
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600">
          <UploadCloud size={24} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">Click to upload image</p>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    ) : (
      <div className="relative border-2 border-emerald-500 bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
          <CheckCircle2 size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold text-slate-900 truncate">Document_Captured.jpg</p>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Ready for submission</p>
        </div>
        <button onClick={onClear} className="p-2 hover:bg-emerald-100 rounded-full text-slate-400 transition-colors">
          <X size={18} />
        </button>
      </div>
    )}
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const Stepper = ({ steps, current }) => (
  <div className="flex items-center justify-between mb-12 w-full max-w-sm mx-auto">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <div className="flex flex-col items-center gap-2 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all
            ${idx < current ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 
              idx === current ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-500/10' : 
              'bg-slate-100 text-slate-400'}`}>
            {idx < current ? <CheckCircle2 size={18} /> : idx + 1}
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest
            ${idx <= current ? 'text-emerald-600' : 'text-slate-400'}`}>
            {step.split(" ")[0]}
          </span>
        </div>
        {idx !== steps.length - 1 && (
          <div className={`flex-1 h-0.5 mx-2 rounded-full transition-all duration-500
            ${idx < current ? 'bg-emerald-600' : 'bg-slate-100'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

/**
 * BRAND SIDEBAR
 */
const BrandSidebar = ({ quote, author, role }) => (
  <div className="hidden lg:flex lg:w-[40%] xl:w-[45%] bg-emerald-950 relative overflow-hidden flex-col p-16 justify-between border-l-8 border-emerald-900/30 shadow-2xl">
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 blur-[80px] rounded-full -ml-20 -mb-20" />
    
    <div className="relative z-10 space-y-12 text-left">
      <div className="flex items-center gap-3 text-emerald-400 opacity-50">
        <ShieldCheck size={32} />
        <div className="h-px w-12 bg-emerald-800" />
        <Globe size={24} />
      </div>
      
      <div className="space-y-8">
        <Quote className="text-emerald-500/30" size={64} fill="currentColor" />
        <h3 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
          {quote}
        </h3>
        
        <div className="flex items-center gap-5 pt-4">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 p-1">
            <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-xl uppercase">
              {author.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <p className="text-white font-black text-lg">{author}</p>
            <p className="text-emerald-400/60 font-bold uppercase tracking-widest text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="relative z-10 pt-10 flex gap-6 opacity-30">
      <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest font-black"><Lock size={12}/> BANK GRADE</div>
      <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest font-black"><ShieldCheck size={12}/> DATA PROTECTION</div>
    </div>
  </div>
);

/**
 * KYC PENDING PAGE
 */
const KYCPending = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-12 text-center border border-slate-100">
        <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Clock size={48} className="text-emerald-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Verification Pending</h1>
        <p className="text-slate-500 font-medium leading-relaxed mb-10">
          We've received your documents. Our team usually reviews applications within <span className="text-emerald-600 font-bold">2-4 hours</span>.
        </p>
        <Button variant="primary" fullWidth onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

/**
 * MAIN KYC FLOW COMPONENT
 */
const KYCContent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    idNumber: "",
    idFront: null,
    idBack: null,
    selfie: null,
  });

  const steps = ["Personal Info", "Documents", "Selfie", "Review"];

  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!form.dob) newErrors.dob = "Date of birth is required";
      if (!form.idNumber) newErrors.idNumber = "ID number is required";
    } else if (step === 1) {
      if (!form.idFront) newErrors.idFront = "Front of ID is required";
      if (!form.idBack) newErrors.idBack = "Back of ID is required";
    } else if (step === 2) {
      if (!form.selfie) newErrors.selfie = "Selfie is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API logic
    await new Promise((r) => setTimeout(r, 2000));
    
    localStorage.setItem("kycStatus", "pending");
    localStorage.setItem("kycData", JSON.stringify({
      fullName: form.fullName,
      idNumber: form.idNumber,
      submittedAt: new Date().toISOString(),
    }));

    setLoading(false);
    navigate("/kyc/pending");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-slate-900">
      
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:px-16 xl:px-24">
        {/* Branding Header */}
        <div className="mb-12 flex justify-between items-center">
          <div className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200">M</div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">MPay Africa</h1>
            </div>
            <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-10">Verification</p>
          </div>
        </div>

        <div className="max-w-xl w-full mx-auto lg:mx-0 flex-1 flex flex-col pb-12">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Identity Verification</h2>
            <p className="text-slate-500 text-lg font-medium mt-3">
              Secure your account by completing our KYC process.
            </p>
          </header>

          <Stepper steps={steps} current={step} />

          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
            {step === 0 && (
              <div className="space-y-6">
                <Input label="Full Legal Name" icon={User} placeholder="As it appears on ID" value={form.fullName} onChange={(e) => updateForm({ fullName: e.target.value })} error={errors.fullName} />
                <Input label="Date of Birth" type="date" icon={Calendar} value={form.dob} onChange={(e) => updateForm({ dob: e.target.value })} error={errors.dob} />
                <Input label="National ID / Passport Number" icon={FileText} placeholder="Enter number" value={form.idNumber} onChange={(e) => updateForm({ idNumber: e.target.value })} error={errors.idNumber} />
                <div className="pt-6">
                  <Button fullWidth onClick={handleNext}>Continue <ChevronRight size={18} className="ml-2" /></Button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <FileUpload label="ID Card (Front)" description="Ensure the photo is clear and readable" value={form.idFront} onUpload={() => updateForm({ idFront: true })} onClear={() => updateForm({ idFront: null })} error={errors.idFront} />
                <FileUpload label="ID Card (Back)" description="Capture the full reverse side" value={form.idBack} onUpload={() => updateForm({ idBack: true })} onClear={() => updateForm({ idBack: null })} error={errors.idBack} />
                <div className="pt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft size={18} /></Button>
                  <Button fullWidth onClick={handleNext}>Continue <ChevronRight size={18} className="ml-2" /></Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-emerald-50/50 p-6 rounded-2xl border-2 border-emerald-100 flex items-center gap-4 mb-4">
                  <Camera size={32} className="text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 text-left">Face Verification</p>
                    <p className="text-xs text-slate-500 mt-1 text-left">Look straight into the camera in a well-lit area.</p>
                  </div>
                </div>
                <FileUpload label="Your Selfie" description="PNG, JPG allowed. Max 5MB" value={form.selfie} onUpload={() => updateForm({ selfie: true })} onClear={() => updateForm({ selfie: null })} error={errors.selfie} />
                <div className="pt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft size={18} /></Button>
                  <Button fullWidth onClick={handleNext}>Continue <ChevronRight size={18} className="ml-2" /></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Info size={14} /> Review Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</p>
                      <p className="text-sm font-bold text-slate-900">{form.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Number</p>
                      <p className="text-sm font-bold text-slate-900">{form.idNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase">Documents Uploaded</span>
                    </div>
                    <div className="flex-1 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase">Selfie Verified</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft size={18} /></Button>
                  <Button fullWidth loading={loading} onClick={handleSubmit}>Submit for Verification</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-auto pt-10 text-center text-slate-400 text-xs font-bold tracking-wide uppercase">
          &copy; {new Date().getFullYear()} MPAY AFRICA LIMITED. SECURED BY ENCRYPTION.
        </p>
      </div>

      <BrandSidebar 
        quote="Compliance is the cornerstone of global scale. Our verification process ensures every user is safe." 
        author="Sarah Odhiambo" 
        role="MPay Africa • Compliance Officer" 
      />
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KYCContent />} />
        <Route path="/kyc/pending" element={<KYCPending />} />
      </Routes>
    </Router>
  );
}
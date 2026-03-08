import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeKYC } from "../../services/authService";
import { 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Globe,
  User,
  Calendar,
  FileText,
  Camera,
  CheckCircle2,
  UploadCloud,
  X,
  MapPin,
  Lock
} from "lucide-react";

/**
 * REUSABLE UI COMPONENTS (Equity Polished Style)
 */
const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="w-full space-y-1.5 text-left">
    {label && <label className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</label>}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        className={`w-full rounded-lg border bg-slate-50/50 px-4 py-3.5 text-sm font-semibold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-[#A32A29]/5
          ${Icon ? 'pl-11' : ''}
          ${error ? 'border-red-500' : 'border-slate-200 focus:border-[#A32A29]'}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-600 mt-1 font-bold">{error}</p>}
  </div>
);

const Button = ({ children, loading, variant = 'primary', fullWidth, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-4 text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  const variants = {
    primary: "bg-[#A32A29] text-white hover:bg-[#8e2423] shadow-lg shadow-red-900/10",
    outline: "border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`} disabled={loading} {...props}>
      {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : children}
    </button>
  );
};

const FileUpload = ({ label, description, value, onUpload, onClear, error }) => (
  <div className="space-y-2">
    <label className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</label>
    {!value ? (
      <div 
        onClick={() => onUpload()} 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:bg-slate-50
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <UploadCloud size={24} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-slate-900">Click to capture or upload</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{description}</p>
        </div>
      </div>
    ) : (
      <div className="relative border-2 border-[#A32A29] bg-red-50/30 rounded-xl p-4 flex items-center gap-4 animate-in zoom-in-95">
        <div className="w-10 h-10 bg-[#A32A29] rounded-lg flex items-center justify-center text-white">
          <CheckCircle2 size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight">Image_Captured.jpg</p>
          <p className="text-[10px] text-[#A32A29] font-black uppercase tracking-widest">Ready for analysis</p>
        </div>
        <button onClick={onClear} className="p-2 hover:bg-red-100 rounded-full text-[#A32A29] transition-colors">
          <X size={18} />
        </button>
      </div>
    )}
  </div>
);

const Stepper = ({ current }) => {
  const steps = ["Details", "Documents", "Selfie", "Review"];
  return (
    <div className="flex items-center justify-between mb-12 w-full max-w-md mx-auto">
      {steps.map((s, idx) => (
        <div key={idx} className={`flex items-center ${idx !== steps.length - 1 ? 'flex-1' : ''}`}>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-500
              ${idx <= current ? 'bg-[#A32A29] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
              {idx < current ? <CheckCircle2 size={16} /> : idx + 1}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${idx <= current ? 'text-[#A32A29]' : 'text-slate-400'}`}>
              {s}
            </span>
          </div>
          {idx !== steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-700 ${idx < current ? 'bg-[#A32A29]' : 'bg-slate-100'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * MAIN KYC PAGE
 */
const KYCPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id_number: "12345678",
    dob: "1995-06-12",
    city: "Nairobi",
    state: "Nairobi",
    country: "KE",
    address_line: "Westlands, Nairobi",
    idFront: null,
    idBack: null,
    selfie: null
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    await completeKYC(form);

    navigate("/kyc/pending");

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans selection:bg-[#A32A29] selection:text-white">
      {/* FORM SECTION */}
      <div className="flex-1 px-6 py-10 lg:px-20 flex flex-col overflow-y-auto">
        
        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#A32A29] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-900/20">M</div>
            <div>
               <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">MPay Africa</h1>
               <p className="text-[10px] font-bold text-[#A32A29] uppercase tracking-[0.3em] mt-1">Identity Hub</p>
            </div>
          </div>
        </div>

        <div className="max-w-xl w-full mx-auto lg:mx-0 flex-1">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Identity Verification</h2>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">
              To comply with financial regulations and secure your account, please complete the verification process.
            </p>
          </div>
          
          <Stepper current={step} />

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="National ID Number" value={form.id_number} onChange={(e) => setForm({...form, id_number: e.target.value})} icon={FileText} />
                <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm({...form, dob: e.target.value})} icon={Calendar} />
                <div className="md:col-span-2">
                  <Input label="Residential Address" value={form.address_line} onChange={(e) => setForm({...form, address_line: e.target.value})} icon={MapPin} />
                </div>
                <Input label="City" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
                <Input label="Country Code" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} icon={Globe} />
                <div className="md:col-span-2 pt-6">
                  <Button fullWidth onClick={() => setStep(1)}>Continue <ChevronRight size={16} className="ml-2"/></Button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <FileUpload label="Identification (Front)" description="Clear photo of the front side" onUpload={() => setForm({...form, idFront: true})} value={form.idFront} onClear={() => setForm({...form, idFront: null})} />
                <FileUpload label="Identification (Back)" description="Clear photo of the reverse side" onUpload={() => setForm({...form, idBack: true})} value={form.idBack} onClear={() => setForm({...form, idBack: null})} />
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft size={18}/></Button>
                  <Button fullWidth onClick={() => setStep(2)}>Next Step <ChevronRight size={16} className="ml-2"/></Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded-2xl flex flex-col items-center text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#A32A29]/20 blur-3xl rounded-full" />
                   <Camera size={48} className="text-[#A32A29] mb-4 relative z-10" />
                   <p className="font-black uppercase tracking-widest text-xs relative z-10">Liveness Detection</p>
                   <p className="text-slate-400 text-[11px] mt-2 relative z-10">Look directly at the camera in a bright room.</p>
                </div>
                <FileUpload label="Your Selfie" description="Portrait photo with clear face" onUpload={() => setForm({...form, selfie: true})} value={form.selfie} onClear={() => setForm({...form, selfie: null})} />
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft size={18}/></Button>
                  <Button fullWidth onClick={() => setStep(3)}>Final Review <ChevronRight size={16} className="ml-2"/></Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                 <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                       <ShieldCheck size={20} className="text-[#A32A29]" />
                       <h4 className="text-xs font-black uppercase text-slate-900 tracking-widest">Verification Summary</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-y-6 text-sm">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">ID Number</p>
                        <p className="font-bold text-slate-900 mt-1">{form.id_number}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Location</p>
                        <p className="font-bold text-slate-900 mt-1">{form.city}, {form.country}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-black uppercase text-slate-400">Address</p>
                        <p className="font-bold text-slate-900 mt-1">{form.address_line}</p>
                      </div>
                    </div>
                 </div>
                 <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft size={18}/></Button>
                  <Button fullWidth loading={loading} onClick={handleSubmit}>Submit for Approval</Button>
                 </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="mt-auto pt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center lg:text-left">
          © {new Date().getFullYear()} MPay Africa Limited • Regulated Financial Institution
        </p>
      </div>

      {/* BRANDING SIDEBAR */}
      <div className="hidden lg:flex lg:w-1/3 bg-slate-900 p-16 text-white flex-col justify-between relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#A32A29]/10 blur-[100px] rounded-full -mr-20 -mt-20" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A32A29]/5 blur-[80px] rounded-full -ml-20 -mb-20" />

         <div className="relative z-10">
           <Lock size={40} className="text-[#A32A29] mb-10" />
           <h3 className="text-4xl font-black mb-6 leading-tight tracking-tighter">Mpay-Africa <br/>Security.</h3>
           <p className="text-slate-400 leading-relaxed font-medium text-lg">
             We use end-to-end encryption to ensure your sensitive documents never fall into the wrong hands.
           </p>
         </div>

         <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 opacity-50">
               <div className="h-px w-8 bg-white"/>
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Secure Session</span>
            </div>
            <p className="text-[11px] text-slate-500 font-bold uppercase">SSL Encrypted • GDPR Compliant • PCI-DSS</p>
         </div>
      </div>
    </div>
  );
};

export default KYCPage;
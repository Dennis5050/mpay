import React, { useState, useEffect } from "react";
import { 
  User, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Globe,
  Quote,
  PartyPopper,
  AlertCircle,
  X
} from "lucide-react";
import { getCountries, register } from "../../services/authService";

/**
 * REUSABLE UI COMPONENTS
 */

const ErrorAlert = ({ message, onReset, onClose }) => (
  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300 relative">
    <div className="flex items-start gap-3">
      <div className="p-1 bg-red-100 rounded-full text-red-600">
        <AlertCircle size={16} />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-red-800">Registration Issue</h4>
        <p className="text-xs text-red-700 mt-1 leading-relaxed">{message}</p>
        {onReset && (
          <button 
            type="button"
            onClick={onReset}
            className="mt-3 text-xs font-black uppercase tracking-widest text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={12} /> Try a different email or account type
          </button>
        )}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-400 hover:text-red-600 transition-colors">
          <X size={16} />
        </button>
      )}
    </div>
  </div>
);

const Input = ({ label, error, isErrorField, icon: Icon, ...props }) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-sm font-semibold text-[#5C2D25]">{label}</label>}
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A32638]/40">
          <Icon size={18} />
        </div>
      )}
      <input
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all outline-none focus:ring-4 focus:ring-[#A32638]/10
          ${Icon ? 'pl-11' : ''}
          ${(error || isErrorField) ? 'border-red-500 bg-red-50/30 focus:border-red-500' : 'border-slate-200 focus:border-[#A32638]'}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
  </div>
);

const Button = ({ children, loading, variant = 'primary', fullWidth, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  const variants = {
    primary: "bg-[#A32638] text-white hover:bg-[#8B1F2F] shadow-lg shadow-[#A32638]/20",
    outline: "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : children}
    </button>
  );
};

const Checkbox = ({ label, error, ...props }) => (
  <div className="space-y-1">
    <label className="flex items-start gap-3 cursor-pointer group">
      <input 
        type="checkbox" 
        className="mt-1 h-5 w-5 rounded border-slate-300 text-[#A32638] focus:ring-[#A32638] transition-all cursor-pointer" 
        {...props} 
      />
      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
        {label}
      </span>
    </label>
    {error && <p className="text-xs text-red-500 ml-8 font-medium">{error}</p>}
  </div>
);

const UserTypeCard = ({ type, title, isSelected, onSelect }) => (
  <div 
    onClick={() => onSelect(type)}
    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 hover:shadow-md
      ${isSelected ? 'border-[#A32638] bg-[#A32638]/5 ring-4 ring-[#A32638]/10' : 'border-slate-100 bg-white'}`}
  >
    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-[#A32638] text-white' : 'bg-slate-100 text-[#A32638]'}`}>
      {type === 'personal' ? <User size={24} /> : <Briefcase size={24} />}
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5 font-medium">
        {type === 'personal' ? 'For individual transfers & bills' : 'For business payments & invoicing'}
      </p>
    </div>
    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all
      ${isSelected ? 'border-[#A32638] bg-[#A32638]' : 'border-slate-200'}`}>
      {isSelected && <CheckCircle2 size={16} className="text-white" />}
    </div>
  </div>
);

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;
  const strength = password.length > 8 ? (password.match(/[A-Z]/) && password.match(/[0-9]/) ? 3 : 2) : 1;
  const colors = ['bg-slate-200', 'bg-red-500', 'bg-[#FFB612]', 'bg-green-600'];
  const labels = ['', 'Weak', 'Moderate', 'Strong'];
  
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 transition-all duration-500 ${i <= strength ? colors[strength] : 'bg-transparent'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${strength === 3 ? 'text-green-600' : strength === 2 ? 'text-[#FFB612]' : 'text-red-600'}`}>
        Password: {labels[strength]}
      </p>
    </div>
  );
};

const PhoneInput = ({ countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange, error, isErrorField, countries }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
    <div className="flex gap-2">
      <select 
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className={`w-28 rounded-xl border bg-white px-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#A32638]/10 focus:border-[#A32638] 
          ${isErrorField ? 'border-red-500' : 'border-slate-200'}`}
      >
        {countries.map((c) => (
          <option key={c.country_code} value={c.phone_prefix}>
            {c.country_code} ({c.phone_prefix})
          </option>
        ))}
      </select>
      <div className="flex-1">
        <Input 
          type="tel" 
          placeholder="712 345 678" 
          value={phoneNumber} 
          onChange={(e) => onPhoneNumberChange(e.target.value)} 
          error={error}
          isErrorField={isErrorField}
        />
      </div>
    </div>
  </div>
);

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);

  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    businessName: "",
    contactPerson: "",
    businessStreetNumber: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessWebsite: "",
    countryCode: "+254",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, countryCode: data[0].phone_prefix }));
        }
      } catch (err) {
        console.error("Countries fetch failed:", err);
      }
    };
    fetchCountries();
  }, []);

  const validateStep1 = () => {
    if (!formData.userType) {
      setErrors({ userType: "Please select an account type" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.userType === "personal") {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    } else {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
      if (!formData.businessAddress.trim()) newErrors.businessAddress = "Address is required";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone is required";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 6) newErrors.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords mismatch";
    if (!formData.agreeTerms) newErrors.agreement = "Please accept policies";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateStep2()) return;

  setLoading(true);

  try {

    const payload = {
      account_type: formData.userType,
      name: formData.userType === "personal"
        ? formData.fullName
        : formData.businessName,
      email: formData.email,
      phone: `${formData.countryCode}${formData.phoneNumber}`,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    };

    await register(payload);

    // move to success step
    setStep(3);

  } catch (err) {
    console.error("Register error:", err);

    setErrors({
      api: err.message || "Registration failed"
    });

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-slate-900">
      
      {/* LEFT COLUMN: FORM AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:px-16 xl:px-24">
        
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-[#A32638] rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-[#A32638]/20">M</div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">MPay Africa</h1>
              </div>
              <p className="text-[#A32638] text-[10px] font-bold uppercase tracking-[0.2em] ml-10">Global Payments</p>
            </div>
            {step < 3 && (
              <div className="flex gap-2.5 pt-2">
                <div className={`h-2.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#A32638]' : 'bg-slate-100'}`} />
                <div className={`h-2.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#A32638]' : 'bg-slate-100'}`} />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {step === 1 ? "Start your journey" : step === 2 ? "Account details" : "Welcome aboard!"}
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-md">
              {step === 1 ? "Choose how you want to use MPay." : 
               step === 2 ? "Fill in your information to get started." : 
               "Your account has been created successfully."}
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="grid grid-cols-1 gap-4">
              <UserTypeCard
                type="personal"
                title="Personal Account"
                isSelected={formData.userType === "personal"}
                onSelect={(type) => setFormData({ ...formData, userType: type })}
              />
              <UserTypeCard
                type="business"
                title="Business Account"
                isSelected={formData.userType === "business"}
                onSelect={(type) => setFormData({ ...formData, userType: type })}
              />
            </div>
            {errors.userType && <p className="text-sm text-red-500 font-bold">{errors.userType}</p>}
            <div className="pt-8">
              <Button fullWidth onClick={() => validateStep1() && setStep(2)}>
                Continue <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-7 animate-in fade-in slide-in-from-right-6 duration-700 pb-12">
            <button 
              type="button"
              onClick={() => { setErrors({}); setStep(1); }}
              className="flex items-center text-sm font-bold text-[#A32638] hover:text-[#8B1F2F] transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" /> Change account type
            </button>

            {errors.api && (
              <ErrorAlert 
                message={errors.api} 
                onClose={() => setErrors({})}
                onReset={errors.isConflict ? () => { setErrors({}); setStep(1); } : null} 
              />
            )}

            <div className="grid grid-cols-1 gap-6">
              {formData.userType === "personal" ? (
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  isErrorField={errors.errorField === 'name'}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  error={errors.fullName}
                />
              ) : (
                <div className="space-y-6">
                  <Input label="Business Name" placeholder="Enter registered name" value={formData.businessName} isErrorField={errors.errorField === 'name'} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} error={errors.businessName} />
                  <Input label="Contact Person" placeholder="Full name of representative" value={formData.contactPerson} isErrorField={errors.errorField === 'contact_person'} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} error={errors.contactPerson} />
                  
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Business Address</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1"><Input label="St No." placeholder="109" value={formData.businessStreetNumber} onChange={(e) => setFormData({ ...formData, businessStreetNumber: e.target.value })} /></div>
                      <div className="col-span-3"><Input label="Street" placeholder="Rehoboth Avenue" value={formData.businessAddress} isErrorField={errors.errorField === 'business_address'} onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })} error={errors.businessAddress} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="City" placeholder="City" value={formData.businessCity} onChange={(e) => setFormData({ ...formData, businessCity: e.target.value })} />
                      <Input label="State" placeholder="State" value={formData.businessState} onChange={(e) => setFormData({ ...formData, businessState: e.target.value })} />
                    </div>
                    <Input label="Website" icon={Globe} placeholder="https://..." value={formData.businessWebsite} isErrorField={errors.errorField === 'business_website'} onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhoneInput 
                  countries={countries} 
                  countryCode={formData.countryCode} 
                  phoneNumber={formData.phoneNumber} 
                  isErrorField={errors.errorField === 'phone'}
                  onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })} 
                  onPhoneNumberChange={(num) => setFormData({ ...formData, phoneNumber: num })} 
                  error={errors.phoneNumber} 
                />
                <Input 
                  label="Email Address" 
                  icon={Mail} 
                  type="email" 
                  placeholder="name@email.com" 
                  value={formData.email} 
                  isErrorField={errors.errorField === 'email'}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  error={errors.email} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <Input label="Password" type="password" placeholder="••••••••" value={formData.password} isErrorField={errors.errorField === 'password'} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} />
                  <PasswordStrengthIndicator password={formData.password} />
                </div>
                <Input label="Confirm Password" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} error={errors.confirmPassword} />
              </div>

              <Checkbox label="I agree to the Terms of Service and Privacy Policy" checked={formData.agreeTerms} onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })} error={errors.agreement} />
            </div>

            <Button type="submit" loading={loading} fullWidth>Complete Registration</Button>
          </form>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-xl shadow-green-100">
              <PartyPopper size={48} />
            </div>
            <h3 className="text-2xl font-black">Registration Complete!</h3>
            <p className="text-slate-500 max-w-sm">
              We've sent a verification code to <span className="font-bold text-slate-900">{formData.email}</span>. Please check your inbox to activate your account.
            </p>
            <div className="pt-6 w-full max-w-xs space-y-3">
              <Button fullWidth onClick={() => window.location.href = '/verify'}>Verify Account</Button>
              <Button variant="outline" fullWidth onClick={() => setStep(1)}>Back to Start</Button>
            </div>
          </div>
        )}

        <p className="mt-auto pt-10 text-center text-slate-400 text-xs font-bold tracking-wide uppercase">
          &copy; {new Date().getFullYear()} MPAY AFRICA LIMITED. SECURED BY ENCRYPTION.
        </p>
      </div>

      {/* RIGHT COLUMN: BRAND SIDEBAR */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[45%] bg-[#5C2D25] relative overflow-hidden flex-col p-16 justify-between border-l-8 border-[#A32638]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A32638]/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-3 text-[#FFB612] opacity-50">
             <ShieldCheck size={32} />
             <div className="h-px w-12 bg-[#A32638]" />
             <Globe size={24} />
          </div>
          <div className="space-y-8">
            <Quote className="text-[#A32638]/30" size={64} fill="currentColor" />
            <h3 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
              "Switching to MPay was like moving from a prehistoric system to something from the <span className="text-[#FFB612]">future</span>."
            </h3>
            <div className="flex items-center gap-5 pt-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#A32638]/20 p-1">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-[#5C2D25] font-bold text-xl">JD</div>
              </div>
              <div>
                <p className="text-white font-black text-lg">Dennis Chumba</p>
                <p className="text-[#FFB612]/60 font-bold uppercase tracking-widest text-xs">MPay Global CEO</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-48 w-full mt-12 bg-[#A32638]/10 rounded-3xl border border-[#A32638]/30 flex items-end justify-center p-8 overflow-hidden">
          <div className="flex gap-1.5 items-end">
            {[40, 60, 30, 80, 50, 90, 45, 70, 55, 85].map((h, i) => (
              <div key={i} className="w-4 bg-[#FFB612]/20 rounded-t-lg transition-all duration-1000 hover:bg-[#FFB612]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="absolute top-4 left-4 text-[10px] font-black text-[#FFB612]/40 uppercase tracking-[0.3em]">Live Insights</p>
        </div>
      </div>
    </div>
  );
}
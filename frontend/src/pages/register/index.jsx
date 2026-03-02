import React, { useState } from "react";
import { 
  User, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Globe,
  Quote
} from "lucide-react";

/**
 * UI COMPONENTS (Consolidated for single-file mandate)
 */

const Input = ({ label, error, icon: Icon, ...props }) => (
  <div className="w-full space-y-1.5">
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
    ghost: "text-slate-600 hover:bg-slate-100"
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
        className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer" 
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
      ${isSelected ? 'border-emerald-600 bg-emerald-50/50 ring-4 ring-emerald-500/10' : 'border-slate-100 bg-white'}`}
  >
    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-emerald-600'}`}>
      {type === 'personal' ? <User size={24} /> : <Briefcase size={24} />}
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5 font-medium">
        {type === 'personal' ? 'For individual transfers & bills' : 'For business payments & invoicing'}
      </p>
    </div>
    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all
      ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-200'}`}>
      {isSelected && <CheckCircle2 size={16} className="text-white" />}
    </div>
  </div>
);

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;
  const strength = password.length > 8 ? (password.match(/[A-Z]/) && password.match(/[0-9]/) ? 3 : 2) : 1;
  const colors = ['bg-slate-200', 'bg-red-500', 'bg-yellow-500', 'bg-emerald-500'];
  const labels = ['', 'Weak', 'Moderate', 'Strong'];
  
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 transition-all duration-500 ${i <= strength ? colors[strength] : 'bg-transparent'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${strength === 3 ? 'text-emerald-600' : strength === 2 ? 'text-yellow-600' : 'text-red-600'}`}>
        Password: {labels[strength]}
      </p>
    </div>
  );
};

const PhoneInput = ({ countryCode, phoneNumber, onCountryCodeChange, onPhoneNumberChange, error }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
    <div className="flex gap-2">
      <select 
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className="w-28 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
      >
        <option value="+254">KE (+254)</option>
        <option value="+256">UG (+256)</option>
        <option value="+255">TZ (+255)</option>
        <option value="+1">US (+1)</option>
      </select>
      <div className="flex-1">
        <Input 
          type="tel" 
          placeholder="712 345 678" 
          value={phoneNumber} 
          onChange={(e) => onPhoneNumberChange(e.target.value)} 
          error={error}
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
    country: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

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
    }
    if (formData.userType === "business") {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
      if (!formData.businessStreetNumber.trim()) newErrors.businessStreetNumber = "Street No. is required";
      if (!formData.businessAddress.trim()) newErrors.businessAddress = "Address is required";
      if (!formData.businessCity.trim()) newErrors.businessCity = "City is required";
      if (!formData.businessState.trim()) newErrors.businessState = "State is required";
      if (!formData.businessWebsite.trim()) newErrors.businessWebsite = "Website is required";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone required";
    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mismatch";
    if (!formData.country) newErrors.country = "Select country";
    if (!formData.agreeTerms || !formData.agreePrivacy) newErrors.agreement = "Please accept policies";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Registration Successful!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-slate-900">
      
      {/* LEFT COLUMN: FORM AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:px-16 xl:px-24">
        
        {/* Progress Header Section - Adapted to Theme */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200">M</div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">MPay Africa</h1>
              </div>
              <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-10">Global Payments</p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <div className={`h-2.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-emerald-600 shadow-md shadow-emerald-100' : 'bg-slate-100'}`} />
              <div className={`h-2.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-emerald-600 shadow-md shadow-emerald-100' : 'bg-slate-100'}`} />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {step === 1 ? "Start your journey" : "Account details"}
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-md">
              {step === 1 
                ? "Choose how you want to use MPay. You can always change this later." 
                : "Fill in your information to get started with Africa's safest wallet."}
            </p>
          </div>
        </div>

        {/* STEP 1: ACCOUNT SELECTION */}
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

        {/* STEP 2: FULL FORM */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-7 animate-in fade-in slide-in-from-right-6 duration-700 pb-12">
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" /> Change account type
            </button>

            {/* Social Auth Mocks from layout reference */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 border-2 border-slate-100 rounded-xl py-3 hover:bg-slate-50 transition-colors font-bold text-sm">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 border-2 border-slate-100 rounded-xl py-3 hover:bg-slate-50 transition-colors font-bold text-sm">
                <Globe size={16} className="text-blue-500" /> Microsoft
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase font-black tracking-widest"><span className="bg-white px-4 text-slate-300">Or use email</span></div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {formData.userType === "personal" ? (
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  error={errors.fullName}
                />
              ) : (
                <>
                  <Input
                    label="Business Name"
                    placeholder="Enter registered name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    error={errors.businessName}
                  />
                  
                  <div className="p-6 bg-slate-50/50 rounded-2xl border-2 border-slate-100 space-y-5">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Globe size={14} /> Location & Website
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <Input label="Street No." placeholder="109" value={formData.businessStreetNumber} onChange={(e) => setFormData({ ...formData, businessStreetNumber: e.target.value })} error={errors.businessStreetNumber} />
                      </div>
                      <div className="md:col-span-3">
                        <Input label="Street Address" placeholder="Rehoboth Avenue" value={formData.businessAddress} onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })} error={errors.businessAddress} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="City" placeholder="Rehoboth Beach" value={formData.businessCity} onChange={(e) => setFormData({ ...formData, businessCity: e.target.value })} error={errors.businessCity} />
                      <Input label="State / Province" placeholder="Delaware" value={formData.businessState} onChange={(e) => setFormData({ ...formData, businessState: e.target.value })} error={errors.businessState} />
                    </div>
                    <Input label="Website" icon={Globe} placeholder="https://yourbusiness.com" value={formData.businessWebsite} onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })} error={errors.businessWebsite} />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhoneInput
                  countryCode={formData.countryCode}
                  phoneNumber={formData.phoneNumber}
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={errors.password}
                  />
                  <PasswordStrengthIndicator password={formData.password} />
                </div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Country of Residence</label>
                <select 
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                >
                  <option value="">Select country...</option>
                  <option value="kenya">Kenya</option>
                  <option value="uganda">Uganda</option>
                  <option value="usa">United States</option>
                </select>
                {errors.country && <p className="text-xs text-red-500 font-bold mt-1">{errors.country}</p>}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Checkbox
                  label="I agree to the Terms of Service and Merchant Privacy Policy"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked, agreePrivacy: e.target.checked })}
                  error={errors.agreement}
                />
              </div>
            </div>

            <Button type="submit" loading={loading} fullWidth>
              Complete Registration
            </Button>
          </form>
        )}

        {/* FOOTER */}
        <p className="mt-auto pt-10 text-center text-slate-400 text-xs font-bold tracking-wide">
          &copy; {new Date().getFullYear()} MPAY AFRICA LIMITED. SECURED BY ENCRYPTION.
        </p>
      </div>

      {/* RIGHT COLUMN: BRAND SIDEBAR */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[45%] bg-emerald-950 relative overflow-hidden flex-col p-16 justify-between border-l-8 border-emerald-900/30">
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/5 blur-[80px] rounded-full -ml-20 -mb-20" />
        
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-3 text-emerald-400 opacity-50">
             <ShieldCheck size={32} />
             <div className="h-px w-12 bg-emerald-800" />
             <Globe size={24} />
          </div>
          
          <div className="space-y-8">
            <Quote className="text-emerald-500/30" size={64} fill="currentColor" />
            <h3 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
              "Switching to MPay was like moving from a prehistoric system to something from the <span className="text-emerald-400">future</span>."
            </h3>
            
            <div className="flex items-center gap-5 pt-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 p-1">
                <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-xl">JD</div>
              </div>
              <div>
                <p className="text-white font-black text-lg">Jenny Dutton</p>
                <p className="text-emerald-400/60 font-bold uppercase tracking-widest text-xs">Greystone Wines • CFO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Illustration Area at bottom */}
        <div className="relative h-48 w-full mt-12 bg-emerald-900/20 rounded-3xl border border-emerald-800/30 flex items-end justify-center p-8 overflow-hidden">
          <div className="flex gap-1.5 items-end">
            {[40, 60, 30, 80, 50, 90, 45, 70, 55, 85].map((h, i) => (
              <div 
                key={i} 
                className="w-4 bg-emerald-500/20 rounded-t-lg transition-all duration-1000 hover:bg-emerald-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="absolute top-4 left-4 text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">Transaction Insights</p>
        </div>

        {/* Compliance Footer */}
        <div className="relative z-10 pt-10 flex gap-6 opacity-30">
          <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest"><Lock size={12}/> PCI DSS</div>
          <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest"><ShieldCheck size={12}/> 256-BIT SSL</div>
        </div>
      </div>
    </div>
  );
}
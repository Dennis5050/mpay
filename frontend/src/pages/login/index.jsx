import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearAuthError } from "../../Redux/slices/authSlice";

import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ChevronRight, 
  Info,
  Globe,
  Quote,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
  Wallet 
} from "lucide-react";

/**
 * UI COMPONENTS (Equity Bank Theme: Maroon, Gold, Slate)
 */

const Input = ({ label, error, icon: Icon, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-bold text-slate-800 tracking-tight">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full rounded-lg border bg-white px-4 py-3.5 text-sm font-medium transition-all outline-none focus:ring-4 focus:ring-red-900/5
            ${Icon ? 'pl-12' : ''}
            ${isPassword ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-red-900'}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-900 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1 font-bold flex items-center gap-1">
        <Info size={12} /> {error}
      </p>}
    </div>
  );
};

const Button = ({ children, loading, variant = 'primary', fullWidth, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-4 text-sm font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99] uppercase tracking-wider";
  const variants = {
    primary: "bg-[#A32A29] text-white hover:bg-[#821f1e] shadow-md hover:shadow-lg shadow-red-900/20",
    outline: "border-2 border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
    ghost: "text-red-900 hover:bg-red-50 font-bold"
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

const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center">
      <input 
        type="checkbox" 
        className="peer h-5 w-5 rounded border-slate-300 text-[#A32A29] focus:ring-[#A32A29] transition-all cursor-pointer appearance-none border-2 checked:bg-[#A32A29] checked:border-[#A32A29]" 
        {...props} 
      />
      <CheckCircle2 size={12} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
    </div>
    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors font-semibold">
      {label}
    </span>
  </label>
);

/**
 * MAIN LOGIN COMPONENT
 */
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab state from Redux
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [localErrors, setLocalErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });



  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Please enter your password";

    setLocalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Dispatch the Redux action
    const resultAction = await dispatch(loginUser({ 
      email: formData.email, 
      password: formData.password 
    }));

    // Handle navigation on success
    if (loginUser.fulfilled.match(resultAction)) {
      const data = resultAction.payload;
      if (data.onboarding_step === 1) {
        navigate("/dashboard");
      } else if (data.onboarding_step === 2) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFDFD] font-sans text-slate-900">
      
      {/* LEFT COLUMN: FORM AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:px-16 xl:px-24">
        
        {/* Branding Header */}
        <div className="mb-16 flex justify-between items-center">
          <div className="group cursor-pointer">
            <div className="flex items-center gap-0 mb-1">
              <div className="w-10 h-10 bg-[#A32A29] rounded-sm flex items-center justify-center text-white font-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#B3995D] opacity-40"></div>
                <span className="relative z-10 text-xl tracking-tighter">M</span>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-black tracking-tighter text-[#A32A29] leading-none uppercase">MPay Africa</h1>
                <div className="h-1 w-full bg-[#B3995D] mt-1 opacity-80"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-200 pr-3">Verified Portal</span>
              <ShieldCheck size={18} className="text-[#B3995D]" />
          </div>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center pb-12">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Identity Access</h2>
            <p className="text-slate-500 text-lg font-medium mt-4">
              Authorized access for MPay Africa business and personal accounts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Registered Email"
              icon={Mail}
              type="email"
              placeholder="mpay@gmail"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (error) dispatch(clearAuthError());
              }}
              error={localErrors.email}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-800">Secure Password</label>
              </div>
              <Input
                icon={Lock}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (error) dispatch(clearAuthError());
                }}
                error={localErrors.password}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <Checkbox 
                label="Remember this profile" 
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <button 
                type="button" 
                className="text-xs font-black text-[#A32A29] hover:underline uppercase tracking-tighter"
                onClick={() => navigate('/reset-password')}
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" loading={loading} fullWidth>
              Log In to MPay <ChevronRight size={18} className="ml-2" />
            </Button>
       <p className="text-center text-sm text-slate-500 mt-4">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="font-bold text-[#A32638] hover:underline"
  >
    Register here
  </Link>
</p>
            {/* Global Error Display */}
            {error && (
              <p className="text-center text-sm font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </p>
            )}
          </form>

          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
               <Wallet size={20} className="text-[#B3995D]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 italic leading-snug">
                Manage your cross-border transactions and liquidity through the secure MPay infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 opacity-60">
          <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase text-center sm:text-left">
            &copy; {new Date().getFullYear()} MPAY AFRICA. A LICENSED PAYMENT GATEWAY.
          </p>
          <div className="flex gap-6 grayscale opacity-50">
             <ShieldCheck size={16} />
             <Lock size={16} />
             <Building2 size={16} />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: BRAND SIDEBAR */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[45%] bg-[#A32A29] relative overflow-hidden flex-col p-16 justify-between">
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-black/10 rounded-full -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-[#B3995D] text-white text-[10px] font-black tracking-[0.3em] uppercase rounded-sm">MPay Infrastructure</div>
              <div className="h-px w-24 bg-white/20" />
          </div>
          
          <div className="space-y-10">
            <Quote className="text-[#B3995D] opacity-40" size={80} fill="currentColor" />
            <h3 className="text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tighter">
              The Hub of <br/><span className="text-[#B3995D]">African</span> Payments.
            </h3>
            
            <div className="flex flex-col gap-6 pt-8">
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#B3995D] transition-colors">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest">Global Wallet</h4>
                    <p className="text-white/60 text-sm font-medium">Hold and transfer multiple currencies instantly.</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#B3995D] transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest">Compliance First</h4>
                    <p className="text-white/60 text-sm font-medium">Secure, regulated, and audited financial pipelines.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
           <div className="w-full h-2 bg-[#B3995D] mb-8" />
           <div className="flex justify-between items-end">
             <div>
                <p className="text-white font-black text-2xl tracking-tighter uppercase leading-tight">Real-time settlement <br/> for all partners.</p>
             </div>
             <div className="flex gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-6 bg-white/20 rounded-full" />
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
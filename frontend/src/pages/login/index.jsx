import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  Info,
  Globe,
  Quote,
  Eye,
  EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

/**
 * UI COMPONENTS (Consolidated for single-file mandate)
 */

const Input = ({ label, error, icon: Icon, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;



  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/40">
            <Icon size={18} />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all outline-none focus:ring-4 focus:ring-emerald-500/10
            ${Icon ? 'pl-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-emerald-600'}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
};

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

const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input 
      type="checkbox" 
      className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer" 
      {...props} 
    />
    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors leading-tight font-medium">
      {label}
    </span>
  </label>
);

/**
 * MAIN LOGIN COMPONENT
 */
export default function App() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mock token check (simulating useEffect from provided snippet)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Simulate API Call
    setTimeout(async () => {
      setLoading(false);
      await login(formData.email, formData.password);

      // Navigate after successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans text-slate-900">
      
      {/* LEFT COLUMN: FORM AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:px-16 xl:px-24">
        
        {/* Branding Header */}
        <div className="mb-12 flex justify-between items-center">
          <div className="group cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200">M</div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">MPay Africa</h1>
            </div>
            <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-10">Secure Gateway</p>
          </div>
          <div className="hidden sm:block">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" /> Secure Login
             </span>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center pb-12">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-lg font-medium mt-3">
              Enter your credentials to access your global wallet.
            </p>
          </div>

          {/* Social Auth Mocks */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="flex items-center justify-center gap-3 border-2 border-slate-100 rounded-xl py-3 hover:bg-slate-50 transition-colors font-bold text-sm">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-3 border-2 border-slate-100 rounded-xl py-3 hover:bg-slate-50 transition-colors font-bold text-sm">
              <Globe size={16} className="text-blue-500" /> Microsoft
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
              <span className="bg-white px-4 text-slate-300 font-bold">Or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot Password?</a>
              </div>
              <Input
                icon={Lock}
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />
            </div>

            <Checkbox 
              label="Keep me signed in on this device" 
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            />

            <Button type="submit" loading={loading} fullWidth>
              Sign In <ChevronRight size={20} className="ml-2" />
            </Button>
          </form>

          <p className="mt-8 text-center lg:text-left text-slate-500 font-medium">
            New to MPay Africa? <a href="#" className="text-emerald-600 font-black hover:underline">Create an account</a>
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 opacity-50">
          <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase text-center sm:text-left">
            &copy; {new Date().getFullYear()} MPAY AFRICA LIMITED.
          </p>
          <div className="flex gap-4">
             <ShieldCheck size={16} />
             <Lock size={16} />
             <Globe size={16} />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: BRAND SIDEBAR (Matches Register Page) */}
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
              "The security and speed of MPay have transformed how we handle <span className="text-emerald-400">cross-border</span> payments."
            </h3>
            
            <div className="flex items-center gap-5 pt-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 p-1">
                <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-xl uppercase">AC</div>
              </div>
              <div>
                <p className="text-white font-black text-lg">Alex Chen</p>
                <p className="text-emerald-400/60 font-bold uppercase tracking-widest text-xs">TechFrontier • CEO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Illustration Area */}
        <div className="relative h-48 w-full mt-12 bg-emerald-900/20 rounded-3xl border border-emerald-800/30 flex items-end justify-center p-8 overflow-hidden">
          <div className="flex gap-1.5 items-end">
            {[30, 45, 65, 40, 85, 95, 60, 75, 50, 40].map((h, i) => (
              <div 
                key={i} 
                className="w-4 bg-emerald-500/20 rounded-t-lg transition-all duration-1000 hover:bg-emerald-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="absolute top-4 left-4 text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">Network Uptime 99.9%</p>
        </div>

        {/* Compliance Footer */}
        <div className="relative z-10 pt-10 flex gap-6 opacity-30">
          <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest font-black"><Lock size={12}/> PCI DSS</div>
          <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest font-black"><ShieldCheck size={12}/> 256-BIT SSL</div>
        </div>
      </div>
    </div>
  );
}
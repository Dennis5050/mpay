import React from 'react';

const ApiSettings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">API Settings</h1>
        <p className="text-slate-500 text-sm">Manage your integration keys and webhooks.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm">
          <strong>Note:</strong> Keep your Secret Keys safe. Do not share them in public repositories.
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Public Key</label>
            <div className="flex space-x-2">
              <input readOnly value="pk_live_51M..." className="flex-1 bg-slate-50 p-3 rounded-xl border-none text-slate-600 font-mono text-sm" />
              <button className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-200">Copy</button>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Secret Key</label>
            <div className="flex space-x-2">
              <input readOnly type="password" value="sk_live_••••••••" className="flex-1 bg-slate-50 p-3 rounded-xl border-none text-slate-600 font-mono text-sm" />
              <button className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-600 hover:bg-slate-200">Reveal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
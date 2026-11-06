import React from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl transition-all animate-fade-in ${
              isSuccess 
                ? 'bg-slate-900/90 border-teal-500/40 text-white shadow-teal-500/10' 
                : isError
                ? 'bg-slate-900/90 border-rose-500/40 text-white shadow-rose-500/10'
                : 'bg-slate-900/90 border-slate-700 text-white'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs leading-relaxed">
              {toast.title && <p className="font-bold mb-0.5">{toast.title}</p>}
              <p className="text-slate-300">{toast.message}</p>
            </div>

            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
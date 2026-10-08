import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Trash2, Info, AlertTriangle, X } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0 pointer-events-none"
      id="toast-notifications-portal"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            onDismiss={onDismiss} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { id, message, type, duration = 3500 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-slate-900/95 border-emerald-500/30 shadow-emerald-950/15',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          accentBar: 'bg-emerald-500',
          titleColor: 'text-emerald-400'
        };
      case 'warning':
        return {
          bg: 'bg-slate-900/95 border-rose-500/30 shadow-rose-950/15',
          icon: <Trash2 className="w-5 h-5 text-rose-400 shrink-0" />,
          accentBar: 'bg-rose-500',
          titleColor: 'text-rose-400'
        };
      case 'error':
        return {
          bg: 'bg-slate-900/95 border-rose-600/40 shadow-rose-950/25',
          icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
          accentBar: 'bg-rose-600',
          titleColor: 'text-rose-500'
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-900/95 border-indigo-500/30 shadow-indigo-950/15',
          icon: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
          accentBar: 'bg-indigo-500',
          titleColor: 'text-indigo-400'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      whileHover={{ scale: 1.01 }}
      className={`pointer-events-auto relative overflow-hidden flex items-start gap-3.5 p-4 rounded-xl border ${styles.bg} shadow-lg backdrop-blur-md transition-all duration-200 select-none`}
      id={`toast-item-${id}`}
    >
      {/* Left indicator accent line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.accentBar}`}></div>

      {/* Icon */}
      <div className="pt-0.5">
        {styles.icon}
      </div>

      {/* Message and info */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="text-[11px] text-slate-400 leading-relaxed font-medium break-words">
          {message}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => onDismiss(id)}
        className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 rounded-lg hover:bg-slate-800/60 cursor-pointer shrink-0"
        title="Dismiss Notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

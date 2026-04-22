"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Target, DollarSign, Info, Trash2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useState } from "react";

export default function NotificationDropdown() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Mission Intelligence", body: "An elite agent has proposed to your 'SEO Dominance' mission.", time: "2m ago", type: "mission", read: false },
    { id: 2, title: "Market Pulse Alert", body: "A new strategic inquiry for 'Arabic Content Architecture' was just broadcasted.", time: "45m ago", type: "system", read: false },
    { id: 3, title: "Transaction Authorized", body: "Milestone payment for 'Social Strike' has been released to your ledger.", time: "1h ago", type: "payment", read: true },
    { id: 4, title: "ROI Anomaly", body: "A 40% growth spike detected in your active Real Estate Ads campaign.", time: "2h ago", type: "mission", read: true },
    { id: 5, title: "Nexus Boost", body: "Your expert profile visibility was increased by 25% due to high engagement.", time: "5h ago", type: "system", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors relative group"
      >
        <Bell className={`w-5 h-5 ${unreadCount > 0 ? "text-secondary animate-pulse" : "text-slate-300"}`} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-[#020617]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-16 right-0 w-80 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-3xl z-[70] overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <span className="text-xs font-black uppercase tracking-widest text-white">{t('dashboard')} Alerts</span>
                <button 
                  onClick={markAllRead}
                  className="text-[10px] text-secondary font-bold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors relative ${!n.read ? 'bg-secondary/5' : ''}`}>
                      {!n.read && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-secondary" />}
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.type === 'mission' ? 'bg-secondary/10 text-secondary' : n.type === 'payment' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {n.type === 'mission' ? <Target className="w-4 h-4" /> : n.type === 'payment' ? <DollarSign className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-white mb-0.5 truncate">{n.title}</h5>
                          <p className="text-[11px] text-slate-400 leading-tight mb-1 line-clamp-2">{n.body}</p>
                          <span className="text-[9px] font-black uppercase text-slate-600 tracking-tighter">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <CheckCircle2 className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                    <p className="text-xs font-medium text-slate-500">No active alerts</p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 text-center bg-white/5">
                  <button 
                    onClick={clearAll}
                    className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <Trash2 className="w-3 h-3" /> Purge Feed
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

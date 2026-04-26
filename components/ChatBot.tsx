"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Zap, Send, X, 
  ChevronLeft, Users, ShieldCheck, 
  ArrowLeft, Search, Clock, Bot,
  Sparkles, BrainCircuit, Globe
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useLanguage } from "./LanguageContext";
import { useToast } from "./ToastContext";

interface Participant {
  id: string;
  name: string;
  role: string;
  profileImage?: string;
}

interface Conversation {
  id: string;
  participants: Participant[];
  updatedAt: string;
  messages: any[];
}

export default function ChatBot() {
  const { data: session } = useSession();
  const { t, lang } = useLanguage();
  const { showToast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeHub, setActiveHub] = useState<'ai' | 'messages'>('ai');
  const [view, setView] = useState<'inbox' | 'chat'>('inbox');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [aiMessages, setAiMessages] = useState<any[]>([
    { role: 'assistant', content: lang === 'ar' ? 'مرحباً! أنا مساعدك الاستراتيجي في تاسك ميديا. كيف يمكنني مساعدتك اليوم؟' : 'Welcome! I am your Task Media Strategic Assistant. How can I facilitate your growth today?' }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = async (e: any) => {
      const participantId = e.detail?.userId;
      if (!participantId) return;
      
      setIsOpen(true);
      setActiveHub('messages');
      
      if (!session) {
        // Mock conversation for testing without login
        const mockConvo = {
          id: `mock_convo_${Date.now()}`,
          participants: [
            { id: "me", name: "أنا", role: "CLIENT" },
            { id: participantId, name: "الخبير الاستراتيجي", role: "MARKETER" }
          ],
          updatedAt: new Date().toISOString(),
          messages: [
            {
              id: "msg_1",
              content: "مرحباً، كيف يمكنني مساعدتك في مشروعك القادم؟",
              senderId: participantId,
              createdAt: new Date().toISOString(),
            }
          ]
        };
        setActiveConvo(mockConvo);
        setMessages(mockConvo.messages);
        setView('chat');
        return;
      }
      
      setLoading(true);
      try {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ participantId })
        });
        const convo = await res.json();
        
        if (!res.ok || convo.error || !convo.id) {
           showToast(convo.error || "فشل في بدء المحادثة", "error");
           return;
        }

        await fetchConversations();
        setActiveConvo(convo);
        setView('chat');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('openChatWith', handleOpenChat);
    return () => window.removeEventListener('openChatWith', handleOpenChat);
  }, [session]);

  useEffect(() => {
    if (isOpen && activeHub === 'messages' && session) {
      fetchConversations();
    }
  }, [isOpen, activeHub, session]);

  useEffect(() => {
    if (activeConvo && activeHub === 'messages') {
      fetchMessages(activeConvo.id);
      const interval = setInterval(() => fetchMessages(activeConvo.id), 5000);
      return () => clearInterval(interval);
    }
  }, [activeConvo, activeHub]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeHub]);

  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
    }
  }, [aiMessages]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      if (Array.isArray(data)) {
        setConversations(data);
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.error(error);
      setConversations([]);
    }
  };

  const fetchMessages = async (convoId: string) => {
    try {
      const res = await fetch(`/api/messages?conversationId=${convoId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(error);
      setMessages([]);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    if (activeHub === 'ai') {
      const userMsg = { role: 'user', content: inputText };
      setAiMessages(prev => [...prev, userMsg]);
      setInputText("");
      
      // Simulated AI response
      setTimeout(() => {
        setAiMessages(prev => [...prev, { 
          role: 'assistant', 
          content: lang === 'ar' ? 'سأقوم بمراجعة طلبك فوراً والتواصل مع القسم المختص.' : 'Analyzing your request. I will synchronize this with our strategic protocols immediately.' 
        }]);
      }, 1000);
      return;
    }

    if (!activeConvo) return;
    
    if (!session) {
      // Mock interaction without login
      const tempMsg = {
        id: "temp-" + Date.now(),
        content: inputText,
        senderId: "me",
        createdAt: new Date().toISOString(),
        sender: { name: "أنا" }
      };
      setMessages(prev => [...prev, tempMsg]);
      setInputText("");
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: "reply-" + Date.now(),
          content: "شكراً لتواصلك. (هذه محادثة تجريبية، يرجى تسجيل الدخول لحفظ المحادثات).",
          senderId: activeConvo.participants[1].id,
          createdAt: new Date().toISOString(),
          sender: { name: activeConvo.participants[1].name }
        }]);
      }, 1000);
      return;
    }

    const tempMsg = {
      id: "temp-" + Date.now(),
      content: inputText,
      senderId: (session.user as any).id,
      createdAt: new Date().toISOString(),
      sender: { name: session.user.name }
    };

    setMessages(prev => [...prev, tempMsg]);
    setInputText("");

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeConvo.id,
          content: tempMsg.content
        })
      });
      fetchMessages(activeConvo.id);
    } catch (error) {
      showToast("Transmission failed", "error");
    }
  };

  const openConversation = (convo: Conversation) => {
    setActiveConvo(convo);
    setView('chat');
  };

  const getPartner = (convo: Conversation) => {
    if (!convo || !Array.isArray(convo.participants)) {
      return { id: "unknown", name: "مستخدم", role: "USER" };
    }
    const currentUserId = (session?.user as any)?.id || "me";
    return convo.participants.find(p => p.id !== currentUserId) || convo.participants[0] || { id: "unknown", name: "مستخدم", role: "USER" };
  };

  const handleHubSwitch = (hub: 'ai' | 'messages') => {
    if (!session && hub === 'messages') {
      showToast("Secure login required for direct messaging", "info");
      return;
    }
    setActiveHub(hub);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            className="fixed bottom-28 right-4 sm:bottom-32 sm:right-10 w-[calc(100vw-2rem)] sm:w-[420px] z-[205] bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-4xl overflow-hidden flex flex-col h-[600px] max-h-[75vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-secondary/10 to-accent/10 flex items-center justify-between">
              {activeHub === 'ai' ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-lg shadow-accent/20">
                     <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">المساعد الذكي لتاسك ميديا</h4>
                    <span className="text-[9px] font-black uppercase text-accent tracking-widest leading-none">ذكاء استراتيجي</span>
                  </div>
                </div>
              ) : view === 'chat' ? (
                <div className="flex items-center gap-4">
                   <button onClick={() => setView('inbox')} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <ChevronLeft className="w-5 h-5 text-slate-400 rotate-180 rtl:rotate-0" />
                   </button>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center relative">
                         {getPartner(activeConvo!)?.profileImage ? (
                           <img src={getPartner(activeConvo!)?.profileImage} className="w-full h-full object-cover rounded-xl" />
                         ) : (
                           <Users className="w-5 h-5 text-secondary" />
                         )}
                         <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-white">{getPartner(activeConvo!)?.name}</h4>
                         <p className="text-[10px] font-black uppercase text-secondary tracking-widest leading-none">
                            {getPartner(activeConvo!)?.role === 'ADMIN' ? 'القيادة الاستراتيجية' : 'قناة نشطة'}
                         </p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                     <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">المراسلة المباشرة</h4>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{conversations.length} محادثات نشطة</span>
                  </div>
                </div>
              )}
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col relative bg-slate-950/20">
              {activeHub === 'ai' ? (
                <div className="flex-1 flex flex-col h-full">
                  <div ref={aiScrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {aiMessages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-accent/20 border border-accent/30 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'}`}>
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-white/5 bg-slate-900/40">
                    <form onSubmit={handleSendMessage} className="relative">
                      <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="اسأل المساعد الذكي..."
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pr-6 pl-14 text-sm text-white focus:outline-none focus:border-accent transition-all shadow-inner"
                      />
                      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ) : view === 'inbox' ? (
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                   {conversations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-12 space-y-4">
                         <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-600">
                            <MessageSquare className="w-8 h-8" />
                         </div>
                         <p className="text-slate-400 font-bold text-sm">لا توجد قنوات نشطة. ابدأ استشارة للبدء.</p>
                      </div>
                   ) : (
                     conversations.map((convo) => (
                       <button
                         key={convo.id}
                         onClick={() => openConversation(convo)}
                         className="w-full p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-secondary/30 hover:bg-white/10 transition-all flex items-center gap-4 text-left group rtl:text-right"
                       >
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 shrink-0 relative overflow-hidden">
                             {getPartner(convo)?.profileImage ? (
                               <img src={getPartner(convo).profileImage} className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center font-black text-white">
                                  {getPartner(convo)?.name.charAt(0)}
                               </div>
                             )}
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-0.5">
                                <span className="text-sm font-black text-white truncate">{getPartner(convo)?.name}</span>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{new Date(convo.updatedAt).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}</span>
                             </div>
                             <p className="text-xs text-slate-500 truncate font-medium">
                                {convo.messages[0]?.content || 'انقر لبدء المحادثة...'}
                             </p>
                          </div>
                       </button>
                     ))
                   )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-full">
                   <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                      {messages.map((m, i) => {
                        const isMe = m.senderId === (session?.user as any)?.id;
                        return (
                          <motion.div 
                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
                             animate={{ opacity: 1, y: 0, scale: 1 }}
                             key={m.id || i}
                             className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                             <div className={`max-w-[85%] group`}>
                                <div className={`px-5 py-4 rounded-[1.8rem] text-sm font-medium leading-relaxed ${isMe ? 'bg-secondary text-white rounded-tl-none shadow-xl shadow-secondary/10' : 'bg-white/5 border border-white/10 text-slate-200 rounded-tr-none'}`}>
                                   {m.content}
                                </div>
                                <div className={`mt-2 flex items-center gap-2 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">
                                      أُرسل • {new Date(m.createdAt).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                                   </span>
                                </div>
                             </div>
                          </motion.div>
                        );
                      })}
                   </div>

                   <div className="p-6 bg-slate-900/60 border-t border-white/5">
                      <form onSubmit={handleSendMessage} className="relative group">
                         <input 
                           type="text" 
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           placeholder="اكتب رسالة..." 
                           className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pr-6 pl-14 text-sm text-white focus:outline-none focus:border-secondary transition-all shadow-inner"
                         />
                         <button 
                           type="submit"
                           className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                         >
                            <Send className="w-4 h-4 rotate-180 rtl:rotate-0" />
                         </button>
                      </form>
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stacked Vertical Buttons */}
      <div className="flex flex-col gap-4">
        {/* AI Button - Top */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isOpen && activeHub === 'ai') setIsOpen(false);
            else handleHubSwitch('ai');
          }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-white shadow-3xl transition-all border border-white/10 ${isOpen && activeHub === 'ai' ? 'ring-4 ring-accent/30' : ''}`}
        >
          <Bot className="w-7 h-7" />
        </motion.button>

        {/* Messaging Button - Bottom */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isOpen && activeHub === 'messages') setIsOpen(false);
            else handleHubSwitch('messages');
          }}
          className={`w-16 h-16 rounded-[1.8rem] bg-gradient-to-br from-secondary to-blue-500 flex items-center justify-center text-white shadow-4xl relative z-[201] border border-white/10 ${isOpen && activeHub === 'messages' ? 'ring-4 ring-secondary/30' : ''}`}
        >
          <MessageSquare className="w-8 h-8" />
          {conversations.length > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full border-[3px] border-[#020617] flex items-center justify-center">
               <span className="text-[10px] font-black text-white">{conversations.length}</span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}

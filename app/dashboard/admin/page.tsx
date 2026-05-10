"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BarChart3, Settings, ShieldCheck,
  MessageSquare, Layers, TrendingUp, Search,
  Filter, Download, ChevronRight, Activity, DollarSign, Menu, X, Clock, CheckCircle, Bell, LifeBuoy
} from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useToast } from "@/components/ToastContext";

type AdminTab = "overview" | "users" | "tasks" | "finances" | "tickets" | "system";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<any[]>([]);
  const [userFilter, setUserFilter] = useState<"ALL" | "CLIENT" | "MARKETER" | "PENDING">("ALL");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [messagingUser, setMessagingUser] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "طلب انضمام جديد: طارق زياد", time: "منذ 10 دقائق", unread: true },
    { id: 2, text: "تم سداد دفعة مشروع: العليان", time: "منذ ساعتين", unread: true },
    { id: 3, text: "تذكرة دعم جديدة من: أحمد حسن", time: "منذ 4 ساعات", unread: false },
  ]);
  const [tickets, setTickets] = useState([
    { id: "t1", user: "أحمد حسن", role: "MARKETER", subject: "مشكلة في سحب الرصيد", status: "OPEN", priority: "HIGH", date: new Date().toLocaleDateString('ar-EG') },
    { id: "t2", user: "شركة النور للبرمجيات", role: "CLIENT", subject: "طلب تعديل على العقد", status: "IN_PROGRESS", priority: "MEDIUM", date: new Date(Date.now() - 86400000).toLocaleDateString('ar-EG') },
    { id: "t3", user: "ليلى عبدالرحمن", role: "PENDING", subject: "استفسار عن موعد التفعيل", status: "CLOSED", priority: "LOW", date: new Date(Date.now() - 172800000).toLocaleDateString('ar-EG') },
    { id: "t4", user: "محمود سعيد", role: "MARKETER", subject: "تأخر العميل في الرد", status: "OPEN", priority: "MEDIUM", date: new Date(Date.now() - 200000000).toLocaleDateString('ar-EG') },
    { id: "t5", user: "مجموعة العليان التجارية", role: "CLIENT", subject: "طلب فاتورة ضريبية", status: "CLOSED", priority: "LOW", date: new Date(Date.now() - 300000000).toLocaleDateString('ar-EG') },
    { id: "t6", user: "عمر خالد", role: "PENDING", subject: "كيف أضيف نماذج أعمالي؟", status: "IN_PROGRESS", priority: "LOW", date: new Date(Date.now() - 400000000).toLocaleDateString('ar-EG') },
    { id: "t7", user: "شركة الأفق للاستثمار", role: "CLIENT", subject: "الاستفسار عن خدمات الـ SEO", status: "OPEN", priority: "MEDIUM", date: new Date(Date.now() - 500000000).toLocaleDateString('ar-EG') },
    { id: "t8", user: "سمير عادل", role: "MARKETER", subject: "اعتراض على تقييم العميل", status: "OPEN", priority: "HIGH", date: new Date(Date.now() - 600000000).toLocaleDateString('ar-EG') },
    { id: "t9", user: "متجر الهدايا الذكية", role: "CLIENT", subject: "عدم ظهور إعلاناتي", status: "IN_PROGRESS", priority: "HIGH", date: new Date(Date.now() - 700000000).toLocaleDateString('ar-EG') },
  ]);
  const { showToast } = useToast();
  const { data: session } = useSession();

  const stats = [
    { label: "إجمالي المستخدمين", value: usersList.length > 0 ? usersList.length : "2,481", trend: "+12%", icon: <Users className="w-5 h-5" />, color: "from-blue-500 to-cyan-400" },
    { label: "المشاريع النشطة", value: "142", trend: "+5%", icon: <Layers className="w-5 h-5" />, color: "from-orange-500 to-amber-400" },
    { label: "إجمالي الإيرادات", value: "$42.5k", trend: "+18%", icon: <Activity className="w-5 h-5" />, color: "from-emerald-500 to-teal-400" },
    { label: "طلبات انضمام (معلقة)", value: usersList.filter(u => u.role === "PENDING").length.toString(), trend: "قيد المراجعة", icon: <Clock className="w-5 h-5" />, color: "from-rose-500 to-pink-400" },
  ];

  useEffect(() => {
    if (activeTab === "finances") {
      fetchTransactions();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "overview") {
      fetchActivity();
    }
  }, [activeTab]);

  const fetchActivity = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setActivity(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);

    const dummyUsers = [
      { id: "d1", name: "شركة النور للبرمجيات", email: "contact@alnoor.com", role: "CLIENT", createdAt: new Date(Date.now() - 5000000000).toISOString() },
      { id: "d2", name: "مجموعة العليان التجارية", email: "info@olayan.sa", role: "CLIENT", createdAt: new Date(Date.now() - 12000000000).toISOString() },
      { id: "d3", name: "أحمد حسن (SEO Expert)", email: "ahmed.seo@gmail.com", role: "MARKETER", createdAt: new Date(Date.now() - 2000000000).toISOString() },
      { id: "d4", name: "سارة محمود (مصممة واجهات)", email: "sara.ui@yahoo.com", role: "MARKETER", createdAt: new Date(Date.now() - 800000000).toISOString() },
      { id: "d5", name: "عمر خالد (مسوق إعلانات)", email: "omar.ads@hotmail.com", role: "PENDING", createdAt: new Date().toISOString() },
      { id: "d6", name: "ليلى عبدالرحمن (كاتبة محتوى)", email: "laila.copy@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: "d7", name: "شركة الأفق للاستثمار", email: "info@horizon-inv.com", role: "CLIENT", createdAt: new Date(Date.now() - 15000000000).toISOString() },
      { id: "d8", name: "محمود سعيد (مطور ويب)", email: "mahmoud.dev@gmail.com", role: "MARKETER", createdAt: new Date(Date.now() - 4000000000).toISOString() },
      { id: "d9", name: "مؤسسة القمة العقارية", email: "contact@alqimma.sa", role: "CLIENT", createdAt: new Date(Date.now() - 7000000000).toISOString() },
      { id: "d10", name: "ياسمين علي (إدارة منصات)", email: "yasmin.social@yahoo.com", role: "PENDING", createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: "d11", name: "طارق زياد (صانع فيديو)", email: "tareq.video@hotmail.com", role: "PENDING", createdAt: new Date(Date.now() - 172800000).toISOString() },
      { id: "d12", name: "نهى عبدالكريم (محللة بيانات)", email: "noha.data@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 259200000).toISOString() },
      { id: "d13", name: "مطاعم ديلشس", email: "marketing@delicious.com", role: "CLIENT", createdAt: new Date(Date.now() - 300000000).toISOString() },
      { id: "d14", name: "عبدالله سعد (مختص SEO)", email: "abdullah.seo@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 5000000).toISOString() },
      { id: "d15", name: "شركة الرواد للتسويق", email: "info@alrowad.com", role: "CLIENT", createdAt: new Date(Date.now() - 600000000).toISOString() },
      { id: "d16", name: "سمير عادل (موشن جرافيك)", email: "samir.motion@gmail.com", role: "MARKETER", createdAt: new Date(Date.now() - 700000000).toISOString() },
      { id: "d17", name: "مجموعة الشايع", email: "contact@alshaya.com", role: "CLIENT", createdAt: new Date(Date.now() - 8000000000).toISOString() },
      { id: "d18", name: "خالد بن الوليد (مطور تطبيقات)", email: "khalid.app@yahoo.com", role: "MARKETER", createdAt: new Date(Date.now() - 900000000).toISOString() },
      { id: "d19", name: "منى جلال (كوبي رايتر)", email: "mona.copy@hotmail.com", role: "MARKETER", createdAt: new Date(Date.now() - 1000000000).toISOString() },
      { id: "d20", name: "فهد العتيبي (أخصائي إعلانات)", email: "fahad.ads@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 1100000000).toISOString() },
      { id: "d21", name: "صالون الجمال الراقي", email: "beauty@salon.com", role: "CLIENT", createdAt: new Date(Date.now() - 1200000000).toISOString() },
      { id: "d22", name: "ريم مصطفى (تصميم UI/UX)", email: "reem.design@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 1300000000).toISOString() },
      { id: "d23", name: "متجر الهدايا الذكية", email: "sales@smartgifts.com", role: "CLIENT", createdAt: new Date(Date.now() - 1400000000).toISOString() },
      { id: "d24", name: "علاء الدين (خبير تحويل مبيعات)", email: "alaa.sales@yahoo.com", role: "PENDING", createdAt: new Date(Date.now() - 1500000000).toISOString() },
      { id: "d25", name: "أكاديمية التعليم المتقدم", email: "info@advancededu.com", role: "CLIENT", createdAt: new Date(Date.now() - 1600000000).toISOString() },
      { id: "d26", name: "زينب قاسم (مديرة حملات)", email: "zainab.campaigns@gmail.com", role: "MARKETER", createdAt: new Date(Date.now() - 1700000000).toISOString() },
      { id: "d27", name: "مستشفى الحياة الطبي", email: "contact@alhayathospital.com", role: "CLIENT", createdAt: new Date(Date.now() - 1800000000).toISOString() },
      { id: "d28", name: "يوسف كمال (أخصائي Email Marketing)", email: "yousef.email@hotmail.com", role: "PENDING", createdAt: new Date(Date.now() - 1900000000).toISOString() },
      { id: "d29", name: "هند سعيد (صناعة محتوى تيك توك)", email: "hind.tiktok@gmail.com", role: "PENDING", createdAt: new Date(Date.now() - 2000000000).toISOString() },
      { id: "d30", name: "وكالة السفر والسياحة", email: "bookings@travelagency.com", role: "CLIENT", createdAt: new Date(Date.now() - 2100000000).toISOString() },
    ];

    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsersList([...data, ...dummyUsers]);
          return;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    setUsersList(dummyUsers);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      setUsersList(usersList.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);

    const dummyTransactions = [
      { id: "1", user: { name: "أحمد حسن", role: "MARKETER" }, description: "دفع مستحقات مشروع التسويق", createdAt: new Date().toISOString(), type: "WITHDRAWAL", status: "COMPLETED", amount: 450 },
      { id: "2", user: { name: "مجموعة العليان", role: "CLIENT" }, description: "إيداع ميزانية المشروع", createdAt: new Date(Date.now() - 86400000).toISOString(), type: "DEPOSIT", status: "COMPLETED", amount: 1200 },
      { id: "3", user: { name: "شروق (رسوم المنصة)", role: "ADMIN" }, description: "عمولة منصة (15%)", createdAt: new Date(Date.now() - 172800000).toISOString(), type: "EARNING", status: "COMPLETED", amount: 180 },
      { id: "4", user: { name: "سارة محمود", role: "MARKETER" }, description: "سحب أرباح تصميم الهوية", createdAt: new Date(Date.now() - 259200000).toISOString(), type: "WITHDRAWAL", status: "PENDING", amount: 800 },
      { id: "5", user: { name: "شركة النور للبرمجيات", role: "CLIENT" }, description: "دفع دفعة مقدمة لتطبيق", createdAt: new Date(Date.now() - 345600000).toISOString(), type: "DEPOSIT", status: "COMPLETED", amount: 2500 },
      { id: "6", user: { name: "محمود سعيد", role: "MARKETER" }, description: "طلب سحب رصيد", createdAt: new Date(Date.now() - 432000000).toISOString(), type: "WITHDRAWAL", status: "REJECTED", amount: 300 },
      { id: "7", user: { name: "شروق (رسوم المنصة)", role: "ADMIN" }, description: "عمولة منصة (10%)", createdAt: new Date(Date.now() - 518400000).toISOString(), type: "EARNING", status: "COMPLETED", amount: 250 },
      { id: "8", user: { name: "مؤسسة القمة العقارية", role: "CLIENT" }, description: "إيداع ميزانية إعلانات", createdAt: new Date(Date.now() - 604800000).toISOString(), type: "DEPOSIT", status: "COMPLETED", amount: 5000 },
      { id: "9", user: { name: "مجموعة الشايع", role: "CLIENT" }, description: "دفع دفعة ثانية للمشروع", createdAt: new Date(Date.now() - 700000000).toISOString(), type: "DEPOSIT", status: "COMPLETED", amount: 3500 },
      { id: "10", user: { name: "سمير عادل", role: "MARKETER" }, description: "سحب أرباح تصميم فيديو", createdAt: new Date(Date.now() - 800000000).toISOString(), type: "WITHDRAWAL", status: "COMPLETED", amount: 1200 },
      { id: "11", user: { name: "صالون الجمال الراقي", role: "CLIENT" }, description: "إيداع رسوم تسويق إنستجرام", createdAt: new Date(Date.now() - 900000000).toISOString(), type: "DEPOSIT", status: "PENDING", amount: 600 },
      { id: "12", user: { name: "شروق (رسوم المنصة)", role: "ADMIN" }, description: "عمولة منصة (15%)", createdAt: new Date(Date.now() - 1000000000).toISOString(), type: "EARNING", status: "COMPLETED", amount: 180 },
      { id: "13", user: { name: "منى جلال", role: "MARKETER" }, description: "سحب رصيد متاح", createdAt: new Date(Date.now() - 1100000000).toISOString(), type: "WITHDRAWAL", status: "PENDING", amount: 450 },
      { id: "14", user: { name: "أكاديمية التعليم المتقدم", role: "CLIENT" }, description: "دفع ميزانية حملة", createdAt: new Date(Date.now() - 1200000000).toISOString(), type: "DEPOSIT", status: "COMPLETED", amount: 4000 },
      { id: "15", user: { name: "أحمد حسن", role: "MARKETER" }, description: "طلب سحب بنكي", createdAt: new Date(Date.now() - 1300000000).toISOString(), type: "WITHDRAWAL", status: "REJECTED", amount: 2000 },
    ];

    try {
      const res = await fetch("/api/transactions");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions([...data, ...dummyTransactions]);
          return;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    setTransactions(dummyTransactions);
  };

  const filteredUsers = usersList.filter(u => {
    if (userFilter === "ALL") return true;
    if (userFilter === "PENDING") return u.role === "PENDING";
    return u.role === userFilter;
  });

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    showToast("تم تحديث بيانات المستخدم بنجاح", "success");
    setEditingUser(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    showToast(`تم إرسال رسالتك إلى ${messagingUser?.name} بنجاح`, "success");
    setMessagingUser(null);
    setMessageText("");
  };

  const handleApproveUser = async (user: any) => {
    if (!confirm(`هل أنت متأكد من الموافقة على انضمام ${user.name} كخبير معتمد؟`)) return;
    showToast(`تمت الموافقة على ${user.name} بنجاح!`, "success");
    setUsersList(usersList.map(u => u.id === user.id ? { ...u, role: "MARKETER" } : u));
  };

  const handleExportCSV = () => {
    let dataToExport: any[] = [];
    let filename = "export.csv";
    if (activeTab === "users") {
      dataToExport = usersList;
      filename = "users.csv";
    } else if (activeTab === "finances") {
      dataToExport = transactions;
      filename = "transactions.csv";
    } else if (activeTab === "tickets") {
      dataToExport = tickets;
      filename = "tickets.csv";
    } else {
      showToast("عذراً، لا يوجد بيانات لتصديرها في هذا القسم", "error");
      return;
    }

    if (dataToExport.length === 0) {
      showToast("لا توجد بيانات متاحة للتصدير", "error");
      return;
    }

    const headers = Object.keys(dataToExport[0]).join(",");
    const rows = dataToExport.map(obj => Object.values(obj).map(v => typeof v === 'object' && v !== null ? `"${JSON.stringify(v).replace(/"/g, '""')}"` : `"${v}"`).join(","));
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`تم تصدير ${filename} بنجاح`, "success");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden" dir="rtl">
      <AnimatedBackground />

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-xl group-hover:-translate-y-1 transition-all duration-300">
              <path d="M50 15 L85 35 L50 55 L15 35 L50 15Z" fill="url(#layer1_mobile)" />
              <path d="M15 45 L50 65 L85 45 L85 57 L50 77 L15 57 Z" fill="url(#layer2_mobile)" />
              <path d="M15 67 L50 87 L85 67 L85 79 L50 99 L15 79 Z" fill="url(#layer3_mobile)" />
              <defs>
                <linearGradient id="layer1_mobile" x1="15" y1="15" x2="85" y2="55">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="layer2_mobile" x1="15" y1="45" x2="85" y2="77">
                  <stop stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="layer3_mobile" x1="15" y1="67" x2="85" y2="99">
                  <stop stopColor="#F472B6" />
                  <stop offset="1" stopColor="#E11D48" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-black text-white tracking-tight">تاسك ميديا</span>
        </Link>
        <button
          onClick={() => {
            const sidebar = document.getElementById('admin-sidebar');
            sidebar?.classList.toggle('hidden');
            sidebar?.classList.toggle('flex');
          }}
          className="p-2 bg-white/5 rounded-xl text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside id="admin-sidebar" className="fixed right-0 top-0 h-full w-64 bg-slate-800/95 backdrop-blur-3xl border-l border-white/5 z-[60] hidden lg:flex flex-col transition-all">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 drop-shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <path d="M50 15 L85 35 L50 55 L15 35 L50 15Z" fill="url(#layer1_desktop)" />
                  <path d="M15 45 L50 65 L85 45 L85 57 L50 77 L15 57 Z" fill="url(#layer2_desktop)" />
                  <path d="M15 67 L50 87 L85 67 L85 79 L50 99 L15 79 Z" fill="url(#layer3_desktop)" />
                  <defs>
                    <linearGradient id="layer1_desktop" x1="15" y1="15" x2="85" y2="55">
                      <stop stopColor="#60A5FA" />
                      <stop offset="1" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="layer2_desktop" x1="15" y1="45" x2="85" y2="77">
                      <stop stopColor="#A78BFA" />
                      <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                    <linearGradient id="layer3_desktop" x1="15" y1="67" x2="85" y2="99">
                      <stop stopColor="#F472B6" />
                      <stop offset="1" stopColor="#E11D48" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-white">تاسك ميديا</span>
            </Link>
            <div className="mt-2 text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">مركز التحكم</div>
          </div>
          <button
            className="lg:hidden p-2 bg-white/5 rounded-xl text-white"
            onClick={() => {
              const sidebar = document.getElementById('admin-sidebar');
              sidebar?.classList.add('hidden');
              sidebar?.classList.remove('flex');
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-6 overflow-y-auto">
          {[
            { id: "overview", label: "نظرة عامة", icon: <BarChart3 className="w-4 h-4" /> },
            { id: "users", label: "إدارة المستخدمين", icon: <Users className="w-4 h-4" /> },
            { id: "tasks", label: "مشاريع المنصة", icon: <Layers className="w-4 h-4" /> },
            { id: "finances", label: "السجل المالي", icon: <DollarSign className="w-4 h-4" /> },
            { id: "tickets", label: "الدعم والشكاوى", icon: <LifeBuoy className="w-4 h-4" /> },
            { id: "system", label: "إعدادات النظام", icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as AdminTab);
                if (window.innerWidth < 1024) {
                  const sidebar = document.getElementById('admin-sidebar');
                  sidebar?.classList.add('hidden');
                  sidebar?.classList.remove('flex');
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                  ? "bg-secondary text-white shadow-xl shadow-secondary/30 border border-secondary"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {item.icon}
              {item.label}
              {activeTab === item.id && <ChevronRight className="w-4 h-4 mr-auto opacity-50 rotate-180" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">المدير العام</div>
                <div className="text-[10px] text-slate-500">صلاحيات كاملة</div>
              </div>
            </div>
            <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/20">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 p-6 pt-24 lg:pt-8 relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              مرحباً، <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{session?.user?.name || "شروق"}</span>
            </h1>
            <h2 className="text-xl font-bold text-slate-300 capitalize">
              {activeTab === 'overview' ? 'نظرة عامة' :
                activeTab === 'users' ? 'إدارة المستخدمين' :
                  activeTab === 'tasks' ? 'مشاريع المنصة' :
                    activeTab === 'finances' ? 'السجل المالي الشامل' : 
                      activeTab === 'tickets' ? 'تذاكر الدعم والشكاوى' : 'إعدادات النظام'}
            </h2>
            <p className="text-slate-400 font-medium mt-1">الحالة: <span className="text-emerald-400">جميع الأنظمة تعمل بكفاءة</span></p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="البحث في النظام..."
                className="bg-slate-800/80 border border-white/5 rounded-xl py-2.5 pr-10 pl-4 text-sm outline-none focus:border-secondary transition-all w-64 text-right"
              />
            </div>
            <button onClick={() => showToast("تم تطبيق الفلاتر بنجاح", "success")} className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                {notifications.some(n => n.unread) && <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 mt-2 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden text-right">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
                      <span className="font-bold text-white">الإشعارات</span>
                      <button onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))} className="text-xs text-secondary hover:underline">تحديد كـ مقروء</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-white/5 text-sm ${n.unread ? 'bg-slate-800/50' : ''} hover:bg-white/5 transition-colors cursor-pointer flex gap-3`}>
                          <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.unread ? 'bg-secondary' : 'bg-transparent'}`}></div>
                          <div>
                             <div className="font-bold text-slate-200">{n.text}</div>
                             <div className="text-xs text-slate-500 mt-1">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-secondary/20">
              <Download className="w-4 h-4" /> تصدير CSV
            </button>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="animate-in fade-in slide-in-from-bottom-5 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/5 relative group cursor-default"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400">{s.label}</span>
                    <span className="text-xs font-bold text-emerald-400">{s.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <div className="rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/5 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white">النشاط الأخير</h3>
                    <button className="text-sm font-bold text-secondary hover:underline">عرض الكل</button>
                  </div>

                  <div className="space-y-4">
                    {activity.length > 0 ? activity.slice(0, 5).map((post, i) => (
                      <div key={post.id || i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:animate-pulse"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white truncate">{post.content || "تمت إضافة نشاط جديد"}</div>
                          <div className="text-xs text-slate-500 font-medium">{post.author?.name || "مستخدم"} • {new Date(post.createdAt).toLocaleDateString('ar-EG')}</div>
                        </div>
                        <div className="text-[10px] font-black text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">{post.type || "تحديث"}</div>
                      </div>
                    )) : (
                      <div className="text-center text-slate-500 font-medium py-4">لا توجد نشاطات حديثة حتى الآن.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-3xl border border-secondary/20 p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-2">صحة المنصة</h3>
                    <p className="text-slate-300 text-sm font-medium mb-6">قواعد البيانات، التخزين، وواجهات برمجة التطبيقات في حالة ممتازة.</p>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white">استهلاك المعالج</span>
                          <span className="text-secondary">24%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-[24%]"></div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white">زمن استجابة الشبكة</span>
                          <span className="text-accent">140ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[40%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/30 blur-3xl rounded-full"></div>
                </div>

                <div className="rounded-3xl bg-slate-800/80 backdrop-blur-xl border border-white/5 p-8">
                  <h3 className="text-xl font-black text-white mb-6">إعدادات المنصة</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary transition-all text-left group">
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">وضع الصيانة</span>
                      <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-slate-600 rounded-full"></div>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary transition-all text-left group">
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">المراجعة التلقائية</span>
                      <div className="w-10 h-5 bg-secondary/30 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-secondary rounded-full"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-emerald-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">إجمالي الإيداعات</p>
                  <h3 className="text-4xl font-black text-emerald-400">$34,500</h3>
                </div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-rose-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">إجمالي السحوبات</p>
                  <h3 className="text-4xl font-black text-rose-400">$12,200</h3>
                </div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full"></div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-blue-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">المدفوعات المعلقة</p>
                  <h3 className="text-4xl font-black text-blue-400">$4,300</h3>
                </div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
              </div>
            </div>

            <div className="bg-slate-800/90 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="p-6">المستخدم</th>
                      <th className="p-6">الدور</th>
                      <th className="p-6">المعاملة</th>
                      <th className="p-6">التاريخ</th>
                      <th className="p-6">النوع</th>
                      <th className="p-6">الحالة</th>
                      <th className="p-6">المبلغ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-medium">
                    {loading ? (
                      <tr><td colSpan={7} className="p-12 text-center text-slate-500">جاري جلب البيانات...</td></tr>
                    ) : transactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-slate-500 font-bold text-lg">لا توجد معاملات مالية بعد.</td>
                      </tr>
                    ) : transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-white font-bold">{tx.user?.name}</td>
                        <td className="p-6 text-slate-500 text-[10px] uppercase font-black">{tx.user?.role}</td>
                        <td className="p-6 text-slate-300">{tx.description}</td>
                        <td className="p-6 text-slate-400">{new Date(tx.createdAt).toLocaleDateString('ar-EG')}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${tx.type === 'EARNING' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              tx.type === 'WITHDRAWAL' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                tx.type === 'DEPOSIT' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                  'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}>
                            {tx.type === 'EARNING' ? 'أرباح' : tx.type === 'WITHDRAWAL' ? 'سحب' : tx.type === 'DEPOSIT' ? 'إيداع' : 'دفع'}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              tx.status === 'PENDING' ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' :
                                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                            {tx.status === 'COMPLETED' ? 'مكتمل' : tx.status === 'PENDING' ? 'قيد الانتظار' : 'مرفوض'}
                          </span>
                        </td>
                        <td className={`p-6 font-black text-lg ${tx.type === 'EARNING' || tx.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-white'}`}>
                          {tx.type === 'EARNING' || tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div onClick={() => setUserFilter(userFilter === "CLIENT" ? "ALL" : "CLIENT")} className={`p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-4 border ${userFilter === "CLIENT" ? "bg-blue-500/10 border-blue-500/50" : "bg-slate-800/90 border-white/5 hover:border-white/20"}`}>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center"><Users className="w-6 h-6 text-blue-400" /></div>
                <div><p className="text-sm text-slate-400 font-bold">العملاء (الشركات)</p><p className="text-2xl font-black text-white">{usersList.filter(u => u.role === "CLIENT").length}</p></div>
              </div>
              <div onClick={() => setUserFilter(userFilter === "MARKETER" ? "ALL" : "MARKETER")} className={`p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-4 border ${userFilter === "MARKETER" ? "bg-secondary/10 border-secondary/50" : "bg-slate-800/90 border-white/5 hover:border-white/20"}`}>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-secondary" /></div>
                <div><p className="text-sm text-slate-400 font-bold">الخبراء المعتمدون</p><p className="text-2xl font-black text-white">{usersList.filter(u => u.role === "MARKETER").length}</p></div>
              </div>
              <div onClick={() => setUserFilter(userFilter === "PENDING" ? "ALL" : "PENDING")} className={`p-6 rounded-3xl cursor-pointer transition-all flex items-center gap-4 border ${userFilter === "PENDING" ? "bg-rose-500/10 border-rose-500/50" : "bg-slate-800/90 border-white/5 hover:border-white/20"}`}>
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center"><Activity className="w-6 h-6 text-rose-400" /></div>
                <div><p className="text-sm text-slate-400 font-bold">طلبات الانضمام (معلقة)</p><p className="text-2xl font-black text-white">{usersList.filter(u => u.role === "PENDING").length}</p></div>
              </div>
            </div>

            <div className="bg-slate-800/90 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="p-6">المستخدم</th>
                      <th className="p-6">نوع الحساب</th>
                      <th className="p-6">تاريخ الانضمام</th>
                      <th className="p-6">النشاط</th>
                      <th className="p-6">الحالة</th>
                      <th className="p-6">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-medium">
                    {loading ? (
                      <tr><td colSpan={6} className="p-12 text-center text-slate-500">جاري جلب المستخدمين...</td></tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr><td colSpan={6} className="p-12 text-center text-slate-500 font-bold">لا يوجد مستخدمين في هذا القسم.</td></tr>
                    ) : filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-xs text-slate-500">{u.email}</div>
                        </td>
                        <td className="p-6 text-slate-400 text-xs font-black uppercase tracking-widest">{u.role === 'MARKETER' ? 'خبير تسويق' : u.role === 'ADMIN' ? 'مدير' : u.role === 'PENDING' ? 'طلب انضمام' : 'عميل'}</td>
                        <td className="p-6 text-slate-400">{new Date(u.createdAt).toLocaleDateString('ar-EG')}</td>
                        <td className="p-6 text-slate-400">{u.role === 'PENDING' ? 'جديد' : 'نشط'}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${u.role === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                            {u.role === 'PENDING' ? 'معلق' : 'مفعل'}
                          </span>
                        </td>
                        <td className="p-6 flex gap-3 justify-end items-center">
                          {u.role === 'PENDING' && (
                            <button onClick={() => handleApproveUser(u)} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> قبول
                            </button>
                          )}
                          <button onClick={() => setMessagingUser(u)} className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> ماسج
                          </button>
                          <button onClick={() => setEditingUser(u)} className="text-xs font-bold text-secondary hover:text-accent bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">تعديل</button>
                          <button onClick={() => deleteUser(u.id)} className="text-xs font-bold text-rose-500 hover:text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden">
                <h3 className="text-2xl font-black text-white mb-2 relative z-10">المشاريع النشطة</h3>
                <p className="text-slate-400 mb-6 relative z-10">إجمالي المشاريع الجاري تنفيذها حالياً عبر المنصة.</p>
                <p className="text-6xl font-black text-secondary relative z-10">142</p>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 blur-3xl rounded-full"></div>
              </div>
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 relative overflow-hidden">
                <h3 className="text-2xl font-black text-white mb-2 relative z-10">المشاريع المكتملة</h3>
                <p className="text-slate-400 mb-6 relative z-10">المشاريع التي تم تسليمها بنجاح هذا الشهر.</p>
                <p className="text-6xl font-black text-emerald-400 relative z-10">384</p>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, type: "حملة تسويقية", title: "إطلاق منتج جديد - الربع الثالث", status: "قيد التنفيذ", progress: 65, client: "مجموعة العليان", marketer: "أحمد حسن" },
                { id: 2, type: "تصميم هوية", title: "هوية بصرية لتطبيق توصيل", status: "مكتمل", progress: 100, client: "شركة النور للبرمجيات", marketer: "سارة محمود" },
                { id: 3, type: "إدارة حسابات", title: "إدارة محتوى سوشيال ميديا", status: "متأخر", progress: 40, client: "مطاعم ديلشس", marketer: "ليلى عبدالرحمن" },
                { id: 4, type: "تحسين محركات البحث", title: "SEO لموقع عقاري", status: "قيد المراجعة", progress: 90, client: "مؤسسة القمة العقارية", marketer: "عبدالله سعد" },
                { id: 5, type: "إنتاج فيديو", title: "فيديو إعلاني ترويجي 30 ثانية", status: "قيد التنفيذ", progress: 25, client: "شركة الأفق للاستثمار", marketer: "طارق زياد" },
                { id: 6, type: "حملة إعلانية", title: "إعلانات جوجل الممولة", status: "تم الإلغاء", progress: 10, client: "مجموعة العليان", marketer: "عمر خالد" }
              ].map((task) => (
                <div key={task.id} className="p-8 rounded-3xl bg-slate-800/90 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-black text-secondary uppercase tracking-widest mb-1">{task.type}</div>
                      <h4 className="text-lg font-bold text-white">{task.title}</h4>
                    </div>
                    <span className={`px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold ${task.status === 'مكتمل' ? 'text-emerald-400' : task.status === 'متأخر' ? 'text-rose-400' : task.status === 'قيد المراجعة' ? 'text-blue-400' : task.status === 'تم الإلغاء' ? 'text-slate-400' : 'text-secondary'}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                    <div className={`h-full ${task.status === 'مكتمل' ? 'bg-emerald-400' : task.status === 'متأخر' ? 'bg-rose-400' : 'bg-gradient-to-r from-secondary to-accent'}`} style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                    <span>العميل: {task.client}</span>
                    <span>المسوق: {task.marketer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-800/90 border border-white/5 p-8 rounded-[2.5rem] mb-8 gap-6">
              <div>
                <h3 className="text-3xl font-black text-white">تذاكر الدعم الفني</h3>
                <p className="text-slate-400 mt-2 font-medium">إدارة استفسارات ومشاكل المستخدمين وحلها بسرعة.</p>
              </div>
              <div className="flex gap-6 w-full md:w-auto">
                 <div className="text-center px-6 border-l border-white/10 flex-1 md:flex-none">
                    <p className="text-4xl font-black text-emerald-400">{tickets.filter(t => t.status === 'CLOSED').length}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">مغلقة</p>
                 </div>
                 <div className="text-center px-6 border-l border-white/10 flex-1 md:flex-none">
                    <p className="text-4xl font-black text-secondary">{tickets.filter(t => t.status === 'IN_PROGRESS').length}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">جاري العمل</p>
                 </div>
                 <div className="text-center px-4 flex-1 md:flex-none">
                    <p className="text-4xl font-black text-rose-400">{tickets.filter(t => t.status === 'OPEN').length}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">مفتوحة</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-800/90 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="p-6">رقم التذكرة</th>
                      <th className="p-6">المستخدم</th>
                      <th className="p-6">الموضوع</th>
                      <th className="p-6">الأولوية</th>
                      <th className="p-6">التاريخ</th>
                      <th className="p-6">الحالة</th>
                      <th className="p-6">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm font-medium">
                    {tickets.map(t => (
                      <tr key={t.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-6 text-slate-500 font-black">#{t.id}</td>
                        <td className="p-6">
                           <div className="font-bold text-white">{t.user}</div>
                           <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t.role}</div>
                        </td>
                        <td className="p-6 text-slate-300 font-bold">{t.subject}</td>
                        <td className="p-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${t.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : t.priority === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                              {t.priority === 'HIGH' ? 'عالية' : t.priority === 'MEDIUM' ? 'متوسطة' : 'منخفضة'}
                           </span>
                        </td>
                        <td className="p-6 text-slate-400">{t.date}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${t.status === 'OPEN' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : t.status === 'IN_PROGRESS' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                             {t.status === 'OPEN' ? 'مفتوحة' : t.status === 'IN_PROGRESS' ? 'قيد المراجعة' : 'مغلقة'}
                          </span>
                        </td>
                        <td className="p-6">
                          <button onClick={() => setMessagingUser({name: t.user})} className="text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> رد
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="animate-in fade-in slide-in-from-bottom-5 max-w-4xl mx-auto">
            <div className="p-10 rounded-[3rem] bg-slate-800/90 border border-white/5 shadow-2xl space-y-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">إعدادات المنصة المتقدمة</h2>
                  <p className="text-slate-400 font-medium">التحكم في المتغيرات الأساسية للمنصة والنظام المالي.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">عمولة المنصة (Engagement Fee)</h4>
                    <p className="text-sm text-slate-400">النسبة المقتطعة من كل مشروع مكتمل.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue={15} className="w-20 bg-slate-950 border border-white/10 rounded-xl py-2 px-4 text-center text-white font-bold focus:border-secondary outline-none" />
                    <span className="text-white font-bold">%</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">حد السحب الأدنى</h4>
                    <p className="text-sm text-slate-400">أقل مبلغ يمكن للخبير سحبه من المحفظة.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" defaultValue={50} className="w-24 bg-slate-950 border border-white/10 rounded-xl py-2 px-4 text-center text-white font-bold focus:border-secondary outline-none" />
                    <span className="text-white font-bold">$</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">وضع الصيانة (Maintenance Mode)</h4>
                    <p className="text-sm text-slate-400">إيقاف تسجيل الدخول والعمليات للمستخدمين الخارجيين.</p>
                  </div>
                  <button className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer border border-white/5">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-end">
                <button onClick={() => showToast("تم حفظ الإعدادات بنجاح في قاعدة البيانات", "success")} className="px-8 py-4 bg-secondary text-white font-black rounded-xl shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
                  حفظ الإعدادات
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
              <button onClick={() => setEditingUser(null)} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"><X className="w-4 h-4" /></button>
              <h3 className="text-xl font-black text-white mb-6">تعديل بيانات {editingUser.name}</h3>
              <form onSubmit={handleEditUser} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1 block">الاسم</label>
                  <input type="text" defaultValue={editingUser.name} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1 block">البريد الإلكتروني</label>
                  <input type="email" defaultValue={editingUser.email} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 mb-1 block">الدور</label>
                  <select defaultValue={editingUser.role} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-secondary">
                    <option value="CLIENT">عميل</option>
                    <option value="MARKETER">مسوق</option>
                    <option value="ADMIN">مدير</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-secondary text-white font-bold py-3 rounded-xl mt-4 hover:opacity-90">حفظ التعديلات</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message User Modal */}
      <AnimatePresence>
        {messagingUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-blue-500/20 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
              <button onClick={() => setMessagingUser(null)} className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"><X className="w-4 h-4" /></button>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-blue-400" /></div>
                <div>
                  <h3 className="text-xl font-black text-white">إرسال رسالة</h3>
                  <p className="text-xs text-slate-400">إلى: {messagingUser.name}</p>
                </div>
              </div>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <textarea 
                    placeholder="اكتب رسالتك هنا كمدير للمنصة..." 
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 resize-none" 
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">إرسال الرسالة</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

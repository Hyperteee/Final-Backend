import React, { useState, useRef, useEffect } from 'react';
import { User, Bot, Activity, HeartPulse, Stethoscope, Pill, Smile, Eye, Brain } from 'lucide-react';

import { useTranslation } from "react-i18next";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "สวัสดีครับ! Health Queue ยินดีให้บริการ 🏥 ผมช่วยแนะนำแผนกจองคิวตามอาการเบื้องต้นได้ครับ วันนี้คุณมีอาการอย่างไรบ้างครับ?",
      sender: "bot"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateReply = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("ไข้") || lowerText.includes("ตัวร้อน")) {
      return { text: "แนะนำจองคิวแผนก 'อายุรกรรม (General Medicine)' ครับ 🌡️", recommendation: "General Medicine" };
    }
    else if (lowerText.includes("ปวดท้อง") || lowerText.includes("ท้องเสีย")) {
      return { text: "อาการปวดท้องเหมาะกับ 'ทางเดินอาหารและตับ (GI)' ครับ 🩺", recommendation: "GI Center" };
    }
    else if (lowerText.includes("เจ็บคอ") || lowerText.includes("ไอ")) {
      return { text: "อาการทางเดินหายใจแนะนำแผนก 'หู คอ จมูก (ENT)' ครับ 👃", recommendation: "ENT" };
    }
    else if (lowerText.includes("ปวดหัว") || lowerText.includes("ไมเกรน")) {
      return { text: "แนะนำแผนกระบบประสาท 'Neurology' ครับ 🧠", recommendation: "Neurology" };
    }
    else if (lowerText.includes("ปวดหลัง") || lowerText.includes("ปวดเข่า")) {
      return { text: "อาการปวดกล้ามเนื้อ/ข้อ แนะนำ 'Orthopedics' ครับ 🦴", recommendation: "Orthopedics" };
    }
    else if (lowerText.includes("ผื่น") || lowerText.includes("คัน")) {
      return { text: "ปัญหาผิวหนัง แนะนำ 'Dermatology' ครับ", recommendation: "Dermatology" };
    }
    else if (lowerText.includes("ฟัน") || lowerText.includes("เหงือก")) {
      return { text: "อาการช่องปากควรไป 'ทันตกรรม (Dentistry)' ครับ 🦷", recommendation: "Dentistry" };
    }
    else if (lowerText.includes("ตา") || lowerText.includes("มองไม่ชัด")) {
      return { text: "อาการดวงตาเหมาะกับ 'จักษุ (Ophthalmology)' ครับ 👁️", recommendation: "Ophthalmology" };
    }
    else if (lowerText.includes("เครียด") || lowerText.includes("นอนไม่หลับ")) {
      return { text: "แนะนำพบ 'จิตเวช (Psychiatry)' ครับ 🧠", recommendation: "Psychiatry" };
    }
    else if (lowerText.includes("สวัสดี")) {
      return { text: "สวัสดีครับ บอกอาการของคุณได้เลยนะครับ 😊", recommendation: null };
    }

    return {
      text: "ผมอาจไม่แน่ใจอาการนี้ 🤔 แนะนำเริ่มที่ 'อายุรกรรมทั่วไป' เพื่อประเมินเบื้องต้นครับ",
      recommendation: "General Medicine"
    };
  };

  const sendQuickReply = (text) => {
    const newMsg = { id: Date.now(), text: text, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateReply(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replyData.text,
          sender: "bot",
          recommendation: replyData.recommendation
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    // Main Container
    <div className="d-flex flex-column vh-100 bg-light text-dark font-sans ">

      {/* HEADER */}
      <header className="bg-white shadow-sm px-4 py-3 d-flex align-items-center justify-content-between sticky-top border-bottom z-3">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-3 d-flex align-items-center justify-content-center text-white shadow"
            style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
            <HeartPulse size={26} />
          </div>
          <div>
            <h1 className="h6 fw-bold mb-0 text-dark">Health Queue AI</h1>
            <p className="small text-muted mb-0 d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
              <span className="bg-success rounded-circle d-inline-block" style={{ width: '8px', height: '8px' }}></span>
              Online – ระบบคัดกรองสุขภาพ
            </p>
          </div>
        </div>
      </header>

      {/* MESSAGE AREA */}
      <div className="flex-grow-1 overflow-auto p-4 custom-scrollbar">

        {/* Today Tag */}
        <div className="d-flex justify-content-center mb-4">
          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2 fw-normal">
            วันนี้
          </span>
        </div>

        {/* Chat Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`d-flex mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
            <div className={`d-flex gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`} style={{ maxWidth: '85%' }}>

              {/* Avatar */}
              <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0
                ${msg.sender === "user" ? "bg-primary bg-opacity-10 text-primary" : "bg-white border text-primary"}`}
                style={{ width: '36px', height: '36px' }}>
                {msg.sender === "user" ? <User size={18} /> : <Bot size={19} />}
              </div>

              {/* Bubble */}
              <div className="d-flex flex-column">
                <div className={`p-3 shadow-sm text-sm
                  ${msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-white text-dark border"
                  }`}
                  style={{
                    borderRadius: '1rem',
                    borderTopRightRadius: msg.sender === "user" ? '0' : '1rem',
                    borderTopLeftRadius: msg.sender === "user" ? '1rem' : '0'
                  }}>
                  {msg.text}
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="d-flex justify-content-start mb-3">
            <div className="d-flex gap-2 align-items-center">
              <div className="bg-white rounded-circle border d-flex align-items-center justify-content-center text-primary shadow-sm" style={{ width: '36px', height: '36px' }}>
                <Bot size={20} />
              </div>
              <div className="bg-white border px-3 py-3 shadow-sm d-flex gap-1" style={{ borderRadius: '1rem', borderTopLeftRadius: '0' }}>
                <div className="typing-dot"></div>
                <div className="typing-dot" style={{ animationDelay: '0.15s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Section */}
      <div className="bg-white border-top p-3 sticky-bottom z-3">
        <div className="mx-auto text-center" style={{ maxWidth: '768px' }}>

          <span className="small text-muted fw-bold d-block mb-2">เลือกอาการของคุณ</span>

          {/* ใช้ d-flex และ flex-wrap แทน grid */}
          <div className="d-flex gap-2 overflow-auto justify-content-center flex-wrap pb-2 no-scrollbar">
            <QuickReply text="เป็นไข้" icon={<Activity size={14} />} onClick={() => sendQuickReply("มีไข้สูง")} />
            <QuickReply text="ปวดท้อง" icon={<Pill size={14} />} onClick={() => sendQuickReply("ปวดท้อง")} />
            <QuickReply text="ปวดหัว" icon={<Activity size={14} />} onClick={() => sendQuickReply("ปวดหัว")} />
            <QuickReply text="ไอ/เจ็บคอ" icon={<Stethoscope size={14} />} onClick={() => sendQuickReply("ไอ เจ็บคอ")} />
            <QuickReply text="ปวดฟัน" icon={<Smile size={14} />} onClick={() => sendQuickReply("ปวดฟัน")} />
            <QuickReply text="เจ็บตา" icon={<Eye size={14} />} onClick={() => sendQuickReply("เจ็บตา")} />
            <QuickReply text="เครียด" icon={<Brain size={14} />} onClick={() => sendQuickReply("เครียด")} />
          </div>

          <p className="text-muted mt-2 mb-0" style={{ fontSize: '10px' }}>
            AI อาจคลาดเคลื่อน ควรพบแพทย์เมื่อมีอาการรุนแรง
          </p>
        </div>
      </div>

      {/* CSS Styles: สำหรับ Animation และ Custom Scrollbar ที่ Bootstrap ไม่มี */}
      <style>{`
        /* Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        /* Typing Animation */
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #94a3b8;
          border-radius: 50%;
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

const QuickReply = ({ text, icon, onClick }) => (
  <button
    onClick={onClick}
    className="btn btn-outline-light text-secondary border shadow-sm rounded-pill d-flex align-items-center gap-2 px-3 py-2 small hover-effect"
    style={{ transition: 'all 0.2s', fontSize: '14px' }}
    onMouseOver={(e) => {
      e.currentTarget.classList.remove('btn-outline-light', 'text-secondary');
      e.currentTarget.classList.add('btn-light', 'text-primary', 'border-primary');
    }}
    onMouseOut={(e) => {
      e.currentTarget.classList.add('btn-outline-light', 'text-secondary');
      e.currentTarget.classList.remove('btn-light', 'text-primary', 'border-primary');
    }}
  >
    {icon} {text}
  </button>
);

export default ChatBot;
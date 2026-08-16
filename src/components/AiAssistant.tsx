/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, CornerDownLeft, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  triggerPrompt: string; // Used to pass prompts from other tabs
  clearTriggerPrompt: () => void;
}

export default function AiAssistant({ isOpen, onClose, triggerPrompt, clearTriggerPrompt }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Welcome to FleetOS Executive AI. I can detail the high-yield dispatch mechanism, white-label clearance engine, and multi-tenant scaling design of the platform. Ask me any strategic or technical questions.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle triggered prompts from buttons in other tabs
  useEffect(() => {
    if (triggerPrompt) {
      handleSendMessage(triggerPrompt);
      clearTriggerPrompt();
    }
  }, [triggerPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend;
    setInputText('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });

      if (!res.ok) {
        throw new Error('API server returned an error error');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.text || 'No response returned.' }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Error connecting to FleetOS AI: ${err.message || 'Connecting failure'}. Please make sure process.env.GEMINI_API_KEY is active or try again.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#0A0A0B]/98 border-l border-immersive-border shadow-2xl z-50 flex flex-col backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-immersive-border flex items-center justify-between bg-[#151619]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-immersive-gold shrink-0 animate-pulse" />
          <div>
            <h3 className="font-semibold text-slate-100 font-sans tracking-wide text-sm">System Intelligence</h3>
            <p className="text-xs text-immersive-secondary-text font-mono">GEMINI-2.5-FLASH // PILOT</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-immersive-secondary-text hover:text-slate-100 p-1.5 rounded-lg hover:bg-immersive-accent transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="px-4 py-2 bg-immersive-accent border-b border-immersive-border flex gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => handleSendMessage('Explain the FleetOS three-layer architecture.')}
          className="text-xs bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-slate-300 px-3 py-1.5 rounded-full whitespace-nowrap transition shrink-0"
        >
          System Architecture
        </button>
        <button
          onClick={() => handleSendMessage('How does the white-label settlement fee work in detail?')}
          className="text-xs bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-slate-300 px-3 py-1.5 rounded-full whitespace-nowrap transition shrink-0"
        >
          White-Label Settlement
        </button>
        <button
          onClick={() => handleSendMessage('Explain why the Corporate Mobility Portal is elevated to Phase 1.')}
          className="text-xs bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-slate-300 px-3 py-1.5 rounded-full whitespace-nowrap transition shrink-0"
        >
          Corporate Demand Focus
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[85%] ${
              msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div className="text-[10px] text-immersive-secondary-text font-mono mb-1 uppercase tracking-wider">
              {msg.role === 'user' ? 'Operator Query' : 'FleetOS Core Intelligence'}
            </div>
            <div
              className={`p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                msg.role === 'user'
                  ? 'bg-immersive-gold/15 text-slate-200 border border-immersive-gold/30 rounded-tr-none'
                  : 'bg-immersive-surface text-slate-200 border border-immersive-border rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col max-w-[85%] mr-auto items-start">
            <span className="text-[10px] text-immersive-secondary-text font-mono mb-1 uppercase tracking-wider">Analyzing Schema...</span>
            <div className="p-3 bg-immersive-surface text-slate-400 rounded-xl rounded-tl-none border border-immersive-border flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-immersive-gold" />
              <span className="text-xs font-mono">Synthesizing regional transport parameters...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-4 border-t border-immersive-border bg-[#151619] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Inquire on GCC mobility dynamics..."
          className="flex-1 bg-immersive-accent border border-immersive-border rounded-xl px-4 py-3 text-sm text-[#FFFFFF] placeholder-immersive-secondary-text/50 focus:outline-none focus:border-immersive-gold focus:ring-1 focus:ring-immersive-gold"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="bg-immersive-gold hover:opacity-90 disabled:opacity-50 disabled:bg-immersive-accent text-slate-950 p-3 rounded-xl transition duration-150 flex items-center justify-center shrink-0 shadow-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

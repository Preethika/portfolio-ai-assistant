'use client';

import { useState } from 'react';

const FIELD = "w-full bg-white/[0.04] border-half border-[var(--border2)] rounded-[8px] px-3.5 py-[11px] text-[14px] text-[var(--sub)] placeholder:text-white/15 focus:border-[rgba(124,110,245,0.5)] transition-colors mb-4 outline-none";
const LABEL = "font-mono text-[11px] text-[var(--muted)] tracking-[1px] mb-1.5 block uppercase";

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', roleLevel: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in name, email, and message.'); setStatus('error'); return;
    }
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm({ name: '', email: '', company: '', roleLevel: '', message: '' }); }
      else { setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); }
    } catch { setErrorMsg('Network error. Please try again.'); setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="bg-[var(--surface)] border-half border-[var(--border2)] rounded-[16px] p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <div className="text-[18px] font-normal text-white mb-2">Message received</div>
        <p className="text-[14px] text-[var(--muted)] leading-[1.7] mb-7">
          The AI assistant is drafting a personalised reply.<br />You&apos;ll hear back within 24 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="w-full bg-accent text-white text-[14px] font-medium py-3 rounded-[8px] hover:opacity-85 transition-opacity">
          Send another →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border-half border-[var(--border2)] rounded-[16px] p-7">
      <label className={LABEL}>Your name</label>
      <input className={FIELD} name="name" placeholder="Sarah Chen, Technical Recruiter" value={form.name} onChange={onChange} />

      <label className={LABEL}>Company email</label>
      <input className={FIELD} name="email" type="email" placeholder="sarah@company.com" value={form.email} onChange={onChange} />

      <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
        <div>
          <label className={LABEL}>Company</label>
          <input className={FIELD} name="company" placeholder="Acme Corp" value={form.company} onChange={onChange} />
        </div>
        <div>
          <label className={LABEL}>Role level</label>
          <select className={`${FIELD} cursor-pointer`} name="roleLevel" value={form.roleLevel} onChange={onChange}>
            <option value="">Select…</option>
            {['Senior', 'Staff', 'Lead', 'Principal', 'Director'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <label className={LABEL}>Brief on the role</label>
      <textarea className={`${FIELD} resize-none`} name="message" placeholder="What the team is building…" value={form.message} onChange={onChange} rows={4} />

      {status === 'error' && <p className="text-[#f87171] text-[13px] mb-3">{errorMsg}</p>}

      <button
        onClick={submit}
        disabled={status === 'loading'}
        className={`w-full bg-accent text-white text-[14px] font-medium py-3.5 rounded-[8px] transition-opacity ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-85 cursor-pointer'}`}
      >
        {status === 'loading' ? '⏳ Sending…' : '📅 Book a introduction call'}
      </button>
    </div>
  );
}

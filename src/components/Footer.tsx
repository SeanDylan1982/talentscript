import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DOCS = [
  {
    key: 'disclaimer',
    label: 'Disclaimer',
    file: '/docs/services_disclaimer.txt',
    title: 'Disclaimer',
  },
  {
    key: 'privacy',
    label: 'Privacy Policy (POPIA)',
    file: '/docs/privacy_policy_popia.txt',
    title: 'Privacy Policy (POPIA)',
  },
  {
    key: 'terms',
    label: 'Terms & Conditions',
    file: '/docs/terms_and_conditions.txt',
    title: 'Terms & Conditions',
  },
];

export default function Footer() {
  const [openDoc, setOpenDoc] = useState(null);
  const [docContent, setDocContent] = useState('');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbackStatus, setFeedbackStatus] = useState('');

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleOpenDoc = async (doc) => {
    setDocContent('Loading...');
    setOpenDoc(doc.key);
    try {
      const res = await fetch(doc.file);
      const text = await res.text();
      setDocContent(text);
    } catch {
      setDocContent('Failed to load document.');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus('Sending...');
    
    // Check if running on Netlify (production)
    if (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify.com')) {
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({ 'form-name': 'feedback', ...formData })
        });
        
        setFeedbackStatus('Thank you for your feedback!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setFeedbackStatus('');
          setFeedbackOpen(false);
        }, 2000);
      } catch (error) {
        setFeedbackStatus('Failed to send feedback. Please try again.');
        setTimeout(() => setFeedbackStatus(''), 3000);
      }
    } else {
      // Local development fallback
      setFeedbackStatus('Thank you for your feedback! (Local mode - not actually sent)');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFeedbackStatus('');
        setFeedbackOpen(false);
      }, 2000);
    }
  };

  return (
    <footer
      className="fixed bottom-0 left-0 w-full h-[32px] bg-white/80 border-t border-gray-200 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ minHeight: 32 }}
    >
      <nav className="flex gap-3 text-[11px] text-gray-500">
        {DOCS.map((doc) => (
          <button
            key={doc.key}
            className="hover:underline focus:outline-none px-1 py-0.5 rounded transition-colors duration-100"
            style={{
              fontSize: "11px",
              lineHeight: "1.2",
              color: "#1a1a1a",
              background: "#f1f1f1",
              border: "1px solid #1a1a1a",
            }}
            onClick={() => handleOpenDoc(doc)}
            type="button"
          >
            {doc.label}
          </button>
        ))}
        <span className="mx-1">|</span>
        <button
          className="hover:underline focus:outline-none px-1 py-0.5 rounded transition-colors duration-100"
          style={{
            fontSize: "11px",
            lineHeight: "1.2",
            color: "#1a1a1a",
            background: "#f1f1f1",
            border: "1px solid #1a1a1a",
          }}
          onClick={() => setFeedbackOpen(true)}
          type="button"
        >
          Feedback
        </button>
      </nav>

      {/* Document Modal */}
      {DOCS.map((doc) => (
        <Dialog
          open={openDoc === doc.key}
          onOpenChange={() => setOpenDoc(null)}
          key={doc.key}
        >
          <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{doc.title}</DialogTitle>
            </DialogHeader>
            <pre
              className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded max-h-[70vh] overflow-y-auto"
              style={{ fontFamily: "'Roboto', 'Poppins', Arial, sans-serif" }}
            >
              {docContent}
            </pre>
          </DialogContent>
        </Dialog>
      ))}

      {/* Feedback Modal */}
      <Dialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      >
        <DialogContent className="max-h-[90vh] w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
          </DialogHeader>
          <form
            name="feedback"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleFeedbackSubmit}
            className="flex flex-col gap-3"
          >
            {/* Netlify form-name hidden field */}
            <input
              type="hidden"
              name="form-name"
              value="feedback"
            />
            {/* Honeypot field for bots */}
            <input type="hidden" name="bot-field" />
            {/* Optional: Name and Email fields */}
            <input
              className="border rounded p-2 text-xs"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your name (optional)"
              style={{
                color: "black",
                background: "#f1f1f1",
              }}
            />
            <input
              className="border rounded p-2 text-xs"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Your email (optional)"
              style={{
                color: "black",
                background: "#f1f1f1",
              }}
            />
            <textarea
              className="border rounded p-2 min-h-[48px] text-xs"
              placeholder="Your feedback..."
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              rows="10"
              cols="5"
              style={{
                color: "black",
                background: "#f1f1f1",
              }}
            />
            <Button
              type="submit"
              className="w-full h-7 text-xs py-1"
              style={{
                color: "#f1f1f1",
                background: "blue",
                fontSize: "14px",
              }}
            >
              Send
            </Button>
            {feedbackStatus && (
              <div className="text-green-600 text-xs mt-1">
                {feedbackStatus}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </footer>
  );
}

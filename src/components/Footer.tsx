import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const DOCS = [
  {
    key: "disclaimer",
    label: "Disclaimer",
    file: "/docs/services_disclaimer.txt",
    title: "Disclaimer",
  },
  {
    key: "privacy",
    label: "Privacy Policy (POPIA)",
    file: "/docs/privacy_policy_popia.txt",
    title: "Privacy Policy (POPIA)",
  },
  {
    key: "terms",
    label: "Terms & Conditions",
    file: "/docs/terms_and_conditions.txt",
    title: "Terms & Conditions",
  },
];

export default function Footer() {
  const [openDoc, setOpenDoc] = useState(null);
  const [docContent, setDocContent] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleOpenDoc = async (doc) => {
    setDocContent("Loading...");
    setOpenDoc(doc.key);
    try {
      const res = await fetch(doc.file);
      const text = await res.text();
      setDocContent(text);
    } catch {
      setDocContent("Failed to load document.");
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus("");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "feedback",
          name,
          email,
          message: feedback,
        }),
      });
      setFeedbackStatus("Thank you for your feedback!");
      setFeedback("");
      setName("");
      setEmail("");
      useEffect(() => {
        if (feedbackStatus === "Thank you for your feedback!") {
          setCountdown(3);
          // Focus the close button and add glow
          if (closeBtnRef.current) {
            closeBtnRef.current.focus();
          }
          const interval = setInterval(() => {
            setCountdown((prev) => {
              if (prev && prev > 1) return prev - 1;
              clearInterval(interval);
              setFeedbackOpen(false);
              setCountdown(null);
              return null;
            });
          }, 1000);
          return () => clearInterval(interval);
        }
      }, [feedbackStatus]);
    } catch (error) {
      setFeedbackStatus("There was an error submitting your feedback.");
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
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-h-[90vh] w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Feedback</DialogTitle>
            <button
              ref={closeBtnRef}
              className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded text-lg font-bold transition-shadow duration-300
                ${feedbackStatus === "Thank you for your feedback!" ? "ring-2 ring-red-400 ring-offset-2" : ""}
              `}
              aria-label="Close"
              type="button"
              onClick={() => setFeedbackOpen(false)}
              tabIndex={0}
              style={{ background: "#fff", border: "1px solid #eee" }}
            >
              ×
            </button>
          </DialogHeader>
          <form
            name="feedback"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleFeedbackSubmit}
            className="flex flex-col gap-3"
          >
            <input type="hidden" name="form-name" value="feedback" />
            <input type="hidden" name="bot-field" />
            <input
              className="border rounded p-2 text-xs"
              type="text"
              name="name"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: "black", background: "#f1f1f1" }}
            />
            <input
              className="border rounded p-2 text-xs"
              type="email"
              name="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "black", background: "#f1f1f1" }}
            />
            <textarea
              className="border rounded p-2 min-h-[48px] text-xs"
              placeholder="Your feedback..."
              name="message"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={10}
              cols={5}
              style={{ color: "black", background: "#f1f1f1" }}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded text-sm font-semibold shadow px-4 py-2"
              disabled={feedbackStatus === "Thank you for your feedback!"}
            >
              Send
            </button>
            {feedbackStatus && (
              <div className="text-green-600 text-xs mt-1 text-center">
                {feedbackStatus}
                {countdown !== null && (
                  <div className="mt-2 text-gray-700">
                    This message will close in {countdown}...
                  </div>
                )}
              </div>
            )}
          </form>
            {/* <button
              type="submit"
              className="bg-blue-600 text-white rounded text-sm font-semibold shadow px-4 py-2"
            >
              Send
            </button>
            {feedbackStatus && (
              <div className="text-green-600 text-xs mt-1">
                {feedbackStatus}
              </div>
            )}
          </form> */}
        </DialogContent>
      </Dialog>
    </footer>
  );
}

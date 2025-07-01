import React, { useEffect, useState } from "react";

function CookieBanner({ onShowTerms }: { onShowTerms: () => void }) {
  const [visible, setVisible] = useState(false);
  const [glow, setGlow] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("talentscript_cookie_accept")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setGlow(true);
      const timer = setTimeout(() => setGlow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const accept = () => {
    localStorage.setItem("talentscript_cookie_accept", "yes");
    setVisible(false);
  };

  const close = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex justify-end">
      <div
        className={`relative bg-white border border-gray-300 shadow-2xl rounded-lg px-6 py-4 flex flex-col items-start gap-3 text-sm max-w-xs w-full transition-shadow duration-500 ${
          glow ? "ring-4 ring-blue-300 ring-opacity-40" : ""
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-base font-bold w-6 h-6 flex items-center justify-center rounded transition-colors duration-150"
          onClick={close}
          aria-label="Close cookie notice"
          type="button"
          style={{ padding: 0, minWidth: "1.5rem", minHeight: "1.5rem" }}
        >
          ×
        </button>
        <span>
          <strong>Cookies Notice</strong>
        </span>
        <span>
          TalentScript uses cookies to enhance your experience, remember your
          preferences, and keep you logged in. Cookies help us provide a
          smoother, more secure, and personalized service.
        </span>
        <div className="flex w-full justify-beginning gap-2 mt-2">
          {/* <button
            className="underline text-gray-100 font-medium text-sm"
            onClick={onShowTerms}
            type="button"
            tabIndex={0}
          >
            Terms & Conditions
          </button> */}
          <button
            className="bg-blue-600 text-white rounded text-sm font-semibold shadow"
            onClick={accept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;

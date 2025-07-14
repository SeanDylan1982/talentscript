import React, { useEffect, useRef, useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { loadGoogleFont } from "@/utils/fontLoader";

export function ResumePreview() {
  const { state } = useResume();
  const { resumeData } = state;
  const [numPages, setNumPages] = useState(1);
  const measureRef = useRef<HTMLDivElement>(null);

  // Ensure the current font is loaded whenever it changes
  useEffect(() => {
    if (resumeData.customization.fontFamily) {
      loadGoogleFont(resumeData.customization.fontFamily).catch(console.warn);
    }
  }, [resumeData.customization.fontFamily]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (measureRef.current) {
        const totalHeight = measureRef.current.scrollHeight;
        const pageHeight = 960; // 10 inches at 96 DPI
        const calculatedPages = Math.ceil(totalHeight / pageHeight);
        setNumPages(Math.max(1, calculatedPages));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const renderTemplate = () => {
    const templateProps = { data: resumeData };

    switch (resumeData.template) {
      case "minimal":
        return <MinimalTemplate {...templateProps} />;
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      default:
        return <MinimalTemplate {...templateProps} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-1 border-b border-gray-200 bg-white h-14">
        <h3 className="text-base pl-2 font-medium text-gray-900">
          Resume Preview
        </h3>
        <p className="text-sm pl-2 text-gray-500">
          Template:{" "}
          {resumeData.template.charAt(0).toUpperCase() +
            resumeData.template.slice(1)}{" "}
          • Font: {resumeData.customization.fontFamily}
        </p>
      </div>

      <div className="flex-1 p-6 c-hidden bg-gray-100">
        {/* Hidden measurement container */}
        <div
          className="invisible absolute"
          style={{ width: "7.5in", top: "-9999px" }}
        >
          <div
            ref={measureRef}
            style={{
              fontFamily: resumeData.customization.fontFamily,
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            {renderTemplate()}
          </div>
        </div>

        <div className="mx-auto space-y-6" style={{ width: "8.5in" }}>
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              id={i === 0 ? "resume-preview" : `resume-preview-page-${i + 1}`}
              className="bg-white shadow-lg relative"
              style={{
                width: "8.5in",
                height: "11in",
                fontFamily: resumeData.customization.fontFamily,
                fontDisplay: "swap",
                padding: "0.5in",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none border-2 border-dashed border-gray-400 opacity-20"
                style={{ margin: "0.45in" }}
              >
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white px-1 rounded">
                  Print Area
                </div>
              </div>

              <div
                style={{
                  height: "10in",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "30in",
                    transform: `translateY(-${i * 960}px)`,
                  }}
                >
                  {renderTemplate()}
                </div>
              </div>

              <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                Page {i + 1} of {numPages}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

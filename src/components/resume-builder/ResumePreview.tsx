import { useEffect, useRef, useState, Suspense } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { loadGoogleFont } from "@/utils/fontLoader";
import { getTemplateComponent } from "./templateRegistry";
import { Skeleton } from "@/components/ui/skeleton";

export function ResumePreview() {
  const { state } = useResume();
  const { resumeData } = state;
  const measureRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Handle responsive scaling of the resume preview
  useEffect(() => {
    const calculateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        // A4 width is 8.27 inches, which is 794px at 96 DPI.
        // We use a slightly smaller value to account for padding and margins.
        const a4WidthInPx = 800;
        const newScale = Math.min(1, containerWidth / a4WidthInPx);
        setScale(newScale);
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  // Ensure the current font is loaded whenever it changes
  useEffect(() => {
    if (resumeData.customization.fontFamily) {
      loadGoogleFont(resumeData.customization.fontFamily).catch(console.warn);
    }
  }, [resumeData.customization.fontFamily]);

  const renderTemplate = () => {
    const templateProps = { data: resumeData };
    const TemplateComponent = getTemplateComponent(resumeData.template);
    
    return (
      <Suspense fallback={
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      }>
        <TemplateComponent {...templateProps} />
      </Suspense>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-1 border-b border-gray-200 bg-white h-14 resume-preview-header">
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

      <div ref={previewContainerRef} className="flex-1 p-6 c-hidden bg-gray-100 mt-20 overflow-auto">
        <div
          className="mx-auto origin-top"
          style={{
            transform: `scale(${scale})`,
            height: `${scale * 11.69 * 96}px`, // Approximate height in pixels for the container
          }}
        >
          <div
            id="resume-preview"
            className="bg-white shadow-lg overflow-hidden"
            style={{
              '--accent-color': resumeData.customization.accentColor,
              fontFamily: resumeData.customization.fontFamily,
              width: '8.27in',
              height: '11.69in',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="p-[0.5in] h-full"
              style={{
                columnWidth: '7.27in', // 8.27in - 1in padding
                columnGap: '0.5in',
                columnFill: 'auto',
                height: '10.69in', // 11.69in - 1in padding
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

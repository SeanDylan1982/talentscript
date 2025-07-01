import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  margin?: number;
}

export const generatePDF = async (
  elementId: string, 
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'resume.pdf',
    quality = 2,
    format = 'a4',
    margin = 14,
  } = options;

  try {
    // Find the resume element
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Show loading state
    const loadingToast = document.createElement('div');
    loadingToast.textContent = 'Generating PDF...';
    loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(loadingToast);

    // Configure canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: quality * 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 0,
      height: element.scrollHeight,
      width: element.scrollWidth,
      scrollX: 0,
      scrollY: 0
    });

    // PDF dimensions in mm
    const pageWidth = format === 'a4' ? 200 : 206; // A4: 210mm, Letter: 216mm (8.5")
    const pageHeight = format === 'a4' ? 279 : 259; // A4: 297mm, Letter: 279mm (11")
    
    // Available space after margins
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - (margin * 2);
    
    // Convert canvas dimensions to mm (96 DPI to mm conversion)
    const canvasWidthMM = (canvas.width * 25.4) / (96 * quality * 2);
    const canvasHeightMM = (canvas.height * 25.4) / (96 * quality * 2);
    
    // Calculate scale to fit width
    const scale = availableWidth / canvasWidthMM;
    const scaledWidth = availableWidth;
    const scaledHeight = canvasHeightMM * scale;

    // Create PDF
    const pdf = new jsPDF(options);

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png', 2.0);

    // If content fits on one page
    if (scaledHeight <= availableHeight) {
      pdf.addImage(
        imgData, 
        'PNG', 
        margin, 
        margin, 
        scaledWidth, 
        scaledHeight,
        undefined,
        'FAST'
      );
    } else {
      // Multi-page handling
      let remainingHeight = scaledHeight;
      let currentY = 0;
      let pageNumber = 0;

      while (remainingHeight > 0) {
        // Calculate the height for this page
        const pageContentHeight = Math.min(remainingHeight, availableHeight);
        
        // Calculate the source rectangle for this page
        const sourceY = (currentY / scaledHeight) * canvas.height;
        const sourceHeight = (pageContentHeight / scaledHeight) * canvas.height;
        
        // Create a canvas for this page section
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        if (pageCtx) {
          // Fill with white background
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
          // Draw the section of the original canvas
          pageCtx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, pageCanvas.width, pageCanvas.height
          );
          
          // Add new page if not the first page
          if (pageNumber > 0) {
            pdf.addPage();
          }
          
          // Add the page image to PDF
          const pageImgData = pageCanvas.toDataURL('image/png', 2.0);
          pdf.addImage(
            pageImgData,
            'PNG',
            margin,
            margin,
            scaledWidth,
            pageContentHeight,
            undefined,
            'FAST'
          );
        }
        
        // Update for next page
        currentY += pageContentHeight;
        remainingHeight -= pageContentHeight;
        pageNumber++;
      }
    }

    // Save the PDF
    pdf.save(filename);

    // Remove loading toast
    if (document.body.contains(loadingToast)) {
      document.body.removeChild(loadingToast);
    }

    // Show success message
    const successToast = document.createElement('div');
    successToast.textContent = 'PDF downloaded successfully!';
    successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(successToast);
    
    setTimeout(() => {
      if (document.body.contains(successToast)) {
        document.body.removeChild(successToast);
      }
    }, 3000);

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Remove loading toast if it exists
    const loadingToast = document.querySelector('.fixed.top-4.right-4.bg-blue-600');
    if (loadingToast && document.body.contains(loadingToast)) {
      document.body.removeChild(loadingToast);
    }
    
    // Show error message
    const errorToast = document.createElement('div');
    errorToast.textContent = 'Failed to generate PDF. Please try again.';
    errorToast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(errorToast);
    
    setTimeout(() => {
      if (document.body.contains(errorToast)) {
        document.body.removeChild(errorToast);
      }
    }, 5000);
  }
};

export const generateResumeFilename = (fullName: string): string => {
  const cleanName = fullName
    .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
    .replace(/\s+/g, ' '); // Replace spaces with underscores
    // .toLowerCase();
  
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return `${cleanName || 'resume'} ${timestamp}.pdf`;
};

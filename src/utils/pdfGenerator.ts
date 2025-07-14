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
    format = 'a4 || letter',
    margin = 12,
  } = options;

  try {
    // Find all page elements
    const allPages = [];
    const firstPage = document.getElementById(elementId);
    if (!firstPage) {
      throw new Error('Resume element not found');
    }
    allPages.push(firstPage);
    
    // Find additional pages
    let pageIndex = 2;
    while (true) {
      const nextPage = document.getElementById(`resume-preview-page-${pageIndex}`);
      if (!nextPage) break;
      allPages.push(nextPage);
      pageIndex++;
    }

    // Show loading state
    const loadingToast = document.createElement('div');
    loadingToast.textContent = 'Generating PDF...';
    loadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(loadingToast);

    // PDF dimensions in mm
    const pageWidth = format === 'a4' ? 216 : 210;
    const pageHeight = format === 'a4' ? 279 : 297;

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: format === 'a4' ? 'a4' : [pageWidth, pageHeight]
    });

    // Process each page element
    for (let i = 0; i < allPages.length; i++) {
      const pageElement = allPages[i];
      
      // Create canvas for this page
      const pageCanvas = await html2canvas(pageElement, {
        scale: quality,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        removeContainer: true,
        imageTimeout: 0,
        width: pageElement.scrollWidth,
        height: pageElement.scrollHeight
      });
      
      // Convert to image
      const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
      
      // Add new page if not the first
      if (i > 0) {
        pdf.addPage();
      }
      
      // Add image to PDF (full page)
      pdf.addImage(
        pageImgData,
        'PNG',
        0,
        0,
        pageWidth,
        pageHeight
      );
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

export const generatePDFBlob = async (
  elementId: string, 
  options: PDFOptions = {}
): Promise<Blob> => {
  const {
    quality = 2,
    format = 'letter'
  } = options;

  // Find all page elements
  const allPages = [];
  const firstPage = document.getElementById(elementId);
  if (!firstPage) {
    throw new Error('Resume element not found');
  }
  allPages.push(firstPage);
  
  let pageIndex = 2;
  while (true) {
    const nextPage = document.getElementById(`resume-preview-page-${pageIndex}`);
    if (!nextPage) break;
    allPages.push(nextPage);
    pageIndex++;
  }

  const pageWidth = format === 'letter' ? 216 : 210;
  const pageHeight = format === 'letter' ? 279 : 297;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: format === 'a4' ? 'a4' : [pageWidth, pageHeight]
  });

  for (let i = 0; i < allPages.length; i++) {
    const pageElement = allPages[i];
    
    const pageCanvas = await html2canvas(pageElement, {
      scale: quality,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 0,
      width: pageElement.scrollWidth,
      height: pageElement.scrollHeight
    });
    
    const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
    
    if (i > 0) {
      pdf.addPage();
    }
    
    pdf.addImage(
      pageImgData,
      'PNG',
      0,
      0,
      pageWidth,
      pageHeight
    );
  }

  return pdf.output('blob');
};

export const generateResumeFilename = (fullName: string): string => {
  const cleanName = fullName
    .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove special characters
    .replace(/\s+/g, ' '); // Replace spaces with underscores
    // .toLowerCase();
  
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return `${cleanName || 'resume'} ${timestamp}.pdf`;
};

// Google Fonts utility for dynamic font loading
export const GOOGLE_FONTS = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Playfair Display', value: 'Playfair Display' },
  { name: 'Merriweather', value: 'Merriweather' }
];

// Track loaded fonts to avoid duplicate loading
const loadedFonts = new Set<string>();

export const loadGoogleFont = (fontFamily: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Skip if already loaded
    if (loadedFonts.has(fontFamily)) {
      resolve();
      return;
    }

    // Create font face URL
    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700&display=swap`;
    
    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
      loadedFonts.add(fontFamily);
      resolve();
      return;
    }

    // Create and append link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    
    link.onload = () => {
      loadedFonts.add(fontFamily);
      resolve();
    };
    
    link.onerror = () => {
      console.warn(`Failed to load font: ${fontFamily}`);
      reject(new Error(`Failed to load font: ${fontFamily}`));
    };
    
    document.head.appendChild(link);
  });
};

export const preloadAllFonts = async (): Promise<void> => {
  const fontPromises = GOOGLE_FONTS.map(font => 
    loadGoogleFont(font.value).catch(err => {
      console.warn(`Failed to preload font ${font.value}:`, err);
    })
  );
  
  await Promise.allSettled(fontPromises);
};

// Apply font to element and ensure it's loaded
export const applyFontFamily = async (fontFamily: string): Promise<void> => {
  try {
    await loadGoogleFont(fontFamily);
    
    // Force font to be applied by checking if it's available
    const testElement = document.createElement('div');
    testElement.style.fontFamily = fontFamily;
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.fontSize = '12px';
    testElement.textContent = 'Test';
    
    document.body.appendChild(testElement);
    
    // Wait a bit for font to be applied
    await new Promise(resolve => setTimeout(resolve, 100));
    
    document.body.removeChild(testElement);
  } catch (error) {
    console.warn(`Font application failed for ${fontFamily}:`, error);
  }
};
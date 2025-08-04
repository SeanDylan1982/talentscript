import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useResume } from '@/contexts/ResumeContext';
import { GOOGLE_FONTS, loadGoogleFont, preloadAllFonts } from '@/utils/fontLoader';
import { TemplateSelector } from '../TemplateSelector';

const ACCENT_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Gray', value: '#6B7280' }
];

export function CustomizationForm() {
  const { state, dispatch } = useResume();
  const { template, customization } = state.resumeData;

  // Preload fonts on component mount
  useEffect(() => {
    preloadAllFonts().catch(console.warn);
  }, []);

  // Load font when customization changes
  useEffect(() => {
    if (customization.fontFamily) {
      loadGoogleFont(customization.fontFamily).catch(console.warn);
    }
  }, [customization.fontFamily]);

  const updateTemplate = (templateId: string) => {
    // Type assertion to satisfy TypeScript - we'll ensure templateId is valid in the TemplateSelector
    dispatch({ type: 'UPDATE_TEMPLATE', payload: templateId as any });
  };

  const updateCustomization = (updates: Partial<typeof customization>) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATION', payload: updates });
  };

  const handleFontChange = async (fontFamily: string) => {
    // Load the font first
    try {
      await loadGoogleFont(fontFamily);
      updateCustomization({ fontFamily });
    } catch (error) {
      console.warn('Failed to load font:', error);
      // Still update the customization even if font loading fails
      updateCustomization({ fontFamily });
    }
  };

  return (
    <div className="space-y-6 m-4 p-2">
      <h3 className="text-base font-medium text-gray-900">Customize Your Resume</h3>
      
      {/* Template Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">Resume Template</Label>
        <div className="m-2">
          <TemplateSelector 
            onSelectTemplate={updateTemplate}
            selectedTemplateId={template}
          />
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-2 m-2 fontSelector">
        <Label>Font Family</Label>
        <Select
          value={customization.fontFamily}
          onValueChange={handleFontChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GOOGLE_FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Font changes will be applied to the resume preview
        </p>
      </div>

      {/* Accent Color */}
      <div className="space-y-3">
        <Label>Accent Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {ACCENT_COLORS.map((color) => (
            <Button
              key={color.value}
              variant="outline"
              className={`h-12 p-0 border-2 ${
                customization.accentColor === color.value
                  ? 'border-gray-900'
                  : 'border-gray-200'
              }`}
              onClick={() => updateCustomization({ accentColor: color.value })}
              title={color.name}
            >
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: color.value }}
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Profile Image Setting */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label>Show Profile Image</Label>
            <p className="text-sm text-gray-500">
              Display your profile photo on the resume (if uploaded)
            </p>
          </div>
          <Switch
            checked={customization.showProfileImage}
            onCheckedChange={(checked) => updateCustomization({ showProfileImage: checked })}
          />
        </div>
      </div>

      {/* Font Preview */}
      <div className="space-y-2">
        <Label>Font Preview</Label>
        <div 
          className="p-4 border rounded-lg bg-gray-50"
          style={{ fontFamily: customization.fontFamily }}
        >
          <h4 className="font-bold text-lg mb-2" style={{ color: customization.accentColor }}>
            Sample Heading
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            This is how your resume text will look with the selected font family.
          </p>
          <p className="text-xs text-gray-600">
            Font: {customization.fontFamily} • Color: {customization.accentColor}
          </p>
        </div>
      </div>
    </div>
  );
}
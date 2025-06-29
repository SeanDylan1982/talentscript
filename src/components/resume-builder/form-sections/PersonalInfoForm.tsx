import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';

export function PersonalInfoForm() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state.resumeData;

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: { profileImage: result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { profileImage: '' }
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-900">Personal Information</h3>
      
      {/* Profile Image Upload */}
      <div className="space-y-2">
        <Label>Profile Photo (Optional)</Label>
        {personalInfo.profileImage ? (
          <div className="flex items-center space-x-3">
            <img 
              src={personalInfo.profileImage} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <Button variant="outline" size="sm" onClick={removeImage}>
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <Label htmlFor="profile-upload" className="cursor-pointer">
                <span className="text-sm text-blue-600 hover:text-blue-500">Upload a photo</span>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </Label>
            </div>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john.smith@email.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State"
          />
        </div>

        {/* Optional Fields */}
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={personalInfo.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={personalInfo.github || ''}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>
    </div>
  );
}
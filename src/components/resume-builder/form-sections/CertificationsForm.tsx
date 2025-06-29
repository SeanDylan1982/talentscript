import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Certification } from '@/types/resume';

export function CertificationsForm() {
  const { state, dispatch } = useResume();
  const { certifications } = state.resumeData;

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expirationDate: ''
    };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCertification });
  };

  const updateCertification = (id: string, data: Partial<Certification>) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, data } });
  };

  const deleteCertification = (id: string) => {
    dispatch({ type: 'DELETE_CERTIFICATION', payload: id });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-900">Certifications</h3>
        <Button onClick={addCertification} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No certifications added yet.</p>
            <Button onClick={addCertification} className="mt-2" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Certification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={cert.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {cert.name || `Certification ${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCertification(cert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label>Certification Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                
                <div>
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Issue Date *</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label>Expiration Date (Optional)</Label>
                    <Input
                      type="month"
                      value={cert.expirationDate || ''}
                      onChange={(e) => updateCertification(cert.id, { expirationDate: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
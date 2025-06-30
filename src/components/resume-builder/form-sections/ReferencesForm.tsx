import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Users } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { Reference } from '@/types/resume';

export function ReferencesForm() {
  const { state, dispatch } = useResume();
  const { references } = state.resumeData;

  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    dispatch({ type: 'ADD_REFERENCE', payload: newReference });
  };

  const updateReference = (id: string, data: Partial<Reference>) => {
    dispatch({ type: 'UPDATE_REFERENCE', payload: { id, data } });
  };

  const deleteReference = (id: string) => {
    dispatch({ type: 'DELETE_REFERENCE', payload: id });
  };

  return (
    <div className="space-y-4 m-4 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <Users className="w-5 h-5 text-gray-600" /> */}
          <h3 className="text-base font-medium text-gray-900">
            Professional References
          </h3>
        </div>  
        <Button onClick={addReference} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Reference
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg m-2 p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Include 2-3 professional references who can
          speak to your work experience and character. Always ask for permission
          before listing someone as a reference.
        </p>
      </div>

      {references.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center m-2">
            {/* <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" /> */}
            <p className="text-gray-500 mb-3">No references added yet.</p>
            <p className="text-sm text-gray-400 mb-4">
              Add professional contacts who can vouch for your work and
              character.
            </p>
            <Button onClick={addReference} variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Your First Reference
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 p-2">
          {references.map((reference, index) => (
            <Card key={reference.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {reference.name || `Reference ${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReference(reference.id)}
                    className="text-gray-200 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={reference.name}
                      onChange={(e) =>
                        updateReference(reference.id, { name: e.target.value })
                      }
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <Label>
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={reference.title}
                      onChange={(e) =>
                        updateReference(reference.id, { title: e.target.value })
                      }
                      placeholder="Senior Manager"
                    />
                  </div>
                </div>

                <div>
                  <Label>
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={reference.company}
                    onChange={(e) =>
                      updateReference(reference.id, { company: e.target.value })
                    }
                    placeholder="Tech Solutions Inc."
                  />
                </div>

                <div>
                  <Label>
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={reference.relationship}
                    onChange={(e) =>
                      updateReference(reference.id, {
                        relationship: e.target.value,
                      })
                    }
                    placeholder="Former Manager, Direct Supervisor, Colleague, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={reference.email}
                      onChange={(e) =>
                        updateReference(reference.id, { email: e.target.value })
                      }
                      placeholder="john.smith@company.com"
                    />
                  </div>

                  <div>
                    <Label>
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={reference.phone}
                      onChange={(e) =>
                        updateReference(reference.id, { phone: e.target.value })
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {references.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800">
            <strong>Remember:</strong> Contact your references before submitting
            applications to ensure they're available and willing to provide a
            positive recommendation.
          </p>
        </div>
      )}
    </div>
  );
}
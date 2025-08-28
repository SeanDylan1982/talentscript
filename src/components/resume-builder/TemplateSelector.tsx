import { useState, Suspense, lazy } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { templateRegistry } from './templateRegistry';
import { TemplateCategory } from './types';
import {
  LayoutGrid,
  Briefcase,
  Sparkles,
  RectangleHorizontal,
  Palette,
  Target,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Lazy load the template preview components
const TemplatePreview = lazy(() => import('./TemplatePreview'));

// Type for template item
interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  atsFriendly?: boolean;
  tags?: string[];
}

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId?: string;
}

const categories = [
  { value: 'all', name: 'All', icon: <LayoutGrid className="h-5 w-5" /> },
  { value: TemplateCategory.PROFESSIONAL, name: 'Professional', icon: <Briefcase className="h-5 w-5" /> },
  { value: TemplateCategory.MODERN, name: 'Modern', icon: <Sparkles className="h-5 w-5" /> },
  { value: TemplateCategory.MINIMALIST, name: 'Minimalist', icon: <RectangleHorizontal className="h-5 w-5" /> },
  { value: TemplateCategory.CREATIVE, name: 'Creative', icon: <Palette className="h-5 w-5" /> },
  { value: TemplateCategory.SPECIALIZED, name: 'Specialized', icon: <Target className="h-5 w-5" /> },
  { value: 'ats', name: 'ATS Friendly', icon: <ShieldCheck className="h-5 w-5" /> },
];

export function TemplateSelector({ onSelectTemplate, selectedTemplateId }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter templates based on search query and selected category
  const filteredTemplates = templateRegistry.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      template.category === selectedCategory ||
      (selectedCategory === 'ats' && template.atsFriendly);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Choose a Template</h2>
          <p className="text-muted-foreground">
            Select a template that best fits your needs. You can change this later.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="w-full md:w-1/2">
            <Input
              type="search"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Tabs 
          value={selectedCategory}
          className="w-full"
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <TabsList className="grid w-full grid-cols-7 gap-1">
            {categories.map((cat) => (
              <TooltipProvider key={cat.value} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value={cat.value} className="h-10 w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow">
                      {cat.icon}
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent><p>{cat.name}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {filteredTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
                <button 
                  className="mt-4 text-sm text-primary hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredTemplates.map((template: TemplateItem) => {
                  const isSelected = selectedTemplateId === template.id;
                  return (
                    <TooltipProvider key={template.id} delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelectTemplate(template.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                onSelectTemplate(template.id);
                              }
                            }}
                            className={cn(
                              'group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                              isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'
                            )}
                          >
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-muted transition-transform duration-300 group-hover:scale-105">
                              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                                <TemplatePreview
                                  templateId={template.id}
                                  className="h-full w-full object-cover"
                                />
                              </Suspense>
                            </div>
                            {isSelected && (
                              <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          className="z-[999] max-w-sm p-0 overflow-y-auto"
                          side="right"
                          align="start"
                          sideOffset={8}
                          collisionPadding={16}
                          sticky="always"
                          style={{
                            height: 'calc(100vh - 10%)',
                          }}
                        >
                          <div className="flex flex-col space-y-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                            <div className="aspect-[3/4] w-full max-w-[250px] self-center overflow-hidden rounded-md bg-muted">
                              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                                <TemplatePreview
                                  templateId={template.id}
                                  className="h-full w-full object-cover"
                                />
                              </Suspense>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold leading-none tracking-tight">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center rounded-full border bg-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                {template.category}
                              </span>
                              {template.atsFriendly && (
                                <span className="inline-flex items-center rounded-full border border-green-500/50 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:border-green-500/70 dark:bg-green-950 dark:text-green-400">
                                  <ShieldCheck className="mr-1 h-3 w-3" />
                                  ATS Friendly
                                </span>
                              )}
                              {template.tags?.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full border bg-transparent px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PortfolioRenderer from './PortfolioRenderer';
import { PortfolioConfig } from '@/lib/db/schema';
import { Monitor, Smartphone, Globe, CheckCircle, Edit3, Save, X } from 'lucide-react';

interface PortfolioPreviewProps {
  config: PortfolioConfig;
  onPublish: () => Promise<void>;
  onConfigUpdate?: (newConfig: PortfolioConfig) => void;
  isPublishing?: boolean;
}

type PreviewMode = 'desktop' | 'mobile';

export default function PortfolioPreview({ 
  config, 
  onPublish, 
  onConfigUpdate,
  isPublishing = false 
}: PortfolioPreviewProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState<PortfolioConfig>(config);

  const handleConfigUpdate = () => {
    if (onConfigUpdate) {
      onConfigUpdate(editConfig);
    }
    setIsEditing(false);
  };

  const handleQuickEdit = (path: string, value: any) => {
    const newConfig = { ...editConfig };
    const keys = path.split('.');
    let current: any = newConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Portfolio Preview</h1>
              
              {/* Edit Mode Toggle */}
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                <span>{isEditing ? "Save Changes" : "Quick Edit"}</span>
              </Button>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                  className="flex items-center space-x-2"
                >
                  <Monitor className="h-4 w-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                  className="flex items-center space-x-2"
                >
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Mobile</span>
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditConfig(config);
                    setIsEditing(false);
                  }}
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                Print Preview
              </Button>
              <Button
                onClick={onPublish}
                disabled={isPublishing}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isPublishing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Publish Portfolio
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Edit Panel */}
      {isEditing && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Quick Edit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editConfig.content.hero.title}
                  onChange={(e) => handleQuickEdit('content.hero.title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editConfig.content.hero.subtitle}
                  onChange={(e) => handleQuickEdit('content.hero.subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={editConfig.content.contact.email}
                  onChange={(e) => handleQuickEdit('content.contact.email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleConfigUpdate} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Content */}
      <div className="flex justify-center py-8">
        <div 
          className={`bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ${
            previewMode === 'mobile' 
              ? 'w-80 h-[600px]' 
              : 'w-full max-w-4xl'
          }`}
        >
          {/* Preview Frame */}
          <div className="relative">
            {/* Frame Header */}
            <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-500">
                {previewMode === 'mobile' ? 'Mobile View' : 'Desktop View'}
              </div>
            </div>
            
            {/* Portfolio Content */}
            <div className={`${previewMode === 'mobile' ? 'h-[540px] overflow-y-auto' : ''}`}>
              <PortfolioRenderer config={isEditing ? editConfig : config} isPreview={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Portfolio Generated Successfully!</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">What's Included</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Professional hero section</li>
                  <li>• Services showcase</li>
                  <li>• About section with skills</li>
                  <li>• Contact form</li>
                  <li>• Mobile responsive design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Review your portfolio</li>
                  <li>• Use "Quick Edit" to make changes</li>
                  <li>• Click "Publish Portfolio"</li>
                  <li>• Get your live URL</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SEO optimized</li>
                  <li>• Fast loading</li>
                  <li>• Professional design</li>
                  <li>• Contact form ready</li>
                  <li>• Social media integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
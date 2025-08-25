'use client';

import { useState, useRef, useEffect } from 'react';
import { TemplateInfo } from '@/lib/template-loader';
import { getTemplateDefaultData, getTemplateInfo } from '@/lib/template-defaults';

// Authentication state
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface PreviewData {
  key: string;
  template: string;
  data: any;
  whatsappNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PreviewManagerPage() {
  const [key, setKey] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('inspiration-site');
  const [selectedPreview, setSelectedPreview] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [availableTemplates, setAvailableTemplates] = useState<TemplateInfo[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, isLoading: true });
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Load existing previews and templates when authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      loadPreviews();
      loadTemplates();
    }
  }, [authState.isAuthenticated]);

  // Load default data when template changes and no data exists
  useEffect(() => {
    if (selectedTemplate && !jsonData && authState.isAuthenticated) {
      loadDefaultData();
    }
  }, [selectedTemplate, authState.isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/preview-manager/verify');
      const data = await response.json();
      setAuthState({ isAuthenticated: data.authenticated, isLoading: false });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({ isAuthenticated: false, isLoading: false });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      const response = await fetch('/api/auth/preview-manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password.trim() }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAuthState({ isAuthenticated: true, isLoading: false });
        setPassword('');
      } else {
        setLoginError(data.error || 'Invalid password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/preview-manager/logout', { method: 'POST' });
      setAuthState({ isAuthenticated: false, isLoading: false });
      setPreviews([]);
      setAvailableTemplates([]);
      setKey('');
      setJsonData('');
      setPreviewUrl('');
      setSelectedTemplate('inspiration-site');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const response = await fetch('/api/templates');
      const data = await response.json();
      
      if (data.success && data.templates && data.templates.length > 0) {
        setAvailableTemplates(data.templates);
        // Set first template as default if none selected
        if (!selectedTemplate || !data.templates.find((t: TemplateInfo) => t.id === selectedTemplate)) {
          setSelectedTemplate(data.templates[0].id);
        }
      } else {
        // Fallback to hardcoded templates if API fails
        const fallbackTemplates = [
          {
            id: 'inspiration-site',
            name: 'Inspiration Site',
            description: 'Professional business website template',
            category: 'business',
            hasTypes: true,
            hasReadme: false
          },
          {
            id: 'dj-template',
            name: 'DJ Template',
            description: 'Bold, animated music artist website',
            category: 'creative',
            hasTypes: true,
            hasReadme: true
          }
        ];
        setAvailableTemplates(fallbackTemplates);
        if (!selectedTemplate || !fallbackTemplates.find(t => t.id === selectedTemplate)) {
          setSelectedTemplate('inspiration-site');
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      // Fallback to hardcoded templates
      const fallbackTemplates = [
        {
          id: 'inspiration-site',
          name: 'Inspiration Site',
          description: 'Professional business website template',
          category: 'business',
          hasTypes: true,
          hasReadme: false
        },
        {
          id: 'dj-template',
          name: 'DJ Template',
          description: 'Bold, animated music artist website',
          category: 'creative',
          hasTypes: true,
          hasReadme: true
        }
      ];
      setAvailableTemplates(fallbackTemplates);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const loadPreviews = async () => {
    try {
      const response = await fetch('/api/preview/list');
      const data = await response.json();
      if (data.success) {
        setPreviews(data.previews);
      }
    } catch (error) {
      console.error('Error loading previews:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonData(content);
      };
      reader.readAsText(file);
    }
  };

  const handlePreviewSelect = async (previewKey: string) => {
    if (!previewKey) return;
    
    try {
      const response = await fetch(`/api/preview/get?key=${previewKey}`);
      const data = await response.json();
      if (data.success) {
        setJsonData(JSON.stringify(data.preview.data, null, 2));
        setKey(previewKey);
        setSelectedTemplate(data.preview.template || 'inspiration-site');
      }
    } catch (error) {
      console.error('Error loading preview data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    
    let parsedData;
    try {
      parsedData = jsonData ? JSON.parse(jsonData) : getDefaultData();
    } catch (error) {
      alert('Invalid JSON format');
      return;
    }
    
    setIsCreating(true);
    
    try {
      const response = await fetch('/api/preview/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: key.trim(),
          template: selectedTemplate,
          data: parsedData,
          whatsappNumber: "972546104210"
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPreviewUrl(data.previewUrl);
        loadPreviews(); // Refresh the list
        alert('Preview created successfully!');
      } else {
        alert('Error creating preview: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating preview:', error);
      alert('Error creating preview. Please check the console for details.');
    } finally {
      setIsCreating(false);
    }
  };

  const getDefaultData = () => {
    return getTemplateDefaultData(selectedTemplate);
  };

  const loadDefaultData = () => {
    setIsLoadingData(true);
    try {
      const defaultData = getDefaultData();
      console.log(`Loading default data for template: ${selectedTemplate}`, defaultData);
      setJsonData(JSON.stringify(defaultData, null, 2));
    } catch (error) {
      console.error('Error loading default data:', error);
      alert('Error loading default data. Please try again.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleTemplateChange = (newTemplate: string) => {
    console.log('Template changing from', selectedTemplate, 'to', newTemplate);
    setSelectedTemplate(newTemplate);
    // Clear current data when template changes
    setJsonData('');
    setPreviewUrl('');
  };

  const testDJData = () => {
    try {
      const djData = getTemplateDefaultData('dj-template');
      console.log('Testing DJ template data:', djData);
      setJsonData(JSON.stringify(djData, null, 2));
      setSelectedTemplate('dj-template');
    } catch (error) {
      console.error('Error testing DJ data:', error);
      alert('Error loading DJ template data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-sm"
            >
              Logout
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Preview Manager
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create and manage your website previews with different templates
          </p>
        </div>

        {/* Authentication Check */}
        {authState.isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : !authState.isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
                <p className="text-gray-300">Enter the admin password to access the Preview Manager</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                {loginError && (
                  <div className="p-3 bg-red-900/50 border border-red-700/50 rounded-lg">
                    <p className="text-red-300 text-sm">{loginError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoggingIn || !password.trim()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  {isLoggingIn ? 'Authenticating...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        ) : (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  ✨
                </div>
                <h2 className="text-2xl font-bold text-white">Create/Edit Preview</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Preview Key
                  </label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Enter a unique key (e.g., client-name)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    disabled={isLoadingTemplates}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm text-white disabled:opacity-50"
                  >
                    {isLoadingTemplates ? (
                      <option value="" className="bg-gray-800 text-white">Loading templates...</option>
                    ) : (
                      availableTemplates.map((template) => (
                        <option key={template.id} value={template.id} className="bg-gray-800 text-white">
                          {template.name} ({template.category}) - {template.description}
                        </option>
                      ))
                    )}
                  </select>
                  
                  {/* Template Info */}
                  {selectedTemplate && !isLoadingTemplates && (
                    <div className="mt-3 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          availableTemplates.find(t => t.id === selectedTemplate)?.category === 'creative' 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : availableTemplates.find(t => t.id === selectedTemplate)?.category === 'personal'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {availableTemplates.find(t => t.id === selectedTemplate)?.category}
                        </span>
                        {availableTemplates.find(t => t.id === selectedTemplate)?.hasTypes && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
                            TypeScript
                          </span>
                        )}
                        {availableTemplates.find(t => t.id === selectedTemplate)?.hasReadme && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-semibold">
                            Documentation
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">
                        {availableTemplates.find(t => t.id === selectedTemplate)?.description}
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-700/50">
                        <p className="text-xs text-gray-400">
                          Default data: {getTemplateInfo(selectedTemplate)?.sampleDataName || 'Template-specific data'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Load Existing Preview
                  </label>
                  <select
                    value={selectedPreview}
                    onChange={(e) => {
                      setSelectedPreview(e.target.value);
                      if (e.target.value) {
                        handlePreviewSelect(e.target.value);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select a preview to edit...</option>
                    {previews.map((preview) => (
                      <option key={preview.key} value={preview.key} className="bg-gray-800 text-white">
                        {preview.key} ({preview.template || 'inspiration-site'}) - {new Date(preview.updatedAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    JSON Data
                  </label>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-3 gap-3 grid-cols-2 grid-rows-2 md:grid-rows-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-sm"
                      >
                        Upload JSON File
                      </button>
                      <button
                        type="button"
                        onClick={loadDefaultData}
                        className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-sm"
                      >
                        {isLoadingData ? 'Loading...' : `Load ${getTemplateInfo(selectedTemplate)?.sampleDataName || 'Default'} Data`}
                      </button>
                      <button
                        type="button"
                        onClick={testDJData}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-sm"
                      >
                        Test DJ Data
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <textarea
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-gray-800/50 backdrop-blur-sm font-mono text-sm text-white placeholder-gray-400"
                    placeholder="Paste JSON data here or upload a file..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isCreating || !key.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  {isCreating ? 'Creating...' : 'Create/Update Preview'}
                </button>
              </form>

              {previewUrl && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700/50 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-green-300 font-semibold">Preview created successfully!</p>
                  </div>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
                  >
                    View Preview →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview List */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                📋
              </div>
              <h2 className="text-2xl font-bold text-white">Existing Previews</h2>
            </div>
            
            {previews.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-gray-400 text-lg font-medium">No previews yet. Create your first preview!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {previews.map((preview) => (
                  <div key={preview.key} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-y-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-2">{preview.key}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold">Template:</span> {preview.template || 'inspiration-site'}
                          </p>
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold">Created:</span> {new Date(preview.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold">Updated:</span> {new Date(preview.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 ml-6">
                        <a
                          href={`/preview/${preview.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-sm"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handlePreviewSelect(preview.key)}
                          className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
} 
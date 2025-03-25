import React, { useState } from 'react';
import { Industry, IndustrySettings as IndustrySettingsType, ComplianceRequirement } from '../types/industry';
import { defaultIndustrySettings } from '../data/industrySettings';
import { Building2, Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import { 
  Briefcase, 
  Shield, 
  FileText, 
  Brain, 
  Hash, 
  Award,
  Check
} from 'lucide-react';

export function IndustrySettingsComponent() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('technology');
  const [settings, setSettings] = useState<IndustrySettingsType>(defaultIndustrySettings.technology);
  const [newCompliance, setNewCompliance] = useState<Partial<ComplianceRequirement>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  const handleIndustryChange = (industry: Industry) => {
    setSelectedIndustry(industry);
    setSettings(defaultIndustrySettings[industry]);
  };

  const handleAddCompliance = () => {
    if (newCompliance.name && newCompliance.description) {
      const compliance: ComplianceRequirement = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCompliance.name,
        description: newCompliance.description,
        required: newCompliance.required || false,
        region: newCompliance.region || ['Global']
      };
      setSettings(prev => ({
        ...prev,
        compliance: [...prev.compliance, compliance]
      }));
      setNewCompliance({});
    }
  };

  const handleRemoveCompliance = (id: string) => {
    setSettings(prev => ({
      ...prev,
      compliance: prev.compliance.filter(c => c.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Industry Settings</h2>
        <select
          value={selectedIndustry}
          onChange={(e) => handleIndustryChange(e.target.value as Industry)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.keys(defaultIndustrySettings).map((industry) => (
            <option key={industry} value={industry}>
              {industry.charAt(0).toUpperCase() + industry.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Fields */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Required Fields</h3>
          </div>
          <ul className="space-y-2">
            {settings.requiredFields.map((field) => (
              <li key={field} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-600">{field}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance Requirements */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Compliance Requirements</h3>
          </div>
          <div className="space-y-4">
            {settings.compliance.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{req.name}</h4>
                  <p className="text-sm text-gray-600">{req.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveCompliance(req.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Requirement name"
                value={newCompliance.name || ''}
                onChange={(e) => setNewCompliance(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newCompliance.description || ''}
                onChange={(e) => setNewCompliance(prev => ({ ...prev, description: e.target.value }))}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleAddCompliance}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Model */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Model</h3>
          </div>
          <p className="text-gray-600">{settings.aiModel}</p>
        </div>

        {/* Keywords */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Hash className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {settings.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Certifications</h3>
          </div>
          <ul className="space-y-2">
            {settings.certifications.map((cert) => (
              <li key={cert} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-600">{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 
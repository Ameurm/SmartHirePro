import React, { useState } from 'react';
import { Bell, Mail, Shield, User } from 'lucide-react';

type SettingItem = {
  id: string;
  name: string;
  value: string | boolean;
  type: 'text' | 'toggle' | 'select' | 'textarea';
  options?: string[];
};

type SettingSection = {
  title: string;
  icon: any;
  items: SettingItem[];
};

const defaultInterviewTemplate = `Dear {candidate_name},

We are pleased to invite you for an interview for the {position} position at {company_name}.

Interview Details:
Date: {interview_date}
Time: {interview_time}
Location: {interview_location}

Please confirm your attendance by replying to this email.

Best regards,
{recruiter_name}`;

const defaultOfferTemplate = `Dear {candidate_name},

We are delighted to offer you the position of {position} at {company_name}.

Offer Details:
Position: {position}
Start Date: {start_date}
Salary: {salary}
Benefits: {benefits}

Please review the attached offer letter for complete details.

Best regards,
{recruiter_name}`;

export function Settings() {
  const [settings, setSettings] = useState<SettingSection[]>([
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { id: 'companyName', name: 'Company Name', value: '', type: 'text' },
        { id: 'companySize', name: 'Company Size', value: '1-10', type: 'select', options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
        { id: 'industry', name: 'Industry', value: '', type: 'text' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { id: 'emailNotifications', name: 'Email Notifications', value: true, type: 'toggle' },
        { id: 'pushNotifications', name: 'Push Notifications', value: true, type: 'toggle' },
        { id: 'interviewReminders', name: 'Interview Reminders', value: true, type: 'toggle' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { id: 'twoFactorAuth', name: 'Two-Factor Authentication', value: false, type: 'toggle' },
        { id: 'passwordExpiry', name: 'Password Expiry', value: '90', type: 'select', options: ['30', '60', '90', '180', '365'] },
      ],
    },
    {
      title: 'Email Templates',
      icon: Mail,
      items: [
        { id: 'interviewTemplate', name: 'Interview Invitation Template', value: defaultInterviewTemplate, type: 'textarea' },
        { id: 'offerTemplate', name: 'Offer Letter Template', value: defaultOfferTemplate, type: 'textarea' },
      ],
    },
  ]);

  const handleSettingChange = (sectionIndex: number, itemId: string, newValue: string | boolean) => {
    setSettings(prevSettings => {
      const newSettings = [...prevSettings];
      const section = newSettings[sectionIndex];
      const item = section.items.find(item => item.id === itemId);
      if (item) {
        item.value = newValue;
      }
      return newSettings;
    });
  };

  const renderSettingInput = (sectionIndex: number, item: SettingItem) => {
    switch (item.type) {
      case 'text':
        return (
          <input
            type="text"
            value={item.value as string}
            onChange={(e) => handleSettingChange(sectionIndex, item.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={item.value as string}
            onChange={(e) => handleSettingChange(sectionIndex, item.id, e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
            placeholder="Enter template text..."
          />
        );
      case 'toggle':
        return (
          <button
            onClick={() => handleSettingChange(sectionIndex, item.id, !item.value)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              item.value ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                item.value ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        );
      case 'select':
        return (
          <select
            value={item.value as string}
            onChange={(e) => handleSettingChange(sectionIndex, item.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {item.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {settings.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <label className="text-gray-600 mb-1">{item.name}</label>
                    {renderSettingInput(sectionIndex, item)}
                    {item.type === 'textarea' && (
                      <p className="mt-1 text-sm text-gray-500">
                        Available variables: {'{candidate_name}'}, {'{position}'}, {'{company_name}'}, {'{interview_date}'}, {'{interview_time}'}, {'{interview_location}'}, {'{recruiter_name}'}, {'{start_date}'}, {'{salary}'}, {'{benefits}'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
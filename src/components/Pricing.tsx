import React, { useState } from 'react';
import { Check, Zap, Rocket, Crown, Lock } from 'lucide-react';

type SubscriptionPlan = {
  name: string;
  price: number;
  icon: any;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
  limits: {
    jobPostings: number;
    aiScreening: boolean;
    customTemplates: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
    customModels: boolean;
  };
};

const plans: SubscriptionPlan[] = [
  {
    name: 'Starter',
    price: 49,
    icon: Zap,
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 25 job postings',
      'Basic AI resume screening',
      'Email support',
      'Interview scheduling',
      'Basic analytics'
    ],
    color: 'blue',
    limits: {
      jobPostings: 25,
      aiScreening: true,
      customTemplates: false,
      apiAccess: false,
      whiteLabel: false,
      customModels: false
    }
  },
  {
    name: 'Professional',
    price: 99,
    icon: Rocket,
    description: 'Ideal for growing companies',
    features: [
      'Up to 100 job postings',
      'Advanced AI matching',
      'Priority support',
      'Custom interview templates',
      'Advanced analytics',
      'API access'
    ],
    color: 'purple',
    popular: true,
    limits: {
      jobPostings: 100,
      aiScreening: true,
      customTemplates: true,
      apiAccess: true,
      whiteLabel: false,
      customModels: false
    }
  },
  {
    name: 'Enterprise',
    price: 249,
    icon: Crown,
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited job postings',
      'Custom AI models',
      'Dedicated account manager',
      'White-label solution',
      'Advanced integrations',
      'Custom reporting',
      'SLA guarantee'
    ],
    color: 'indigo',
    limits: {
      jobPostings: Infinity,
      aiScreening: true,
      customTemplates: true,
      apiAccess: true,
      whiteLabel: true,
      customModels: true
    }
  }
];

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsSubscribed(true);
  };

  const handleUpgrade = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };

  const renderFeatureStatus = (feature: string, plan: SubscriptionPlan) => {
    const isAvailable = plan.features.includes(feature);
    return (
      <div className="flex items-center justify-between">
        <span className="text-gray-600">{feature}</span>
        {isAvailable ? (
          <Check className={`w-5 h-5 text-${plan.color}-500`} />
        ) : (
          <Lock className="w-5 h-5 text-gray-400" />
        )}
      </div>
    );
  };

  if (isSubscribed && selectedPlan) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Current Plan: {selectedPlan.name}</h2>
              <p className="text-gray-600">${selectedPlan.price}/month</p>
            </div>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Change Plan
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Features</h3>
              <div className="space-y-4">
                {selectedPlan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 text-${selectedPlan.color}-500 mr-3`} />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Usage Limits</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600">Job Postings: </span>
                  <span className="font-semibold">
                    {selectedPlan.limits.jobPostings === Infinity ? 'Unlimited' : selectedPlan.limits.jobPostings}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">AI Screening: </span>
                  <span className="font-semibold">{selectedPlan.limits.aiScreening ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Custom Templates: </span>
                  <span className="font-semibold">{selectedPlan.limits.customTemplates ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div>
                  <span className="text-gray-600">API Access: </span>
                  <span className="font-semibold">{selectedPlan.limits.apiAccess ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div>
                  <span className="text-gray-600">White Label: </span>
                  <span className="font-semibold">{selectedPlan.limits.whiteLabel ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Custom AI Models: </span>
                  <span className="font-semibold">{selectedPlan.limits.customModels ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Scale your recruitment process with our flexible pricing plans. All plans include our core AI-powered features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="bg-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`inline-block p-3 rounded-lg bg-${plan.color}-100 mb-4`}>
                <Icon className={`w-6 h-6 text-${plan.color}-600`} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className={`w-5 h-5 text-${plan.color}-500 mr-3 flex-shrink-0`} />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-${plan.color}-600 hover:bg-${plan.color}-700 transition-colors`}
              >
                Subscribe Now
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Need a custom plan? {' '}
          <a href="#" className="text-purple-600 font-semibold hover:text-purple-700">
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  );
}
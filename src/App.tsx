import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { Users, BarChart2, Calendar, FileText, Settings as SettingsIcon, Briefcase, CreditCard, Building2, LineChart } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ResumeUpload } from './components/ResumeUpload';
import { CandidateList } from './components/CandidateList';
import { Interviews } from './components/Interviews';
import { Settings } from './components/Settings';
import { Pricing } from './components/Pricing';
import { JobPostModal } from './components/JobPostModal';
import { IndustrySettingsComponent } from './components/IndustrySettings';
import { Analytics } from './components/Analytics';

function App() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isJobModalOpen, setIsJobModalOpen] = React.useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart2 },
    { id: 'candidates', name: 'Candidates', icon: Users },
    { id: 'interviews', name: 'Interviews', icon: Calendar },
    { id: 'resumes', name: 'Resumes', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: LineChart },
    { id: 'industry', name: 'Industry', icon: Building2 },
    { id: 'pricing', name: 'Pricing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <Dashboard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
                <ResumeUpload />
              </div>
              <div>
                <CandidateList />
              </div>
            </div>
          </>
        );
      case 'candidates':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">All Candidates</h2>
            <CandidateList />
          </div>
        );
      case 'interviews':
        return <Interviews />;
      case 'resumes':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Resume Management</h2>
            <ResumeUpload />
          </div>
        );
      case 'analytics':
        return <Analytics />;
      case 'industry':
        return <IndustrySettingsComponent />;
      case 'pricing':
        return <Pricing />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Background */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Recruitment Assistant</h1>
                <p className="text-indigo-100 text-sm">Streamline your hiring process</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsJobModalOpen(true)}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                New Job Post
              </button>
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-white/20">
                {user.email?.[0].toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-white text-indigo-600'
                      : 'text-indigo-100 hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Job Post Modal */}
      <JobPostModal 
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 AI Recruitment Assistant. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
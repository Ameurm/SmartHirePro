import React from 'react';
import { Analytics as AnalyticsType } from '../types/industry';
import {
  Clock,
  UserCheck,
  DollarSign,
  BarChart2,
  Users,
  CheckCircle,
  TrendingUp,
  PieChart,
  Calendar,
  Target,
  Briefcase,
  Award,
  LineChart,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const mockAnalytics: AnalyticsType = {
  timeToHire: 28,
  candidateQuality: 85,
  costPerHire: 2500,
  sourceEffectiveness: {
    'LinkedIn': 45,
    'Indeed': 25,
    'Company Website': 15,
    'Referrals': 10,
    'Other': 5
  },
  interviewSuccessRate: 75,
  offerAcceptanceRate: 85,
  retentionRate: 90,
  diversityMetrics: {
    gender: {
      'Male': 55,
      'Female': 40,
      'Other': 5
    },
    ethnicity: {
      'White': 45,
      'Asian': 25,
      'Hispanic': 15,
      'Black': 10,
      'Other': 5
    },
    age: {
      '18-24': 10,
      '25-34': 45,
      '35-44': 30,
      '45-54': 10,
      '55+': 5
    }
  }
};

// Mock data for trends
const mockTrends = {
  timeToHire: [32, 30, 28, 25, 28],
  candidateQuality: [80, 82, 85, 83, 85],
  costPerHire: [2800, 2700, 2600, 2500, 2500],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
};

// Mock data for pipeline
const mockPipeline = {
  total: 150,
  stages: {
    'Applied': 150,
    'Screened': 120,
    'Interviewed': 80,
    'Offered': 40,
    'Hired': 25
  }
};

// Mock data for cost breakdown
const mockCostBreakdown = {
  advertising: 800,
  screening: 400,
  interviewing: 600,
  onboarding: 400,
  other: 300
};

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Analytics() {
  const [timeRange, setTimeRange] = React.useState('6m');
  const [selectedMetric, setSelectedMetric] = React.useState('all');
  const [drillDown, setDrillDown] = React.useState<{
    type: string;
    data: any;
    title: string;
  } | null>(null);

  // Prepare data for line chart
  const lineChartData = mockTrends.months.map((month, index) => ({
    month,
    'Time to Hire': mockTrends.timeToHire[index],
    'Candidate Quality': mockTrends.candidateQuality[index],
    'Cost per Hire': mockTrends.costPerHire[index]
  }));

  // Prepare data for pipeline chart
  const pipelineData = Object.entries(mockPipeline.stages).map(([stage, count]) => ({
    stage,
    count,
    percentage: Math.round((count / mockPipeline.total) * 100)
  }));

  // Prepare data for cost breakdown pie chart
  const costData = Object.entries(mockCostBreakdown).map(([name, value]) => ({
    name,
    value
  }));

  // Prepare data for source effectiveness pie chart
  const sourceData = Object.entries(mockAnalytics.sourceEffectiveness).map(([name, value]) => ({
    name,
    value
  }));

  const handleExport = () => {
    // Prepare data for export
    const exportData = {
      keyMetrics: {
        timeToHire: mockAnalytics.timeToHire,
        candidateQuality: mockAnalytics.candidateQuality,
        costPerHire: mockAnalytics.costPerHire,
        offerAcceptanceRate: mockAnalytics.offerAcceptanceRate
      },
      trends: lineChartData,
      pipeline: pipelineData,
      costBreakdown: costData,
      sourceEffectiveness: sourceData,
      diversityMetrics: mockAnalytics.diversityMetrics
    };

    // Convert to CSV
    const csvContent = convertToCSV(exportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data: any) => {
    const flattenObject = (obj: any, prefix = '') => {
      return Object.keys(obj).reduce((acc: any, key) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(acc, flattenObject(obj[key], pre + key));
        } else {
          acc[pre + key] = obj[key];
        }
        return acc;
      }, {});
    };

    const flattened = flattenObject(data);
    const headers = Object.keys(flattened);
    const rows = [headers.join(',')];
    rows.push(headers.map(header => flattened[header]).join(','));
    return rows.join('\n');
  };

  const handleDrillDown = (type: string, data: any, title: string) => {
    setDrillDown({ type, data, title });
  };

  const handleBack = () => {
    setDrillDown(null);
  };

  const renderDrillDownContent = () => {
    if (!drillDown) return null;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h3 className="text-lg font-semibold">{drillDown.title}</h3>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {drillDown.type === 'bar' ? (
              <RechartsBarChart data={drillDown.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </RechartsBarChart>
            ) : (
              <RechartsPieChart>
                <Pie
                  data={drillDown.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {drillDown.data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  if (drillDown) {
    return renderDrillDownContent();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Hiring Analytics</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Time to Hire</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.timeToHire} days</p>
          <p className="text-sm text-gray-600">Average time from posting to hire</p>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">-12% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <UserCheck className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Candidate Quality</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.candidateQuality}%</p>
          <p className="text-sm text-gray-600">Based on screening criteria</p>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+5% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold">Cost per Hire</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">${mockAnalytics.costPerHire}</p>
          <p className="text-sm text-gray-600">Average cost per successful hire</p>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">+8% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Offer Acceptance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.offerAcceptanceRate}%</p>
          <p className="text-sm text-gray-600">Of offers accepted</p>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+3% vs last period</span>
          </div>
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <LineChart className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Key Metrics Trends</h3>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Metrics</option>
              <option value="timeToHire">Time to Hire</option>
              <option value="candidateQuality">Candidate Quality</option>
              <option value="costPerHire">Cost per Hire</option>
            </select>
            <button
              onClick={() => handleDrillDown('line', lineChartData, 'Detailed Trends Analysis')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Time to Hire" stroke="#8884d8" />
              <Line type="monotone" dataKey="Candidate Quality" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Cost per Hire" stroke="#ffc658" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-semibold">Candidate Pipeline</h3>
            </div>
            <button
              onClick={() => handleDrillDown('bar', pipelineData, 'Detailed Pipeline Analysis')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold">Cost Breakdown</h3>
            </div>
            <button
              onClick={() => handleDrillDown('pie', costData, 'Detailed Cost Analysis')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Success Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Interview Success Rate</h3>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {mockAnalytics.interviewSuccessRate}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${mockAnalytics.interviewSuccessRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold">Retention Rate</h3>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-green-600">
                  {mockAnalytics.retentionRate}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${mockAnalytics.retentionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Effectiveness */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <PieChart className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold">Source Effectiveness</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Diversity Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold">Diversity Metrics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gender Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">Gender Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(mockAnalytics.diversityMetrics.gender).map(([name, value]) => ({
                      name,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(mockAnalytics.diversityMetrics.gender).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ethnicity Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">Ethnicity Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(mockAnalytics.diversityMetrics.ethnicity).map(([name, value]) => ({
                      name,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(mockAnalytics.diversityMetrics.ethnicity).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Age Distribution */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">Age Distribution</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={Object.entries(mockAnalytics.diversityMetrics.age).map(([name, value]) => ({
                    name,
                    value
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
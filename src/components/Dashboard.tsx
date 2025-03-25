import React from 'react';
import { BarChart, Users, Calendar, FileText } from 'lucide-react';

const stats = [
  { name: 'Total Candidates', value: '45', icon: Users },
  { name: 'Interviews Scheduled', value: '12', icon: Calendar },
  { name: 'Resumes Processed', value: '89', icon: FileText },
  { name: 'Avg. Score', value: '85%', icon: BarChart },
];

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <Icon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
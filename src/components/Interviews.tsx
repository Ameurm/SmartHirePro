import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const upcomingInterviews = [
  {
    id: 1,
    candidate: 'John Smith',
    position: 'Senior React Developer',
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'Technical Interview',
  },
  {
    id: 2,
    candidate: 'Sarah Johnson',
    position: 'Full Stack Engineer',
    date: '2024-03-16',
    time: '2:30 PM',
    type: 'Culture Fit',
  },
];

export function Interviews() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Schedule Interview
        </button>
      </div>

      <div className="grid gap-4">
        {upcomingInterviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                <p className="text-gray-600">{interview.position}</p>
                <p className="text-sm text-gray-500 mt-1">{interview.type}</p>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <button className="hover:text-blue-800">Edit</button>
                <span>•</span>
                <button className="hover:text-blue-800">Cancel</button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{interview.time}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Virtual</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
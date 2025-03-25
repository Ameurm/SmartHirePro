import React from 'react';
import { Star, Calendar, Mail } from 'lucide-react';
import type { Candidate } from '../types';

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: 5,
    score: 92,
    status: 'reviewing',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    experience: 3,
    score: 88,
    status: 'new',
  },
];

export function CandidateList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Top Candidates</h2>
        <div className="space-y-4">
          {mockCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    <span className="text-sm">{candidate.email}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{candidate.score}%</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {candidate.experience} years experience
                </span>
                <button className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
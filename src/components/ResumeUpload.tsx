import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, Loader } from 'lucide-react';
import { ResumeParser, ParsedResume } from '../utils/resumeParser';

export function ResumeUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [parsedResumes, setParsedResumes] = useState<ParsedResume[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setUploadStatus('processing');
    
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const text = await file.text();
          return await ResumeParser.parseResume(text);
        })
      );
      
      setParsedResumes(prev => [...prev, ...results]);
      setUploadStatus('success');
      
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error parsing resumes:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Resumes</h3>
          <p className="text-gray-500 mb-4">
            Drag and drop your files here or click to browse
          </p>
          <input
            type="file"
            className="hidden"
            id="fileInput"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
          />
          <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Select Files
          </label>
          
          {uploadStatus === 'processing' && (
            <div className="flex items-center mt-4 text-blue-600">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              <span>Processing resumes...</span>
            </div>
          )}
          {uploadStatus === 'success' && (
            <div className="flex items-center mt-4 text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Upload successful!</span>
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="flex items-center mt-4 text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Upload failed. Please try again.</span>
            </div>
          )}
        </div>
      </div>

      {parsedResumes.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Parsed Resumes</h3>
            <div className="space-y-4">
              {parsedResumes.map((resume, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{resume.personalInfo.name}</h4>
                      <p className="text-gray-600">{resume.personalInfo.email}</p>
                      {resume.personalInfo.location && (
                        <p className="text-gray-600">{resume.personalInfo.location}</p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {resume.cultureFitScore}% Match
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Technical Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Soft Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {resume.softSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Experience</h5>
                    <p className="text-gray-600">
                      {resume.experience.years} years of experience
                    </p>
                    <div className="mt-2">
                      {resume.experience.roles.map((role, idx) => (
                        <div key={idx} className="text-gray-600">{role}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Education</h5>
                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="text-gray-600">
                        {edu.degree} - {edu.institution} {edu.year && `(${edu.year})`}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
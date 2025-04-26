import React, { useState } from 'react';
import linkedinService from '../services/linkedinService';

const ConnectionOutreach = ({ jobDetails, isPremium }) => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadConnections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await linkedinService.getConnections(jobDetails);
      setConnections(data);
    } catch (err) {
      setError('Failed to load connections. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Network Connections</h3>
        <p className="text-sm text-gray-600">
          Find and reach out to your LinkedIn connections at {jobDetails.company}
        </p>
      </div>

      {!connections.length && !isLoading && (
        <button
          onClick={loadConnections}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Load Connections
        </button>
      )}

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading connections...</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {connections.length > 0 && (
        <div className="space-y-4">
          {connections.map((connection) => (
            <div
              key={connection.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-medium text-gray-900">
                    {connection.name}
                  </h4>
                  <p className="text-sm text-gray-600">{connection.title}</p>
                  <p className="text-sm text-gray-500">{connection.company}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {connection.relevanceReason}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {connection.relevance}% Match
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {connection.degree === 1 ? '1st' : '2nd'} degree
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectionOutreach;

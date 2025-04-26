import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import ConnectionOutreach from './ConnectionOutreach';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const JobDescription = ({ job }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-base font-medium text-gray-900 mb-2">About the Role</h3>
      <p className="text-sm text-gray-600">{job.description}</p>
    </div>

    {job.highlights && (
      <div>
        <h3 className="text-base font-medium text-gray-900 mb-2">Key Highlights</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          {job.highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-gray-600">{highlight}</li>
          ))}
        </ul>
      </div>
    )}

    <div>
      <h3 className="text-base font-medium text-gray-900 mb-2">Requirements</h3>
      <ul className="list-disc pl-5 space-y-1.5">
        {job.requirements.map((req, index) => (
          <li key={index} className="text-sm text-gray-600">{req}</li>
        ))}
      </ul>
    </div>
  </div>
);

const JobDetails = ({ job, isPremiumUser = false }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="mt-6">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-primary-700 shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary-600'
              )
            }
          >
            Job Description
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-primary-700 shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary-600'
              )
            }
          >
            Network Connections
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <JobDescription job={job} />
          </Tab.Panel>
          <Tab.Panel>
            <ConnectionOutreach 
              jobDetails={{
                title: job.title,
                company: job.company,
                industry: job.industry
              }}
              isPremium={isPremiumUser}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default JobDetails;

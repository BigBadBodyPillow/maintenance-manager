import { useState, useEffect } from 'react';

//components
import RainbowLine from './components/RainbowLine.jsx';
import JobForm from './components/JobForm.jsx';
import JobList from './components/JobList.jsx';
import Modal from './components/Modal.jsx';
import BatchStatusUpdater from './components/BatchStatusUpdater.jsx';
import ArchiveToggle from './components/ArchiveToggle.jsx';
import SelectAll from './components/SelectAll.jsx';

//styles
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  const [batchStatus, setBatchStatus] = useState('submitted');
  const [showArchived, setShowArchived] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // fetch
  useEffect(() => {
    fetch('http://localhost:4000/jobs')
      .then((response) => response.json())
      .then(setJobs);
  }, []);

  // add job
  const handleAddJob = async (job) => {
    const response = await fetch('http://localhost:4000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    });
    const newJob = await response.json();
    setJobs((prev) => [...prev, newJob]);
  };

  // open modal
  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  // close modal
  const handleCloseModal = () => {
    setEditingJob(null);
  };

  // update job
  const handleUpdateJob = async (updatedJob) => {
    const response = await fetch(
      `http://localhost:4000/jobs/${updatedJob._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      }
    );
    const savedJob = await response.json();
    setJobs(jobs.map((job) => (job._id === savedJob._id ? savedJob : job)));
    setEditingJob(null);
  };

  // archive
  const handleArchiveJob = async (jobId) => {
    const jobToArchive = jobs.find((job) => job._id === jobId);
    if (!jobToArchive) return;

    const response = await fetch(`http://localhost:4000/jobs/${jobId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...jobToArchive, archived: true }),
    });
    // update job list
    const updatedJob = await response.json();
    setJobs(jobs.map((job) => (job._id === jobId ? updatedJob : job)));
    setSelectedJobIds(selectedJobIds.filter((id) => id !== jobId));
  };

  //unarchive
  const handleUnarchiveJob = async (jobId) => {
    const jobToUnarchive = jobs.find((job) => job._id === jobId);
    if (!jobToUnarchive) return;
    const response = await fetch(`http://localhost:4000/jobs/${jobId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...jobToUnarchive, archived: false }),
    });

    const updatedJob = await response.json();
    setJobs(jobs.map((job) => (job._id === jobId ? updatedJob : job)));
  };

  // Batch selection handlers
  const handleSelectJob = (jobId) => {
    setSelectedJobIds(function (prev) {
      return prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
    });
  };

  //select all
  const handleSelectAll = (checked) => {
    const visibleJobs = jobs.filter((job) =>
      showArchived ? job.archived : !job.archived
    );
    if (checked) {
      setSelectedJobIds(visibleJobs.map((job) => job._id));
    } else {
      setSelectedJobIds([]);
    }
  };

  // batgch status
  const handleBatchStatusChange = (e) => {
    setBatchStatus(e.target.value);
  };

  // batch update status in db
  const handleBatchUpdate = async () => {
    const updatedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (selectedJobIds.includes(job._id)) {
          const response = await fetch(
            `http://localhost:4000/jobs/${job._id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...job, status: batchStatus }),
            }
          );
          return await response.json();
        }
        return job;
      })
    );
    setJobs(updatedJobs);
    setSelectedJobIds([]);
  };

  //filter
  const visibleJobs = jobs
    .filter((job) => (showArchived ? job.archived : !job.archived))
    .filter((job) =>
      statusFilter === 'all' ? true : job.status === statusFilter
    );

  // update filter based on dropdown slectin
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  return (
    <div>
      <RainbowLine />
      <h1>Maintaiance Manager</h1>
      <main>
        <h2>Submit a Job</h2>
        <JobForm onAddJob={handleAddJob} />
        <hr />
        <h2>{showArchived ? 'Archived Jobs' : 'All Jobs'}</h2>
        <div className="filter-container">
          <label>
            Filter by Status {''}
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="all">All</option>
              <option value="submitted">Submitted</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
        <BatchStatusUpdater
          batchStatus={batchStatus}
          onBatchStatusChange={handleBatchStatusChange}
          onBatchUpdate={handleBatchUpdate}
          disableUpdate={selectedJobIds.length === 0}
        />
        <div className="checkbox-container  ">
          <SelectAll
            allSelected={
              selectedJobIds.length === visibleJobs.length &&
              visibleJobs.length > 0
            }
            onSelectAll={handleSelectAll}
          />
          <ArchiveToggle
            showArchived={showArchived}
            onToggle={setShowArchived}
          />
        </div>
        <JobList
          jobs={visibleJobs}
          onEditJob={handleEditJob}
          selectedJobIds={selectedJobIds}
          onSelectJob={handleSelectJob}
          onArchiveJob={handleArchiveJob}
          onUnarchiveJob={handleUnarchiveJob}
          showArchived={showArchived}
        />

        {/* modals seem pretty bad for accesiblity, or i might be doing it wrong */}

        {/* !! makes it a boolean but keeps its original value instead of being the oposite */}
        <Modal isOpen={!!editingJob} onClose={handleCloseModal}>
          <h2>Edit Job</h2>
          <JobForm
            onUpdateJob={handleUpdateJob}
            editingJob={editingJob}
            isEditing={true}
          />
        </Modal>
      </main>
    </div>
  );
}

export default App;

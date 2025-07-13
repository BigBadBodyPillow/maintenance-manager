import '../styles/JobList.css';

// const statusOrder = { submitted: 1, 'in-progress': 2, completed: 3 };

export default function JobList({
  jobs,
  onEditJob,
  selectedJobIds = [],
  onSelectJob,
  onArchiveJob,
  onUnarchiveJob,
  showArchived = false,
}) {
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li className="Job" key={job._id}>
          {/* name */}
          <div className="description-checkbox-container">
            <input
              type="checkbox"
              checked={selectedJobIds.includes(job._id)}
              onChange={() => onSelectJob(job._id)}
            />
            <span className="description">
              <strong>{job.description}</strong>
            </span>
          </div>
          {/* detauils */}
          <div className="location-priority-status-container">
            <div className="location">
              <span className="detail-lable">Location: </span> {job.location}
            </div>
            <br />
            <div className="status">
              <span className="detail-lable">Status: </span> {job.status}
            </div>
            <br />
            <div className="priority">
              <span className="detail-lable">Priority: </span> {job.priority}
            </div>
            {/* Submitted: {new Date(job.dateSubmitted).toLocaleString()} */}
            <br />
          </div>
          {/* buttons */}
          <div className="button-container">
            <button onClick={() => onEditJob(job)}>Edit</button>
            {!showArchived ? (
              <button onClick={() => onArchiveJob(job._id)}>Archive</button>
            ) : (
              <button onClick={() => onUnarchiveJob(job._id)}>Unarchive</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

import '../styles/BatchStatusUpdater.css';

export default function BatchStatusUpdater({
  batchStatus,
  onBatchStatusChange,
  onBatchUpdate,
  disableUpdate,
}) {
  return (
    <div className="batch-updater-container">
      <select value={batchStatus} onChange={onBatchStatusChange}>
        <option value="submitted">Submitted</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={onBatchUpdate} disabled={disableUpdate}>
        Update Status
      </button>
    </div>
  );
}

import '../styles/Archive.css';

export default function ArchiveToggle({ showArchived, onToggle }) {
  return (
    <label className="archive-toggle">
      <input
        type="checkbox"
        checked={showArchived}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span>Show Archived</span>
    </label>
  );
}

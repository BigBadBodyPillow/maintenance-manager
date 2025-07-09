export default function SelectAll({ allSelected, onSelectAll }) {
  return (
    <label className="select-all">
      <input
        type="checkbox"
        checked={allSelected}
        onChange={(e) => onSelectAll(e.target.checked)}
      />
      Select All
    </label>
  );
}

interface SearchTagProps {
  text: string;
  onRemove: () => void;
}

export default function SearchTag({ text, onRemove }: SearchTagProps) {
  return (
    <div className="inline-flex items-center bg-indigo-100 text-indigo-800 border border-indigo-200 px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200">
      <span>{text}</span>
      <button
        onClick={onRemove}
        className="ml-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-150"
        aria-label={`Remove ${text} tag`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

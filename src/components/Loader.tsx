export const Loader: React.FC = () => (
  <div role="status" className="flex justify-center p-8">
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-gray-700 animate-spin dark:text-gray-900"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 15a35 35 0 1 1-24.75 10.25"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
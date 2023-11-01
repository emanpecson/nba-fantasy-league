export default function RosterButton({
  children,
  func,
  isDisabled,
}: {
  children: React.ReactNode;
  func: () => void;
  isDisabled: boolean;
}) {
  return (
    <button
      className="bg-white hover:bg-blue-100 hover:border-blue-200 hover:text-blue-600 text-gray-800 font-semibold text-sm p-2.5 border border-gray-300 rounded-full shadow-md disabled:text-gray-300 disabled:bg-white disabled:shadow-none disabled:border-opacity-60"
      onClick={func}
      disabled={isDisabled}>
      <div className="h-5 w-5">{children}</div>
    </button>
  );
}

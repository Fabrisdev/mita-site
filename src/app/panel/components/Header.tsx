export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-700 flex justify-between items-center p-2 border-b-2 mb-5">
      {children}
    </div>
  );
}

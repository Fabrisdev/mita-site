export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-800 flex justify-between items-center p-2 border-b-2">
      {children}
    </div>
  );
}

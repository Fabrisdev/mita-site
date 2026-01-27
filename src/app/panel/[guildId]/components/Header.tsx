export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#121214] flex justify-between items-center p-2">
      {children}
    </div>
  );
}

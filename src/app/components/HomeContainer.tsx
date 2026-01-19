export function HomeContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-svh flex justify-center items-center overflow-hidden">
      {children}
    </main>
  );
}

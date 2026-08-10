import Navbar from "./_components/navbar";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[rgb(18,18,20)] min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

import Navbar from "./_components/navbar";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[rgb(19,19,20)] min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

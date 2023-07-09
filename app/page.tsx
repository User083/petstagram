import Image from "next/image";
import { Navbar, Sidebar } from "@/components";

export default function Home() {
  return (
    <main className="xl:w-[1200px] m-auto overflow-hidden min-h-screen">
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="min-h-screen h-full overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <h2>TEST</h2>
      </div>
    </main>
  );
}

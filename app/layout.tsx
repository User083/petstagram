import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@components";
import Provider from "@components/Provider";

export const metadata: Metadata = {
  title: "Petstagram",
  description: "The content you really want.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div></div>
          <main className="app xl:w-[1200px] m-auto overflow-hidden min-h-screen">
            <div className="flex gap-6 md:gap-20">
              <div className="min-h-screen h-full overflow-hidden xl:hover:overflow-auto z-10 bg-white">
                <Sidebar />
              </div>
              <div className="w-full z-0">{children}</div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

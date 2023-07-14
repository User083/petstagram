import "./globals.css";
import type { Metadata } from "next";
import { Sidebar, Users } from "@components";
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
          <main className="">
            <div className="xl:w-[1200px] m-20 overflow-hidden min-h-screen">
              <div className="flex">
                <div className=" z-10 bg-white">
                  <Sidebar />
                </div>
                <div className="w-full z-0">{children}</div>
                <Users />
              </div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

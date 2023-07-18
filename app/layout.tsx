import "./globals.css";
import type { Metadata } from "next";
import { Sidebar, MobileBar } from "@components";
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
            <div className="p-5 flex w-full justify-center">
              <div className="flex gap-10">
                <Sidebar />
                <div className="w-full z-0">{children}</div>
                <MobileBar />
              </div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

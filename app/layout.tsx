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
          <main className="">
            <div className="flex w-full justify-center">
              <div className="flex gap-10">
                <Sidebar />

                <div className="w-full">{children}</div>
              </div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

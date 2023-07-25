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
          <main>
            <div className="p-5 w-screen">
              <div className="flex lg:gap-10 justify-between">
                <div>
                  <Sidebar />
                </div>

                <div className="w-full z-0">{children}</div>
              </div>
              {/* <MobileBar /> */}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

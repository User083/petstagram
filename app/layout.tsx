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
          <main className="flex w-full xl:w-[1500px] justify-center items-center h-full overflow-hidden ">
            <div>
              <div className="flex gap-10">
                <div>
                  <Sidebar />
                </div>
                <div className="w-full">{children}</div>
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

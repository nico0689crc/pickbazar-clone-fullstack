import type { Metadata } from "next";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Docker and Github Action Project",
  description: "Docker and Github Action Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "AI Chat",
  description: "Chat with AI using OpenAI and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

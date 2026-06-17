import "./globals.css";

export const metadata = {
  title: "NASCET Calculator",
  description: "Carotid stenosis calculator with symptomatic toggle",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

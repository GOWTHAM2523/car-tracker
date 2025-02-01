import "./globals.css"; // Import Tailwind

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Car Traking</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

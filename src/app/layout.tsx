import './globals.css';

export const metadata = {
  title: 'MeetMobile Clone',
  description: 'Log in to access swim meet data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}

import { MainLayout } from '@components';
import { poppins } from '@constants';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

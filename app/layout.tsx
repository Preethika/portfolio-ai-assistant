import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Preethika — Senior Full Stack Engineer & AI Builder',
  description: 'Portfolio of a Senior Full Stack Engineer specializing in AI integrations and production-grade systems. 47+ projects, 3.2M+ users impacted.',
  openGraph: {
    title: 'Preethika — Senior Full Stack Engineer & AI Builder',
    description: 'Chat with my AI assistant about my experience, stack, and availability.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

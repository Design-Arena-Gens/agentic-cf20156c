import './globals.css';
import Link from 'next/link';
import { Sidebar } from '../components/Sidebar';

export const metadata = {
  title: 'Agentic Social Manager',
  description: 'Automate multi-platform content creation and scheduling',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1">
            <header className="border-b bg-white">
              <div className="container-max flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-brand-600" />
                  <Link href="/" className="text-lg font-semibold">Agentic</Link>
                </div>
                <nav className="flex items-center gap-2 text-sm">
                  <Link className="btn btn-secondary" href="/composer">Create Post</Link>
                </nav>
              </div>
            </header>
            <div className="container-max py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

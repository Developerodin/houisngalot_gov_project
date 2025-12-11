'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className="border-b relative"
      style={{
        backgroundColor: '#0747A6',
        color: '#FFFFFF',
        borderBottomColor: '#E5E7EB',
      }}
    >
      {/* Subtle Indian Tricolor Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }}></div>
        <div className="flex-1" style={{ backgroundColor: '#FFFFFF' }}></div>
        <div className="flex-1" style={{ backgroundColor: '#138808' }}></div>
      </div>
      <div className="container mx-auto px-4 py-4 pt-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
            Housingalot
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={`transition font-medium hover:opacity-80 ${
                  isActive('/') ? 'opacity-100 underline' : 'opacity-90'
                }`}
                style={{ color: '#FFFFFF' }}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard"
                className="transition font-medium hover:opacity-80"
                style={{ color: '#FFFFFF' }}
              >
                USER PORTAL
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="transition font-medium hover:opacity-80"
                style={{ color: '#FFFFFF' }}
              >
                ADMIN PORTAL
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

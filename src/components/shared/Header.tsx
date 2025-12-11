'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className="border-b relative rounded-b-lg shadow-sm"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        borderBottomColor: '#E5E7EB',
      }}
    >
      {/* Subtle Indian Tricolor Accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 flex rounded-t-lg">
        <div className="flex-1" style={{ backgroundColor: '#FF9933' }}></div>
        <div className="flex-1" style={{ backgroundColor: '#FFFFFF' }}></div>
        <div className="flex-1" style={{ backgroundColor: '#138808' }}></div>
      </div>
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/assest/raj-logo.png"
              alt="Rajasthan Government Logo"
              width={80}
              height={80}
              className="object-contain h-12 md:h-14 lg:h-16 w-auto zoom-in-zoom-out"
              priority
              unoptimized
            />
          </Link>
          <ul className="flex space-x-2 md:space-x-4">
            <li>
              <Link
                href="/"
                className={`gov-hover font-medium text-xs md:text-sm px-3 py-1.5 rounded-lg ${
                  isActive('/') 
                    ? 'bg-blue-100 font-semibold shadow-md' 
                    : 'hover:bg-gray-100'
                }`}
                style={{ color: '#0747A6' }}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard"
                className="gov-hover font-medium text-xs md:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100"
                style={{ color: '#0747A6' }}
              >
                USER PORTAL
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="gov-hover font-medium text-xs md:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100"
                style={{ color: '#0747A6' }}
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

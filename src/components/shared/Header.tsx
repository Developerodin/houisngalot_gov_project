'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          
          {/* Desktop Navigation and Language Toggle */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
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
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/user/dashboard"
                  className="gov-hover font-medium text-xs md:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0747A6' }}
                >
                  {t('nav.userPortal')}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="gov-hover font-medium text-xs md:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0747A6' }}
                >
                  {t('nav.adminPortal')}
                </Link>
              </li>
            </ul>

            {/* Language Toggle Button - Desktop */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
              style={{ color: '#0747A6' }}
            >
              {language === 'en' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              ) : (
                <span className="text-xs md:text-sm font-semibold">EN</span>
              )}
            </button>
          </div>

          {/* Mobile Menu Icon and Language Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Language Toggle Button - Mobile */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
              style={{ color: '#0747A6' }}
            >
              {language === 'en' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              ) : (
                <span className="text-xs font-semibold">EN</span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              style={{ color: '#0747A6' }}
            >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t" style={{ borderTopColor: '#E5E7EB' }}>
            <ul className="flex flex-col space-y-2 pt-4">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block font-medium text-sm px-4 py-2 rounded-lg ${
                    isActive('/') 
                      ? 'bg-blue-100 font-semibold shadow-md' 
                      : 'hover:bg-gray-100'
                  }`}
                  style={{ color: '#0747A6' }}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/user/dashboard"
                  onClick={closeMenu}
                  className="block font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0747A6' }}
                >
                  {t('nav.userPortal')}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  onClick={closeMenu}
                  className="block font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0747A6' }}
                >
                  {t('nav.adminPortal')}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-12 border-t relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assest/footer.png"
          alt="Rajasthan Government Footer"
          fill
          className="object-cover object-center"
          loading="lazy"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content on top of background */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline" style={{ color: '#E5E7EB' }}>
                  Home
                </a>
              </li>
              <li>
                <a href="/user/eligibility" className="hover:underline" style={{ color: '#E5E7EB' }}>
                  Check Eligibility
                </a>
              </li>
              <li>
                <a href="/user/application" className="hover:underline" style={{ color: '#E5E7EB' }}>
                  Apply Now
                </a>
              </li>
              <li>
                <a href="/user/lottery-results" className="hover:underline" style={{ color: '#E5E7EB' }}>
                  Lottery Results
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Contact
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: '#E5E7EB' }}>
              <li>Helpline: 1800-XXX-XXXX</li>
              <li>Email: support@housingalot.gov.in</li>
              <li>Mon-Sat, 9 AM - 6 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Government Portal
            </h3>
            <p className="text-sm" style={{ color: '#E5E7EB' }}>
              Official website of the Housing Development Authority. 
              Transparent, fair, and secure housing allocation system.
            </p>
          </div>
        </div>
        <div className="border-t pt-6 text-center" style={{ borderTopColor: 'rgba(255, 255, 255, 0.3)' }}>
          <p className="text-sm" style={{ color: '#E5E7EB' }}>
            © {new Date().getFullYear()} Housingalot Project. All rights reserved. | 
            <a href="#" className="hover:underline ml-2" style={{ color: '#E5E7EB' }}>Privacy Policy</a> | 
            <a href="#" className="hover:underline ml-2" style={{ color: '#E5E7EB' }}>Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

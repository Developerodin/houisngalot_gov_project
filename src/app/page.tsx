import Link from 'next/link';
import Button from '@/components/shared/Button';
import BannerSwiper from '@/components/shared/BannerSwiper';
import LazyVideo from '@/components/shared/LazyVideo';

export default function Home() {
  return (
    <div className="w-full">
      {/* Banner Swiper - Full Width */}
      <BannerSwiper />
      
      <div className="container mx-auto px-4 py-6 md:py-8">

      {/* Hero Section */}
      <section className="mb-6 text-center fade-in-up">
        <div 
          className="rounded-xl p-8 md:p-12 mb-6 relative overflow-hidden gov-hover"
          style={{ 
            background: 'linear-gradient(135deg, #0747A6 0%, #0F1F3F 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Subtle Indian Tricolor Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1" style={{ backgroundColor: '#FF9933' }}></div>
            <div className="flex-1" style={{ backgroundColor: '#FFFFFF' }}></div>
            <div className="flex-1" style={{ backgroundColor: '#138808' }}></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Affordable Housing Scheme 2024
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: '#E5E7EB' }}>
            Government Housing Lottery & Plot Allocation Management System
          </p>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#D1D5DB' }}>
            Apply online for affordable housing plots through a transparent, 
            fair, and secure lottery system. No paperwork, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link href="/auth/register">
              <Button size="lg" style={{ backgroundColor: '#FFFFFF', color: '#1E3A5F' }}>
                Apply Now
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                Login
              </Button>
            </Link>
            <Link href="/user/eligibility">
              <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                Check Eligibility
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scheme Details Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Scheme Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* About the Scheme - Video and Text Side by Side */}
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Video Section - Takes original height */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <LazyVideo
                  src="/assest/B2ByPass.mp4"
                  className="w-full h-auto"
                  loop
                  muted
                  playsInline
                />
              </div>
              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
                  About the Scheme
                </h3>
                <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                  The Affordable Housing Scheme 2024 is a government initiative to provide 
                  affordable housing plots to eligible citizens. This scheme aims to make 
                  housing accessible to Economically Weaker Sections (EWS), Lower Income Group (LIG), 
                  Middle Income Group (MIG), and Higher Income Group (HIG) families.
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4B5563' }}>
                  The entire process is conducted online through a transparent lottery system, 
                  ensuring fairness and eliminating manual paperwork.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              Key Highlights
            </h3>
            <ul className="space-y-3" style={{ color: '#4B5563' }}>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>100% online application process</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Transparent lottery system with seed hash verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Secure payment gateway integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Real-time application status tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Automated refund for ineligible applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Digital allotment letters</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Eligibility Criteria
        </h2>
        <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>Age Requirement</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                Applicant must be at least 18 years of age at the time of application.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>Income Categories</h4>
              <ul className="text-sm md:text-base space-y-2" style={{ color: '#4B5563' }}>
                <li><strong>EWS:</strong> Annual income up to ₹3 Lakhs</li>
                <li><strong>LIG:</strong> Annual income ₹3-6 Lakhs</li>
                <li><strong>MIG:</strong> Annual income ₹6-12 Lakhs</li>
                <li><strong>HIG:</strong> Annual income above ₹12 Lakhs</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>Property Ownership</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                Applicant should not own any residential property in the same city/region 
                where the scheme is applicable.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>Residency</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                Applicant must be a resident of the state where the scheme is being implemented.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/user/eligibility">
              <Button size="lg">Check Your Eligibility</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Application Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              1
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Register</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Create your account with mobile number and verify with OTP
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              2
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Fill Application</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Complete the online application form with all required details
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              3
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Upload Documents</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Upload required documents (Aadhaar, PAN, Income Certificate, etc.)
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              4
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Pay Fee</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Pay the application fee of ₹1,000 through secure payment gateway
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              5
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Verification</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Documents are verified by authorized officers
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              6
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Lottery</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Transparent lottery conducted for eligible applications
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              7
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Allotment</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Selected applicants receive allotment letters
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              8
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Possession</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              Complete payment and take possession of your plot
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates & Fees */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Important Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              Important Dates
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Application Start Date:</span>
                <strong style={{ color: '#0F1F3F' }}>January 1, 2024</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Application End Date:</span>
                <strong style={{ color: '#0F1F3F' }}>March 31, 2024</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Verification Period:</span>
                <strong style={{ color: '#0F1F3F' }}>April 1-30, 2024</strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#4B5563' }}>Lottery Date:</span>
                <strong style={{ color: '#0F1F3F' }}>May 15, 2024</strong>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              Application Fees
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Application Fee:</span>
                <strong style={{ color: '#0F1F3F' }}>₹1,000</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Processing Fee:</span>
                <strong style={{ color: '#0F1F3F' }}>Included</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>Refund Policy:</span>
                <strong style={{ color: '#0F1F3F' }}>Full refund if rejected</strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#4B5563' }}>Payment Methods:</span>
                <strong style={{ color: '#0F1F3F' }}>Card, UPI, Net Banking</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Downloads & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              Scheme Brochure
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              Download detailed scheme information
            </p>
            <Button size="sm" variant="outline">Download PDF</Button>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              Application Guidelines
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              Step-by-step application guide
            </p>
            <Button size="sm" variant="outline">Download PDF</Button>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📑</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              Document Checklist
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              List of required documents
            </p>
            <Button size="sm" variant="outline">Download PDF</Button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Frequently Asked Questions
        </h2>
        <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
          <div className="space-y-6">
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                Q: How do I apply for the scheme?
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                A: Register on the portal, complete the application form, upload required documents, 
                and pay the application fee online.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                Q: What documents are required?
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                A: Aadhaar Card, PAN Card, Income Certificate, Address Proof, Bank Statement, 
                and a recent photograph.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                Q: How is the lottery conducted?
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                A: The lottery is conducted using a transparent algorithm with a verifiable seed hash. 
                Results are published online and can be verified by anyone.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                Q: Will I get a refund if not selected?
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                A: Yes, if your application is rejected during verification, you will receive a full 
                refund of the application fee within 15-30 working days.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                Q: How can I track my application status?
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                A: Login to your account and visit the Application Status page to see real-time 
                updates on your application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          Contact & Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Helpline</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>1800-XXX-XXXX</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>Mon-Sat, 9 AM - 6 PM</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Email</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>support@housingalot.gov.in</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>Response within 24 hours</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>Office</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>Housing Development Authority</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>Government Complex, State Capital</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="rounded-xl p-8 md:p-12 text-center mb-6"
        style={{ 
          background: 'linear-gradient(135deg, #0747A6 0%, #0F1F3F 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
          Ready to Apply?
        </h2>
        <p className="text-base md:text-lg mb-8" style={{ color: '#E5E7EB' }}>
          Start your application process now and get a chance to own your dream home
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" style={{ backgroundColor: '#FFFFFF', color: '#0747A6' }}>
              Apply Now
            </Button>
          </Link>
          <Link href="/user/eligibility">
            <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              Check Eligibility First
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}

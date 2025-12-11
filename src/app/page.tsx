'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import BannerSwiper from '@/components/shared/BannerSwiper';
import LazyVideo from '@/components/shared/LazyVideo';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
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
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: '#E5E7EB' }}>
            {t('home.hero.subtitle')}
          </p>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#D1D5DB' }}>
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link href="/auth/register">
              <Button size="lg" style={{ backgroundColor: '#FFFFFF', color: '#1E3A5F' }}>
                {t('home.hero.applyNow')}
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                {t('home.hero.login')}
              </Button>
            </Link>
            <Link href="/user/eligibility">
              <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
                {t('home.hero.checkEligibility')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scheme Details Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('scheme.title')}
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
                  {t('scheme.about.title')}
                </h3>
                <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                  {t('scheme.about.description1')}
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4B5563' }}>
                  {t('scheme.about.description2')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              {t('scheme.highlights.title')}
            </h3>
            <ul className="space-y-3" style={{ color: '#4B5563' }}>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.online')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.transparent')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.secure')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.tracking')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.refund')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{t('scheme.highlights.digital')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('eligibility.title')}
        </h2>
        <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>{t('eligibility.age.title')}</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('eligibility.age.description')}
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>{t('eligibility.income.title')}</h4>
              <ul className="text-sm md:text-base space-y-2" style={{ color: '#4B5563' }}>
                <li>{t('eligibility.income.ews')}</li>
                <li>{t('eligibility.income.lig')}</li>
                <li>{t('eligibility.income.mig')}</li>
                <li>{t('eligibility.income.hig')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>{t('eligibility.property.title')}</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('eligibility.property.description')}
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-semibold mb-3" style={{ color: '#0747A6' }}>{t('eligibility.residency.title')}</h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('eligibility.residency.description')}
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/user/eligibility">
              <Button size="lg">{t('eligibility.checkButton')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('process.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              1
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step1.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step1.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              2
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step2.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step2.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              3
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step3.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step3.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#0747A6' }}>
              4
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step4.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step4.description')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              5
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step5.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step5.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              6
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step6.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step6.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              7
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step7.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step7.description')}
            </p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#10B981' }}>
              8
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('process.step8.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('process.step8.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates & Fees */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('info.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              {t('info.dates.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.dates.start')}</span>
                <strong style={{ color: '#0F1F3F' }}>January 1, 2024</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.dates.end')}</span>
                <strong style={{ color: '#0F1F3F' }}>March 31, 2024</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.dates.verification')}</span>
                <strong style={{ color: '#0F1F3F' }}>April 1-30, 2024</strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#4B5563' }}>{t('info.dates.lottery')}</span>
                <strong style={{ color: '#0F1F3F' }}>May 15, 2024</strong>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#0747A6' }}>
              {t('info.fees.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.fees.application')}</span>
                <strong style={{ color: '#0F1F3F' }}>₹1,000</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.fees.processing')}</span>
                <strong style={{ color: '#0F1F3F' }}>{t('info.fees.included')}</strong>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span style={{ color: '#4B5563' }}>{t('info.fees.refund')}</span>
                <strong style={{ color: '#0F1F3F' }}>{t('info.fees.refundPolicy')}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: '#4B5563' }}>{t('info.fees.payment')}</span>
                <strong style={{ color: '#0F1F3F' }}>{t('info.fees.methods')}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('downloads.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              {t('downloads.brochure.title')}
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('downloads.brochure.description')}
            </p>
            <Button size="sm" variant="outline">{t('downloads.download')}</Button>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              {t('downloads.guidelines.title')}
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('downloads.guidelines.description')}
            </p>
            <Button size="sm" variant="outline">{t('downloads.download')}</Button>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📑</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
              {t('downloads.checklist.title')}
            </h3>
            <p className="mb-4 text-sm md:text-base" style={{ color: '#4B5563' }}>
              {t('downloads.checklist.description')}
            </p>
            <Button size="sm" variant="outline">{t('downloads.download')}</Button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('faq.title')}
        </h2>
        <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border border-gray-200">
          <div className="space-y-6">
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                {t('faq.q1')}
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('faq.a1')}
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                {t('faq.q2')}
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('faq.a2')}
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                {t('faq.q3')}
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('faq.a3')}
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                {t('faq.q4')}
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('faq.a4')}
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>
                {t('faq.q5')}
              </h4>
              <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>
                {t('faq.a5')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center" style={{ color: '#0747A6' }}>
          {t('contact.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('contact.helpline.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>1800-XXX-XXXX</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>{t('contact.helpline.hours')}</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('contact.email.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>support@housingalot.gov.in</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>{t('contact.email.response')}</p>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-200">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#0747A6' }}>{t('contact.office.title')}</h3>
            <p className="text-sm md:text-base" style={{ color: '#4B5563' }}>{t('contact.office.address')}</p>
            <p className="text-xs md:text-sm" style={{ color: '#4B5563' }}>{t('contact.office.location')}</p>
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
          {t('cta.title')}
        </h2>
        <p className="text-base md:text-lg mb-8" style={{ color: '#E5E7EB' }}>
          {t('cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" style={{ backgroundColor: '#FFFFFF', color: '#0747A6' }}>
              {t('cta.apply')}
            </Button>
          </Link>
          <Link href="/user/eligibility">
            <Button size="lg" variant="outline" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              {t('cta.checkEligibility')}
            </Button>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'HOME',
    'nav.userPortal': 'USER PORTAL',
    'nav.adminPortal': 'ADMIN PORTAL',
    
    // Home Page
    'home.hero.title': 'Affordable Housing Scheme 2024',
    'home.hero.subtitle': 'Government Housing Lottery & Plot Allocation Management System',
    'home.hero.description': 'Apply online for affordable housing plots through a transparent, fair, and secure lottery system. No paperwork, no hassle.',
    'home.hero.applyNow': 'Apply Now',
    'home.hero.login': 'Login',
    'home.hero.checkEligibility': 'Check Eligibility',
    
    // Scheme Details
    'scheme.title': 'Scheme Details',
    'scheme.about.title': 'About the Scheme',
    'scheme.about.description1': 'The Affordable Housing Scheme 2024 is a government initiative to provide affordable housing plots to eligible citizens. This scheme aims to make housing accessible to Economically Weaker Sections (EWS), Lower Income Group (LIG), Middle Income Group (MIG), and Higher Income Group (HIG) families.',
    'scheme.about.description2': 'The entire process is conducted online through a transparent lottery system, ensuring fairness and eliminating manual paperwork.',
    'scheme.highlights.title': 'Key Highlights',
    'scheme.highlights.online': '100% online application process',
    'scheme.highlights.transparent': 'Transparent lottery system with seed hash verification',
    'scheme.highlights.secure': 'Secure payment gateway integration',
    'scheme.highlights.tracking': 'Real-time application status tracking',
    'scheme.highlights.refund': 'Automated refund for ineligible applications',
    'scheme.highlights.digital': 'Digital allotment letters',
    
    // Eligibility
    'eligibility.title': 'Eligibility Criteria',
    'eligibility.age.title': 'Age Requirement',
    'eligibility.age.description': 'Applicant must be at least 18 years of age at the time of application.',
    'eligibility.income.title': 'Income Categories',
    'eligibility.income.ews': 'EWS: Annual income up to ₹3 Lakhs',
    'eligibility.income.lig': 'LIG: Annual income ₹3-6 Lakhs',
    'eligibility.income.mig': 'MIG: Annual income ₹6-12 Lakhs',
    'eligibility.income.hig': 'HIG: Annual income above ₹12 Lakhs',
    'eligibility.property.title': 'Property Ownership',
    'eligibility.property.description': 'Applicant should not own any residential property in the same city/region where the scheme is applicable.',
    'eligibility.residency.title': 'Residency',
    'eligibility.residency.description': 'Applicant must be a resident of the state where the scheme is being implemented.',
    'eligibility.checkButton': 'Check Your Eligibility',
    
    // Application Process
    'process.title': 'Application Process',
    'process.step1.title': 'Register',
    'process.step1.description': 'Create your account with mobile number and verify with OTP',
    'process.step2.title': 'Fill Application',
    'process.step2.description': 'Complete the online application form with all required details',
    'process.step3.title': 'Upload Documents',
    'process.step3.description': 'Upload required documents (Aadhaar, PAN, Income Certificate, etc.)',
    'process.step4.title': 'Pay Fee',
    'process.step4.description': 'Pay the application fee of ₹1,000 through secure payment gateway',
    'process.step5.title': 'Verification',
    'process.step5.description': 'Documents are verified by authorized officers',
    'process.step6.title': 'Lottery',
    'process.step6.description': 'Transparent lottery conducted for eligible applications',
    'process.step7.title': 'Allotment',
    'process.step7.description': 'Selected applicants receive allotment letters',
    'process.step8.title': 'Possession',
    'process.step8.description': 'Complete payment and take possession of your plot',
    
    // Important Info
    'info.title': 'Important Information',
    'info.dates.title': 'Important Dates',
    'info.dates.start': 'Application Start Date:',
    'info.dates.end': 'Application End Date:',
    'info.dates.verification': 'Verification Period:',
    'info.dates.lottery': 'Lottery Date:',
    'info.fees.title': 'Application Fees',
    'info.fees.application': 'Application Fee:',
    'info.fees.processing': 'Processing Fee:',
    'info.fees.refund': 'Refund Policy:',
    'info.fees.payment': 'Payment Methods:',
    'info.fees.included': 'Included',
    'info.fees.refundPolicy': 'Full refund if rejected',
    'info.fees.methods': 'Card, UPI, Net Banking',
    
    // Downloads
    'downloads.title': 'Downloads & Resources',
    'downloads.brochure.title': 'Scheme Brochure',
    'downloads.brochure.description': 'Download detailed scheme information',
    'downloads.guidelines.title': 'Application Guidelines',
    'downloads.guidelines.description': 'Step-by-step application guide',
    'downloads.checklist.title': 'Document Checklist',
    'downloads.checklist.description': 'List of required documents',
    'downloads.download': 'Download PDF',
    
    // FAQs
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Q: How do I apply for the scheme?',
    'faq.a1': 'A: Register on the portal, complete the application form, upload required documents, and pay the application fee online.',
    'faq.q2': 'Q: What documents are required?',
    'faq.a2': 'A: Aadhaar Card, PAN Card, Income Certificate, Address Proof, Bank Statement, and a recent photograph.',
    'faq.q3': 'Q: How is the lottery conducted?',
    'faq.a3': 'A: The lottery is conducted using a transparent algorithm with a verifiable seed hash. Results are published online and can be verified by anyone.',
    'faq.q4': 'Q: Will I get a refund if not selected?',
    'faq.a4': 'A: Yes, if your application is rejected during verification, you will receive a full refund of the application fee within 15-30 working days.',
    'faq.q5': 'Q: How can I track my application status?',
    'faq.a5': 'A: Login to your account and visit the Application Status page to see real-time updates on your application.',
    
    // Contact
    'contact.title': 'Contact & Support',
    'contact.helpline.title': 'Helpline',
    'contact.helpline.hours': 'Mon-Sat, 9 AM - 6 PM',
    'contact.email.title': 'Email',
    'contact.email.response': 'Response within 24 hours',
    'contact.office.title': 'Office',
    'contact.office.address': 'Housing Development Authority',
    'contact.office.location': 'Government Complex, State Capital',
    
    // CTA
    'cta.title': 'Ready to Apply?',
    'cta.description': 'Start your application process now and get a chance to own your dream home',
    'cta.apply': 'Apply Now',
    'cta.checkEligibility': 'Check Eligibility First',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.home': 'Home',
    'footer.eligibility': 'Check Eligibility',
    'footer.apply': 'Apply Now',
    'footer.lottery': 'Lottery Results',
    'footer.contact': 'Contact',
    'footer.helpline': 'Helpline:',
    'footer.email': 'Email:',
    'footer.hours': 'Mon-Sat, 9 AM - 6 PM',
    'footer.portal': 'Government Portal',
    'footer.portal.description': 'Official website of the Housing Development Authority. Transparent, fair, and secure housing allocation system.',
    'footer.copyright': 'Housingalot Project. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Auth Pages
    'auth.login.title': 'Login',
    'auth.login.mobileEmail': 'Mobile Number / Email',
    'auth.login.mobileEmailPlaceholder': '9876543210 or user@example.com',
    'auth.login.password': 'Password',
    'auth.login.submit': 'Login',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.register': 'Register',
    'auth.register.title': 'Register',
    'auth.register.mobile': 'Mobile Number',
    'auth.register.mobilePlaceholder': '9876543210',
    'auth.register.sendOtp': 'Send OTP',
    'auth.register.haveAccount': 'Already have an account?',
    'auth.register.enterOtp': 'Enter OTP',
    'auth.register.otpPlaceholder': '123456',
    'auth.register.verifyOtp': 'Verify OTP',
    'auth.register.changeMobile': 'Change Mobile Number',
    'auth.register.createPassword': 'Create Password',
    'auth.register.confirmPassword': 'Confirm Password',
    'auth.register.createAccount': 'Create Account',
    
    // User Dashboard
    'user.dashboard.welcome': 'Welcome,',
    'user.dashboard.applicationStatus': 'Application Status',
    'user.dashboard.noApplication': 'No application yet',
    'user.dashboard.quickActions': 'Quick Actions',
    'user.dashboard.checkEligibility': 'Check Eligibility',
    'user.dashboard.startApplication': 'Start Application',
    'user.dashboard.viewStatus': 'View Status',
    'user.dashboard.profile': 'Profile',
    'user.dashboard.editProfile': 'Edit Profile',
    'user.dashboard.applicationFlow': 'Application Flow',
    'user.dashboard.step1': '1. Check Eligibility',
    'user.dashboard.step2': '2. Fill Application',
    'user.dashboard.step3': '3. Upload Documents',
    'user.dashboard.step4': '4. Make Payment',
    'user.dashboard.step5': '5. Track Status',
    'user.dashboard.step6': '6. Lottery Results',
    'user.dashboard.step7': '7. Allotment Letter',
    'user.dashboard.step8': '8. Refund Status',
    'user.dashboard.go': 'Go',
    'user.dashboard.loading': 'Loading...',
    
    // Eligibility Page
    'eligibility.checker.title': 'Eligibility Checker',
    'eligibility.checker.step': 'Step',
    'eligibility.checker.of': 'of',
    'eligibility.checker.age': 'Age',
    'eligibility.checker.agePlaceholder': '25',
    'eligibility.checker.next': 'Next',
    'eligibility.checker.back': 'Back',
    'eligibility.checker.annualIncome': 'Annual Income (₹)',
    'eligibility.checker.incomePlaceholder': '300000',
    'eligibility.checker.ownProperty': 'Do you own any property?',
    'eligibility.checker.select': 'Select',
    'eligibility.checker.yes': 'Yes',
    'eligibility.checker.no': 'No',
    'eligibility.checker.check': 'Check Eligibility',
    'eligibility.checker.eligible': 'You are Eligible!',
    'eligibility.checker.redirecting': 'Redirecting to application form...',
    'eligibility.checker.notEligible': 'Not Eligible',
    'eligibility.checker.notEligibleDesc': 'Based on your inputs, you may not be eligible for this scheme.',
    'eligibility.checker.tryAgain': 'Try Again',
    
    // Application Page
    'application.title': 'Application Form',
    'application.step': 'Step',
    'application.identity.title': 'Identity Details',
    'application.residence.title': 'Residence Details',
    'application.family.title': 'Family Details',
    'application.income.title': 'Income Details',
    'application.bank.title': 'Bank Details',
    'application.categories.title': 'Special Categories',
    'application.declarations.title': 'Declarations',
    'application.review.title': 'Review & Submit',
    'application.next': 'Next',
    'application.back': 'Back',
    'application.submit': 'Submit Application',
    
    // Common Form Fields
    'form.name': 'Full Name',
    'form.aadhaar': 'Aadhaar Number',
    'form.dob': 'Date of Birth',
    'form.address': 'Address',
    'form.city': 'City',
    'form.state': 'State',
    'form.pincode': 'Pincode',
    'form.familyMembers': 'Family Members',
    'form.dependents': 'Dependents',
    'form.annualIncome': 'Annual Income',
    'form.incomeCategory': 'Income Category',
    'form.bankAccount': 'Bank Account Number',
    'form.ifsc': 'IFSC Code',
    'form.bankName': 'Bank Name',
    
    // Status Messages
    'status.draft': 'DRAFT',
    'status.submitted': 'SUBMITTED',
    'status.paid': 'PAID',
    'status.underVerification': 'UNDER VERIFICATION',
    'status.verified': 'VERIFIED',
    'status.rejected': 'REJECTED',
    'status.selected': 'SELECTED',
    'status.allotted': 'ALLOTTED',
    'status.possession': 'POSSESSION',
    
    // Admin Pages
    'admin.dashboard.title': 'Admin Dashboard',
    'admin.dashboard.totalApplications': 'Total Applications',
    'admin.dashboard.pendingVerification': 'Pending Verification',
    'admin.dashboard.verified': 'Verified',
    'admin.dashboard.rejected': 'Rejected',
    'admin.login.title': 'Admin Login',
    'admin.login.username': 'Username',
    'admin.login.password': 'Password',
    'admin.login.submit': 'Login',
    'admin.applications.title': 'Applications',
    'admin.applications.filter': 'Filter by Status',
    'admin.applications.all': 'All',
    'admin.applications.view': 'View Details',
    'admin.applications.search': 'Search applications...',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.submit': 'Submit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    
    // Application Status
    'status.title': 'Application Status',
    'status.applicationId': 'Application ID:',
    'status.currentStatus': 'Current Status:',
    'status.draftLabel': 'Draft',
    'status.draftDesc': 'Application started',
    'status.submittedLabel': 'Submitted',
    'status.submittedDesc': 'Application submitted',
    'status.paidLabel': 'Payment Completed',
    'status.paidDesc': 'Payment received',
    'status.underVerificationLabel': 'Under Verification',
    'status.underVerificationDesc': 'Documents being verified',
    'status.verifiedLabel': 'Verified',
    'status.verifiedDesc': 'Application verified',
    'status.selectedLabel': 'Selected',
    'status.selectedDesc': 'Selected in lottery',
    'status.allottedLabel': 'Allotted',
    'status.allottedDesc': 'Plot allotted',
    'status.possessionLabel': 'Possession',
    'status.possessionDesc': 'Possession granted',
    'status.quickActions': 'Quick Actions',
    'status.reuploadDocuments': 'Re-upload Documents',
    'status.backToDashboard': 'Back to Dashboard',
    
    // Documents
    'documents.title': 'Upload Documents',
    'documents.description': 'Please upload the following documents. All documents are required.',
    'documents.upload': 'Upload',
    'documents.uploaded': 'Uploaded',
    'documents.continue': 'Continue to Payment',
    
    // Payment
    'payment.title': 'Payment',
    'payment.amount': 'Application Fee',
    'payment.total': 'Total Amount',
    'payment.payNow': 'Pay Now',
    'payment.processing': 'Processing Payment...',
    'payment.completed': 'Payment Completed!',
    'payment.redirecting': 'Redirecting...',
    
    // Profile
    'profile.title': 'Profile Settings',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    
    // Lottery Results
    'lottery.title': 'Lottery Results',
    'lottery.search': 'Search by Application ID',
    'lottery.winners': 'Winners',
    
    // Allotment
    'allotment.title': 'Allotment Letter',
    'allotment.download': 'Download Allotment Letter',
    
    // Refund
    'refund.title': 'Refund Status',
    'refund.status': 'Refund Status',
    'refund.amount': 'Refund Amount',
    'refund.notEligible': 'Your application is not eligible for refund. Refunds are only processed for rejected applications.',
    'refund.processing': 'Processing',
    'refund.completed': 'Completed',
    'refund.pending': 'Pending',
    'refund.requestedAt': 'Requested At',
    'refund.processedAt': 'Processed At',
    'refund.refundId': 'Refund ID',
    
    // Declarations
    'declaration.truth': 'I declare that all information provided is true and correct.',
    'declaration.falseInfo': 'I understand that false information may lead to rejection.',
    
    // Review
    'review.name': 'Name:',
    'review.category': 'Category:',
    'review.income': 'Income:',
    'review.city': 'City:',
    
    // Profile
    'profile.email': 'Email',
    'profile.mobile': 'Mobile Number',
    'profile.updateSuccess': 'Profile updated successfully!',
    
    // Lottery
    'lottery.notConducted': 'Lottery has not been conducted yet. Results will be published here once the lottery is completed.',
    'lottery.information': 'Lottery Information',
    'lottery.id': 'Lottery ID',
    'lottery.date': 'Lottery Date',
    'lottery.totalWinners': 'Total Winners',
    'lottery.conductedOn': 'Conducted On',
    'lottery.seedHash': 'Seed Hash (for verification)',
    'lottery.seedHashDesc': 'This hash can be used to verify the integrity of the lottery results',
    'lottery.winnersList': 'Winners List',
    'lottery.searchPlaceholder': 'Search by Application ID or Name...',
    'lottery.applicationId': 'Application ID',
    'lottery.name': 'Name',
    'lottery.category': 'Category',
    'lottery.plotNumber': 'Plot Number',
    
    // Allotment
    'allotment.status': 'Allotment Status',
    'allotment.notAllotted': 'Your application has not been allotted yet. Please check back later or view your application status for updates.',
    'allotment.viewStatus': 'View Application Status',
    'allotment.letter': 'ALLOTMENT LETTER',
    'allotment.print': 'Print / Download',
    'allotment.id': 'Allotment ID',
    'allotment.plotNumber': 'Plot Number',
    'allotment.allotmentDate': 'Allotment Date',
    'allotment.applicantDetails': 'Applicant Details',
  },
  hi: {
    // Header
    'nav.home': 'होम',
    'nav.userPortal': 'उपयोगकर्ता पोर्टल',
    'nav.adminPortal': 'एडमिन पोर्टल',
    
    // Home Page
    'home.hero.title': 'सस्ती आवास योजना 2024',
    'home.hero.subtitle': 'सरकारी आवास लॉटरी और प्लॉट आवंटन प्रबंधन प्रणाली',
    'home.hero.description': 'पारदर्शी, निष्पक्ष और सुरक्षित लॉटरी प्रणाली के माध्यम से ऑनलाइन सस्ती आवास प्लॉट के लिए आवेदन करें। कोई कागजी कार्रवाई नहीं, कोई परेशानी नहीं।',
    'home.hero.applyNow': 'अभी आवेदन करें',
    'home.hero.login': 'लॉगिन',
    'home.hero.checkEligibility': 'पात्रता जांचें',
    
    // Scheme Details
    'scheme.title': 'योजना विवरण',
    'scheme.about.title': 'योजना के बारे में',
    'scheme.about.description1': 'सस्ती आवास योजना 2024 पात्र नागरिकों को सस्ती आवास प्लॉट प्रदान करने के लिए एक सरकारी पहल है। यह योजना आर्थिक रूप से कमजोर वर्ग (EWS), निम्न आय वर्ग (LIG), मध्यम आय वर्ग (MIG), और उच्च आय वर्ग (HIG) परिवारों के लिए आवास को सुलभ बनाने का लक्ष्य रखती है।',
    'scheme.about.description2': 'पूरी प्रक्रिया एक पारदर्शी लॉटरी प्रणाली के माध्यम से ऑनलाइन आयोजित की जाती है, जो निष्पक्षता सुनिश्चित करती है और मैनुअल कागजी कार्रवाई को समाप्त करती है।',
    'scheme.highlights.title': 'मुख्य बातें',
    'scheme.highlights.online': '100% ऑनलाइन आवेदन प्रक्रिया',
    'scheme.highlights.transparent': 'सीड हैश सत्यापन के साथ पारदर्शी लॉटरी प्रणाली',
    'scheme.highlights.secure': 'सुरक्षित भुगतान गेटवे एकीकरण',
    'scheme.highlights.tracking': 'वास्तविक समय आवेदन स्थिति ट्रैकिंग',
    'scheme.highlights.refund': 'अपात्र आवेदनों के लिए स्वचालित रिफंड',
    'scheme.highlights.digital': 'डिजिटल आवंटन पत्र',
    
    // Eligibility
    'eligibility.title': 'पात्रता मानदंड',
    'eligibility.age.title': 'आयु आवश्यकता',
    'eligibility.age.description': 'आवेदन के समय आवेदक की आयु कम से कम 18 वर्ष होनी चाहिए।',
    'eligibility.income.title': 'आय श्रेणियां',
    'eligibility.income.ews': 'EWS: वार्षिक आय ₹3 लाख तक',
    'eligibility.income.lig': 'LIG: वार्षिक आय ₹3-6 लाख',
    'eligibility.income.mig': 'MIG: वार्षिक आय ₹6-12 लाख',
    'eligibility.income.hig': 'HIG: वार्षिक आय ₹12 लाख से अधिक',
    'eligibility.property.title': 'संपत्ति स्वामित्व',
    'eligibility.property.description': 'आवेदक के पास उसी शहर/क्षेत्र में कोई आवासीय संपत्ति नहीं होनी चाहिए जहां योजना लागू है।',
    'eligibility.residency.title': 'निवास',
    'eligibility.residency.description': 'आवेदक उस राज्य का निवासी होना चाहिए जहां योजना लागू की जा रही है।',
    'eligibility.checkButton': 'अपनी पात्रता जांचें',
    
    // Application Process
    'process.title': 'आवेदन प्रक्रिया',
    'process.step1.title': 'पंजीकरण',
    'process.step1.description': 'मोबाइल नंबर के साथ अपना खाता बनाएं और OTP से सत्यापित करें',
    'process.step2.title': 'आवेदन भरें',
    'process.step2.description': 'सभी आवश्यक विवरणों के साथ ऑनलाइन आवेदन फॉर्म पूरा करें',
    'process.step3.title': 'दस्तावेज अपलोड करें',
    'process.step3.description': 'आवश्यक दस्तावेज अपलोड करें (आधार, PAN, आय प्रमाणपत्र, आदि)',
    'process.step4.title': 'शुल्क भुगतान',
    'process.step4.description': 'सुरक्षित भुगतान गेटवे के माध्यम से ₹1,000 का आवेदन शुल्क भुगतान करें',
    'process.step5.title': 'सत्यापन',
    'process.step5.description': 'दस्तावेज अधिकृत अधिकारियों द्वारा सत्यापित किए जाते हैं',
    'process.step6.title': 'लॉटरी',
    'process.step6.description': 'पात्र आवेदनों के लिए पारदर्शी लॉटरी आयोजित की जाती है',
    'process.step7.title': 'आवंटन',
    'process.step7.description': 'चयनित आवेदकों को आवंटन पत्र प्राप्त होते हैं',
    'process.step8.title': 'कब्जा',
    'process.step8.description': 'भुगतान पूरा करें और अपने प्लॉट का कब्जा लें',
    
    // Important Info
    'info.title': 'महत्वपूर्ण जानकारी',
    'info.dates.title': 'महत्वपूर्ण तिथियां',
    'info.dates.start': 'आवेदन शुरू होने की तिथि:',
    'info.dates.end': 'आवेदन समाप्ति तिथि:',
    'info.dates.verification': 'सत्यापन अवधि:',
    'info.dates.lottery': 'लॉटरी तिथि:',
    'info.fees.title': 'आवेदन शुल्क',
    'info.fees.application': 'आवेदन शुल्क:',
    'info.fees.processing': 'प्रसंस्करण शुल्क:',
    'info.fees.refund': 'रिफंड नीति:',
    'info.fees.payment': 'भुगतान विधियां:',
    'info.fees.included': 'शामिल',
    'info.fees.refundPolicy': 'अस्वीकृत होने पर पूर्ण रिफंड',
    'info.fees.methods': 'कार्ड, UPI, नेट बैंकिंग',
    
    // Downloads
    'downloads.title': 'डाउनलोड और संसाधन',
    'downloads.brochure.title': 'योजना ब्रोशर',
    'downloads.brochure.description': 'विस्तृत योजना जानकारी डाउनलोड करें',
    'downloads.guidelines.title': 'आवेदन दिशानिर्देश',
    'downloads.guidelines.description': 'चरण-दर-चरण आवेदन गाइड',
    'downloads.checklist.title': 'दस्तावेज चेकलिस्ट',
    'downloads.checklist.description': 'आवश्यक दस्तावेजों की सूची',
    'downloads.download': 'PDF डाउनलोड करें',
    
    // FAQs
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq.q1': 'प्र: मैं योजना के लिए कैसे आवेदन करूं?',
    'faq.a1': 'उ: पोर्टल पर पंजीकरण करें, आवेदन फॉर्म पूरा करें, आवश्यक दस्तावेज अपलोड करें, और ऑनलाइन आवेदन शुल्क का भुगतान करें।',
    'faq.q2': 'प्र: कौन से दस्तावेज आवश्यक हैं?',
    'faq.a2': 'उ: आधार कार्ड, PAN कार्ड, आय प्रमाणपत्र, पता प्रमाण, बैंक स्टेटमेंट, और एक हाल की तस्वीर।',
    'faq.q3': 'प्र: लॉटरी कैसे आयोजित की जाती है?',
    'faq.a3': 'उ: लॉटरी एक पारदर्शी एल्गोरिदम के साथ एक सत्यापन योग्य सीड हैश का उपयोग करके आयोजित की जाती है। परिणाम ऑनलाइन प्रकाशित किए जाते हैं और किसी भी व्यक्ति द्वारा सत्यापित किए जा सकते हैं।',
    'faq.q4': 'प्र: क्या मुझे चयनित नहीं होने पर रिफंड मिलेगा?',
    'faq.a4': 'उ: हां, यदि आपका आवेदन सत्यापन के दौरान अस्वीकृत हो जाता है, तो आपको 15-30 कार्य दिवसों के भीतर आवेदन शुल्क का पूर्ण रिफंड मिलेगा।',
    'faq.q5': 'प्र: मैं अपनी आवेदन स्थिति कैसे ट्रैक कर सकता हूं?',
    'faq.a5': 'उ: अपने खाते में लॉगिन करें और वास्तविक समय अपडेट देखने के लिए आवेदन स्थिति पृष्ठ पर जाएं।',
    
    // Contact
    'contact.title': 'संपर्क और सहायता',
    'contact.helpline.title': 'हेल्पलाइन',
    'contact.helpline.hours': 'सोम-शनि, सुबह 9 बजे - शाम 6 बजे',
    'contact.email.title': 'ईमेल',
    'contact.email.response': '24 घंटे के भीतर प्रतिक्रिया',
    'contact.office.title': 'कार्यालय',
    'contact.office.address': 'आवास विकास प्राधिकरण',
    'contact.office.location': 'सरकारी परिसर, राज्य राजधानी',
    
    // CTA
    'cta.title': 'आवेदन करने के लिए तैयार?',
    'cta.description': 'अभी अपनी आवेदन प्रक्रिया शुरू करें और अपने सपनों के घर का मालिक बनने का मौका पाएं',
    'cta.apply': 'अभी आवेदन करें',
    'cta.checkEligibility': 'पहले पात्रता जांचें',
    
    // Footer
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.home': 'होम',
    'footer.eligibility': 'पात्रता जांचें',
    'footer.apply': 'अभी आवेदन करें',
    'footer.lottery': 'लॉटरी परिणाम',
    'footer.contact': 'संपर्क',
    'footer.helpline': 'हेल्पलाइन:',
    'footer.email': 'ईमेल:',
    'footer.hours': 'सोम-शनि, सुबह 9 बजे - शाम 6 बजे',
    'footer.portal': 'सरकारी पोर्टल',
    'footer.portal.description': 'आवास विकास प्राधिकरण की आधिकारिक वेबसाइट। पारदर्शी, निष्पक्ष और सुरक्षित आवास आवंटन प्रणाली।',
    'footer.copyright': 'हाउसिंगलॉट प्रोजेक्ट। सभी अधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    
    // Auth Pages
    'auth.login.title': 'लॉगिन',
    'auth.login.mobileEmail': 'मोबाइल नंबर / ईमेल',
    'auth.login.mobileEmailPlaceholder': '9876543210 या user@example.com',
    'auth.login.password': 'पासवर्ड',
    'auth.login.submit': 'लॉगिन',
    'auth.login.noAccount': 'खाता नहीं है?',
    'auth.login.register': 'पंजीकरण',
    'auth.register.title': 'पंजीकरण',
    'auth.register.mobile': 'मोबाइल नंबर',
    'auth.register.mobilePlaceholder': '9876543210',
    'auth.register.sendOtp': 'OTP भेजें',
    'auth.register.haveAccount': 'पहले से खाता है?',
    'auth.register.enterOtp': 'OTP दर्ज करें',
    'auth.register.otpPlaceholder': '123456',
    'auth.register.verifyOtp': 'OTP सत्यापित करें',
    'auth.register.changeMobile': 'मोबाइल नंबर बदलें',
    'auth.register.createPassword': 'पासवर्ड बनाएं',
    'auth.register.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.register.createAccount': 'खाता बनाएं',
    
    // User Dashboard
    'user.dashboard.welcome': 'स्वागत है,',
    'user.dashboard.applicationStatus': 'आवेदन स्थिति',
    'user.dashboard.noApplication': 'अभी तक कोई आवेदन नहीं',
    'user.dashboard.quickActions': 'त्वरित कार्य',
    'user.dashboard.checkEligibility': 'पात्रता जांचें',
    'user.dashboard.startApplication': 'आवेदन शुरू करें',
    'user.dashboard.viewStatus': 'स्थिति देखें',
    'user.dashboard.profile': 'प्रोफ़ाइल',
    'user.dashboard.editProfile': 'प्रोफ़ाइल संपादित करें',
    'user.dashboard.applicationFlow': 'आवेदन प्रक्रिया',
    'user.dashboard.step1': '1. पात्रता जांचें',
    'user.dashboard.step2': '2. आवेदन भरें',
    'user.dashboard.step3': '3. दस्तावेज अपलोड करें',
    'user.dashboard.step4': '4. भुगतान करें',
    'user.dashboard.step5': '5. स्थिति ट्रैक करें',
    'user.dashboard.step6': '6. लॉटरी परिणाम',
    'user.dashboard.step7': '7. आवंटन पत्र',
    'user.dashboard.step8': '8. रिफंड स्थिति',
    'user.dashboard.go': 'जाएं',
    'user.dashboard.loading': 'लोड हो रहा है...',
    
    // Eligibility Page
    'eligibility.checker.title': 'पात्रता जांचकर्ता',
    'eligibility.checker.step': 'चरण',
    'eligibility.checker.of': 'का',
    'eligibility.checker.age': 'आयु',
    'eligibility.checker.agePlaceholder': '25',
    'eligibility.checker.next': 'अगला',
    'eligibility.checker.back': 'वापस',
    'eligibility.checker.annualIncome': 'वार्षिक आय (₹)',
    'eligibility.checker.incomePlaceholder': '300000',
    'eligibility.checker.ownProperty': 'क्या आपके पास कोई संपत्ति है?',
    'eligibility.checker.select': 'चुनें',
    'eligibility.checker.yes': 'हां',
    'eligibility.checker.no': 'नहीं',
    'eligibility.checker.check': 'पात्रता जांचें',
    'eligibility.checker.eligible': 'आप पात्र हैं!',
    'eligibility.checker.redirecting': 'आवेदन फॉर्म पर पुनर्निर्देशित कर रहे हैं...',
    'eligibility.checker.notEligible': 'पात्र नहीं',
    'eligibility.checker.notEligibleDesc': 'आपके इनपुट के आधार पर, आप इस योजना के लिए पात्र नहीं हो सकते हैं।',
    'eligibility.checker.tryAgain': 'पुनः प्रयास करें',
    
    // Application Page
    'application.title': 'आवेदन फॉर्म',
    'application.step': 'चरण',
    'application.identity.title': 'पहचान विवरण',
    'application.residence.title': 'निवास विवरण',
    'application.family.title': 'परिवार विवरण',
    'application.income.title': 'आय विवरण',
    'application.bank.title': 'बैंक विवरण',
    'application.categories.title': 'विशेष श्रेणियां',
    'application.declarations.title': 'घोषणाएं',
    'application.review.title': 'समीक्षा और सबमिट करें',
    'application.next': 'अगला',
    'application.back': 'वापस',
    'application.submit': 'आवेदन सबमिट करें',
    
    // Common Form Fields
    'form.name': 'पूरा नाम',
    'form.aadhaar': 'आधार नंबर',
    'form.dob': 'जन्म तिथि',
    'form.address': 'पता',
    'form.city': 'शहर',
    'form.state': 'राज्य',
    'form.pincode': 'पिन कोड',
    'form.familyMembers': 'परिवार के सदस्य',
    'form.dependents': 'आश्रित',
    'form.annualIncome': 'वार्षिक आय',
    'form.incomeCategory': 'आय श्रेणी',
    'form.bankAccount': 'बैंक खाता संख्या',
    'form.ifsc': 'IFSC कोड',
    'form.bankName': 'बैंक का नाम',
    
    // Status Messages
    'status.draft': 'मसौदा',
    'status.submitted': 'सबमिट किया गया',
    'status.paid': 'भुगतान किया गया',
    'status.underVerification': 'सत्यापन के तहत',
    'status.verified': 'सत्यापित',
    'status.rejected': 'अस्वीकृत',
    'status.selected': 'चयनित',
    'status.allotted': 'आवंटित',
    'status.possession': 'कब्जा',
    
    // Admin Pages
    'admin.dashboard.title': 'एडमिन डैशबोर्ड',
    'admin.dashboard.totalApplications': 'कुल आवेदन',
    'admin.dashboard.pendingVerification': 'लंबित सत्यापन',
    'admin.dashboard.verified': 'सत्यापित',
    'admin.dashboard.rejected': 'अस्वीकृत',
    'admin.login.title': 'एडमिन लॉगिन',
    'admin.login.username': 'उपयोगकर्ता नाम',
    'admin.login.password': 'पासवर्ड',
    'admin.login.submit': 'लॉगिन',
    'admin.applications.title': 'आवेदन',
    'admin.applications.filter': 'स्थिति से फ़िल्टर करें',
    'admin.applications.all': 'सभी',
    'admin.applications.view': 'विवरण देखें',
    'admin.applications.search': 'आवेदन खोजें...',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.submit': 'सबमिट करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.actions': 'कार्रवाई',
    
    // Application Status
    'status.title': 'आवेदन स्थिति',
    'status.applicationId': 'आवेदन ID:',
    'status.currentStatus': 'वर्तमान स्थिति:',
    'status.draftLabel': 'मसौदा',
    'status.draftDesc': 'आवेदन शुरू किया गया',
    'status.submittedLabel': 'सबमिट किया गया',
    'status.submittedDesc': 'आवेदन सबमिट किया गया',
    'status.paidLabel': 'भुगतान पूर्ण',
    'status.paidDesc': 'भुगतान प्राप्त हुआ',
    'status.underVerificationLabel': 'सत्यापन के तहत',
    'status.underVerificationDesc': 'दस्तावेज सत्यापित किए जा रहे हैं',
    'status.verifiedLabel': 'सत्यापित',
    'status.verifiedDesc': 'आवेदन सत्यापित',
    'status.selectedLabel': 'चयनित',
    'status.selectedDesc': 'लॉटरी में चयनित',
    'status.allottedLabel': 'आवंटित',
    'status.allottedDesc': 'प्लॉट आवंटित',
    'status.possessionLabel': 'कब्जा',
    'status.possessionDesc': 'कब्जा प्रदान किया गया',
    'status.quickActions': 'त्वरित कार्य',
    'status.reuploadDocuments': 'दस्तावेज पुनः अपलोड करें',
    'status.backToDashboard': 'डैशबोर्ड पर वापस जाएं',
    
    // Documents
    'documents.title': 'दस्तावेज अपलोड करें',
    'documents.description': 'कृपया निम्नलिखित दस्तावेज अपलोड करें। सभी दस्तावेज आवश्यक हैं।',
    'documents.upload': 'अपलोड करें',
    'documents.uploaded': 'अपलोड किया गया',
    'documents.continue': 'भुगतान पर जारी रखें',
    
    // Payment
    'payment.title': 'भुगतान',
    'payment.amount': 'आवेदन शुल्क',
    'payment.total': 'कुल राशि',
    'payment.payNow': 'अभी भुगतान करें',
    'payment.processing': 'भुगतान प्रसंस्करण...',
    'payment.completed': 'भुगतान पूर्ण!',
    'payment.redirecting': 'पुनर्निर्देशित कर रहे हैं...',
    
    // Profile
    'profile.title': 'प्रोफ़ाइल सेटिंग्स',
    'profile.edit': 'प्रोफ़ाइल संपादित करें',
    'profile.save': 'परिवर्तन सहेजें',
    
    // Lottery Results
    'lottery.title': 'लॉटरी परिणाम',
    'lottery.search': 'आवेदन ID से खोजें',
    'lottery.winners': 'विजेता',
    
    // Allotment
    'allotment.title': 'आवंटन पत्र',
    'allotment.download': 'आवंटन पत्र डाउनलोड करें',
    
    // Refund
    'refund.title': 'रिफंड स्थिति',
    'refund.status': 'रिफंड स्थिति',
    'refund.amount': 'रिफंड राशि',
    'refund.notEligible': 'आपका आवेदन रिफंड के लिए पात्र नहीं है। रिफंड केवल अस्वीकृत आवेदनों के लिए संसाधित किया जाता है।',
    'refund.processing': 'प्रसंस्करण',
    'refund.completed': 'पूर्ण',
    'refund.pending': 'लंबित',
    'refund.requestedAt': 'अनुरोधित तिथि',
    'refund.processedAt': 'संसाधित तिथि',
    'refund.refundId': 'रिफंड ID',
    
    // Declarations
    'declaration.truth': 'मैं घोषणा करता हूं कि प्रदान की गई सभी जानकारी सत्य और सही है।',
    'declaration.falseInfo': 'मैं समझता हूं कि गलत जानकारी अस्वीकृति का कारण बन सकती है।',
    
    // Review
    'review.name': 'नाम:',
    'review.category': 'श्रेणी:',
    'review.income': 'आय:',
    'review.city': 'शहर:',
    
    // Profile
    'profile.email': 'ईमेल',
    'profile.mobile': 'मोबाइल नंबर',
    'profile.updateSuccess': 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!',
    
    // Lottery
    'lottery.notConducted': 'अभी तक लॉटरी आयोजित नहीं की गई है। लॉटरी पूरी होने के बाद परिणाम यहां प्रकाशित किए जाएंगे।',
    'lottery.information': 'लॉटरी जानकारी',
    'lottery.id': 'लॉटरी ID',
    'lottery.date': 'लॉटरी तिथि',
    'lottery.totalWinners': 'कुल विजेता',
    'lottery.conductedOn': 'आयोजित किया गया',
    'lottery.seedHash': 'सीड हैश (सत्यापन के लिए)',
    'lottery.seedHashDesc': 'इस हैश का उपयोग लॉटरी परिणामों की अखंडता सत्यापित करने के लिए किया जा सकता है',
    'lottery.winnersList': 'विजेताओं की सूची',
    'lottery.searchPlaceholder': 'आवेदन ID या नाम से खोजें...',
    'lottery.applicationId': 'आवेदन ID',
    'lottery.name': 'नाम',
    'lottery.category': 'श्रेणी',
    'lottery.plotNumber': 'प्लॉट नंबर',
    
    // Allotment
    'allotment.status': 'आवंटन स्थिति',
    'allotment.notAllotted': 'आपका आवेदन अभी तक आवंटित नहीं किया गया है। कृपया बाद में जांचें या अपडेट के लिए अपनी आवेदन स्थिति देखें।',
    'allotment.viewStatus': 'आवेदन स्थिति देखें',
    'allotment.letter': 'आवंटन पत्र',
    'allotment.print': 'प्रिंट / डाउनलोड',
    'allotment.id': 'आवंटन ID',
    'allotment.plotNumber': 'प्लॉट नंबर',
    'allotment.allotmentDate': 'आवंटन तिथि',
    'allotment.applicantDetails': 'आवेदक विवरण',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

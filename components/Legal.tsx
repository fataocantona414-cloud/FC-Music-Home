import React from 'react';

interface LegalProps {
  type: 'terms' | 'privacy';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';
  const date = 'October 24, 2023';

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-12 animate-fade-in text-left">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-gray-500 text-sm">Last Updated: {date}</p>
      </div>

      <div className="space-y-8 text-gray-300 leading-relaxed font-light">
        {isTerms ? (
          <>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">1. Acceptance of Terms</h3>
              <p>By accessing and using the official website of Fatao Cantona ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">2. Intellectual Property</h3>
              <p>All content on this site, including but not limited to audio, video, images, and text, is the property of Fatao Cantona and protected by international copyright laws. Unauthorized use or distribution is strictly prohibited.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">3. User Conduct</h3>
              <p>Users agree not to use the Website for any unlawful purpose or any purpose prohibited by these Terms. You agree not to damage, disable, or impair the Website.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">4. Limitation of Liability</h3>
              <p>Fatao Cantona and his management team shall not be liable for any damages whatsoever resulting from your use or inability to use this website.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">1. Information Collection</h3>
              <p>We respect your privacy. This website primarily serves as a portfolio and does not actively collect personal data unless you voluntarily provide it through email contact or third-party platforms linked herein (e.g., Spotify, YouTube).</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">2. Third-Party Links</h3>
              <p>Our website contains links to other websites (Spotify, Apple Music, Social Media). We are not responsible for the privacy practices or content of these third-party sites.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">3. Cookies</h3>
              <p>This website may use standard cookies to enhance user experience. You can choose to disable cookies through your browser settings.</p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-ghanaGold mb-3">4. Contact Information</h3>
              <p>If you have questions about this policy, please contact us at fataocantona9@gmail.com.</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Legal;
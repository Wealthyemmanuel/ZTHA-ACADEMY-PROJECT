/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Copy, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Smartphone,
  Star,
  Gift,
  PlayCircle,
  Users,
  BookOpen,
  Globe
} from 'lucide-react';

// --- Components ---

const LeadCapture = ({ onComplete }: { onComplete: (data: { name: string, email: string, whatsapp: string }) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const FORM_ID = '9228472';
    const url = `https://app.kit.com/forms/${FORM_ID}/subscriptions`;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('first_name', formData.name);
    formDataToSubmit.append('email_address', formData.email);
    // Note: 'whatsapp' must be created as a custom field in your Kit dashboard
    formDataToSubmit.append('fields[whatsapp]', formData.whatsapp);

    try {
      // We use 'no-cors' because Kit doesn't return CORS headers for direct AJAX POSTs
      // The submission will still be processed by Kit.
      await fetch(url, {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors',
      });
      
      // Brief delay for better UX
      setTimeout(() => {
        onComplete(formData);
      }, 500);
    } catch (error) {
      console.error('Kit submission error:', error);
      // Fallback to ensure the user can still see the content
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            Exclusive Access: Naval Azure
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6 italic">
            Tired of the "11PM Calculation" that Never Adds Up?
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            Discover how a Nigerian student who blew his entire savings at 16 found a "Quiet" $32M strategy to build a dollar-backed future—starting with whatever is in your pocket right now.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Full Name</label>
              <input
                required
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all text-slate-900"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Email Address</label>
              <input
                required
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all text-slate-900"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">WhatsApp Number</label>
              <input
                required
                id="whatsapp"
                type="tel"
                placeholder="e.g. 08012345678"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all text-slate-900"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  GET INSTANT ACCESS
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
          
          <p className="text-center text-slate-400 text-xs mt-8 font-medium">
            <ShieldCheck className="w-4 h-4 inline mr-1 mb-0.5" />
            Your data is 100% secure. No spam, just value.
          </p>
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Join 500,000+ Nigerians building their future today.</p>
        </div>
      </motion.div>
    </div>
  );
};

const ReferralCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3 my-8 p-6 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl">
      <p className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">Your Access Code</p>
      <div className="flex items-center gap-4">
        <code className="text-3xl md:text-4xl font-bold font-mono text-emerald-950 tracking-tighter">
          {code}
        </code>
        <button 
          onClick={copyToClipboard}
          className="p-3 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm"
          title="Copy Code"
        >
          {copied ? <Check className="w-6 h-6 text-emerald-600" /> : <Copy className="w-6 h-6 text-emerald-600" />}
        </button>
      </div>
      {copied && <p className="text-xs font-medium text-emerald-600 animate-pulse">Copied to clipboard!</p>}
    </div>
  );
};

const CTAButton = ({ children, href, primary = true }: { children: React.ReactNode, href: string, primary?: boolean }) => (
  <motion.a
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg ${
      primary 
        ? "bg-emerald-600 text-white hover:bg-emerald-700" 
        : "bg-white text-emerald-900 border-2 border-emerald-100 hover:border-emerald-300"
    }`}
  >
    {children}
    <ArrowRight className="ml-2 w-5 h-5" />
  </motion.a>
);

const LiveTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const notifications = [
    "Someone from Lagos just joined Naval Azure",
    "Someone from Abuja just started their dollar journey",
    "Someone from Port Harcourt just claimed their bonuses",
    "Someone from Ibadan just downloaded Bamboo",
    "Someone from Enugu just made their first investment",
    "Someone from Kano just secured their future",
    "Someone from Benin City just joined the community"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-6 overflow-hidden mt-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center"
        >
          {notifications[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const OpenHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight italic">
      {children}
    </h2>
    <div className="h-1.5 w-20 bg-emerald-500 mt-6 rounded-full" />
  </div>
);

const BonusItem = ({ title, description, icon: Icon, imageUrl }: { title: string, description: string, icon: any, imageUrl?: string }) => (
  <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6">
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
    {imageUrl && (
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-100 shadow-sm bg-slate-50">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto block object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    )}
  </div>
);

// --- Main App ---

export default function App() {
  const [hasCapturedLead, setHasCapturedLead] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);

  const handleLeadCapture = (data: any) => {
    setLeadData(data);
    setHasCapturedLead(true);
    window.scrollTo(0, 0);
  };

  const WHATSAPP_LINK = "https://wa.me/2347033570538?text=Hi%20Emmanuel,%20I've%20just%20signed%20up%20on%20Bamboo%20using%20your%20code%20emmanuel467786.%20I'm%20ready%20for%20my%20bonuses!";
  const BAMBOO_LINK = "https://play.google.com/store/apps/details?id=com.invest.bamboo";
  const REFERRAL_CODE = "emmanuel467786";
  const FB_POST_IMAGE = "https://i.ibb.co/LDMLJhYz/FB-IMG-1773803901111.jpg";
  const BAMBOO_LOGO = "https://i.ibb.co/nsPgbCzx/images-30.jpg";
  const SCHOOL_OF_MONEY_IMAGE = "https://i.ibb.co/m5k9D5s5/1773988384544.png";
  const STUDENT_COMMUNITY_IMAGE = "https://i.ibb.co/TBkhV35G/1773989560958.png";
  const INTERNATIONAL_COMMUNITY_IMAGE = "https://i.ibb.co/mCc0L8kw/1773989413950-2.png";
  const BAMBOO_PLAYLIST_IMAGE = "https://i.ibb.co/1fpYwzt5/1773989583303.png";

  if (!hasCapturedLead) {
    return <LeadCapture onComplete={handleLeadCapture} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- HERO SECTION --- */}
      <header className="relative pt-20 pb-24 px-6 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-8">
              Naval Azure Presents
            </span>
            <h1 className="text-4xl md:text-7xl font-black leading-[0.95] tracking-tighter mb-10">
              How A Nigerian Student Who Blew His Entire Savings Celebrating His 16th Birthday Discovered A <span className="text-emerald-400">$32M+ Fintech Platform</span> — Backed By The Same People Behind Airbnb — Running Quietly And Profitably Since <span className="text-emerald-400">January 1st 2020</span> — That Lets You Own A Piece Of Apple, Google And Tesla Starting From Whatever Is In Your Pocket Right Now
            </h1>
          </motion.div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <CTAButton href={BAMBOO_LINK}>Get Started Now</CTAButton>
              <LiveTicker />
            </div>
            <p className="text-slate-400 text-sm font-medium">Join 500,000+ Nigerians building wealth</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- SECTION 1 --- */}
        <section>
          <OpenHeading>Does this feel like your reality every single day?</OpenHeading>
          <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
            <p>You are not lazy. You are not careless. You are not the problem.</p>
            <p>But something feels wrong — and you feel it every single day.</p>
            <p>You wake up and the heaviness is already there. Not from something dramatic. Just from the quiet weight of knowing —</p>
            <p className="font-bold text-slate-900 border-l-4 border-emerald-500 pl-6 italic">
              You are working. You are trying. You are showing up. And it is still not enough.
            </p>
            <p>The money comes in. The money goes out. What is left at the end barely justifies the effort.</p>
            <p>You sit with your friends and everyone is performing fine. Laughing. Spending. Posting.</p>
            <p>But at night — When everywhere is quiet and it is just you and your thoughts — You do the calculation nobody sees.</p>
            <p>What came in. What went out. What is left. What happens if something goes wrong tomorrow. What happens if nothing changes in five years.</p>
            <p className="text-2xl font-black text-slate-900">That silence at 11pm — That is not tiredness. That is the sound of a future feeling uncertain.</p>
            <p>And you carry it alone. Because in Nigeria — Talking about money struggles feels like admitting defeat.</p>
          </div>
        </section>

        {/* --- SECTION 2 --- */}
        <section>
          <OpenHeading>What is the invisible price you are paying for waiting?</OpenHeading>
          <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
            <p>Here is what nobody is saying out loud. The struggle you are feeling is not just about today. It is compounding.</p>
            <p>Every month spent without building something — Is a month of growth lost forever.</p>
            <p>Not dramatically. Not loudly. Just quietly — The gap between where you are and where you want to be — Getting wider.</p>
            <p>Think about the dreams sitting at the back of your mind. The Japa plan with no dollar savings behind it. The family depending on you while you have nothing secured for yourself.</p>
            <p className="text-2xl font-black text-slate-900">The version of yourself at 35 — Still doing the same calculation at 11pm — Just with bigger numbers and heavier responsibilities.</p>
            <p>This is not about being rich. This is about peace of mind. The peace of knowing something is growing in the background.</p>
            <p>Something nobody can ask you for. Something compounding quietly while you live your life. Right now — Every day without it is a day paying an invisible price.</p>
          </div>
        </section>

        {/* --- SECTION 3 --- */}
        <section className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
          <OpenHeading>Why were you never taught how money actually works?</OpenHeading>
          <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
            <p>Do you know where the real problem is? It is not you. It was never you.</p>
            <p>The government handed you a curriculum teaching photosynthesis and the water cycle — But nothing about how money works. Nothing about inflation.</p>
            <p>Nothing about why your parents worked their entire lives and still struggle. Nothing about how the people who seem financially okay actually got there.</p>
            <p>Your parents did the best they could — But they were never taught either. So they passed down what they knew.</p>
            <p className="font-bold text-slate-900">Work hard. Save money. Trust the system.</p>
            <p>Except the system was never designed to make you wealthy. It was designed to keep you functional enough to keep showing up.</p>
            <p>And the schools — Taking ₦300,000 to ₦500,000 from your family every year — Sent you into the world with a certificate and zero financial intelligence.</p>
            <p className="text-2xl font-black text-emerald-700 underline decoration-emerald-200 underline-offset-8">You did not fail the system. The system failed you.</p>
            <p>And here you are — Brilliant. Hardworking. Full of potential. Trying to build a future with tools nobody gave you.</p>
          </div>
        </section>

        {/* --- SECTION 4 --- */}
        <section>
          <OpenHeading>What if the barrier was never your background?</OpenHeading>
          <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
            <p>Before you read further — Something needs to be shattered.</p>
            <p>Right now you are thinking — <span className="italic">"This is not for me. I don't have enough to start."</span></p>
            <p className="italic text-slate-500">"Investing is for rich people." "I need a 6-figure account." "I need to come from a wealthy home."</p>
            <p className="text-2xl font-black text-slate-900">Every single one of those thoughts — Is a lie the system programmed into you.</p>
            <p>Because here is the truth — There is a platform sitting on your phone right now — Where pressing three buttons — With whatever you have in your pocket today — Puts you in partial ownership of companies like Apple, Google and Amazon.</p>
            <p className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-emerald-900">
              <Smartphone className="w-8 h-8 mb-4 text-emerald-600" />
              <span className="font-bold">The barrier is not your background. Not your income. Not your knowledge. It is literally a button on your phone.</span>
            </p>
          </div>
          <div className="mt-12 text-center">
            <CTAButton href={BAMBOO_LINK}>Download the App Now</CTAButton>
          </div>
        </section>

        {/* --- SECTION 5 --- */}
        <section>
          <OpenHeading>How did a zero balance on a 16th birthday change everything?</OpenHeading>
          <div className="space-y-12 text-xl text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">September 1st, 2023.</h3>
              <p>My birthday. I had just turned 16. My friends wanted to celebrate — And I wanted to show up. So I did. I spent everything.</p>
              <p>Every single kobo I had saved — Gone in one night. And when the noise died down — When everybody went home — I sat alone and looked at my phone.</p>
              <p className="font-bold text-red-600 mt-4">Zero balance. Not broke-for-now broke. Nothing-to-build-from broke.</p>
              <p>I remember the feeling exactly. Not panic. Something quieter than panic. The slow heavy realisation — <span className="italic">If something happened tomorrow — I have nothing.</span></p>
            </div>

            <div className="border-t border-slate-100 pt-12">
              <h3 className="text-2xl font-black text-slate-900 mb-4">The Journey Began.</h3>
              <p>My friends and I — all of us carrying the same quiet frustration — Started searching. We wanted to own part of companies making billions. Apple. Google. Tesla. Amazon.</p>
              <p>What we found first was pain. We got scammed. Multiple times. I still have those screenshots.</p>
              <p>Then I used a savings platform for 10 months. My savings grew 10%. Sounds decent — Until I saw two other numbers: The naira fell 15% in the same period. The dollar grew 12%.</p>
              <p className="text-2xl font-black text-slate-900 mt-6">I was doing everything right — And still moving backwards. Because I was building in the wrong currency.</p>
            </div>

            <div className="border-t border-slate-100 pt-12">
              <p>Until — By pure chance — I came across a post from Adnan Saani on Facebook. The same man I had been studying. The same voice I trusted.</p>
              
              <div className="my-10 p-4 bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
                <img 
                  src={FB_POST_IMAGE} 
                  alt="Adnan Saani Facebook Post" 
                  className="w-full h-auto rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <p className="text-center text-sm text-slate-500 mt-4 font-medium italic">The exact post that changed my direction.</p>
              </div>

              <p>I almost scrolled past it. <span className="italic">Almost.</span> But it was him. So I stopped. Read everything. And it felt like the answer I had been building a criteria to find.</p>
            </div>
          </div>
        </section>

        {/* --- THE CRITERIA --- */}
        <section className="bg-slate-900 text-white p-12 rounded-[2rem] shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-emerald-400 italic">What were the non-negotiables?</h2>
          <p className="text-slate-400 mb-12">I stopped settling and built a standard. Five things. Non-negotiable.</p>
          
          <div className="space-y-8">
            {[
              { id: "01", text: "I needed to start with whatever I had. Not a lump sum. Something I could feed consistently." },
              { id: "02", text: "The minimum deposit had to be accessible to anyone. Entry from as little as $1." },
              { id: "03", text: "It needed to have been running for at least 5 to 10 years. Surviving Nigeria's economic chaos." },
              { id: "04", text: "It needed serious institutional backing. Real regulatory oversight." },
              { id: "05", text: "My money needed protection even if the company closed tomorrow. International protection." }
            ].map((item) => (
              <div key={item.id} className="flex gap-6 items-start">
                <span className="text-emerald-500 font-mono font-bold text-xl">{item.id}</span>
                <p className="text-lg font-medium text-slate-200">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 6 --- */}
        <section>
          <OpenHeading>Is there a platform you can actually trust with your future?</OpenHeading>
          <div className="space-y-8 text-xl text-slate-700 leading-relaxed">
            <p>What I found on the other side met every single standard I had set. A platform running since <span className="font-black text-slate-900">January 1st, 2020.</span></p>
            
            <div className="flex items-center gap-4 py-4">
              <img 
                src={BAMBOO_LOGO} 
                alt="Bamboo Logo" 
                className="h-12 w-auto rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">The Platform: Bamboo</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-3xl font-black text-emerald-600">2.4M+</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Downloads</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-3xl font-black text-emerald-600">512K</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Verified Users</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-3xl font-black text-emerald-600">104K</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Daily Active</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-3xl font-black text-emerald-600">4.2★</p>
                <p className="text-xs font-bold text-slate-500 uppercase">Rating</p>
              </div>
            </div>

            <p>Backed by <span className="font-bold">$32 million</span> in institutional funding from <span className="font-bold underline decoration-emerald-500">Y Combinator</span> — the same investors behind Airbnb and Stripe.</p>
            <p>Regulated by <span className="font-bold">Nigeria's SEC</span> and licensed under <span className="font-bold">FINRA and SIPC in the United States.</span></p>
            
            <div className="p-8 bg-emerald-950 text-emerald-50 rounded-3xl space-y-4">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <p className="text-2xl font-black leading-tight">Even if the platform closed tomorrow — Your investments are held in your name. In a US-protected account. Nobody can touch them.</p>
            </div>
          </div>
        </section>

        {/* --- SECTION 7 --- */}
        <section>
          <OpenHeading>What are thousands of Nigerians saying about their experience?</OpenHeading>
          <div className="grid gap-6">
            {[
              { name: "Raymond Lawrence", text: "I was a complete novice. Because of this platform everything feels like I have been in the investment world for years." },
              { name: "Adeagbo Taiwo", text: "I invested in 2 companies. Both showing increase. I must commend their good work." },
              { name: "Ngozi Onyeukwu", text: "One of my investments is still surprising me to this day." },
              { name: "Bukola Raji", text: "Easy to use, enjoying it every day. Quite secure." }
            ].map((t, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-emerald-500 text-emerald-500" />)}
                </div>
                <p className="text-slate-700 italic mb-4">"{t.text}"</p>
                <p className="text-sm font-bold text-slate-900">— {t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 8 --- */}
        <section className="relative">
          <div className="absolute -inset-4 bg-emerald-50 rounded-[3rem] -z-10 border border-emerald-100" />
          <OpenHeading>What happens when you join with the right community?</OpenHeading>
          <div className="space-y-8 text-xl text-slate-700 leading-relaxed">
            <p>You can find this platform yourself. But joining with my code gets you something nobody else in Nigeria is offering.</p>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-6">
                <Gift className="text-emerald-600" />
                THE NAVAL AZURE BONUS STACK
              </h3>
              <p className="text-sm font-bold text-red-600 uppercase tracking-widest mb-8 animate-pulse">Everything below disappears April 2nd</p>
              
              <div className="grid gap-4">
                <BonusItem 
                  title="School of Money (Audio + eBook)" 
                  description="Complete financial education from Olumide Emmanuel. The ultimate guide to wealth creation." 
                  icon={BookOpen}
                  imageUrl={SCHOOL_OF_MONEY_IMAGE}
                />
                <BonusItem 
                  title="International Investor Community" 
                  description="A global community of investors from around the world. Free access to global insights." 
                  icon={Globe}
                  imageUrl={INTERNATIONAL_COMMUNITY_IMAGE}
                />
                <BonusItem 
                  title="Naval Azure Student Investor Community" 
                  description="A dedicated community of Nigerian students building their future together. Real conversations." 
                  icon={Users}
                  imageUrl={STUDENT_COMMUNITY_IMAGE}
                />
                <BonusItem 
                  title="Bamboo Video Tutorial Playlist" 
                  description="A complete playlist of videos showing you exactly how to use Bamboo like a pro from day one." 
                  icon={PlayCircle}
                  imageUrl={BAMBOO_PLAYLIST_IMAGE}
                />
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100 text-center">
                <p className="text-emerald-600 font-bold mb-8 text-lg">Yours FREE when you use the code below:</p>
                
                <ReferralCode code={REFERRAL_CODE} />
                
                <CTAButton href={BAMBOO_LINK}>Download & Use Code</CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 9 --- */}
        <section>
          <OpenHeading>Are you ready to stop watching and start building?</OpenHeading>
          <div className="space-y-6 text-xl text-slate-700 leading-relaxed">
            <p className="italic">I want to be honest with you about why I am doing this.</p>
            <p>I am not doing this only for the commission. I am doing this because I spent months looking for people serious about changing their financial lives — Not just people who say it — But people actually taking action on it.</p>
            <p>I could not find a community like that. So I decided to build one.</p>
            <p className="text-2xl font-black text-slate-900">Naval Azure exists for the Nigerian student and young adult — Done watching their money lose value — Ready to do something real about it.</p>
            <p>If you are that person — I want you in this community. We are going to become the friends who think long-term — Who hold each other accountable — And who look back at 40 and say — <span className="text-emerald-600">"We started when nobody believed we could."</span></p>
          </div>
        </section>

        {/* --- SECTION 10 --- */}
        <section className="text-center space-y-12">
          <OpenHeading>Where will you be in 2030 because of the decision you make today?</OpenHeading>
          <div className="space-y-8 text-2xl font-medium text-slate-700 italic">
            <p>"It is 2030. You are sitting somewhere quiet. Not stressed about money. Not doing the 11pm calculation. Just — settled."</p>
            <p>"Because seven years ago — When you were 16, broke, scared and unsure — You made one quiet decision. You started."</p>
            <p className="text-3xl font-black text-slate-900 not-italic">The right time — Was always today.</p>
          </div>
          
          <div className="flex flex-col items-center gap-8 pt-12">
            <div className="flex flex-col gap-4 w-full max-w-md">
              <CTAButton href={BAMBOO_LINK}>1. DOWNLOAD BAMBOO APP</CTAButton>
              <ReferralCode code={REFERRAL_CODE} />
            </div>
            
            <div className="w-full max-w-md p-8 bg-emerald-900 text-white rounded-3xl shadow-2xl">
              <h4 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6" />
                2. CLAIM YOUR BONUSES
              </h4>
              <p className="text-emerald-200 text-sm mb-6">Once you've made your first investment, message me on WhatsApp to get your bonus stack immediately.</p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={WHATSAPP_LINK}
                className="block w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl transition-colors shadow-lg"
              >
                MESSAGE ME ON WHATSAPP
              </motion.a>
            </div>
          </div>
        </section>

        {/* --- FOOTER / P.S. --- */}
        <footer className="pt-24 border-t border-slate-100 space-y-8 text-slate-500 text-sm">
          <div className="space-y-4">
            <p><span className="font-bold text-slate-900">P.S.</span> Want to move with the speed of lightning and beat 90% of your peers by the time you are 35 or 40? Click the link above and get started today.</p>
            <p><span className="font-bold text-slate-900">P.P.S.</span> All investments carry risk. You may lose money if you do not research properly.</p>
            <p><span className="font-bold text-slate-900">P.P.P.S.</span> I am not a financial advisor. Nothing on this page is financial advice.</p>
            <p><span className="font-bold text-slate-900">P.P.P.P.S.</span> This is not a get-rich-quick scheme. This is a long-term compounding plan built for patient people. If you cannot commit to at least 5 years — this is genuinely not for you.</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12 border-t border-slate-50">
            <p>© {new Date().getFullYear()} Naval Azure. All rights reserved.</p>
            <div className="flex gap-6">
              <a href={BAMBOO_LINK} className="hover:text-emerald-600 transition-colors">Bamboo App</a>
              <a href={WHATSAPP_LINK} className="hover:text-emerald-600 transition-colors">Contact Naval Azure</a>
            </div>
          </div>
        </footer>
      </main>

      {/* --- STICKY CTA FOR MOBILE --- */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50">
        <motion.a
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          href={BAMBOO_LINK}
          className="flex items-center justify-center w-full py-4 bg-emerald-600 text-white font-black rounded-full shadow-2xl"
        >
          GET STARTED NOW
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.a>
      </div>
    </div>
  );
}

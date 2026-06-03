import { useState, useEffect } from 'react';
import './App.css';
import { Toaster } from './components/ui/sonner';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import ContactDialog from './components/ContactDialog';
import TitleGenerator from './components/TitleGenerator';
import CommentReplyGenerator from './components/CommentReplyGenerator';
import ThumbnailTester from './components/ThumbnailTester';
import { Play, Zap, Target, Sparkles, Check, ArrowRight, TrendingUp } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious } from
'./components/ui/carousel';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const portfolioItems = [
  {
    id: 1,
    title: 'AI Money Making Thumbnail',
    category: 'Finance',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/67i0ds1u_Whitney%20Bonds.jpg'
  },
  {
    id: 2,
    title: 'Tech Comparison',
    category: 'Technology',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/hmi8de95_sample%201rr.jpg'
  },
  {
    id: 3,
    title: 'Product Review',
    category: 'Reviews',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/vraklog5_Paul%20J%20Lipsky.jpg'
  },
  {
    id: 4,
    title: 'Business Strategy',
    category: 'Business',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/p2e2z7hk_Odetta%20Rockhead-Kerr.jpg'
  },
  {
    id: 5,
    title: 'Design Tutorial',
    category: 'Education',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/gj2ohmcp_Chris%20-%20Wav.Formation5.jpg'
  },
  {
    id: 6,
    title: 'Easy Money Method',
    category: 'Finance',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/em5602ds_Chad%20Kimball.jpg'
  },
  {
    id: 7,
    title: 'First 100 Customers',
    category: 'Business',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/4hlz73fk_Arjun%20Mahadevan_.jpg'
  },
  {
    id: 8,
    title: 'Most People Quit Here',
    category: 'Motivation',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/ssiw9rgz_Rui%20Shi.jpg'
  },
  {
    id: 9,
    title: 'Beginner vs Elite',
    category: 'Fitness',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/x6gpu8of_Legendary%20Living%202.jpg'
  },
  {
    id: 10,
    title: 'Sales Psychology',
    category: 'Sales',
    image: 'https://customer-assets.emergentagent.com/job_violet-agency/artifacts/fdnklz4t_Highlevel%20Haris2.jpg'
  }];


  const processSteps = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'BRIEF',
    description: 'You tell us about your video, target audience, style preferences, competitors, and any ideas you already have in mind.'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'RESEARCH',
    description: 'Our designers dive deep into your channel, audience, and content style to understand what makes your viewers click and identify the best thumbnail angle.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'DESIGN',
    description: 'Our designers craft thumbnails with bold colors, clear text, and psychological triggers that demand attention.'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'REFINE & DELIVER',
    description: 'We refine the thumbnail based on your feedback, then deliver the final files.'
  }];


  const pricingTiers = [
  {
    name: 'Basic',
    price: '$30',
    thumbnails: '1 Thumbnail',
    features: [
    '1 custom thumbnail design',
    '2 revision rounds',
    'High-res files (1920x1080)',
    '48-hour delivery']

  },
  {
    name: 'Pro',
    price: '$80',
    thumbnails: '4 Thumbnails',
    saveAmount: 'Save $40',
    features: [
    '4 custom thumbnail designs',
    'Unlimited revisions',
    'High-res files (1920x1080)'],

    popular: true
  },
  {
    name: 'Max',
    price: '$190',
    thumbnails: '10 Thumbnails',
    saveAmount: 'Save $110',
    features: [
    '10 custom thumbnail designs',
    'Unlimited revisions',
    'High-res files (1920x1080)',
    'Monthly strategy call']

  }];


  return (
    <div className="App">
      <CustomCursor />
      <Navbar onMenuClick={() => setMenuOpen(true)} onContactClick={() => setContactOpen(true)} />
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <Toaster position="top-center" />

      {/* HERO SECTION */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        
        {/* Decorative glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#5B4EFF] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8FF47] rounded-full blur-[150px] opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10 sm:mb-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-[Syne] text-[#E8FF47] mb-2">1000+</div>
              <div className="text-xs sm:text-sm text-[#E8E8F0]/70 uppercase tracking-wide">Thumbnails Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-[Syne] text-[#E8FF47] mb-2">98%</div>
              <div className="text-xs sm:text-sm text-[#E8E8F0]/70 uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-[Syne] text-[#E8FF47] mb-2">40+</div>
              <div className="text-xs sm:text-sm text-[#E8E8F0]/70 uppercase tracking-wide">Global Clients</div>
            </div>
          </div>

          <div className="hero-card p-6 sm:p-12 bg-[#12121e]/50 backdrop-blur-sm border border-[#5B4EFF]/20 rounded-[14px] relative text-center">
            {/* Corner ticks */}
            <div className="corner-tick corner-tl" />
            <div className="corner-tick corner-tr" />
            <div className="corner-tick corner-bl" />
            <div className="corner-tick corner-br" />

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[Syne] text-[#E8E8F0] mb-6 leading-tight">
              Thumbnails that get
              <br />
              <span className="text-[#E8FF47]">clicked first</span> over others.
            </h1>

            <p className="text-base sm:text-xl text-[#E8E8F0]/70 max-w-2xl mx-auto mb-8 sm:mb-10 font-light">
              We design YouTube thumbnails that grab attention, trigger curiosity, and turn viewers into clickers. Your content deserves to be seen.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setContactOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-[#5B4EFF] hover:bg-[#5B4EFF]/80 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#5B4EFF]/50 flex items-center justify-center gap-2 min-h-[44px]">

                Get Your Thumbnail
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-transparent border-2 border-[#E8FF47] text-[#E8FF47] hover:bg-[#E8FF47]/10 font-bold rounded-xl transition-all min-h-[44px]">

                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WORK SECTION - INFINITE MARQUEE */}
      <section id="work" className="py-24 bg-[#080810] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-extrabold font-[Syne] text-[#E8E8F0] mb-4">
              Our <span className="text-[#E8FF47]">Work</span>
            </h2>
            <p className="text-xl text-[#E8E8F0]/60">Thumbnails that convert browsers into viewers</p>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="marquee-wrapper">
          {/* Row 1 - Left to Right */}
          <div className="marquee-row marquee-row-1">
            <div className="marquee-track">
              {[...portfolioItems.slice(0, 5), ...portfolioItems.slice(0, 5), ...portfolioItems.slice(0, 5)].map((item, index) => (
                <div key={`row1-${index}`} className="marquee-thumb">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="marquee-row marquee-row-2">
            <div className="marquee-track">
              {[...portfolioItems.slice(5, 10), ...portfolioItems.slice(5, 10), ...portfolioItems.slice(5, 10)].map((item, index) => (
                <div key={`row2-${index}`} className="marquee-thumb">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Edge fade gradients */}
          <div className="marquee-fade marquee-fade-left"></div>
          <div className="marquee-fade marquee-fade-right"></div>
        </div>
      </section>

      {/* HOW WE WORK SECTION - WHITEBOARD STYLE */}
      <section id="how-we-work" className="py-24 px-6 bg-[#12121e] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 reveal">
            <h2 className="text-5xl font-extrabold font-[Syne] text-[#E8E8F0] mb-4">
              How We <span className="text-[#E8FF47]">Work</span>
            </h2>
            <p className="text-xl text-[#E8E8F0]/60">Our proven process scribbled on the whiteboard</p>
          </div>

          {/* Whiteboard Container */}
          <div className="whiteboard-container reveal">
            {/* Whiteboard Frame */}
            <div className="whiteboard-frame">
              {/* Top Frame */}
              <div className="whiteboard-top-frame"></div>
              
              {/* Whiteboard Surface */}
              <div className="whiteboard-surface">
                {/* Title written on whiteboard */}
                <div className="text-center mb-8">
                  <h3 className="whiteboard-title">Our Process</h3>
                  <div className="whiteboard-underline"></div>
                </div>

                {/* Process Steps in Whiteboard Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {processSteps.map((step, index) => (
                    <div key={index} className="whiteboard-step">
                      <div className="flex items-start gap-4">
                        <div className="whiteboard-step-number">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="whiteboard-step-title">
                            {step.title}
                            {index < processSteps.length - 1 && (
                              <span className="whiteboard-arrow">→</span>
                            )}
                          </h4>
                          <p className="whiteboard-step-description">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative scribbles */}
                <div className="whiteboard-scribble whiteboard-scribble-1"></div>
                <div className="whiteboard-scribble whiteboard-scribble-2"></div>
              </div>

              {/* Bottom Frame with Stand */}
              <div className="whiteboard-bottom-frame"></div>
            </div>

            {/* Whiteboard Stand */}
            <div className="whiteboard-stand">
              <div className="whiteboard-leg whiteboard-leg-left"></div>
              <div className="whiteboard-leg whiteboard-leg-right"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT/CTA SECTION */}
      <section id="contact" className="py-32 px-6 bg-[#12121e] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B4EFF] rounded-full blur-[200px] opacity-20" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="reveal">
            <h2 className="text-6xl font-extrabold font-[Syne] text-[#E8E8F0] mb-6">
              Ready to boost your <span className="text-[#E8FF47]">click-through rate?</span>
            </h2>
            <p className="text-xl text-[#E8E8F0]/70 mb-10 max-w-2xl mx-auto">

            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="px-10 py-5 bg-[#E8FF47] hover:bg-[#E8FF47]/90 text-[#080810] font-bold text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-[#E8FF47]/50 inline-flex items-center gap-2">

              Let's Create Together
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FREE TOOLS - TITLE GENERATOR */}
      <TitleGenerator />

      {/* FREE TOOLS - COMMENT REPLY GENERATOR */}
      <CommentReplyGenerator />

      {/* FREE TOOLS - AI THUMBNAIL TESTER */}
      <ThumbnailTester />

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-[#080810] border-t border-[#5B4EFF]/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <img
                src="https://customer-assets.emergentagent.com/job_violet-agency/artifacts/xcsqdjz7_Asset%202.svg"
                alt="KlickFirst Media"
                className="h-14 w-auto" />

            </div>

            <p className="text-[#E8E8F0]/50 text-sm">© 2026 KlickFirst Media. All rights reserved.

            </p>

            <button
              onClick={() => setContactOpen(true)}
              className="text-[#5B4EFF] hover:text-[#E8FF47] transition-colors font-medium">

              Get in Touch
            </button>
          </div>
        </div>
      </footer>
    </div>);

}

export default App;
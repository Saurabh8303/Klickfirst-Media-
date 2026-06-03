import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ onMenuClick, onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080810]/92 backdrop-blur-xl border-b border-[#5B4EFF]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="https://customer-assets.emergentagent.com/job_violet-agency/artifacts/xcsqdjz7_Asset%202.svg" 
            alt="KlickFirst Media" 
            className="h-14 w-auto"
          />
        </div>

        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-[#5B4EFF]/10 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-[#E8E8F0]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
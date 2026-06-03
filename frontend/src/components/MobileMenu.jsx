import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const MobileMenu = ({ open, onOpenChange, onContactClick }) => {
  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Title Generator', href: '#tools' },
    { label: 'Reply Generator', href: '#reply-tool' },
    { label: 'Thumbnail Tester', href: '#thumbnail-tester' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    if (href === '#contact') {
      onContactClick();
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="bg-[#080810] border-l border-[#5B4EFF]/30 w-[300px] p-0 [&>button:first-of-type]:hidden"
      >
        <SheetHeader className="p-6 border-b border-[#5B4EFF]/20 flex flex-row items-center justify-between">
          <SheetTitle className="text-[#E8E8F0] font-[Syne] text-xl">Menu</SheetTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-2 hover:bg-[#5B4EFF]/20 transition-colors"
          >
            <X className="h-6 w-6 text-[#E8FF47]" />
          </button>
        </SheetHeader>
        
        <nav className="flex flex-col p-6 gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-left py-3 px-4 text-[#E8E8F0] text-lg font-bold font-[Syne] hover:bg-[#5B4EFF]/10 hover:text-[#E8FF47] rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
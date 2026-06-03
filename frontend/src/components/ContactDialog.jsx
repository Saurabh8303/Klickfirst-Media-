import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Mail, MessageCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactDialog = ({ open, onOpenChange }) => {
  const email = 'klickfirstmedia@gmail.com';
  const whatsapp = '7897102408';

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#12121e] border border-[#5B4EFF]/30 text-[#E8E8F0] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#E8E8F0] font-[Syne]">Get In Touch</DialogTitle>
          <DialogDescription className="text-[#E8E8F0]/60">
            Ready to create scroll-stopping thumbnails? Reach out via email or WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          {/* Email */}
          <div className="p-4 bg-[#080810] rounded-xl border border-[#5B4EFF]/20 hover:border-[#5B4EFF]/40 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#5B4EFF]/10 rounded-lg">
                  <Mail className="w-5 h-5 text-[#5B4EFF]" />
                </div>
                <div>
                  <p className="text-sm text-[#E8E8F0]/60 mb-1">Email</p>
                  <a 
                    href={`mailto:${email}`}
                    className="text-[#E8E8F0] font-medium hover:text-[#E8FF47] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(email, 'Email')}
                className="p-2 hover:bg-[#5B4EFF]/10 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-[#E8E8F0]/60" />
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-4 bg-[#080810] rounded-xl border border-[#5B4EFF]/20 hover:border-[#5B4EFF]/40 transition-all group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E8FF47]/10 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-[#E8FF47]" />
                </div>
                <div>
                  <p className="text-sm text-[#E8E8F0]/60 mb-1">WhatsApp</p>
                  <a 
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8E8F0] font-medium hover:text-[#E8FF47] transition-colors"
                  >
                    +91 {whatsapp}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(whatsapp, 'WhatsApp')}
                className="p-2 hover:bg-[#E8FF47]/10 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-[#E8E8F0]/60" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#5B4EFF]/20">
          <p className="text-sm text-center text-[#E8E8F0]/50">
            We typically respond within 24 hours
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
import { useState } from 'react';
import { MessageSquare, Copy, Loader2, AlertCircle, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const TONES = [
  'Friendly',
  'Professional',
  'Funny',
  'Grateful',
  'Handling Criticism',
];

const CommentReplyGenerator = () => {
  const [comment, setComment] = useState('');
  const [tone, setTone] = useState('Friendly');
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseReplies = (text) => {
    // Match "Option 1:", "Option 2:", "Option 3:" patterns
    const regex = /Option\s*\d+\s*[:\-]?\s*([\s\S]*?)(?=Option\s*\d+\s*[:\-]?|$)/gi;
    const matches = [...text.matchAll(regex)];
    
    if (matches.length >= 1) {
      return matches
        .map((m) => m[1].trim().replace(/^["']|["']$/g, ''))
        .filter((r) => r.length > 0)
        .slice(0, 3);
    }
    
    // Fallback: split by newlines
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^Option\s*\d+\s*[:\-]?\s*/i, '').replace(/^\d+[\.\)]\s*/, ''))
      .filter((line) => line.length > 0)
      .slice(0, 3);
  };

  const handleGenerate = async () => {
    if (!comment.trim()) {
      toast.error('Please paste a comment first');
      return;
    }

    setLoading(true);
    setError('');
    setReplies([]);

    try {
      const response = await fetch('/api/generate-comment-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, tone }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error('No replies received from API');
      }

      const parsed = parseReplies(text);
      if (parsed.length === 0) {
        throw new Error('Could not parse replies from response');
      }

      setReplies(parsed);
    } catch (err) {
      console.error('Reply generation error:', err);
      setError(err.message || 'Failed to generate replies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReply = (reply) => {
    navigator.clipboard.writeText(reply);
    toast.success('Reply copied to clipboard!');
  };

  return (
    <section id="reply-tool" className="py-24 px-6 bg-[#080810] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#E8FF47] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5B4EFF] rounded-full blur-[150px] opacity-15" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B4EFF]/10 border border-[#5B4EFF]/30 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-[#E8FF47]" />
            <span className="text-sm text-[#E8E8F0]/80">Free Tool · Powered by AI</span>
          </div>
          <h2 className="text-5xl font-extrabold font-[Syne] text-[#E8E8F0] mb-4">
            Comment Reply <span className="text-[#E8FF47]">Generator</span>
          </h2>
          <p className="text-xl text-[#E8E8F0]/60 max-w-2xl mx-auto">
            Craft the perfect response to any YouTube or Instagram comment in seconds.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#12121e] border border-[#5B4EFF]/20 rounded-[14px] p-8 mb-8 reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#E8E8F0] mb-3 uppercase tracking-wide">
                Paste the Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g. Your videos changed my life! I went from 100 subs to 10k in 3 months following your advice."
                rows={4}
                data-testid="reply-gen-comment"
                className="w-full px-4 py-3 bg-[#080810] border border-[#5B4EFF]/30 rounded-xl text-[#E8E8F0] placeholder:text-[#E8E8F0]/40 focus:outline-none focus:border-[#5B4EFF] resize-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#E8E8F0] mb-3 uppercase tracking-wide">
                Reply Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                data-testid="reply-gen-tone"
                className="w-full px-4 py-3 bg-[#080810] border border-[#5B4EFF]/30 rounded-xl text-[#E8E8F0] focus:outline-none focus:border-[#5B4EFF] transition-colors cursor-pointer"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <button
                onClick={handleGenerate}
                disabled={loading}
                data-testid="reply-gen-button"
                className="mt-6 w-full px-6 py-4 bg-[#5B4EFF] hover:bg-[#5B4EFF]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#5B4EFF]/50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Replies
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Generation Failed</p>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-[#12121e] border border-[#5B4EFF]/20 rounded-[14px] p-12 text-center">
            <Loader2 className="w-12 h-12 text-[#5B4EFF] animate-spin mx-auto mb-4" />
            <p className="text-[#E8E8F0]/70">Crafting the perfect replies for you...</p>
          </div>
        )}

        {/* Results */}
        {replies.length > 0 && !loading && (
          <div className="space-y-4" data-testid="reply-gen-results">
            <h3 className="text-2xl font-bold font-[Syne] text-[#E8E8F0] mb-4">
              Your <span className="text-[#E8FF47]">{replies.length}</span> Reply Options
            </h3>
            {replies.map((reply, index) => (
              <div
                key={index}
                className="group bg-[#12121e] border border-[#5B4EFF]/20 hover:border-[#5B4EFF]/50 rounded-xl p-6 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#5B4EFF]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#E8FF47] font-bold font-[Syne] text-lg">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-[#5B4EFF] font-bold uppercase tracking-wide mb-2">
                      Option {index + 1}
                    </div>
                    <p className="text-[#E8E8F0] leading-relaxed">{reply}</p>
                  </div>
                  <button
                    onClick={() => copyReply(reply)}
                    data-testid={`copy-reply-${index}`}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-[#5B4EFF]/20 transition-colors"
                    aria-label="Copy reply"
                  >
                    <Copy className="w-5 h-5 text-[#E8E8F0]/60 hover:text-[#E8FF47]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentReplyGenerator;

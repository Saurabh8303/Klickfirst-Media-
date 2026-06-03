import { useState } from 'react';
import { Sparkles, Copy, Loader2, AlertCircle, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const TitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseTitles = (text) => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').replace(/^[\-\*]\s*/, ''))
      .filter((line) => line.length > 0)
      .slice(0, 10);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a video topic first');
      return;
    }

    setLoading(true);
    setError('');
    setTitles([]);

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer process.env.REACT_APP_GROQ_API_KEY',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'user',
                content: `Generate 10 viral YouTube titles for this topic: ${topic}. Use power words, numbers, and curiosity gaps. Return ONLY a numbered list of 10 titles, no extra text.`,
              },
            ],
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error('No titles received from API');
      }

      const parsed = parseTitles(text);
      if (parsed.length === 0) {
        throw new Error('Could not parse titles from response');
      }

      setTitles(parsed);
    } catch (err) {
      console.error('Title generation error:', err);
      setError(err.message || 'Failed to generate titles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = (title) => {
    navigator.clipboard.writeText(title);
    toast.success('Title copied to clipboard!');
  };

  return (
    <section id="tools" className="py-24 px-6 bg-[#12121e] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#5B4EFF] rounded-full blur-[150px] opacity-15" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8FF47] rounded-full blur-[150px] opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B4EFF]/10 border border-[#5B4EFF]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#E8FF47]" />
            <span className="text-sm text-[#E8E8F0]/80">Free Tool · Powered by AI</span>
          </div>
          <h2 className="text-5xl font-extrabold font-[Syne] text-[#E8E8F0] mb-4">
            YouTube Title <span className="text-[#E8FF47]">Generator</span>
          </h2>
          <p className="text-xl text-[#E8E8F0]/60 max-w-2xl mx-auto">
            Get 10 click-worthy, scroll-stopping titles for your next video in seconds.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#080810] border border-[#5B4EFF]/20 rounded-[14px] p-8 mb-8 reveal">
          <label className="block text-sm font-bold text-[#E8E8F0] mb-3 uppercase tracking-wide">
            Video Topic / Description
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How to grow a YouTube channel from 0 to 10k subscribers in 90 days"
            rows={4}
            data-testid="title-gen-topic"
            className="w-full px-4 py-3 bg-[#12121e] border border-[#5B4EFF]/30 rounded-xl text-[#E8E8F0] placeholder:text-[#E8E8F0]/40 focus:outline-none focus:border-[#5B4EFF] resize-none transition-colors mb-6"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            data-testid="title-gen-button"
            className="w-full md:w-auto px-8 py-4 bg-[#5B4EFF] hover:bg-[#5B4EFF]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#5B4EFF]/50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Titles
              </>
            )}
          </button>
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
          <div className="bg-[#080810] border border-[#5B4EFF]/20 rounded-[14px] p-12 text-center">
            <Loader2 className="w-12 h-12 text-[#5B4EFF] animate-spin mx-auto mb-4" />
            <p className="text-[#E8E8F0]/70">Crafting 10 viral titles for you...</p>
          </div>
        )}

        {/* Results */}
        {titles.length > 0 && !loading && (
          <div className="space-y-3" data-testid="title-gen-results">
            <h3 className="text-2xl font-bold font-[Syne] text-[#E8E8F0] mb-4">
              Your <span className="text-[#E8FF47]">{titles.length}</span> Viral Titles
            </h3>
            {titles.map((title, index) => (
              <div
                key={index}
                className="group bg-[#080810] border border-[#5B4EFF]/20 hover:border-[#5B4EFF]/50 rounded-xl p-4 transition-all flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-[#5B4EFF]/20 rounded-lg flex items-center justify-center text-[#E8FF47] font-bold font-[Syne]">
                  {index + 1}
                </div>
                <p className="flex-1 text-[#E8E8F0] font-medium">{title}</p>
                <button
                  onClick={() => copyTitle(title)}
                  data-testid={`copy-title-${index}`}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-[#5B4EFF]/20 transition-colors"
                  aria-label="Copy title"
                >
                  <Copy className="w-5 h-5 text-[#E8E8F0]/60 hover:text-[#E8FF47]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleGenerator;

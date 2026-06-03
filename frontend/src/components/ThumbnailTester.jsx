import { useState, useRef } from 'react';
import {
  Upload,
  Link as LinkIcon,
  X,
  Image as ImageIcon,
  CheckCircle2,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  Home,
  Search,
  ListVideo,
} from 'lucide-react';
import { toast } from 'sonner';

// ===== Helpers =====
const extractYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  return null;
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

// ===== Fake Competitor Data =====
const COMPETITORS = [
  {
    title: 'I Built A $10,000 Gaming Setup In 24 Hours',
    channel: 'TechBeast',
    views: '2.4M views',
    time: '3 days ago',
    duration: '12:34',
    gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
    avatar: '#FF416C',
    text: '$10K SETUP',
  },
  {
    title: 'The Truth About Making Money Online In 2026',
    channel: 'WealthHacks',
    views: '847K views',
    time: '1 week ago',
    duration: '18:21',
    gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
    avatar: '#00C9FF',
    text: 'MONEY 2026',
  },
  {
    title: 'I Tried The Worlds Most Expensive Headphones',
    channel: 'AudioFreak',
    views: '1.1M views',
    time: '2 days ago',
    duration: '09:47',
    gradient: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    avatar: '#f7b733',
    text: '$50K EARS',
  },
  {
    title: 'This AI Tool Changed My Life Forever',
    channel: 'FutureNow',
    views: '3.2M views',
    time: '5 days ago',
    duration: '14:09',
    gradient: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
    avatar: '#8E2DE2',
    text: 'AI HACK',
  },
  {
    title: 'How I Lost 50 lbs In 90 Days (Honest Truth)',
    channel: 'FitJourney',
    views: '5.8M views',
    time: '1 month ago',
    duration: '22:15',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    avatar: '#38ef7d',
    text: '-50 LBS',
  },
  {
    title: '10 Productivity Hacks That Actually Work',
    channel: 'GrindDaily',
    views: '672K views',
    time: '4 days ago',
    duration: '08:55',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    avatar: '#f5576c',
    text: 'FOCUS',
  },
  {
    title: 'I Tested Every Coffee Maker So You Dont Have To',
    channel: 'BrewMaster',
    views: '294K views',
    time: '6 days ago',
    duration: '16:42',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    avatar: '#fda085',
    text: 'COFFEE WAR',
  },
  {
    title: 'Why Everyone Is Quitting Their 9-5 Jobs',
    channel: 'BusinessBlitz',
    views: '1.9M views',
    time: '2 weeks ago',
    duration: '11:28',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    avatar: '#4facfe',
    text: 'QUIT NOW',
  },
];

const ThumbnailTester = () => {
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // View toggles
  const [deviceView, setDeviceView] = useState('desktop');
  const [feedType, setFeedType] = useState('homepage');
  const [theme, setTheme] = useState('dark');

  // ===== Handlers =====
  const handleFile = async (file) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or WEBP image');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      setImageData(base64);
    } catch (err) {
      toast.error('Failed to read image file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUrlLoad = () => {
    const trimmed = imageUrl.trim();
    if (!trimmed) {
      toast.error('Please paste a YouTube video URL or image URL');
      return;
    }

    const videoId = extractYouTubeId(trimmed);
    if (videoId) {
      const url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setImageData(url);
      toast.success('YouTube thumbnail loaded!');
      return;
    }

    setImageData(trimmed);
    toast.success('Image loaded!');
  };

  const handleImageError = (e) => {
    const src = e.target.src;
    if (src.includes('maxresdefault.jpg')) {
      e.target.src = src.replace('maxresdefault.jpg', 'hqdefault.jpg');
    }
  };

  const handleReset = () => {
    setImageData(null);
    setImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ===== Theme =====
  const isDark = theme === 'dark';
  const yt = {
    bg: isDark ? '#0f0f0f' : '#ffffff',
    titleColor: isDark ? '#f1f1f1' : '#0f0f0f',
    metaColor: isDark ? '#aaaaaa' : '#606060',
    avatarBg: isDark ? '#272727' : '#e5e5e5',
    border: isDark ? '#272727' : '#e5e5e5',
    searchBg: isDark ? '#121212' : '#f1f1f1',
  };

  const deviceMax = {
    desktop: 'max-w-6xl',
    tablet: 'max-w-3xl',
    mobile: 'max-w-sm',
  }[deviceView];

  return (
    <section
      id="thumbnail-tester"
      className="py-24 px-6 bg-[#12121e] relative overflow-hidden"
    >
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-[#5B4EFF] rounded-full blur-[150px] opacity-15" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#E8FF47] rounded-full blur-[150px] opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B4EFF]/10 border border-[#5B4EFF]/30 rounded-full mb-6">
            <ImageIcon className="w-4 h-4 text-[#E8FF47]" />
            <span className="text-sm text-[#E8E8F0]/80">Free Tool · Preview Anywhere</span>
          </div>
          <h2 className="text-5xl font-extrabold font-[Syne] text-[#E8E8F0] mb-4">
            Thumbnail <span className="text-[#E8FF47]">Tester</span>
          </h2>
          <p className="text-xl text-[#E8E8F0]/60 max-w-2xl mx-auto">
            See exactly how your thumbnail looks on YouTube — across devices, feeds, and themes.
          </p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-[#080810] border border-[#5B4EFF]/20 rounded-[14px] p-8 mb-8 reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#E8E8F0] mb-3 uppercase tracking-wide">
                Upload Thumbnail
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                data-testid="thumb-tester-dropzone"
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-[#E8FF47] bg-[#E8FF47]/5'
                    : 'border-[#5B4EFF]/40 hover:border-[#5B4EFF] bg-[#12121e]/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  data-testid="thumb-tester-file"
                />
                <Upload className="w-10 h-10 text-[#5B4EFF] mx-auto mb-3" />
                <p className="text-[#E8E8F0] font-medium mb-1">
                  Drop your thumbnail here
                </p>
                <p className="text-sm text-[#E8E8F0]/50">
                  or click to browse · JPG, PNG, WEBP
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#E8E8F0] mb-3 uppercase tracking-wide">
                Or Paste YouTube / Image URL
              </label>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <LinkIcon className="w-5 h-5 text-[#E8E8F0]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
                    placeholder="https://youtube.com/watch?v=..."
                    data-testid="thumb-tester-url"
                    className="w-full pl-11 pr-4 py-3 bg-[#12121e] border border-[#5B4EFF]/30 rounded-xl text-[#E8E8F0] placeholder:text-[#E8E8F0]/40 focus:outline-none focus:border-[#5B4EFF] transition-colors"
                  />
                </div>
                <button
                  onClick={handleUrlLoad}
                  data-testid="thumb-tester-load-url"
                  className="w-full py-3 bg-[#5B4EFF]/20 border border-[#5B4EFF]/40 hover:bg-[#5B4EFF]/30 text-[#E8E8F0] font-medium rounded-xl transition-all"
                >
                  Load Thumbnail
                </button>
              </div>
            </div>
          </div>

          {imageData && (
            <div className="mt-6 flex items-center justify-between gap-4 p-4 bg-[#12121e] rounded-xl border border-[#5B4EFF]/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-[#E8E8F0]">Thumbnail loaded · Ready to preview</span>
              </div>
              <button
                onClick={handleReset}
                data-testid="thumb-tester-reset"
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg transition-all text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            </div>
          )}
        </div>

        {imageData && (
          <>
            {/* Device View Toggle */}
            <div className="mb-4 reveal">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E8E8F0]/50 mb-3 text-center">
                Device View
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <ToggleButton
                  active={deviceView === 'desktop'}
                  onClick={() => setDeviceView('desktop')}
                  testId="device-desktop"
                  icon={<Monitor className="w-4 h-4" />}
                >
                  Desktop
                </ToggleButton>
                <ToggleButton
                  active={deviceView === 'tablet'}
                  onClick={() => setDeviceView('tablet')}
                  testId="device-tablet"
                  icon={<Tablet className="w-4 h-4" />}
                >
                  Tablet
                </ToggleButton>
                <ToggleButton
                  active={deviceView === 'mobile'}
                  onClick={() => setDeviceView('mobile')}
                  testId="device-mobile"
                  icon={<Smartphone className="w-4 h-4" />}
                >
                  Mobile
                </ToggleButton>
              </div>
            </div>

            {/* Feed Type Toggle */}
            <div className="mb-6 reveal">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E8E8F0]/50 mb-3 text-center">
                Feed Type
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <ToggleButton
                  active={feedType === 'homepage'}
                  onClick={() => setFeedType('homepage')}
                  testId="feed-homepage"
                  icon={<Home className="w-4 h-4" />}
                >
                  Homepage Feed
                </ToggleButton>
                <ToggleButton
                  active={feedType === 'search'}
                  onClick={() => setFeedType('search')}
                  testId="feed-search"
                  icon={<Search className="w-4 h-4" />}
                >
                  Search Feed
                </ToggleButton>
                <ToggleButton
                  active={feedType === 'sidebar'}
                  onClick={() => setFeedType('sidebar')}
                  testId="feed-sidebar"
                  icon={<ListVideo className="w-4 h-4" />}
                >
                  Sidebar Feed
                </ToggleButton>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="mb-8 flex justify-center reveal">
              <div className="flex items-center gap-1 p-1 bg-[#080810] border border-[#5B4EFF]/30 rounded-full">
                <button
                  onClick={() => setTheme('dark')}
                  data-testid="theme-dark"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-[#5B4EFF] text-white'
                      : 'text-[#E8E8F0]/60 hover:text-[#E8E8F0]'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  onClick={() => setTheme('light')}
                  data-testid="theme-light"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-[#E8FF47] text-[#080810]'
                      : 'text-[#E8E8F0]/60 hover:text-[#E8E8F0]'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
              </div>
            </div>

            {/* PREVIEW AREA */}
            <div className="reveal flex justify-center">
              <div
                className={`yt-preview-frame ${deviceMax} w-full transition-all`}
                style={{ background: yt.bg, color: yt.titleColor }}
              >
                {/* YouTube top bar */}
                <div
                  className="yt-topbar"
                  style={{ borderColor: yt.border, background: yt.bg }}
                >
                  <div className="yt-logo" style={{ color: yt.titleColor }}>
                    <span style={{ color: '#FF0000' }}>▶</span> YouTube
                  </div>
                  <div className="yt-search-bar" style={{ background: yt.searchBg, borderColor: yt.border }}>
                    <Search className="w-4 h-4" style={{ color: yt.metaColor }} />
                    <span style={{ color: yt.metaColor }}>Search</span>
                  </div>
                  <div className="yt-topbar-avatar" style={{ background: yt.avatarBg }} />
                </div>

                {/* Feed Content */}
                <div className="p-4 md:p-6">
                  {feedType === 'homepage' && (
                    <HomepageFeed
                      imageData={imageData}
                      deviceView={deviceView}
                      yt={yt}
                      onImageError={handleImageError}
                    />
                  )}
                  {feedType === 'search' && (
                    <SearchFeed
                      imageData={imageData}
                      deviceView={deviceView}
                      yt={yt}
                      onImageError={handleImageError}
                    />
                  )}
                  {feedType === 'sidebar' && (
                    <SidebarFeed
                      imageData={imageData}
                      deviceView={deviceView}
                      yt={yt}
                      onImageError={handleImageError}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const ToggleButton = ({ active, onClick, children, testId, icon }) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all text-sm ${
      active
        ? 'bg-[#5B4EFF] text-white shadow-lg shadow-[#5B4EFF]/40'
        : 'bg-[#080810] border border-[#5B4EFF]/30 text-[#E8E8F0]/70 hover:text-[#E8E8F0] hover:border-[#5B4EFF]/60'
    }`}
  >
    {icon}
    {children}
  </button>
);

const PlaceholderThumb = ({ data }) => (
  <div className="placeholder-thumb" style={{ background: data.gradient }}>
    <span className="placeholder-text">{data.text}</span>
    <span className="placeholder-duration">{data.duration}</span>
  </div>
);

// ===== HOMEPAGE FEED =====
const HomepageFeed = ({ imageData, deviceView, yt, onImageError }) => {
  const gridCols = {
    desktop: 'grid-cols-3',
    tablet: 'grid-cols-2',
    mobile: 'grid-cols-1',
  }[deviceView];

  const items = [...COMPETITORS.slice(0, 5)];
  items.splice(1, 0, { isUser: true });

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-5`}>
      {items.map((item, i) =>
        item.isUser ? (
          <div key="user" className="user-card-home">
            <div className="user-thumb-wrap-home">
              <img
                src={imageData}
                alt="Your thumbnail"
                onError={onImageError}
                className="user-thumb-img"
              />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="yt-channel-avatar" style={{ background: '#5B4EFF' }} />
              <div className="flex-1 min-w-0">
                <div className="yt-card-title" style={{ color: yt.titleColor }}>
                  Your Awesome Video Title Goes Right Here
                </div>
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  Your Channel
                </div>
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  124K views · 2 hours ago
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={i}>
            <div className="competitor-thumb-wrap">
              <PlaceholderThumb data={item} />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="yt-channel-avatar" style={{ background: item.avatar }} />
              <div className="flex-1 min-w-0">
                <div className="yt-card-title" style={{ color: yt.titleColor }}>
                  {item.title}
                </div>
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  {item.channel}
                </div>
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  {item.views} · {item.time}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// ===== SEARCH FEED =====
const SearchFeed = ({ imageData, deviceView, yt, onImageError }) => {
  const items = [...COMPETITORS.slice(0, 4)];
  items.splice(2, 0, { isUser: true });

  const rowDirection = deviceView === 'mobile' ? 'flex-col' : 'flex-row';

  return (
    <div className="space-y-5">
      {items.map((item, i) =>
        item.isUser ? (
          <div key="user" className={`user-row ${rowDirection}`}>
            <div className="user-row-thumb-wrap">
              <img
                src={imageData}
                alt="Your thumbnail"
                onError={onImageError}
                className="user-thumb-img"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="yt-search-title" style={{ color: yt.titleColor }}>
                Your Awesome Video Title Goes Right Here
              </div>
              <div className="yt-card-meta mt-1" style={{ color: yt.metaColor }}>
                Your Channel · 124K views · 2 hours ago
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="yt-channel-avatar-sm" style={{ background: '#5B4EFF' }} />
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  Your Channel
                </div>
              </div>
              <div className="yt-search-desc" style={{ color: yt.metaColor }}>
                The video everyone's clicking on right now — get ready for an unforgettable ride that delivers value in every second...
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className={`search-row flex ${rowDirection} gap-4`}>
            <div className="search-row-thumb-wrap">
              <PlaceholderThumb data={item} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="yt-search-title" style={{ color: yt.titleColor }}>
                {item.title}
              </div>
              <div className="yt-card-meta mt-1" style={{ color: yt.metaColor }}>
                {item.channel} · {item.views} · {item.time}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="yt-channel-avatar-sm" style={{ background: item.avatar }} />
                <div className="yt-card-meta" style={{ color: yt.metaColor }}>
                  {item.channel}
                </div>
              </div>
              <div className="yt-search-desc" style={{ color: yt.metaColor }}>
                A video that proves the point — engaging content from start to finish that keeps viewers hooked until the very end...
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// ===== SIDEBAR FEED =====
const SidebarFeed = ({ imageData, deviceView, yt, onImageError }) => {
  const items = [...COMPETITORS.slice(0, 7)];
  items.splice(2, 0, { isUser: true });

  const containerWidth = {
    desktop: 'max-w-md',
    tablet: 'max-w-sm',
    mobile: 'max-w-full',
  }[deviceView];

  return (
    <div className={`mx-auto ${containerWidth}`}>
      <div
        className="text-sm font-bold mb-3 pb-2"
        style={{ color: yt.titleColor, borderBottom: `1px solid ${yt.border}` }}
      >
        Up next
      </div>
      <div className="space-y-3">
        {items.map((item, i) =>
          item.isUser ? (
            <div key="user" className="user-sidebar-row">
              <div className="user-sidebar-thumb-wrap">
                <img
                  src={imageData}
                  alt="Your thumbnail"
                  onError={onImageError}
                  className="user-thumb-img"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="yt-sidebar-title" style={{ color: yt.titleColor }}>
                  Your Awesome Video Title Goes Right Here
                </div>
                <div className="yt-sidebar-meta" style={{ color: yt.metaColor }}>
                  Your Channel
                </div>
                <div className="yt-sidebar-meta" style={{ color: yt.metaColor }}>
                  124K views · 2 hours ago
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="sidebar-row">
              <div className="sidebar-thumb-wrap">
                <PlaceholderThumb data={item} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="yt-sidebar-title" style={{ color: yt.titleColor }}>
                  {item.title}
                </div>
                <div className="yt-sidebar-meta" style={{ color: yt.metaColor }}>
                  {item.channel}
                </div>
                <div className="yt-sidebar-meta" style={{ color: yt.metaColor }}>
                  {item.views} · {item.time}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ThumbnailTester;

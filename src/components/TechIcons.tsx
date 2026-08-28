import React from 'react';

interface TechIconProps {
  name: string;
  iconUrl?: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, iconUrl, className = '', size = 16 }) => {
  // If a valid image/SVG URL is provided (http/https/data/relative), render an img element
  if (iconUrl && (iconUrl.startsWith('http://') || iconUrl.startsWith('https://') || iconUrl.startsWith('data:') || iconUrl.startsWith('/'))) {
    return (
      <img
        src={iconUrl}
        alt={name}
        className={`skill-icon-img ${className}`}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
    );
  }

  const normalized = name.toLowerCase().replace(/[\s\.\-_]/g, '');

  switch (normalized) {
    case 'react':
    case 'reactjs':
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#087ea4"/>
          <g stroke="#087ea4" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );

    case 'nextjs':
    case 'next':
      return (
        <svg width={size} height={size} viewBox="0 0 180 180" className={className} fill="none">
          <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" r="90" fill="currentColor" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" className={className}>
          <rect width="256" height="256" rx="40" fill="#3178C6"/>
          <path d="M150.5 200.5v27.6c4.5 2.3 9.8 4 15.9 5.2 6.1 1.2 12.6 1.7 19.4 1.7 6.6 0 12.9-.6 18.9-1.9 6-1.3 11.2-3.4 15.7-6.3 4.5-2.9 8-6.7 10.7-11.4 2.6-4.7 3.9-10.5 3.9-17.4 0-5-.7-9.4-2.2-13.2a30.7 30.7 0 0 0-6.5-10c-2.8-2.9-6.2-5.6-10.1-7.9-3.9-2.3-8.4-4.5-13.3-6.6-3.6-1.5-6.9-3-9.8-4.4-2.9-1.4-5.3-2.8-7.3-4.3-2-1.5-3.6-3-4.7-4.7-1.1-1.6-1.6-3.5-1.6-5.6 0-1.9.5-3.6 1.5-5.1 1-1.5 2.4-2.8 4.1-3.9 1.8-1.1 4-1.9 6.6-2.5 2.6-.6 5.5-.9 8.6-.9 2.3 0 4.7.2 7.3.5 2.6.3 5.1.9 7.7 1.6 2.6.7 5.1 1.6 7.6 2.7a41.7 41.7 0 0 1 6.8 3.8v-25.8c-4.2-1.6-8.8-2.8-13.8-3.6-5-.8-10.7-1.2-17.1-1.2-6.6 0-12.8.7-18.7 2.1-5.9 1.4-11 3.6-15.5 6.6-4.5 3-8 6.8-10.6 11.4-2.6 4.6-3.9 10.2-3.9 16.6 0 8.2 2.4 15.2 7.1 21.1 4.8 5.8 12 10.7 21.6 14.8a291.5 291.5 0 0 1 10.6 4.5c3.3 1.5 6.1 3 8.5 4.7 2.4 1.6 4.3 3.4 5.7 5.3 1.4 1.9 2.1 4 2.1 6.4 0 1.9-.4 3.5-1.3 5-.9 1.5-2.2 2.8-3.9 4-1.8 1.1-3.9 2-6.6 2.6-2.6.6-5.7 1-9.2 1-6 0-11.9-1-17.8-3.1-5.9-2.1-11.3-5.3-16.3-9.5Zm-46-68.7H140V109H41v22.7h35.3V233h28.1V131.7Z" fill="#FFF"/>
        </svg>
      );

    case 'nodejs':
    case 'node':
      return (
        <svg width={size} height={size} viewBox="0 0 256 292" className={className}>
          <path d="M134.9 1.8c-4.3-2.4-9.5-2.4-13.8 0L6.8 67.8C2.4 70.2 0 74.9 0 79.7v132.2c0 4.9 2.7 9.5 6.8 11.9l114.3 66c4.3 2.4 9.5 2.4 13.8 0l114.3-66c4.3-2.4 6.8-7.1 6.8-11.9V79.7c0-4.9-2.7-9.5-6.8-11.9L134.9 1.8Z" fill="#41873F"/>
          <path d="M132.6 163.6c-1.2-1.9-3.7-2.6-5.8-1.5l-23.7 13.7c-2.1 1.2-2.8 3.8-1.7 5.9l14.8 25.7c1.2 2 3.7 2.7 5.8 1.5l23.7-13.7c2.1-1.2 2.8-3.8 1.7-5.9l-14.8-25.7z" fill="#FFF"/>
        </svg>
      );

    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 256 255" className={className}>
          <path d="M126.9 0C60.7 0 64.8 28.7 64.8 28.7l.1 29.8h63.3v9H38.7S0 63.8 0 130.6c0 66.9 33.8 64.5 33.8 64.5h20.2v-31s-1.1-37 36.4-37h62.8s35.3.6 35.3-34.1V34.2S196.2 0 126.9 0Zm-34.9 20a11.4 11.4 0 1 1 0 22.8 11.4 11.4 0 0 1 0-22.8Z" fill="#387EB8"/>
          <path d="M129.1 254.7c66.2 0 62.1-28.7 62.1-28.7l-.1-29.8h-63.3v-9h89.5s38.7 3.7 38.7-63.1c0-66.9-33.8-64.5-33.8-64.5H202v31s1.1 37-36.4 37h-62.8s-35.3-.6-35.3 34.1v58.8s-7.7 34.2 61.6 34.2Zm34.9-20a11.4 11.4 0 1 1 0-22.8 11.4 11.4 0 0 1 0 22.8Z" fill="#FFE052"/>
        </svg>
      );

    case 'go':
    case 'golang':
      return (
        <svg width={size} height={size} viewBox="0 0 256 96" className={className}>
          <path d="M51.9 44.5c-.8 0-1.5-.6-1.5-1.5s.7-1.5 1.5-1.5h75.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H51.9Zm0 13.9c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h53.7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H51.9Zm0 13.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h33.8c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H51.9Z" fill="#00ADD8"/>
          <path d="M185.7 17.5c-20.9 0-36.7 14.8-36.7 34.9 0 20.3 15.6 35 37.1 35 15.3 0 25.8-7.3 31.7-18.4l-14.7-7.9c-3.6 6.3-9.5 9.9-16.7 9.9-10.4 0-18.5-6.9-19.4-17.1h53.3c.3-2 .5-4.2.5-6.5 0-18-12.7-29.9-35.1-29.9Zm-18 27.5c1.4-8.8 8.9-13.9 17.7-13.9 8.6 0 16.1 5.1 17.4 13.9h-35.1Z" fill="#00ADD8"/>
        </svg>
      );

    case 'postgresql':
    case 'postgres':
      return (
        <svg width={size} height={size} viewBox="0 0 256 264" className={className}>
          <path d="M127.7 0C78.4 0 54.4 30.6 50.8 53.6c-4.9 31.3 7.8 67.2 24.3 88.5 7.6 9.8 17.8 19.3 26 27-2.6 15.4-8.3 37.8-21.4 51.5 14.5-4 28.5-12.6 38.6-22.3 8.3 4.2 17.5 6.7 27.2 6.7 35.8 0 69.3-25.1 82.2-61.9 14.6-41.5 4.3-92.4-23.7-119.5C183.4 8.7 155.8 0 127.7 0Z" fill="#336791"/>
          <path d="M125 45c-28 0-42 16-44 32-3 21 8 46 20 60 7 8 16 16 23 22-2 11-7 27-18 37 12-3 24-9 32-16 7 3 14 5 22 5 28 0 54-19 64-47 11-31 3-70-19-90-16-16-38-22-60-22Z" fill="#FFF" opacity="0.3"/>
        </svg>
      );

    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg width={size} height={size} viewBox="0 0 256 154" className={className}>
          <path d="M128 0C93.9 0 72.5 17.1 64 51.2c12.8-17.1 27.7-23.5 44.8-19.2 9.7 2.4 16.7 9.5 24.4 17.3C145.7 62 160.1 76.8 192 76.8c34.1 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.7-2.4-16.7-9.5-24.4-17.3C174.3 14.8 159.9 0 128 0ZM64 76.8C29.9 76.8 8.5 93.9 0 128c12.8-17.1 27.7-23.5 44.8-19.2 9.7 2.4 16.7 9.5 24.4 17.3 12.5 12.7 26.9 27.5 58.8 27.5 34.1 0 55.5-17.1 64-51.2-12.8 17.1-27.7 23.5-44.8 19.2-9.7-2.4-16.7-9.5-24.4-17.3C110.3 91.6 95.9 76.8 64 76.8Z" fill="#38BDF8"/>
        </svg>
      );

    case 'docker':
      return (
        <svg width={size} height={size} viewBox="0 0 256 189" className={className}>
          <path d="M251.7 85.9c-2.3-1.6-9.6-5.8-21.8-3.4-1.8-10.9-9.1-17.1-9.1-17.1s-10 1.2-15.6 13c-6.8-4.4-16.7-5.1-16.7-5.1-2.4-23.5-22.1-41-45.7-41-1.2 0-2.4 0-3.6.2C130.6 13 113.8 0 94.4 0 71 0 51.6 19.4 51.6 42.8c0 1.8.1 3.5.4 5.3-25.2 3.6-44.5 25.3-44.5 51.4 0 28.7 23.3 52 52 52h143.7c28.7 0 52-23.3 52-52 0-5.1-.7-10-2.1-14.6 2-1 4.7-2.7 7.6-5.8 4.2-4.5 5.5-8.4 5.5-8.4s-5.6 4.7-14.5 2.2z" fill="#2496ED"/>
          <g fill="#FFF">
            <rect x="56" y="58" width="18" height="18" rx="2"/>
            <rect x="79" y="58" width="18" height="18" rx="2"/>
            <rect x="102" y="58" width="18" height="18" rx="2"/>
            <rect x="79" y="35" width="18" height="18" rx="2"/>
            <rect x="102" y="35" width="18" height="18" rx="2"/>
            <rect x="125" y="58" width="18" height="18" rx="2"/>
          </g>
        </svg>
      );

    case 'graphql':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" className={className}>
          <path d="M128 0 17 64.1v127.8L128 256l111-64.1V64.1L128 0Zm0 23.1 91 52.5v104.8L128 232.9 37 180.4V75.6L128 23.1Z" fill="#E535AB"/>
          <circle cx="128" cy="128" r="28" fill="#E535AB"/>
          <circle cx="128" cy="18" r="18" fill="#E535AB"/>
          <circle cx="128" cy="238" r="18" fill="#E535AB"/>
          <circle cx="233" cy="78" r="18" fill="#E535AB"/>
          <circle cx="233" cy="178" r="18" fill="#E535AB"/>
          <circle cx="23" cy="78" r="18" fill="#E535AB"/>
          <circle cx="23" cy="178" r="18" fill="#E535AB"/>
        </svg>
      );

    case 'redis':
      return (
        <svg width={size} height={size} viewBox="0 0 256 217" className={className}>
          <path d="M255.4 75.3 130.6 2.4c-1.6-.9-3.6-.9-5.2 0L.6 75.3c-1.6.9-.6 3.6 1.3 4.5l68.7 34.6-69.5 35.1c-1.6.8-1 3.5.7 4.5l123.6 70.8c1.6.9 3.6.9 5.2 0l124.8-70.8c1.7-1 1.7-3.6.1-4.5l-69.5-35.1 68.7-34.6c1.4-.9 2.3-3.6.7-4.5Z" fill="#DC382D"/>
        </svg>
      );

    case 'aws':
      return (
        <svg width={size} height={size} viewBox="0 0 256 154" className={className}>
          <path d="M68 62.4c-6.8-5.3-15.6-8-26.3-8-12.7 0-22.7 3.8-30 11.5C4.4 73.5.7 83.3.7 95.3c0 11.5 3.5 21 10.4 28.5C18 131.3 27.5 135 39.5 135c10.4 0 19.3-3 26.7-9.1v7.6h17.5V56.2H68v6.2Zm-24.8 56.4c-7.8 0-14-2.5-18.4-7.5-4.4-5-6.6-11.6-6.6-19.8 0-8.6 2.2-15.4 6.7-20.4 4.5-5 10.7-7.5 18.6-7.5 8.1 0 14.3 2.5 18.7 7.5s6.6 12 6.6 21c0 8.3-2.1 14.8-6.3 19.5-4.2 4.8-10.7 7.2-19.3 7.2Z" fill="#FF9900"/>
          <path d="M174.5 119.5c-48 35.4-118 18.9-158.4-6.4-3.1-2-5.7 1.4-2.3 3.9 44.5 32.2 121.2 38.6 168.3-2.1 4.5-3.9 1-8.5-7.6 4.6Z" fill="#FF9900"/>
        </svg>
      );

    case 'framermotion':
    case 'framer':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF"/>
        </svg>
      );

    case 'vite':
    case 'vitejs':
      return (
        <svg width={size} height={size} viewBox="0 0 256 257" className={className}>
          <path d="M255.2 37.9 135.5 252.8a8.5 8.5 0 0 1-15 0L.8 37.9a8.5 8.5 0 0 1 11.2-11.7l116 53.6 116-53.6a8.5 8.5 0 0 1 11.2 11.7Z" fill="url(#vite-grad)"/>
          <path d="m185.4 0-87 40.5a4.3 4.3 0 0 0-2.3 4.6l15.5 73.1a4.3 4.3 0 0 1-5.8 4.8L79.4 110a4.3 4.3 0 0 0-6.1 4.5l14 80.9a4.3 4.3 0 0 0 7.7 1.8l94-177.3a4.3 4.3 0 0 0-3.6-6.3v-.1l-.4-.4h.2Z" fill="#FFD62E"/>
          <defs>
            <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41D1FF"/>
              <stop offset="100%" stopColor="#BD34FE"/>
            </linearGradient>
          </defs>
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" className={className}>
          <rect width="256" height="256" rx="40" fill="#F7DF1E"/>
          <path d="M67.3 214c7.3 4.3 16.3 6.9 25.3 6.9 22.8 0 37.6-11.2 37.6-35.8v-72.3H102v72.1c0 12.8-6.7 18.5-16.1 18.5-6.2 0-11.9-2.3-15.6-5.1L67.3 214Zm91.5 6.3c10.3 5.4 23.3 9 36.8 9 31.7 0 50.4-15.6 50.4-40.4 0-22.3-13.8-33.6-37.3-43.5-14.7-6.2-21.4-11.7-21.4-20 0-7.3 5.8-13.8 17.6-13.8 9.8 0 18.8 3.3 25.2 7.1l6.9-17.6c-7.6-4.5-18.3-7.6-30.8-7.6-30.8 0-48.4 16.7-48.4 39.5 0 22.1 14.5 33.8 38.3 43.8 15 6.4 20.7 12.3 20.7 20.7 0 8.3-7.1 15-19.5 15-11.7 0-23.1-4.8-30.7-9.8l-7.8 17.6Z" fill="#000"/>
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 256 256" className={className}>
          <path d="M251.5 116.4 139.6 4.5a16 16 0 0 0-22.6 0l-22.5 22.5 28.5 28.5a19 19 0 0 1 24.1 24.1l27.4 27.4a19 19 0 1 1-11.4 11.3l-25.5-25.5v55.8a19 19 0 1 1-16 0V92.2a19 19 0 0 1-10.2-24.9L85.6 39.1 4.5 120.2a16 16 0 0 0 0 22.6l111.9 111.9a16 16 0 0 0 22.6 0l112.5-112.5a16 16 0 0 0 0-22.6v-.2Z" fill="#F05032"/>
        </svg>
      );

    case 'mongodb':
      return (
        <svg width={size} height={size} viewBox="0 0 256 550" className={className}>
          <path d="M136.2 550c-2.3-3.6-7.8-13.6-9.5-17.1-24.8-51.2-64.8-111.4-86.8-167.3C13.2 297.8 0 228.6 0 162.7 0 66.8 55.4 9.1 120.6 0c4.1 4.5 8.6 10.3 12.3 15.6 15.6 22.7 30 48.7 39.3 75.9 19.8 58 20.7 114.7 6.1 173.3-15.6 62.5-49.8 123.6-73.4 182-5.4 13.5-12.7 28.9-14.7 34.2-2.1 5.3-4.3 10.7-6.2 16.1l-1.8 5.7c-3.1 8.8-4.6 15.7-6 47.2Z" fill="#47A248"/>
        </svg>
      );

    default:
      // Fallback to Simple Icons CDN vector SVG
      return (
        <img
          src={`https://cdn.simpleicons.org/${encodeURIComponent(normalized)}`}
          alt={name}
          className={`skill-icon-img ${className}`}
          style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
          onError={(e) => {
            // If SimpleIcon not found, fallback to a neat bullet dot
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );
  }
};

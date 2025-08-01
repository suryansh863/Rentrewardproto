interface BuildingIllustrationProps {
  className?: string;
  animate?: boolean;
}

const BuildingIllustration = ({ className = "w-32 h-32", animate = false }: BuildingIllustrationProps) => {
  return (
    <div className={`${className} ${animate ? 'animate-float' : ''}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="building1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="building2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="building3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        
        {/* Sky background */}
        <rect width="200" height="200" fill="url(#skyGradient)" />
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
        </defs>
        
        {/* Building 1 - Tallest */}
        <rect x="20" y="60" width="40" height="120" fill="url(#building1)" rx="2" />
        <rect x="25" y="70" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="35" y="70" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="45" y="70" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="25" y="85" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="35" y="85" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="45" y="85" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="25" y="100" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="35" y="100" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="45" y="100" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        
        {/* Building 2 - Medium */}
        <rect x="70" y="80" width="45" height="100" fill="url(#building2)" rx="2" />
        <rect x="75" y="90" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="85" y="90" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="95" y="90" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="105" y="90" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="75" y="110" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="85" y="110" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="95" y="110" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="105" y="110" width="7" height="10" fill="rgba(255,255,255,0.3)" rx="1" />
        
        {/* Building 3 - Shortest */}
        <rect x="125" y="100" width="35" height="80" fill="url(#building3)" rx="2" />
        <rect x="130" y="110" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="140" y="110" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="150" y="110" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="130" y="125" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="140" y="125" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        <rect x="150" y="125" width="6" height="8" fill="rgba(255,255,255,0.3)" rx="1" />
        
        {/* Ground */}
        <rect x="0" y="180" width="200" height="20" fill="#E5E7EB" />
        
        {/* Clouds */}
        <ellipse cx="150" cy="30" rx="15" ry="8" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="160" cy="25" rx="12" ry="6" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="40" cy="20" rx="10" ry="5" fill="rgba(255,255,255,0.6)" />
      </svg>
    </div>
  );
};

export default BuildingIllustration; 
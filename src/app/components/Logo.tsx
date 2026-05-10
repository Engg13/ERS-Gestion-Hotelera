export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E5C3" />
          <stop offset="100%" stopColor="#B8941F" />
        </linearGradient>
      </defs>

      <rect x="5" y="5" width="60" height="60" rx="8" fill="#1a1a1a" />

      <text
        x="35"
        y="35"
        fontFamily="serif"
        fontSize="32"
        fontWeight="700"
        fill="url(#goldGradient)"
        textAnchor="middle"
        dominantBaseline="central"
      >
        GH
      </text>

      <rect x="5" y="5" width="60" height="60" rx="8" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />

      <text
        x="80"
        y="30"
        fontFamily="serif"
        fontSize="22"
        fontWeight="600"
        fill="#D4AF37"
        style={{ letterSpacing: '1px' }}
      >
        GRAND
      </text>
      <text
        x="80"
        y="50"
        fontFamily="serif"
        fontSize="16"
        fontWeight="500"
        fill="#B8941F"
        style={{ letterSpacing: '2px' }}
      >
        HOTEL
      </text>
    </svg>
  );
}

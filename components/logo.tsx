interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "dark" ? "#0F172A" : "#FFFFFF";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      aria-label="ListifyPH"
      role="img"
      className={className}
    >
      {/* Icon: blue rounded square */}
      <rect x="1" y="4" width="32" height="32" rx="6" fill="#3B82F6" />

      {/* List lines */}
      <rect x="7.5" y="12" width="18" height="2.5" rx="1.25" fill="white" />
      <rect x="7.5" y="18.75" width="18" height="2.5" rx="1.25" fill="white" />
      <rect x="7.5" y="25.5" width="11.5" height="2.5" rx="1.25" fill="white" />
      <rect x="21.5" y="25.5" width="5" height="2.5" rx="1.25" fill="white" fillOpacity="0.35" />

      {/* Green sparkle at top-right corner of icon */}
      <path
        d="M29.5,1 L30.35,3.15 L32.5,4 L30.35,4.85 L29.5,7 L28.65,4.85 L26.5,4 L28.65,3.15 Z"
        fill="#22C55E"
      />

      {/* Logo text */}
      <text
        x="38"
        y="26.5"
        fontFamily="system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontWeight="800"
        fontSize="17"
      >
        <tspan fill={textColor}>Listify</tspan>
        <tspan fill="#3B82F6">PH</tspan>
      </text>
    </svg>
  );
}

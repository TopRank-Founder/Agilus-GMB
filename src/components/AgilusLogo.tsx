import React from "react";

interface AgilusLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: "color" | "white";
}

export const AgilusLogo: React.FC<AgilusLogoProps> = ({
  className = "h-8 md:h-12 w-auto",
  width,
  height,
  variant = "color",
}) => {
  const brandColor = variant === "white" ? "#ffffff" : "#0e5aa7";
  const textColor = variant === "white" ? "#ffffff" : "#0e5aa7";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      width={width}
      height={height}
      className={`${className} select-none pointer-events-none`}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <g>
        {/* 'a' */}
        <ellipse
          cx="20"
          cy="38"
          rx="10"
          ry="10"
          fill="none"
          stroke={brandColor}
          strokeWidth="4.8"
        />
        <path
          d="M 30 28 V 48"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* 'g' */}
        <ellipse
          cx="50"
          cy="38"
          rx="10"
          ry="10"
          fill="none"
          stroke={brandColor}
          strokeWidth="4.8"
        />
        <path
          d="M 60 28 V 48 C 60 56, 52 61, 44 61"
          fill="none"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* 'i' */}
        <path
          d="M 72 28 V 48"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <circle cx="72" cy="18" r="2.8" fill={brandColor} />

        {/* 'l' */}
        <path
          d="M 84 14 V 48"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* 'u' */}
        <path
          d="M 96 28 V 40 A 8 8 0 0 0 112 40 V 28"
          fill="none"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <path
          d="M 112 28 V 48"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* 's' */}
        <path
          d="M 132 31 C 131 26, 121 26, 121 31 C 121 36, 132 35, 132 40 C 132 45, 121 45, 120 40"
          fill="none"
          stroke={brandColor}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Brand chevrons - colored or white */}
        {/* Chevron 1: Red */}
        <path
          d="M 148 24 L 158 34 L 148 44"
          fill="none"
          stroke={variant === "white" ? "#ffffff" : "#de1f26"}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chevron 2: Yellow */}
        <path
          d="M 160 24 L 170 34 L 160 44"
          fill="none"
          stroke={variant === "white" ? "#ffffff" : "#fdb813"}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chevron 3: Green */}
        <path
          d="M 172 24 L 182 34 L 172 44"
          fill="none"
          stroke={variant === "white" ? "#ffffff" : "#6cb785"}
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'diagnostics' label beneath */}
        <text
          x="96"
          y="70"
          textAnchor="middle"
          fill={textColor}
          fontSize="15"
          fontWeight="700"
          letterSpacing="5.8"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          diagnostics
        </text>
      </g>
    </svg>
  );
};

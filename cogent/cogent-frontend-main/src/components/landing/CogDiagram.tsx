const CogDiagram: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-secondary/10 blur-[80px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-primary/10 blur-[80px]" />

      <svg
        viewBox="0 0 860 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <defs>
          {/* Purple gradient */}
          <linearGradient
            id="purpleGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7101FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5B00D0" stopOpacity="0.9" />
          </linearGradient>

          {/* Cyan gradient */}
          <linearGradient
            id="cyanGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#08E9EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06E9EE" stopOpacity="0.6" />
          </linearGradient>

          {/* Card surface gradient */}
          <linearGradient
            id="cardGrad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#353648" />
            <stop offset="100%" stopColor="#2B2C3E" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow for connections */}
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Connection lines: Users to Cog ── */}

        {/* User 1 (Product Manager) to Cog */}
        <path
          d="M 210 105 C 280 105, 330 170, 370 195"
          stroke="url(#cyanGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* User 2 (Engineer) to Cog */}
        <path
          d="M 210 220 C 270 220, 320 210, 370 210"
          stroke="url(#cyanGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="2.3s"
            repeatCount="indefinite"
          />
        </path>

        {/* User 3 (Sales Rep) to Cog */}
        <path
          d="M 210 335 C 280 335, 330 250, 370 225"
          stroke="url(#cyanGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </path>

        {/* ── Connection lines: Cog to Departments ── */}

        {/* Cog to Marketing */}
        <path
          d="M 500 190 C 540 180, 580 115, 635 105"
          stroke="url(#purpleGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="2.1s"
            repeatCount="indefinite"
          />
        </path>

        {/* Cog to Support */}
        <path
          d="M 500 210 C 545 210, 585 220, 635 220"
          stroke="url(#purpleGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="1.9s"
            repeatCount="indefinite"
          />
        </path>

        {/* Cog to Operations */}
        <path
          d="M 500 230 C 540 250, 580 320, 635 335"
          stroke="url(#purpleGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
          filter="url(#lineGlow)"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-20"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </path>

        {/* ── Left: Users creating cards ── */}

        {/* User 1 — Product Manager */}
        <g>
          <rect
            x="40"
            y="65"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Avatar */}
          <circle cx="76" cy="97" r="16" fill="#08E9EE" fillOpacity="0.15" />
          <circle cx="76" cy="92" r="6" fill="white" fillOpacity="0.35" />
          <ellipse
            cx="76"
            cy="105"
            rx="10"
            ry="6"
            fill="white"
            fillOpacity="0.2"
          />
          {/* Card snippet */}
          <rect
            x="102"
            y="85"
            width="88"
            height="6"
            rx="3"
            fill="white"
            fillOpacity="0.25"
          />
          <rect
            x="102"
            y="97"
            width="62"
            height="5"
            rx="2.5"
            fill="#08E9EE"
            fillOpacity="0.25"
          />
          <rect
            x="102"
            y="108"
            width="48"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.1"
          />
          {/* Label */}
          <text
            x="125"
            y="132"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Product Manager
          </text>
        </g>

        {/* User 2 — Engineer */}
        <g>
          <rect
            x="40"
            y="180"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Avatar */}
          <circle cx="76" cy="212" r="16" fill="#7101FF" fillOpacity="0.2" />
          <circle cx="76" cy="207" r="6" fill="white" fillOpacity="0.35" />
          <ellipse
            cx="76"
            cy="220"
            rx="10"
            ry="6"
            fill="white"
            fillOpacity="0.2"
          />
          {/* Card snippet */}
          <rect
            x="102"
            y="200"
            width="88"
            height="6"
            rx="3"
            fill="white"
            fillOpacity="0.25"
          />
          <rect
            x="102"
            y="212"
            width="72"
            height="5"
            rx="2.5"
            fill="#7101FF"
            fillOpacity="0.3"
          />
          <rect
            x="102"
            y="223"
            width="55"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.1"
          />
          {/* Label */}
          <text
            x="125"
            y="247"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Engineer
          </text>
        </g>

        {/* User 3 — Sales Rep */}
        <g>
          <rect
            x="40"
            y="295"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Avatar */}
          <circle cx="76" cy="327" r="16" fill="#08E9EE" fillOpacity="0.12" />
          <circle cx="76" cy="322" r="6" fill="white" fillOpacity="0.35" />
          <ellipse
            cx="76"
            cy="335"
            rx="10"
            ry="6"
            fill="white"
            fillOpacity="0.2"
          />
          {/* Card snippet */}
          <rect
            x="102"
            y="315"
            width="88"
            height="6"
            rx="3"
            fill="white"
            fillOpacity="0.25"
          />
          <rect
            x="102"
            y="327"
            width="58"
            height="5"
            rx="2.5"
            fill="#08E9EE"
            fillOpacity="0.25"
          />
          <rect
            x="102"
            y="338"
            width="40"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.1"
          />
          {/* Label */}
          <text
            x="125"
            y="362"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Sales Rep
          </text>
        </g>

        {/* ── Left label ── */}
        <text
          x="125"
          y="48"
          fontSize="11"
          fill="#08E9EE"
          fillOpacity="0.7"
          fontFamily="Plus Jakarta Sans, sans-serif"
          textAnchor="middle"
          fontWeight="600"
        >
          EACH CREATES A CARD
        </text>

        {/* ── Center: The Cog ── */}
        <g>
          <rect
            x="370"
            y="130"
            width="130"
            height="160"
            rx="20"
            fill="url(#purpleGrad)"
            filter="url(#glow)"
          />
          <rect
            x="370"
            y="130"
            width="130"
            height="160"
            rx="20"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="1"
            fill="none"
          />
          {/* Three mini cards stacked inside the Cog */}
          <rect
            x="390"
            y="155"
            width="90"
            height="22"
            rx="5"
            fill="white"
            fillOpacity="0.12"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
          <rect
            x="397"
            y="162"
            width="40"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.3"
          />
          <rect
            x="441"
            y="162"
            width="25"
            height="4"
            rx="2"
            fill="#08E9EE"
            fillOpacity="0.3"
          />

          <rect
            x="390"
            y="183"
            width="90"
            height="22"
            rx="5"
            fill="white"
            fillOpacity="0.12"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
          <rect
            x="397"
            y="190"
            width="35"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.3"
          />
          <rect
            x="436"
            y="190"
            width="30"
            height="4"
            rx="2"
            fill="#7101FF"
            fillOpacity="0.35"
          />

          <rect
            x="390"
            y="211"
            width="90"
            height="22"
            rx="5"
            fill="white"
            fillOpacity="0.12"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
          <rect
            x="397"
            y="218"
            width="45"
            height="4"
            rx="2"
            fill="white"
            fillOpacity="0.3"
          />
          <rect
            x="446"
            y="218"
            width="20"
            height="4"
            rx="2"
            fill="#08E9EE"
            fillOpacity="0.25"
          />

          {/* Label */}
          <text
            x="435"
            y="257"
            fontSize="13"
            fill="white"
            fillOpacity="0.9"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            COG
          </text>
          <text
            x="435"
            y="273"
            fontSize="9"
            fill="white"
            fillOpacity="0.5"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            3 cards combined
          </text>
        </g>

        {/* ── Right: Departments ── */}

        {/* Department 1 — Marketing */}
        <g>
          <rect
            x="635"
            y="65"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Department icon — megaphone/broadcast */}
          <circle cx="671" cy="100" r="14" fill="#7101FF" fillOpacity="0.2" />
          <rect
            x="665"
            y="94"
            width="12"
            height="12"
            rx="2"
            fill="white"
            fillOpacity="0.3"
          />
          {/* Three user dots */}
          <circle cx="703" cy="92" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="715" cy="92" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="727" cy="92" r="3" fill="white" fillOpacity="0.25" />
          <rect
            x="697"
            y="102"
            width="70"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.12"
          />
          <rect
            x="697"
            y="112"
            width="50"
            height="5"
            rx="2.5"
            fill="#7101FF"
            fillOpacity="0.2"
          />
          <text
            x="720"
            y="133"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Marketing
          </text>
        </g>

        {/* Department 2 — Support */}
        <g>
          <rect
            x="635"
            y="180"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Department icon — chat bubble */}
          <circle cx="671" cy="215" r="14" fill="#08E9EE" fillOpacity="0.15" />
          <rect
            x="663"
            y="209"
            width="16"
            height="11"
            rx="3"
            fill="white"
            fillOpacity="0.3"
          />
          {/* Three user dots */}
          <circle cx="703" cy="207" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="715" cy="207" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="727" cy="207" r="3" fill="white" fillOpacity="0.25" />
          <rect
            x="697"
            y="217"
            width="70"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.12"
          />
          <rect
            x="697"
            y="227"
            width="55"
            height="5"
            rx="2.5"
            fill="#08E9EE"
            fillOpacity="0.2"
          />
          <text
            x="720"
            y="248"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Support
          </text>
        </g>

        {/* Department 3 — Operations */}
        <g>
          <rect
            x="635"
            y="295"
            width="170"
            height="80"
            rx="16"
            fill="url(#cardGrad)"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          {/* Department icon — gear */}
          <circle cx="671" cy="330" r="14" fill="#7101FF" fillOpacity="0.15" />
          <circle
            cx="671"
            cy="330"
            r="8"
            fill="none"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <circle cx="671" cy="330" r="3" fill="white" fillOpacity="0.3" />
          {/* Three user dots */}
          <circle cx="703" cy="322" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="715" cy="322" r="3" fill="white" fillOpacity="0.25" />
          <circle cx="727" cy="322" r="3" fill="white" fillOpacity="0.25" />
          <rect
            x="697"
            y="332"
            width="70"
            height="5"
            rx="2.5"
            fill="white"
            fillOpacity="0.12"
          />
          <rect
            x="697"
            y="342"
            width="45"
            height="5"
            rx="2.5"
            fill="#7101FF"
            fillOpacity="0.2"
          />
          <text
            x="720"
            y="363"
            fontSize="10"
            fill="white"
            fillOpacity="0.4"
            fontFamily="Plus Jakarta Sans, sans-serif"
            textAnchor="middle"
          >
            Operations
          </text>
        </g>

        {/* ── Right label ── */}
        <text
          x="720"
          y="48"
          fontSize="11"
          fill="#7101FF"
          fillOpacity="0.7"
          fontFamily="Plus Jakarta Sans, sans-serif"
          textAnchor="middle"
          fontWeight="600"
        >
          DISTRIBUTED TO TEAMS
        </text>

        {/* ── Flow labels ── */}
        <text
          x="290"
          y="215"
          fontSize="16"
          fill="#08E9EE"
          fillOpacity="0.35"
          fontFamily="Plus Jakarta Sans, sans-serif"
          textAnchor="middle"
        >
          &#x2192;
        </text>
        <text
          x="570"
          y="215"
          fontSize="16"
          fill="#7101FF"
          fillOpacity="0.45"
          fontFamily="Plus Jakarta Sans, sans-serif"
          textAnchor="middle"
        >
          &#x2192;
        </text>
      </svg>
    </div>
  )
}

export default CogDiagram

const AnimatedMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-primary/12 blur-[140px]" />

      {/* Editor frame */}
      <div className="relative rounded-2xl border border-white/10 bg-night-base-01 shadow-2xl sm:rounded-3xl">
        {/* ── Top Nav Bar ── */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <div className="flex flex-col gap-[3px]">
              <div className="h-[2px] w-4 rounded bg-white/40" />
              <div className="h-[2px] w-4 rounded bg-white/40" />
              <div className="h-[2px] w-3 rounded bg-white/40" />
            </div>
            {/* Logo text */}
            <span className="text-sm font-bold italic text-white">
              cogent
            </span>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] text-white/40 sm:inline">
              Sign Out
            </span>
            <div
              className="flex h-7 items-center gap-1.5 rounded-full bg-day-base-primary px-4"
              style={{
                animation: 'editor-share-glow 4s ease-in-out 6s infinite'
              }}
            >
              <span className="text-[10px] font-bold text-white">
                Share Cog
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="3.5"
                  stroke="white"
                  strokeOpacity="0.6"
                  strokeWidth="1"
                />
                <circle
                  cx="5"
                  cy="5"
                  r="1.5"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div className="border-b border-white/5 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-1 text-[9px] text-white/30 sm:text-[10px]">
            <span>Editor</span>
            <span>/</span>
            <span>Templates</span>
            <span>/</span>
            <span className="text-white/50">Product Knowledge Base</span>
            <span>/</span>
            <span className="text-white/60 underline decoration-white/20 underline-offset-2">
              How Our Platform Works
            </span>
          </div>
        </div>

        {/* ── Cards Area ── */}
        <div className="overflow-x-auto px-3 py-5 sm:px-5 sm:py-6">
          <div className="flex gap-3 sm:gap-4">
            {/* ── Card 01 — Opening Card ── */}
            <div
              className="w-[160px] shrink-0 sm:w-[200px]"
              style={{
                animation:
                  'editor-card-slide 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
              }}
            >
              <div className="flex h-[240px] flex-col items-center rounded-2xl border border-white/10 bg-night-base-02 p-4 text-center sm:h-[320px] sm:p-5">
                {/* Avatar */}
                <div
                  className="mb-2 mt-3 h-10 w-10 rounded-full bg-gradient-to-br from-day-base-primary/30 to-day-base-secondary/20 sm:h-14 sm:w-14"
                  style={{
                    animation:
                      'editor-avatar-in 0.6s ease-out 1s both'
                  }}
                />
                {/* Name */}
                <div
                  className="mb-4 h-2.5 w-16 rounded bg-white/20 sm:w-20"
                  style={{
                    animation:
                      'editor-fade-in 0.5s ease-out 1.3s both'
                  }}
                />
                {/* Title lines */}
                <div
                  className="mb-1 h-3.5 w-full rounded bg-white/15 sm:h-4"
                  style={{
                    animation:
                      'editor-fade-in 0.5s ease-out 1.5s both'
                  }}
                />
                <div
                  className="mb-1 h-3.5 w-[85%] rounded bg-white/15 sm:h-4"
                  style={{
                    animation:
                      'editor-fade-in 0.5s ease-out 1.7s both'
                  }}
                />
                <div
                  className="h-3.5 w-[70%] rounded bg-white/12 sm:h-4"
                  style={{
                    animation:
                      'editor-fade-in 0.5s ease-out 1.9s both'
                  }}
                />
                {/* QR code placeholder */}
                <div
                  className="mt-auto hidden h-12 w-12 rounded-lg border border-white/8 bg-white/5 sm:block"
                  style={{
                    animation:
                      'editor-fade-in 0.5s ease-out 2.2s both'
                  }}
                >
                  <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-px p-1.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-[1px]"
                        style={{
                          backgroundColor:
                            Math.random() > 0.4
                              ? 'rgba(255,255,255,0.15)'
                              : 'transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 02 — Video + Text Card ── */}
            <div
              className="w-[180px] shrink-0 sm:w-[220px]"
              style={{
                animation:
                  'editor-card-slide 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both'
              }}
            >
              <div className="flex h-[240px] flex-col rounded-2xl border border-white/10 bg-night-base-02 sm:h-[320px]">
                {/* Video thumbnail area */}
                <div className="relative flex h-[100px] shrink-0 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-night-base-04 to-night-base-03 sm:h-[140px]">
                  {/* Edit badge */}
                  <div
                    className="absolute right-2 top-2 flex h-5 items-center gap-1 rounded-md bg-day-base-primary px-2"
                    style={{
                      animation:
                        'editor-fade-in 0.4s ease-out 2s both'
                    }}
                  >
                    <span className="text-[7px] font-bold text-white">
                      Edit
                    </span>
                  </div>
                  {/* Play button */}
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-day-base-primary sm:h-12 sm:w-12"
                    style={{
                      animation:
                        'editor-play-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 2.2s both'
                    }}
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="white"
                    >
                      <polygon points="2,1 2,13 11,7" />
                    </svg>
                  </div>
                </div>
                {/* Card text content */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  {/* Title */}
                  <div
                    className="mb-1 h-3 w-full rounded bg-white/20"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 2.5s both'
                    }}
                  />
                  <div
                    className="mb-3 h-3 w-[80%] rounded bg-white/15"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 2.7s both'
                    }}
                  />
                  {/* Toolbar */}
                  <div
                    className="mb-2 flex gap-1.5"
                    style={{
                      animation:
                        'editor-fade-in 0.4s ease-out 3s both'
                    }}
                  >
                    {['B', 'I', 'U'].map((t) => (
                      <div
                        key={t}
                        className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-[8px] font-bold text-white/30"
                      >
                        {t}
                      </div>
                    ))}
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-white/5">
                      <div className="space-y-[2px]">
                        <div className="h-[1px] w-3 bg-white/20" />
                        <div className="h-[1px] w-3 bg-white/20" />
                        <div className="h-[1px] w-2 bg-white/20" />
                      </div>
                    </div>
                  </div>
                  {/* Body text — typing effect */}
                  <div className="space-y-1">
                    {[95, 100, 85].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded bg-white/6"
                        style={{
                          width: `${w}%`,
                          animation: `editor-type-line 0.8s ease-out ${3.3 + i * 0.4}s both`
                        }}
                      />
                    ))}
                    {/* Highlighted text */}
                    <div
                      className="mt-1 h-2 w-[75%] rounded bg-day-base-secondary/15"
                      style={{
                        animation:
                          'editor-highlight 0.6s ease-out 4.8s both'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 03 — Text Card ── */}
            <div
              className="w-[180px] shrink-0 sm:w-[220px]"
              style={{
                animation:
                  'editor-card-slide 0.9s cubic-bezier(0.16, 1, 0.3, 1) 2.5s both'
              }}
            >
              <div className="flex h-[240px] flex-col rounded-2xl border border-white/10 bg-night-base-02 sm:h-[320px]">
                {/* Image area */}
                <div className="relative flex h-[100px] shrink-0 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-night-base-03 to-night-base-04 sm:h-[140px]">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-day-base-primary/80 sm:h-12 sm:w-12"
                    style={{
                      animation:
                        'editor-play-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 3.5s both'
                    }}
                  >
                    <svg
                      width="12"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="white"
                    >
                      <polygon points="2,1 2,13 11,7" />
                    </svg>
                  </div>
                </div>
                {/* Text content */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <div
                    className="mb-1 h-3.5 w-full rounded bg-white/18"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 3.8s both'
                    }}
                  />
                  <div
                    className="mb-3 h-3.5 w-[70%] rounded bg-white/14"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 4s both'
                    }}
                  />
                  {/* Toolbar */}
                  <div
                    className="mb-2 flex gap-1.5"
                    style={{
                      animation:
                        'editor-fade-in 0.4s ease-out 4.2s both'
                    }}
                  >
                    {['B', 'I', 'U'].map((t) => (
                      <div
                        key={t}
                        className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-[8px] font-bold text-white/30"
                      >
                        {t}
                      </div>
                    ))}
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-white/5">
                      <div className="space-y-[2px]">
                        <div className="h-[1px] w-3 bg-white/20" />
                        <div className="h-[1px] w-3 bg-white/20" />
                        <div className="h-[1px] w-2 bg-white/20" />
                      </div>
                    </div>
                  </div>
                  {/* Text lines */}
                  <div className="space-y-1">
                    {[100, 90, 95, 80].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded bg-white/6"
                        style={{
                          width: `${w}%`,
                          animation: `editor-type-line 0.8s ease-out ${4.5 + i * 0.3}s both`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 04 — Checklist Card ── */}
            <div
              className="w-[180px] shrink-0 sm:w-[220px]"
              style={{
                animation:
                  'editor-card-slide 0.9s cubic-bezier(0.16, 1, 0.3, 1) 3.8s both'
              }}
            >
              <div className="flex h-[240px] flex-col rounded-2xl border border-white/10 bg-night-base-02 sm:h-[320px]">
                {/* Image area */}
                <div className="flex h-[100px] shrink-0 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-night-base-04 to-night-base-03 sm:h-[140px]">
                  {/* Small image icon */}
                  <svg
                    width="28"
                    height="22"
                    viewBox="0 0 28 22"
                    fill="none"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 4.5s both'
                    }}
                  >
                    <rect
                      x="1"
                      y="1"
                      width="26"
                      height="20"
                      rx="4"
                      stroke="white"
                      strokeOpacity="0.1"
                      strokeWidth="1"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="3"
                      fill="white"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M1 16 L8 11 L14 15 L20 9 L27 13"
                      stroke="white"
                      strokeOpacity="0.08"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                {/* Checklist content */}
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <div
                    className="mb-1 h-3.5 w-full rounded bg-white/18"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 4.8s both'
                    }}
                  />
                  <div
                    className="mb-3 h-3.5 w-[65%] rounded bg-white/12"
                    style={{
                      animation:
                        'editor-fade-in 0.5s ease-out 5s both'
                    }}
                  />
                  {/* Toolbar */}
                  <div
                    className="mb-2 flex gap-1.5"
                    style={{
                      animation:
                        'editor-fade-in 0.4s ease-out 5.2s both'
                    }}
                  >
                    {['B', 'I', 'U'].map((t) => (
                      <div
                        key={t}
                        className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-[8px] font-bold text-white/30"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  {/* Checklist items */}
                  <div className="space-y-2">
                    {[90, 80, 70].map((w, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2"
                        style={{
                          animation: `editor-check-in 0.6s ease-out ${5.5 + i * 0.5}s both`
                        }}
                      >
                        <div
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor:
                              i < 2
                                ? 'rgba(8, 233, 238, 0.25)'
                                : 'rgba(255,255,255,0.08)',
                            animation:
                              i < 2
                                ? `editor-check-fill 0.4s ease-out ${5.8 + i * 0.5}s both`
                                : 'none'
                          }}
                        >
                          {i < 2 && (
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <path
                                d="M1.5 4 L3 5.5 L6.5 2"
                                stroke="#08E9EE"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <div
                          className="h-2 rounded bg-white/8"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card Numbers Bar ── */}
        <div className="flex items-center gap-3 border-t border-white/8 px-4 py-3 sm:gap-4 sm:px-6">
          {['01', '02', '03', '04'].map((num, i) => (
            <div
              key={num}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold sm:h-8 sm:w-8"
              style={{
                backgroundColor:
                  i === 0
                    ? 'rgba(113, 1, 255, 0.3)'
                    : 'rgba(255,255,255,0.05)',
                color:
                  i === 0
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.35)',
                animation: `editor-num-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 1.2}s both`
              }}
            >
              {num}
            </div>
          ))}
          {/* Action icons in the middle */}
          <div
            className="ml-auto flex items-center gap-2"
            style={{
              animation: 'editor-fade-in 0.5s ease-out 5s both'
            }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 sm:h-8 sm:w-8">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="white"
                fillOpacity="0.3"
              >
                <polygon points="1,6 5,2 5,10" />
              </svg>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-day-base-primary/20 sm:h-8 sm:w-8">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6 2 L10 6 L6 10"
                  stroke="white"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M2 2 L6 6 L2 10"
                  stroke="white"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes editor-card-slide {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes editor-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes editor-avatar-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes editor-play-pop {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes editor-type-line {
          from {
            opacity: 0;
            width: 0%;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes editor-highlight {
          from {
            opacity: 0;
            width: 0%;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes editor-check-in {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes editor-check-fill {
          from {
            background-color: rgba(255, 255, 255, 0.08);
          }
          to {
            background-color: rgba(8, 233, 238, 0.25);
          }
        }

        @keyframes editor-num-pop {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes editor-share-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(113, 1, 255, 0);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(113, 1, 255, 0.2);
          }
        }
      `}</style>
    </div>
  )
}

export default AnimatedMockup

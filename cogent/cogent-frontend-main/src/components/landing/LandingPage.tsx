import { useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import CogDiagram from '@/components/landing/CogDiagram'

const DEMO_COG_URL = '/cogs/demo'

const steps = [
  {
    number: '01',
    title: 'Capture',
    description:
      'Any team member can create a Cog \u2014 a modular knowledge package \u2014 using text, video, images, and quizzes.'
  },
  {
    number: '02',
    title: 'Collaborate',
    description:
      'Teams co-edit and refine together. Modular blocks make it easy to reuse and remix across projects.'
  },
  {
    number: '03',
    title: 'Share',
    description:
      'Publish and distribute to your organization instantly. One click, everyone\u2019s aligned.'
  }
]

const LandingPage: React.FC = () => {
  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-night-base-01 text-white">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-night-base-01/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="h-7 w-24">
            <Logo />
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/signin"
              className="text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
            >
              Sign In
            </Link>
            <Link href="/signup">
              <span className="hidden items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white sm:inline-flex">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-10 sm:pb-40 sm:pt-44">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <div className="hero-glow-purple absolute -left-[200px] -top-[100px] h-[500px] w-[500px] rounded-full bg-day-base-primary/15 blur-[120px]" />
          <div className="hero-glow-cyan absolute left-[150px] top-[50px] h-[350px] w-[350px] rounded-full bg-day-base-secondary/10 blur-[100px]" />
        </div>

        {/* Radial gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(113,1,255,0.08),transparent)]" />

        {/* Content */}
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Floating pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-day-base-secondary animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-xs font-semibold tracking-wide text-white/60">
              Knowledge Management, Reimagined
            </span>
          </div>

          {/* Headline with gradient text */}
          <h1 className="hero-headline text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
            Your team&apos;s knowledge, captured and shared in minutes
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg sm:leading-relaxed">
            Cogent makes it easy to explain products, processes, and
            services &mdash; and share them with one click.
          </p>

          {/* CTA with glow ring */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={DEMO_COG_URL}>
              <div className="hero-cta-glow relative">
                <ButtonPrimary
                  label="Try a Demo"
                  size="large"
                  icon="chevronRight"
                />
              </div>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/35">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="text-day-base-secondary transition-colors hover:text-[#14F1F7] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

      </section>

      {/* ── How It Works ── */}
      <section className="relative px-6 py-28 sm:px-10 sm:py-36">
        {/* Gradient divider top */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-day-base-secondary"
            data-reveal
          >
            How it works
          </h2>
          <p
            className="mx-auto mb-16 max-w-lg text-center text-base text-white/40"
            data-reveal
          >
            Three steps to unlock your organization&apos;s collective knowledge
          </p>

          {/* Cards with connecting gradient bar */}
          <div className="relative">
            <div className="absolute left-[16.67%] right-[16.67%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-day-base-secondary/30 via-day-base-primary/40 to-day-base-secondary/30 sm:block" />

            <div className="relative grid gap-6 sm:grid-cols-3 sm:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-white/[0.06] bg-night-base-02/50 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.1] hover:bg-night-base-02/70 hover:shadow-[0_8px_32px_rgba(113,1,255,0.1)]"
                  data-reveal
                  data-reveal-delay={`${index + 1}`}
                >
                  {/* Glowing number */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-day-base-primary/10 text-xl font-bold text-day-base-primary transition-all duration-300 group-hover:bg-day-base-primary/20 group-hover:shadow-[0_0_20px_rgba(113,1,255,0.2)]">
                    {step.number}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Case ── */}
      <section className="relative px-6 py-28 sm:px-10 sm:py-36">
        {/* Ambient glow behind section */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-primary/[0.04] blur-[100px]" />

        <div className="mx-auto max-w-4xl" data-reveal>
          {/* Gradient border container */}
          <div className="rounded-3xl bg-gradient-to-br from-white/10 via-day-base-primary/20 to-white/5 p-px">
            <div className="rounded-3xl bg-night-base-02 p-8 sm:p-14">
              <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
                Imagine every expert could share what they know
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/55">
                A company like AWS has thousands of products. With Cogent, any
                product manager, engineer, or sales rep can build a Cog
                explaining their piece &mdash; then share it instantly. No more
                lost knowledge. No more repeated questions.
              </p>

              <div className="mt-12" data-reveal>
                <CogDiagram />
              </div>

              {/* Gradient divider line */}
              <div className="mt-10 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-day-base-secondary/20" />
                <span className="text-xs font-semibold tracking-wide text-day-base-secondary">
                  Knowledge flows freely
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-day-base-secondary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
        {/* Gradient divider top */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Background gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-day-base-primary/[0.06] to-day-base-primary/[0.03]" />

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-[200px] w-[200px] translate-x-1/2 -translate-y-1/2 rounded-full bg-day-base-secondary/[0.06] blur-[80px]" />

        <div className="relative mx-auto max-w-2xl text-center" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Ready to capture your team&apos;s knowledge?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/40">
            Join teams who are already sharing knowledge faster with Cogent.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={DEMO_COG_URL}>
              <div className="hero-cta-glow relative">
                <ButtonPrimary
                  label="Try a Demo"
                  size="large"
                  icon="chevronRight"
                />
              </div>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/35">
            or{' '}
            <Link
              href="/signup"
              className="text-day-base-secondary transition-colors hover:text-[#14F1F7] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative border-t border-white/[0.04] px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="h-5 w-16 opacity-30">
            <Logo />
          </div>
          <span className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Cogent. All rights reserved.
          </span>
        </div>
      </footer>

      {/* ── Animations ── */}
      <style jsx global>{`
        /* Scroll reveal */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        [data-reveal-delay="1"] { transition-delay: 0.12s; }
        [data-reveal-delay="2"] { transition-delay: 0.24s; }
        [data-reveal-delay="3"] { transition-delay: 0.36s; }

        /* Hero headline gradient */
        .hero-headline {
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.72) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glow orb breathing */
        .hero-glow-purple {
          animation: glow-breathe 6s ease-in-out infinite;
        }
        .hero-glow-cyan {
          animation: glow-breathe 8s ease-in-out 2s infinite;
        }
        @keyframes glow-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.18); opacity: 0.65; }
        }

        /* CTA pulsing glow ring */
        .hero-cta-glow {
          position: relative;
        }
        .hero-cta-glow::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          box-shadow: 0 0 20px 4px rgba(113, 1, 255, 0.25);
          animation: cta-pulse 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes cta-pulse {
          0%, 100% { box-shadow: 0 0 12px 2px rgba(113, 1, 255, 0.15); }
          50% { box-shadow: 0 0 28px 8px rgba(113, 1, 255, 0.35); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage

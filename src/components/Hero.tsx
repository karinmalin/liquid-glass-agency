import { motion } from 'framer-motion';
import FadingVideo from './FadingVideo';
import BlurText from './BlurText';
import { ArrowUpRight, ClockIcon, GlobeIcon, Play } from './Icons';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4';

const NAV_LINKS = ['Work', 'Studio', 'Services', 'Journal', 'Contact'];
const LOGOS = ['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'];

const fadeIn = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
});

const STATS = [
  { Icon: ClockIcon, value: '6 Weeks', label: 'Average End-to-End Launch Time' },
  { Icon: GlobeIcon, value: '140+', label: 'Brands Shipped Across Four Continents' },
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16">
          <a href="#" aria-label="Home" className="liquid-glass h-12 w-12 rounded-full flex items-center justify-center">
            <span className="font-heading italic text-2xl leading-none">a</span>
          </a>

          <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors">
                {link}
              </a>
            ))}
            <a
              href="#"
              className="ml-1 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black font-body"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="h-12 w-12" aria-hidden />
        </nav>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div {...fadeIn(0.4)} className="liquid-glass rounded-full flex items-center gap-2 p-1 pr-4">
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-black font-body">New</span>
            <span className="text-xs md:text-sm text-white/90 font-body">
              Booking Q3 2026 engagements -- limited capacity
            </span>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              text="Crafted Digital Experiences Built to Outlast Trends"
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px]"
            />
          </div>

          <motion.p
            {...fadeIn(0.8)}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            We are a small studio of designers and engineers shaping brand-defining websites for ambitious
            companies. Precise typography, cinematic motion, and code you can be proud of.
          </motion.p>

          <motion.div {...fadeIn(1.1)} className="mt-6 flex items-center gap-6">
            <a href="#" className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium font-body">
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium font-body text-white/90 hover:text-white transition-colors">
              <Play className="h-3.5 w-3.5" />
              Watch Showreel
            </a>
          </motion.div>

          <motion.div {...fadeIn(1.3)} className="mt-8 flex flex-wrap justify-center gap-4">
            {STATS.map(({ Icon, value, label }) => (
              <div key={value} className="liquid-glass p-5 w-[220px] rounded-[1.25rem] text-left">
                <Icon className="h-6 w-6 text-white/90" />
                <div className="text-4xl font-heading italic tracking-[-1px] leading-none mt-4">{value}</div>
                <div className="mt-2 text-xs text-white/80 font-body leading-snug">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div {...fadeIn(1.4)} className="flex flex-col items-center gap-4 pb-8 px-4">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs text-white/80 font-body text-center">
            Trusted by founders, operators, and creative directors worldwide
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {LOGOS.map((logo) => (
              <span key={logo} className="font-heading italic text-2xl md:text-3xl tracking-tight text-white/90">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

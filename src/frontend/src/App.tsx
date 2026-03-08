import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  Award,
  CheckCircle,
  ChevronDown,
  Clock,
  Fence,
  Hammer,
  Heart,
  Leaf,
  Link as LinkIcon,
  Loader2,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Review {
  name: string;
  location: string;
  text: string;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PHONE = "1-800-674-3264";
const PHONE_HREF = "tel:+18006743264";

const SERVICES: ServiceCard[] = [
  {
    icon: <Hammer className="w-8 h-8" />,
    title: "Wood Privacy Fence",
    description:
      "Classic cedar and pine privacy fences that deliver lasting beauty and security. Ideal for backyard enclosures and property boundaries.",
  },
  {
    icon: <Fence className="w-8 h-8" />,
    title: "Vinyl Fence",
    description:
      "Low-maintenance, weather-resistant vinyl fencing in a variety of styles. Never needs painting and stands up to decades of wear.",
  },
  {
    icon: <LinkIcon className="w-8 h-8" />,
    title: "Chain Link Fence",
    description:
      "Durable and affordable chain link solutions for residential and commercial properties. Available in galvanized and vinyl-coated finishes.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Wrought Iron Fence",
    description:
      "Elegant wrought iron fencing that adds timeless curb appeal. Custom ornamental designs built to stand strong for generations.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Custom Fence",
    description:
      "Have a unique vision? We'll install the fence of your choice. Bring us your design and we'll bring it to life with expert craftsmanship.",
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: "Fence Removal",
    description:
      "Quick and thorough fence removal services. We haul away all materials, leaving your property clean and ready for a fresh installation.",
  },
];

const REVIEWS: Review[] = [
  {
    name: "Marcus T.",
    location: "Homeowner, Austin TX",
    text: "Google Lawn Gurus did an absolutely outstanding job on our 6-foot cedar privacy fence. The posts are set 3 feet deep in concrete — you can feel how solid this fence is. They were on time, professional, and cleaned up after themselves. This is the company you call!",
    date: "January 2026",
  },
  {
    name: "Sandra R.",
    location: "Property Manager, Dallas TX",
    text: "I've hired several fencing companies over the years, and none come close to the quality and service from Google Lawn Gurus. Their concrete post setting method is clearly the right way to do it — two years later, my fence looks just as perfect as the day it was installed.",
    date: "February 2026",
  },
  {
    name: "James & Patty H.",
    location: "Residential Homeowners",
    text: "From the initial consultation to the final walkthrough, every step was seamless. They helped us choose the right vinyl fence for our yard and even suggested a gate configuration we hadn't thought of. Truly professional from start to finish.",
    date: "December 2025",
  },
  {
    name: "Kevin L.",
    location: "Contractor, San Antonio TX",
    text: "I recommend Google Lawn Gurus to all my clients. Their wrought iron work is stunning and the build quality is second to none. Customers always ask who installed it, and I'm proud to send referrals their way every single time.",
    date: "March 2026",
  },
  {
    name: "Donna M.",
    location: "Homeowner",
    text: "Had them remove an old chain link fence and install a brand-new wood privacy fence. They removed the old one in hours and had the new fence up in one day. The team was friendly, fast, and the price was fair. I'd give them 10 stars if I could!",
    date: "November 2025",
  },
];

// ─── Scroll Utility ───────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Star Rating Component ────────────────────────────────────────────────────
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <Star key={n} className="w-4 h-4 fill-amber-brand text-amber-brand" />
      ))}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "About Us", id: "about" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-green-deep shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-brand rounded-full p-1.5">
            <Leaf className="w-5 h-5 text-green-deep" />
          </div>
          <span className="font-display text-xl font-bold text-white leading-tight">
            Google Lawn Gurus
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              type="button"
              data-ocid={`nav.link.${i + 1}`}
              onClick={() => scrollTo(link.id)}
              className="text-green-light hover:text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href={PHONE_HREF}
            data-ocid="nav.call_button"
            className="flex items-center gap-2 bg-amber-brand hover:bg-amber-brand-dark text-green-deep font-bold px-4 py-2 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-green-deep border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  type="button"
                  data-ocid={`nav.link.${i + 1}`}
                  onClick={() => {
                    scrollTo(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-left text-green-light hover:text-white font-semibold py-2 border-b border-white/10 last:border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={PHONE_HREF}
                data-ocid="nav.call_button"
                className="flex items-center justify-center gap-2 bg-amber-brand text-green-deep font-bold py-3 rounded-full mt-2"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Now: {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16"
      style={{
        backgroundImage: "url('/assets/generated/hero-fence.dim_1200x600.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-brand/20 border border-amber-brand/40 text-amber-brand px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Award className="w-4 h-4" />
            Professional Fencing Services
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
            Google Lawn Gurus
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-green-light mb-6">
            Professional Fencing Installation &amp; Removal
          </p>

          <p className="max-w-2xl mx-auto text-white/85 text-lg mb-10 leading-relaxed">
            We offer professional fencing installation and removal services.
            Choose from our options or let us install a fence of your choice.
            All fence posts are set{" "}
            <span className="text-amber-brand font-bold">
              3 feet deep in concrete
            </span>{" "}
            for a strong fence that lasts for years to come. Look us up or
            message us — we're happy to help you find exactly what you're
            looking for.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PHONE_HREF}
              data-ocid="hero.primary_button"
              className="inline-flex items-center justify-center gap-3 bg-amber-brand hover:bg-amber-brand-dark text-green-deep font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call Us Now: {PHONE}
            </a>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-deep font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 active:scale-95"
            >
              Get a Free Quote
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            {
              icon: <Award className="w-6 h-6" />,
              value: "500+",
              label: "Projects Completed",
            },
            {
              icon: <Star className="w-6 h-6" />,
              value: "5★",
              label: "Average Rating",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              value: "3ft",
              label: "Deep Concrete Posts",
            },
            {
              icon: <Clock className="w-6 h-6" />,
              value: "10+",
              label: "Years Experience",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            >
              <div className="text-amber-brand mb-1 flex justify-center">
                {stat.icon}
              </div>
              <div className="font-display text-2xl font-bold">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-mid font-bold text-sm uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-charcoal mb-4">
            Our Fencing Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From classic wood to elegant wrought iron, we install fences that
            stand the test of time — all posts set{" "}
            <strong className="text-green-mid">3 feet deep in concrete</strong>{" "}
            for lasting strength.
          </p>
        </motion.div>

        {/* Services image banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden mb-14 max-w-4xl mx-auto shadow-xl"
        >
          <img
            src="/assets/generated/fence-types.dim_900x500.jpg"
            alt="Various fence types we install"
            className="w-full h-64 md:h-80 object-cover"
          />
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              data-ocid={`services.card.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border-border hover:border-green-mid hover:shadow-lg transition-all group cursor-default">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-green-mid mb-4 group-hover:bg-green-mid group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-green-mid text-xs font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Posts set 3ft deep in concrete
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="section-alt py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/generated/about-team.dim_800x500.jpg"
                alt="The Google Lawn Gurus team"
                className="w-full h-72 md:h-96 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 md:-right-8 bg-amber-brand text-green-deep rounded-2xl p-4 shadow-xl">
              <div className="font-display text-3xl font-extrabold leading-none">
                10+
              </div>
              <div className="text-xs font-bold mt-0.5">Years of</div>
              <div className="text-xs font-bold">Experience</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-green-light font-bold text-sm uppercase tracking-widest mb-3">
              Who We Are
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              About Google Lawn Gurus
            </h2>

            <p className="text-white/85 text-lg mb-5 leading-relaxed">
              We're a dedicated team of professional fencing specialists with a
              passion for quality craftsmanship. From the moment you contact us
              to the final inspection, we're committed to delivering a fence
              that exceeds your expectations and stands strong for decades.
            </p>

            <p className="text-white/85 text-base mb-6 leading-relaxed">
              Every fence we build starts with a solid foundation — literally.
              All our fence posts are set{" "}
              <strong className="text-amber-brand">
                3 feet deep in concrete
              </strong>
              , ensuring the structural integrity that separates a good fence
              from a great one. Whether you're looking for wood, vinyl, chain
              link, wrought iron, or a completely custom design, we have the
              experience and expertise to make it happen.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <MapPin className="w-4 h-4" />,
                  text: "Local & Trusted",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  text: "Licensed & Insured",
                },
                {
                  icon: <Award className="w-4 h-4" />,
                  text: "Quality Guaranteed",
                },
                {
                  icon: <Heart className="w-4 h-4" />,
                  text: "Customer-First Service",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-white/90 font-semibold text-sm"
                >
                  <span className="text-amber-brand">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <button
              type="button"
              data-ocid="about.secondary_button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 bg-amber-brand hover:bg-amber-brand-dark text-green-deep font-bold px-7 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Message Us Today
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-mid font-bold text-sm uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-charcoal mb-4">
            What Our Customers Say
          </h2>
          <div className="flex justify-center items-center gap-2 text-muted-foreground">
            <StarRating />
            <span className="font-semibold text-green-mid">5.0 / 5.0</span>
            <span className="text-sm">— Based on 200+ reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              data-ocid={`reviews.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="h-full border-border hover:border-green-mid transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <StarRating />
                  <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-5 flex-1 italic">
                    "{review.text}"
                  </p>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-charcoal">
                        {review.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {review.location}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      contactInfo: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Service not available. Please try again.");
      return actor.submitContactForm(data.name, data.contactInfo, data.message);
    },
    onSuccess: () => {
      setName("");
      setContactInfo("");
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) return;
    mutation.mutate({
      name: name.trim(),
      contactInfo: contactInfo.trim(),
      message: message.trim(),
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-mid font-bold text-sm uppercase tracking-widest mb-3">
            Reach Out
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-charcoal mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ready for a new fence? Have questions? We're here to help. Call us
            directly or send us a message below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Call CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-charcoal mb-3">
                Call Us Directly
              </h3>
              <p className="text-muted-foreground mb-5">
                The fastest way to get an answer. We're available Mon–Sat,
                7am–6pm. We'll be happy to discuss your project, answer
                questions, and set up a free estimate.
              </p>
              <a
                href={PHONE_HREF}
                data-ocid="contact.call_button"
                className="inline-flex items-center gap-3 bg-green-mid hover:bg-green-deep text-white font-bold px-8 py-4 rounded-full text-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Call Us: {PHONE}
              </a>
            </div>

            <div className="bg-secondary rounded-2xl p-6 border border-border">
              <h4 className="font-display font-bold text-charcoal mb-3">
                Why Google Lawn Gurus?
              </h4>
              <ul className="space-y-2">
                {[
                  "Free estimates — no obligation",
                  "Posts set 3 feet deep in concrete",
                  "Licensed, bonded & insured",
                  "Residential & commercial projects",
                  "Same-day response to inquiries",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-green-mid flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Send Us a Message
                </h3>

                <AnimatePresence mode="wait">
                  {mutation.isSuccess ? (
                    <motion.div
                      key="success"
                      data-ocid="contact.success_state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-8 gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-mid/10 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-mid" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-bold text-charcoal mb-1">
                          Message Sent!
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Thanks for reaching out! We'll get back to you as soon
                          as possible — usually within a few hours during
                          business days.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => mutation.reset()}
                        className="text-green-mid text-sm font-semibold underline underline-offset-2 hover:text-green-deep"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-foreground mb-1.5 block"
                        >
                          Your Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          data-ocid="contact.name.input"
                          placeholder="John Smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="border-border focus:border-green-mid"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-info"
                          className="text-sm font-semibold text-foreground mb-1.5 block"
                        >
                          Phone or Email{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="contact-info"
                          data-ocid="contact.contact_info.input"
                          placeholder="(555) 000-0000 or you@email.com"
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          required
                          className="border-border focus:border-green-mid"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="text-sm font-semibold text-foreground mb-1.5 block"
                        >
                          Message <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          id="message"
                          data-ocid="contact.message.textarea"
                          placeholder="Tell us about your project — fence type, property size, any special requests..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          className="border-border focus:border-green-mid resize-none"
                        />
                      </div>

                      {mutation.isError && (
                        <div
                          data-ocid="contact.error_state"
                          className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg px-4 py-3"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {mutation.error instanceof Error
                            ? mutation.error.message
                            : "Something went wrong. Please try again or call us directly."}
                        </div>
                      )}

                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={
                          mutation.isPending ||
                          !name.trim() ||
                          !contactInfo.trim() ||
                          !message.trim()
                        }
                        className="w-full bg-green-mid hover:bg-green-deep text-white font-bold py-3 rounded-full text-base transition-all"
                      >
                        {mutation.isPending ? (
                          <span
                            data-ocid="contact.loading_state"
                            className="flex items-center gap-2"
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-green-deep text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-brand rounded-full p-1.5">
                <Leaf className="w-4 h-4 text-green-deep" />
              </div>
              <span className="font-display text-xl font-bold">
                Google Lawn Gurus
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Professional fencing installation and removal services. All posts
              set 3 feet deep in concrete for lasting strength.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-3 text-amber-brand">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["services", "about", "reviews", "contact"].map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-white/70 hover:text-white text-sm capitalize transition-colors cursor-pointer"
                  >
                    {id === "about"
                      ? "About Us"
                      : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-bold mb-3 text-amber-brand">
              Contact
            </h4>
            <div className="space-y-2">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-brand" />
                {PHONE}
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock className="w-4 h-4 text-amber-brand" />
                Mon–Sat 7:00am – 6:00pm
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-xs">
          <p>© {year} Google Lawn Gurus. All rights reserved.</p>
          <p>
            Built with <Heart className="w-3 h-3 inline text-amber-brand" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-brand hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

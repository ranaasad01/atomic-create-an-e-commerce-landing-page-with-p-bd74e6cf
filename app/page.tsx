"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Clock, Lock, Check, Heart, Plus, Star, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

type ProductItem = { name: string; price: string; category: string; image: string };
type CategoryItem = { name: string; count: string; image: string };
type ValuePropItem = { title: string; description: string };
type TestimonialItem = { name: string; role: string; quote: string; rating: number };

const VALUE_PROP_ICONS = [Clock, Lock, Check, Heart];

const PRODUCT_IMAGES = [
  "/images/linen-weave-throw-blanket-sofa.jpg",
  "/images/ceramic-pour-over-coffee-set.jpg",
  "/images/handwoven-seagrass-storage-basket.jpg",
  "/images/amber-soy-wax-candle-jar.jpg",
  "/images/organic-cotton-bath-towels-folded.jpg",
  "/images/oak-wood-serving-board-cheese.jpg",
];

const CATEGORY_IMAGES = [
  "/images/folded-linen-throw-blankets-stack.jpg",
  "/images/ceramic-kitchenware-on-wood-counter.jpg",
  "/images/handwoven-seagrass-storage-baskets.jpg",
  "/images/amber-soy-candles-on-wood-shelf.jpg",
];

const heroImageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  const t = useTranslations();

  const products = (
    Array.isArray(t.raw("products.items")) ? t.raw("products.items") : []
  ) as ProductItem[];
  const categories = (
    Array.isArray(t.raw("categories.items")) ? t.raw("categories.items") : []
  ) as CategoryItem[];
  const valueProps = (
    Array.isArray(t.raw("valueProps.items")) ? t.raw("valueProps.items") : []
  ) as ValuePropItem[];
  const testimonials = (
    Array.isArray(t.raw("testimonials.items")) ? t.raw("testimonials.items") : []
  ) as TestimonialItem[];

  const filterOptions = useMemo(
    () => [t("products.filterAll"), ...new Set(products.map((p) => p.category))],
    [products, t],
  );
  const [activeFilter, setActiveFilter] = useState<string>(t("products.filterAll"));
  const filteredProducts = useMemo(
    () =>
      activeFilter === t("products.filterAll")
        ? products
        : products.filter((p) => p.category === activeFilter),
    [activeFilter, products, t],
  );

  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const handleAddToCart = (index: number) => {
    setAddedIndex(index);
    window.setTimeout(() => setAddedIndex((current) => (current === index ? null : current)), 1600);
  };

  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setEmail("");
  };

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                {t("hero.badge")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-display font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {t("hero.titleLead")} <span className="text-gradient">{t("hero.titleAccent")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="#products" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {t("hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="#categories" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <motion.div variants={heroImageReveal} initial="hidden" animate="visible" className="glass-strong relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-glow">
              <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/bd74e6cf-80a3-40e3-a43a-078ec2beb961/4ff2af9c9de04b97b3010d2f68b993ac.png?v=1791965053267" alt={t("hero.imageAlt")} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* Value props */}
      <Reveal>
        <section id="why-us" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {t("valueProps.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
              {t("valueProps.title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("valueProps.subtitle")}
            </p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((item, i) => {
              const Icon = VALUE_PROP_ICONS[i % VALUE_PROP_ICONS.length];
              return (
                <motion.div key={i} variants={fadeInUp} className="surface-elevated rounded-xl border border-border bg-card p-6 transition-all duration-300 ease-out">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </Reveal>
      {/* Categories */}
      <Reveal>
        <section id="categories" className="bg-secondary/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  {t("categories.eyebrow")}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
                  {t("categories.title")}
                </h2>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                  {t("categories.subtitle")}
                </p>
              </div>
              <Link href="#products" className="hidden shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground sm:inline-flex">
                {t("categories.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Link href="#products" onClick={() => setActiveFilter(cat.name)} className="group block overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <img src={CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{cat.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{cat.count}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* Products */}
      <Reveal>
        <section id="products" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {t("products.eyebrow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
              {t("products.title")}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {t("products.subtitle")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {filterOptions.map((option) => (<button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                activeFilter === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}>
              {option}
            </button>))}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <motion.div key={`${product.name}-${i}`} variants={fadeInUp} className="surface-elevated group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 ease-out">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {product.category}
                      </p>
                      <h3 className="mt-1 font-semibold">{product.name}</h3>
                    </div>
                    <span className="shrink-0 font-display text-lg font-semibold text-foreground">
                      {product.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(i)}
                    className={cn(
                      "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      addedIndex === i
                        ? "bg-secondary text-foreground"
                        : "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-lg",
                    )}>
                    {addedIndex === i ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        {t("products.added")}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        {t("products.addToCart")}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>
      {/* Testimonials */}
      <Reveal>
        <section id="testimonials" className="bg-mesh py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {t("testimonials.eyebrow")}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight sm:text-4xl">
                {t("testimonials.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {t("testimonials.subtitle")}
              </p>
            </div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {testimonials.map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="glass-strong rounded-xl p-6 shadow-glow">
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-4 w-4",
                          s < item.rating ? "fill-primary text-primary" : "text-muted-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-pretty leading-relaxed text-foreground">{item.quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                      {item.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* Newsletter */}
      <Reveal>
        <section id="newsletter" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-6 py-14 text-center shadow-glow sm:px-16">
            <Mail className="mx-auto h-10 w-10 text-primary-foreground" aria-hidden="true" />
            <h2 className="mt-5 text-balance text-3xl font-display font-semibold tracking-tight text-primary-foreground sm:text-4xl">
              {t("newsletter.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              {t("newsletter.subtitle")}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletter.emailLabel")}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (newsletterStatus !== "idle") setNewsletterStatus("idle");
                }}
                placeholder={t("newsletter.placeholder")}
                className="w-full flex-1 rounded-lg border border-transparent bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                {t("newsletter.submit")}
              </button>
            </form>
            <div aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm font-medium">
              {newsletterStatus === "success" && (
                <span className="text-primary-foreground">{t("newsletter.success")}</span>
              )}
              {newsletterStatus === "error" && (
                <span className="text-primary-foreground">{t("newsletter.error")}</span>
              )}
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {BRAND.name} &middot; {BRAND.tagline}
          </p>
        </section>
      </Reveal>
    </main>
  );
}
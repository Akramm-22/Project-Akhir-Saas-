"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
        >
          Build Your Community,
          <br />
          <span className="text-slate-600">Share Your Story</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 md:text-xl"
        >
          Kurasi cerita komunitas modern, toolkit praktis, dan program
          kolaboratif untuk builder muslim.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="#articles">
              Explore Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-1/2 -top-1/2 h-[500px] w-[500px] rounded-full bg-slate-100/50 blur-3xl" />
        <div className="absolute -right-1/2 -bottom-1/2 h-[500px] w-[500px] rounded-full bg-slate-100/50 blur-3xl" />
      </div>
    </section>
  );
}

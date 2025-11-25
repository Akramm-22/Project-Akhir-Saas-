"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/lib/api";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await subscribeNewsletter({ email, name });

    if (response.success) {
      setStatus("success");
      setMessage(response.data?.message || "Successfully subscribed!");
      setEmail("");
      setName("");
    } else {
      setStatus("error");
      setMessage(response.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="newsletter" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm md:p-12"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex rounded-full bg-slate-100 p-3">
            <Mail className="h-6 w-6 text-slate-900" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Stay Updated
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Subscribe to our newsletter and get the latest articles, community
            updates, and resources delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              />
              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center justify-center gap-2 rounded-lg p-3 text-sm ${
                  status === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status === "success" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <span>{message}</span>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}

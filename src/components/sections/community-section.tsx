"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Share2 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Active Community",
    description:
      "Join thousands of builders sharing knowledge and experiences.",
  },
  {
    icon: MessageSquare,
    title: "Engage & Discuss",
    description:
      "Participate in meaningful conversations and get feedback on your projects.",
  },
  {
    icon: Heart,
    title: "Support Each Other",
    description:
      "A supportive environment where everyone helps each other grow.",
  },
  {
    icon: Share2,
    title: "Share Resources",
    description:
      "Access and share tools, templates, and resources with the community.",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Join Our Community
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Connect with like-minded builders, share your journey, and grow
          together in a supportive environment.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
                <Icon className="h-6 w-6 text-slate-900" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

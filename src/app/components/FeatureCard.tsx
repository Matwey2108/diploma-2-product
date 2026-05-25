import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)] hover:border-[var(--chat-primary)] transition-all hover:shadow-lg"
      style={{ boxShadow: "var(--chat-shadow)" }}
    >
      <div className="w-12 h-12 bg-[var(--chat-primary-light)] rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[var(--chat-primary)]" />
      </div>
      <h3 className="font-semibold text-[var(--chat-gray-900)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--chat-gray-600)] leading-relaxed">{description}</p>
    </motion.div>
  );
}

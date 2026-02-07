import { motion } from "motion/react";
import { Users, Sparkles, Trophy, Globe } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Mages", value: "10,000+", color: "text-primary" },
  { icon: Sparkles, label: "Spells Cast", value: "1M+", color: "text-accent" },
  { icon: Trophy, label: "Quests Completed", value: "50,000+", color: "text-blue-400" },
  { icon: Globe, label: "Magical Realms", value: "12", color: "text-pink-400" },
];

export function MagicalStats() {
  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Join the Magic
          </h2>
          <p className="text-muted-foreground text-lg">
            Be part of a thriving community of powerful mages
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex mb-4"
              >
                <div className={`p-4 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 ${stat.color}`}>
                  <stat.icon className="size-8" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              >
                <div className="text-3xl md:text-4xl mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

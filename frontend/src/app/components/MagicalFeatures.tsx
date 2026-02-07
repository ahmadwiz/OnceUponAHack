import { motion } from "motion/react";
import { Sparkles, BookOpen, Flame, Shield, Zap, Moon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Ancient Spells",
    description: "Master powerful incantations from forgotten grimoires and lost civilizations.",
    gradient: "from-primary to-secondary",
    image: "https://images.unsplash.com/photo-1547931587-2841fef9d915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwc3BlbGxib29rJTIwbWFnaWN8ZW58MXx8fHwxNzcwNDczNTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Flame,
    title: "Mystical Potions",
    description: "Brew elixirs and concoctions with ingredients from the magical realm.",
    gradient: "from-accent to-orange-500",
    image: "https://images.unsplash.com/photo-1761518243486-2c5bf5043de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHBvdGlvbiUyMGJvdHRsZXMlMjBnbG93aW5nfGVufDF8fHx8MTc3MDQ3MzUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: Shield,
    title: "Protective Wards",
    description: "Create magical barriers and shields to protect against dark forces.",
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1763957047074-b47c2c76a320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWFnaWNhbCUyMGZvcmVzdCUyMGV0aGVyZWFsfGVufDF8fHx8MTc3MDQ3MzUwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const secondaryFeatures = [
  { icon: BookOpen, title: "Spell Codex", description: "Access to 500+ spells" },
  { icon: Zap, title: "Instant Casting", description: "Quick spell deployment" },
  { icon: Moon, title: "Lunar Power", description: "Moon phase bonuses" },
];

export function MagicalFeatures() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Magical Abilities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Harness the power of the arcane and become the mage you were destined to be
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-40 group-hover:opacity-50 transition-opacity`} />
                </div>
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                    <feature.icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {secondaryFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.05 }}
              className="flex items-start gap-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="p-2 rounded-lg bg-primary/20">
                <feature.icon className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

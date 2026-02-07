import { motion } from "motion/react";
import { Sparkles, Wand2, Star } from "lucide-react";
import { Button } from "./ui/button";

export function MagicalHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1756443110105-3badce171bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZmFudGFzeSUyMGNhc3RsZSUyMG5pZ2h0fGVufDF8fHx8MTc3MDQ3MzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm"
        >
          <Sparkles className="size-4 text-accent" />
          <span className="text-sm text-muted-foreground">Welcome to the Mystic Realm</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-[gradient_6s_ease-in-out_infinite]"
          style={{
            backgroundSize: "200% auto",
          }}
        >
          Unleash Your Magic
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Discover ancient spells, brew powerful potions, and embark on legendary quests
          in a realm where magic knows no bounds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(155,77,255,0.5)] hover:shadow-[0_0_30px_rgba(155,77,255,0.7)] transition-all"
          >
            <Wand2 className="mr-2 size-5" />
            Begin Your Journey
          </Button>
          <Button 
            variant="outline" 
            className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
          >
            <Star className="mr-2 size-5" />
            Explore Spells
          </Button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 text-accent"
        >
          <Sparkles className="size-8 opacity-50" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 right-16 text-primary"
        >
          <Star className="size-6 opacity-40" />
        </motion.div>
      </div>
    </div>
  );
}

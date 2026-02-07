import { motion } from "motion/react";
import { Sparkles, Book, Scroll, Crown, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function MagicalNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Book, label: "Grimoire", href: "#" },
    { icon: Scroll, label: "Quests", href: "#" },
    { icon: Crown, label: "Artifacts", href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-xl">Mystic Realm</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="size-4" />
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-[0_0_15px_rgba(155,77,255,0.4)]">
              Enter Portal
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-primary/20"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="size-4" />
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Enter Portal
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

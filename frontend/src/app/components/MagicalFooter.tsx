import { Sparkles, Github, Twitter, MessageCircle } from "lucide-react";

export function MagicalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="text-xl">Mystic Realm</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Where magic meets imagination. Embark on epic quests and master the arcane arts
              in a world of endless possibilities.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <Github className="size-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <MessageCircle className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Spells
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Quests
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/20 text-center text-muted-foreground">
          <p>&copy; {currentYear} Mystic Realm. All magical rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

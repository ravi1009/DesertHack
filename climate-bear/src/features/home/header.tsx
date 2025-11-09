import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ClimateBear } from "~/components/climate-bear";

export const Header = () => {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <ClimateBear width={56} height={56} />
          <div className="text-foreground text-xl font-bold">
            climate <span className="text-primary">bear</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground px-2 text-sm transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-foreground px-2 text-sm transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-muted-foreground hover:text-foreground px-2 text-sm transition-colors"
          >
            Docs
          </Link>
          <Link
            href="#company"
            className="text-muted-foreground hover:text-foreground px-2 text-sm transition-colors"
          >
            Company
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            View Live Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

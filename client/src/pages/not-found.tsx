import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-6">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground" data-testid="heading-404">
          404
        </h1>
        <p className="text-xl text-muted-foreground" data-testid="text-not-found">
          Page not found
        </p>
        <Link href="/" data-testid="link-home">
          <Button size="lg" data-testid="button-home">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

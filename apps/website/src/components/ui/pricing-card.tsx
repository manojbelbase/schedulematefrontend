import { Check } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { cn } from "@ui/lib/utils";

type PricingCardProps = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-col border-border/50",
        highlighted && "border-primary shadow-lg scale-[1.02]",
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground text-sm"> / {period}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant={highlighted ? "default" : "outline"}
          className="w-full"
          size="lg"
        >
          <a href={cta.href}>{cta.label}</a>
        </Button>
      </CardFooter>
    </Card>
  );
}

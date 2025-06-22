import { Calculator } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CalculatorCalloutProps {
  title: string;
  description: string;
}

export function CalculatorCallout({ title, description }: CalculatorCalloutProps) {
  return (
    <Alert className="bg-accent/20 border-accent/50">
      <Calculator className="h-4 w-4" />
      <AlertTitle className="font-headline text-accent-foreground/90">{title}</AlertTitle>
      <AlertDescription className="text-accent-foreground/80">
        {description}
      </AlertDescription>
    </Alert>
  );
}

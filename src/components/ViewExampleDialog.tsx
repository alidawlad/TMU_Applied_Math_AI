"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Problem } from "@/lib/types";
import { MathRenderer } from "./MathRenderer";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface ViewExampleDialogProps {
  exampleProblem: Problem;
}

export function ViewExampleDialog({ exampleProblem }: ViewExampleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto">View an example</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Example: <MathRenderer text={exampleProblem.title} />
          </DialogTitle>
          <DialogDescription>
            <MathRenderer text={exampleProblem.description} />
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
            <div className="space-y-6 py-4">
            {exampleProblem.steps.map((step, index) => (
                <div key={step.id}>
                <Separator className="mb-6" />
                <div className="space-y-2">
                    <h3 className="font-headline text-lg font-semibold">
                    Step {index + 1}: <MathRenderer text={step.title} />
                    </h3>
                    <p className="text-muted-foreground">
                    <MathRenderer text={step.description} />
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mt-2">
                        <p className="text-sm font-semibold text-primary/90">Solution:</p>
                        <div className="text-lg text-primary">
                            <MathRenderer text={`$${step.solution}$`} />
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

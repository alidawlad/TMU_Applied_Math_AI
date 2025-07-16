"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MathRenderer } from "@/components/MathRenderer";
import { BookOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Problem, Example } from "@/lib/types";

interface ExampleViewerProps {
  problem: Problem;
  examples?: Example[];
  className?: string;
  isMobile?: boolean;
}

// Sample examples for demonstration (in real app, these would come from the examples prop)
const getSampleExamples = (skill: string) => {
  const examples: Record<string, any[]> = {
    "Arithmetic Operations": [
      {
        id: "example-1",
        title: "Order of Operations Example",
        content: "Let's solve: $5 + 3 \\times 2$",
        steps: [
          "First, perform multiplication: $3 \\times 2 = 6$",
          "Then, perform addition: $5 + 6 = 11$",
          "Final answer: $11$"
        ]
      }
    ],
    "Function Analysis": [
      {
        id: "example-2",
        title: "Inverse Functions Example",
        content: "How to identify inverse functions",
        steps: [
          "Two functions are inverses if $f(g(x)) = x$ and $g(f(x)) = x$",
          "Graphically, inverse functions are reflections across $y = x$",
          "Example: $f(x) = e^x$ and $g(x) = \\ln(x)$ are inverses"
        ]
      }
    ],
    "Algebraic Manipulation": [
      {
        id: "example-3",
        title: "Quadratic Formula Example",
        content: "Solving $x^2 - 5x + 6 = 0$",
        steps: [
          "Identify: $a = 1$, $b = -5$, $c = 6$",
          "Apply formula: $x = \\frac{-(-5) \\pm \\sqrt{(-5)^2 - 4(1)(6)}}{2(1)}$",
          "Simplify: $x = \\frac{5 \\pm \\sqrt{25 - 24}}{2} = \\frac{5 \\pm 1}{2}$",
          "Solutions: $x = 3$ or $x = 2$"
        ]
      }
    ]
  };
  
  return examples[skill] || [];
};

export function ExampleViewer({ problem, examples, className, isMobile = false }: ExampleViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get examples for this problem's skill
  const relevantExamples = examples || getSampleExamples(problem.skill || "");
  
  if (relevantExamples.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className={cn(
            "flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700",
            "fixed bottom-4 left-4 z-50 shadow-lg",
            isMobile && "bottom-20 left-2 text-xs px-2 py-1",
            className
          )}
        >
          <BookOpen className={cn("h-4 w-4", isMobile && "h-3 w-3")} />
          <span>View an example</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className={cn(
        "max-w-4xl max-h-[80vh] overflow-y-auto",
        isMobile && "max-w-[95vw] max-h-[90vh]"
      )}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Examples for {problem.skill || "This Topic"}
          </DialogTitle>
        </DialogHeader>
        
        <div className={cn("space-y-4", isMobile && "space-y-3")}>
          {relevantExamples.map((example, index) => (
            <Card key={example.id} className="border-blue-200">
              <CardHeader className={cn("pb-3", isMobile && "pb-2")}>
                <CardTitle className={cn(
                  "text-lg text-blue-800",
                  isMobile && "text-base"
                )}>
                  Example {index + 1}: {example.title}
                </CardTitle>
              </CardHeader>
              <CardContent className={cn("space-y-3", isMobile && "space-y-2")}>
                {example.content && (
                  <div className={cn(
                    "bg-blue-50 p-4 rounded-lg",
                    isMobile && "p-3"
                  )}>
                    <MathRenderer 
                      text={example.content}
                      className={cn(
                        "text-blue-900 font-medium",
                        isMobile && "text-sm"
                      )}
                    />
                  </div>
                )}
                
                {example.steps && (
                  <div className="space-y-2">
                    <h4 className={cn(
                      "font-semibold text-gray-700",
                      isMobile && "text-sm"
                    )}>
                      Step-by-step solution:
                    </h4>
                    <ol className={cn(
                      "list-decimal list-inside space-y-2 ml-2",
                      isMobile && "space-y-1"
                    )}>
                      {example.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex} className={cn(
                          "text-gray-600",
                          isMobile && "text-sm"
                        )}>
                          <MathRenderer 
                            text={step}
                            className="inline ml-2"
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {/* Helpful tip */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className={cn("p-4", isMobile && "p-3")}>
              <div className="flex items-start gap-2">
                <div className="text-green-600">💡</div>
                <div>
                  <h4 className={cn(
                    "font-semibold text-green-800 mb-1",
                    isMobile && "text-sm"
                  )}>
                    Tip
                  </h4>
                  <p className={cn(
                    "text-green-700",
                    isMobile && "text-sm"
                  )}>
                    Use these examples as a guide for solving similar problems. 
                    Follow the same step-by-step approach for your current question.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
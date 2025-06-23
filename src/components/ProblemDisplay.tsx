"use client";

import { useState, useMemo, useEffect } from "react";
import type { Module, Problem, Step } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathInput } from "@/components/MathInput";
import { checkAnswerAction, getFeedbackAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { CalculatorCallout } from "./CalculatorCallout";
import { MathRenderer } from "./MathRenderer";
import { Separator } from "@/components/ui/separator";
import { ViewExampleDialog } from "./ViewExampleDialog";
import { lectures } from "@/lib/data";

type StepStatus = "unanswered" | "correct" | "incorrect";

interface ProblemDisplayProps {
  module: Module;
  problem: Problem;
}

export function ProblemDisplay({ module, problem }: ProblemDisplayProps) {
  const { toast } = useToast();

  const [stepInputs, setStepInputs] = useState<Record<string, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, string>>({});
  const [stepCorrectiveFeedback, setStepCorrectiveFeedback] = useState<Record<string, string>>({});
  const [stepHints, setStepHints] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedInputs = localStorage.getItem('fm-stepInputs');
      const savedStatuses = localStorage.getItem('fm-stepStatuses');
      if (savedInputs) setStepInputs(JSON.parse(savedInputs));
      if (savedStatuses) setStepStatuses(JSON.parse(savedStatuses));
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fm-stepInputs', JSON.stringify(stepInputs));
    } catch (error) {
      console.error("Failed to save inputs to localStorage", error);
    }
  }, [stepInputs]);

  useEffect(() => {
    try {
      localStorage.setItem('fm-stepStatuses', JSON.stringify(stepStatuses));
    } catch (error) {
      console.error("Failed to save statuses to localStorage", error);
    }
  }, [stepStatuses]);

  const handleInputChange = (key: string, value: string) => {
    setStepInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckAnswer = async (step: Step, index: number) => {
    const stepKey = `${problem.id}-${step.id}`;
    const userInput = stepInputs[stepKey] || "";
    if (!userInput) {
      toast({
        title: "No input",
        description: "Please provide an answer before checking.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading((prev) => ({ ...prev, [stepKey]: true }));
    const result = await checkAnswerAction({
      studentAnswer: userInput,
      expectedAnswer: step.solution,
    });
    setIsLoading((prev) => ({ ...prev, [stepKey]: false }));
    
    if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        setStepStatuses((prev) => ({ ...prev, [stepKey]: "incorrect" }));
        return;
    }

    if (result.isEquivalent) {
        setStepStatuses((prev) => ({ ...prev, [stepKey]: "correct" }));
        if (result.feedback) {
            setStepCorrectiveFeedback(prev => ({ ...prev, [stepKey]: result.feedback as string }));
        } else {
             toast({
                title: "Correct!",
                description: "Great job!",
            });
        }
    } else {
      setStepStatuses((prev) => ({ ...prev, [stepKey]: "incorrect" }));
      setIsLoading(prev => ({ ...prev, [stepKey]: true }));
      const previousSteps = problem.steps.slice(0, index).map(s => ({
        title: s.title,
        answer: stepInputs[`${problem.id}-${s.id}`] || "Not answered",
      }));
      const feedbackResult = await getFeedbackAction({ problem, previousSteps, currentStep: step, studentInput: userInput });
      setIsLoading(prev => ({ ...prev, [stepKey]: false }));
      if (feedbackResult.error) {
        toast({ title: "Error", description: feedbackResult.error, variant: "destructive" });
      } else if (feedbackResult.feedback) {
        setStepFeedback(prev => ({ ...prev, [stepKey]: feedbackResult.feedback as string }));
      }
    }
  };

  const handleGetHint = (step: Step) => {
    const stepKey = `${problem.id}-${step.id}`;
    if (step.hint) {
      setStepHints(prev => ({ ...prev, [stepKey]: step.hint as string }));
    } else {
        toast({
            title: "No hint available",
            description: "Sorry, there is no hint for this step.",
        });
    }
  };
  
  const correctStepsCount = problem.steps.filter(step => {
      const stepKey = `${problem.id}-${step.id}`;
      return stepStatuses[stepKey] === 'correct';
  }).length;
  const progress = (correctStepsCount / problem.steps.length) * 100;
  const leadExample = useMemo(() => module.problems.find(p => p.type === 'lead-example'), [module]);

  return (
    <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        <div className="problem-description space-y-2 mb-8">
            <h1 className="font-headline text-2xl font-semibold"><MathRenderer text={problem.title} /></h1>
            <p className="text-muted-foreground"><MathRenderer text={problem.description} /></p>
             <div className="pt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">{correctStepsCount} of {problem.steps.length} steps completed</p>
            </div>
        </div>

        <div className="space-y-8">
          {problem.steps.map((step, index) => {
            const stepKey = `${problem.id}-${step.id}`;
            const currentStatus = stepStatuses[stepKey] || "unanswered";
            const isStepUnlocked = index === 0 || stepStatuses[`${problem.id}-${problem.steps[index - 1].id}`] === 'correct';
            const isStepLoading = isLoading[stepKey] || false;

            return (
              <div key={stepKey}>
                <Separator />
                <div className="space-y-4 pt-6">
                  <div className="step-description space-y-2">
                    <h3 className="font-headline text-xl font-semibold">
                      Step {index + 1}: <MathRenderer text={step.title} />
                    </h3>
                    <p className="text-muted-foreground">
                      <MathRenderer text={step.description} />
                    </p>
                  </div>

                  <MathInput
                    value={stepInputs[stepKey] || ""}
                    onChange={(value) => handleInputChange(stepKey, value)}
                    placeholder="Enter your step here in LaTeX format..."
                    disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                  />
                  
                  {step.calculator_callout && (
                    <CalculatorCallout 
                      title={step.calculator_callout.title}
                      description={step.calculator_callout.description}
                    />
                  )}

                  {isStepLoading && (
                    <Alert>
                      <BrainCircuit className="h-4 w-4 animate-pulse" />
                      <AlertTitle>Thinking...</AlertTitle>
                      <AlertDescription>The AI is generating a response.</AlertDescription>
                    </Alert>
                  )}

                  {!isStepLoading && currentStatus === 'correct' && (
                    <Alert variant="success">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>
                        {stepCorrectiveFeedback[stepKey] ? "Mathematically Correct!" : "Correct!"}
                      </AlertTitle>
                      <AlertDescription>
                        {stepCorrectiveFeedback[stepKey] || "Excellent work! You can now proceed to the next step."}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {!isStepLoading && currentStatus === 'incorrect' && stepFeedback[stepKey] && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle>Not quite...</AlertTitle>
                      <AlertDescription>{stepFeedback[stepKey]}</AlertDescription>
                    </Alert>
                  )}

                  {!isStepLoading && stepHints[stepKey] && (
                    <Alert variant="default" className="bg-accent/20 border-accent/50">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle>Hint</AlertTitle>
                      <AlertDescription>{stepHints[stepKey]}</AlertDescription>
                    </Alert>
                  )}
                   <div className="flex justify-between items-center flex-wrap gap-2 mt-4">
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" onClick={() => handleGetHint(step)} disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}>
                            Get Hint
                        </Button>
                        {problem.type === 'practice' && leadExample && (
                          <ViewExampleDialog exampleProblem={leadExample} />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleInputChange(stepKey, '')} disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}>Clear</Button>
                        <Button onClick={() => handleCheckAnswer(step, index)} disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}>
                            Check Answer
                        </Button>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

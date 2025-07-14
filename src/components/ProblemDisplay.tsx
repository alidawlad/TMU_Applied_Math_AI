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
import { Skeleton } from "./ui/skeleton";

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
  const [isHydrated, setIsHydrated] = useState(false);
  const [attemptStarted, setAttemptStarted] = useState(false);

  useEffect(() => {
    try {
      const savedInputs = localStorage.getItem(`fm-stepInputs-${problem.id}`);
      const savedStatuses = localStorage.getItem(`fm-stepStatuses-${problem.id}`);
      if (savedInputs) setStepInputs(JSON.parse(savedInputs));
      if (savedStatuses) {
        const statuses = JSON.parse(savedStatuses);
        setStepStatuses(statuses);
        // If any step is answered, the attempt has started
        if (Object.keys(statuses).length > 0) {
            setAttemptStarted(true);
        }
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    setIsHydrated(true);
  }, [problem.id]);

  useEffect(() => {
    // This effect ensures that the decision to show steps is only made client-side
    // after initial hydration, preventing a mismatch with the server render.
    if(isHydrated && Object.keys(stepStatuses).length > 0) {
      setAttemptStarted(true);
      // If the timer was running for this problem, we might need to restart it.
      // This part depends on how timer state is persisted. For now, we assume
      // a fresh start on reload.
    }
  }, [isHydrated, stepStatuses]);


  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(`fm-stepInputs-${problem.id}`, JSON.stringify(stepInputs));
      } catch (error) {
        console.error("Failed to save inputs to localStorage", error);
      }
    }
  }, [stepInputs, isHydrated, problem.id]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(`fm-stepStatuses-${problem.id}`, JSON.stringify(stepStatuses));
      } catch (error) {
        console.error("Failed to save statuses to localStorage", error);
      }
    }
  }, [stepStatuses, isHydrated, problem.id]);

  const handleInputChange = (key: string, value: string) => {
    setStepInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartAttempt = () => {
    setAttemptStarted(true);
    document.dispatchEvent(new CustomEvent('startTimer'));
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
    
    const isLastStep = index === problem.steps.length - 1;

    if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
        setStepStatuses((prev) => ({ ...prev, [stepKey]: "incorrect" }));
        return;
    }

    if (result.isEquivalent) {
        setStepStatuses((prev) => ({ ...prev, [stepKey]: "correct" }));

        if (isLastStep) {
          document.dispatchEvent(new CustomEvent('stopTimer'));
        }

        if (result.feedback) {
            setStepCorrectiveFeedback(prev => ({ ...prev, [stepKey]: result.feedback as string }));
        } else {
             toast({
                title: "Correct!",
                description: "Great job! The next step is now available.",
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
  
  const correctStepsCount = useMemo(() => problem.steps.filter(step => {
      const stepKey = `${problem.id}-${step.id}`;
      return stepStatuses[stepKey] === 'correct';
  }).length, [problem.id, problem.steps, stepStatuses]);

  const progress = (correctStepsCount / problem.steps.length) * 100;
  const leadExample = useMemo(() => module.problems.find(p => p.type === 'lead-example'), [module]);

  const firstIncompleteStepIndex = useMemo(() => {
    const index = problem.steps.findIndex(step => stepStatuses[`${problem.id}-${step.id}`] !== 'correct');
    return index === -1 ? problem.steps.length : index;
  }, [problem.id, problem.steps, stepStatuses]);

  if (!isHydrated) {
    return (
      <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        <div className="problem-description space-y-2 mb-8">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-8" />
             <div className="pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
            </div>
        </div>
        <div className="space-y-8">
          <Separator />
          <div className="space-y-4 pt-6">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const problemTitle = problem.fullQuestion ? '' : problem.title;
  const problemDesc = problem.fullQuestion || problem.description;

  return (
    <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto">
        <div className="problem-description space-y-4 mb-8">
            <h1 className="font-headline text-2xl font-semibold leading-snug"><MathRenderer text={problemTitle} /></h1>
            <div className="text-foreground/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap prose prose-sm md:prose-base max-w-none"><MathRenderer text={problemDesc} /></div>
             <div className="pt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">{correctStepsCount} of {problem.steps.length} steps completed</p>
            </div>
        </div>

        {!attemptStarted && problem.type === 'practice' ? (
          <div className="text-center py-8 border-t">
             <Button size="lg" onClick={handleStartAttempt}>Start Attempt</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {problem.steps.map((step, index) => {
              if (index > firstIncompleteStepIndex && problem.type === 'practice') {
                return null;
              }

              const stepKey = `${problem.id}-${step.id}`;
              const currentStatus = stepStatuses[stepKey] || "unanswered";
              const isStepUnlocked = index === 0 || stepStatuses[`${problem.id}-${problem.steps[index - 1].id}`] === 'correct' || problem.type === 'lead-example';
              const isStepLoading = isLoading[stepKey] || false;
              const isExample = problem.type === 'lead-example';

              return (
                <div key={stepKey}>
                  <Separator />
                  <div className="space-y-4 pt-6">
                    <div className="step-description space-y-2">
                      <h3 className="font-headline text-xl font-semibold">
                        <MathRenderer text={step.title} />
                      </h3>
                      <p className="text-muted-foreground">
                        <MathRenderer text={step.description} />
                      </p>
                    </div>

                    {isExample ? (
                      <Alert variant="success">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Solution</AlertTitle>
                        <AlertDescription>
                          <MathRenderer text={`$${step.solution}$`} />
                        </AlertDescription>
                      </Alert>
                    ) : (
                       <MathInput
                        value={stepInputs[stepKey] || ""}
                        onChange={(value) => handleInputChange(stepKey, value)}
                        placeholder="Enter your step here..."
                        disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                      />
                    )}
                    
                    {step.calculator_tip && !isExample && (
                      <CalculatorCallout 
                        title="Calculator Tip"
                        description={step.calculator_tip}
                      />
                    )}

                    {isStepLoading && (
                      <Alert>
                        <BrainCircuit className="h-4 w-4 animate-pulse" />
                        <AlertTitle>Thinking...</AlertTitle>
                        <AlertDescription>The AI is generating a response.</AlertDescription>
                      </Alert>
                    )}

                    {!isExample && !isStepLoading && currentStatus === 'correct' && (
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
                    
                    {!isExample && !isStepLoading && currentStatus === 'incorrect' && stepFeedback[stepKey] && (
                      <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Not quite...</AlertTitle>
                        <AlertDescription>{stepFeedback[stepKey]}</AlertDescription>
                      </Alert>
                    )}

                    {!isExample && !isStepLoading && stepHints[stepKey] && (
                      <Alert variant="default" className="bg-accent/20 border-accent/50">
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Hint</AlertTitle>
                        <AlertDescription>{stepHints[stepKey]}</AlertDescription>
                      </Alert>
                    )}
                    
                    {!isExample && (
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
                    )}
                  </div>
                </div>
              );
            })}

            {progress === 100 && problem.type === 'practice' && (
              <div className="text-center py-8 border-t">
                <h3 className="font-headline text-xl font-semibold mb-4">You mastered it! Ready for more?</h3>
                <div className="flex justify-center gap-4">
                  {/* Here you could link to the next problem or back to the study plan */}
                   <Button size="lg">Next Problem</Button>
                   <Button size="lg" variant="outline">Back to Study Plan</Button>
                </div>
              </div>
            )}
             {problem.type === 'lead-example' && (
                <div className="mt-8 border-t pt-8">
                    <h3 className="font-headline text-xl font-semibold mb-4">Related Practice Problems</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {module.problems.filter(p => p.type === 'practice' && p.skill === problem.skill).map(p => (
                            <Link key={p.id} href={`/practice?problem=${p.id}`} className="block">
                                <Card className="h-full hover:border-primary transition-colors">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold"><MathRenderer text={p.title}/></CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-2"><MathRenderer text={p.description}/></p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
             )}
          </div>
        )}
    </div>
  );
}

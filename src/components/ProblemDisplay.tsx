"use client";

import { useState, useMemo, useEffect } from "react";
import type { Module, Problem, Step } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathInput } from "@/components/MathInput";
import { checkAnswerAction, getFeedbackAction, explainExampleStepAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, CheckCircle2, Lightbulb, MessageSquare, Send, XCircle } from "lucide-react";
import { CalculatorCallout } from "./CalculatorCallout";
import { MathRenderer } from "./MathRenderer";
import { Separator } from "@/components/ui/separator";
import { ViewExampleDialog } from "./ViewExampleDialog";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";

type StepStatus = "unanswered" | "correct" | "incorrect";

interface ProblemDisplayProps {
  module: Module;
  problem: Problem;
  onNextProblem: () => void;
}

export function ProblemDisplay({ module, problem, onNextProblem }: ProblemDisplayProps) {
  const { toast } = useToast();

  const [stepInputs, setStepInputs] = useState<Record<string, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, string>>({});
  const [stepCorrectiveFeedback, setStepCorrectiveFeedback] = useState<Record<string, string>>({});
  const [stepHints, setStepHints] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [attemptStarted, setAttemptStarted] = useState(false);
  
  // State for example walkthrough
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);


  useEffect(() => {
    try {
      const savedInputs = localStorage.getItem(`fm-stepInputs-${problem.id}`);
      const savedStatuses = localStorage.getItem(`fm-stepStatuses-${problem.id}`);
      if (savedInputs) setStepInputs(JSON.parse(savedInputs));
      if (savedStatuses) {
        const statuses = JSON.parse(savedStatuses);
        setStepStatuses(statuses);
        if (problem.type === 'practice' && Object.values(statuses).some(s => s !== 'unanswered')) {
          setAttemptStarted(true);
        }
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
    // Reset states for the new problem
    setRevealedStepIndex(0);
    setIsAiPanelOpen(false);
    setAiQuestion("");
    setAiResponse("");
    setIsLoading({});
    if (problem.type === 'lead-example') {
        setAttemptStarted(true); // Examples don't need an attempt button
    } else {
        setAttemptStarted(Object.keys(JSON.parse(localStorage.getItem(`fm-stepStatuses-${problem.id}`) || '{}')).length > 0);
    }

    setIsHydrated(true);
  }, [problem.id, problem.type]);

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

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");

    const revealedContent = problem.steps
        .slice(0, revealedStepIndex + 1)
        .map(s => `Step ${s.id}: ${s.title}\n${s.description}\nSolution: ${s.solution}`)
        .join('\n\n');

    const result = await explainExampleStepAction({
        exampleTitle: problem.title,
        revealedSteps: revealedContent,
        userQuestion: aiQuestion
    });

    if (result.explanation) {
        setAiResponse(result.explanation);
    } else {
        setAiResponse("Sorry, I couldn't generate an explanation for that. Please try rephrasing your question.");
    }
    setIsAiLoading(false);
  }

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
  const leadExample = useMemo(() => module.problems.find(p => p.type === 'lead-example' && p.skill === problem.skill), [module, problem.skill]);

  const firstIncompleteStepIndex = useMemo(() => {
    const index = problem.steps.findIndex(step => stepStatuses[`${problem.id}-${step.id}`] !== 'correct');
    return index === -1 ? problem.steps.length : index;
  }, [problem.id, problem.steps, stepStatuses]);
  
 const renderLeadExample = () => {
    const practiceProblems = module.problems.filter(p => p.type === 'practice' && p.skill === problem.skill);
    
    return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <p className="text-sm font-semibold text-primary text-center uppercase tracking-wider">{module.name}</p>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-center mt-2 leading-tight">
            <MathRenderer text={problem.title} />
          </h1>
        </div>
        
        <div className="space-y-4">
          {problem.steps.map((step, index) => (
            <div
              key={step.id}
              className={`transition-opacity duration-700 ${index <= revealedStepIndex ? "opacity-100" : "opacity-20"}`}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-primary/10 border border-primary/20 text-primary font-bold text-lg rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-4 pt-1">
                  <h3 className="font-headline text-xl md:text-2xl font-semibold text-foreground/90">
                    <MathRenderer text={step.title} />
                  </h3>
                  <div className="prose prose-lg max-w-none text-foreground/80">
                    <MathRenderer text={step.description} />
                  </div>
                   {step.solution && (
                     <Alert variant="success" className="bg-primary/5 border-primary/20">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary/90 font-semibold">Solution</AlertTitle>
                        <AlertDescription className="text-primary text-lg">
                           <MathRenderer text={`$${step.solution}$`} />
                        </AlertDescription>
                    </Alert>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {revealedStepIndex < problem.steps.length - 1 && (
            <div className="mt-12 text-center">
                <Button size="lg" onClick={() => setRevealedStepIndex(i => i + 1)}>Continue</Button>
            </div>
        )}

        {revealedStepIndex === problem.steps.length - 1 && practiceProblems.length > 0 && (
            <div className="mt-16 text-center p-8 bg-background rounded-xl border">
                 <h3 className="font-headline text-2xl font-bold mb-4">Ready to test your knowledge?</h3>
                 <p className="text-muted-foreground mb-6">You've completed the example. Now, try a practice problem to solidify your understanding.</p>
                 <Button size="lg" onClick={onNextProblem}>Try a Practice Question</Button>
            </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <div className="max-w-3xl mx-auto">
            {isAiPanelOpen ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Ask a question</h4>
                        <Button variant="ghost" size="icon" onClick={() => setIsAiPanelOpen(false)}><XCircle className="h-5 w-5"/></Button>
                    </div>
                    {isAiLoading && <p className="text-sm text-muted-foreground animate-pulse">AI is thinking...</p>}
                    {aiResponse && <div className="p-4 bg-muted rounded-md text-sm"><MathRenderer text={aiResponse} /></div>}
                    <div className="flex gap-2">
                        <Input 
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                            placeholder="e.g., Why do we substitute n=1 in the first step?"
                            disabled={isAiLoading}
                        />
                        <Button onClick={handleAskAi} disabled={isAiLoading}><Send className="h-4 w-4" /></Button>
                    </div>
                </div>
            ) : (
                <Button variant="outline" className="w-full" onClick={() => setIsAiPanelOpen(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask AI a Question
                </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    );
 };


  const renderPracticeProblem = () => (
    <>
      <div className="problem-description space-y-4 mb-8">
          <h1 className="font-headline text-2xl font-semibold leading-snug"><MathRenderer text={problem.fullQuestion || problem.title} /></h1>
          {problem.description && problem.description !== problem.fullQuestion &&
            <div className="text-foreground/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap prose prose-sm md:prose-base max-w-none">
              <MathRenderer text={problem.description} />
            </div>
          }
           <div className="pt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2 text-center">{correctStepsCount} of {problem.steps.length} steps completed</p>
          </div>
      </div>

      {!attemptStarted ? (
        <div className="text-center py-8 border-t">
           <Button size="lg" onClick={handleStartAttempt}>Start Attempt</Button>
        </div>
      ) : (
        <div className="space-y-8">
          {problem.steps.map((step, index) => {
            if (index > firstIncompleteStepIndex) return null;
            
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
                      <MathRenderer text={step.title} />
                    </h3>
                    <p className="text-muted-foreground">
                      <MathRenderer text={step.description} />
                    </p>
                  </div>

                  <MathInput
                      value={stepInputs[stepKey] || ""}
                      onChange={(value) => handleInputChange(stepKey, value)}
                      placeholder="Enter your step here..."
                      disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                    />
                  
                  {step.calculator_tip && (
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

                  {currentStatus === 'correct' && (
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
                  
                  {currentStatus === 'incorrect' && stepFeedback[stepKey] && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle>Not quite...</AlertTitle>
                      <AlertDescription>{stepFeedback[stepKey]}</AlertDescription>
                    </Alert>
                  )}

                  {stepHints[stepKey] && (
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
                        {leadExample && (
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

          {progress === 100 && (
            <div className="text-center py-8 border-t">
              <h3 className="font-headline text-xl font-semibold mb-4">You mastered it! Ready for more?</h3>
              <div className="flex justify-center gap-4">
                 <Button size="lg" onClick={onNextProblem}>Next Problem</Button>
                 <Button size="lg" variant="outline" asChild><Link href="/study-plan">Back to Study Plan</Link></Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (!isHydrated) {
    return (
      <div className="flex-1 bg-background p-6 md:p-8 overflow-y-auto">
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
  
  return (
    <div className="flex-1 bg-background p-6 md:p-8 overflow-y-auto pb-24">
      {problem.type === 'lead-example' ? renderLeadExample() : renderPracticeProblem()}
    </div>
  );
}

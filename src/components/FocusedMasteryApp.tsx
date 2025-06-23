
"use client";

import { useState, useMemo, useEffect } from "react";
import { lectures } from "@/lib/data";
import type { Lecture, Module, Problem, Step } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathInput } from "@/components/MathInput";
import { checkAnswerAction, getFeedbackAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { CalculatorCallout } from "./CalculatorCallout";
import { MathRenderer } from "./MathRenderer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

type StepStatus = "unanswered" | "correct" | "incorrect";

export function FocusedMasteryApp() {
  const { toast } = useToast();
  const [currentModuleId, setCurrentModuleId] = useState(lectures[0].modules[0].id);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

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

  const currentModule = useMemo(() => {
    for (const lecture of lectures) {
      const module = lecture.modules.find((m) => m.id === currentModuleId);
      if (module) return module;
    }
    return lectures[0].modules[0];
  }, [currentModuleId]);

  const currentProblem = useMemo(() => {
    return currentModule.problems[currentProblemIndex];
  }, [currentModule, currentProblemIndex]);
  
  const handleInputChange = (key: string, value: string) => {
    setStepInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckAnswer = async (step: Step, index: number) => {
    const stepKey = `${currentProblem.id}-${step.id}`;
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
      const previousSteps = currentProblem.steps.slice(0, index).map(s => ({
        title: s.title,
        answer: stepInputs[`${currentProblem.id}-${s.id}`] || "Not answered",
      }));
      const feedbackResult = await getFeedbackAction({ problem: currentProblem, previousSteps, currentStep: step, studentInput: userInput });
      setIsLoading(prev => ({ ...prev, [stepKey]: false }));
      if (feedbackResult.error) {
        toast({ title: "Error", description: feedbackResult.error, variant: "destructive" });
      } else if (feedbackResult.feedback) {
        setStepFeedback(prev => ({ ...prev, [stepKey]: feedbackResult.feedback as string }));
      }
    }
  };

  const handleGetHint = (step: Step) => {
    const stepKey = `${currentProblem.id}-${step.id}`;
    if (step.hint) {
      setStepHints(prev => ({ ...prev, [stepKey]: step.hint as string }));
    } else {
        toast({
            title: "No hint available",
            description: "Sorry, there is no hint for this step.",
        });
    }
  };
  
  const handleModuleChange = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentProblemIndex(0);
    // Resetting state for the new module is a good idea
    setStepInputs({});
    setStepStatuses({});
    setStepFeedback({});
    setStepCorrectiveFeedback({});
    setStepHints({});
    setIsLoading({});
  }

  const handleProblemChange = (index: string) => {
    setCurrentProblemIndex(Number(index));
  };


  const correctStepsCount = currentProblem.steps.filter(step => {
      const stepKey = `${currentProblem.id}-${step.id}`;
      return stepStatuses[stepKey] === 'correct';
  }).length;
  const progress = (correctStepsCount / currentProblem.steps.length) * 100;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Accordion type="single" collapsible defaultValue={lectures.find(l => l.modules.some(m => m.id === currentModuleId))?.id} className="w-full mb-4">
        {lectures.map(lecture => (
          <AccordionItem key={lecture.id} value={lecture.id}>
            <AccordionTrigger className="text-xl font-headline">{lecture.title}</AccordionTrigger>
            <AccordionContent>
                <Tabs value={currentModuleId} onValueChange={handleModuleChange} className="w-full">
                  <TabsList className="mb-4 flex flex-wrap h-auto justify-start">
                    {lecture.modules.map((module) => (
                      <TabsTrigger key={module.id} value={module.id}>
                        {module.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
               </Tabs>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {currentModule && currentProblem && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">
              {currentModule.name}
            </CardTitle>
            <CardDescription>
              {currentModule.description}
            </CardDescription>

            <div className="pt-4 space-y-2">
                <label htmlFor="problem-select" className="text-sm font-medium text-muted-foreground">Select a Problem:</label>
                <Select
                    value={String(currentProblemIndex)}
                    onValueChange={handleProblemChange}
                >
                    <SelectTrigger id="problem-select" className="mt-1">
                        <SelectValue placeholder="Select a problem" />
                    </SelectTrigger>
                    <SelectContent>
                        {currentModule.problems.map((problem, index) => (
                            <SelectItem key={problem.id} value={String(index)}>
                                <MathRenderer text={problem.title} />
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="pt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2 text-center">{correctStepsCount} of {currentProblem.steps.length} steps completed</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div className="problem-description space-y-2">
                <h2 className="font-headline text-2xl font-semibold"><MathRenderer text={currentProblem.title} /></h2>
                <p className="text-muted-foreground"><MathRenderer text={currentProblem.description} /></p>
            </div>

            {currentProblem.steps.map((step, index) => {
              const stepKey = `${currentProblem.id}-${step.id}`;
              const currentStatus = stepStatuses[stepKey] || "unanswered";
              const isStepUnlocked = index === 0 || stepStatuses[`${currentProblem.id}-${currentProblem.steps[index - 1].id}`] === 'correct';
              const isStepLoading = isLoading[stepKey] || false;

              return (
                <div key={stepKey} className="space-y-4">
                  <Separator />
                  <div className="step-description space-y-2 pt-4">
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
                   <div className="flex justify-between flex-wrap gap-2">
                      <Button variant="outline" onClick={() => handleGetHint(step)} disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Get Hint
                      </Button>
                      <Button onClick={() => handleCheckAnswer(step, index)} disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}>
                        Check Answer
                      </Button>
                    </div>
                </div>
              );
            })}

          </CardContent>
        </Card>
      )}
    </div>
  );
}

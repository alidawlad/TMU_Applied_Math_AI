"use client";

import { useState, useMemo, type Key } from "react";
import { modules } from "@/lib/data";
import type { Module, Problem, Step } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathInput } from "@/components/MathInput";
import { getFeedbackAction, getHintAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { CalculatorCallout } from "./CalculatorCallout";

type StepStatus = "unanswered" | "correct" | "incorrect";

export function FocusedMasteryApp() {
  const { toast } = useToast();
  const [currentModuleId, setCurrentModuleId] = useState(modules[0].id);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [stepInputs, setStepInputs] = useState<Record<string, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, string>>({});
  const [stepHints, setStepHints] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentModule = useMemo(
    () => modules.find((m) => m.id === currentModuleId) as Module,
    [currentModuleId]
  );
  const currentProblem = useMemo(
    () => currentModule.problems[currentProblemIndex],
    [currentModule, currentProblemIndex]
  );
  const currentStep = useMemo(
    () => currentProblem.steps[currentStepIndex],
    [currentProblem, currentStepIndex]
  );
  
  const stepKey = `${currentProblem.id}-${currentStep.id}`;
  const currentStatus = stepStatuses[stepKey] || "unanswered";

  const handleInputChange = (value: string) => {
    setStepInputs((prev) => ({ ...prev, [stepKey]: value }));
  };

  const normalizeAnswer = (answer: string) => {
    return answer.replace(/\s+/g, "").toLowerCase();
  };

  const handleCheckAnswer = async () => {
    const userInput = stepInputs[stepKey] || "";
    if (!userInput) {
      toast({
        title: "No input",
        description: "Please provide an answer before checking.",
        variant: "destructive",
      });
      return;
    }

    if (normalizeAnswer(userInput) === normalizeAnswer(currentStep.solution)) {
      setStepStatuses((prev) => ({ ...prev, [stepKey]: "correct" }));
      toast({
        title: "Correct!",
        description: "Great job! Click Next to continue.",
      });
    } else {
      setStepStatuses((prev) => ({ ...prev, [stepKey]: "incorrect" }));
      setIsLoading(true);
      const previousSteps = currentProblem.steps.slice(0, currentStepIndex).map(step => ({
        title: step.title,
        answer: stepInputs[`${currentProblem.id}-${step.id}`] || "Not answered",
      }));
      const result = await getFeedbackAction({ problem: currentProblem, previousSteps, currentStep, studentInput: userInput });
      setIsLoading(false);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else if (result.feedback) {
        setStepFeedback(prev => ({ ...prev, [stepKey]: result.feedback as string }));
      }
    }
  };

  const handleGetHint = async () => {
    setIsLoading(true);
    const result = await getHintAction({ problem: currentProblem, currentStep, studentInput: stepInputs[stepKey] || "" });
    setIsLoading(false);
    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else if (result.hint) {
      setStepHints(prev => ({ ...prev, [stepKey]: result.hint as string }));
    }
  };

  const handleNext = () => {
    // Clear feedback/hints for the current step
    setStepFeedback(prev => ({...prev, [stepKey]: ''}));
    setStepHints(prev => ({...prev, [stepKey]: ''}));
    
    if (currentStepIndex < currentProblem.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Move to next problem or finish module
      if (currentProblemIndex < currentModule.problems.length - 1) {
        setCurrentProblemIndex(currentProblemIndex + 1);
        setCurrentStepIndex(0);
      } else {
        toast({
          title: `Module ${currentModule.name} Complete!`,
          description: "Select another module to continue learning.",
        });
        // Optionally reset to first problem
        // setCurrentProblemIndex(0);
        // setCurrentStepIndex(0);
      }
    }
  };
  
  const handleModuleChange = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentProblemIndex(0);
    setCurrentStepIndex(0);
    setStepInputs({});
    setStepStatuses({});
    setStepFeedback({});
    setStepHints({});
  }

  const progress = ((currentStepIndex + 1) / currentProblem.steps.length) * 100;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs value={currentModuleId} onValueChange={handleModuleChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          {modules.map((module) => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="w-full max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">{currentProblem.title}</CardTitle>
                <CardDescription>{currentProblem.description}</CardDescription>
                <div className="pt-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2 text-center">Step {currentStepIndex + 1} of {currentProblem.steps.length}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="step-description space-y-2">
                  <h3 className="font-headline text-xl font-semibold">{currentStep.title}</h3>
                  <p className="text-muted-foreground">{currentStep.description}</p>
                </div>

                <MathInput
                  value={stepInputs[stepKey] || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your step here in LaTeX format..."
                  disabled={currentStatus === 'correct' || isLoading}
                />
                
                {currentStep.calculator_callout && (
                  <CalculatorCallout 
                    title={currentStep.calculator_callout.title}
                    description={currentStep.calculator_callout.description}
                  />
                )}

                {isLoading && (
                  <Alert>
                    <BrainCircuit className="h-4 w-4 animate-pulse" />
                    <AlertTitle>Thinking...</AlertTitle>
                    <AlertDescription>The AI is generating a response.</AlertDescription>
                  </Alert>
                )}

                {!isLoading && currentStatus === 'correct' && (
                  <Alert variant="success">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Correct!</AlertTitle>
                    <AlertDescription>Excellent work! Please proceed to the next step.</AlertDescription>
                  </Alert>
                )}
                
                {!isLoading && currentStatus === 'incorrect' && stepFeedback[stepKey] && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Not quite...</AlertTitle>
                    <AlertDescription>{stepFeedback[stepKey]}</AlertDescription>
                  </Alert>
                )}

                {!isLoading && stepHints[stepKey] && (
                   <Alert variant="default" className="bg-accent/20 border-accent/50">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Hint</AlertTitle>
                    <AlertDescription>{stepHints[stepKey]}</AlertDescription>
                  </Alert>
                )}

              </CardContent>
              <CardFooter className="flex justify-between flex-wrap gap-2">
                <Button variant="outline" onClick={handleGetHint} disabled={currentStatus === 'correct' || isLoading}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get Hint
                </Button>
                <div className="flex gap-2">
                   <Button onClick={handleCheckAnswer} disabled={currentStatus === 'correct' || isLoading}>Check Answer</Button>
                   <Button onClick={handleNext} disabled={currentStatus !== 'correct'}>Next Step</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

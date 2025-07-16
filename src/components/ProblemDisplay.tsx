"use client";

import { useState, useMemo, useEffect } from "react";
import type { Lecture, ModuleContent, Problem, Step } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  ProgressCard, 
  ProgressIndicator, 
  EnhancedProgress,
  ProgressRing,
  ProgressStats 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  formatProgressText, 
  getProgressColor,
  calculateStepProgress,
  calculateTimeMetrics,
  formatDuration,
  generateProgressInsights
} from "@/lib/utils/progressUtils";
import { MathInput } from "@/components/MathInput";
import { checkAnswerAction, getFeedbackAction } from "@/lib/actions";
import { AnswerReveal } from "@/components/AnswerReveal";
import { AIStatusIndicator, CheckingModeSelector } from "@/components/AIStatusIndicator";
import { aiService } from "@/lib/services/aiService";
import type { AnswerCheckingMode } from "@/lib/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, CheckCircle2, Lightbulb, XCircle, Target, TrendingUp, Clock, Award, Settings } from "lucide-react";
import { CalculatorCallout } from "./CalculatorCallout";
import { MathRenderer } from "./MathRenderer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useLearningContext } from '@/lib/contexts/LearningContext';
import { useProgress } from '@/lib/hooks/useProgress';
import { UnifiedNavigation, NavigationModeSwitch } from './UnifiedNavigation';
import { AIErrorBoundary } from '@/components/error-boundaries/AIErrorBoundary';
import { cn } from "@/lib/utils";

type StepStatus = "unanswered" | "correct" | "incorrect";

interface ProblemDisplayProps {
  lecture: Lecture;
  module: ModuleContent;
  problem: Problem;
  onNextProblem: () => void;
  isProgressing?: boolean;
  isMobile?: boolean;
}

export function ProblemDisplay({ lecture, module, problem, onNextProblem, isProgressing = false, isMobile = false }: ProblemDisplayProps) {
  const { toast } = useToast();

  const [stepInputs, setStepInputs] = useState<Record<string, string>>({});
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [stepFeedback, setStepFeedback] = useState<Record<string, string>>({});
  const [stepCorrectiveFeedback, setStepCorrectiveFeedback] = useState<Record<string, string>>({});
  const [stepHints, setStepHints] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [attemptStarted, setAttemptStarted] = useState(false);
  
  // Answer checking mode state
  const [answerCheckingMode, setAnswerCheckingMode] = useState<AnswerCheckingMode>('ai');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showModeSelector, setShowModeSelector] = useState(false);
  
  // Enhanced progress tracking
  const { preserveContext } = useLearningContext();
  const { 
    updateContentProgress, 
    getContentProgress, 
    trackContentAccess,
    getStepStatuses,
    getStepInputs
  } = useProgress();

  // Initialize checking mode based on AI availability
  useEffect(() => {
    const availableModes = aiService.getAvailableModes();
    if (availableModes.length > 0 && !availableModes.includes(answerCheckingMode)) {
      setAnswerCheckingMode(availableModes[0]);
    }
  }, [answerCheckingMode]);

  // Track content access and preserve context
  useEffect(() => {
    trackContentAccess(problem.id);
    
    preserveContext({
      previousContent: {
        type: 'problem',
        id: problem.id,
        moduleId: module.id,
        lectureId: lecture.id
      }
    });
  }, [problem.id, module.id, lecture.id, trackContentAccess, preserveContext]);

  useEffect(() => {
    try {
      // Load from unified progress system
      const savedInputs = getStepInputs(problem.id);
      const savedStatuses = getStepStatuses(problem.id);
      
      if (Object.keys(savedInputs).length > 0) {
        setStepInputs(savedInputs);
      }
      
      if (Object.keys(savedStatuses).length > 0) {
        setStepStatuses(savedStatuses);
        if (problem.type === 'practice' && Object.values(savedStatuses).some(s => s !== 'unanswered')) {
          setAttemptStarted(true);
        }
      }
    } catch (error) {
      console.error("Failed to load state from progress system", error);
    }

    setIsHydrated(true);
  }, [problem.id, problem.type, getStepInputs, getStepStatuses]);

  useEffect(() => {
    if (isHydrated) {
      try {
        // Update unified progress system
        updateContentProgress(problem.id, 'problem', { 
          stepInputs,
          timeSpent: 1000 // Add 1 second for each input change
        });
      } catch (error) {
        console.error("Failed to save inputs to progress system", error);
      }
    }
  }, [stepInputs, isHydrated, problem.id, updateContentProgress]);

  useEffect(() => {
    if (isHydrated) {
      try {
        // Calculate completion status
        const correctSteps = Object.values(stepStatuses).filter(s => s === 'correct').length;
        const totalSteps = problem.steps.length;
        const isCompleted = correctSteps === totalSteps;
        
        // Update unified progress system
        updateContentProgress(problem.id, 'problem', { 
          stepStatuses,
          correctStepsCount: correctSteps,
          totalSteps,
          isCompleted,
          timeSpent: 2000 // Add 2 seconds for each status change
        });
      } catch (error) {
        console.error("Failed to save statuses to progress system", error);
      }
    }
  }, [stepStatuses, isHydrated, problem.id, problem.steps.length, updateContentProgress]);

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
    
    // For reveal mode, no input required
    if (answerCheckingMode !== 'reveal' && !userInput) {
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
      mode: answerCheckingMode
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
        
        // Mark answer as revealed if using reveal mode
        if (answerCheckingMode === 'reveal') {
          setRevealedAnswers(prev => ({ ...prev, [stepKey]: true }));
        }

        if (isLastStep) {
          document.dispatchEvent(new CustomEvent('stopTimer'));
        }

        if (result.feedback) {
            setStepCorrectiveFeedback(prev => ({ ...prev, [stepKey]: result.feedback as string }));
        } else {
             toast({
                title: answerCheckingMode === 'reveal' ? "Answer Revealed!" : "Correct!",
                description: answerCheckingMode === 'reveal' ? 
                  "The solution has been revealed. Review and continue to the next step." :
                  "Great job! The next step is now available.",
            });
        }
    } else {
      setStepStatuses((prev) => ({ ...prev, [stepKey]: "incorrect" }));
      
      // Only get AI feedback for incorrect answers in AI/manual modes
      if (answerCheckingMode !== 'reveal') {
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
  
  const correctStepsCount = useMemo(() => {
    if (!problem?.steps || !stepStatuses) return 0;
    return problem.steps.filter(step => {
      const stepKey = `${problem.id}-${step.id}`;
      return stepStatuses[stepKey] === 'correct';
    }).length;
  }, [problem?.id, problem?.steps, stepStatuses]);

  const progress = problem?.steps?.length > 0 ? (correctStepsCount / problem.steps.length) * 100 : 0;
  
  // Enhanced progress calculations
  const progressData = useMemo(() => {
    const stepCount = problem?.steps?.length || 0;
    return createProgressData(correctStepsCount, stepCount);
  }, [correctStepsCount, problem?.steps?.length]);
  
  const progressInsights = useMemo(() => {
    return generateProgressInsights(progressData, 85, 1); // Mock values for demo
  }, [progressData]);
  
  const stepProgressData = useMemo(() => {
    return calculateStepProgress(stepStatuses, problem.steps.length);
  }, [stepStatuses, problem.steps.length]);
  
  const firstIncompleteStepIndex = useMemo(() => {
    const index = problem.steps.findIndex(step => stepStatuses[`${problem.id}-${step.id}`] !== 'correct');
    return index === -1 ? problem.steps.length : index;
  }, [problem.id, problem.steps, stepStatuses]);

  const renderPracticeProblem = () => (
    <>
      <div className="problem-description space-y-4 mb-6 md:mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className={cn(
              "font-headline font-semibold leading-snug flex-1",
              isMobile ? "text-xl" : "text-2xl"
            )}>
              <MathRenderer text={problem.fullQuestion || problem.title} />
            </h1>
            
            {/* AI Status and Mode Selector */}
            <div className="flex items-center gap-2">
              <AIStatusIndicator size="sm" />
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModeSelector(!showModeSelector)}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Mode
                </Button>
              )}
            </div>
          </div>
          
          {/* Mode Selector Panel */}
          {showModeSelector && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <CheckingModeSelector
                  currentMode={answerCheckingMode}
                  onModeChange={(mode) => {
                    setAnswerCheckingMode(mode);
                    setShowModeSelector(false);
                  }}
                />
              </CardContent>
            </Card>
          )}
          {problem.description && problem.description !== problem.fullQuestion &&
            <div className={cn(
              "text-foreground/90 leading-relaxed whitespace-pre-wrap prose max-w-none",
              isMobile ? "text-sm prose-sm" : "text-base md:text-lg prose-sm md:prose-base"
            )}>
              <MathRenderer text={problem.description} />
            </div>
          }
           <div className="pt-3 md:pt-4 space-y-3 md:space-y-4">
            <div className={cn(
              "flex items-center gap-3 md:gap-4",
              isMobile && "flex-col space-y-3"
            )}>
              <div className="flex-1 w-full">
                <EnhancedProgress 
                  value={progressData.percentage} 
                  className={cn(
                    "w-full",
                    isMobile ? "h-2" : "h-3"
                  )} 
                  size={isMobile ? "md" : "lg"}
                  variant={progressData.percentage === 100 ? "success" : "default"}
                  animated={true}
                  showPercentage={false}
                  gradient={progressData.percentage > 50}
                />
                <div className={cn(
                  "flex justify-between items-center mt-2",
                  isMobile && "text-center flex-col gap-1"
                )}>
                  <p className={cn(
                    "text-muted-foreground",
                    isMobile ? "text-xs" : "text-sm"
                  )}>
                    {formatProgressText(progressData)} steps completed
                  </p>
                  <div className="flex items-center gap-2">
                    <ProgressIndicator 
                      status={progressData.percentage === 100 ? "completed" : 
                             progressData.percentage > 0 ? "in-progress" : "not-started"} 
                      size="sm" 
                      animated={progressData.percentage > 0 && progressData.percentage < 100}
                    />
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>{progressData.percentage}%</span>
                  </div>
                </div>
              </div>
              {!isMobile && (
                <ProgressRing 
                  value={progressData.completed} 
                  max={progressData.total} 
                  size={60} 
                  strokeWidth={4}
                  variant={progressData.percentage === 100 ? "success" : "default"}
                  showText={true}
                />
              )}
            </div>
            
            {/* Progress insights */}
            {progressInsights.length > 0 && progressData.percentage > 0 && (
              <div className={cn(
                "bg-muted/30 rounded-lg border",
                isMobile ? "p-2" : "p-3"
              )}>
                <div className={cn(
                  "flex items-center gap-2 mb-2",
                  isMobile && "mb-1"
                )}>
                  <TrendingUp className={cn(
                    "text-blue-600",
                    isMobile ? "h-3 w-3" : "h-4 w-4"
                  )} />
                  <span className={cn(
                    "font-medium",
                    isMobile ? "text-xs" : "text-sm"
                  )}>Progress Insights</span>
                </div>
                <div className="space-y-1">
                  {progressInsights.slice(0, isMobile ? 1 : 2).map((insight, index) => (
                    <p key={index} className={cn(
                      "text-muted-foreground",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
      </div>

      {!attemptStarted ? (
        <div className={cn(
          "text-center border-t",
          isMobile ? "py-6" : "py-8"
        )}>
           <Button 
             size={isMobile ? "default" : "lg"} 
             onClick={handleStartAttempt}
             className={cn(
               "min-h-[44px]", // Touch-friendly minimum height
               isMobile && "w-full max-w-xs"
             )}
           >
             Start Attempt
           </Button>
        </div>
      ) : (
        <div className={cn(
          isMobile ? "space-y-6" : "space-y-8"
        )}>
          {problem.steps.map((step, index) => {
            if (index > firstIncompleteStepIndex) return null;
            
            const stepKey = `${problem.id}-${step.id}`;
            const currentStatus = stepStatuses[stepKey] || "unanswered";
            const isStepUnlocked = index === 0 || stepStatuses[`${problem.id}-${problem.steps[index - 1].id}`] === 'correct';
            const isStepLoading = isLoading[stepKey] || false;

            return (
              <div key={stepKey}>
                <Separator />
                <div className={cn(
                  "space-y-4",
                  isMobile ? "pt-4" : "pt-6"
                )}>
                  <div className={cn(
                    "flex items-start gap-3 md:gap-4",
                    isMobile && "flex-col space-y-2"
                  )}>
                    <div className={cn(
                      "flex-shrink-0",
                      isMobile ? "self-start" : "mt-1"
                    )}>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "rounded-full bg-muted flex items-center justify-center font-medium",
                          isMobile ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm"
                        )}>
                          {index + 1}
                        </div>
                        <ProgressIndicator 
                          status={currentStatus === 'correct' ? 'completed' : 
                                 isStepUnlocked && currentStatus !== 'unanswered' ? 'in-progress' : 
                                 isStepUnlocked ? 'in-progress' : 'not-started'} 
                          size="sm"
                          animated={isStepUnlocked && currentStatus !== 'correct'}
                        />
                      </div>
                    </div>
                    <div className="flex-1 step-description space-y-2">
                      <h3 className={cn(
                        "font-headline font-semibold",
                        isMobile ? "text-lg" : "text-xl"
                      )}>
                        <MathRenderer text={step.title} />
                      </h3>
                      <p className={cn(
                        "text-muted-foreground",
                        isMobile ? "text-sm" : "text-base"
                      )}>
                        <MathRenderer text={step.description} />
                      </p>
                    </div>
                  </div>

                  <MathInput
                      value={stepInputs[stepKey] || ""}
                      onChange={(value) => handleInputChange(stepKey, value)}
                      placeholder="Enter your step here..."
                      disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                      isMobile={isMobile}
                    />
                  
                  {step.calculator_tip && (
                    <CalculatorCallout 
                      title="Calculator Tip"
                      description={step.calculator_tip}
                    />
                  )}

                  <AIErrorBoundary operation="step feedback" fallbackMessage="AI feedback is temporarily unavailable">
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
                  </AIErrorBoundary>
                  
                  {/* Answer Reveal Component for reveal mode */}
                  {answerCheckingMode === 'reveal' && currentStatus !== 'correct' && (
                    <AnswerReveal
                      step={step}
                      stepKey={stepKey}
                      isRevealed={revealedAnswers[stepKey] || false}
                      onReveal={() => handleCheckAnswer(step, index)}
                      onHide={() => {
                        setRevealedAnswers(prev => ({ ...prev, [stepKey]: false }));
                        setStepStatuses(prev => ({ ...prev, [stepKey]: 'unanswered' }));
                      }}
                      className="mt-4"
                    />
                  )}

                  <div className={cn(
                    "flex justify-between items-center flex-wrap gap-2 mt-4",
                    isMobile && "flex-col space-y-2"
                  )}>
                      <div className={cn(
                        "flex gap-2",
                        isMobile && "w-full justify-center"
                      )}>
                        <Button 
                          variant="outline" 
                          size={isMobile ? "default" : "sm"} 
                          onClick={() => handleGetHint(step)} 
                          disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                          className={cn(
                            "min-h-[44px]", // Touch-friendly
                            isMobile && "flex-1 max-w-32"
                          )}
                        >
                          Get Hint
                        </Button>
                        
                        {/* Mode selector for mobile */}
                        {isMobile && (
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setShowModeSelector(!showModeSelector)}
                            className="min-h-[44px] flex-1 max-w-32"
                          >
                            Mode
                          </Button>
                        )}
                      </div>
                      <div className={cn(
                        "flex gap-2",
                        isMobile && "w-full"
                      )}>
                        <Button 
                          variant="ghost" 
                          size={isMobile ? "default" : "sm"} 
                          onClick={() => handleInputChange(stepKey, '')} 
                          disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading || answerCheckingMode === 'reveal'}
                          className={cn(
                            "min-h-[44px]", // Touch-friendly
                            isMobile && "flex-1"
                          )}
                        >
                          Clear
                        </Button>
                        <Button 
                          onClick={() => handleCheckAnswer(step, index)} 
                          disabled={!isStepUnlocked || currentStatus === 'correct' || isStepLoading}
                          size={isMobile ? "default" : "sm"}
                          className={cn(
                            "min-h-[44px]", // Touch-friendly
                            isMobile && "flex-1"
                          )}
                        >
                          {answerCheckingMode === 'reveal' ? 'Reveal Answer' : 'Check Answer'}
                        </Button>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}

          {progress === 100 && (
            <div className={cn(
              "text-center border-t",
              isMobile ? "py-6" : "py-8"
            )}>
              <div className={cn(
                isMobile ? "space-y-4" : "space-y-6"
              )}>
                <div className={cn(
                  "flex items-center justify-center",
                  isMobile ? "flex-col space-y-3" : "gap-4"
                )}>
                  <ProgressRing 
                    value={progressData.completed} 
                    max={progressData.total} 
                    size={isMobile ? 60 : 80} 
                    strokeWidth={isMobile ? 4 : 6}
                    variant="success"
                    showText={true}
                  />
                  <div className={cn(
                    isMobile ? "text-center" : "text-left"
                  )}>
                    <h3 className={cn(
                      "font-headline font-semibold mb-2",
                      isMobile ? "text-lg" : "text-xl"
                    )}>You mastered it! 🎉</h3>
                    <p className={cn(
                      "text-muted-foreground",
                      isMobile ? "text-sm" : "text-base"
                    )}>
                      Perfect! You've completed all {progressData.total} steps correctly.
                    </p>
                  </div>
                </div>
                
                <ProgressStats
                  stats={[
                    {
                      label: "Steps Completed",
                      value: progressData.completed,
                      icon: <CheckCircle2 className="h-4 w-4" />,
                      color: "text-green-600"
                    },
                    {
                      label: "Accuracy",
                      value: 100,
                      icon: <Target className="h-4 w-4" />,
                      color: "text-green-600"
                    },
                    {
                      label: "Status",
                      value: 1,
                      icon: <Award className="h-4 w-4" />,
                      color: "text-green-600"
                    }
                  ]}
                  layout="horizontal"
                />
                
                <div className={cn(
                  "flex justify-center gap-3",
                  isMobile && "flex-col items-center w-full max-w-sm mx-auto"
                )}>
                   <Button 
                     size={isMobile ? "default" : "lg"} 
                     onClick={onNextProblem} 
                     disabled={isProgressing}
                     className={cn(
                       "min-h-[44px]", // Touch-friendly
                       isMobile && "w-full"
                     )}
                   >
                     {isProgressing ? "Loading..." : "Next Problem"}
                   </Button>
                   <Button 
                     size={isMobile ? "default" : "lg"} 
                     variant="outline" 
                     asChild
                     className={cn(
                       "min-h-[44px]", // Touch-friendly
                       isMobile && "w-full"
                     )}
                   >
                     <Link href="/study-plan">Back to Study Plan</Link>
                   </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (!isHydrated) {
    return (
      <div className={cn(
        "flex-1 bg-background overflow-y-auto",
        isMobile ? "p-4" : "p-6 md:p-8"
      )}>
        <div className={cn(
          "problem-description space-y-2",
          isMobile ? "mb-6" : "mb-8"
        )}>
            <Skeleton className={cn(
              "mb-4",
              isMobile ? "h-6 w-full" : "h-8 w-3/4"
            )} />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className={cn(
              isMobile ? "h-4 w-full mb-6" : "h-4 w-5/6 mb-8"
            )} />
             <div className={cn(
               isMobile ? "pt-3" : "pt-4"
             )}>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
            </div>
        </div>
        <div className={cn(
          isMobile ? "space-y-6" : "space-y-8"
        )}>
          <Separator />
          <div className={cn(
            "space-y-4",
            isMobile ? "pt-4" : "pt-6"
          )}>
            <Skeleton className={cn(
              "mb-2",
              isMobile ? "h-5 w-full" : "h-6 w-1/2"
            )} />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className={cn(
              "w-full",
              isMobile ? "h-16" : "h-20"
            )} />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "flex-1 bg-background overflow-y-auto",
      isMobile ? "p-4 pb-20" : "p-6 md:p-8 pb-24"
    )}>
      {renderPracticeProblem()}
    </div>
  );
}

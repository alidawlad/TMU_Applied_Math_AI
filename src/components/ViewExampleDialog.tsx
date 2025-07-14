"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageSquare, XCircle, Lightbulb } from "lucide-react";
import type { Example, ModuleContent, LectureContentSegment } from "@/lib/types";
import { MathRenderer } from "./MathRenderer";
import { ScrollArea } from "./ui/scroll-area";
import { explainExampleStepAction } from "@/lib/actions";

interface ViewExampleDialogProps {
  example: Example;
  module: ModuleContent;
  trigger?: React.ReactNode;
}

function renderSegment(segment: LectureContentSegment, index: number) {
  switch (segment.type) {
    case 'heading':
      return <h2 key={index} className="font-headline text-xl font-bold mt-6 mb-3 text-primary/95"><MathRenderer text={segment.text!} /></h2>;
    case 'subheading':
      return <h3 key={index} className="font-headline text-lg font-semibold mt-4 mb-2 text-gray-800"><MathRenderer text={segment.text!} /></h3>;
    case 'paragraph':
      return <p key={index} className="text-sm leading-relaxed my-2 text-gray-700"><MathRenderer text={segment.text!} /></p>;
    case 'list':
      return <ul key={index} className="list-disc list-inside space-y-1 my-2 pl-4 text-sm">{segment.items!.map((item, i) => <li key={i}><MathRenderer text={item} /></li>)}</ul>;
    case 'numbered-list':
      return <ol key={index} className="list-decimal list-inside space-y-1 my-2 pl-4 text-sm">{segment.items!.map((item, i) => <li key={i} className="pl-1"><MathRenderer text={item} /></li>)}</ol>;
    case 'math':
      return <div key={index} className="flex justify-center my-3 p-3 bg-muted/50 rounded-lg text-base"><MathRenderer text={`$$${segment.text}$$`} /></div>;
    case 'callout':
      const calloutColor = segment.emphasis === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 
                          segment.emphasis === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                          segment.emphasis === 'danger' ? 'bg-red-50 border-red-200 text-red-800' :
                          'bg-blue-50 border-blue-200 text-blue-800';
      return <div key={index} className={`my-3 p-3 border-l-4 rounded-r-lg ${calloutColor}`}><MathRenderer text={segment.text!} /></div>;
    case 'step-by-step':
      return <div key={index} className="my-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg"><div className="font-semibold text-primary mb-1 text-xs">Step-by-Step:</div><MathRenderer text={segment.text!} /></div>;
    case 'pattern-highlight':
      return <div key={index} className="my-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg"><div className="font-semibold text-purple-800 mb-1 text-xs">Pattern Recognition:</div><MathRenderer text={segment.text!} /></div>;
    case 'summary-box':
      return <div key={index} className="my-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg"><div className="font-semibold text-green-800 mb-1 text-xs">Key Takeaway:</div><MathRenderer text={segment.text!} /></div>;
    case 'connection':
      return <div key={index} className="my-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg"><div className="font-semibold text-orange-800 mb-1 text-xs">Connection:</div><MathRenderer text={segment.text!} /></div>;
    default:
      return null;
  }
}

export function ViewExampleDialog({ example, module, trigger }: ViewExampleDialogProps) {
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedProgress = localStorage.getItem(`fm-example-${example.id}`);
      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress);
          setRevealedStepIndex(progress.revealedStepIndex || 0);
          setUserProgress(progress.userProgress || {});
        } catch (error) {
          console.error("Failed to load example progress:", error);
        }
      }
    }
  }, [example.id, isOpen]);

  // Save progress to localStorage
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem(`fm-example-${example.id}`, JSON.stringify({
        revealedStepIndex,
        userProgress
      }));
    }
  }, [revealedStepIndex, userProgress, example.id, isOpen]);

  const handleContinue = () => {
    if (revealedStepIndex < example.segments.length - 1) {
      setRevealedStepIndex(prev => prev + 1);
      setUserProgress(prev => ({ ...prev, [revealedStepIndex]: true }));
    }
  };

  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");

    const revealedContent = example.segments
      .slice(0, revealedStepIndex + 1)
      .map(segment => {
        if (segment.text) return segment.text;
        if (segment.items) return segment.items.join(' ');
        return '';
      })
      .join('\n\n');

    const result = await explainExampleStepAction({
      exampleTitle: example.title,
      revealedSteps: revealedContent,
      userQuestion: aiQuestion
    });

    setAiResponse(result.explanation || "Sorry, I couldn't generate an explanation. Please try rephrasing your question.");
    setIsAiLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskAi();
    }
  };

  const progress = ((revealedStepIndex + 1) / example.segments.length) * 100;
  const relatedPracticeProblems = module.problems.filter(p => example.relatedPracticeProblemIds.includes(p.id));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">View Example</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-xl">
            <MathRenderer text={example.title} />
          </DialogTitle>
          <div className="pt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Step {revealedStepIndex + 1} of {example.segments.length}
            </p>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {example.segments.slice(0, revealedStepIndex + 1).map((segment, index) => (
              <div key={index}>
                {renderSegment(segment, index)}
              </div>
            ))}
          </div>

          {revealedStepIndex >= example.segments.length - 1 && relatedPracticeProblems.length > 0 && (
            <Card className="my-6 bg-muted/50 border-dashed">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Practice This Concept</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Ready to practice? Try these related problems:
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedPracticeProblems.map(problem => (
                    <Button
                      key={problem.id}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsOpen(false);
                        window.open(`/practice?problem=${problem.id}`, '_blank');
                      }}
                    >
                      {problem.id}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </ScrollArea>

        <div className="p-6 pt-0 border-t">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              {isAiPanelOpen ? (
                <Card className="p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">Ask about the revealed content</h4>
                    <Button variant="ghost" size="sm" onClick={() => setIsAiPanelOpen(false)}>
                      <XCircle className="h-4 w-4"/>
                    </Button>
                  </div>
                  {isAiLoading && (
                    <p className="text-xs text-muted-foreground animate-pulse mb-2">AI is thinking...</p>
                  )}
                  {aiResponse && (
                    <div className="p-2 bg-muted rounded text-xs mb-2 max-h-20 overflow-y-auto">
                      <MathRenderer text={aiResponse} />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input 
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., Why do we use this formula?"
                      disabled={isAiLoading}
                      className="text-sm"
                    />
                    <Button onClick={handleAskAi} disabled={isAiLoading} size="sm">
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsAiPanelOpen(true)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {revealedStepIndex < example.segments.length - 1 ? (
                <Button onClick={handleContinue}>Continue</Button>
              ) : (
                <Button disabled>Complete</Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

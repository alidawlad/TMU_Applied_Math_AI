
"use client";

import { useState, useEffect, useRef } from 'react';
import type { Lecture, ModuleContent, Example, LectureContentSegment } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { MathRenderer } from "./MathRenderer";
import { Logo } from './icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PanelLeftOpen, PanelLeftClose, ArrowLeft, Lightbulb } from 'lucide-react';
import { explainExampleStepAction } from '@/lib/actions';
import Link from 'next/link';
import { AiPanel } from './AiPanel';
import { FloatingContinueButton } from './FloatingContinueButton';
import { useProgressTracking } from '@/lib/hooks/useProgressTracking';
import { useLearningContext } from '@/lib/contexts/LearningContext';
import { useUnifiedProgress } from '@/lib/hooks/useUnifiedProgress';
import { UnifiedNavigation, NavigationModeSwitch } from './UnifiedNavigation';

interface LectureContentDisplayProps {
  lecture: Lecture;
  module: ModuleContent;
  example: Example;
}

function renderSegment(segment: LectureContentSegment, index: number) {
    switch(segment.type) {
        case 'heading':
            return <h2 key={index} className="font-headline text-3xl md:text-4xl font-bold mt-12 mb-6 text-primary/95 border-b pb-4"><MathRenderer text={segment.text!} /></h2>;
        case 'subheading':
            return <h3 key={index} className="font-headline text-2xl md:text-3xl font-semibold mt-10 mb-4 text-gray-800"><MathRenderer text={segment.text!} /></h3>;
        case 'paragraph':
            return <p key={index} className="text-base md:text-lg leading-relaxed my-4 text-gray-700"><MathRenderer text={segment.text!} /></p>;
        case 'list':
            return <ul key={index} className="list-disc list-inside space-y-2 my-4 pl-4 text-lg">{segment.items!.map((item, i) => <li key={i}><MathRenderer text={item} /></li>)}</ul>
        case 'numbered-list':
             return <ol key={index} className="list-decimal list-inside space-y-3 my-6 pl-4 text-lg">{segment.items!.map((item, i) => <li key={i} className="pl-2"><MathRenderer text={item} /></li>)}</ol>
        case 'math':
            return <div key={index} className="flex justify-center my-6 p-3 md:p-4 bg-muted/50 rounded-lg text-base sm:text-lg md:text-xl overflow-x-auto"><MathRenderer text={`$$${segment.text}$$`} /></div>;
        case 'callout': {
            const calloutColor = segment.emphasis === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 
                                segment.emphasis === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                                segment.emphasis === 'danger' ? 'bg-red-50 border-red-200 text-red-800' :
                                'bg-blue-50 border-blue-200 text-blue-800';
            return <div key={index} className={`my-4 md:my-6 p-3 md:p-4 border-l-4 rounded-r-lg ${calloutColor}`}><MathRenderer text={segment.text!} /></div>;
        }
        case 'step-by-step':
            return <div key={index} className="my-4 md:my-6 p-3 md:p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg"><div className="font-semibold text-primary mb-2 text-sm md:text-base">Step-by-Step:</div><MathRenderer text={segment.text!} /></div>;
        case 'pattern-highlight':
            return <div key={index} className="my-4 md:my-6 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg"><div className="font-semibold text-purple-800 mb-2 text-sm md:text-base">Pattern Recognition:</div><MathRenderer text={segment.text!} /></div>;
        case 'summary-box':
            return <div key={index} className="my-4 md:my-6 p-3 md:p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg"><div className="font-semibold text-green-800 mb-2 text-sm md:text-base">Key Takeaway:</div><MathRenderer text={segment.text!} /></div>;
        case 'connection':
            return <div key={index} className="my-4 md:my-6 p-3 md:p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg"><div className="font-semibold text-orange-800 mb-2 text-sm md:text-base">Connection:</div><MathRenderer text={segment.text!} /></div>;
        default:
            return null;
    }
}


export function LectureContentDisplay({ lecture, module, example }: LectureContentDisplayProps) {
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastRevealedRef = useRef<HTMLDivElement>(null);
  
  const { updateExampleProgress, getExampleProgress, markExampleComplete, incrementQuestionCount } = useProgressTracking();
  const { navigateToContent, preserveContext } = useLearningContext();
  const { updateContentProgress, getContentProgress, trackContentAccess } = useUnifiedProgress();

  // Track content access and load progress
  useEffect(() => {
    trackContentAccess(example.id);
    
    // Load from both old and new progress systems
    const savedProgress = getExampleProgress(example.id);
    const unifiedProgress = getContentProgress(example.id);
    
    if (unifiedProgress?.revealedStepIndex !== undefined) {
      setRevealedStepIndex(unifiedProgress.revealedStepIndex);
    } else if (savedProgress) {
      setRevealedStepIndex(savedProgress.revealedStepIndex);
    }
    
    // Preserve navigation context
    preserveContext({
      previousContent: {
        type: 'example',
        id: example.id,
        moduleId: module.id,
        lectureId: lecture.id
      }
    });
  }, [example.id, module.id, lecture.id, getExampleProgress, getContentProgress, trackContentAccess, preserveContext]);

  // Save progress when step index changes
  useEffect(() => {
    // Update both old and new progress systems for now (migration period)
    updateExampleProgress(example.id, { revealedStepIndex });
    updateContentProgress(example.id, 'example', { 
      revealedStepIndex,
      timeSpent: 1000 // Add 1 second per step reveal
    });
  }, [revealedStepIndex, example.id, updateExampleProgress, updateContentProgress]);

  // Auto-scroll to newly revealed content
  useEffect(() => {
    if (lastRevealedRef.current && revealedStepIndex > 0) {
      setTimeout(() => {
        lastRevealedRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [revealedStepIndex]);

  const handleContinue = () => {
    if (revealedStepIndex < example.segments.length - 1) {
      setRevealedStepIndex(prev => prev + 1);
    } else {
      markExampleComplete(example.id, example.segments.length);
    }
  };

  const handleAskAi = async (question: string): Promise<string> => {
    incrementQuestionCount(example.id);
    
    const revealedContent = example.segments
      .slice(0, revealedStepIndex + 1)
      .map(s => s.text || (s.items ? s.items.join(' ') : ''))
      .join('\\n\\n');

    const result = await explainExampleStepAction({
      exampleTitle: example.title,
      revealedSteps: revealedContent,
      userQuestion: question
    });

    return result.explanation || "Sorry, I couldn't generate an explanation for that. Please try rephrasing your question.";
  };

  const relatedPracticeProblems = module.problems.filter(p => example.relatedPracticeProblemIds.includes(p.id));
  const isComplete = revealedStepIndex >= example.segments.length - 1;
  const currentProgress = getExampleProgress(example.id);

  return (
    <div className="flex flex-col h-screen font-sans bg-muted/30">
      {/* Unified Navigation Header */}
      <UnifiedNavigation
        currentMode="study"
        title="Applied Mathematics for Business"
        subtitle={`${module.name} • Step ${revealedStepIndex + 1} of ${example.segments.length}`}
        showProgress={true}
      />
      
      {/* Secondary header with sidebar toggle and mode switch */}
      <div className="bg-primary/90 text-primary-foreground px-4 py-3 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            aria-label="Toggle Sidebar" 
            className="text-primary-foreground hover:bg-white/20"
          >
            {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>
          <div>
            <h2 className="text-lg font-bold font-headline">{example.title}</h2>
          </div>
        </div>
        <NavigationModeSwitch 
          currentContentId={example.id} 
          currentContentType="example" 
        />
      </div>

      <main className="flex-1 flex overflow-hidden">
        {isSidebarOpen && (
          <div className="w-72 lg:w-80 flex-shrink-0 border-r bg-background/50 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="p-4 h-full overflow-y-auto">
              <h3 className="font-headline font-semibold text-lg mb-4 text-wrap">
                Examples in {module.name}
              </h3>
              <div className="space-y-2">
                {module.examples.map(ex => (
                  <Link key={ex.id} href={`/study?example=${ex.id}`} passHref>
                    <Button 
                      variant={example.id === ex.id ? 'secondary' : 'ghost'} 
                      className="w-full justify-start text-left h-auto py-3 px-3 whitespace-normal break-words leading-relaxed"
                      title={ex.title} // Tooltip for full text
                    >
                      <MathRenderer text={ex.title} />
                    </Button>
                  </Link>
                ))}
              </div>
              
              {currentProgress && (
                <div className="mt-6 p-3 bg-background rounded-lg border">
                  <h4 className="font-semibold text-sm mb-2">Progress</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Completed: {currentProgress.completedAt ? 'Yes' : 'No'}</div>
                    <div>Questions Asked: {currentProgress.questionsAsked}</div>
                    <div>Time Spent: {Math.round(currentProgress.timeSpent / 60)}min</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col bg-background">
          {/* AI Panel positioned at top of content area */}
          <div className="border-b bg-background/95 backdrop-blur-sm -mx-px">
            <AiPanel
              onQuestionSubmit={handleAskAi}
              isOpen={isAiPanelOpen}
              onToggle={setIsAiPanelOpen}
              context={`Steps 1-${revealedStepIndex + 1} of ${example.title}`}
              className="mx-auto max-w-4xl px-4 py-4"
            />
          </div>

          {/* Main content area */}
          <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 text-primary/90">
                <MathRenderer text={example.title} />
              </h1>
              
              <div className="prose-lg max-w-none">
                {example.segments.slice(0, revealedStepIndex + 1).map((segment, index) => (
                  <div 
                    key={index}
                    ref={index === revealedStepIndex ? lastRevealedRef : null}
                    className={index === revealedStepIndex ? 'animate-fade-in' : ''}
                  >
                    {renderSegment(segment, index)}
                  </div>
                ))}
              </div>

              {isComplete && (
                <Card className="mt-16 bg-muted/50 border-dashed">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                      <Lightbulb className="h-8 w-8 text-primary" />
                      Practice This Concept
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      You've completed the example. Solidify your understanding by trying these related practice problems.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedPracticeProblems.map(p => (
                        <Button 
                          key={p.id}
                          variant="outline" 
                          className="w-full h-full text-left flex flex-col items-start p-4 justify-start hover:bg-accent"
                          onClick={() => navigateToContent(p.id, 'problem', {
                            previousContent: {
                              type: 'example',
                              id: example.id,
                              moduleId: module.id,
                              lectureId: lecture.id
                            }
                          })}
                        >
                          <span className="font-semibold break-words">
                            <MathRenderer text={p.title} />
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">{p.id}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Continue Button */}
      <FloatingContinueButton
        onContinue={handleContinue}
        isComplete={isComplete}
        show={!isAiPanelOpen}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

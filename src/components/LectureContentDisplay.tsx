
"use client";

import { useState } from 'react';
import type { Lecture, ModuleContent, Example, LectureContentSegment, Problem } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MathRenderer } from "./MathRenderer";
import { Logo } from './icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Send, MessageSquare, XCircle, PanelLeftOpen, PanelLeftClose, ArrowLeft, Lightbulb } from 'lucide-react';
import { explainExampleStepAction } from '@/lib/actions';
import Link from 'next/link';
import { lectures } from '@/lib/content';

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
            return <div key={index} className="flex justify-center my-6 p-4 bg-muted/50 rounded-lg text-lg md:text-xl"><MathRenderer text={`$$${segment.text}$$`} /></div>;
        default:
            return null;
    }
}


export function LectureContentDisplay({ lecture, module, example }: LectureContentDisplayProps) {
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleContinue = () => {
    if (revealedStepIndex < example.segments.length - 1) {
        setRevealedStepIndex(i => i + 1);
    }
  }
  
  const handleAskAi = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");

    const revealedContent = example.segments
        .slice(0, revealedStepIndex + 1)
        .map(s => s.text || (s.items ? s.items.join(' ') : ''))
        .join('\n\n');

    const result = await explainExampleStepAction({
        exampleTitle: example.title,
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

  const relatedPracticeProblems = module.problems.filter(p => example.relatedPracticeProblemIds.includes(p.id));

  return (
    <div className="flex flex-col h-screen font-sans bg-muted/30">
        <header className="flex-shrink-0">
          <div className="bg-background border-b px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/study-plan" passHref>
                <Button variant="ghost" size="icon" aria-label="Back to Study Plan">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Logo className="h-8 w-8 text-primary hidden md:block" />
              <h1 className="text-lg font-semibold font-headline">Applied Mathematics for Business</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle Sidebar">
                    {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                </Button>
            </div>
          </div>
           <div className="bg-primary/90 text-primary-foreground px-4 h-16 flex items-center justify-between backdrop-blur-sm">
             <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold font-headline">{lecture.title}</h2>
                    <p className="text-xs text-primary-foreground/80">{module.name}</p>
                </div>
             </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
            {isSidebarOpen && (
              <div className="w-72 flex-shrink-0 border-r bg-background/50 p-4 transition-all duration-300 ease-in-out">
                  <h3 className="font-headline font-semibold text-lg mb-4">Examples in {module.name}</h3>
                  <div className="space-y-2">
                      {module.examples.map(ex => (
                         <Link key={ex.id} href={`/study?example=${ex.id}`} passHref>
                            <Button 
                                variant={example.id === ex.id ? 'secondary' : 'ghost'} 
                                className="w-full justify-start text-left h-auto py-2"
                            >
                                {ex.title}
                            </Button>
                         </Link>
                      ))}
                  </div>
              </div>
            )}

            <div className="flex-1 bg-background p-6 md:p-12 overflow-y-auto pb-64">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-8 text-primary/90">{example.title}</h1>
                    <div className="prose-lg max-w-none">
                        {example.segments.slice(0, revealedStepIndex + 1).map((segment, index) => (
                           <div key={index}>
                             {renderSegment(segment, index)}
                           </div>
                        ))}
                    </div>

                    {revealedStepIndex >= example.segments.length - 1 && (
                        <Card className="mt-16 bg-muted/50 border-dashed">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                    <Lightbulb className="h-8 w-8 text-primary" />
                                    Practice This Concept
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">You've completed the example. Solidify your understanding by trying these related practice problems.</p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {relatedPracticeProblems.map(p => (
                                    <Link key={p.id} href={`/practice?problem=${p.id}`} passHref>
                                        <Button variant="outline" className="w-full h-full text-left flex flex-col items-start p-4 justify-start">
                                            <span className="font-semibold"><MathRenderer text={p.title} /></span>
                                            <span className="text-xs text-muted-foreground mt-1">{p.id}</span>
                                        </Button>
                                    </Link>
                                ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t z-10">
            <div className="max-w-4xl mx-auto w-full">
                 <div className="flex items-start gap-4 justify-between">
                    <div>
                        {isAiPanelOpen ? (
                            <Card className="p-4 shadow-lg w-full max-w-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-sm">Ask a question about the revealed content</h4>
                                    <Button variant="ghost" size="icon" onClick={() => setIsAiPanelOpen(false)}><XCircle className="h-5 w-5"/></Button>
                                </div>
                                {isAiLoading && <p className="text-sm text-muted-foreground animate-pulse mb-2">AI is thinking...</p>}
                                {aiResponse && <div className="p-3 bg-muted rounded-md text-sm mb-2"><MathRenderer text={aiResponse} /></div>}
                                <div className="flex gap-2">
                                    <Input 
                                        value={aiQuestion}
                                        onChange={(e) => setAiQuestion(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                                        placeholder="e.g., Can you explain why a(n) is used?"
                                        disabled={isAiLoading}
                                    />
                                    <Button onClick={handleAskAi} disabled={isAiLoading} size="icon"><Send className="h-4 w-4" /></Button>
                                </div>
                            </Card>
                        ) : (
                             <Button variant="outline" onClick={() => setIsAiPanelOpen(true)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Ask AI a Question
                            </Button>
                        )}
                    </div>
                     <div className="flex flex-col gap-2">
                        {revealedStepIndex < example.segments.length - 1 && (
                            <Button size="lg" onClick={handleContinue}>Continue</Button>
                        )}
                        {revealedStepIndex >= example.segments.length - 1 && (
                            <Button size="lg" disabled>Example Complete</Button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}

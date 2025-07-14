"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Send, MessageSquare, XCircle, Sparkles } from "lucide-react";
import { MathRenderer } from "./MathRenderer";
import { cn } from "@/lib/utils";

interface AiPanelProps {
  onQuestionSubmit: (question: string) => Promise<string>;
  className?: string;
  position?: 'top' | 'bottom' | 'modal';
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  context?: string;
}

export function AiPanel({ 
  onQuestionSubmit, 
  className,
  position = 'top',
  isOpen,
  onToggle,
  context 
}: AiPanelProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setResponse("");

    try {
      const result = await onQuestionSubmit(question);
      setResponse(result);
    } catch (error) {
      setResponse("Sorry, I couldn't generate an explanation. Please try rephrasing your question.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("flex justify-start", className)}>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onToggle(true)}
          className="bg-white/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-200"
        >
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          Ask AI
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <Card className="shadow-lg border-primary/20 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-sm text-gray-900">Ask about the content</h4>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onToggle(false)}
              className="hover:bg-gray-100"
            >
              <XCircle className="h-4 w-4"/>
            </Button>
          </div>
          
          {isLoading && (
            <div className="mb-3 p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <p className="text-sm text-blue-800">AI is thinking...</p>
              </div>
            </div>
          )}
          
          {response && (
            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200 max-h-32 overflow-y-auto">
              <div className="text-sm text-gray-800">
                <MathRenderer text={response} />
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Can you explain this step in more detail?"
              disabled={isLoading}
              className="text-sm border-gray-300 focus:border-primary focus:ring-primary/20"
            />
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !question.trim()} 
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {context && (
            <p className="text-xs text-gray-500 mt-2">
              Ask about: {context}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
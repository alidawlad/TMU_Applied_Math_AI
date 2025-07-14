"use client";

import { lectures } from "@/lib/data";
import type { Lecture, Module, Problem } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { MathRenderer } from "./MathRenderer";
import { Separator } from "./ui/separator";

interface ProblemSidebarProps {
  currentLectureId: string;
  onLectureChange: (lectureId: string) => void;
  currentModuleId: string;
  onModuleChange: (moduleId: string) => void;
  currentProblemIndex: number;
  onProblemChange: (problemIndex: number) => void;
}

export function ProblemSidebar({
  currentLectureId,
  onLectureChange,
  currentModuleId,
  onModuleChange,
  currentProblemIndex,
  onProblemChange
}: ProblemSidebarProps) {

  const handleLectureSelect = (lectureId: string) => {
    onLectureChange(lectureId);
  }

  const handleModuleSelect = (moduleId: string) => {
    onModuleChange(moduleId);
  }
  
  const currentLecture = lectures.find(l => l.id === currentLectureId) as Lecture;
  const currentModule = currentLecture.modules.find(m => m.id === currentModuleId) as Module;
  
  const leadExamples = currentModule.problems.filter(p => p.type === 'lead-example');
  const practiceProblems = currentModule.problems.filter(p => p.type === 'practice');

  return (
    <div className="w-80 flex-shrink-0 border-r bg-background/50 flex flex-col">
      <div className="p-4 space-y-4 border-b">
        <div>
          <Label htmlFor="lecture-select" className="text-xs text-muted-foreground">Lecture</Label>
          <Select value={currentLectureId} onValueChange={handleLectureSelect}>
            <SelectTrigger id="lecture-select" className="w-full bg-background">
              <SelectValue placeholder="Select a lecture" />
            </SelectTrigger>
            <SelectContent>
              {lectures.map(lecture => (
                <SelectItem key={lecture.id} value={lecture.id}>{lecture.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="module-select" className="text-xs text-muted-foreground">Module / Skill Set</Label>
          <Select value={currentModuleId} onValueChange={handleModuleSelect}>
            <SelectTrigger id="module-select" className="w-full bg-background">
              <SelectValue placeholder="Select a module" />
            </SelectTrigger>
            <SelectContent>
              {currentLecture.modules.map(module => (
                <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <RadioGroup 
            value={String(currentProblemIndex)} 
            onValueChange={(value) => onProblemChange(Number(value))}
            className="p-2"
          >
          {leadExamples.length > 0 && (
            <div className="px-2">
              <h3 className="mb-2 mt-2 text-sm font-semibold text-muted-foreground tracking-wider uppercase">Lead Examples</h3>
              {leadExamples.map((problem) => {
                const index = currentModule.problems.findIndex(p => p.id === problem.id);
                return (
                  <Label 
                    key={problem.id} 
                    htmlFor={`problem-${index}`}
                    className={`flex items-start gap-3 rounded-md p-3 text-sm font-medium cursor-pointer hover:bg-accent/50 transition-colors ${currentProblemIndex === index ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <RadioGroupItem value={String(index)} id={`problem-${index}`} className="mt-0.5"/>
                    <span className="flex-1"><MathRenderer text={problem.title} /></span>
                  </Label>
                )
              })}
            </div>
          )}

          {practiceProblems.length > 0 && (
             <div className="mt-4 px-2">
              <Separator className="mb-4" />
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground tracking-wider uppercase">Practice Problems</h3>
               {practiceProblems.map((problem) => {
                 const index = currentModule.problems.findIndex(p => p.id === problem.id);
                 return (
                  <Label 
                    key={problem.id} 
                    htmlFor={`problem-${index}`}
                    className={`flex items-start gap-3 rounded-md p-3 text-sm font-medium cursor-pointer hover:bg-accent/50 transition-colors ${currentProblemIndex === index ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    <RadioGroupItem value={String(index)} id={`problem-${index}`} className="mt-0.5" />
                    <span className="flex-1"><MathRenderer text={problem.title} /></span>
                  </Label>
                 )
               })}
             </div>
          )}

        </RadioGroup>
      </ScrollArea>
    </div>
  );
}

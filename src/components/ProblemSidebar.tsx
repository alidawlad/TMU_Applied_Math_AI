"use client";

import { lectures } from "@/lib/data";
import type { Lecture, Module, Problem } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { MathRenderer } from "./MathRenderer";

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
  
  return (
    <div className="w-64 flex-shrink-0 border-r bg-background flex flex-col">
      <div className="p-4 space-y-4 border-b">
        <div>
          <Label htmlFor="lecture-select" className="text-xs text-muted-foreground">Lecture</Label>
          <Select value={currentLectureId} onValueChange={handleLectureSelect}>
            <SelectTrigger id="lecture-select" className="w-full">
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
            <SelectTrigger id="module-select" className="w-full">
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
        <div className="p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Question List</h3>
          <RadioGroup 
            value={String(currentProblemIndex)} 
            onValueChange={(value) => onProblemChange(Number(value))}
            className="space-y-1"
          >
            {currentModule.problems.map((problem, index) => (
              <Label 
                key={problem.id} 
                htmlFor={`problem-${index}`}
                className={`flex items-center gap-3 rounded-md p-2 -ml-2 text-sm font-normal cursor-pointer hover:bg-accent/50 transition-colors ${currentProblemIndex === index ? 'bg-accent text-accent-foreground' : ''}`}
              >
                <RadioGroupItem value={String(index)} id={`problem-${index}`} />
                <span>Question {index + 1}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </ScrollArea>
    </div>
  );
}

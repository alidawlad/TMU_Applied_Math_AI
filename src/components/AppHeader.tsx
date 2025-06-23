import { Button } from "@/components/ui/button";
import { DateTime } from "@/components/DateTime";
import { Logo } from "@/components/icons";
import { Menu, HelpCircle } from "lucide-react";
import type { Lecture, Problem } from "@/lib/types";
import { Timer } from "./Timer";

interface AppHeaderProps {
    lecture: Lecture;
    problem: Problem;
    problemIndex: number;
    totalProblems: number;
}

export function AppHeader({ lecture, problem, problemIndex, totalProblems }: AppHeaderProps) {
  return (
    <header className="flex-shrink-0">
      <div className="bg-background border-b px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary hidden md:block" />
          <h1 className="text-lg font-semibold font-headline">Applied Mathematics for Business</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Ali Houssein</span>
          <DateTime />
          <HelpCircle className="h-5 w-5 text-muted-foreground cursor-pointer" />
        </div>
      </div>
      <div className="bg-primary/90 text-primary-foreground px-4 h-16 flex items-center justify-between backdrop-blur-sm">
         <div className="flex items-center gap-4">
            <Menu className="h-6 w-6" />
            <div className="hidden md:block">
                <h2 className="text-xl font-bold font-headline">{lecture.title}</h2>
                <p className="text-xs text-primary-foreground/80">{lecture.modules.find(m => m.problems.some(p => p.id === problem.id))?.name}</p>
            </div>
         </div>
         <div className="flex items-center gap-2 text-sm text-center">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">&lt;</Button>
             <div>
                <p className="font-bold">Question {problemIndex + 1} of {totalProblems}</p>
                <p className="text-xs text-primary-foreground/80">{problem.source}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">&gt;</Button>
         </div>
         <div className="flex items-center gap-4">
            <Timer resetKey={problem.id}/>
            <Button className="bg-background text-primary hover:bg-background/90">Save</Button>
         </div>
      </div>
    </header>
  );
}

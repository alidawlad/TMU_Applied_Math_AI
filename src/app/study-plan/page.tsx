import { lectures } from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StudyPlanTabs } from "@/components/StudyPlanTabs";
import type { ModuleContent, Problem } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { PageErrorBoundary } from "@/components/error-boundaries/PageErrorBoundary";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { OpenSourceFooter } from "@/components/OpenSourceFooter";

export type Topic = {
  name: string;
  skillSets: {
    name: string;
    problems: Problem[];
  }[];
};

function getTopicsFromLectures(): Topic[] {
    const topics: Record<string, Topic> = {};

    lectures.forEach(lecture => {
        lecture.modules.forEach(module => {
            if (!topics[module.name]) {
                topics[module.name] = {
                    name: module.name,
                    skillSets: []
                };
            }
            const skillSets: Record<string, Problem[]> = {};
            module.problems.forEach(problem => {
                const skill = problem.skill || 'General';
                if (!skillSets[skill]) {
                    skillSets[skill] = [];
                }
                skillSets[skill].push(problem);
            });
            for(const skill in skillSets) {
                topics[module.name].skillSets.push({
                    name: skill,
                    problems: skillSets[skill]
                });
            }
        });
    });

    return Object.values(topics);
}

const topics = getTopicsFromLectures();


export default function StudyPlanPage() {
  return (
    <PageErrorBoundary pageName="StudyPlan">
      <div className="min-h-screen bg-muted/40">
        <header className="bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <Link href="/" passHref>
                          <Button variant="ghost" size="icon">
                              <ArrowLeft className="h-5 w-5" />
                          </Button>
                      </Link>
                      <h1 className="text-xl font-headline font-semibold">Study Plan</h1>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium">
                     <span>Ali Houssein</span>
                     <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
              </div>
          </div>
        </header>

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <StudyPlanTabs lectures={lectures} topics={topics} />
        </main>
        
        {/* Open Source Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <OpenSourceFooter variant="minimal" />
        </div>
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </PageErrorBoundary>
  );
}

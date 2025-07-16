"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Play, Target, TrendingUp, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUnifiedProgress } from "@/lib/hooks/useUnifiedProgress";
import { getNextIncompleteContent, findContentPosition, getCurriculumProgress } from "@/lib/progressionUtils";
import { lectures } from "@/lib/content";
import { MathRenderer } from "./MathRenderer";

export function ContinueLearning() {
  const router = useRouter();
  const { progressData, isLoaded } = useUnifiedProgress();
  const [lastAccessedProblem, setLastAccessedProblem] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded) {
      // Find the most recently accessed problem
      const recentProblems = Object.entries(progressData.contentProgress)
        .filter(([, progress]) => progress.contentType === 'problem')
        .sort((a, b) => b[1].lastAccessedAt.getTime() - a[1].lastAccessedAt.getTime());
      
      if (recentProblems.length > 0) {
        setLastAccessedProblem(recentProblems[0][0]);
      }
    }
  }, [progressData, isLoaded]);

  if (!isLoaded) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Continue Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-16 bg-muted rounded animate-pulse" />
            <div className="h-10 bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedProblems = Object.keys(progressData.contentProgress).filter(
    contentId => progressData.contentProgress[contentId].isCompleted
  );

  const curriculumProgress = getCurriculumProgress(completedProblems);
  const nextIncompleteContent = getNextIncompleteContent(completedProblems);

  // Get last accessed problem details
  const lastAccessedDetails = lastAccessedProblem ? findContentPosition(lastAccessedProblem) : null;
  const lastAccessedLecture = lastAccessedDetails ? lectures.find(l => l.id === lastAccessedDetails.lectureId) : null;
  const lastAccessedModule = lastAccessedLecture && lastAccessedDetails ? lastAccessedLecture.modules.find(m => m.id === lastAccessedDetails.moduleId) : null;
  const lastAccessedProblemObj = lastAccessedModule && lastAccessedDetails ? lastAccessedModule.problems[lastAccessedDetails.problemIndex] : null;

  const handleContinueFromLastAccessed = () => {
    if (lastAccessedProblem) {
      router.push(`/practice?problem=${lastAccessedProblem}`);
    }
  };

  const handleStartNextProblem = () => {
    if (nextIncompleteContent) {
      router.push(`/practice?problem=${nextIncompleteContent.problem.id}`);
    }
  };

  const handleGoToStudyPlan = () => {
    router.push('/study-plan');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <Badge variant="outline">
              {curriculumProgress.completed}/{curriculumProgress.total} problems
            </Badge>
          </div>
          <Progress value={curriculumProgress.percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {curriculumProgress.percentage.toFixed(1)}% complete
          </p>
        </div>

        {/* Study Time */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {Math.round(progressData.overallStats.totalTimeSpent / 60000)}min studied
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>
              {progressData.overallStats.completedContent} completed
            </span>
          </div>
        </div>

        {/* Last Accessed Problem */}
        {lastAccessedProblem && lastAccessedProblemObj && lastAccessedLecture && lastAccessedModule && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Last Accessed
            </h4>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {lastAccessedLecture.title} → {lastAccessedModule.name}
              </div>
              <div className="font-medium">
                <MathRenderer text={lastAccessedProblemObj.title} />
              </div>
              <div className="text-xs text-muted-foreground">
                {progressData.contentProgress[lastAccessedProblem].isCompleted ? 
                  'Completed' : 'In Progress'} • {lastAccessedProblemObj.steps.length} steps
              </div>
            </div>
            <Button 
              onClick={handleContinueFromLastAccessed}
              size="sm"
              className="mt-3"
            >
              Continue Here
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Next Recommended Problem */}
        {nextIncompleteContent && (
          <div className="border rounded-lg p-4 bg-primary/5">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Play className="h-4 w-4" />
              Next Recommended
            </h4>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {lectures.find(l => l.id === nextIncompleteContent.lectureId)?.title} → {
                  lectures.find(l => l.id === nextIncompleteContent.lectureId)?.modules.find(m => m.id === nextIncompleteContent.moduleId)?.name
                }
              </div>
              <div className="font-medium">
                <MathRenderer text={nextIncompleteContent.problem.title} />
              </div>
              <div className="text-xs text-muted-foreground">
                {nextIncompleteContent.problem.steps.length} steps
              </div>
            </div>
            <Button 
              onClick={handleStartNextProblem}
              size="sm"
              className="mt-3"
            >
              Start Problem
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* All Problems Complete */}
        {!nextIncompleteContent && (
          <div className="text-center py-8">
            <div className="text-green-600 mb-4">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <h4 className="font-medium mb-2">All Problems Complete!</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Congratulations! You've completed the entire curriculum.
            </p>
            <Button onClick={handleGoToStudyPlan} variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              View Study Plan
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={handleGoToStudyPlan}
            variant="outline"
            className="flex-1"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Study Plan
          </Button>
          {nextIncompleteContent && (
            <Button 
              onClick={handleStartNextProblem}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Learning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { CheckCircle2, Trophy, Star, ArrowRight, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ProgressCard, 
  ProgressRing, 
  ProgressStats, 
  ProgressIndicator,
  EnhancedProgress 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  formatProgressText, 
  getProgressColor,
  calculateTimeMetrics,
  formatDuration,
  getMasteryLevel,
  generateProgressInsights
} from "@/lib/utils/progressUtils";
import { MathRenderer } from "./MathRenderer";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface CelebrationProps {
  onContinue: () => void;
  onBackToStudyPlan: () => void;
  isProgressing?: boolean;
}

export interface ModuleCelebrationProps extends CelebrationProps {
  moduleName: string;
  moduleDescription: string;
  problemsCompleted: number;
  totalProblems: number;
  nextModuleName?: string;
}

export interface LectureCelebrationProps extends CelebrationProps {
  lectureTitle: string;
  modulesCompleted: number;
  totalModules: number;
  totalProblemsCompleted: number;
  nextLectureTitle?: string;
}

export interface CurriculumCelebrationProps {
  totalProblems: number;
  totalModules: number;
  totalLectures: number;
  totalTimeSpent: number; // in minutes
  onBackToStudyPlan: () => void;
}

// Animated celebration effects
const CelebrationEffects = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <div className="relative">
      {show && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-bounce text-yellow-400 text-6xl absolute top-4 left-1/4">⭐</div>
          <div className="animate-bounce text-yellow-400 text-4xl absolute top-8 right-1/3 animation-delay-200">✨</div>
          <div className="animate-bounce text-yellow-400 text-5xl absolute top-12 left-1/2 animation-delay-400">🎉</div>
        </div>
      )}
    </div>
  );
};

// Module completion celebration
export function ModuleCelebration({
  moduleName,
  moduleDescription,
  problemsCompleted,
  totalProblems,
  nextModuleName,
  onContinue,
  onBackToStudyPlan,
  isProgressing = false
}: ModuleCelebrationProps) {
  const progressData = createProgressData(problemsCompleted, totalProblems);
  const insights = generateProgressInsights(progressData, 90, 1); // Mock high performance for celebration
  return (
    <div className="relative">
      <CelebrationEffects />
      <Card className="max-w-2xl mx-auto border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-headline text-green-800">
            Module Mastered! 🎯
          </CardTitle>
          <p className="text-green-700 text-lg">
            Congratulations! You've completed <strong>{moduleName}</strong>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              <MathRenderer text={moduleDescription} />
            </p>
            <div className="flex justify-center items-center gap-4 py-4">
              <Badge variant="secondary" className="text-sm">
                <Trophy className="h-4 w-4 mr-1" />
                {problemsCompleted} problems solved
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Target className="h-4 w-4 mr-1" />
                100% completion
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-6">
              <ProgressRing 
                value={problemsCompleted} 
                max={totalProblems} 
                size={80} 
                strokeWidth={6}
                variant="success"
                showText={true}
              />
              <div className="space-y-2">
                <EnhancedProgress 
                  value={100} 
                  className="h-4 w-48" 
                  size="lg"
                  variant="success"
                  animated={true}
                  showPercentage={true}
                  gradient={true}
                />
                <p className="text-sm text-center text-muted-foreground">
                  {formatProgressText(progressData)} problems completed
                </p>
              </div>
            </div>
            
            {/* Progress insights */}
            {insights.length > 0 && (
              <div className="bg-white/50 rounded-lg p-3 border border-green-200">
                <div className="space-y-1">
                  {insights.map((insight, index) => (
                    <p key={index} className="text-sm text-green-700">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {nextModuleName && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Ready for the next challenge?</h4>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Next Module:</strong> {nextModuleName}
              </p>
              <Button onClick={onContinue} className="w-full" size="lg" disabled={isProgressing}>
                {isProgressing ? "Loading..." : "Continue to Next Module"}
                {!isProgressing && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            {!nextModuleName && (
              <Button onClick={onContinue} size="lg" disabled>
                All modules completed!
              </Button>
            )}
            <Button onClick={onBackToStudyPlan} variant="outline" size="lg">
              <BookOpen className="mr-2 h-4 w-4" />
              Back to Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Lecture completion celebration
export function LectureCelebration({
  lectureTitle,
  modulesCompleted,
  totalModules,
  totalProblemsCompleted,
  nextLectureTitle,
  onContinue,
  onBackToStudyPlan
}: LectureCelebrationProps) {
  const moduleProgressData = createProgressData(modulesCompleted, totalModules);
  const insights = generateProgressInsights(moduleProgressData, 95, 1); // Mock excellent performance
  return (
    <div className="relative">
      <CelebrationEffects />
      <Card className="max-w-2xl mx-auto border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Trophy className="h-20 w-20 text-purple-600" />
          </div>
          <CardTitle className="text-3xl font-headline text-purple-800">
            Lecture Completed! 🏆
          </CardTitle>
          <p className="text-purple-700 text-xl">
            Outstanding work! You've mastered <strong>{lectureTitle}</strong>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-6 mb-6">
            <ProgressRing 
              value={modulesCompleted} 
              max={totalModules} 
              size={100} 
              strokeWidth={8}
              variant="success"
              showText={true}
            />
            <ProgressStats
              stats={[
                {
                  label: "Modules Completed",
                  value: modulesCompleted,
                  icon: <Target className="h-4 w-4" />,
                  color: "text-purple-600"
                },
                {
                  label: "Problems Solved",
                  value: totalProblemsCompleted,
                  icon: <Trophy className="h-4 w-4" />,
                  color: "text-purple-600"
                }
              ]}
              layout="vertical"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ProgressCard
              title="Modules Completed"
              value={modulesCompleted}
              max={totalModules}
              icon={<Target className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
            />
            <ProgressCard
              title="Problems Solved"
              value={totalProblemsCompleted}
              max={totalProblemsCompleted}
              icon={<Trophy className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
              showBadge={false}
            />
          </div>

          <div className="flex justify-center items-center gap-4 py-4">
            <Badge variant="secondary" className="text-sm">
              <Star className="h-4 w-4 mr-1" />
              Lecture Expert
            </Badge>
            <Badge variant="outline" className="text-sm">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              {formatProgressText(moduleProgressData)} modules
            </Badge>
          </div>
          
          {/* Progress insights */}
          {insights.length > 0 && (
            <div className="bg-white/50 rounded-lg p-3 border border-purple-200">
              <div className="space-y-1">
                {insights.map((insight, index) => (
                  <p key={index} className="text-sm text-purple-700">
                    {insight}
                  </p>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {nextLectureTitle && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Ready for the next adventure?</h4>
              <p className="text-blue-800 text-sm mb-3">
                <strong>Next Lecture:</strong> {nextLectureTitle}
              </p>
              <Button onClick={onContinue} className="w-full" size="lg">
                Continue to Next Lecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            {!nextLectureTitle && (
              <Button onClick={onContinue} size="lg" disabled>
                All lectures completed!
              </Button>
            )}
            <Button onClick={onBackToStudyPlan} variant="outline" size="lg">
              <BookOpen className="mr-2 h-4 w-4" />
              Back to Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Curriculum completion celebration
export function CurriculumCelebration({
  totalProblems,
  totalModules,
  totalLectures,
  totalTimeSpent,
  onBackToStudyPlan
}: CurriculumCelebrationProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  const curriculumProgressData = createProgressData(totalProblems, totalProblems);
  const insights = generateProgressInsights(curriculumProgressData, 100, 1); // Perfect completion

  return (
    <div className="relative">
      <CelebrationEffects />
      <Card className="max-w-3xl mx-auto border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Trophy className="h-24 w-24 text-yellow-600" />
              <div className="absolute -top-2 -right-2">
                <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-headline text-yellow-800">
            Curriculum Mastered! 🎓
          </CardTitle>
          <p className="text-yellow-700 text-xl">
            Incredible achievement! You've completed the entire Applied Mathematics curriculum!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="flex items-center justify-center gap-8 mb-8">
            <ProgressRing 
              value={totalProblems} 
              max={totalProblems} 
              size={120} 
              strokeWidth={10}
              variant="success"
              showText={true}
            />
            <ProgressStats
              stats={[
                {
                  label: "Lectures",
                  value: totalLectures,
                  icon: <BookOpen className="h-5 w-5" />,
                  color: "text-yellow-600"
                },
                {
                  label: "Modules",
                  value: totalModules,
                  icon: <Target className="h-5 w-5" />,
                  color: "text-yellow-600"
                },
                {
                  label: "Problems",
                  value: totalProblems,
                  icon: <Trophy className="h-5 w-5" />,
                  color: "text-yellow-600"
                },
                {
                  label: "Time Spent",
                  value: totalTimeSpent,
                  icon: <Star className="h-5 w-5" />,
                  color: "text-yellow-600"
                }
              ]}
              layout="horizontal"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProgressCard
              title="Lectures"
              value={totalLectures}
              max={totalLectures}
              icon={<BookOpen className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
              showBadge={false}
            />
            <ProgressCard
              title="Modules"
              value={totalModules}
              max={totalModules}
              icon={<Target className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
              showBadge={false}
            />
            <ProgressCard
              title="Problems"
              value={totalProblems}
              max={totalProblems}
              icon={<Trophy className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
              showBadge={false}
            />
            <ProgressCard
              title="Time Spent"
              value={totalTimeSpent}
              max={totalTimeSpent}
              icon={<Star className="h-5 w-5" />}
              variant="success"
              size="md"
              isComplete={true}
              showBadge={false}
            />
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-4 py-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Trophy className="h-5 w-5 mr-2" />
                Applied Math Expert
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Star className="h-5 w-5 mr-2" />
                100% Complete
              </Badge>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2 text-lg">🎉 Congratulations!</h4>
              <p className="text-yellow-800 text-base">
                You've demonstrated mastery of applied mathematics concepts including sequences, series, 
                functions, and mathematical modeling. You're now ready to tackle advanced mathematical 
                challenges in business and academic settings!
              </p>
            </div>
            
            {/* Progress insights */}
            {insights.length > 0 && (
              <div className="bg-white/50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Your Achievement</h4>
                <div className="space-y-1">
                  {insights.map((insight, index) => (
                    <p key={index} className="text-sm text-yellow-800">
                      {insight}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={onBackToStudyPlan} size="lg" className="px-8">
              <BookOpen className="mr-2 h-4 w-4" />
              Return to Study Plan
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                <Trophy className="mr-2 h-4 w-4" />
                View Certificate
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
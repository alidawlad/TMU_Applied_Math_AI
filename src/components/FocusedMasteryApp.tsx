"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { lectures } from "@/lib/content";
import { AppHeader } from "./AppHeader";
import { ProblemSidebar } from "./ProblemSidebar";
import { ProblemDisplay } from "./ProblemDisplay";
import { Skeleton } from "./ui/skeleton";
import { DrawingCanvas } from "./DrawingCanvas";
import { DrawingToolbar } from "./DrawingToolbar";
import { Logo } from "@/components/icons";
import { useSearchParams, useRouter } from 'next/navigation'
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MathRenderer } from "./MathRenderer";
import { ModuleCelebration, LectureCelebration, CurriculumCelebration } from "./CompletionCelebration";
import { calculateProgression, type ProgressionState, getModuleProgress } from "@/lib/progressionUtils";
import { useUnifiedProgress } from "@/lib/hooks/useUnifiedProgress";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { useServiceWorker } from "@/hooks/useServiceWorker";


export function FocusedMasteryApp() {
  const [isClient, setIsClient] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams()
  const router = useRouter();
  const problemIdFromUrl = searchParams.get('problem');

  useEffect(() => {
    setIsClient(true);
    
    // Mobile detection and responsive handler - relaxed for tablets
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const { initialLectureId, initialModuleId, initialProblemIndex } = useMemo(() => {
    if (problemIdFromUrl) {
      for (const lecture of lectures) {
        for (const module of lecture.modules) {
          const problemIndex = module.problems.findIndex(p => p.id === problemIdFromUrl);
          if (problemIndex !== -1) {
            return {
              initialLectureId: lecture.id,
              initialModuleId: module.id,
              initialProblemIndex: problemIndex
            };
          }
        }
      }
    }
    // Default to the first problem of the first module of the first lecture
    return {
      initialLectureId: lectures.length > 0 ? lectures[0].id : '',
      initialModuleId: lectures.length > 0 && lectures[0].modules.length > 0 ? lectures[0].modules[0].id : '',
      initialProblemIndex: 0
    };
  }, [problemIdFromUrl]);

  // Memoize expensive computations separately
  const allProblems = useMemo(() => 
    lectures.flatMap(lecture => lecture.modules.flatMap(moduleItem => moduleItem.problems)), 
    [lectures]
  );
  
  const lectureData = useMemo(() => ({
    lectures,
    allProblems
  }), [lectures, allProblems]);

  if (lectureData.allProblems.length === 0) {
    return (
      <div className="flex flex-col h-screen font-sans bg-muted/30">
        <header className="flex-shrink-0">
          <div className="bg-background border-b px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="h-8 w-8 text-primary hidden md:block" />
              <h1 className="text-lg font-semibold font-headline">Applied Mathematics for Business</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-background rounded-lg shadow-md">
            <h2 className="text-2xl font-bold font-headline">Ready for new content!</h2>
            <p className="text-muted-foreground mt-2">
              All lectures have been cleared. Please provide the new curriculum.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // State management
  const [currentLectureId, setCurrentLectureId] = useState(initialLectureId);
  const [currentModuleId, setCurrentModuleId] = useState(initialModuleId);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(initialProblemIndex);
  const [isDrawingModeActive, setIsDrawingModeActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState<ProgressionState | null>(null);
  const [isProgressing, setIsProgressing] = useState(false);
  
  // Progress tracking
  const { progressData, getContentProgress } = useUnifiedProgress();
  
  // Service worker for PWA functionality
  const { isSupported, isInstalled, updateAvailable } = useServiceWorker();

  // Effect to handle direct navigation
  useEffect(() => {
    setCurrentLectureId(initialLectureId);
    setCurrentModuleId(initialModuleId);
    setCurrentProblemIndex(initialProblemIndex);
  }, [initialLectureId, initialModuleId, initialProblemIndex]);


  // Memoized state change handlers to prevent unnecessary re-renders
  const handleLectureChange = useCallback((lectureId: string) => {
    const newLecture = lectures.find(lecture => lecture.id === lectureId)!;
    const newModule = newLecture.modules[0];
    const newProblem = newModule.problems[0];
    setCurrentLectureId(lectureId);
    setCurrentModuleId(newModule.id);
    setCurrentProblemIndex(0);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
    
    // Close mobile sidebar after selection
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [lectures, router, isMobile]);

  const handleModuleChange = useCallback((moduleId: string) => {
    const lecture = lectures.find(lectureItem => lectureItem.id === currentLectureId)!;
    const newModule = lecture.modules.find(moduleItem => moduleItem.id === moduleId)!;
    const newProblem = newModule.problems[0];
    setCurrentModuleId(moduleId);
    setCurrentProblemIndex(0);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
    
    // Close mobile sidebar after selection
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [lectures, currentLectureId, router, isMobile]);

  const handleProblemChange = useCallback((problemIndex: number) => {
    const lecture = lectures.find(lectureItem => lectureItem.id === currentLectureId)!;
    const module = lecture.modules.find(moduleItem => moduleItem.id === currentModuleId)!;
    const newProblem = module.problems[problemIndex];
    setCurrentProblemIndex(problemIndex);
    router.push(`/practice?problem=${newProblem.id}`, { scroll: false });
    
    // Close mobile sidebar after selection
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [lectures, currentLectureId, currentModuleId, router, isMobile]);
  
  const handleNextProblem = useCallback(() => {
    try {
      setIsProgressing(true);
      const progression = calculateProgression(currentLectureId, currentModuleId, currentProblemIndex);
      
      if (progression.type === 'continue' && progression.nextPosition) {
        // Simple case: continue to next problem
        const { lectureId, moduleId, problemIndex } = progression.nextPosition;
        setCurrentLectureId(lectureId);
        setCurrentModuleId(moduleId);
        setCurrentProblemIndex(problemIndex);
        
        const lecture = lectures.find(lectureItem => lectureItem.id === lectureId)!;
        const module = lecture.modules.find(moduleItem => moduleItem.id === moduleId)!;
        const problem = module.problems[problemIndex];
        router.push(`/practice?problem=${problem.id}`, { scroll: false });
      } else {
        // Show celebration screen for module, lecture, or curriculum completion
        setShowCelebration(progression);
      }
    } catch (error) {
      console.error('Error calculating progression:', error);
    } finally {
      setIsProgressing(false);
    }
  }, [lectures, currentLectureId, currentModuleId, currentProblemIndex, router]);

  const toggleDrawingMode = useCallback(() => {
    setIsDrawingModeActive(prev => !prev);
  }, []);
  
  const toggleDesktopSidebar = useCallback(() => {
    setIsDesktopSidebarOpen(prev => !prev);
  }, []);

  // Celebration handlers
  const handleCelebrationContinue = useCallback(() => {
    setIsProgressing(true);
    try {
      if (showCelebration && showCelebration.nextPosition) {
        const { lectureId, moduleId, problemIndex } = showCelebration.nextPosition;
        setCurrentLectureId(lectureId);
        setCurrentModuleId(moduleId);
        setCurrentProblemIndex(problemIndex);
        
        const lecture = lectures.find(lectureItem => lectureItem.id === lectureId)!;
        const module = lecture.modules.find(moduleItem => moduleItem.id === moduleId)!;
        const problem = module.problems[problemIndex];
        router.push(`/practice?problem=${problem.id}`, { scroll: false });
      }
      setShowCelebration(null);
    } catch (error) {
      console.error('Error in celebration continue:', error);
    } finally {
      setIsProgressing(false);
    }
  }, [lectures, showCelebration, router]);

  const handleBackToStudyPlan = useCallback(() => {
    setShowCelebration(null);
    router.push('/study-plan');
  }, [router]);

  // Memoized derived state
  const currentLecture = useMemo(() => lectures.find(lecture => lecture.id === currentLectureId), [lectures, currentLectureId]);
  const currentModule = useMemo(() => currentLecture?.modules.find(moduleItem => moduleItem.id === currentModuleId), [currentLecture, currentModuleId]);
  const currentProblem = useMemo(() => currentModule?.problems[currentProblemIndex], [currentModule, currentProblemIndex]);
  
  // Calculate module progress
  const moduleProgress = useMemo(() => {
    if (!currentLectureId || !currentModuleId) return undefined;
    const completedProblems = Object.keys(progressData.contentProgress).filter(
      contentId => progressData.contentProgress[contentId].isCompleted
    );
    return getModuleProgress(currentLectureId, currentModuleId, completedProblems);
  }, [currentLectureId, currentModuleId, progressData.contentProgress]);

  if (!isClient || !currentLecture || !currentModule || !currentProblem) {
    return (
        <div className="flex h-screen w-full bg-background">
            {/* Mobile Loading State */}
            <div className={cn(
              "border-r bg-background/50 p-4 space-y-4",
              isMobile ? "hidden" : "w-80 flex-shrink-0"
            )}>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-24 mt-4" />
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
            <div className="flex-1 p-4 md:p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-8" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
  }

  // Show celebration if needed
  if (showCelebration) {
    return (
      <div className="flex flex-col h-screen font-sans">
        <AppHeader 
          lecture={currentLecture}
          problem={currentProblem}
          problemIndex={currentProblemIndex}
          totalProblems={currentModule.problems.length}
          onToggleDrawingMode={toggleDrawingMode}
          isDrawingModeActive={isDrawingModeActive}
          module={currentModule}
          moduleProgress={moduleProgress}
        />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-background p-6 md:p-8 overflow-y-auto">
            {showCelebration.type === 'module_complete' && showCelebration.completedInfo && (
              <ModuleCelebration
                moduleName={showCelebration.completedInfo.moduleName!}
                moduleDescription={showCelebration.completedInfo.moduleDescription!}
                problemsCompleted={showCelebration.completedInfo.problemsCompleted!}
                totalProblems={showCelebration.completedInfo.totalProblems!}
                nextModuleName={showCelebration.completedInfo.nextModuleName}
                onContinue={handleCelebrationContinue}
                onBackToStudyPlan={handleBackToStudyPlan}
                isProgressing={isProgressing}
              />
            )}
            {showCelebration.type === 'lecture_complete' && showCelebration.completedInfo && (
              <LectureCelebration
                lectureTitle={showCelebration.completedInfo.lectureTitle!}
                modulesCompleted={showCelebration.completedInfo.modulesCompleted!}
                totalModules={showCelebration.completedInfo.totalModules!}
                totalProblemsCompleted={showCelebration.completedInfo.totalProblemsCompleted!}
                nextLectureTitle={showCelebration.completedInfo.nextLectureTitle}
                onContinue={handleCelebrationContinue}
                onBackToStudyPlan={handleBackToStudyPlan}
              />
            )}
            {showCelebration.type === 'curriculum_complete' && showCelebration.completedInfo && (
              <CurriculumCelebration
                totalProblems={showCelebration.completedInfo.totalProblems!}
                totalModules={showCelebration.completedInfo.totalModules!}
                totalLectures={showCelebration.completedInfo.totalLectures!}
                totalTimeSpent={Math.round(progressData.overallStats.totalTimeSpent / 60000)} // Convert to minutes
                onBackToStudyPlan={handleBackToStudyPlan}
              />
            )}
          </div>
        </main>
      </div>
    );
  }

  const MobileSidebar = () => (
    <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
      <SheetContent side="left" className="p-0 w-80">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <ProblemSidebar 
          currentLectureId={currentLectureId}
          onLectureChange={handleLectureChange}
          currentModuleId={currentModuleId}
          onModuleChange={handleModuleChange}
          currentProblemIndex={currentProblemIndex}
          onProblemChange={handleProblemChange}
          isMobile={true}
        />
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex flex-col h-screen font-sans">
      {isDrawingModeActive && <DrawingCanvas />}
      {isDrawingModeActive && <DrawingToolbar onClose={toggleDrawingMode} />}

      <AppHeader 
        lecture={currentLecture}
        problem={currentProblem}
        problemIndex={currentProblemIndex}
        totalProblems={currentModule.problems.length}
        onToggleDrawingMode={toggleDrawingMode}
        isDrawingModeActive={isDrawingModeActive}
        module={currentModule}
        moduleProgress={moduleProgress}
        isMobile={isMobile}
        onMobileSidebarToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onDesktopSidebarToggle={toggleDesktopSidebar}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
      />
      <main className={cn(
        "flex-1 flex overflow-hidden",
        isDrawingModeActive && "pointer-events-none"
      )}>
        {/* Desktop Sidebar */}
        {!isMobile && isDesktopSidebarOpen && (
          <ProblemSidebar 
            currentLectureId={currentLectureId}
            onLectureChange={handleLectureChange}
            currentModuleId={currentModuleId}
            onModuleChange={handleModuleChange}
            currentProblemIndex={currentProblemIndex}
            onProblemChange={handleProblemChange}
            isMobile={false}
          />
        )}
        
        {/* Mobile Sidebar */}
        {isMobile && <MobileSidebar />}
        
        {/* Main Content */}
        <ProblemDisplay 
            key={currentProblem.id}
            lecture={currentLecture}
            module={currentModule}
            problem={currentProblem}
            onNextProblem={handleNextProblem}
            isProgressing={isProgressing}
            isMobile={isMobile}
          />
      </main>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt isMobile={isMobile} />
    </div>
  );
}

"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Home, BookOpen, PenTool, Clock, Target } from 'lucide-react';
import { useLearningContext } from '@/lib/contexts/LearningContext';
import { useUnifiedProgress } from '@/lib/hooks/useUnifiedProgress';
import Link from 'next/link';

interface UnifiedNavigationProps {
  currentMode: 'study' | 'practice' | 'study-plan';
  title: string;
  subtitle?: string;
  showProgress?: boolean;
  className?: string;
}

export function UnifiedNavigation({ 
  currentMode, 
  title, 
  subtitle, 
  showProgress = true,
  className = "" 
}: UnifiedNavigationProps) {
  const { session, navigateBack, restoreContext } = useLearningContext();
  const { progressData } = useUnifiedProgress();

  // Generate breadcrumb path
  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Study Plan', href: '/study-plan', icon: Home }
    ];

    if (session?.currentContent) {
      const context = restoreContext();
      
      // Add lecture/module context if available
      if (context?.previousContent) {
        const { lectureId, moduleId } = context.previousContent;
        if (lectureId) {
          breadcrumbs.push({
            label: lectureId.replace('lecture-', 'Week '),
            href: `/study-plan?lecture=${lectureId}`,
            icon: BookOpen
          });
        }
        if (moduleId) {
          breadcrumbs.push({
            label: moduleId.split('-').pop() || 'Module',
            href: `/study-plan?module=${moduleId}`,
            icon: Target
          });
        }
      }

      // Add current content
      breadcrumbs.push({
        label: session.currentContent.title,
        href: '#',
        icon: currentMode === 'study' ? BookOpen : PenTool
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const canGoBack = session?.navigationContext.previousPath;

  // Calculate session progress
  const sessionProgress = session ? {
    timeSpent: Math.floor((Date.now() - session.startTime.getTime()) / 1000 / 60), // minutes
    completedInSession: session.completedContent.length,
    currentStreak: progressData.overallStats.streakDays
  } : null;

  return (
    <div className={`bg-background border-b ${className}`}>
      {/* Main navigation bar */}
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button */}
          {canGoBack ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={navigateBack}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Link href="/study-plan" passHref>
              <Button variant="ghost" size="icon" aria-label="Home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Mode indicator */}
          <Badge variant={currentMode === 'study' ? 'default' : 'secondary'}>
            {currentMode === 'study' ? (
              <>
                <BookOpen className="h-3 w-3 mr-1" />
                Study
              </>
            ) : currentMode === 'practice' ? (
              <>
                <PenTool className="h-3 w-3 mr-1" />
                Practice
              </>
            ) : (
              <>
                <Target className="h-3 w-3 mr-1" />
                Plan
              </>
            )}
          </Badge>

          <h1 className="text-lg font-semibold font-headline">{title}</h1>
        </div>

        {/* Session info */}
        {sessionProgress && (
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {sessionProgress.timeSpent}min
            </div>
            <div>
              Completed: {sessionProgress.completedInSession}
            </div>
            {sessionProgress.currentStreak > 0 && (
              <div>
                Streak: {sessionProgress.currentStreak} days
              </div>
            )}
          </div>
        )}
      </div>

      {/* Breadcrumb navigation */}
      {breadcrumbs.length > 1 && (
        <div className="px-4 py-2 bg-muted/30 border-t">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-muted-foreground">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <div className="flex items-center gap-1 font-medium">
                    <crumb.icon className="h-3 w-3" />
                    {crumb.label}
                  </div>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <crumb.icon className="h-3 w-3" />
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}

      {/* Subtitle and progress */}
      {(subtitle || showProgress) && (
        <div className="px-4 py-3 bg-muted/30 border-t">
          {subtitle && (
            <p className="text-sm text-primary/80 font-medium mb-2">{subtitle}</p>
          )}
          
          {showProgress && progressData.overallStats.totalContent > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Overall Progress</span>
                <span>
                  {progressData.overallStats.completedContent} / {progressData.overallStats.totalContent} completed
                </span>
              </div>
              <Progress 
                value={progressData.overallStats.completionPercentage} 
                className="h-2"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Context-aware navigation buttons for switching modes
export function NavigationModeSwitch({ 
  currentContentId, 
  currentContentType 
}: { 
  currentContentId: string;
  currentContentType: 'example' | 'problem';
}) {
  const { findContentById } = useLearningContext();
  
  const contentData = findContentById(currentContentId, currentContentType);
  if (!contentData) return null;

  const relatedContent = currentContentType === 'example' 
    ? contentData.module.problems.filter(p => 
        (contentData.content as any).relatedPracticeProblemIds?.includes(p.id)
      )
    : contentData.module.examples.filter(e => 
        e.relatedPracticeProblemIds?.includes(currentContentId)
      );

  return (
    <div className="flex gap-2">
      {currentContentType === 'example' && relatedContent.length > 0 && (
        <Link href={`/practice?problem=${relatedContent[0].id}&from=example&exampleId=${currentContentId}`}>
          <Button variant="outline" size="sm">
            <PenTool className="h-4 w-4 mr-1" />
            Practice This
          </Button>
        </Link>
      )}
      
      {currentContentType === 'problem' && relatedContent.length > 0 && (
        <Link href={`/study?example=${relatedContent[0].id}&from=practice&problemId=${currentContentId}`}>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-1" />
            Review Concept
          </Button>
        </Link>
      )}
    </div>
  );
}

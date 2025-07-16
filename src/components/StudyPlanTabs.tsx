"use client";

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ProgressCard, 
  ProgressRing, 
  ProgressStats, 
  ProgressIndicator,
  EnhancedProgress 
} from "@/components/ui/enhanced-progress";
import { 
  createProgressData, 
  getProgressStatus, 
  formatProgressText, 
  getProgressColor,
  calculateTimeMetrics,
  generateProgressInsights
} from "@/lib/utils/progressUtils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Lecture, ModuleContent, Problem } from "@/lib/types";
import type { Topic } from "@/app/study-plan/page";
import Link from "next/link";
import { Button } from './ui/button';
import { BookOpen, Target, TrendingUp, Clock, Award } from 'lucide-react';
import { useProgress } from '@/lib/hooks/useProgress';
import { cn } from '@/lib/utils';

interface StudyPlanTabsProps {
    lectures: Lecture[];
    topics: Topic[];
    isMobile?: boolean;
}

export function StudyPlanTabs({ lectures, topics, isMobile = false }: StudyPlanTabsProps) {
    const [progress, setProgress] = useState<Record<string, 'correct' | 'incorrect'>>({});
    const [isClient, setIsClient] = useState(false);
    const [isMobileDetected, setIsMobileDetected] = useState(false);
    const { getStepStatuses, isLoaded } = useProgress();
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobileDetected(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
    
    const isActuallyMobile = isMobile || isMobileDetected;

    useEffect(() => {
        if (!isLoaded) return;
        
        setIsClient(true);
        const allStatuses: Record<string, 'correct' | 'incorrect'> = {};
        lectures.forEach(lecture => {
            lecture.modules.forEach(module => {
                module.problems.forEach(problem => {
                    const stepStatuses = getStepStatuses(problem.id);
                    Object.assign(allStatuses, stepStatuses);
                });
            });
        });
        setProgress(allStatuses);
    }, [lectures, isLoaded, getStepStatuses]);
    
    const calculateProgress = (problems: Problem[]) => {
        if (!isClient || problems.length === 0) return { completed: 0, total: 0, percentage: 0 };
        
        let completedSteps = 0;
        let totalSteps = 0;

        problems.forEach(problem => {
            totalSteps += problem.steps.length;
            problem.steps.forEach(step => {
                const stepKey = `${problem.id}-${step.id}`;
                if (progress[stepKey] === 'correct') {
                    completedSteps++;
                }
            });
        });
        
        return {
            completed: completedSteps,
            total: totalSteps,
            percentage: totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0
        };
    };

    const overallProgress = useMemo(() => {
        const allProblems = lectures.flatMap(l => l.modules.flatMap(m => m.problems));
        const calculated = calculateProgress(allProblems);
        return createProgressData(calculated.completed, calculated.total);
    }, [lectures, progress, isClient]);

    // Calculate additional stats for enhanced display
    const progressStats = useMemo(() => {
        const totalLectures = lectures.length;
        const completedLectures = lectures.filter(lecture => {
            const lectureProblems = lecture.modules.flatMap(m => m.problems);
            const lectureProgress = calculateProgress(lectureProblems);
            return lectureProgress.percentage === 100;
        }).length;

        const totalModules = lectures.reduce((sum, l) => sum + l.modules.length, 0);
        const completedModules = lectures.reduce((sum, lecture) => {
            return sum + lecture.modules.filter(module => {
                const moduleProgress = calculateProgress(module.problems);
                return moduleProgress.percentage === 100;
            }).length;
        }, 0);

        return {
            lectures: createProgressData(completedLectures, totalLectures),
            modules: createProgressData(completedModules, totalModules),
            problems: overallProgress
        };
    }, [lectures, overallProgress]);

    // Generate insights for the user
    const progressInsights = useMemo(() => {
        return generateProgressInsights(overallProgress, 85, 1); // Mock values for demo
    }, [overallProgress]);

    return (
        <div>
            <Card className={cn(
                isActuallyMobile ? "mb-6" : "mb-8"
            )}>
                <CardHeader className={cn(
                    isActuallyMobile ? "p-4" : "p-6"
                )}>
                    <CardTitle className={cn(
                        "font-headline flex items-center gap-2",
                        isActuallyMobile ? "text-lg" : "text-xl"
                    )}>
                        <Target className={cn(
                            isActuallyMobile ? "h-4 w-4" : "h-5 w-5"
                        )} />
                        Overall Progress
                    </CardTitle>
                    <CardDescription className={cn(
                        isActuallyMobile ? "text-sm" : "text-base"
                    )}>
                        You've completed {formatProgressText(overallProgress)} mastery points across all lectures.
                    </CardDescription>
                </CardHeader>
                <CardContent className={cn(
                    isActuallyMobile ? "space-y-4 p-4" : "space-y-6 p-6"
                )}>
                    {/* Main Progress Ring and Stats */}
                    <div className={cn(
                        "flex items-center",
                        isActuallyMobile ? "flex-col gap-4" : "gap-6"
                    )}>
                        <ProgressRing
                            value={overallProgress.completed}
                            max={overallProgress.total}
                            size={isActuallyMobile ? 60 : 80}
                            variant={overallProgress.percentage === 100 ? "success" : "default"}
                        />
                        <div className={cn(
                            "flex-1 space-y-3",
                            isActuallyMobile && "w-full"
                        )}>
                            <ProgressStats
                                stats={[
                                    {
                                        label: "Lectures",
                                        value: progressStats.lectures.completed,
                                        icon: <BookOpen className={cn(
                                            isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                                        )} />,
                                        color: getProgressColor(progressStats.lectures.percentage)
                                    },
                                    {
                                        label: "Modules",
                                        value: progressStats.modules.completed,
                                        icon: <Target className={cn(
                                            isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                                        )} />,
                                        color: getProgressColor(progressStats.modules.percentage)
                                    },
                                    {
                                        label: "Problems",
                                        value: progressStats.problems.completed,
                                        icon: <Award className={cn(
                                            isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                                        )} />,
                                        color: getProgressColor(progressStats.problems.percentage)
                                    }
                                ]}
                                layout={isActuallyMobile ? "vertical" : "horizontal"}
                            />
                        </div>
                    </div>

                    {/* Progress Cards */}
                    <div className={cn(
                        "grid gap-4",
                        isActuallyMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
                    )}>
                        <ProgressCard
                            title="Lectures"
                            value={progressStats.lectures.completed}
                            max={progressStats.lectures.total}
                            icon={<BookOpen className={cn(
                                isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                            )} />}
                            variant={progressStats.lectures.percentage === 100 ? "success" : "default"}
                            size="sm"
                            isComplete={progressStats.lectures.percentage === 100}
                        />
                        <ProgressCard
                            title="Modules"
                            value={progressStats.modules.completed}
                            max={progressStats.modules.total}
                            icon={<Target className={cn(
                                isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                            )} />}
                            variant={progressStats.modules.percentage === 100 ? "success" : "default"}
                            size="sm"
                            isComplete={progressStats.modules.percentage === 100}
                        />
                        <ProgressCard
                            title="Problems"
                            value={progressStats.problems.completed}
                            max={progressStats.problems.total}
                            icon={<Award className={cn(
                                isActuallyMobile ? "h-3 w-3" : "h-4 w-4"
                            )} />}
                            variant={progressStats.problems.percentage === 100 ? "success" : "default"}
                            size="sm"
                            isComplete={progressStats.problems.percentage === 100}
                        />
                    </div>

                    {/* Progress Insights */}
                    {progressInsights.length > 0 && (
                        <div className={cn(
                            "bg-muted/50 rounded-lg border",
                            isActuallyMobile ? "p-3" : "p-4"
                        )}>
                            <h4 className={cn(
                                "font-semibold mb-2",
                                isActuallyMobile ? "text-xs" : "text-sm"
                            )}>Progress Insights</h4>
                            <div className="space-y-1">
                                {progressInsights.slice(0, isActuallyMobile ? 2 : 3).map((insight, index) => (
                                    <p key={index} className={cn(
                                        "text-muted-foreground",
                                        isActuallyMobile ? "text-xs" : "text-sm"
                                    )}>
                                        {insight}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Tabs defaultValue="week">
                <TabsList className={cn(
                    "grid w-full grid-cols-2",
                    isActuallyMobile && "h-12" // Larger touch targets
                )}>
                    <TabsTrigger 
                        value="week"
                        className={cn(
                            isActuallyMobile && "text-sm min-h-[44px]"
                        )}
                    >
                        By Week
                    </TabsTrigger>
                    <TabsTrigger 
                        value="topic"
                        className={cn(
                            isActuallyMobile && "text-sm min-h-[44px]"
                        )}
                    >
                        By Topic
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="week">
                    <Card>
                        <CardHeader className={cn(
                            isActuallyMobile ? "p-4" : "p-6"
                        )}>
                            <CardTitle className={cn(
                                "font-headline",
                                isActuallyMobile ? "text-lg" : "text-xl"
                            )}>Chapters</CardTitle>
                            <CardDescription className={cn(
                                isActuallyMobile ? "text-sm" : "text-base"
                            )}>
                                Your study plan organized by weekly lectures and chapters.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className={cn(
                            isActuallyMobile ? "p-4" : "p-6"
                        )}>
                             <Accordion type="single" collapsible className="w-full">
                                {lectures.map((lecture) => {
                                    const lectureProblems = lecture.modules.flatMap(m => m.problems);
                                    const lectureProgress = calculateProgress(lectureProblems);
                                    
                                    return (
                                        <AccordionItem value={lecture.id} key={lecture.id}>
                                            <AccordionTrigger className={cn(
                                                isActuallyMobile && "py-3"
                                            )}>
                                                <div className={cn(
                                                    "flex justify-between items-center w-full pr-4",
                                                    isActuallyMobile && "flex-col items-start gap-2"
                                                )}>
                                                    <span className={cn(
                                                        "font-semibold",
                                                        isActuallyMobile ? "text-base" : "text-lg"
                                                    )}>{lecture.title}</span>
                                                    <div className={cn(
                                                        "flex items-center gap-4 text-sm",
                                                        isActuallyMobile && "gap-2 w-full"
                                                    )}>
                                                        <ProgressIndicator 
                                                            status={lectureProgress.percentage === 100 ? "completed" : 
                                                                   lectureProgress.percentage > 0 ? "in-progress" : "not-started"} 
                                                            size="sm" 
                                                        />
                                                        <span className={cn(
                                                            isActuallyMobile ? "text-xs" : "text-sm"
                                                        )}>{lectureProgress.completed}/{lectureProgress.total} MP</span>
                                                        <EnhancedProgress 
                                                            value={lectureProgress.percentage} 
                                                            className={cn(
                                                                "h-2",
                                                                isActuallyMobile ? "w-24 flex-1" : "w-32"
                                                            )} 
                                                            size="sm"
                                                            variant={lectureProgress.percentage === 100 ? "success" : "default"}
                                                            animated={true}
                                                        />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {isActuallyMobile ? (
                                                    <div className="space-y-3">
                                                        {lecture.modules.map((module) => {
                                                            const firstExampleId = module.examples.length > 0 ? module.examples[0].id : null;
                                                            return (
                                                                <div key={module.id} className="border rounded-lg p-3 bg-muted/30">
                                                                    <div className="space-y-2">
                                                                        <div className="font-medium text-sm">{module.name}</div>
                                                                        <div className="text-xs text-muted-foreground">{module.description}</div>
                                                                        {firstExampleId && (
                                                                            <Link href={`/study?example=${firstExampleId}`} passHref>
                                                                                <Button variant="outline" size="sm" className="w-full mt-2 min-h-[44px]">
                                                                                    <BookOpen className="mr-2 h-3 w-3" />
                                                                                    Study Topic
                                                                                </Button>
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Module / Skill Set</TableHead>
                                                                <TableHead className="text-right">Actions</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {lecture.modules.map((module) => {
                                                                const firstExampleId = module.examples.length > 0 ? module.examples[0].id : null;
                                                                return (
                                                                    <TableRow key={module.id}>
                                                                        <TableCell>
                                                                            <div className="font-medium">{module.name}</div>
                                                                            <div className="text-sm text-muted-foreground">{module.description}</div>
                                                                        </TableCell>
                                                                        <TableCell className="text-right">
                                                                            {firstExampleId && (
                                                                                <Link href={`/study?example=${firstExampleId}`} passHref>
                                                                                    <Button variant="outline" size="sm">
                                                                                        <BookOpen className="mr-2 h-4 w-4" />
                                                                                        Study Topic
                                                                                    </Button>
                                                                                </Link>
                                                                            )}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="topic">
                     <Card>
                        <CardHeader className={cn(
                            isActuallyMobile ? "p-4" : "p-6"
                        )}>
                            <CardTitle className={cn(
                                "font-headline",
                                isActuallyMobile ? "text-lg" : "text-xl"
                            )}>Topics & Skills</CardTitle>
                            <CardDescription className={cn(
                                isActuallyMobile ? "text-sm" : "text-base"
                            )}>
                                Your study plan organized by topics and their related skill sets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className={cn(
                            isActuallyMobile ? "p-4" : "p-6"
                        )}>
                             <Accordion type="single" collapsible className="w-full">
                                {topics.map((topic) => {
                                    const topicProblems = topic.skillSets.flatMap(s => s.problems);
                                    const topicProgress = calculateProgress(topicProblems);
                                    
                                    return (
                                        <AccordionItem value={topic.name} key={topic.name}>
                                            <AccordionTrigger className={cn(
                                                isActuallyMobile && "py-3"
                                            )}>
                                                <div className={cn(
                                                    "flex justify-between items-center w-full pr-4",
                                                    isActuallyMobile && "flex-col items-start gap-2"
                                                )}>
                                                    <span className={cn(
                                                        "font-semibold",
                                                        isActuallyMobile ? "text-base" : "text-lg"
                                                    )}>{topic.name}</span>
                                                     <div className={cn(
                                                        "flex items-center gap-4 text-sm",
                                                        isActuallyMobile && "gap-2 w-full"
                                                    )}>
                                                        <ProgressIndicator 
                                                            status={topicProgress.percentage === 100 ? "completed" : 
                                                                   topicProgress.percentage > 0 ? "in-progress" : "not-started"} 
                                                            size="sm" 
                                                        />
                                                        <span className={cn(
                                                            isActuallyMobile ? "text-xs" : "text-sm"
                                                        )}>{topicProgress.completed}/{topicProgress.total} MP</span>
                                                        <EnhancedProgress 
                                                            value={topicProgress.percentage} 
                                                            className={cn(
                                                                "h-2",
                                                                isActuallyMobile ? "w-24 flex-1" : "w-32"
                                                            )} 
                                                            size="sm"
                                                            variant={topicProgress.percentage === 100 ? "success" : "default"}
                                                            animated={true}
                                                        />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {isActuallyMobile ? (
                                                    <div className="space-y-3">
                                                        {topic.skillSets.map((skillSet) => {
                                                            const skillProgress = calculateProgress(skillSet.problems);
                                                            return (
                                                                <div key={skillSet.name} className="border rounded-lg p-3 bg-muted/30">
                                                                    <div className="space-y-2">
                                                                        <div className="font-medium text-sm">{skillSet.name}</div>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {skillSet.problems.map(p => (
                                                                                <Link key={p.id} href={`/practice?problem=${p.id}`} passHref>
                                                                                    <Badge variant="secondary" className="cursor-pointer hover:bg-accent text-xs">{p.id}</Badge>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                        <div className="flex items-center gap-2">
                                                                            <ProgressIndicator 
                                                                                status={skillProgress.percentage === 100 ? "completed" : 
                                                                                       skillProgress.percentage > 0 ? "in-progress" : "not-started"} 
                                                                                size="sm" 
                                                                            />
                                                                            <div className="font-semibold text-xs">{skillProgress.completed}/{skillProgress.total} MP</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Skill</TableHead>
                                                                <TableHead>Practice Problems</TableHead>
                                                                <TableHead className="text-right">Progress</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {topic.skillSets.map((skillSet) => {
                                                                const skillProgress = calculateProgress(skillSet.problems);
                                                                return (
                                                                    <TableRow key={skillSet.name}>
                                                                        <TableCell>
                                                                            <div className="font-medium">{skillSet.name}</div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {skillSet.problems.map(p => (
                                                                                    <Link key={p.id} href={`/practice?problem=${p.id}`} passHref>
                                                                                        <Badge variant="secondary" className="cursor-pointer hover:bg-accent">{p.id}</Badge>
                                                                                    </Link>
                                                                                ))}
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell className="text-right">
                                                                            <div className="flex items-center justify-end gap-2">
                                                                                <ProgressIndicator 
                                                                                    status={skillProgress.percentage === 100 ? "completed" : 
                                                                                           skillProgress.percentage > 0 ? "in-progress" : "not-started"} 
                                                                                    size="sm" 
                                                                                />
                                                                                <div className="font-semibold">{skillProgress.completed}/{skillProgress.total} MP</div>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

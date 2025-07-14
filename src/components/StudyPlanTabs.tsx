"use client";

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Lecture, ModuleContent, Problem } from "@/lib/types";
import type { Topic } from "@/app/study-plan/page";
import Link from "next/link";
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';

interface StudyPlanTabsProps {
    lectures: Lecture[];
    topics: Topic[];
}

export function StudyPlanTabs({ lectures, topics }: StudyPlanTabsProps) {
    const [progress, setProgress] = useState<Record<string, 'correct' | 'incorrect'>>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const allStatuses: Record<string, 'correct' | 'incorrect'> = {};
        lectures.forEach(lecture => {
            lecture.modules.forEach(module => {
                module.problems.forEach(problem => {
                    const savedStatuses = localStorage.getItem(`fm-stepStatuses-${problem.id}`);
                    if (savedStatuses) {
                        const parsed = JSON.parse(savedStatuses);
                        Object.assign(allStatuses, parsed);
                    }
                });
            });
        });
        setProgress(allStatuses);
    }, [lectures]);
    
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
        return calculateProgress(allProblems);
    }, [lectures, progress, isClient]);

    return (
        <div>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="font-headline">Overall Progress</CardTitle>
                    <CardDescription>
                        You've completed {overallProgress.completed} out of {overallProgress.total} mastery points across all lectures.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={overallProgress.percentage} className="h-3" />
                </CardContent>
            </Card>

            <Tabs defaultValue="week">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="week">By Week</TabsTrigger>
                    <TabsTrigger value="topic">By Topic</TabsTrigger>
                </TabsList>
                <TabsContent value="week">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Chapters</CardTitle>
                            <CardDescription>
                                Your study plan organized by weekly lectures and chapters.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                {lectures.map((lecture) => {
                                    const lectureProblems = lecture.modules.flatMap(m => m.problems);
                                    const lectureProgress = calculateProgress(lectureProblems);
                                    
                                    return (
                                        <AccordionItem value={lecture.id} key={lecture.id}>
                                            <AccordionTrigger>
                                                <div className="flex justify-between items-center w-full pr-4">
                                                    <span className="font-semibold text-lg">{lecture.title}</span>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span>{lectureProgress.completed}/{lectureProgress.total} MP</span>
                                                        <Progress value={lectureProgress.percentage} className="w-32 h-2" />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
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
                        <CardHeader>
                            <CardTitle className="font-headline">Topics & Skills</CardTitle>
                            <CardDescription>
                                Your study plan organized by topics and their related skill sets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                {topics.map((topic) => {
                                    const topicProblems = topic.skillSets.flatMap(s => s.problems);
                                    const topicProgress = calculateProgress(topicProblems);
                                    
                                    return (
                                        <AccordionItem value={topic.name} key={topic.name}>
                                            <AccordionTrigger>
                                                <div className="flex justify-between items-center w-full pr-4">
                                                    <span className="font-semibold text-lg">{topic.name}</span>
                                                     <div className="flex items-center gap-4 text-sm">
                                                        <span>{topicProgress.completed}/{topicProgress.total} MP</span>
                                                        <Progress value={topicProgress.percentage} className="w-32 h-2" />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
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
                                                                         <div className="font-semibold">{skillProgress.completed}/{skillProgress.total} MP</div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
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

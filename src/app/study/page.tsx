import { LectureContentDisplay } from "@/components/LectureContentDisplay";
import { lectures } from "@/lib/content";
import type { ModuleContent, Lecture, Example } from "@/lib/types";
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { PageErrorBoundary } from "@/components/error-boundaries/PageErrorBoundary";

function findExampleContent(exampleId?: string | null): { module: ModuleContent, lecture: Lecture, example: Example } | null {
    if (!exampleId) {
        return null;
    }
    for (const lecture of lectures) {
        for (const module of lecture.modules) {
            const example = module.examples.find(e => e.id === exampleId);
            if (example) {
                return {
                    module,
                    lecture,
                    example,
                }
            }
        }
    }
    return null;
}


async function StudyPageContent({ searchParams }: { searchParams: Promise<{ example: string }> }) {
    const resolvedParams = await searchParams;
    const exampleId = resolvedParams.example;
    const contentData = findExampleContent(exampleId);
    
    if (!contentData) {
        // If no module is specified or found, redirect to the main study plan
        redirect('/study-plan');
    }

    const { module, lecture, example } = contentData;

    return (
        <main className="h-screen bg-muted/30">
            <LectureContentDisplay lecture={lecture} module={module} example={example} />
        </main>
    );
}

export default function StudyPage({ searchParams }: { searchParams: Promise<{ example: string }> }) {
    return (
        <PageErrorBoundary pageName="Study">
            <Suspense fallback={<div className="h-screen bg-muted/30 flex items-center justify-center">Loading...</div>}>
                <StudyPageContent searchParams={searchParams} />
            </Suspense>
        </PageErrorBoundary>
    );
}

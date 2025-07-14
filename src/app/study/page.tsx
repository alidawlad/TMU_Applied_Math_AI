import { LectureContentDisplay } from "@/components/LectureContentDisplay";
import { lectures } from "@/lib/content";
import type { ModuleContent, Lecture, Example } from "@/lib/types";
import { redirect } from 'next/navigation'

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


export default function StudyPage({ searchParams }: { searchParams: { example: string } }) {
    const exampleId = searchParams.example;
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

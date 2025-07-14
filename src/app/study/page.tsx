import { LectureContentDisplay } from "@/components/LectureContentDisplay";
import { lectures } from "@/lib/data";
import type { Lecture, Module, LectureContent } from "@/lib/types";
import { redirect } from 'next/navigation'

function findLectureContent(moduleId?: string | null): { module: Module, lecture: Lecture, content: LectureContent } | null {
    if (!moduleId) {
        return null;
    }
    for (const lecture of lectures) {
        for (const module of lecture.modules) {
            if (module.id === moduleId && module.lectureContent) {
                return {
                    module,
                    lecture,
                    content: module.lectureContent,
                }
            }
        }
    }
    return null;
}


export default function StudyPage({ searchParams }: { searchParams: { module: string } }) {
    const moduleId = searchParams.module;
    const contentData = findLectureContent(moduleId);
    
    if (!contentData) {
        // If no module is specified or found, redirect to the main study plan
        redirect('/study-plan');
    }

    const { module, lecture, content } = contentData;

    return (
        <main className="h-screen bg-muted/30">
            <LectureContentDisplay lecture={lecture} module={module} content={content} />
        </main>
    );
}

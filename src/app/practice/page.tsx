import { FocusedMasteryApp } from '@/components/FocusedMasteryApp';
import { Suspense } from 'react';

export default function PracticePage() {
  return (
    <main className="h-screen bg-muted/30">
        <Suspense fallback={<div>Loading...</div>}>
            <FocusedMasteryApp />
        </Suspense>
    </main>
  );
}

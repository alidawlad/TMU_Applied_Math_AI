import { FocusedMasteryApp } from '@/components/FocusedMasteryApp';
import { PracticePageErrorBoundary } from '@/components/error-boundaries/PracticePageErrorBoundary';
import { Suspense } from 'react';

export default function PracticePage() {
  return (
    <PracticePageErrorBoundary>
      <main className="h-screen bg-muted/30">
          <Suspense fallback={<div>Loading...</div>}>
              <FocusedMasteryApp />
          </Suspense>
      </main>
    </PracticePageErrorBoundary>
  );
}

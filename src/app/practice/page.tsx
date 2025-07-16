import { FocusedMasteryApp } from '@/components/FocusedMasteryApp';
import { PageErrorBoundary } from '@/components/error-boundaries/PageErrorBoundary';
import { Suspense } from 'react';

export default function PracticePage() {
  return (
    <PageErrorBoundary pageName="Practice">
      <main className="h-screen bg-muted/30">
          <Suspense fallback={<div>Loading...</div>}>
              <FocusedMasteryApp />
          </Suspense>
      </main>
    </PageErrorBoundary>
  );
}

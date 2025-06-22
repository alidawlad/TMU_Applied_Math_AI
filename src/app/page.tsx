import { FocusedMasteryApp } from '@/components/FocusedMasteryApp';
import { Logo } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">Focused Mastery</span>
        </div>
      </header>
      <main className="flex-1">
        <FocusedMasteryApp />
      </main>
    </div>
  );
}

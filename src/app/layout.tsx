import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LearningProvider } from "@/lib/contexts/LearningContext"

export const metadata: Metadata = {
  title: 'Focused Mastery',
  description: 'Master math with AI-powered step-by-step guidance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" />
      </head>
      <body className="font-body antialiased bg-muted/30">
        <LearningProvider>
          {children}
          <Toaster />
        </LearningProvider>
      </body>
    </html>
  );
}

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LearningProvider } from "@/lib/contexts/LearningContext"
import { RootErrorBoundary } from "@/components/error-boundaries/RootErrorBoundary"

export const metadata: Metadata = {
  title: 'CQMS110 - Applied Mathematics for Business',
  description: 'Open source AI-powered integrated learning platform for applied mathematics. Developed by Ali Houssein for Toronto Metropolitan University.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CQMS110',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#008080',
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased bg-muted/30">
        <RootErrorBoundary>
          <LearningProvider>
            {children}
            <Toaster />
          </LearningProvider>
        </RootErrorBoundary>
      </body>
    </html>
  );
}

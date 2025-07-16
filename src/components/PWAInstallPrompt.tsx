"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Download, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  isMobile?: boolean;
}

export function PWAInstallPrompt({ isMobile = false }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the saved prompt since it can't be used again
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Hide for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showInstallPrompt || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <Card className={cn(
      "fixed bottom-4 left-4 right-4 z-50 shadow-lg border-primary/20",
      isMobile ? "max-w-sm mx-auto" : "max-w-md"
    )}>
      <CardHeader className={cn(
        "pb-3",
        isMobile ? "p-4" : "p-6"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className={cn(
              "text-primary",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} />
            <CardTitle className={cn(
              "font-headline",
              isMobile ? "text-sm" : "text-lg"
            )}>
              Install App
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className={cn(
              "h-6 w-6 p-0",
              isMobile && "h-8 w-8"
            )}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className={cn(
          isMobile ? "text-xs" : "text-sm"
        )}>
          Install Math Mastery for quick access and offline learning
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(
        "pt-0",
        isMobile ? "p-4" : "p-6"
      )}>
        <div className="flex gap-2">
          <Button
            onClick={handleInstallClick}
            size={isMobile ? "sm" : "default"}
            className={cn(
              "flex-1",
              isMobile && "min-h-[44px] text-sm"
            )}
          >
            <Download className={cn(
              "mr-2",
              isMobile ? "h-3 w-3" : "h-4 w-4"
            )} />
            Install
          </Button>
          <Button
            variant="outline"
            onClick={handleDismiss}
            size={isMobile ? "sm" : "default"}
            className={cn(
              "flex-1",
              isMobile && "min-h-[44px] text-sm"
            )}
          >
            Not Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
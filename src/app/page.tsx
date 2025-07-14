import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-headline text-primary">Focused Mastery</h1>
            <p className="text-xl text-muted-foreground mt-2">Your AI-powered guide to mastering applied mathematics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                      <Target className="h-8 w-8 text-primary" />
                  </div>
              </div>
              <CardTitle className="text-center font-headline text-2xl">Focused Practice</CardTitle>
              <CardDescription className="text-center">
                Dive into problems one-by-one with AI feedback and guided steps. Perfect for targeted skill-building.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/practice">
                <Button size="lg">Start Practicing</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                </div>
              <CardTitle className="text-center font-headline text-2xl">Study Plan</CardTitle>
              <CardDescription className="text-center">
                Get a high-level overview of your curriculum. Track progress by week or by topic.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/study-plan">
                <Button size="lg" variant="outline">View Study Plan</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Eraser, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DrawingToolbarProps {
  onClose: () => void;
}

export function DrawingToolbar({ onClose }: DrawingToolbarProps) {
  const handleClear = () => {
    document.dispatchEvent(new CustomEvent('clearCanvas'));
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Card className="shadow-2xl">
        <CardContent className="p-2 flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleClear} aria-label="Clear Drawing">
            <Eraser className="h-5 w-5" />
          </Button>
          <Button variant="destructive" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close Drawing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

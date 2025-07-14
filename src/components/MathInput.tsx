"use client";

import 'katex/dist/katex.min.css';
import { MathRenderer } from "./MathRenderer";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MathInput({
  value,
  onChange,
  placeholder,
  disabled,
}: MathInputProps) {
  return (
    <div className="grid gap-4">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-lg"
        disabled={disabled}
      />
      {value && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <div className="flex justify-center items-center min-h-[40px] text-xl">
              <MathRenderer text={`$$${value}$$`} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

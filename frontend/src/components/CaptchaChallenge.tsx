import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CaptchaChallengeProps {
  onValidChange: (isValid: boolean) => void;
  reset?: number; // increment to force reset
}

function generateChallenge(): { question: string; answer: number } {
  const ops = ['+', '-', '×'] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  switch (op) {
    case '+':
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * 20) + 10;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a - b;
      break;
    case '×':
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
      break;
    default:
      a = 5; b = 3; answer = 8;
  }

  return { question: `${a} ${op} ${b} = ?`, answer };
}

export default function CaptchaChallenge({ onValidChange, reset }: CaptchaChallengeProps) {
  const [challenge, setChallenge] = useState(generateChallenge);
  const [userAnswer, setUserAnswer] = useState('');
  const [touched, setTouched] = useState(false);

  const refresh = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer('');
    setTouched(false);
    onValidChange(false);
  }, [onValidChange]);

  useEffect(() => {
    if (reset !== undefined) {
      refresh();
    }
  }, [reset, refresh]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    setTouched(true);
    const parsed = parseInt(val, 10);
    onValidChange(!isNaN(parsed) && parsed === challenge.answer);
  };

  const isCorrect = touched && parseInt(userAnswer, 10) === challenge.answer;
  const isWrong = touched && userAnswer !== '' && parseInt(userAnswer, 10) !== challenge.answer;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {/* CAPTCHA display box */}
        <div
          className="flex-1 bg-navy/5 border-2 border-navy/20 rounded px-4 py-2 font-mono text-lg font-bold text-navy tracking-widest select-none"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
            letterSpacing: '0.2em',
          }}
        >
          {challenge.question}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={refresh}
          className="border-navy/30 text-navy hover:bg-navy/5 shrink-0"
          title="Refresh CAPTCHA"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <Input
        type="number"
        placeholder="Enter answer"
        value={userAnswer}
        onChange={handleChange}
        className={`border-navy/30 focus:border-saffron focus:ring-saffron/20 ${
          isCorrect ? 'border-green-500 bg-green-50' : ''
        } ${isWrong ? 'border-red-500 bg-red-50' : ''}`}
      />
      {isWrong && (
        <p className="text-red-600 text-xs">Incorrect answer. Please try again.</p>
      )}
    </div>
  );
}

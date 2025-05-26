import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRightCircle, Loader2 } from 'lucide-react';

interface FlashcardInputProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const FlashcardInput: React.FC<FlashcardInputProps> = ({
  inputText,
  onInputChange,
  onGenerate,
  isGenerating
}) => {
  const [warning, setWarning] = useState('');
  const MAX_LENGTH = 2000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      setWarning(`Input limited to ${MAX_LENGTH} characters.`);
      onInputChange(e.target.value.slice(0, MAX_LENGTH));
    } else {
      setWarning('');
      onInputChange(e.target.value);
    }
  };

  return (
    <>
      <div className="text-sm text-blue-600 dark:text-blue-300 mb-2">
        Input is limited to 2000 characters for flashcard generation.
      </div>
      <Textarea 
        placeholder="Paste your notes, textbook excerpts, or any learning material here..."
        className="min-h-32 text-base p-4 focus:ring-2 focus:ring-primary/50 transition-all"
        value={inputText}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
      />
      {warning && <div className="text-red-500 text-xs mt-1">{warning}</div>}
      
      <div className="flex flex-col items-center gap-4 mt-4">
        <Button 
          onClick={onGenerate}
          disabled={isGenerating || !inputText.trim()}
          className="w-full max-w-xs rounded-full py-6 shadow-md hover:shadow-lg transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Flashcards
              <ArrowRightCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default FlashcardInput;

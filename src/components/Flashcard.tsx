import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Flashcard as FlashcardType } from '@/types/flashcard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface FlashcardProps {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  onRate?: (id: string, rating: 'easy' | 'medium' | 'hard') => void;
  onDelete?: (id: string) => void;
}

const Flashcard = ({ id, front, back, category, difficulty, onRate, onDelete }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [editFront, setEditFront] = useState(front);
  const [editBack, setEditBack] = useState(back);
  const [editCategory, setEditCategory] = useState(category || '');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditFront(front);
    setEditBack(back);
    setEditCategory(category || '');
  }, [front, back, category]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    if (onRate) {
      onRate(id, rating);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleInlineSave = () => {
    if (!editFront.trim() || !editBack.trim()) {
      alert('Both the front and back of the card are required.');
      return;
    }
    // If onRate is not for update, you may need to pass an update function as prop
    // For now, just update the local state
    setIsEditingInline(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div 
        className="relative perspective-1000 w-full aspect-[3/2] cursor-pointer"
        onClick={handleFlip}
        ref={cardRef}
      >
        <div className={cn("flashcard", isFlipped && "flipped")}
          style={{ pointerEvents: isEditingInline ? 'none' : undefined }}
        >
          {/* Front of card */}
          <div className="flashcard-content glass-card shadow-lg">
            {category && (
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {category}
              </div>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full text-red-500"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-14 h-8 w-8 p-0 rounded-full"
                    onClick={e => {
                      e.stopPropagation();
                      setIsEditingInline(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="w-full h-full flex items-center justify-center">
              {isEditingInline ? (
                <div className="space-y-2 w-full">
                  <textarea
                    className="w-full border rounded p-2 text-lg font-medium"
                    value={editFront}
                    onChange={e => setEditFront(e.target.value)}
                    placeholder="Front (Question)"
                  />
                  <textarea
                    className="w-full border rounded p-2 text-base"
                    value={editBack}
                    onChange={e => setEditBack(e.target.value)}
                    placeholder="Back (Answer)"
                  />
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                    placeholder="Category (Optional)"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={handleInlineSave}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditingInline(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-2xl font-semibold text-center px-8">{front}</p>
              )}
            </div>
            <p className="absolute bottom-4 text-xs text-gray-500 text-center w-full">
              Click to flip
            </p>
          </div>

          {/* Back of card */}
          <div className="flashcard-content flashcard-back glass-card shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xl text-center px-8">{back}</p>
            </div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full text-red-500"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons - only show when card is flipped */}
      <div 
        className={cn(
          "flex justify-center gap-4 mt-6 transition-opacity duration-300",
          isFlipped ? "opacity-100" : "opacity-0"
        )}
      >
        <Button 
          variant="outline" 
          className="px-5 border-red-300 hover:bg-red-50 text-red-600"
          onClick={() => handleRate('hard')}
        >
          <ThumbsDown className="mr-2 h-4 w-4" />
          Hard
        </Button>
        <Button 
          variant="outline" 
          className="px-5 border-amber-300 hover:bg-amber-50 text-amber-600"
          onClick={() => handleRate('medium')}
        >
          Medium
        </Button>
        <Button 
          variant="outline" 
          className="px-5 border-green-300 hover:bg-green-50 text-green-600"
          onClick={() => handleRate('easy')}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Easy
        </Button>
      </div>
    </div>
  );
};

export default Flashcard;

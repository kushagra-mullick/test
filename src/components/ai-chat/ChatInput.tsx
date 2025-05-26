import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [warning, setWarning] = useState('');
  const MAX_LENGTH = 500;

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.slice(0, MAX_LENGTH));
      setInputMessage('');
      setWarning('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      setWarning(`Message limited to ${MAX_LENGTH} characters.`);
      setInputMessage(e.target.value.slice(0, MAX_LENGTH));
    } else {
      setWarning('');
      setInputMessage(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="text-sm text-blue-600 dark:text-blue-300 mb-2">
        Each message is limited to 500 characters. You can send up to 20 messages per session.
      </div>
      <div className="flex w-full items-center space-x-2 max-w-3xl mx-auto">
        <Textarea
          placeholder="Ask about your flashcards..."
          value={inputMessage}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow min-h-[50px] max-h-[100px] resize-none"
          maxLength={MAX_LENGTH}
        />
        {warning && <div className="text-red-500 text-xs mt-1">{warning}</div>}
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          className="shrink-0"
          size="icon"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;

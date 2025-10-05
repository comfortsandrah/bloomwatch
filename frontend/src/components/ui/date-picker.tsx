import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  min?: Date;
  max?: Date;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ 
  value, 
  onChange, 
  min, 
  max, 
  className = ""
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
    setIsOpen(false);
  };

  const getMinDate = () => {
    return min ? min.toISOString().split('T')[0] : undefined;
  };

  const getMaxDate = () => {
    return max ? max.toISOString().split('T')[0] : undefined;
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(value)}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <Card className="absolute bottom-full left-0 right-0 z-50 mb-1">
          <CardContent className="p-3">
            <input
              type="date"
              value={value.toISOString().split('T')[0]}
              onChange={handleDateChange}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

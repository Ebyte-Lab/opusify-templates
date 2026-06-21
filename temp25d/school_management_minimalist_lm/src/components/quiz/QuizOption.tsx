import React from 'react';
import clsx from 'clsx';

interface QuizOptionProps {
  id: string;
  label: string;
  isSelected: boolean;
  isCorrectOption: boolean;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  label,
  isSelected,
  isCorrectOption,
  checked,
  onChange,
  disabled,
}) => {
  return (
    <label
      className={clsx(
        "flex items-start gap-3 p-4 bg-white rounded-xl cursor-pointer border transition-all duration-200 group",
        {
          "border-primary/40 shadow-sm": isSelected && !checked,
          "border-green-500 bg-green-50/50": checked && isSelected && isCorrectOption,
          "border-red-500 bg-red-50/50": checked && isSelected && !isCorrectOption,
          "border-transparent hover:border-primary/20": !isSelected,
        }
      )}
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 accent-primary w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
      />
      <span className="text-sm text-text/90 font-medium select-none">{label}</span>
    </label>
  );
};


import React from 'react';
import { GavelIcon, FileTextIcon, LockIcon, FileBadgeIcon, BuildingIcon } from 'lucide-react';

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const categories = [
  { id: 'ip', name: 'IP Law', icon: <FileBadgeIcon className="h-5 w-5" /> },
  { id: 'contracts', name: 'Contracts', icon: <FileTextIcon className="h-5 w-5" /> },
  { id: 'privacy', name: 'Privacy', icon: <LockIcon className="h-5 w-5" /> },
  { id: 'criminal', name: 'Criminal', icon: <GavelIcon className="h-5 w-5" /> },
  { id: 'startup', name: 'Startup', icon: <BuildingIcon className="h-5 w-5" /> }
];

const Category: React.FC<CategoryProps> = ({ title, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-md transition-colors ${
        selected 
          ? 'bg-legal-primary text-white' 
          : 'text-gray-700 hover:bg-legal-muted'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{title}</span>
    </button>
  );
};

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Category
          key={category.id}
          title={category.name}
          icon={category.icon}
          selected={selectedCategory === category.id}
          onClick={() => onSelectCategory(category.id)}
        />
      ))}
    </div>
  );
};

export default CategorySelector;

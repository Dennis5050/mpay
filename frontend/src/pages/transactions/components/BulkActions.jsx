import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onExport, onClearSelection }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Icon name="Check" size={16} color="var(--color-primary-foreground)" />
        </div>
        <span className="text-sm font-medium text-foreground font-body">
          {selectedCount} transaction{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={onExport}
          fullWidth
          className="sm:w-auto"
        >
          Export Selected
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;
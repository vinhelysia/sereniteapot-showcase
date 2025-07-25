import React, { useState } from 'react';
import { designTypes, realmTypes, mansionTypes } from '../data/showcaseData';

interface FilterControlsProps {
  filters: {
    designType: string;
    contextType: string;
    server: string;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, onReset }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const servers = ['All', 'Asia', 'Europe', 'America'];
  
  const getContextOptions = () => {
    if (filters.designType === 'ex') {
      return [{ value: '', label: 'All Realms' }, ...Object.entries(realmTypes).map(([key, value]) => ({ value: key, label: value }))];
    } else if (filters.designType === 'in') {
      return [{ value: '', label: 'All Mansions' }, ...Object.entries(mansionTypes).map(([key, value]) => ({ value: key, label: value }))];
    }
    return [{ value: '', label: 'All' }];
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground">Filters</h3>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn-glass text-sm px-4 py-2"
        >
          {isCollapsed ? 'Show' : 'Hide'} Filters
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Design Type Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Design Type
            </label>
            <select
              value={filters.designType}
              onChange={(e) => onFilterChange({ ...filters, designType: e.target.value, contextType: '' })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-smooth"
            >
              <option value="">All Types</option>
              {Object.entries(designTypes).map(([key, value]) => (
                <option key={key} value={key}>{value as string}</option>
              ))}
            </select>
          </div>

          {/* Context Filter (Realm/Mansion) */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              {filters.designType === 'ex' ? 'Realm' : filters.designType === 'in' ? 'Mansion' : 'Context'}
            </label>
            <select
              value={filters.contextType}
              onChange={(e) => onFilterChange({ ...filters, contextType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-smooth"
            >
              {getContextOptions().map(({ value, label }) => (
                <option key={value} value={value}>{label as string}</option>
              ))}
            </select>
          </div>

          {/* Server Filter */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Server
            </label>
            <select
              value={filters.server}
              onChange={(e) => onFilterChange({ ...filters, server: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-smooth"
            >
              {servers.map((server) => (
                <option key={server} value={server === 'All' ? '' : server}>{server}</option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={onReset}
              className="btn-accent w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
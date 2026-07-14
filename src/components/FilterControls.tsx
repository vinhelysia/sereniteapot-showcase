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

  const isWorld = filters.designType === 'world';

  const getContextOptions = () => {
    if (filters.designType === 'ex') {
      return [{ value: '', label: 'All Realms' }, ...Object.entries(realmTypes).map(([key, value]) => ({ value: key, label: value }))];
    } else if (filters.designType === 'in') {
      return [{ value: '', label: 'All Mansions' }, ...Object.entries(mansionTypes).map(([key, value]) => ({ value: key, label: value }))];
    } else if (isWorld) {
      return [{ value: '', label: '—' }];
    }
    return [{ value: '', label: 'All' }];
  };

  const activeCount = [
    filters.designType,
    !isWorld && filters.contextType ? filters.contextType : '',
    filters.server
  ].filter(Boolean).length;

  return (
    <section className="border border-border bg-card mb-10" aria-label="Filters">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-foreground">
            Filters
          </h2>
          {activeCount > 0 && (
            <span className="text-xs text-muted-foreground font-mono">
              {activeCount} active
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn-ghost text-xs py-1.5 px-3"
        >
          {isCollapsed ? 'Show' : 'Hide'}
        </button>
      </div>

      {!isCollapsed && (
        <div className="filters-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Design type
            </label>
            <select
              value={filters.designType}
              onChange={(e) => onFilterChange({ ...filters, designType: e.target.value, contextType: '' })}
              className="field"
            >
              <option value="">All types</option>
              {Object.entries(designTypes).map(([key, value]) => (
                <option key={key} value={key}>{value as string}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              {filters.designType === 'ex' ? 'Realm' : filters.designType === 'in' ? 'Mansion' : 'Context'}
            </label>
            <select
              value={isWorld ? '' : filters.contextType}
              onChange={(e) => onFilterChange({ ...filters, contextType: e.target.value })}
              className="field disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isWorld}
            >
              {getContextOptions().map(({ value, label }) => (
                <option key={value || label} value={value}>{label as string}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Server
            </label>
            <select
              value={filters.server}
              onChange={(e) => onFilterChange({ ...filters, server: e.target.value })}
              className="field"
            >
              {servers.map((server) => (
                <option key={server} value={server === 'All' ? '' : server}>{server}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button type="button" onClick={onReset} className="btn-ghost w-full">
              Reset
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FilterControls;

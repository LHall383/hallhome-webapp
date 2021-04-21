import '../Components.scss';

import React from 'react';
import { Button, MenuItem, Position, Text } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Tooltip2 } from '@blueprintjs/popover2';

export const timeRanges = [
  {
    data: 'short_term',
    text: 'Short Term',
    tooltip: 'Approximately the last 4 weeks',
  },
  {
    data: 'medium_term',
    text: 'Medium Term',
    tooltip: 'Approximately the last 6 months',
  },
  {
    data: 'long_term',
    text: 'Long Term',
    tooltip:
      'The last several years, including all new data as it becomes available',
  },
];

export default function TimeRangeSelect({ timeRange, setTimeRange }) {
  const renderTimeRange = (timeRange, { handleClick, modifiers }) => {
    return (
      <div key={timeRange.data}>
        <Tooltip2 content={timeRange.tooltip} position={Position.RIGHT}>
          <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            text={timeRange.text}
            onClick={handleClick}
          />
        </Tooltip2>
      </div>
    );
  };
  const handleTimeRangeSelect = (timeRange) => {
    setTimeRange(timeRange);
  };

  return (
    <div>
      <Text className="bp3-text-large">Time Range</Text>
      <Select
        items={timeRanges}
        itemRenderer={renderTimeRange}
        onItemSelect={handleTimeRangeSelect}
        filterable={false}
        activeItem={timeRange}
      >
        <Button
          text={
            timeRange && timeRange.text ? timeRange.text : 'Select a time range'
          }
          rightIcon="double-caret-vertical"
        />
      </Select>
    </div>
  );
}

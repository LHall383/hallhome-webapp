import React from 'react';
import { Button, MenuItem, Text } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

export const timeRanges = [
  { data: 'short_term', text: 'Short Term' },
  { data: 'medium_term', text: 'Medium Term' },
  { data: 'long_term', text: 'Long Term' },
];

export default function TimeRangeSelect({ timeRange, setTimeRange }) {
  const renderTimeRange = (timeRange, { handleClick, modifiers }) => {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={timeRange.data}
        text={timeRange.text}
        onClick={handleClick}
      ></MenuItem>
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

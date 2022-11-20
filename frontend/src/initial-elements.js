import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    data: {
      label: 'foo()',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'bar()',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'a()',
    },
    position: { x: 400, y: 100 },
  },
];

export const edges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

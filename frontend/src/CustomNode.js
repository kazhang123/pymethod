import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import "./customNode.css"

const handleStyle = {
    width: "64px",
    position: Position.Left,
    background: "#f5ebe0",
  };

  const handleStyle2 = {
    width: "64px",
    position: Position.Bottom,
    background: "#4a4e69",
  };



function CustomNode({ data }) {
  return (
    <div className="react-flow_node">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="idk">
          <div className="idk2">{data.label}</div>
        </div>
      </div>

     
      <Handle type="target" position={Position.Top} className="handle" />
      <Handle type="source" position={Position.Bottom} className="handle" />
    </div>
  );
}

export default memo(CustomNode);
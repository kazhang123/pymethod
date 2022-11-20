import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

import 'reactflow/dist/style.css';
import './App.css';

const nodeTypes = { //dont know what this does
  //custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [args, setArgs] = useState([]);
  const [file, setFile] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []); //dont know what this does

  const edgesWithUpdatedTypes = edges.map((edge) => { //dont know what this does
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;
    }
    return edge;
  });

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleArgInput = (e) => {
    const argArr = e.target.value.split(",");
    let trimmedArgs = [];
    for (let arg of argArr) {
      let trimmedArg = arg.trim();
      if (trimmedArg !== "") {
        trimmedArgs.push(trimmedArg);
      }
    }
    setArgs(trimmedArgs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    for (let arg of args) {
      data.append("arg", arg);
    }

    fetch("http://127.0.0.1:8888/graph", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {}
      );
  };

  return (
    <div style={{ height: 700 }}>
      <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}>
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={uploadFile} />
        <br />
        <label>
          Program Input:
          <input type="text" name="name" onChange={(e) => handleArgInput(e)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
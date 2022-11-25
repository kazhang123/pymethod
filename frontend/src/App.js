import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType,
} from "reactflow";
import dagre from "dagre";
import { getGraph } from "./graph";
import Loading from "./components/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "reactflow/dist/style.css";
import "./App.css";

const nodeTypes = {
  //dont know what this does
  //custom: CustomNode,
};

const nodeWidth = 172;
const nodeHeight = 36;

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [args, setArgs] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const edgesWithUpdatedTypes = edges.map((edge) => {
    //dont know what this does
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    for (let arg of args) {
      data.append("arg", arg);
    }

    setIsLoading(true);
    let response = await fetch("http://127.0.0.1:8888/graph", {
      method: "POST",
      body: data,
    });
    setIsLoading(false);

    let jsonResponse = await response.json();
    console.log(jsonResponse);

    let graph = getGraph(jsonResponse);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      graph.nodes,
      graph.edges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  };

  return isLoading ? (
    <div style={{ height: "100vh" }} className="loading">
      <Loading />
    </div>
  ) : (
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
        nodeTypes={nodeTypes}
        className="layoutflow"
      >
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

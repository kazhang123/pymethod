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
import { getReactFlowGraph } from "./reactFlowGraph";
import { calculateCentralityScores, addCentralityScores } from "./graph/closenessCentrality";
import Loading from "./components/Loading";
import 'reactflow/dist/base.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "reactflow/dist/style.css";
import "./App.css";
import './tailwind.config.js';
import CustomNode from './CustomNode';

const nodeTypes = {
  //dont know what this does
  custom: CustomNode,
};

const nodeWidth = 172;
const nodeHeight = 36;

const minimapStyle = {
  height: 120,
  maskColor: "#e3d5ca"
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
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

    setSelectedNode(null);

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

    let centralityScores = calculateCentralityScores(jsonResponse);
    let reactFlowGraph = getReactFlowGraph(jsonResponse);
    let reactFlowGraphWithCentrality = addCentralityScores(reactFlowGraph, centralityScores);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      reactFlowGraphWithCentrality.nodes,
      reactFlowGraphWithCentrality.edges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  };

  const getSelectedFunctionName = () => {
    if (selectedNode == null || selectedNode.data == null || selectedNode.data.label == null) return "";
    return selectedNode.data.label;
  }

  const getSelectedCentralityScore = () => {
    if (selectedNode == null || selectedNode.data == null || selectedNode.data.centrality == null) return "";
    return selectedNode.data.centrality;
  }

  const reactFlowStyle = {
    background: "#e3d5ca",
    width: '100%',
    height: 300,
  };

  return isLoading ? (
    <div style={{ height: "100vh" }} className="loading">
      <Loading />
    </div>
  ) : (
    <div style={{ height: "100vh" }}>
      {(selectedNode != null) &&
      <div className="selected-node-info-display">
        <p><strong>{getSelectedFunctionName()}</strong></p>
        <p>{"Centrality Score: " + getSelectedCentralityScore()}</p>
      </div>}
      <div style={{ height: "85%" }}>
        <ReactFlow
          style={reactFlowStyle}
          nodes={nodes}
          edges={edgesWithUpdatedTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(e, node) => {
            console.log("click!", node);
            setSelectedNode(node);
          }}
          onConnect={onConnect}
          onInit={onInit}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          className="layoutflow"
        >
          <MiniMap style={minimapStyle}
          zoomable
          pannable
          maskColor="#9a8c98"
          nodeColor="#f5ebe0" 
        />
          <Controls />
          <Background color="#4a4e69" gap={16} />
        </ReactFlow>
      </div>
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

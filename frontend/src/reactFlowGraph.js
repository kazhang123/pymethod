import { MarkerType } from "reactflow";

const GRAPH_COLOURS = { BLUE: "#4782ff", RED: "#ff432e" };

function getReactFlowGraphNodes(response) {
  let nodes = [];
  let x = 0;
  let y = 0;
  for (let def of response.defs.allDefs) {
    x += 10;
    y += 10;
    nodes.push({
      id: def,
      type: "custom",
      style: {
        background: "#f5ebe0",
        color: "#4a4e69",
        fontSize: "12px",
        fontFamily: "Helvetica",
      },
      data: {
        label: `${def}()`,
        centrality: -1,
      },
      position: {
        x: x,
        y: y,
      },
    });
  }
  console.log(nodes);
  return nodes;
}

function getReactFlowGraphEdges(response) {
  let edges = [];

  const staticEdges = response.staticFromToEdges;
  const dynamicEdges = response.dynamicFromToEdges;

  for (let caller of Object.keys(staticEdges)) {
    for (let callee of Object.keys(staticEdges[caller])) {
      let newEdge = {
        id: `e${caller}-${callee}`,
        source: caller,
        target: callee,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      // colour in dynamic edges
      if (caller in dynamicEdges && callee in dynamicEdges[caller]) {
        newEdge.style = {
          stroke: GRAPH_COLOURS.RED,
        };
        newEdge.markerEnd.color = GRAPH_COLOURS.RED;
        newEdge.animated = true;
      }

      edges.push(newEdge);
    }
  }
  console.log(edges);
  return edges;
}

export function getReactFlowGraph(response) {
  return {
    nodes: getReactFlowGraphNodes(response),
    edges: getReactFlowGraphEdges(response),
  };
}

export function addCentralityEdgeColours(reactFlowGraph) {
  const { nodes, edges } = reactFlowGraph;

  let maxCentrality = Number.MIN_SAFE_INTEGER;
  let nodeCentralityLookup = {};

  for (let node of nodes) {
    if (node.data.centrality > maxCentrality) {
      maxCentrality = node.data.centrality;
    }
    nodeCentralityLookup[node.id] = node.data.centrality;
  }

  let midCentrality = maxCentrality / 2;

  let newEdges = [];

  for (let edge of edges) {
    const { source } = edge;
    const nodeCentrality = nodeCentralityLookup[source];

    // colour outgoing edges of relatively central nodes red
    let newEdge = {
      ...edge,
      style: {
        stroke:
          nodeCentrality > midCentrality
            ? GRAPH_COLOURS.RED
            : GRAPH_COLOURS.BLUE,
      },
      markerEnd: {
        ...edge.markerEnd,
        color:
          nodeCentrality > midCentrality
            ? GRAPH_COLOURS.RED
            : GRAPH_COLOURS.BLUE,
      },
    };
    newEdges.push(newEdge);
  }

  return { nodes, edges: newEdges };
}

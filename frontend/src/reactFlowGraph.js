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
      data: {
        label: `${def}()`,
        centrality: 0.8,
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

  const staticEdges = response.defs.staticFromToEdges;
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

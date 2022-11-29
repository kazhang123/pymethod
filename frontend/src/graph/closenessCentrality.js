import DiGraph from "./graph";

const purple = {
  r: 105,
  g: 4,
  b: 193,
};
const yellow = {
  r: 254,
  g: 255,
  b: 0,
};

export function addCentralityScores(reactFlowGraph, centralityScores) {
  if (reactFlowGraph.nodes == null) {
    console.log("nodes is undefined");
    return reactFlowGraph;
  }
  let percentages = convertToPercent(centralityScores);
  for (let i = 0; i < reactFlowGraph.nodes.length; i++) {
    let node = reactFlowGraph.nodes[i];
    node.data.centrality = centralityScores[i];
    node.data.percentage = percentages[i];
    let colorCode = calculateColorCode(percentages[i]);
    node.style.border = "3px solid " + colorCode;
  }
  console.log(reactFlowGraph);
  return reactFlowGraph;
}

function calculateColorCode(value) {
  let color = {
    r: Math.round(value*purple.r + (1-value)*yellow.r),
    g: Math.round(value*purple.g + (1-value)*yellow.g),
    b: Math.round(value*purple.b + (1-value)*yellow.b),
  }
  let colorCode = "#" + color.r.toString(16).padStart(2,0) + color.g.toString(16).padStart(2,0) + color.b.toString(16).padStart(2,0);
  return colorCode;
}

export function calculateCentralityScores(jsonResponse) {
  let g = createGraph(jsonResponse);

  let centralityScores = [];

  for (let i = 0; i < g.numVertices; i++) {
    let distances = g.bfs(i);
    let H = 0;
    for (let j = 0; j < g.numVertices; j++) {
      if (distances[j] !== 0) {
        H += (g.numVertices - 1) / distances[j];
      }
    }
    centralityScores[i] = H;
  }

  console.log("Centrality Scores: " + centralityScores);

  return centralityScores;
}

function convertToPercent(centralityScores) {
  let maxScore = Math.max(...centralityScores);
  return centralityScores.map(x => (x / maxScore));
}

function createGraph(jsonResponse) {
  if (
    jsonResponse == null ||
    jsonResponse.defs == null ||
    jsonResponse.defs.allDefs == null ||
    jsonResponse.staticFromToEdges == null
  ) {
    return jsonResponse;
  }

  let nodes = jsonResponse.defs.allDefs;
  let staticEdges = jsonResponse.staticFromToEdges;

  let nodeLabelToVertex = new Map();
  for (let i = 0; i < nodes.length; i++) {
    nodeLabelToVertex.set(nodes[i], i);
  }

  let edges = [];
  for (let from of Object.keys(staticEdges)) {
    for (let to of Object.keys(staticEdges[from])) {
      edges.push({
        from: nodeLabelToVertex.get(from),
        to: nodeLabelToVertex.get(to),
      });
    }
  }

  let g = new DiGraph(nodes.length);
  for (let edge of edges) {
    g.addEdge(edge.from, edge.to);
  }

  g.printGraph();

  return g;
}

import DiGraph from "./graph";

export function addCentralityScores(reactFlowGraph, centralityScores) {
    if (reactFlowGraph.nodes == null) {
        console.log("nodes is undefined");
        return reactFlowGraph;
    }
    for (let i=0; i<reactFlowGraph.nodes.length; i++) {
        let node = reactFlowGraph.nodes[i];
        if (node.data == null || node.data.centrality == null) continue;
        node.data.centrality = centralityScores[i];
    }
    console.log(reactFlowGraph);
    return reactFlowGraph;
}

export function calculateCentralityScores(jsonResponse) {
    let g = createGraph(jsonResponse);

    let centralityScores = [];

    for (let i=0; i<g.numVertices; i++) {
        let distances = g.bfs(i);
        let H = 0;
        for (let j=0; j<g.numVertices; j++) {
            if (distances[j] !== 0) {
                H += (g.numVertices-1)/distances[j];
            }
        }
        centralityScores[i] = H;
    }

    console.log("Centrality Scores: " + centralityScores);

    return centralityScores;
}

function createGraph(jsonResponse) {
    if (jsonResponse == null || 
        jsonResponse.defs == null || 
        jsonResponse.defs.allDefs == null ||
        jsonResponse.defs.staticFromToEdges == null) {
        return jsonResponse;
    }

    let nodes = jsonResponse.defs.allDefs;
    let staticEdges = jsonResponse.defs.staticFromToEdges;

    let nodeLabelToVertex = new Map();
    for (let i=0; i<nodes.length; i++) {
        nodeLabelToVertex.set(nodes[i],i);
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
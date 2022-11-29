
// Directed graph
export default class DiGraph {

    constructor(numVertices)
    {
        this.numVertices = numVertices;
        this.AdjList = new Map();

        for (let i=0; i<numVertices; i++) {
            this.addVertex(i);
        }
    }

    // add a vertex v
    addVertex(v)
    {
        if (this.AdjList == null) {
            console.log("AdjList is undefined");
            return;
        }
        this.AdjList.set(v, []);
    }
    
    // add an edge from vertex v to vertex w
    addEdge(v, w)
    {
        if (this.AdjList == null) {
            console.log("AdjList is undefined");
            return;
        }
        if (this.AdjList.get(v) == null) {
            console.log("No vertex:", v);
            return;
        }
        this.AdjList.get(v).push(w);
    }

    // prints the vertex and adjacency list
    printGraph()
    {
        let keys = this.AdjList.keys();
        for (let key of keys)
        {
            let values = this.AdjList.get(key);
            let neighbours = "";

            for (let j of values)
                neighbours += j + " ";

            console.log(key + " -> " + neighbours);
        }
    }

    // perform BFS starting from vertex v
    // returns a list of the shortest distances to every other node
    bfs(start)
    {
        let visited = new Array(this.numVertices).fill(false);
        let queue = [];
        let distances = new Array(this.numVertices).fill(0);

        queue.push(start);
        visited[start] = true;
        distances[start] = 0;

        while (queue.length > 0) {
            let vertex = queue.shift();
            let neighbours = this.AdjList.get(vertex);
            for (let i = 0; i < neighbours.length; i++) {
                if (!visited[i]) {
                    visited[i] = true;
                    distances[i] = distances[vertex] + 1;
                    queue.push(i);
                }
            }
        }
        return distances;
    };
}
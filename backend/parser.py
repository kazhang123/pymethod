import ast

class AstParser:
    def __init__(self):
        self.defs = {}
        self.defs["functionDefs"] = []
        self.defs["classDefs"] = []
        self.defs["allDefs"] = []
        self.staticFromToEdges = {}

    def parse(self, file):
        tree = ast.parse(file)
        for node in ast.walk(tree):
            for child in ast.iter_child_nodes(node):
                child.parent = node

        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                self.functionDef(node)
            if isinstance(node, ast.ClassDef):
                self.classDef(node)
        
        for node in ast.walk(tree):
            if isinstance(node, ast.Call) :
                self.edge(node)
        
        return self.defs, self.staticFromToEdges

    def edge(self, node):
        parent = node.parent
        while ((not isinstance(parent, ast.FunctionDef)) and (not isinstance(parent, ast.ClassDef))):
            if (isinstance(parent, ast.Module)) :
                return
            parent = parent.parent

        calleeName = ""
        if isinstance(node.func, ast.Attribute):
            calleeName = node.func.attr
        else :
            calleeName = node.func.id

        callerName = parent.name

        if (calleeName not in self.defs["allDefs"]) or (callerName not in self.defs["allDefs"]) :
            return

        edges = {}    
        if (callerName in edges) :
            if (calleeName in edges[callerName]) :
                edges[callerName][calleeName] = edges[callerName][calleeName] + 1
            else :
                edges[callerName][calleeName] = 1
        else :
            toNode = {}
            toNode[calleeName] = 1
            edges[callerName] = toNode

        if (callerName in self.defs["allDefs"]) and (calleeName in self.defs["allDefs"]) :
            if (callerName in self.staticFromToEdges) :
                self.staticFromToEdges[callerName][calleeName] = calleeName
            else :
                self.staticFromToEdges[callerName] = {}
                self.staticFromToEdges[callerName][calleeName] = calleeName

    def functionDef(self, node):
        definition = {}
        definition["name"] = node.name
        self.defs["functionDefs"] += [definition]
        self.defs["allDefs"] += [node.name]

    def classDef(self, node):
        definition = {}
        definition["className"] = node.name
        names = []
        for node in node.body:
            if (node.name != "__init__") :
                names.append(node.name)
        definition["names"] = names
        self.defs["classDefs"] += [definition]
        self.defs["allDefs"] += names
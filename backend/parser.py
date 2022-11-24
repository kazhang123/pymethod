import ast

def ast_parser(file):
    defs = {}
    defs["functionDefs"] = []
    defs["classDefs"] = []
    defs["allDefs"] = []
    defs["staticFromToEdges"] = {}

    tree = ast.parse(file)
    for node in ast.walk(tree):
        for child in ast.iter_child_nodes(node):
            child.parent = node

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            functionDef(node, defs)
        if isinstance(node, ast.ClassDef):
            classDef(node, defs)
    
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) :
            edge(node, defs)
    
    return defs

def edge(node, defs):
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

    if (calleeName not in defs["allDefs"]) or (callerName not in defs["allDefs"]) :
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

    if (callerName in defs["allDefs"]) and (calleeName in defs["allDefs"]) :
        if (callerName in defs["staticFromToEdges"]) :
            defs["staticFromToEdges"][callerName][calleeName] = calleeName
        else :
            defs["staticFromToEdges"][callerName] = {}
            defs["staticFromToEdges"][callerName][calleeName] = calleeName

def functionDef(node, defs):
    definition = {}
    definition["name"] = node.name
    defs["functionDefs"] += [definition]
    defs["allDefs"] += [node.name]

def classDef(node, defs):
    definition = {}
    definition["className"] = node.name
    names = []
    for node in node.body:
        if (node.name != "__init__") :
            names.append(node.name)
    definition["names"] = names
    defs["classDefs"] += [definition]
    defs["allDefs"] += names
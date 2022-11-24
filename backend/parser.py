import ast

def ast_parser(file):
    tree = ast.parse(file)
    for node in ast.walk(tree):
        for child in ast.iter_child_nodes(node):
            child.parent = node

    for node in ast.walk(tree):
        if isinstance(node, ast.Call) :
            parent = node.parent
            while ((not isinstance(parent, ast.FunctionDef)) and (not isinstance(parent, ast.ClassDef))):
                parent = parent.parent
            print(ast.dump(parent, indent=4))
    
    defs = {}
    defs["functionDefs"] = []
    defs["classDefs"] = []
    defs["allDefs"] = []
    for node in tree.body:
        if isinstance(node, ast.FunctionDef):
            functionDef(node, defs)
        if isinstance(node, ast.ClassDef):
            classDef(node, defs)
    return defs

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
    
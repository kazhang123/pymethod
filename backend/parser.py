import ast

def ast_parser(file):
    tree = ast.parse(file)
    #print(ast.dump(tree, indent=3))
    #print('----------------------------------------------------------------------------------------')
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
        names.append(node.name)
        defs["allDefs"] += [node.name]
    definition["names"] = names
    defs["classDefs"] += [definition]
    
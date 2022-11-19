#!/usr/bin/env python
# encoding: utf-8

import sys

allDefs = []
edges = {}

def trace_callback(frame, event, arg):
    if event != 'call':
        return

    co = frame.f_code
    coName = co.co_name
    
    if (coName not in allDefs) :
        return

    caller = frame.f_back
    callerName = caller.f_code.co_name

    if (callerName not in allDefs) :
        return

    #print(co)
    #print(caller)

    if (callerName in edges) :
        if (coName in edges[callerName]) :
            edges[callerName][coName] = edges[callerName][coName] + 1
        else :
            edges[callerName][coName] = 1
    else :
        toNode = {}
        toNode[coName] = 1
        edges[callerName] = toNode
    return

def trace_call(file_bytes, defs, args):
    global allDefs
    global edges
    allDefs = []
    edges = {}
    allDefs.extend(defs['allDefs'])
    sys.settrace(trace_callback)
    exec(file_bytes, locals(), locals()) # globals(), globals()
    sys.settrace(None)
    return edges
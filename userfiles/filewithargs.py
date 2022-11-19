import sys

def c() :
    print("c was called")

def b() :
    print("b was called")

def a() :
    if (sys.argv[1] == "0") :
        b()
    else :
        c()

a()
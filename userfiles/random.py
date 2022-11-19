import random

class randomclass:
    def foo() :
        morerandomclass.bar()
        morerandomclass.bar()
        morerandomclass.bar()
        morerandomclass.bar()
        morerandomclass.bar()

class morerandomclass:
    def bar() :
        if (random.randint(0,1) == 0) :
            e()
        else :
            f()

def e():
    i = 0

def f():
    i = 0

def d():
    randomclass.foo()

def c():
    d()

def b():
    i = 1
    while (i != 0) :
        i -= 1
        c()

def a():
    if (0) :
        b()
    else :
        b()

a() 
d()
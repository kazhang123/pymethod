import sys, time

def fib(n):
    if n == 0 or n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

def f(n):
    times = []
    for k in range(n):
        t0 = time.time()
        for i in range(10):
            fib(20)
        times.append(time.time() - t0)
    return times

f(1)
#!/usr/bin/env python
# -*- coding: utf-8 -*-
from math import sin, cos, sqrt
import optparse
import time
import sys
if sys.version_info[0] > 2:
    xrange = range

class Point(object):

    def __init__(self, i):
        #print("init")
        self.x = x = sin(i)
        self.y = cos(i) * 3
        self.z = (x * x) / 2

    def __repr__(self):
        #print("repr")
        return "<Point: x=%s, y=%s, z=%s>" % (self.x, self.y, self.z)

    def normalize(self):
        #print("norm")
        x = self.x
        y = self.y
        z = self.z
        norm = sqrt(x * x + y * y + z * z)
        self.x /= norm
        self.y /= norm
        self.z /= norm

    def max(self, other):
        #print("point max")
        self.x = self.x if self.x > other.x else other.x
        self.y = self.y if self.y > other.y else other.y
        self.z = self.z if self.z > other.z else other.z
        return self


def maximize(points):
    # print("max")
    next = points[0]
    for p in points[1:]:
        next = next.max(p)
    return next

def benchmark(n):
    # print("bench")
    points = [None] * n
    for i in xrange(n):
        points[i] = Point(i)
    for p in points:
        p.normalize()
    return maximize(points)

POINTS = 10
   
o = benchmark(POINTS)


# MILESTONES

## Milestone 1:
This week we've been trying to narrow down potential ideas for project 2. So far we've come up with the following ideas:
- Control flow visualizer with added features (i.e runtime analyses)
- Extracting a UML class diagram from class hierarchy in a dynamic programming language such as python

Our current favourite is:
A dynamic centrality diagram that visualises the centrality of classes given some execution. For example, a function in a loop will be analysed so that the our program tracks the number of times it was called. The program will produce a centrality graph where the nodes represent the classes, and the edges represent how much dependency there is between some nodes. A blue edge will mean that there is minimal dependency, and a red node means that there is a lot of dependency. The user can also click on the nodes to get information about how much a given class was used by some other class, how much time was spent in some class for a given execution, how many classes were made to its classes, etc. Our target language is Java. 

Our planned follow up tasks for next week include:
- Continuing to research / narrow down on project ideas
- Get feedback from Jifeng on our findings

## Milestone 2:
Our planned program analysis: An interactive control flow graph for a method with a centrality heatmap and sequence information.
- First, we generate a control flow graph statically for the method from the AST.
- While the program runs, we record the sequence of basic blocks executed everytime the method is called.
- To generate the final image, we will colour code the branches of the control flow graph, depending on the frequency they were executed, in the style of a heatmap.
- The sequences of basic blocks for each call will be displayed in a list beneath the graph.
- Hovering over a sequence will highlight the path on the control flow graph.

Talking to Prof. Summers, we discovered our original idea did not fully meet the assignment's requirements. During a very helpful and productive meeting with out TA, we developed the idea above.

We currently have the project planned out at a high-level. In the coming week, we will begin researching and start making some more granular design decisions.
TODO before next milestone:
- choose the real-world programming language to target,
- sketch the appearance of the visual component, and
- begin research on how to generate a control flow graph and how to instrument source code.

Early Division of Responsibilities (will be subject to change and revision):
Frontend: Katharine, Elizabeth
Backend: Michael, Brandon

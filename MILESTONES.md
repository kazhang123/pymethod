# MILESTONES

## Milestone 1:
This week we've been trying to narrow down potential ideas for project 2. So far we've come up with the following ideas:
- Control flow visualizer with added features (i.e runtime analyses)
- Extracting a UML class diagram from class hierarchy in a dynamic programming language such as python

Our current favourite is:
A dynamic centrality diagram that visualises the centrality of classes given some execution. For example, a function in a loop will be analysed so that the our program tracks the number of times it was called. The program will produce a centrality graph where the nodes represent the classes, and the edges represent how much dependency there is between some nodes. A blue edge will mean that there is minimal dependency, and a red node means that there is a lot of dependency. The user can also click on the nodes to get information about how much a given class was used by some other class, how much time was spent in some class for a given execution, how many classes were made to its classes, etc. Our target language is Python. 

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

## Milestone 3:
### Mockup:
**This mockup was used in our user study however this is not the final version of our graph so it will likely change.**
![Captura de pantalla 2022-11-14 a las 10 08 36 a  m](https://media.github.students.cs.ubc.ca/user/1578/files/d9bfdcf2-9b1f-443e-898b-3f73f9d82db8)
### Results from user study:
We did one user study on a third year computer science student where we showed our participant the mockup seen above and probed them on how useful they thought the tool would be in their own projects. We found that the sequencing aspect of our tool was a little bit difficult to understand at first, but upon looking at the graph they were able to get a better understanding of the part that sequencng plays in generating the heat map. They also thought that the heatmap was easy to understand and said that it could help them optimize their code by paying special attention to frequently used sequences. Future suggestions from the user included:
- Having the part of the graph that is related to a particular node be highlighted when you hover over the node and display dynamic information
- Make graph more connected to code so that it's easier to relate the two (ie. hovering idea from above, having code snippets in graph, etc)
- Flow diagram solely within a method and the sequence represents the nodes that were "hit"
- User thought we could add more statistics to diagram
### Changes to original design:
- We will be making modifications this week using the user feedback and feedback from Jifeng
### Roadmap for next week:
- Touch base with Jifeng on project implementation and how to intercept java code of user
### Updates on roadmap:
- We have chosen Python as the language target
- We've created a mockup of our visual component
- Continuing research on how to implement our project (i.e. code interception and control flow graph generation)

# Milestone 4:
## Implemention Progress:
- Touched base with Jifeng and we are clear on what we need to do implementation wise
- We have since changed our target language to python
- Almost done with sys trace research

## Plan for final user study:
- We plan on doing our user studies next week after we have our backend implemented and we will ask a 4th year computer science student proficient in python to write a sample script. From there they will run our python script that intercepts their code and generates some sort of visualization for the control flow of their program

## Planned timeline for the remaining days:
- We plan on finishing our implementation by Friday the 25 and we will leave the period after that until the 30th to do testing and bug fixes + create our video

## Progress against the timeline planned for your team, including the specific goals you defined (originally as part of Milestone 2) for Milestone 4; any revisions to Milestone 5 goals.
### Old Goals:
- choose the real-world programming language to target,-- **Python has been chosen as our target**
- sketch the appearance of the visual component -- **We have included a sample mockup of what our visualization may look like**
- begin research on how to generate a control flow graph and how to instrument source code. -- **We have worked with Jifeng to use systrace to record the sequence of method calls in our given user's code**



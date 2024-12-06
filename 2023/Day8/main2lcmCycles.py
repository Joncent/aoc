from Node import Node
import sys
import math
import functools

input = open("input.txt")
lines = input.readlines()
for i in range(len(lines)):
    lines[i] = lines[i].replace("\n", "")

directions = lines[0]
stringNodes = lines[2:]

nodes = []


#read In the nodes from file:

for stringNode in stringNodes:
    nodeData = stringNode.split(" = ")
    nodeDestinations = nodeData.pop()
    nodeDestinations = nodeDestinations.replace("(", "")
    nodeDestinations = nodeDestinations.replace(")", "")
    nodeData.extend(nodeDestinations.split(", "))
    newNode = Node(nodeData[0], nodeData[1], nodeData[2])
    #print(f'Node {newNode.name} created with leftDest: {newNode.leftDest} and rightDest: {newNode.rightDest}')
    nodes.append(newNode)

def searchNodeByName(name):
    for node in nodes:
        if node.name == name:
            return node
        
def searchNodesByEnding(char):
    localNodes = []
    for node in nodes:
        if node.isEndingWith(char):
            localNodes.append(node)
    return localNodes

def goInDirection(node, direction):
    if direction == "R":
        return searchNodeByName(node.rightDest)
    else:
        return searchNodeByName(node.leftDest)


numbersOfSteps = []
currentNodes = searchNodesByEnding("A")

if currentNodes == None:
    print("No starting Nodes with Ending ..A found")
    sys.exit()


for node in currentNodes:
    nodeCycleLength = 0
    while not node.isEndingWith("Z"):
        for direction in directions:
            node = goInDirection(node, direction)
            nodeCycleLength += 1
    numbersOfSteps.append(nodeCycleLength)
    print(numbersOfSteps)


numberOfSteps = functools.reduce(math.lcm, numbersOfSteps)


print(f'only nodes with ..Z reached! Number of steps needed: {numberOfSteps}')






    


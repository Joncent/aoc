from Node import Node
import sys

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

numberOfSteps = 0
currentNode = searchNodeByName("AAA")

if currentNode == None:
    print("No starting Node with Name AAA found")
    sys.exit()


while currentNode.name != "ZZZ":
    for direction in directions:
        
        if direction == "R":
            currentNode = searchNodeByName(currentNode.rightDest)
            #print(f'went right. Now at node {currentNode.name}')
        else:
            currentNode = searchNodeByName(currentNode.leftDest)
            #print(f'went left. Now at node {currentNode.name}')
        numberOfSteps += 1

print(f'ZZZ reached! Number of steps needed: {numberOfSteps}')






    


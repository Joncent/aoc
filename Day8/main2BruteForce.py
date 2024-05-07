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
        
def searchNodesByEnding(char):
    localNodes = []
    for node in nodes:
        if node.isEndingWith(char):
            localNodes.append(node)
    return localNodes

def goInDirection(direction):
    if direction == "R":
        for i in range(len(currentNodes)):
            currentNodes[i] = searchNodeByName(currentNodes[i].rightDest)
    else:
        for i in range(len(currentNodes)):
            currentNodes[i] = searchNodeByName(currentNodes[i].leftDest)


def EndNotReached():
    for node in currentNodes:
        if not node.isEndingWith("Z"):
            return True
    return False


numberOfSteps = 0
reachedEnd = False
currentNodes = searchNodesByEnding("A")
print(len(currentNodes))
print(len(searchNodesByEnding("Z")))

if currentNodes == None:
    print("No starting Nodes with Ending ..A found")
    sys.exit()


while EndNotReached():
    for direction in directions:
        goInDirection(direction)
        numberOfSteps += 1

print(f'only nodes with ..Z reached! Number of steps needed: {numberOfSteps}')






    


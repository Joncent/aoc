class Node():
    def __init__(self, x, y, symbol):
        self.x = x
        self.y = y
        self.symbol = symbol
        self.connections = []
    
    def SetConnections(nodesArray):
        self.connections = nodesArray
    
    def getConnections():
        return self.connections


class Board():
    def __init__(self, stringArray):
        self.nodeArray = []
        for y in range(len(stringArray)):
            for x in range(len(stringArray[y])):
                self.nodeArray[x][y] = Node(x, y, stringArray[y][x])
    
    def show(self):
        for line in self.nodeArray:
            for node in line:
                print("HEllo")
                print(node.symbol)
        
        


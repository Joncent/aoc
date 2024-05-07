class Node():
    def __init__(self, name, leftDest, rightDest):
        self.name = name
        self.rightDest = rightDest
        self.leftDest = leftDest

    def isEndingWith(self, char):
        if self.name[2] == char:
            return True
        else:
            return False
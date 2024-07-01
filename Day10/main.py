from Classes import Node
from Classes import Board

input = open("test1.txt")
lines = input.readlines()
for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    print(lines[i])

board = Board(lines)
board.show()



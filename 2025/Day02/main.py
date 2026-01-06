# input stuff

lines = open("input.txt").readlines()
data = []

data = lines[0].split(",")
ranges = []
for i in range(len(data)):
    _range = data[i].split("-")
    ranges.append([int(_range[0]), int(_range[1])])


# functions
def isInvalid(num):
    numString = str(num)
    if len(numString) % 2 != 0:
        return False
    for i in range(int(len(numString)/2)):
        if numString[i] != numString[i + int(len(numString)/2)]:
            return False
    return True

sum = 0

for _range in ranges:
    for i in range(_range[0], _range[1]):
        if isInvalid(i):
            sum += i

print(sum)

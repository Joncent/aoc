# input stuff

lines = open("input.txt").readlines()
data = []

data = lines[0].split(",")
ranges = []
for i in range(len(data)):
    _range = data[i].split("-")
    ranges.append([int(_range[0]), int(_range[1])])



# functions
def hasPattern(numString, pattern):
    if len(pattern) == 0:
        return False
    if not (len(numString) / len(pattern)).is_integer():
        return False
    totalTimes = int(len(numString)/len(pattern))
    for i in range(1, totalTimes):
        for j in range(len(pattern)):
            if not pattern[j] == numString[i * len(pattern) + j]:
                return False
    return True


#TODO: Weiterimtext 
def isInvalid(num):
    numString = str(num)
    for i in range(len(numString)):
        if hasPattern(numString, numString[0:i]):
            return True
    return False


sum = 0

for _range in ranges:
    for i in range(_range[0], _range[1]):
        if isInvalid(i):
            sum += i

print(sum)

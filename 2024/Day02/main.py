def calculateDiff(array):
    diff = []
    for i in range(len(array)-1):
        diff.append(array[i+1]-array[i])
    return diff



def isArrayIncreasing(array):
    for number in array:
        if number > 0 and number < 4:
            continue
        else:
            return False
    return True

def isArrayDecreasing(array):
    for number in array:
        if number < 0 and number > -4:
            continue
        else:
            return False
    return True

def isArraySafe(array):
    return isArrayIncreasing(array) or isArrayDecreasing(array)


lines = open("test.txt").readlines()
data = []

for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    lines[i].strip()
    numbers = lines[i].split()
    numbers = [int(a) for a in numbers]
    data.append(numbers)

# calculate diffs
diffs = [calculateDiff(a) for a in data]

# check if line in diffs is only positive or only negative
safeArrays = [isArraySafe(a) for a in diffs]
print(safeArrays.count(True))





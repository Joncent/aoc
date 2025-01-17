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

def getPossibleArrays(array):
    possibleArrays = [array]
    for i in range(len(array)):
        possibleArray = array.copy()
        possibleArray.pop(i)
        possibleArrays.append(possibleArray)
    return possibleArrays


lines = open("data.txt").readlines()
data = []

for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    numbers = lines[i].split()
    numbers = [int(a) for a in numbers]
    data.append(numbers)

safeArrays = []
for array in data:
    possibleArrays = getPossibleArrays(array)
    possibleDiffs = [calculateDiff(a) for a in possibleArrays]
    possibleSafeArrays = [isArraySafe(a) for a in possibleDiffs]
    safeArrays.append(possibleSafeArrays.count(True) > 0)


# check if line in diffs is only positive or only negative
print(safeArrays.count(True))





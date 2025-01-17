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


lines = open("data.txt").readlines()
data = []

for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    numbers = lines[i].split()
    numbers = [int(a) for a in numbers]
    data.append(numbers)

# calculate diffs
diffs = []
for line in data:
    diff = []
    for i in range(len(line)-1):
        diff.append(line[i+1]-line[i])
    diffs.append(diff)

# check if line in diffs is only positive or only negative
safeArrays = [isArraySafe(a) for a in diffs]
print(safeArrays)
print(safeArrays.count(True))





import sys

input = open("input.txt")
lines = input.readlines()
data = []
for i in range(len(lines)):
    lines[i] = lines[i].replace("\n", "")
    numArray = lines[i].split(" ")
    for j in range(len(numArray)):
        numArray[j] = int(numArray[j])
    data.append(numArray)




#recursive function for finding next number in line
#function takes array and returns array with appended last digit
def InterpolateArray(array):
    
    if (isZeroArray(array)):
        array.append(0)
        return array
    else:
        array.append(InterpolateArray(findDiffArray(array))[-1] + array[-1])
        return array
    

def findDiffArray(array):
    diffArray = []
    for i in range(len(array)-1):
        diff = array[i+1]-array[i]
        diffArray.append(diff)
    return diffArray

def isZeroArray(array):
    for number in array:
        if number != 0:
            return False
    return True

result = 0

for i in range(len(data)):
    result += InterpolateArray(data[i])[-1]

print(result)
import math

# input stuff

lines = open("input1.txt").readlines()
data = []

for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    command = []
    command.append(lines[i][0])
    command.append(lines[i][1:])
    data.append(command)

# logic:
position = 50
counter = 0
for line in data:
    print(line)
    oldPosition = position
    if line[0] == "R":
        position += int(line[1])
    else:
        # if position == 0:
        #     counter -= 1
        position -= int(line[1])

    if position != position % 100:
        hundred = position / 100
        print(str(hundred) + " -> " + str(int(hundred)) )
        hundred = abs(int(hundred))
        counter += hundred
    if position == 0:
        counter += 1
        print("zero")
    if oldPosition * position < 0:
        counter += 1

    print(str(position) + ": " + str(counter))
    position = position % 100
print(counter)



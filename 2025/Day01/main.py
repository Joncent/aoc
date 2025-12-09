# input stuff

lines = open("input1.txt").readlines()
data = []

for i in range(len(lines)):
    lines[i] = lines[i].removesuffix("\n")
    command = []
    command.append(lines[i][0])
    command.append(lines[i][1:])
    data.append(command)
    print(command)

# logic:
position = 50
counter = 0
for line in data:
    if line[0] == "R":
        position += int(line[1])
    else:
        position -= int(line[1])
    position = position % 100
    if position == 0:
        counter += 1
print(counter)



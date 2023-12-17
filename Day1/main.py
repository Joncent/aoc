input = open("input.txt")
lines = input.readlines()
for i in range(len(lines)):
    lines[i] = lines[i].replace("\n", "")

def getFirstDigit(string):
    for char in string:
        if char in numbers:
            digit = char
            return digit

def getLastDigit(string):
    for char in string:
        if char in numbers:
            digit = char
    return digit




numbers = {
    "1": 1,
    "2": 2, 
    "3": 3,
    "4": 4, 
    "5": 5,
    "6": 6, 
    "7": 7, 
    "8": 8, 
    "9": 9, 
    "0": 0
}

twoDigits = []

for line in lines:
    no = int(getFirstDigit(line) + getLastDigit(line))
    twoDigits.append(no)

sum = 0
for number in twoDigits:
    sum = sum + number

print(f"Total sum is {sum}")

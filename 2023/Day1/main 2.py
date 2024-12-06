input = open("input.txt")
lines = input.readlines()
for i in range(len(lines)):
    lines[i] = lines[i].replace("\n", "")

def getFirstDigit(string):
    for i in range(len(string)+1):
        word = string[:i]
        #check int digits:
        for no in numbers:
            if no in word:
                return no
        #check wordnumbers:
        for wordNo in numberWords.keys():
            if wordNo in word:
                return numberWords[wordNo]
    print("none first found in string: " + string)


def getLastDigit(string):
    length = len(string)
    for i in range(length + 1):
        word = string[length - i:]
        #check int digits:
        for no in numbers:
            if no in word:
                return no
        #check wordnumbers:
        for wordNo in numberWords.keys():
            if wordNo in word:
                return numberWords[wordNo]
    print("none  last found in string: " + string)



numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

numberWords = {
    "eight": "8",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "nine": "9",
    "one": "1",
}

#replace stringwords with numbers

#for i in range(len(lines)):
 #   line = lines[i]
  #  for key in numberWords.keys():
   #     line = line.replace(key, numberWords[key])
    #lines[i] = line'

twoDigits = []

for line in lines:
    no = int(getFirstDigit(line) + getLastDigit(line))
    twoDigits.append(no)

sum = 0
for number in twoDigits:
    sum = sum + number

print(f"line: {lines[3]}, first: {getFirstDigit(lines[3])}, last: {getLastDigit(lines[3])}")
print(f"Total sum is {sum}")

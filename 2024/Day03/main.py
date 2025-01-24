import re

def read_input_file(filepath:str) -> str:
    """Reading input file"""
    with open(filepath) as file:
        data = "minimum"
        for line in file:
            data += line.strip()
        return data
    
def get_tuples_to_multiply(input : str) -> list[tuple : int]:
    """Returns list of integer-tuples from given string"""
    string_tuples = re.findall(r"mul\((\d+),(\d+)\)",input)
    int_tuples = []
    for string_tuple in string_tuples:
        new_tuple = (int(string_tuple[0]), int(string_tuple[1]))
        int_tuples.append(new_tuple)

    return int_tuples


def multiply_tuples(tuples : list[tuple : int]) -> int:
    """returns sum of products of given tuple-list"""
    result = 0
    for tuple in tuples:
        result += tuple[0] * tuple[1]
    return result

    
def main():
    # saving input string
    input = read_input_file("data.txt")

    # get array of tuples to multiply
    tuples_to_multiply = get_tuples_to_multiply(input)

    # multyply tuples and add them to the sum
    print(multiply_tuples(tuples_to_multiply))

    

if __name__ == "__main__":
    main()
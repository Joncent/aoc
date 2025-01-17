from typing import List

def calculate_diff(array: List[int]) -> List[int]:
    """Calculate the differences between consecutive elements in an array."""
    return [array[i + 1] - array[i] for i in range(len(array) - 1)]

def is_array_increasing(array: List[int]) -> bool:
    """Check if all elements in the array are between 0 and 4 (exclusive)."""
    return all(0 < number < 4 for number in array)

def is_array_decreasing(array: List[int]) -> bool:
    """Check if all elements in the array are between -4 and 0 (exclusive)."""
    return all(-4 < number < 0 for number in array)

def is_array_safe(array: List[int]) -> bool:
    """Check if an array is either increasing or decreasing based on the criteria."""
    return is_array_increasing(array) or is_array_decreasing(array)

def process_input_file(file_path: str) -> List[List[int]]:
    """Read and process the input file into a list of integer arrays."""
    with open(file_path, 'r') as file:
        return [list(map(int, line.strip().split())) for line in file]

def main():
    # Read and process data from the input file
    data = process_input_file("test.txt")

    # Calculate differences for each array
    diffs = [calculate_diff(array) for array in data]

    # Check if each difference array is safe
    safe_arrays = [is_array_safe(diff) for diff in diffs]

    # Output the count of safe arrays
    print(safe_arrays.count(True))
    
if __name__ == "__main__":
    main()

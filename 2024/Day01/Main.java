package Day01;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class Main{
	public static void main(String[] args){
		String path = "C:/Users/JohannesPfennig/Joncent/aoc/2024/Day01/input.txt";
		List<String> input = InputReader.ReadFromTXT(path);
		System.out.println("Working:");
		ArrayList<Integer> listA = new ArrayList<Integer>();
		ArrayList<Integer> listB = new ArrayList<Integer>();
		
		for (int i = 0; i < input.size(); i++){
			listA.add(Integer.parseInt(input.get(i).split("   ")[0]));
			listB.add(Integer.parseInt(input.get(i).split("   ")[1]));
			

		}
		System.out.println(listA.get(0));
		Collections.sort(listA);
		Collections.sort(listB);
		System.out.println(listA.get(0));

		ArrayList<Integer> listC = new ArrayList<Integer>();
		for (int i = 0; i < listA.size(); i++){
			int diff = listA.get(i) - listB.get(i);
			if (diff < 0) diff = -diff;
			listC.add(diff);

		}

		int result = 0;
		for (int i = 0; i < listC.size(); i++){

			result += listC.get(i);
		}
		System.out.println(result);

		
	}
}



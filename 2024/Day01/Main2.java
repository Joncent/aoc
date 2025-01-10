package Day01;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class Main2 {

    public static void main(String[] args) {
        String path = "C:/Users/JohannesPfennig/Joncent/aoc/2024/Day01/input.txt";
        List<String> input = InputReader.ReadFromTXT(path);
        ArrayList<Integer> listA = new ArrayList<Integer>();
        ArrayList<Integer> listB = new ArrayList<Integer>();

        for (int i = 0; i < input.size(); i++) {
            listA.add(Integer.parseInt(input.get(i).split("   ")[0]));
            listB.add(Integer.parseInt(input.get(i).split("   ")[1]));

        }

        int result = 0;
        for (int number : listA) {
            int occurances = Collections.frequency(listB, number);
            result += occurances * number;
        }
        System.out.println(result);

    }

}

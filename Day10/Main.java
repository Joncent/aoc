package Day10;

import java.util.List;

class Main{

    public static void main(String[] args){

        String path = "C:/Users/Johannes/source/JS/aoc/Day10/input.txt";
        List<String> input = InputReader.ReadFromTXT(path);
        Grid grid = new Grid(input);

        grid.print();

        //Checking nextTileMethod
        // Tile oldTile = grid.GetTile(1, 2);
        // Tile currentTile = grid.GetTile(1, 3);
        // Tile nextTileCheck = grid.GetNextTile(oldTile, currentTile);
        // System.out.print(nextTileCheck.xCoord);
        // System.out.println(nextTileCheck.yCoord);
        System.out.println(grid.LoopTiles.size()/2);




    }
}
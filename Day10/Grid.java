package Day10;

import java.util.ArrayList;
import java.util.List;

public class Grid {
    private Tile[][] tileArray;
    public ArrayList<Tile> LoopTiles = new ArrayList<Tile>();
    public S_Tile StartTile;
    public Grid(List<String> stringList){
        tileArray = new Tile[stringList.size()][stringList.get(0).length()];
        for (int i = 0; i < stringList.size(); i++){
            String string = stringList.get(i);
            for (int j = 0; j < string.length(); j++){
                Tile tile = TileBuilder.buildTile(j, i, string.charAt(j));
                this.tileArray[i][j] = tile;
            }
        }
        StartTile = getStartTile();
        FindLoop();
    }

    private void FindLoop(){
        Tile startTile = GetTile(StartTile.xCoord, StartTile.yCoord);
        LoopTiles.add(startTile);
        Tile oldTile = startTile;
        Tile currentTile = StartTile.getFirstConnection(this);
        

        do {
            LoopTiles.add(currentTile);
            Tile BufferTile = currentTile;
            currentTile = GetNextTile(oldTile, currentTile);
            oldTile = BufferTile;
        } while (currentTile != startTile);

    }

    public void print(){
        for (Tile[] tileRow:tileArray){
            for (Tile tile:tileRow){
                System.out.print(tile.GetSymbol());
            }
            System.out.print(System.lineSeparator());
        }
    }

    public Tile GetTile(int x, int y){
        return tileArray[y][x];
    }
    
    public Tile GetNextTile(Tile oldTile, Tile currentTile){
        int[] nextCoords = currentTile.GetNextCoords(oldTile);
        return GetTile(nextCoords[0], nextCoords[1]);

    }

    public S_Tile getStartTile(){
        for (int i = 0; i < tileArray.length; i++){
            for (int j = 0; j < tileArray[0].length; j++){
                Tile tile = tileArray[i][j];
                if (tile.GetSymbol() == 'S'){
                    return (S_Tile)GetTile(tile.xCoord, tile.yCoord);
                }
            }
        }
            System.out.println("Could not find StartTile");
            return null;
    }




    
}

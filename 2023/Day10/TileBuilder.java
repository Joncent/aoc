package Day10;

import java.util.Arrays;
import java.util.List;

public class TileBuilder {
    public static Tile buildTile(int x, int y, char type){
        switch(type){

            case '|':
                return new Vert_Tile(x, y);
            
            case '-':
                return new Horizon_Tile(x, y);

            case 'L': 
                return new L_Tile(x, y);

            case 'J':
                return new J_Tile(x, y);
            
            case '7':
                return new Seven_Tile(x, y);
            
            case 'F':
                return new F_Tile(x, y);
            
            case 'S':
                return new S_Tile(x, y);
            
            case '.':
                return new Dot_Tile(x, y);

            
            //TODO: do the rest...

            default:
            System.out.println("Could not read the Symbol for creating Tile");
                return new Dot_Tile(x, y);

        }
            
            
        


    } 

    
    
}



abstract class Tile{
    int xCoord;
    int yCoord;

    public Tile(int x, int y){
        this.xCoord = x;
        this.yCoord = y;
    }

    public abstract int[] GetNextCoords(Tile oldTile);
    public abstract char GetSymbol();

}

class Vert_Tile extends Tile{

    public Vert_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //Coming from below
        if (oldTile.yCoord == this.yCoord + 1){
            int[] newCoords = {this.xCoord, this.yCoord - 1};
            return newCoords;
        }
        //Coming from above
        if (oldTile.yCoord == this.yCoord - 1){
            int[] newCoords = {this.xCoord, this.yCoord + 1};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return '|';
    }

}

class Horizon_Tile extends Tile{

    public Horizon_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //Coming from left
        if (oldTile.xCoord == this.xCoord - 1){
            int[] newCoords = {this.xCoord + 1, this.yCoord};
            return newCoords;
        }
        //Coming from right
        if (oldTile.xCoord == this.xCoord + 1){
            int[] newCoords = {this.xCoord - 1, this.yCoord};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return '-';
    }

}

class L_Tile extends Tile{

    public L_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //coming from the right
        if (oldTile.xCoord == this.xCoord + 1){
            int[] newCoords = {this.xCoord, this.yCoord - 1};
            return newCoords;
        }
        //coming from above
        if (oldTile.yCoord == this.yCoord - 1){
            int[] newCoords = {this.xCoord + 1, this.yCoord};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return 'L';
    }

}

class J_Tile extends Tile{

    public J_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //coming from the above
        if (oldTile.yCoord == this.yCoord - 1){
            int[] newCoords = {this.xCoord - 1, this.yCoord};
            return newCoords;
        }
        //coming from the left
        if (oldTile.xCoord == this.xCoord - 1){
            int[] newCoords = {this.xCoord, this.yCoord - 1};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return 'J';
    }

}

class Seven_Tile extends Tile{

    public Seven_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //coming from below
        if (oldTile.yCoord == this.yCoord + 1){
            int[] newCoords = {this.xCoord - 1, this.yCoord};
            return newCoords;
        }
        //coming from the left
        if (oldTile.xCoord == this.xCoord - 1){
            int[] newCoords = {this.xCoord, this.yCoord + 1};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return '7';
    }

}

class F_Tile extends Tile{

    public F_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        //coming from below
        if (oldTile.yCoord == this.yCoord + 1){
            int[] newCoords = {this.xCoord + 1, this.yCoord};
            return newCoords;
        }
        //coming from the right
        if (oldTile.xCoord == this.xCoord + 1){
            int[] newCoords = {this.xCoord, this.yCoord + 1};
            return newCoords;
        }
        else{
            System.out.println("Cant find new Coordinates");
            return null;
        }
    }

    public char GetSymbol(){
        return 'F';
    }

}

class Dot_Tile extends Tile{
    public Dot_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        System.out.println("Something went wrong: Landed on . Tile");
        return null;
    }
    public char GetSymbol(){
        return '.';
    }
}

class S_Tile extends Tile{
    public S_Tile(int x, int y){
        super(x, y);
    }

    public int[] GetNextCoords(Tile oldTile){
        System.out.println("Dont call GetNextCoords on S_Tile please!");
        return null;
    }

    public char GetSymbol(){
        return 'S';
    }

    public Tile getFirstConnection(Grid grid){
        //Check Top:
        List<Character> checkStrings = Arrays.asList('|', 'F', '7');
        Tile checkTile = grid.GetTile(xCoord, yCoord - 1);
        if (checkStrings.contains(checkTile.GetSymbol())) {
            return checkTile;
        }

        //Check Bottom:
        checkStrings = Arrays.asList('|', 'L', 'J');
        checkTile = grid.GetTile(xCoord, yCoord + 1);
        if (checkStrings.contains(checkTile.GetSymbol())) {
            return checkTile;
        }

        //Check Right:
        checkStrings = Arrays.asList('-', '7', 'J');
        checkTile = grid.GetTile(xCoord + 1, yCoord);
        if (checkStrings.contains(checkTile.GetSymbol())) {
            return checkTile;
        }

        //CheckLeft:
        checkStrings = Arrays.asList('-', 'L', 'F');
        checkTile = grid.GetTile(xCoord - 1, yCoord);
        if (checkStrings.contains(checkTile.GetSymbol())) {
            return checkTile;
        }

        System.out.println("No Connecting tile for StartTile found");
        return null;


    }
}

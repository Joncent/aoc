package Day10;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class InputReader{
    static public List<String> ReadFromTXT(String path){
        try {
            List<String> resultList = Files.readAllLines(Path.of(path));
            return resultList;
            
        } catch (Exception e) {
            System.out.println("Error while reading File");
            System.out.println(e.getMessage());
            return null;
        }

        

        
    }
}



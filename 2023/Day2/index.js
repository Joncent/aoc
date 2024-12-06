class Set{
    constructor(reds, greens, blues){
        this.reds = reds;
        this.greens = greens;
        this.blues = blues;
    }

    maxReds = 12;
    maxGreens = 13;
    maxBlues = 14;

    isValid(){
        if (this.reds > this.maxReds || this.greens > this.maxGreens || this.blues > this.maxBlues){
            return false;
        }
        else{
            return true;
        }
    }
}

class Game {
    constructor(id){
        this.id = id;
        this.sets = [];
    }

    addSet(set){
        this.sets.push(set);
    }

    isValid(){
        for (const set of this.sets){
            if (!set.isValid()) return false;
        }
        return true;
    }
}

function getID(gameString){
    const tuple = gameString.split(" ");
    return parseInt(tuple[1]);
}

function getRGB(string){
    let reds = 0;
    let greens = 0;
    let blues = 0;

    cols = string.split(",");
    for (col of cols){
        const singleColorTuple = col.split(" ");
        if (singleColorTuple[2] === "red"){
            reds += parseInt(singleColorTuple[1]);
        }
        if (singleColorTuple[2] === "green"){
            greens += parseInt(singleColorTuple[1]);
        }
        if (singleColorTuple[2] === "blue"){
            blues += parseInt(singleColorTuple[1]);
        }
    }
    return [reds, greens, blues];
}

let games = [];

const fs = require("fs");
fs.readFile("data.txt", "utf8", (error, data) => {
    if (error) {
        console.error(error);
        return;
    }

    const lines = data.split("\n");
    for (let line of lines){
        //splitting in: GameString and rest:
        const FirstSplit = line.split(":");
        console.log(FirstSplit);
        //splitting Rest in single Sets of colors:
        const SetSplits = FirstSplit[1].split(";");

        //create Game Object, give it ID
        game = new Game(getID(FirstSplit[0]));

        //Add Sets to Game Object
        for (const colorString of SetSplits){
            const colors = getRGB(colorString);
            const set = new Set(colors[0], colors[1], colors[2]);
            game.addSet(set);
        }

        games.push(game);


        //Solve AOC challenge:

        
        

    }
    let validGames = [];

        for (const game of games){
            if (game.isValid()){
                validGames.push(game);
            }
        }

        let result = 0;
        for (const game of validGames){
            result += game.id;

        }

        console.log(result);

});



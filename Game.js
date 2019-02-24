//Board size
var width = 4;
var height = 7;
var size = width * height;

//Increment value
var blockIncrement = 2;

//This feature will be added later
var stepCount = 0;
var totalPoint = 0;

// Create an 2D array
var block2D = new Array(height);             
for(var i = 0; i < height; i++){
    block2D[i] = new Array(width); 
}        

//Another way to create 2D array
//var block2D = [...Array(height)].map(e => Array(width).fill(0));

//Initialize array with all element is set to 0
function reset(){
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            block2D[i][j] = 0;
        }
    }
}

//Print the 2D array, used to debug
function printBoard2D(){
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            process.stdout.write("[" + i + "]" + "[" + j + "]" + block2D[i][j] + "\t\t");
            if (j == (width - 1)){
                console.log();
            }
        }
    }
}

//Print the 2D array, mostly use this
function printBoardSimple(){
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            process.stdout.write(block2D[i][j] + "\t\t");
            if (j == (width - 1)){ //Print next line
                console.log();
            }
        }
    }
}

//Add random block
function addBlock(){
    //Random from a specific range: (random * (max - min  + 1)) + min
    var randomX = Math.floor((Math.random() * width) + 0); //Range from 0 to width size. Eg: width = 4: 0 to 3
    var randomY = Math.floor((Math.random() * height) + 0);

    if (isDuplicateBlock(randomX, randomY)){
        //console.log("DUPLICATED, add again");
        addBlock();
        return;
    }
    else {
        block2D[randomY][randomX] = blockIncrement;    
        //console.log("PASSED");
    } 

    process.stdout.write("Add block: \n");
    printBoardSimple();
}

//Lose condition
function isFullBlock(){
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            if (block2D[i][j] == 0){ //Empty block
                return false;
            }
            if (block2D[i][j] == block2D[i][j + 1]){ //Duplicate horizontal
                return false;
            }
            if (block2D[i][j] == block2D[i + 1][j]){ //Duplicate vertical
                return false;
            }
        }
    }
    return true;
}

function isDuplicateBlock(x, y){
    return block2D[y][x] != 0;
}

function moveLeft(){
    //Merging block first, pushing later
    mergeLeft();

    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            if (block2D[i][j] == 0){
                if (j == width - 1){
                    continue; //Skip value 0 at the last element
                }
                else{ //Move each element to the left
                    block2D[i][j] = block2D[i][j + 1];
                    block2D[i][j + 1] = 0;
                }
            }
        }
    }

    process.stdout.write("Move block: \n");
    printBoardSimple();
}

function mergeLeft(){
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){

            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0) && (block2D[i][j] == block2D[i][j + 1])){ 

                //Merge value to the left
                block2D[i][j] += block2D[i][j + 1];

                //Delete the right hand side block
                block2D[i][j + 1] = 0;
            }   
        }
    }

    process.stdout.write("Merge block: \n");
    printBoardSimple();
}

function moveRight(){
    //Merging block first, pushing later
    mergeRight();

    for (var i = height - 1; i >= 0; i--){
        for (var j = width - 1; j >= 0; j--){
            if (block2D[i][j] == 0){
                if (j == 0){ //???
                    continue; //Skip value 0 at the last element
                }
                else{ //Move each element to the left
                    block2D[i][j] = block2D[i][j -1];
                    block2D[i][j - 1] = 0;
                }
            }
        }
    }

    process.stdout.write("Move block: \n");
    printBoardSimple();
}

function mergeRight(){
    for (var i = height - 1; i >= 0; i--){
        for (var j = width - 1; j >= 0; j--){
            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0) && (block2D[i][j] == block2D[i][j - 1])){ 

                //Merge value to the left
                block2D[i][j] += block2D[i][j - 1];

                //Delete the right hand side block
                block2D[i][j - 1] = 0;
            }   
        }
    }

    process.stdout.write("Merge block: \n");
    printBoardSimple();
}

//UP DOWN control is under construction
function moveUp(){
    //Merging block first, pushing later
    mergeUp();

    for (var j = 0; j < width; j++){
        for (var i = 0; i < height; i++){
            if (block2D[i][j] == 0){
                if (i == height - 1){
                    continue; //Skip value 0 at the last element
                }
                else{ //Move each element to the left
                    block2D[i][j] = block2D[i + 1][j];
                    block2D[i + 1][j] = 0;
                }
            }
        }
    }

    process.stdout.write("Move block: \n");
    printBoardSimple();
}

//Bug + error
function mergeUp(){
    for (var j = 0; j < width; j++){
        for (var i = 0; i < height; i++){
            //console.log("[" + i + "]" + "[" + j + "]" + block2D[i][j] + "\t\t" + "[" + (i + 1) + "]" + "[" + j + "]" + block2D[i + 1][j] + "\t\t");

            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0) && (block2D[i][j] == block2D[i + 1][j])){ //Bug here

                //Merge value to the left
                block2D[i][j] += block2D[i + 1][j];

                //Delete the right hand side block
                block2D[i + 1][j] = 0;
            }   
        }
    }
    process.stdout.write("Merge block: \n");
    printBoardSimple();
    
}

reset();
console.log("\nIteration 0------------------------------------------");
printBoardSimple();

//Testing game
for (var i = 1; i <= 100; i++){
    console.log("\nIteration " + i + "------------------------------------------");
    process.stdout.write("Game cannot move anymore? " + isFullBlock() + "\n");
    addBlock();
    //moveLeft(); //Test OK
    //moveRight(); //Test OK
    mergeUp(); //BUG
    //moveUp();
}

/*
// function myFunction() {
//     document.getElementById("demo").innerHTML = "asdsd";
// }
// myFunction();
*/
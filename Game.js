//Board size
var width = 10;
var height = 4;
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
            if (block2D[i][j] == 0){
                process.stdout.write("-\t\t");
            }
            else {
                process.stdout.write(block2D[i][j] + "\t\t");
            }
            if (j == (width - 1)){ //Print next line
                console.log();
            }
        }
    }
    console.log();
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

//Bug: move all blocks by 1 unit instead of moving all to the edge.
function moveLeft(){
    var i = 0, j = 0;
    
    mergeLeft();
    //Merging block first, pushing later
    for (i = 0; i < height; i++){
        for (var temp = 0; temp < width - 1; temp++){ //This line will repeat the moving block until all blocks are moved to the very left
            for (j = 0; j < width - 1; j++){
                if (block2D[i][j] == 0){ //Skip value 0 at the last element              
                    block2D[i][j] = block2D[i][j + 1];
                    block2D[i][j + 1] = 0;
                }
            }
        }
    }
    console.log("Move left:");
    printBoardSimple();
    addBlock();
}

function mergeLeft(){
    var marked = 0;
    for (var i = 0; i < height; i++){
        for (var j = 0; (j < width - 1) && (block2D[i][j] != 0); j++){
            //Apply selection sort
            marked = j;
            for (var k = marked + 1; k < width; k++){
                //If the pair of block has different value, switch to the next pair
                if (block2D[i][k] != 0 && (block2D[i][marked] != block2D[i][k])){
                    //console.log("Different value " + marked + "      " + k);
                    marked = k;
                }
                //If same, merge value to the left
                else if (block2D[i][k] != 0 && (block2D[i][marked] == block2D[i][k])){
                    //console.log("Same value " + marked + "      " + k);
                    block2D[i][marked] += block2D[i][k];

                    //Delete the right hand side block
                    block2D[i][k] = 0;
                    j = k;
                    break;
                }
            }              
        }
    }
    
    //process.stdout.write("Merge block: \n");
    //printBoardSimple();
}

function moveRight(){
    console.log("Move right:");
    //Merging block first, pushing later
    mergeRight();

    for (var i = height - 1; i >= 0; i--){
        for (var temp = width - 1; temp >= 0; temp--){
            for (var j = width - 1; j > 0; j--){
                if (block2D[i][j] == 0){ //Skip value 0 at the last element
                    block2D[i][j] = block2D[i][j -1];
                    block2D[i][j - 1] = 0;
                }
            }
        }
    }

    //process.stdout.write("Move block: \n");
    printBoardSimple();
    addBlock();
}

function mergeRight(){
    for (var i = height - 1; i >= 0; i--){
        for (var j = width - 1; (j >= 0) && (block2D[i][j] != 0); j--){
            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0) && (block2D[i][j] == block2D[i][j - 1])){ 
                //Merge value to the left
                block2D[i][j] += block2D[i][j - 1];

                //Delete the right hand side block
                block2D[i][j - 1] = 0;
            }   

            //Apply selection sort
            // marked = j;
            // for (var k = marked - 1; k >= 0; k--){
            //     //If the pair of block has different value, switch to the next pair
            //     if (block2D[i][k] != 0 && (block2D[i][marked] != block2D[i][k])){
            //         //console.log("Different value " + marked + "      " + k);
            //         marked = k;
            //     }
            //     //If same, merge value to the left
            //     else if (block2D[i][k] != 0 && (block2D[i][marked] == block2D[i][k])){
            //         //console.log("Same value " + marked + "      " + k);
            //         block2D[i][marked] += block2D[i][k];

            //         //Delete the right hand side block
            //         block2D[i][k] = 0;
            //         j = k;
            //         break;
            //     }
            // }    
        }
    }

    //process.stdout.write("Merge block: \n");
    //printBoardSimple();
}

function moveUp(){
    console.log("Move up:");
    //Merging block first, pushing later
    mergeUp();
    for (var i = 0; i < height - 1; i++){
        for (var j = 0; j < width; j++){
            if (block2D[i][j] == 0){ //Skip value 0 at the last element      
                block2D[i][j] = block2D[i + 1][j];
                block2D[i + 1][j] = 0
            }
        }
    }

    //process.stdout.write("Move block: \n");
    printBoardSimple();
    addBlock();
}

function mergeUp(){
    for (var i = 0; i < height; i++){
        for (var j = 0; j < width; j++){
            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0)  && (i != height - 1)){ //Bug fixed: out of array's range
                if (block2D[i][j] == block2D[i + 1][j]){
                    //Merge value to the left
                    block2D[i][j] += block2D[i + 1][j];

                    //Delete the right hand side block
                    block2D[i + 1][j] = 0;
                }      
            }   
        }
    }
    //process.stdout.write("Merge block: \n");
    //printBoardSimple();
}

function moveDown(){
    console.log("Move down:");
    //Merging block first, pushing later
    mergeDown();
    for (var i = height - 1; i >= 1; i--){
        for (var j = width - 1; j >= 0; j--){
            if (block2D[i][j] == 0){ //Skip value 0 at the last element      
                block2D[i][j] = block2D[i - 1][j];
                block2D[i - 1][j] = 0;
            }
        }
    }

    //process.stdout.write("Move block: \n");
    printBoardSimple();
    addBlock();
}

function mergeDown(){
    for (var i = height - 1; i >= 1; i--){
        for (var j = width - 1; j >= 0; j--){
            //Check the next block is equal to current block or not
            if (block2D[i][j] != 0){
                if (block2D[i][j] == block2D[i - 1][j]){
                    block2D[i][j] += block2D[i - 1][j];  
                    block2D[i - 1][j] = 0;
                }      
            }   
        }
    }
    //process.stdout.write("Merge block: \n");
    //printBoardSimple();
}

reset();
console.log("\nIteration 0------------------------------------------");
//addBlock();

block2D[0][0] = 2;
block2D[0][2] = 4;
block2D[0][4] = 2;
block2D[0][6] = 2;
block2D[0][8] = 2;
printBoardSimple();

//Testing game
for (var i = 1; i <= 100; i++){
    console.log("\nIteration " + i + "------------------------------------------");
    //process.stdout.write("Game cannot move anymore? " + isFullBlock() + "\n");
    //moveDown();
    //moveRight();
    //moveDown();
    moveLeft();
}
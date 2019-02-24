//Bug + error
function mergeUp(){
    for (var j = 0; j < width; j++){
        for (var i = 0; i < height; i++){
            console.log("[" + i + "]" + "[" + j + "]" + block2D[i][j] + "\t\t" + "[" + (i + 1) + "]" + "[" + j + "]" + block2D[i + 1][j] + "\t\t");

            //Check the next block is equal to current block or not
            if ((block2D[i][j] != 0) && (block2D[i + 1][j] == block2D[i][j])){ 

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
    //moveLeft();
    //moveRight();
    mergeUp();
    //moveUp();
}
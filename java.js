var rows=9;
var cols=9;
var level=0;
var sudokuBoard = new Array(rows)
for(let i=0; i<rows; i++){
    sudokuBoard[i] = new Array(cols)
}
  for (let i=0; i<rows; i++){
      for (let j=0; j<cols; j++){
        sudokuBoard[i][j]= new Cell
      }
  }
let sudokuValues=[1,2,3,4,5,6,7,8,9]
// sudoku samples
var sudokuTable1=[
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9],
    ];

var sudokuTable2 = [
    [5,4,2,9,8,7,6,1,3],
    [8,9,6,4,3,1,5,2,7],
    [7,3,1,6,5,2,9,8,4],
    [4,2,5,3,1,9,7,6,8],
    [1,8,3,2,7,6,4,5,9],
    [6,7,9,5,4,8,2,3,1],
    [3,1,4,7,2,5,8,9,6],
    [2,6,7,8,9,3,1,4,5],
    [9,5,8,1,6,4,3,7,2],
    ]; 

// cell in the sudoku
function Cell(){
    this.isPress=false;
    this.isShowed=true;
    this.value="";
}

// create new sudoku board
function createBoard(rows,cols, sudokuSample,level){
    var board= new Array(rows)
    for(let i=0; i<rows; i++){
        board[i] = new Array(cols)
    }
      for (let i=0; i<rows; i++){
          for (let j=0; j<cols; j++){
                  board[i][j]= new Cell
          }
      }
      for (let i=0; i<rows; i++){
        for (let j=0; j<cols; j++){
            if(board[i] && sudokuSample[i] && board[i][j] && sudokuSample[i][j])
               board[i][j].value=sudokuSample[i][j]
        }
    }
     board=emptyCell(board,level)
      return board;
  }
//   render board to html
function renderTable(board){
    var boxTable =document.querySelector(".box")
    var table="";
    for (let i=0; i<rows; i++){
        table += '<tr >'
        for (let j=0; j<cols; j++){
            if(board[i] && board[i][j]){
            table += `<td style="${i==2 || i==5 ?" border-bottom: solid; border-bottom-width: 4px; border-bottom-color: black;" : ""}; ; ${j==2 || j==5 ?" border-right: solid; border-right-width: 4px; border-right-color: black;" : ""}; " onmousedown="clickPress(${i},${j})">${board[i][j].isShowed ? 
                `<input id=cell${i}${j} disabled style="width:20px;
                height: 20px;
                text-align: center;
                
                background-color: rgb(195, 195, 195);" value=${board[i][j].value}>`
                : `<input id=cell${i}${j} class=emptyCell>`}</td>`
            }
            
        }
        table += '</tr>'
    }
        boxTable.innerHTML=table
}
// mouse click
function clickPress(i,j){

}
// set difficulty lever
function setLevel(num){
    level=num
}

// difficulty lever
function emptyCell(board,level){
    var countMines=0;
    var x;
    var y;
    while(countMines<level){
        x=Math.floor(Math.random() * 10);
        y=Math.floor(Math.random() * 10);
        if(board[x] && board[x][y] && board[x][y].isShowed){
            board[x][y].isShowed=false
            countMines++;
        }
        
    }
    return board;
}   
// take the values from html table and check it
function finishBtn(){
    var allBoard=sudokuBoard
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            allBoard[i][j]=document.getElementById(`cell${i}${j}`).value
        }
    }
    console.log(checkSudokuValues(allBoard))
    if(!checkSudokuValues(allBoard)){
        popUpShow(1)
    }
    else{
        popUpShow(2)
    }
}

// check the mat 
function checkSudokuValues(board){
    var rowsValues=""
    var squareValues=""
    var colsValues="";
    // check rows
    for(let i=0; i<rows; i++){
        rowsValues=""
        colsValues=""
        for(let j=0; j<cols; j++){
            if(board[i][j]=="" || (board[i][j]>'a' && board[i][j]<'z')){
                return false;
            }
            if(rowsValues.indexOf(board[i][j])==-1){
                rowsValues+=board[i][j]
            }
            else{
                return false
            }
            // check squares
            for(let vertBox= Math.floor(i/3)*3;vertBox<Math.floor(i/3)*3 + 3; vertBox++){
                squareValues=""
                for(let horzBox=Math.floor(j/3)*3; horzBox<Math.floor(j/3)*3 +3; horzBox++){
                    if(squareValues.indexOf(board[vertBox][horzBox])==-1){
                        squareValues+=board[vertBox][horzBox]
                    }
                    else{
                        return false
                    }
                }
            }
            // check cols
            if(colsValues.indexOf(board[j][i])==-1){
                colsValues+=board[j][i]
            }
            else{
                return false;
            }
        }
    }
    return true;
}
// restart the game
function startGame(){
    popUpNotShow()
    popUpNotShow()
    if(level==0){
        alert('Please select level of difficulty')
        return;
    }
    var newGame= createBoard(rows,cols,sudokuTable1,level)
    renderTable(newGame);
}

// pop up message
function popUpShow(num){
    if(num==1){
        document.getElementById('popUp').style.visibility="visible"
    }
    else{
        document.getElementById('popUpWin').style.visibility="visible"
    }

}
function popUpNotShow(){
        document.getElementById('popUp').style.visibility="hidden"
        document.getElementById('popUpWin').style.visibility="hidden"
}

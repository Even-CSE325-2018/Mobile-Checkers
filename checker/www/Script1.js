const MainFrame = document.getElementById("MainFrame");
const WhitePieces = (MainFrame.getElementsByClassName("White"));
const RedPieces = (MainFrame.getElementsByClassName("Red"));
const Tiles = [
    MainFrame.getElementsByClassName("Ones"), MainFrame.getElementsByClassName("Twos"),
    MainFrame.getElementsByClassName("Threes"), MainFrame.getElementsByClassName("Fours"),
    MainFrame.getElementsByClassName("Fives"), MainFrame.getElementsByClassName("Sixes"),
    MainFrame.getElementsByClassName("Sevens"), MainFrame.getElementsByClassName("Eights")
];

var SelectedTile = null;
var OldI, OldJ = null;
var SelectedPiece = null;
var player = 1;

function SetOriginalColor() {
    SelectedTile.style.backgroundColor = OriginalColor(SelectedTile.className.substr(0, 5));
    SelectedTile.style.borderColor = "Black";
}

function SelectMe() { //Highlight selected tile
    SelectedTile.style.backgroundColor = "#c9d677";
    SelectedTile.style.borderColor = "Green";
}

function OriginalColor(ss) { //Tile Colors
    if (ss === "White")
        return "white";
    return "black";
}

function ClickMe(i, j) {

    if (SelectedTile !== null) { // Second time pressing
        SetOriginalColor();

        if (SelectedTile !== Tiles[i][j]) { // Different tile pressed

            if (Tiles[i][j].firstChild === null) { // Tile Empty

                if (SelectedPiece.className == "Red") { // Red Moving
                    Move(true, i, j);
                }

                if (SelectedPiece.className == "White") { // White Moving
                    Move(false, i, j);
                }
            }
        }

        SelectedTile = null;
        OldI = null;
        OldJ = null;
        SelectedPiece = null;

    } else if (Tiles[i][j].firstChild !== null) { //First time pressing
        if (Tiles[i][j].firstChild.className == "Red" && player === 1 || Tiles[i][j].firstChild.className == "White" && player === 2) {
            SelectedTile = Tiles[i][j];
            OldI = i;
            OldJ = j;
            SelectedPiece = SelectedTile.firstChild;
            SelectMe();
        }
    }
}

function Move(Red, i, j) {
    if (Red) {

        if (IsDiagonal(Red, i, j)) { //Unpromoted Red Movement
            Tiles[i][j].appendChild(SelectedPiece);
            ChangePlayers();
        }
    } else {
        if (IsDiagonal(Red, i, j)) { //Unpromoted White Movement
            Tiles[i][j].appendChild(SelectedPiece);
            ChangePlayers();
        }
    }
}

function ChangePlayers() {
    if (player == 1) {
        player = 2;
    } else {
        player = 1;
    }
}

function IsDiagonal(Red, i, j) {

    if (Red) { //Red Diagonal

        if ((i === OldI - 1 && j === OldJ + 1) || (i === OldI - 1 && j === OldJ - 1)) { //Unpromoted Red Movement
            return true;
        }

        if (i === OldI - 2 && j === OldJ + 2) { //Unpromoted Red Eat

            if (Tiles[OldI - 1][OldJ + 1].firstChild !== null) {

                if (SelectedPiece.className !== Tiles[OldI - 1][OldJ + 1].firstChild.className) {
                    Tiles[OldI - 1][OldJ + 1].removeChild(Tiles[OldI - 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        if (i === OldI - 2 && j === OldJ - 2) { //Unpromoted Red Eat

            if (Tiles[OldI - 1][OldJ - 1].firstChild !== null) {

                if (SelectedPiece.className !== Tiles[OldI - 1][OldJ - 1].firstChild.className) {
                    Tiles[OldI - 1][OldJ - 1].removeChild(Tiles[OldI - 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }

    if (!Red) { //White Diagonal
        if ((i === OldI + 1 && j === OldJ - 1) || (i === OldI + 1 && j === OldJ + 1)) { //Unpromoted White Movement
            return true;
        }

        if (i === OldI + 2 && j === OldJ + 2) { //Unpromoted White Eat

            if (Tiles[OldI + 1][OldJ + 1].firstChild !== null) {

                if (SelectedPiece.className !== Tiles[OldI + 1][OldJ + 1].firstChild.className) {
                    Tiles[OldI + 1][OldJ + 1].removeChild(Tiles[OldI + 1][OldJ + 1].firstChild);
                    return true;
                }
            }
        }

        if (i === OldI + 2 && j === OldJ - 2) { //Unpromoted White Eat

            if (Tiles[OldI + 1][OldJ - 1].firstChild !== null) {

                if (SelectedPiece.className !== Tiles[OldI + 1][OldJ - 1].firstChild.className) {
                    Tiles[OldI + 1][OldJ - 1].removeChild(Tiles[OldI + 1][OldJ - 1].firstChild);
                    return true;
                }
            }
        }
    }

    return false;
}
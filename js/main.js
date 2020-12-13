// Preload setup
// Declare where piece content goes on page
let pieceContent = document.getElementById("piece-content");
let titleContent = document.getElementById("piece-title");

let pieceNumber = 0;
var main_typer;
const path = location.hash;
const highestPieceKey = Object.keys(pieces).length - 1;
$(".piece-container").hide(0);

// Onload function
function initialise() {
    console.log("init")
     try {
        loadStockChart();
    } catch (error) {
        console.error(error);
    }

    // Main Title Typer
    randomBackTyper(".header-card-title", ['J.E.S.T.E.R.', 'J.E.S.T.T.A.', 'A.U.T.O.M.A', 'L.P.N. A.I']);
    // Stock Title Typer
    randomBackTyper(".stock-title h2", ['LAMPOON STOCK PORTFOLIO', 'LAMPOON "NOT STONKS" PORTFOLIO', 'LAMPOON "STONKS" PORTFOLIO']);
    // Masthead Modal Title Typer
    randomBackTyper(".masthead-title", ['Masthead','Masthead']);
    // Info Modal Title Typer
    randomBackTyper(".info-title", ['Info','Info']);
    // Vanitas Modal Title Typer
    randomBackTyper(".vanitas-title", ['Vanitas','Vanitas']);
    var cover_wait_time = 0;
    if (localStorage.getItem("cover_loaded") === null) {
        var cover_wait_time = 0;
        localStorage.setItem("cover_loaded", true);
    }
     $(".cover-container").delay(cover_wait_time).fadeOut(500);
     $(".piece-container").delay(cover_wait_time).fadeIn(0);
    setTimeout(
        function(){
            // Content Box Title Typer
            randomBackTyper(".tag span", ['COMEDY BY ARTIFICIAL INTELLIGENCE', 'PIECES BY MACHINE LEARNING', 'CREATED BY LAMPOON A.I.']);
            checkPath(path);
        },
        cover_wait_time);
}

window.addEventListener('hashchange', function(){
    console.log("yo")
    const path = location.hash;
    checkPath(path);
})

// Creates a typer with a random backspace delay.
// tag: String selector for the element to be cleared and typed in.
// arr: Array of string values do be shuffled in random order.
function randomBackTyper(tag, arr){
    var tag = document.querySelector(tag);
    tag.innerHTML = "";
    var options = {
    strings: arr,
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: Math.floor(Math.random() * 15000) + 5000,
    loop: true,
    cursorChar: '|',
    // Disable cursor due to unexpected positioning
    showCursor: false,
    // fadeOut: true,
    // fadeOutClass: 'typed-fade-out',
    // autoInsertCss: true,
    };
    new Typed(tag, options);
}

function checkPath(path){
    let pieceNumber = 0;
    if (path !== ""){
        // Select piece from the route to load page with
        pieceNumber = path.substr(1);
    } else{
        // Select random piece to load page with
        pieceNumber = Math.floor(Math.random() * highestPieceKey)
    }
    let piece = pieces[pieceNumber]
    loadPiece(piece);
}

function loadPiece(piece) {
    // Load title and piece content in HTML
    console.log(piece)
    titleContent.innerHTML = piece.title;
    var text_delay = 1000;
    $('#art-content').hide();
    if (piece.art != "no"){
        $('#art-content').attr('src', piece.art);
        $('#art-content').fadeIn(200);
        text_delay = 3000;
    }
    $('#piece-content').show();
    fetch(piece.content).then(function(piece) {
        return piece.text().then(function(text) {
            var options = {
              strings: [text],
              typeSpeed: 10,
              startDelay: text_delay,
              loop: false,
              // Disable cursor due to unexpected positioning
              showCursor: false,
              cursorChar: "|",
              onComplete: function() {
                return $('.typed-cursor').remove();
              }
            };
            if (main_typer){
                main_typer.destroy();
            }
            pieceContent.innerHTML = "";
            main_typer = new Typed(pieceContent, options);
        });
    });
}


function nextPiece() {
    // Loop through array of pieces
    console.log("changing piece")
    if (pieceNumber >= highestPieceKey) {
        pieceNumber = 0
    } else {
        pieceNumber += 1
    }
    window.location.hash = pieceNumber
    loadPiece(pieces[pieceNumber])
}

function previousPiece() {
    // Loop through array of pieces
    if (pieceNumber > 0) {
        pieceNumber -= 1
    } else {
        pieceNumber = highestPieceKey
    }
    window.location.hash = pieceNumber
    loadPiece(pieces[pieceNumber])
}

function loadStockChart() {

    // Set the dimensions of the graph
    var  width = $("#stock-card").width() - 1,
        height = $("#stock-card").height() - 1

    let svg = d3.select("#stock-card").append("svg").attr("class", "svg")

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    let pseudoData = [[1,30], [2,29], [3, 26], [4, 26], [5, 23], [6, 24], [7, 26], [8, 24], [9, 19], [10,15], [11, 16], [12, 13], [13, 13], [14, 11], [15, 8], [16, 6], [17, 5], [18, 6],[19,5]]

    // Scale the range of the data
    x.domain(d3.extent(pseudoData, d => d[0]));
    y.domain(d3.extent(pseudoData, d => d[1]));

    var line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))

    const yAxisGrid = d3.axisLeft(y).tickSize(width).tickFormat('').ticks(8);

    svg.append('g')
        .attr('class', 'y axis-grid')
        .attr('transform', 'translate(' + width + ', 0)')
        .call(yAxisGrid);

    let repeat = () => {
        svg.selectAll("path").remove();

        let path = svg.append("path")
            .datum(pseudoData)
            .attr("d", line)
            .attr("class", "line") // Assign a class for styling
            .attr("stroke", "greenyellow")

        let totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(14000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .on("end", repeat);
    }

    repeat();

}

function showInfo() {
    $("#infoModal").modal("show");
}

function showMasthead() {
    $("#mastheadModal").modal("show");
}

function showVanitas() {
    $("#vanitasModal").modal("show");
}

$(document).ready(initialise);

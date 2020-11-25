
// Declare where piece content goes on page
let pageContent = document.getElementById("piece-content");
let titleContent = document.getElementById("piece-title");

// Select random piece to load page with
var highestPieceKey = Object.keys(pieces).length - 1
let pieceNumber = Math.floor(Math.random() * highestPieceKey)
let firstPiece = pieces[pieceNumber]

loadPiece(firstPiece)
loadStockChart()

function loadPiece(piece) {
    // Load title and piece content in HTML
    titleContent.innerHTML = piece.title;
    fetch(piece.content).then(function(piece) {
        return piece.text().then(function(text) {
            pageContent.innerHTML = text;
        });
    });
}


function nextPiece() {
    // Loop through array of pieces
    if (pieceNumber >= highestPieceKey) {
        pieceNumber = 0
    } else {
        pieceNumber += 1
    }

    loadPiece(pieces[pieceNumber])
}

function previousPiece() {
    // Loop through array of pieces
    if (pieceNumber > 0) {
        pieceNumber -= 1
    } else {
        pieceNumber = highestPieceKey
    }

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
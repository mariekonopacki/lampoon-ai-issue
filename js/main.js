// Preload setup
// Declare where piece content goes on page
let pieceContent = document.getElementById("piece-content");
let titleContent = document.getElementById("piece-title");

let currentSong = 0;
let trackURLs = [];
var clientAppend = '?client_id=278594df9a311b2a1a56251b3a2b0fbe';

let pieceNumber = 0;
var main_typer;
const path = location.hash;
const highestPieceKey = Object.keys(pieces).length - 1;
$(".piece-container").hide(0);

// Onload function
function initialise() {
     try {
        loadStockChart();
        loadMap();
    } catch (error) {
        console.error(error);
    }

    // Stock Title Typer
    randomBackTyper(".editor-title h2", ['EDITORS', 'DEVELOPERS']);

    // Masthead Modal Title Typer
    randomBackTyper(".masthead-title", ['Masthead','The Harvard Lampoon']);
    // Info Modal Title Typer
    randomBackTyper(".info-title", ['Info','Vanitas']);

    // Card Upper Title Typer
    randomBackTyper(".header-card-upper h2", ['THE HARVARD LAMPOON', "THE AI#"]);

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
            randomBackTyper(".tag span", ['COMEDY BY A.I.', 'PIECES BY MACHINE LEARNING', 'CREATED BY LAMPOON A.I.']);
            checkPath(path);
        },
        cover_wait_time);


    // Initialize soundcloud music player
    SC.initialize({
        client_id: '278594df9a311b2a1a56251b3a2b0fbe'
    });

    // Retrieve soundcloud playlist
    SC.get('/playlists/1052172664').then(function(playlist){
        playlist.tracks.forEach(function(track) {
            trackURLs.push(`${track.stream_url + clientAppend}`)
        });
    }).then(function() {
        $('#player').attr('src', trackURLs[currentSong]);
        document.getElementById('player').load();
    })
}

window.addEventListener('hashchange', function(){
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
        window.location.hash = pieceNumber
    }
    let piece = pieces[pieceNumber]
    loadPiece(piece);
}

function loadPiece(piece) {
    // Load title and piece content in HTML
    titleContent.innerHTML = piece.title;
     $('#art-content-holder').hide();
     $('.piece-text').hide();

    if (piece.art != "no"){
        $('#art-content').attr('src', piece.art);
        $('#art-content-holder').fadeIn(200);
    } else {
        $('#art-content').removeAttr('src');
        $('#art-content-holder').css('display', 'none')
    }

    fetch(piece.content).then(function(piece) {
        return piece.text().then(function(text) {

            pieceContent.innerHTML = text;

            $('.piece-text').fadeIn(400);

            if ($('#piece-content').get(0).scrollHeight > $('.piece-text').height()) {
                //if 'true', the content overflows the tab: we show the hidden link
                $('.piece-text').css('padding-right', '30px');
            } else {
                $('.piece-text').css('padding-right', '0px');
            }
        })
    })
}


function nextPiece() {
    pieceNumber = parseInt(location.hash.substr(1))

    // Loop through array of pieces
    if (pieceNumber >= highestPieceKey) {
        pieceNumber = 0
    } else {
        pieceNumber += 1
    }
    window.location.hash = pieceNumber
}

function previousPiece() {
    pieceNumber = parseInt(location.hash.substr(1))

    // Loop through array of pieces
    if (pieceNumber > 0) {
        pieceNumber -= 1
    } else {
        pieceNumber = highestPieceKey
    }
    window.location.hash = pieceNumber
}

function loadStockChart() {

    // Set the dimensions of the graph
    var  width = $("#stock-card").width() - 1,
        height = $("#stock-card").height() - 1

    let svg = d3.select("#stock-card").append("svg").attr("class", "svg")
        .attr("width", width)
        .attr("height", height);

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

function loadMap() {

    // Set the dimensions of the graph
    let  mapWidth = $("#map-vis").width() - 1,
        mapHeight = $("#map-vis").height() - 1


    let svg = d3.select("#map-vis").append("svg").attr("class", "svg")
        .attr("width", mapWidth)
        .attr("height", mapHeight);

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "map-clip")
        .append("svg:rect")
        .attr("width", mapWidth )
        .attr("height", mapHeight )
        .attr("x", 0)
        .attr("y", 0);

    let mapsvg = svg.append('g')

    let projection = d3.geoAlbersUsa().scale(400).translate([mapWidth/2, mapHeight/2]);

    let path = d3.geoPath()
        .projection(projection);

    //  tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    d3.json("js/states.json").then(function(topojsonData) {

        mapsvg.append("g")
            .attr("clip-path","url(#map-clip)")
            .attr("class", "states")
            .selectAll("path")
            .data(topojsonData.features)
            .enter().append("path")
            .attr("d", path)
             .attr("class", "map")
            .attr("id", d => d.properties.abbr)
            .style('shape-rendering','crispEdges')
            .style('vector-effect','non-scaling-stroke');

        let jerseyCoordinates = [[[-74.07,39.91], "Yoo hoo!"],[[-74.012,40.20], "Hey Big Boy..."],[[-74.15,39.75], "I live underneath the Boardwalk... Find me"],[[-74.8,38.99],"I tell people I'm from NYC."],[[-74.34,39.50], "Passionate. Adventurous. Curious. Not allowed to cross state lines, so you'll have to meet me."],[[-74.65,39.2], "I am being held hostage. No one knows where I am except for you. Send help. My life is in your hands."]]
        mapsvg.append("g")
            .selectAll("circle")
            .data(jerseyCoordinates).enter()
            .append("circle")
            .attr("class", "jersey-shore")
            .attr("r", .5)
            .attr("transform", d => {return "translate(" + projection(d[0]) + ")";})
            .attr("fill", 'rgba(78,215,47,.9)')
            .style("cursor", "pointer")
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d[1])
                    .style("left", (event.pageX + 20) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        zoomtoJersey();

    })

    function zoomtoJersey() {
        let jersey = d3.select('#NJ');

        var bbox = jersey.node().getBBox(),
            centroid = projection([-74.071277,39.950060]),
            zoomScaleFactor = (mapWidth / bbox.width) * .3,
            zoomX = -centroid[0],
            zoomY = -centroid[1];

        mapsvg.transition().duration(20000).ease(d3.easeSin)
            .attr("transform", "scale(" + zoomScaleFactor + ")" + "translate(" + (zoomX + (mapWidth * .04)) + "," + (zoomY + (mapHeight * .04)) + ")")

        d3.select('#NJ').style("fill", 'rgba(60,169,34,0.8)')

        mapsvg.append('text').text("New Jersey").attr("class", "map-header")
            .attr("transform", d => {return "translate(" + projection([-73.8,39.45]) + ")";})

    }


}

function showInfo() {
    $("#infoModal").modal("show");
}

function showMasthead() {
    $("#mastheadModal").modal("show");
}

function showLetter() {
    console.log('show')
    $("#mailModal").modal("show");
}

$('.why-am-i span').hover(function() {
    $('.not-an-ad.mb-2').css('transform', 'scale(1.5)translate(-3vw, -3vh)')
    $('.ad-tooltip').css('opacity', 1)
}, function() {
    $('.not-an-ad.mb-2').css('transform', 'scale(1)')
    $('.ad-tooltip').css('opacity', 0)

})

$('img').hover(function() {

    $('#gray-filter-anim-in')[0].beginElement();
}, function() {
    $('#gray-filter-anim-out')[0].beginElement();
})

function playSong(songNumber) {
    $('#player').attr('src', trackURLs[songNumber]);
    document.getElementById('player').play();
}


function nextSong() {
    if (currentSong <= trackURLs.length) {
        currentSong += 1
    } else {
        currentSong = 0;
    }
    console.log(currentSong)
    playSong(currentSong)
}

function prevSong() {
    if (currentSong <= 0) {
        currentSong = trackURLs.length;
    } else {
        currentSong -= 1
    }
    playSong(currentSong)
}

document.getElementById('player').addEventListener("timeupdate", function() {
    let player = document.getElementById('player')
    console.log('time update', player.currentTime)
    $('.progress').css("width", player.currentTime / player.duration * 100 + '%')

});



//
// $('audio').ontimeupdate = function() {
//     console.log('time update')
//     $('.progress').css("width", $('#player').currentTime / $('#player').duration * 100 + '%')
// }

// $('question').hover(function(){})

$(document).ready(initialise);
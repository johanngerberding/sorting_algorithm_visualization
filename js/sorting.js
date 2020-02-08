var arr = [];
var alg = $('#alg :selected').text();
var delay = 250;

$('#interrupt').on('click', () => {
    location.reload();
});

$('#header').css('height', ($(window).innerHeight() * 0.15).toString() + "px");
$('#visualization').css('height', ($(window).innerHeight() * 0.70).toString() + "px");

$('#display').on("click", () => {
    alg = $('#alg :selected').text();
    if(Number.isNaN(parseInt($('#delay').val()))) {
        delay = 250;
    } else {
        delay = parseInt($('#delay').val());
    }
    // String to Int, if it fails NaN is returned
    var number = parseInt($('#num').val());
    if (Number.isNaN(number)) {
        alert("Please enter a valid number.");
    } else {
        if(number < 2000000) {
            // Create a randomly generated array of integers to sort
            arr = randomNumbers(number);
            console.log(arr);
            visualizeArray(arr);
        } else {
            alert("Please choose a number smaller than 2.000.000.");
        }
        
    }

});


$('#sort').on("click", () => {
    // disable buttons while sorting
    $('#display').prop('disabled', true);
    $('#sort').prop('disabled', true);
    $('#alg').prop('disabled', true);
    $('#num').prop('disabled', true);
    $('#delay').prop('disabled', true);

    arr = sortArray(arr, alg, delay);
});

function randomNumbers(n) {
    return [...Array(n)].map(() => Math.floor(Math.random() * 100));
}

function visualizeArray(arr) {
    if($('#visualization').children().length > 0) {
        $('#visualization').children().remove();
    }
    // This function should create a visualization of the Array
    var width = $('#visualization').width();
    var height = $('#visualization').height();
    var elWidth = parseInt(width / arr.length);
    var maxVal = Math.max(...arr);
    var elHeight = height / maxVal;
    // in the div
    for(var i = 0; i < arr.length; i++) {
        var displayHeight = arr[i] * elHeight;
        var displayWidth = elWidth * 0.9;
        var displayMargin = elWidth * 0.05;
        $("<div/>")
            .attr({'class': 'number', 'id': 'num' + i})
            .css({'width': displayWidth, 'height': displayHeight, 'margin': displayMargin})
            .html(arr[i])
            .appendTo('#visualization');
    }
}

function sortArray(arr, alg, delay) {
    // This function initializes the sorting process
    if(alg == "Insertion Sort") {
        arr = insertionSort(arr, delay);
    } else {
        console.log("This algorithm isn't implemented yet.");
    }
    //visualizeArray(arr);
    return arr;
}

async function insertionSort(arr, delay) {
    
    // Logic of the Insertion Sort Algorithm
    for(var i = 0; i < arr.length; i++) {
        var el = arr[i];
        var element = $('#num' + i);
        element.css('background-color', 'steelblue');
        await sleep(delay);
        var j = i;
        while(j > 0 && arr[j-1] > el) {
            var checkElement = $('#num' + (j-1)).css('background-color', 'yellow');
            arr[j] = arr[j-1];
            j--;
            await sleep(delay);
            checkElement.css('background-color', 'lightgray');   
        }
        $('#num' + j).css('background-color', 'lightgreen');
        arr[j] = el;
        await sleep(delay);
        visualizeArray(arr);
    }
    $('#display').prop('disabled', false);
    $('#sort').prop('disabled', false);
    $('#alg').prop('disabled', false);
    $('#num').prop('disabled', false);
    $('#delay').prop('disabled', false);
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
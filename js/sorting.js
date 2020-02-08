var arr = [];
var alg = $('#alg :selected').text();

console.log($('#alg').children());

$('#display').on("click", function() {
    alg = $('#alg :selected').text();
    console.log(alg);
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


$('#sort').on("click", function() {
    console.log("old array: ", arr);
    arr = insertionSort(arr);
    console.log("new array: ", arr);
    sortArray(arr, alg);
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
            .attr('class','number')
            .css({'width': displayWidth, 'height': displayHeight, 'margin': displayMargin})
            .html(arr[i])
            .appendTo('#visualization');
    }
}

function sortArray(arr, alg) {
    // This function initializes the sorting process
    if(alg == "Insertion Sort") {
        arr = insertionSort(arr);
    } else {
        console.log("This algorithm isn't implemented yet.");
    }
    visualizeArray(arr);
    return arr;
}

function insertionSort(arr) {
    // Logic of the Insertion Sort Algorithm
    for(var i = 0; i < arr.length; i++) {
        var el = arr[i];
        var j = i;
        while(j > 0 && arr[j-1] > el) {
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = el;
    }
    return arr;
}
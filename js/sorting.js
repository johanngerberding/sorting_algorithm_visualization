var arr = [];
var alg = $('#alg :selected').text();
var delay = 200;

$('#interrupt').on('click', () => {
    location.reload();
});

$('#alg').on("change", () => {
    alg = $('#alg :selected').text();
});

$('#header').css('height', ($(window).innerHeight() * 0.15).toString() + "px");
$('#visualization').css('height', ($(window).innerHeight() * 0.70).toString() + "px");

$('#display').on("click", () => {
    if(Number.isNaN(parseInt($('#delay').val()))) {
        delay = 200;
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
    } else if(alg == "Quicksort") {
        arr = itQuickSort(arr, 0, arr.length - 1, delay);
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
    // Enable buttons after sorting
    $('#display').prop('disabled', false);
    $('#sort').prop('disabled', false);
    $('#alg').prop('disabled', false);
    $('#num').prop('disabled', false);
    $('#delay').prop('disabled', false);
    return arr;
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


async function itQuickSort(arr, low, high, delay) {
    // iterative quicksort implementation
    var stack = [];
    stack.push(low);
    stack.push(high);

    while(stack.length > 0) {
        // Pop high and low
        high = stack.pop();
        low = stack.pop();
        // Set pivot element at its correct position
        // var p = partition(arr, low, high);
        // Put function here
        var pivot = arr[high];
        $('#num' + high).css('background-color', 'red');
        await sleep(delay);
        visualizeArray(arr);
        // index of smaller element
        var i = (low - 1);
        for(var j = low; j <= high - 1; j++) {
            //if current element is smaller than or equal to pivot
            if(arr[j] <= pivot) {
                i++;
                // swap arr[i] and arr[j]
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        // swap arr[i+1] and arr[high] (or pivot)
        var temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;

        var p = i + 1;

        // if there are elements on the left side, then push left side to stack
        if(p - 1 > low) {
            stack.push(low);
            stack.push(p - 1);
        }

        // if there are elements on the right side, push right side to stack
        if(p + 1 < high) {
            stack.push(p+1);
            stack.push(high);
        }
    }

    visualizeArray(arr);
    $('#display').prop('disabled', false);
    $('#sort').prop('disabled', false);
    $('#alg').prop('disabled', false);
    $('#num').prop('disabled', false);
    $('#delay').prop('disabled', false);
    return arr;
}


async function mergesort(arr, delay) {
    return;
}

async function heapsort(arr, delay) {
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
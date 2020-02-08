var arr = [];

$('#visualization').on("click", function() {
    this.append("Hello World.")
});

$('#start').on("click", function() {
    // String to Int, if it fails NaN is returned
    var number = parseInt($('#num').val());
    if (Number.isNaN(number)) {
        alert("Please enter a valid number.");
    } else {
        if(number < 2000000) {
            // Create a randomly generated array of integers to sort
            arr = randomNumbers(number);
            console.log(arr);
        } else {
            alert("Please choose a number smaller than 2.000.000.");
        }
        
    }
});

function randomNumbers(n) {
    return [...Array(n)].map(() => Math.floor(Math.random() * 100));
}

function visualizeArray(arr) {
    // This function should create a visualization of the Array
    // in the canvas
    for(var i = 0; i < arr.length; i++) {

    }
}
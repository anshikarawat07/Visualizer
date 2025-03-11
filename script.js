// Select elements
const Visualizer = document.querySelector(".Visualizer");
const searchingVisualizer = document.querySelector(".Searching-Visualizer");
const sortingVisualizer = document.querySelector(".Sorting-Visualizer");
const linkedListVisualizer = document.querySelector(".Linkedlist-Visualizer");

const btnVis = Visualizer.querySelector("button");
const body = document.querySelector("body");

// Handle Visualizer Selection
btnVis.addEventListener("click", () => {
    const optionVis = document.querySelector('input[name="option"]:checked').value;
    if (optionVis === "searching") searching();
    else if (optionVis === "sorting") sorting();
    else if (optionVis === "Linkedlist") linkedList();
});

// Show Searching Visualizer
function searching() {
    showSection(searchingVisualizer, "searching.jpg");
    addEventListeners(searchingVisualizer);
}

// Show Sorting Visualizer
function sorting() {
    showSection(sortingVisualizer, "sorting.avif");
    addEventListeners(sortingVisualizer);
}

// Show Linked List Visualizer
function linkedList() {
    showSection(linkedListVisualizer, "linkedlist.jpg");
    addEventListeners(linkedListVisualizer);
}

// Universal Function to Show Sections
function showSection(section, bgImage) {
    Visualizer.style.display = "none";
    section.style.display = "block";
    body.style.backgroundImage = `url('${bgImage}')`;
}

// Back Button Functionality
document.querySelectorAll("#back").forEach(button => {
    button.addEventListener("click", () => {
        Visualizer.style.display = "block";
        searchingVisualizer.style.display = "none";
        sortingVisualizer.style.display = "none";
        linkedListVisualizer.style.display = "none";
        body.style.backgroundImage = "url('bg.webp')";
    });
});

(document.querySelector(".searching")).querySelector('.back').addEventListener("click", () => {
    (document.querySelector(".searching")).style.display="none";
        searchingVisualizer.style.display = "block";
        body.style.backgroundImage = "url('searching.jpg')";
        document.querySelector("#array").value="";
        document.querySelector("#searchValue").value="";
        document.querySelector(".bar-container").innerHTML = "";

});
(document.querySelector(".sorting")).querySelector('.back').addEventListener("click", () => {
    (document.querySelector(".sorting")).style.display="none";
        sortingVisualizer.style.display = "block";
        body.style.backgroundImage = "url('searching.jpg')";
});

    (document.querySelector(".sorting")).querySelector('.back').addEventListener("click", () => {
        sorting.style.display="none";
        sortingVisualizer.style.display = "block";
        body.style.backgroundImage = "url('searching.jpg')";
    });
// Add Event Listeners for Algorithm Selection
function addEventListeners(section) {
    
    section.querySelector("#select").addEventListener("click", () => {
        let option = section.querySelector('input[name*="option"]:checked').value;
        section.style.display = "none";
        runAlgorithm(option,section);
    });
}

// Run Search Algorithm
function runAlgorithm(option,section) {
    console.log(section);
    console.log(option);
    body.style.backgroundImage = "url('search.jpg')";
    if (section.className === "Searching-Visualizer") 
        {
            console.log("searching");
            document.querySelector(".searching").style.display = "block";
            let h2 = document.querySelector('.searching').querySelector('h2');
            h2.innerHTML=option+' Search';
            let form = document.querySelector('.searching').querySelector(".input");
            form.removeEventListener("submit", handleSearchSubmit);
            form.addEventListener("submit", (event) => handleSearchSubmit(event, option));
        }
    else if(section.className === "Sorting-Visualizer")
    {
        console.log("Sorting");
        document.querySelector(".sorting").style.display = "block";
        let h2 = document.querySelector('.sorting').querySelector('h2');
        h2.innerHTML=option+' Sort';
        let form = document.querySelector('.sorting').querySelector(".input");
        form.removeEventListener("submit", handleSortSubmit);
        form.addEventListener("submit", (event) => handleSortSubmit(event, option));
    }
    
}

// Handle Search Form Submission
function handleSearchSubmit(event, option) {
    event.preventDefault();

    let arrayInput = document.querySelector("#array").value.trim();
    let searchValue = parseInt(document.querySelector("#searchValue").value);

    if (validateInputs(arrayInput, searchValue)) {
        let array = arrayInput.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        visualizeArray(".searching",array);

        let bars = document.querySelectorAll(".bar");

        if ((option === "Binary" || option === "Jump") && !isSorted(array)) {
            alert("❌ Error: Binary and Jump search require a sorted array!");
            return;
        }
        if (option === "Linear") linearSearch(array, searchValue, bars);
        else if (option === "Binary") binarySearch(array, searchValue, bars);
        else if (option === "Jump") jumpSearch(array, searchValue, bars);
    }
}

//handle sort submission
function handleSortSubmit(event, option) {
    event.preventDefault();

    let arrayInput =(document.querySelector(".sorting")).querySelector("#array").value.trim();

    if (validateInputs_Sort(arrayInput)) {
        console.log("inside");
        let array = arrayInput.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        visualizeArray(".sorting",array);

        let bars = document.querySelectorAll(".bar");
        if (option ==="Selection") selectionSort(array, bars);
        else if (option === "Insertion") insertionSort(array, bars);
        else if (option === "Bubble") bubbleSort(array, bars);
        else if(option==="Merge") mergeSort(array,bars);
        else quickSort(array,bars);
    }
}
// Visualize Array
function visualizeArray(name,array) {
    console.log(name);
    let barsContainer = document.querySelector(name).querySelector(".bar-container");
    barsContainer.innerHTML = "";

    array.forEach(num => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${num * 7}px`;
        bar.textContent = num;
        barsContainer.appendChild(bar);
    });
}
// Validate User searchin Inputs
function validateInputs(arrayInput, searchValue) {
    let isValid = true;
    const arrayPattern = /^\d+(,\d+)*$/;

    let errorA = document.querySelector(".error-array");
    let errorV = document.querySelector(".error-value");
    if(arrayInput==="")
    {
        displayError(errorA, "⚠ Input an array");
        isValid = false;
    }
    else if (!arrayPattern.test(arrayInput)) {
        displayError(errorA, "⚠ Invalid format! Use comma-separated numbers.");
        isValid = false;
    } 
    else hideError(errorA);
    if (searchValue ==="") {
        displayError(errorV, "⚠ Enter value to search!");
        isValid = false;
    } else if (isNaN(searchValue)) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    
    console.log(isValid);
    return isValid;
}
//validat sort 
function validateInputs_Sort(arrayInput) {
    console.log("validate");
    let isValid = true;
    const arrayPattern = /^\d+(,\d+)*$/;

    let errorA = (document.querySelector(".sorting")).querySelector(".error-array");
    console.log(errorA);
    if(arrayInput==="")
    {
        displayError(errorA, "⚠ Input an array");
        isValid = false;
    }
    else if (!arrayPattern.test(arrayInput)) {
        displayError(errorA, "⚠ Invalid format! Use comma-separated numbers.");
        isValid = false;
    } 
    else 
    hideError(errorA);
    console.log(isValid);
    return isValid;
}

// Display & Hide Errors
function displayError(error, text) {
    error.style.display = "block";
    error.innerHTML = text;
}
function hideError(error) {
    error.style.display = "none";
}

// Check if Array is Sorted
function isSorted(arr) {
    return arr.every((val, i, array) => !i || array[i - 1] <= val);
}



// 🔹 SEARCH ALGORITHMS WITH VISUALIZATION

// Linear Search
function linearSearch(array, target, bars) {
    let i = 0;
    target = parseInt(target);

    function searchStep() {
        if (i < array.length) {
            bars[i].classList.add("check");

            setTimeout(() => {
                if (array[i] === target) {
                    bars[i].classList.remove("check");
                    bars[i].classList.add("found");
                } else {
                    bars[i].classList.remove("check");
                    bars[i].classList.add("not-found");
                    i++;
                    setTimeout(searchStep, 500);
                }
            }, 500);
        }
    }
    searchStep();
}

// Binary Search
function binarySearch(array, target, bars) {
    let left = 0, right = array.length - 1;

    function searchStep() {
        if (left <= right) {
            let mid = Math.floor((left + right) / 2);
            bars[mid].classList.add("check");

            setTimeout(() => {
                if (array[mid] === target) {
                    bars[mid].classList.add("found");
                } else {
                    bars[mid].classList.remove("check");
                    bars[mid].classList.add("not-found");
                    if (array[mid] < target) left = mid + 1;
                    else right = mid - 1;
                    setTimeout(searchStep, 500);
                }
            }, 500);
        }
    }
    searchStep();
    
}

// Jump Search
function jumpSearch(array, target, bars) {
    let n = array.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    function searchStep() {
        if (array[Math.min(step, n) - 1] < target) {
            prev = step;
            step += Math.floor(Math.sqrt(n));
            if (prev >= n) {
                alert("❌ Element not found");
                return;
            }
            setTimeout(searchStep, 500);
        } else {
            for (let i = prev; i < Math.min(step, n); i++) {
                bars[i].classList.add("check");
                setTimeout(() => {
                    if (array[i] === target) bars[i].classList.add("found");
                    else bars[i].classList.remove("check");
                }, 500);
            }
        }
    }
    searchStep();
}
// Function to swap bars in the DOM
function swapBars(bars, i, j) {
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = tempHeight;
    let tempContent= bars[i].textContent;
    bars[i].textContent = bars[j].textContent;
    bars[j].textContent = tempContent;

}



// Selection Sort with Visual Swapping and Comparison Highlight
function mergeSort(array, bars) {
    let animations = [];
    mergeSortHelper(array, 0, array.length - 1, animations);

    function animateMergeSort(index = 0) {
        if (index >= animations.length) {
            for (let i = 0; i < bars.length; i++) {
                bars[i].classList.add("sorted");
            }
            return;
        }

        let [type, idx1, idx2, height] = animations[index];

        if (type === "compare") {
            bars[idx1].classList.add("compare");
            bars[idx2].classList.add("compare");
        } else if (type === "swap") {
            bars[idx1].style.height = `${height}px`;
        } else if (type === "uncompare") {
            bars[idx1].classList.remove("compare");
            bars[idx2].classList.remove("compare");
        }

        setTimeout(() => animateMergeSort(index + 1), 300);
    }

    animateMergeSort();
}

function mergeSortHelper(array, start, end, animations) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    mergeSortHelper(array, start, mid, animations);
    mergeSortHelper(array, mid + 1, end, animations);
    merge(array, start, mid, end, animations);
}

function merge(array, start, mid, end, animations) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        animations.push(["compare", start + i, mid + 1 + j]);
        if (left[i] <= right[j]) {
            animations.push(["swap", k, start + i, left[i]]);
            i++;
        } else {
            animations.push(["swap", k, mid + 1 + j, right[j]]);
            j++;
        }
        animations.push(["uncompare", start + i - 1, mid + j]);
        k++;
    }

    while (i < left.length) {
        animations.push(["swap", k, start + i, left[i]]);
        i++;
        k++;
    }

    while (j < right.length) {
        animations.push(["swap", k, mid + 1 + j, right[j]]);
        j++;
        k++;
    }
}


// Bubble Sort
function bubbleSort(array, bars) {
    let n = array.length;
    let i = 0, j = 0, swapped = false;

    function sortStep() {
        if (i >= n - 1) return;

        if (j < n - i - 1) {
            bars[j].classList.add("check");
            bars[j + 1].classList.add("check");

            setTimeout(() => {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swapBars(bars, j, j + 1);
                    swapped = true;
                }
                bars[j].classList.remove("check");
                bars[j + 1].classList.remove("check");
                j++;
                sortStep();
            }, 500);
        } else {
            if (!swapped) return;
            i++;
            j = 0;
            swapped = false;
            setTimeout(sortStep, 500);
        }
    }
    sortStep();
}


// Insertion Sort
function insertionSort(array, bars) {
    let i = 1, j = 0, key;

    function sortStep() {
        if (i >= array.length) return;

        key = array[i];
        j = i - 1;

        function innerStep() {
            if (j >= 0 && array[j] > key) {
                bars[j].classList.add("check");
                array[j + 1] = array[j];

                setTimeout(() => {
                    bars[j].classList.remove("check");
                    swapBars(bars, j, j + 1);
                    j--;
                    innerStep();
                }, 500);
            } else {
                array[j + 1] = key;
                i++;
                setTimeout(sortStep, 500);
            }
        }
        innerStep();
    }
    sortStep();
}

function mergeSort(array, bars) {
   

    function merge(start, mid, end) {
        let left = array.slice(start, mid + 1);
        let right = array.slice(mid + 1, end + 1);
        let leftIndex = 0, rightIndex = 0, sortedIndex = start;

        function mergeStep() {
            if (leftIndex < left.length && rightIndex < right.length) {
                bars[sortedIndex].classList.add("check"); // Highlight checked bar

                setTimeout(() => {
                    if (left[leftIndex] < right[rightIndex]) {
                        array[sortedIndex] = left[leftIndex];
                        bars[sortedIndex].style.height = `${left[leftIndex]}px`;
                        leftIndex++;
                    } else {
                        array[sortedIndex] = right[rightIndex];
                        bars[sortedIndex].style.height = `${right[rightIndex]}px`;
                        rightIndex++;
                    }
                    bars[sortedIndex].classList.remove("check");
                    sortedIndex++;
                    mergeStep();
                }, 500);
            } else {
                while (leftIndex < left.length) {
                    bars[sortedIndex].classList.add("check");
                    setTimeout(() => {
                        array[sortedIndex] = left[leftIndex];
                        bars[sortedIndex].style.height = `${left[leftIndex]}px`;
                        bars[sortedIndex].classList.remove("check");
                        leftIndex++;
                        sortedIndex++;
                    }, 500);
                }
                while (rightIndex < right.length) {
                    bars[sortedIndex].classList.add("check");
                    setTimeout(() => {
                        array[sortedIndex] = right[rightIndex];
                        bars[sortedIndex].style.height = `${right[rightIndex]}px`;
                        bars[sortedIndex].classList.remove("check");
                        rightIndex++;
                        sortedIndex++;
                    }, 500);
                }
            }
        }
        mergeStep();
    }

    function divide(start, end) {
        if (start >= end) return;

        let mid = Math.floor((start + end) / 2);
        
        setTimeout(() => {
            divide(start, mid);
            divide(mid + 1, end);
            merge(start, mid, end);
        }, 500);
    }

    divide(0, array.length - 1);
}


// Quick Sort
function quickSort(array, bars, low = 0, high = array.length - 1) {
    if (low < high) {
        let pivotIndex = partition(array, bars, low, high);
        setTimeout(() => {
            quickSort(array, bars, low, pivotIndex - 1);
            quickSort(array, bars, pivotIndex + 1, high);
        }, 500);
    }
}

function partition(array, bars, low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].classList.add("check");

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swapBars(bars, i, j);
        }

        setTimeout(() => bars[j].classList.remove("check"), 500);
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swapBars(bars, i + 1, high);
    return i + 1;
}

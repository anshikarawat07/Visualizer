// Select elements
const Visualizer = document.querySelector(".Visualizer");
const searchingVisualizer = document.querySelector(".Searching-Visualizer");
const sortingVisualizer = document.querySelector(".Sorting-Visualizer");
const linkedListVisualizer = document.querySelector(".Linkedlist-Visualizer");
let currentLinkedList = null;
const btnVis = Visualizer.querySelector("button");
const body = document.querySelector("body");

// Handle Visualizer Selection
btnVis.addEventListener("click", () => {
    const optionVis = document.querySelector('input[name="option"]:checked').value;
    if (optionVis === "searching") searching();
    else if (optionVis === "sorting") sorting();
    else if (optionVis === "Linkedlist") linkedList();
});

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
    showSection(linkedListVisualizer, "linkedlist.avif");
    addEventListeners(linkedListVisualizer);
}

// Universal Function to Show Sections
function showSection(section, bgImage) {
    Visualizer.style.display = "none";
    section.style.display = "block";
    body.style.backgroundImage = `url('${bgImage}')`;
}





//  function handlelinkedlistSubmit(event,option)
// {
//     event.preventDefault(); 
//     let arrayInput = (document.querySelector(".linkedlist-controls")).querySelector("#array").value.trim();
//     if (validateInput(arrayInput,"ll"))
//     {
         
//         console.log("inside");
//         let array = arrayInput.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
//         document.querySelector(".linkedlist-controls").querySelector(".controls").style.display="block";
//         let nodes = document.querySelectorAll(".node");
//         if (option === 'Single') linkedList = new LinkedList("Single");
//         else if (option === 'Double') linkedList = new LinkedList("Double");
//         else if (option === 'Circular') linkedList = new LinkedList("Circular");

//     }
// }

// Add Event Listeners for Algorithm Selection
function addEventListeners(section) {
    console.log(section);
    section.querySelector("#select").addEventListener("click", () => {
    console.log("Section:", section);
    console.log("Select Button:", section.querySelector("#select"));
    console.log("Checked Input:", section.querySelector('input[name*="option"]:checked'));
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
            form.addEventListener("submit", (event) => handleSearchSubmit(event, option));
        }
    else if(section.className === "Sorting-Visualizer")
    {
        console.log("Sorting");
        document.querySelector(".sorting").style.display = "block";
        let h2 = document.querySelector('.sorting').querySelector('h2');
        h2.innerHTML=option+' Sort';
        let form = document.querySelector('.sorting').querySelector(".input");
        form.addEventListener("submit", (event) => handleSortSubmit(event, option));
    }
    else if(section.className === "Linkedlist-Visualizer")
        {
            console.log("Linkelist");
            document.querySelector(".linkedlist-controls").style.display = "block";
            let h2 = document.querySelector('.linkedlist-controls').querySelector('h2');
            h2.innerHTML=option+' Linkedlist';
            let form = document.querySelector('.linkedlist-controls').querySelector(".input");
            form.addEventListener("submit", (event) => handlelinkedlistSubmit(event, option));
        }
    
}



(document.querySelector(".linkedlist-controls")).querySelector('.back').addEventListener("click", () => {
    console.log("back");
    (document.querySelector(".linkedlist-controls")).style.display="none";
        linkedListVisualizer.style.display = "block";
        body.style.backgroundImage = "url('searching.jpg')";
        (document.querySelector(".linkedlist-controls")).querySelector("#array").value="";
 });
 (document.querySelector(".sorting")).querySelector('.back').addEventListener("click", () => {
    (document.querySelector(".sorting")).style.display="none";
        sortingVisualizer.style.display = "block";
        body.style.backgroundImage = "url('searching.jpg')";
        (document.querySelector(".sorting")).querySelector("#array").value="";
        (document.querySelector(".sorting")).querySelector(".bar-container").innerHTML = "";
});
// Handle Search Form Submission
function handleSearchSubmit(event, option) {
    event.preventDefault();

    let arrayInput = document.querySelector("#array").value.trim();
    let searchValue = document.querySelector("#searchValue").value;

    if (validateInput_search(arrayInput, searchValue)) {
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

    if (validateInput(arrayInput,"sort")) {
        console.log("inside");
        let array = arrayInput.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        visualizeArray(".sorting",array);

        let bars = document.querySelectorAll(".bar");
        if (option ==="Selection") selectionSort(array, bars);
        else if (option === "Insertion") insertionSort(array, bars);
        else if (option === "Bubble") bubbleSort(array, bars);
        else if(option==="Merge") 
            mergeSort(array,bars);
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
function validateInput_search(arrayInput, searchValue) {
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
    } else if (isNaN(parseInt(searchValue))) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    
    console.log(isValid);
    return isValid;
}
//validat sort 
function validateInput(arrayInput,name) {
    let isValid = true;
    const arrayPattern = /^\d+(,\d+)*$/;
    let errorA;
    if(name==="sort")
    {
        console.log('sort');
        errorA = (document.querySelector(".sorting")).querySelector(".error-array");
    }
    else if(name==="ll")
    {
        console.log("ll");
        errorA = (document.querySelector(".linkedlist-controls")).querySelector(".error-array");
        console.log(errorA);
    }

    if(arrayInput==="")
    {
        console.log("arrayInput");
        displayError(errorA, "⚠ Input an array");
        isValid = false;
    }
    else if (!arrayPattern.test(arrayInput)) {
        displayError(errorA, "⚠ Invalid format! Use comma-separated numbers.");
        isValid = false;
    } 
    else 
    {
        hideError(errorA);
    }
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
async function mergeSort(array, bars, left = 0, right = array.length - 1) {
    if (left >= right) return; 

    let mid = Math.floor((left + right) / 2);

    await mergeSort(array, bars, left, mid);
    await mergeSort(array, bars, mid + 1, right);
    await mergeBars(array, bars, left, mid, right);
}

async function mergeBars(array, bars, left, mid, right) {
    let leftArr = array.slice(left, mid + 1);
    let rightArr = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        bars[k].classList.add("check");

        await new Promise(resolve => setTimeout(resolve, 500)); 

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            i++;
        } else {
            array[k] = rightArr[j];
            j++;
        }

        updateBar(bars[k], array[k]);
        bars[k].classList.remove("check"); 
        k++;
    }

    while (i < leftArr.length) {
        array[k] = leftArr[i];
        updateBar(bars[k], array[k]);
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }

    while (j < rightArr.length) {
        array[k] = rightArr[j];
        updateBar(bars[k], array[k]);
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

function updateBar(bar, value) {
    bar.style.height = `${value * 7}px`; 
    bar.textContent = value;
    bar.style.backgroundColor = "lightgreen"; 

    setTimeout(() => {
        bar.style.backgroundColor = "blue"; 
    }, 500);
}






// Insertion Sort
function insertionSort(array, bars) {
    let i = 1, j = 0, key;

    function sortStep() {
        if (i >= array.length) 
            return;

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

function selectionSort(array, bars) {
    let i = 0, j = 0, minIndex;

    function sortStep() {
        if (i >= array.length - 1) return;

        minIndex = i;
        j = i + 1;

        function findMin() {
            if (j < array.length) {
                bars[j].classList.add("check");

                setTimeout(() => {
                    bars[j].classList.remove("check");

                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                    j++;
                    findMin();
                }, 500);
            } else {
                if (minIndex !== i) {
                    swapBars(bars, i, minIndex);
                    [array[i], array[minIndex]] = [array[minIndex], array[i]];
                }
                i++;
                setTimeout(sortStep, 500);
            }
        }
        findMin();
    }
    sortStep();
}


// Quick Sort

async function quickSort(array, bars, low = 0, high = array.length - 1) {
    if (low < high) {
        let pivotIndex = await partition(array, bars, low, high);
        await quickSort(array, bars, low, pivotIndex - 1);
        await quickSort(array, bars, pivotIndex + 1, high);
    }
}

async function partition(array, bars, low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].classList.add("check");

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swapBars(bars, i, j);
        }

        await sleep(500); // Wait for 500ms before removing the highlight
        bars[j].classList.remove("check");
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swapBars(bars, i + 1, high);
    return i + 1;
}




class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null; // For double linked list
    }
}

class LinkedList {
    constructor(type) {
        this.head = null;
        this.tail = null;
        this.type = type; // Single, Double, Circular
    }

    insertAtHead(value) {
        console.log(`insert at head ${value}`);
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            if (this.type === "Circular") 
                this.tail.next = this.head;
        } else {
            if (this.type === "Double" || this.type === "Circular") {
                newNode.next = this.head;
                this.head.prev = newNode;
            } else {
                newNode.next = this.head;
            }
            this.head = newNode;
            if (this.type === "Circular") this.tail.next = this.head;
        }
        this.visualize();
    }

    insertAtTail(value) {
        console.log(`insert at tail ${value}`);
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            if (this.type === "Circular") this.tail.next = this.head;
        } else {
            this.tail.next = newNode;
            if (this.type === "Double" || this.type === "Circular") {
                newNode.prev = this.tail;
            }
            this.tail = newNode;
            if (this.type === "Circular") this.tail.next = this.head;
        }
        this.visualize();
    }

    deleteNode(value) {
        console.log(`delete  ${value}`);
        if (!this.head) return;
        let temp = this.head, prev = null;
        while (temp) {
            if (temp.value == value) {
                if (temp === this.head) {
                    this.head = temp.next;
                    if (this.type === "Double" || this.type === "Circular") this.head.prev = null;
                    if (this.type === "Circular") this.tail.next = this.head;
                } else if (temp === this.tail) {
                    this.tail = prev;
                    this.tail.next = (this.type === "Circular") ? this.head : null;
                } else {
                    prev.next = temp.next;
                    if (this.type === "Double" || this.type === "Circular") temp.next.prev = prev;
                }
                break;
            }
            prev = temp;
            temp = temp.next;
            if (this.type === "Circular" && temp === this.head) break;
        }
        this.visualize();
    }

    searchNode(value) {
        console.log(`search  ${value}`);
        let temp = this.head;
        while (temp) {
            console.log(typeof(temp.value));
            console.log(typeof(value));
            if (temp.value === value) {
                alert(`Value ${value} found!`);
                return;
            }
            temp = temp.next;
            if (this.type === "Circular" && temp === this.head) break;
        }
        alert(`Value ${value} not found.`);
    }

   

    visualize() {
        const container = document.querySelector(".node-container");
        container.innerHTML = "";
        let temp = this.head;
        while (temp) {
            const nodeElement = document.createElement("div");
            nodeElement.classList.add("node");
            nodeElement.innerText = temp.value;
            container.appendChild(nodeElement);
            
            if (temp.next) {
                const arrow = document.createElement("span");
                arrow.innerHTML = " → ";
                if (this.type === "Double") {
                    arrow.innerHTML = " ←→ "; 
                }
                container.appendChild(arrow);
            }
            
            temp = temp.next;
            if (this.type === "Circular" && temp === this.head) {
                const circularArrow = document.createElement("span");
                circularArrow.innerHTML = " ↺ ";
                container.appendChild(circularArrow);
                break;
            }
        }
    }
}

function handlelinkedlistSubmit(event, option) {
    console.log("handlel");
    event.preventDefault();
    let arrayInput = document.querySelector(".linkedlist-controls #array").value.trim();
    if (validateInput(arrayInput, "ll")) {
        let array = arrayInput.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        
        document.querySelector(".linkedlist-controls .controls").style.display = "block";
        if (option === 'Single') linkedList = new LinkedList("Single");
        else if (option === 'Double') linkedList = new LinkedList("Double");
        else if (option === 'Circular') linkedList = new LinkedList("Circular");
        array.forEach(num => linkedList.insertAtTail(num));
    }
}

document.querySelector(".controls #insertHead").addEventListener("click", () => {
    const searchValue =document.querySelector(".controls #valueInput").value;
    let errorV=document.querySelector(".controls .error-value");
    console.log(errorV);
    let isValid=true;
    if (searchValue ==="") {
        displayError(errorV, "⚠ Enter value to insert!");
        isValid = false;
    } else if (isNaN(parseInt(searchValue))) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    if (isValid) 
    linkedList.insertAtHead(parseInt(searchValue));
});

document.querySelector(".controls #insertTail").addEventListener("click", () => {
    const searchValue =document.querySelector(".controls #valueInput").value;
    let errorV=document.querySelector(".controls .error-value");
    console.log(errorV);
    let isValid=true;
    if (searchValue ==="") {
        displayError(errorV, "⚠ Enter value to insert!");
        isValid = false;
    } else if (isNaN(parseInt(searchValue))) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    if (isValid) 
        linkedList.insertAtTail(parseInt(searchValue));
});

document.querySelector(".controls  #deleteNodeBtn").addEventListener("click", () => {
    const searchValue =document.querySelector(".controls #valueInput").value;
    let errorV=document.querySelector(".controls .error-value");
    console.log(errorV);
    let isValid=true;
    if (searchValue ==="") {
        displayError(errorV, "⚠ Enter value to insert!");
        isValid = false;
    } else if (isNaN(parseInt(searchValue))) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    if (isValid) 
    linkedList.deleteNode(parseInt(searchValue));
});

document.querySelector(".controls  #searchNodeBtn").addEventListener("click", () => {
    const searchValue =document.querySelector(".controls #valueInput").value;
    let errorV=document.querySelector(".controls .error-value");
    console.log(errorV);
    let isValid=true;
    if (searchValue ==="") {
        displayError(errorV, "⚠ Enter value to insert!");
        isValid = false;
    } else if (isNaN(parseInt(searchValue))) {
        displayError(errorV, "⚠ The search value must be a number!");
        isValid = false;
    } else {
        hideError(errorV);
    }
    if (isValid) 
    linkedList.searchNode(parseInt(searchValue));
});

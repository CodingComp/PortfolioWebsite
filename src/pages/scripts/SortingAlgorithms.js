
/*
*   SORTING ALGORITHM FUNCTIONS
*/

/*
*   Selection Sort
*/
export const selectionSort = (array, barElements, state) => {
    var clonedArray = array.slice(0);
    const animations = []; //An array of the comparisons made in the sorting algorithm, used to play animations of the sorting array
    
    var min = 0; //USES INDEX INSTEAD OF VALUE -- FOR MIN

    for (let i = 0; i < clonedArray.length; i++) {
        min = i;
            
        for (let j = i + 1; j < clonedArray.length; j++) {
            if (clonedArray[j] <= clonedArray[min]) {
                min = j;
            }
            animations.push([i,j, false]);
        }
        if (clonedArray[min] != clonedArray[i]) {
            var copiedNum = clonedArray[i];
            clonedArray[i] = clonedArray[min];
            clonedArray[min] = copiedNum;
            animations.push([min,i, true]);
        }
        
    }
    state.animationsLength =  animations.length;

    playSelectionSortAnimation(barElements, animations, state.animationSpeed);
    return clonedArray;
};

/*
*   Bubble Sort
*/
export const bubbleSort = (array, barElements, state) => {
    var clonedArray = array.slice(0);
    var animations = [];

    for (var i = 0; i < clonedArray.length; i++) {
        if(!sorted(clonedArray)) {
            for (var j = 0; j < clonedArray.length-1; j++) {
                if (clonedArray[j] > clonedArray[j+1]) {
                    var saved = clonedArray[j];
    
                    clonedArray[j] = clonedArray[j+1];
                    clonedArray[j+1] = saved;
                    animations.push([j,j+1, true]);
                } else {
                    animations.push([j,j+1, false]);
                }
            }
        }
    }
    state.animationsLength =  animations.length;
    playBubbleSortAnimation(barElements, animations, state.animationSpeed);

    return clonedArray;
} 

/*
*   Insertion Sort
*/
export const insertionSort = (array, barElements, state) => {
    var clonedArray = array.slice(0);
    var animations = [];
    for (var i = 0; i < clonedArray.length; i++) {
        var j = i;
        if (j > 0) {
            animations.push([j, j-1, false]);
        }
        while(j > 0 && clonedArray[j] < clonedArray[j-1]) {
            var savedNum = clonedArray[j];
            clonedArray[j] = clonedArray[j-1];
            clonedArray[j-1] = savedNum;

            animations.push([j, j-1, true]);

            j--;
        }
    }

    state.animationsLength =  animations.length;
    playInsertionSortAnimation(barElements, animations, state.animationSpeed);
    return clonedArray;
} 


/*
*   Merge Sort
*/

/*
*   For the animation side maybe use a tracker array to move the elements cooresponding to the bars. Use the movement of said elements to move the bars and push them to the animations array?
*/
export const mergeSort = (array, barElements, state) => {
    var clonedArray = array.slice(0);
    var animations = [];

    var sortedArray = mergeSortAlgorithm(clonedArray, animations);

    state.animationsLength = animations.length;
    playBubbleSortAnimation(barElements, animations, state.animationSpeed);
    return sortedArray;
} 

function mergeSortAlgorithm(array, animations) {
    if(array.length == 1) {
        return array;
    }

    var arrayA = [];
    var arrayB = [];

    for (var i = 0; i < Math.floor(array.length / 2); i++) {
        arrayA[i] = array[i];
    }
    for (var i = Math.floor(array.length / 2); i < array.length; i++) {
        arrayB[i - Math.floor(array.length / 2)] = array[i];
    }

    arrayA = mergeSortAlgorithm(arrayA, animations);
    arrayB = mergeSortAlgorithm(arrayB, animations);

    return merge(arrayA, arrayB, animations);
}

function merge(arrayA, arrayB, animations) {
    var arrayC = [];

    while(arrayA.length != 0 && arrayB.length != 0) {
        //Compare animation -- i,j,false
        if(arrayA[0] < arrayB[0]) {
            //Swap animation -- i,j, true
            //MOVE arrayA[0] TO BACK OF arrayC -- Push to C
            arrayC.push(arrayA[0]);
            //Remove arrayA[0] 
            arrayA.splice(0,1);
        } else {
            //Swap animation -- i,j, true
            //MOVE arrayB[0] TO BACK OF arrayC -- Push to C
            arrayC.push(arrayB[0]);
            //Remove arrayB[0] 
            arrayB.splice(0,1);
        }
    }

    while(arrayA.length != 0) {
        //Swap animation -- i,j, true
        arrayC.push(arrayA[0]); 
        arrayA.splice(0,1);
    }

    while(arrayB.length != 0) {
        arrayC.push(arrayB[0]);
        arrayB.splice(0,1);
    }

    return arrayC;
}

function getIndexOfBar(barArray, num) {

    for(var i = 0; i < barArray.length; i++) {
        if(barArray[i].children[0].innerHTML == num) {
            return i;
        }
    }
}


/*
*   Check if array is sorted, used for making sure the correct amount of animations are pushed
*/
function sorted(array) {
    var sortedArray = array.slice(0).sort((a,b) => a - b);
    for (var i = 0; i < array.length; i++) {
        if(array[i] != sortedArray[i]) {
            return false;
        }
    }
    return true;
}

/*
*   ANIMATION FUNCTIONS
*/

/*
*   Selection Sort Animation
*/
const playSelectionSortAnimation = (barElements, animations, animationSpeed) => {
    //#21b5ff -- Blue
    //#EBA640 -- Orange
    //#40F563 -- Green
    
    const baseColor = "#21b5ff";
    const compareColor = "#EBA640";
    const sortedColor = "#40F563";

    console.log(animations);

    for (let i = 0; i < animations.length; i++) {
        if(!animations[i][2]) {
            setTimeout(() => {
                barElements[animations[i][0]].style.backgroundColor = compareColor;
                barElements[animations[i][1]].style.backgroundColor = compareColor;
            }, (i * (50 / animationSpeed)) + 100);
        } else {
            setTimeout(() => {
                var bar1Height = barElements[animations[i][0]].children[0].textContent;

                barElements[animations[i][0]].style.height = barElements[animations[i][1]].style.height;
                barElements[animations[i][0]].children[0].textContent = barElements[animations[i][1]].children[0].textContent;
                        
                barElements[animations[i][1]].style.height = bar1Height + "px";
                barElements[animations[i][1]].children[0].textContent = bar1Height;

            }, (i * (50 / animationSpeed)) + 100);
        }
        setTimeout(() => {
            barElements[animations[i][0]].style.backgroundColor = baseColor;
            barElements[animations[i][1]].style.backgroundColor = baseColor;
        }, (i * (50 / animationSpeed)) + (160 - (animationSpeed * 10)));
    }
}

/*
*   Bubble Sort Animation
*/
const playBubbleSortAnimation = (barElements, animations, animationSpeed) => {
    const baseColor = "#21b5ff";
    const compareColor = "#EBA640";
    const sortedColor = "#40F563";
    // console.log("bubble");
    // console.log(animations);

    for (let i = 0; i < animations.length; i++) {
        if(!animations[i][2]) {
            setTimeout(() => {
                barElements[animations[i][0]].style.backgroundColor = compareColor;
                barElements[animations[i][1]].style.backgroundColor = compareColor;
            }, (i * (50 / animationSpeed)) + 100);
        } else {
            setTimeout(() => {
                var bar1Height = barElements[animations[i][0]].children[0].textContent;

                barElements[animations[i][0]].style.backgroundColor = compareColor;
                barElements[animations[i][1]].style.backgroundColor = compareColor;

                barElements[animations[i][0]].style.height = barElements[animations[i][1]].style.height;
                barElements[animations[i][0]].children[0].textContent = barElements[animations[i][1]].children[0].textContent;

                barElements[animations[i][1]].style.height = bar1Height + "px";
                barElements[animations[i][1]].children[0].textContent = bar1Height;

            }, (i * (50 / animationSpeed)) + 100);
        }
        setTimeout(() => {
            barElements[animations[i][0]].style.backgroundColor = baseColor;
            barElements[animations[i][1]].style.backgroundColor = baseColor;
        }, (i * (50 / animationSpeed)) + (160 - (animationSpeed * 10)));
    }
}

/*
*   Insertion Sort Animation
*/
const playInsertionSortAnimation = (barElements, animations, animationSpeed) => {
    const baseColor = "#21b5ff";
    const compareColor = "#EBA640";
    const sortedColor = "#40F563";
    // console.log("bubble");
    // console.log(animations);

    for (let i = 0; i < animations.length; i++) {
        if(!animations[i][2]) {
            setTimeout(() => {
                barElements[animations[i][0]].style.backgroundColor = compareColor;
                barElements[animations[i][1]].style.backgroundColor = compareColor;
            }, (i * (50 / animationSpeed)) + 100);
        } else {
            setTimeout(() => {
                var bar1Height = barElements[animations[i][0]].children[0].textContent;

                barElements[animations[i][0]].style.backgroundColor = compareColor;
                barElements[animations[i][1]].style.backgroundColor = compareColor;

                barElements[animations[i][0]].style.height = barElements[animations[i][1]].style.height;
                barElements[animations[i][0]].children[0].textContent = barElements[animations[i][1]].children[0].textContent;

                barElements[animations[i][1]].style.height = bar1Height + "px";
                barElements[animations[i][1]].children[0].textContent = bar1Height;

            }, (i * (50 / animationSpeed)) + 100);
        }
        setTimeout(() => {
            barElements[animations[i][0]].style.backgroundColor = baseColor;
            barElements[animations[i][1]].style.backgroundColor = baseColor;
        }, (i * (50 / animationSpeed)) + (160 - (animationSpeed * 10)));
    }
}

/*
*   Merge Sort Animation
*/
const playMergeSortAnimation = (barElements, animations, animationSpeed) => {

}
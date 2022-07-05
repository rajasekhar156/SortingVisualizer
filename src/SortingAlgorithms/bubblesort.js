const bubblesort = array => {
    const animations = [];
    for(let i = 0; i < array.length - 1; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            animations.push([j,j+1,0,0,0]);
            if(array[j] > array[j+1]){
                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                animations.push([j,j+1,1,array[j],array[j+1]]);           
            }
            animations.push([j,j+1,2,0,0]);
        }
    }
    return animations;
}

export default bubblesort;

const insertionsort = array => {
    const animations = [];
    for(let i = 1; i < array.length; ++i){
        const key = array[i];
        let j = i - 1;
        animations.push([j, i, -1]);
        let isgone = 0;
        let isfirst = 1;
        while(j >= 0 && array[j] > key){
            if(isfirst == 1){
                isfirst = 0;
            } else {
                animations.push([j, j + 1, -1]);
            }
            animations.push([j, j + 1, j, key, array[j]]);
            animations.push([j, j + 1, -2]);
            array[j + 1] = array[j];
            j = j - 1;
            isgone = 1;
        }
        array[j + 1] = key;
        if(isgone === 0){
            animations.push([j, i, -2]);
        }
    }
    return animations;
}


export default insertionsort;
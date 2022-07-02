const mergesort = array => {
    if (array.length === 1) return array;
    const m = Math.floor(array.length / 2);
    const left = mergesort(array.slice(0, m));
    const right = mergesort(array.slice(m));
    const sorted = [];
    let i = 0, j = 0;

    while(i < left.length || j < right.length){
        if(j === right.length || (i < left.length && left[i] < right[j])){
            sorted.push(left[i++]);
        } else{
            sorted.push(right[j++]);
        }
    }
    return sorted;
};

export default mergesort;
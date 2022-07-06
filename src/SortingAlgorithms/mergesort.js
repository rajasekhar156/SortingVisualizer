const mergefunc = (array, left, mid, right) => {
    let i = left,
        j = mid + 1,
        k = 0;
    let index = 0;
    const animations = [];
    animations[index++] = [1, left, right];
    const temp = [];
    while (i <= mid || j <= right) {
        if (j === right + 1 || (i <= mid && array[i] < array[j])) {
            animations[index++] = [2, i, array[i]];
            temp[k++] = array[i++];
        } else {
            animations[index++] = [2, j, array[j]];
            temp[k++] = array[j++];
        }
    }
    index = 0;
    for (let i = left; i <= right; ++i) {
        array[i] = temp[index++];
    }
    animations.push([3, left, right]);
    return animations;
}

const mergesort = (array, len1, len2) => {
    var anim1 = [];
    let index = 0;
    if (len1 >= len2) {
        return anim1;
    }
    let mid = Math.floor((len2 + len1) / 2);
    anim1[index++] = [0, len1, mid];
    var anim2 = mergesort(array, len1, mid);
    for (let i = 0; i < anim2.length; i++) {
        anim1[index++] = anim2[i];
    }
    anim1[index++] = [0, mid + 1, len2];
    var anim3 = mergesort(array, mid + 1, len2);
    for (let i = 0; i < anim3.length; i++) {
        anim1[index++] = anim3[i];
    }
    var anim4 = mergefunc(array, len1, mid, len2);
    for (let i = 0; i < anim4.length; i++) {
        anim1[index++] = anim4[i];
    }
    return anim1;
}

export default mergesort;

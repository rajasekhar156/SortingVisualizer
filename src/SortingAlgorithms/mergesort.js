const mergefunc = (array, l1, m, l2) => {
    let p = l1,
        q = m + 1,
        r = 0,
        sum = 0;
    const temparr = [];
    const animate = [];
    let index = 0;
    while (r < (l2 - l1 + 1)) {
        if (p > m) {
            animate[index++] = [1, q, array[q]];
            temparr[r++] = array[q++];
        } else if (q > l2) {
            animate[index++] = [1, p, array[p]];
            temparr[r++] = array[p++];
        } else if (array[p] > array[q]) {
            var test = [];
            for (let i = p; i <= m; i++) {
                test[i - p] = array[i];
            }
            test.push(array[q]);
            animate[index++] = [3, p + sum, test];
            temparr[r++] = array[q++];
            sum++;
        } else {
            animate[index++] = [2, p, q];
            temparr[r++] = array[p++];
        }
    }
    for (let i = 0; i < r; i++) {
        array[i + l1] = temparr[i];
    }
    return animate;
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

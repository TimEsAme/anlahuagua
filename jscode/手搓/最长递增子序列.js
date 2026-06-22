function jager(arr) {

    function mikasa(index, subSeq) {
        // 当前元素
        let currentNum = arr[index]

        // 把之前的子序列展开,加上当前元素
        let newSeq = [...subSeq, currentNum]

        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i] > currentNum) {
                mikasa(i, newSeq)
            }
        }
        console.log(newSeq, index);


    }


    for (let i = 0; i < arr.length; i++) {
        mikasa(i, [])
    }
}

const jojo = [2, 1, 5, 3, 6, 4, 8, 9, 7]

const res = jager(jojo)

console.log(res);

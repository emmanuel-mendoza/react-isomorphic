let promises = [1000, 2000, 1500, 3000, 2000];

let delay = (time, idx) => {
    return new Promise( (resolve, reject) => 
        setTimeout(() => {
            resolve({item: idx, time: time==0?0:(time/1000)})
        },time))
        .then(res => {
            console.log("Item " + idx + ' was completed after ' + time + " miliseconds");
            return res.item>4?res:delay(1000,res.item + 5);
        });
};

promises = promises.map((time, idx) => delay(time, idx));

Promise.all(promises)
    .then(res => {
        console.log(res);
        console.log("All promises have been completed");
    })



const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

console.log('start');
await sleep(10_000);
console.log('after 10 sec');

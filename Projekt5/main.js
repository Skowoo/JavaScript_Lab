const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(a+b)
      }, 100)
    })
  }

// 1. Async two number addition
async function numberAdder (a,b)
{
    return asyncAdd(a,b);
}

// 2. Async many numbers addition
async function multiNumberAdder (...args)
{
    if (args.some(x => typeof x !== 'number')) {
        return Promise.reject('not all arguments were numbers!')}

    let result = 0

    for (const arg of args) {
      result = await asyncAdd(result, arg);}

    return result
}

// 3. Execution time measurement
async function benchmark(fnc, ...args)
{
  let startTime = performance.now();
  let result = await fnc(...args)
  let endTime = performance.now()
  console.log(`Function execution took ${endTime - startTime} milliseconds`)
  return result;
}

// Test execution
async function execute() {
  let result = await benchmark(multiNumberAdder, 1,2,3,4,5,6,7,8,9);
  console.log(result);
}

execute();
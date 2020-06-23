const infiniteArray = <T>(main: (index: number) => T) => {
    const source = {}
    Object.defineProperties(source, {
        [Symbol.iterator]: {
            enumerable: false,
            value: function*(){
                let index = 0
                while(true) {
                    yield main(index++)
                }
            }
        },
        [Symbol.toStringTag]: {
            enumberable: false,
            get: () => `InfiniteArray (${main(0)}, ${main(1)}, ...)`
        }
    })
    return new Proxy(source as {
        [index: number]: T
        [Symbol.iterator]: GeneratorFunction
        [Symbol.toStringTag]: any
    }, {
        get: (target, index: any) => {
            if(index in target) {
                return target[index]
            }
            if(
                typeof index == "number" 
                || typeof index == "string" 
                && !Number.isNaN(Number(index))
            ) {
                return main(Number(index))
            }
        }
    })
}
const plant = infiniteArray(x => x*2)

console.log(plant)
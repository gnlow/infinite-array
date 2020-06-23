const infiniteArray = <T>(main: (index: number) => T) => new Proxy({
    *[Symbol.iterator](){
        let index = 0
        while(true) {
            yield main(index++)
        }
    }
} as {
    [index: number]: T
    [Symbol.iterator]: GeneratorFunction
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

const plant = infiniteArray(x => x*2)

console.log(plant)
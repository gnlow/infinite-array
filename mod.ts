interface InfiniteArray<T> extends Iterable<T> {
    [index: number]: T
    [Symbol.toStringTag]: string
}

export default <T>(main: (index: number) => T): InfiniteArray<T> => 
    new Proxy(
        {
            *[Symbol.iterator](){
                let index = 0
                while(true) {
                    yield main(index++)
                }
            },
            get [Symbol.toStringTag]() {
                return `InfiniteArray (${main(0)}, ${main(1)}, ...)`
            }
        } as {
            [index: number]: T
            [Symbol.iterator]: () => Iterator<T>
            [Symbol.toStringTag]: string
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
        }
    )
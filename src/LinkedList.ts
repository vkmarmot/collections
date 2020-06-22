export interface ILinkedListValue<T> {
    next: ILinkedListValue<T> | undefined;
    previous: ILinkedListValue<T> | undefined;
    stamp: number;
    value: T;
}
const DELTA = 1E-10;
const MAX_VALUE = Number.MAX_VALUE  / 4;

export class LinkedList<T> {
    first: undefined | ILinkedListValue<T>;
    last: undefined |ILinkedListValue<T>;
    private stamp = Number.MIN_VALUE;

    public insertAfter(previousValue: T, newVal: T) {
        const iterator = this.getIterator();
        for (const value of iterator) {
            if (value.value === previousValue) {
                const newValue: ILinkedListValue<T> = {
                    value: newVal,
                    next: value.next,
                    previous: value,
                    stamp: this.stamp
                };
                value.next = newValue;
                if (!newValue.next) {
                    this.last = newValue;
                }
                return;
            }
        }

        throw new Error("Value not found");
    }

    public delete(val: T) {
        const iterator = this.getIterator();
        for (const value of iterator) {
            if (value.value === val) {
                if (value.previous) {
                    value.previous.next = value.next;
                } else {
                    this.first = value.next;
                }
                if (value.next) {
                    value.next.previous = value.previous;
                } else {
                    this.last = value.previous;
                }
                return;
            }
        }
    }

    public insert(val: T, position: number) {
        const iterator = this.getIterator();
        let currentIndex = 0;
        for (const value of iterator) {
            if (currentIndex === position) {
                const newValue: ILinkedListValue<T> = {
                    value: val,
                    next: value,
                    previous: value.previous,
                    stamp: this.stamp
                };
                if (value.previous) {
                    value.previous.next = newValue;
                }
                value.previous = newValue;
                if (!newValue.previous) {
                    this.first = newValue;
                }
                return;
            }
            currentIndex++;
        }
        if (currentIndex === position) {
            const newValue: ILinkedListValue<T> = {
                value: val,
                next: undefined,
                previous: this.last,
                stamp: this.stamp
            };
            if (this.last) {
                this.last.next = newValue;
            }
            this.last = newValue;
            return;
        }
        throw new Error("Position not found");
    }


    public push(val: T) {
        const newVal = {
            value: val,
            next: undefined,
            previous: this.last,
            stamp: this.stamp
        };
        if (this.last) {
            this.last.next = newVal;
        }
        this.last = newVal;
        if (!this.first) {
            this.first = this.last;
        }
    }

    public pushFirst(val: T) {
        const newVal = {
            value: val,
            next: this.first,
            previous: undefined,
            stamp: this.stamp
        };
        if (this.first) {
            this.first.previous = newVal;
        }
        this.first = newVal;
        if (!this.last) {
            this.last = this.first;
        }
    }

    private createIterator(): Iterable<ILinkedListValue<T>> {
        const { stamp } = this;
        this.stamp += DELTA;
        return {
            [Symbol.iterator]: () => {
                let current = this.first;
                return {
                    next(): IteratorResult<ILinkedListValue<T>> {
                        // if (!current) {
                        //     return { done: true, value: undefined };
                        // }
                        let next: ILinkedListValue<T>
                        do {
                            if (!current) {
                                return { done: true, value: undefined };
                            }
                            next = current;
                            current = current.next;
                        } while (next.stamp > stamp)
                        if (!next) {
                            return { done: true, value: undefined };
                        }
                        return { done: false, value: next };
                    }
                }
            }
        };
    }

    public getIterator(): Iterable<ILinkedListValue<T>> {
        if (this.stamp > MAX_VALUE) {
            let item: ILinkedListValue<T> | undefined = this.first;
            while (item) {
                item.stamp = Number.MIN_VALUE;
                item = item.next;
            }
            this.stamp = Number.MIN_VALUE;
        }

        return this.createIterator();
    }
}



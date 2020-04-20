import {LinkedList} from "./LinkedList";

describe("LinkedList", () => {
    test("Creation", () => {
        const linkedList = new LinkedList();
        expect(linkedList.first).toBeUndefined();
        expect(linkedList.last).toBeUndefined();
    });
    test("push", () => {
        const linkedList = new LinkedList();
        linkedList.push(1);

        expect(linkedList.first?.value).toEqual(1);
        expect(linkedList.last?.value).toEqual(1);

        linkedList.push(2)

        expect(linkedList.first?.value).toEqual(1);
        expect(linkedList.last?.value).toEqual(2);

        linkedList.push(3);

        expect(linkedList.first?.value).toEqual(1);
        expect(linkedList.last?.value).toEqual(3);
    })
    test("iteration", () => {
        const linkedList = new LinkedList<number>();
        linkedList.push(1);
        linkedList.push(2)
        linkedList.push(3);
        linkedList.push(8);
        let list: number[] = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([1, 2, 3, 8]);

        linkedList.delete(3);

        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([1, 2, 8]);

        linkedList.insert(7, 1);

        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([1, 7, 2, 8]);

        linkedList.insert(99, 4);

        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([1, 7, 2, 8, 99]);

        expect(() => {
            linkedList.insert(99, 6);
        }).toThrow("Position not found");

        linkedList.insert(19, 0);

        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([19, 1, 7, 2, 8, 99]);

        list = [];
        for (const val of linkedList.getIterator()) {
            linkedList.delete(val.value);
            list.push(val.value);
        }
        expect(list).toEqual([19, 1, 7, 2, 8, 99]);

        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([]);


    })

    test("push first", () => {

        const linkedList = new LinkedList<number>();
        linkedList.pushFirst(13);

        linkedList.push(1);
        linkedList.push(2)
        linkedList.push(8);
        linkedList.pushFirst(23);
        let list: number[] = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([23,13, 1, 2, 8]);
        expect(linkedList.first?.value).toEqual(23);
    })

    test("delete", () => {
        const linkedList = new LinkedList<number>();

        linkedList.push(8);
        linkedList.pushFirst(23);
        let list: number[] = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([23,8]);
        expect(linkedList.first?.value).toEqual(23);
        linkedList.delete(8);
        list = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([23]);
        linkedList.delete(23);
        list = [];
        expect(list).toEqual([]);
        expect(linkedList.first?.value).toBeUndefined();
        expect(linkedList.last?.value).toBeUndefined();
    })

    test("insert after", () => {
        const linkedList = new LinkedList<number>();

        linkedList.push(8);
        linkedList.push(211);
        linkedList.push(12);
        linkedList.pushFirst(23);
        linkedList.insertAfter(211, 19);
        linkedList.insertAfter(12, 19);
        let list: number[] = [];
        for (const val of linkedList.getIterator()) {
            list.push(val.value);
        }
        expect(list).toEqual([23, 8, 211, 19, 12, 19]);

        expect(() => {
            linkedList.insertAfter(112, 2);
        }).toThrow("Value not found");
    });
});
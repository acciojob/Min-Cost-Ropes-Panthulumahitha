function mincost(arr) {
    // Min-heap implementation using JavaScript
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        // Insert an element into the heap
        push(val) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        }

        // Remove and return the smallest element
        pop() {
            const min = this.heap[0];
            const end = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this.bubbleDown(0);
            }
            return min;
        }

        // Bubble up the element at index i
        bubbleUp(index) {
            let current = index;
            while (current > 0) {
                const parent = Math.floor((current - 1) / 2);
                if (this.heap[current] < this.heap[parent]) {
                    [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];
                    current = parent;
                } else {
                    break;
                }
            }
        }

        // Bubble down the element at index i
        bubbleDown(index) {
            const length = this.heap.length;
            const element = this.heap[index];
            while (true) {
                let left = 2 * index + 1;
                let right = 2 * index + 2;
                let smallest = index;

                if (left < length && this.heap[left] < this.heap[smallest]) {
                    smallest = left;
                }
                if (right < length && this.heap[right] < this.heap[smallest]) {
                    smallest = right;
                }
                if (smallest !== index) {
                    [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                    index = smallest;
                } else {
                    break;
                }
            }
        }

        // Check if the heap is empty
        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const minHeap = new MinHeap();

    // Add all rope lengths to the min-heap
    for (let length of arr) {
        minHeap.push(length);
    }

    let totalCost = 0;

    // Combine ropes until one rope remains
    while (minHeap.heap.length > 1) {
        const first = minHeap.pop();
        const second = minHeap.pop();
        const cost = first + second;
        totalCost += cost;
        minHeap.push(cost);
    }

    return totalCost;
}

module.exports = mincost;

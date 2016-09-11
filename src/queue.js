const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
	if(maxSize){
		this.maxSize = maxSize;
	}
	else this.maxSize = 30;
	this.heap = new MaxHeap();
	}
	

	push(data, priority) {
		try{
			if(this.heap.size() == this.maxSize){
				throw new Error("Heap is full");
			}
			else{
				this.heap.push(data,priority);
			}
		}
		catch(e){
			alert(e.message);
		}
		
	}

	shift() {
		try{
			if(this.isEmpty()){
				throw new Error("heap is empty");
			}
			else{
				var data = this.heap.pop();
			return data;
			}
		}
		catch(e){
			alert(e.message);
		}
		
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if(this.heap.size() == 0){
			return true;
		}
		else return false;
	}
}

module.exports = PriorityQueue;

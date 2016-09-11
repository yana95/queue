const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		var node = new Node (data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.root ){
			var det = this.detachRoot();
			this.restoreRootFromLastInsertedNode(det);
			this.shiftNodeDown(this.root);
			return det.data;
		}
	}

	detachRoot() {
		var det_root = this.root;
		this.root = null;
		if(+this.parentNodes.indexOf(det_root) != -1){
			this.parentNodes.splice(this.parentNodes.indexOf(det_root),1);
		}
		
		return det_root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(this.parentNodes.length >0 ){
			var last = this.parentNodes[this.parentNodes.length-1];
			if(detached.left && detached.left !== last){
				last.left= detached.left;
				last.left.parent = last;
			}
			else{
				last.left= null;
			}
			if(detached.right && detached.right !== last){
				last.right= detached.right;
				last.right.parent = last;
			}
			else{
				last.right= null;
			}
			
			var last_parent = last.parent;
			var last_idx = this.parentNodes.length - 1;
			if(last_parent && last_parent.left === last){
				last_parent.left = null;
			}
			if(last_parent && last_parent.right === last){
				last_parent.right = null;
			}
			last.parent = null;
			this.root = last;
			
			if(!this.root.right && !this.root.left){
				this.parentNodes.shift();
				return;
			}
			if(this.root.left && !this.root.right){
				this.parentNodes.shift();
				this.parentNodes.push(this.root.left);
				return;
			}
			if(this.root.left && this.root.right){
				if(this.parentNodes[0] === last_parent){
					this.parentNodes.pop();
				}
				else{
					this.parentNodes.pop();
					this.parentNodes.unshift(last_parent);
				}
				
			}
		}
		
	}

	size() {
		if(!this.root){
			return 0;
		}
		else{
			if(this.parentNodes.length < 3 &&  +this.parentNodes.indexOf(this.root) != -1){

				return this.parentNodes.length;
			}
			else{
				return this.parentNodes.length +1;
			}

			if (this.parentNodes[this.parentNodes.length -1 ].left){
				return (this.parentNodes.length -1)*2;
			}
			else {
				return (this.parentNodes.length*2)-1;
			}
		}
	}

	isEmpty() {
		if (this.root === null  ){
			return true;
		}
		else return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}


	insertNode(node) {
		if(!this.root ){
			this.root = node;
			this.parentNodes[0] = node;
			return;
		}
		this.parentNodes.push(node);
		this.parentNodes[0].appendChild(node);
		if(this.parentNodes[0].left && this.parentNodes[0].right){
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if(node.parent && node.priority > node.parent.priority ){
			if(+this.parentNodes.indexOf(node.parent) != -1){
				var child=this.parentNodes.indexOf(node);
				var parent=this.parentNodes.indexOf(node.parent);
				this.parentNodes[parent] = node;
				this.parentNodes[child] = node.parent;
			}
			else{
				this.parentNodes.splice(this.parentNodes.indexOf(node),1,node.parent);
			}
			
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
		if(!node.parent){
			this.root = node;
		}


		
	}
		
	

	shiftNodeDown(node) {
		if(node ){
			var left = node.left;
			var right = node.right;
			var largest = node;
			if(left  && left.priority > largest.priority ){
				largest = left;
			}
			if (right &&  right.priority > largest.priority){
				largest  = right;
			}
			if(largest !== node ){
				if(!node.left || !node.right){
					var child=this.parentNodes.indexOf(largest);
					var parent=this.parentNodes.indexOf(node);
					this.parentNodes[parent] = largest;
					this.parentNodes[child] = node;
				}
				else{
					this.parentNodes[this.parentNodes.indexOf(largest)] = node;
				}
				
				largest.swapWithParent();
				if(!largest.parent){
					this.root = largest;
				}
				this.shiftNodeDown(node);
			}
		}
		

	}
}

module.exports = MaxHeap;

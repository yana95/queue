class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=null;
		this.left=null;
		this.right=null;
	}

	appendChild(node) {
		if(!this.left){
			node.parent = this;
			this.left = node;
			return;
		}
		if(this.left && !this.right){
			node.parent = this;
			this.right = node;
			return;
		}

	}

	removeChild(node) {
		try{
			if(this.left !== node && this.right!== node){
				throw new Error("Element haven't got this child!");
			}
			else{
				if(this.left === node){
					node.parent=null;
					this.left=null;
				}
				if(this.right === node){
					node.parent=null;
					this.right=null;}
				}
			}
		catch(e){
			alert(e.message);
		}
	}

	remove() {
		if(this.parent){
			this.parent.removeChild(this);
			}		
	}

	swapWithParent() {

		if(this.parent){
			var buf=this.parent;

			this.parent=buf.parent;
			buf.parent=this;

			if(this === buf.left && buf.right){
				buf.right.parent=this;
			}
			if(this === buf.right && buf.left){
				buf.left.parent=this;
			}
			
			if(this === buf.left){
				var right=buf.right;
				buf.left=this.left;
				buf.right=this.right;
				this.left=buf;
				this.right=right;
			}

			if(this === buf.right){
				var left=buf.left;
				buf.right=this.right;
				buf.left=this.left;
				this.right=buf;
				this.left=left;
			}

			if(buf.left){
				buf.left.parent = buf;
			}
			if(buf.right){
				buf.right.parent = buf;
			}

			if(this.parent){
					if(this.parent.left === buf){
					this.parent.left = this;
					}
					if(this.parent.right === buf){
					this.parent.right = this;
				}
			}
			
			

}
		}
		




}

module.exports = Node;

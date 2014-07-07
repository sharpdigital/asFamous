function UniversalFunctions(){
	this.parent_functions = [
		this.addChild,
		this.removeChild,

	];
	this.addChild = function(child){
		if(this.mainNode){
			for(var c = 0; c < this._children.length; c++){
				if(this._children[c] === child){
					this._children.splice(c, 1);
				}
			}
			this._children.push(child);
			child.parent = this;
			child.root = this.root;

			this.mainNode.add(child.renderNode);
			child.renderController.show(child);

			this.root.sortDepths();
			child.removed = false;
		}else{
			console.log("Error - One does not simply add a child to this object");
		}
		
	};
	this.removeChild = function(child){
		if(this.mainNode){
			for(var c = 0; c < this._children.length; c++){
				if(this._children[c] === child){
					this._children.splice(c, 1);
				}
			}
			child.removed = true;
			this.root.sortDepths();
			child.renderController.hide(child);
		}else{
			console.log("Error - One does not simply remove a child of this object");
		}
		
	};
	this.removeAllChildren = function(){
		if(this.mainNode){
			for(var c = 0; c < this._children.length; c++){
				this.removeChild(this._children[c]);
			}
		}else{
			console.log("Error - One does not simply remove all the children of this object");
		}
	};

	// depth handling

	this.swapDepths = function(child1, child2){
		if(this.mainNode){
			var childIndexes = [];
			for(var c = 0; c < this._children.length; c++){
				if(this._children[c] === child1 || this._children[c] === child2){
					childIndexes.push({index:c, child:this._children[c]});
				}
			}
			if(childIndexes.length == 2){
				this._children[childIndexes[0].index] = childIndexes[1].child;
				this._children[childIndexes[1].index] = childIndexes[0].child;
			}else{
				console.log("Error - Cannot find children");
				console.log(this._children);
			}
			this.root.sortDepths();
		}else{
			console.log("Error - One does not simply remove all the children of this object");
		}
		

	};


	// Event handling

	this.addEventListener = function(type, fn){
		this.pipe(this.root.eventHandler);
		this.on(type, fn);
	};

	this.removeEventListener = function(type, fn){
		this.removeListener(type, fn);
	};

	this.dispatchEvent = function(type, event){
		this.emit(type, event);
	};
	// Content handling


	this.kill = function(){
		this.unpipe(this.root.eventHandler);
		this.removeAllChildren();
	};

	// Tween with famous built in tweener

	this.tweenTo = function(type, atr){
		//TODO: not sure wanna do :)
	};

	this.css = function(atr){
		if(this.setProperties){
			this.setProperties(atr);
		}
		
	};

	this.addContent = function(src){
			this._content = src;
	       	this.setContent(src);
	};
	return this;
}
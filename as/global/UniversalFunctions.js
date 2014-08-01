function UniversalFunctions(){
	this.addChild = function(child){
		if(this._childMount){
			for(var c = 0; c < this._children.length; c++){
				if(this._children[c] === child){
					this._children.splice(c, 1);
				}
			}
			this._children.push(child);
			child.parent = this;

			if(this.root){
				child.root = this.root;
			}

			for(var l in this._listeners){

				this.pipeChildren(this._listeners[l], this.dispatcher, this);
			}

			this._childMount.add(child.renderNode);
			child.renderController.show(child);

			if(this.root){
				this.root.sortDepths();
			}
			if(this.cursor != "auto"){
				child.cursor = this.cursor;
			}
			
			child.mouseEnabled = this.mouseChildren;

			if(child.drag){
				child.setSync("drag");
			}
			if(child.scrollX){
				child.setSync("scrollX");
			}
			if(child.scrollY){
				child.setSync("scrollY");
			}
			this.x = this.x; // for registartion point apply
			this.y = this.y; // for registartion point apply
			child.removed = false;
		}
		return child;
	};
	this.removeChild = function(child){
		if(this._childMount){
			for(var c = 0; c < this._children.length; c++){
				if(this._children[c] === child){
					this._children.splice(c, 1);
				}
			}
			child.removed = true;
			if(this.root){
				this.root.sortDepths();
			}
			child.renderController.hide(child);
		}
		return child;
	};
	this.removeAllChildren = function(){
		if(this._childMount){
			for(var c = 0; c < this._children.length; c++){
				this.removeChild(this._children[c]);
			}
		}
		return this;
	};

	// depth handling
	this.swapDepths = function(child1, child2){
		if(this._childMount){
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
			if(this.root){
				this.root.sortDepths();
			}
		}
		return this;
	};
	this.setDepth = function(newDepth){
		if(this.parent && this.parent._childMount){
			var buffChild;
			if(this.parent && this.parent._children.length >= newDepth){
				for(var c = 0; c < this.parent._children.length; c++){
					if(this.parent._children[c] === this){
						buffChild = this.parent._children[c];
						this.parent._children[c] = null;
					}
				}
			}else{
				if(!this.parent){
					console.log("Error - This object doesn't have a parent");
				}else{
					console.log("Error - The new index is out of the parent's children range");
				}
				
				return this;
			}
			
			if(buffChild){
				this.parent._children.splice(newDepth, 0, buffChild);
			}else{
				console.log("Error - Cannot find child");
			}

			for(var cc = 0; cc < this.parent._children.length; cc++){
				if(this.parent._children[cc] === null){
					this.parent._children.splice(cc, 1);
				}
			}
			if(this.root){
				this.root.sortDepths();
			}
		}
		return this;
	};

	// modifiers
	this.addMod = function(type){
		switch (type) {
			case "scaleM":
				this._chain[0] = new this.StateModifier();
				this._scaleM = this._chain[0];
			break;
			case "rotaMz":
				this._rotaMz = this._chain[1] = new this.StateModifier();
			break;
			case "rotaMy":
				this._rotaMy = this._chain[2] = new this.StateModifier();
			break;
			case "rotaMx":
				this._rotaMx = this._chain[3] = new this.StateModifier();
			break;
			case "moveM":
				this._chain[4] = new this.StateModifier();
				this._moveM = this._chain[4];
			break;
		}
		var arr = [];
		for(var m = 0; m < this._chain.length; m++){
			if(this._chain[m] !== undefined){
				arr.push(this._chain[m]);
			}
		}
		this.modifier._chain = arr;
	};
	// event handling
	this.dispatcher = function(e) {// here comes in the original famous event
		if(!e){// assume deploy... funny
			e = {type:"deploy"};
		}
		var events = this._listeners[e.type];

		for(var d = 0; d < events.length; d++){
			var event = events[d];
			event.origin = e;
			if(event){
				if(event.type == "mouseout"){
					event.currentTarget._mouse_state = "out";
					setTimeout(event.currentTarget._mouseOutChecker, 10, event);
				}
				if(event.type == "mouseover" && event.currentTarget._mouse_state == "out"){
					event.currentTarget._mouse_state = "over";
				}else{
					if(event.type != "mouseout"){
						event.currentTarget._mouse_state = "left";
						this._callListenersOfEvent(event);
					}
				}
			}
		}
	};
	this._callListenersOfEvent = function(e){
		e.fn(e);
	};
	this._mouseOutChecker = function(e){
		if(e.currentTarget._mouse_state != "over"){
			e.currentTarget._mouse_state = "left";
			e.currentTarget._callListenersOfEvent(e);
		}
	};
	this.addEventListener = function(type, fn){
		var event = {type:type, fn:fn, currentTarget: this };
		this.pipeChildren(event, this.dispatcher, this);
		return this;
	};

	this.removeEventListener = function(type, fn){
		var event = {type:type, fn:fn, currentTarget: this };
		this.unpipeChildren(event, this.dispatcher, this);
		return this;
	};
	this.removeAllListeners = function(){
		for(var t in this._listeners){
			var l = this._listeners[t].length;
			for(var d = 0; d < l; d++){
				this.unpipeChildren(this._listeners[t][d], this.dispatcher, this);
			}
		}
		return this;
	};
	//this._eventOutput.emit('click');
	this.pipeChildren = function (e, fn, obj, rec){
		if(e && fn && obj){
			/*if(!rec){
				if(obj._eventOutput){
					obj._eventOutput.on(e.type, fn);
				}
			}*/
			if(!obj._listeners[e.type]){
				obj._listeners[e.type] = [];
			}
			var exists = false;
			for(var ex = 0; ex < obj._listeners[e.type].length; ex++){
				if(e.fn === obj._listeners[e.type][ex].fn){
					exists = true;
					console.log("FUNCTION EXISTS");
				}
			}
			if(!exists){
				if(!obj._eventOutput && !obj._listeners[e.type].length){
					obj.on(e.type, obj.dispatcher);
				}
				obj._listeners[e.type].push(e);
			}
				
			for(var c = 0; c < obj._children.length; c++){
				this.pipeChildren(e, fn, obj._children[c], true);
			}
		}
		return this;
	};
	this.unpipeChildren = function (e, fn, obj, rec){
		if(e && fn && obj){
			var t = e.type;
			if(obj._listeners[t]){
				var l = obj._listeners[t].length;
				for(var d = 0; d < l; d++){
					if(obj._listeners[t][d] && obj._listeners[t][d].type === e.type && obj._listeners[t][d].fn === e.fn){
						obj._listeners[t].splice(d,1);
						//console.log(obj.dispatcher);
						if(!obj._listeners[t].length){
							if(!obj._eventOutput){
								obj.removeListener(t, obj.dispatcher);
							}
							obj._listeners[t] = null;

						}
					}
				}
			}
			for(var c = 0; c < obj._children.length; c++){
				this.unpipeChildren(e, fn, obj._children[c], true);
			}
		}

		return this;
	};
	this.dispatchEvent = function(type){
		this.dispatcher({type:type});
		//TODO make it work
		return this;
	};

	// Content handling
	this.kill = function(){
		if(this.root){
			this.unpipe(this.root.eventHandler);
		}
		this.removeAllListeners();
		this.removeAllChildren();
		//TODO test
		return this;
	};

	// Tween with famous built in tweener
	this.tweenTo = function(type, atr){
		//TODO: not sure wanna do :)
	};

	this.css = function(attr){
		if(this.setProperties){
			this.setProperties(attr);
		}
		return this;
		
	};

	this.addContent = function(src){
		this._content = src;
		if(this.setContent){
			this.setContent(src);
		}
       	return this;
	};
	
	this.setCursor = function(type){
		if(this._eventOutput){
			this.cursorChildren(type, this);
		}else{
			this.css({cursor:type});
		}
		return this;
	};

	this.cursorChildren = function (type, obj){
		if(!obj){
			obj = this;
		}
		for(var c = 0; c < obj._children.length; c++){
			var child = obj._children[c];
			if(child._eventOutput){
				child.cursorChildren(type, child);
			}else{
				child.css({cursor:type});
			}
		}
		return this;
	};

	this.getBounds = function (x,y,bounds){
		if(!x){
			x = 0;
		}
		if(!y){
			y = 0;
		}
		if(!bounds){
			bounds = {x:555555, y:555555, width:0, height:0};
		}
		if(this._eventOutput){
			for(var c = 0; c < this.children.length; c++){
				var child = this.children[c];
				bounds = child.getBounds(x+child.x, y+child.y, bounds);
			}
		}else{
			var childWidth = !this.width ? this.getSize(true)[0] : this.width;
			var childHeight = !this.height ? this.getSize(true)[1] : this.height;

			if(x+this.x-(childWidth*this.regX) < bounds.x){
				bounds.x = x+this.x-(childWidth*this.regX);
			}
			if(y+this.y-(childHeight*this.regY) < bounds.y){
				bounds.y = y+this.y-(childHeight*this.regY);
			}
			if(x+(childWidth*(1-this.regX)) > bounds.width){
				bounds.width = x+(childWidth*(1-this.regX));
			}
			if(y+(childHeight*(1-this.regY)) > bounds.height){
				bounds.height = y+(childHeight*(1-this.regY));
			}
		}
		return bounds;
	};

	this.setSync = function(type){
		if(this.GenericSync){
			switch (type){
				case "drag":
					this.GenericSync.register({
				        mouse : this.MouseSync
				    });
				break;
				case "scrollX":
				case "scrollY":
					this.GenericSync.register({
				        touch : this.TouchSync,
				        scroll : this.ScrollSync
				    });
				break;
			}
			if(!this.sync){
				this.activateSync();
			}
			if(this.sync){
				switch (type){
					case "drag":
						this.sync.addSync(["mouse"]);
						this.sync._syncs.mouse._eventInput.on("mouseup", this.__offDrag);
					break;
					case "scrollX":
					case "scrollY":
						this.sync.addSync(["touch", "scroll"]);
					break;
				}
			}
		}
	};
	
	this.activateSync = function (){
		if(!this.sync && this.GenericSync && this.parent && this.root && (this.drag || this.scrollX || this.scrollY)){
			this.sync = new this.GenericSync();
			this.sync._parent = this;
			this.__addHoverListeners();

			this.sync.on("start", function(event) {
				console.log("SyncStart");
		    });
			
		    this.sync.on("update", function(event) {
		    	console.log("update "+this.name);
		       	this._parent.scroller(event);
		    });

		    /*this.sync.on("end", function(event) {
		    });*/	
			console.log("activateSync");
		}
	};
	this.removeSync = function(type){
		//TODO
	};
	this.scroller = function(event){
		var new_x = this.x + event.delta[0];
		var new_y = this.y + event.delta[1];
		//console.log(new_x+" "+new_y);
		if(this.scrollX){
			if(this.parent.width && this.parent.width < this.width){
				if(new_x < this.parent.width-this.width){
					new_x = this.parent.width-this.width;
				}else if(new_x > 0){
					new_x = 0;
				}
				this.x = new_x;
			}else if(!this.parent.width && this.scrollX){// free scroll
				this.x = new_x;
			}else if(this.parent.width && this.parent.width-this.width > 0){
				this.y = 0;
				this.x = 0;
			}
		}else if(this.drag){
			
				if(this.parent.width && this.parent.width > this.width){
					if(this.dragBounds){
						if(new_x > this.parent.width-this.width){
							new_x = this.parent.width-this.width;
						}else if(new_x < 0){
							new_x = 0;
						}
					}
					this.x = new_x;
				}else if(!this.parent.width && this.drag){// free scroll
					this.x = new_x;
				}
		}
		if(this.scrollY){
			if(this.parent.height && this.parent.height < this.height){

				if(new_y < this.parent.height-this.height){
					new_y = this.parent.height-this.height;
				}else if(new_y > 0){
					new_y = 0;
				}
				this.y = new_y;
			}else if(!this.parent.height && this.scrollY){// free scroll
				this.y = new_y;
			}else if(this.parent.height && this.parent.height-this.height > 0){
				this.y = 0;
				this.x = 0;
			}
		}else if(this.drag){

			if(this.parent.height && this.parent.height > this.height){
				if(this.dragBounds){
					if(new_y > this.parent.height-this.height){
						new_y = this.parent.height-this.height;
					}else if(new_y < 0){
						new_y = 0;
					}
				}
				this.y = new_y;
			}else if(!this.parent.height && this.drag){// free drag
				this.y = new_y;
			}
		}
	};

	//scroll and drag helper internal functions, occupies "mouseover" and "mouseout" of this object
	/*this.__syncIt = function(e){
		console.log("e");
		console.log(e);
		//this.sync.emit("update");
	}*/
	this.__addHoverListeners = function(){
		this.addEventListener("touchstart", this.__asOver);
		this.addEventListener("mouseover", this.__asOver);
		this.addEventListener("mouseout", this.__asOut);
		this.addEventListener("touchend", this.__asOut);
		this.pipe(this.sync);
	};
	
	this.__asOver = function(e){
		//console.log("__asOver"+e.currentTarget.name);
		if(e.currentTarget.drag || e.currentTarget.scrollX || e.currentTarget.scrollY){
			e.currentTarget.root.Engine.pipe(e.currentTarget.sync);
		}
	};

	this.__asOut = function(e){
		//console.log("__asOut"+e.currentTarget.name);
		if(!e.currentTarget.drag){
			e.currentTarget.root.Engine.unpipe(e.currentTarget.sync);
		}
	};
	var _this = this;
	this.__offDrag = function(){
		_this.root.Engine.unpipe(_this.sync);
	};
	//angle translation
	this.degToRad = function(angle){
		return angle * (Math.PI/180);
	};
	this.radToDeg = function(angle){
		return angle * (180/Math.PI);
	};

	this.setAutoSize = function(){
		if(this.currentTarget && this.currentTarget._currTarget && this.currentTarget.autoSize){
			var t = this.currentTarget._currTarget;
			//this.currentTarget.css({border: "1px solid "});
			var font_p = this.currentTarget.autoSize === true ? 1 : this.currentTarget.autoSize;
			this.currentTarget.width = t.offsetWidth;
			this.currentTarget.height = t.offsetHeight*font_p;
            console.log(this.currentTarget.name+": "+this.currentTarget.width+" "+this.currentTarget.height);
		}
		
	};
	return this;
}






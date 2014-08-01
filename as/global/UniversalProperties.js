function UniversalProperties(){
	//Internal linking
	this._chain = [undefined, undefined, undefined, undefined, undefined];
	this._scaleM;
	this._rotaMz;
	this._rotaMy;
	this._rotaMx;
	this._moveM;

	this._children = [];
	this._parent;
	this._root;
	this._listeners = {};
	this._modifier;
	this._content;

	//visibility
	this._alpha = 1;
	this._visible = true;
	this._removed = false;

	//position and dimensions
	this._x = 0;
	this._y = 0;
	this._z = 0;
	this._depth = 0;

	this._width = 0;
	this._height = 0;

	//align, rotation, scale, skew
	this._regX = 0;
	this._regY = 0;

	this._originX = 0;
	this._originY = 0;

	this._alignX = 0;
	this._alignY = 0;
	this._rotation = 0;
	this._rotationX = 0;
	this._rotationY = 0;
	this._rotationZ = 0;
	this._scaleX = 1;
	this._scaleY = 1;
	this._scaleZ = 1;
	this._perspective = 1;
	//identity
	this.__name = "item";
	this._color;

	//mouse stuff
	this._cursor = "auto";
	this._mouseChildren = true;
	this._mouseEnabled = true;

	//non as stuff
	this._doubleSided = false // add class .double-sided

	// masking with a rectangle
	this._mask;
	this.__real_mask;
	this._fixed_mask = false;
	this._mouse_state = "left"; // setted directly from UniversalFunctions for smooth hover listeners.

	// syncing variables
	this._dragBounds = false;
	this._drag = false;
	this._scrollX = false;
	this._scrollY = false;
	
	this._fontSizePercent = 1;
	this._autoSize;
	// variable setters and getters
	this._sync;

	Object.defineProperty(this, "children", {
       configurable : true,
		get : function(){
			for(var i = 0; i < this._children; i++){
				if(this._children[i].parent != this){
					this._children.splice(i, 1);
				}
			}
			return this._children;
		},
	    /*set : function(newValue){ this._children = newValue; }*/
	});

	Object.defineProperty(this, "listeners", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._listeners; },
	    /*set : function(newValue){ this._listeners = newValue; }*/
	});

	Object.defineProperty(this, "parent", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._parent; },
	    set : function(newValue){ this._parent = newValue;
	    	this.activateSync();
	    }
	});
	Object.defineProperty(this, "root", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._root; },
	    set : function(newValue){ this._root = newValue;
	    	if(this.children.length){
	    		for(var c = 0; c < this.children.length; c++){
						this.children[c].root = this._root;
	    		}
	    	}
	    	this.activateSync();
	    }
	});

	Object.defineProperty(this, "alpha", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alpha; },
	    set : function(newValue){ this._alpha = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setOpacity(newValue);
	    }
	});

	Object.defineProperty(this, "visible", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._visible; },
	    set : function(newValue){ this._visible = newValue;
	    	if(this.root){
	    		if(newValue){
	    			if(!this.removed){
						this.renderController.show(this);
	    			}
	    		}else{
	    			this.renderController.hide(this);
	    		}
	    	}
	    }
	});

	Object.defineProperty(this, "removed", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._removed; },
	    set : function(newValue){ this._removed = newValue; }
	});


	Object.defineProperty(this, "x", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._x; },
	    set : function(newValue){this._x = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	var translateX = this._x;
	    	var translateY = this._y;
	    	if(this.parent){
	    		translateX -= this.parent.regX;
	    		translateY -= this.parent.regY;
	    	}
			this._moveM.setTransform(this.Transform.translate(translateX, translateY, this._z));

			if(this.mask && this._fixed_mask){
	    		this._real_mask = this.mask;
			}
	    }
	});

	Object.defineProperty(this, "y", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._y; },
	    set : function(newValue){ this._y = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	var translateX = this._x;
	    	var translateY = this._y;
	    	if(this.parent){
	    		translateX -= this.parent.regX;
	    		translateY -= this.parent.regY;
	    	}
			this._moveM.setTransform(this.Transform.translate(translateX, translateY, this._z));
	    	if(this.mask && this._fixed_mask){
	    		this._real_mask = this.mask;
			}
	    }
	});

	Object.defineProperty(this, "z", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._z; },
	    set : function(newValue){ this._z = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setTransform(this.Transform.translate(this._x, this._y, this._z));
	    }
	});

	Object.defineProperty(this, "depth", {//exclude asSprite, asRoot
       enumerable : true,
       configurable : true,
		get : function(){ return this._depth; },
	    set : function(newValue){ this._depth = newValue;
	    	this.css({zIndex:this._depth});
	    }
	});
	Object.defineProperty(this, "width", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._width*this._scaleX;},
	    set : function(newValue){
	    	this._width = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setSize([this._width, this._height]);
	    	this.css({lineWidth:this._width});
	    	if(this.autoSize){
	    		this.setAutoSize();
	    	}
	    }
	});
	
	Object.defineProperty(this, "height", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._height*this._scaleY;},
	    set : function(newValue){
	    	this._height = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setSize([this._width, this._height]);
	    	if(this.autoSize){
	    		this.setAutoSize();
	    	}
	    }
	});

	Object.defineProperty(this, "originX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._originX; },
	    set : function(newValue){ this._originX = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setOrigin([this._originX, this._originY]);
	    }
	});

	Object.defineProperty(this, "originY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._originY; },
	    set : function(newValue){ this._originY = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setOrigin([this._originX, this._originY]);
	    }
	});

	Object.defineProperty(this, "regX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._regX; },
	    set : function(newValue){ this._regX = newValue;
	    	for(var i = 0; i < this._children.length; i++){
	    		this._children[i].x = this._children[i].x;
	    	}
	    }
	});

	Object.defineProperty(this, "regY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._regY; },
	    set : function(newValue){ this._regY = newValue;
	    	for(var i = 0; i < this._children.length; i++){
	    		this._children[i].y = this._children[i].y;
	    	}
	    }
	});

	Object.defineProperty(this, "alignX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alignX; },
	    set : function(newValue){ this._alignX = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setAlign([this._alignX, this._alignY]);
	    }
	});

	Object.defineProperty(this, "alignY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alignY; },
	    set : function(newValue){ this._alignY = newValue;
	    	if(!this._moveM){
	    		this.addMod("moveM");
	    	}
	    	this._moveM.setAlign([this._alignX, this._alignY]);
	    }
	});

	Object.defineProperty(this, "rotation", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationZ); },
	    set : function(newValue){this._rotationZ = this.degToRad(newValue);
	    	if(!this._rotaMz){
	    		this.addMod("rotaMz");
	    	}
			this._rotaMz.setTransform(this.Transform.rotateZ(this._rotationZ));
	    }
	});

	Object.defineProperty(this, "rotationX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationX); },
	    set : function(newValue){ this._rotationX = this.degToRad(newValue);
	    	if(!this._rotaMx){
	    		this.addMod("rotaMx");
	    	}
	    	this._rotaMx.setTransform(this.Transform.rotateX(this._rotationX));
	    }
	});

	Object.defineProperty(this, "rotationY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationY); },
	    set : function(newValue){ this._rotationY = this.degToRad(newValue);
	    	if(!this._rotaMy){
	    		this.addMod("rotaMy");
	    	}
	    	this._rotaMy.setTransform(this.Transform.rotateY(this._rotationY));
	    }
	});

	Object.defineProperty(this, "rotationZ", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationZ); },
	    set : function(newValue){ this._rotationZ = this.degToRad(newValue);
	    	if(!this._rotaMz){
	    		this.addMod("rotaMz");
	    	}
	    	this._rotaMz.setTransform(this.Transform.rotateZ(this._rotationZ));
	    }
	});

	Object.defineProperty(this, "scaleX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleX; },
	    set : function(newValue){ this._scaleX = newValue;
	    	if(!this._scaleM){
	    		this.addMod("scaleM");
	    	}

	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "scaleY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleY; },
	    set : function(newValue){ this._scaleY = newValue;
	    	if(!this._scaleM){
	    		this.addMod("scaleM");
	    	}
	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "scaleZ", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleZ; },
	    set : function(newValue){ this._scaleZ = newValue;
	    	if(!this._scaleM){
	    		this.addMod("scaleM");
	    	}
	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "name", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.__name; },
	    set : function(newValue){
	    	if(this.setClasses){
		    	//this.removeClass(this.__name);
		    	this.__name = newValue;
		    	this.setClasses([this.__name]);
		    }else{
		    	this.__name = newValue;
		    }
	    }
	});

	Object.defineProperty(this, "color", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._color; },
	    set : function(newValue){ this._color = newValue;
	    	this.css({backgroundColor:newValue});
	    }
	});
	Object.defineProperty(this, "cursor", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._cursor; },
	    set : function(newValue){ this._cursor = newValue; 
	    	this.setCursor(this._cursor);
	    }
	});
	Object.defineProperty(this, "useHandCursor", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._cursor; },
	    set : function(newValue){ 
	    	if(newValue){
	    		this._cursor = "pointer"; 
	    	}else{
	    		this._cursor = "auto";
	    	}
	    	this.setCursor(this._cursor);
	    }
	    
	});
	Object.defineProperty(this, "mouseEnabled", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._mouseEnabled; },
	    set : function(newValue){ this._mouseEnabled = newValue;
	    	if(newValue){
	    		this.css({pointerEvents:'auto'});
	    	}else{
				this.css({pointerEvents:'none'});
	    	}
	    	
	    }
	});
	Object.defineProperty(this, "mouseChildren", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._mouseChildren; },
	    set : function(newValue){ this._mouseChildren = newValue;
	    	for(var c = 0; c < this.children.length; c++){
		    	this.children[c].mouseEnabled = newValue;
	    	}
	    }
	});
	Object.defineProperty(this, "doubleSided", {//exclude asSprite, asRoot
       enumerable : true,
       configurable : true,
		get : function(){ return this._doubleSided; },
	    set : function(newValue){ this._doubleSided = newValue;
	    	if(newValue){
	    		this.addClass('double-sided');
	    	}else{
				this.removeClass('double-sided');
	    	}
	    	
	    }
	});

	Object.defineProperty(this, "mask", {//exclude asSprite, asRoot
       enumerable : true,
       configurable : true,
		get : function(){ return this._mask; },
	    set : function(newValue){ var m = newValue;
	    	if(newValue){
	    		m.y = m.y ? m.y : 0;
	    		m.x = m.x ? m.x : 0;
	    		m.width = m.width ? m.width : 0;
	    		m.height = m.height ? m.height : 0;
	    		this._mask = m;
	    		if(newValue.fixed){
	    			this._fixed_mask = true;
	    		}else{
	    			this._fixed_mask = false;

	    		}
				this._real_mask = this._mask
	    	}
	    }
	});

	Object.defineProperty(this, "_real_mask", {//exclude asSprite, asRoot
       enumerable : true,
       configurable : true,
		get : function(){ return this.__real_mask; },
	    set : function(newValue){ var m = newValue;
	    	if(newValue){
	    		if(this._fixed_mask){
	    			m.x = -this.x;
	    			m.y = -this.y;
	    		}
	    		
	    		this.css({clip:'rect('+m.y+'px,'+(m.width+m.x)+'px,'+(m.height+m.y)+'px,'+m.x+'px)'});
	    		this.__real_mask = m;
	    	}
	    }
	});

	Object.defineProperty(this, "drag", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._drag; },
	    set : function(newValue){ this._drag = newValue;
	    	if(this._drag){
	    		this.setSync("drag");
	    	}else{
	    		this.removeSync("drag");
	    	}
	    }
	});

	Object.defineProperty(this, "dragBounds", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._dragBounds; },
	    set : function(newValue){ this._dragBounds = newValue;
	    }
	});

	Object.defineProperty(this, "scrollX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scrollX; },
	    set : function(newValue){ this._scrollX = newValue;
	    	if(this._scrollX){
	    		this.setSync("scrollX");
	    	}else{
	    		this.removeSync("scrollX");
	    	}
	    }
	});

	Object.defineProperty(this, "scrollY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scrollY; },
	    set : function(newValue){ this._scrollY = newValue;
	    	if(this._scrollY){
	    		this.setSync("scrollY");
	    	}else{
	    		this.removeSync("scrollY");
	    	}
	    }
	});
	Object.defineProperty(this, "autoSize", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._autoSize; },
	    set : function(newValue){ this._autoSize = newValue;
	    	if(!this._eventOutput){
	    		if(newValue){
		    		this.addEventListener("deploy", this.setAutoSize);
		    		this.setAutoSize();
		    	}else{
		    		this.removeEventListener("deploy", this.setAutoSize);
		    	}
	    	}else{
	    		console.log("asFamous ERROR  You can't set autoWidth on this element.");
	    	}
	    }
	});
	
	Object.defineProperty(this, "fontSizePercent", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._fontSizePercent; },
	    set : function(newValue){ 
	    	this._fontSizePercent = newValue;
	    }
	});
	Object.defineProperty(this, "sync", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._sync; },
	    set : function(newValue){ 
	    	this._sync = newValue;
	    }
	});
	return this;
}

function UniversalProperties(){
	//Internal linking
	this._scaleM = this.modifier._chain[0];
	this._rotaM = this.modifier._chain[1];
	this._moveM = this.modifier._chain[2];

	this._children = [];
	this._parent;
	this._root = "hello";
	//this._evenListener;
	this._modifier;
	this._content;

	//array of modifyers
	//this._modifiers = [];

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
	this._name = "item";


	//mouse stuff
	this._cursor;
	//this._mouseChildren = true; needs to be tested;
	this._mouseEnabled = true;

	//non as stuff
	this._doubleSided = false // add class .double-sided
	this._draggable = false

	this.degToRad = function(angle){
		return angle * (Math.PI/180);
	}
	this.radToDeg = function(angle){
		return angle * (180/Math.PI);
	}

	// simple variable setters and getters

	Object.defineProperty(this, "children", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._children; },
	    set : function(newValue){ this._children = newValue; }
	});

	Object.defineProperty(this, "root", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._root; },
	    set : function(newValue){ this._root = newValue;}
	});

	/*Object.defineProperty(this, "modifier", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._modifier; },
	    set : function(newValue){ this._modifier = newValue; }
	});*/

	Object.defineProperty(this, "alpha", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alpha; },
	    set : function(newValue){ this._alpha = newValue;
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
	    			this.renderController.show(this);
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
		get : function(){ return this._x },
	    set : function(newValue){this._x = newValue;
			this._moveM.setTransform(this.Transform.translate(this._x, this._y, this._z));
	    }
	});

	Object.defineProperty(this, "y", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._y; },
	    set : function(newValue){ this._y = newValue;
	    	this._moveM.setTransform(this.Transform.translate(this._x, this._y, this._z));
	    }
	});

	Object.defineProperty(this, "z", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._z; },
	    set : function(newValue){ this._z = newValue;
	    	this._moveM.setTransform(this.Transform.translate(this._x, this._y, this._z));
	    	//this.css({zIndex:this._z});
	    }
	});
	Object.defineProperty(this, "depth", {
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
		get : function(){ return this._width},
	    set : function(newValue){
	    	this._width = newValue;
	    	this._moveM.setSize([this._width, this._height]);
	    }
	});
	
	Object.defineProperty(this, "height", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._height},
	    set : function(newValue){
	    	this._height = newValue;
	    	this._moveM.setSize([this._width, this._height]);
	    }
	});

	Object.defineProperty(this, "regX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._regX; },
	    set : function(newValue){ this._regX = newValue;
	    	this._moveM.setOrigin([this._regX, this._regY]);
	    }
	});

	Object.defineProperty(this, "regY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._regY; },
	    set : function(newValue){ this._regY = newValue;
	    	this._moveM.setOrigin([this._regX, this._regY]);
	    }
	});

	Object.defineProperty(this, "alignX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alignX; },
	    set : function(newValue){ this._alignX = newValue;
	    	this._moveM.setAlign([this._alignX, this._alignY]);
	    }
	});

	Object.defineProperty(this, "alignY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._alignY; },
	    set : function(newValue){ this._alignY = newValue;
	    	this._moveM.setAlign([this._alignX, this._alignY]);
	    }
	});

	Object.defineProperty(this, "rotation", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationZ); },
	    set : function(newValue){this._rotationZ = this.degToRad(newValue);
			this._rotaM.setTransform(this.Transform.rotateZ(this._rotationZ));
	    }
	});

	Object.defineProperty(this, "rotationX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationX); },
	    set : function(newValue){ this._rotationX = this.degToRad(newValue);
			this._rotaM.setTransform(this.Transform.rotateX(this._rotationX));
	    }
	});

	Object.defineProperty(this, "rotationY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationY); },
	    set : function(newValue){ this._rotationY = this.degToRad(newValue);
	    	this._rotaM.setTransform(this.Transform.rotateY(this._rotationY));
	    }
	});

	Object.defineProperty(this, "rotationZ", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.radToDeg(this._rotationZ); },
	    set : function(newValue){ this._rotationZ = this.degToRad(newValue);
	    	this._rotaM.setTransform(this.Transform.rotateZ(this._rotationZ));
	    }
	});

	Object.defineProperty(this, "scaleX", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleX; },
	    set : function(newValue){ this._scaleX = newValue;
	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "scaleY", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleY; },
	    set : function(newValue){ this._scaleY = newValue;
	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "scaleZ", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._scaleZ; },
	    set : function(newValue){ this._scaleZ = newValue;
	    	this._scaleM.setTransform(this.Transform.scale(this._scaleX, this._scaleY, this._scaleZ));
	    }
	});

	Object.defineProperty(this, "perspective", {
       enumerable : true,
       configurable : true,
		get : function(){ return this.root.getPerspective()},
	    set : function(newValue){
	    	this.root.setPerspective(newValue);
	    }
	});

	Object.defineProperty(this, "name", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._name; },
	    set : function(newValue){ this._name = newValue; }
	});

	Object.defineProperty(this, "cursor", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._cursor; },
	    set : function(newValue){ this._cursor = newValue; 
	    	this.setProperties({cursor:this._cursor});
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
	    	this.setProperties({cursor:this._cursor});
	    }
	});
	Object.defineProperty(this, "mouseEnabled", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._mouseEnabled; },
	    set : function(newValue){ this._mouseEnabled = newValue;
	    	if(newValue){
	    		this.setProperties({pointerEvents:'auto'});
	    	}else{
				this.setProperties({pointerEvents:'none'});
	    	}
	    	
	    }
	});

	Object.defineProperty(this, "doubleSided", {
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
	Object.defineProperty(this, "draggable", {
       enumerable : true,
       configurable : true,
		get : function(){ return this._draggable; },
	    set : function(newValue){ this._draggable = newValue;
	    	if(newValue){
	    		this.modifier.addModifier(this.Draggable); // TODO add view support
	    		this.pipe(this.Draggable);
	    		this.on('mouseup', function() {
	    			this.Draggable.setRelativePosition([this._x, this._y, this._z]);
	    		});
	    		this.on('mouseup', function() {
				  var t = this.Draggable.getPosition();
				  this.Draggable.setPosition([0,0,0]);
				  this.x = t[0];
				  this.y = t[1]; 
				});
	    	}else{
	    		this.modifier.removeModifier(this.Draggable);
	    		this.unpipe(this.Draggable);
	    	}
	    }
	});
	return this;
}

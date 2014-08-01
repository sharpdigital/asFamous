
define(function(require, exports, module) {

	function asRoot() {
		var ModifierChain = require('famous/modifiers/ModifierChain');

		var Engine  = require("famous/core/Engine");
		var RenderNode = require("famous/core/RenderNode");
		var RenderController = require("famous/views/RenderController");
		var EventHandler = require('famous/core/EventHandler');

		require("as/global/UniversalProperties");
		require("as/global/UniversalFunctions");
		var root = Engine.createContext();
		
		
		root.StateModifier = require('famous/modifiers/StateModifier');
		root.modifier = new ModifierChain();
		root.Transform = require('famous/core/Transform');

		root.renderController = new RenderController();
		root.renderNode = new RenderNode(root.modifier);
		root.renderNode.add(root.renderController);
		
		UniversalProperties.call(root);
		UniversalFunctions.call(root);
		root.Engine = Engine;
		root.root = root;
		root._childMount = root;
		
		root.eventHandler = new EventHandler();


		root.sortDepths = function(){
			this.depthCounter = 0;
			this.sortDepthsOfChildren(this);
			return this;
		};

		root.sortDepthsOfChildren = function(child){
			child.depth = this.depthCounter;
			this.depthCounter++;
			if(child.children.length){
				for(var c = 0; c < child.children.length; c++){
					if(!child.children[c]._removed){
						child.root.sortDepthsOfChildren(child.children[c]);
					}
					
				}
			}
			return this;
		}

		Object.defineProperty(root, "perspective", {
	       enumerable : true,
	       configurable : true,
			get : function(){ return this.root.getPerspective()},
		    set : function(newValue){
		    	this.root.setPerspective(newValue);
		    }
		});

		Object.defineProperty(root, "fps", {
	       enumerable : true,
	       configurable : true,
			get : function(){ return this.Engine.getFPS()},
		    set : function(newValue){
		    	this.Engine.setFPSCap(newValue);
		    }
		});

		root.perspective = 1000;

		return root;
	}
	asRoot.prototype.constructor = asRoot;

	module.exports = asRoot;
});



define(function(require, exports, module) {

	function asContext() {
		console.log("asContext");
		var StateModifier = require('famous/modifiers/StateModifier');
		var ModifierChain = require('famous/modifiers/ModifierChain');

		var Engine  = require("famous/core/Engine");
		var RenderNode = require("famous/core/RenderNode");
		var RenderController = require("famous/views/RenderController");
		var EventHandler = require('famous/core/EventHandler');

		require("as/global/UniversalProperties");
		require("as/global/UniversalFunctions");
		require("as/extend/_asContext");
		var root = Engine.createContext();
		
   		
		

		root.modifier = new ModifierChain();
		root.modifier.addModifier(new StateModifier(), new StateModifier(), new StateModifier());
		root.Transform = require('famous/core/Transform');

		root.renderController = new RenderController();
		root.renderNode = new RenderNode(root.modifier);
		root.renderNode.add(root.renderController);
		
		UniversalProperties.call(root);
		root.root = root;
		root.mainNode = root;
		UniversalFunctions.call(root);
		_asContext.call(root);
		
		root.eventHandler = new EventHandler();

		return root;
	}
	asContext.prototype.constructor = asContext;

	module.exports = asContext;
});


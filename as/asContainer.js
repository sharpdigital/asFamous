
define(function(require, exports, module) {


	function asContainer() {
		var ModifierChain = require('famous/modifiers/ModifierChain');

		var RenderNode = require("famous/core/RenderNode");
		var RenderController = require("famous/views/RenderController");

		require("as/global/UniversalProperties");
		require("as/global/UniversalFunctions");

		var Base = require("famous/surfaces/ContainerSurface");

		var obj = new Base();
		obj.StateModifier = require('famous/modifiers/StateModifier');
		obj.modifier = new ModifierChain();
		obj.Transform = require('famous/core/Transform');

		obj.renderController = new RenderController();
		obj.renderNode = new RenderNode(obj.modifier);
		obj.renderNode.add(obj.renderController);

		UniversalProperties.call(obj);
		obj._childMount = obj;
		UniversalFunctions.call(obj);
		return obj;
	}

	asContainer.prototype.constructor = asContainer;

	module.exports = asContainer;
});

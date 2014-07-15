define(function(require, exports, module) {


	function asImage() {
		console.log("asImage");

		var StateModifier = require('famous/modifiers/StateModifier');
		var ModifierChain = require('famous/modifiers/ModifierChain');
		var DraggableModifier = require('famous/modifiers/Draggable');

		var RenderNode = require("famous/core/RenderNode");
		var RenderController = require("famous/views/RenderController");

		require("as/global/UniversalProperties");
		require("as/global/UniversalFunctions");
		var Base = require("famous/surfaces/ImageSurface");

		var obj = new Base();
		obj.modifier = new ModifierChain();
		obj.modifier.addModifier(new StateModifier(), new StateModifier(), new StateModifier());
		obj.Transform = require('famous/core/Transform');
		obj.Draggable = new DraggableModifier();

		obj.renderController = new RenderController();
		obj.renderNode = new RenderNode(obj.modifier);
		obj.renderNode.add(obj.renderController);

		UniversalProperties.call(obj);
		UniversalFunctions.call(obj);
		return obj;
	}

	asImage.prototype.constructor = asImage;

	module.exports = asImage;
});
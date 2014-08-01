define(function(require, exports, module) {


	function asImage() {
		var ModifierChain = require('famous/modifiers/ModifierChain');

		var RenderNode = require("famous/core/RenderNode");
		var RenderController = require("famous/views/RenderController");

		require("as/global/UniversalProperties");
		require("as/global/UniversalFunctions");
		var Base = require("famous/surfaces/ImageSurface");

		var obj = new Base();
		
		obj.GenericSync = require("famous/inputs/GenericSync");
	    obj.MouseSync   = require("famous/inputs/MouseSync");
	   	obj.TouchSync   = require("famous/inputs/TouchSync");
	    obj.ScrollSync  = require("famous/inputs/ScrollSync");

		
		obj.StateModifier = require('famous/modifiers/StateModifier');
		obj.modifier = new ModifierChain();
		obj.Transform = require('famous/core/Transform');

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
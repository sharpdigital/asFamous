
function _asContext(){

	this.perspective = 1000;

	this.sortDepths = function(){
		this.depthCounter = 0;
		this.sortDepthsOfChildren(this);
	};
	this.sortDepthsOfChildren = function(child){
		child.depth = this.depthCounter;
		this.depthCounter++;
		if(child.children.length){
			for(var c = 0; c < child.children.length; c++){
				if(!child.children[c]._removed){
					child.root.sortDepthsOfChildren(child.children[c]);
				}
				
			}
		}
	}
	return this;
}
[famous]: https://github.com/Famous/
[tweenLite]: http://www.greensock.com/
[docs]: https://famo.us/docs/
[cursor]: http://www.w3schools.com/cssref/playit.asp?filename=playcss_cursor&preval=nwse-resize
![alt text](http://dfree.co.uk/static/asfamous.svg "asFamous Logo")      
# asFamous      
## actionscript like famous

This project is an attend to script html5 DOM with the ease, speed and consistency what flashplayer was able to provide. It's based on the infamous [Famo.us] [famous] framework, comes with some extra depth handling, event system, transform order and xyz...
Ex-flash developers will surely love it, web evangelists probably will hate. Even though it's an immature project it's really shows some powerful features (thanks to the strong daddy mostly) and it also suits to the philosophy of Famo.us that everyone should use it... flash designers, well, your time has came. The lessons of [Famo.us] [famous] university are strongly recommended.

One of the beauty of asFamous is that you can also use your [beloved libs] [tweenLite] with its property based structure. 

[Famo.us] [famous] is on a consistent move and we will try to keep up with the fresh releases and include new features/solutions as quick as possible. Huge thanks to the famous team for playing that much with messy matrixes!

Contributors are more than welcome.

Happy coding!

	#sharp_team;


#### 0.1 Version notes

- Compatible with famous 0.2.2 (You will need to replace `element.style.zIndex` to `element.style['z-index']` in Surface.js for correct depth handling in firefox)
- Needs a lot of testing, specially according to the property settings order (there is a known malfunction with drag prop if the object hasn't been added to the root structure before the property was set true) We are trying to make it as async as it's naturally in actionscript but the devil never sleeps. Use addChild() straight after a new object was created until the next stable version.
- coming soon: asShape with drawing functionalities like beginBitmapFill() and lineTo() based on canvas.

# Docs

In asFamous you will find 2 core elements, asRoot and asSprite, which only exists in javascript and doesn't have DOM "mirror" in the html and also many functional elements like asImage or asVideo which has "real" DOM tag attached.    
AsFamous objects always inherit their famous pair's methods, although it's sometimes risky to override.

## Building Bricks
#### asRoot    
↬ inherited from famous Context

This is the basic engine of asFamous. You cannot do much with except you can set 3D perspective and FramePerSec. There is a link to the base famous engine where you can access some events and famo.us features eg. `root.Engine.on("resize", fn);`. (Examples are coming soon)    
When the documentation reads "Any asFamous objects" asRoot doesn't included.

###### Public properties     
> __perspective__ = _Number_    
> Default:1000        
> ◦  Set and get The 3D perspective globally.    
>◣
>
> __fps__ = _Number_    
> Default:60       
> ◦  Set the cap of engine's frame rate.     
> ◦  Get the the actual frame rate.    
>◣    
>


#### asSprite     
↬ inherited from famous View

A sprite a virtual group of elements you can twist and turn. Very powerful "virtual" tool as it's much quicker than manipulating the "real" html document. You can do almost everything with it except some properties according to DOM manipulation.

###### Public properties    
> all universal properties __except__ mask, doubleSided   
>◣    
 
###### Public methods     
> all universal methods and functions __except__ addContent()     
>◣




#### asSurface    
↬ inherited from famous Surface

Represents a `<div/>` tag. The asSurface object can display a piece of text or html script. Also can be used as background colour or as a surface for event triggering.

###### Public properties    
> all universal properties __except__ children    
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths()      
>◣     



#### asImage   
↬ inherited from famous ImageSurface

Represents an `<img/>` tag. An asImage can display any internet compatible image, bitmap or vector-graphic.

###### Public properties    
> all universal properties __except__ children    
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths()      
>◣

#### asVideo 
↬ inherited from famous VideoSurface

Represents an `<video/>` tag. An asVideo can display any internet compatible video. If you are looking to make it auto play, there is a built in famous function for you `video.setOptions({autoplay:true})`. All other video manipulation should be done via standard JavaScript manipulation of the video DOM element.

###### Public properties    
> all universal properties __except__ children    
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths()      
>◣


#### asText
↬ inherited from famous TextSurface

Represents an `<textarea/>` tag. With asText you can get a block of text, just how you like it. For some extra functions have a look at TextareaSurface in [famous docs] [docs].

###### Public properties    
> all universal properties __except__ children    
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths()      
>◣


#### asInput
↬ inherited from famous InputSurface

Represents an `<input/>` tag. With asInput you create a line of textfield the user can fill in or modify. If you need the user input use `getValue()` method on the asInput object. For some extra functions have a look at InputSurface in [famous docs] [docs].

###### Public properties    
> all universal properties __except__ children     
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths()      
> __plus__ native famous functions: setPlaceholder(), focus(), blur(), setValue(), getValue(), setType()    *more info about these at [famous docs] [docs]    
>◣


#### asCanvas
↬ inherited from famous CanvasSurface

Represents an `<canvas/>` tag. With asCanvas you get a canvas context. We are looking to develop this class to asShape with extra methods so it's pretty much untested in depths. You have a handy native option here modify the dimensions (scale) on the canvas `setSize(size, canvasSize)` and `getContext()` to access the context you can draw on.

###### Public properties    
> all universal properties __except__ children     
>◣     

###### Public methods     
> all universal methods and functions __except__ addChild(), removeChild(), removeAllChildren(), swapDepths(), setContent()      
> __plus__ native famous functions: getContext(), setSize()  *more info about these at [famous docs] [docs]    
>◣



#### asContainer
↬ inherited from famous ContainerSurface

Represents a `<div/>` wrapper. This asContainer is a weird creature you can use as Surface and also have can contain children. There were some rumors it may causes performance issues by nesting the DOM, so may use it when you really need to, for example cropping an asSprite child by setting `container.css({overflow:"hidden"});`.

###### Public properties    
> all universal properties   
>◣     

###### Public methods     
> all universal methods and functions __except__ setContent()      
>◣


## Universal Methods

> __addChild(__ child __)__    
> Add the given child on the top of the render three of the actual object in the highest depth.    
>     
> Parameters:         
> ◦  child: Any asFamous object.    
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __removeChild(__ child __)__    
> Remove the given child from the render three of the actual object.      
>      
> Parameters:        
> ◦  child: Any asFamous object.    
> Returns:    
> ◦  The owner object of the function.    
>◣
>
> __removeAllChildren()__    
> Remove all the children of the actual object.      
>        
> Returns:    
> ◦  The owner object of the function.    
>◣
>
> __swapDepths(__ child1, child2 __)__     
> Swapping the depths of the given children on the render three of the actual object.      
>        
> Parameters:        
> ◦  child1: Any asFamous object.    
> ◦  child2: Any asFamous object.    
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __addEventListener(__ type, fn __)__    
> Add event listener to the actual object. For the details of listener nesting see the Listen to the Event section.     
>        
> Parameters:        
> ◦  type: String       
> ◦  fn: Function            
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __removeEventListener(__ type, fn __)__    
> Stop listening to the specific event on the actual object. For the details of listener nesting see the Listen to the Event section.     
>        
> Parameters:        
> ◦  type: String       
> ◦  fn: Function            
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __removeAllListeners()__    
> Stop listening to all events on the actual object.      
>                  
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __kill()__    
> Trying to free up as much processing capacity possible. (test stage)      
>                  
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __dispatchEvent(__ type __)__    
> Trigger an event on the actual object. (test stage)    
>        
> Parameters:        
> ◦  type: String                
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __css(__ attr __)__    
> Set CSS-style properties on the actual object with camelCase, like `line-height:20px` equals to `{lineHeight:'20px'}`  
>        
> Parameters:        
> ◦  attr: Object (with attributes)              
> Returns:    
> ◦  The owner object of the function.      
>◣
>
> __getBounds()__    
> Recursive function returning a rectangle of a space occupied by its children. (test stage)    
>                    
> Returns:    
> ◦  A rectangle eg. `{x:0, y:0, width:100, height:100}`      
>◣
>
## Universal Properties

> __children__ = _Array_       
> ◦  Get the array of all children.        
>◣    
>
> __listeners__ = _Object_       
> ◦  Get the object of all listeners.        
>◣    
>
> __parent__ = _asFamous object_       
> _(internal)_
> ◦  Set the parent object.        
> ◦  Get the parent object.        
>◣    
>
> __root__ = _asFamous object_     
> _(internal)_      
> ◦  Set the root object.        
> ◦  Get the root object.        
>◣    
>
> __alpha__ = _Number (0-1)_     
> Default:1        
> ◦  Set the transparency.        
> ◦  Get the root object.        
>◣    
>
> __visible__ = _Boolean_     
> Default:true        
> ◦  Set visibility state.        
> ◦  Get visibility state.        
>◣    
>
> __x__ = _Number_     
> ◦  Set the x coordinate.        
> ◦  Get the x coordinate.        
>◣    
>
> __y__ = _Number_     
> ◦  Set the y coordinate.        
> ◦  Get the y coordinate.        
>◣    
>
> __z__ = _Number_     
> ◦  Set the z coordinate.        
> ◦  Get the z coordinate.        
>◣    
>
> __width__ = _Number_     
> ◦  Set the width of the object.        
> ◦  Get the width of the object.    
> ◦  _Also set line-width css property on Surfaces for text wrapping._         
>◣    
>
> __height__ = _Number_     
> ◦  Set the height of the object.        
> ◦  Get the height of the object.          
>◣    
>
> __regX__ = _Number (0-1)_     
> ◦  Set the horizontal registration point of the object according to the percentage of its width.        
> ◦  Get the horizontal registration point.           
>◣    
>
> __regY__ = _Number (0-1)_     
> ◦  Set the vertical registration point of the object according to the percentage of its height.        
> ◦  Get the vertical registration point.           
>◣    
>
> __alignX__ = _Number (0-1)_     
> ◦  Set the horizontal alignment of the object according to the percentage of the screen width.        
> ◦  Get the horizontal registration point.           
>◣    
>
> __alignY__ = _Number (0-1)_     
> ◦  Set the vertical alignment of the object according to the percentage of the screen height.        
> ◦  Get the vertical registration point.           
>◣    
>
> __rotation__ = _Number_     
> ◦  Set the rotation in angles.        
> ◦  Get the rotation in angles.           
>◣    
>
> __rotationX__ = _Number_     
> ◦  Set the x axis rotation in angles.        
> ◦  Get the x axis rotation in angles.           
>◣    
>
> __rotationY__ = _Number_     
> ◦  Set the y axis rotation in angles.        
> ◦  Get the y axis rotation in angles.           
>◣    
>
> __rotationZ__ = _Number_     
> ◦  Set the z axis rotation in angles.        
> ◦  Get the z axis rotation in angles.           
>◣    
>
> __scaleX__ = _Number_     
> ◦  Set the scale on the x axis.        
> ◦  Get the scale on the x axis.           
>◣    
>
> __scaleY__ = _Number_     
> ◦  Set the scale on the y axis.        
> ◦  Get the scale on the y axis.           
>◣    
>
> __scaleZ__ = _Number_     
> ◦  Set the scale on the z axis.        
> ◦  Get the scale on the z axis.           
>◣    
>
> __name__ = _String_    
> Default:item         
> ◦  Set the id of the object.        
> ◦  Get the id of the object.           
>◣    
>
> __cursor__ = _String_    
> Default:auto        
> ◦  Set the type of the cursor on hover to the object. [More about cursor types here.] [cursor]      
> ◦  Get the type of the cursor.           
>◣    
>
> __useHandCursor__ = _Boolean_    
> Default:false         
> ◦  Set the type of the cursor to pointer.      
> ◦  Get the type of the cursor.           
>◣    
>
> __mouseEnabled__ = _Boolean_    
> Default:true         
> ◦  Set the mouse reaction on the object. In case of false it prevents mouse actions, in case of true it allows them again.     
> ◦  Get the mouse reaction on the object.           
>◣    
>
> __mouseChildren__ = _Boolean_    
> Default:true         
> ◦  Set the mouse reaction on children. In case of false it prevents mouse actions, in case of true it allows them again.     
> ◦  Get the mouse reaction on children.           
>◣    
>
> __doubleSided__ = _Boolean_    
> Default:false        
> ◦  Set the controls of the backside of an object makes it visible 180 degree 3D rotation.     
> ◦  Get the existence of the backside.           
>◣    
>
> __doubleSided__ = _Boolean_    
> Default:false        
> ◦  Set the backside of an object makes it visible 180 degree 3D rotation. (excluded asSprite)    
> ◦  Get the existence of the backside.           
>◣    
>
> __mask__ = _Boolean_    
> Default:false        
> ◦  Set the clipping rectangle eg. `{x:0, y:0, width:100, height:100}`. (excluded asSprite)        
> ◦  Get the clipping rectangle.           
>◣    
>
> __drag__ = _Boolean_    
> Default:false        
> ◦  Set the draggability of the object.       
> ◦  Get the draggability.           
>◣    
>
> __dragBounds__ = _Boolean_    
> Default:false        
> ◦  Set the edges of the draggable area to the width an height of its parent.       
> ◦  Get the existence of draggable area.    
> ◦  _In case the parent bounds are smaller than the actual object's bounds dragging will be disabled._             
>◣    
>
> __scrollX__ = _Boolean_    
> Default:false        
> ◦  Set the horizontal scrolling active the width of its parent.       
> ◦  Get the horizontal scrolling.    
> ◦  _In case the parent width is greater than the actual object's width scrollX will be disabled._             
>◣    
>
> __scrollY__ = _Boolean_    
> Default:false        
> ◦  Set the vertical scrolling active the height of its parent.       
> ◦  Get the vertical scrolling.    
> ◦  _In case the parent height is greater than the actual object's height scrollY will be disabled._             
>◣    
>
## Listener System

There is a bit of difference between the event handling system of asFamous and Flash. When you add a listener on an element it takes away the mouse activity on all it's children, while in asFamous you can still catch different events on the children as well. So for example (where asImage and asSurface are the children of asSprite) if you click on the image it calls both `sayImage()` and `saySprite()`, but if you click on asSurface it will call only `saySprite()`.

![alt text](http://dfree.co.uk/static/what_does_the_sloth_says.jpg "asFamous Logo")




## //TODO

- Create asShape class with graphics property you can use eg. `lineTo()` and `beginBitmapFill()`.
- Create asAnim class based on svg animation with `gotoAndPlay()` and `stop()`.
- Add `this.mouseX` && `this.mouseY`
- Create stable drag functionality








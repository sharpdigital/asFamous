

define(function(require, exports, module) {
    /*var Engine  = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");

    var mainContext = Engine.createContext();

    var surface = new Surface({
        size: [200, 200],
        content: "Hello World",
        classes: ["red-bg"],
        properties: {
            lineHeight: "200px",
            textAlign: "center"
        }
    });

    mainContext.add(surface);*/

//////////////////////////////////

    /**/var Engine = require("as/asContext");
    var Surface = require("as/asSurface");
    var Image = require("as/asImage");
    var View = require("as/asView");

    var root = new Engine();
    root.perspective = 600;

    var view = new View();
    var line2 = new Image();
    var line = new Surface();
    
    line.width = 100;
    line.height = 100;
    //line.test = 20;
    line.regX = line.regY = .5;
    line.alignX = line.alignY = .5;
    
    
    //line.scaleX = 5;
    //line.rotationX = 30;
    //line.rotationY = 30;
    line.alpha = .5;

    line.x = 1000;
    line.x = 0;

    line.addContent("Hello World");

    line.css({
        color:"#FFFFFF",
        background:"#FF0000",
    });
    //root.addChild(line);

    
    
    line2.width = true;
    line2.height = true;
    console.log(line2.width);
    //line.test = 20;
    line2.regX = line2.regY = .5;
    line2.alignX = line2.alignY = .5;

    
    
    //line.scaleX = 5;
    //line2.rotationZ = 30;
    //line2.rotationY = -30;
    ///line2.alpha = .8;

   
    line2.addContent("img/img.jpg", "image");
    line2.css({
        color:"#FFFFFF",
        background:"#00FF00",
    });
    root.addChild(view);
    view.addChild(line);
    view.addChild(line2);
    line2.rotation = 30;
    view.mouseEnable = false;
    //line.draggable = true;
    //line2.mouseEnabled = false;

    line.useHandCursor = true;
    line.addEventListener("mouseup", function(){
        view.swapDepths(line, line2);
    });
    view.swapDepths(line, line2);
    line2.draggable = true;
    view.x = 300;
    /*line2.addEventListener("mouseup", function(){
        root.addChild(line);
    });*/
    //line.alpha = 0;
    //line2.visible = false;
////////////////////////////////

    /*var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var View = require("famous/core/View");
    var root = Engine.createContext();

    var RenderController = require("famous/views/RenderController");
    root.renderController = new RenderController();
    root.add(root.renderController);
    root.setPerspective(600);

    var view = new View();
    root.add(view);
    var surface = new Surface();
    var surface2 = new Surface();
    var StateModifier = require('famous/modifiers/StateModifier');
    var mod = new StateModifier();
    var mod2 = new StateModifier();
    var Transform = require('famous/core/Transform');
    
    surface.setProperties({
        color:"#000000",
        background:"#FF0000",
        zIndex:2
        });
    //root.addChild(surface);
    surface.setSize([190,90]);
    console.log(surface.setSize);

    //mod.setTransform(Transform.rotateY(0.5));

    surface.setContent("Surface1");
    //root.add(mod).add(surface);
    view.add(mod).add(surface);
    surface2.setProperties({
        color:"#000000",
        background:"#00FF00",
        zIndex:1
        });
    //root.addChild(surface);
    surface2.setSize([90,190]);

    //mod2.setTransform(Transform.rotateY(0.5));

    surface2.setContent("Surface2");
    //view.add(mod2).add(surface2);
    root.renderController.show(view);
    root.renderController.hide(view);
    */


});

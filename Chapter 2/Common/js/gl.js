//--------------------------------------------------
// Global Constants 
//--------------------------------------------------
const ATTR_POSITION_NAME = "a_position";
const ATTR_POSITION_LOC = 0;
const ATTR_NORMAL_NAME = "a_norm";
const ATTR_NORMAL_LOC = 1;
const ATTR_UV_NAME = "a_uv";
const ATTR_UV_LOC = 2;
const ATTR_COLOR_NAME = "a_color";
const ATTR_COLOR_LOC = 3;

//--------------------------------------------------
// Custom GL Context Object
//--------------------------------------------------
function GLInstance(canvasID) {
    var canvas = document.getElementById(canvasID),
        gl = canvas.getContext("webgl2");

    if (!gl) { console.error("WebGL context2 is not available."); return null; }

    //...................................................
    //Setup custom properties
 
    //...................................................
    //Setup GL, Set all the default configurations we need.
    gl.clearColor(1.0, 1.0, 1.0, 1.0);		//Set clear color


    //...................................................
    //Methods

    //Reset the canvas with our set background color.	
    gl.fClear = function () { this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT); return this; }

    //Create and fill our Array buffer.
    gl.fCreateArrayBuffer = function (floatAry, isStatic) {
        if (isStatic === undefined) isStatic = true; //So we can call this function without setting isStatic

        var buf = this.createBuffer();
        this.bindBuffer(this.ARRAY_BUFFER, buf);
        this.bufferData(this.ARRAY_BUFFER, floatAry, (isStatic) ? this.STATIC_DRAW : this.DYNAMIC_DRAW);
        this.bindBuffer(this.ARRAY_BUFFER, null);
        return buf;
    }


    //Set the size of the canvas html element and the rendering view port
    gl.fSetSize = function (w, h) {
        //set the size of the canvas, on chrome we need to set it 3 ways to make it work perfectly.
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
        this.canvas.width = w;
        this.canvas.height = h;

        //when updating the canvas size, must reset the viewport of the canvas 
        //else the resolution webgl renders at will not change
        this.viewport(0, 0, w, h);
        return this;
    }

    return gl;
}
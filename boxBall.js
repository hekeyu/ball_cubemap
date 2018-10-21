function initArrayBuffer(gl, buffer, attribute) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);   
  gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(attribute); 
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}   



function initEventHandlers(canvas, currentAngle) {
  var dragging = false;         // Dragging or not
  var lastX = -1, lastY = -1;   // Last position of the mouse
 
  canvas.onmousedown = function(ev) {   // Mouse is pressed
    var x = ev.clientX, y = ev.clientY;
    // Start dragging if a moue is in <canvas>
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
    }
  };

  canvas.onmouseup = function(ev) { 
 
  	dragging = false;  }; // Mouse is released

  canvas.onmousemove = function(ev) { // Mouse is moved
    var x = ev.clientX, y = ev.clientY;
    if (dragging) {
      var factor = 100/canvas.height; // The rotation ratio
      var dx = factor * (x - lastX);
      var dy = factor * (y - lastY);
      // Limit x-axis rotation angle to -90 to 90 degrees
     // currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
     currentAngle[0] = dy;
     currentAngle[1] = dx;
    }
    lastX = x, lastY = y;
  };
}
 


function createProgram(gl, shaderVs, shaderFs){   
	if(typeof shaderVs != "string" || typeof shaderFs != "string")
	   throw err("sss");
	var vertexShaderScript = document.getElementById(shaderVs);
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderScript.text);
  gl.compileShader(vertexShader);
  
  var fragmentShaderScript = document.getElementById(shaderFs);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderScript.text);
  gl.compileShader(fragmentShader);
 
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}
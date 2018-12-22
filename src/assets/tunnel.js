import Mousetrap from 'mousetrap';
var glm=require ('gl-matrix');
var sceneRotation=0.0;
var theta=0;
var scenePosition=-5.0;
function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  // var scene[1000];
  var r=4.0;
  var j=0;
  var angle=0.0;
  var positions=Array.apply(null, Array(32)).map(function () {});

  for(var i=0;i<8;i++)
  {
    angle+=45;
    positions[j++]=r*Math.cos(angle * Math.PI/180);positions[j++]=r*Math.sin(angle * Math.PI/180);positions[j++]=0.0;
    angle-=45;
    positions[j++]=r*Math.cos(angle * Math.PI/180);positions[j++]=r*Math.sin(angle * Math.PI/180);positions[j++]=0.0;
    positions[j++]=r*Math.cos(angle * Math.PI/180);positions[j++]=r*Math.sin(angle * Math.PI/180);positions[j++]=-2.0;
    angle+=45;
    positions[j++]=r*Math.cos(angle * Math.PI/180);positions[j++]=r*Math.sin(angle * Math.PI/180);positions[j++]=-2.0;
  }

  // const positions = [
  //   // Front face
    
  //   -1.0, -1.0,  1.0,
  //    1.0, -1.0,  1.0,
  //    1.0,  1.0,  1.0,
  //   -1.0,  1.0,  1.0,

  //   // Back face
  //   -1.0, -1.0, -1.0,
  //   -1.0,  1.0, -1.0,
  //    1.0,  1.0, -1.0,
  //    1.0, -1.0, -1.0,

  //   // Top face
  //   -1.0,  1.0, -1.0,
  //   -1.0,  1.0,  1.0,
  //    1.0,  1.0,  1.0,
  //    1.0,  1.0, -1.0,

  //   // Bottom face
  //   -1.0, -1.0, -1.0,
  //    1.0, -1.0, -1.0,
  //    1.0, -1.0,  1.0,
  //   -1.0, -1.0,  1.0,

  //   // Right face
  //    1.0, -1.0, -1.0,
  //    1.0,  1.0, -1.0,
  //    1.0,  1.0,  1.0,
  //    1.0, -1.0,  1.0,

  //   // Left face
  //   -1.0, -1.0, -1.0,
  //   -1.0, -1.0,  1.0,
  //   -1.0,  1.0,  1.0,
  //   -1.0,  1.0, -1.0,
  // ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  r = 4.0/(4*Math.tan(22.5*Math.PI/180));

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
  angle=0;
  j=0;
  var vertexNormals=Array.apply(null, Array(96)).map(function () {});
  for(var i=0;i<8;i++)
  {
    angle+=45;
    vertexNormals[j++]=r*Math.cos(angle * Math.PI/180);vertexNormals[j++]=r*Math.sin(angle * Math.PI/180);vertexNormals[j++]=0.0;
    vertexNormals[j++]=r*Math.cos(angle * Math.PI/180);vertexNormals[j++]=r*Math.sin(angle * Math.PI/180);vertexNormals[j++]=0.0;
    vertexNormals[j++]=r*Math.cos(angle * Math.PI/180);vertexNormals[j++]=r*Math.sin(angle * Math.PI/180);vertexNormals[j++]=0.0;
    vertexNormals[j++]=r*Math.cos(angle * Math.PI/180);vertexNormals[j++]=r*Math.sin(angle * Math.PI/180);vertexNormals[j++]=0.0;
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
gl.STATIC_DRAW);
  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  // const faceColors = [
  //   [1.0,  1.0,  1.0,  1.0],    // Front face: white
  //   [0.9,  0.2,  0.0,  1.0],    // Back face: red
  //   [0.0,  1.0,  0.0,  1.0],    // Top face: green
  //   [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
  //   [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
  //   [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  //   [0.0,  1.0,  0.0,  1.0],    // Top face: green
  //   [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
  // ];
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
gl.STATIC_DRAW);

  // Convert the array of colors into a table for all the vertices.

  // var colors = [];

  // for (var j = 0; j < faceColors.length; ++j) {
  //   const c = faceColors[j];

  //   // Repeat each color four times for the four vertices of the face
  //   colors = colors.concat(c, c, c, c);
  // }

  // const colorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
    24, 25, 26,     24, 26, 27,   // left
    28, 29, 30,     28, 30, 31,   // left
  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

function drawScene(gl, programInfo, buffers, deltaTime,viewMatrix,theta,scenePosition,texture) {
  // var a=8.0;
  // console.log(a);
  // console.log(typeof(a));
  // var b=parseFloat(a);
  // console.log(typeof(b));
  // console.log(position);
  // gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  // gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glm.mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  glm.mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  // sceneRotation+=0.002;
  var radius=3;
  for(var i=0;i<1000;i++)
  {
    const modelViewMatrix = glm.mat4.create();

    // const viewMatrix = glm.mat4.create();
    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    // glm.mat4.lookAt(viewMatrix, [radius*Math.sin(theta),-radius*Math.cos(theta),scenePosition],[radius*Math.sin(theta),-radius*Math.cos(theta),scenePosition-2],[-Math.sin(theta),Math.cos(theta),0])
    glm.mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [0,0,-2*i]);  // amount to translate
    glm.mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                sceneRotation+45 *i* Math.PI/180,     // amount to rotate in radians
                [0, 0, 1]);       // axis to rotate around (Z)
    // glm.mat4.rotate(modelViewMatrix,  // destination matrix
    //             modelViewMatrix,  // matrix to rotate
    //             0,// amount to rotate in radians
    //             [1, 0, 0]);       // axis to rotate around (X)
    glm.mat4.multiply(modelViewMatrix,viewMatrix,modelViewMatrix);
    const normalMatrix = glm.mat4.create();
    glm.mat4.invert(normalMatrix, modelViewMatrix);
    glm.mat4.transpose(normalMatrix, normalMatrix);
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);
    gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);


    {
      const vertexCount = 48; 
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      // console.log(gl);
      // console.log("here");
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

  }
  // Update the rotation for the next draw

  
  // console.log(sceneRotation);
}

module.exports ={
  initBuffers,
  drawScene,
}
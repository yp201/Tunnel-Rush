var glm=require ('gl-matrix');
function initBuffers(gl,type) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  // var scene[1000];
  // positi-ons=[];


  var positions=[];
  if(type==1)
  {

  positions.push(
    // Front face
    -0.4, -4.0,  0.2,
     0.4, -4.0,  0.2,
     0.4,  4.0,  0.2,
    -0.4,  4.0,  0.2,

    // Back face
    -0.4, -4.0, -0.2,
    -0.4,  4.0, -0.2,
     0.4,  4.0, -0.2,
     0.4, -4.0, -0.2,

    // Top face
    -0.4,  4.0, -0.2,
    -0.4,  4.0,  0.2,
     0.4,  4.0,  0.2,
     0.4,  4.0, -0.2,

    // Bottom face
    -0.4, -4.0, -0.2,
     0.4, -4.0, -0.2,
     0.4, -4.0,  0.2,
    -0.4, -4.0,  0.2,

    // Right face
     0.4, -4.0, -0.2,
     0.4,  4.0, -0.2,
     0.4,  4.0,  0.2,
     0.4, -4.0,  0.2,

    // Left face
    -0.4, -4.0, -0.2,
    -0.4, -4.0,  0.2,
    -0.4,  4.0,  0.2,
    -0.4,  4.0, -0.2,
  );
  }
  if(type==2)
  {
    positions.push(
       0.0, 4, -0.2,
       0.0,-4, -0.2,
       4*Math.sin(22.5*Math.PI/180.0), 4, -0.2,
       4*Math.sin(22.5*Math.PI/180.0),-4, -0.2,
       4*Math.sin(22.5*Math.PI/180.0), 4*Math.cos(22.5*Math.PI/180.0), -0.2,
       4*Math.sin(22.5*Math.PI/180.0),-4*Math.cos(22.5*Math.PI/180.0), -0.2,
       4*Math.sin(67.5*Math.PI/180.0),-4*Math.cos(67.5*Math.PI/180.0), -0.2,
       4*Math.sin(67.5*Math.PI/180.0), 4*Math.cos(67.5*Math.PI/180.0), -0.2,

    )
  }
  if(type==3)
  {
    positions.push(
    
    -4, -3.7,  0.0,
     4, -3.7,  0.0,
     4,  -3.45,  0.0,
    -4,  -3.45,  0.0,

    // Back face
    -4, -3.7, 0.0,
    -4,  -3.45, 0.0,
     4,  -3.45, 0.0,
     4, -3.7, 0.0,      

      )
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  var vertexNormals=[];
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
  if(type==1)
  {
    vertexNormals.push(
      // Front
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      // Back
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      // Top

      0.0,1.0,0.0,
      0.0,1.0,0.0,
      0.0,1.0,0.0,
      0.0,1.0,0.0,

      // Bottom
      0.0,-1.0,0.0,
      0.0,-1.0,0.0,
      0.0,-1.0,0.0,
      0.0,-1.0,0.0,
      // Right
      1.0,0.0,0.0,
      1.0,0.0,0.0,
      1.0,0.0,0.0,
      1.0,0.0,0.0,
      // Left
      -1.0,0.0,0.0,
      -1.0,0.0,0.0,
      -1.0,0.0,0.0,
      -1.0,0.0,0.0,
      
    );

  }
  if(type==2)
  {
    vertexNormals.push(
      //Front
      0.0,  0.0, 1.0,
      0.0,  0.0, 1.0,
      0.0,  0.0, 1.0,
      0.0,  0.0, 1.0,
      // Back
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
    )
  }

  if(type==3)
  {
    vertexNormals.push(
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      // Back
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      )
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),gl.STATIC_DRAW);


  // alert(positions);
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.


  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  var textureCoordinates=[];
  if(type==1)
  {

    textureCoordinates.push(
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
      
    );
  }
  if(type==2)
  {
    textureCoordinates.push(

      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
    )
  }
  if(type==3)
  {
    textureCoordinates.push(
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      )
  }
  // alert(textureCoordinates)

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
gl.STATIC_DRAW);


  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  var indices=[];
  if(type==1)
  {

    indices.push(
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    );
  }
  if(type==2)
  {
      indices.push(
      0,  1,  2,      1,  2,  3,    
      4,  5,  6,      4,  6,  7,
      );  
  }
  if(type==3)
  {
    indices.push(
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      )
  }
  // alert(indices);
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
var radius=2.0;

function collision(theta,cubeRotation,height,type)
{
  // (facingAngle - 45) =< angleOfTarget =< (facingAngle + 45)
  // cubeRotation -10 <= theta <= cubeRotation+10 
  // anglediff = (facingAngle - angleOfTarget + 180 + 360) % 360 - 180
  var angle=17;
  console.log('---------')
  console.log(theta);
  console.log(cubeRotation);
  if(type==1)
  {
    angle=17;
    var anglediff1= (cubeRotation - theta + 180 +360) %360 -180;
    if(anglediff1 <=angle && anglediff1>=-angle) 
    {
      var check=confirm('YOU LOST,TRY AGAIN?');
      if(check==true){
        location.reload();
      }
      if(check==false)
      {
        location.reload();
      }

      // return;
    }
    var anglediff2= (cubeRotation - (theta +180) +180 +360) %360 -180;
    console.log(anglediff2);
    console.log('----------')
    if(anglediff2 <=angle && anglediff2>=-angle) 
    {
      
      var check=confirm('YOU LOST,TRY AGAIN?');
      if(check==true){
        location.reload();
      }
      if(check==false)
      {
        location.reload();
      }
    }
  }
  if(type==2)
  {
    angle=180;
    var anglediff1= (cubeRotation - theta + 180 +360) %360 -180;
    console.log(anglediff1);
    console.log('---------');
    if(anglediff1 <=0 && anglediff1>=-angle) 
    {
      var check=confirm('YOU LOST,TRY AGAIN?');
      if(check==true){
        location.reload();
      }
      if(check==false)
      {
        location.reload();
      }
      // return;
    }

  }
  if(type==3)
  {
    angle=17;
    var anglediff1= (cubeRotation - theta + 180 +360) %360 -180;
    if(anglediff1 <=angle && anglediff1>=-angle && height<0.2) 
    {
      var check=confirm('YOU LOST,TRY AGAIN?');
      if(check==true){
        location.reload();
      }
      if(check==false)
      {
        location.reload();
      }
    }
    var anglediff2= (cubeRotation - (theta +90) +180 +360) %360 -180;
    console.log(anglediff2);
    console.log('----------')
    if(anglediff2 <=(angle-5) && anglediff2>=-(angle-5) && height<0.2) 
    {
      
      var check=confirm('YOU LOST,TRY AGAIN?');
      if(check==true){
        location.reload();
      }
      if(check==false)
      {
        location.reload();
      }
      // return;
    }

  }

}
function drawScene(gl, programInfo, buffers, deltaTime,viewMatrix,theta,scenePosition,obstaclePositions,cubeRotation,texture,type1,n) {
  // gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  // gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
  // alert(n);
  for (var i=0;i<n;i++)
  {

  const modelViewMatrix = glm.mat4.create();
  // console.log(obstaclePositions[i]);
  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  // const viewMatrix = glm.mat4.create();
    // Now move the drawing position a bit to where we want to

  // glm.mat4.lookAt(viewMatrix, [radius*Math.sin(theta),-radius*Math.cos(theta),scenePosition],[radius*Math.sin(theta),-radius*Math.cos(theta),scenePosition-2],[-Math.sin(theta),Math.cos(theta),0])

  glm.mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, obstaclePositions[i]]);  // amount to translate
  glm.mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation[i]*Math.PI/180.0,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  glm.mat4.multiply(modelViewMatrix,viewMatrix,modelViewMatrix);
  const normalMatrix = glm.mat4.create();
  glm.mat4.invert(normalMatrix, modelViewMatrix);
  glm.mat4.transpose(normalMatrix, normalMatrix);

  // glm.mat4.rotate(modelViewMatrix,  // destination matrix
  //             modelViewMatrix,  // matrix to rotate
  //             cubeRotation * .7,// amount to rotate in radians
  //             [0, 1, 0]);       // axis to rotate around (X)

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
    var vertexCount = 36;
    if(type1==2)
    {
      vertexCount=12;
    }
    if(type1==3)
    {
      vertexCount=12;
    }


    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  }
  // Update the rotation for the next draw

  // cubeRotation += 0.05;
}

module.exports ={
  initBuffers,
  drawScene,
  collision,
}
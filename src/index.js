// @flow
// require('./assets/gl-matrix')

import 'babel-polyfill';  
var glm=require ('gl-matrix');
var tunnel= require ('./assets/tunnel');
var obstacles= require('./assets/obstacles');
var theta=0;
var obstacle1Positions=[];
var obstacle2Positions=[];
var obstacle3Positions=[];
var obstacle1Rotations=[];
var obstacle2Rotations=[];
var obstacle3Rotations=[];
var score=0;
var pause=true;
var keys=[];
var jump=0;
var speedy=0;
var level=0;
var height=0;
var grey=0;
var obstacle1Rotation=0.0;
var obstacle2Rotation=0.0;
var flash = 0; 

import createCanvas from './utils/createCanvas';
import initWebGLProgram from './utils/initWebGLProgram';

var cubeRotation = 0.0;


//
// Start here
//

function main() {
  const canvas = document.querySelector('#glcanvas');
  // const canvas = createCanvas('glcanvas', {
  //   height:640,
  //   width: 600
  // });
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;
    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
      // Apply lighting effect
      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.5, -3, -2));
      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  const fsSource1 = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      highp vec3 Image = vec3((texelColor.r+texelColor.g+texelColor.b)/3.0, (texelColor.r+texelColor.g+texelColor.b)/3.0, (texelColor.r+texelColor.g+texelColor.b)/3.0);
      gl_FragColor = vec4(Image * vLighting, texelColor.a);

    }
  `;

  const fsSource2 = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;
    uniform sampler2D uSampler;
    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      highp vec3 Image = vec3(texelColor.r+0.3,texelColor.g+0.3,texelColor.b+0.3);
      gl_FragColor = vec4(Image * vLighting, texelColor.a);

    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgramlighting = initShaderProgram(gl, vsSource, fsSource2);
  const shaderProgramgrey = initShaderProgram(gl, vsSource, fsSource1);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
};

const programInfolighting = {
    program: shaderProgramlighting,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramlighting, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgramlighting, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgramlighting, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramlighting, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramlighting, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgramlighting, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramlighting, 'uSampler'),
    },
};

const programInfogrey = {
    program: shaderProgramgrey,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramgrey, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgramgrey, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgramgrey, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramgrey, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramgrey, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgramgrey, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramgrey, 'uSampler'),
    },
};

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  var scenePosition=1;
  const buffers = tunnel.initBuffers(gl);
    const texture1 = loadTexture(gl, '/src/6.png');
    const texture2 = loadTexture(gl, '/src/3.png');
    const texture3 = loadTexture(gl, '/src/dark.png');
    const texture4 = loadTexture(gl, '/src/black.png');
    const texture5 = loadTexture(gl, '/src/6.png');
    const texture6 = loadTexture(gl, '/src/8.png');
  // if(scenePosition>-5)
  //    texture = loadTexture(gl, '/src/3.png');

   // console.log(scenePosition);

  // console.log(texture);
  // console.log(buffers);

  var obstacle1 = obstacles.initBuffers(gl,1);
  var obstacle2 = obstacles.initBuffers(gl,2);
  var obstacle3= obstacles.initBuffers(gl,3);
  const textureObstacle1 = loadTexture(gl, '/src/1.png');
  // const textureObstacle2 = loadTexture(gl, '/src/1.png');
  // const textureObstacle3 = loadTexture(gl, '/src/1.png');
  // const textureObstacle4 = loadTexture(gl, '/src/1.png');
  // const textureObstacle5 = loadTexture(gl, '/src/1.png');
  // const textureObstacle6 = loadTexture(gl, '/src/1.png');

  // console.log(obstacle);
  // var buffers=[];
  // for(var i=0;i<10;i++)
  // {
  //   buffers.push(new cube.initBuffers(gl));
    
  // }
  // console.log(buffers);
  var then = 0;

  for(var i=0;i<50;i++)
  {
    obstacle1Positions.push(-29*i-20);
    obstacle1Rotations.push(-29*i-20)
  }
  for(var i=0;i<50;i++)
  {
    obstacle2Positions.push(-47*i-30);
    obstacle2Rotations.push(-47*i-30);
  }
  for(var i=0;i<50;i++)
  {
    obstacle3Positions.push(-59*i-40);
    obstacle3Rotations.push(90*i);
  }


  // Draw the scene repeatedly
  var time=0;
  var text=texture1;
  function render(now) {
    // if(scenePosition<-20)l
    //   {texture=loadTexture(gl,'/src/3.png')}
    console.log(Math.ceil(scenePosition));
    if(Math.abs(Math.ceil(scenePosition))==100)
    {
      level=1;
      text=texture6;
    } 
    if(Math.abs(Math.ceil(scenePosition))==200)
    {
      level=2;
      text=texture2;
    } 
    if(Math.abs(Math.ceil(scenePosition))==300)
    {
      level=3;
      text=texture4;
    } 
    if(Math.abs(Math.ceil(scenePosition))==450)
    {
      level=4;
      text=texture4;
    } 
    if(Math.abs(Math.ceil(scenePosition))==650)
    {
      level=5;
      text=texture5;
    } 
    if(Math.abs(Math.ceil(scenePosition))==800)
    {
      level=6;
      text=texture6;
    } 

    tickInputs();
    if(!pause)
    {
      flash++;
      grey++;

    if(jump)
    {
      speedy=0.15;
      time=0;
    }
    if(speedy)
    {
      jump=0;
      time=time+0.1;
      if(height+speedy*time-1/2*0.18*time*time>0)
      {
        height=height+speedy*time-1/2*0.18*time*time;
      }
      else
      {
        time=0;
        speedy=0;
        height=0; 
        jump=0;
      }
    }
    var temptheta=Math.PI * theta/180.0;
    for(var i=0;i<50;i++)
    {
      obstacle1Rotations[i]=(obstacle1Rotations[i]+ level/1.50*2)%360;
    }
    for(var i=0;i<50;i++)
    {
      obstacle2Rotations[i]=(obstacle2Rotations[i]+ level*1)%360;
    }
    scenePosition=scenePosition-0.2*(level+1);
    const modelViewMatrix = glm.mat4.create();
    const viewMatrix = glm.mat4.create();
    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    glm.mat4.lookAt(viewMatrix, [(3+height)*Math.sin(theta*Math.PI/180),-(3+height)*Math.cos(theta*Math.PI/180),scenePosition],[(3-height)*Math.sin(theta*Math.PI/180),-(3-height)*Math.cos(theta*Math.PI/180),scenePosition-2],[-Math.sin(theta*Math.PI/180),Math.cos(theta*Math.PI/180),0])
    for(var i=0;i<50;i++)
    {
      if(Math.abs(obstacle1Positions[i]+0.2-scenePosition)<1.2)
      {
        obstacles.collision(theta,obstacle1Rotations[i],height,1);
      }
    }
    // console.log(scenePosition)
    for(var i=0;i<10;i++)
    {
      if(Math.abs(obstacle2Positions[i]-scenePosition-0.3)<=0.15)
      {

        obstacles.collision(theta,obstacle2Rotations[i],height,2);
      }

    }
    for(var i=0;i<50;i++)
    {
      if(Math.abs(obstacle3Positions[i]-scenePosition)<=1)
      {
        obstacles.collision(theta,obstacle3Rotations[i],height,3);
      }

    }

    // console.log([3*Math.sin(temptheta),-3*Math.cos(temptheta),scenePosition])

    // const viewMatrix = glm.mat4.create();
    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    // glm.mat4.lookAt(viewMatrix, [radius*Math.sin(temptheta),-radius*Math.cos(temptheta),scenePosition+10],[radius*Math.sin(temptheta),-radius*Math.cos(temptheta),scenePosition-2],[-Math.sin(temptheta),Math.cos(temptheta),0])

    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    // for(var i=0;i<10;i++)
    // {
      // var position=[0,0,-2*i];
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      if(grey<200)
      {
          tunnel.drawScene(gl, programInfogrey, buffers, deltaTime,viewMatrix,temptheta,scenePosition,text,height)
          flash=0;
      }
      else
      {
        if((flash%200)<100)
        {
          tunnel.drawScene(gl, programInfo, buffers, deltaTime,viewMatrix,temptheta,scenePosition,text,height)
        } 
        else
        {
          tunnel.drawScene(gl, programInfolighting, buffers, deltaTime,viewMatrix,temptheta,scenePosition,text,height)
        }
      }
          obstacles.drawScene(gl, programInfo, obstacle1, deltaTime,viewMatrix,temptheta,scenePosition,obstacle1Positions,obstacle1Rotations,textureObstacle1,1,50);
          obstacles.drawScene(gl, programInfo, obstacle2, deltaTime,viewMatrix,temptheta,scenePosition,obstacle2Positions,obstacle2Rotations,textureObstacle1,2,50);
          obstacles.drawScene(gl, programInfo, obstacle3, deltaTime,viewMatrix,temptheta,scenePosition,obstacle3Positions,obstacle3Rotations,textureObstacle1,3,50);
      // gl.drawElements(gl.TRIANGLES, 48, gl.UNSIGNED_SHORT, 0);
        document.getElementById('score').innerHTML="SCORE: "+ Math.abs(String(Math.ceil(scenePosition)));
        document.getElementById('level').innerHTML="LEVEL: " +String(level);

    // }
    }
      requestAnimationFrame(render);

  }
  requestAnimationFrame(render);
}


//
// Draw the scene.
//

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 255, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}
// var keys=[];
var keys = new Array(100).fill(0)
  // Mousetrap.bind('right', function(e){theta =(theta+ 2.5)%360;console.log('fired');});
  // Mousetrap.bind('left', function(e){theta= (theta-2.5 +360)%360;});

function tickInputs()
{
  if(keys[68]){theta=(theta+ 2.5)%360};
  if(keys[65]){theta=(theta- 2.5 +360)%360};
  // if(keys[32]){if(!height){jump=1;}};
  Mousetrap.bind('space', function(e){if(!height){jump=1;};});
  Mousetrap.bind('p', function(e){pause=!pause;document.getElementById('option').style.visibility='hidden';
});

}

function gameHandler(start)
{
  if(start)
  {
    pause=false;
  }

}
window.onkeyup = function(e) { keys[e.keyCode] = 0; }
window.onkeydown = function(e) { keys[e.keyCode] = 1;  }
main();



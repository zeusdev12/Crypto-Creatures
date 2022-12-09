const startPointColor = 0x34c92c;
const endPointColor = 0xeb0909;

function loadMap(mapData, scene, gridSize) {

    if (!gridSize) {
        gridSize = 1;
    }

    var startPos = { x: 0, y: 0 };
    var stek = 0
      //  scene.add( new THREE.AmbientLight( 0x666666 ) );
        scene.fog = new THREE.FogExp2(0x868293, 0.0007);
        
                
                
        const tloader = new THREE.TextureLoader();
     //   const groundTexture = tloader.load( 'TowerDefence/assets/images/grass50.jpg' );
        const groundTexture = tloader.load( '/img/trpix.png' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      //  groundTexture.anisotropy = 16;
      //  groundTexture.repeat.set( 2, 2 );
//        groundTexture.encoding = THREE.sRGBEncoding;
        const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture, transparent: true, } );
        groundMaterial.opacity = 0;

        const tTexture = tloader.load( 'TowerDefence/assets/images/ground0.png' );
        tTexture.wrapS = tTexture.wrapT = THREE.RepeatWrapping;
    //    tTexture.anisotropy = 16;
        tTexture.encoding = THREE.sRGBEncoding;

        const tmaterial = new THREE.MeshLambertMaterial( { map: tTexture, transparent: true, } );
        
        

        const tTexture1 = tloader.load( 'TowerDefence/assets/images/ground1.png' );
        tTexture1.wrapS = tTexture1.wrapT = THREE.RepeatWrapping;
     //   tTexture1.anisotropy = 16;
        tTexture1.encoding = THREE.sRGBEncoding;

        const tmaterial1 = new THREE.MeshLambertMaterial( { map: tTexture1, transparent: true, } );
        
        
        
        
        const teleportTexture = tloader.load( 'TowerDefence/assets/images/Circle_D0.png' );
        teleportTexture.wrapS = teleportTexture.wrapT = THREE.RepeatWrapping;
     //   teleportTexture.anisotropy = 16;
      //  teleportTexture.encoding = THREE.sRGBEncoding;

        //const teleportmaterial = new THREE.MeshLambertMaterial( { map: teleportTexture } );

        
        const startPointmaterial = new THREE.MeshLambertMaterial( { map: teleportTexture, transparent: true, } );
        const endPointmaterial = new THREE.MeshLambertMaterial( { map: teleportTexture, transparent: true, } );


        const t1 = tloader.load('/MOBA and Tower Defense/Grounds/Ground_05.png');
        t1.repeat.set( 14,14 );
        t1.wrapS = t1.wrapT = THREE.RepeatWrapping;
        t1.offset.set( 0, 0 );
        // kamen
        
        const t2 = tloader.load('/MOBA and Tower Defense/Grounds/Ground_01.png');
        t2.repeat.set( 14,14 );
        t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
        t2.offset.set( 0, 0 );
        // trava
        
        const t3 = tloader.load('/MOBA and Tower Defense/Grounds/Ground_04.png');
        t3.repeat.set( 14,14 );
        t3.wrapS = t3.wrapT = THREE.RepeatWrapping;
        t3.offset.set( 0, 0 );
        
        
        const t4 = tloader.load('/MOBA and Tower Defense/Grounds/Ground_06.png');
        t4.repeat.set( 14,14 );
        t4.wrapS = t4.wrapT = THREE.RepeatWrapping;
        t4.offset.set( 0, 0 );
        //doroga 
        

        var blend = generateBlendedMaterial([
              {texture: t4},
              {texture: t3, levels: [0, 0.1, 0.3, 0.4]},
              {texture: t1, levels: [0.3, 0.4, 0.49, 0.5,]},
              {texture: t2, levels: [0.49, 0.5, 1.6, 1.63]},
              

            ]);
        
       // 2.3 - 1 = 1.3
       // 0.3 - 1 = -0.7
        
        
        
    var planeSize = 80;
    var themapSize = 125;

    var img = new Image();

    img.onload = function () {
        
        textureLoaded();
       
    };
    img.src = "/img/terrain.png";
        
         const pTexture = tloader.load( 'TowerDefence/assets/images/'+mapData.type+'.jpg' );
         pTexture.wrapS = pTexture.wrapT = THREE.RepeatWrapping;
         pTexture.repeat.set( 125, 125 );
      //   pTexture.anisotropy = 16;
         pTexture.encoding = THREE.sRGBEncoding;

    function textureLoaded() {
        var data = getHeightData(img, 1);
        

        var geometry = new THREE.PlaneGeometry( planeSize, planeSize, themapSize * 3, themapSize * 3 );
//        var geometry = new THREE.PlaneGeometry( planeSize, planeSize, themapSize, themapSize );
        var material = blend;

        var plane = new THREE.Mesh( geometry, material );
        const vertices = plane.geometry.attributes.position.array;
        console.log(data);
        var startpoint = themapSize * 3 * themapSize + 1 + 2*themapSize;
//        for (let i = 0; i < themapSize+1; i++) {
//            for (let j = 0; j < themapSize+1; j++) {
//                vertices[ (3*i+1)*themapSize + (j*3 + 2) + startpoint ] =  data[ i*themapSize + j ] * .1;
//            }
//        }
        
        var maxP = 0;
        var minP = 2;
        for (let i = 0; i < themapSize+1; i++) {
            for (let j = 0; j < themapSize+1; j++) {
                if ( data[ i*(themapSize+1) + j ] * .1 > maxP ) { maxP = data[ i*(themapSize+1) + j ] * .1 }
                if ( data[ i*(themapSize+1) + j ] * .1 < minP ) { minP = data[ i*(themapSize+1) + j ] * .1 }
                vertices[ ((3*themapSize +1)*i + j + startpoint)*3 + 2 ] =  data[ i*(themapSize+1) + j ] * .1 - 1;
            }
        }
    console.log(maxP)
    console.log(minP)
        


        plane.name = "Plane";
        plane.rotation.x = - Math.PI / 2;
        plane.position.set(7.1, 0.9, 7.5);
        plane.receiveShadow = true;

        scene.add( plane );
      

    }
         
         
         
         
         
         
         
         
        const pMaterial = new THREE.MeshLambertMaterial( { map: pTexture } );
 
        const geometry = new THREE.PlaneGeometry( 90, 90, 90, 90 );
        //geometry.rotateX( - Math.PI / 2 );
        const vertices = geometry.attributes.position.array;
        //
        for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

            vertices[ j + 2 ] = parseInt(Math.random()*300)/100 - 1;

        }
        
        
        let mesh = new THREE.Mesh( geometry, pMaterial );
        // mesh.position.y = - 50;
        // mesh.position.x = - 50;
        // mesh.position.z = - 50;
        mesh.rotation.x = - Math.PI / 2;
        mesh.position.set(0, 0.51, 0);
        mesh.receiveShadow = true;
//        scene.add( mesh );
         
         

    for (let x = 0; x < mapData.mapsize; x++) {
        for (let y = 0; y < mapData.map[x].length; y++) {
            var material;
            var isPath;
            var z = 0;

            if (mapData.map[x][y] == 0 || mapData.map[x][y] < 0) {
                material = groundMaterial;
                isPath = false;
            }
            else if (mapData.map[x][y] > 0) {
                if (mapData.map[x][y] == 2) {
                    material = startPointmaterial;
                    startPos = { x: x, y: y };
                }
                else if (mapData.map[x][y] == 3) {
                    material = endPointmaterial;
                } else {
                  if (Math.floor(Math.random()*2)===1) {
                    material = groundMaterial;
                  } else {
                    material = groundMaterial;
                  }
                    
                }
                isPath = true;
                z = 0.011
            }
            material = groundMaterial;
            //if (isPath) {
                const cell = createCell({ material: material, x: x * gridSize, y: y * gridSize -stek, z: z, size:gridSize })
                cell.scale.set(gridSize, 1, gridSize );
                cell.isMapCell = true;
                cell.isPath = isPath;

                scene.add(cell);
            //}
        }
    }
//scene.rotation.x = - Math.PI / 2.6;
    var waypoints = [];
    var count = 0;

    waypoints.push({ x: startPos.x * gridSize, y: startPos.y * gridSize  -stek });

    while (mapData.map[startPos.x][startPos.y] != 3) {

        if (!hasWaypoint(waypoints, startPos.x + 1, startPos.y) && inMap(startPos.x + 1, startPos.y, mapData.mapsize) && mapData.map[startPos.x + 1][startPos.y] > 0) {
            startPos.x++;
        }
        else if (!hasWaypoint(waypoints, startPos.x - 1, startPos.y) && inMap(startPos.x - 1, startPos.y, mapData.mapsize) && mapData.map[startPos.x - 1][startPos.y] > 0) {
            startPos.x--;
        }
        else if (!hasWaypoint(waypoints, startPos.x, startPos.y - 1) && inMap(startPos.x, startPos.y - 1, mapData.mapsize) && mapData.map[startPos.x][startPos.y - 1] > 0) {
            startPos.y--;
        }
        else if (!hasWaypoint(waypoints, startPos.x, startPos.y + 1) && inMap(startPos.x, startPos.y + 1, mapData.mapsize) && mapData.map[startPos.x][startPos.y + 1] > 0) {
            startPos.y++;
        }
        waypoints.push({ x: startPos.x * gridSize, y: startPos.y * gridSize  -stek});

        count++;
        if (count > mapData.mapsize * mapData.mapsize) {
            break;
        }
    }

    return waypoints;
}

function hasWaypoint(waypoints, x, y) {
    for (let i = 0; i < waypoints.length; i++) {
        const element = waypoints[i];
        if (element.x == x && element.y == y) {
            return true;
        }
    }
    return false;
}

function inMap(x, y, size) {
    return x >= 0 && y >= 0 && x < size && y < size;
}

function createCell({ material, x, y, z, size }) {
    const geometry = new THREE.BoxGeometry();

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, z, y);
    //cube.rotation.x = - Math.PI / 2.6;
    cube.receiveShadow = true;

    return cube;
}

function getHeightData(img,scale) {
  
 if (scale == undefined) scale=1;
  
    var canvas = document.createElement( 'canvas' );
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext( '2d' );
 
    var size = img.width * img.height;
    var data = new Float32Array( size );
 
    context.drawImage(img,0,0);
 
    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }
 
    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;
 
    var j=0;
    for (var i = 0; i<pix.length; i +=4) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/(12*scale);
    }
     
    return data;
}

function generateBlendedMaterial(textures, material) {
    // Convert numbers to strings of floats so GLSL doesn't barf on "1" instead of "1.0"
    function glslifyNumber(n) {
        return n === (n|0) ? n+'.0' : n+'';
    }

    var declare = '',
        assign = '',
        t0Repeat = textures[0].texture.repeat,
        t0Offset = textures[0].texture.offset;
    for (var i = 0, l = textures.length; i < l; i++) {
        // Update textures
        textures[i].texture.wrapS = textures[i].wrapT = THREE.RepeatWrapping;
        textures[i].texture.needsUpdate = true;

        // Shader fragments
        // Declare each texture, then mix them together.
        declare += 'uniform sampler2D texture_' + i + ';\n';
        if (i !== 0) {
            var v = textures[i].levels, // Vertex heights at which to blend textures in and out
                p = textures[i].glsl, // Or specify a GLSL expression that evaluates to a float between 0.0 and 1.0 indicating how opaque the texture should be at this texel
                useLevels = typeof v !== 'undefined', // Use levels if they exist; otherwise, use the GLSL expression
                tiRepeat = textures[i].texture.repeat,
                tiOffset = textures[i].texture.offset;
            if (useLevels) {
                // Must fade in; can't start and stop at the same point.
                // So, if levels are too close, move one of them slightly.
                if (v[1] - v[0] < 1) v[0] -= 1;
                if (v[3] - v[2] < 1) v[3] += 1;
                for (var j = 0; j < v.length; j++) {
                    v[j] = glslifyNumber(v[j]);
                }
            }
            // The transparency of the new texture when it is layered on top of the existing color at this texel is
            // (how far between the start-blending-in and fully-blended-in levels the current vertex is) +
            // (how far between the start-blending-out and fully-blended-out levels the current vertex is)
            // So the opacity is 1.0 minus that.
            var blendAmount = !useLevels ? p :
                '1.0 - smoothstep(' + v[0] + ', ' + v[1] + ', vPosition.z) + smoothstep(' + v[2] + ', ' + v[3] + ', vPosition.z)';
            assign += '        color = mix( ' +
                'texture2D( texture_' + i + ', MyvUv * vec2( ' + glslifyNumber(tiRepeat.x) + ', ' + glslifyNumber(tiRepeat.y) + ' ) + vec2( ' + glslifyNumber(tiOffset.x) + ', ' + glslifyNumber(tiOffset.y) + ' ) ), ' +
                'color, ' +
                'max(min(' + blendAmount + ', 1.0), 0.0)' +
                ');\n';
        }
    }

    var fragBlend = 'float slope = acos(max(min(dot(myNormal, vec3(0.0, 0.0, 1.0)), 1.0), -1.0));\n' +
        '    diffuseColor = vec4( diffuse, opacity );\n' +
        '    vec4 color = texture2D( texture_0, MyvUv * vec2( ' + glslifyNumber(t0Repeat.x) + ', ' + glslifyNumber(t0Repeat.y) + ' ) + vec2( ' + glslifyNumber(t0Offset.x) + ', ' + glslifyNumber(t0Offset.y) + ' ) ); // base\n' +
            assign +
        '    diffuseColor = color;\n';
console.log(fragBlend)
    var fragPars = declare + '\n' +
            'varying vec2 MyvUv;\n' +
            'varying vec3 vPosition;\n' +
            'varying vec3 myNormal;\n';

  //  var mat = material || new THREE.MeshLambertMaterial({transparent: true,});
    var mat = material || new THREE.MeshPhysicalMaterial();
    mat.onBeforeCompile = function(shader) {
        // Patch vertexShader to setup MyUv, vPosition, and myNormal
        shader.vertexShader = shader.vertexShader.replace('#include <common>',
            'varying vec2 MyvUv;\nvarying vec3 vPosition;\nvarying vec3 myNormal;\n#include <common>');
        shader.vertexShader = shader.vertexShader.replace('#include <uv_vertex>',
            'MyvUv = uv;\nvPosition = position;\nmyNormal = normal;\n#include <uv_vertex>');

        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', fragPars + '\n#include <common>');
        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', fragBlend);

        // Add our custom texture uniforms
        for (var i = 0, l = textures.length; i < l; i++) {
            shader.uniforms['texture_' + i] = {
                type: 't',
                value: textures[i].texture,
            };
        }
    };

    return mat;
};

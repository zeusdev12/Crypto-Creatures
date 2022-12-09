import React, { useEffect, useState, useRef, useMemo } from "react";
import style from "./Maps.css";
import { withRouter } from "react-router-dom";
import { factoryABI, nftABI } from '../../utils/contract';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { getData } from '../../store/appStoreSlice';
import { connect, web3, setReady, checkNFT } from '../../utils/util'
import { useSelector } from "react-redux";
import { useStateIfMounted } from "use-state-if-mounted";

const Maps = (props) => {
  const mapId = props.match.params.id;
  const mount = useRef();
  const { accountAddress, mapsAddress, mainNetId, netId, gameFactoryAddress } = useSelector(getData);
  const isReady = useMemo(() => accountAddress && netId == mainNetId, [accountAddress, netId, mainNetId]);
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const camera = new THREE.PerspectiveCamera( 30, 1, 0.1, 1000 );
  const selectedToBePlacedObject = null;
  const selectedObject = null;
  const selectedObjectOnMap = null;
  const currentobject = null;
  const [config, setConfig] = useStateIfMounted({
    scene: null,
    mapId:mapId,
    mapX:8,
    mapY:8,
    mapGround:0,
    fbxloader: new FBXLoader(),
    mapLayers: ["Tree", "Grass", "Stone", "Ground", "Building", "Light", "Ready", ],        
    fbxobjects: [
      {
        id:1,
        type:"Ready",
        name:"MagicCircle_A",
        file:"../models/MagicCircle_A.fbx",
        icon:"/img/mapitems/MagicCircle_A.png",
      },
      
      {
        id:1,
        type:"Ready",
        name:"Bolt",
        file:"../models/Bolt.fbx",
        icon:"/img/mapitems/Bolt.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Bonfires",
        file:"../models/Bonfires.fbx",
        icon:"/img/mapitems/Bonfires.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Fire_A",
        file:"../models/Fire_A.fbx",
        icon:"/img/mapitems/Fire_A.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Fire_B",
        file:"../models/Fire_B.fbx",
        icon:"/img/mapitems/Fire_B.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_B2",
        file:"../models/Floor_B2.fbx",
        icon:"/img/mapitems/Floor_B2.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_A",
        file:"../models/Floor_A.fbx",
        icon:"/img/mapitems/Floor_A.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_A2",
        file:"../models/Floor_A2.fbx",
        icon:"/img/mapitems/Floor_A2.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_B",
        file:"../models/Floor_B.fbx",
        icon:"/img/mapitems/Floor_B.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Glow_A",
        file:"../models/Glow_A.fbx",
        icon:"/img/mapitems/Glow_A.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_C",
        file:"../models/Floor_C.fbx",
        icon:"/img/mapitems/Floor_C.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Floor_D",
        file:"../models/Floor_D.fbx",
        icon:"/img/mapitems/Floor_D.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Props_M4",
        file:"../models/Props_M4.fbx",
        icon:"/img/mapitems/Props_M4.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Lightshafts_A3",
        file:"../models/Lightshafts_A3.fbx",
        icon:"/img/mapitems/Lightshafts_A3.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Rainbow",
        file:"../models/Rainbow.fbx",
        icon:"/img/mapitems/Rainbow.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Steps_A6",
        file:"../models/Steps_A6.fbx",
        icon:"/img/mapitems/Steps_A6.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Steps_A5",
        file:"../models/Steps_A5.fbx",
        icon:"/img/mapitems/Steps_A5.png",
      },

      {
        id:1,
        type:"Ready",
        name:"Stone",
        file:"../models/Stone.fbx",
        icon:"/img/mapitems/Stone.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Stone_L",
        file:"../models/Stone_L.fbx",
        icon:"/img/mapitems/Stone_L.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Stone_H",
        file:"../models/Stone_H.fbx",
        icon:"/img/mapitems/Stone_H.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Timber_F",
        file:"../models/Timber_F.fbx",
        icon:"/img/mapitems/Timber_F.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Timber_G",
        file:"../models/Timber_G.fbx",
        icon:"/img/mapitems/Timber_G.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Wall_C",
        file:"../models/Wall_C.fbx",
        icon:"/img/mapitems/Wall_C.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Wall_A",
        file:"../models/Wall_A.fbx",
        icon:"/img/mapitems/Wall_A.png",
      },
      {
        id:1,
        type:"Ready",
        name:"Wall_B",
        file:"../models/Wall_B.fbx",
        icon:"/img/mapitems/Wall_B.png",
      },
      
      {
        id:1,
        type:"Ground",
        name:"Ground",
        file:"../models/box.fbx",
        icon:"/img/mapitems/Ground.png",
        z:-0.49
      },
      {
        id:1,
        type:"Ground",
        name:"Ground",
        file:"../models/box2.fbx",
        icon:"/img/mapitems/Ground.png",
        z:-0.49
      },
      {
        id:1,
        type:"Ground",
        name:"Ground",
        file:"../models/box3.fbx",
        icon:"/img/mapitems/Ground.png",
        z:-0.49
      },
      {
        id:1,
        type:"Ground",
        name:"Ground",
        file:"../models/box4.fbx",
        icon:"/img/mapitems/Ground.png",
        z:-0.49
      },
      {
        id:1,
        type:"Ground",
        name:"Ground",
        file:"../models/box5.fbx",
        icon:"/img/mapitems/Ground.png",
        z:-0.49
      },
      
      
      
      
      
      {
        id:1,
        type:"Light",
        name:"Point_light",
        file:"../models/Point_light.fbx",
        icon:"/img/mapitems/Light.png",
      },
      {
        id:1,
        type:"Light",
        name:"Small_point",
        file:"../models/Small_point.fbx",
        icon:"/img/mapitems/Light.png",
      },
      {
        id:1,
        type:"Light",
        name:"Directional_light",
        file:"../models/Directional_light.fbx",
        icon:"/img/mapitems/Light.png",
      },
    
      
      
      {
        id:1,
        type:"Stone",
        name:"Rock_A1",
        file:"../models/Rock_A1.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A2",
        file:"../models/Rock_A2.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A6",
        file:"../models/Rock_A6.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A23",
        file:"../models/Rock_A23.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A9",
        file:"../models/Rock_A9.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A4",
        file:"../models/Rock_A4.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A14",
        file:"../models/Rock_A14.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A15",
        file:"../models/Rock_A15.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_B2",
        file:"../models/Rock_B2.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_B1",
        file:"../models/Rock_B1.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"Rock_A18",
        file:"../models/Rock_A18.fbx",
        icon:"/img/mapitems/Rock.png",
      },
      {
        id:1,
        type:"Stone",
        name:"StoneCliff_L",
        file:"../models/StoneCliff_L.fbx",
        icon:"/img/mapitems/StoneCliff_L.png",
      },
      {
        id:1,
        type:"Stone",
        name:"StoneCliff_H",
        file:"../models/StoneCliff_H.fbx",
        icon:"/img/mapitems/StoneCliff_H.png",
      },        
      
      
      

      {
        id:1,
        type:"Building",
        name:"crystal",
        file:"../models/crystal.fbx",
        icon:"/img/mapitems/crystal.png",

      },
      {
        id:1,
        type:"Building",
        name:"Crystal_A",
        file:"../models/Crystal_A.fbx",
        icon:"/img/mapitems/Crystal_A.png",

      },
      {
        id:1,
        type:"Building",
        name:"Props_C",
        file:"../models/Props_C.fbx",
        icon:"/img/mapitems/Props_C.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_L",
        file:"../models/Props_L.fbx",
        icon:"/img/mapitems/Props_L.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_K",
        file:"../models/Props_K.fbx",
        icon:"/img/mapitems/Props_K.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_H",
        file:"../models/Props_H.fbx",
        icon:"/img/mapitems/Props_H.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_E",
        file:"../models/Props_E.fbx",
        icon:"/img/mapitems/Props_E.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_I",
        file:"../models/Props_I.fbx",
        icon:"/img/mapitems/Props_I.png",
      },
      {
        id:1,
        type:"Building",
        name:"Props_J",
        file:"../models/Props_J.fbx",
        icon:"/img/mapitems/Props_J.png",
      },
      {
        id:1,
        type:"Building",
        name:"Timber_A",
        file:"../models/Timber_A.fbx",
        icon:"/img/mapitems/Timber_A.png",
      },
      {
        id:1,
        type:"Building",
        name:"Timber_D",
        file:"../models/Timber_D.fbx",
        icon:"/img/mapitems/Timber_D.png",
      },
      {
        id:1,
        type:"Building",
        name:"Timber_K",
        file:"../models/Timber_K.fbx",
        icon:"/img/mapitems/Timber_K.png",
      },

      {
        id:1,
        type:"Building",
        name:"Tower_A",
        file:"../models/Tower_A.fbx",
        icon:"/img/mapitems/Tower_A.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_B_1",
        file:"../models/Tower_B_1.fbx",
        icon:"/img/mapitems/Tower_B_1.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_B_2",
        file:"../models/Tower_B_2.fbx",
        icon:"/img/mapitems/Tower_B_2.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_B_3",
        file:"../models/Tower_B_3.fbx",
        icon:"/img/mapitems/Tower_B_3.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_C",
        file:"../models/Tower_C.fbx",
        icon:"/img/mapitems/Tower_C.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_D",
        file:"../models/Tower_D.fbx",
        icon:"/img/mapitems/Tower_D.png",
      },
      {
        id:1,
        type:"Building",
        name:"Tower_E",
        file:"../models/Tower_E.fbx",
        icon:"/img/mapitems/Tower_E.png",
      },
      
      
      
      
      {
        id:1,
        type:"Grass",
        name:"Grass_A_1",
        file:"../models/Grass_A_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_A_3",
        file:"../models/Grass_A_3.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_B_1",
        file:"../models/Grass_B_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_B_2",
        file:"../models/Grass_B_2.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_B_3",
        file:"../models/Grass_B_3.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_C_1",
        file:"../models/Grass_C_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_C_2",
        file:"../models/Grass_C_2.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_D_1",
        file:"../models/Grass_D_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_D_2",
        file:"../models/Grass_D_2.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_D_3",
        file:"../models/Grass_D_3.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_F_1",
        file:"../models/Grass_F_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_F_2",
        file:"../models/Grass_F_2.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_H_1",
        file:"../models/Grass_H_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_H_3",
        file:"../models/Grass_H_3.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_I_1",
        file:"../models/Grass_I_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_I_2",
        file:"../models/Grass_I_2.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_I_3",
        file:"../models/Grass_I_3.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_I_4",
        file:"../models/Grass_I_4.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Grass_E_1",
        file:"../models/Grass_E_1.fbx",
        icon:"/img/mapitems/Grass.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_A",
        file:"../models/Vines_A.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_B",
        file:"../models/Vines_B.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_D",
        file:"../models/Vines_D.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_E",
        file:"../models/Vines_E.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_F",
        file:"../models/Vines_F.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_G",
        file:"../models/Vines_G.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      {
        id:1,
        type:"Grass",
        name:"Vines_H",
        file:"../models/Vines_H.fbx",
        icon:"/img/mapitems/Vines.png",
        rotateY:Math.PI,
      },
      
      
      
      {
        id:1,
        type:"Tree",
        name:"Tree_D_1",
        file:"../models/Tree_D_1.fbx",
        icon:"/img/mapitems/Tree_D_1.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_C_2",
        file:"../models/Tree_C_2.fbx",
        icon:"/img/mapitems/Tree_C_2.png",
      },
      
      {
        id:1,
        type:"Tree",
        name:"Tree_A_1",
        file:"../models/Tree_A_1.fbx",
        icon:"/img/mapitems/Tree_A_1.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_A_2",
        file:"../models/Tree_A_2.fbx",
        icon:"/img/mapitems/Tree_A_2.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_A_3",
        file:"../models/Tree_A_3.fbx",
        icon:"/img/mapitems/Tree_A_3.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_B_2",
        file:"../models/Tree_B_2.fbx",
        icon:"/img/mapitems/Tree_B_2.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_B_3",
        file:"../models/Tree_B_3.fbx",
        icon:"/img/mapitems/Tree_B_3.png",
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_E_1",
        file:"../models/Tree_E_1.fbx",
        icon:"/img/mapitems/Tree_E_1.png",
        z:-0.2,
      },
      {
        id:1,
        type:"Tree",
        name:"Tree_C_1",
        file:"../models/Tree_C_1.fbx",
        icon:"/img/mapitems/Tree_C_1.png",
      },
    ],
    mapObj:[],
    activeLayer:"Tree",
    hideLayerPanel:true,
    showpannel:false,
  });

  useEffect(() => {
    checkMap();
  }, [accountAddress, mainNetId, netId]);
  
  useEffect(() => {
    document.addEventListener('contextmenu', _handleContextMenu);

    var scene = new THREE.Scene();
//    scene.background = new THREE.Color(0xcce0ff);
    scene.background = new THREE.Color(0x060016);
//    scene.fog = new THREE.Fog( 0xcce0ff, 5, 1000 );
//    scene.position.set(-3, 0, -5);


//    var camera = new THREE.PerspectiveCamera( 30, mount.current.offsetWidth/mount.current.offsetHeight, 0.1, 1000 );
    camera.position.z = 15;
    camera.position.y = 12;
//    camera.position.x = 8;
    camera.rotation.x = Math.PI / 4;
//    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( mount.current.offsetWidth, mount.current.offsetHeight );
    renderer.gammaOutput = true
    renderer.shadowMap.enabled = true;
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    mount.current.appendChild( renderer.domElement );
    
//    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const tloader = new THREE.TextureLoader();
    const groundTexture = tloader.load( '../../img/grass50.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshLambertMaterial( { map: groundTexture } );



//    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//    var cube = createCell({ material: material, x: 0, y: 0, z: 0 });
//    var cube = new THREE.Mesh( geometry, material );
//    scene.add( cube );
    
//    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    
//    scene.add( cube );

//    var geometry = new THREE.BoxGeometry( 1, 1, 1 );

//    var cube = new THREE.Mesh( geometry, material );
    //cube.position.set(0, 0, 0);
//    scene.add( cube );
    
    scene.add( new THREE.AmbientLight( 0x666666 ) );
    
//    const light = new THREE.PointLight(0xffffff, 1, 1000);
//    light.position.set(0, 10, 10);
//    scene.add( light );
    
    let controls = new OrbitControls(camera, renderer.domElement);

/*
    config.fbxloader.load("../models/Tree_C_1.fbx", function (model) {
          me.currentobject = model.clone();
          let circle =  me.createObject();
          circle.rotation.x = - Math.PI / 2;
          me.selectedToBePlacedObject = model.add(circle);
          scene.add(me.selectedToBePlacedObject);
      }, undefined, function (error) {
          console.error(error);
      });


    */
    
    setConfig({ ...config, scene: scene});
    
    var animate = () => {
      requestAnimationFrame( animate );
//      cube.rotation.x += 0.01;
//      cube.rotation.y += 0.01;
      controls.update(camera);
      sceneupdate(scene);
      renderer.render( scene, camera );
    };
    animate();

    return () => {
      document.removeEventListener('contextmenu', _handleContextMenu);
    }
  }, []);
  
  const raycastFromCamera = (scene) => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(scene.children);
  }
  
  const raycastFromCameraPasted = (scene, mapobjs) => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(mapobjs, true);
  }
  
  const createObject = () => {
    let reachDistance = 1;
    const curve = new THREE.EllipseCurve(
      0, 0,
      reachDistance, reachDistance,
      0, Math.PI * 2,
      false,
      0
    );

    let normalColor = new THREE.Color(0, 2, 0.5);

    const points = curve.getPoints(50);
    const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
    let _ringMaterial = new THREE.LineBasicMaterial({ color: normalColor });
    let reachEllipseRing = new THREE.Line(ringGeometry, _ringMaterial);
    reachEllipseRing.ignoreRaycast = true;

    const geometry = new THREE.PlaneGeometry(reachDistance * 2, reachDistance * 2);
    var uniforms = {
      radius: { type: 'float', value: reachDistance },
      radiusColor: { type: 'vec3', value: normalColor }
    }
    let _material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: _fragmentShader(),
      vertexShader: _vertexShader(),
    })

    _material.transparent = true;
    let reachEllipse = new THREE.Mesh(geometry, _material);
    reachEllipse.ignoreRaycast = true;
    reachEllipse.add(reachEllipseRing);
    //reachEllipse.rotation.x = - Math.PI / 2;
    return reachEllipse;
  }

  const _vertexShader = () => {
    return `
      varying vec2 vUv;

      void main() 
      {
          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
      }
    `
  }

  const _fragmentShader = () => {
    return `            
      uniform float radius;
      uniform vec3 radiusColor;

      varying vec2 vUv;            

      void main() 
      {
        float distanceToCenter = distance(vUv, vec2(0.5));
        float invertedDistanceToCenter = 1.0 - distanceToCenter;
        float circularMask = step(distanceToCenter, 0.5);
        float mask = circularMask - invertedDistanceToCenter;

        gl_FragColor = vec4(radiusColor * mask, mask - 0.3);
      }
    `
  }
  
  const handleMouseMove = (event) => { 
    mouse.x = ((event.pageX - mount.current.offsetParent.offsetLeft) / mount.current.offsetWidth) * 2 - 1;
    mouse.y = - ((event.pageY - mount.current.offsetParent.offsetTop) / mount.current.offsetHeight) * 2 + 1;
  }
    
  const handleMouseClick = (event) => { 
    const { scene, mapObj } = config;
    if (currentobject && selectedToBePlacedObject) {
      let newobj = currentobject.clone();
      newobj.position.copy( selectedToBePlacedObject.position );
      newobj.objItem = selectedToBePlacedObject.objItem;
      scene.add(newobj);
      console.log(newobj);
      mapObj.push(newobj);
    } else {
      const intersects = raycastFromCameraPasted(scene,mapObj);
      var found = false;
      if (selectedObject) {
        scene.remove( selectedObject );
        selectedObject = null;
        setConfig({ ...config, showpannel: false });
      }

      for (let i = 0; i < intersects.length; i++) {
        for (let j = 0; j < mapObj.length; j++) {
          if (mapObj[j].uuid == intersects[i].object.parent.uuid) {
            found = true;
            selectedObjectOnMap = mapObj[j];
            selectedObject = createObject();
            selectedObject.rotation.x = - Math.PI / 2;
            selectedObject.position.copy(intersects[i].object.parent.position);
            scene.add(selectedObject);
            setConfig({ ...config, showpannel: true });
            break;
          }
        }
        if (found) { break };
      }
    }
  }
    
  const selectItem = (item) => {
    const { fbxloader, scene } = config;
    if (selectedToBePlacedObject) {
      scene.remove( selectedToBePlacedObject );
    }
    if (selectedObject) {
      scene.remove( selectedObject );
      selectedObject = null;
      setConfig({ ...config, showpannel: false });
    }
    fbxloader.load(item.file, (model) => {
        if (item.scale) {
          model.scale.set(item.scale, item.scale, item.scale );
        }
        if (item.rotateY) {
          model.rotation.y = item.rotateY;
        }
          currentobject = model.clone();
          let circle =  createObject();
          circle.rotation.x = - Math.PI / 2;
          selectedToBePlacedObject = model.add(circle);
          selectedToBePlacedObject.objItem = item;
          scene.add(selectedToBePlacedObject);
      }, undefined, (error) => {
          console.error(error);
      });
  }

  const sceneupdate = (scene) => {
    if (selectedToBePlacedObject) {
      const intersects = raycastFromCamera (scene);

      for (let i = 0; i < intersects.length; i++) {
        var gridPosition = _calculateGridPosition(intersects[i].point);
        if (selectedToBePlacedObject.objItem.z) {
          gridPosition.y = gridPosition.y + selectedToBePlacedObject.objItem.z;
        }
        selectedToBePlacedObject.position.set(gridPosition.x, gridPosition.y, gridPosition.z);
        break;
      }
    }
  }

  const _checkIfHoverPositionIsCorrect = (gridPosition) => {
    const { mapX, mapY } = config;
    if (gridPosition.x < 0 || gridPosition.y < 0) {
      return false;
    }
    if (gridPosition.x >= mapY || gridPosition.y >= mapY) {
      return false;
    }
    return true;
  }

  const _calculateGridPosition = (point) => {
//      var gridPositonX = parseInt(point.x  + 1 / 2);
//      var gridPositonY = 2
//      var gridPositonZ = parseInt(point.z  + 1 / 2);
    var gridPositonX = point.x  + 1 / 2;
    var gridPositonY = 2
    var gridPositonZ = point.z  + 1 / 2;
    return { x: gridPositonX, y: gridPositonY, z: gridPositonZ };
  }

  const createCell = ({ material, x, y, z }) => {
    const geometry = new THREE.BoxGeometry();

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, z, y);
    //cube.rotation.x = - Math.PI / 2.6;
    cube.receiveShadow = true;

    return cube;
  } 
  
  const placeCells = () => {
    const { mapX, mapY, scene } = config;
    console.log("placeCells")
    const tloader = new THREE.TextureLoader();
    const groundTexture = tloader.load( '../../img/grass50.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshLambertMaterial( { map: groundTexture } );
//      const material = new THREE.MeshLambertMaterial( {color: 0xFFFFFF} );
    let z = 1;
    var shiftX = parseInt(mapX/2);
    var shiftY = parseInt(mapY/2);
    for (let x = 0; x < mapX; x++) {
      for (let y = 0; y < mapY; y++) {
        const cell = createCell({ material: material, x: x - shiftX, y: y - shiftY, z: z })
        cell.isMapCell = true;
        cell.isPath = true;

        scene.add(cell);
      }
    }
  }  
  
  const checkMap = async () => {
    console.log("checkMap")
    const { mapId, accountAddress } = config;
    if (accountAddress) {
      const mapsContract = new web3.eth.Contract(nftABI, mapsAddress);
      try {
        var { x, y, ground } = await mapsContract.methods.mapSize(mapId).call({ from: accountAddress, });
        setConfig({ 
          ...config, 
          mapX:x,
          mapY:y,
          mapGround:ground
        });
        
        console.log(x)
        placeCells();
      } catch(error) {
        console.log(error)
      }
    }
  }

  const _handleContextMenu = (event) => {
    console.log(event);
    event.preventDefault();
    const { scene } = config;
    if (selectedToBePlacedObject) {
      scene.remove( selectedToBePlacedObject );
      selectedToBePlacedObject = null;
    }
  }
  
  const toggleLayerPanel = () => {
    const { hideLayerPanel, isReady } = config;
    setConfig({ ...config, hideLayerPanel: (!hideLayerPanel || !isReady) });
  }
  
  const changeLayers = (layer) => {
    const { hideLayerPanel } = config;
    setConfig({
      ...config,
      hideLayerPanel: !hideLayerPanel,
      activeLayer: layer,
    });
  }

  const changeStatus = () => {
    const { inProcess } = config;
    if (!inProcess) {
      if ( accountAddress && netId==mainNetId ) {

      } else {
        connect();
      }
    }
  }

  const deleteObj = () => {
    const { scene, mapObj } = config;
    if (selectedObject) {
      scene.remove( selectedObject );
      selectedObject = null;
      setConfig({
        ...config,
        showpannel: false,
      });
    }
    if (selectedObjectOnMap) {
      scene.remove( selectedObjectOnMap );
      selectedObjectOnMap = null;
      mapObj = mapObj.filter( el => el.uuid !== selectedObjectOnMap.uuid );
      setConfig({
        ...config,
        mapObj:mapObj,
      });
    }
  }

  const rotateObj = () => {
    if (selectedObjectOnMap) {
      selectedObjectOnMap.rotation.y = selectedObjectOnMap.rotation.y + Math.PI/4;
    }
  }

  const saveMap = async () => {
    const { mapId } = config;
    var itemIds = [];
    var itemXs = [];
    var itemYs = [];
    setReady(true);
    
    const gameFactoryContract = new web3.eth.Contract(factoryABI, gameFactoryAddress);
    try {
      await gameFactoryContract.methods.save(mapId, itemIds, itemXs, itemYs).send({ from: accountAddress, })
        .on('confirmation', (confirmationNumber, receipt) => {
          if(confirmationNumber == 1) {
            checkNFT();
          }
        });

    } catch(error) {
      console.log(error);
      setReady(false);
    }
    checkNFT();
  }
  
  const renderLayer = (layer, active, index, callback) => {
    return (
      <a className={active ? "active" : "" } onClick={callback} key={index}>
        <img className="tabimg" src={`/img/layers/${layer}.png`} />
        <div className="overlay">{layer}</div>
      </a>
    );
  };

  const renderLayerDown = (layer, callback) => {
    return (
      <a className="active downsymbol" onClick={callback}>
        <img className="tabimg" src={`/img/layers/${layer}.png`} />
        <div className="overlay">{layer}</div>
      </a>
    )
  }

  const renderLayers = () => {
    const { mapLayers  } = config;
    return mapLayers.map((layer, index) => {
      return renderLayer(layer, false, index, (() => changeLayers(layer)));
    });
  }

  const renderActiveItems = () => {
    const { activeLayer, fbxobjects  } = config;
    return fbxobjects.filter((fbxobject) => {
      if(fbxobject.type == activeLayer ) {
        return true;
      } else {
        return false;
      }
    }).map((item, index) => {
      return renderItem(item, index);
    });
  }
  
  const renderItem = (item, index) => {
    return (
      <a onClick={()=>{selectItem(item)}} key={index}>
        <img className="tabimg circleimg" src={item.icon} />
        <div className="overlay">{item.name}</div>
      </a>
    )
  }
  
  return (
    <div className={props.darkTheme ? "markets" : "markets lightTheme"}>
      <div className="container">
        <div className="mtabs gallery">
          { renderLayerDown(config.activeLayer,  (() => toggleLayerPanel())) }
          { renderActiveItems() }
        </div>
        <div className={config.hideLayerPanel ? "hidden" : "layers" }>
          { renderLayers() }
        </div>
      </div>
      <div className="relative container">
        <div className={config.isReady ? "hidden" : "troverlay" }>
          <div className="messages">
            <a className="play_now" onClick={() => changeStatus()}>Connect Wallet</a>
          </div>
        </div>
        
        <div className="mapeditor" id="mapcanvas" ref={mount} onMouseMove={(ev)=> handleMouseMove(ev)} onClick={(ev)=> handleMouseClick(ev)}></div>
        <div className="lefttop">
          <a className="play_now" onClick={() => saveMap()}>Save</a>
          <div className={config.showpannel ? "" : "hidden" }>
            <a className="play_now"  onClick={() => deleteObj()}>Delete</a>
            <a className="play_now"  onClick={() => rotateObj()}>Rotate</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Maps);

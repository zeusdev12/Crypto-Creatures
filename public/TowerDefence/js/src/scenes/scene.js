class Scene {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.gameobjects = [];
        this.eventListeners = {};
        this.raycaster = new THREE.Raycaster();
        
        
    }

    sceneEnter() {
    }

    sceneLeave() {
    }

    update(deltaTime) {
        if (!isFocused) {
            return;
        }

        this.gameobjects.forEach(gameobject => {
            gameobject.update(deltaTime);
        });
    }

    raycastFromCamera(recursive) {
        if (!recursive) {
            recursive = false;
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        return this.raycaster.intersectObjects(this.scene.children, recursive);
    }


    add(gameobject) {
        this.gameobjects.push(gameobject);
        this.scene.add(gameobject.mesh);
    }

    addToBeBeUpdated(gameobject) {
        this.gameobjects.push(gameobject);
    }

    addToScene(obj) {
        this.scene.add(obj);
    }

    remove(gameobject) {
        if (!gameobject) {
            return;
        }

        var index = this.gameobjects.indexOf(gameobject);
        if (index > -1) {
            this.gameobjects.splice(index, 1);
        }

        this.scene.remove(gameobject.mesh);
    }

    removeAll() {
        this.scene.children = [];
        this.gameobjects = [];
    }

    addEventListener(type, handler) {
        this.eventListeners[type] = handler;
    }

    _loadFoliage(map) {

        function getModelsPaths(assetNames, type) {
            var paths = [];
            assetNames.forEach(name => {
                paths.push(`TowerDefence/assets/models/foliage/${type}/${name}.json`);
            });
            return paths;
        }

        var me = this;
        var foliagescount = 24;
        function setFoliage() {
            for (let z = 0; z < foliagescount; z++) {
                    const randomX = parseInt(Math.random() * 16)+map.map.length;
                    const randomY = parseInt(Math.random() * map.map[0].length);
                    
                    const randomIndex = parseInt(Math.random() * foliageModels.length);
                    const model = foliageModels[randomIndex].scene.clone();
                    model.traverse(function (object) {
                        if (object.isMesh) {
                            object.castShadow = true;
                        }
                    });
                    model.scale.set(2, 2, 2 );
                    model.position.set(randomX, 1, randomY);
                    model.castShadow = true;
                    me.addToScene(model);
                
            }
            for (let z = 0; z < foliagescount; z++) {
                    const randomX = parseInt(Math.random() * 16)-16;
                    const randomY = parseInt(Math.random() * map.map[0].length);
                    
                    const randomIndex = parseInt(Math.random() * foliageModels.length);
                    const model = foliageModels[randomIndex].scene.clone();
                    model.traverse(function (object) {
                        if (object.isMesh) {
                            object.castShadow = true;
                        }
                    });
                    model.scale.set(2, 2, 2 );
                    model.position.set(randomX, 1, randomY);
                    model.castShadow = true;
                    me.addToScene(model);
                
            }
            for (let z = 0; z < foliagescount; z++) {
                    const randomX = parseInt(Math.random() * (32+map.map.length))-16;
                    const randomY = parseInt(Math.random() * 5)-5;
                    
                    const randomIndex = parseInt(Math.random() * foliageModels.length);
                    const model = foliageModels[randomIndex].scene.clone();
                    model.traverse(function (object) {
                        if (object.isMesh) {
                            object.castShadow = true;
                        }
                    });
                    model.position.set(randomX, 1, randomY);
                    model.castShadow = true;
                    me.addToScene(model);
                
            }
            for (let z = 0; z < map.map[0].length; z++) {
                    const randomX = parseInt(Math.random() * (32+map.map.length))-16;
                    const randomY = parseInt(Math.random() * 2)+map.map[0].length;
                    
                    const randomIndex = parseInt(Math.random() * foliageModels.length);
                    const model = foliageModels[randomIndex].scene.clone();
                    model.traverse(function (object) {
                        if (object.isMesh) {
                            object.castShadow = true;
                        }
                    });
                    model.position.set(randomX, 1, randomY);
                    model.castShadow = true;
                    me.addToScene(model);
                
            }
            for (let x = 0; x < map.map.length; x++) {
                for (let y = 0; y < map.map[x].length; y++) {
                    if (map.map[x][y] >= 0) {
                        continue;
                    }

                    const randomIndex = parseInt(Math.random() * foliageModels.length);
                    const model = foliageModels[randomIndex].scene.clone();
                    model.traverse(function (object) {
                        if (object.isMesh) {
                            object.castShadow = true;
                        }
                    });
                    model.scale.set(2, 2, 2 );
                    model.position.set(x, 1, y);
                    model.castShadow = true;
                    me.addToScene(model);
                }
            }
        }

        var assetNames = []
        if (map.type == "desert") {
            assetNames = ["cactus_tall", "cactus_tall", "cactus_tall", "cactus_short", "cactus_tall", "tree_palm", "tree_palmBend", "tree_palmDetailedShort", "tree_palmDetailedTall", "tree_palmShort", "tree_palmTall"];
        } else if (map.type == "mountain") {
            assetNames = ["tree_pineDefaultA", "tree_pineGroundA", "tree_pineGroundB", "tree_pineSmallB", "tree_pineSmallC", "tree_pineSmallC", "tree_pineTallA", "tree_pineTallB", "tree_pineTallC", "tree_pineTallD"];
        } else if (map.type == "plains") { // plains
            assetNames = ["tree_fat", "tree_oak", "tree_plateau", "tree_simple", "tree_small", "tree_tall", "tree_thin"];
        } else if (map.type.includes("FBX")) {
            assetNames = ["Tree_B_2", "Tree_A_3", "Tree_B_2", "Tree_B_3", "Tree_C_1", "Tree_E_1", "Tree_A_1", "Tree_A_1"];
        } else {
            assetNames = [
              {name:'Tree_01', position:{x:55.77782, y:2.219374, z:39.44234}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Ground_Decal_grass1', position:{x:41.89611, y:2.234265, z:15.31342}, rotation:{x:0, y:0.9926531, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_Pine_4', position:{x:57.57693, y:2.219667, z:31.98117}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_4.fbx'},
              {name:'Wall_wood_el2', position:{x:34.259, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Fern1', position:{x:52.98578, y:2.219374, z:33.33093}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_02', position:{x:9.259698, y:2.219532, z:20.60597}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Barrier4', position:{x:47.7151, y:-0.5135307, z:29.27479}, rotation:{x:-0.03438283, y:0.7062704, z:-0.03438282}, scale:{x:1, y:1, z:1}, file:'Barrier4.fbx'},
              {name:'Ground_Decal_grass1', position:{x:48.74057, y:2.219374, z:18.1111}, rotation:{x:0, y:-0.6378625, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Rock_02', position:{x:35.93732, y:1.800263, z:34.46793}, rotation:{x:0, y:-0.914479, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:36.90235, y:2.221578, z:9.060394}, rotation:{x:0, y:-0.714941, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_02', position:{x:19.5138, y:2.219374, z:56.19669}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:28.16789, y:2.219434, z:9.900635}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Rock_05', position:{x:19.6816, y:1.418587, z:12.89427}, rotation:{x:0.07800993, y:0.4969853, z:-0.04493606}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Plant_03', position:{x:11.50606, y:2.219374, z:45.06746}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_03.fbx'},
              {name:'Rock_17A', position:{x:46.21853, y:0.4687274, z:17.63452}, rotation:{x:0, y:0.2162697, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17A.fbx'},
              {name:'Wall_wood_el2', position:{x:50, y:2, z:24}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_08', position:{x:58.87606, y:2.229255, z:33.19918}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Tower_Base1_1', position:{x:25, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Ivy4', position:{x:15.89663, y:2.219563, z:32.18944}, rotation:{x:0, y:0.1110295, z:0}, scale:{x:1, y:1, z:1}, file:'Ivy4.fbx'},
              {name:'Plant_05', position:{x:23.53503, y:3.283176, z:48.62902}, rotation:{x:-0.00438008, y:0.1046465, z:-0.131513}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Barrier4', position:{x:23.71009, y:-0.5135307, z:14.8998}, rotation:{x:-0.03438283, y:0.7062704, z:-0.03438282}, scale:{x:1, y:1, z:1}, file:'Barrier4.fbx'},
              {name:'Tree_Pine_3', position:{x:53.86351, y:2.219374, z:43.85512}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tree_03', position:{x:6.182356, y:2.219374, z:48.6087}, rotation:{x:0, y:-0.8756393, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Turret', position:{x:28, y:5.573101, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:28, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Hammer3', position:{x:28, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Hammer3.fbx'},
              {name:'Mushroom3B', position:{x:41.97618, y:2.219374, z:32.88321}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom3B.fbx'},
              {name:'Rock_06', position:{x:22.54291, y:0.9685556, z:44.39887}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Tree_06', position:{x:6.132401, y:2.219405, z:32.72888}, rotation:{x:0, y:0.6953166, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Tree_Small_01', position:{x:53.06708, y:2.219374, z:38.63624}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Small_01.fbx'},
              {name:'Tree_03', position:{x:9.68979, y:2.219563, z:53.15335}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Rock_08', position:{x:24.23058, y:0.6827252, z:48.41569}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_08.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:40}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tower_Base2_2', position:{x:39, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Tree_05', position:{x:46.33521, y:3.568286, z:2.673089}, rotation:{x:0, y:-0.4492539, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Tree_Pine_3', position:{x:11.36458, y:2.219374, z:34.10481}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Bush_01', position:{x:39.94136, y:2.219565, z:54.68655}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Trunk_03', position:{x:52.93278, y:2.219374, z:42.21595}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Trunk_03.fbx'},
              {name:'Rock_17B', position:{x:35.2486, y:0.4914213, z:15.64055}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17B.fbx'},
              {name:'Bush_08', position:{x:11.5922, y:2.219374, z:44.14172}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Plant_04', position:{x:54.29589, y:2.219554, z:27.734}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Plant_05', position:{x:41.2672, y:1.880688, z:10.62082}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Tree_06', position:{x:7.117047, y:2.219374, z:44.79283}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Barrel', position:{x:42.76255, y:5.373875, z:31.00353}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:42, y:5.060426, z:31}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:42, y:4.649603, z:31}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Machinegun1', position:{x:42, y:4.649603, z:31}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Machinegun1.fbx'},
              {name:'Bush_03', position:{x:41.36736, y:2.221155, z:35.5671}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Rock_13', position:{x:19.25163, y:-0.8500979, z:15.50828}, rotation:{x:0, y:-0.2616052, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_13.fbx'},
              {name:'Bush_03', position:{x:25.29809, y:2.219891, z:9.555969}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Tower_Base1_1', position:{x:42, y:2, z:25}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Rune_particle2', position:{x:21.73423, y:0.609565, z:6.002675}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:21.81315, y:0.5892065, z:6.002675}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_06', position:{x:21.82226, y:0.4688668, z:6.012056}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_06.fbx'},
              {name:'Tower_Base2_2', position:{x:36, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Rock_06', position:{x:37.62044, y:1.004491, z:16.16878}, rotation:{x:0, y:-0.9809216, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Bush_08', position:{x:47.56454, y:2.219374, z:11.47567}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Wall_wood_el2', position:{x:27, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Ground_Decal1', position:{x:49.72445, y:2.219374, z:16.9666}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal1.fbx'},
              {name:'Rock_05', position:{x:34.79063, y:0.522631, z:39.32456}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Wall_wood_el2', position:{x:50, y:2, z:43}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Rock_05', position:{x:32.58682, y:1.050112, z:40.12523}, rotation:{x:-0.1411855, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Tree_02', position:{x:34.27956, y:2.219374, z:56.16667}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_02.fbx'},
              {name:'Bush_04', position:{x:12.9002, y:2.219374, z:32.5868}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Barrel', position:{x:19.00283, y:5.398751, z:29.21126}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:19, y:5.073444, z:30}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:19, y:4.649603, z:30}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Machinegun2', position:{x:19, y:4.649603, z:30}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Machinegun2.fbx'},
              {name:'Tree_small_05', position:{x:54.33296, y:2.219577, z:48.09526}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_small_05.fbx'},
              {name:'Point_light', position:{x:47.83709, y:4.73162, z:17.2402}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Point_light.fbx'},
              {name:'Particle_Glow', position:{x:47.84245, y:4.979618, z:17.2234}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Particle_Glow.fbx'},
              {name:'Lantern1', position:{x:47.84245, y:2.80789, z:16.11239}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Lantern1.fbx'},
              {name:'Rock_13', position:{x:35.19872, y:-0.7172396, z:35.78688}, rotation:{x:0, y:-0.2616052, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_13.fbx'},
              {name:'Fence2', position:{x:32.73972, y:0.5283725, z:24.64737}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence2.fbx'},
              {name:'Turret', position:{x:44, y:5.215214, z:13.91405}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:44, y:4.649603, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Mortar1', position:{x:44, y:4.649603, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Mortar1.fbx'},
              {name:'Plant_01', position:{x:24.76872, y:2.243419, z:18.30343}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_01.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:55.50069, y:2.219374, z:28.21549}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Bush_05', position:{x:49.47358, y:2.219374, z:57.01459}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:52.93047, y:2.219374, z:17.69626}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Bush_03', position:{x:33.71035, y:2.219654, z:49.48652}, rotation:{x:0, y:-0.9980778, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Plant_05', position:{x:24.58298, y:2.262239, z:17.16157}, rotation:{x:0.1335135, y:-0.1265343, z:0.1544388}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Tower_Base1_1', position:{x:42, y:2, z:28}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:43}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_05', position:{x:49.3878, y:2.221702, z:35.70095}, rotation:{x:0, y:0.566534, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Fern1', position:{x:40.92596, y:2.231692, z:32.64747}, rotation:{x:-0.1083088, y:0.3930114, z:0.1927427}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_02', position:{x:42.91009, y:2.219123, z:34.68069}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tower_Base2_2', position:{x:22, y:2, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Tree_Pine_1', position:{x:9.795392, y:2.219499, z:34.17884}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Tower_Base2_2', position:{x:22, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Rock_08', position:{x:40.25808, y:0.07408226, z:26.31281}, rotation:{x:0, y:0.7019718, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_08.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:38}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Rock_04', position:{x:23.15591, y:0.8492319, z:36.40867}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Muzzle', position:{x:38.63469, y:5.451051, z:21.06896}, rotation:{x:0, y:-0.9825753, z:0}, scale:{x:1, y:1, z:1}, file:'Muzzle.fbx'},
              {name:'Pivot', position:{x:39.0014, y:5.443015, z:22.00358}, rotation:{x:0.0006803833, y:-0.5633582, z:-0.000997839}, scale:{x:1, y:1, z:1}, file:'Pivot.fbx'},
              {name:'Turret', position:{x:39, y:4.647727, z:22}, rotation:{x:0, y:-0.9825752, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:39, y:4.647727, z:22}, rotation:{x:0, y:-0.9825752, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Crossbow1', position:{x:39, y:4.649603, z:22}, rotation:{x:0, y:-0.9825752, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Crossbow1.fbx'},
              {name:'Fence3', position:{x:41.49573, y:2.060657, z:48.93506}, rotation:{x:-0.007312755, y:0.1574827, z:-0.1167253}, scale:{x:1, y:1, z:1}, file:'Fence3.fbx'},
              {name:'Mushroom3A', position:{x:48.53274, y:2.219374, z:49.61083}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom3A.fbx'},
              {name:'Tree_Pine_2', position:{x:11.39796, y:2.219374, z:32.90661}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Wall_wood_el2', position:{x:21, y:2, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Fence3', position:{x:34.57539, y:0.5029783, z:24.77155}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence3.fbx'},
              {name:'Barrel', position:{x:30.87067, y:5.761227, z:18.94314}, rotation:{x:0, y:0.7254992, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:30, y:5.086077, z:19}, rotation:{x:0, y:0.7254992, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:30, y:4.649603, z:19}, rotation:{x:0, y:0.7254992, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gauss1', position:{x:30, y:4.649603, z:19}, rotation:{x:0, y:0.7254992, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gauss1.fbx'},
              {name:'Rock_02', position:{x:24.50698, y:0.9313279, z:36.37068}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_02.fbx'},
              {name:'Crystal', position:{x:36.00206, y:2.669459, z:18.99351}, rotation:{x:0, y:0.5406407, z:0}, scale:{x:1, y:1, z:1}, file:'Crystal.fbx'},
              {name:'Base', position:{x:36, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Crystal1', position:{x:36, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1.020504, y:1.020504, z:1.020504}, file:'Tow_Crystal1.fbx'},
              {name:'Fern1', position:{x:14.49641, y:2.219374, z:50.32327}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_06', position:{x:51.59896, y:2.219374, z:15.78606}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Sparks', position:{x:44.24184, y:4.964501, z:46.41433}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Sparks.fbx'},
              {name:'Trunk_03', position:{x:54.59705, y:2.21962, z:10.03152}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Trunk_03.fbx'},
              {name:'Bush_02', position:{x:43.95007, y:2.172812, z:11.95379}, rotation:{x:0.1575846, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Barrel', position:{x:49.19371, y:5.198807, z:21.92463}, rotation:{x:0, y:-0.740078, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:50, y:4.928247, z:22}, rotation:{x:0, y:-0.740078, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:50, y:4.649603, z:22}, rotation:{x:0, y:-0.740078, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Laser3', position:{x:50, y:4.649603, z:22}, rotation:{x:0, y:-0.740078, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Laser3.fbx'},
              {name:'Brickwall1', position:{x:29.96529, y:0.5584819, z:36.73083}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Brickwall1.fbx'},
              {name:'Fern1', position:{x:15.73586, y:2.230885, z:15.11468}, rotation:{x:0.2821631, y:0.0452068, z:0.01150052}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Plant_01', position:{x:48.16945, y:2.219374, z:57.96134}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_01.fbx'},
              {name:'Rock_07', position:{x:17.53383, y:0.4667423, z:36.36153}, rotation:{x:0, y:-0.9764602, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_07.fbx'},
              {name:'Bush_08', position:{x:17.47683, y:2.230776, z:48.92363}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Bush_09', position:{x:17.72997, y:2.219374, z:55.69791}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'Wall_wood_el2', position:{x:39.7515, y:2, z:14.11599}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_01', position:{x:30.20085, y:2.219374, z:8.907288}, rotation:{x:0, y:0.8229217, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Bush_02', position:{x:13.77524, y:2.219374, z:13.20461}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:42, y:2, z:21}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Plant_05', position:{x:21.39023, y:2.369553, z:30.72034}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Wall_wood_el2', position:{x:37.59565, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_07', position:{x:10.56909, y:2.219424, z:41.09623}, rotation:{x:0, y:-0.7916784, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_07.fbx'},
              {name:'Column3A', position:{x:35.22536, y:0.5637784, z:5.268672}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Column3A.fbx'},
              {name:'Rock_06', position:{x:33.8707, y:1.540362, z:40.02162}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Rock_07', position:{x:37.40621, y:1.072292, z:43.89341}, rotation:{x:0.1020024, y:0.003569628, z:0.08667973}, scale:{x:1, y:1, z:1}, file:'Rock_07.fbx'},
              {name:'Rock_04', position:{x:36.33753, y:0.6405348, z:39.54321}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Tree_Pine_2', position:{x:25.92152, y:2.219478, z:54.17028}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Tree_Pine_1', position:{x:26.11845, y:2.219374, z:51.74248}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Fern1', position:{x:10.0262, y:2.219374, z:21.25132}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_04', position:{x:25.12504, y:2.219831, z:11.05947}, rotation:{x:0, y:-0.7866375, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Rock_05', position:{x:33.32595, y:1.056671, z:36.31267}, rotation:{x:0.2219773, y:0.1379474, z:-0.0457074}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Tower_Base2_2', position:{x:19, y:2, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Tower_Base1_1', position:{x:44, y:2, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Brickwall2', position:{x:27.22085, y:0.5572929, z:36.73377}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Brickwall2.fbx'},
              {name:'Tree_Pine_3', position:{x:25.73775, y:2.219374, z:57.20215}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tower_Base1_2', position:{x:36, y:2, z:42}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_2.fbx'},
              {name:'Wall_wood_el2', position:{x:27, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tower_Base1_1', position:{x:30, y:2, z:13}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Trunk_02', position:{x:13.95936, y:2.219374, z:15.19423}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Trunk_02.fbx'},
              {name:'Lightshafts_moon', position:{x:39.53733, y:5.451185, z:27.70963}, rotation:{x:0.3957228, y:0.5511559, z:-0.1215705}, scale:{x:2.072971, y:2.072971, z:2.072971}, file:'Lightshafts_moon.fbx'},
              {name:'Tree_Pine_3', position:{x:16.7435, y:2.219374, z:10.47139}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Plant_04', position:{x:14.92107, y:2.219374, z:14.07158}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Fern1', position:{x:50.06127, y:2.219374, z:16.59781}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_03', position:{x:11.24851, y:2.219374, z:35.85715}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Tree_04', position:{x:9.92555, y:2.219419, z:48.98576}, rotation:{x:0, y:-0.7730263, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Bush_01', position:{x:52.94183, y:2.219374, z:16.76847}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Fence1', position:{x:31.09291, y:0.5304945, z:24.63699}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence1.fbx'},
              {name:'Bush_01', position:{x:52.56318, y:2.219374, z:36.57943}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Barrel', position:{x:42.00341, y:5.362989, z:22.49163}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:42, y:5.038894, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:42, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Fire3', position:{x:42, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Fire3.fbx'},
              {name:'Tree_01', position:{x:54.18233, y:2.219485, z:23.03466}, rotation:{x:0, y:-0.4510876, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_04', position:{x:36.39449, y:2.219513, z:54.22783}, rotation:{x:0, y:-0.5452409, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Plant_02', position:{x:14.99859, y:2.219374, z:31.13459}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_02.fbx'},
              {name:'Rock_05', position:{x:22.49426, y:2.086088, z:35.67252}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Bush_01', position:{x:28.15931, y:2.219374, z:52.59829}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Rune_particle2', position:{x:33.98063, y:0.6096144, z:7.64359}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:33.98063, y:0.5892558, z:7.64359}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_02', position:{x:34.06866, y:0.4689162, z:7.652971}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_02.fbx'},
              {name:'Brickwall2', position:{x:41.37488, y:0.5065598, z:16.54395}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Brickwall2.fbx'},
              {name:'Tree_03', position:{x:57.07724, y:2.219374, z:43.01843}, rotation:{x:0, y:-0.7261826, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Bush_02', position:{x:11.67342, y:2.219374, z:42.61103}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tree_small_05', position:{x:33.33762, y:2.219374, z:52.83747}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_small_05.fbx'},
              {name:'Rock_08', position:{x:36.15132, y:-0.1962212, z:14.89945}, rotation:{x:0, y:0.1325031, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_08.fbx'},
              {name:'Tower_Base2_2', position:{x:19, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Tree_Pine_1', position:{x:57.49987, y:2.219374, z:29.23961}, rotation:{x:0, y:0.4879106, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Rock_01', position:{x:23.77269, y:1.63841, z:36.04345}, rotation:{x:0.1887845, y:0.1087458, z:-0.09660523}, scale:{x:1, y:1, z:1}, file:'Rock_01.fbx'},
              {name:'Rock_03', position:{x:23.21852, y:2.120638, z:43.68535}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Rock_01', position:{x:37.96807, y:2.462424, z:43.90581}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_01.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:12.00096, y:2.219374, z:16.01271}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Tree_04', position:{x:11.39208, y:2.219374, z:29.64503}, rotation:{x:0, y:-0.7730263, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:48}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_06', position:{x:10.89132, y:2.219374, z:22.32426}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Bush_04', position:{x:42.49411, y:2.219374, z:49.66948}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Rock_02', position:{x:36.33274, y:1.014635, z:34.83548}, rotation:{x:0.01361726, y:0.01684708, z:-0.1141277}, scale:{x:1, y:1, z:1}, file:'Rock_02.fbx'},
              {name:'Tree_Pine_3', position:{x:9.847022, y:2.219467, z:19.16464}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Ground_Decal_grass1', position:{x:48.79346, y:2.219374, z:31.42681}, rotation:{x:0, y:-0.7064512, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Plant_02', position:{x:48.86948, y:2.231503, z:34.2682}, rotation:{x:0, y:0, z:0.09266107}, scale:{x:1, y:1, z:1}, file:'Plant_02.fbx'},
              {name:'Tower_Base1_1', position:{x:42, y:2, z:31}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Rock_10', position:{x:20.69197, y:0.004778504, z:23.61483}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_10.fbx'},
              {name:'Tree_01', position:{x:9.091055, y:2.219429, z:27.63424}, rotation:{x:0, y:-0.548041, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Bush_03', position:{x:11.01323, y:2.219374, z:20.38297}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Wall_wood_el2', position:{x:24, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Rock_06', position:{x:25.57221, y:0.5083205, z:47.89778}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Tree_07', position:{x:6.928671, y:2.219374, z:16.3039}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_07.fbx'},
              {name:'Tree_Pine_1', position:{x:47.6332, y:2.219374, z:55.31019}, rotation:{x:0, y:-0.9039643, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Bush_06', position:{x:15.96355, y:2.222439, z:49.12632}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Tree_01', position:{x:46.80679, y:2.219374, z:52.67985}, rotation:{x:0, y:-0.6471971, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tower_Base1_1', position:{x:34, y:2, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_06', position:{x:31.64195, y:2.227507, z:49.11229}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Radar__signal', position:{x:22, y:5.542752, z:34}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:57.0413, y:57.0413, z:57.0413}, file:'Radar__signal.fbx'},
              {name:'Turret', position:{x:22, y:5.399583, z:34.01227}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:22, y:4.649603, z:34}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:0.01753116, y:0.01753116, z:0.01753116}, file:'Base.fbx'},
              {name:'Tow_Radar2', position:{x:22, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Radar2.fbx'},
              {name:'Bush_08', position:{x:39.38185, y:2.219374, z:51.93092}, rotation:{x:0, y:-0.8525823, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Ground_Decal_grass1', position:{x:40.64562, y:2.219374, z:28.35258}, rotation:{x:0, y:-0.6378625, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Floor3', position:{x:35.64317, y:0.4689156, z:26.38478}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Floor3.fbx'},
              {name:'Plant_04', position:{x:25.71737, y:2.219973, z:29.33651}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Rock_13', position:{x:45.99586, y:-0.8462422, z:15.73745}, rotation:{x:0, y:-0.4706977, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_13.fbx'},
              {name:'Rock_04', position:{x:37.57381, y:2.248992, z:15.48221}, rotation:{x:-0.03768309, y:-0.071506, z:0.04224931}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Tree_05', position:{x:11.91336, y:2.219374, z:51.69103}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'cannon2_turret', position:{x:37.99088, y:5.949174, z:11.00798}, rotation:{x:0, y:-0.3588937, z:0}, scale:{x:1, y:1, z:1}, file:'cannon2_turret.fbx'},
              {name:'cannon2_base', position:{x:38, y:5, z:11}, rotation:{x:0, y:-0.3588937, z:0}, scale:{x:1, y:1, z:1}, file:'cannon2_base.fbx'},
              {name:'Tow_Cannon2', position:{x:38, y:5, z:11}, rotation:{x:0, y:-0.3588937, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Cannon2.fbx'},
              {name:'Tree_01', position:{x:29.33686, y:2.218984, z:5.946849}, rotation:{x:0, y:-0.9484544, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_04', position:{x:25.73634, y:3.564204, z:2.141162}, rotation:{x:0, y:-0.3474976, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Bush_05', position:{x:44.16074, y:2.219374, z:50.74839}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Bush_02', position:{x:37.59593, y:2.219374, z:53.97365}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Ground_Decal1', position:{x:38.11061, y:2.230639, z:19.05965}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal1.fbx'},
              {name:'Tree_08', position:{x:6.648726, y:2.219374, z:27.01679}, rotation:{x:0, y:-0.9990138, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_08.fbx'},
              {name:'Tree_03', position:{x:54.33241, y:2.219577, z:15.8232}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Turret', position:{x:50, y:5.863766, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:50, y:4.649603, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Hammer1', position:{x:50, y:4.649603, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Hammer1.fbx'},
              {name:'Tree_Pine_3', position:{x:51.6332, y:2.219374, z:30.78221}, rotation:{x:0, y:-0.4738581, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Ground_Decal_grass1', position:{x:24.63361, y:2.225539, z:22.95913}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:40.74016, y:2.219374, z:31.42681}, rotation:{x:0, y:-0.7064512, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_Pine_2', position:{x:14.51181, y:2.219374, z:52.93843}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Tree_01', position:{x:29.52747, y:3.563918, z:1.244435}, rotation:{x:0, y:0.5669072, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Bush_08', position:{x:39.77981, y:2.219374, z:55.91367}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Fence2', position:{x:27.20647, y:0.508078, z:24.74661}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence2.fbx'},
              {name:'Ground_Decal_grass1', position:{x:39, y:2, z:21}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:38.16132, y:2.246141, z:23.26494}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_01', position:{x:52.23817, y:2.219374, z:49.28465}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Plant_01', position:{x:42.77145, y:2.219208, z:36.40399}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_01.fbx'},
              {name:'Turret', position:{x:41, y:4.973823, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:41, y:4.649603, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Rocket1_1', position:{x:41, y:4.649603, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Rocket1_1.fbx'},
              {name:'Ground_Decal1', position:{x:26.81404, y:2.219558, z:28.80234}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal1.fbx'},
              {name:'Tree_Pine_3', position:{x:14.33536, y:3.564099, z:1.145414}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tower_Base1_1', position:{x:27, y:2, z:13}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:28.38454, y:2.245107, z:30.20825}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_01', position:{x:48.97063, y:2.219485, z:13.68041}, rotation:{x:0, y:0.09658665, z:0}, scale:{x:1, y:0.8430625, z:1}, file:'Tree_01.fbx'},
              {name:'Banner', position:{x:31.22822, y:2.245577, z:6.141826}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Banner.fbx'},
              {name:'Wall_wood_el2', position:{x:24, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Ivy4', position:{x:18.81584, y:0.4597678, z:44.35227}, rotation:{x:0, y:-0.6783046, z:0}, scale:{x:1, y:1, z:1}, file:'Ivy4.fbx'},
              {name:'Barrier2', position:{x:35.33076, y:-0.4362677, z:8.4878}, rotation:{x:-0.08779533, y:-0.7016352, z:-0.08779535}, scale:{x:1, y:1, z:1}, file:'Barrier2.fbx'},
              {name:'Tower_Base1_2', position:{x:38, y:2, z:14}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_2.fbx'},
              {name:'Tree_Pine_2', position:{x:57.01428, y:2.219374, z:51.45551}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Plant_03', position:{x:15.02881, y:2.219374, z:12.35975}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_03.fbx'},
              {name:'Fern1', position:{x:32.31401, y:2.260787, z:30.3849}, rotation:{x:0.09676632, y:0.377934, z:0.1096328}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Plant_05', position:{x:30.47159, y:2.221228, z:28.99977}, rotation:{x:-0.1717042, y:0.004544119, z:-0.02673351}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Ground_Decal2', position:{x:25.5474, y:2.219374, z:28.37598}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal2.fbx'},
              {name:'Tree_01', position:{x:35.70247, y:2.325329, z:2.087574}, rotation:{x:0, y:-0.6752231, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_06', position:{x:28.9561, y:2.219374, z:57.11355}, rotation:{x:0, y:0.1618496, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Bush_01', position:{x:10.80839, y:2.219374, z:15.83959}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Rock_02', position:{x:36.33147, y:1.016047, z:33.46808}, rotation:{x:-0.2413854, y:-0.9338207, z:-0.1029283}, scale:{x:1, y:1, z:1}, file:'Rock_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:44.98807, y:2.234265, z:15.40898}, rotation:{x:0, y:0.9882882, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_06', position:{x:25.05189, y:2.219374, z:55.70392}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Tower_Base2_2', position:{x:18, y:2, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Rock_03', position:{x:35.69339, y:2.089677, z:33.88242}, rotation:{x:0.1565098, y:-0.08171094, z:0.01276206}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Bush_02', position:{x:30.1491, y:2.219374, z:51.90609}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tree_03', position:{x:50.65424, y:2.219374, z:55.152}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Plant_02', position:{x:30.78531, y:2.219374, z:50.54488}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_02.fbx'},
              {name:'Bush_04', position:{x:5.662454, y:2.216901, z:20.08297}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Fence2', position:{x:37.86291, y:2.228475, z:49.06144}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence2.fbx'},
              {name:'Bush_09', position:{x:54.15929, y:2.219471, z:46.0973}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'Bush_04', position:{x:51.75761, y:2.219374, z:34.91688}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Barrel', position:{x:28.46424, y:5.266502, z:29.33647}, rotation:{x:0, y:-0.9534163, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:28, y:4.995942, z:30}, rotation:{x:0, y:-0.9534163, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:28, y:4.717298, z:30}, rotation:{x:0, y:-0.9534163, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Laser3', position:{x:28, y:4.717298, z:30}, rotation:{x:0, y:-0.9534163, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Laser3.fbx'},
              {name:'Barrel', position:{x:13.89902, y:5.426324, z:27.02048}, rotation:{x:0, y:0.7741929, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Base', position:{x:14, y:4.649603, z:27}, rotation:{x:0, y:0.7741929, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Rocket2_2', position:{x:14, y:4.649603, z:27}, rotation:{x:0, y:0.7741929, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Rocket2_2.fbx'},
              {name:'Bush_06', position:{x:46.04345, y:2.219374, z:10.29227}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Ground_Decal3', position:{x:34.02116, y:2.219374, z:18.38898}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal3.fbx'},
              {name:'Plant_04', position:{x:38.78767, y:2.243827, z:12.41645}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:24}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:18}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tower_Base2_2', position:{x:33, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Ground_Decal3', position:{x:18.80575, y:2.219374, z:50.92273}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal3.fbx'},
              {name:'Tower_Base1_2', position:{x:22, y:2, z:42}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_2.fbx'},
              {name:'Tree_Pine_1', position:{x:25.75338, y:2.219374, z:6.533793}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:48.79346, y:2.219374, z:28.25661}, rotation:{x:0, y:-0.645267, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:44}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Muzzle', position:{x:42.89715, y:5.574872, z:41.55863}, rotation:{x:0, y:0.8489522, z:0}, scale:{x:1, y:1, z:1}, file:'Muzzle.fbx'},
              {name:'Pivot', position:{x:41.99628, y:5.569081, z:42.00183}, rotation:{x:-0.001176307, y:0.9739836, z:0.0002736893}, scale:{x:1, y:1, z:1}, file:'Pivot.fbx'},
              {name:'Turret', position:{x:42, y:4.649603, z:42}, rotation:{x:0, y:0.8489521, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:42, y:4.649603, z:42}, rotation:{x:0, y:0.8489521, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Crossbow3', position:{x:42, y:4.649603, z:42}, rotation:{x:0, y:0.8489521, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Crossbow3.fbx'},
              {name:'Bush_05', position:{x:49.12682, y:2.227118, z:46.10719}, rotation:{x:0, y:-0.8141522, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Tree_Pine_3', position:{x:49.66277, y:2.219559, z:9.303975}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Bush_02', position:{x:53.19798, y:2.219374, z:41.04055}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tower_Base1_1', position:{x:38, y:2, z:11}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_01', position:{x:38.95686, y:2.086185, z:11.58446}, rotation:{x:0, y:-0.2371172, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Tree_Fall2', position:{x:53.9945, y:2.219395, z:32.90643}, rotation:{x:0, y:-0.1499614, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Fall2.fbx'},
              {name:'Rock_09', position:{x:22.40214, y:-0.4640625, z:23.93389}, rotation:{x:0, y:0.6060537, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_09.fbx'},
              {name:'Point_light', position:{x:35.08369, y:4.15501, z:47.75832}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Point_light.fbx'},
              {name:'Particle_Glow', position:{x:35.07833, y:4.403008, z:47.77512}, rotation:{x:3.090862E-08, y:0.7071068, z:0.7071068}, scale:{x:1, y:1, z:1}, file:'Particle_Glow.fbx'},
              {name:'Lantern1', position:{x:35.07833, y:2.23128, z:48.88612}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Lantern1.fbx'},
              {name:'Tower_Base1_1', position:{x:30, y:2, z:16}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:26}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Column3B', position:{x:19.01892, y:2.239138, z:5.112754}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Column3B.fbx'},
              {name:'Bush_06', position:{x:39.28034, y:2.219374, z:53.36966}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Bush_03', position:{x:15.58266, y:2.219374, z:11.72669}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Tesla_part', position:{x:38.11723, y:6.242052, z:14.07059}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_part.fbx'},
              {name:'Tesla_glow', position:{x:38.11723, y:6.294058, z:14.07059}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_glow.fbx'},
              {name:'Tow_Tesla1', position:{x:38.11723, y:4.451488, z:14.07059}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Tesla1.fbx'},
              {name:'Fern1', position:{x:20.55621, y:2.288261, z:46.53441}, rotation:{x:0.01990679, y:-0.06697496, z:0.1388673}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_05', position:{x:49.9715, y:2.219374, z:34.17529}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Tree_01', position:{x:8.470627, y:2.219374, z:37.24977}, rotation:{x:0, y:-0.7788661, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Muzzle', position:{x:14.72721, y:5.448876, z:21.68662}, rotation:{x:0, y:0.3959033, z:0}, scale:{x:1, y:1, z:1}, file:'Muzzle.fbx'},
              {name:'Pivot', position:{x:13.9972, y:5.443015, z:20.99736}, rotation:{x:-0.001122312, y:0.9292759, z:-0.000446116}, scale:{x:1, y:1, z:1}, file:'Pivot.fbx'},
              {name:'Turret', position:{x:14, y:4.647727, z:21}, rotation:{x:0, y:0.3959032, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:14, y:4.647727, z:21}, rotation:{x:0, y:0.3959032, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Crossbow2', position:{x:14, y:4.649603, z:21}, rotation:{x:0, y:0.3959032, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Crossbow2.fbx'},
              {name:'Rock_06', position:{x:35.73536, y:1.676615, z:44.08544}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Bush_06', position:{x:13.90436, y:2.219374, z:34.88197}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Fern1', position:{x:41.27814, y:2.219374, z:50.3037}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Tree_06', position:{x:44.97091, y:2.219374, z:8.811532}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Bush_04', position:{x:51.07809, y:2.219374, z:48.35772}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Bush_04', position:{x:44.53118, y:2.219374, z:49.54269}, rotation:{x:0, y:-0.6648146, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Tree_Dead1', position:{x:5.246635, y:2.224836, z:21.14014}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Dead1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:22.76529, y:2.223445, z:20.95574}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_04', position:{x:53.03751, y:2.219652, z:9.456449}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Rock_02', position:{x:39.91449, y:1.345325, z:27.86459}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_02.fbx'},
              {name:'Plant_04', position:{x:38.6139, y:2.219374, z:49.95828}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Tree_06', position:{x:8.776329, y:2.219374, z:13.59262}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_02', position:{x:10.06599, y:2.219374, z:37.16754}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:49.03551, y:2.219374, z:24.4334}, rotation:{x:0, y:-0.7029291, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_small_05', position:{x:12.7129, y:2.219672, z:32.01145}, rotation:{x:0, y:-0.3202309, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_small_05.fbx'},
              {name:'Fence2', position:{x:29.11631, y:0.5197089, z:24.68974}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence2.fbx'},
              {name:'Barrel', position:{x:22.48851, y:5.761727, z:29.27704}, rotation:{x:0, y:0.9543362, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:22, y:5.067039, z:30}, rotation:{x:0, y:0.9543362, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:22, y:4.649603, z:30}, rotation:{x:0, y:0.9543362, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gauss2', position:{x:22, y:4.649603, z:30}, rotation:{x:0, y:0.9543362, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gauss2.fbx'},
              {name:'Rock_05', position:{x:17.39137, y:1.268868, z:16.1051}, rotation:{x:0.2302273, y:0.1659906, z:-0.0131617}, scale:{x:1, y:1, z:1}, file:'Rock_05.fbx'},
              {name:'Tree_01', position:{x:23.00467, y:2.219374, z:53.49548}, rotation:{x:0, y:-0.3299792, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Wall_wood_el2', position:{x:30, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tower_Base1_1', position:{x:41, y:2, z:14}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Wall_wood_el2', position:{x:38, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Radar__signal', position:{x:27, y:5.790335, z:19}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Radar__signal.fbx'},
              {name:'Turret', position:{x:27, y:5.393688, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:27, y:4.649603, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Radar3', position:{x:27, y:4.649603, z:19}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Radar3.fbx'},
              {name:'Tree_01', position:{x:17.14779, y:2.219374, z:53.79931}, rotation:{x:0, y:-0.8290121, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Barrel', position:{x:19, y:5.219415, z:33.95654}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Base', position:{x:19, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Mortar3', position:{x:19, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Mortar3.fbx'},
              {name:'Tower_Base1_1', position:{x:42, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tree_Pine_3', position:{x:14.75689, y:2.219644, z:54.4423}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tree_02', position:{x:40.74987, y:2.220991, z:5.353387}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_02.fbx'},
              {name:'Bush_02', position:{x:41.93382, y:2.162469, z:23.79297}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tree_Pine_2', position:{x:45.41983, y:2.219374, z:56.13163}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Tree_04', position:{x:57.43878, y:2.219374, z:21.59595}, rotation:{x:0, y:-0.7730263, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Tree_06', position:{x:13.60127, y:2.379499, z:4.619692}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Sparks', position:{x:19.23126, y:4.964501, z:39.82713}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Sparks.fbx'},
              {name:'Tree_Fall4', position:{x:28.00946, y:2.219624, z:49.48794}, rotation:{x:0, y:0.4150013, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Fall4.fbx'},
              {name:'Tree_01', position:{x:55.06281, y:2.219374, z:20.0941}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Turret', position:{x:50.08171, y:5.214263, z:25}, rotation:{x:0, y:-0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:50, y:4.649603, z:25}, rotation:{x:0, y:-0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Mortar2', position:{x:50, y:4.649603, z:25}, rotation:{x:0, y:-0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Mortar2.fbx'},
              {name:'Tower_Base1_1', position:{x:27, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Turret', position:{x:50, y:4.973823, z:28}, rotation:{x:0, y:-0.7321532, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:50, y:4.649603, z:28}, rotation:{x:0, y:-0.7321532, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Rocket1_3', position:{x:50, y:4.649603, z:28}, rotation:{x:0, y:-0.7321532, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Rocket1_3.fbx'},
              {name:'Rock_03', position:{x:40.30816, y:1.816795, z:27.53092}, rotation:{x:0, y:-0.03165321, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Bush_03', position:{x:14.68286, y:2.222704, z:36.53066}, rotation:{x:0, y:0.4230271, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Fence3', position:{x:25.36637, y:0.5243974, z:24.66681}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence3.fbx'},
              {name:'Barrier4', position:{x:47.7151, y:0.8015934, z:42.75001}, rotation:{x:-0.03438283, y:0.7062704, z:-0.03438282}, scale:{x:1, y:1, z:1}, file:'Barrier4.fbx'},
              {name:'Tree_Pine_2', position:{x:54.86922, y:2.219454, z:45.0146}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Column3B', position:{x:32.88033, y:0.5329675, z:4.905397}, rotation:{x:0, y:0.8573011, z:0}, scale:{x:1, y:1, z:1}, file:'Column3B.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:45}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Sparks', position:{x:36.55127, y:4.964501, z:24.01778}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Sparks.fbx'},
              {name:'Tree_Pine_1', position:{x:17.68275, y:2.219486, z:9.183752}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Tree_02', position:{x:55.0092, y:2.219374, z:36.12918}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:26.87963, y:2.21917, z:42.83323}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Barrel', position:{x:31.00788, y:5.395753, z:35.1132}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:31.23963, y:5.149868, z:33.90878}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:31, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gatling3', position:{x:31, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gatling3.fbx'},
              {name:'Bush_04', position:{x:23.26587, y:2.219374, z:55.55122}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:21}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:12.0132, y:2.219374, z:34.96884}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Rock_09', position:{x:34.07621, y:-0.5731086, z:28.31383}, rotation:{x:0, y:0.2090696, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_09.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:11.6292, y:2.219374, z:41.85583}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Ground_Decal1', position:{x:15.55401, y:2.219484, z:32.3198}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal1.fbx'},
              {name:'Rock_17A', position:{x:21.53638, y:0.4681195, z:37.77431}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17A.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:19}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_08', position:{x:15.566, y:2.219374, z:30.26599}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Tree_Pine_3', position:{x:40.87134, y:2.219374, z:53.30627}, rotation:{x:0, y:-0.901445, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tree_06', position:{x:58.68488, y:2.222369, z:37.27127}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Tree_05', position:{x:57.28637, y:2.219374, z:45.52295}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Mushroom2B', position:{x:16.81247, y:2.219374, z:34.23526}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom2B.fbx'},
              {name:'Ground_Decal_grass1', position:{x:34.76907, y:2.246141, z:23.26494}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Rock_10', position:{x:21.86499, y:0.3564088, z:23.52949}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_10.fbx'},
              {name:'Brickwall_debris1', position:{x:39.13465, y:0.6216644, z:16.4301}, rotation:{x:0.1491546, y:0.5279613, z:0.107699}, scale:{x:1, y:1, z:1}, file:'Brickwall_debris1.fbx'},
              {name:'Tower_Base1_1', position:{x:39, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tower_Base1_1', position:{x:42, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tower_Base2_2', position:{x:34, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Ground_Decal_grass1', position:{x:38.76453, y:2.234265, z:15.45839}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Plasma_fx', position:{x:42.39117, y:5.427011, z:28.46629}, rotation:{x:-0.6644772, y:0.2418062, z:0.2418062}, scale:{x:1, y:1, z:1}, file:'Plasma_fx.fbx'},
              {name:'Barrel', position:{x:42.09863, y:5.424228, z:28.11737}, rotation:{x:0, y:0.3419656, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:41.92427, y:5.114677, z:27.90973}, rotation:{x:0, y:0.3419656, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:42, y:4.649603, z:28}, rotation:{x:0, y:0.3419656, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Plasma2', position:{x:42, y:4.649603, z:28}, rotation:{x:0, y:0.3419656, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Plasma2.fbx'},
              {name:'Rock_04', position:{x:17.65471, y:2.372553, z:16.00876}, rotation:{x:0.2088702, y:-0.02525142, z:0.05688359}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Wall_wood_el2', position:{x:42, y:2, z:26.35527}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Pine_1', position:{x:13.87428, y:2.219374, z:29.86259}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Rune_particle2', position:{x:21.7688, y:0.6096072, z:7.491907}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:21.7688, y:0.5892487, z:7.491907}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_05', position:{x:21.85682, y:0.468909, z:7.501287}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_05.fbx'},
              {name:'Rock_10', position:{x:36.73519, y:-0.4368083, z:15.54141}, rotation:{x:0.005652679, y:-0.1420028, z:0.004709202}, scale:{x:1, y:1, z:1}, file:'Rock_10.fbx'},
              {name:'Plant_04', position:{x:17.14332, y:2.219374, z:49.71584}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Ground_Decal_grass1', position:{x:33.63103, y:2.231713, z:43.12787}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Wall_wood_el2', position:{x:42.50996, y:2, z:14.11599}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Rock_17A', position:{x:38.5752, y:0.466378, z:26.29794}, rotation:{x:0, y:-0.4299504, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17A.fbx'},
              {name:'Rock_09', position:{x:25.09763, y:0.9839728, z:48.73582}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_09.fbx'},
              {name:'Fern1', position:{x:31.04482, y:2.219374, z:31.11518}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:41}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tree_01', position:{x:10.95893, y:2.219474, z:9.163513}, rotation:{x:0, y:0.755965, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_Pine_1', position:{x:11.41915, y:2.219374, z:46.94415}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Bush_01', position:{x:36.68662, y:2.253141, z:7.55699}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Tower_Base1_1', position:{x:27, y:2, z:16}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Rock_08', position:{x:47.61412, y:-0.3528814, z:16.16632}, rotation:{x:0, y:-0.8277473, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_08.fbx'},
              {name:'Tree_07', position:{x:57.70352, y:2.219374, z:25.2935}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_07.fbx'},
              {name:'Tree_01', position:{x:40.69334, y:2.219374, z:10.70779}, rotation:{x:0, y:0.9533463, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Rune_particle2', position:{x:21.70337, y:0.6095273, z:8.79645}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:21.70337, y:0.5891688, z:8.79645}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_04', position:{x:21.7914, y:0.4688292, z:8.80583}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_04.fbx'},
              {name:'Radar__signal', position:{x:42, y:5.542752, z:25}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:57.0413, y:57.0413, z:57.0413}, file:'Radar__signal.fbx'},
              {name:'Turret', position:{x:42, y:5.42399, z:25}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:42, y:4.649603, z:25.0046}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:0.01753116, y:0.01753116, z:0.01753116}, file:'Base.fbx'},
              {name:'Tow_Radar1', position:{x:42, y:4.649603, z:25}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Radar1.fbx'},
              {name:'Fence_elements2', position:{x:37.50482, y:2.223002, z:5.297556}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence_elements2.fbx'},
              {name:'Rock_04', position:{x:34.70493, y:2.25391, z:40.63242}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Bush_02', position:{x:52.6326, y:2.219374, z:47.9516}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tree_Pine_1', position:{x:10.01088, y:2.219374, z:17.00194}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:55.13583, y:2.219374, z:33.52755}, rotation:{x:0, y:-0.8635561, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Tree_Pine_2', position:{x:37.49269, y:3.413301, z:3.566554}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Rune_particle2', position:{x:34.00145, y:0.6095635, z:6.386515}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:34.00145, y:0.589205, z:6.386515}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_01', position:{x:34.08949, y:0.4688653, z:6.395895}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_01.fbx'},
              {name:'Tree_08', position:{x:55.5439, y:2.219374, z:26.62848}, rotation:{x:0, y:-0.9990138, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_08.fbx'},
              {name:'Tree_03', position:{x:31.17119, y:2.219626, z:54.41315}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Wall_wood_el2', position:{x:38.15724, y:2, z:12.1664}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Pine_1', position:{x:51.57026, y:2.219374, z:8.716775}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Barrel', position:{x:30.40603, y:5.713384, z:13.00902}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:30, y:5.414293, z:13}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:30, y:5, z:13}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Acid2', position:{x:30, y:5, z:13}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Acid2.fbx'},
              {name:'Ground_Decal2', position:{x:53.17965, y:2.219374, z:40.30138}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal2.fbx'},
              {name:'Barrier4', position:{x:47.7151, y:-0.9141601, z:22.24418}, rotation:{x:-0.03438283, y:0.7062704, z:-0.03438282}, scale:{x:1, y:1, z:1}, file:'Barrier4.fbx'},
              {name:'Bush_05', position:{x:15.6819, y:2.219405, z:28.84353}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Tree_Dead1', position:{x:55.90349, y:2.219374, z:50.40363}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Dead1.fbx'},
              {name:'Point_light', position:{x:35.55156, y:4.540659, z:27.27401}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Point_light.fbx'},
              {name:'Particle_Glow', position:{x:35.5462, y:4.788657, z:27.29081}, rotation:{x:3.090862E-08, y:0.7071068, z:0.7071068}, scale:{x:1, y:1, z:1}, file:'Particle_Glow.fbx'},
              {name:'Lantern1', position:{x:35.5462, y:2.616929, z:28.40181}, rotation:{x:0, y:1, z:0}, scale:{x:1, y:1, z:1}, file:'Lantern1.fbx'},
              {name:'Rock_17A', position:{x:22.06933, y:0.4686465, z:25.76122}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17A.fbx'},
              {name:'Rock_01', position:{x:39.69403, y:0.5050046, z:28.4721}, rotation:{x:-0.2029617, y:0.8589664, z:0.1881531}, scale:{x:1, y:1, z:1}, file:'Rock_01.fbx'},
              {name:'Bush_09', position:{x:49.48927, y:2.219374, z:7.282629}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'cannon3_turret', position:{x:14.00569, y:5.937072, z:41.99917}, rotation:{x:0, y:0.6764921, z:0}, scale:{x:1, y:1, z:1}, file:'cannon3_turret.fbx'},
              {name:'cannon3_base', position:{x:14, y:5, z:42}, rotation:{x:0, y:0.6764921, z:0}, scale:{x:1, y:1, z:1}, file:'cannon3_base.fbx'},
              {name:'Tow_Cannon3', position:{x:14, y:5, z:42}, rotation:{x:0, y:0.6764921, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Cannon3.fbx'},
              {name:'Tower_Base1_1', position:{x:30, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_01', position:{x:45.22893, y:2.483392, z:11.60109}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Ground_Decal_grass1', position:{x:31.15746, y:2.221578, z:14.87762}, rotation:{x:0, y:-0.6979458, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Mushroom2B', position:{x:50.7732, y:2.219374, z:35.48475}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom2B.fbx'},
              {name:'Barrel', position:{x:27, y:5.366715, z:22.77658}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:27, y:5.072978, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:27, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Machinegun3', position:{x:27, y:4.649603, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Machinegun3.fbx'},
              {name:'Ground_Decal_grass1', position:{x:31.15746, y:2.221578, z:11.28099}, rotation:{x:0, y:-0.6979458, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Fence1', position:{x:39.84122, y:2.227271, z:49.11945}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence1.fbx'},
              {name:'Tree_05', position:{x:28.45854, y:2.219374, z:53.4537}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Tree_03', position:{x:17.91404, y:3.56406, z:2.461902}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Tower_Base1_1', position:{x:28, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tree_Pine_1', position:{x:12.91066, y:2.219548, z:54.71473}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Bush_05', position:{x:18.76221, y:2.22371, z:6.998938}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Bush_02', position:{x:10.79107, y:2.219374, z:25.05135}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:47}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Pine_1', position:{x:8.257826, y:2.219374, z:19.45628}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:25}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tree_Small_01', position:{x:11.37041, y:2.219374, z:14.72818}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Small_01.fbx'},
              {name:'Tree_Pine_1', position:{x:49.0508, y:2.317874, z:4.780457}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:30.23728, y:2.219452, z:27.62882}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Fern1', position:{x:31.40009, y:2.288527, z:14.68009}, rotation:{x:0.2181133, y:0.7906619, z:-0.1238913}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Rock_06', position:{x:21.8107, y:0.7270353, z:36.46523}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'Tree_07', position:{x:41.61811, y:2.219374, z:55.56229}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_07.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_09', position:{x:18.88289, y:2.225846, z:12.06324}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'Tree_03', position:{x:42.78152, y:3.563786, z:1.806926}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Plant_05', position:{x:34.0042, y:2.236094, z:48.52757}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Bush_04', position:{x:44.26446, y:2.219374, z:10.55847}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Barrel', position:{x:35.94109, y:5.501619, z:41.91185}, rotation:{x:0, y:-0.9569225, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:35.93668, y:4.649603, z:41.90527}, rotation:{x:0, y:-0.9569225, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:36, y:4.649603, z:42}, rotation:{x:0, y:-0.9569225, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Rocket2_3', position:{x:36, y:4.649603, z:42}, rotation:{x:0, y:-0.9569225, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Rocket2_3.fbx'},
              {name:'Bush_06', position:{x:53.73428, y:2.219374, z:26.48386}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Bush_06', position:{x:47.9522, y:2.219374, z:56.62408}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Fern1', position:{x:52.09933, y:2.219374, z:26.63753}, rotation:{x:0, y:0, z:0}, scale:{x:1.069844, y:1.069844, z:1.069844}, file:'Fern1.fbx'},
              {name:'Bush_08', position:{x:52.99474, y:2.219374, z:21.41556}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Rock_03', position:{x:24.12653, y:1.091089, z:44.4278}, rotation:{x:0.3097389, y:0.7067018, z:0.1842828}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Tree_Pine_3', position:{x:42.57322, y:2.219374, z:51.72933}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Wall_wood_el2', position:{x:33, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_02', position:{x:52.97012, y:2.219374, z:24.96665}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Ground_Decal_grass1', position:{x:34, y:2, z:21}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_02', position:{x:54.02921, y:2.219392, z:18.40403}, rotation:{x:0, y:-0.9558472, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Tree_02', position:{x:8.664526, y:2.219374, z:8.074993}, rotation:{x:0, y:0.8643529, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_02.fbx'},
              {name:'Rock_04', position:{x:35.38285, y:0.9940969, z:39.72946}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_04.fbx'},
              {name:'Wall_wood_el2', position:{x:30, y:2, z:20.64875}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_02', position:{x:30.89407, y:2.22202, z:10.66433}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Plant_01', position:{x:50.58541, y:2.219374, z:29.90381}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_01.fbx'},
              {name:'Tower_Base1_1', position:{x:27, y:2, z:19}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Bush_08', position:{x:11.67236, y:2.219374, z:23.8941}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Tree_01', position:{x:7.048291, y:2.219374, z:40.38551}, rotation:{x:0, y:0.5844747, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_01', position:{x:12.93935, y:2.219374, z:6.730513}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Ground_Decal1', position:{x:46.26172, y:2.219374, z:12.78802}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal1.fbx'},
              {name:'Tree_01', position:{x:38.58911, y:2.063194, z:8.249887}, rotation:{x:0, y:-0.6214596, z:0}, scale:{x:1, y:0.7545891, z:1}, file:'Tree_01.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:29.21714, y:2.219374, z:51.13987}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Tower_Base1_1', position:{x:30, y:2, z:19}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Barrier4', position:{x:23.71009, y:-0.9141601, z:7.869187}, rotation:{x:-0.03438283, y:0.7062704, z:-0.03438282}, scale:{x:1, y:1, z:1}, file:'Barrier4.fbx'},
              {name:'Tree_01', position:{x:52.66526, y:2.219374, z:50.9545}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_05', position:{x:12.66089, y:2.219374, z:12.86552}, rotation:{x:0, y:0.9754811, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Bush_05', position:{x:26.8147, y:2.2297, z:49.00241}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_05.fbx'},
              {name:'Barrel', position:{x:26.20053, y:5.198807, z:15.87057}, rotation:{x:0, y:-0.7659955, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:27, y:4.916687, z:16}, rotation:{x:0, y:-0.7659955, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:27, y:4.649603, z:16}, rotation:{x:0, y:-0.7659955, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Laser2', position:{x:27, y:4.649603, z:16}, rotation:{x:0, y:-0.7659955, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Laser2.fbx'},
              {name:'Tower_Base2_2', position:{x:28, y:2, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Tower_Base2_2', position:{x:25, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Bush_03', position:{x:49.27852, y:2.22397, z:32.96773}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Rock_08', position:{x:48.22684, y:0.1106071, z:15.89451}, rotation:{x:0, y:0.268138, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_08.fbx'},
              {name:'Ground_Decal_grass1', position:{x:32.01295, y:2.232708, z:40.91713}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Barrel', position:{x:33.00393, y:5.713386, z:22.3336}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:33, y:5.472018, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:33.00471, y:5, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Acid1', position:{x:33, y:5, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Acid1.fbx'},
              {name:'Tree_06', position:{x:43.64312, y:2.229929, z:5.105195}, rotation:{x:0, y:0.1972188, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Tesla_glow', position:{x:25, y:6.558786, z:42}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_glow.fbx'},
              {name:'Tesla_part', position:{x:25, y:6.434398, z:42}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_part.fbx'},
              {name:'Tesla_glow_up', position:{x:25, y:4.7939, z:42}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_glow_up.fbx'},
              {name:'Tow_Tesla2', position:{x:25, y:4.649603, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Tesla2.fbx'},
              {name:'Rock_03', position:{x:24.3623, y:2.206182, z:35.56136}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Barrier2', position:{x:23.74555, y:-1.38304, z:10.94811}, rotation:{x:0.02133281, y:0.6951848, z:0.08862443}, scale:{x:1, y:1, z:1}, file:'Barrier2.fbx'},
              {name:'Tree_05', position:{x:9.66565, y:2.219657, z:31.63008}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Tesla_part', position:{x:34, y:6.513144, z:30}, rotation:{x:0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_part.fbx'},
              {name:'Tesla_glow_up', position:{x:34, y:4.787828, z:30}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_glow_up.fbx'},
              {name:'Tesla_glow', position:{x:34, y:6.024789, z:30}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tesla_glow.fbx'},
              {name:'Tow_Tesla3', position:{x:34, y:4.649603, z:30}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Tesla3.fbx'},
              {name:'Barrel', position:{x:34.75939, y:5.395753, z:34.814}, rotation:{x:0, y:0.3633067, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:34.11462, y:5.149868, z:33.77064}, rotation:{x:0, y:0.3633067, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:34, y:4.649603, z:34}, rotation:{x:0, y:0.3633067, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gatling3', position:{x:34, y:4.649603, z:34}, rotation:{x:0, y:0.3633067, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gatling3.fbx'},
              {name:'Bush_08', position:{x:27.90981, y:2.219374, z:50.10251}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Wall_wood_el2', position:{x:14, y:2, z:22}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Dead1', position:{x:19.15926, y:2.219374, z:52.52843}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Dead1.fbx'},
              {name:'Barrel', position:{x:14.80839, y:5.235493, z:23.96822}, rotation:{x:0, y:0.7235603, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:14, y:4.934741, z:24}, rotation:{x:0, y:0.7235603, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:14, y:4.649603, z:24}, rotation:{x:0, y:0.7235603, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Laser1', position:{x:14, y:4.649603, z:24}, rotation:{x:0, y:0.7235603, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Laser1.fbx'},
              {name:'Rock_17B', position:{x:29.25951, y:0.4568569, z:25.29676}, rotation:{x:0, y:-0.6573164, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_17B.fbx'},
              {name:'Plant_04', position:{x:49.75507, y:2.219374, z:30.99531}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Plant_05', position:{x:15.24441, y:2.233032, z:25.57169}, rotation:{x:0.07982188, y:0.1189229, z:-0.2374482}, scale:{x:1, y:1, z:1}, file:'Plant_05.fbx'},
              {name:'Tree_Fall1', position:{x:15.19614, y:2.219374, z:32.51351}, rotation:{x:0, y:0.9342186, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Fall1.fbx'},
              {name:'Ring', position:{x:25.01902, y:5.499756, z:34.01902}, rotation:{x:0, y:-0.5406408, z:0}, scale:{x:0.9799079, y:0.9799079, z:0.9799079}, file:'Ring.fbx'},
              {name:'Crystal', position:{x:25.0157, y:5.938908, z:30.00657}, rotation:{x:0, y:0.5406407, z:0}, scale:{x:1, y:1, z:1}, file:'Crystal.fbx'},
              {name:'Base', position:{x:25, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Crystal3', position:{x:25, y:4.649603, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Crystal3.fbx'},
              {name:'Bush_04', position:{x:18.46072, y:2.217443, z:5.774719}, rotation:{x:0, y:0.7476311, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Rune_particle2', position:{x:34.02972, y:0.6094945, z:9.030907}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle2.fbx'},
              {name:'Rune_particle1', position:{x:34.02972, y:0.5891359, z:9.030907}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_particle1.fbx'},
              {name:'Rune_03', position:{x:34.11775, y:0.4687963, z:9.040288}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rune_03.fbx'},
              {name:'Rock_14A', position:{x:36.17158, y:0.4948867, z:16.49003}, rotation:{x:0.1834008, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_14A.fbx'},
              {name:'Rock_07', position:{x:16.55383, y:1.212823, z:35.86364}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_07.fbx'},
              {name:'Fence3', position:{x:36.11477, y:2.227029, z:49.13111}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Fence3.fbx'},
              {name:'Bush_06', position:{x:13.48639, y:2.219374, z:14.40763}, rotation:{x:0, y:-0.8941506, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Ground_Decal_grass1', position:{x:49.10354, y:2.219374, z:21.13754}, rotation:{x:0, y:0.6261078, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_06', position:{x:15.64757, y:2.219374, z:13.34772}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Wall_wood_el2', position:{x:50, y:2, z:20}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_01', position:{x:27.80854, y:2.219374, z:8.907288}, rotation:{x:0, y:0.2401906, z:0}, scale:{x:1, y:0.6388658, z:1}, file:'Tree_01.fbx'},
              {name:'Rock_09', position:{x:40.25171, y:-0.7107317, z:25.47602}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_09.fbx'},
              {name:'Brickwall_debris2', position:{x:31.22508, y:0.4588261, z:37.05012}, rotation:{x:0, y:-0.9212947, z:0}, scale:{x:1, y:1, z:1}, file:'Brickwall_debris2.fbx'},
              {name:'Brickwall1', position:{x:44.08458, y:0.4992213, z:16.61344}, rotation:{x:-0.09381277, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Brickwall1.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:39}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Wall_wood_el2', position:{x:30, y:2, z:17.38291}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Point_light', position:{x:20.11853, y:4.151485, z:10.59221}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Point_light.fbx'},
              {name:'Particle_Glow', position:{x:20.10173, y:4.399483, z:10.58685}, rotation:{x:-0.5000001, y:0.5000001, z:0.5000001}, scale:{x:1, y:1, z:1}, file:'Particle_Glow.fbx'},
              {name:'Lantern1', position:{x:18.99073, y:2.227755, z:10.58685}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Lantern1.fbx'},
              {name:'Bush_09', position:{x:52.18301, y:2.219374, z:57.10674}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'Wall_wood_el2', position:{x:40.43251, y:2, z:22}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Wall_wood_el2', position:{x:50, y:2, z:39}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Pine_2', position:{x:6.416407, y:2.219374, z:18.97066}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_2.fbx'},
              {name:'Ground_Decal_grass1', position:{x:30.68311, y:2.235648, z:28.85916}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_Pine_1', position:{x:43.96115, y:2.219374, z:52.66642}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Bush_08', position:{x:41.55315, y:2.219374, z:33.93857}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Mushroom3A', position:{x:18.5065, y:2.219374, z:49.50971}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom3A.fbx'},
              {name:'Wall_wood_el2', position:{x:42, y:2, z:23.65965}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Bush_06', position:{x:50.33487, y:2.219374, z:46.75234}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Tree_Pine_1', position:{x:54.31087, y:2.219563, z:42.31554}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:31.15746, y:2.221578, z:18.00078}, rotation:{x:0, y:0.7223665, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Barrel', position:{x:30.91719, y:5.415553, z:15.96922}, rotation:{x:0, y:0.7188689, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:29.90694, y:5.149868, z:15.94677}, rotation:{x:0, y:0.7188689, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:30, y:4.649603, z:16}, rotation:{x:0, y:0.7188689, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gatling1', position:{x:30, y:4.649603, z:16}, rotation:{x:0, y:0.7188689, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gatling1.fbx'},
              {name:'Tree_Small_01', position:{x:10.1983, y:2.219374, z:44.03072}, rotation:{x:0, y:0.6797448, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Small_01.fbx'},
              {name:'Tree_07', position:{x:27.438, y:2.399932, z:4.566387}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_07.fbx'},
              {name:'Ground_Decal_grass1', position:{x:21.38166, y:2.22678, z:49.1431}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:37.86808, y:2.219905, z:48.65077}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Tree_01', position:{x:20.95023, y:2.219491, z:54.80719}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_01.fbx'},
              {name:'Tree_03', position:{x:6.258781, y:2.219374, z:37.76218}, rotation:{x:0, y:0.6979625, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Tree_05', position:{x:49.70093, y:2.219374, z:51.7147}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Mushroom3B', position:{x:15.99333, y:2.219374, z:31.19522}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom3B.fbx'},
              {name:'Tree_02', position:{x:9.480206, y:2.219667, z:24.35873}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_02.fbx'},
              {name:'Sparks', position:{x:22.72112, y:7.088695, z:31.95761}, rotation:{x:-0.7071068, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Sparks.fbx'},
              {name:'Wall_wood_el2', position:{x:21, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Tree_Pine_1', position:{x:53.15076, y:2.219374, z:29.82488}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Tree_03', position:{x:14.79717, y:2.219418, z:9.926772}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_03.fbx'},
              {name:'Bush_08', position:{x:18.92379, y:2.226825, z:9.417194}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Rock_03', position:{x:33.24317, y:1.901838, z:35.73496}, rotation:{x:0.1835252, y:-0.04710591, z:0.2668403}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'Plant_03', position:{x:50.77721, y:2.219641, z:31.93808}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_03.fbx'},
              {name:'Column3A', position:{x:23.46369, y:0.3762661, z:5.20672}, rotation:{x:-0.01524666, y:0.7087543, z:-0.0572949}, scale:{x:1, y:1, z:1}, file:'Column3A.fbx'},
              {name:'Rock_13', position:{x:28.35004, y:-0.7172396, z:23.43374}, rotation:{x:0, y:-0.2616052, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_13.fbx'},
              {name:'Tree_Pine_1', position:{x:55.31425, y:2.219374, z:31.18293}, rotation:{x:0, y:-0.5386303, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Ground_Decal_grass1', position:{x:36.75611, y:2.221578, z:12.40425}, rotation:{x:0, y:-0.6979458, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Plant_02', position:{x:23.92257, y:2.210997, z:20.535}, rotation:{x:0, y:0.4078336, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_02.fbx'},
              {name:'Bush_01', position:{x:17.89536, y:2.219374, z:10.42981}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Ground_Decal_grass1', position:{x:40.64562, y:2.219374, z:25.07062}, rotation:{x:0, y:-0.6977898, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Wall_wood_el2', position:{x:30, y:2, z:14.31291}, rotation:{x:0, y:0.7071068, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Rock_01', position:{x:39.868, y:0.9294593, z:27.42637}, rotation:{x:-0.05204933, y:-0.1884794, z:0.1916223}, scale:{x:1, y:1, z:1}, file:'Rock_01.fbx'},
              {name:'Trunk_01', position:{x:36.65331, y:2.219374, z:50.6183}, rotation:{x:0, y:0, z:0}, scale:{x:2.629081, y:2.629081, z:2.629081}, file:'Trunk_01.fbx'},
              {name:'Tree_04', position:{x:54.98333, y:2.219384, z:53.76131}, rotation:{x:0, y:-0.4791336, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_04.fbx'},
              {name:'Barrel', position:{x:48.99828, y:5.729453, z:38.02794}, rotation:{x:0, y:-0.6972522, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:50, y:5.064711, z:38}, rotation:{x:0, y:-0.6972522, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:50, y:4.649603, z:38}, rotation:{x:0, y:-0.6972522, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Gauss3', position:{x:50, y:4.649603, z:38}, rotation:{x:0, y:-0.6972522, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Gauss3.fbx'},
              {name:'Rock_13', position:{x:35.30901, y:-0.3186314, z:28.3538}, rotation:{x:0, y:-0.9199589, z:0}, scale:{x:0.8534315, y:0.8534315, z:0.8534315}, file:'Rock_13.fbx'},
              {name:'Bush_06', position:{x:50.89059, y:2.219374, z:33.03931}, rotation:{x:0, y:-0.9483371, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_06.fbx'},
              {name:'Tower_Base1_1', position:{x:14, y:2, z:27}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Plant_01', position:{x:11.78136, y:2.219374, z:37.25356}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_01.fbx'},
              {name:'Bush_04', position:{x:31.91508, y:2.219627, z:51.08269}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Tree_01', position:{x:55.28964, y:2.219485, z:24.16973}, rotation:{x:0, y:-0.4510876, z:0}, scale:{x:1, y:0.7074339, z:1}, file:'Tree_01.fbx'},
              {name:'Bush_03', position:{x:53.777, y:2.219374, z:34.89268}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Tree_Pine_3', position:{x:53.24296, y:2.219418, z:31.57274}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_3.fbx'},
              {name:'Tower_Base2_2', position:{x:28, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Plant_03', position:{x:41.58121, y:2.219374, z:52.22284}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_03.fbx'},
              {name:'Ground_Decal3', position:{x:37.98417, y:2.219374, z:50.77919}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal3.fbx'},
              {name:'Bush_08', position:{x:28.79209, y:2.219374, z:10.24722}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_08.fbx'},
              {name:'Wall_wood_el2', position:{x:41, y:2, z:42}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Wall_wood_el2.fbx'},
              {name:'Ground_Decal_Leaves1', position:{x:53.69444, y:2.219374, z:44.42318}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_Leaves1.fbx'},
              {name:'Bush_04', position:{x:41.10356, y:2.219374, z:51.05999}, rotation:{x:0, y:-0.9663943, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Tower_Base2_2', position:{x:31, y:2, z:34}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base2_2.fbx'},
              {name:'Bush_09', position:{x:7.454474, y:2.219374, z:33.53709}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_09.fbx'},
              {name:'Tree_05', position:{x:17.04176, y:2.224582, z:5.253674}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Plasma_fx', position:{x:29.55304, y:5.427011, z:22.59116}, rotation:{x:-0.670386, y:-0.224906, z:-0.224906}, scale:{x:1, y:1, z:1}, file:'Plasma_fx.fbx'},
              {name:'Barrel', position:{x:29.88621, y:5.424228, z:22.15}, rotation:{x:0, y:-0.3180651, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:30.0726, y:5.120183, z:21.90398}, rotation:{x:0, y:-0.3180651, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:29.91786, y:4.649603, z:22.10864}, rotation:{x:0, y:-0.3180651, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Plasma3', position:{x:30, y:4.649603, z:22}, rotation:{x:0, y:-0.3180651, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Plasma3.fbx'},
              {name:'Bush_03', position:{x:49.22781, y:2.219374, z:48.62357}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_03.fbx'},
              {name:'Fern1', position:{x:41.53629, y:2.223025, z:19.42061}, rotation:{x:0.1067524, y:0.1283447, z:-0.1240086}, scale:{x:1, y:1, z:1}, file:'Fern1.fbx'},
              {name:'Tower_Base1_1', position:{x:50, y:2, z:28}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Tower_Base1_1.fbx'},
              {name:'Tree_06', position:{x:54.42642, y:2.219634, z:57.41839}, rotation:{x:0, y:0.9998423, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_06.fbx'},
              {name:'Tree_05', position:{x:38.61719, y:3.56406, z:2.270419}, rotation:{x:0, y:0.2153942, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Barrier2', position:{x:47.75055, y:-1.38304, z:25.3231}, rotation:{x:0.02133281, y:0.6951848, z:0.08862443}, scale:{x:1, y:1, z:1}, file:'Barrier2.fbx'},
              {name:'Bush_01', position:{x:13.04853, y:2.219374, z:34.14119}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_01.fbx'},
              {name:'Tree_Pine_1', position:{x:57.8774, y:2.219374, z:48.98305}, rotation:{x:0, y:-0.3117353, z:0}, scale:{x:1, y:1, z:1}, file:'Tree_Pine_1.fbx'},
              {name:'Tree_01', position:{x:51.05657, y:1.891421, z:14.04264}, rotation:{x:0, y:0.991856, z:0}, scale:{x:1, y:0.8430625, z:1}, file:'Tree_01.fbx'},
              {name:'Bush_02', position:{x:43.27958, y:2.219629, z:9.581757}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_02.fbx'},
              {name:'Barrel', position:{x:14.40936, y:5.713387, z:38.95807}, rotation:{x:0, y:0.7397427, z:0}, scale:{x:1, y:1, z:1}, file:'Barrel.fbx'},
              {name:'Turret', position:{x:14, y:5.407421, z:39}, rotation:{x:0, y:0.7397427, z:0}, scale:{x:1, y:1, z:1}, file:'Turret.fbx'},
              {name:'Base', position:{x:14, y:5, z:39}, rotation:{x:0, y:0.7397427, z:0}, scale:{x:1, y:1, z:1}, file:'Base.fbx'},
              {name:'Tow_Acid3', position:{x:14, y:5, z:39}, rotation:{x:0, y:0.7397427, z:0}, scale:{x:1, y:1, z:1}, file:'Tow_Acid3.fbx'},
              {name:'Tree_05', position:{x:57.71155, y:2.219374, z:14.42737}, rotation:{x:0, y:0.8911583, z:0}, scale:{x:1, y:0.7169965, z:1}, file:'Tree_05.fbx'},
              {name:'Mushroom2A', position:{x:15.22015, y:2.219374, z:34.39145}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Mushroom2A.fbx'},
              {name:'Plant_04', position:{x:51.24858, y:2.219374, z:45.69904}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Plant_04.fbx'},
              {name:'Ground_Decal_grass1', position:{x:25.32173, y:2.221786, z:28.99434}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Ground_Decal_grass1.fbx'},
              {name:'Bush_04', position:{x:29.81976, y:2.219294, z:37.6304}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Bush_04.fbx'},
              {name:'Rock_03', position:{x:38.87757, y:0.5796653, z:44.3073}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Rock_03.fbx'},
              {name:'GameObject', position:{x:18.36, y:4.994406, z:13.03}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'GameObject.fbx'},
           //   {name:'Terrain', position:{x:0, y:0, z:0}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'Terrain.fbx'},
           //   {name:'Camera', position:{x:31.02809, y:17.6079, z:27.31304}, rotation:{x:0.1569661, y:0.8270774, z:-0.4600944}, scale:{x:1, y:1, z:1}, file:'Camera.fbx'},
           //   {name:'GameObject_(2)', position:{x:41.23, y:4.994406, z:13.03}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'GameObject_(2).fbx'},
           //   {name:'GameObject_(1)', position:{x:18.36, y:4.994406, z:32.55}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'GameObject_(1).fbx'},
              {name:'_Directional_light', position:{x:72.51683, y:20.6079, z:-2.570107}, rotation:{x:0.2097905, y:-0.8866252, z:0.3046266}, scale:{x:1, y:1, z:1}, file:'_Directional_light.fbx'},
           //   {name:'Plane', position:{x:35, y:0, z:33}, rotation:{x:0, y:0, z:0}, scale:{x:13.7444, y:13.7444, z:13.7444}, file:'Plane.fbx'},
              {name:'Rock_06', position:{x:36.01299, y:1.679975, z:40.11392}, rotation:{x:0.1556154, y:0.6159444, z:0.04274729}, scale:{x:1, y:1, z:1}, file:'Rock_06.fbx'},
              {name:'GameObject_(3)', position:{x:41.23, y:4.994406, z:32.55}, rotation:{x:0, y:0, z:0}, scale:{x:1, y:1, z:1}, file:'GameObject_(3).fbx'},
              
            ];
        }

        var foliageModels = [];
        var currentModelCount = 0;
        
        if (map.type.includes("FIRSTMAP")) {
          var modelsCount = assetNames.length;
          assetNames.filter((asset) => {
            if(asset.name.includes('light') || asset.name.includes('Tow') || asset.name.includes('urret') || asset.name.includes('ase') || asset.name.includes('arr') || asset.name.includes('Wall') || asset.name.includes('grass') || asset.name.includes('Rock') || asset.name.includes('Brick') || asset.name.includes('Lanter')) {
                return false
            } else {
                return true
            }
            }).map((fbxobjct) => {
              try {
                fbxloader.load("../expmodels/" + fbxobjct.file, (model) => {
                      model.scale.copy({x:0.0045, y:0.0045, z:0.0045}); // 1.5625
                      model.rotation.copy(fbxobjct.rotation);
                      model.position.copy({x:(50-fbxobjct.position.x)*0.44, y:(fbxobjct.position.y*0.3)+1, z:(fbxobjct.position.z-12)*0.44});

                  var newmodel = {
                      animations: model.animations,
                      asset: { generator: "Khronos", version: "2.0" },
                      cameras: [],
                      parser: { },
                      scene:  model,
                      scenes:  [model],
                      userData:  {  },
                      }
                      


                      model.castShadow = false;
                      me.addToScene(model);
                    
                      foliageModels.push(newmodel);
                      currentModelCount++;


                  }, undefined, (error) => {
                      console.error(error);
                  });
              } catch (err) {
                console.error(fbxobjct.file);
              }
          });
          
        } else {
          const paths = getModelsPaths(assetNames, map.type);
          var modelsCount = paths.length;
          
          if (map.type.includes("FBX")) {
            paths.forEach(path => {
              fbxloader.load(path.replace('.json','.fbx'), function (model) {
                  var newmodel = {
                      animations: model.animations,
                      asset: { generator: "Khronos", version: "2.0" },
                      cameras: [],
                      parser: { },
                      scene:  model,
                      scenes:  [model],
                      userData:  {  },
                      }
                  foliageModels.push(newmodel);

                  currentModelCount++;
                  if (currentModelCount == modelsCount) {
                      setFoliage()

                  }
              }, undefined, function (error) {
                  console.error(error);
              });

            });
              
          } else {
            paths.forEach(path => {
              loader.load(path, function (model) {
                  foliageModels.push(model);

                  currentModelCount++;
                  if (currentModelCount == modelsCount) {
                      setFoliage()

                  }
              }, undefined, function (error) {
                  console.error(error);
              });

            });
          }
        }
//         composer = new THREE.EffectComposer( renderer );
//         console.error("!!!!!!!!!!!!!!!!!!!!!!!!!")
//         const renderPass = new THREE.RenderPass( this.scene, this.camera );
//         composer.addPass( renderPass );
// 
//        const glitchPass = new THREE.GlitchPass();
//        composer.addPass( glitchPass );
        
//         const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.01, 1.02, 1.03 );
// 
// console.error(bloomPass.threshold);
// console.error(bloomPass.strength);
// console.error(bloomPass.radius);
// 
// 				composer.addPass( bloomPass );
// renderer.toneMappingExposure = Math.pow( 0.1, 4.0 );
//    this.scene.fog = new THREE.Fog(0xff0000, 1, 50);

    }
}

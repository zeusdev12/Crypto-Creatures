
THREE.Cache.enabled = true;
var cameraTargetPosition;

document.addEventListener("mousemove", onDocumentMouseMove, false);
document.addEventListener("pointerdown", onDocumentMouseDown, false);
document.addEventListener("keydown", onKeyDown, false);

var musicWasPlaying;
var isFocused = true;

window.onfocus = function () {
    isFocused = true;
    setMusicPlaying(musicWasPlaying)
}

window.onblur = function () {
    isFocused = false;
    musicWasPlaying = isPlayingMusic;
    setMusicPlaying(false)
}

const GridSize = 1;
var soundEffectsVolume = 1;
var isPlayingMusic = true;

var allTurretData = [];
var allEnemiesData = [];

var allSoundsBuffers = {};
var audioLoader = new THREE.AudioLoader();
var musicSound;

var audioListener;
var renderer;

var gameScene;

var mainMenuScene;

var currentScene;
var composer;
// changeScene(gameScene);
// gameScene.setMap('TowerDefence/assets/levels/level1.json')

towerInit();

function towerInit() {
    audioListener = new THREE.AudioListener();
    renderer = createRenderer();

    gameScene = new GameScene(createScene(), createCamera());
    gameScene.addToScene(createLight());

    mainMenuScene = new MainMenuScene(createScene(), createCamera());
    mainMenuScene.addToScene(createLight());

    currentScene = mainMenuScene;
    // changeScene(gameScene);
    // gameScene.setMap('TowerDefence/assets/levels/level1.json')

    changeScene(mainMenuScene);

    loadModels(() => {
        console.log("objects loaded")
        mainMenuScene.loadModels();
        gameScene.loadModels();
    });

    audioLoader.load('TowerDefence/assets/sounds/music/Upbeat Forever.mp3', function (buffer) {
        console.log("Music Loaded");
        musicSound = new THREE.Audio(audioListener);
        musicSound.setBuffer(buffer);
        musicSound.setLoop(true);
        musicSound.setVolume(0.5);
        if (isFocused) {
            musicSound.play();
        }
    });
    
//    composer = new THREE.EffectComposer( renderer );
//    const composer = new THREE.EffectComposer( renderer );

//    const renderPass = new THREE.RenderPass( currentScene.scene, currentScene.camera );
//    composer.addPass( renderPass );
//     const glitchPass = new THREE.GlitchPass();
//     composer.addPass( glitchPass );
    
    
    
    animate((time) => {
        renderer.render(currentScene.scene, currentScene.camera);
//        composer.render();

    });
}

function onDocumentMouseMove(event) {
    if (currentScene.eventListeners["mousemove"]) {
        currentScene.eventListeners["mousemove"](event);
    }
}

function onDocumentMouseDown(event) {
    if (currentScene.eventListeners["pointerdown"]) {
        currentScene.eventListeners["pointerdown"](event);
    }
}

function onKeyDown(event) {
    if (currentScene.eventListeners["keydown"]) {
        currentScene.eventListeners["keydown"](event);
    }
}

function changeScene(scene) {
    if (currentScene) {
        currentScene.sceneLeave();
    }
    currentScene = scene;
    currentScene.sceneEnter();
    renderer.clear(false, true, false);
}

function toggleMusicPlay() {
    setMusicPlaying(!isPlayingMusic)
}

function setMusicPlaying(playing) {
    if (!musicSound) {
        return
    }
    isPlayingMusic = playing;
    if (isPlayingMusic) {
        musicSound.play();
    } else {
        musicSound.pause();
    }
}

function playSoundEffect(soundBuffer, loop = false) {

    if (currentScene == mainMenuScene) {
        return;
    }

    if (soundEffectsVolume > 0) {
        var sound = new THREE.Audio(audioListener);
        sound.setBuffer(soundBuffer);
        sound.setLoop(loop);
        sound.setVolume(soundEffectsVolume * 0.1);
        sound.play();
    }
}

function loadModels(onAllModelsLoaded) {
    loader = new THREE.GLTFLoader();
    fbxloader = new THREE.FBXLoader();

    var assetsCount = audioData.length;
    currentCount = 0;

    audioData.forEach(data => {
        audioLoader.load(data.path, function (buffer) {
            allSoundsBuffers[data.name] = buffer;

            currentCount++;
            if (currentCount == assetsCount) {
                loadMeshes();
            }
        });
    });

    function loadMeshes() {
        assetsCount = turretData.length + enemiesData.length;
        currentCount = 0;

        var assets = {};

        loadEntityData(turretData, allTurretData);
        loadEntityData(enemiesData, allEnemiesData);

        function loadEntityData(array, otherArray) {
            array.forEach(data => {
                if (assets[data.assetPath]) {
                    addData(otherArray, data, assets[data.assetPath]);
                }
                else if (data.type === 0) {
                    fbxloader.load(data.assetPath, function (model) {
                        if (data.meshSize) { model.scale.set(data.meshSize, data.meshSize, data.meshSize) }
                        var newmodel = {
                            animations: model.animations,
                            asset: { generator: "Khronos", version: "2.0" },
                            cameras: [],
                            parser: { },
                            scene:  model,
                            scenes:  [model],
                            userData:  {  },
                         }
                        assets[data.assetPath] = newmodel;
                        addData(otherArray, data, newmodel);
                    }, undefined, function (error) {
                        console.error(error);
                    });
                    
                } else {
                    loader.load(data.assetPath, function (model) {
                        assets[data.assetPath] = model;
                        addData(otherArray, data, model);

                    }, undefined, function (error) {
                        console.error(error);
                    });
                }
            });
        }

        function addData(vector, data, model) {
            var effects = {};
            data.soundEffects.forEach(element => {
                effects[element.action] = allSoundsBuffers[element.name];
            });

            vector.push(new EntityData(data, model, effects));
            currentCount++;
            if (currentCount == assetsCount) {
                if (onAllModelsLoaded) {
                    onAllModelsLoaded();
                }
            }
        }
    }
}

function createRenderer() {
    const app = document.getElementById("app");
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    app.appendChild(renderer.domElement);

    renderer.gammaOutput = true
    renderer.shadowMap.enabled = false;
    renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
//renderer.toneMappingExposure = 1.25;
return renderer;
}

function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
   // scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
  //  scene.fog = new THREE.Fog(0xff0000, 1, 50);

    return scene;
}

function createCamera() {
//camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
//     camera.position.z = 3500;
//     camera.position.y = 900;
//     camera.position.x = 500;
//     camera.rotation.x = 0;
//        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
//        camera.position.set( 0, 50, 0 );
  //  camera.position.z = 15;
  //  camera.position.y = 12;
    camera.position.z = 17;
    camera.position.y = 24;
 //   camera.lookAt({x:0, y:0, z:0})
//    camera.fov = 20;
    camera.position.x = 21;
//    camera.rotation.x = Math.PI / 4;
  return camera;
}

function createLight() {
    const light = new THREE.PointLight(0xffffff, 3, 20);
    light.position.set(7, 7, 7);
    return light;
}

function animate(callback) {
    var deltaTime = 0.0;
    var lastTime = 0.0;
    function loop(time) {
        callback(time);
        deltaTime = (time - lastTime) * 0.001;
        lastTime = time;

        currentScene.update(deltaTime);

        requestAnimationFrame(loop);

    }
    requestAnimationFrame(loop);
}

function createCube({ color, x, y }) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshLambertMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, 1, y);

    return cube;
}

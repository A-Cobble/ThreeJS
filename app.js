//Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/styling/images/Earth.jpg")
//Canvas
const canvas= document.querySelector('canvas.webg1');

//Scene
const scene = new THREE.Scene();

//Debug
// const gui = new dat.GUI();

//Object
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 64, 64)

//Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

//Mesh
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere)

//Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x0000ff, 2);
// pointLight2.position.x = 2;
// pointLight2.position.y = 3;
// pointLight2.position.z = 4;
pointLight2.position.set(0,0,0);
pointLight2.intensity = 30;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xff0000, 2);
pointLight3.position.set(-1.86,1,-1.5);
pointLight3.intensity = 10;
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0x00ffff, 2);
pointLight4.position.set(1.86,-1,-1.5);
pointLight4.intensity = 10;
scene.add(pointLight4);

//Sizes
const sizes = {width: window.innerWidth, height: window.innerHeight};

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.aspect = sizes.width / sizes.heightcamera.updateProjectionMatrix();

    //Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

//Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Animate

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX= window.innerWidth / 2;
const windowY= window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);
}

const clock = new THREE.Clock();

const tick = () => {

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    //Update objects
    sphere.rotation.y = 0.5 * elapsedTime;

    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
    sphere.position.z += -0.05 * (targetY - sphere.rotation.x);
    //Update Orbital Controls
    // controls.update()

    //Render
    renderer.render(scene, camera);
    

    //Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()

// document.body.appendChild(renderer.domElement);


// import "./style.css";

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);
// object
// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
//adding to the scene below

scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper( 200, 50 )
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement); // Listen to dom events on the mouse and update the camera pos accordingly

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
// Arra of 250 values and then for each value calls the addStar function
Array(250).fill().forEach(addStar);

// changes bg
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

// avatar

const aniTexture = new THREE.TextureLoader().load('ani.png')
const ani = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  //map prop on the material as a texture
  new THREE.MeshBasicMaterial({ map: aniTexture })
);
scene.add(ani);

//MOOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const imageTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: imageTexture })
);
scene.add(moon);
// Repostionisng moon to further down of z axis as that is the direction of scroll
moon.position.z = 30;
moon.position.setX(-10);

ani.position.z = -5;
ani.position.x = 2;

// scroll Animation

function moveCamera() {
  // top prop here shows how far we are from the top of the webpage
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  ani.rotation.y += 0.01;
  ani.rotation.z += 0.01;

  camera.rotation.z = t * -0.01;
  camera.rotation.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
// fire the func when scrolled
document.body.onscroll = moveCamera;
moveCamera(); // thr func is assigned as the event handler for the document body on scroll event

// Animation

// renderer.render( scene, camera );
// Alternate below
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01; // rotation along x axis
  torus.rotation.y += 0.005; // roatation along y axis
  torus.rotation.z += 0.01; // rotation on z axis

  moon.rotation.x += 0.005;
  //controls.update();

  renderer.render(scene, camera);
}

animate();

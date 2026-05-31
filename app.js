import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'https://unpkg.com/three@0.165.0/examples/jsm/controls/DragControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(5, 5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("viewport")
    .appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 10, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 1));

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial()
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const draggableObjects = [];

let dragControls =
    new DragControls(
        draggableObjects,
        camera,
        renderer.domElement
    );

window.addPart = function(type) {

    let geometry;

    switch(type) {

        case "motor":
            geometry = new THREE.CylinderGeometry(0.3,0.3,1);
            break;

        case "gear":
            geometry = new THREE.CylinderGeometry(0.5,0.5,0.15,24);
            break;

        case "wheel":
            geometry = new THREE.CylinderGeometry(0.6,0.6,0.4,32);
            break;

        case "tube":
            geometry = new THREE.BoxGeometry(1,0.2,0.2);
            break;

        case "plate":
            geometry = new THREE.BoxGeometry(1,0.1,1);
            break;
    }

    const part = new THREE.Mesh(
        geometry,
        new THREE.MeshStandardMaterial()
    );

    part.position.y = 0.5;

    scene.add(part);
    draggableObjects.push(part);

    dragControls.dispose();

    dragControls = new DragControls(
        draggableObjects,
        camera,
        renderer.domElement
    );
};

function animate() {

    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();
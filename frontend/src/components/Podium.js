import React from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function Podium(props) {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls( camera, renderer.domElement );

	camera.position.set(20,0,20);
	controls.update();

	let ambientLight = new THREE.AmbientLight( 0xffffff);
	scene.add( ambientLight );



	const loader = new GLTFLoader();

	loader.load("static/models/Breaker.glb", gltf => {
			gltf.scene.scale.set(2,2,2)
			gltf.scene.position.set(0,0,0)
			scene.add(gltf.scene);
		},
			xhr => {
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		},error => {
			console.error(error);
		}
	)

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}

	return (
		<div className="three">{animate()}</div>	
		);
}

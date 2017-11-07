/**
 * Created by Administrator on 2017/11/4/004.
 */

import * as THREE from 'three';
var renderer,width,height;
function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias : false
  });
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1000;
}

var scene;
function initScene() {
  scene = new THREE.Scene();
}

var light;
function initLight() {
  light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
  light.position.set(100, 100, 200);
  scene.add(light);
}

var cube;
function initObject() {

  var geometry = new THREE.Geometry();
  // 不使用顶点的颜色就会使用color的颜色
  var material = new THREE.LineBasicMaterial( { vertexColors: true } );
  var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );
  var color3 = new THREE.Color( 0x00FF00 );

  // 线的材质可以由2点的颜色决定
  var p1 = new THREE.Vector3( -100, 0, 0 );
  var p2 = new THREE.Vector3(  100, 0, 0 );
  var p3 = new THREE.Vector3(  0, -100, 0 );
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.vertices.push(p3);
  geometry.vertices.push(p1);
  geometry.colors.push( color1, color2 ,color3,color3);

  var line = new THREE.Line( geometry, material, THREE.LineStrip);
  scene.add(line);
}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  renderer.clear();
  renderer.render(scene, camera);
}

window.onload=function () {
  threeStart();
}

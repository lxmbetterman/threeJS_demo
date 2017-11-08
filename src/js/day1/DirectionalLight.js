/**
 * Created by Administrator on 2017/11/9/009.
 */
import * as THREE from 'three';
import  DAT from "dat-gui"
console.log("xxx")

var renderer,width,height;
function initThree() {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer = new THREE.WebGLRenderer({
    antialias : true
  });
  renderer.setSize(width, height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(80, width / height, 1, 10000);
  camera.position.x = 300;
  camera.position.y = 0;
  camera.position.z = 600;

  var pointA = new THREE.Vector3( 0, 0, 0 );
  camera.lookAt(pointA)
  console.log(camera,"camera")
  /*camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  camera.lookAt({
    x : 0,
    y : 0,
    z : 0
  });*/
}

var scene;
function initScene() {
  scene = new THREE.Scene();
}

var light;
var lightPos;
var param;

function initLight() {
  var ParamObj = function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.intensity = 1;
    this.cx=300;
    this.cy=0;
    this.cz=600;
  };

  param = new ParamObj();
  var gui = new DAT.GUI();
  gui.add(param,"x",-10000,10000).name("方向光X的位置");
  gui.add(param,"y",-10000,10000).name("方向光Y的位置");
  gui.add(param,"z",-10000,10000).name("方向光Z的位置");
  gui.add(param,"intensity",0,1).name("方向光的强度");
  gui.add(param,"cx",-1000,1000).name("相机x位置");
  gui.add(param,"cy",-100,1000).name("相机y位置");
  gui.add(param,"cz",100,1000).name("相机z位置");

  light = new THREE.DirectionalLight(0xFF0000,param.intensity);
  light.position.set(param.x, param.y, param.z);
  scene.add(light);

}

var cube;
function initObject() {
  var geometry = new THREE.BoxGeometry( 100, 100, 50);
  var material = new THREE.MeshLambertMaterial( { color:0xFF0000} );
  var mesh = new THREE.Mesh( geometry,material);
  mesh.position.set(0,0,0);
  scene.add(mesh);


  /*var geometry = new THREE.CylinderGeometry( 200, 200, 100, 64 );
  var material = new THREE.MeshBasicMaterial({color:"blue"}) //这种材质的颜色不受光线影响

  /!*var geometry = new THREE.BoxBufferGeometry(2,2,2); //几何体
   var material = new THREE.MeshBasicMaterial({color:"blue"}) //材质*!/
  var mesh = new THREE.Mesh( geometry,material);
  console.log(mesh,"mesh")
  mesh.position.set(0,0,0);
  scene.add(mesh);*/

  var geometry2 = new THREE.BoxGeometry( 200, 100, 50);
  var material2 = new THREE.MeshLambertMaterial( { color:0xFF0000} );
  var mesh2 = new THREE.Mesh( geometry2,material2);
  mesh2.position.set(-300,0,0);
  scene.add(mesh2);

  var geometry3 = new THREE.BoxGeometry( 200, 100, 50);
  var material3 = new THREE.MeshLambertMaterial( { color:0xFF0000} );
  var mesh3 = new THREE.Mesh( geometry3,material3);
  mesh3.position.set(0,-150,0);
  scene.add(mesh3);

  var mesh4 = new THREE.Mesh( geometry3,material3);
  mesh4.position.set(0,150,0);
  scene.add(mesh4);

  var mesh5 = new THREE.Mesh( geometry3,material3);
  mesh5.position.set(300,0,0);
  scene.add(mesh5);

  var mesh6 = new THREE.Mesh( geometry3,material3);
  mesh6.position.set(0,0,-100);
  scene.add(mesh6);

}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  animation();
}

function animation()
{
  light.position.set(param.x, param.y, param.z);
  light.intensity = param.intensity;
  camera.position.set(param.cx, param.cy, param.cz)
  /*camera.lookAt({
    x : 0,
    y : 0,
    z : 0
  })*/
  renderer.clear();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

window.onload=function () {
  threeStart();
}

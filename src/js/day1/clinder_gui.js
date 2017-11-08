/**
 * Created by Administrator on 2017/11/5/005.
 */
import * as THREE from 'three';
import  DAT from "dat-gui"

var renderer,width,height;
function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias : true
  });
  renderer.setSize(width, height);
  renderer.setClearColor("#fff");
  document.getElementById('canvas-frame').appendChild(renderer.domElement);

}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
  //camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 10, 1000 );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 6;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
  /*camera.lookAt({
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
function initLight() {
  light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
  light.position.set(100, 100, 200);
  scene.add(light);
}

var cube;
function initObject() {
  var geometry = new THREE.CylinderGeometry( 2, 2, 2, 64 );
  var material = new THREE.MeshBasicMaterial({color:"blue"}) //这种材质的颜色不受光线影响

  /*var geometry = new THREE.BoxBufferGeometry(2,2,2); //几何体
  var material = new THREE.MeshBasicMaterial({color:"blue"}) //材质*/
  var mesh = new THREE.Mesh( geometry,material);
  console.log(mesh,"mesh")
   mesh.position.set(0,0,0);
  scene.add(mesh);
}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  createUI();
  animation();

}

var param;
function createUI()
{
  var ParamObj = function() {
    this.fov = 45;
    this.z=10
  };

  param = new ParamObj();
  var gui = new DAT.GUI();
  gui.add(param,"fov",0,180).name("视角大小");
  gui.add(param,"z",-10,200).name("相机z");
}

function animation()
{
  changeFov();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

function setCameraFov(fov,z)
{
  camera.fov = fov;
  camera.position.z=z
  camera.updateProjectionMatrix();
}

function changeFov()
{
  setCameraFov(param.fov,param.z);
}

window.onload=function () {
  threeStart();
}

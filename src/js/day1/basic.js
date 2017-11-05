/**
 * Created by Administrator on 2017/11/4/004.
 */
import * as THREE from 'three';
console.log(THREE);

var scene =new THREE.Scene();//场景

console.log(scene,"scene")

var camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000); //相机
var renderer = new THREE.WebGLRenderer();//渲染器
renderer.setSize(window.innerWidth,window.innerHeight);
console.log(renderer,"renderer")
renderer.setClearColor("#fff")
document.body.appendChild(renderer.domElement);


var geometry = new THREE.BoxBufferGeometry(2,2,2); //几何体
var material = new THREE.MeshBasicMaterial({color:"blue"}) //材质
var cube =new THREE.Mesh(geometry,material);//几何体+材质形成模型

scene.add(cube) //把模型添加到场景

camera.position.z=5;

function animate() {
  requestAnimationFrame(animate); //requestAnimationFrame 浏览器全局函数 一秒60zheng

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene,camera)  //调用渲染器的渲染，参数为场景和相机
}
animate();


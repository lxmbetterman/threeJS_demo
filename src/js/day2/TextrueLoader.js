/**
 * Created by Administrator on 2017/11/9/009.
 */
import * as THREE from 'three';
var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  //
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;
  scene = new THREE.Scene();


  var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
  // 纹理坐标怎么弄
  /*var texture = THREE.ImageUtils.loadTexture(,null,function(t)
  {
  });
  var material = new THREE.MeshBasicMaterial({map:texture});
  var mesh = new THREE.Mesh( geometry,material );
  scene.add( mesh );*/
  var loader = new THREE.TextureLoader();


  loader.load(
    // resource URL
    '/img/a.jpg',
    // Function when resource is loaded
    function ( texture ) {
      console.log("done")
      // in this example we create the material when the texture is loaded
      var material = new THREE.MeshBasicMaterial( {
        map: texture
      } );

      var mesh = new THREE.Mesh( geometry,material );
      scene.add( mesh );
    },
    // Function called when download progresses
    function ( xhr ) {
      console.log("doing")
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.error( 'An error happened' );
    }
  );

  //
  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

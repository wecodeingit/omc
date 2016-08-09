'use strict';

var $ = require('jquery');
var THREE = require('THREE');
var earthmap1k = require('img/earthmap1k.jpg');
var earthbump1k = require('img/earthbump1k.jpg');
var earthspec1k = require('img/earthspec1k.jpg');
var starfield = require('img/starfield.png');
module.exports = {
    init: function() {


        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        $('#earthCanvas').append(renderer.domElement);

        var onRenderFcts = [];
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.z = 4;

        var ambientLight = new THREE.AmbientLight(0x888888);
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xcccccc, 0.3);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        //////////////////////////////////////////////////////////////////////////////////
        //      add an object and make it move                  //
        //////////////////////////////////////////////////////////////////////////////////

        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshPhongMaterial();
        var earthMesh = new THREE.Mesh(geometry, material);
        scene.add(earthMesh);
        material.map = THREE.ImageUtils.loadTexture(earthmap1k);
        material.bumpMap = THREE.ImageUtils.loadTexture(earthbump1k);
        material.bumpScale = 0.05;
        material.specularMap = THREE.ImageUtils.loadTexture(earthspec1k);
        material.specular = new THREE.Color('grey');

        var earthPivot = new THREE.Object3D();
        earthMesh.add(earthPivot);

        var coneGeometry = new THREE.ConeGeometry(0.1, 0.05, 10, 1, false, 0, 6.3);
        var MeshBasicMaterialYellow = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var satellite = new THREE.Mesh(coneGeometry, MeshBasicMaterialYellow);

        satellite.translateX(1);
        satellite.rotateZ(1.5);
        earthPivot.add(satellite);

        onRenderFcts.push(function(delta, now) {
            earthMesh.rotateY(1 / 4 * delta);
            earthPivot.rotateY(1 / 2 * delta);
        });

        //////////////////////////////////////////////////////////////////////////////////
        //      add star field                          //
        //////////////////////////////////////////////////////////////////////////////////

        var sphereGeometry = new THREE.SphereGeometry(90, 32, 32);
        var meshBasicMaterial = new THREE.MeshBasicMaterial();
        meshBasicMaterial.map = THREE.ImageUtils.loadTexture(starfield);
        meshBasicMaterial.side = THREE.BackSide;
        var mesh = new THREE.Mesh(sphereGeometry, meshBasicMaterial);
        scene.add(mesh);

        //////////////////////////////////////////////////////////////////////////////////
        //      Camera Controls                         //
        //////////////////////////////////////////////////////////////////////////////////
        var mouse = { x: 0, y: 0 };
        document.addEventListener('mousemove', function(event) {
            mouse.x = (event.clientX / window.innerWidth) - 0.5;
            mouse.y = (event.clientY / window.innerHeight) - 0.5;
        }, false);
        onRenderFcts.push(function(delta, now) {
            camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3);
            camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3);
            camera.lookAt(scene.position);
        });

        //////////////////////////////////////////////////////////////////////////////////
        //      render the scene                        //
        //////////////////////////////////////////////////////////////////////////////////
        onRenderFcts.push(function() {
            renderer.render(scene, camera);
        });

        //////////////////////////////////////////////////////////////////////////////////
        //      loop runner                         //
        //////////////////////////////////////////////////////////////////////////////////
        var lastTimeMsec = null;
        requestAnimationFrame(function animate(nowMsec) {
            // keep looping
            requestAnimationFrame(animate);
            // measure time
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;
            // call each update function
            onRenderFcts.forEach(function(onRenderFct) {
                onRenderFct(deltaMsec / 1000, nowMsec / 1000);
            });
        });

    }
};

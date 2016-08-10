'use strict';

var $ = require('jquery');
var THREE = require('three');
var earthMap = require('img/earthMap.jpg');
var earthSpecularMap = require('img/earthSpecularMap.jpg');
var starfield = require('img/starfield.png');
var satelliteImage = require('img/satelliteImage.png');
module.exports = {

    init: function(customizedOptions) {
        var percentage_of_window_size = 0.5;
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;
        var canvas_width = window_width * percentage_of_window_size;
        var canvas_height = window_height * percentage_of_window_size;

        var fieldOfVision = 45;
        var aspectRatio = window_width / window_height;
        var closestCameraRenderPoint = 0.01;
        var farthestCameraRenderPoint = 1000;
        var cameraPositionZ = 2;

        var ambientLightColor = '#888888';
        var directionalLightColor = '#CCCCCC';
        var directionalLightIntensity = 0.3;
        var directionalLightPositionX = 5;
        var directionalLightPositionY = 3;
        var directionalLightPositionXZ = 5;

        var earthRadius = 0.5;
        var earthWidthSegments = 32;
        var earthHeightSegments = 32;
        var specularColor = '#CCCCCC';

        var cubeSatalliteWidth = 0.2;
        var cubeSatalliteHeight = 0.2;
        var cubeSatalliteBreadth = 0.2;

        var starFieldRadius = 90;
        var starFieldWidthSegments = 32;
        var starFieldHeightSegments = 32;

        var mouse = { x: 0, y: 0 };

        var lastUpdatedTimeinMilliSeconds = 0;
        var frames = 1000;
        var framePerSecond = frames / 60;
        var minimumDeltaInMilliSeconds = 200;
        var onRenderFcts = [];

        var defaultOptions = {
            canvas_width: canvas_width,
            canvas_height: canvas_height,
            el: '#earthCanvas'
        };
        var options = {};

        $.extend(options, defaultOptions, customizedOptions);

        var renderer = new THREE.WebGLRenderer();
        var textureLoader = new THREE.TextureLoader();
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(fieldOfVision, aspectRatio,
            closestCameraRenderPoint, farthestCameraRenderPoint);

        var ambientLight = new THREE.AmbientLight(ambientLightColor);

        var directionalLight = new THREE.DirectionalLight(directionalLightColor,
            directionalLightIntensity);

        camera.position.z = cameraPositionZ;

        directionalLight.position.set(directionalLightPositionX, directionalLightPositionY,
            directionalLightPositionXZ);
        scene.add(ambientLight);
        scene.add(directionalLight);

        renderer.setSize(options.canvas_width, options.canvas_height);
        $(options.el).append(renderer.domElement);

        /**
         * Three JS earthGeometry
         * @type {THREE}
         */
        var earthGeometry = new THREE.SphereGeometry(earthRadius, earthHeightSegments, earthWidthSegments);
        var earthMaterial = new THREE.MeshPhongMaterial();
        var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        var earthPivot = new THREE.Object3D();
        earthMaterial.map = textureLoader.load(earthMap);
        earthMaterial.specularMap = textureLoader.load(earthSpecularMap);
        earthMaterial.specular = new THREE.Color(specularColor);
        scene.add(earthMesh);
        earthMesh.add(earthPivot);

        /**
         * Three JS cubeSatelliteGeometry
         * @type {THREE}
         */
        var cubeSatelliteGeometry = new THREE.BoxBufferGeometry(cubeSatalliteWidth, cubeSatalliteHeight,
            cubeSatalliteBreadth);
        var cubeSatelliteMaterial = new THREE.MeshPhongMaterial();
        cubeSatelliteMaterial.map = textureLoader.load(satelliteImage);
        var satelliteMesh = new THREE.Mesh(cubeSatelliteGeometry, cubeSatelliteMaterial);
        satelliteMesh.translateX(1);
        earthPivot.add(satelliteMesh);

        /**
         * Three JS starFieldGeometry
         * @type {THREE}
         */
        var starFieldGeometry = new THREE.SphereGeometry(starFieldRadius, starFieldWidthSegments,
            starFieldHeightSegments);
        var starFieldMaterial = new THREE.MeshBasicMaterial();
        starFieldMaterial.map = textureLoader.load(starfield);
        starFieldMaterial.side = THREE.BackSide;
        var starFieldMesh = new THREE.Mesh(starFieldGeometry, starFieldMaterial);
        scene.add(starFieldMesh);


        onRenderFcts.push(function(delta, now) {
            earthMesh.rotateY(1 / 4 * delta);
            satelliteMesh.rotateY(1 / 2 * delta);
            earthPivot.rotateY(1 / 2 * delta);
            camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3);
            camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3);
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        });


        $(document).on('mousemove', function(event) {
            mouse.x = (event.clientX / window_width) - 0.5;
            mouse.y = (event.clientY / window_height) - 0.5;
        });

        /**
         * animation loop
         * @param  int currentTimeinMilliSeconds
         */
        function animate(currentTimeinMilliSeconds) {
            // keep looping
            window.requestAnimationFrame(animate);
            // measure time
            lastUpdatedTimeinMilliSeconds = lastUpdatedTimeinMilliSeconds || currentTimeinMilliSeconds - framePerSecond;
            var deltaInMilliSeconds = Math.min(minimumDeltaInMilliSeconds,
                currentTimeinMilliSeconds - lastUpdatedTimeinMilliSeconds);
            lastUpdatedTimeinMilliSeconds = currentTimeinMilliSeconds;
            // call each update function
            onRenderFcts.forEach(function(onRenderFct) {
                onRenderFct(deltaInMilliSeconds / frames, currentTimeinMilliSeconds / frames);
            });
        }

        window.requestAnimationFrame(animate);

    }
};

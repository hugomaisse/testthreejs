var renderer, scene, camera, mesh;

init();
animate();


function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor( 0xffffff, 1);
    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    // camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    // camera.position.set(0, 0, 1000);
    // scene.add(camera);
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set(0, 500, 1500);
				controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
				controls.keys = [ 65, 83, 68 ];
				controls.addEventListener( 'change', render );


    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène
    var cube1 = new THREE.CubeGeometry( 200, 200, 200 );
    var cube2 = new THREE.CubeGeometry( 200, 200, 200 );
    var cube3 = new THREE.CubeGeometry( 200, 200, 200 );
    var texture1 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var texture2 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var texture3 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });

    mesh = new THREE.Mesh( cube1, texture1 );
    mesh1 = new THREE.Mesh( cube2, texture2 );
    mesh2 = new THREE.Mesh( cube3, texture3 );
    mesh.position.set( 500, 0, 0 );
    mesh1.position.set( -500, 0, 0 );
    mesh2.position.set( -500, 500, 0);
    mesh.__dirtyPosition = true;
    mesh1.__dirtyPosition = true;
    mesh2.__dirtyPosition = true;
    //scene.add( mesh, mesh1 );

    // CYLINDER direction en droite avec cube

    var cyl_material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width = 50;
    var cyl_height = 1000;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry = new THREE.CylinderGeometry(cyl_width, cyl_width, cyl_height, 100, 10, false);
    // translate the cylinder geometry so that the desired point within the geometry is now at the origin
    //cylGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cyl_height/2, 0 ) );
    var cylinder = new THREE.Mesh(cylGeometry, cyl_material);
    //cylinder.position.set( 0, 0, -50 );
    //cylinder.__dirtyPosition = true;

    //rotation a 90°
    cylinder.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
    cylinder.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 90 ) ) );
    //scene.add( cylinder );

    //cylinder 1 direction haut avec cube
    var cyl_material1 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width1 = 50;
    var cyl_height1 = 500;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry1 = new THREE.CylinderGeometry(cyl_width1, cyl_width1, cyl_height1, 100, 10, false);
    var cylinder1 = new THREE.Mesh(cylGeometry1, cyl_material1);
    //rotation a 90°
    cylinder1.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 0 ) ) );
    cylinder1.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 90 ) ) );
    cylinder1.position.set( -500, cyl_height1/2, 0 );
    cylinder1.__dirtyPosition = true;


    //cylinder 2 direction devant avec sphere
    var cyl_material2 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width2= 50;
    var cyl_height2 = 500;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry2 = new THREE.CylinderGeometry(cyl_width2, cyl_width2, cyl_height2, 100, 10, false);
    var cylinder2 = new THREE.Mesh(cylGeometry2, cyl_material2);
    //rotation a 90°
    cylinder2.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
    cylinder2.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 180 ) ) );
    cylinder2.position.set( -500, 0, cyl_height2/2 );
    cylinder2.__dirtyPosition = true;

    //cylinder 3 direction derriere
    var cyl_material3 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width3= 50;
    var cyl_height3 = 500;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry3 = new THREE.CylinderGeometry(cyl_width3, cyl_width3, cyl_height3, 100, 10, false);
    var cylinder3 = new THREE.Mesh(cylGeometry3, cyl_material3);
    //rotation a 90°
    cylinder3.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
    cylinder3.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 180 ) ) );
    cylinder3.position.set( -500, 0, -(cyl_height3)/2 );
    cylinder3.__dirtyPosition = true;

    //cylinder 3 direction gauche
    var cyl_material4 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width4= 50;
    var cyl_height4 = 750;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry4 = new THREE.CylinderGeometry(cyl_width4, cyl_width4, cyl_height4, 100, 10, false);
    var cylinder4 = new THREE.Mesh(cylGeometry4, cyl_material4);
    //rotation a 90°
    cylinder4.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
    cylinder4.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 90 ) ) );
    cylinder4.position.set( -900, 0, 0 );
    cylinder4.__dirtyPosition = true;


    //cylinder 1 direction bas avec sphere
    var cyl_material5 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    var cyl_width5 = 50;
    var cyl_height5 = 750;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry5 = new THREE.CylinderGeometry(cyl_width5, cyl_width5, cyl_height5, 100, 10, false);
    var cylinder5 = new THREE.Mesh(cylGeometry5, cyl_material5);
    //rotation a 90°
    cylinder5.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 0 ) ) );
    cylinder5.applyMatrix( new THREE.Matrix4().makeRotationY( THREE.Math.degToRad( 90 ) ) );
    cylinder5.position.set( -500, -(cyl_height5/2), 0 );
    cylinder5.__dirtyPosition = true;

    //sphere devant
    var sph = new THREE.SphereGeometry(130, 32, 32 );
    var sph_mat = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var sphere = new THREE.Mesh( sph, sph_mat );
    sphere.position.set( -500, 0, 500 );
    sphere.__dirtyPosition = true;

    //sphere derriere
    var sph1 = new THREE.SphereGeometry(130, 32, 32 );
    var sph_mat1 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var sphere1 = new THREE.Mesh( sph1, sph_mat1 );
    sphere1.position.set( -500, 0, -500 );
    sphere.__dirtyPosition = true;

    //sphere gauche
    var sph2 = new THREE.SphereGeometry(130, 32, 32 );
    var sph_mat2 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var sphere2 = new THREE.Mesh( sph2, sph_mat2 );
    sphere2.position.set( -1250, 0, 0 );
    sphere.__dirtyPosition = true;
    //sphere dessous
    var sph3 = new THREE.SphereGeometry(130, 32, 32 );
    var sph_mat3 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var sphere3 = new THREE.Mesh( sph3, sph_mat3 );
    sphere3.position.set( -500, -750, 0 );
    sphere.__dirtyPosition = true;

    //parents mesh
    mesh3 = new THREE.Mesh();
    mesh3.add(mesh);
    mesh3.add(mesh1);
    mesh3.add(mesh2);
    mesh3.add(cylinder);
    mesh3.add(cylinder1);
    mesh3.add(cylinder2);
    mesh3.add(cylinder3);
    mesh3.add(cylinder4);
    mesh3.add(cylinder5);
    mesh3.add(sphere);
    mesh3.add(sphere1);
    mesh3.add(sphere2);
    mesh3.add(sphere3);
    scene.add(mesh3);



    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );
    var li = new THREE.Light( 0xffffff, 1 );
    scene.add( li );
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -100, 1000, 100 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add( spotLight );

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    light.position.set(500, 500, 50);
    scene.add( light );
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.position.set(500, 500, 50);
    scene.add(dirLight);

    //resize
    window.addEventListener( 'resize', onWindowResize, false );

    //rendering all
    render()
}

function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
      // mesh3.rotation.x += 0.01;
      // mesh3.rotation.y += 0.02;
      controls.update();

    // on effectue le rendu de la scène
    //renderer.render( scene, camera );
}
function render() {
				renderer.render( scene, camera );
				//stats.update();
			}


function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				controls.handleResize();
				render();
			}

//http://localhost:8000/
//python -m http.server

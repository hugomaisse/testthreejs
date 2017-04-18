var renderer, scene, camera, mesh;

init();
animate();


function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);

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

    // CYLINDER

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

    //cylinder 1
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


    //cylinder 2
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

    //sphere
    var sph = new THREE.SphereGeometry(130, 32, 32 );
    var sph_mat = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var sphere = new THREE.Mesh( sph, sph_mat );
    sphere.position.set( -500, 0, 500 );
    sphere.__dirtyPosition = true;


    //parents mesh
    mesh3 = new THREE.Mesh();
    mesh3.add(mesh);
    mesh3.add(mesh1);
    mesh3.add(mesh2);
    mesh3.add(cylinder);
    mesh3.add(cylinder1);
    mesh3.add(cylinder2);
    mesh3.add(sphere);
    scene.add(mesh3);



    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

    // window.addEventListener("resize", function () {
    //     if (engine) {
    //         engine.resize();
    //     }
    // },false);
}

function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
      mesh3.rotation.x += 0.01;
      mesh3.rotation.y += 0.02;
    // mesh.rotation.x += 0.01;
    // mesh1.rotation.x += 0.01;


    // mesh.rotation.y += 0.02;
    // mesh1.rotation.y += 0.02;

    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}

//http://localhost:8000/
//python -m http.server

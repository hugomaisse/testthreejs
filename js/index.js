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
    var texture1 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/metal1.jpg') });
    var texture2 = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg') });
    mesh = new THREE.Mesh( cube1, texture1 );
    mesh1 = new THREE.Mesh( cube2, texture2 );
    mesh.position.set( 500, 0, -50 );
    mesh1.position.set( -500, 0, -50 );
    mesh.__dirtyPosition = true;
    mesh1.__dirtyPosition = true;
    scene.add( mesh, mesh1 );

    // CYLINDER
    var cyl_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var cyl_width = 50;
    var cyl_height = 400;
    // THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight, openEnded )
    var cylGeometry = new THREE.CylinderGeometry(cyl_width, cyl_width, cyl_height, 100, 10, false);
    // translate the cylinder geometry so that the desired point within the geometry is now at the origin
    cylGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, cyl_height/2, 0 ) );
    var cylinder = new THREE.Mesh(cylGeometry, cyl_material);
    cylinder.position.set( 0, -200, -50 );
    cylinder.__dirtyPosition = true;
    scene.add( cylinder );


    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

}

function animate(){
    // on appel la fonction animate() récursivement à chaque frame
    requestAnimationFrame( animate );
    // on fait tourner le cube sur ses axes x et y
    // for(let mesh of scene){
    //   this.rotation.x += 0.01;
    //   this.rotation.y += 0.02;
    // }
    mesh.rotation.x += 0.01;
    mesh1.rotation.x += 0.01;

    mesh.rotation.y += 0.02;
    mesh1.rotation.y += 0.02;

    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}

//http://localhost:8000/
//python -m http.server

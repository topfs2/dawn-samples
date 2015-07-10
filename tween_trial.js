var camera = new dawn.OrthographicCamera(4 * 16 / 9, 4, -1, 1000);

var mesh = new dawn.Mesh3D(new dawn.PlaneGeometry(1, 1), new dawn.ShaderMaterial("shaders/map_diffuse"));
mesh.material.uniform("map", new dawn.Image("kodi-thumbnail.png"));
mesh.material.uniform("color", new dawn.vec4(1));

var scene = new dawn.Scene3D(camera, mesh, 1280, 720);

var tween1 = new TWEEN.Tween( { width: 1 } )
            .to( { width: 4 }, 4000 )
            .easing( TWEEN.Easing.Elastic.InOut )
            .onUpdate(function () {
                mesh.geometry.width = this.width;
            })
            .start();

var tween2 = new TWEEN.Tween( { height: 1 } )
            .to( { height: 4 }, 4000 )
            .easing( TWEEN.Easing.Elastic.InOut )
            .onUpdate(function () {
                mesh.geometry.height = this.height;
            })
            .delay(500)
            .start();

var tween3 = new TWEEN.Tween( { r: 0 } )
            .to( { r: Math.PI * 2 }, 1000 )
            .easing( TWEEN.Easing.Quintic.InOut )
            .onUpdate(function () {
                mesh.transform = dawn.mat4.rotationZ(this.r);
            })
            .delay(2000)
            .start();

var tween4 = new TWEEN.Tween( { x: 0 } )
            .to( { x: -2 }, 1000 )
            .easing( TWEEN.Easing.Quintic.InOut )
            .onUpdate(function () {
                mesh.transform = dawn.mat4.translation(this.x, 0, 0);
            })
            .delay(3000)
            .start();

var tween5 = new TWEEN.Tween( { a: 1 } )
            .to( { a: 0 }, 1000 )
            .easing( TWEEN.Easing.Quintic.InOut )
            .onUpdate(function () {
                mesh.material.uniform("color", new dawn.vec4(new dawn.vec3(1), this.a));
            })
            .delay(4000)
            .start();

emitResizeEvent = function (width, height) {
    scene.camera.projection(4.0 * width / height, 4.0, -1.0, 1000.0);
    scene.size(width, height);
}

update = function () {
    TWEEN.update();

    return scene.instance;
}

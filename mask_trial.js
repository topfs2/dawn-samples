var camera = new dawn.OrthographicCamera(4 * 16 / 9, 4, -1, 1000);

var mesh = new dawn.Mesh3D(
    new dawn.EllipsisGeometry(1, 1, 32),
    new dawn.ShaderMaterial("shaders/color")
);
mesh.material.uniform("color", new dawn.vec4(1));

var mask = new dawn.Mask3D(
    new dawn.RoundedRectangleGeometry(2, 2, new dawn.vec4(0, 0.1, 0.2, 0.3))
);
mask.appendChild(mesh);

var stage = new dawn.Object3D();
stage.appendChild(mask);

var scene = new dawn.Scene3D(camera, stage, 1280, 720);

var time = function () {
    return (new Date()).getTime();
};

emitResizeEvent = function (width, height) {
    scene.camera.projection(4.0 * width / height, 4.0, -1.0, 1000.0);
    scene.size(width, height);
}

var tween;
var small = true;
emitKeyEvent = function (device, key, down) {
    print(device, key, down);
    if (!down) {
        if (tween) {
            tween.stop();
        }

        tween = new TWEEN.Tween( { scale: small ? 1 : 3 } )
            .to( { scale: small ? 3 : 1 }, 1000 )
            .easing( TWEEN.Easing.Quintic.InOut )
            .onUpdate(function () {
                mesh.transform = dawn.mat4.scaling(this.scale, this.scale, 1);
            })
            .start();

        small = !small;
    }
};

var frame = 0;
var start = time();
update = function () {
    TWEEN.update();

    var now = time();
    var t = (now - start) / 1000;

    return scene.instance;
}
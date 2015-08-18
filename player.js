var camera = new dawn.OrthographicCamera(1280, 720, -1, 1000);

var player_bg = new dawn.Mesh3D(
    new dawn.PlaneGeometry(1280, 720),
    new dawn.ShaderMaterial("shaders/map")
);
player_bg.material.uniform("map", new dawn.Image("z3tZBqmxmMmoVX8tAOvVDS5pUQH.jpg"));


var icon = new dawn.Mesh3D(
    new dawn.PlaneGeometry(64, 64),
    new dawn.ShaderMaterial("shaders/map")
);
icon.material.uniform("map", new dawn.Image("volume-24-512.png"));

var popup_bg = new dawn.Mesh3D(
    new dawn.EllipsisGeometry(128, 128, 32),
    //new dawn.PlaneGeometry(256, 256),
    new dawn.ShaderMaterial("shaders/color")
);
popup_bg.material.uniform("color", new dawn.vec4(0.5));

var mask = new dawn.Mask3D(
    new dawn.RoundedRectangleGeometry(512, 512, new dawn.vec4(40))
);

//var mask = new dawn.Object3D();
/*
var mask = new dawn.Mesh3D(
    new dawn.RoundedRectangleGeometry(512, 512, new dawn.vec4(40)),
    new dawn.ShaderMaterial("shaders/color")
);
mask.material.uniform("color", new dawn.vec4(0.5)); 
*/
mask.appendChild(popup_bg);

icon.transform = mask.transform = dawn.mat4.translation(0, 250, 0);

var stage = new dawn.Object3D();
stage.appendChild(player_bg);
stage.appendChild(mask);
stage.appendChild(icon);

var scene = new dawn.Scene3D(camera, stage, 1280, 720);

var time = function () {
    return (new Date()).getTime();
};

var tween;
var small = true;
emitKeyEvent = function (device, key, down) {
    print(device, key, down);
    if (!down) {
        if (tween) {
            tween.stop();
        }


        tween = new TWEEN.Tween({
                scale: small ? 1 : 6,
                t: small ? 250 : -75
            })
            .to( { scale: small ? 6 : 1, t: small ? -75 : 250 }, 1000 )
            .easing( TWEEN.Easing.Quintic.InOut )
            .onUpdate(function () {
                popup_bg.transform = dawn.mat4.scaling(this.scale, this.scale, 1);
                mask.transform = dawn.mat4.translation(0, this.t, 0);
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

/*
    popup_bg.transform = dawn.mat4.scaling(4, 4, 1);
    mask.transform = dawn.mat4.translation(0, 1 * -100, 0);
    */


    return scene.instance;
}
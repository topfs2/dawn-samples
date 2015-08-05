

var bg = new dawn.Mesh3D(new dawn.PlaneGeometry(1280, 720), new dawn.ShaderMaterial("shaders/map"));
bg.material.uniform("map", new dawn.Image("bg.jpg"));

var fg = new dawn.Mesh3D(new dawn.PlaneGeometry(640, 720), new dawn.ShaderMaterial("shaders/map_diffuse"));
fg.material.uniform("map", new dawn.BackbufferPixmap(new dawn.vec2(320, 0), new dawn.vec2(640, 720)));
fg.material.uniform("color", new dawn.vec4(1, 0, 0, 1));

var stage = new dawn.Object3D();
stage.appendChild(bg);
stage.appendChild(fg);

var camera = new dawn.OrthographicCamera(1280, 720, -1, 1000);
var scene = new dawn.Scene3D(camera, stage, 1280, 720);

var time = function () {
    return (new Date()).getTime();
};

var frame = 0;
var start = time();
update = function () {
    var now = time();
    var t = (now - start) / 1000;

    return scene.instance;
}

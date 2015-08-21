var createSprite = function (path, w, h, uv) {
    var pixmap = new dawn.Image(path);
    var sprite = new dawn.Mesh3D(
        new dawn.PlaneGeometry(w, h, uv),
        new dawn.ShaderMaterial("shaders/map_diffuse")
    );
    sprite.material.uniform("map", pixmap);
    sprite.material.uniform("color", new dawn.vec4(1.0));

    sprite.setColor = function (c) {
        sprite.material.uniform("color", c);
    }

    return sprite;
};

var createFadeTransition = function (p1, p2, w, h) {
    var meshA = createSprite(p1, w, h);
    var meshB = createSprite(p2, w, h);

    var transition = new dawn.Object3D();
    transition.appendChild(meshA);
    transition.appendChild(meshB);
    transition.setTransition = function (t) {
        meshA.setColor(new dawn.vec4(1.0, 1.0, 1.0, t));
        meshB.setColor(new dawn.vec4(1.0, 1.0, 1.0, 1.0 - t));
    };

    return transition;
};

var createMoveTransition = function (p1, p2, w, h) {
    var meshA = createSprite(p1, w, h);
    var meshB = createSprite(p2, w, h);

    var transition = new dawn.Object3D();
    transition.appendChild(meshB);
    transition.appendChild(meshA);
    transition.setTransition = function (t) {
        meshA.transform = dawn.mat4.translation(t * w,         0, 0);
        meshB.transform = dawn.mat4.translation((1.0 - t) * w, 0, 0);
    };

    return transition;
};

var createTearTransition = function (p1, p2, w, h) {
    var meshA = []
    var objA = new dawn.Object3D();

    var w3 = w / 3;
    var h3 = h / 3;

    for (var i = 0; i < 3; i++) {
        var a = i / 3;
        var b = (i + 1) / 3;

        var x = (i - 1) * w3;

        var mesh = createSprite(p1, w3, h, new dawn.vec4(a, b, 0, 1));
        mesh.transform = dawn.mat4.translation(x, 0, 0);

        meshA.push(mesh);
        objA.appendChild(mesh)
    }


    var meshB = createSprite(p2, w, h);

    var transition = new dawn.Object3D();
    transition.appendChild(meshB);
    transition.appendChild(objA);
    transition.setTransition = function (t) {
        for (var i = 0; i < 3; i++) {
            var k = TWEEN.Easing.Quintic.In(Math.max(Math.min((t - i * 0.25) / 0.5, 1.0), 0.0));

            var x = (i - 1) * w3;
            var y = k * h;

            var mesh = objA.children[i];
            mesh.transform = dawn.mat4.translation(x, y, 0);
        }
    };

    return transition;
};

var images = [
    "cq9XMmjj2EEDWYoOknX07kvNl2o.jpg",
    "fcWtYLAmQjksKUzWouFdIMKUYgK.jpg",
    "gq4Z1pfOWHn3FKFNutlDCySps9C.jpg",
    "z3tZBqmxmMmoVX8tAOvVDS5pUQH.jpg"
];

var camera = new dawn.OrthographicCamera(1280, 720, -1, 1000);

var transition = createTearTransition(images[0], images[1], 1280, 720);
transition.setTransition(0);

var stage = new dawn.Object3D();
stage.appendChild(transition);

var scene = new dawn.Scene3D(camera, stage, 1280, 720);

var tween;
var start = true;
emitKeyEvent = function (device, key, down) {
    print(device, key, down);
    if (!down) {
        if (tween) {
            tween.stop();
        }

        tween = new TWEEN.Tween({ t: start ? 0 : 1 })
            .to( { t: start ? 1 : 0 }, 1000 )
            //.easing( TWEEN.Easing.Quintic.In )
            .onUpdate(function () {
                transition.setTransition(this.t);
            })
            .start();

        start = !start;
    }
};

update = function () {
    TWEEN.update();
    return scene.instance;
}
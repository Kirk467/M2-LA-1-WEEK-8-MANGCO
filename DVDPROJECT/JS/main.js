const THREE = window.THREE;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// CAMERA
const camera = new THREE.OrthographicCamera(
    -400, 400,
    400, -400,
    0.1, 1000
);

camera.position.z = 10;

// RENDERER

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(800, 800);

document.body.style.margin = '0';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.height = '100vh';
document.body.style.backgroundColor = '#ffffff';

document.body.appendChild(renderer.domElement);

// DVD TEXTURE

const textureLoader = new THREE.TextureLoader();

const dvdTexture = textureLoader.load('ASSETS/pngfind.com-dvd-logo-png-476875.png');

// DVD OBJECT
const geometry = new THREE.PlaneGeometry(140, 100);

const material = new THREE.MeshBasicMaterial({
    map: dvdTexture,
    color: 0xffffff,
    transparent: true,
    side: THREE.DoubleSide
});

const dvd = new THREE.Mesh(geometry, material);

dvd.position.set(0, 0, 0);

scene.add(dvd);

let velocityX = 3;
let velocityY = 2;

let bounceCount = 0;
const shrinkFactor = 0.65;

const colors = [
    0xD92338, 
    0xD8B94F, 
    0xD85A42, 
    0xA58ACB, 
    0xA47ABF, 
    0xAFC8D9, 
    0xBFC1C9, 
    0xE9B5C9  // EoSD Hair Colors :3
];

// ANIMATION FUNCTION

function animate() {

    requestAnimationFrame(animate);

    
    if (!dvd.visible) {
        renderer.render(scene, camera);
        return;
    }

    dvd.position.x += velocityX;
    dvd.position.y += velocityY;

    const halfWidth = (140 * dvd.scale.x) / 2;
    const halfHeight = (100 * dvd.scale.y) / 2;

    let hitBoundary = false;

    if (dvd.position.x + halfWidth >= 400) {
        dvd.position.x = 400 - halfWidth;
        velocityX *= -1;
        hitBoundary = true;
    }
    else if (dvd.position.x - halfWidth <= -400) {
        dvd.position.x = -400 + halfWidth;
        velocityX *= -1;
        hitBoundary = true;
    }

    if (dvd.position.y + halfHeight >= 400) {
        dvd.position.y = 400 - halfHeight;
        velocityY *= -1;
        hitBoundary = true;
    }
    else if (dvd.position.y - halfHeight <= -400) {
        dvd.position.y = -400 + halfHeight;
        velocityY *= -1;
        hitBoundary = true;
    }

    if (hitBoundary) {

        bounceCount++;

        const characterColor = colors[(bounceCount - 1) % colors.length];

        dvd.material.color.setHex(characterColor);

        dvd.scale.multiplyScalar(shrinkFactor);

        if (bounceCount >= 7) {
            dvd.visible = false;
        }
    }


    renderer.render(scene, camera);
}

animate();

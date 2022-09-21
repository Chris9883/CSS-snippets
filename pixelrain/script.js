// Tutorial by Franks laboratory: https://www.youtube.com/watch?v=RCVxXgJ8xSk&t=31s
// Picture by Ali Ramazan Çiftçi: https://www.pexels.com/de-de/foto/licht-sommer-garten-blatt-13522034/
const myImage = new Image();
myImage.src = 'flowers.jpg';

myImage.addEventListener('load', function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 960;
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let particlesArray = [];
    const numberOfParticles = 50000;
    let brightnessValue = [];
    const redValue = [];
    const greenValue = [];
    const blueValue = [];
    for (let y = 0; y < canvas.height; y++) {
        let brightnessRow = [];
        let redRow = [];
        let greenRow = [];
        let blueRow = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            redRow.push(red);
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            greenRow.push(green);
            const blue = pixels.data[(y * 4 * pixels.width) + (x *4 + 2)];
            blueRow.push(blue);
            const brightness = calculateRelativeBrightness(red, green, blue);
            brightnessRow.push(brightness);
        }
        brightnessValue.push(brightnessRow);
        redValue.push(redRow);
        greenValue.push(greenRow);
        blueValue.push(blueRow);
    }


    // adjust relative brightness
    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) /100;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 3;
            this.size = Math.random() * 1.5;
            this.color = ''
        }

        update() {
            this.positionX = Math.floor(this.x);
            this.positionY = Math.floor(this.y);
            this.speed = brightnessValue[this.positionY][this.positionX];
            let movement = this.speed + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            this.color = `rgb(${redValue[this.positionY][this.positionX]}, ${greenValue[this.positionY][this.positionX]}, ${blueValue[this.positionY][this.positionX]})`;
        }

        draw () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill(); 
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle);
        }
    }
    init();

    function animate() {
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.3;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate(); 
});




const canvas = document.getElementById('welcomeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 300;

const vertices = [
    // Box corners
    {x: 50, y: 50},
    {x: canvas.width-50, y: 50},
    {x: canvas.width-50, y: 150},
    {x: 50, y: 150},

    // Rnadom Points
    /*{x: 100, y: 60},
    {x: 200, y: 120},
    {x: 300, y: 80},
    {x: 400, y: 140},
    {x: 500, y: 100},
    {x: 600, y: 130},
    {x: 700, y: 90},
    {x: 800, y: 110},
    {x: 900, y: 70},
    {x: 1000, y: 150},
    {x: 1100, y: 60},
    {x: 1200, y: 140},
    {x: 1300, y: 100},
    {x: 1400, y: 130},
    {x: 1500, y: 90}*/
];
// Add 100 random points inside the box
for (let i = 0; i < 100; i++) {
    const x = 50 + Math.random() * (canvas.width - 100); // 50 to canvas.width-50
    const y = 50 + Math.random() * 100; // 50 to 150
    vertices.push({x, y});
}

const mouse = {x: 0, y: 0}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    vertices.forEach(vertex => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
         ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // draw line to mouse if close
        const dx = vertex.x - mouse.x;
        const dy = vertex.y - mouse.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < 150){
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(vertex.x, vertex.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

        }
    });

    requestAnimationFrame(animate);
}

animate();
const canvas = document.getElementById('welcomeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 300;

const vertices = {
    W: [
        {x: 50, y: 50},
        {x: 100, y: 250},
        {x: 150, y: 250},
        {x: 175, y: 100},
        {x: 200, y: 250},
        {x: 250, y: 250},
        {x: 300, y: 50},
        {x: 250, y: 50},
        {x: 225, y: 200},
        {x: 200, y: 50},
        {x: 150, y: 50},
        {x: 125, y: 200},
        {x: 100, y: 50},
        {x: 50, y: 50},
        {x: 100, y: 250}
    ],
    E: [
        {x: 325, y: 50},
        {x: 325, y: 250},
        {x: 475, y: 250},
        {x: 475, y: 200},
        {x: 375, y: 200},
        {x: 375, y: 170},
        {x: 475, y: 170},
        {x: 475, y: 130},
        {x: 375, y: 130},
        {x: 375, y: 100},
        {x: 475, y: 100},
        {x: 475, y: 50},
        {x: 325, y: 50}
    ],
    L: [
        {x: 525, y: 50},
        {x: 525, y: 250},
        {x: 675, y: 250},
        {x: 675, y: 200},
        {x: 575, y: 200},
        {x: 575, y: 50},
        {x: 525, y: 50}
    ],
    C: [
        {x: 725, y: 50},
        {x: 725, y: 250},
        {x: 875, y: 250},
        {x: 875, y: 200},
        {x: 775, y: 200},
        {x: 775, y: 100},
        {x: 875, y: 100},
        {x: 875, y: 50},
        {x: 725, y: 50}
    ],
    O: [
        {x: 925, y: 50},
        {x: 925, y: 250},
        {x: 1075, y: 250},
        {x: 1075, y: 50},
        {x: 925, y: 50}
    ],
    O_in: [
        {x: 975, y: 200},
        {x: 975, y: 100},
        {x: 1025, y: 100},
        {x: 1025, y: 200},
        {x: 975, y: 200}
    ],
    M: [
        {x: 1100, y: 50},
        {x: 1100, y: 250},
        {x: 1150, y: 250},
        {x: 1150, y: 100},
        {x: 1175, y: 250},
        {x: 1225, y: 250},
        {x: 1250, y: 100},
        {x: 1250, y: 250},
        {x: 1300, y: 250},
        {x: 1300, y: 50},
        {x: 1225, y: 50},
        {x: 1200, y: 175},
        {x: 1175, y: 50},
        {x: 1100, y: 50}
    ],
    second_E: [
        {x: 1325, y: 50},
        {x: 1325, y: 250},
        {x: 1475, y: 250},
        {x: 1475, y: 200},
        {x: 1375, y: 200},
        {x: 1375, y: 170},
        {x: 1475, y: 170},
        {x: 1475, y: 130},
        {x: 1375, y: 130},
        {x: 1375, y: 100},
        {x: 1475, y: 100},
        {x: 1475, y: 50},
        {x: 1325, y: 50}
    ]
};


const w_vertices = [

];
// Add 100 random points inside the box
/*for (let i = 0; i < 100; i++) {
    const x = 50 + Math.random() * (canvas.width - 100); // 50 to canvas.width-50
    const y = 50 + Math.random() * 200; // 50 to y value
    vertices.push({x, y});
}*/

const mouse = {x: 0, y: 0}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

function connectVertices(points) {
    if (points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(const key in vertices) {
        connectVertices(vertices[key]);
    }
    
    for (const key in vertices) {
        vertices[key].forEach(vertex => {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 3, 0, Math.PI * 2);
            ctx.fill();

            // draw line to mouse if close
            const dx = vertex.x - mouse.x;
            const dy = vertex.y - mouse.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 150) {
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(vertex.x, vertex.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
    }
    requestAnimationFrame(animate);
}
animate();

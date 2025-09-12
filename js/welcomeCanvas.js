const canvas = document.getElementById('welcomeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 300;


const designWidth = 1600;
const designHeight = 300;

const verticesRel = {
    W: [
        {x: 50/designWidth, y: 50/designHeight},
        {x: 100/designWidth, y: 250/designHeight},
        {x: 150/designWidth, y: 250/designHeight},
        {x: 175/designWidth, y: 100/designHeight},
        {x: 200/designWidth, y: 250/designHeight},
        {x: 250/designWidth, y: 250/designHeight},
        {x: 300/designWidth, y: 50/designHeight},
        {x: 250/designWidth, y: 50/designHeight},
        {x: 225/designWidth, y: 200/designHeight},
        {x: 200/designWidth, y: 50/designHeight},
        {x: 150/designWidth, y: 50/designHeight},
        {x: 125/designWidth, y: 200/designHeight},
        {x: 100/designWidth, y: 50/designHeight},
        {x: 50/designWidth, y: 50/designHeight},
        {x: 100/designWidth, y: 250/designHeight},
    ],
    E: [
        {x: 325/designWidth, y: 50/designHeight},
        {x: 325/designWidth, y: 250/designHeight},
        {x: 475/designWidth, y: 250/designHeight},
        {x: 475/designWidth, y: 200/designHeight},
        {x: 375/designWidth, y: 200/designHeight},
        {x: 375/designWidth, y: 170/designHeight},
        {x: 475/designWidth, y: 170/designHeight},
        {x: 475/designWidth, y: 130/designHeight},
        {x: 375/designWidth, y: 130/designHeight},
        {x: 375/designWidth, y: 100/designHeight},
        {x: 475/designWidth, y: 100/designHeight},
        {x: 475/designWidth, y: 50/designHeight},
        {x: 325/designWidth, y: 50/designHeight}
    ],
    L: [
        {x: 515/designWidth, y: 50/designHeight},
        {x: 515/designWidth, y: 250/designHeight},
        {x: 665/designWidth, y: 250/designHeight},
        {x: 665/designWidth, y: 200/designHeight},
        {x: 570/designWidth, y: 200/designHeight},
        {x: 570/designWidth, y: 50/designHeight},
        {x: 515/designWidth, y: 50/designHeight}
    ],
    C: [
        {x: 700/designWidth, y: 50/designHeight},
        {x: 700/designWidth, y: 250/designHeight},
        {x: 850/designWidth, y: 250/designHeight},
        {x: 850/designWidth, y: 200/designHeight},
        {x: 750/designWidth, y: 200/designHeight},
        {x: 750/designWidth, y: 100/designHeight},
        {x: 850/designWidth, y: 100/designHeight},
        {x: 850/designWidth, y: 50/designHeight},
        {x: 700/designWidth, y: 50/designHeight}
    ],
    O: [
        {x: 900/designWidth, y: 50/designHeight},
        {x: 900/designWidth, y: 250/designHeight},
        {x: 1050/designWidth, y: 250/designHeight},
        {x: 1050/designWidth, y: 50/designHeight},
        {x: 900/designWidth, y: 50/designHeight}
    ],
    O_in: [
        {x: 950/designWidth, y: 200/designHeight},
        {x: 950/designWidth, y: 100/designHeight},
        {x: 1000/designWidth, y: 100/designHeight},
        {x: 1000/designWidth, y: 200/designHeight},
        {x: 950/designWidth, y: 200/designHeight}
    ],
    M: [
        {x: 1100/designWidth, y: 50/designHeight},
        {x: 1100/designWidth, y: 250/designHeight},
        {x: 1150/designWidth, y: 250/designHeight},
        {x: 1150/designWidth, y: 100/designHeight},
        {x: 1175/designWidth, y: 250/designHeight},
        {x: 1225/designWidth, y: 250/designHeight},
        {x: 1250/designWidth, y: 100/designHeight},
        {x: 1250/designWidth, y: 250/designHeight},
        {x: 1300/designWidth, y: 250/designHeight},
        {x: 1300/designWidth, y: 50/designHeight},
        {x: 1225/designWidth, y: 50/designHeight},
        {x: 1200/designWidth, y: 175/designHeight},
        {x: 1175/designWidth, y: 50/designHeight},
        {x: 1100/designWidth, y: 50/designHeight} 
    ],
    second_E: [
        {x: 1325/designWidth, y: 50/designHeight},
        {x: 1325/designWidth, y: 250/designHeight},
        {x: 1475/designWidth, y: 250/designHeight},
        {x: 1475/designWidth, y: 200/designHeight},
        {x: 1375/designWidth, y: 200/designHeight},
        {x: 1375/designWidth, y: 170/designHeight},
        {x: 1475/designWidth, y: 170/designHeight},
        {x: 1475/designWidth, y: 130/designHeight},
        {x: 1375/designWidth, y: 130/designHeight},
        {x: 1375/designWidth, y: 100/designHeight},
        {x: 1475/designWidth, y: 100/designHeight},
        {x: 1475/designWidth, y: 50/designHeight},
        {x: 1325/designWidth, y: 50/designHeight}
    ]
};


// Scales the vertices so that the canvas is compatible with different screen sizes
function getScaledVertices(og_vertices) {
    const scaled = {};
    for (const key in og_vertices) {
        scaled[key] = og_vertices[key].map(p => ({
            x: p.x * canvas.width,
            y: p.y * canvas.height
        }));
    }
    return scaled;
}

let vertices = getScaledVertices(verticesRel);


const mouse = {x: 0, y: 0}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});


// Connects the vertices with lines to create the letters
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

// Connects the vertices with the cursor if close enough
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    vertices = getScaledVertices(verticesRel);
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

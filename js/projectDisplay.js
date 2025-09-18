const projects = [
    {
        image: 'images/zombies.jpg',
        title: 'Zombies Rising (A 2D Python Video Game)',
        type: 'image',
        description: `This is a 2D game I made using Python. 
        I implemented object-oriented programming in order to create each individual 
        object and to detect object collisions. This game works by utilizing CodeSkulptor, 
        which is a browser based Python interpreter.`},

    {
        image: 'images/me_updated.jpg',
        title: 'Raspberry Pi Frequency Detector',
        type: 'video',
        description: `This works by determining the frequency of an audio and then converting it to a note. Due to the limitations of the current led board, 
                we had to compromise and make one scale fit all different octaves. This was done by using the modulo operator to determine the note in the octave.`
    },
    {
        image: 'image3.png',
        title: 'Personal Website',
        type: 'image',
        description: `This is the website you are currently on! I made this website using HTML, CSS, and a little bit of JavaScript.
                I had relevant course work in web development and I wanted to apply what I learned to make a personal website that would showcase my skills and projects.`
    }
]

let currentIndex = 0;

// currently displayed projects
const projectImage = document.getElementById("project-image");
const projectTitle = document.getElementById("project-title");
const projectDesc = document.getElementById("project-description")


document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateProject();
});

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateProject();
});

function updateProject() {
    projectImage.src = projects[currentIndex].image;
    projectTitle.textContent = projects[currentIndex].title;
    projectDesc.textContent = projects[currentIndex].description;
}
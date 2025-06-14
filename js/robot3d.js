function initRobot() {
    const container = document.getElementById('robot-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Création du robot
    const robotGroup = new THREE.Group();

    // Corps du robot
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);

    // Tête du robot
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.4;
    robotGroup.add(head);

    // Yeux du robot
    const createEye = (x) => {
        const eyeGroup = new THREE.Group();
        
        // Globe oculaire
        const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
        const eyeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 100
        });
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eyeGroup.add(eye);

        // Iris
        const irisGeometry = new THREE.SphereGeometry(0.08, 32, 32);
        const irisMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,
            shininess: 100
        });
        const iris = new THREE.Mesh(irisGeometry, irisMaterial);
        iris.position.z = 0.08;
        eyeGroup.add(iris);

        // Pupille
        const pupilGeometry = new THREE.SphereGeometry(0.04, 32, 32);
        const pupilMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            shininess: 100
        });
        const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupil.position.z = 0.12;
        eyeGroup.add(pupil);

        // Reflet
        const highlightGeometry = new THREE.SphereGeometry(0.02, 32, 32);
        const highlightMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            shininess: 100
        });
        const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
        highlight.position.set(0.03, 0.03, 0.13);
        eyeGroup.add(highlight);

        eyeGroup.position.set(x, 0, 0.35);
        return eyeGroup;
    };

    const leftEye = createEye(-0.2);
    const rightEye = createEye(0.2);
    head.add(leftEye);
    head.add(rightEye);

    // Bras du robot
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.7, 0.5, 0);
    leftArm.rotation.z = Math.PI / 4;
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.7, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 4;
    robotGroup.add(rightArm);

    scene.add(robotGroup);

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 3;

    // Animation du robot
    let mouseX = 0;
    let mouseY = 0;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Le robot suit la souris
        head.rotation.y = mouseX * 0.5;
        head.rotation.x = mouseY * 0.3;

        // Animation de rotation du robot
        robotGroup.rotation.y += 0.005;
        
        // Animation de flottement
        robotGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
} 
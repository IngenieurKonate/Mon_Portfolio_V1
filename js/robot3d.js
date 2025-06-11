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
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.5, 0.35);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.5, 0.35);
    robotGroup.add(rightEye);

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
        
        leftEye.rotation.y = mouseX * 0.8;
        leftEye.rotation.x = mouseY * 0.5;
        rightEye.rotation.y = mouseX * 0.8;
        rightEye.rotation.x = mouseY * 0.5;

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
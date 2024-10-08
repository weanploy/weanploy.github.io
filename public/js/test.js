class PointerParticles extends HTMLElement {
    constructor() {
        super();
        this.particles = [];
    }

    connectedCallback() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.addParticles(e));
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addParticles(event) {
        const { clientX, clientY } = event;

        // เพิ่มพาร์ติเคิลหลายตัวในการเคลื่อนไหวแต่ละครั้ง
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: clientX,
                y: clientY,
                size: Math.random() * 5 + 1,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                color: this.generateGradientColor(i, 10), // สร้างสีไล่จาก #ffc2d1 ไปขาว
                life: 100, // เพิ่มค่าชีวิตของพาร์ติเคิล
            });
        }
    }

    generateGradientColor(index, totalParticles) {
        // ฟังก์ชันสำหรับสร้างสีไล่จาก #ffc2d1 ไปยังขาว
        const startColor = [255, 194, 209]; // RGB ของ #ffc2d1
        const endColor = [255, 255, 255];  // RGB ของสีขาว
        const factor = index / totalParticles;

        const r = Math.round(startColor[0] + factor * (endColor[0] - startColor[0]));
        const g = Math.round(startColor[1] + factor * (endColor[1] - startColor[1]));
        const b = Math.round(startColor[2] + factor * (endColor[2] - startColor[2]));

        return `rgb(${r}, ${g}, ${b})`;
    }

    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            this.context.beginPath();
            this.context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.context.fillStyle = particle.color;
            this.context.fill();
            this.context.closePath();

            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size *= 0.95;
            particle.life -= 1; // ลดค่าชีวิตในแต่ละเฟรม

            if (particle.size < 0.5 || particle.life <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

customElements.define('pointer-particles', PointerParticles);

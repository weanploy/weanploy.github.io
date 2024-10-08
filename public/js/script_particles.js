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
                color: this.generateGradientColor(i, 10),
                life: 100, // เพิ่มค่าชีวิตของพาร์ติเคิล
            });
        }
    }

    generateGradientColor(index, totalParticles) {
        // ฟังก์ชันสำหรับสร้างสีแดงที่มีการไล่ระดับความเข้ม
        const lightness = 30 + (index / totalParticles) * 50; // ไล่ระดับความเข้ม
        return `hsl(0, 100%, ${lightness}%)`; // สีแดง (hue = 0)
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

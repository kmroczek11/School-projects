class Visual {

    constructor() {
        console.log("Konstruktor klasy Visual")
        this.scene = null
        this.camera = null
        this.renderer = null
        this.samples = null
        // this.angle = 0
        // this.radius = 150
        this.createScene()
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            $(window).width() / $(window).height(),
            0.1,
            10000
        );
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(0x000000)
        this.renderer.setSize($(window).width(), $(window).height())
        $("#root").append(this.renderer.domElement)
        // var axes = new THREE.AxesHelper(1000)
        // this.scene.add(axes)
        this.camera.position.set(150, 100, 150)
        this.createSamples(this.scene)
        this.render()
    }

    render() {
        this.renderer.render(this.scene, this.camera)
        this.camera.lookAt(this.samples.position)
        // this.camera.position.x = this.radius * Math.cos(this.angle)
        // this.camera.position.z = this.radius * Math.sin(this.angle)
        // this.angle += 0.01
        requestAnimationFrame(this.render.bind(this))
    }

    createSamples(scene) {
        var x = 5
        var y = 0
        var z = 5
        this.samples = new THREE.Group();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                var geometry = new THREE.BoxGeometry(10, 1, 10);
                var material = new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    side: THREE.DoubleSide,
                    wireframe: false,
                    transparent: true,
                    opacity: 0.5
                });
                var cube = new THREE.Mesh(geometry, material);
                cube.position.set(x, y, z)
                z += 10
                this.samples.add(cube);
            }
            x += 10
            z = 5
        }
        scene.add(this.samples)
    }

    changeSamples(samplesArray) {
        for (let i = 0; i < samplesArray.length; i++) {
            var unit = samplesArray[i] / 100
            var sample = this.samples.children[i]
            if (unit != 0){
                sample.scale.set(1, unit, 1)
                sample.material.color.setHex(this.hslToHex(samplesArray[i], 100, 50))
            }
            this.samples.children[i].position.y = unit * 10 / 2
        }
    }

    hslToHex(h, s, l) {
        h /= 360
        s /= 100
        l /= 100
        let r, g, b
        if (s === 0) {
          r = g = b = l
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s
          const p = 2 * l - q
          r = hue2rgb(p, q, h + 1 / 3)
          g = hue2rgb(p, q, h)
          b = hue2rgb(p, q, h - 1 / 3)
        }
        const toHex = x => {
          const hex = Math.round(x * 255).toString(16)
          return hex.length === 1 ? '0' + hex : hex
        }

        r *= 255
        g *= 255
        b *= 255
        
        return r << 16 | g << 8 | b
      }
}
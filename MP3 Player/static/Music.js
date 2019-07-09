class Music {

    constructor() {
        console.log("Konstruktor klasy Music")
        this.doVisualisation = null
        this.makeMusicReal()
    }

    loadMusic(path_to_mp3) {
        console.log("Załadowanie muzyki: " + path_to_mp3)
        $(".playButton").attr("id", path_to_mp3)
        $("#audio_src").prop("src", "mp3/" + path_to_mp3)
        $("#audio_src").attr("src", "mp3/" + path_to_mp3)

        $("#audio").trigger('load'); // załaduj plik mp3

        $("#audio").on("loadeddata", function () {
            console.log("mp3 jest załadowane")
        })
    }

    playMusic() {
        $("#audio").trigger("play")
        console.log("Granie muzyki.")
        this.doVisualisation = setInterval(function(){
            visual.changeSamples(music.getData())
        }, 1)
    }
    pauseMusic() {
        $("#audio").trigger('pause')
        console.log("Pauzowanie muzyki.")
        clearInterval(this.doVisualisation)
    }

    stopMusic() {
        $("#audio").trigger('pause')
        $("#audio").prop("currentTime", 0)
        console.log("Stopowanie muzyki.")
    }

    getCurrentTime() {
        return $("#audio").prop("currentTime")
    }

    getDuration() {
        return $("#audio").prop("duration")
    }

    makeMusicReal() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        this.audioContext = new AudioContext()
        this.audioElement = document.getElementById("audio")
        this.source = this.audioContext.createMediaElementSource(this.audioElement)
        this.analyser = this.audioContext.createAnalyser()
        this.source.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
        this.analyser.fftSize = 128
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
        this.analyser.getByteFrequencyData(this.dataArray)
    }

    getData() {
        this.analyser.getByteFrequencyData(this.dataArray)
        return this.dataArray
    }
}
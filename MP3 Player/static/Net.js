class Net {
    constructor() {
        console.log("Konstruktor klasy Net")
        this.readAlbums()
    }

    readAlbums() {
        $.ajax({
            url: "/",
            data: { albums: true },
            type: "POST",
            success: function (data) {

                // var obj = JSON.parse(data)

                // console.log(obj)

                ui.sendAlbums(data)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    readAlbum(number) {
        $.ajax({
            url: "/",
            data: { id: number },
            type: "POST",
            success: function (data) {

                // var obj = JSON.parse(data)

                // console.log(obj)
                ui.sendAlbum(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    createPlaylist(name) {
        $.ajax({
            url: "/",
            data: { playlistName: name },
            type: "POST",
            success: function (data) {

                var obj = JSON.parse(data)

                ui.createPlaylist(obj)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    addToPlaylist(id, song) {
        $.ajax({
            url: "/",
            data: { playlistId: id, songName: song },
            type: "POST",
            success: function (data) {

                var obj = JSON.parse(data)

                console.log(obj)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    loadPlaylists(){
        $.ajax({
            url: "/",
            data: { load: true },
            type: "POST",
            success: function (data) {

                var obj = JSON.parse(data)
                ui.loadPlaylists(obj)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    openPlaylist(index){
        $.ajax({
            url: "/",
            data: { plId: index },
            type: "POST",
            success: function (data) {

                var obj = JSON.parse(data)
                ui.openPlaylist(obj)

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
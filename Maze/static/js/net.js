class Net {
    constructor() {
        console.log("Konstruktor klasy net.")
    }

    saveLevel(level){
        $.ajax({
            url: "/save",
            data: { level: level },
            type: "POST",
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    updateLevel(id, level){
        $.ajax({
            url: "/update",
            data: { id: id, level: level },
            type: "POST",
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    checkIfSaved(callback){
        $.ajax({
            url: "/saved",
            type: "GET",
            success: function (data) {
                callback(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    addedLevel(){
        $.ajax({
            url: "/added",
            type: "GET",
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    changeCurrentLevel(id){
        $.ajax({
            url: "/changeLevel",
            data: { selectedLevel: id },
            type: "POST",
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    checkLevelsQuantity(callback){
        $.ajax({
            url: "/getLevelsQuantity",
            type: "GET",
            success: function (data) {
                callback(parseInt(data))
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    loadLevel(id){
        $.ajax({
            url: "/load",
            data: { id: id },
            type: "POST",
            success: function (data) {
                hex.updateHexes(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}
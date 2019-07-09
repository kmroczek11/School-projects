function animateText1(text) {
    if (length < text.length) {
        document.getElementById("notifications").innerHTML += text[length]
        length++
    } else {
        length = 0
        animate = clearInterval(animate)
        setTimeout(function () {
            document.getElementById("notifications").innerHTML = ""
        }, 1000)
    }
}

function animateText2(text, callback) {
    if (length < text.length) {
        document.getElementById("notifications").innerHTML += text[length]
        length++
    } else {
        length = 0
        animate = clearInterval(animate)
        setTimeout(function () {
            document.getElementById("notifications").innerHTML = ""
            if (callback != undefined) {
                callback()
            }
        }, 1000)
    }
}

class Ui {
  constructor() {
    var intensity = $("<input>");
    intensity.addClass("intensity");
    var height = $("<input>");
    height.addClass("height");
    intensity.attr("type", "range");
    intensity.attr("min", "0");
    intensity.attr("max", "10");
    height.attr("type", "range");
    height.attr("min", "-140");
    height.attr("max", "100");
    $("#root").append(intensity);
    $("#root").append(height);

    intensity.on("input", function() {
      for (let i = 0; i < level3d.lights.length; i++) {
        level3d.lights[i].children[0].intensity = $(this).val();
      }
    });

    height.on("input", function() {
      for (let i = 0; i < level3d.lights.length; i++) {
        level3d.lights[i].position.y = $(this).val();
      }
    });
  }
}

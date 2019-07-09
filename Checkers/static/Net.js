class Net {
  constructor() {
    console.log("Utworzenie klasy Net.");
  }

  action(action, user) {
    $.ajax({
      url: "/",
      data: { action: action, user: user },
      type: "POST",
      success: function(data) {
        var obj = JSON.parse(data);
        ui.changeStatus(obj);
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
  }

  waitForPlayer(callback) {
    $.ajax({
      url: "/",
      data: { wait: true },
      type: "POST",
      success: function(data) {
        data = JSON.parse(data);
        callback(data.result);
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
  }
}

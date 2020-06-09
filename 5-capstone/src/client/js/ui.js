class UI {
  updateTripUI(tripInfo) {
    const date = new Date(tripInfo.date);
    document.getElementById("destination").innerHTML = tripInfo.city;
    document.getElementById("tripdate").innerHTML = date.toDateString();
  }

  updateWeatherUI(weatherInfo) {
    document.getElementById("high").innerHTML = `${weatherInfo.temp}\u00B0 F`;
    document.getElementById("summary").innerHTML = `${weatherInfo.summary}`;
  }

  updateImageUI(imageUrl) {
    if (imageUrl.url) {
      document.getElementById(
        "photo"
      ).innerHTML = `<img src="${imageUrl.url}">`;
    } else {
      document.getElementById("photo").innerHTML = "";
    }
  }

  showTrip() {
    document.getElementById("trip").style.display = "grid";
  }

  hideTrip() {
    document.getElementById("trip").style.display = "none";
  }

  clearForm() {
    document.getElementById("city").innerHTML = "Enter city";
    document.getElementById("date").innerHTML = "";
  }

  showForm() {
    document.getElementById("form").style.display = "block";
  }

  hideForm() {
    document.getElementById("form").style.display = "none";
  }
}

export const ui = new UI();

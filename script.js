const binaryApiKey = '00110110 00110101 01100101 01100100 01100010 00110111 00110110 01100100 00110001 01100110 00110100 01100100 00110100 00110101 00111000 00111001 00111000 00110001 00111001 00110001 00110001 00110011 00110111 00110010 00110110 00110010 00110011 00110011 00110001 00110000 00110101';
const apiKey = binaryApiKey.split(' ').map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
/////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const humidity = document.querySelector("#humid");
  const temperature = document.querySelector("#tempr");
  const condition = document.querySelector("#cnd");
  const conditionIcon = document.querySelector("#conditionIcon");
  const inputField = document.getElementById("inpt");

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      const userLocation = inputField.value;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userLocation}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const APIcondition = data.current.condition.text;
          const APItemp = data.current.temp_c + "°C";
          const APIhumidity = data.current.humidity + "%";

          inputField.style.background = "linear-gradient(75deg, rgba(10,190,193,1) 0%, rgba(0,183,255,1) 100%)";
          humidity.innerHTML = APIhumidity;
          temperature.innerHTML = APItemp;

          condition.innerHTML = "";
          const conditionText = document.createElement("p");
          conditionText.textContent = APIcondition;
          condition.appendChild(conditionText);
          condition.appendChild(conditionIcon);

      

          conditionIcon.classList.remove("fa-wind");
          condition.style.fontSize = "1.8em";

          if (APIcondition.toLowerCase().includes("sunny")) {
            conditionIcon.className = "fa fa-sun";
          } else if (APIcondition.toLowerCase().includes("cloud")) {
            conditionIcon.classList.add("fa-cloud");
          } else if (APIcondition.toLowerCase().includes("rain")) {
            conditionIcon.classList.add("fa-cloud-rain");
          } else if (APIcondition.toLowerCase().includes("snow")) {
            conditionIcon.classList.add("fa-snowflake");
          } else if (APIcondition.toLowerCase().includes("thunder")) {
            conditionIcon.classList.add("fa-bolt");
          } else {
            conditionIcon.classList.add("fa-wind");
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  });
});
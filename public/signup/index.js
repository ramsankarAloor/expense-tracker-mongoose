const apiBaseUrl = BASE_URL;

let form = document.getElementById("signup-form");

form.addEventListener("submit", postSignup);

async function postSignup(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailError = document.getElementById("emailError");

  const obj = {
    name: name,
    email: email,
    password: password,
  };

  try {
  await axios.post(`${apiBaseUrl}/signup`, obj);
  const { data: loginUser } = await axios.post(`${apiBaseUrl}/login`, {
    email: email,
    password: password,
  });
  //setting date at login
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(today.getDate()).padStart(2, "0"); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;
  localStorage.setItem("lastEnteredDate", formattedDate);

  localStorage.setItem("token", loginUser.accessToken);
  window.location.href = "../expense/index.html";
  } catch (error) {
    if (error.response.status === 403) {
      emailError.textContent = "*This email is already registered";
    }
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

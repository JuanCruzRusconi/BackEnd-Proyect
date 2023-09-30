
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();
    const data = new FormData(form);
    const obje = {};

    data.forEach((value, key) => obje[key] = value);
    console.log(obje);

    const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(obje),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const responseToken = await response.json();
    console.log(responseToken);

    if(responseToken.error){
        return alert("No se inicio sesion")
    }
    localStorage.setItem("accessToken", responseToken.accessToken)
});
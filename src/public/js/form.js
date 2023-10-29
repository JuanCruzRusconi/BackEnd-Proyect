
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {

    event.preventDefault();
    const data = new FormData(form);
    const obje = {};

    data.forEach((value, key) => obje[key] = value);
    console.log(obje);

    const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(obje),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(result => result.json())
        .then(result => {
            console.log(result)
            if (result.status === 200) {
                { alert(result.message) }
                window.location.replace('/users/profile');
            }
            if (result.status === 400) { alert('You are not registered.') }
        })



});

const responseToken = await response.json();
console.log(responseToken);

if (responseToken.error) {
    return alert("No se inicio sesion")
}
localStorage.setItem("accessToken", responseToken.accessToken)


        
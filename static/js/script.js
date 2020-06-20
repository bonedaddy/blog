axios.post("/.netlify/functions/search?s=docker")
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
console.log("broooooo");
window.alert("DUDE");
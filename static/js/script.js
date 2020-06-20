axios.post("/.netlify/functions/search?s=docker")
    .then(function (response) {
        response.data.forEach(element => console.log(element.path));
    })
    .catch(function (error) {
        console.error(error);
    });
console.log("broooooo");
window.alert("DUDE");
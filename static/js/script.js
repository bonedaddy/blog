html = `
<html>
<div id="main-p">
<form action="#" onsubmit="search(query);return false">
<label for="query">Enter Search Query</label><br>
<input type="text" id="query" name="query"><br>
</form>
</div>
</html>
`

function search(query) {
    axios.post("/.netlify/functions/search?s="+query.value)
    .then(function (response) {
        let l = "";
        response.data.forEach(
            element => {
                l += `<p>` + element + `</p>`;
            }
        );
        document.getElementById('main-p').innerHTML += l;
    })
    .catch(function (error) {
        document.getElementById('main-p').innerHTML += error;
    });
}
document.write(html);


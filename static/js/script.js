html = `
<html>
<div id="main-p">
<form action="#" onsubmit="search(query);return false">
<label for="query">Enter Search Query</label><br>
<input type="text" id="query" name="query"><br>
</form>
<br>
<button type="button" onclick="clearPage();return false">clear</button>
</div>
</html>
`
function search(query) {
    axios.post("/.netlify/functions/search?s="+query.value)
    .then(function (response) {
        let l = "";
        response.data.forEach(
            element => {
                l += `<p>` + element.path + `</p>`;
            }
        );
        document.getElementById('main-p').innerHTML += l;
    })
    .catch(function (error) {
        const output = `
        </br>
        <body>
            Unfortunately your request failed with the following:
            </br>
        ` + error + `</body>`
        document.getElementById('main-p').innerHTML += output;
    });
}

function clearPage() {
    document.getElementById('main-p').innerHTML = html;
}

document.write(html);


html = `
<html>
<form action="#" onsubmit="search(query);return false">
<label for="query">Enter Search Query</label><br>
<input type="text" id="query" name="query"><br>
</form>
</html>
`

function search(query) {
    axios.post("/.netlify/functions/search?s="+query.value)
    .then(function (response) {
        const l = "hello";
        response.data.forEach(
            element => {
                document.writeln(`<p>` + element + `</p>`);
            }
            );
    })
    .catch(function (error) {
        console.error(error);
    });
}
document.write(html);


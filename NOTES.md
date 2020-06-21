With the `list.html` layout override in the `blog` section, it causes directories below it to also show the title underneat the main content body.

To disable this add the following to the frontmatter:
```
disableListOverride: true
```


To embed gists we can use the following shortcode `{{< gist bonedaddy 8d77e12d223d2baf3e7c0d650ac91085 >}}` although for some reason it doesnt seem to work in the `random` field
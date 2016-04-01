---
layout: std
title: Enter the pony - News archive
---

<div class="page-header">
 <h2>NEWS - Archive index</h2>
</div>

{% for post in site.posts reverse %}
{% if post.index != false %}
* {{ post.date | date: "%d.%m.%Y" }} - [{{ post.title }}]({{ post.url }})
{% endif %}
{% endfor %}

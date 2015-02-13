---
layout: std
---

<h2>Latest 10 recent news (<a href="{{ site.url }}/news/archive.html">see index</a>)</h2>
<hr/>
{% for post in site.posts limit:6 %}
<h4>{{ post.date | date: "%B %d, %Y" }}</h4>
<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
<p>{{ post.content }}</p>
<hr/>
{% endfor %}

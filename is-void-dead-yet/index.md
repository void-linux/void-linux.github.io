---
layout: std
title: Is Void dead yet?
responses:
  - "NO"
  - "THERE IS AS YET INSUFFICIENT DATA FOR A MEANINGFUL ANSWER."
  - "<a href='https://github.com/void-linux/void-packages/pulse'>Nope.</a>"
---
<h1 id="is-dead-title">Is Void dead yet?</h1>
<div id="is-dead-response">NO</div>
<script type="text/javascript">
var responses = ["{{ page.responses | join: '","' }}"];
var idx = Math.floor(Math.random() * responses.length);
document.querySelector("#is-dead-response").innerHTML = responses[idx];
</script>

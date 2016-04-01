---
layout: std
title: Enter the pony - Packages
---

<div>
<h2>Find binary packages</h2>
 <p>Search for available binary packages in the official repository index matching simple keywords.</p>
 <form method="GET" action="https://github.com/voidlinux/void-packages/search" onkeypress="return event.keyCode != 13;">
 <input type="hidden" name="q[]" value="filename:template path:/srcpkgs" />
 <input type="text" name="q[]" placeholder="Package name" id="voidSearch_box" onkeyup="if(window.voidSearch)window.voidSearch()" />
 <input type="hidden" name="s" value="indexed" />
 <table id="voidSearch_result"></table>
 <button type="submit">Search on Github</button>
 </form>
 <script src="/assets/js/voidsearch.js" async></script>

<h2>Latest package commits <span class="rssdev"><a href="https://github.com/voidlinux/void-packages/commits/master.atom" title="Subscribe to void-packages"><i class="fa fa-rss fa-lg"></i></a></span></h2>
 <ul>
  <script src="{{site.url}}/assets/js/voidcommits.js"></script>
  <script src="https://api.github.com/repos/voidlinux/void-packages/commits?page=1&amp;per_page=10&amp;callback=voidcommits&amp;sha=master"></script>
 </ul>
</div>

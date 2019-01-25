---
layout: std
title: Enter the void - Packages
---

<div>
<h2>Find binary packages</h2>
 <p>Search for available binary packages in the official repodata index matching simple keywords.</p>
 <form id="voidSearch">
 <select name="arch" id="voidSearch_archs">
 <option value="x86_64">x86_64</option>
 </select>
 <input type="text" name="q" placeholder="Package or description" id="voidSearch_query"/>
 <button type="submit" id="voidSearch_submit">Search</button>
 </form>
 <table id="voidSearch_result">
 </table>

<script src="/assets/js/voidsearch.js" async></script>

<h2>Latest package commits <span class="rssdev"><a href="https://github.com/void-linux/void-packages/commits/master.atom" title="Subscribe to void-packages"><i class="fa fa-rss fa-lg"></i></a></span></h2>
 <ul>
  <script src="/assets/js/voidcommits.js"></script>
  <script src="https://api.github.com/repos/void-linux/void-packages/commits?page=1&amp;per_page=10&amp;callback=voidcommits&amp;sha=master"></script>
 </ul>
</div>

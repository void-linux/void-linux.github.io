---
layout: default
title: Enter the Xibeca
---

<div class="container">
        <div class="row">
                <div class="col-md-4">
                        <h3>Not a fork!</h3>
			<p>Unlike other things you find in the kitchen Xibeca isn't a fork. - It's beer.</p>
		</div>
                <div class="col-md-4">
                        <h3>Rofling release</h3>
			<p>Drink once, buy daily. Your body will always be up-to-date.</p>
		</div>
		<div class="col-md-4">
			<h3>systemd kernel</h3>
			<p>We do use the systemd kernel as native distributor worlwide!</p>
		</div>
	</div>
        <div class="row">
                <div class="col-md-4">
                        <h3>Get drunk daily!</h3>
			<p>It's cheap and will make you happy all day!</p>
		</div>
                <div class="col-md-4">
                        <h3>Be cool with your friends</h3>
			<p>What's better than drinking xibeca with your friends? nothing at all.</p>
		</div>
		<div class="col-md-4">
			<h3>Be productive!</h3>
			<p>Xibeca makes you stronger, faster and simply better.</p>
		</div>
	</div>
	<hr>
	<div class="page-header">
		<h2>Recent news <a href="/atom.xml" title="Subscribe to the news"><i class="fa fa-rss fa-lg"></i></a></h2>
	</div>
	<div class="row">
			{% for post in site.posts limit:2 %}
			<div class="col-md-6">
				<h4>{{ post.date | date: "%B %d, %Y" }}</h4>
				<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
				{{ post.content }}
			</div>
			{% endfor %}
	</div>
</div>

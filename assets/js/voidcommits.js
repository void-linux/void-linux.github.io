function voidcommits(response) {
	var html = "", commit, i;
	function esc(str) {
		return str.replace('"', '&quot;').
			replace('<', '&lt;').
			replace('>', '&gt;');
	}
	for(i = 0; i < response.data.length; i++) {
		commit = response.data[i];
		html += '<li><a href="'+esc(commit.html_url)+'">'+
			esc(commit.commit.message.split('\n')[0]) + "</a></li>"
	}
	document.write(html);
}

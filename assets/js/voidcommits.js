function voidcommits(response) {
	var html = "", commit, i;
	function esc(str) {
		return str.replace(/"/g, '&quot;').
			replace(/</g, '&lt;').
			replace(/>/g, '&gt;');
	}
	for(i = 0; i < response.data.length; i++) {
		commit = response.data[i];
		html += '<li><a href="' + esc(commit.html_url) + '" title="' +
			esc(commit.commit.message) + '">' +
			esc(commit.commit.message.split('\n')[0]) + "</a></li>";
	}
	document.write(html);
}

function voidpulls(response) {
	var html = "", commit, i;
	function esc(str) {
		return str.replace(/"/g, '&quot;').
			replace(/</g, '&lt;').
			replace(/>/g, '&gt;');
	}
	for(i = 0; i < response.data.length; i++) {
		pull = response.data[i];
		html += '<li><a href="' + esc(pull.html_url) + '" title="' +
			esc(pull.title) + '">' +
			'#' + pull.number + ': ' +
			esc(pull.title.split('\n')[0]) + "</a></li>";
	}
	document.write(html);
}

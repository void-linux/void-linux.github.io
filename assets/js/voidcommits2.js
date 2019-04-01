function voidcommits(response) {
	var html = "", commit, i;
	function esc(str) {
		return str.replace(/"/g, '&quot;').
			replace(/</g, '&lt;').
			replace(/>/g, '&gt;');
	}
	html+='<table><tbody>'
	for(i = 0; i < response.data.length; i++) {
		commit = response.data[i];
		html += '<tr>'+
				'    <td class="pkg-name"><span class="community">'+esc(commit.commit.message.split(':')[0])+'</span></td>'+
				'    <td class="pkg-arch">'+
				'        <a href="https://github.com/voidlinux/void-packages/blob/master/srcpkgs/'+esc(commit.commit.message.split(':')[0])+'" title="Details for '+esc(commit.commit.message.split(':')[0])+'">any</a>'+
				'    </td>'+
				'</tr>';
		//html += '<li><a href="' + esc(commit.html_url) + '" title="' +
		//	esc(commit.commit.message) + '">' +
		//	esc(commit.commit.message.split('\n')[0]) + "</a></li>";
	}
	html+='</tbody></table>';
	document.write(html);
}

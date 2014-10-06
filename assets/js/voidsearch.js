(function(w,d){
	var minsize = 2;
	var packages = "http://repo.voidlinux.eu/current/";
	var reg = /<a href=[^>]*>([^<]*)-([^<-]*)_([0-9]+)\.([^.]*)\.xbps<\/a>.*\s([0-9]+)$/gm;
	var r;
	var idx = 0;
	var results = [];
	function handleResponse() {
		var box = d.getElementById('voidSearch_box');
		if(r.readyState == 4)
			box.className = '';
		addResults();
		render();
	}
	function addResults() {
		var match;
		reg.lastIndex = idx;
		while(match = reg.exec(r.responseText)) {
			idx = reg.lastIndex;
			results.push({
				haystack: (match[1]+" "+match[2]+" "+match[3]+" "+match[4]).toLowerCase(),
				name: match[1],
				version: match[2],
				revision: match[3],
				arch: match[4],
				size: match[5],
			});
		}
	}

	function render() {
		var a, tr, i, j, found
		  , tbody = document.createElement("tbody")
		  , table = document.getElementById("voidSearch_result")
		  , empty = true

		if(needle.join("").length < minsize) {
			table.innerHTML = "";
			return;
		}
		tbody.innerHTML = "<tr><th>Name</th><th>Version</th><th>Revision</th><th>Arch</th><th>Size (bytes)</th></tr>"
		for(i = 0; i < results.length; i++) {
			found=0
			for(j = 0; j < needle.length; j++)
				if(results[i].haystack.indexOf(needle[j]) == -1) break;
			if(j != needle.length)
				continue;

			empty = false;
			tr = document.createElement('tr');
			tr.innerHTML = "<td class=name></td><td class=version></td><td class=revision></td><td class=arch></td><td class=size></td>";

			a = document.createElement('a');
			a.href = 'https://github.com/voidlinux/void-packages/tree/master/srcpkgs/' + results[i].name;
			a.appendChild(document.createTextNode(results[i].name));
			tr.childNodes[0].appendChild(a);
			tr.childNodes[1].appendChild(document.createTextNode(results[i].version));
			tr.childNodes[2].appendChild(document.createTextNode(results[i].revision));
			tr.childNodes[3].appendChild(document.createTextNode(results[i].arch));
			tr.childNodes[4].appendChild(document.createTextNode(results[i].size));
			tbody.appendChild(tr);
		}
		table.innerHTML = "";
		table.appendChild(tbody);
		tr = document.createElement("tr");
		if(r.readyState != 4)
			tr.innerHTML = "<th colspan='5'>Loading...</th>";
		else if(empty && r.readyState == 4)
			tr.innerHTML="<th colspan='5'>No Results</th>";
		else
			return;
		tbody.appendChild(tr);
	}
	w.voidSearch = function() {
		var box = d.getElementById('voidSearch_box');
		needle = box.value.toLowerCase().trim().split(/\s+/);

		if(r) {
			render();
			return;
		}

		r = new XMLHttpRequest();
		r.open("GET", packages, true);

		r.onreadystatechange = handleResponse
		box.className = 'loading';
		r.send();
		return;
	}
	var box = d.getElementById('voidSearch_box');
	if(box && box.value)
		w.voidSearch();
})(window,document)


(function(w,d){
	var minsize = 2;
	var timeout = -1;
	var maxResults = 100;
	var showAll = false;
	var repos = [
		"https://repo.voidlinux.eu/current/",
		"https://repo.voidlinux.eu/current/multilib/",
		"https://repo.voidlinux.eu/current/nonfree/",
		"https://repo.voidlinux.eu/current/multilib/nonfree/",
		"https://repo.voidlinux.eu/current/debug/"

		"https://repo.voidlinux.eu/current/musl/",
		"https://repo.voidlinux.eu/current/musl/nonfree/",
		"https://repo.voidlinux.eu/current/musl/debug/"
	];
	var repoNames = [
		"current",
		"multilib",
		"nonfree",
		"multilib/nonfree",
		"debug",

		"current",
		"nonfree",
		"debug"
	]
	var currentRepo = 0;
	var reg = /<a href=[^>]*>([^<]*)-([^<-]*)_([0-9]+)\.([^.]*)\.xbps<\/a>.*\s([0-9]+)$/gm;
	var r;
	var idx = 0;
	var results = [];
	function handleResponse() {
		var box = d.getElementById('voidSearch_box');
		if(r.readyState == 4) {
			currentRepo++;
			if(currentRepo != repos.length) {
				startSearch();
			}
			else
				box.className = '';
		}
		addResults();
		render();
	}
	function addResults() {
		var match;
		reg.lastIndex = idx;
		while(match = reg.exec(r.responseText)) {
			idx = reg.lastIndex;
			results.push({
				haystack: (match[1]+" "+match[2]+" "+match[3]+" "+match[4]+" "+repoNames[currentRepo]).toLowerCase(),
				name: match[1],
				version: match[2],
				revision: match[3],
				arch: match[4],
				size: match[5],
				repo: repoNames[currentRepo]
			});
		}
	}

	function render() {
		var a, tr, i, j, found = 0
		  , tbody = document.createElement("tbody")
		  , table = document.getElementById("voidSearch_result");

		if(needle.join("").length < minsize) {
			table.innerHTML = "";
			return;
		}
		tbody.innerHTML = "<tr><th>Name</th><th>Version</th><th>Revision</th><th>Arch</th><th>Repository</th><th>Size (bytes)</th></tr>"
		for(i = 0; i < results.length; i++) {
			if(found > maxResults && !showAll)
				break;
			for(j = 0; j < needle.length; j++)
				if(results[i].haystack.indexOf(needle[j]) == -1) break;
			if(j != needle.length)
				continue;
			found++;

			tr = document.createElement('tr');
			tr.innerHTML = "<td class=name></td><td class=version></td><td class=revision></td><td class=arch></td><td class=repo></td><td class=size></td>";

			a = document.createElement('a');
			a.href = 'https://github.com/voidlinux/void-packages/tree/master/srcpkgs/' + results[i].name;
			a.appendChild(document.createTextNode(results[i].name));
			tr.childNodes[0].appendChild(a);
			tr.childNodes[1].appendChild(document.createTextNode(results[i].version));
			tr.childNodes[2].appendChild(document.createTextNode(results[i].revision));
			tr.childNodes[3].appendChild(document.createTextNode(results[i].arch));
			tr.childNodes[4].appendChild(document.createTextNode(results[i].repo));
			tr.childNodes[5].appendChild(document.createTextNode(results[i].size));
			tbody.appendChild(tr);
		}
		table.innerHTML = "";
		table.appendChild(tbody);
		tr = document.createElement("tr");
		if(r.readyState != 4)
			tr.innerHTML = "<th colspan='6'>Loading...</th>";
		else if(found > maxResults && !showAll)
			tr.innerHTML="<th colspan='6'>More than "+maxResults+" results. <a href='javascript:void(window.voidSearch(true));'>show all</a></th>";
		else if(found == 0 && r.readyState == 4)
			tr.innerHTML="<th colspan='6'>No Results</th>";
		else
			return;
		tbody.appendChild(tr);
	}
	function startSearch() {
		r = new XMLHttpRequest();
		r.open("GET", repos[currentRepo], true);
		idx = 0;

		r.onreadystatechange = handleResponse
		box.className = 'loading';
		r.send();
	}
	w.voidSearch = function(sa) {
		var box = d.getElementById('voidSearch_box');
		needle = box.value.toLowerCase().trim().split(/\s+/);
		showAll = !!sa;

		if(r) {
			if(timeout != -1)
				clearTimeout(timeout);
			timeout = setTimeout(function() {
				timeout = -1;
				render();
			}, 500);
		}
		else {
			startSearch();
		}
	}
	var box = d.getElementById('voidSearch_box');
	if(box && box.value)
		w.voidSearch();
})(window,document)


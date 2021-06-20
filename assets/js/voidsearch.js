(function($, w, d) {
    "use strict";

    // Constants
    const apiHost = "https://xq-api.voidlinux.org";
    const maxResults = 100;

    const szByte = 1;
    const szKilobyte = 1024 * szByte;
    const szMegabyte = 1024 * szKilobyte;
    const szGigabyte = 1024 * szMegabyte;

    // Package column fields and headers
    const packageColumns = [
        "anchor",
        "version",
        "revision",
        "repository",
        "filename_size",
        "short_desc"
    ];

    const packageHeader = {
        name: "Name",
        version: "Version",
        revision: "Revision",
        repository: "Repository",
        filename_size: "Size",
        short_desc: "Description"
    };

    let header;
    let table;
    let archs;
    let query;
    let form;
    let params;

    let packages = [];

    // Functions

    function init() {
        header = packageCell(packageHeader, "<th>");

        table = $("#voidSearch_result");
        archs = $("#voidSearch_archs");
        query = $("#voidSearch_query");
        form = $("#voidSearch");
        form.submit(formPackageQuery);
        params = new URLSearchParams(document.location.search.substring(1));

        $.getJSON(uri("/v1/archs"))
            .done((data) => {
                setArchitectures(data.data.sort());
                initPackageQuery();
            });
    }

    function initPackageQuery() {
        // if there are query parameters arch and q, do a search for that query on that arch
        const arch = archs.val();
        const q = params.get("q");
        if (q !== null && q !== "") {
            query.val(q);
            packageQuery(arch, q);
        }
    }

    function formPackageQuery(e) {
        e.preventDefault();
        const arch = archs.val();
        const q = query.val().trim();
        if (q !== null && q !== "") {
            packageQuery(arch, q);
        }
    }

    function packageQuery(arch, q) {
        query.addClass("loading");
        $.getJSON(uri("/v1/query/" + arch, { q: q }))
            .done((data) => {
                packages = data.data || [];
                showPackages(packages, false, q);
            })
            .always(() => { query.removeClass("loading"); });
        history.replaceState(null, null, "?arch=" + arch + "&q=" + q);
    }

    function packageCell(pkg, cellType) {
        cellType = cellType || "<td>";
        let tr = $("<tr>");
        packageColumns.forEach((col) => {
            var cell = $(cellType);
            cell.addClass(col).html(pkg[col] || "");
            tr.append(cell);
        });
        return tr;
    }

    function transformPackageForPackageCell(p) {
        let ghSlug = p.name.replace(/-(?:32bit|dbg)$/, "");
        p.anchor = "<a href=\"https://github.com/void-linux/void-packages/tree/master/srcpkgs/"
            + ghSlug + "\" target=\"_blank\" title=\"View on GitHub\">" + p.name + "</a>";
        p.filename_size = typeof(p.filename_size) == 'number' ? formatSize(p.filename_size) : p.filename_size;
        return p;
    }

    function showPackages(packages, showAll, searchQuery = '') {
        packages = packages || [];
        var packagesExactMatch = getPackagesExactMatch(packages, searchQuery);
        const tooMany = !showAll && packages.length > maxResults;
        if (tooMany) {
            packages = packages.slice(0, maxResults);
        }

        table.children().remove();
        if (packages.length == 0) {
            table.append(noResultsNotice());
            return;
        }
        table.append(
            header,
            packages.map((p) => {
                return packageCell(transformPackageForPackageCell(p), "<td>");
            })
        );

        if (tooMany) {
            table.append(tooManyNotice());
        }

        if (packagesExactMatch.length >= 1) {
            $('#voidSearch_result tr:first').after(
                packagesExactMatch.map((p) => {
                    return packageCell(
                        transformPackageForPackageCell(p),
                        "<td style='background-color: #dff0d8; font-weight:bold'>"
                    );
                })
            );
        }

    }

    function getPackagesExactMatch(packages, searchQuery) {
        if (searchQuery.trim() === "") {
            return [];
        }
        packages = packages || [];
        if (packages.length <= 1) {
            return [];
        }
        searchQuery = searchQuery.trim().toLowerCase();
        return packages.filter(p => p.name.toLowerCase() === searchQuery);
    }

    function setArchitectures(archNames) {
        // Get the current value of the select from url params
        let val = params.get("arch");
        let found = false;
        let seenX86_64 = false;
        archs.children().remove();
        archNames.forEach((arch) => {
            found = found || arch === val;
            seenX86_64 = seenX86_64 || arch === "x86_64";
            const opt = $("<option>");
            opt.val(arch).text(arch);
            archs.append(opt);
        });
        if (!found) {
            // If the current value wasn"t found, prefer x86_64 if it"s in the list.
            val = seenX86_64 ? "x86_64" : archs.children().first().val();
        }
        archs.val(val);
    }

    function uri(path, params) {
        const qs = params ? ("?" + $.param(params)) : "";
        return apiHost + path + qs;
    }

    function formatSize(size) {
        // NOTE: Doesn"t handle negative numbers.
        if (typeof size !== "number") {
            return "";
        }
        if (size < 10000) {
            return (size >> 0) + "B";
        } else if (size < szMegabyte) {
            return (size / szKilobyte >> 0) + "k";
        } else if (size < szGigabyte) {
            return (size / szMegabyte).toFixed() + "M";
        }
        return (size / szGigabyte).toFixed(2).replace(/\.?0+$/, "") + "G";
    }

    function tooManyNotice() {
        let notice = $("<tr>");
        return notice.append(
            $("<td>")
            .addClass("toomany")
            .attr("colspan", packageColumns.length)
            .text("Too many results (over " + maxResults + "). ")
            .append($("<a>").text("Show all.").click(() => showPackages(packages, true)))
        );
    }

    function noResultsNotice() {
        let notice = $("<tr>");
        return notice.append(
            $("<td>")
            .addClass("noresults")
            .attr("colspan", packageColumns.length)
            .attr("style", "font-weight:bold; padding-top: 10pt")
            .text("No results found.")
        );
    }

    // Start
    init();
}(jQuery, window, document));

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

    let packages = [];

    // Functions

    function init() {
        header = packageCell(packageHeader, "<th>");

        table = $("#voidSearch_result");
        archs = $("#voidSearch_archs");
        query = $("#voidSearch_query");
        form = $("#voidSearch");
        form.submit(packageQuery);

        $.getJSON(uri("/v1/archs"))
            .done((data) => setArchitectures(data.data.sort()));
    }

    function packageQuery(e) {
        e.preventDefault();
        query.addClass("loading");
        const q = query.val().trim();
        $.getJSON(uri("/v1/query/" + archs.val(), { q: q }))
            .done((data) => {
                packages = data.data || [];
                showPackages(packages, false);
            })
            .always(() => { query.removeClass("loading"); });
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

    function showPackages(packages, showAll) {
        packages = packages || [];
        const tooMany = !showAll && packages.length > maxResults;
        if (tooMany) {
            packages = packages.slice(0, maxResults);
        }

        table.children().remove();
        if (packages.length == 0) {
            return;
        }
        table.append(
            header,
            packages.map((p) => {
                p.anchor = "<a href=\"https://github.com/void-linux/void-packages/tree/master/srcpkgs/"
                    + p.name + "\" target=\"_blank\" title=\"View on GitHub\">" + p.name + "</a>";
                p.filename_size = formatSize(p.filename_size);
                return packageCell(p, "<td>");
            })
        );

        if (tooMany) {
            table.append(tooManyNotice());
        }
    }

    function setArchitectures(archNames) {
        // Get the current value of the select
        const val = archs.val();
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

    // Start
    init();
}(jQuery, window, document));

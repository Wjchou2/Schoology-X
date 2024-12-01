!(function (e, t, r, n, o, s, c, i, l, u, a, h, d, p) {
    for (
        a = e.JellyCheckbox = e.JellyCheckbox || {},
            (h = t.createElement("style")).innerHTML =
                "jelly-checkbox{visibility:hidden}.hydrated{visibility:inherit}",
            h.setAttribute("data-styles", ""),
            d = t.head.querySelector("meta[charset]"),
            t.head.insertBefore(h, d ? d.nextSibling : t.head.firstChild),
            (function (e, t, r) {
                (e["s-apps"] = e["s-apps"] || []).push("JellyCheckbox"),
                    r.componentOnReady ||
                        (r.componentOnReady = function () {
                            var t = this;
                            function r(r) {
                                if (t.nodeName.indexOf("-") > 0) {
                                    for (
                                        var n = e["s-apps"], o = 0, s = 0;
                                        s < n.length;
                                        s++
                                    )
                                        if (e[n[s]].componentOnReady) {
                                            if (e[n[s]].componentOnReady(t, r))
                                                return;
                                            o++;
                                        }
                                    if (o < n.length)
                                        return void (e["s-cr"] =
                                            e["s-cr"] || []).push([t, r]);
                                }
                                r(null);
                            }
                            return e.Promise ? new e.Promise(r) : { then: r };
                        });
            })(e, 0, u),
            o = o || a.resourcesUrl,
            h = (d = t.querySelectorAll("script")).length - 1;
        h >= 0 && !(p = d[h]).src && !p.hasAttribute("data-resources-url");
        h--
    );
    (d = p.getAttribute("data-resources-url")),
        !o && d && (o = d),
        !o &&
            p.src &&
            (o =
                (d = p.src.split("/").slice(0, -1)).join("/") +
                (d.length ? "/" : "") +
                "jelly-checkbox/"),
        (h = t.createElement("script")),
        (function (e, t, r, n) {
            return (
                !(t.search.indexOf("core=esm") > 0) &&
                (!(
                    !(
                        t.search.indexOf("core=es5") > 0 ||
                        "file:" === t.protocol
                    ) &&
                    e.customElements &&
                    e.customElements.define &&
                    e.fetch &&
                    e.CSS &&
                    e.CSS.supports &&
                    e.CSS.supports("color", "var(--c)") &&
                    "noModule" in r
                ) ||
                    (function (e) {
                        try {
                            return new Function('import("")'), !1;
                        } catch (e) {}
                        return !0;
                    })())
            );
        })(e, e.location, h)
            ? (h.src = o + "jelly-checkbox.r3oxg0vt.js")
            : ((h.src = o + "jelly-checkbox.rul0okex.js"),
              h.setAttribute("type", "module"),
              h.setAttribute("crossorigin", !0)),
        h.setAttribute("data-resources-url", o),
        h.setAttribute("data-namespace", "jelly-checkbox"),
        t.head.appendChild(h);
})(window, document, 0, 0, 0, 0, 0, 0, 0, HTMLElement.prototype);

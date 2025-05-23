(() => {
    "use strict";
    window.addEventListener("load", (function() {
        document.querySelectorAll(".betterdocs-category-grid-inner-wrapper.masonry").forEach((e => {
            ! function(e, t) {
                let a = t(".betterdocs-category-grid-inner-wrapper.masonry", e);
                if (0 != a ? .length) {
                    var r = window.matchMedia("(max-width: 767px)"),
                        c = window.matchMedia("(max-width: 1024px)");
                    a.each(((e, t) => {
                        var a;
                        let o = 0,
                            n = 0;
                        switch (!0) {
                            case r.matches:
                                o = t.getAttribute("data-column_mobile"), n = t.getAttribute("data-column_space_mobile");
                                break;
                            case c.matches:
                                o = t.getAttribute("data-column_tab"), n = t.getAttribute("data-column_space_tab");
                                break;
                            default:
                                o = t.getAttribute("data-column_desktop"), n = null !== (a = t.getAttribute("data-column_space_desktop")) && void 0 !== a ? a : 15
                        }
                        n = parseInt(n), o = parseInt(o);
                        let i = t.querySelectorAll(".betterdocs-single-category-wrapper"),
                            l = (o - 1) * n;
                        t && (i.forEach((e => {
                            e.style.width = `calc((100% - ${l}px) / ${o})`
                        })), new Masonry(t, {
                            itemSelector: ".betterdocs-single-category-wrapper",
                            percentPosition: !0,
                            gutter: n
                        }))
                    }))
                } else(t(".betterdocs-single-category-wrapper", e) || []).each(((e, t) => {
                    t.removeAttribute("style")
                }))
            }(e.parentElement, jQuery)
        }))
    }))
})();
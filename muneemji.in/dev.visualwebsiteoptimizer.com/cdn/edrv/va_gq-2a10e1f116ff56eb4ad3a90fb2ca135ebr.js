// This file uses references and method signatures that can be found in jquery.js and cash.js.
// Copyright JS Foundation and other contributors, https://js.foundation/
// Copyright (c) 2014-present Ken Wheeler
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//  * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
//  * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
//  * permit persons to whom the Software is furnished to do so, subject to the following conditions:
//  *
//  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
//  * Software.
//  *
//  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//  * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
//  * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
(function() {
    "use strict";
    if (window.VWO = window.VWO || [], window.VWO.coreLibExecuted) return;
    var e, t, n, o, i, r, s;
    window.VWO.coreLibExecuted = 1, window.VWO.v = "7.0", window.VWO.v_e = "a174cfab9", window._VWO_VaGQ_StartTime = performance.now(), window.VWO.modules = {
            vwoUtils: {
                cookies: {}
            },
            utils: {},
            tags: {},
            phoenixPlugins: {
                events: {
                    predefinedEvents: {}
                }
            },
            otherLibDeps: {}
        }, window.VWO._ = window.VWO._ || {}, Object.defineProperty(window.VWO._, "phoenixMT", {
            value: {
                bus: {},
                idMapping: {},
                counter: 0,
                eventHistory: {},
                on: function(e, t, n) {
                    this.bus[e] = this.bus[e] || [], n && n.syncToDataLayer && (t.syncToDataLayer = !!n.syncToDataLayer);
                    const o = this.bus[e].push(t);
                    return this.idMapping[this.counter] = [e, o - 1], this.counter++
                },
                once: function(e, t) {
                    this.bus[e] && 1 == this.bus[e].length ? this.bus[e][0] = t : this.on(e, t)
                },
                getAllEvents: function() {
                    return Object.keys(this.bus)
                },
                trigger: function(e, t = {}) {
                    var n;
                    let o = [];
                    if (!this.bus[e]) return this.eventHistory[e] = this.eventHistory[e] || [], this.eventHistory[e].push(t);
                    ((null === (n = window._vwoCc) || void 0 === n ? void 0 : n.delayCustomGoal) || ["vwo_campaignsLoaded", "vwo_insightsFunnel"].indexOf(e) > -1) && (this.eventHistory[e] = this.eventHistory[e] || [], this.eventHistory[e].push(t));
                    for (let n = (this.bus[e] || []).length - 1; n >= 0; n--)
                        if (this.bus[e][n]) try {
                            const i = this.bus[e][n];
                            i.syncToDataLayer ? o.push(i) : i.call(this, t)
                        } catch (e) {}
                    const i = o.length;
                    if (i) {
                        for (let e = i - 1; e >= 0; e--) o[e].call(this, t);
                        this.mergeEventPayloadAndDispatchCall(t)
                    }
                },
                getEventHistory: function(e) {
                    return this.eventHistory[e]
                },
                clearEventHistory: function(e) {
                    delete this.eventHistory[e]
                },
                mergeEventPayloadAndDispatchCall(e) {
                    var t, n, o, i, r;
                    const s = (null === (t = e._vwo) || void 0 === t ? void 0 : t.syncEventData) || {},
                        a = (null === (n = e._vwo) || void 0 === n ? void 0 : n.eventDataConfig) || {};
                    let d = (null === (r = null === (i = null === (o = window.VWO) || void 0 === o ? void 0 : o.nls) || void 0 === i ? void 0 : i.getEventsProps) || void 0 === r ? void 0 : r.call(i, e)) || {};
                    const c = window.VWO._.cookies.get("_vwo_uuid");
                    let l = {};
                    if (Object.keys(d).length && Object.keys(a).length && !a.multipleDomainCallSent) {
                        const e = Object.keys(a);
                        for (let t = e.length - 1; t >= 0; --t) {
                            const n = e[t];
                            c === n ? (l[n] = Object.assign(Object.assign({}, a[n]), d), l[n].addVwoPageMeta = !0) : (l[n] = a[n], l[c] = d, l[c].addVwoPageMeta = !0, a.multipleDomainCallSent = !0)
                        }
                    } else l = Object.keys(d).length ? {
                        [c]: Object.assign(Object.assign({}, d), {
                            addVwoPageMeta: !0
                        })
                    } : a || {};
                    s._vwo = s._vwo || {}, s._vwo.eventDataConfig = l, Object.keys(s).length && this.trigger("syncDataToDataLayer", {
                        event: e,
                        eventName: e.vwoEventName,
                        syncEventData: s
                    })
                },
                triggerForBothSides: function(e, t = {}) {
                    this.trigger(e, t), window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                        captureGroups: [e, t]
                    })
                },
                off: function(e) {
                    if (this.idMapping[e]) {
                        const [t, n] = this.idMapping[e];
                        t && (this.bus[t][n] = null, delete this.idMapping[e])
                    }
                },
                clearEvent: function(e) {
                    if (this.bus[e] && 0 !== this.bus[e].length) {
                        for (let t = 0; t < this.counter; t++) this.idMapping[t] && this.idMapping[t][0] === e && (this.idMapping[t] = []);
                        delete this.bus[e]
                    }
                }
            },
            enumerable: !1,
            writable: !1
        }), window.VWO._.native = {}, window.VWO._.native.JSON = window.JSON,
        function(e) {
            e.DOM = "vwo_dom"
        }(e || (e = {})),
        function(e) {
            e.WILD_CARD = "*", e.TRIGGER = "trigger", e.POST_INIT = "post-init", e.TIMER = "vwo_timer"
        }(t || (t = {})),
        function(e) {
            e.URL_CHANGE = "vwo_urlChange", e.LEAVE_INTENT = "vwo_leaveIntent", e.CLICK_EVENT = "vwo_dom_click", e.SUBMIT_EVENT = "vwo_dom_submit", e.PAGE_LOAD_EVENT = "vwo_page_load"
        }(n || (n = {})),
        function(e) {
            e.PAGE_VIEW = "vwo_pageView", e.PAGE_UNLOAD_EVENT = "vwo_pageUnload"
        }(o || (o = {})),
        function(e) {
            e.EXIT_CONDITIONS = "__exitConditions"
        }(i || (i = {})),
        function(e) {
            e.DOM_CONTENT_LOADED = "DOMContentLoaded", e.SCROLL = "scroll", e.CLICK = "click", e.SUBMIT = "submit"
        }(r || (r = {})),
        function(e) {
            e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR"
        }(s || (s = {}));
    class a {
        constructor(e) {
            this.setLevel(e)
        }
        setLevel(e = "warn") {
            this.logLevel = s[e.toUpperCase()]
        }
        info(e, t = {}) {
            this.customLog(s.INFO, e, t)
        }
        debug(e, t = {}) {
            this.customLog(s.DEBUG, e, t)
        }
        warn(e, t = {}) {
            var n, o;
            this.customLog(s.WARN, e, t, null === (o = null === (n = window.VWO) || void 0 === n ? void 0 : n._) || void 0 === o ? void 0 : o.customError)
        }
        error(e, t = {}) {
            var n, o;
            this.customLog(s.ERROR, e, t, null === (o = null === (n = window.VWO) || void 0 === n ? void 0 : n._) || void 0 === o ? void 0 : o.customError)
        }
        customLog(e, t, n, o = null) {
            var i, r, s;
            if (e >= this.logLevel) {
                const a = this.formatMessage(e, t, n);
                null === (s = null === (r = null === (i = window.VWOEvents) || void 0 === i ? void 0 : i.store) || void 0 === r ? void 0 : r.actions) || void 0 === s || s.addLogsForDebugging(a), o ? o(a) : this.consoleLog(e, [a])
            }
        }
        consoleLog(e, t) {
            switch (e) {
                case s.INFO:
                    console.info(...t);
                    break;
                case s.WARN:
                    console.warn(...t);
                    break;
                case s.ERROR:
                    console.error(...t);
                    break;
                default:
                    console.log(...t)
            }
        }
        formatMessage(t, n, o) {
            var i, a;
            const d = Object.keys(o).reduce(((e, t) => e.replace(new RegExp(`{{${t}}}`, "g"), o[t])), n),
                c = `${e.DOM}_`;
            let l = o;
            const u = (null === (i = o.data) || void 0 === i ? void 0 : i.vwoEventName) || o.vwoEventName;
            u !== c + r.CLICK && u !== c + r.SUBMIT || (l = o.data ? null === (a = o.data) || void 0 === a ? void 0 : a.props : l.props, l = l || {
                name: u
            });
            let w = JSON.stringify;
            try {
                w = window.VWO._.native.JSON.stringify || JSON.stringify
            } catch (e) {}
            return `VWO: [${s[t].toUpperCase()}] [${(new Date).toUTCString()}] ${d} ${w(l)}`
        }
    }
    var d = new a("warn");

    function c(e, t, n, o) {
        return new(n || (n = Promise))((function(i, r) {
            function s(e) {
                try {
                    d(o.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    d(o.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function d(e) {
                var t;
                e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(s, a)
            }
            d((o = o.apply(e, t || [])).next())
        }))
    }
    const l = {
        CAMPAIGN_FLOW_START: "cFS",
        TEST_NOT_RUNNING: "tNR",
        CAMPAIGN_FLOW_END: "cFE",
        REGISTER_CONVERSION: "vwo_rC",
        CONVERT_GOAL_FOR_ALL_EXPERIMENTS: "cGFAE",
        UNHIDE_ALL_VARIATIONS: "uAV",
        DIMENSION_TAG_PUSHED: "dTP",
        CONVERT_VISIT_GOAL_FOR_EXPERIMENT: "cVGFE",
        UNHIDE_SECTION: "uS",
        EXCLUDE_URL: "eURL",
        BEFORE_REDIRECT_TO_URL: "bRTR",
        URL_CHANGED: "uC",
        HIDE_ELEMENTS: "hE",
        ELEMENT_LOAD_ERROR: "eLTTE",
        NOT_REDIRECTING: "vwo_notRedirecting",
        VISIBILITY_TRIGGERED: "vwo_visibilityTriggered",
        VARIATION_APPLIED: "vwo_vA",
        VARIATION_APPLIED_ERROR: "vwo_variationAppliedError",
        ELEMENT_LOAD_TIMER_STOP: "eLTSt",
        SEND_NEW_VISITOR_CALL: "sNVC",
        CONVERT_REVENUE_GOALS_FOR_EXPERIMENT: "cRGFE",
        CHOOSE_COMBINATION: "cC",
        START_APPLY_CHANGES: "sAC",
        END_APPLY_CHANGES: "eAC",
        CAMPAIGN_COMBI_CREATED: "cCC",
        ELEMENT_LOADED: "eL",
        ELEMENT_NOT_LOADED: "eNL",
        MATCH_WILDCARD: "mW",
        DELETE_CSS_RULE: "dCSSR",
        SPLIT_READY_TO_REDIRECT: "sURL",
        SESSION: "vwo_session",
        NEW_SESSION: "newSession",
        UNHIDE_VARIATION: "uV",
        NEW_SESSION_CREATED: "newSessionCreated",
        PAUSE: "pause",
        SPLIT_URL: "sURL",
        SHOULD_EXECUTE_LIB_ERROR: "shouldExecLib",
        UPDATE_SETTINGS_CALL: "uSC",
        EXCLUDE_GOAL_URL: "eGURL",
        HEATMAP_CLICK: "hCl",
        POST_URL_CHANGE: "hC",
        AFTER_SAMPLING_TRIGGER: "sT",
        CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT: "cAVGFE",
        OPT_OUT: "oO",
        POST_INIT: "vwo_postInit",
        PAGE_VIEW: "vwo_pageView",
        ELEMENT_CHANGES_APPLIED: "elementChangesApplied",
        REGISTER_HIT: "registerHit",
        REDIRECT_DECISION: "rD",
        RETRACK_VISITOR: "retrackVisitor",
        CAMPAIGN_NOT_ELIGIBLE: "runCampaign.notEligible",
        UNHIDE_ELEMENT: "unhideElement",
        TOGGLE_VISIBILITY_LOCK: "runCampaign.toggleVisibilityLock",
        CAMPAIGN_READY: "runCampaign.campaignReady",
        MODIFIED_ELEMENT: "runTestCampaign.modifiedEl",
        ERROR: "error",
        SSR_COMPLETE: "vwo_mutationObserved",
        SET_ENV: "setEnvironment",
        ACTIVATED: "vwo_activated",
        _ACTIVATED: "vwo__activated",
        RECORDING_NOT_ELIGIBLE: "rNE",
        VARIATION_SHOWN: "vwo_variationShown",
        NEW_SURVEY_FOUND: "nSF",
        SYNC_VISITOR_PROP: "vwo_syncVisitorProp",
        TAG_EVALUATED: "vwo_tagEval",
        HTML_ELEMENT_LOADED: "vwo_elementLoaded",
        CAMPAIGN_UNLOADED: "vwo_campUnload",
        CAMPAIGNS_LOADED: "vwo_campaignsLoaded",
        EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN: "executeFunnelCampForGoalCampaign",
        EDITOR_APPLY_CHANGES_COMPLETE: "editorApplyChangesComplete",
        INIT_VWO_INTERNALS: "initVWOInternals",
        SET_CAMPAIGN_TO_OBSERVE: "setCampaignToObserve",
        SEGMENTATION_EVALUATED: "sE",
        ELEMENTS_SHOWN_WITHOUT_CHANGES: "eSWC",
        CUSTOM_CONVERSION: "vwo_conversion",
        REVENUE_CONVERSION: "vwo_revenue",
        DOM_SUBMIT: "vwo_dom_submit",
        DOM_CLICK: "vwo_dom_click",
        ERROR_ONPAGE: "vwo_errorOnPage",
        CURSOR_THRASHED: "vwo_cursorThrashed",
        PAGE_REFRESHED: "vwo_pageRefreshed",
        QUICK_BACK: "vwo_quickBack",
        COPY: "vwo_copy",
        SELECTION: "vwo_selection",
        LEAVE_INTENT: "vwo_leaveIntent",
        TAB_IN: "vwo_tabIn",
        TAB_OUT: "vwo_tabOut",
        REPEATED_SCROLLED: "vwo_repeatedScrolled",
        REPEATED_HOVERED: "vwo_repeatedHovered",
        GOAL_CONVERTED: "vwo_goalConverted",
        GOAL_VISIT: "vwo_goalVisit",
        EVALUATE_GOAL_PAGE_FOR_PREJS: "vwo_evalPreCampJs",
        GROUP_WINNER_CHOOSEN: "vwo_groupWinnerChosen",
        CHECK_SEGMENTATION: "checkSegmentation",
        TRACK_NEW_SESSION_CREATED: "tnSC",
        TRACK_SESSION_CREATED: "tSC",
        PAGE_UNLOAD: "vwo_pageUnload",
        SPA_VISIBILITY_SERVICE: "visibilityForSpa",
        SESSION_INIT_COMPLETE: "vwo_sessionInitComplete",
        TIB_DONE: "vwo_topInitializeBeginDone",
        TOGGLE_MUT_OBSERVER: "toggleMutationObserver",
        DOM_CONTENTLOADED: "vwo_dom_DOMContentLoaded",
        SPLIT_VARIATION_SHOWN: "splitVariationShown",
        VWO_EXECUTED: "vE",
        ACTIVATE_API_TRIGGERED: "aAT",
        CAMPAIGN_TAG_EXECUTED: "cTE",
        RUN_REVERT_TAGS: "runrT",
        VARIATION_SHOWN_SENT: "vwo_variationShownSent",
        PAGE_EXIT: "pageExitEvent",
        COOKIE_CONSENT_ACCEPTED: "cCA",
        COOKIE_CONSENT_REJECTED: "cCR",
        COOKIE_CONSENT_TIMEOUT: "cCT",
        LOAD_SURVEY_LIB: "loadSurveyLib",
        NATIVE_DOM_CONTENT_LOADED: "vwo_domReady",
        RECOM_BLOCK_SHOWN: "vwo_recommendation_block_shown",
        SYNC_EVENTS_COMPLETED: "vwo_syncEventsCallCompleted",
        SEND_SYNC_CALL: "vwo_sendSyncCall",
        LOAD_SETTINGS: "vwo_loadSettings",
        DEBUG_EVENT: "vwo_debugLogs"
    };
    var u;
    ! function(e) {
        e.ANALYSIS = "r", e.ANALYZE_FORM = "a", e.ANALYZE_HEATMAP = "a", e.ANALYZE_RECORDING = "a", e.FUNNEL = "t", e.SURVEY = "s", e.TRACK = "t", e.INSIGHTS_FUNNEL = "t", e.INSIGHTS_METRIC = "t"
    }(u || (u = {}));
    class w {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync." + e[0], window.fetcher.getValue(...e)
        }
    }
    let _ = "",
        p = () => "",
        g = e => e,
        h = e => e;
    window.VWO._.namespaceKeyWithAccId = g;
    const v = "lT",
        f = "sT",
        O = "ivp",
        E = "ca",
        m = 10,
        S = "custom",
        T = function() {},
        C = [739074, 714884, 708439, 765649],
        I = {
            VS_DATA: "vwoVsData"
        },
        y = {
            SPLIT_REDIRECT: "_vwo_split_redirect"
        },
        A = "vwoStandardTrigger",
        N = {
            get campaignCookies() {
                return new RegExp("_vis_opt_exp_(\\d+)_(.+)")
            },
            get uuidCookie() {
                return new RegExp("_vwo_uuid_(\\d+)")
            }
        },
        V = {
            SET_COOKIE: "sC",
            GET_COOKIE: "gC",
            ERASE_COOKIE: "eC",
            SET_THIRD_PARTY_COOKIE: "sTPC",
            SET_THIRD_PARTY_COOKIE_ERROR: "sTPCE"
        };
    class b {
        constructor() {
            this.handleEmptyValue = e => "" === e ? "~" : e, this.revertEmptyValue = e => "~" === e ? "" : e, this.encodeData = e => {
                const t = Object.entries(e);
                let n = "";
                for (let e = 0; e < t.length; e++) {
                    const [o, i] = t[e], {
                        sId: r,
                        mId: s,
                        p: a,
                        id: d
                    } = i, c = `p.rU:${encodeURIComponent(this.handleEmptyValue(a.rU))},p.t:${encodeURIComponent(this.handleEmptyValue(a.t))},p.u:${encodeURIComponent(this.handleEmptyValue(a.u))}`;
                    n += `${o}:${this.handleEmptyValue(r)},${this.handleEmptyValue(s)},${c},${this.handleEmptyValue(d)}|`
                }
                return n.slice(0, -1)
            }, this.decodeData = e => {
                if ("~" === e) return;
                const t = {},
                    n = e.split("|");
                for (let e = 0; e < n.length; e++) {
                    const [o, ...i] = n[e].split(":"), [r, s, ...a] = i.join(":").split(","), d = this.revertEmptyValue(a.pop() || ""), c = {};
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e],
                            [n, ...o] = t.split(":");
                        if (n.startsWith("p.")) {
                            c[n.slice(2)] = this.revertEmptyValue(decodeURIComponent(o.join(":")))
                        }
                    }
                    t[o] = {
                        sId: this.revertEmptyValue(r),
                        mId: this.revertEmptyValue(s),
                        p: c,
                        id: d
                    }
                }
                return t
            }, this.consentMode = window.VWO.consentMode || !1, this.goalCookieStore = {}, this.ccN = "_vwo_consent"
        }
        processQueue() {
            var e;
            const t = this.consentMode.deferredQueue || [];
            for (; t.length > 0;) {
                const n = t.shift();
                null === (e = n.payload) || void 0 === e || e.call(n)
            }
        }
        extractSavedCalls() {
            const e = this.getSyncDataFromConsentCookie();
            if (e) return this.decodeData(e)
        }
        overrideCookies(e) {
            const t = e._create;
            e._create = (...n) => {
                if (!this.consentMode.dT) return this.consentMode.hT && n[0].includes("_goal") ? (this.setGoalCookie(n[0], n[1]), void this.consentMode.deferredQueue.push({
                    method: "fn",
                    payload: () => t.apply(e, n)
                })) : t.apply(e, n)
            };
            const n = e.createThirdParty;
            e.createThirdParty = function(...t) {
                const o = window.VWO.consentMode;
                if (!o.dT) {
                    if (!o.hT) return n.apply(e, t); {
                        const [i, r, s, a] = t;
                        if (window.VWO.modules.utils.consentModeUtils.triggerEvent(V.SET_COOKIE, i, r, s, a, !0), "_vwo" !== i && this._create(i, r, s, a), "_combi_choose" === i.slice(-13)) return;
                        o.deferredQueue.push({
                            method: "fn",
                            payload: () => n.apply(e, t)
                        })
                    }
                }
            };
            const o = e.get;
            e.get = (...t) => {
                if (!this.consentMode.dT || "_vis_opt_test_cookie" !== t[0]) {
                    if (this.consentMode.hT) {
                        const e = this.getGoalCookie(t[0]);
                        if (e) return e
                    }
                    return o.apply(e, t)
                }
            };
            const i = e.waitForThirdPartySync;
            e.waitForThirdPartySync = function(t) {
                return window.VWO.consentMode.hT ? t() : i.apply(e, t)
            }
        }
        initConsentMode() {
            const e = this.consentMode || {};
            if (e.goalLogs = [], window.VWO.consentMode.deferredQueue = window.VWO.consentMode.deferredQueue || [], e.timeOut && (this.consentMode.wFC = !1, this.consentMode.dT = !0, this.triggerEvent(l.COOKIE_CONSENT_TIMEOUT)), "P" === e.cConfig.cPB && this.handlePartiallyBlocked(e), e.preview) return this.handlePreviewMode(e);
            this.handleConsentRejected()
        }
        handlePartiallyBlocked(e) {
            if (e.savedCalls = this.extractSavedCalls(), e.hT && this.setupConsentAcceptedListener(e), e.cCA && e.savedCalls && window.VWO._.phoenixMT.on("vwo_phoenixInitialized", (() => {
                    this.syncSaved(e.savedCalls), this.updateConsentCookie("~"), delete e.savedCalls
                })), !1 === e.hT && e.preview && !e.dT && !e.cCA) {
                let e;
                for (const t in window._vwo_exp) {
                    e = window._vwo_exp[t];
                    break
                }
                const t = window.VWO._.cookies.get("_vis_opt_exp_" + e.id + "_combi");
                if (e.multiple_domains && t) {
                    const n = "SPLIT_URL" === e.type || null,
                        o = {
                            id: e.id,
                            mId: ""
                        };
                    this.syncTpc(o, t, n, e, !0)
                }
            }
        }
        setupConsentAcceptedListener(e) {
            const t = window.VWO._.phoenixMT.on(l.COOKIE_CONSENT_ACCEPTED, (() => {
                e.savedCalls && (this.syncSaved(e.savedCalls), delete e.savedCalls), this.processQueue(), !e.preview && this.triggerEvent(l.COOKIE_CONSENT_ACCEPTED), this.updateConsentCookie("~"), window.VWO._.phoenixMT.off(t)
            }))
        }
        queueGoalLogs(e, t, n, o) {
            const i = window.VWO.consentMode;
            if (!i || !i.preview) return !0;
            if (i.dT) return !1;
            if (!i.hT) return !0;
            if (!window.mainThread) return window.fetcher.getValue('VWO.modules.utils.consentModeUtils.queueGoalLogs("${{1}}","${{2}}", "${{3}}", "${{4}}")', null, {
                captureGroups: [e, t, n, o]
            }), !1;
            let {
                goalLogs: r
            } = i;
            return r.push({
                expId: e,
                goalId: t,
                revenue: n,
                success: o
            }), !1
        }
        triggerGoalLogs() {
            const e = window.VWO.consentMode.goalLogs;
            for (; e.length > 0;) {
                const t = e.shift(),
                    {
                        expId: n,
                        goalId: o,
                        revenue: i,
                        success: r
                    } = t;
                window.VWO.modules.tags.wildCardCallback({
                    oldArgs: [n, o, i, r],
                    campaignId: n,
                    goalId: o
                }, l.REGISTER_CONVERSION)
            }
        }
        handlePreviewMode(e) {
            e.hT && window.VWO.phoenix && window.VWO.phoenix('on("${{1}}", "${{2}}")', null, {
                captureGroups: [l.URL_CHANGED, () => {
                    window.fetcher.setValue("VWO.consentMode.goalLogs", [])
                }]
            }), this.setupConsentTimeoutListener(e), this.setupConsentAcceptedListenerForPreview(e), this.setupConsentRejectedListenerForPreview(e)
        }
        setupConsentTimeoutListener(e) {
            window.VWO._.phoenixMT.on(l.COOKIE_CONSENT_TIMEOUT, (() => {
                this.triggerEvent(l.COOKIE_CONSENT_TIMEOUT), e.wFC && window.fetcher.setValue("VWO.consentMode.wFC", !1), window.fetcher.setValue("VWO.consentMode.dT", !0)
            }))
        }
        setupConsentAcceptedListenerForPreview(e) {
            window.VWO._.phoenixMT.on(l.COOKIE_CONSENT_ACCEPTED, (() => {
                this.triggerEvent(l.COOKIE_CONSENT_ACCEPTED), this.triggerGoalLogs(), e.wFC && window.fetcher.setValue("VWO.consentMode.wFC", !1), !e.dT && window.fetcher.setValue("VWO.consentMode.dT", !1)
            }))
        }
        setupConsentRejectedListenerForPreview(e) {
            window.VWO._.phoenixMT.on(l.COOKIE_CONSENT_REJECTED, (() => {
                this.triggerEvent(l.COOKIE_CONSENT_REJECTED), window.fetcher.setValue("VWO.consentMode.dT", !0)
            }))
        }
        handleConsentRejected() {
            window.VWO._.phoenixMT.on(l.COOKIE_CONSENT_REJECTED, (() => {
                window.fetcher.setValue("VWO.consentMode.dT", !0)
            }))
        }
        triggerEvent(e) {
            window.VWO.phoenix && window.VWO.phoenix('trigger("${{1}}")', null, {
                captureGroups: [e]
            })
        }
        getGoalCookie(e) {
            return this.goalCookieStore[e]
        }
        setGoalCookie(e, t) {
            return window.mainThread && window.fetcher.getValue('VWO.modules.utils.consentModeUtils.setGoalCookie("${{1}}","${{2}}")', null, {
                captureGroups: [e, t]
            }), this.goalCookieStore[e] = t
        }
        deferOnConsent(e, t, n, o, i, r, ...s) {
            if (!this.consentMode) return;
            const {
                dT: a,
                hT: d,
                deferredQueue: c
            } = this.consentMode;
            if (a) return !0;
            if (d) {
                if (["applySyncRequest", "handlerForReqFromWT"].includes(e)) {
                    if (!i.includes("_goal")) return !1;
                    if (this.setGoalCookie(i, r), "handlerForReqFromWT" === e) return c.push({
                        method: e,
                        payload: () => document.cookie = s[0]
                    })
                }
                return i && i.name === l.VARIATION_SHOWN && this.saveForSync(r.d), n && n(o || {}), c.push({
                    method: e,
                    payload: () => t[e].apply(t, s)
                }), !0
            }
        }
        prepareDataForSync(e, t, n) {
            const o = {
                d: {}
            };
            o.d.msgId = e.mId, o.d.visId = e.mId.split("-")[0], o.d.sessionId = e.sId;
            const i = {
                title: e.p.t,
                url: e.p.u,
                referrerUrl: e.p.rU
            };
            return this.consentMode.customParams = i, o.d.event = {
                props: {
                    page: i,
                    id: e.id,
                    variation: t,
                    isFirst: 1
                },
                name: l.VARIATION_SHOWN,
                time: Date.now()
            }, null != n && (o.d.event.props.isSplitVariation = n), o
        }
        addCustomParams(e) {
            const t = this.consentMode;
            return !t || (!t.customParams || (!e.includes(l.VARIATION_SHOWN) && !e.includes("l.gif") || "P" !== t.cConfig.cPB || !("P" === t.cConfig.cPB && !t.hT)))
        }
        syncSaved(e) {
            const t = {
                VWO: {
                    firedTime: Date.now()
                },
                executingTagTrigger: null,
                name: l.VARIATION_SHOWN,
                props: {},
                time: Date.now()
            };
            Object.keys(e).map((n => {
                const o = e[n],
                    i = window._vwo_exp[o.id];
                let r = null,
                    s = null;
                if ("SPLIT_URL" === i.type && (r = !0, s = "1" != n), !window.VWO._.cookies.get("_vis_opt_exp_" + o.id + "_combi")) return;
                const a = this.prepareDataForSync(o, n, s);
                window.VWO.modules.tags.dataSync.utils.addDataFromMTAndSend(null, null, a, null, !0, null, t, +o.id), this.syncImg(o, n, i), this.syncTpc(o, n, r, i)
            }))
        }
        syncTpc(e, t, n, o, i = !1) {
            if (!o.multiple_domains) return;
            const r = [`_vwo_uuid_${e.id}`, e.mId.split("-")[0], 3650, void 0, e.id, void 0, o];
            !i && window.VWO._.cookies.createThirdParty(...r), r[0] = `_vis_opt_exp_${e.id}_combi`, r[1] = t, r[3] = 100, window.VWO._.cookies.createThirdParty(...r), null != n && (r[0] = `_vis_opt_exp_${e.id}_split`, window.VWO._.cookies.createThirdParty(...r))
        }
        syncImg(e, t, n) {
            let o = window.VWO.modules.utils.libUtils.extraData2();
            const i = encodeURIComponent(o);
            o = n.ps || void 0 === n.ps ? "&ed=" + i : "";
            const r = "l.gif?experiment_id=" + e.id + "&account_id=" + window._vwo_acc_id + "&cu=" + encodeURIComponent(e.p.u) + "&combination=" + t + "&s=1&sId=" + e.sId + "&u=" + e.mId.split("-")[0] + o;
            window.VWO.modules.tags.dataSync.utils.sendCall(null, {
                url: r
            }, null, null, !0)
        }
        saveForSync(e) {
            let t = this.getSyncDataFromConsentCookie(),
                n = t ? this.decodeData(t) : {};
            const o = {
                    rU: e.event.props.page.referrerUrl,
                    u: e.event.props.page.url,
                    t: e.event.props.page.title
                },
                i = {
                    sId: e.sessionId,
                    mId: e.msgId,
                    p: o,
                    id: e.event.props.id
                },
                r = Object.assign(Object.assign({}, n), {
                    [e.event.props.variation]: i
                });
            let s = this.encodeData(r);
            this.updateConsentCookie(s)
        }
        getSyncDataFromConsentCookie() {
            const e = `${this.ccN}=`,
                t = document.cookie.split("; ").find((t => t.startsWith(e)));
            if (t) {
                const e = decodeURIComponent(t.split("=")[1]).split(":");
                if (e.length > 1) return e.shift(), "~" === e[0] ? null : e.join(":")
            }
            return null
        }
        updateConsentCookie(e) {
            const t = document.cookie.match(new RegExp(`(^|;\\s*)${this.ccN}=([^;]*)`)),
                n = t ? t[2] : null;
            let o = "";
            if (n) {
                o = decodeURIComponent(n).split(":")[0]
            }
            const i = encodeURIComponent(`${o}:${e}`);
            document.cookie = `${this.ccN}=${i}; path=/; domain=.${window.VWO.consentMode.domain}; max-age=31536000`
        }
    }
    const R = function() {
            const e = window.VWO.consentMode;
            return !!e && !!e.dT
        },
        L = new b;
    window.VWO.modules.utils.consentModeUtils = L;
    class W {
        formatErrorObject(e) {
            return "string" == typeof e && (e = {
                msg: e
            }), e
        }
        setCustomError(e) {
            const t = this;
            window.VWO._.customError = function(n) {
                n = t.formatErrorObject(n), e(n)
            }
        }
    }
    const P = e => {
        try {
            window.VWO._.customError(e)
        } catch (e) {}
    };

    function D(e, t = {
        sendErrorLog: !1
    }, n) {
        try {
            return e()
        } catch (e) {
            return t.sendErrorLog && setTimeout((() => {
                try {
                    P({
                        msg: t.msg || "safelyGetValue failed!",
                        url: t.url || "errorHandler.ts",
                        source: t.source || e
                    })
                } catch (e) {}
            }), 100), n
        }
    }

    function x(e, t) {
        try {
            return e()
        } catch (e) {
            return void(t && !t.disabledErrLog && console.error("Error occurred:", e))
        }
    }

    function U(e) {
        window.vwo_iehack_queue || (window.vwo_iehack_queue = []), window.vwo_iehack_queue.push(e)
    }

    function M(e) {
        const {
            data: t,
            apiToUse: n,
            headers: o,
            success: i,
            complete: r,
            error: s
        } = e, {
            url: a
        } = e, d = n && new(n.get("XMLHttpRequest")) || new XMLHttpRequest;
        if (d.open("POST", a, !0), o)
            for (const e in o) o.hasOwnProperty(e) && d.setRequestHeader(e, o[e]);
        t instanceof FormData && (d.formData = t), d.send(t), d.onload = function() {
            i.call(this), r.call(this, e.callbackContext)
        }, d.onerror = function() {
            s.call(this), r.call(this, e.callbackContext)
        }
    }

    function k(e, t) {
        const {
            apiToUse: n,
            success: o,
            error: i,
            complete: r,
            callbackContext: s
        } = e;
        let {
            url: a
        } = e;
        const d = n && new(n.get("Image")) || new Image;
        a += t ? "&_bf=1" : "", d.src = a, d.onload = function() {
            o.call(this), r.call(this, s)
        }, d.onerror = function() {
            i.call(this), r.call(this, {
                isError: !0
            })
        }, U(d)
    }

    function G(e, t) {
        e.data ? M(e) : k(e, false)
    }

    function F(e) {
        let {
            url: t,
            miscOptions: n
        } = e;
        t.indexOf("?") < 0 && (t += "?");
        if (t += n ? (void 0 !== n.vn ? "&vn=" + n.vn : "") + (void 0 !== n.vns ? "&vns=" + n.vns : "") + (void 0 !== n.vno ? "&vno=" + n.vno : "") : "", t.indexOf("&cu=") < 0 && t.indexOf("&url=") < 0 && L.addCustomParams(t)) {
            const n = D((() => e.additionalOptions.cUrl)) || window.VWO._.lastPageUnloadURL || document.URL;
            t += "&_cu=" + encodeURIComponent(n.slice(0, 100))
        }
        return t.indexOf("&cu=") < 0 && !L.addCustomParams(t) && (t += "&_cu=" + encodeURIComponent(window.VWO.consentMode.customParams.url.slice(0, 100))), document.referrer && t.indexOf("&ru=") < 0 && L.addCustomParams(t) && (t += "&_ru=" + encodeURIComponent(document.referrer.slice(0, 100))), t.indexOf("?&") > 0 && (t = t.replace("?&", "?")), t
    }
    const $ = function(e) {
        const t = function() {};
        let n = !1;
        (e.success || e.error) && (n = !0), e.success = e.success || t, e.error = e.error || t, e.complete = e.complete || t, e.url = F(e), e.callbackContext = e.callbackContext || {}, e.apiToUse = window.DISABLE_NATIVE_CONSTANTS ? void 0 : window.VWO._.nativeConstants;
        const {
            data: o,
            url: i,
            useBeacon: r,
            complete: s
        } = e;
        if (n && !r) return G(e, !1), {
            typeOfCall: $.callTypes.NONBEACON
        }; {
            const t = D((() => window.VWO._.nativeConstants.get("navigator"))) || window.navigator;
            return "function" == typeof t.sendBeacon && (window.VWO.data && window.VWO.data.fB || r) && t.sendBeacon(i, o) ? (s(e.callbackContext), {
                typeOfCall: $.callTypes.BEACON
            }) : (G(e, !0), {
                typeOfCall: $.callTypes.NONBEACON
            })
        }
    };
    let j;

    function B(e) {
        j = e
    }

    function H(e) {
        window.VWO = null != e ? e : j
    }
    $.shouldCompress = function(e) {
        return e.length > 1800
    }, $.callTypes = {
        BEACON: "beacon",
        NONBEACON: "non-beacon"
    };
    var K = parseInt(+new Date / 1e3, 10),
        J, q = function() {
            return J || (J = window.VWO.data.ts || K)
        };
    const Y = Object.keys;

    function X(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
    }

    function z(e, t) {
        var n;
        if (e && "function" == typeof t)
            if (e instanceof Array) {
                for (n = 0; n < e.length; n++)
                    if (!1 === t(e[n], n)) return
            } else
                for (n in e)
                    if (e.hasOwnProperty(n) && !1 === t(e[n], n)) return
    }

    function Q(e, t) {
        if (!(e instanceof Array)) return -1;
        for (var n = 0; n < e.length; n++)
            if (t === e[n]) return n;
        return -1
    }

    function Z(e, t) {
        for (var n = this.getKeys(t), o = 0; o < n.length; o++) e.setAttribute(n[o], t[n[o]])
    }

    function ee(e) {
        return /^(https?:\/\/|\/\/)/.test(e)
    }

    function te(e, t) {
        for (var n = [], o = 0; o < e.length; o++) n.push(t(e[o]));
        return n
    }

    function ne(e, t) {
        for (var n = [], o = 0; o < e.length; o++) t(e[o], o) && n.push(e[o]);
        return n
    }

    function oe(e) {
        var t = q();
        return e ? t : 1e3 * t + +new Date % 1e3
    }

    function ie(e) {
        var t = q(),
            n = parseInt(+new Date / 1e3, 10) - K;
        return e ? t + n : 1e3 * (t + n) + +new Date % 1e3
    }

    function re() {
        return (new Date).getTimezoneOffset() / 60
    }

    function se(e, t) {
        var n = !1;
        return function() {
            n || (e.call(), n = !0, setTimeout((function() {
                n = !1
            }), t))
        }
    }

    function ae(e, t) {
        var n = !1;
        return function(...o) {
            n || (n = !0, setTimeout((() => {
                n = !1, e.apply(this, o)
            }), t))
        }
    }

    function de(e, t, n) {
        var o, i, r, s = !1;
        return -1 === t || n ? (i = requestAnimationFrame, r = cancelAnimationFrame) : (i = setTimeout, r = clearTimeout),
            function(...n) {
                s && (r(o), o = null), o = i((function() {
                    e.apply(this, n)
                }), t), s = !0
            }
    }
    let ce = 0;
    const le = {};

    function ue(e, t) {
        const n = ++ce;
        le[n] = {
            executeCallback: () => {
                delete le[n], e()
            },
            animationFrameId: null,
            timeOutId: null
        };
        const o = function() {
                return window.setTimeout((() => {
                    le[n] && (null !== le[n].animationFrameId && cancelAnimationFrame(le[n].animationFrameId), le[n].executeCallback())
                }), 1e3 / 60)
            },
            i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || o;
        t || j && j._ && j._.ac && j._.ac.aSP ? (le[n].animationFrameId = i((() => {
            le[n] && (null !== le[n].timeOutId && clearTimeout(le[n].timeOutId), le[n].executeCallback())
        })), o != i && (le[n].timeOutId = o())) : e()
    }

    function we() {
        var e, t, n;
        return (null === (n = null === (t = null === (e = window.google_tag_manager) || void 0 === e ? void 0 : e[Object.getOwnPropertyNames(window.google_tag_manager).filter((e => -1 !== e.indexOf("GTM")))[0]]) || void 0 === t ? void 0 : t.dataLayer) || void 0 === n ? void 0 : n.name) || "dataLayer"
    }

    function _e(e, t, n = "") {
        try {
            if (!t || "object" != typeof t) return;
            let o, i;
            if (e.endsWith("]")) {
                const t = e.match(/(.+?)\[(\d+)\]/);
                t && (i = e, e = t[1], o = parseInt(t[2]))
            }
            if (t.hasOwnProperty(e)) {
                let i = t[e];
                if (void 0 !== o) {
                    if (!Array.isArray(i)) return;
                    i = i[o]
                }
                return n ? _e(n.slice(1), i) : i
            } {
                const o = (e = i || e).lastIndexOf(".");
                if (-1 === o) return;
                const r = e.substring(0, o);
                return _e(r, t, e.substring(o) + n)
            }
        } catch (e) {}
    }

    function pe(e, t) {
        return e.length > t ? e.slice(0, t - 1) + "..." : e
    }

    function ge(e) {
        return e ? Math.round(100 * e) / 100 : 0
    }

    function he(e) {
        return null !== e && "object" == typeof e && !Array.isArray(e)
    }

    function ve() {}
    try {
        ve.prototype = Object.create(Array.prototype), Object.defineProperty(ve.prototype, "clear", {
            value: void 0,
            writable: !0,
            enumerable: !1
        })
    } catch (e) {}

    function fe(e, t, n) {
        if (void 0 !== n) {
            const o = e.includes("?") ? "&" : "?";
            e += `${o}${t}=${encodeURIComponent(n)}`
        }
        return e
    }
    var Oe = Object.freeze({
        __proto__: null,
        getKeys: Y,
        extend: X,
        forEach: z,
        arrayContains: Q,
        setAttrs: Z,
        isAbsoluteUrl: ee,
        map: te,
        filter: ne,
        getServerStartTimestamp: oe,
        getCurrentTimestamp: ie,
        getTimeZoneOffset: re,
        throttle: se,
        throttle2: ae,
        debounce: de,
        processCallbackInRequestAnimationFrame: ue,
        getdLName: we,
        getVariableValue: _e,
        truncateData: pe,
        roundNumber: ge,
        isObject: he,
        ArrayPrototypeCopy: ve,
        appendParamIfDefined: fe
    });
    const Ee = function(...e) {
        window.fetcher.getValue("VWO._.triggerEvent", e)
    };
    var me = {
            PARSE_TLD: "pTLD"
        },
        Se = ["co", "org", "com", "net", "edu", "au", "ac"];

    function Te(e) {
        var t, n = e.split("."),
            o = n.length,
            i = n[o - 2];
        return i && Se.includes(i) ? (t = n[o - 3] + "." + i + "." + n[o - 1], Ee(me.PARSE_TLD, e, t), t) : (t = i + "." + n[o - 1], Ee(me.PARSE_TLD, e, t), t)
    }
    window._vwo_evq = window._vwo_evq || [];
    var Ce = "jI",
        Ie = window._vwo_evq;
    const ye = window._vwo_ev = window._vwo_ev || function(...e) {
        if (!e[0]) throw new Error("Invalid Event:" + e[0]);
        e[0] !== Ce ? Ie.push([].slice.call(arguments)) : Ie.unshift([Ce])
    };
    window.VWO._.triggerEvent = window._vwo_ev;
    class Ae {}

    function Ne(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(n);
        return t
    }
    var Ve = {};

    function be(e, t) {
        const n = document.createEvent("Event");
        e = "vwo." + e, n.initEvent && (n.initEvent(e, !1, !1), n.data = t, document.dispatchEvent && document.dispatchEvent(n))
    }

    function Re(e, t) {
        Ve.queue = Ve.queue || [];
        const n = window.VWO._.ac && window.VWO._.ac.rdbg;
        if ("meta" == e && !n) return;
        if (!document.createEvent) return;
        const o = window.VWO;
        if (!o.nls || !o.nls.Recording) return void Ve.queue.push({
            eventName: e,
            data: t
        });
        Ve.queue.push({
            eventName: e,
            data: t
        });
        const i = Ve.queue.splice(0);
        for (var r of i) be(r.eventName, r.data)
    }
    const Le = (e = (e => null)) => {
        window.VWO._.vAEH = e
    };
    var We;
    window.VWO.modules.vwoUtils.utils = {
            customEvent: Re
        },
        function(e) {
            e[e.Object = 0] = "Object", e[e.Property = 1] = "Property", e[e.Document = 2] = "Document", e[e.Variable = 3] = "Variable", e[e.OverWrite = 4] = "OverWrite", e[e.Delete = 5] = "Delete"
        }(We || (We = {}));
    const {
        toString: Pe
    } = Object.prototype;

    function De(e) {
        return "[object Object]" === Pe.call(e)
    }

    function xe(e) {
        return "[object Array]" === Pe.call(e)
    }

    function Ue(e) {
        return "[object Null]" === Pe.call(e)
    }

    function Me(e) {
        return "[object Undefined]" === Pe.call(e)
    }

    function ke(e) {
        return !Me(e) && !Ue(e)
    }

    function Ge(e) {
        return !Number.isNaN(e) && "[object Number]" === Pe.call(e)
    }

    function Fe(e) {
        return "[object String]" === Pe.call(e)
    }
    let $e = !1;

    function je(e) {
        return e.split(";").reduce(((e, t) => {
            const n = t.indexOf("=");
            if (-1 !== n) {
                const o = t.substring(0, n).trim(),
                    i = t.substring(n + 1).trim();
                e[o] = i
            } else e[t.trim()] = "";
            return e
        }), {})
    }
    class Be {
        constructor() {
            this.operations = []
        }
        push(e, t) {
            this.operations.push({
                name: e,
                value: t
            })
        }
        pop_front() {
            this.operations.splice(0, 1)
        }
        fullfil(e, t = !0) {
            const n = je(e);
            t && this.pop_front(), this.operations.forEach((e => {
                n[e.name] = e.value
            }));
            return Object.entries(n).map((e => e.join("="))).join("; ")
        }
    }
    class He {
        static internalUtils() {
            var e;
            return {
                isCookiePayloadObject: e => !(!De(e) || !["value", "fromThread", "origin"].reduce(((t, n) => t && n in e), !0)),
                isCurrentContextMT: !!(null === (e = null === window || void 0 === window ? void 0 : window.mainThread) || void 0 === e ? void 0 : e.webWorker)
            }
        }
        getSetter(e) {
            return t => {
                if ("string" == typeof t) t = {
                    value: t
                };
                else if (!He.internalUtils().isCookiePayloadObject(t)) return void console.error("Invalid value type!");
                const {
                    value: n,
                    fromThread: o
                } = t;
                let {
                    origin: i
                } = t, r = !0;
                return (He.internalUtils().isCurrentContextMT || "MAIN" === o) && (document.__cookie = n, r = "MAIN" !== o), r && e({
                    type: "sync",
                    data: {
                        propertyName: "cookie",
                        value: {
                            value: He.internalUtils().isCurrentContextMT ? document.__cookie : n,
                            fromThread: He.internalUtils().isCurrentContextMT ? "MAIN" : "WORKER",
                            origin: $e ? "WORKER" : i
                        }
                    },
                    syncType: We.Document
                }), !0
            }
        }
    }

    function Ke(e) {
        if (!He.internalUtils().isCookiePayloadObject(e)) return void console.error("Invalid value type!");
        const {
            value: t
        } = e;
        if (window.VWO.consentMode) {
            if (R()) return;
            let e = t.split("=");
            if (L.deferOnConsent("handlerForReqFromWT", null, null, null, e[0], e[1], t)) return
        }
        $e = !0, document.cookie = t, $e = !1
    }
    let Je = {}; {
        class e {
            constructor() {
                this.enabled = !1, this.lastSentCookieString = ""
            }
            isEnabled() {
                return this.enabled
            }
            enable() {
                this.enabled || (this.enabled = !0, window.fetcher.setValue("window.VWO._.isCookieFallbackEnabled", !0))
            }
            syncCookieToWorkerThread(e = (He.internalUtils().isCurrentContextMT ? "MAIN" : "WORKER")) {
                !this.enabled || this.lastSentCookieString === document.cookie && "WORKER" !== e || (this.lastSentCookieString = document.cookie, window.fetcher.postMessage({
                    type: "sync",
                    data: {
                        propertyName: "cookie",
                        value: {
                            value: document.cookie,
                            fromThread: He.internalUtils().isCurrentContextMT ? "MAIN" : "WORKER",
                            origin: e
                        }
                    },
                    syncType: We.Document
                }))
            }
            applySyncRequest(e) {
                const {
                    value: t
                } = e;
                if (!t) return P({
                    msg: "Syncing error occurred in cookie fallback mode - value not present!",
                    url: "fallback/cookies.ts",
                    source: window.VWO._.native.JSON.stringify(t)
                });
                if (window.VWO.consentMode) {
                    if (R()) return;
                    let n = t.split("=");
                    if (L.deferOnConsent("applySyncRequest", this, null, null, n[0], n[1], e)) return
                }
                document.cookie = t, this.syncCookieToWorkerThread("WORKER")
            }
        }
        Je = new e
    }
    const qe = he(window._vwoCc) ? window._vwoCc : {},
        Ye = e => (qe.SPA_SPLIT = qe.SPA_SPLIT || {}, !(!qe.SPA_SPLIT[e] && !qe.SPA_SPLIT["*"])),
        Xe = (() => {
            const e = qe.debugConfig || {};
            return {
                CLICK_DEBUG: e.CLICK_DEBUG,
                TIMEOUT_DEBUG: e.TIMEOUT_DEBUG,
                GA_DEBUG: e.GA_DEBUG,
                URL_DEBUG: e.URL_DEBUG,
                VARIATION_SHOWN_DEBUG: e.VARIATION_SHOWN_DEBUG,
                IN_LIST_DEBUG: e.IN_LIST_DEBUG
            }
        })(),
        ze = qe.disableAsp,
        Qe = qe.CLICK_PERF,
        Ze = qe.tpcBeacon,
        et = !qe.vwoUuidV2Secure,
        tt = D((() => window.VWO._.useCdn)) || !1,
        nt = qe.enableRefreshLimit,
        ot = qe.expUrlChange,
        it = window._vwo_acc_id > 1044e3 || qe.enableLoader,
        rt = !!qe.eblCSync,
        st = !!qe.hdPR;
    var at, dt = window._vwo_acc_id,
        ct = [],
        lt = 0,
        ut, wt = !1,
        _t = function() {
            for (var e = 0; e < ct.length; e++) ct[e].d || (ct[e].c(), ct[e].d = !0)
        };

    function pt() {
        return window._vis_debug
    }
    const gt = {
        domain: void 0,
        _create: function(e, t, n, o, i, r, s) {
            var a, d;
            pt() && 0 !== e.indexOf("debug") && (e = "debug" + e);
            const c = n > 0;
            let l = window._vis_opt_cookieDays;
            window.VWO._.cLFE && (r = !1), "_vwo_sn" !== e && "_vwo_ds" !== e && "_vis_opt_test_cookie" !== e && !isNaN(l = parseFloat(l)) && isFinite(l) && c && (n = l);
            var u = "";
            if (i ? u += "; expires=" + new Date(i).toGMTString() : n ? u += "; expires=" + new Date((new Date).getTime() + 864e5 * n).toGMTString() : !1 === n && (u = "; expires=Thu, 01 Jan 1970 00:00:01 GMT"), o || (o = gt.domain), void 0 !== o) {
                o = (null === (d = null === (a = window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG) || void 0 === a ? void 0 : a.jsConfig) || void 0 === d ? void 0 : d.dNISD) && !window._vis_opt_domain ? "" : "; domain=." + o
            }
            const w = e + "=" + encodeURIComponent(t) + u + (o || "") + "; path=/";
            window.VWO._.ss && !s ? (document.cookie = w + "; secure; samesite=none; Partitioned;", 6 === window._vwo_acc_id && e.indexOf("_vwo_ds") > -1 && !wt && (this.create(e, "", !1, o, 1, r, !0), wt = !0)) : document.cookie = w
        },
        create: function(e, t, n, o, i, r, s) {
            this._create(e, t, n, o, i, r, s), Je.syncCookieToWorkerThread(), ye(V.SET_COOKIE, e, t, n, i), Re("meta", {
                ckName: e,
                ckValue: t,
                ckDays: n,
                ckExpiryTs: i
            })
        },
        get: function(e, t, n, o) {
            var i;
            e = e.trim(), !n && pt() && (e = "debug" + e), window.VWO._.cLFE;
            var r = document.cookie.match(new RegExp("(?:^|;)\\s*" + e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=(.*?)(?:;|$)", "i"));
            return i = r && decodeURIComponent(r[1]), ye(V.GET_COOKIE, e, i), i
        },
        erase: function(e, t, n) {
            this.create(e, "", !1, t, 1, n), ye(V.ERASE_COOKIE, e)
        },
        createThirdParty: function(e, t, n, o, i, r, s) {
            if (!window.mainThread) return window.fetcher.getValue("VWO._.cookies.createThirdParty", [e, t, n, o, i, r, s]);
            var a, d, c, l;
            let u = !1;
            if (i && (u = s ? s.multiple_domains : window._vwo_exp[i].multiple_domains), "_vwo" !== e && this._create(e, t, n, o), pt() && 0 !== e.indexOf("debug") && (e = "debug" + e), !((l = window.vwo_$) && i && u || r || "_vwo" === e)) return void ye(V.SET_THIRD_PARTY_COOKIE_ERROR, e, t, n, o);
            a = l("<iframe>").attr({
                height: "1px",
                width: "1px",
                border: "0",
                class: "vwo_iframe",
                name: "vwo_" + Math.random(),
                style: "position: absolute; left: -2000px; display: none"
            }).appendTo("head").load((function() {
                -1 !== e.indexOf("split") && this.parentNode.removeChild(this), --lt || _t()
            })), lt++;
            const w = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com";
            d = w + "/ping_tpc.php?account=" + dt + "&name=" + encodeURIComponent(e) + "&value=" + encodeURIComponent(t) + "&days=" + n + "&random=" + Math.random(), /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? a.attr("src", d) : window.VWO._.lastPageUnloadURL || Ze ? window.VWO.modules.tags.dataSync.utils.sendCall(null, {
                url: "/ping_tpc.php?account=" + dt + "&name=" + encodeURIComponent(e) + "&value=" + encodeURIComponent(t) + "&days=" + n + "&random=" + Math.random(),
                serverUrl: w
            }, null, _t, !0) : ((c = l("<form>").attr({
                action: w + "/ping_tpc.php",
                "accept-charset": "UTF-8",
                target: a.attr("name"),
                enctype: "application/x-www-form-urlencoded",
                method: "post",
                id: "vwo_form",
                style: "display:none"
            }).appendTo("head")).attr("action", d).submit(), c.remove()), ye(V.SET_COOKIE, e, t, n, i, !0)
        },
        waitForThirdPartySync: function(e) {
            return c(this, void 0, void 0, (function*() {
                window.mainThread ? ct.push({
                    c: e
                }) : yield window.fetcher.getValue('VWO._.cookies.waitForThirdPartySync("${{1}}")', null, {
                    captureGroups: [e]
                })
            }))
        },
        getAll: function(e = !1) {
            const t = document.cookie.split(/; ?/),
                n = {};
            for (let e = 0; e < t.length; e++) {
                const o = t[e].split("="),
                    i = o[0],
                    r = o[1];
                try {
                    n[i] = r
                } catch (e) {}
            }
            return n
        },
        getItem: function(e, t = !1) {
            return e.indexOf("_vis_opt_") > -1 || e.indexOf("_vwo_") > -1 ? this.get(e) || this.get(e, !0) : this.get(e, !0, !0, !0)
        },
        setItem: function(e, t) {
            this.create(e, t)
        },
        includes: function(e, t = !1) {
            const n = new RegExp(e),
                o = Object.keys(gt.getAll());
            for (let e = 0; e < o.length; e++)
                if (n.test(o[e])) return 1;
            return 0
        }
    };
    var ht;
    window.VWO._.cookies = gt;
    const vt = {
        init: function() {
            ht = gt.get("_vwo_referrer"), gt.erase("_vwo_referrer"), "string" != typeof ht && (ht = document.referrer)
        },
        get: function() {
            return -1 !== location.search.search("_vwo_test_ref") ? document.referrer : ht
        },
        set: function() {
            gt.create("_vwo_referrer", ht, 18e-5)
        }
    };
    window.VWO.modules.vwoUtils.referrer = vt;
    const ft = {
        get navigator() {
            return navigator
        },
        get pageTitle() {
            return document.title
        },
        get doNotTrack() {
            return window.doNotTrack
        },
        get windowName() {
            return window.name
        },
        get currentUrl() {
            return window._vis_opt_url || window.location.href
        },
        get location() {
            return window.location
        },
        get document() {
            return window.location
        },
        get history() {
            return window.history
        },
        get accountId() {
            return window._vwo_acc_id
        },
        get smartCodeVersion() {
            return window._vwo_code_version
        },
        get serverUrl() {
            return window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/"
        },
        get vwoText() {
            return window._vwo_text
        },
        get vwoCode() {
            return window._vwo_code
        },
        get MutationObserver() {
            let e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            return window.Zone && window.Zone.__symbol__ && (e = window[window.Zone.__symbol__("MutationObserver")]), e
        },
        get vwoInternalProperties() {
            return window.VWO._
        },
        get cookie() {
            return document.cookie
        },
        get visDebug() {
            return window._vis_debug
        },
        get cookieDomain() {
            return window._vis_opt_domain || window._vwo_cookieDomain || Te(window.location.host || new URL(document.URL).host)
        },
        get vwoStyle() {
            return window._vwo_style
        },
        get screen() {
            return window.screen
        },
        get vwoCss() {
            return window._vwo_css
        },
        get visOptUrl() {
            return window._vis_opt_url
        },
        get allSettings() {
            return window.VWO._.allSettings
        },
        get apiSectionCallback() {
            return window._vwo_api_section_callback
        },
        get encodeURIComponent() {
            return window.encodeURIComponent
        },
        get page() {
            return {
                title: ft.pageTitle,
                url: ft.currentUrl,
                referrerUrl: vt.get()
            }
        },
        get timeSpentInASession() {
            var e, t, n, o, i, r;
            return +Date.now() - 1e3 * +(null === (n = null === (t = null === (e = window.VWO.phoenix) || void 0 === e ? void 0 : e.store) || void 0 === t ? void 0 : t.getters) || void 0 === n ? void 0 : n.sessionStart) ? (+Date.now() - 1e3 * +(null === (r = null === (i = null === (o = window.VWO.phoenix) || void 0 === o ? void 0 : o.store) || void 0 === i ? void 0 : i.getters) || void 0 === r ? void 0 : r.sessionStart)) / 1e3 : 0
        },
        get vwoUUID() {
            return window._vwo_uuid
        }
    };
    window.VWO.modules.dataStorePlugin = ft;
    const Ot = {
            [l.VARIATION_SHOWN]: {
                ignoreMetricDataCheck: !0
            },
            [l.ERROR_ONPAGE]: {},
            [l.CURSOR_THRASHED]: {},
            [l.PAGE_REFRESHED]: {},
            [l.QUICK_BACK]: {},
            [l.COPY]: {},
            [l.SELECTION]: {},
            [l.TAB_IN]: {},
            [l.TAB_OUT]: {},
            [l.LEAVE_INTENT]: {},
            [l.REPEATED_SCROLLED]: {},
            [l.REPEATED_HOVERED]: {},
            [l.PAGE_VIEW]: {},
            [l.DOM_CLICK]: {},
            [l.DOM_SUBMIT]: {},
            [l.CUSTOM_CONVERSION]: {},
            [l.REVENUE_CONVERSION]: {},
            [l.SYNC_VISITOR_PROP]: {
                ignoreMetricDataCheck: !0
            },
            [l.PAGE_UNLOAD]: {},
            [l.DEBUG_EVENT]: {
                ignoreMetricDataCheck: !0
            }
        },
        Et = e => !!Ot[e],
        mt = e => !!D((() => window.VWO._.allSettings.dataStore.events[e].ls)),
        St = e => D((() => !!window.VWO._.allSettings.dataStore.events[e]));
    let Tt;
    const Ct = {
        get: e => {
            try {
                0;
                return window.localStorage.getItem(e)
            } catch (e) {
                return ""
            }
        },
        set: (e, t) => {
            try {
                return Tt._setItem(e, t)
            } catch (e) {
                return ""
            }
        },
        remove: e => {
            try {
                return Tt._removeItem(e)
            } catch (e) {
                return !1
            }
        },
        getItem: function(e) {
            return this.get(e)
        },
        setItem: function(e, t) {
            this.set(e, t)
        },
        deleteAll: function() {},
        deleteItem: function(e) {
            this.remove(e)
        }
    };

    function It(e) {
        Tt = e
    }
    window.VWO._.localStorageService = Ct;
    class yt {
        constructor() {
            this.vwoEventsToBeSynced = Object.assign({}, Ot), this.allowedMetaDataProps = {
                ogName: !0,
                source: !0
            }
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.dataSync.utils." + e[0], window.fetcher.getValue(...e)
        }
        shouldSendEventCall(e, t) {
            var n;
            const o = t.name;
            if (!o) return !1;
            const i = this.vwoEventsToBeSynced[t.name];
            if (void 0 === i && !t.props.isCustomEvent && !t.props.isSurveyEvent) return !1;
            if (!window.VWO._.allSettings.dataStore.events[o]) {
                let e;
                try {
                    e = window.VWO._.native.JSON.parse(Ct.get(yt.UNREG_EVENT_LOCAL_STORAGE_NAME)) || {}
                } catch (t) {
                    e = {}
                }
                if (e[o]) return !1; {
                    e[o] = !0;
                    const t = window.VWO._.native.JSON.stringify(e);
                    Ct.set(yt.UNREG_EVENT_LOCAL_STORAGE_NAME, t)
                }
            }
            if (t.props.isCustomEvent || t.props.isSurveyEvent || t.props.forceCall) return !0;
            if (!i || !i.ignoreMetricDataCheck) {
                const e = null === (n = t._vwo) || void 0 === n ? void 0 : n.eventDataConfig;
                if (!e || Object.keys(e).length <= 0) return !1
            }
            if (t.name !== l.VARIATION_SHOWN) return !0;
            let r = "non-analytics";
            location.href.includes("jsMode=Any") && (r = "analytics");
            const s = null == t ? void 0 : t.props,
                a = null == s ? void 0 : s.id;
            if (!s || !a) return !1;
            const d = e.currentSettings.dataStore.campaigns[a] || window._vwo_exp[a],
                c = window.VWO.modules.utils.libUtils.isSessionBasedCampaign2(d),
                u = "SURVEY" === d.type;
            return !(!("analytics" === r || "non-analytics" === r && s.isFirst) || c || u)
        }
        evaluateDataForEventsCall(e, t, n) {
            var o, i, r, s, a;
            let d = !0;
            const c = null === (i = null === (o = n._vwo) || void 0 === o ? void 0 : o.eventDataConfig) || void 0 === i ? void 0 : i.addVwoPageMeta;
            null === (s = null === (r = n._vwo) || void 0 === r ? void 0 : r.eventDataConfig) || void 0 === s || delete s.addVwoPageMeta, this.syncAdditionalDataWithEventsData(null === (a = n._vwo) || void 0 === a ? void 0 : a.eventDataConfig, n);
            const l = n.eventUuid,
                u = {
                    d: {}
                };
            if (u.d.msgId = `${t}-${+new Date}`, u.d.visId = t, l && (u.d.eventUuid = l), u.d.event = {
                    props: this.excludeEventPropsNotToBeSynced(e, n.name, n.props),
                    name: n.name,
                    time: n.time
                }, n.props.$metaData) {
                const e = {},
                    t = n.props.$metaData;
                for (const n in t) Object.prototype.hasOwnProperty.call(this.allowedMetaDataProps, n) && (e[n] = t[n]);
                Object.keys(e).length > 0 && (u.d.event.props.vwoMeta = u.d.event.props.vwoMeta || {}, Object.assign(u.d.event.props.vwoMeta, e)), delete u.d.event.props.$metaData
            }
            return n.props.$visitor && (u.d.visitor = n.props.$visitor, delete n.props.$visitor, Object.keys(u.d.visitor.props).length <= 0 && (d = !1)), u.d.event.props.page = n.page || this.getPageInfo(c), this.resetDataForCurrentEvent(n), {
                payload: u,
                shouldSyncCall: d
            }
        }
        getPageInfo(e) {
            var t;
            const n = ft.page;
            return e && (n.cnnUrl = document.querySelector && ((null === (t = document.querySelector("link[rel='canonical']")) || void 0 === t ? void 0 : t.href) || ""), n.pageViewId = window.VWO._.track.getTrackPageId && window.VWO._.track.getTrackPageId() || window.VWO._.pageId), n
        }
        syncAdditionalDataWithEventsData(e, t) {
            if (e)
                for (const n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && "shouldSyncData" !== n) {
                        const o = e[n];
                        if (void 0 === o) continue;
                        t.props ? t.props[n] = o : t[n] = o
                    }
        }
        resetDataForCurrentEvent(e) {
            var t;
            let n = (null === (t = e._vwo) || void 0 === t ? void 0 : t.eventDataConfig) || {};
            (n || e.props) && (n = {}, e.props = {})
        }
        excludeEventPropsNotToBeSynced(e, t, n) {
            var o, i, r, s, a, d, c;
            const l = ["fireLinkedTagSync", "isTrusted", "page", "$visitor", "isCustomEvent", "forceCall", "VWO"];
            if (!n.isCustomEvent) {
                const n = (null === (s = null === (r = null === (i = null === (o = e.currentSettings) || void 0 === o ? void 0 : o.dataStore) || void 0 === i ? void 0 : i.events) || void 0 === r ? void 0 : r[t]) || void 0 === s ? void 0 : s.nS) || (null === (c = null === (d = null === (a = window.VWO._.allSettings.dataStore) || void 0 === a ? void 0 : a.events) || void 0 === d ? void 0 : d[t]) || void 0 === c ? void 0 : c.nS) || [];
                Array.prototype.push.apply(l, n)
            }
            if (!l || !l.length) return n;
            const u = {},
                w = window.VWO._.allSettings.dataStore.events[t];
            for (const e in n)
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    const t = n[e];
                    l.indexOf(e) > -1 ? delete u[e] : u[e] = !w && t ? pe(t, 100) : t
                }
            return u
        }
    }
    let At;

    function Nt(e) {
        if (!e) return e;
        try {
            e = window.decodeURIComponent(e)
        } catch (e) {}
        return e
    }
    yt.UNREG_EVENT_LOCAL_STORAGE_NAME = "vwoUnRegEvents";
    const Vt = function() {
            if (void 0 !== At) return At;
            const e = [],
                t = window.VWO._.allSettings.dataStore.campaigns;
            let n, o;
            for (let n in t) e.push(n);
            return At = !!(n = (window.location.search + window.location.hash).match(/.*_vis_test_id=(.*?)&.*_vis_opt_preview_combination=(.*?)(?:&|#|$)/)) && (!(!e.includes(n[1]) || !t[n[1]] || void 0 === t[n[1]].combs[o = Nt(n[2])]) && o), At
        },
        bt = /:nth-parent\((\d+)\)$/,
        Rt = /[A-Za-z1-9]*?:tm\(["']([\s\S]*?)["']\)(?:\:nth-parent\(\d\))?/,
        Lt = e => e.indexOf(":tm(") > -1,
        Wt = e => !!Lt(e),
        Pt = e => {
            const t = e.match(bt) || [];
            if (t.length < 2) return;
            const n = +t[1];
            return isNaN(n) ? void 0 : n
        };

    function Dt() {
        const e = {};
        return function(t) {
            if (e[t]) return e[t];
            if (Lt(t)) {
                const {
                    targetElement: n,
                    targetText: o,
                    ancestorLevelCount: i,
                    childSel: r
                } = (e => {
                    const t = e.match(Rt) || [e],
                        n = t[0],
                        [o] = e.split(":tm("),
                        i = t[1],
                        r = Pt(n),
                        s = void 0 !== t.index ? e.slice(t.index + n.length, e.length).trim() : "",
                        a = o.trim().split(" ");
                    return {
                        targetElement: 1 == a.length ? a[0].toUpperCase() : a.map((e => (-1 === e.search(/(\.|#)/) && (e = e.toUpperCase()), e))).join(" "),
                        targetText: i,
                        ancestorLevelCount: r,
                        childSel: s
                    }
                })(t);
                return e[t] = {
                    targetElement: n,
                    targetText: o,
                    ancestorLevelCount: i,
                    childSel: r
                }
            }
            return {
                targetElement: "",
                targetText: ""
            }
        }
    }
    const xt = Dt(),
        Ut = {};

    function Mt(e) {
        if (Array.isArray(Ut[e])) return Ut[e];
        const t = e.split("<vwo_sep>");
        return 1 === t.length ? Ut[e] = [{
            sel: e,
            isTxtSel: !0
        }] : Ut[e] = t.map((e => ({
            sel: e.trim(),
            isTxtSel: Wt(e)
        })))
    }
    const kt = e => "number" == typeof e,
        Gt = (e, t) => !(!e || e.sel !== t),
        Ft = (e, t) => kt(e) && e === t,
        $t = ({
            targetElement: e,
            targetText: t,
            ancestorLevelCount: n,
            childSel: o
        }, i, r) => {
            const s = [e, t].join(".");
            if (!r || !Array.isArray(r[s])) return null;
            for (let e = 0; e < r[s].length; e++) {
                const t = i[r[s][e]];
                if (!t) return null;
                const a = !n && !t.d || Ft(n, t.d),
                    d = !o && !t.cd || Gt(t.cd, o);
                if (a && d) return t
            }
            return null
        },
        jt = e => {
            const t = Mt(e),
                n = window.VWO._.txtCfg || {},
                o = n.mp = n.mp || {};
            let i = "";
            const r = e => {
                i += e + ","
            };
            for (const e of t)
                if (e.isTxtSel)
                    if (o[e.sel]) r(o[e.sel]);
                    else {
                        const t = xt(e.sel),
                            i = $t(t, n.t, n.txtSelMap);
                        if (i && i.s) {
                            const t = "." + i.s;
                            r(t), o[e.sel] = t
                        }
                    }
            else r(e.sel);
            return i
        },
        Bt = () => {
            window.VWO._.txtCfg && window.VWO._.txtCfg.mp && window.fetcher.setValue("window.VWO._.txtCfg.mp", window.VWO._.txtCfg.mp)
        };
    class Ht {
        constructor() {
            this.uuid = "", this.preview = Vt, this.hideElExpression = "{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}", this.domIndependentCampaigns = ["ANALYSIS", "SURVEY", "ANALYZE_RECORDING", "ANALYZE_HEATMAP", "ANALYZE_FORM", "TRACK", "FUNNEL", "INSIGHTS_FUNNEL", "INSIGHTS_METRIC"], this.sessionBasedCampaigns = {
                ANALYZE_RECORDING: !0,
                ANALYZE_HEATMAP: !0,
                ANALYZE_FORM: !0,
                TRACK: !0,
                FUNNEL: !0,
                INSIGHTS_FUNNEL: !0,
                INSIGHTS_METRIC: !0
            }
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.utils.libUtils." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
        isDomDependent(e) {
            return "VISUAL_AB" === e || "VISUAL" === e
        }
        isTestingCampaign(e) {
            return this.isDomDependent(e) || "SPLIT_URL" === e
        }
        generateUUID() {
            return "Jxxxxxxxxxxx4xxxyxxxxxx5xxxxxxxx9".replace(/[xy]/g, (function(e) {
                const t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16).toUpperCase()
            }))
        }
        isDomIndependentCampaign(e) {
            return -1 !== this.domIndependentCampaigns.indexOf(e)
        }
        isSessionBasedCampaign2(e) {
            const t = e.type;
            return !!this.sessionBasedCampaigns[t]
        }
        hasInsightsMetric(e) {
            return "INSIGHTS_FUNNEL" === e || "INSIGHTS_METRIC" === e
        }
        isBot2() {
            return window.VWO._.isBot || window.navigator.userAgent.toLowerCase().indexOf("bot") >= 0 || window.navigator.userAgent.toLowerCase().indexOf("spider") >= 0 || window.navigator.userAgent.toLowerCase().indexOf("preview") >= 0
        }
        isPageBasedGoal(e) {
            return "SEPARATE_PAGE" === e || "CUSTOM_GOAL" === e || "REVENUE_TRACKING" === e
        }
        isSplitVariation(e) {
            return "SPLIT_URL" === e.type && e[O]
        }
        shouldTrackUserForCampaign(e) {
            return "number" == typeof e && (e = window._vwo_exp[e]), !e || !window._vwo_code || !window._vwo_code[v] && !window._vwo_code[f] || (this.isDomIndependentCampaign(e.type) || this.isSplitVariation(e))
        }
        getUUIDString(e) {
            return e ? "&u=" + e : ""
        }
        isAnalyzeCampaign(e) {
            return "ANALYZE_RECORDING" === e || "ANALYZE_HEATMAP" === e || "ANALYZE_FORM" === e
        }
        updateGoalsKind(e, t) {
            const n = {};
            return Object.keys(e).forEach((o => {
                const i = e[o],
                    r = e[o].mt;
                r && Object.keys(i.goals).length && Object.entries(r).forEach((([e, i]) => {
                    const r = this.getGoalKind(i);
                    !r || t && !t[r] || (n[o] = n[o] || {}, n[o][e] = r)
                }))
            })), t || (window.VWO._.goalsToBeConvertedSynchronously = n), n
        }
        getGoalKind(e) {
            let t;
            const n = window.VWO._.allSettings.triggers[e];
            if (n)
                if ("object" == typeof n.cnds[0]) {
                    switch (n.cnds[0].event) {
                        case l.DOM_CLICK:
                            t = "CLICK_ELEMENT";
                            break;
                        case l.DOM_SUBMIT:
                            t = "FORM_SUBMIT";
                            break;
                        case l.PAGE_UNLOAD:
                            t = "PAGE_UNLOAD"
                    }
                } else {
                    switch (n.cnds[1].event) {
                        case l.DOM_SUBMIT:
                        case l.DOM_CLICK:
                            t = "ENGAGEMENT"
                    }
                }
            return t
        }
        isXpathAllHead(e, t, n = !1) {
            if (e.muts = e.muts || {}, "boolean" == typeof e.muts.pvtMut && !n) return e.muts.pvtMut;
            const o = t.split(",");
            let i = !0;
            for (let e = 0; e < o.length; e++)
                if (o[e].trim() && "head" !== o[e].toLowerCase()) {
                    i = !1;
                    break
                }
            return n || (e.muts.pvtMut = i), i
        }
        isEligibleToSendCall(e, t) {
            return !Vt() && (t && !t.visDebug || !window._vis_debug) && this.shouldTrackUserForCampaign(e) && (t && t.vwoInternalProperties.shouldExecuteLib || window.VWO._.shouldExecuteLib)
        }
        isPersonalizeCampaign(e) {
            var t;
            return "TARGETING" === (null === (t = e.iType) || void 0 === t ? void 0 : t.type)
        }
        doNotHideElements(e) {
            return e && "boolean" == typeof e
        }
        getMatchedCookies(e) {
            let t = [];
            return document.cookie && (t = document.cookie.match(e) || []), t
        }
        getCombinationCookie() {
            let e = this.getMatchedCookies(/(?:^|;)\s?(_vis_opt_exp_\d+_combi=[^;$]*)/gi);
            e = e.map((function(e) {
                try {
                    const t = decodeURIComponent(e);
                    return /_vis_opt_exp_\d+_combi=(?:\d+,?)+\s*$/.test(t) ? t : ""
                } catch (e) {
                    return ""
                }
            }));
            const t = [];
            return e.forEach((function(e) {
                const n = e.match(/([\d,]+)/g);
                n && t.push(n.join("-"))
            })), t.join("|")
        }
        getSelectorPath(e, t) {
            let n = "",
                o = "",
                i = t.sections[1].variations[e];
            if ("string" == typeof i && (i = vwo_$.parseJSON(i)), i)
                for (let e = 0; e < i.length; e++) {
                    let r = i[e].xpath;
                    r && (i[e].dHE ? t.dHE = !0 : (t.mSP && (r = r.replace(/html\.vwo_p_s_\w+\s*/g, "")), Wt(r) ? n += jt(r) : n += r + ",")), i[e].cpath && !i[e].dHE && (o += i[e].cpath + ",")
                }
            return {
                variationXPathSelector: n,
                variationCPathSelector: o
            }
        }
        getCampaignXPath(e) {
            const t = {
                selector: "",
                selectorPerVariation: {},
                cPathSelector: "",
                cPathSelectorPerVariation: {}
            };
            if (e.xPath) return t.selector = e.xPath, t.cPathSelector = e.cPath, t;
            if (!this.isDomDependent(e.type)) return t;
            let n = e.combination_chosen || e.cc;
            const o = e.sections;
            if ("VISUAL_AB" === e.type) {
                if (n) 1 != n && (t.selector = this.getSelectorPath(n, e).variationXPathSelector);
                else
                    for (n in e.combs)
                        if (e.combs.hasOwnProperty(n)) {
                            const {
                                variationXPathSelector: o,
                                variationCPathSelector: i
                            } = this.getSelectorPath(n, e);
                            t.selector += o, t.cPathSelector += i, t.cPathSelectorPerVariation[n] = i, t.selectorPerVariation[n] = o.substring(0, o.length - 1)
                        }
            } else {
                const e = Y(o);
                let n = e.length;
                for (; n--;) o[e[n]].path && (t.selector += o[e[n]].path + ",")
            }
            return !e.dHE || t.selector && !this.isXpathAllHead(e, t.selector, !0) || (t.selector = (t.selector || "") + ".vwo_dummy_selector,"), t.cPathSelector && (t.cPathSelector = t.cPathSelector.substring(0, t.cPathSelector.length - 1)), t.selector && (t.selector = t.selector.substring(0, t.selector.length - 1)), Bt(), t
        }
    }
    const Kt = window.VWO.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM || 1 / 48,
        Jt = {
            TRACK_GLOBAL_COOKIE_NAME: "_vwo_ds",
            TRACK_SESSION_COOKIE_NAME: "_vwo_sn",
            TRACK_SESSION_COOKIE_EXPIRY: Kt,
            SESSION_TIMER_EXPIRE: 60 * Kt * 60 * 1e3 * 24,
            COOKIE_VERSION: 3,
            COOKIE_TS_INDEX: 1,
            COOKIE_VERSION_INDEX: 0,
            FIRST_SESSION_ID_INDEX: 0,
            PC_TRAFFIC_INDEX: 1,
            RELATIVE_SESSION_ID_INDEX: 0,
            PAGE_ID_INFORMATION_INDEX: 1,
            SESSION_SYNCED_STATE_INDEX: 4,
            PAGE_ID_EXPIRY: 15,
            GLOBAL_OPT_OUT: "_vwo_global_opt_out",
            OPT_OUT: "_vis_opt_out",
            TEST_COOKIE: "_vis_opt_test_cookie",
            COOKIE_JAR: "_vwo",
            SAME_SITE: "_vwo_ssm",
            UUID: "uuid",
            UUID_V2: "uuid_v2",
            VWO_COOKIE_QUERY_PARAM: "vwo_q",
            DEFAULT_EXPIRY: 100,
            UUID_COOKIE_EXPIRY: 365.2425
        };

    function qt() {
        return Math.min(window.VWO.TRACK_GLOBAL_COOKIE_EXPIRY_CUSTOM || window.VWO.data.rp || 90, 90)
    }
    const Yt = window.JSON && window.window.VWO._.native.JSON.parse || function(e) {
            return new Function("return " + e)()
        },
        Xt = window.JSON && window.window.VWO._.native.JSON.stringify || function(e) {
            return new Function("return " + e)()
        };
    var zt = Object.freeze({
        __proto__: null,
        jsonParse: Yt,
        jsonStringify: Xt
    });
    class Qt {
        modifyTriggerConditions(e, t) {
            const n = [];
            return Array.isArray(e) ? (e.forEach((e => {
                if (Array.isArray(e)) n.push(this.modifyTriggerConditions(e, t));
                else {
                    const o = t(e);
                    n.push(o)
                }
            })), n) : e
        }
        getExitTrigger(e) {
            for (let t = 0; t < e.length; t++) {
                if (Array.isArray(e[t])) {
                    const n = this.getExitTrigger(e[t]);
                    if (n) return n
                }
                if ("object" == typeof e[t] && null !== e[t] && e[t].exitTrigger) return e[t].exitTrigger
            }
        }
    }
    var Zt = new Qt;
    const en = {
            state: {}
        },
        tn = e => e && "object" == typeof e && !Array.isArray(e),
        [nn, on] = function() {
            let e = {};
            return window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                e = {}
            })), [(t, n) => {
                e[t] = e[t] || {}, e[t][n] = !0
            }, (t, n) => tn(e[t]) && !!e[t][n]]
        }();

    function rn({
        triggerId: e,
        eventName: t,
        triggerObj: n
    }) {
        const o = (n || window.VWO._.allSettings.triggers[e] || {}).cnds || [];
        for (let e = 0; e < o.length; e++)
            if (t.indexOf(o[e].event) > -1) return !0;
        return !1
    }

    function sn() {
        let e, t = !1,
            n = {};
        const o = window.VWO._.phoenixMT,
            i = {
                attach: () => {
                    if (!t) {
                        e = new MutationObserver((() => {
                            Object.keys(n).forEach((e => {
                                o.trigger(e)
                            }))
                        }));
                        try {
                            e.observe(document.querySelector("body"), {
                                childList: !0,
                                subtree: !0
                            }), t = !0
                        } catch (e) {}
                    }
                },
                remove: () => {
                    e && (e.disconnect(), e = null, t = !1)
                },
                fireEventOnMutation: e => {
                    n[e] = 1
                }
            };
        return o.on("vwo_urlChangeMt", (() => {
            i.remove(), o.getAllEvents().forEach((e => {
                e.indexOf("vwo_mutObs") > -1 && o.clearEvent(e)
            })), n = {}
        })), i
    }
    const an = sn();

    function dn(e) {
        tn(e) && Object.assign(en.state, e)
    }

    function cn(e) {
        window.fetcher.getValue('window.VWO.modules.utils.tagExecutor.fireTagEvaluatedEvent("${{1}}")', null, {
            captureGroups: [e]
        })
    }

    function ln(e, t) {
        const {
            amt: n,
            campId: o
        } = e, i = e.t, r = () => {
            try {
                t(), en.state[i] = !0
            } catch (e) {
                P({
                    msg: `Error occurred while executing "${i}" trigger`,
                    url: "triggerBasedTagExecutorMT.ts",
                    source: e
                })
            }
        };
        n && (an.attach(), an.fireEventOnMutation(`vwo_mutObs.${i}`));
        const s = rn({
            triggerId: i,
            eventName: l.CAMPAIGN_UNLOADED
        });
        if ((!i || en.state[i]) && !s) return r();
        on(e.tag, i) || (nn(e.tag, i), window.fetcher.getValue('window.VWO.modules.utils.tagExecutor.attachTriggerListenersForTagExecution("${{1}}", "${{2}}", "${{3}}")', null, {
            captureGroups: [i, r, {
                isWaitForElementEvent: n,
                campId: o,
                preventCallBackRemovalOnSpa: s,
                isCampUnloadEvent: s
            }]
        }))
    }

    function un(e) {
        if ("object" != typeof e) return '"' + e + '"';
        let t = "";
        try {
            const n = Y(e);
            let o = n.length;
            for (; o--;) {
                const i = n[o];
                t += '"' + i + '":' + un(e[i]) + ","
            }
            t = "{" + t.slice(0, -1) + "}"
        } catch (t) {
            P({
                msg: "Error in json stringify - " + e,
                url: "utils.js",
                source: encodeURIComponent("json-stringify")
            })
        }
        return t
    }

    function wn(e, t) {
        let n = !1;
        return function() {
            n || (e.call(this, arguments), n = !0, setTimeout((function() {
                n = !1
            }), t))
        }
    }

    function _n(e, t) {
        let n, o = !1;
        return function(...i) {
            o && (clearTimeout(n), n = null), n = setTimeout((function() {
                e.apply(null, i)
            }), t), o = !0
        }
    }

    function pn(e, t, n) {
        let o = document.URL;
        e && window.history ? function(e, t) {
            const n = function(n) {
                const i = e[n];
                e[n] = function(n) {
                    const r = i.apply(e, [].slice.call(arguments));
                    return window.fetcher.postMessage({
                        type: "sync",
                        property: "URL",
                        value: document.URL,
                        syncType: 2
                    }), t({
                        state: n,
                        currentUrl: document.URL,
                        previousUrl: o
                    }), o = document.URL, r
                }
            };
            n("pushState"), n("replaceState")
        }(window.history, t) : window.addEventListener("hashchange", t, !1)
    }

    function gn(e) {
        e.fn.nonEmptyContents = function() {
            if (!this || !this.length) return this.contents();
            const e = this.contents();
            let t;
            for (let n = e.length; n--;) t = e.get(n), 3 !== t.nodeType || /\S/.test(t.nodeValue) || e.splice(n, 1);
            return e
        };
        const t = function(e, t, n) {
            (navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1) && e.style.setProperty(t, n.replace("!important", "").trim()), e.style.setProperty(t, n.replace("!important", ""), "important")
        };
        e.fn.vwoCss = function() {
            let n;
            if (window._vwo_spaR) try {
                this.each((function() {
                    this.hasOwnProperty("__vwoControlStyleAttr") || (this.__vwoControlStyleAttr = this.getAttribute("style") || "")
                }))
            } catch (e) {
                const t = "[JSLIB] Error during storing control style attribute value";
                P({
                    msg: t,
                    url: "utils.js",
                    source: encodeURIComponent(t)
                })
            }
            if (1 === arguments.length) {
                if ("string" == typeof arguments[0]) return this.css(arguments[0]);
                for (const e in arguments[0]) arguments[0].hasOwnProperty(e) && (n = arguments[0][e].toString(), n.indexOf("important") > -1 ? this.each((function() {
                    t(this, e, n)
                })) : this.css(arguments[0]))
            } else if (2 === arguments.length) {
                const e = arguments[0].toString();
                n = arguments[1] ? arguments[1].toString() : null, n && n.indexOf("important") > -1 ? this.each((function() {
                    t(this, e, n)
                })) : this.css(e, n)
            } else e.fn.css.apply(this, arguments);
            return this
        }, e.fn.vwoAttr = function() {
            if (this && this.length) {
                if (2 !== arguments.length) {
                    if (1 === arguments.length) {
                        if ("string" == typeof arguments[0]) return this.attr(arguments[0]); {
                            var t = arguments[0];
                            if (window._vwo_spaR) try {
                                this.each((function() {
                                    if (!this.hasOwnProperty("__vwoControlVwoAttr")) {
                                        this.__vwoControlVwoAttr = {};
                                        Object.keys(t).forEach((e => {
                                            switch (e) {
                                                case "class":
                                                    this.hasAttribute(e) ? (this.__vwoControlVwoAttr.attrsToAddOrModify = this.__vwoControlVwoAttr.attrsToAddOrModify || [], this.__vwoControlVwoAttr.attrsToAddOrModify.push({
                                                        name: e,
                                                        value: this.getAttribute(e)
                                                    })) : (this.__vwoControlVwoAttr.attrsToRemove = this.__vwoControlVwoAttr.attrsToRemove || [], this.__vwoControlVwoAttr.attrsToRemove.push(e));
                                                    break;
                                                case "removedAttributes":
                                                    t.removedAttributes.forEach((e => {
                                                        this.hasAttribute(e) && (this.__vwoControlVwoAttr.attrsToAddOrModify = this.__vwoControlVwoAttr.attrsToAddOrModify || [], this.__vwoControlVwoAttr.attrsToAddOrModify.push({
                                                            name: e,
                                                            value: this.getAttribute(e)
                                                        }))
                                                    }));
                                                    break;
                                                default:
                                                    this.hasAttribute(e) ? (this.__vwoControlVwoAttr.attrsToAddOrModify = this.__vwoControlVwoAttr.attrsToAddOrModify || [], this.__vwoControlVwoAttr.attrsToAddOrModify.push({
                                                        name: e,
                                                        value: this.getAttribute(e)
                                                    })) : (this.__vwoControlVwoAttr.attrsToRemove = this.__vwoControlVwoAttr.attrsToRemove || [], this.__vwoControlVwoAttr.attrsToRemove.push(e))
                                            }
                                        }))
                                    }
                                }))
                            } catch (e) {
                                const t = "[JSLIB] Error during storing control attributes values";
                                P({
                                    msg: t,
                                    url: "utils.js",
                                    source: encodeURIComponent(t)
                                })
                            }
                            const n = e.extend({}, t);
                            if (Array.isArray(n.removedAttributes))
                                for (let e = n.removedAttributes.length - 1; e >= 0; e--) n[n.removedAttributes[e]] && delete n[n.removedAttributes[e]];
                            else delete n.removedAttributes;
                            const o = ["type", "height", "width"],
                                i = this.get(0);
                            for (let e in o)
                                if (o.hasOwnProperty(e)) {
                                    const t = o[e];
                                    n[t] && (i.setAttribute(t, n[t]), delete n[t])
                                }
                            if (n.class) {
                                const e = n.class.addedClasses,
                                    t = n.class.removedClasses;
                                e && e.length > 0 && this.addClass(e.join(" ")), t && t.length > 0 && this.removeClass(t.join(" ")), delete n.class
                            }
                            if (n.removedAttributes && n.removedAttributes.length > 0) {
                                for (let e = 0; e < n.removedAttributes.length; e++) this.each((function() {
                                    this.removeAttribute(n.removedAttributes[e])
                                }));
                                delete n.removedAttributes
                            }
                            it && n.src && !n.loader && (n.loader = !0, n.loaderConfig = {
                                pc: "transparent",
                                sc: "transparent",
                                id: Date.now(),
                                as: "5s"
                            });
                            const r = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                            if (n.src && n.loader) {
                                const t = `vwo-loader-el-${n.loaderConfig.id}`;
                                if (this.attr("src") !== n.src && !this.hasClass(t)) {
                                    this.attr("src", r);
                                    const o = n.src,
                                        i = n.srcSet;
                                    i && this.removeAttr("srcset"), e("head").append(`<style type="text/css" id="${t}">.${t}{width:${n.width}px;height:${n.height}px;animation-timing-function: linear;animation-duration: ${n.loaderConfig.as};animation-iteration-count: infinite;animation-name: placeHolderShimmer;background: #ccc;background: linear-gradient(to right, ${n.loaderConfig.pc} 8%, ${n.loaderConfig.sc} 38%, ${n.loaderConfig.pc} 54%);display: inline-block;}@keyframes placeHolderShimmer{0%{background-position: -468px 0}100%{background-position: 468px 0}}</style>`);
                                    const s = new Image;
                                    s.onload = s.onerror = () => {
                                        window._vwo_handleMutations && window._vwo_handleMutations(this.get(0), (() => {
                                            this.attr("src", o), i && this.attr("srcset", i), e(`#${t}`).remove(), this.removeClass(t)
                                        }))
                                    }, s.src = o, i && (s.srcset = i), this.addClass(t)
                                }["src", "srcSet", "loader", "loaderConfig"].forEach((e => {
                                    delete n[e]
                                }))
                            } else if (j && j._ && j._.ac && j._.ac.hIF && n.src && "IMG" === this.get(0).tagName) {
                                let e = n.src,
                                    t = n.srcSet;
                                n.src = r, n.srcSet && (n.srcSet = r), setTimeout((() => {
                                    window._vwo_handleMutations && window._vwo_handleMutations(this.get(0), (() => {
                                        this.attr("src", e), t && this.attr("srcset", t)
                                    }))
                                }), 0)
                            }
                            return window.VWOspvEventListenerAdded || document.addEventListener("securitypolicyviolation", (e => {
                                e.blockedURI.includes(".vwo.io") && (window.VwoIoImageLoadFailed = !0)
                            })), window.VWOspvEventListenerAdded = !0, "IMG" === i.tagName && t.src && t.src.includes(".vwo.io") && (i.onerror = () => {
                                window.VwoIoImageLoadFailed && window._vwo_handleMutations && window._vwo_handleMutations(i, (() => {
                                    this.attr("src", t.src.replace("vwo.io", "visualwebsiteoptimizer.com")), t.srcset && this.attr("srcset", t.srcset.replace("vwo.io", "visualwebsiteoptimizer.com")), delete window.VwoIoImageLoadFailed
                                }))
                            }), this.attr(n)
                        }
                    }
                    return e.fn.attr.apply(this, arguments)
                }
                this.get(0).setAttribute(arguments[0], arguments[1])
            }
            return this
        };
        const n = window._vwo_editorOperationTracker = {},
            o = {};
        window.VWO._.phoenixMT.once("vwo_domClicked", (e => {
            const t = Object.keys(o);
            for (let n = 0; n < t.length; n++) o[t[n]](e)
        })), e.fn.vwoElement = function(t) {
            const i = `vwo_w_${t.id}`,
                r = t.id && `#vwo-widget-${t.id}` || "";
            let s = !1,
                a = !1;
            if (t.wId) {
                let e = window.VWO._.native.JSON.parse(j._.allSettings.dataStore.changeSets[t.wId]),
                    n = "";
                e.css ? n += `<div ${t.idemId}="" vwo-element-id="${t.elId}">${e.html}<style>${e.css}</style></div>` : n += `<div ${t.idemId}="" vwo-element-id="${t.elId}">${e.html}</div>`, e.js && e.js.data && (n += `<script>${e.js.data}<\/script>`), t.html = n
            }
            const c = t.opId,
                u = e => {
                    c && (e ? n[c] = e : delete n[c])
                },
                w = () => {
                    u("sw-attached");
                    const n = n => {
                        j.phoenix('on("${{1}}", "${{2}}")', null, {
                            captureGroups: [n, () => {
                                u("sw-executed");
                                let n = !1;
                                t.sw.skipExecuteOnce = a, !t.sw.executed || !t.sw.skipExecuteOnce || e(r).length || f() || s || (n = !0, t.sw.executed = !1), t.sw.executed || t.ef && !t.ef.executed || p(n), t.sw.executed = !0, s = !1
                            }]
                        })
                    };
                    "string" == typeof t.sw.p_dsl ? j.phoenix(`settings.currentSettings.triggers.${t.sw.p_dsl}`).then((e => {
                        e ? (e.cnds = Zt.modifyTriggerConditions(e.cnds, (e => (!De(e) || "vwo_pageView" !== e.event && "vwo_session" !== e.event || (e.persistState = !0), e))), rn({
                            triggerObj: e,
                            eventName: l.DOM_CLICK
                        }) && (a = !0), n(e)) : d.error(`Trigger for show when p_dsl ${t.sw.p_dsl} not found.`)
                    })) : n(t.sw.p_dsl), j.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-sw-ready`]
                    })
                },
                _ = () => {
                    const e = e => {
                        const n = t.apiParamVariables.reduce(((t, n) => (t[n] = e.event[n], t)), {});
                        t.apiParams[3] = Object.assign(Object.assign({}, t.apiParams[3]), n), window[t.id] = Object.assign(Object.assign({}, window[t.id]), t.apiParams[3]), t.ef.executed = !0, (!t.sw || t.sw.executed) && p()
                    };
                    t.ef.isEventFiredHandlerExecuting || t.ef.executed || (t.ef.isEventFiredHandlerExecuting = !0, j.phoenix('store.getters.getHistoryEvents("${{1}}")', null, {
                        captureGroups: [t.triggerEventname]
                    }).then((n => {
                        var o, i;
                        n.length ? !t.ef.executed && e({
                            event: null === (o = n[0]) || void 0 === o ? void 0 : o.props
                        }) : (i = t.ef.p_dsl, j.phoenix('on("${{1}}", "${{2}}")', null, {
                            captureGroups: [i, e]
                        })), t.ef.isEventFiredHandlerExecuting = !1
                    })))
                },
                p = e => {
                    t.api ? t.api(...t.apiParams).then((n => {
                        const o = t.apiResponsevariables.reduce(((e, t) => (e[t] = n[t], e)), {});
                        window[t.id] = Object.assign(Object.assign({}, window[t.id]), o), t.html = t.html && t.html(Object.assign({
                            Array: window.Array,
                            Math: window.Math,
                            window: window.window
                        }, o)), g(e)
                    })) : g(e)
                },
                g = n => {
                    this[t.position](t.html), u(), t.js && (j.phoenix('on("${{1}}", "${{2}}")', null, {
                        captureGroups: [t.js.p_dsl, () => {}]
                    }), j.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-js-ready`]
                    })), r && (t => {
                        const n = e(t);
                        n.length && n.get(0).addEventListener("close_button_clicked", (function() {
                            s = !0, u("disconnected")
                        }))
                    })(r), t.rec && !n && h(), t.hw && (j.phoenix('on("${{1}}", "${{2}}")', null, {
                        captureGroups: [t.hw.p_dsl, () => {
                            let n = Ct.get(i);
                            n && (n = Yt(n), n.d = 1, Ct.set(i, un(n))), (t => {
                                e(t).remove()
                            })(`#vwo-widget-${t.id}`)
                        }]
                    }), j.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [`widget-${t.id}-hw-ready`]
                    })), a && (o[`vwo_domClicked.${t.id}`] = () => {
                        s = !1
                    })
                },
                h = () => {
                    let e = Ct.get(`vwo_w_${t.id}`);
                    if (e) {
                        e = Yt(e);
                        for (const t in e) switch (t) {
                            case "v":
                                e[t] = parseInt(e[t]) + 1;
                                break;
                            case "l_ts":
                                e[t] = Date.now()
                        }
                        Ct.set(`vwo_w_${t.id}`, un(e))
                    } else v(e)
                },
                v = e => {
                    !e && (e = Ct.get(`vwo_w_${t.id}`)), e || Ct.set(`vwo_w_${t.id}`, un(t.sks))
                },
                f = () => {
                    t.sks && v();
                    let e = Ct.get(`vwo_w_${t.id}`);
                    return !!e && (e = Yt(e), 1 == e.d)
                };
            return t && this.length && t.position && !f() && (t.rec ? (u("rec-attached"), j.phoenix('on("${{1}}", "${{2}}")', null, {
                captureGroups: [t.rec.p_dsl, () => {
                    u("rec-executed"), t.sw || t.ef ? (t.ef && _(), t.sw && w()) : p()
                }]
            }), j.phoenix('trigger("${{1}}")', null, {
                captureGroups: [`widget-${t.id}-rec-ready`]
            })) : t.sw || t.ef ? (t.sw && w(), t.ef && _()) : p()), this
        };
        const i = {};
        e.fn.performOp = function(t) {
            try {
                if ((n && ("sw-executed" === n[t] || "rec-executed" === n[t]) || i[t] && !(e => {
                        try {
                            return "isConnected" in e ? e.isConnected : document.body.contains(e)
                        } catch (e) {
                            return !1
                        }
                    })(i[t])) && delete n[t], this && this.length) return i[t] = this[0], n[t] ? e() : (n[t] = "in-progress", this)
            } catch (e) {}
            return this
        }, e.fn.execCode = function(e) {
            try {
                e.call(this)
            } catch (e) {
                const t = "[JSLIB] Error while running custom Code through execCode";
                P({
                    msg: t,
                    url: "HelperFunctionMT.ts",
                    source: encodeURIComponent(t)
                })
            }
            return this
        }, e(window).bind("beforeunload", (function() {
            try {
                const e = [],
                    t = j.queue || j;
                if (null == t || t.map((t => {
                        var n;
                        (null === (n = null == t ? void 0 : t[0]) || void 0 === n ? void 0 : n.startsWith("track")) && e.push(t)
                    })), !e.length) return;
                Ct.set(`_vwo_track_data_${window._vwo_acc_id}`, un(e))
            } catch (e) {
                const t = "[JSLIB EVENT] Error unload event.";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        })), e.fn.replaceWith2 = e.fn.vwoSPAReplaceWith = function(e) {
            return this.length ? this.each((function(t, n) {
                var o = document.createElement("div");
                o.innerHTML = "object" == typeof e ? e.nodeValue : e.trim(), o.firstChild && (o.firstChild.__vwoControlOuterHTML = n.__vwoControlOuterHTML || n.outerHTML);
                try {
                    const e = Array.from(o.querySelectorAll("script"));
                    if (e.length > 0)
                        for (const t of e)
                            if (-1 !== t.textContent.indexOf("_vwo_api_section_callback")) {
                                t.remove();
                                const e = document.createElement("script");
                                e.textContent = t.textContent, window.VWO.nonce && (e.nonce = window.VWO.nonce), document.head.appendChild(e)
                            }
                } catch (n) {}
                n.parentNode && n.parentNode.replaceChild(o.firstChild, n)
            })) : this
        }, e.fn.vwoRevertHtml = function() {
            try {
                return this.length && this.each((function() {
                    var t = this.innerHTML;
                    this.hasOwnProperty("__vwoControlInnerHTML") && t === this.__vwoExpInnerHTML && (e(this).html(this.__vwoControlInnerHTML), delete this.__vwoControlInnerHTML, delete this.__vwoExpInnerHTML)
                })), this
            } catch (e) {
                const t = "[JSLIB] Error during vwoRevertHtml";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.vwoRevertAttr = function() {
            try {
                return this.length && this.each((function() {
                    if (this.hasOwnProperty("__vwoControlVwoAttr")) {
                        var t = this.__vwoControlVwoAttr;
                        t.hasOwnProperty("attrsToAddOrModify") && t.attrsToAddOrModify.forEach((t => {
                            e(this).attr(t.name, t.value)
                        })), t.hasOwnProperty("attrsToRemove") && t.attrsToRemove.forEach((t => {
                            e(this).removeAttr(t)
                        })), delete this.__vwoControlVwoAttr
                    }
                })), this
            } catch (e) {
                const t = "[JSLIB] Error during vwoRevertAttr";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.vwoRevertCss = function() {
            try {
                return this.length && this.each((function() {
                    this.hasOwnProperty("__vwoControlStyleAttr") && (e(this).attr("style", this.__vwoControlStyleAttr), delete this.__vwoControlStyleAttr)
                })), this
            } catch (e) {
                const t = "[JSLIB] Error during vwoRevertCss";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.vwoRevertRearrange = function(t, n, o) {
            try {
                return this.length ? this.each((function() {
                    e(this).parent().removeAttr(`vwo-op-${t}`);
                    var i = e(n),
                        r = i.nonEmptyContents().eq(o);
                    i.length || e(this).remove(), r.length ? r.before(this) : i.append(this)
                })) : this
            } catch (e) {
                const t = "[JSLIB] Error during vwoRevertRearrange";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.revertContentOp = function() {
            try {
                return this.length && this.each((function() {
                    if (this.hasOwnProperty("__vwoControlOuterHTML")) {
                        var t = e(this);
                        e.fn.replaceWith.apply(t, [this.__vwoControlOuterHTML])
                    }
                })), this
            } catch (e) {
                const t = "[JSLIB] Error during revertContentOp";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.vwoVal = function() {
            try {
                if (window._vwo_spaR) try {
                    this.each((function() {
                        this.hasOwnProperty("__vwoControlVal") || (this.__vwoControlVal = this.value || "")
                    }))
                } catch (e) {
                    const t = "[JSLIB] Error during storing control element value";
                    P({
                        msg: t,
                        url: "helperFunctionMT.ts",
                        source: encodeURIComponent(t)
                    })
                }
                return e.fn.val.apply(this, arguments), this
            } catch (e) {
                const t = "[JSLIB] Error during vwoVal";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }, e.fn.vwoRevertVal = function() {
            try {
                return this.length && this.each((function() {
                    this.hasOwnProperty("__vwoControlVal") && (e(this).val(this.__vwoControlVal), delete this.__vwoControlVal)
                })), this
            } catch (e) {
                const t = "[JSLIB] Error during vwoRevertVal";
                P({
                    msg: t,
                    url: "helperFunction.ts",
                    source: encodeURIComponent(t)
                })
            }
        }
    }
    window.VWO.modules.utils.tagExecutor = {
        updateTriggerStates: dn
    };
    const hn = (e, t) => {
        for (; --t >= 0 && e.parentElement;) e = e.parentElement;
        return t < 0 ? e : null
    };

    function vn() {
        if (!window.vwo_$) return;
        const e = (e, t, n) => {
            var o;
            const i = (null === (o = n.iT ? e.innerText : e.textContent) || void 0 === o ? void 0 : o.trim()) || "";
            return !!i && i === t.trim()
        };
        let t, n = 0;
        const o = window.vwo_$;
        window.vwo_$ = (...i) => {
            const r = i[0] || "",
                s = (a = i[1]) && !Array.isArray(a) && "object" == typeof a ? i[1] : {};
            var a;
            if (void 0 !== s.iT && i.splice(1, 1), !r || "string" != typeof r || -1 === r.indexOf(":tm(") || /<.*(script|style)\b[^>]*>/g.test(r)) return o(...i);
            try {
                const i = Mt(r);
                if (i.length > 1) {
                    var d = [];
                    for (const e of i) {
                        const t = vwo_$(e.sel).toArray();
                        for (const e of t) e._vwo_visited || (e._vwo_visited = !0, d.push(e))
                    }
                    for (const e of d) delete e._vwo_visited;
                    return o(d)
                }
                const a = xt(i[0].sel),
                    {
                        targetElement: c,
                        targetText: l,
                        ancestorLevelCount: u,
                        childSel: w
                    } = a,
                    _ = window.VWO._.txtCfg || {};
                if (_.txtSelMap) {
                    const e = $t(a, _.t, _.txtSelMap);
                    if (e && e.s) {
                        const t = window.vwo_$("." + e.s);
                        if (t.length > 0) return t
                    }
                }
                let p = o();
                const g = e => {
                    if (u) {
                        const t = hn(e, u);
                        t && (w ? [].push.apply(p, Array.from(t.querySelectorAll(w))) : [].push.apply(p, [t]))
                    } else [].push.apply(p, [e])
                };
                if (c) {
                    const o = ((o, i, r) => {
                        const s = o.split(" "),
                            a = s.length > 1 ? s[1].toUpperCase() : s[0].toUpperCase(),
                            d = s.length > 1 ? document.querySelector(s[0]) : document.body;
                        return document.createTreeWalker(d, NodeFilter.SHOW_ELEMENT, {
                            acceptNode: o => o.tagName !== a ? NodeFilter.FILTER_SKIP : e(o, i, r) ? (t = o, n = o.querySelectorAll(a).length, n ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT) : (n--, t && !n ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP)
                        })
                    })(c, l, s);
                    let i;
                    for (; i = o.nextNode();) g(t), t = null
                } else {
                    const t = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                    for (; t.nextNode();) {
                        const n = t.currentNode;
                        n && (e(n.parentElement, l, s) && g(n.parentElement))
                    }
                }
                return n = 0, p
            } catch (e) {
                return o()
            }
        }, Object.assign(window.vwo_$, o)
    }
    window.VWO.modules.utils.helperFunctions = {
        onUrlChange: pn
    };
    const fn = {
        VISITOR_IS_NOT_OPTED_OUT: "visitorIsNotOptedOut",
        VISITOR_IS_OPTED_OUT_COMPLETELY: "visitorIsOptedOutCompletely",
        VISITOR_IS_OPTED_OUT: "visitorIsOptedOut"
    };
    var On;
    ! function(e) {
        e[e.OPTED_OUT_WITH_EXPERIENCE = 0] = "OPTED_OUT_WITH_EXPERIENCE", e[e.OPTED_OUT_PARTIALLY = 1] = "OPTED_OUT_PARTIALLY", e[e.OPTED_OUT_COMPLETELY = 2] = "OPTED_OUT_COMPLETELY"
    }(On || (On = {}));
    class En {
        setOptOutStateConfig() {
            let e, t, n, o;
            switch (e = window.VWO._.isWorkerThread ? window.phoenix.storages.storages.cookies.get("_vis_opt_out", !0) : window.VWO._.cookies.get("_vis_opt_out", !0), e && (e = Number(e)), e) {
                case 0:
                    t = fn.VISITOR_IS_OPTED_OUT, n = !0, o = !1;
                    break;
                case 1:
                case 2:
                    t = fn.VISITOR_IS_OPTED_OUT_COMPLETELY, n = !1, o = !1;
                    break;
                default:
                    t = fn.VISITOR_IS_NOT_OPTED_OUT, n = !0, o = !0
            }
            window.VWO.phoenix && window.fetcher.setValue("window.VWO._.optOutStates", {
                state: t,
                executeLib: n,
                shouldWeTrackVisitor: o
            }), window.VWO._.optOutStates = {
                state: t,
                executeLib: n,
                shouldWeTrackVisitor: o
            }
        }
        callStopAnalyzeAndSurvey() {
            window.VWO._.optOutStates.shouldWeTrackVisitor || (window.VWO._.isWorkerThread ? window.fetcher.getValue("window.VWO.modules.otherLibDeps.stopAnalyzeAndSurvey") : window.VWO.modules.otherLibDeps.stopAnalyzeAndSurvey())
        }
        getOptOutStateConfig() {
            return window.VWO._.optOutStates
        }
        shouldExecuteLibOnBasisOfCurrentOptOutState() {
            return !(!Vt() && !window._vis_debug) || (this.getOptOutStateConfig().executeLib || window._removeVwoGlobalStyle(), this.getOptOutStateConfig().executeLib)
        }
        shouldWeTrackVisitor() {
            return !(!Vt() && !window._vis_debug) || this.getOptOutStateConfig().shouldWeTrackVisitor
        }
        isVisitorOptedOut() {
            return !Vt() && !window._vis_debug && this.getOptOutStateConfig().state !== fn.VISITOR_IS_NOT_OPTED_OUT
        }
    }
    const mn = new En;
    window.VWO.modules.vwoUtils.optOut = mn;
    const Sn = {
            init: function(e, t) {
                window.fetcher.getValue("VWO._.vwoLib.initTrack", [e, t])
            },
            processEvent: function(e, t, n, o, i) {
                if ("[object Array]" !== Object.prototype.toString.call(e)) return 0;
                try {
                    var r, s, a, d = e[0],
                        c = e.slice(1),
                        l = -1 !== d.indexOf(".");
                    return l && 0 === d.indexOf(t) || !l ? (l ? (r = n[(s = d.split("."))[0]][s[1]], a = n[s[0]]) : (r = n[d], a = n), r ? (window.VWO._.prVWO = window.VWO._.prVWO.concat(i.queue ? i.splice(o, 1) : i.queue), r.apply(a, c), 1) : 0) : 0
                } catch (t) {
                    return console.log("Error occured in VWO Process Event (" + (e && e[0]) + "): ", t), 0
                }
            }
        },
        Tn = {};

    function Cn(e) {
        return c(this, void 0, void 0, (function*() {
            yield j.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, "vwoInternalProperties"]
            })
        }))
    }
    class In extends Ht {
        constructor() {
            super(), this.loadScriptLoadedScripts = {}, this.isInsightsActivated = !1, this.isCampaignsLoaded = !1, this.noopFn = () => {}, window.VWO._.phoenixMT.on(l.RUN_REVERT_TAGS, this.runRevertTagsAndUpdateInfo.bind(this))
        }
        deleteAllCss() {
            const e = document.getElementById("_vis_opt_path_hides");
            e && e.parentNode.removeChild(e)
        }
        getUUID(e) {
            e = e || {}, this.uuid = ft.vwoUUID;
            const t = e && e.id && e.multiple_domains && gt.get("_vwo_uuid_" + e.id) || gt.get("_vwo_uuid");
            return this.uuid = t || this.uuid || this.generateUUID()
        }
        createUUIDCookie2(e) {
            if (mn.isVisitorOptedOut()) return;
            const t = this.getUUID(e),
                n = e && e.id && e.multiple_domains ? "_" + e.id : "";
            return gt.get("_vwo_uuid" + n) || this.createCookieMT("_vwo_uuid" + n, t, Jt.UUID_COOKIE_EXPIRY, e, !0), j.data = j.data || {}, j.data.vin = j.data.vin || {}, j.data.vin.uuid = t, t
        }
        setVin(e) {
            if (mn.isVisitorOptedOut()) return;
            const t = this.getUUID(e);
            return j.data = j.data || {}, j.data.vin = j.data.vin || {}, j.data.vin.uuid = t, t
        }
        extraData2(e, t) {
            var n, o, i, r, s = {},
                a = j.modules.tags.sessionInfoService.getInfo(),
                d = e ? a.r : vt.get();
            const c = window.screen.width,
                l = window.screen.height;
            return s.sr = c + "x" + l, s.sc = window.screen.colorDepth, s.de = document.characterSet || document.charset, s.ul = window.navigator.language.toLocaleLowerCase(), window._vwoCc && window._vwoCc.rTD || (s.r = d), s.lt = (new Date).getTime(), s.tO = re(), s.tz = (null === (r = null === (i = null === (o = null === (n = null === Intl || void 0 === Intl ? void 0 : Intl.DateTimeFormat) || void 0 === n ? void 0 : n.call(Intl)) || void 0 === o ? void 0 : o.resolvedOptions) || void 0 === i ? void 0 : i.call(o)) || void 0 === r ? void 0 : r.timeZone) || "", t ? s : window.VWO._.native.JSON.stringify(s)
        }
        isBotScreen() {
            return +(screen.height - window.innerHeight < 0)
        }
        createCookie(e, t, n, o, i) {
            return c(this, void 0, void 0, (function*() {
                return this.otherSide('createCookie("${{1}}", "${{2}}", "${{3}}", "${{4}}", "${{5}}")', null, [null, t, n, o, i])
            }))
        }
        createCookieMT(e, t, n, o, i) {
            (i || this.shouldTrackUserForCampaign(o)) && (o && o.multiple_domains ? gt.createThirdParty(e, t, n, void 0, o.id, void 0, o) : gt.create(e, t, n))
        }
        isSSApp() {
            var e, t, n;
            const o = null === (n = null === (t = null === (e = window.VWO._.allSettings.dataStore) || void 0 === e ? void 0 : e.plugins) || void 0 === t ? void 0 : t.DACDNCONFIG) || void 0 === n ? void 0 : n.SST,
                i = o && o.SSTD;
            if (!i) return !1;
            if (j._.ssdm) return o && j._.ssdm;
            try {
                const e = window.document.domain.match(i);
                if (e && e.length > 0) return o
            } catch (e) {
                return P({
                    msg: `Invalid regex for domain. sstd = ${i}`,
                    source: encodeURIComponent(`Invalid regex for domain. VWO._.sstd = ${i}`)
                }), !1
            }
        }
        doesUuidCookiesExist() {
            return !!gt.get("_vwo_uuid") || !!ne(document.cookie.split(";"), (function(e) {
                return 0 === e.trim().indexOf("_vwo_uuid_") && 0 !== e.trim().indexOf("_vwo_uuid_v2")
            })).length
        }
        doNotTrack(e) {
            if (e.settings.vwoData.dntEnabled) return "yes" === e.navigator.doNotTrack || "1" == e.navigator.doNotTrack || "1" == e.navigator.msDoNotTrack || "1" == e.doNotTrack
        }
        isGloballyOptedOut() {
            return !!parseInt(gt.get(Jt.GLOBAL_OPT_OUT, !0), 10)
        }
        _optOut(e, t) {
            return t.trigger(l.OPT_OUT, {
                oldArgs: [!1]
            }), !1
        }
        doesSessionBasedCampaignExistsInTags(e) {
            var t = e && Yt(e),
                n = 0,
                o = t && "object" == typeof t && t.si;
            if (o && "object" == typeof o)
                for (var i in o)
                    if (o.hasOwnProperty(i) && (n = this.isSessionBasedCampaign2(window._vwo_exp[i]) ? 1 : 0)) return n;
            return n
        }
        delCSSWrapper({
            campaignData: e,
            ruleName: t,
            rulesArr: n
        }) {
            var o;
            if (Array.isArray(n) && n.length > 0)
                for (let t = 0; t < n.length; t++) {
                    const i = (null === (o = n[t]) || void 0 === o ? void 0 : o.split(",")) || [];
                    i.length > 1 ? this.delCSSWrapper({
                        rulesArr: i,
                        campaignData: e
                    }) : this.delCSS({
                        ruleName: n[t],
                        campaignData: e
                    })
                }
            t && this.delCSS({
                ruleName: t,
                campaignData: e
            })
        }
        delCSS({
            ruleName: e,
            campaignData: t
        }) {
            var n;
            if ("string" != typeof e) return;
            if ((null === (n = window._vwoCc) || void 0 === n ? void 0 : n.enableMultiRuleSupport) && e.includes(",")) return void e.split(",").forEach((e => this.delCSS({
                ruleName: e.trim(),
                campaignData: t
            })));
            if ("*" === e && (clearTimeout(window._vwo_oscTimeout), delete window._vwo_oscTimeout), window.VWO._.txtCfg && Wt(e)) {
                const n = Mt(e);
                if (n.length > 1) {
                    for (let e = 0; e < n.length; e++) this.delCSS({
                        ruleName: n[e].sel,
                        campaignData: t
                    });
                    return
                }
                if (!(e = window.VWO._.txtCfg.mp && window.VWO._.txtCfg.mp[e])) return
            }
            let o, i, r, s, a, d, c;
            if (e = e.toLowerCase(), t) {
                const e = "_vis_opt_path_hides_" + t.id,
                    n = t.variation ? e + "_" + t.variation : e;
                o = document.getElementById(n);
                let i = "";
                (window._vwo_acc_id > 742099 || 718480 === window._vwo_acc_id) && (i = "-webkit-transform:none;-ms-transform:none;transform:none;"), c = `{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;${i}}`
            } else o = window._vwo_style || document.getElementById("_vis_opt_path_hides"), c = window._vwo_css;
            if (o) {
                if (o)
                    if (o.sheet) {
                        o.styleSheet || (e = e.replace(/\*:/g, ":")), i = o.sheet, r = i.cssRules.length && i.cssRules[0].selectorText ? i.cssRules[0].selectorText.split(",") : "", s = "";
                        let t = 0;
                        for (a = 0; a < r.length; a++) vwo_$.trim(r[a]).toLowerCase() !== e || t ? s += r[a] + "," : t || (t = 1);
                        if (s && t) {
                            s = s.substr(0, s.length - 1);
                            try {
                                i.insertRule(s + c, 1)
                            } catch (e) {} finally {
                                i.deleteRule(0)
                            }
                        } else o && o.parentNode && o.parentNode.removeChild(o)
                    } else if (o.styleSheet) {
                    i = o.styleSheet, a = 0;
                    do {
                        d = i.rules[a], d && d.selectorText.toLowerCase() === e ? i.removeRule(a) : a++
                    } while (d)
                }
                "*" != e || t || (window.VWO.dNR = 1), window.fetcher.getValue('phoenix.trigger("${{1}}","${{2}}")', null, {
                    captureGroups: [l.DELETE_CSS_RULE, {
                        oldArgs: [e]
                    }]
                })
            }
        }
        insertCSS(e, t) {
            let n, o;
            "object" != typeof e || e instanceof Array || (n = e, e = n.id, o = n.className);
            let i = document.getElementById(e);
            if ([708799].includes(window._vwo_acc_id) && ("body" === t || t.includes("body,"))) {
                const t = document.getElementsByTagName("head")[0],
                    n = document.createElement("div");
                n.style.cssText = "z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;", e && n.setAttribute("id", e), o && n.classList.add(o), t.parentNode.insertBefore(n, t.nextSibling)
            } else {
                if (i) try {
                    i.removeChild(i.childNodes[0])
                } catch (e) {} else {
                    const t = document.getElementsByTagName("head")[0];
                    i = document.createElement("style"), e && i.setAttribute("id", e), o && i.setAttribute("class", o), i.setAttribute("type", "text/css"), t.appendChild(i)
                }
                if (i.styleSheet) i.styleSheet.cssText = t;
                else {
                    const e = document.createTextNode(t);
                    i.appendChild(e)
                }
            }
        }
        isCustomEvent(e) {
            return e && "string" == typeof e && e.startsWith(S)
        }
        removeCampaignLevelStyleTag(e) {
            var t = document.getElementById("_vis_opt_path_hides_" + e);
            t && t.parentNode && t.parentNode.removeChild(t)
        }
        loadScript(e, t) {
            if (this.loadScriptLoadedScripts[e]) return void(t && t());
            this.loadScriptLoadedScripts[e] = 1;
            const n = document.createElement("script");
            n.src = e, /\/web\/.*\/tag-/.test(e) && (n.crossOrigin = "anonymous"), n.type = "text/javascript", window.VWO.nonce && (n.nonce = window.VWO.nonce), t = t || this.noopFn, n.onerror = function() {
                t()
            }, document.getElementsByTagName("head")[0].appendChild(n), n.parentNode ? n.parentNode.removeChild(n) : window.setTimeout((function() {
                n.parentNode && n.parentNode.removeChild(n)
            }), 100)
        }
        setCampaignIds(e) {
            window._vwo_exp_ids = window._vwo_exp_ids || [], e = e || [], window._vwo_exp_ids.push(...e), Cn({
                experimentIds: window._vwo_exp_ids
            })
        }
        getSplitDecision(e) {
            return gt.get("_vis_opt_exp_" + e + "_split")
        }
        isCookieLessModeEnabled() {
            var e, t, n;
            if (!window.workerThread) {
                window.parent, window.self, null === (n = null === (t = null === (e = window.VWO._.allSettings.dataStore) || void 0 === e ? void 0 : e.plugins) || void 0 === t ? void 0 : t.DACDNCONFIG) || void 0 === n || n.CKLV;
                return !1
            }
            return !1
        }
        shouldStopExecWhenSsmNotFound() {
            if ("https:" === window.location.protocol) return !1;
            gt.create("_vwo_ssm", 1, 3650, void 0, void 0, !0);
            const e = gt.get("_vwo_ssm", !0);
            return gt.erase("_vwo_ssm", void 0, !0), !e
        }
        areCookiesDisabled(e) {
            let t = !1;
            e && !gt.get(Jt.TEST_COOKIE, !0) && (t = !0), t && gt.create(Jt.TEST_COOKIE, "1", void 0, void 0, void 0, !0);
            const n = !gt.get(Jt.TEST_COOKIE, !0);
            return t && gt.create(Jt.TEST_COOKIE, "", -1, void 0, void 0, !0), n
        }
        updateGlobalOptOutCookie(e) {
            e ? gt._create(Jt.GLOBAL_OPT_OUT, 1, 100, window._vwo_cookieDomain, void 0, !0) : gt.erase(Jt.GLOBAL_OPT_OUT, window._vwo_cookieDomain, !0)
        }
        syncThirdPartyGlobalCookies() {
            var e, t = null === (e = window.VWO.data.accountJSInfo) || void 0 === e ? void 0 : e.tpc;
            for (var n in t) t.hasOwnProperty(n) && n === Jt.GLOBAL_OPT_OUT && this.updateGlobalOptOutCookie(!!parseInt(t[n], 10))
        }
        removeGlobalStyle() {
            const e = window._vwo_style || document.getElementById("_vis_opt_path_hides");
            e && e.parentNode && e.parentNode.removeChild(e)
        }
        filterEventObjectForWT(e) {
            const t = {};
            return Object.keys(e).forEach((n => {
                try {
                    window.VWO._.native.JSON.stringify(e[n])
                } catch (e) {
                    return
                }
                t[n] = e[n]
            })), t
        }
        syncCachedSettingsInSessionStorage() {
            const e = `_vwo_${window._vwo_acc_id}_settings`,
                t = {};
            return window.sessionStorage.getItem(e) && (t[e] = !0), t
        }
        getSelectedVariationForPreviewMode(e) {
            let t = null;
            if (e.debug && (t = e.debug.v, -1 === window.name.indexOf(`_vis_preview_${window._vwo_acc_id}`))) {
                const n = gt.get("_vis_preview_" + window._vwo_acc_id);
                if (n) try {
                    const o = window.VWO._.native.JSON.parse(n),
                        i = e.id;
                    o && o[i] && (!e.debug.ts || o[i].ts > e.debug.ts) && (t = o[i].v || t)
                } catch (e) {}
            }
            return t
        }
        setOnLocalStorageOnBothThreads(e, t, n = []) {
            if ("object" != typeof t || null === t) return;
            let o = window.localStorage.getItem(e),
                i = null;
            if (o) {
                try {
                    o = window.VWO._.native.JSON.parse(o) || {}
                } catch (e) {
                    o = {}
                }
                for (const e in t) n.includes(e) && Object.prototype.hasOwnProperty.call(o, e) && delete t[e];
                i = window.VWO._.native.JSON.stringify(Object.assign(o, t))
            } else i = window.VWO._.native.JSON.stringify(t);
            i && (window.fetcher.getValue('window.localStorage.setItem("${{1}}", "${{2}}")', null, {
                captureGroups: [e, i]
            }), window.localStorage.setItem(e, i))
        }
        updateRTagsInfo(e, t) {
            const n = window.VWO._.rTagInfo || {};
            n[t] = n[t] || [], n[t].includes(e) || n[t].push(e), window.VWO._.rTagInfo = n
        }
        runRevertTagsAndUpdateInfo() {
            const e = window._vwo_exp,
                t = this.extractRTagsFromRule(),
                n = window.VWO._.rTagInfo;
            if (n)
                for (const o in n) {
                    const i = n[o],
                        r = e[o];
                    if (r && (null == i ? void 0 : i.length) && (!r.isApplicable || r.mSP || r.ss && (r.ss.csa || r.ss.cta))) {
                        r.cA = !1;
                        for (const e of i)
                            if (!t.includes(e)) {
                                (window.VWO._.allSettings.tags[e].fn || T)()
                            }([752930, 2000558].includes(window._vwo_acc_id) || window._vwo_acc_id >= 9e5) && !window.VWO._.isSettingsLoaded && P({
                            msg: "Settings.js status update - revertTags",
                            url: window.location.href
                        }), delete window.VWO._.rTagInfo[o]
                    }
                }
        }
        extractRTagsFromRule() {
            const {
                rules: e
            } = j._.allSettings, t = [];
            for (let n = 0; n < e.length; n++) {
                const o = e[n];
                if (o.tags && o.tags[0].id.startsWith("R_")) {
                    t.push(...o.tags.map((e => e.id)));
                    break
                }
            }
            return t
        }
        fireVariationShownSentForSplit() {
            if (!(window._vwo_code && window._vwo_code.finished())) return;
            const e = window.VWO._.native.JSON.parse(localStorage.getItem(I.VS_DATA) || "{}");
            Object.keys(e).forEach((t => {
                const n = e[t].v;
                e[t].u === window.location.href && (window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                    captureGroups: [l.VARIATION_SHOWN_SENT, {
                        oldArgs: [t, n]
                    }]
                }), window.VWO._.phoenixMT.trigger(l.VARIATION_SHOWN_SENT, t))
            }))
        }
        fireAuxiliaryPageView() {
            this.isInsightsActivated && this.isCampaignsLoaded && this.otherSide("fireAuxiliaryPageView")
        }
        initAuxiliaryPageView() {
            window.VWO._.phoenixMT.on("vwo_insightsActivated", (() => {
                this.isInsightsActivated = !0, this.fireAuxiliaryPageView()
            })), window.VWO._.phoenixMT.on("vwo_campaignsLoaded", (() => {
                this.isCampaignsLoaded = !0, this.fireAuxiliaryPageView()
            }))
        }
        resetAuxDependencies() {
            this.isCampaignsLoaded = !1, this.isInsightsActivated = !1
        }
        saveVSDataInStorageForSplit(e, t, n) {
            const o = window.VWO._.native.JSON.parse(window.localStorage.getItem(I.VS_DATA) || "{}");
            o[e] = {}, o[e].v = t, o[e].u = n, window.localStorage.setItem(I.VS_DATA, window.VWO._.native.JSON.stringify(o))
        }
        loadNcLib(e) {
            const t = e || D((() => window._VWO._vis_nc_lib)),
                n = {
                    dSC: !0,
                    onloadCb: function(e, t) {
                        200 === e.status || 304 === e.status ? _vwo_code.addScript({
                            text: e.responseText
                        }) : window.VWO._.gcpfb(t, window.VWO.modules.utils.libUtils.loadNcLib, e.status)
                    },
                    onerrorCb: function(e) {
                        window.VWO._.gcpfb(e, window.VWO.modules.utils.libUtils.loadNcLib) || P({
                            msg: "Error in loading nc library"
                        })
                    }
                };
            vwo_$(document).ready((function() {
                2 === window.VWO.load_co.length ? window.VWO.load_co(t, n) : window.VWO.load_co(t)
            }))
        }
        fireUrlChangeWildCardEvent() {
            ot && D((() => {
                window.VWO.modules.tags.wildCardCallback({
                    VWO: {
                        firedTime: Date.now()
                    }
                }, l.URL_CHANGED)
            }), {
                sendErrorLog: !0,
                msg: "fireUrlChangeWildCardEvent",
                url: "UrlChangeEventMT.ts"
            })
        }
    }
    const yn = new In;
    var An;
    window.VWO.modules.utils.libUtils = yn,
        function(e) {
            e.PRE = "PRE", e.POST = "POST"
        }(An || (An = {}));
    const Nn = () => {
            let e = [],
                t = [],
                n = !1;
            const o = n => {
                    const o = e.length > 0,
                        i = t.length > 0;
                    return n ? n === An.PRE ? o : n === An.POST ? i : void 0 : o || i
                },
                i = (i, r) => {
                    if (!n || !o(i)) return r;
                    const s = !r || !he(r),
                        a = Object.assign({}, D((() => r.d.event.props)) || {}),
                        c = D((() => r.d.event.name));
                    let l = Object.assign({}, r);
                    const u = i === An.POST ? t : e;
                    for (const e of u)
                        if ("function" == typeof e) try {
                            l = e(l) || l
                        } catch (e) {
                            d.warn(`Error while running ${i}-Hook callback!`)
                        }
                    return s ? r : (i === An.PRE && Et(c) && ((e, t) => {
                        const n = e.d.event.name,
                            o = window.VWO._.allSettings.dataStore.events[n];
                        if (!o.wP) return;
                        Object.assign(t, o.wP || {});
                        const i = e.d.event.props;
                        for (const e in i) Object.prototype.hasOwnProperty.call(i, e) && !(e in t) && delete i[e]
                    })(l, a), l)
                };
            return {
                init: (o, i) => {
                    Array.isArray(i.preHookList) && (e = [...e, ...i.preHookList]), Array.isArray(i.postHookList) && (t = [...t, ...i.postHookList]), o.event.addPreHook = t => (e.push(t), e.length - 1), o.event.addPostHook = e => (t.push(e), t.length - 1), n = !0
                },
                runAllHooks(e, t) {
                    const n = i(An.PRE, e);
                    return {
                        processedData: n,
                        wrappedCallback: (...e) => {
                            i(An.POST, n), t(...e)
                        }
                    }
                },
                canRunHook: o
            }
        },
        Vn = Nn();
    var bn;

    function Rn(e, t) {
        if (e) {
            var n, o = "." + e,
                i = window.vwo_$;
            if ((t = t || {})[e]) return !1;
            try {
                n = i(o)
            } catch (e) {
                n = ""
            }
            return 1 === n.length || (t[e] = !0, !1)
        }
    }

    function Ln(e) {
        if (e) {
            var t, n = window.vwo_$;
            try {
                t = n("#" + e)
            } catch (e) {
                t = ""
            }
            return t.length
        }
    }

    function Wn(e, t) {
        var n = t[e](),
            o = t.get(0);
        if (!n) {
            if (window.getComputedStyle && void 0 !== (n = getComputedStyle(o)[e]) && (n = parseInt(n, 10), !isNaN(n) && n)) return n;
            n = o["client" + e.toUpperCase()[0] + e.substring(1, e.length)]
        }
        return n
    }

    function Pn(e) {
        if (e.previousElementSibling) return e.previousElementSibling;
        for (; e = e.previousSibling;)
            if (1 === e.nodeType) return e
    }

    function Dn(e, t) {
        if (!e) return null;
        if (e === document) return "#document";
        t = t || {};
        var n, o, i, r, s, a = e,
            d = [],
            c = e.tagName,
            l = window.vwo_$;
        if (e === document.body || e === document.head) return c;
        for (; e;) {
            n = (c = "undefined" != typeof ShadowRoot && e instanceof ShadowRoot ? "shadow-root" : e.tagName) && c.match(/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/), c && n && (n && n[0]) === c || (c = "*");
            const w = ["INPUT", "SELECT"].indexOf(e.tagName) > -1;
            try {
                o = l(e).attr("id")
            } catch (a) {
                o = e.id
            }
            w && e.name ? c = c + '[name="' + e.name + '"]' : o && "string" == typeof o && Ln(o) && (c = o.match(/^\d/) ? c + '[id="' + o + '"]' : c + "#" + o), i = (i = e.getAttribute && e.getAttribute("class")) ? i.split(/\s+/) : [];
            for (var u = 0; u < i.length; u++)
                if (s = "." + (r = i[u]), Rn(r, t)) {
                    c += s;
                    break
                }
            d.unshift(c), e = Pn(e)
        }
        return -1 !== d[0].indexOf("#") || a.parentNode && "HEAD" === a.parentNode.nodeName || a.host || (d[0] += ":first-child"), Dn("undefined" != typeof ShadowRoot && a instanceof ShadowRoot && a.host ? a.host : a.parentNode, t) + " > " + d.join(" + ")
    }

    function xn(e) {
        return e instanceof SVGElement && e.tagName && "svg" !== e.tagName.toLowerCase() ? xn(e.parentNode) : e
    }

    function Un(e) {
        return Wn("width", e)
    }

    function Mn(e) {
        return Wn("height", e)
    }! function(e) {
        e.DEBUG_VS_EVENT = "vsEventFired", e.DEBUG_PAGE_EXIT = "pageExit"
    }(bn || (bn = {}));
    const kn = (e, {
            perAnimation: t = !1
        } = {}) => new Promise((n => {
            t ? requestAnimationFrame((() => n(e()))) : "requestIdleCallback" in window ? requestIdleCallback((() => {
                n(e())
            }), {
                timeout: 2e3
            }) : "function" == typeof queueMicrotask ? queueMicrotask((() => n(e()))) : "undefined" != typeof Promise ? Promise.resolve().then((() => n(e()))) : setTimeout((() => n(e())), 0)
        })),
        Gn = (e, t = {}) => {
            yn.isSessionBasedCampaign2(window._vwo_exp[t.expId]) || window.VWO._.event(l.DEBUG_EVENT, Object.assign(Object.assign(Object.assign(Object.assign({
                type: e,
                expId: t.expId,
                varId: t.varId
            }, D((() => t.timeouts.sts)) && {
                stsTimeout: t.timeouts.sts
            }), D((() => t.timeouts.lib)) && {
                libTimeout: t.timeouts.lib
            }), D((() => t.timeSpent)) && {
                timeSpent: t.timeSpent
            }), D((() => t.timeSpent2)) && {
                timeSpent2: t.timeSpent2
            }))
        },
        Fn = () => {
            const e = document.cookie.split(";").filter((e => e.includes("_vis_opt_exp_")));
            let t = -1;
            D((() => {
                const [e] = performance.getEntriesByType("navigation"), n = e.startTime;
                t = (performance.now() - n) / 1e3
            }));
            return {
                cookieStr: e,
                timeSpent: D((() => performance.now() - window._VWO_VaGQ_StartTime)) || -1,
                timeSpent2: t
            }
        },
        $n = () => {
            const e = /^(_vis_opt_exp|_vwo)/,
                t = document.cookie.split(";");
            let n = "";
            return t.forEach((t => {
                const [o, i] = t.trim().split("=");
                e.test(o) && (n += o.trim() + "=" + (i ? i.trim() : "") + ";")
            })), n
        },
        jn = (e, t = []) => {
            try {
                const {
                    msg: n,
                    url: o = window.location.href,
                    navType: i = "",
                    additionalOptions: r = {}
                } = e, s = window._vwo_code || {}, a = Object.assign({
                    uuid: D((() => window.VWO._.cookies.get("_vwo_uuid"))),
                    url: window.location.href,
                    referrer: document.referrer,
                    nav: i,
                    aId: window._vwo_acc_id,
                    sT: s.sT,
                    lT: s.lT,
                    aC: !!window._vwo_code,
                    cookies: t.length ? t : $n(),
                    inL: window._vwoIntegrationsLoaded,
                    ogUUID: yn.getUUID(),
                    windowUUid: window._vwo_uuid
                }, r);
                P({
                    msg: n,
                    url: encodeURIComponent(o),
                    source: window.VWO._.native.JSON.stringify(a)
                })
            } catch (e) {}
        },
        Bn = e => {
            var t;
            try {
                if (!Xe.CLICK_DEBUG) return;
                const n = D((() => Xe.CLICK_DEBUG.filters)) || {},
                    o = window.sessionStorage.getItem("referred"),
                    {
                        local_referred_url: i,
                        referred_url: r
                    } = o && window.VWO._.native.JSON.parse(o) || {},
                    s = e.event.target.tagName.toLowerCase();
                if (Object.keys(n).length > 0 && !n[s]) return;
                const a = "a" === s && e.event.target.href,
                    d = String(Dn(e.event.target));
                jn({
                    msg: null !== (t = e.msg) && void 0 !== t ? t : "Click Debug Log",
                    url: encodeURIComponent(window.location.href),
                    additionalOptions: {
                        cookies: $n(),
                        uuid: window._vwo_uuid,
                        targetEl: e.event.target.innerText,
                        referrerSession: r,
                        referrerPage: i,
                        targetUrl: a,
                        targetXP: d
                    }
                })
            } catch (e) {}
        },
        Hn = (...e) => {
            D((() => window._vwoCc.debugLogs)) && jn.call(void 0, ...e)
        },
        Kn = () => {
            Xe.GA_DEBUG && D((() => {
                const e = Xe.GA_DEBUG.expIds,
                    t = "function" == typeof window.fetch;
                let n = 0;
                if (t && Object.keys(e || {}).some((e => !!window.VWO._.allSettings.dataStore.campaigns[e]))) {
                    const t = window.fetch;
                    window.fetch = function(...o) {
                        return D((() => {
                            const t = o[0] || "",
                                i = (o[1] || {}).body,
                                r = /VWO-(\d+)-(\d+)/,
                                s = r.exec(t) || r.exec(i) || [];
                            t.includes("analytics.google.com/g/collect") && s.length > 0 && e[s[1]] && (jn({
                                msg: "GA Collect Log",
                                additionalOptions: {
                                    data: Array.from(s),
                                    userType: D((() => window.VWO.data.vi.vt)) || "unknown"
                                }
                            }), ++n)
                        })), t.call(this, ...o)
                    }
                }
                window.VWO._.phoenixMT.on(l.PAGE_EXIT, (() => {
                    const {
                        cookieStr: e,
                        timeSpent: o,
                        timeSpent2: i
                    } = Fn();
                    jn({
                        msg: "Page Exit Logs",
                        additionalOptions: {
                            userType: D((() => window.VWO.data.vi.vt)) || "unknown",
                            dL: Array.isArray(window.dataLayer),
                            doesFetchExist: t,
                            didCollectCallGo: n,
                            timeSpent: o,
                            timeSpent2: i
                        }
                    }, e)
                }));
                const o = Object.keys(e).reduce(((e, t) => {
                    const n = window.VWO._.cookies.get(`_vis_opt_exp_${t}_combi`);
                    return Object.assign(Object.assign({}, e), {
                        [t]: !!n
                    })
                }), {});
                e && window.VWO.push(["onVariationApplied", t => {
                    e[t[1]] && jn({
                        msg: `Variation Applied => ${t[1]}-${t[2]}`,
                        additionalOptions: {
                            dL: Array.isArray(window.dataLayer),
                            didCollectCallGo: n,
                            userType: D((() => window.VWO.data.vi.vt)) || "unknown",
                            doesCombiCookieExist: o
                        }
                    })
                }])
            }))
        },
        Jn = () => {
            D((() => {
                if (!Xe.VARIATION_SHOWN_DEBUG) return;
                const e = Xe.VARIATION_SHOWN_DEBUG || {};
                window.VWO.push(["onVariationShownSent", t => {
                    const [n, o, i] = t || [];
                    e[o] && jn({
                        msg: `Variation Shown Sent => ${o}-${i}`
                    })
                }])
            }))
        },
        qn = () => {
            if (!D((() => !!window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG.debugEvt))) return;
            const e = (e, t, n) => {
                window.VWO.push([t, ([t, o, i]) => {
                    Gn(e, Object.assign({
                        expId: o,
                        varId: i
                    }, n || {}))
                }])
            };
            e(bn.DEBUG_VS_EVENT, "onVariationShownSent", {
                timeouts: {
                    lib: D((() => ft.vwoCode[v])),
                    sts: D((() => ft.vwoCode[f]))
                }
            }), e(bn.DEBUG_VS_EVENT, "onVariationApplied"), window.VWO._.phoenixMT.on(l.PAGE_EXIT, (e => {
                const {
                    timeSpent: t,
                    timeSpent2: n
                } = Fn();
                Gn(bn.DEBUG_PAGE_EXIT, {
                    timeSpent: t,
                    timeSpent2: n
                })
            }))
        },
        Yn = (e = {}) => {
            D((() => {
                if (!Xe.URL_DEBUG) return;
                const {
                    rgx: t,
                    sendCookie: n
                } = Xe.URL_DEBUG, o = window.location.href;
                new RegExp(t).test(o) && jn({
                    msg: "URL Debug Log",
                    url: o,
                    additionalOptions: e
                }, (n || []).map((e => window.VWO._.cookies.get(e))))
            }))
        },
        Xn = () => {
            D((() => {
                if (!Xe.IN_LIST_DEBUG) return;
                const e = Xe.IN_LIST_DEBUG;
                Object.keys(e).some((e => !!window._vwo_exp[e])) && window.VWO.push(["onVariationApplied", t => {
                    D((() => {
                        var n;
                        const [o, i] = t || [];
                        if (!e[i]) return;
                        const r = localStorage.getItem("_vwo_store_content"),
                            s = window.vwo_heap_id || "";
                        if (!r || !s) return;
                        const a = null === (n = window.VWO._.native.JSON.parse(r).fns) || void 0 === n ? void 0 : n.list;
                        if (!a) return;
                        const d = window.VWO._.cookies.get("_vis_opt_exp_" + i + "_combi");
                        Object.entries(a).forEach((([e, t]) => {
                            const [n] = window.VWO._.native.JSON.parse(e);
                            if (n !== s) return;
                            const {
                                vn: o,
                                val: i
                            } = t;
                            0 == i && jn({
                                msg: "In_List_Debug_Log",
                                additionalOptions: {
                                    heapId: s,
                                    functionVersion: o,
                                    value: i,
                                    isFirst: !!d
                                }
                            })
                        }))
                    }))
                }])
            }))
        };
    window.VWO._.sendErrorLog = jn;
    class zn extends yt {
        handleDomTriggeredEvent(e) {
            const t = e.name;
            t.indexOf("vwo_dom_") < 0 || (t === l.DOM_CLICK && (e.name = "click"), t === l.DOM_SUBMIT && (e.name = "submit"))
        }
        sendCall(e, t, n, o, i, r, s, a) {
            var d;
            const c = (null == t ? void 0 : t.cUrl) || window.VWO._.lastPageUnloadURL || document.URL;
            if (!mn.shouldWeTrackVisitor() || yn.isBot2() || L.deferOnConsent("sendCall", this, o, r, s, n, e, t, n, o, i, r, s, {
                    cu: c,
                    ru: document.referrer
                })) return;
            const l = null == t ? void 0 : t.successCallback,
                u = null == t ? void 0 : t.errorCallback,
                w = (null == t ? void 0 : t.serverUrl) || (null === (d = window.VWO.data.accountJSInfo) || void 0 === d ? void 0 : d.collUrl) || ft.serverUrl,
                _ = ft.accountId,
                p = w.endsWith("/");
            let g = o,
                h = w;
            if (s) {
                h += `${p?"":"/"}events/${St(s.name)?"t":"t/u"}?en=${s.name}&a=${_}&v=${window.VWO.v_e}`;
                let e = g;
                if (Vn.canRunHook()) {
                    const t = Vn.runAllHooks(n, e);
                    n = t.processedData, e = t.wrappedCallback
                }
                _o(s.name), g = function(...t) {
                    e.call(this, ...t), po(s.name, Object.assign(Object.assign(Object.assign({}, s), n.d.event.props), {
                        url: void 0
                    }))
                }
            } else {
                if (!t) return;
                h += t.url, h = fe(h, "vn", t.vn), h = fe(h, "vns", t.vns), h = fe(h, "vno", t.vno), h = fe(h, "eTime", ie()), h = fe(h, "v", window.VWO.v_e)
            }
            window.VWO.consentMode && a && (h.indexOf("&cu=") < 0 && (h += "&cu=" + encodeURIComponent(a.cu.slice(0, 100))), document.referrer && h.indexOf("&ru=") < 0 && a.ru && (h += "&ru=" + encodeURIComponent(a.ru.slice(0, 100)))), window.VWO._.isBeaconAvailable = !0, i = window.VWO.data.tB && (window.VWO._.isLinkRedirecting || i);
            let v = n && "object" == typeof n && 0 === Object.keys(n).length ? "" : n;
            v && "string" != typeof v && (v = window.VWO._.native.JSON.stringify(v));
            $({
                url: h,
                complete: g,
                success: l,
                error: u,
                data: v,
                useBeacon: i,
                callbackContext: r,
                additionalOptions: {
                    cUrl: c
                }
            }).typeOfCall !== $.callTypes.BEACON && (window.VWO._.isBeaconAvailable = !1)
        }
        addDataFromMTAndSend(e, t, n, o, i, r, s, a) {
            if (o = o || T, s && s.name === l.VARIATION_SHOWN) {
                s.props.extraData = yn.extraData2(!1, !0);
                try {
                    const e = window.VWO._.native.JSON.parse(Ct.get("vwoSn") || "{}"),
                        t = {
                            r: window.VWO.data.vi && "new" === window.VWO.data.vi.vt ? 0 : 1,
                            su: decodeURIComponent(e.cu) || "",
                            ru: decodeURIComponent(e.r) || "",
                            ed: s.props.extraData
                        };
                    n.d && (n.d.sD = t)
                } catch (e) {
                    P({
                        msg: "Issue with session data payload to be sent in events call",
                        url: "dataSync/utils.ts"
                    })
                }
                if ("SPLIT_URL" == _vwo_exp[a].type) {
                    const e = o;
                    o = function() {
                        e(r), window.VWO._.phoenixMT.trigger(`vwo_vSCallSent_${a}`, {
                            id: a,
                            comb: _vwo_exp[a].combination_chosen
                        }), _vwo_exp[a].vSCallSent = !0
                    }, [708427].includes(window._vwo_acc_id) && 5 == a && jn({
                        msg: "Variation shown sent."
                    })
                }
            }
            this.sendCall(e, t, n, o, i, r, s)
        }
        getDataForEventsCall(e, t, n) {
            const o = window.VWO.modules.tags.sessionInfoService,
                {
                    payload: i,
                    shouldSyncCall: r
                } = this.evaluateDataForEventsCall(e, t, n);
            return i.d.sessionId = o.getSessionId(), {
                data: i,
                shouldSyncCall: r
            }
        }
    }
    const Qn = new zn;
    window.VWO.modules.tags.dataSync = {
        utils: Qn
    };
    var Zn = new zn;
    class eo extends w {
        execute({
            event: e
        }, t, n, o, i, r) {
            if (o = o || T, window._vis_debug) o && o(i);
            else if (Zn.shouldSendEventCall({
                    eventDataConfig: t
                }, e)) {
                r = r || yn.createUUIDCookie2(n);
                const {
                    data: s,
                    shouldSyncCall: a
                } = Zn.getDataForEventsCall({
                    eventDataConfig: t
                }, r, e);
                a && Zn.sendCall(null, null, s, o, !0, i, e)
            } else o && o(i)
        }
    }
    const to = new eo,
        no = to.execute.bind(to);

    function oo(e, t) {
        var n;
        const o = e.conflictingPropsData || {};
        if (!e.props) {
            e.props = {};
            const n = ["name", "props", "_vwo", "_meta", "conflictingPropsData", "eventUuid"];
            for (const t in e) Object.prototype.hasOwnProperty.call(e, t) && (n.includes(t) || (e.props[t] = e[t]));
            Object.assign(e.props, o), Object.keys(t).forEach((n => {
                e.props[n] = t[n]
            }))
        }
        e.aux && (e.props.aux = e.aux), e.time = e.time || (null === (n = e.VWO) || void 0 === n ? void 0 : n.firedTime) || +new Date
    }
    window.VWO.modules.tags.dataSync = Object.assign(window.VWO.modules.tags.dataSync, no);
    class io {
        toAbsURL(e) {
            return new URL(e, document.baseURI).href
        }
        isHashPresent(e) {
            return -1 !== e.indexOf("#")
        }
        isQueryParamPresent(e, t) {
            var n = e.indexOf("#"),
                o = e.indexOf("?"),
                i = t ? -1 : e.indexOf("=");
            return -1 === n ? -1 !== o || -1 !== i : -1 !== o && n > o || -1 !== i && n > i
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.urlUtils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class ro extends io {
        getUrlVars(e) {
            var t, n, o, i = {};
            for (-1 !== e.indexOf("#") && (e = e.slice(0, e.indexOf("#"))), n = (o = e.slice(e.indexOf("?") + 1).split("&").reverse()).length; n--;)
                if (void 0 === i[(t = o[n].split("="))[0]]) {
                    let e = t[1];
                    (478778 == window._vwo_acc_id || window._vwo_acc_id > 495077) && (e = t.slice(1).join("=")), i[t[0]] = e
                } else i[t[0]] = i[t[0]] + "&" + t[0] + "=" + t[1];
            return i
        }
    }
    const so = new ro;

    function ao(e, t, n, o = null) {
        return window.fetcher.getValue('VWO.modules.events.fireEventAndSyncData("${{1}}","${{2}}","${{3}}", "${{4}}" )', null, {
            captureGroups: [null, t, n, o]
        })
    }

    function co(e, t, n = {}, o = null) {
        var i;
        let r;
        t.name = e || t.name, oo(t, n), t.name === l.DOM_SUBMIT || t.name === l.DOM_CLICK && t.targetUrl ? t.props.targetUrl = t.targetUrl = so.toAbsURL(t.targetUrl) : t.name === l.VARIATION_SHOWN && (r = window._vwo_exp[t.props.id]);
        const s = null === (i = t._vwo) || void 0 === i ? void 0 : i.eventDataConfig;
        if (s) {
            const e = Object.keys(s);
            for (let n = e.length - 1; n >= 0; --n) {
                const i = e[n];
                t._vwo.eventDataConfig = s[i], delete s[i], no({
                    event: t
                }, s, null, o, null, i)
            }
        } else no({
            event: t
        }, r)
    }
    window.VWO.modules.vwoUtils.urlUtils = so;
    let lo = {};

    function uo(e) {
        e ? lo[e] = {} : lo = {}
    }

    function wo(e, {
        shouldNotUnhide: t,
        tagName: n,
        campId: o
    }) {
        lo[o] = lo[o] || {}, t || n && lo[o][n] || (n && (lo[o][n] = !0), window.VWO._.phoenixMT.trigger(l.UNHIDE_ELEMENT, e))
    }
    const _o = e => {
            D((() => {
                window.fetcher.getValue('window.VWO.modules.events.markEventSyncedWT("${{1}}")', null, {
                    captureGroups: [e]
                }).catch((e => {}))
            }))
        },
        po = (e, t) => {
            mt(e) && window.fetcher.getValue('window.VWO.modules.eventHistHandler.updateEventHist("${{1}}","${{2}}")', null, {
                captureGroups: [e, t]
            })
        };
    let go = {};
    const ho = () => {
            go = {}
        },
        vo = ({
            campaignId: e,
            combination: t,
            errorObject: n,
            tagName: o
        }) => {
            console.error(n), go[o] || (go[o] = !0, window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                captureGroups: [l.VARIATION_APPLIED_ERROR, {
                    oldArgs: [e, t, {
                        message: n.message,
                        stack: n.stack
                    }]
                }]
            }))
        };
    window.VWO.modules.events = {
        syncEventsDataToDataLayer: co,
        fireEventAndSyncData: ao
    };
    const fo = {
        getDataStore: function() {
            return this.getDSCookieValueByIndex(1)
        },
        setDataStore: function(e) {
            gt.create(Jt.TRACK_GLOBAL_COOKIE_NAME, this.getMetaStore() + "$" + e, qt())
        },
        getMetaStore: function() {
            return this.getDSCookieValueByIndex(0) || ""
        },
        setMetaStore: function(e) {
            gt.create(Jt.TRACK_GLOBAL_COOKIE_NAME, e + "$" + this.getDataStore(), qt())
        },
        getMetaInfoByIndex: function(e) {
            return this.getMetaStore().split(":")[e]
        },
        setMetaInfoByIndex: function(e, t) {
            var n = this.getMetaStore().split(":");
            n[e] = t, this.setMetaStore(n.join(":"))
        },
        setDataInfoByIndex: function(e, t) {
            var n = this.getDataStore().split(":");
            n[e] = t, this.setDataStore(n.join(":"))
        },
        getDataInfoByIndex: function(e) {
            return this.getDataStore().split(":")[e]
        },
        getDSCookieValueByIndex: function(e) {
            var t = gt.get(Jt.TRACK_GLOBAL_COOKIE_NAME);
            return t ? t.split("$")[e] : null
        },
        getCookieVersion: function() {
            return gt.get(Jt.TRACK_GLOBAL_COOKIE_NAME).split("$")[0].split(":")[Jt.COOKIE_VERSION_INDEX]
        },
        deleteDataStoreInfoByIndex: function(e) {
            var t = this.getDataStore();
            t && ((t = t.split(":"))[e] = "", t = t.join(":"), this.setDataStore(t))
        }
    };
    window.VWO._.commonCookieHandler = fo;
    const Oo = 1,
        Eo = 2,
        mo = 2;

    function So() {
        const e = fo.getMetaStore().split(":")[Oo];
        return !!new RegExp("(,|^)" + u.INSIGHTS_FUNNEL + "_1").test(e) && "1"
    }

    function To(e, t, n, o) {
        var i, r = "";
        if (null == n || !o) return "";
        return (null === (i = fo.getDataStore().split(":")[Eo]) || void 0 === i ? void 0 : i.split(",")).forEach((i => {
            if (i.includes(`${e}`)) {
                const s = i.split("_");
                s[3] && s[3] == o.toString() ? parseInt(s[2], 10) + 1 == n ? (r = [e, t, n, o].join("_"), window.VWO._.phoenixMT.trigger("vwo_insightsFunnel", {
                    data: r
                })) : r = [e, t, s[2], o].join("_") : 1 == n ? (r = [e, t, 1, o].join("_"), window.VWO._.phoenixMT.trigger("vwo_insightsFunnel", {
                    data: r
                })) : r = [e, t, 0, o].join("_")
            }
        })), r
    }

    function Co(e, t, n, o) {
        var i = Eo;
        let r = [e, t].join("_");
        "INSIGHTS_METRIC" !== window._vwo_exp[e].type && (r = [e, t, 0, window._vwo_exp[e].version].join("_")), n && o && (r = To(e, t, n, o));
        var s = fo.getDataStore(),
            a = s.split(":");
        if (!a[i])
            for (let e = a.length; e <= i; e++) a[e] = "";
        a[i].match(new RegExp("(?:^|,)(" + e + "_[^,]+)")) ? a[i] = a[i].replace(new RegExp("(^|,)(" + e + "_[^,]+)"), "$1" + r) : a[i] += (0 === a[i].length ? "" : ",") + r, s = a.join(":"), fo.setDataStore(s)
    }

    function Io(e) {
        Co(e, 1)
    }

    function yo(e) {
        Co(e, 1)
    }

    function Ao(e) {
        const t = fo.getDataStore().split(":")[mo];
        return new RegExp(`(?:,|^)${e}_1(?:_[^,]*)?(?:,|$)`).test(t)
    }

    function No(e) {
        Co(e, 0)
    }

    function Vo(e, t) {
        const n = fo.getDataStore().split(":")[Eo];
        return new RegExp(`(?:,|^)${e}_${t}(?:_[^,]*)?(?:,|$)`).test(n) ? "1" : ""
    }

    function bo(e) {
        return Vo(e, 1)
    }

    function Ro(e) {
        return Vo(e, 0)
    }

    function Lo() {
        var e;
        return c(this, void 0, void 0, (function*() {
            if (!(null === (e = window.VWO._.track) || void 0 === e ? void 0 : e.loaded) && So()) {
                const e = Object.keys(window._vwo_exp).map((function(e) {
                    return c(this, void 0, void 0, (function*() {
                        const t = window._vwo_exp[e].type;
                        yn.hasInsightsMetric(t) && (yield ao(window.VWO.phoenix, l._ACTIVATED, {
                            id: e
                        }))
                    }))
                }));
                yield Promise.all(e), window.VWO._.phoenixMT.trigger("vwo_insightsActivated")
            }
        }))
    }
    window.VWO._.insightsUtils = {
        isVisBucketedForTrack: So,
        includeFunnel: Io,
        excludeFunnel: No,
        isFunnelIncluded: bo,
        isFunnelExcluded: Ro,
        activateFunnels: Lo,
        markFunnelValue: Co,
        includeInsightsMetric: yo,
        isMetircTriggered: Ao
    };
    class Wo {
        mergeNestedObjects(...e) {
            return e.reduce(((e, t) => this.recursivelyMerge(e, t)))
        }
        mergeNestedObjectsV2(e = {
            mergeArrays: !1
        }, ...t) {
            return t.reduce(((t, n) => this.recursivelyMerge(t, n, {}, e)))
        }
        createNestedObjects(e, t) {
            let n = e;
            return t && t.split(".").forEach((e => {
                Object.prototype.hasOwnProperty.call(n, e) || (n[e] = {}), n = n[e]
            })), n
        }
        clearNestedObject(e, t) {
            let n = e;
            const o = t.split("."),
                i = o[o.length - 1];
            for (let e = 0; e < o.length - 1; e++) n = n[o[e]];
            De(n[i]) ? n[i] = {} : delete n[i]
        }
        recursivelyMerge(e, t, n = {}, o = {
            mergeArrays: !1
        }) {
            if (De(e) && De(t)) {
                const i = {};
                Object.keys(e).concat(Object.keys(t)).forEach((e => {
                    i[e] = 1
                }));
                const r = Object.getOwnPropertyDescriptors(e),
                    s = Object.getOwnPropertyDescriptors(t);
                return Object.keys(i).forEach((i => {
                    s[i] ? Object.defineProperty(n, i, s[i]) : Object.defineProperty(n, i, r[i]), this.recursivelyMerge(e[i], t[i], n[i], o)
                })), n
            }
            return o.mergeArrays && xe(e) && xe(t) ? (xe(n) || (n = []), n.splice(0, n.length, ...e.concat(t)), n) : t || e
        }
    }
    var Po = new Wo;
    const Do = function(e) {
        const t = e.toString();
        let n, o;
        ((n = t.match(/^(?:async\s+)?([A-Za-z0-9_$]*)\s*=>/)) || (n = t.match(/^(?:async\s+)?\((.*)\)\s*=>/)) || (n = t.match(/^(?:async\s+)?function(?:\s+[A-Za-z_$]*)?\s*\((.*)\)\s*{/))) && (o = n[1]);
        const i = {};
        let r = !1;
        return o.split(",").forEach(((e, t) => {
            "vwo_$" === e.trim() && (i[t] = window.vwo_$, r = !0)
        })), r ? function(...t) {
            return Object.keys(i).forEach((e => {
                +e < t.length && (t[e] = i[e])
            })), e(...t)
        } : e
    };
    var xo = {};

    function Uo(e, t) {
        const n = window.VWO._.allSettings.dataStore.campaigns || {};
        if (Object.hasOwnProperty.call(n, e)) {
            if (gt.get("_vis_opt_exp_" + e + "_combi")) return delete xo[e], !0;
            const o = n[e].combs || {};
            if (Object.hasOwnProperty.call(o, t))
                for (const e in o) Object.hasOwnProperty.call(o, e) && (o[e] = e === t ? 1 : 0);
            return delete xo[e], !0
        }
        return !1
    }

    function Mo(e) {
        if (!window._vis_debug && !Vt())
            if (Array.isArray(e) && e.length)
                for (const t of e) {
                    const {
                        e: e,
                        v: n
                    } = t;
                    Uo(e, n) || (xo[e] = n)
                } else
                    for (const e in xo) Object.hasOwnProperty.call(xo, e) && Uo(e, xo[e])
    }
    var ko = function() {};

    function Go(e) {
        window.vwo_iehack_queue || (window.vwo_iehack_queue = []), window.vwo_iehack_queue.push(e)
    }

    function Fo(e, t, n, o = !1) {
        var i, r;
        if (!o && !mn.shouldWeTrackVisitor()) return;
        if (L.deferOnConsent("sendCall", this, t, null, null, null, e, null, n, o)) return;
        var s, a = new Image;
        t = t || ko, n = n || ko, a.onload = function() {
            s || (s = 1, t())
        }, a.onerror = function() {
            s || (s = 1, n())
        }, e.serverUrl = (null === (r = null === (i = window.VWO.data) || void 0 === i ? void 0 : i.accountJSInfo) || void 0 === r ? void 0 : r.collUrl) || e.serverUrl || window._vwo_server_url;
        var d = e.serverUrl + e.url;
        d = fe(d, "vn", e.vn), d = fe(d, "vns", e.vns), d = fe(d, "vno", e.vno), d = fe(d, "eTime", ie()), d = fe(d, "v", window.VWO.v_e), e.url.indexOf("&cu=") < 0 && e.url.indexOf("&url=") < 0 && (d += "&_cu=" + encodeURIComponent(document.URL.slice(0, 100))), document.referrer && e.url.indexOf("&ru=") < 0 && (d += "&_ru=" + encodeURIComponent(document.referrer.slice(0, 100))), d += "&random=" + Math.random();
        const c = D((() => window.VWO._.nativeConstants.get("navigator"))) || window.navigator;
        "function" == typeof c.sendBeacon ? c.sendBeacon(d) : (a.src = d, Go(a))
    }
    window.VWO.modules.vwoUtils.sendCall = Fo;
    var $o = {};
    const jo = function(e, t) {
        this.dependencies = {}, this.callback = e, this.name = t
    };
    jo.prototype.add = function(e) {
        e && (this.dependencies[e] = 0)
    }, jo.prototype.unResolve = function(e) {
        if (e)
            for (var t in this.dependencies) this.dependencies.hasOwnProperty(t) && t === e && (this.remove(e), this.add(e))
    }, jo.prototype.resolve = function(e) {
        if (e) {
            for (var t in this.dependencies) this.dependencies.hasOwnProperty(t) && t === e && (this.dependencies[t] = 1);
            this.canResolve(this.dependencies) && this.callback()
        }
    }, jo.prototype.remove = function(e) {
        delete this.dependencies[e]
    }, jo.prototype.canResolve = function() {
        for (var e in this.dependencies)
            if (this.dependencies.hasOwnProperty(e) && !this.dependencies[e]) return !1;
        return !0
    };
    const Bo = {
        init: function(e, t) {
            var n = new jo(e, t);
            return t && ($o[t] = n), n
        },
        getDependencyManager: function(e) {
            return $o[e]
        }
    };
    let Ho = 3,
        Ko = 50,
        Jo = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/",
        qo = {
            TPC_SUPPORT_DETECTION_FAILED: "TPC_SUPPORT_DETECTION_FAILED",
            TPC_NOT_SUPPORTED: "TPC_NOT_SUPPORTED",
            LOCAL_OPT_OUT_PARTIALLY_FAILED: "LOCAL_OPT_OUT_PARTIALLY_FAILED",
            GLOBAL_OPT_OUT_DETECTON_FAILED: "GLOBAL_OPT_OUT_DETECTON_FAILED",
            GLOBAL_OPT_OUT_PARTIALLY_FAILED: "GLOBAL_OPT_OUT_PARTIALLY_FAILED"
        },
        Yo = {
            GLOBAL_OPT_OUT: "_vwo_global_opt_out",
            OPT_OUT: "_vis_opt_out",
            UUID: "_vwo_uuid",
            UUID_V2: "_vwo_uuid_v2",
            _VIS_OPT_: "_vis_opt_",
            _VWO_: "_vwo_"
        },
        Xo = function() {},
        zo;
    const Qo = function(e, t) {
            const n = document.createElement("script"),
                o = 100 * Math.random(),
                i = "jsonpCallback" + parseInt(o, 10),
                r = document.getElementsByTagName("head")[0];
            window[i] = function(e) {
                delete window[i], r.removeChild(n), t(e)
            }, n.src = e + "?callback=" + i + "&random=" + Math.random(), window.VWO.nonce && (n.nonce = window.VWO.nonce), r.appendChild(n)
        },
        Zo = {
            init: function(e) {
                e && (Zo.options = e, Zo.serverUrl = Jo, e.exG ? (zo = Bo.init((function() {
                    e.success(ti)
                }), "optOutDM"), zo.add("thirdPartyCookieSupport"), zo.add("globalOptOutStatus"), ti.isThirdPartyCookiesSupported({
                    success: function(t) {
                        t ? zo.resolve("thirdPartyCookieSupport") : e.error({
                            errorType: qo.TPC_NOT_SUPPORTED
                        })
                    },
                    error: function() {
                        e.error({
                            errorType: qo.TPC_SUPPORT_DETECTION_FAILED
                        })
                    }
                }), ti.checkGlobalOptOutStatus({
                    success: function() {
                        zo.resolve("globalOptOutStatus")
                    },
                    error: function() {
                        e.error({
                            errorType: qo.GLOBAL_OPT_OUT_DETECTON_FAILED
                        })
                    }
                })) : (ei.isOptedOut = ei.checkOptOutStatus(), e.success(ei)))
            },
            process: function(e, t) {
                const n = gt.get(Yo.OPT_OUT, !0),
                    o = window.location.href.indexOf("vwo_disable_alert") > -1;
                if (n || window.location.href.indexOf("vwo_opt_out=1") > -1) return n || o || alert("You have successfully opted out of VWO for this website."), ei.isOptedOut = !0, "0" !== n && ("2" !== n ? Zo.optOut(e, t) : ni(), !0)
            },
            optOut: function(e, t) {
                if (!e) return;
                mn.callStopAnalyzeAndSurvey(), e.domain || (e.domain = window._vwo_cookieDomain), (t = t || {}).success = t.success || Xo, t.error = t.error || Xo;
                const n = e.optOutExpiry || 3650,
                    o = gt.get(Yo.OPT_OUT, !0);
                if (e.config && e.config.maintainExperiences) return gt.create(Yo.OPT_OUT, 0, n, e.domain, void 0, !0), void mn.setOptOutStateConfig();
                o && "0" !== o || (gt.create(Yo.OPT_OUT, 1, 100, e.domain, void 0, !0), mn.setOptOutStateConfig()), e.url = "cdc?cookies=" + window.VWO._.native.JSON.stringify([{
                    name_regex: "_vwo_uuid_*",
                    isDeleted: 1
                }]) + "&accountId=" + e.accountId + "&r=" + Math.random(), e.serverUrl = Jo, e.retryRequest = e.retryRequest || 0;
                const i = document.cookie.split(";");
                for (let t = 0; t < i.length; t++)
                    if ((i[t].indexOf(Yo._VIS_OPT_) > -1 || i[t].indexOf(Yo._VWO_) > -1) && i[t].indexOf(Yo.OPT_OUT) < 0) {
                        const [n, o] = i[t].split("=");
                        n && gt.erase(n.trim(), e.domain, !0)
                    }
                ni(), oi(), Fo(e, (function() {
                    oi(), gt.create(Yo.OPT_OUT, 2, 100, e.domain, void 0, !0), window.VWO.phoenix && window.VWO.phoenix("deactivate"), mn.setOptOutStateConfig(), t.success()
                }), (function() {
                    e.retryRequest++, e.retryRequest <= Ho ? setTimeout((function() {
                        Zo.optOut(e, t)
                    }), Ko) : t.error({
                        errorType: qo.LOCAL_OPT_OUT_PARTIALLY_FAILED
                    })
                }), !0)
            },
            updateGlobalOptOutState: function(e, t) {
                Zo.options = e, ti.checkGlobalOptOutStatus(t)
            }
        },
        ei = {
            checkOptOutStatus: function() {
                return !!gt.get(Yo.OPT_OUT, !0)
            },
            optOut: function(e, t) {
                e ? Zo.process(Zo.options, t) : (gt.erase(Yo.OPT_OUT, Zo.options.domain, !0), ei.isOptedOut = !1)
            }
        },
        ti = {
            globalOptOut: function(e, t) {
                const n = Zo.options,
                    o = e ? 1 : 0,
                    i = [{
                        name: Yo.GLOBAL_OPT_OUT,
                        value: o,
                        isDeleted: 0
                    }];
                t = t || {}, n.url = "cdc?cookies=" + window.VWO._.native.JSON.stringify(i) + "&accountId=" + n.accountId + "&r=" + Math.random(), n.serverUrl = Jo, Fo(n, (function() {
                    ti.isGloballyOptedOut = e, t.success()
                }), (function() {
                    t.error(qo.GLOBAL_OPT_OUT_PARTIALLY_FAILED)
                }), !0)
            },
            checkGlobalOptOutStatus: function(e) {
                (e = e || {}).success = e.success || Xo, e.error = e.error || Xo, ti.isThirdPartyCookiesSupported({
                    success: function(t) {
                        ti.isGloballyOptedOut = !!t && !!parseInt(t[Yo.GLOBAL_OPT_OUT], 10), e.success(ti.isGloballyOptedOut)
                    },
                    error: e.error
                })
            },
            isThirdPartyCookiesSupported: function(e) {
                (e = e || {}).success = e.success || Xo, e.error = e.error || Xo;
                const t = Zo.options.accountId;
                Fo({
                    url: "cdc?cookies=" + window.VWO._.native.JSON.stringify([{
                        name: "_vis_opt_test_cookie",
                        value: 1,
                        isDeleted: 0
                    }]) + "&accountId=" + t + "&r=" + Math.random(),
                    serverUrl: Jo,
                    vn: window.VWO.v_e
                }, (function() {
                    Qo(Jo + "cdc", (function(n) {
                        n && n["_vis_opt_test_cookie_" + t] ? (ti.tpc = !0, e.success(n)) : (ti.tpc = !1, e.success(ti.tpc))
                    }))
                }), (function() {
                    e.error({
                        errorType: qo.TPC_SUPPORT_DETECTION_FAILED
                    })
                }), !0)
            }
        };

    function ni() {
        let e = window.VWO._.localStorageService;
        gt.erase("_vwo", window._vwo_cookieDomain, !0), e.deleteItem("_vwo");
        try {
            e.deleteItem("vwoSn"), e.deleteItem("_vwo_nls_q_" + window._vwo_acc_id)
        } catch (e) {}
    }

    function oi() {
        const e = window._vwo_exp_ids || [];
        for (let t = 0; t < e.length; t++) {
            const n = e[t];
            if (n && window._vwo_exp[n]) {
                const e = document.getElementById(`_vis_opt_path_hides_${n}`);
                e && e.parentNode && e.parentNode.removeChild(e)
            }
        }
        window._removeVwoGlobalStyle()
    }

    function ii() {
        const e = window.VWO;
        gt.erase(Jt.OPT_OUT, window._vwo_cookieDomain, !0), window.VWO.phoenix && !mn.shouldExecuteLibOnBasisOfCurrentOptOutState() || (mn.setOptOutStateConfig(), e.nls && delete e.nls.stopRecording, e.survey && delete e.survey.stopCollectingData)
    }

    function ri(e = {}) {
        window.VWO.modules.otherLibDeps.stopAnalyzeAndSurvey(), Zo.optOut({
            accountId: window._vwo_acc_id,
            config: e
        })
    }
    var si;
    ! function(e) {
        e[e.EVENT = 40] = "EVENT", e[e.ATTRIBUTE = 40] = "ATTRIBUTE"
    }(si || (si = {}));
    const ai = {
        EMPTY_EVENT: "Event name cannot be empty!",
        EVENT_MORE_THAN_LIMIT: "Event name should not be greater than 40 characters!",
        EVENT_NOT_STRING: "Invalid event name: event name can only be a string!",
        ATTRIBUTE_MORE_THAN_LIMIT: "Attribute name should not be greater than 40 characters!",
        ATTRIBUTE_NOT_OBJECT: "Invalid attribute type: attribute can only be an object!"
    };
    class di {
        static toCamelCase(e) {
            return e.replace(/[^\w\s-.][\w]/g, (function(e) {
                return e.toUpperCase()
            })).replace(/[^\w\s-.]/g, "").replace(/ [\w]/g, (function(e) {
                return e.toUpperCase()
            })).replace(/ /g, "")
        }
        static filterPropertyName(e) {
            let t = di.toCamelCase(e.slice(e.search(/[\w-.]/g)));
            return t = t.replace(/^(_|vwo_|\.|v_|i_|-)*/g, ""), "props" === t ? "" : t
        }
        static filterEventName(e) {
            if (this.whiteListedEvents[e]) return e;
            let t = di.toCamelCase(e.slice(e.search(/[\w-.]/g)));
            return t = t.replace(/^(_|vwo_|\.|v_|i_|-)*/g, ""), "visitors" === t.toLowerCase() && (t += "_1"), t
        }
        static filterAttributeObjectKeys(e) {
            if ("object" != typeof e || Array.isArray(e)) return di.logWarningAndReportError(ai.ATTRIBUTE_NOT_OBJECT);
            const t = {};
            for (const n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    let o = di.whiteListedProps[n] ? n : di.filterPropertyName(n);
                    if (!o.trim()) return di.logWarningAndReportError(`Invalid attribute name: '${n}' is not allowed as an attribute name!`);
                    o.length > 40 && (o = o.slice(0, 40), console.warn(ai.ATTRIBUTE_MORE_THAN_LIMIT));
                    const i = De(e[n]) || xe(e[n]) ? window.VWO._.native.JSON.stringify(e[n]) : e[n];
                    ["name", "time"].includes(o) ? (t.conflictingPropsData = t.conflictingPropsData || {}, t.conflictingPropsData[o] = i) : t[o] = i
                }
            return t
        }
        static logWarningAndReportError(e) {
            console.log("%cVWO Event API Error:", "font-weight:bold;", e), P({
                msg: "VWO Event API Error: " + e,
                url: "NamingUtil.ts"
            })
        }
    }
    di.whiteListedProps = {
        vwo_hubspot_id: !0
    }, di.whiteListedEvents = {
        [l.RECOM_BLOCK_SHOWN]: !0,
        [l.DEBUG_EVENT]: !0
    };
    const ci = {
            combi: "cb",
            goal: "gl",
            exclude: "ex",
            uuid: "ud",
            split: "sp"
        },
        li = () => {
            const e = {
                q: Jt.VWO_COOKIE_QUERY_PARAM,
                d: ""
            };
            try {
                let t = "";
                const n = window._vwo_exp || {},
                    o = window.VWO._.cookies.getAll(),
                    i = {};
                for (const e in o)
                    if (o[e]) {
                        const r = o[e],
                            s = N.campaignCookies.exec(e),
                            a = N.uuidCookie.exec(e),
                            d = (s || a || [])[1];
                        if (!d || n[d] && !n[d].multiple_domains) continue;
                        if (a && a[1]) t += `ud_${a[1]}=${r}`;
                        else if (s && s[1]) {
                            const e = s[2].split("_"),
                                n = e[0],
                                o = e[1],
                                a = ci[n];
                            if (!a) continue;
                            if ("goal" === n) {
                                const e = `${a}_${d}`;
                                if (+r > 1) t += `${e}_${o}=${r}`;
                                else {
                                    i[e] = i[e] || "";
                                    const t = i[e].length;
                                    t > 0 && "," !== i[e][t - 1] && (i[e] += ","), i[e] += o
                                }
                            } else t += `${a}_${d}=${r}`
                        }
                        "|" !== t[t.length - 1] && (t += "|")
                    }
                Object.keys(i).forEach((e => {
                    t += `${e}_${i[e]}=1|`
                })), e.d = t && encodeURIComponent(t.slice(0, t.length - 1))
            } catch (e) {}
            return e
        },
        ui = () => {
            if (!window._vwo_code) return null;
            const e = window._vwo_code || {},
                t = window.performance.getEntriesByType("resource").find((e => e.name.includes("/j.php?a=")));
            let n = -1,
                o = -1;
            if (t) {
                const e = Math.abs(t.fetchStart - t.startTime),
                    i = Math.abs(t.requestStart - t.fetchStart),
                    r = Math.abs(t.responseEnd - t.responseStart),
                    s = +window._VWO_Jphp_StartTime;
                o = e + i + r, n = isNaN(s) ? -1 : s - t.responseEnd
            }
            return {
                settings_tolerance: D((() => e.settings_tolerance())),
                library_tolerance: D((() => e.library_tolerance())),
                settingsTimedOut: !!e.sT,
                libraryTimedOut: !!e.lT,
                timeToStartExecuteJphp: n,
                totalDownloadTime: o
            }
        },
        wi = (() => {
            let e = null;
            return {
                get: function(t) {
                    return D((() => {
                        if ("visitor.id" === t) return e || (e = yn.createUUIDCookie2({
                            vwoUUID: ft.vwoUUID
                        })), e
                    }))
                }
            }
        })();

    function _i(e, t) {
        const n = (e = -1, t = "") => {
            switch (e) {
                case 0:
                    return di.logWarningAndReportError(ai.EMPTY_EVENT);
                case 1:
                    return console.warn(ai.EVENT_MORE_THAN_LIMIT);
                case 2:
                    return di.logWarningAndReportError(`Invalid event name: '${t}' is not allowed as an event name!`);
                default:
                    return di.logWarningAndReportError(ai.EVENT_NOT_STRING)
            }
        };
        if ("string" != typeof e) return n();
        if (!(e = e.trim())) return n(0);
        const o = e;
        if (!(e = di.filterEventName(e))) return n(2, o);
        e.length > 40 && (n(1), e = e.slice(0, 40));
        const i = di.filterAttributeObjectKeys(t);
        return i ? {
            eventName: e,
            filteredAttributeObject: i
        } : void 0
    }

    function pi(e, t, n) {
        const o = window.VWO;
        switch (e.toLowerCase()) {
            case "tags":
                o.phoenix.tags.add(t, n.fn);
                break;
            case "operators":
                o.phoenix.operators.add(n.fn);
                break;
            case "storages":
                o.phoenix.storages.add(n);
                break;
            case "store":
                o.phoenix.store.actions.addValues(n)
        }
    }
    class gi {
        constructor(e) {
            if (this.state = "loading", this.preInitializedEventHooks = {}, this.getPerformanceEntries = ui, this.getCrossDomainInfo = li, this.visitorConfig = (() => {
                    const e = new Promise((e => {
                        const t = window.VWO._.destroySession;
                        "function" == typeof t ? e(t) : window.VWO._.destroySession = t => {
                            e(t)
                        }
                    })).then((e => (delete window.VWO._.destroySession, e)));
                    return {
                        destroySession() {
                            return c(this, void 0, void 0, (function*() {
                                (yield e)()
                            }))
                        },
                        getInfo() {
                            const e = D((() => window.VWO._.allSettings.dataStore.plugins.GEO)) || {};
                            return delete e.vn, {
                                loc: e
                            }
                        }
                    }
                })(), e instanceof gi) return void Object.keys(e).forEach((t => {
                this[t] = e[t]
            }));
            this.queue = e.slice(), this._ = e._ || {}, this._.isWorkerThread = !1, this.nonce = e.nonce, Object.defineProperty(this, "modules", {
                value: e.modules,
                enumerable: !1,
                configurable: !1
            }), this.sTs = e.sTs, this.data = e.data || {}, this.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM = e.TRACK_SESSION_COOKIE_EXPIRY_CUSTOM, this.onEventReceive = e.onEventReceive, this.onVariationApplied = e.onVariationApplied, this.onSurveyShown = e.onSurveyShown, this.onSurveyCompleted = e.onSurveyCompleted, this.onSurveyAnswerSubmitted = e.onSurveyAnswerSubmitted, this.onVWOLoaded = e.onVWOLoaded, this.onVariationShownSent = e.onVariationShownSent, this.optOut = Zo, this.init = e.init, this.consentMode = e.consentMode, this.preInitializedEventHooks = e.event || {}, this.addPreHook = e => {
                this.preInitializedEventHooks ? (this.preInitializedEventHooks.preHookList = this.preInitializedEventHooks.preHookList || [], this.preInitializedEventHooks.preHookList.push(e)) : this.event.addPreHook(e)
            }, this.addPostHook = e => {
                this.preInitializedEventHooks ? (this.preInitializedEventHooks.postHookList = this.preInitializedEventHooks.postHookList || [], this.preInitializedEventHooks.postHookList.push(e)) : this.event.addPostHook(e)
            }, this.optInVisitor = ii, this.optOutVisitor = ri, this.get = wi.get, this.load_co = e.load_co, this.tag = e.tag, this.v_e = e.v_e, this.v = e.v;
            let t = 0;
            for (const e of this.queue) this[t] = e, t++;
            this.length = this.queue.length
        }
        config(e) {
            return e && (this.configSettings = e), this.configSettings
        }
        definePlugin(e, t = {}) {
            const n = e.split(".")[0],
                o = e.split(".")[1],
                i = window.VWO;
            i.phoenix ? pi(n, o, t) : (i.pluginStorage = i.pluginStorage || {}, i.pluginStorage[n] = i.pluginStorage[n] || {}, o ? (i.pluginStorage[n][o] = i.pluginStorage[n][o] || {}, i.pluginStorage[n][o] = Po.mergeNestedObjects(i.pluginStorage[n][o], t)) : i.pluginStorage[n] = Po.mergeNestedObjects(i.pluginStorage[n], t))
        }
        addPhoenix(e) {
            this.event = function(e, t, n) {
                var o, i;
                const r = _i(e, t = t || {});
                if (!r) return;
                let s = null;
                De(n) && ("function" == typeof n.cb && (s = n.cb), delete n.cb, r.filteredAttributeObject.$metaData = n), (null === (o = window._vwoCc) || void 0 === o ? void 0 : o.delayCustomGoal) ? (null === (i = window.VWO._.phoenixMT.getEventHistory("vwo_campaignsLoaded")) || void 0 === i ? void 0 : i.length) > 0 ? this.otherSide("event", [r.eventName, r.filteredAttributeObject, s]) : window.VWO._.phoenixMT.on("vwo_campaignsLoaded", (() => this.otherSide("event", [r.eventName, r.filteredAttributeObject, s]))) : this.otherSide("event", [r.eventName, r.filteredAttributeObject, s])
            }, Vn.init(this, this.preInitializedEventHooks), delete this.preInitializedEventHooks, this._.event = function(e, t, n) {
                (D((() => !!window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG.debugEvt)) || e === l.DEBUG_EVENT) && (t = t || {}, (null == n ? void 0 : n.enableLogs) && P({
                    msg: t.type,
                    url: window.location.href,
                    source: window.VWO._.native.JSON.stringify(t)
                }), co(e, t))
            }, this.visitor = function(e, t) {
                if (!e) return;
                const n = di.filterAttributeObjectKeys(e);
                if (n) {
                    for (const t in n) Object.prototype.hasOwnProperty.call(e, t) && (window.VWO.attributesData = window.VWO.attributesData || {}, window.VWO.attributesData[t] = n[t]);
                    De(t) && (n.$metaData = t), this.otherSide("visitor", [n])
                }
            }, this.syncAttributes = function() {
                this.otherSide("syncAttributes", [])
            }, this.syncEvents = function() {
                this.otherSide("syncEvents", [])
            }, this.setVariation = Mo, this.phoenix = e
        }
        splice(...e) {
            const t = this.queue.splice.apply(this.queue, e);
            return this.length = this.queue.length, t
        }
        push(...e) {
            const t = this.queue.push.apply(this.queue, e);
            return this.length = this.queue.length, this[this.length - 1] = this.queue[this.queue.length - 1], t
        }
        sort(...e) {
            return this.queue.sort.apply(this.queue, e)
        }
        updateSettings(e, t) {
            var n;
            const o = e.tags;
            Object.keys(o).forEach((e => {
                o[e].fn = Do(o[e].fn)
            })), window.VWO._.isSettingsLoaded = !0, window.VWO._.allSettings.triggers = Object.assign(Object.assign({}, window.VWO._.allSettings.triggers), e.triggers);
            const i = window.VWO._.allSettings.dataStore.changeSets || {},
                r = (null === (n = e.dataStore) || void 0 === n ? void 0 : n.changeSets) || {};
            for (var s in Object.assign(i, r), e.tags) window.VWO._.allSettings.tags[s] || (window.VWO._.allSettings.tags[s] = e.tags[s]);
            this.pageGroup.add(e.pages, e.pagesEval);
            const a = e.dataStore.plugins.PIICONFIG;
            a && (window.VWO._.allSettings.dataStore.plugins.PIICONFIG = {
                globalBlacklist: a.GBBL,
                queryParamSettings: window.VWO._.native.JSON.parse(a.QPS),
                globalValueRegex: a.GVR
            }), delete window.VWO._.goalsToBeConvertedSynchronously, window.VWO._.phoenixMT.trigger("updateSettingSuccess");
            const d = !!Ne(window.VWO._.track).length;
            window.fetcher.setValue("window.VWO.sTs", window.VWO.sTs), this.otherSide("updateSettings", [d, e, t])
        }
        otherSide(...e) {
            e[0] = "VWO." + e[0], window.fetcher.getValue(...e)
        }
    }
    class hi {}
    class vi {}
    const fi = function() {
            let e;
            if (window.VWO._.eventsManager) return window.VWO._.eventsManager;
            var t = [],
                n = !0,
                o = [],
                i = [],
                r = {
                    bind: "unbind",
                    live: "die",
                    on: "off"
                },
                s = [];
            var a = /iPhone|iPad/.test(navigator.userAgent);

            function d(e) {
                return !window.VWO.DONT_IOS && (!("touchmove" !== e && "touchstart" !== e && "touchend" !== e || !a) || void 0)
            }

            function c(e, t) {
                n && s.push({
                    type: e,
                    state: t,
                    ref: e[t]
                })
            }

            function l() {
                for (var e = s.length - 1; e >= 0; e--) {
                    var t = s[e];
                    t.type[t.state] = t.ref
                }
            }
            return e = {
                addEventListener: function(o, i, r, s) {
                    if (!d(i)) return n && t.push({
                        $el: o,
                        name: i,
                        callback: r,
                        capture: s
                    }), o.addEventListener ? o.addEventListener(i, r, s) : o.attachEvent && o.attachEvent("on" + i, r, s), e
                },
                addMutationObserver: function(e, t, n, o) {
                    var r;
                    if (void 0 !== window.MutationObserver ? r = window.MutationObserver : void 0 !== window.WebKitMutationObserver && (r = window.WebKitMutationObserver), r) try {
                        const r = new MutationObserver(e.bind(o));
                        i.push(r), r.observe(t, n)
                    } catch (e) {}
                },
                clearAllListeners: function() {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n],
                            d = a.$el;
                        a.jqType ? (c = d, u = a.jqType, w = a.eventName, _ = a.callback, p = a.selector, g = a.capture, u && (p ? c[r[u]] && c[r[u]](w, p, _, g) : c[r[u]] && c[r[u]](w, _, g))) : d.removeEventListener ? d.removeEventListener(a.name, a.callback, a.capture) : d.detachEvent && d.detachEvent("on" + a.name, a.callback)
                    }
                    var c, u, w, _, p, g;
                    return i.forEach((e => {
                            e.disconnect()
                        })),
                        function() {
                            for (var e = 0; e < o.length; e++) {
                                var t = o[e];
                                "interval" === t.type ? clearInterval(t.name) : clearTimeout(t.name)
                            }
                        }(), l(), t.length = 0, s.length = 0, i.length = 0, o.length = 0, e
                },
                addJqEventListener: function(o, i, r, s, a, c) {
                    return d(r) || (n && t.push({
                        $el: o,
                        jqType: i,
                        eventName: r,
                        callback: s,
                        selector: a,
                        capture: c
                    }), a ? o[i](r, a, s, c) : o[i](r, s, void 0, c)), e
                },
                pushTimers: function(t, i) {
                    if (n) return o.push({
                        name: t,
                        type: i
                    }), e
                },
                addOverrideState: c,
                overrideHistoryPush: function(e, t, o) {
                    if (n) {
                        var i = e[o];
                        c(e, o), e[o] = function(n) {
                            var o = i.apply(e, [].slice.call(arguments));
                            try {
                                t({
                                    state: n
                                })
                            } catch (e) {}
                            return o
                        }
                    }
                },
                revertOverriddenStates: l,
                init: function(e) {
                    n = e.shouldPushToQueue
                }
            }, window.VWO._.eventsManager = e, e
        }(),
        Oi = {};
    let Ei = !1,
        mi = [];
    const Si = de((function(e) {
        const t = window[e].push({
            event: "VWO"
        });
        Ei && mi && mi.push(t - 1), "dataLayer" !== e && (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
            event: "VWO"
        }))
    }), 1);

    function Ti(e) {
        var t = setInterval((function() {
            if (window.GoogleAnalyticsObject || window.ga) {
                var n = window.GoogleAnalyticsObject || "ga";
                if (window[n].getAll) {
                    clearInterval(t);
                    var o = window[n].getAll(),
                        i = !1;
                    window.gtag && o && o[0] && o[0].get("name").indexOf("gtag") >= 0 && (i = !0), e(i, n)
                }
            }
        }), 100);
        fi.pushTimers(t, "interval")
    }

    function Ci(e, t, n, o, i) {
        Ti((function(r, s) {
            if (r) {
                var a = i,
                    d = {
                        event_category: o,
                        non_interaction: !0
                    };
                d[e] = t, i && (d.send_to = a), window.gtag("event", n, d)
            } else {
                (window[s] = window[s] || function() {
                    (window[s].q = window[s].q || []).push(arguments)
                })((function(r) {
                    (r = window[s].getByName(i) || r).set(e, t), r.send("event", o, n, {
                        nonInteraction: !0
                    })
                }))
            }
        }))
    }

    function Ii(e, t, n, o) {
        if (!Vt() && !window._vis_debug) try {
            o = o || "GA", n && "" !== n ? "GA" === o && (n += ".") : n = "";
            var i = "GA" === o ? 4 : 1;
            if (t = t || window._vis_opt_GA_slot || i, Oi[e].c)
                if ("GA" === o) window._gaq = window._gaq || [], window._gaq.push((function() {
                    void 0 === window.pageTracker || n ? window._gaq.push([n + "_setCustomVar", t, "VWO-" + e, Oi[e].n, 1], [n + "_trackEvent", "VWO", "Visit", "", 0, !0]) : (window.pageTracker._setCustomVar(t, "VWO-" + e, Oi[e].n, 1), window.pageTracker._trackEvent("VWO", "Visit", "", 0, !0))
                }));
                else {
                    var r = "dimension" + t,
                        s = "CampId:" + e + ", VarName:" + Oi[e].n;
                    Ci(r, s, "Custom", "VWO", n)
                }
        } catch (t) {
            P({
                msg: "Error while pushing data in GA for experiment id - " + e,
                url: "core.js",
                source: encodeURIComponent("VWO-GA-push")
            })
        }
    }

    function yi() {
        let e, t;
        e = setInterval((() => {
            if (window.google_tag_manager) {
                const n = we();
                window.dataLayer && window.dataLayer.length && "dataLayer" !== n && window.dataLayer.filter(((e, t) => -1 !== mi.indexOf(t))).forEach((e => {
                    window[n] = window[n] || [], window[n].push(e)
                })), mi = void 0, clearInterval(e), clearTimeout(t)
            }
        }), 50), t = setTimeout((function() {
            clearInterval(e)
        }), 5e3)
    }

    function Ai(e, t) {
        const n = window._vwo_exp;
        if (yn.isSessionBasedCampaign2(n[e])) return;
        let o = 0;
        Oi[e] = {}, Oi[e].c = t, Oi[e].n = n[e].comb_n[Oi[e].c] || "";
        const i = n[e].GA ? "GA" : n[e].UA ? "UA" : "";
        let r;
        if (i && !n[e][i].tracked && (Ii(e, n[e][i].s, n[e][i].p, i), n[e][i].tracked = !0), n[e].GTM) {
            Ei || window.google_tag_manager || (yi(), Ei = !0), r = we();
            const t = {};
            t["Campaign-" + e] = Oi[e].n, window[r] = window[r] || [];
            const n = window[r].push(t);
            Ei && mi && mi.push(n - 1), "dataLayer" !== r && (window.dataLayer = window.dataLayer || [], window.dataLayer.push(t)), o = 1
        }
        o && Si(r)
    }
    window.VWO.modules.utils.collectAndSendDataForGA = Ai;
    class Ni extends vi {
        executeCode(e) {
            if (e) try {
                vwo_$("head").append(e)
            } catch (e) {}
        }
    }
    class Vi {
        otherSide(...e) {
            return e[0] = "window.VWO.modules.utils.campaignUtils." + e[0], window.fetcher.getValue(...e)
        }
        updateGoalCookieValueForExperience(e, t) {
            let n = e ? e.split("mE_")[1].split(",") : [];
            return n.includes(t) || n.push(t), `mE_${n.join(",")}`
        }
        isGoalTriggeredForExperience(e, t) {
            return (e ? e.split("mE_")[1].split(",") : []).includes(t)
        }
    }
    var bi = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:\/(?:home|default|index)\..{3,4}|\/$)?(?:\/)?([\?#].*)?$/i, "$1$2$3")
        },
        Ri = function(e) {
            return e.replace(/^(https?:\/\/)(?:w{3}\.)?(.*?)(?:(?:home|default|index)\..{3,4})?([\?#].*)?$/i, "$1$2$3")
        },
        Li = function(e) {
            return Ri(e).replace(/\/\?/gi, "?")
        },
        Wi = window._vis_opt_url,
        Pi;
    class Di {
        constructor() {
            Pi = this
        }
        regexEscape(e) {
            return e.replace(/[\-\[\]{}()*+?.,\/\\^$|#\s]/g, "\\$&")
        }
        cleanURL(e, t) {
            return Wi && !t ? Wi : e.replace(/^(.*[^\*])(\/(home|default|index)\..{3,4})((\?|#).*)*$/i, "$1$4")
        }
        removeWWW(e, t) {
            return e = e.replace(/^(https?:\/\/)(www\.)?(.*)$/i, "$1$3"), t && (e = e.replace(/(^\*?|\/\/)www\./i, "$1")), e
        }
        stripSlashes(e, t, n) {
            if (e = e.replace(/\/$/, ""), t) {
                var o = e.indexOf("/?");
                e.indexOf("?") - 1 === o && (e = e.replace(/\/\?([^\?]*)(.*)/, "?$1$2"))
            }
            if (n) {
                var i = e.indexOf("/#");
                e.indexOf("#") - 1 === i && (e = e.replace(/\/#([^#]*)(.*)/, "#$1$2"))
            }
            return e
        }
        cleanPattern(e) {
            let t = "";
            return {
                regex: e.replace(/\(\?([a-zA-Z])\)/g, ((...e) => (e[1] && (t += e[1]), ""))),
                flags: t
            }
        }
        matchRegex(e, t, n, o) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            let i = "ig";
            if (o) {
                const {
                    regex: n,
                    flags: o
                } = Pi.cleanPattern(t);
                i = o || "g";
                try {
                    return new RegExp(n, i).exec(e) || Pi.matchRelativeUrl(e, n, i)
                } catch (e) {
                    const o = "Failed to create regex for the pattern: " + t + ", the cleaned regex derived from the pattern is: " + n + " and regexFlag is: " + i;
                    return d.error(o), !1
                }
            }
            var r = function(n) {
                return new RegExp(t, i).exec(e) || new RegExp(t, i).exec(n(e)) || Pi.matchRelativeUrl(e, t, i, n)
            };
            let s = bi,
                a = !1;
            390187 == window._vwo_acc_id && (a = !0), a && (s = Li);
            var c = r(s);
            return c && !a ? (s = Ri, n && r(s) || c) : c
        }
        matchRelativeUrl(e, t, n, o) {
            if (0 === e.indexOf("http")) return !1;
            const i = (new io).toAbsURL(e);
            var r = new RegExp(t, n).exec(i);
            return o && !r && (r = new RegExp(t, n).exec(o(i))), !!r
        }
        matchWildcard(e, t, n) {
            if ("string" != typeof e || "string" != typeof t) return !1;
            const o = new io;
            var i = o.isQueryParamPresent(t),
                r = o.isHashPresent(t),
                s = o.isQueryParamPresent(e),
                a = o.isHashPresent(e);
            i || (s && a ? e = e.replace(/^(.*?)(\?[^#]*)(#?.*)$/, "$1$3") : s && !a && (e = e.replace(/^(.*)(\?.*)$/, "$1"))), r || a && (e = e.replace(/^(.*?)(#.*)$/, "$1")), "/" !== e && (e = Pi.stripSlashes(e, s, a)), "/" !== t && (t = Pi.stripSlashes(t, i, r));
            var d, c, l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi");
            return l.test(e) ? (l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || l.exec(e)) : (e = Pi.removeWWW(e), t = Pi.removeWWW(t, !0), (l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) ? (l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || l.exec(e)) : (d = Pi.cleanURL(t, !0), -1 === t.indexOf("*") && ((c = Pi.removeWWW(o.toAbsURL(e)).replace(/\/$/, "").replace(/\/\?/, "?")) === t || c === d) || (e = Pi.cleanURL(e), t = d, !!(l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi")).test(e) && (l = new RegExp("^" + Pi.regexEscape(t).replace(/\\\*/g, "(.*)") + "$", "gi"), !n || l.exec(e)))))
        }
    }
    const xi = new Di;
    window.VWO.modules.vwoUtils.url = xi, window.VWO._.matchRegex = xi.matchRegex;
    class Ui {
        verifyUrl(e, t, n, o) {
            let i = !1;
            const r = o ? e : this.getCleanedUrl(e);
            if (t)
                if (o) i = !!xi.matchRegex(r, t, null, o);
                else {
                    const n = this.getCleanedUrl(e, !0);
                    i = !(!xi.matchRegex(r, t, null, o) && !xi.matchRegex(n, t, !0, o))
                }
            else i = xi.matchWildcard(r, n) || xi.matchWildcard(e, n);
            return i
        }
        getCleanedUrl(e, t) {
            if (!e) return;
            let n;
            return -1 !== e.search(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/) ? (n = e.replace(/_vis_(test_id|hash|opt_(preview_combination|random))=[a-z\.\d,]+&?/g, ""), n = t ? n.replace(/(\??&?)$/, "") : n.replace(/(\/?\??&?)$/, "")) : n = t ? e : e.replace(/\/$/, ""), n
        }
        compareUrlWithIncludeExcludeRegex(e, t, n, o) {
            const i = {};
            return n && xi.matchRegex(e, n) ? (i.didMatch = !1, i.reason = 1, i) : (i.didMatch = this.verifyUrl(e, t, o), i.reason = i.didMatch ? 2 : 3, i)
        }
    }
    const Mi = new Ui;
    class ki extends Vi {
        clearTimeouts(e) {
            this.otherSide("clearTimeouts", e)
        }
        markGoalTriggered(e, t) {
            if (!mn.shouldWeTrackVisitor()) return;
            const n = window.tracklib || window.VWO._.track;
            if ("TRACK" === e.type) n.markGoalTriggered(e.id, t);
            else if ("INSIGHTS_METRIC" === e.type) e.goals[t].mca || window.VWO._.insightsUtils.includeInsightsMetric(e.id);
            else {
                let n = gt.get("_vis_opt_exp_" + e.id + "_goal_" + t);
                if (e.mE) {
                    const t = gt.get("_vis_opt_exp_" + e.id + "_combi");
                    n = this.updateGoalCookieValueForExperience(n, t)
                } else e.goals[t].mca && n && (n = String(Number(n) + 1));
                yn.createCookieMT("_vis_opt_exp_" + e.id + "_goal_" + t, String(null != n ? n : 1), 100, e)
            }
        }
        clearTimeoutsHandler(e) {
            var t;
            e.timeout = null === (t = window._vwo_exp[e.id]) || void 0 === t ? void 0 : t.timeout, cancelAnimationFrame(e.timeout), delete e.timeout
        }
        isGoalTriggered(e, t) {
            if ("TRACK" === e.type) return !window.VWO._.track.shouldTriggerGoal(e.id, t);
            if (e.goals[t].mca) return null;
            if ("INSIGHTS_METRIC" === e.type) return window.VWO._.insightsUtils.isMetircTriggered(e.id);
            const n = gt.get("_vis_opt_exp_" + e.id + "_goal_" + t);
            if (e.mE) {
                const t = gt.get("_vis_opt_exp_" + e.id + "_combi");
                return this.isGoalTriggeredForExperience(n, t)
            }
            return n
        }
        doExperimentHere(e, t = {}) {
            const {
                currentUrl: n
            } = ft;
            let o;
            if (e.pg_config) {
                const t = e.pg_config[0];
                o = window.VWO.pageGroup.validatePage(t, null, n)
            } else o = Mi.compareUrlWithIncludeExcludeRegex(n, t.urlRegex || e.urlRegex, t.excludeUrl || e.exclude_url, t.urlPattern || e.url_pattern);
            return [o.didMatch, o.reason]
        }
        getCombiCookie(e) {
            return gt.get("_vis_opt_exp_" + e + "_combi")
        }
        getTrackGoalIdFromExp(e) {
            return Ne(window._vwo_exp[e].goals)[0]
        }
        getCombi(e, t) {
            const n = j._.track,
                o = j._.insightsUtils;
            if ("TRACK" === e.type) return n.isGoalIncluded ? n.isGoalIncluded(this.getTrackGoalIdFromExp(e.id)) : void(t || j.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: "TRACK",
                goalId: this.getTrackGoalIdFromExp(e.id)
            }]));
            if ("FUNNEL" === e.type) return n.isFunnelIncluded ? n.isFunnelIncluded(e.id) : void(t || j.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: "FUNNEL"
            }]));
            if ("INSIGHTS_FUNNEL" === e.type) return o.isFunnelIncluded(e.id);
            if (yn.hasInsightsMetric(e.type)) {
                if (e.ready) return window.VWO._.insightsUtils.isVisBucketedForTrack()
            } else if (yn.isAnalyzeCampaign(e.type)) return n.isAnalyzeCampaignIncluded ? n.isAnalyzeCampaignIncluded(e.id) : void(t || j.push(["track.delayedGoalConversion", {
                campaignId: e.id,
                type: e.type
            }]));
            return this.getCombiCookie(e.id)
        }
    }
    const Gi = new ki;
    window.VWO.modules.utils.campaignUtils = Gi;
    class Fi extends Ui {}
    const $i = new Fi;
    window.VWO.modules.utils.urlUtils = $i;
    class ji extends Ni {
        constructor() {
            super(), this.preview = Vt, this.currentCombinationXPaths = {}, window.VWO._.phoenixMT.on(l.CAMPAIGN_TAG_EXECUTED, (({
                rtag: e,
                id: t
            }) => {
                e && yn.updateRTagsInfo(e, t)
            })), window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                uo(), ho()
            })), window._vwo_api_section_callback = {}, Le()
        }
        getElementIdentifierString(e, t) {
            let n = "vwo_loaded_" + e.id;
            return "VISUAL" !== e.type && null != t && (n += "_" + t), n
        }
        isChangeAppliedOnElForCampaign(e, t, n) {
            const o = "string" == typeof e ? e : e.tagName;
            return "head" === (null == o ? void 0 : o.toLowerCase()) && (n = null), vwo_$(e).hasClass("vwo_loaded") && vwo_$(e).hasClass(this.getElementIdentifierString(t, n))
        }
        markChangeAppliedOnElForCampaign(e, t, n, o, i) {
            "head" === (null == e ? void 0 : e.toLowerCase()) && (n = null);
            const r = this.getElementIdentifierString(t, n);
            return o && vwo_$(o).addClass("vwo_loaded vwo_loaded_" + t.id + " _vwo_variation_" + i), vwo_$(e).addClass("vwo_loaded " + r)
        }
        unhideElementPerVariationEntry(e, t, n, o) {
            const i = {
                ruleName: "",
                rulesArr: [],
                campaignData: t,
                variation: yn.isPersonalizeCampaign(t) ? o.combination : null
            };
            n && n.cpath ? i.rulesArr = [e, n.cpath] : i.ruleName = e, wo(i, {
                shouldNotUnhide: o.shouldNotUnhide,
                tagName: n && n.tag,
                campId: t.id
            })
        }
        tryApplyingChanges(e, t, n, o) {
            var i, r, s;
            yn.isDomIndependentCampaign(t.type) || ((null === (i = window._vwoCc) || void 0 === i ? void 0 : i.disableRetryWhenMutDisabled) || (null === (s = null === (r = t.muts) || void 0 === r ? void 0 : r.post) || void 0 === s ? void 0 : s.enabled) || !t.xPath || yn.isXpathAllHead(t, t.xPath) || (t.timeout = requestAnimationFrame((() => {
                this.tryApplyingChanges(e, t, n, o)
            })), window._vwo_exp[t.id] && (window._vwo_exp[t.id].timeout = t.timeout)), uo(t.id), this.applyChanges(e, t, n, o), window._vwo_exp[t.id] && (window._vwo_exp[t.id].mutElg = !0), Le())
        }
        applyChanges(e, t, n, o, i = []) {
            var r, s, a;
            n || (n = {
                trigger: function(e, t) {
                    return c(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            }), t.cA = !0;
            const u = window.VWO;
            let w, _, p, g, h, v, f, O, m, S = e.split(","),
                C = 0;
            const I = t.type,
                y = t.sections,
                A = window._vwo_exp[t.id].sections,
                N = ft.apiSectionCallback || {},
                V = window.vwo_$;
            try {
                for ("VISUAL_AB" === I && (O = i.length > 0 ? i : y[1].variations[e], O ? ("object" != typeof O && (O = vwo_$.parseJSON(O)), S = new Array(O.length)) : S = []), f = S.length, null === (r = window.VWO._.phoenixMT) || void 0 === r || r.trigger(l.SET_CAMPAIGN_TO_OBSERVE, {
                        campaignId: t.id
                    }), v = 0; v < f; v++) {
                    w = void 0;
                    const r = null == O ? void 0 : O[v],
                        d = null == r ? void 0 : r.dHE;
                    p = null == r ? void 0 : r.rtag;
                    const c = O && O[v].entryIndex || v;
                    if (O && (null === (s = O[v]) || void 0 === s ? void 0 : s.iT) ? window.vwo_$.setItCallback || (window.vwo_$ = (...e) => (e.push({
                            iT: !0
                        }), V(...e)), Object.assign(window.vwo_$, V), window.vwo_$.setItCallback = !0) : window.vwo_$ !== V && (window.vwo_$ = V), "VISUAL_AB" === I) {
                        if (C = 1, !(g = r.xpath)) continue;
                        "head" === g.toLowerCase() || this.isChangeAppliedOnElForCampaign(g, t, c) ? delete this.currentCombinationXPaths[g] : this.currentCombinationXPaths[g] = [C, e], _ = r.tag, w = u._.allSettings.tags[_].fn
                    } else {
                        if (g = y[++C].path, !g) continue;
                        if ("head" === g.toLowerCase() || this.isChangeAppliedOnElForCampaign(g, t, c) || (this.currentCombinationXPaths[g] = [C, S[v]]), 1 === t.version && 1 === parseInt(S[v], 10)) {
                            n.trigger(l.ELEMENT_LOADED, {
                                oldArgs: [t.id, C, S[v], g]
                            }), this.markChangeAppliedOnElForCampaign(g, t, c), this.unhideElementPerVariationEntry(g, t, O && O[v], {
                                combination: e,
                                shouldNotUnhide: d
                            });
                            continue
                        }
                        y[C].variations[S[v]].length > 0 && (_ = y[C].variations[S[v]][0].tag, w = window.VWO._.allSettings.tags[_].fn || T)
                    }
                    const f = w ? w.toString() : "";
                    if (O && O[v].t && 0 === i.length) {
                        const i = [Object.assign(Object.assign({}, O[v]), {
                            entryIndex: v
                        })];
                        ln(Object.assign(Object.assign({}, O[v]), {
                            campId: t.id
                        }), function() {
                            this.applyChanges(e, t, n, o, i)
                        }.bind(this));
                        continue
                    }
                    if ("head" === g.toLowerCase()) {
                        if (A[C].loaded = A[C].loaded || {}, !0 === A[C].loaded[c]) continue;
                        n.trigger(l.ELEMENT_LOADED, {
                            oldArgs: [t.id, C, S[v], g]
                        }), n.trigger(l.ELEMENT_CHANGES_APPLIED, {
                            oldArgs: [t.id, C, "VISUAL" === I ? S[v] : e, g, f]
                        }), ao(n, l.MODIFIED_ELEMENT, {
                            id: t.id,
                            section_id: C,
                            combination: "VISUAL" === I ? S[v] : e,
                            path: g,
                            content: w
                        })
                    }
                    m = vwo_$(g);
                    const b = this;
                    if (m && m.length) {
                        if (h = m.filter((function(e, n) {
                                return !b.isChangeAppliedOnElForCampaign(n, t, c)
                            })), h.length || "head" !== g.toLocaleLowerCase() || A[C].loaded[c] || (h = m), 0 < h.length) {
                            "head" === g.toLowerCase() && (A[C].loaded[c] = !0), "VISUAL" === I ? n.trigger(l.ELEMENT_LOADED, {
                                oldArgs: [t.id, C, S[v], g]
                            }) : n.trigger(l.ELEMENT_LOADED, {
                                oldArgs: [t.id, "1", e, g]
                            }), delete this.currentCombinationXPaths[g];
                            const o = [];
                            let i;
                            const r = function(e, t) {
                                o.push({
                                    path: t,
                                    changes: String(e).split(" ")
                                })
                            };
                            let s; - 1 !== f.indexOf("_vwo_api_section_callback") && (i = [], h.each((function() {
                                i.push(vwo_$(this).clone())
                            }))), window.VWO_SECTION_ID = C, Le((n => {
                                D((() => vo({
                                    campaignId: t.id,
                                    combination: e,
                                    errorObject: n,
                                    tagName: _
                                })))
                            }));
                            let {
                                nonce: u = ""
                            } = window.VWO;
                            u && (u = `nonce=${u}`);
                            try {
                                s = w && w(r, u, {
                                    id: t.id
                                })
                            } catch (e) {
                                window.VWO._.vAEH(e)
                            }
                            window.VWO._.phoenixMT.trigger(l.CAMPAIGN_TAG_EXECUTED, {
                                rtag: p,
                                id: t.id
                            }), void 0 !== i && vwo_$(i).each((function() {
                                N[C] && "function" == typeof N[C] && N[C](vwo_$(g), this)
                            })), this.unhideElementPerVariationEntry(g, t, O && O[v], {
                                combination: e,
                                shouldNotUnhide: d
                            }), this.markChangeAppliedOnElForCampaign(g, t, c, s, C), null === (a = window.VWO._.phoenixMT) || void 0 === a || a.trigger(l.INIT_VWO_INTERNALS, {
                                elementSelector: g,
                                campaignId: t.id
                            });
                            const m = {
                                id: t.id,
                                section: "VISUAL" === I ? C : "1",
                                combination: "VISUAL" === I ? S[v] : e,
                                path: g,
                                content: w,
                                debugLog: o
                            };
                            "head" !== g.toLowerCase() && n.trigger(l.ELEMENT_CHANGES_APPLIED, {
                                oldArgs: [m.id, m.section, m.combination, g, f, o]
                            }), ao(n, l.MODIFIED_ELEMENT, {
                                name: l.MODIFIED_ELEMENT,
                                time: +new Date,
                                props: m
                            }), ao(n, l.ELEMENT_CHANGES_APPLIED, {
                                name: l.ELEMENT_CHANGES_APPLIED,
                                time: +new Date,
                                props: {
                                    id: t.id,
                                    section: "1",
                                    combination: e,
                                    path: g
                                }
                            }), t[E] = 1
                        } else this.unhideElementPerVariationEntry(g, t, O && O[v], {
                            combination: e,
                            shouldNotUnhide: d
                        });
                        O && O[v].frEvt && cn(O[v].tag)
                    } else this.unhideElementPerVariationEntry(g, t, O && O[v], {
                        combination: e,
                        shouldNotUnhide: d
                    });
                    null != (o = window.VWO._[`keepElementLoadedRunning_${t.id}`] || o) && u._.coreLib.finished && this.shouldCancelInterval(o, t.id, t) && Gi.clearTimeouts(t)
                }
            } catch (o) {
                n.trigger(l.ELEMENT_LOAD_ERROR, {
                    oldArgs: [t.id, e, o]
                }), d.error(o)
            }
            window.vwo_$ = V, delete window.VWO_SECTION_ID
        }
        processRedirect({
            getters: e,
            campaignData: t,
            redirectURL: n,
            isNewVisitor: o
        }) {
            window.VWO._.triggerEvent(l.REDIRECT_DECISION, !0, t.id);
            let i, r, s, a, d, c, u, w, _ = !1;
            const p = e.location;
            if (_ = t.urlRegex ? xi.matchRegex($i.getCleanedUrl(e.currentUrl, !0), t.urlRegex, !0) : xi.matchWildcard($i.getCleanedUrl(e.currentUrl, !0), t.url_pattern, !0), _ && 1 !== _.length) {
                for (a = "", u = n.split("*"), i = 1, r = u.length; i < r; i++) {
                    if (t.urlRegex && _[i] && (so.isQueryParamPresent(_[i]) || so.isHashPresent(_[i]))) {
                        const e = t.sections[1].variations[1];
                        so.isQueryParamPresent(e) || so.isHashPresent(e) ? so.isHashPresent(e) && !so.isQueryParamPresent(e) ? _[i] = _[i].replace(/^(.*?)(?:\?[^#]*)(#?.*)$/, "$1$2") : !so.isHashPresent(e) && so.isQueryParamPresent(e) && (_[i] = _[i].replace(/#.*/, "")) : _[i] = _[i].replace(/[\?#].*/, "")
                    }
                    a += u[i - 1] + (_[i] || "")
                }
                a += u[u.length - 1]
            } else a = n;
            if (a = a.replace(/\*/g, ""), p.search)
                if (so.isQueryParamPresent(a, !0))
                    for (c = so.getUrlVars(p.search), d = so.getUrlVars(a), w = Ne(c), r = w.length; r--;) s = w[r], void 0 === d[s] && (a += "&" + s + "=" + c[s]);
                else so.isHashPresent(a) ? a = a.replace(/(.*?)#(.*)/, "$1" + p.search + "#$2") : a += p.search;
            if (p.hash && -1 === a.indexOf("#") && (a += p.hash), window.fetcher.getValue('phoenix.trigger("${{1}}","${{2}}")', null, {
                    captureGroups: [l.BEFORE_REDIRECT_TO_URL, {
                        oldArgs: [t.id, a]
                    }]
                }), e.flags.cookieLessModeEnabled) {
                if (!e.vwoInternalProperties.jar) throw new Error("Cookie less feature is enabled but CookieJar is not created");
                const t = e.storages.storages.cookies.getStoredJarValue(!0);
                if (!(a.indexOf("_vwo_store=") > -1)) throw new Error("CooKie Less feature is enabled but _vwo_store= do not exists in URL's query Param"); {
                    let e = a.match(/.*_vwo_store=([^&]*)/);
                    e = e ? e[1] : "", a = a.replace(`_vwo_store=${e}`, `_vwo_store=${t}`)
                }
            }
            const g = e => {
                try {
                    const n = Ye(t.id);
                    let o = !1;
                    if (o = new URL(e).origin === p.origin, n && o) return history.replaceState(null, null, e), void yn.removeCampaignLevelStyleTag(t.id)
                } catch (e) {}
                p.replace(e)
            };
            if (window.VWO._.willRedirectionOccur = !1, window._vis_debug || !o || window._vwo_exp[t.id].vSCallSent) yn.saveVSDataInStorageForSplit(t.id, window._vwo_exp[t.id].combination_chosen, a), window.sessionStorage.setItem(y.SPLIT_REDIRECT, a), g(a);
            else {
                const e = window.VWO._.phoenixMT.on(`vwo_vSCallSent_${t.id}`, (({
                    id: t,
                    comb: n
                }) => {
                    window.VWO._.phoenixMT.off(e), yn.saveVSDataInStorageForSplit(t, n, a), window.sessionStorage.setItem(y.SPLIT_REDIRECT, a), g(a)
                }))
            }
        }
        shouldCancelInterval(e, t, n) {
            return !e || 0 == e || 1 !== e && !0 !== e && (2 === e ? !t || (!yn.isDomDependent(n.type) || !!n[E]) : 3 !== e && void 0)
        }
        otherSide(...e) {
            e[0] = "tags.runTestCampaign.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    const Bi = new ji;
    window.VWO.modules.tags.runTestCampaign = window.VWO.modules.tags.runTestCampaign || {}, window.VWO.modules.tags.runTestCampaign.utils = Bi;
    const Hi = {
            SURVEY_INIT: "s.init",
            SURVEY_SHOWN: "s.shn",
            SURVEY_READY: "s._ready",
            SURVEY_COMPLETED: "s.cmtd",
            SURVEY_ATTEMPTED: "s.atd",
            SURVEY_CLOSED: "s.cld",
            SURVEY_MINIMIZED: "s.mnmz"
        },
        Ki = {
            TRACK_SESSION_CREATED: "tSC",
            RETRACK_VISITOR: "rV",
            NEW_SESSION_CREATED: "nSC'",
            TOP_INITIALIZE_BEGIN: "tIB",
            TOP_INITIALIZE_ERROR: "tIE",
            TOP_INITIALIZE_END: "tIEn",
            UNHIDE_ALL_VARIATIONS: "uAV",
            UNHIDE_VARIATION: "uV",
            UNHIDE_SECTION: "uS",
            EXCLUDE_URL: "eURL",
            BEFORE_REDIRECT_TO_URL: "bRTR",
            URL_CHANGED: "uC",
            NOT_REDIRECTING: "nR",
            REGISTER_HIT: "rH",
            UPDATE_SETTINGS_CALL: "uSC",
            REGISTER_CONVERSION: "rC",
            CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT: "cAVGFE",
            CONVERT_REVENUE_GOALS_FOR_EXPERIMENT: "cRGFE",
            HIDE_ELEMENTS: "hE",
            POST_URL_CHANGE: "hC",
            AFTER_SAMPLING_TRIGGER: "sT",
            ELEMENT_LOAD_ERROR: "eLTTE",
            ELEMENT_LOAD_TIMER_STOP: "eLTSt",
            CHOOSE_COMBINATION: "cC",
            BOTTOM_INITIALIZE_BEGIN: "bIB",
            BOTTOM_INITIALIZE_END: "bIE",
            ELEMENT_LOADED: "eL",
            ELEMENT_NOT_LOADED: "eNL",
            SPLIT_URL: "sURL",
            MATCH_WILDCARD: "mW",
            DELETE_CSS_RULE: "dCSSR",
            HEATMAP_CLICK: "hCl",
            CONVERT_GOAL_FOR_ALL_EXPERIMENTS: "cGFAE",
            TEST_NOT_RUNNING: "tNR",
            EXCLUDE_GOAL_URL: "eGURL",
            VARIATION_SHOWN: "vS",
            VARIATION_SHOWN_SENT: "vSS",
            RECORDING_NOT_ELIGIBLE: "rNE",
            VARIATION_APPLIED: "vA",
            VARIATION_APPLIED_ERROR: "vAE",
            NEW_SURVEY_FOUND: "nSF",
            SURVEY_INIT: "s.init",
            SURVEY_READY: "s._ready",
            SURVEY_ATTEMPTED: "s.atd",
            SURVEY_SHOWN: "s.shn",
            SURVEY_COMPLETED: "s.cmtd",
            SURVEY_CLOSED: "s.cld",
            SURVEY_MINIMIZED: "s.mnmz",
            ELEMENT_CHANGES_APPLIED: "eCA",
            SEGMENTATION_EVALUATED: "sE",
            ELEMENTS_SHOWN_WITHOUT_CHANGES: "eSWC",
            ON_SURVEY_SHOWN: "oSS",
            ON_SURVEY_COMPLETED: "oSC",
            ON_SURVEY_ANSWER_SUBMITTED: "oSASUB",
            OPT_OUT: "oO",
            TRACK_NEW_SESSION_CREATED: "tnSC",
            ACTIVATE_API_TRIGGERED: "aAT",
            COOKIE_CONSENT_DENIED: "cCD",
            COOKIE_CONSENT_ACCEPTED: "cCA",
            COOKIE_CONSENT_REJECTED: "cCR",
            COOKIE_CONSENT_TIMEOUT: "cCT",
            DOM_CLICK: "vwo_dom_click",
            ERROR_ONPAGE: "vwo_errorOnPage",
            CURSOR_THRASHED: "vwo_cursorThrashed",
            PAGE_REFRESHED: "vwo_pageRefreshed",
            QUICK_BACK: "vwo_quickBack",
            COPY: "vwo_copy",
            SELECTION: "vwo_selection",
            TAB_IN: "vwo_tabIn",
            TAB_OUT: "vwo_tabOut",
            REPEATED_SCROLLED: "vwo_repeatedScrolled",
            REPEATED_HOVERED: "vwo_repeatedHovered",
            LEAVE_INTENT: "vwo_leaveIntent",
            DOM_SUBMIT: "vwo_dom_submit",
            PAGE_UNLOAD: "vwo_pageUnload"
        },
        Ji = {
            [l.VARIATION_SHOWN]: "VARIATION_SHOWN",
            [l.SPLIT_VARIATION_SHOWN]: "VARIATION_SHOWN",
            [l.VARIATION_APPLIED]: "VARIATION_APPLIED",
            [l.VARIATION_APPLIED_ERROR]: "VARIATION_APPLIED_ERROR",
            [l.ELEMENT_CHANGES_APPLIED]: "ELEMENT_CHANGES_APPLIED",
            [l.REGISTER_CONVERSION]: "REGISTER_CONVERSION",
            [l.VWO_EXECUTED]: "VWO_EXECUTED",
            [l.VARIATION_SHOWN_SENT]: "VARIATION_SHOWN_SENT",
            [l.ACTIVATE_API_TRIGGERED]: "ACTIVATE_API_TRIGGERED",
            [l.COOKIE_CONSENT_REJECTED]: "COOKIE_CONSENT_REJECTED",
            [l.COOKIE_CONSENT_ACCEPTED]: "COOKIE_CONSENT_ACCEPTED",
            [l.COOKIE_CONSENT_TIMEOUT]: "COOKIE_CONSENT_TIMEOUT",
            sE: "SEGMENTATION_EVALUATED",
            eSWC: "ELEMENTS_SHOWN_WITHOUT_CHANGES",
            tNR: "TEST_NOT_RUNNING",
            hC: "POST_URL_CHANGE",
            sT: "AFTER_SAMPLING_TRIGGER",
            nSC: "NEW_SESSION_CREATED",
            cFS: "TOP_INITIALIZE_BEGIN",
            cGFAE: "CONVERT_GOAL_FOR_ALL_EXPERIMENTS",
            hCl: "HEATMAP_CLICK",
            eGURL: "EXCLUDE_GOAL_URL",
            cAVGFE: "CONVERT_ALL_VISIT_GOALS_FOR_EXPERIMENT",
            cFE: "TOP_INITIALIZE_END",
            uAV: "UNHIDE_ALL_VARIATIONS",
            uS: "UNHIDE_SECTION",
            shouldExecLib: "TOP_INITIALIZE_ERROR",
            eURL: "EXCLUDE_URL",
            cRGFE: "CONVERT_REVENUE_GOALS_FOR_EXPERIMENT",
            bRTR: "BEFORE_REDIRECT_TO_URL",
            uC: "URL_CHANGED",
            hE: "HIDE_ELEMENTS",
            eLTTE: "ELEMENT_LOAD_ERROR",
            eLTSt: "ELEMENT_LOAD_TIMER_STOP",
            cC: "CHOOSE_COMBINATION",
            sAC: "BOTTOM_INITIALIZE_BEGIN",
            uSC: "UPDATE_SETTINGS_CALL",
            eAC: "BOTTOM_INITIALIZE_END",
            eL: "ELEMENT_LOADED",
            eNL: "ELEMENT_NOT_LOADED",
            registerHit: "REGISTER_HIT",
            mW: "MATCH_WILDCARD",
            dCSSR: "DELETE_CSS_RULE",
            sURL: "SPLIT_URL",
            nSF: "NEW_SURVEY_FOUND",
            oSS: "ON_SURVEY_SHOWN",
            oSC: "ON_SURVEY_COMPLETED",
            oSASUB: "ON_SURVEY_ANSWER_SUBMITTED",
            oO: "OPT_OUT",
            [l.RETRACK_VISITOR]: "RETRACK_VISITOR",
            [Hi.SURVEY_INIT]: "SURVEY_INIT",
            [Hi.SURVEY_READY]: "SURVEY_READY",
            [Hi.SURVEY_ATTEMPTED]: "SURVEY_ATTEMPTED",
            [Hi.SURVEY_SHOWN]: "SURVEY_SHOWN",
            [Hi.SURVEY_COMPLETED]: "SURVEY_COMPLETED",
            [Hi.SURVEY_CLOSED]: "SURVEY_CLOSED",
            [Hi.SURVEY_MINIMIZED]: "SURVEY_MINIMIZED"
        },
        qi = {
            [l.VARIATION_SHOWN]: function(e) {
                return [e.id + "", e.variation]
            }
        };
    class Yi extends hi {
        constructor() {
            super(), this.isNotRedirectingEventFired = !1, this.vwoEvents = {
                trigger: function(e, t) {
                    return c(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            }, window.VWO._.phoenixMT.on(l.VARIATION_SHOWN_SENT, (e => {
                const t = window.VWO._.native.JSON.parse(localStorage.getItem(I.VS_DATA));
                t && delete t[e] && (Object.keys(t).length > 0 ? localStorage.setItem(I.VS_DATA, window.VWO._.native.JSON.stringify(t)) : localStorage.removeItem(I.VS_DATA))
            }))
        }
        execute() {
            var e, t;
            window._vis_opt_goal_conversion = function(e) {
                var t, n;
                (null === (t = window._vwoCc) || void 0 === t ? void 0 : t.delayCustomGoal) ? (null === (n = window.VWO._.phoenixMT.getEventHistory("vwo_campaignsLoaded")) || void 0 === n ? void 0 : n.length) > 0 ? ao(null, l.CUSTOM_CONVERSION, {
                    gId: e,
                    ["gId_" + e]: 1
                }) : window.VWO._.phoenixMT.on("vwo_campaignsLoaded", (() => {
                    ao(null, l.CUSTOM_CONVERSION, {
                        gId: e,
                        ["gId_" + e]: 1
                    })
                })): ao(null, l.CUSTOM_CONVERSION, {
                    gId: e,
                    ["gId_" + e]: 1
                })
            }, window._vis_opt_register_conversion = function(e, t) {
                var n, o;
                (null === (n = window._vwoCc) || void 0 === n ? void 0 : n.delayCustomGoal) ? (null === (o = window.VWO._.phoenixMT.getEventHistory("vwo_campaignsLoaded")) || void 0 === o ? void 0 : o.length) > 0 ? ao(null, l.CUSTOM_CONVERSION, {
                    cId: t,
                    gId: e,
                    ["gId_" + e]: 1
                }) : window.VWO._.phoenixMT.on("vwo_campaignsLoaded", (() => {
                    ao(null, l.CUSTOM_CONVERSION, {
                        cId: t,
                        gId: e,
                        ["gId_" + e]: 1
                    })
                })): ao(null, l.CUSTOM_CONVERSION, {
                    cId: t,
                    gId: e,
                    ["gId_" + e]: 1
                })
            }, window._vis_opt_revenue_conversion = function(e) {
                var t, n;
                (null === (t = window._vwoCc) || void 0 === t ? void 0 : t.delayCustomGoal) ? (null === (n = window.VWO._.phoenixMT.getEventHistory("vwo_campaignsLoaded")) || void 0 === n ? void 0 : n.length) > 0 ? ao(null, l.REVENUE_CONVERSION, {
                    revenue: e
                }) : window.VWO._.phoenixMT.on("vwo_campaignsLoaded", (() => {
                    ao(null, l.REVENUE_CONVERSION, {
                        revenue: e
                    })
                })): ao(null, l.REVENUE_CONVERSION, {
                    revenue: e
                })
            }, window.VWO.track = window.VWO.track || {}, window.VWO.track.goalConversion = function(e) {
                return c(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.customGoalConversion", [e, !0])
                }))
            }, window.VWO.track.revenueConversion = function(e) {
                return c(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.customRevenueConversion", [e, !0])
                }))
            }, window.VWO.track.delayedGoalConversion = function(e) {
                return c(this, void 0, void 0, (function*() {
                    yield window.fetcher.getValue("VWO.modules.tags.backwardCompatibilityUtils.delayedGoalConversion", [e])
                }))
            }, window._vis_opt_createCookie = function(e, t, n, o) {
                yn.createCookieMT(e, t, n, window._vwo_exp[o])
            }, null === (t = null === (e = window.VWO_d) || void 0 === e ? void 0 : e.resetPreviewData) || void 0 === t || t.call(e), window._vis_opt_readCookie = gt.get, window._vis_opt_element_loaded = Bi.tryApplyingChanges
        }
        checkIfNotRedirecting(e) {
            this.isNotRedirectingEventFired || e.name !== l.PAGE_VIEW || this.isNotRedirectingEventFired || (this.isNotRedirectingEventFired = !0, ye.apply(ye, [Ki.NOT_REDIRECTING]))
        }
        wildCardCallback(e, t) {
            this.checkIfNotRedirecting(e);
            const n = Ji[t];
            if (n && l.VARIATION_APPLIED !== t) {
                const o = Ki[n];
                let i, r = null == e ? void 0 : e.oldArgs;
                if (r ? i = !0 : r = [], !i && qi[t] && (r = qi[t](e.props)), t !== l.VARIATION_SHOWN || e.props.isFirst || e.props.isSplitVariation ? t === l.ELEMENT_CHANGES_APPLIED ? i && ye.apply(ye, [o, ...r]) : t !== l.VARIATION_SHOWN && (t == l.CAMPAIGN_FLOW_START && window._vwo_code && (window._vwo_code.libExecuted = 1, window.fetcher.setValue("_vwo_code.libExecuted", 1)), ye.apply(ye, [o, ...r]), t == l.CAMPAIGN_FLOW_START && window.VWO.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [l.TIB_DONE]
                    })) : ye.apply(ye, [o, ...r]), t === l.VARIATION_SHOWN && !e.props.isFirst && !e.props.isSplitVariation || t === l.SPLIT_VARIATION_SHOWN || t == l.REGISTER_HIT) {
                    const e = Ji[l.VARIATION_APPLIED],
                        t = Ki[e];
                    ye.apply(ye, [t, ...r]), this.vwoEvents.trigger(l.VARIATION_APPLIED, {
                        oldArgs: r,
                        campaignId: parseInt(r[0], m),
                        combi: r[1].includes(",") ? r[1] : parseInt(r[1], m)
                    })
                }
            }
        }
    }
    const Xi = new Yi,
        zi = Xi.execute.bind(Xi),
        Qi = Xi.wildCardCallback.bind(Xi);
    window.VWO.modules.tags.backwardCompatibility = zi, window.VWO.modules.tags.wildCardCallback = Qi;
    class Zi {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.backwardCompatibilityUtils." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    class er {
        setItem(e, t) {
            e = this.getKeyBasedOnMode(e), Ct.set(e, window.VWO._.native.JSON.stringify(t))
        }
        getItem(e) {
            return e = this.getKeyBasedOnMode(e), Ct.get(e)
        }
        removeItem(e) {
            e = this.getKeyBasedOnMode(e), Ct.remove(e)
        }
        getKeyBasedOnMode(e) {
            if (!window._vis_debug && !Vt()) return e;
            return "debug" + e + "_" + Object.keys(window._vwo_exp || {}).join("_")
        }
    }
    let tr = new er,
        nr;

    function or(e) {
        return c(this, void 0, void 0, (function*() {
            yield j.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, "vwoInternalProperties"]
            })
        }))
    }
    class ir {
        constructor() {
            this.apiCallbacks = {}
        }
        register(e, t) {
            this.apiCallbacks[e] = this.apiCallbacks[e] || [], this.apiCallbacks[e].push(t)
        }
        executeAll(e, t) {
            this.apiCallbacks[e] && this.apiCallbacks[e].forEach((e => {
                e(t)
            }))
        }
    }
    const rr = new ir;
    let sr = !1;
    class ar extends Zi {
        postPhoenixMTHook() {
            this.makeSessionAndTagCall()
        }
        declareVWOAPI() {
            j.applyChanges = function(e) {
                return c(this, void 0, void 0, (function*() {
                    const t = [],
                        n = (yield j.phoenix("store.getters")).currentSettings.dataStore.campaigns;
                    for (const e in n) t.push(e);
                    e = e || t;
                    for (var o = 0; o < e.length; o++) {
                        const t = e[o],
                            i = yn.isBotScreen();
                        yield window.fetcher.getValue('VWO.modules.events.events.variationShown("${{1}}", "${{2}}", "${{3}}")', null, {
                            captureGroups: [null, Object.assign({
                                id: t,
                                variation: "",
                                isFirst: 0
                            }, i && {
                                vwoMeta: {
                                    isBot: i
                                }
                            }), n[t]]
                        })
                    }
                }))
            }, j.activate = function(e, t, n, o) {
                var i;
                return c(this, void 0, void 0, (function*() {
                    if ((Vt() || window._vis_debug) && window.VWO._.blockedState) return;
                    window.VWO.phoenix('trigger("${{1}}")', null, {
                        captureGroups: [l.ACTIVATE_API_TRIGGERED]
                    });
                    var n, r = {};
                    "object" == typeof e && (e = (r = e).keepElementLoadedRunning, t = r.expIds, r.manual, o = r.customUrl, n = r.virtualPageUrl);
                    const s = D((() => window._vwoCc.activateApiOnce)) || window._vwo_acc_id > 81e4,
                        a = D((() => window._vwoCc.skipActivateOnSameUrl));
                    if (!(o && o === window._vis_opt_url && s || n && window.location.href === n && a))
                        if (o && (window._vis_opt_url = o, window.fetcher.setValue("_vis_opt_url", window._vis_opt_url)), t = t || window._vwo_exp_ids, "string" == typeof n && n.trim()) window._vis_opt_url = n, D((() => window._vwoCc.enableSpaVisibility)) && window.VWO._.phoenixMT.trigger(l.SPA_VISIBILITY_SERVICE), yn.fireUrlChangeWildCardEvent(), yield window.fetcher.getValue('phoenix.trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: ["vwo_urlChange", {
                                virtualPageUrl: n,
                                location: {
                                    href: window.location.href,
                                    search: window.location.search,
                                    hash: window.location.hash
                                }
                            }]
                        });
                        else if (t && t.length) {
                        for (const n of t) {
                            const t = window._vwo_exp[n];
                            if (t) {
                                if (yn.isSessionBasedCampaign2(t) && (null === (i = window.VWO._.track) || void 0 === i ? void 0 : i.isUserBucketed())) {
                                    ao(null, l._ACTIVATED, {
                                        id: n
                                    });
                                    continue
                                }(null == t ? void 0 : t.manual) && (window.VWO._[`keepElementLoadedRunning_${n}`] = e, or({
                                    [`keepElementLoadedRunning_${n}`]: e
                                }), ao(null, l.ACTIVATED, {
                                    id: n
                                }))
                            }
                        }
                        o && (yield window.fetcher.getValue("VWO.modules.tags.activate"))
                    }
                }))
            }, j.revertChanges = function(e) {
                return c(this, void 0, void 0, (function*() {
                    const t = (yield j.phoenix("store.getters")).currentSettings.dataStore.campaigns[e];
                    if (t && t.sections)
                        for (var n = Y(t.sections), o = 0; o < n.length; o++) vwo_$(".vwo_loaded.vwo_loaded_" + e + "._vwo_variation_" + n[o]).remove(), delete t.sections[n[o]].loaded, yield window.fetcher.setValue(`VWO._.allSettings.dataStore.campaigns.${e}.sections.${n[o]}.loaded`, void 0)
                }))
            }, j.modifyClickPauseTime = function(e) {
                e = e || {
                    time: 0,
                    useBeacon: !1
                }, j._.redirectionDelayTime = e.time, e.useBeacon && (j.data.tB = !0)
            }, j.destroy = function() {
                return c(this, void 0, void 0, (function*() {
                    yield j.phoenix("destroy()"), fi.clearAllListeners()
                }))
            }, j.setFetchSettingsDelay = function(e) {
                or({
                    SPA_SETTINGS_DELAY: e
                })
            }, j.disableAutofetchSettings = function() {
                or({
                    disableAutofetchSettings: !0
                })
            };
            const e = (e, t) => {
                var n = vwo_$(e),
                    o = Array.from(n[0].classList);
                for (let e = 0; e < o.length; e++)
                    if (o[e].indexOf(t) > -1) return n.removeClass(o[e]), !0;
                return !1
            };
            j.refreshElements = function(t, n) {
                var o;
                return c(this, void 0, void 0, (function*() {
                    if (!t) return;
                    t instanceof Array || (t = [t]);
                    const i = yield j.phoenix("store.getters"), r = [];
                    for (const e in i.currentSettings.dataStore.campaigns) r.push(e);
                    n = n || r;
                    for (var s = vwo_$(t.join(",")), a = 0; a < n.length; a++) {
                        var d = "vwo_loaded_" + n[a];
                        s.each((function(t, n) {
                            if (!e(n, d)) {
                                const t = Array.from(vwo_$(n).parents());
                                for (let n = 0; n < t.length && !e(t[n], d); n++);
                            }
                        }))
                    }
                    for (const e of n) {
                        const t = null === (o = i.currentSettings.dataStore.campaigns) || void 0 === o ? void 0 : o[e];
                        if (t && t.ready) {
                            const n = yn.isBotScreen();
                            yield window.fetcher.getValue('VWO.modules.events.events.variationShown("${{1}}", "${{2}}", "${{3}}")', null, {
                                captureGroups: [null, Object.assign({
                                    id: e,
                                    variation: "",
                                    isFirst: 0
                                }, n && {
                                    vwoMeta: {
                                        isBot: n
                                    }
                                }), t]
                            })
                        }
                    }
                }))
            }, j.fetchPCSettings = function() {
                nr || (nr = !0, or({
                    loadPC: !0
                }))
            }, j.enableSPA = function(e) {
                or(void 0 === e || e ? {
                    isSpaEnabled: !0
                } : {
                    isSpaEnabled: e
                })
            }, j.updateSPAWaitTime = function(e) {
                or({
                    SPA_ELEMENT_WAIT_TIMEOUT: e
                })
            }, j.onEventTriggered = function(e) {
                rr.register("onEventTriggered", e), sr || (sr = !0, window.VWO.phoenix('on("${{1}}", "${{2}}")', null, {
                    captureGroups: ["*", e => {
                        if (e.isCustomEvent) {
                            const t = {
                                event: e.name
                            };
                            e.$metaData && (t.metaData = e.$metaData, delete e.$metaData), delete e.page, delete e.isCustomEvent, delete e.name, Object.keys(e).length > 0 && (t.props = e), rr.executeAll("onEventTriggered", t)
                        }
                    }]
                }))
            }, j.onVWOCampaignsLoaded = function(e, t) {
                "object" == typeof t && +t.count > 0 && Object.assign(e, t), window.VWO._.bucketedCampaignsAPIStore = window.VWO._.bucketedCampaignsAPIStore || {}, window.VWO._.bucketedCampaignsAPIStore.callbacks = window.VWO._.bucketedCampaignsAPIStore.callbacks || [], window.VWO._.bucketedCampaignsAPIStore.campaigns && (e({
                    bucketed_campaigns: window.VWO._.bucketedCampaignsAPIStore.campaigns
                }), D((() => "number" == typeof e.count)) && --e.count), window.VWO._.bucketedCampaignsAPIStore.callbacks.push(e)
            };
            const t = {
                state: !1,
                decisionState: null,
                cb: []
            };
            window.VWO._.phoenixMT.on("vwoRedirectDecision", (e => {
                t.state || (t.state = !0, t.decisionState = e, t.cb.forEach((t => t(e))))
            })), window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                t.state = !1, t.decisionState = null
            })), j.onSplitRedirectionDecided = e => {
                t.state && e(t.decisionState), t.cb.push(e)
            }, j.deactivate = function(e) {
                return c(this, void 0, void 0, (function*() {
                    const t = yield j.phoenix("store.getters");
                    for (const n of e) t.settings.campaigns[n].dontKillTimer = !1, yield window.fetcher.setValue(`VWO._.allSettings.dataStore.campaigns.${n}.dontKillTimer`, !1)
                }))
            }, j.getVisitorProps = function(e, t = "") {
                return D((() => window.VWO.attributesData[e])) || D((() => window.VWO._.native.JSON.parse(tr.getItem("_vwo_visProps"))[e]), null, t)
            }
        }
        makeSessionAndTagCall() {
            window.VWO._.phoenixMT.on(l.NEW_SESSION_CREATED, (e => {
                let t = {};
                e && e.props && (t = e.props), t.cq = 0, window._vis_debug || Vt() || this.makeCallForTagsAndSession(t, "newSession")
            })), window.VWO._.phoenixMT.on(l.DIMENSION_TAG_PUSHED, (e => {
                const t = e;
                this.makeCallForTagsAndSession(t, "sessionUpdate")
            }))
        }
        makeCallForTagsAndSession(e, t) {
            return c(this, void 0, void 0, (function*() {
                const n = window.VWO._.sessionInfoService;
                void 0 !== j._.insightsOnConsentPromise && (yield j._.insightsOnConsentPromise);
                n.isSessionInfoSynced() || n.setSNCookieValueByIndex2(Jt.SESSION_SYNCED_STATE_INDEX, 1);
                const o = n.getSessionId(),
                    i = n.getPageId(),
                    r = yn.extraData2(!0),
                    s = encodeURIComponent(r),
                    a = yn.createUUIDCookie2({
                        vwoUUID: ft.vwoUUID
                    }),
                    d = "s.gif?account_id=" + ft.accountId + yn.getUUIDString(a) + "&s=" + o + ("newSession" === t ? "&ed=" + s + "&cu=" + encodeURIComponent(ft.currentUrl) + "&r=" + (j.data.vi && "new" === j.data.vi.vt ? 0 : 1) : "") + "&p=" + i + (e.tags ? "&tags=" + e.tags : "") + (e.egTagValue ? "&eg=" + e.egTagValue : "") + (e.funnelTagValue ? "&fIds=" + e.funnelTagValue : "") + ("sessionUpdate" === t ? "&update=1" : "") + (6 == window._vwo_acc_id && e.batch ? "&batch=" + e.batch : "") + (6 == window._vwo_acc_id && e.tags ? "&tagsLength=" + (window.VWO._.native.JSON.parse(e.tags).si && Object.keys(window.VWO._.native.JSON.parse(e.tags).si).length) : "") + (6 == window._vwo_acc_id && e.calledByUnload ? "&isUnload=" + e.calledByUnload : "") + (window._vwo_acc_id, "&cq=") + e.cq + (e.cq ? "&ttl=" + qt() : "");
                try {
                    window.VWO._.native.JSON.parse(decodeURIComponent(s)).lt
                } catch (e) {
                    P({
                        msg: "extraData(ed) is not a JSON string [while sending call for 's.gif']",
                        url: "utilsMT.ts",
                        source: window.VWO._.native.JSON.stringify({
                            extraData: r,
                            lt: (new Date).getTime(),
                            referrer: vt.get(),
                            requestURL: d
                        })
                    })
                }
                Zn.sendCall({
                    serverUrl: ft.serverUrl,
                    accountId: ft.accountId
                }, {
                    url: d
                }, {}, (({
                    isError: e
                }) => {
                    !e && "newSession" == t && C.includes(window._vwo_acc_id) && yn.setOnLocalStorageOnBothThreads("vwo_newSessionCreated", {
                        uuid: a,
                        sessionId: o,
                        sessionCookie: gt.get(Jt.TRACK_SESSION_COOKIE_NAME),
                        cURL: ft.currentUrl
                    })
                }))
            }))
        }
        sendRegisterCall(e, t, n) {
            Zn.sendCall(e, {
                url: t,
                successCallback: n
            }, null, null, !0)
        }
    }
    const dr = new ar;
    window.VWO.modules.tags.backwardCompatibilityUtils = dr;
    class cr {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.setSession." + e[0], window.fetcher.getValue(...e)
        }
    }
    class lr {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.sessionInfoService." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }

    function ur(e, t, n) {
        "Array" === e ? (this.tags = [], this.lastSent = 0) : "Hash" === e && (this.tags = {}, this.sentTags = {}, 6 == window._vwo_acc_id && (this.tags2 = {}, this.sentTags2 = {})), this.type = e, this.maxCount = t || 1 / 0, this.addTagCallback = n || function() {}
    }
    lr.LOCAL_STORAGE_SESSION_EXPIRY = 30, lr.LOCAL_STORAGE_NAME = window._vis_debug ? "debug_vwoSn" : "vwoSn", lr.ACCOUNT_ID = window._vwo_acc_id, ur.prototype.add = function(e, t) {
        if (e) {
            var n = this.tags;
            "Array" === this.type ? ("[object Array]" !== Object.prototype.toString.call(e) && (e = [e]), e = te(e, (function(e) {
                return e = encodeURIComponent(e.trim())
            })), n = ne(n = (n = n.concat(e)).slice(0, this.maxCount), (function(e, t) {
                return n.indexOf(e) === t
            })), this.tags = n) : "Hash" === this.type && (this.sentTags[e] && this.sentTags[e] === encodeURIComponent(t) || (this.tags[encodeURIComponent(e)] = encodeURIComponent(t)), 6 == window._vwo_acc_id && (this.sentTags2[e] && this.sentTags2[e] === encodeURIComponent(t) || (this.tags2[encodeURIComponent(e)] = encodeURIComponent(t)))), this.addTagCallback()
        }
    }, ur.prototype.get = function(e) {
        var t;
        if (this.isTagPassed(e)) return "Array" === this.type ? (t = this.tags.slice(this.lastSent), this.lastSent = this.tags.length) : "Hash" === this.type && (e ? (t = this.tags2, X(this.sentTags2, this.tags2), this.tags2 = {}) : (t = this.tags, X(this.sentTags, this.tags), this.tags = {})), t
    }, ur.prototype.isTagPassed = function(e) {
        if ("Array" === this.type) return this.tags.length > this.lastSent;
        if ("Hash" === this.type) {
            const t = e ? this.tags2 : this.tags;
            return Y(t).length > 0
        }
        return !1
    }, ur.prototype.reset = function() {
        "Array" === this.type ? (this.tags = [], this.lastSent = 0) : "Hash" === this.type && (this.tags = {}, this.sentTags = {}, 6 == window._vwo_acc_id && (this.tags2 = {}, this.sentTags2 = {}))
    }, ur.prototype.refresh = function() {
        "Array" === this.type ? this.lastSent = 0 : "Hash" === this.type && (X(this.tags, this.sentTags), this.sentTags = {}, 6 == window._vwo_acc_id && (X(this.tags2, this.sentTags2), this.sentTags2 = {}))
    };
    const wr = "eg",
        _r = "fIds";
    let pr = {},
        gr, hr = ["u", "s", "p", "ui", "si", "pi"],
        vr = function() {},
        fr = {
            user: "u",
            session: "s",
            page: "p"
        };
    for (gr = 0; gr < hr.length; gr++) pr[hr[gr]] = new ur("Hash");
    pr[wr] = new ur("Array"), pr[_r] = new ur("Array");
    const Or = {
        onPush: function(e) {
            "function" == typeof e && (vr = e)
        },
        getTags: function(e) {
            let t = {},
                n = "";
            for (gr = 0; gr < hr.length; gr++) {
                const n = pr[hr[gr]].get(e);
                n && (t[hr[gr]] = Xt(n))
            }
            for (const e in t) t.hasOwnProperty(e) && (n += '"' + e + '":' + t[e] + ",");
            return n = n && "{" + n.slice(0, -1) + "}", n
        },
        getEgTags: function() {
            const e = pr[wr].get();
            if (e) return e.join()
        },
        getFunnelTags: function() {
            const e = pr[_r].get();
            if (e && e.length) return Xt(e.map((e => Number(e))))
        },
        addTag: function(e, t, n, o) {
            let i = fr[n = n || "session"];
            if (!i)
                if (n === wr) i = wr;
                else {
                    if (n !== _r) return;
                    i = _r
                }
            o && (i += "i"), pr[i].add(e, t), vr()
        },
        refresh: function() {
            pr.s.reset(), pr.si.refresh(), pr[wr].refresh()
        }
    };
    window.VWO.tag = Or.addTag, window.VWO._.tags = Or;
    class Er {
        constructor() {
            this.eventCallbacks = [], this.isInitialized = !1
        }
        onActivity() {
            if (mn.shouldWeTrackVisitor())
                for (let e = 0; e < this.eventCallbacks.length; e++) this.eventCallbacks[e]()
        }
        init() {
            if (this.isInitialized) return;
            const e = wn((() => {
                this.onActivity()
            }), 1e3);
            document.addEventListener ? (document.addEventListener("mouseup", e), 811994 === window._vwo_acc_id && document.addEventListener("pointerdown", e), document.addEventListener("keyup", e), document.addEventListener("mousemove", e), document.addEventListener("scroll", e)) : document.attachEvent && (document.attachEvent("onmouseup", e), 811994 === window._vwo_acc_id && document.attachEvent("onpointerdown", e), document.attachEvent("onkeyup", e), document.attachEvent("onmousemove", e), document.attachEvent("onscroll", e)), this.isInitialized = !0
        }
        track(e) {
            this.eventCallbacks.push(e), this.init()
        }
        clearCallbacks() {
            this.eventCallbacks = []
        }
    }
    const mr = new Er;

    function Sr() {
        Ct.remove(lr.LOCAL_STORAGE_NAME)
    }
    let Tr;
    window.VWO._.tua = mr;
    class Cr extends lr {
        constructor() {
            super(), this.imidiateUpdate = !0, this.firstSessionCreated = !1, this.vwoSn = {
                cu: "",
                r: "",
                lt: 0,
                v: "0.1.0"
            }, Tr = this, this.expireSessionOnDateChange(), this.visitorInformation = window.VWO.data.vi = window.VWO.data.vi || {}, this.setVWOSn(), this.getSessionStore() && this.initialize(), mr.track((() => {
                this.updateLocalStorageSession()
            }))
        }
        triggerNewSessionEvent() {
            window.VWO.phoenix('trigger("${{1}}")', null, {
                captureGroups: [l.NEW_SESSION_CREATED]
            }), window.VWO._.phoenixMT.trigger(l.NEW_SESSION_CREATED)
        }
        expireSessionOnDateChange() {
            if (!this.getSessionStore()) return;
            const e = this.getSessionId();
            if (e) {
                const t = new Date(1e3 * e).getDate();
                new Date(ie()).getDate() !== t && this.eraseSessionCookie()
            }
        }
        initializeSession2(e) {
            const t = !this.getSessionStore();
            this.setSessionStore(e + ""), this.setVisitorInformation(), this.updateAndSyncPageId(), this.initialize(t)
        }
        getDSCookieValueByIndex(e) {
            var t = this.getGlobalCookie();
            return t ? t.split("$")[e] : null
        }
        initialize(e) {
            this.isInitiatedOnce || (this.isInitiatedOnce = !0, this.attachTagsPushCallback() || (null != e ? !e : this.getSessionStore()) || this.triggerNewSessionEvent(), mr.track((() => {
                this.updateSession()
            })), this.addValues({
                sessionStart: this.getSessionId()
            }, "root"), this.fireSessionEvent())
        }
        fireSessionEvent() {
            window.VWO.phoenix('trigger("${{1}}", "${{2}}" )', null, {
                captureGroups: [l.SESSION, {
                    VWO: {
                        firedTime: 1e3 * this.getSessionId()
                    }
                }]
            })
        }
        attachTagsPushCallback() {
            let e, t, n;
            const o = this,
                i = function(i, r, s) {
                    e = Or.getTags(r), n = Or.getFunnelTags(), t = r ? void 0 : Or.getEgTags();
                    const a = yn.doesSessionBasedCampaignExistsInTags(e) || (n ? 1 : 0);
                    if (!window._vis_debug && !Vt() && (e || t || n)) {
                        if (!i && !o.getSessionStore()) {
                            const i = {
                                name: l.NEW_SESSION_CREATED,
                                time: +new Date,
                                props: {
                                    pageId: o.getPageId(),
                                    tags: e,
                                    egTagValue: t,
                                    funnelTagValue: n,
                                    cq: a,
                                    ttl: a && qt()
                                }
                            };
                            return ao(null, l.NEW_SESSION_CREATED, i), window.VWO._.phoenixMT.trigger(l.NEW_SESSION_CREATED, i), !0
                        }
                        r ? window.VWO._.phoenixMT.trigger(l.DIMENSION_TAG_PUSHED, {
                            tags: e,
                            egTagValue: t,
                            funnelTagValue: n,
                            cq: a,
                            ttl: a && qt(),
                            batch: r,
                            calledByUnload: s
                        }) : window.fetcher.getValue("VWO.modules.events.events.dimensionTagPushed", [null, {
                            tags: e,
                            egTagValue: t,
                            funnelTagValue: n,
                            cq: a,
                            ttl: a && qt()
                        }])
                    }
                    return !1
                };
            let r = !1;
            const s = _n(i, D((() => window._vwoCc.sgifDelay)) || 10);
            const a = ae(i, window.VWO._.pushThrottleTime || 1e3);
            return Or.onPush((() => {
                s(!0), 6 == window._vwo_acc_id && a(!0, !0)
            })), 6 == window._vwo_acc_id && (window.VWO._.phoenixMT.on(l.PAGE_EXIT, (e => {
                r || (i(!0, !0, !0), r = !0)
            })), window.VWO.pageExitListener = !0), i()
        }
        updateSession() {
            this.updateSession2()
        }
        updateSession2() {
            let e = this.getSessionStore();
            e && this.expireSessionOnDateChange(), e = this.getSessionStore(), this.sessionTimer || e ? (e && (this.setSessionStore(e), this.addValues({
                sessionStart: this.getSessionId()
            }, "root")), this.updateSessionTimer()) : this.retrackVisitor()
        }
        updateSessionTimer() {
            this.sessionTimer && clearTimeout(this.sessionTimer), this.sessionTimer = setTimeout((() => this.eraseSessionCookie()), Jt.SESSION_TIMER_EXPIRE)
        }
        retrackVisitor() {
            const e = ie(!0) - Tr.getFirstSessionId();
            Or.refresh(), this.setSessionStore(e + ""), this.triggerNewSessionEvent(), window.VWO.phoenix('trigger("${{1}}")', null, {
                captureGroups: [l.RETRACK_VISITOR]
            })
        }
        initializeSession(e) {
            this.initializeSession2(e)
        }
        setVisitorInformation(e) {
            window.VWO.data.vi.vt = Tr.visitorInformation.vt = e || (Tr.isReturningVisitor() ? "ret" : "new"), window.fetcher.setValue("VWO.data.vi.vt", window.VWO.data.vi.vt)
        }
        getPageIdInfo() {
            const e = this.getSessionStore(),
                t = e && e.split(":")[Jt.PAGE_ID_INFORMATION_INDEX];
            return t && t.split("_")
        }
        markPageIdSessionExpiry() {
            const e = this.getPageId() + "_" + (ie(!0) - this.getFirstSessionId() + Jt.PAGE_ID_EXPIRY);
            Tr.markPageId(e)
        }
        getPageId() {
            const e = this.getPageIdInfo(),
                t = e && e[0];
            return t ? parseInt(t, 10) : (this.imidiateUpdate = !1, 1)
        }
        isReturningVisitor() {
            return Tr.getSessionId() > Tr.getFirstSessionId()
        }
        setVWOSn() {
            const e = this.getLocalStorageSession();
            e ? this.vwoSn = e || {} : this.createLocalStorageSession()
        }
        getInfo() {
            return this.vwoSn
        }
        removeInfo() {
            this.vwoSn = {
                cu: "",
                r: "",
                lt: 0,
                v: "0.1.0"
            }
        }
        getRelativeSessionTimestamp() {
            const e = this.getFirstSessionId();
            return this.firstSessionCreated ? ie(!0) - e : (this.firstSessionCreated = !0, oe(!0) - e)
        }
        updateLocalStorageSession() {
            const e = this.getLocalStorageSession();
            !e || (ie(!0) - e.lt) / 60 > lr.LOCAL_STORAGE_SESSION_EXPIRY ? this.createLocalStorageSession() : this.updateTimestampInfo(e)
        }
        updateTimestampInfo(e) {
            this.vwoSn = e, this.vwoSn.lt = ie(!0), this.setLocalStorageSession()
        }
        createLocalStorageSession(e) {
            e ? (this.vwoSn.cu = `${document.URL}#vwo_fix`, this.vwoSn.r = `${document.referrer}#vwo_fix`) : (this.vwoSn.cu = document.URL, this.vwoSn.r = document.referrer), this.vwoSn.lt = ie(!0), this.setLocalStorageSession()
        }
        getLocalStorageSession(e) {
            let t = Ct.get(Cr.LOCAL_STORAGE_NAME);
            try {
                t = t ? Yt(t) : null
            } catch (t) {
                Sr(), this.otherSide('createLocalStorageSession("${{1}}")', null, [!0]), e || this.getLocalStorageSession(!0)
            }
            return t ? t.v ? (t.cu = decodeURIComponent(t.cu), t.r = decodeURIComponent(t.r), t) : (t.v = "0.1.0", t) : null
        }
        addValues(e, t) {
            return window.VWO.phoenix('store.actions.addValues("${{1}}", "${{2}}" )', null, {
                captureGroups: [e, t]
            })
        }
        updateAndSyncPageId() {
            let e;
            e = window.VWO._.pageId, e || (e = this.updatePageId(), this.otherSide('setPageIdValue("${{1}}")', null, [e]))
        }
        updatePageId() {
            let e = this.getPageId();
            return this.shouldUpdatePageCount() && (this.imidiateUpdate ? e += 1 : this.imidiateUpdate = !0), this.markPageId(e), window.VWO._.pageId = e, e
        }
        markPageId(e) {
            this.setSNCookieValueByIndex2(Jt.PAGE_ID_INFORMATION_INDEX, e)
        }
        setSNCookieValueByIndex2(e, t) {
            const n = this.getSessionStore(),
                o = n && n.split(":") || [];
            o[e] = t + "", this.setSessionStore(o.join(":"))
        }
        shouldUpdatePageCount() {
            const e = this.getPageIdInfo(),
                t = parseInt(e && e[1], 10);
            return !t || ie(!0) - Tr.getFirstSessionId() > t
        }
        setSNCookieValueByIndex(e, t) {
            const n = this.getSessionStore(),
                o = n && n.split(":") || [];
            o[e] = t + "", gt.create(Jt.TRACK_SESSION_COOKIE_NAME, o.join(":"), Jt.TRACK_SESSION_COOKIE_EXPIRY)
        }
        getSessionId() {
            return this.getFirstSessionId() + this.getRelativeSessionId()
        }
        setSessionStore(e) {
            if (mn.shouldWeTrackVisitor()) return gt.create(Jt.TRACK_SESSION_COOKIE_NAME, e, Jt.TRACK_SESSION_COOKIE_EXPIRY)
        }
        getRelativeSessionId() {
            let e = this.getSessionStore();
            if (!e) {
                var t = ie(!0) - this.getFirstSessionId();
                this.setSessionStore(t + ""), e = this.getSessionStore()
            }
            return e && +e.split(":")[Jt.RELATIVE_SESSION_ID_INDEX]
        }
        setLocalStorageSession() {
            mn.shouldWeTrackVisitor() && (this.vwoSn.v && (this.vwoSn.cu = encodeURIComponent(this.vwoSn.cu), this.vwoSn.r = encodeURIComponent(this.vwoSn.r)), Ct.set(Cr.LOCAL_STORAGE_NAME, un(this.vwoSn)))
        }
        getSessionStore() {
            return gt.get(Jt.TRACK_SESSION_COOKIE_NAME)
        }
        getGlobalCookie() {
            return gt.get(Jt.TRACK_GLOBAL_COOKIE_NAME)
        }
        eraseSessionCookie() {
            this.sessionTimer = null, gt.erase(Jt.TRACK_SESSION_COOKIE_NAME)
        }
        getPcTrafficFromCookie() {
            var e = fo.getDataStore();
            return e ? parseFloat(e.split(":")[Jt.PC_TRAFFIC_INDEX]) : null
        }
        getFirstSessionId() {
            let e = fo.getDataStore();
            return e || (this.createGlobalCookie(), e = fo.getDataStore()), e && +e.split(":")[Jt.FIRST_SESSION_ID_INDEX]
        }
        getSNCookieValueByIndex(e) {
            var t = this.getSessionStore();
            return t ? t.split(":")[e] : null
        }
        createGlobalCookie() {
            if (!mn.shouldWeTrackVisitor()) return;
            const e = Jt.COOKIE_VERSION + "$" + oe(!0) + ":" + this.getPcTraffic() + "::";
            gt.create(Jt.TRACK_GLOBAL_COOKIE_NAME, e, qt())
        }
        isSessionInfoSynced() {
            return this.getSNCookieValueByIndex(Jt.SESSION_SYNCED_STATE_INDEX)
        }
        getPcTraffic() {
            return void 0 !== this.pcTraffic && null !== this.pcTraffic || (this.pcTraffic = this.getPcTrafficFromCookie(), this.pcTraffic = this.pcTraffic || parseFloat((100 * Math.random()).toFixed(8))), this.pcTraffic
        }
        shouldSendSessionInfoInCall() {
            return !0
        }
    }
    class Ir extends cr {
        constructor() {
            super(), window.VWO._.phoenixMT.on("vwo_phoenixInitCalled", (() => {
                this.execute({
                    vwoUUID: ft.vwoUUID
                })
            })), window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                window.VWO._.pageId = void 0, this.execute({
                    vwoUUID: ft.vwoUUID
                })
            }))
        }
        execute(e) {
            return c(this, void 0, void 0, (function*() {
                let t;
                if (window.VWO.modules.tags.sessionInfoService ? t = window.VWO.modules.tags.sessionInfoService : (t = new Cr, window.VWO.modules.tags.sessionInfoService = t, window.VWO._.sessionInfoService = t), t.getSessionStore()) C.includes(window._vwo_acc_id) && yn.setOnLocalStorageOnBothThreads("vwo_newSessionCreated", {
                    user: "old"
                }, ["user"]), t.fireSessionEvent(), t.setVisitorInformation(), t.updateAndSyncPageId();
                else {
                    C.includes(window._vwo_acc_id) && yn.setOnLocalStorageOnBothThreads("vwo_newSessionCreated", {
                        user: "new"
                    }, ["user"]), yn.createUUIDCookie2(e), t.getGlobalCookie() || t.createGlobalCookie();
                    const n = t.getRelativeSessionTimestamp();
                    t.initializeSession2 && t.initializeSession2(n)
                }
                yn.setVin(e), window.VWO.phoenix('trigger("${{1}}")', null, {
                    captureGroups: [l.SESSION_INIT_COMPLETE]
                })
            }))
        }
    }
    const yr = new Ir,
        Ar = yr.execute.bind(yr);
    window.VWO.modules.tags.setSession = yr;
    class Nr {
        static parseUrl(e) {
            try {
                e = decodeURIComponent(e)
            } catch (e) {
                console.warn("Not a valid URL.")
            }
            const t = /^((((\w+)(:\/\/))?((\w+):(\w+)@)?(www\.)?)([^?#\/:\s]*)?:?([0-9][^?#\/\s]*)?)\/?([^?#\s]*)\??([^#]*)#?(.*)$/.exec(e.trim());
            if (!t) throw new Error("Not a valid URL.");
            return t && {
                url: t[0],
                origin: t[1].replace(t[6], ""),
                protocol: t[4] || "",
                hasWWW: Boolean(t[9]),
                username: t[7] || "",
                password: t[8] || "",
                host: (t[9] || "") + t[10],
                domain: t[10],
                port: t[11] || "",
                path: t[12],
                query: t[13] || "",
                queryParams: t[13] ? t[13].split("&").reduce(((e, t) => {
                    const [n, o = ""] = t.split("=");
                    return e[n] = o, e
                }), {}) : {},
                fragment: t[14] || "",
                urlWithoutProtocol: t[0].replace(t[3], ""),
                urlWithoutProtocolAndWww: t[0].replace(t[2], "")
            }
        }
    }
    var Vr = {
        LOGGER_LEVEL: "error"
    };
    const br = Nr.parseUrl(window.location.href).queryParams.vwoLogLevel;
    var Rr = new a(br || Vr.LOGGER_LEVEL);
    class Lr {
        constructor() {
            this.plugins = {}
        }
        register(e) {
            Rr.debug(`Registering plugin '${e.pluginName}' in Plugins factory`), this.plugins[e.pluginName] = e
        }
        unregister(e) {
            let t;
            t = Fe(e) ? e : e.pluginName, Rr.debug(`Unregistering plugin '${t}' in Plugins factory`), this.plugins[t].removeAll(), delete this.plugins[t]
        }
        unregisterAll() {
            Rr.debug("Unregistering all plugins in Plugins factory"), Object.keys(this.plugins).forEach((e => {
                this.plugins[e].removeAll(), delete this.plugins[e]
            }))
        }
        clearData() {
            Rr.debug("Clearing the data of all the plugins"), Object.keys(this.plugins).forEach((e => {
                this.plugins[e].clearData()
            }))
        }
    }
    var Wr = new Lr,
        Pr;
    class Dr {
        clearData() {}
    }! function(e) {
        e.EVENT = "event", e.EVENT_PROPS = "eventProps", e.STORAGE = "storage", e.FORMULA = "formula", e.OPERATOR = "operator", e.TAG = "tag", e.CONDITION_LEVEL_OPERATOR = "clOperator"
    }(Pr || (Pr = {}));
    const xr = function(e, t, n) {
        return c(this, void 0, void 0, (function*() {
            const o = Wr.plugins[Pr.OPERATOR] && Wr.plugins[Pr.OPERATOR].get(e) || (() => !1),
                i = we();
            t.split(".")[0].indexOf(i) > -1 && (t = t.slice(t.indexOf(".") + 1));
            const r = ["neq", "neqs", "ncn", "bl", "ninlist"];
            if (window[i] && window[i].length) {
                const s = -1 !== r.indexOf(e),
                    a = "ninlist" === e;
                for (const e of window[i]) try {
                    if (!e) continue;
                    const i = _e(t, e);
                    if (s) {
                        if (!(yield o.apply(o, [i, n])) || i !== e[t] && !(yield o.apply(o, [e[t], n]))) {
                            if (!a) return !1
                        } else if (a) return !0
                    } else if ((yield o.apply(o, [i, n])) || i !== e[t] && (yield o.apply(o, [e[t], n]))) return !0
                } catch (e) {
                    d.error("Failed to evaluate the dataLayer variable: ", e)
                }
                return !a && s
            }
        }))
    };
    window.VWO.modules.tags.dL = xr;
    class Ur {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.checkEnvironment = {};
    class Mr {
        otherSide(...e) {
            e[0] = "VWO.modules.tags.checkEnvironment.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    class kr extends Mr {
        addDomReadyListener(e) {
            window.addEventListener("load", (() => {
                e()
            })), "complete" === document.readyState && e()
        }
        setSameSiteVariables() {
            const e = yn.isSSApp();
            return e && (window.VWO._.ssdm = !0), e && "https:" === ft.location.protocol && (!window.VWO.data.accountJSInfo || window.VWO.data.accountJSInfo && !window.VWO.data.accountJSInfo.noSS) && (window.VWO._.ss = !0), e
        }
    }
    const Gr = new kr;
    window.VWO.modules.tags.checkEnvironment.utils = Gr;
    class Fr extends Ur {
        constructor() {
            super(), window.VWO._.phoenixMT.on("vwo_init", (() => {
                window.VWO._.envUtils = this.getPreRequisites()
            })), window.VWO._.phoenixMT.on("vwo_reRun", (() => {
                window.fetcher.setValue("VWO._.envUtils", this.getPreRequisites()), window.fetcher.setValue("window.VWO._.willRedirectionOccur", window.VWO._.willRedirectionOccur)
            }))
        }
        getPreRequisites() {
            const e = Gr.setSameSiteVariables(),
                t = !window.VWO._.cLFE && mn.shouldWeTrackVisitor();
            return {
                doCookiesMatter: t,
                areCookiesDisabled: yn.areCookiesDisabled(t),
                shouldStopExecWhenSsmNotFound: yn.shouldStopExecWhenSsmNotFound(),
                isSSApp: e
            }
        }
        execute() {}
    }
    const $r = new Fr,
        jr = $r.execute;
    window.VWO.modules.tags.checkEnvironment.fn = $r;
    class Br {}
    class Hr extends Br {
        execute() {}
    }
    const Kr = new Hr,
        Jr = Kr.execute;
    window.VWO.modules.tags.runCampaign = Kr;
    const qr = function() {};
    window.VWO.modules.tags.runTestCampaign.fn = qr;
    class Yr {}
    class Xr extends Yr {
        processGroupCampaigns() {}
    }
    const zr = new Xr,
        Qr = zr.processGroupCampaigns.bind(zr);
    window.VWO.modules.tags.groupCampaigns = Qr;
    class Zr {}
    class es extends Zr {
        constructor() {
            super(), 716497 === window._vwo_acc_id && window.VWO._.phoenixMT.on("vwo_urlChangeMt", this.execute)
        }
        execute() {
            window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                status: !1
            })
        }
    }
    const ts = new es,
        ns = ts.execute;
    class os {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.fn." + e[0], window.fetcher.getValue(...e)
        }
    }
    window.VWO.modules.tags.prePostMutation = {};
    class is {
        otherSide(...e) {
            return e[0] = "VWO.modules.tags.prePostMutation.utils." + e[0], window.fetcher.getValue(...e)
        }
    }
    let rs = null,
        ss = null,
        as = null,
        ds = !1,
        cs = !1;
    class ls extends is {
        monitorPageForChanges() {
            var e;
            if ("undefined" != typeof MutationObserver && (ss && 716497 === window._vwo_acc_id && window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                    status: !0
                }), !ss)) {
                const t = {
                        subtree: !0,
                        attributes: !0,
                        childList: !0,
                        attributeFilter: ["class"]
                    },
                    n = function() {
                        var e, t, n;
                        if (!ds) {
                            window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                                status: !1
                            });
                            const o = window.VWO._.allSettings.dataStore.campaigns;
                            if (!window.VWO._.urlChangeProcessingPending)
                                for (const n in o) o[n].xPath && !yn.isXpathAllHead(o[n], o[n].xPath) && (null === (t = null === (e = o[n].muts) || void 0 === e ? void 0 : e.post) || void 0 === t ? void 0 : t.enabled) && o[n].mutElg && o[n].combination_chosen && (o[n].cA = !1, window.VWO.modules.tags.runTestCampaign.utils.applyChanges(o[n].combination_chosen, o[n], null, null, []));
                            null === (n = window.VWO._.phoenixMT) || void 0 === n || n.trigger(l.EDITOR_APPLY_CHANGES_COMPLETE), window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                                status: !0
                            })
                        }
                    };
                window.VWO._.phoenixMT.on(l.TOGGLE_MUT_OBSERVER, (({
                    status: e
                }) => {
                    var n;
                    window.VWO._.txtCfg && window.VWO._.txtCfg.o && (e ? window.VWO._.txtCfg.o.c(document.body ? "body" : "html") : window.VWO._.txtCfg.o.d());
                    if (![714257, 742951, 707062, 716497].includes(window._vwo_acc_id) && !(null === (n = window._vwoCc) || void 0 === n ? void 0 : n.aMO)) return;
                    const o = document.body || document.documentElement;
                    o && e ? ss.observe(o, t) : ss.disconnect()
                }));
                const o = null === (e = window._vwoCc) || void 0 === e ? void 0 : e.observeHTML;
                ss = new ft.MutationObserver(n);
                const i = o ? document.documentElement : document.body || document.documentElement;
                i && ss.observe(i, t), 742951 == window._vwo_acc_id && (/iPad Simulator|iPhone Simulator|iPod Simulator|iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.userAgent.includes("Mac") && "ontouchend" in document) && (document.addEventListener("touchstart", (e => {
                    window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                        status: !1
                    })
                })), document.addEventListener("click", (e => {
                    window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                        status: !0
                    })
                })), window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                    window.VWO._.phoenixMT.trigger(l.TOGGLE_MUT_OBSERVER, {
                        status: !0
                    })
                })))
            }
        }
        waitForDOMRenderingAndExecuteCampaign(e) {
            ds = !0;
            const t = document.body || document.documentElement,
                n = {
                    subtree: !0,
                    childList: !0
                },
                o = function() {
                    cs = !0, rs = rs || de((function() {
                        ds = !1, as.disconnect(), window.fetcher.getValue("phoenix.trigger", [l.SSR_COMPLETE])
                    }), e.timer, !0), rs()
                };

            function i() {
                cs || (ds = !1, window.fetcher.getValue("phoenix.trigger", [l.SSR_COMPLETE]), as && as.disconnect())
            }
            t ? (as = new ft.MutationObserver(o), as.observe(t, n)) : (cs = !0, window.fetcher.getValue("phoenix.trigger", [l.SSR_COMPLETE])), e.timeout ? setTimeout(i, e.timeout) : i()
        }
    }
    const us = new ls;
    window.VWO.modules.tags.prePostMutation.utils = us;
    const ws = {},
        _s = nt;
    class ps {
        constructor(e) {
            this.observed = !1, this.applyCount = 0, this.selectorIdentifier = "", void 0 !== ft.MutationObserver && (this.observer = new ft.MutationObserver(this.refreshObserverCallback.bind(this)), this.observer.node = e, e.addEventListener("vwoObserverAction", this.observerActionCallback.bind(this)))
        }
    }
    const gs = window._vwo_editorOperationTracker = {},
        hs = 100,
        vs = {
            subtree: !0,
            attributes: !0,
            characterData: !0,
            childList: !0,
            attributeFilter: ["style", "src", "srcset", "href"]
        },
        fs = "vwo_refresh_limit_reached",
        Os = [];
    let Es = {};
    const ms = function(e, t) {
            const n = vwo_$(e);
            if (!n.length || !ws[t]) return;
            const o = Array.from(n);
            let i = 0;
            for (const n of o) {
                let o = n.__vwoInternals;
                o || (o = n.__vwoInternals = new ps(n), Os.push(o)), o.applyCount++, _s && (o.selectorIdentifier = `${e}|${i++}|${t}`, Es[o.selectorIdentifier] = Es[o.selectorIdentifier] || 0, Es[o.selectorIdentifier]++)
            }
        },
        Ss = function(e, t) {
            const n = document.createEvent("CustomEvent");
            n.initCustomEvent("vwoObserverAction", !0, !1, t), e && e.dispatchEvent(n)
        };
    window._vwo_handleMutations = function(e, t) {
        try {
            e && "function" == typeof t && (Ss(e, {
                disconnect: !0
            }), t(), Ss(e, {
                connect: !0
            }))
        } catch (e) {
            const t = "[JSLIB_EDITOR] Error _vwo_handleMutations.";
            P({
                msg: t,
                url: "editorChangesObserver.js",
                source: encodeURIComponent(t)
            })
        }
    }, ps.prototype.refreshObserverCallback = function(e, t) {
        const n = t.node,
            o = window.VWO._.native.JSON.parse(window.VWO._.native.JSON.stringify(ws));
        window.vwoRefreshCampaigns && window.vwoRefreshCampaigns.forEach((e => {
            o[e] = !0
        }));
        for (const e in o)
            if (o[e] && n.classList) {
                const t = Array.from(n.classList);
                for (const o of t) o.indexOf(`vwo_loaded_${e}`) > -1 && n.classList.remove(o)
            }
        this.disconnectObserver()
    }, ps.prototype.observerActionCallback = function(e) {
        if (!e.detail) return;
        const t = e.detail || {},
            n = t.operationId;
        t.disconnect ? n ? gs[n] = "disconnected" : this.disconnectObserver() : t.connect ? this.connectObserver() : n && delete gs[n]
    }, ps.prototype.disconnectObserver = function() {
        this.observer.disconnect(), this.observed = !1
    }, ps.prototype.connectObserver = function() {
        if (this.observer && !this.observed) {
            (_s ? Es[this.selectorIdentifier] > 20 : this.applyCount > hs) ? this.observer.node.hasAttribute(fs) || this.observer.node.setAttribute(fs, ""): (this.observer.observe(this.observer.node, vs), this.observed = !0)
        }
    }, ps.prototype.resetObserver = function() {
        this.observer && (this.applyCount = 0, this.observed || (this.observer.observe(this.observer.node, vs), this.observed = !0), Es = {}, this.observer.node.hasAttribute(fs) && this.observer.node.removeAttribute(fs))
    };
    const Ts = function() {
        var e, t, n, o;
        null === (e = window.VWO._.phoenixMT) || void 0 === e || e.on(l.INIT_VWO_INTERNALS, (function(e) {
            const {
                elementSelector: t,
                campaignId: n
            } = e;
            ms(t, n)
        })), null === (t = window.VWO._.phoenixMT) || void 0 === t || t.on(l.SET_CAMPAIGN_TO_OBSERVE, (function(e) {
            var t, n, o, i;
            const r = window._vwo_exp,
                {
                    campaignId: s
                } = e;
            r[s].xPath && !yn.isXpathAllHead(r[s], r[s].xPath) && (null === (n = null === (t = r[s].muts) || void 0 === t ? void 0 : t.post) || void 0 === n ? void 0 : n.enabled) && (ws[s] = !!(null === (i = null === (o = r[s].muts) || void 0 === o ? void 0 : o.post) || void 0 === i ? void 0 : i.refresh))
        })), null === (n = window.VWO._.phoenixMT) || void 0 === n || n.on("vwo_urlChangeMt", (function() {
            for (let e = Os.length - 1; e > -1; e--) Os[e].resetObserver()
        })), null === (o = window.VWO._.phoenixMT) || void 0 === o || o.on(l.EDITOR_APPLY_CHANGES_COMPLETE, (function() {
            for (let e = Os.length - 1; e > -1; e--) Os[e].connectObserver()
        }))
    };
    window.VWO.modules.tags.prePostMutation.editorChangesObserver = {
        attachEditorChangeObserverEvents: Ts
    };
    class Cs extends os {
        execute() {}
    }
    const Is = new Cs,
        ys = Is.execute;
    window.VWO.modules.tags.prePostMutation.fn = Is;
    var As = [];
    const Ns = ["dev.visualwebsiteoptimizer.com", "d5phz18u4wuww.cloudfront.net", "cdn-cn.vwo-analytics.com"];

    function Vs(e) {
        let t = !1;
        for (let n = 0; n < Ns.length; n++)
            if (e.indexOf(Ns[n]) >= 0) {
                t = !0;
                break
            }
        return t
    }
    var bs = function(e) {
        if (Vs(e && e.url || ""))
            for (var t = 0; t < As.length; t++) As[t](e)
    };

    function Rs(e) {
        var t, n, o, i = {
            msg: e.message || (null === (t = e.reason) || void 0 === t ? void 0 : t.message),
            stack: (null === (n = e.error) || void 0 === n ? void 0 : n.stack) || (null === (o = e.reason) || void 0 === o ? void 0 : o.stack),
            url: e.filename || e.reason && (e.reason.stack || e.reason.message),
            source: "uncaughtErr"
        };
        bs(i)
    }
    window.addEventListener ? (window.addEventListener("error", Rs), window.addEventListener("unhandledrejection", Rs)) : window.attachEvent && window.attachEvent("onerror", (function(e, t, n, o) {
        bs({
            msg: e,
            url: t,
            source: "uncaughtErr"
        })
    }));
    const Ls = function(e) {
        e && "function" == typeof e && As.push(e)
    };
    let Ws;
    class Ps extends W {
        constructor() {
            super(), this.errorTracking({
                getters: {
                    window: window,
                    accountId: window._vwo_acc_id,
                    encodeURIComponent: encodeURIComponent,
                    actions: {},
                    serverUrl: window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/"
                }
            })
        }
        setErrorTrackingCallback(e) {
            const t = e.encodeURIComponent,
                n = e.accountId,
                o = D((() => window.VWO.data.accountJSInfo.collUrl)) || e.serverUrl,
                i = this;
            var r = 0;
            const s = function(e) {
                var s, a = (e = e || {}).msg && e.msg.substring(0, 1e3),
                    d = e.stack && e.stack.substring(0, 1e3);
                const c = e.source,
                    l = e.url,
                    u = Ws || i.getEmptyTriggerIdsIfAny(),
                    w = "ee.gif?" + (l ? "f=" + t(e.url) : "") + "&a=" + n + (c ? "&s=" + t(c) : "") + (Array.isArray(u) && u.length ? "&eT=" + t(u.join()) : "") + "&e=" + t(a) + "&stack=" + t(d);
                if (r < 50 && (r++, Fo({
                        url: w,
                        serverUrl: o
                    }, void 0, void 0, !0)), null == u ? void 0 : u.length) {
                    null === (s = window._vwo_code) || void 0 === s || s.finish();
                    const e = vwo_$('[id^="_vis_opt_path_hides"]');
                    if (e.length)
                        for (let t = 0; t < e.length; t++) vwo_$(e[t]).remove()
                }
            };
            return Ls(s), s
        }
        getEmptyTriggerIdsIfAny() {
            const {
                triggers: e
            } = window.VWO._.allSettings || {}, t = [];
            return Object.keys(e).forEach((n => {
                Object.keys(e[n]).length || t.push(n)
            })), Ws = t, t
        }
        errorTracking({
            getters: e
        }) {
            const t = this.setErrorTrackingCallback(e);
            this.setCustomError(t)
        }
    }
    const Ds = new Ps,
        xs = Ds.errorTracking.bind(Ds);
    window.VWO.modules.tags = window.VWO.modules.tags || {}, window.VWO.modules.tags.errorTracking = xs, window.VWO.modules.tags.errorTrackingCallback = Ds.setErrorTrackingCallback;
    let Us = [];

    function Ms() {
        return function(e, t) {
            if (t !== l.PAGE_VIEW) return void window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                captureGroups: [l.AFTER_SAMPLING_TRIGGER, {
                    oldArgs: [{
                        samplingRate: e.samplingRate,
                        priority: e.priority
                    }]
                }]
            });
            const {
                samplingRate: n,
                priority: o
            } = e;
            Us.push({
                samplingRate: n,
                priority: o
            }), window.VWO.track.sampleData = Us
        }
    }
    window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => Us = []));
    const ks = Ms();
    window.VWO.modules.tags = window.VWO.modules.tags || {}, window.VWO.modules.tags.sampleVisitor = ks;
    class Gs {
        constructor() {
            this.whiteListedEventsForVsKey = [l.PAGE_VIEW, l.CUSTOM_CONVERSION, l.DOM_CLICK, l.DOM_SUBMIT, l.REVENUE_CONVERSION]
        }
        getCurrentEventData(e, t, n) {
            const o = {};
            if (!(Object.keys(t).length <= 0)) return Object.keys(t).forEach((i => {
                var r;
                o[i] = o[i] || {}, o[i] = {
                    vwoMeta: {
                        metric: t[i].metrics
                    }
                }, this.whiteListedEventsForVsKey.includes(e) && t[i].comb && (o[i].vwoMeta.vS = t[i].comb), (null === (r = n[i]) || void 0 === r ? void 0 : r.length) > 0 && (o[i].matchedSelectors = n[i])
            })), o
        }
    }
    class Fs {
        constructor() {
            this.vwoEvents = {
                trigger: function(e, t) {
                    return c(this, void 0, void 0, (function*() {
                        yield window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                            captureGroups: [e, t]
                        })
                    }))
                }
            }
        }
        isGoalEligible(e, t) {
            return e.pExcludeUrl && xi.matchRegex(t, e.pExcludeUrl) ? (window.VWO.modules.tags.wildCardCallback({}, l.EXCLUDE_GOAL_URL), !1) : e.pUrl ? $i.verifyUrl(t, e.pUrl, null) : $i.verifyUrl(t, null, e.urlRegex)
        }
        registerConversion(e, t, n, o, i) {
            "INSIGHTS_FUNNEL" !== t.type ? (e = e || 1, this._triggerGoalConversion(e, t, n, o, {
                combination: Gi.getCombi(t, i)
            })) : window.VWO._.insightsUtils.markFunnelValue(t.id, 1, e, t.version)
        }
        getImgUrlForConversion(e, t, n, o) {
            if (!mn.shouldWeTrackVisitor()) return;
            var i, r;
            const s = e.id,
                a = window._vwo_acc_id,
                d = window.VWO.modules.tags.sessionInfoService;
            if (r = "c.gif?account_id=" + a + "&experiment_id=" + s + "&goal_id=" + t + "&ru=" + encodeURIComponent(vt.get()) + (void 0 === o ? "" : "&r=" + o) + yn.getUUIDString(yn.getUUID(e)), "TRACK" === e.type) {
                i = d.getSessionId(), window.VWO.modules.tags.wildCardCallback({
                    campaign: e
                }, l.EXECUTE_FUNNEL_FOR_GOAL_CAMPAIGN);
                const n = (window.tracklib || window.VWO._.track).getGtAndF(t);
                if (n) {
                    return r + "&s=" + i + "&ifs=" + +(i === d.getSessionId()) + "&t=1&cu=" + encodeURIComponent(window.location.href) + n
                }
                return ""
            }
            return d.shouldSendSessionInfoInCall() && (i = d.getSessionId()), r + "&combination=" + n + (i = i ? "&sId=" + i : "")
        }
        _triggerGoalConversion(e, t, n, o, i) {
            if ("INSIGHTS_METRIC" === t.type) return void Gi.markGoalTriggered(t, e);
            const r = i.combination;
            if (!o && (!r || Gi.isGoalTriggered(t, e) || yn.isBot2())) return void(L.queueGoalLogs(t.id, e, n, !1) && window.VWO.modules.tags.wildCardCallback({
                oldArgs: [t.id, e, n, !1],
                campaignId: t.id,
                goalId: e
            }, l.REGISTER_CONVERSION));
            "REVENUE_TRACKING" !== t.goals[e].type && (n = void 0);
            const s = this.getImgUrlForConversion(t, e, r, n);
            if (s) {
                if (yn.isEligibleToSendCall(t.id)) {
                    const e = e => Zn.sendCall(null, {
                        url: s,
                        cUrl: e
                    }, null, null);
                    if (Qe) {
                        const t = window.VWO._.lastPageUnloadURL || document.URL;
                        kn((() => e(t)))
                    } else e()
                }
                Gi.markGoalTriggered(t, e)
            }
            L.queueGoalLogs(t.id, e, n, !!s) && window.VWO.modules.tags.wildCardCallback({
                oldArgs: [t.id, e, n, !!s],
                campaignId: t.id,
                goalId: e
            }, l.REGISTER_CONVERSION)
        }
    }
    const $s = new Fs;
    class js extends Gs {
        execute(e, t) {
            if (window.VWO._.willRedirectionOccur) return;
            if (yn.isBot2()) return;
            const n = {},
                o = {};
            for (const r of t) {
                const t = r.c,
                    s = r.g,
                    a = t && window._vwo_exp[t];
                let d = !1;
                const c = a.goals[s];
                if (!(t && s && a && c)) continue;
                d = yn.isSessionBasedCampaign2(a);
                const u = r.uuid || yn.createUUIDCookie2(a);
                if (!d || yn.hasInsightsMetric(a.type)) {
                    if ("CUSTOM_GOAL" === (null == c ? void 0 : c.type)) {
                        const e = c.url;
                        n[u] = n[u] || [], n[u].indexOf(e) < 0 && n[u].push(e)
                    }
                    o[u] = o[u] || {};
                    const e = "id_" + t;
                    o[u].metrics = o[u].metrics || {}, o[u].metrics[e] = o[u].metrics[e] || [], o[u].metrics[e].push("g_" + s), a.isEventMigrated && (o[u].comb = o[u].comb || {}, o[u].comb[e] = Gi.getCombi(a))
                }
                var i = !0;
                window.VWO._.isBeaconAvailable = e.isBeaconAvailable, window.VWO._.isLinkRedirecting = e.isLinkRedirecting, $s.registerConversion(s, a, e.revenue, !d, !0), window.VWO.phoenix('trigger("${{1}}", "${{2}}")', null, {
                    captureGroups: [l.GOAL_CONVERTED, {
                        campaignId: a.id,
                        goalId: s
                    }]
                }), window.VWO._.isLinkRedirecting = !1, i = i && window.VWO._.isBeaconAvailable
            }
            const r = this.getCurrentEventData(e.vwoEventName, o, n);
            e._vwo = e._vwo || {}, e._vwo.eventDataConfig = e._vwo.eventDataConfig || {}, e._vwo.eventDataConfig = r
        }
    }
    const Bs = new js,
        Hs = Bs.execute.bind(Bs);
    window.VWO.modules.tags.metricMT = Hs;
    class Ks {
        constructor() {
            this.lastSetTimerId = null, window.VWO._.phoenixMT.on(l.UNHIDE_ELEMENT, (({
                ruleName: e,
                campaignData: t,
                variation: n,
                rulesArr: o
            }) => {
                let i;
                t && (i = {
                    id: t.id,
                    variation: yn.isPersonalizeCampaign(t) ? n : null
                }), yn.delCSSWrapper({
                    ruleName: e,
                    rulesArr: o,
                    campaignData: i
                })
            }))
        }
        unhideElementsAfterTimer(e) {
            null !== this.lastSetTimerId && clearTimeout(this.lastSetTimerId), this.lastSetTimerId = setTimeout((function() {
                var t;
                this.lastSetTimerId = null;
                const n = vwo_$('[id^="_vis_opt_path_hides"]');
                if (n.length) {
                    const o = [];
                    for (let e = 0; e < n.length; e++) vwo_$(n[e]).remove(), o.push(null === (t = n[e].getAttribute("id")) || void 0 === t ? void 0 : t.split("_").slice(-1)[0]);
                    window.fetcher.getValue('phoenix.trigger("${{1}}", "${{2}}")', null, {
                        captureGroups: [l.CHECK_SEGMENTATION, e]
                    }), d.info("Multiple hiding tags found after 5 seconds for campaigns " + window.VWO._.native.JSON.stringify(o), {
                        url: "visibilityService.js",
                        lineno: 34,
                        colno: 34
                    })
                }
            }), 5e3)
        }
    }
    window.VWO.modules.tags.visibilityService = new Ks;
    var Js = Object.freeze({
        __proto__: null,
        backwardCompatibilityUtils: dr,
        checkEnvironment: jr,
        runCampaign: Jr,
        runTestCampaign: qr,
        groupCampaigns: Qr,
        urlChange: ns,
        prePostMutation: ys,
        errorTracking: xs,
        sampleVisitor: ks,
        metric: Hs
    });
    const {
        checkEnvironment: qs,
        runCampaign: Ys,
        runTestCampaign: Xs,
        groupCampaigns: zs,
        prePostMutation: Qs,
        urlChange: Zs,
        errorTracking: ea,
        sampleVisitor: ta,
        metric: na
    } = Js;
    class oa {
        constructor() {
            this.noOp = function() {}
        }
        test() {
            console.log(1)
        }
        getPhoenixConfig() {
            return {
                tags: {
                    checkEnvironment: {
                        fn: qs,
                        sync: !0
                    },
                    runCampaign: {
                        fn: Ys,
                        sync: !0
                    },
                    runTestCampaign: {
                        fn: Xs,
                        sync: !0
                    },
                    groupCampaigns: {
                        fn: zs,
                        sync: !0
                    },
                    prePostMutation: {
                        fn: Qs,
                        sync: !0
                    },
                    urlChange: {
                        fn: Zs,
                        sync: !0
                    },
                    errorTracking: {
                        fn: ea,
                        sync: !0
                    },
                    sampleVisitor: {
                        fn: ta
                    },
                    metric: {
                        fn: na,
                        sync: !0,
                        fireUniquelyForEveryEvent: !0
                    }
                },
                storages: {
                    localStorageService: Ct,
                    cookies: gt
                },
                jsLibUtils: {
                    verifyUrl: function() {
                        return $i.verifyUrl.apply($i, arguments)
                    }
                }
            }
        }
        sendMessageToParentFrame(e) {
            if (!e) return;
            if (window.self === window.parent) throw new Error("Cookieless Mode for Iframe enabled at top level. ");
            const t = {
                vwoEvent: {
                    name: "VWO_STORE_UPDATE",
                    data: e
                }
            };
            window.parent.postMessage(t, "*")
        }
        getCookieJarValidValue(e) {
            return ["null", null, void 0, "undefined"].indexOf(e) > -1 ? "" : e
        }
        setFunnelExps(e) {
            var t, n;
            const o = null === (t = null == e ? void 0 : e.settings) || void 0 === t ? void 0 : t.campaigns;
            for (const e in window._vwo_exp)
                if (window._vwo_exp[e].funnel)
                    for (const t of window._vwo_exp[e].funnel) {
                        const e = t;
                        (null === (n = window._vwo_exp[e.id]) || void 0 === n ? void 0 : n.g) || (window._vwo_exp[e.id] = e, window._vwo_exp[e.id].g = e.goals, window._vwo_exp[e.id].goals = {}, o && (o[e.id] = window._vwo_exp[e.id]))
                    }
        }
        postPhoenixMTHook() {
            var e, t;
            const n = Object.keys(Object.assign({}, Js));
            for (let o = n.length - 1; o >= 0; --o) null === (t = (e = Js[n[o]]).postPhoenixMTHook) || void 0 === t || t.call(e)
        }
    }
    const ia = new oa;

    function ra() {
        const e = window.fetcher,
            t = window.fetcher.getValue("phoenixInstantiate"),
            n = function(t, n = null, o = {}) {
                if (!n) return e.getValue("phoenix." + t, null, o);
                e.setValue("phoenix." + t, n)
            },
            o = new Promise((e => {
                t.then((t => e([n, t])))
            }));
        let i = [];
        return window.VWO._.phoenixMT.on("vwo_phoenixInitialized", (() => {
            for (let e = 0; e < i.length; e++) i[e]();
            i = [], yn.fireVariationShownSentForSplit()
        })), [function(e, t = null, n = {}) {
            return new Promise((o => {
                i.push((() => {
                    o(window.VWO.phoenix(e, t, n))
                }))
            }))
        }.bind(this), o]
    }
    window.VWO.modules.utils.initUtils = ia;
    const sa = ra;
    var aa;
    window._vis_opt_queue = window._vis_opt_queue || [];
    var da = window._vis_opt_queue || [];
    const ca = window._vwoCc && (null === (aa = window._vwoCc.arrayRepl) || void 0 === aa ? void 0 : aa[window._vwo_acc_id]),
        la = ca ? new ve : [];
    la.execute = function(e) {
        try {
            e()
        } catch (e) {}
    }, la.finish = function(e) {
        if (!this.isProcessed) {
            var t = da.push;
            da.push = function() {
                t.apply(this, [].slice.call(arguments)), la.execute.apply(this, [].slice.call(arguments))
            }, this.isProcessed = !0
        }
        for (e = 0; e < da.length; e++) la.execute(da[e])
    }, la.clear = function() {
        da.splice(0, da.length)
    };
    var ua = function() {},
        wa = [],
        _a = [],
        pa = [],
        ga = [],
        ha = window._vwo_evq = window._vwo_evq || [];
    window.VWO = window.VWO || [], window.VWO._ = window.VWO._ || {};
    var va = function(e, t) {
            t.e === e[0] && t.c.apply(this, [e])
        },
        fa = function(e, t) {
            t.e && t.e !== e[1] || t.v && t.v !== e[2] || t.c.apply(this, [e])
        },
        Oa = function(e, t) {
            t.c && t.c.apply(this, [e[1]])
        },
        Ea = function(e) {
            for (var t = 0; t < pa.length; t++) va(e, pa[t]);
            if (e[0] === l.TRACK_SESSION_CREATED && !0 === e[4] && window.VWO.phoenix('trigger("${{1}}")', null, {
                    captureGroups: [l.TRACK_NEW_SESSION_CREATED]
                }), "rH" === e[0] || "vS" === e[0])
                for (t = 0; t < wa.length; t++) fa(e, wa[t]);
            if (e[0] === l.VWO_EXECUTED)
                for (t = 0; t < _a.length; t++) Oa(e, _a[t]);
            if (e[0] === Ki.VARIATION_SHOWN_SENT)
                for (const t of ga) fa(e, t)
        },
        ma = ha.push;
    ha.push = function() {
        var e = arguments[0];
        Ea(e), ma.apply(ha, [].slice.call(arguments))
    };
    var Sa = ha.unshift;
    ha.unshift = function() {
        var e = arguments[0];
        Ea(e), Sa.apply(ha, [].slice.call(arguments))
    };
    const Ta = {
        onVWOLoaded: function(e) {
            var t = {
                c: e = e || ua
            };
            _a.push(t);
            for (var n = 0; n < ha.length; n++) ha[n][0] === l.VWO_EXECUTED && Oa(ha[n], t)
        },
        onVariationShownSent: function(e, t, n) {
            "function" == typeof e && (n = e, e = null, t = null);
            var o = {
                e: e,
                v: t,
                c: n = n || ua
            };
            ga.push(o);
            for (const e of ha) e[0] === Ki.VARIATION_SHOWN_SENT && fa(e, o)
        },
        onVariationApplied: function(e, t, n) {
            "function" == typeof e && (n = e, e = null, t = null);
            var o = {
                e: e,
                v: t,
                c: n = n || ua
            };
            wa.push(o);
            for (var i = 0; i < ha.length; i++) "rH" !== ha[i][0] && "vS" !== ha[i][0] || fa(ha[i], o)
        },
        onEventReceive: function(e, t) {
            if (!e) throw new Error("Invalid eventName:" + e);
            var n = {
                e: e,
                c: t = t || ua
            };
            pa.push(n);
            for (var o = 0; o < ha.length; o++) va(ha[o], n)
        }
    };
    for (var Ca in Ta) Ta.hasOwnProperty(Ca) && (window.VWO[Ca] = Ta[Ca]);

    function Ia(e, t) {
        for (const n in e)
            if ("SURVEY" == e[n].type) {
                (!e[n].survey || 0 === Object.keys(e[n].survey).length && e[n].survey.constructor === Object) && d.warn(`Survey settings unavailable for account: ${window._vwo_acc_id} and campaign: ${n}`);
                for (const o in e[n].survey) window._vwo_surveySettings = window._vwo_surveySettings || {}, window._vwo_surveySettings[o] = e[n].survey[o], t && t[n] && (window._vwo_surveySettings[o].debug = t[n].debug.su)
            }
    }

    function ya() {
        const e = window.VWO;
        e.nls && (e.nls.stopRecording = "permanent"), e.survey && (e.survey.stopCollectingData = !0)
    }

    function Aa() {
        j._.commonUtil = Oe, j._.utils = zt, j._.customEvent = Re, j._.listener = Ta, j._.libUtils = yn, j._.CookieEnum = Jt
    }
    window.VWO.modules.otherLibDeps.storeSurveyDataInVWOSurveySettings = Ia, window.VWO.modules.otherLibDeps.stopAnalyzeAndSurvey = ya, window.VWO.modules.otherLibDeps.setOtherLibrariesDepsMT = Aa, window.VWO._.EventsEnum = Ki;
    var Na = window.console || {
            log: function() {}
        },
        Va;
    window.VWO._.prVWO = window.VWO._.prVWO || [];
    const ba = {
        processEvent: function(e, t, n, o, i) {
            if ("[object Array]" !== Object.prototype.toString.call(e)) return 0;
            try {
                var r, s, a, d = e[0],
                    c = e.slice(1),
                    l = -1 !== d.indexOf(".");
                return l && 0 === d.indexOf(t) || !l ? (l ? (r = n[(s = d.split("."))[0]][s[1]], a = n[s[0]]) : (r = n[d], a = n), r ? (window.VWO._.prVWO = window.VWO._.prVWO.concat(i.queue ? i.splice(o, 1) : i.queue), r.apply(a, c), 1) : 0) : 0
            } catch (t) {
                return Na.log("Error occured in VWO Process Event (" + (e && e[0]) + "): ", t), 0
            }
        },
        addPushListener: function(e, t, n) {
            var o = t.push;
            t.push = function(...i) {
                let r = 0;
                return i.forEach((i => {
                    r = function(i) {
                        const r = o.apply(t, [].slice.call(arguments));
                        return t.queue && t.queue[t.queue.length - 1] === i ? ba.processEvent(i, e, n, t.queue.length - 1, t) : t.queue || t[t.length - 1] !== i || ba.processEvent(i, e, n, t.length - 1, t), r
                    }(i)
                })), r
            }
        },
        init: function(e, t, n, o, i = !0) {
            Va = n ? t[n] = t[n] || [] : t || [], this.vwoApi = o, ba.process(e, Va, t), i && ba.addPushListener(e, Va, t)
        },
        initTrack: function(e, t) {
            ba.init(e, window.VWO, t)
        },
        process: function(e, t, n) {
            var o = 0;
            t.sort((function(e) {
                return "config" === e[0] ? -1 : 0
            }));
            const i = t.queue ? t.queue : t;
            for (; o < i.length;) 0 === ba.processEvent(i[o], e, n, o, t) && o++
        }
    };
    window.VWO && (window.VWO._ = window.VWO._ || {}, window.VWO._.vwoLib = ba);
    const Ra = function(e) {
        var t, n, o, i, r, s, a, d, c, l, u, w, _, p, g, h, v, f, O, E, m;
        const S = null === (t = window.VWO._.allSettings.dataStore) || void 0 === t ? void 0 : t.plugins;
        if (!S) return;
        const T = null == S ? void 0 : S.DACDNCONFIG;
        e._.ac = e._.ac || {}, e.data.pc = e.data.pc || (null === (o = null === (n = e.data) || void 0 === n ? void 0 : n.accountJSInfo) || void 0 === o ? void 0 : o.pc), e.data.rp = e.data.rp || (null === (r = null === (i = e.data) || void 0 === i ? void 0 : i.accountJSInfo) || void 0 === r ? void 0 : r.rp), e.data.ts = null === (a = null === (s = e.data) || void 0 === s ? void 0 : s.accountJSInfo) || void 0 === a ? void 0 : a.ts, e.data.url = null === (c = null === (d = e.data) || void 0 === d ? void 0 : d.accountJSInfo) || void 0 === c ? void 0 : c.url, e.data.frn = null === (u = null === (l = e.data) || void 0 === l ? void 0 : l.accountJSInfo) || void 0 === u ? void 0 : u.frn, e.data.noSS = null === (w = e.data.accountJSInfo) || void 0 === w ? void 0 : w.noSS, e.DONT_IOS = null == T ? void 0 : T.DONT_IOS, e.data.sst = null == T ? void 0 : T.SST, e._.sstd = null === (_ = null == T ? void 0 : T.SST) || void 0 === _ ? void 0 : _.SSTD, e._.ac.it = null === (p = null == T ? void 0 : T.SD) || void 0 === p ? void 0 : p.it, e._.ac.uct = null === (g = null == T ? void 0 : T.SD) || void 0 === g ? void 0 : g.uct, e._.ac.rdbg = null == T ? void 0 : T.RDBG, e.data.fB = null == T ? void 0 : T.FB, e._.SPA_SETTINGS_DELAY = +(null === (h = null == T ? void 0 : T.SD) || void 0 === h ? void 0 : h.IT) || 0, e._.SPA_NEW_PAGE_SETTINGS_DELAY = +(null === (v = null == T ? void 0 : T.SD) || void 0 === v ? void 0 : v.UCT) || 0, e._.isSpaEnabled = null == T ? void 0 : T.SPA, e._.ac.eNC = null == T ? void 0 : T.eNC, e._.ac.cInstJS = null == T ? void 0 : T.CINSTJS, e._.ac.bsECJ = null == T ? void 0 : T.BSECJ, e._.ac.cURCF = null == T ? void 0 : T.cURCF, e._.ast = null == T ? void 0 : T.AST, e.featureInfo = (null == T ? void 0 : T.jsConfig) || {}, window._vwo_clicks = window._vwo_clicks || (null == T ? void 0 : T.HEATMAPCLICKS), e.data.cj = {
            bc: null === (f = null == T ? void 0 : T.CJ) || void 0 === f ? void 0 : f.BC,
            s: null === (O = null == T ? void 0 : T.CJ) || void 0 === O ? void 0 : O.S
        }, e._.ac.eNC = null == T ? void 0 : T.eNC, e._.ac.cSHS = !(null === (E = window._vwoCc) || void 0 === E ? void 0 : E.syncServerUrl) && ((null == T ? void 0 : T.CSHS) || (null === (m = null == T ? void 0 : T.jsConfig) || void 0 === m ? void 0 : m.histEnabled)), e._.ac.uCP = null == T ? void 0 : T.UCP, e._.ac.iAF = null == T ? void 0 : T.IAF, e._.ac.PRTHD = null == T ? void 0 : T.PRTHD
    };
    let La;
    const Wa = {
            test: e => {
                var t;
                return La = null === (t = window.VWO) || void 0 === t ? void 0 : t.phoenix, window.workerThread && La && e === La.store.getters
            },
            transformer: function(e) {
                return e === La.store.getters.settings.campaigns || e === La.store.getters.allSettings.dataStore.campaigns ? "vwojFnGPlugCamp" : e === La.store.getters.allSettings ? "vwojFnGPlugAllSet" : e
            },
            parse: (e, t) => {
                if ("vwojFnGPlugCamp" === t) return window._vwo_exp;
                if ("vwojFnGPlugAllSet" === t) {
                    const e = Object.assign({}, window.VWO._.allSettings);
                    return delete e.triggers, delete e.tags, e
                }
                return t
            }
        },
        Pa = [Wa],
        Da = {
            stringify: function(e, t, n) {
                try {
                    return window.VWO._.native.JSON.stringify(e, (function(e, o) {
                        if (!n) {
                            const e = Pa.filter((e => e.test(o)));
                            if (e.length > 0) {
                                const n = t => e.reduce(((e, t) => t.transformer(e)), t);
                                return window.VWO._.native.JSON.parse(Da.stringify(o, t, n))
                            }
                        }
                        n && (o = n(o));
                        const i = e ? this : t;
                        var r;
                        return o instanceof Function || "function" == typeof o ? o.type === "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT") ? "_NuPreW" + o.name.slice(0, o.name.indexOf("_") + 1) : (r = o.toString()).length < 8 || "function" !== r.substring(0, 8) ? "_NuFrRa" + window.functionWrapper.wrap(o, i) + "_" : "_NuFrNf" + window.functionWrapper.wrap(o, i) + "_" : o instanceof RegExp ? "_PxEgEr_" + o : o
                    }))
                } catch (e) {
                    return P({
                        msg: "JSONfn.stringify failed!",
                        url: "jsonFn.ts",
                        source: e
                    }), ""
                }
            },
            parse: function(e, t) {
                if (!e) return e;

                function n(e) {
                    const t = e + "_wrappedFn",
                        n = {
                            [t](...t) {
                                const n = {
                                    type: "callWrappedFunction",
                                    id: e,
                                    args: Da.stringify(t)
                                };
                                return window.fetcher.request(n).send()
                            }
                        }[t];
                    return n.type = "vwoWrappedFn_" + (window.mainThread ? "WT" : "MT"), n
                }
                const o = !!t && /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
                return window.VWO._.native.JSON.parse(e, (function(e, t) {
                    for (const n of Pa) t = n.parse(e, t);
                    var i;
                    if ("string" != typeof t) return t;
                    if (t.length < 8) return t;
                    if (i = t.substring(0, 7), o && t.match(o)) return new Date(t);
                    if ("_NuPreW" === i) {
                        const e = t.match(/_NuPreW([0-9]*)_/)[1];
                        return window.functionWrapper.unwrap(e)
                    }
                    if ("_NuFrNf" === i) {
                        const e = t.match(/_NuFrNf([0-9]*)_/)[1];
                        return n(e)
                    }
                    if ("_PxEgEr" === i) return eval(t.slice(8));
                    if ("_NuFrRa" === i) {
                        const e = +t.match(/_NuFrRa([0-9]*)_/)[1];
                        return n(e)
                    }
                    return t
                }))
            },
            clone: function(e, t) {
                return this.parse(this.stringify(e), t)
            }
        };
    let xa = 0;
    const Ua = {},
        Ma = {};

    function ka(e, t, n) {
        var o;
        const i = this.postMessage.bind(this);
        if ("response" === (null === (o = e) || void 0 === o ? void 0 : o.type)) {
            const t = e;
            return {
                resolve: function(e) {
                    let n = t.encapsulatedData;
                    const o = t.isErrorPresent;
                    n && (n = "function" == typeof e ? e(t.encapsulatedData) : t.encapsulatedData), o ? Ma[t.twoWayCommId](n) : Ua[t.twoWayCommId](n)
                }
            }
        } {
            const o = {
                type: "response",
                encapsulatedData: e,
                twoWayCommId: t,
                isErrorPresent: n
            };
            return {
                send: function() {
                    try {
                        return i(o), !0
                    } catch (e) {
                        return !1
                    }
                }
            }
        }
    }

    function Ga(e) {
        var t;
        if (this.sendingLayer = this.postMessage, "request" === (null === (t = e) || void 0 === t ? void 0 : t.type)) {
            const t = e,
                n = t.encapsulatedData;
            return {
                resolve: e => c(this, void 0, void 0, (function*() {
                    try {
                        const o = yield e(n);
                        return ka.call(this, o, t.twoWayCommId).send(), !0
                    } catch (e) {
                        const n = Da.stringify(e.message);
                        return ka.call(this, n, t.twoWayCommId, !0).send(), !1
                    }
                }))
            }
        } {
            const t = {
                type: "request",
                encapsulatedData: e,
                twoWayCommId: ++xa
            };
            return {
                send: () => new Promise(((e, n) => {
                    try {
                        Ua[t.twoWayCommId] = e, Ma[t.twoWayCommId] = n, this.sendingLayer(t)
                    } catch (e) {
                        console.log(e), n(e)
                    }
                }))
            }
        }
    }
    class Fa {
        constructor() {
            this.masterObject = {}
        }
        static isObject(e) {
            return "object" == typeof e && !Array.isArray(e) && null !== e
        }
        static createProxy(e, t, n) {
            if (e.__isProxy || !this.isObject(e)) return e;
            const o = e;
            return Object.defineProperty(o, "__transferData", {
                value: !0,
                enumerable: !1,
                writable: !0
            }), new Proxy(o, {
                set: (e, o, i) => {
                    if ("__isProxy" === o || e[o] === i) return !0;
                    if (typeof e[o] == typeof i && "function" != typeof i && window.VWO._.native.JSON.stringify(i) === window.VWO._.native.JSON.stringify(e[o])) return !0;
                    if (this.isObject(i) ? e[o] = this.proxify(i, t, n + o.toString() + ".") : e[o] = i, "__transferData" === o || !e.__transferData) return !0;
                    const r = {
                        path: n + o.toString() + ".",
                        value: i
                    };
                    return r.value = Da.stringify(i, e), t({
                        type: "sync",
                        data: r,
                        syncType: We.Object
                    }), !0
                },
                get: (e, t) => "__isProxy" === t || e[t],
                deleteProperty: (e, o) => {
                    if (o in e) {
                        if (delete e[o], !e.__transferData) return !0;
                        const i = {
                            path: n.toString(),
                            key: o
                        };
                        t({
                            type: "sync",
                            data: window.VWO._.native.JSON.stringify(i),
                            syncType: We.Delete
                        })
                    }
                    return !0
                }
            })
        }
        isKey(e) {
            return e in this.masterObject
        }
        static proxify(e, t, n) {
            return this.isObject(e) ? (Object.keys(null != e ? e : {}).forEach((o => {
                this.isObject(e[o]) && (e[o] = this.proxify(e[o], t, n + o + "."))
            })), this.createProxy(e, t, n)) : e
        }
        register(e, t, n) {
            t in this.masterObject && console.error("Key already exists!"), null == e && (e = {});
            const o = Fa.proxify(e, n, t + ".");
            return this.masterObject[t] = {
                proxy: o
            }, o
        }
        append(e, t) {
            return t in this.masterObject || console.error("Key doesn't exist!"), window.VWO._.native.JSON.stringify(e) !== window.VWO._.native.JSON.stringify(this.masterObject[t].proxy) && console.error(`The object doesn't match the object registered under the key ${t}!`), this.masterObject[t].proxy
        }
        static getProxy(e, t, n) {
            return this.proxify(e, t, n + ".")
        }
        static sync(e, t, n, o, i) {
            if (null == e || !e.__isProxy) return e;
            let r = null,
                s = n + ".";
            return 1 === o.length ? (e.__transferData = !1, e[o[0]] = this.proxify(t, i, s + o[0] + "."), e.__transferData = !0, e) : (r = e[o[0]], o.forEach(((e, t) => {
                s += e + ".", 0 !== t && t !== o.length - 1 && (e in r || (r.__transferData = !1, r[e] = this.proxify({}, i, s), r.__transferData = !0), r = r[e])
            })), r.__transferData = !1, r[o.pop()] = this.proxify(t, i, s), r.__transferData = !0, e)
        }
    }
    class $a {
        static register(e, t) {
            var n, o, i;
            switch (e) {
                case "cookie":
                    if (this.internalUtils.isKeyNonConfigurable("cookie") || (null === (i = null === (o = null === (n = window.VWO._.allSettings.dataStore) || void 0 === n ? void 0 : n.plugins) || void 0 === o ? void 0 : o.DACDNCONFIG) || void 0 === i ? void 0 : i.ckFbk)) return Je.enable();
                default:
                    this.registerProperty(e, t)
            }
        }
        static registerProperty(e, t) {
            if (document) {
                if (e in window.document) {
                    let n;
                    if (n = Object.getOwnPropertyDescriptor(window.document, e) || Object.getOwnPropertyDescriptor(window.Document.prototype, e) || Object.getOwnPropertyDescriptor(window.HTMLDocument.prototype, e), !n) return Je.enable();
                    const o = {
                        enumerable: n.enumerable,
                        configurable: n.configurable,
                        get: () => document["__" + e],
                        set: this.internalUtils.getSetter(e, t)
                    };
                    Object.defineProperty(window.document, "__" + e, n), Object.defineProperty(window.document, e, o), Object.defineProperty(window.Document.prototype, e, o), Object.defineProperty(window.HTMLDocument.prototype, e, o)
                }
            } else console.error("The property doesn't exist on the `DOCUMENT` object.")
        }
        static sync({
            propertyName: e,
            value: t
        }) {
            if ("cookie" === e) return Je.isEnabled() ? Je.applySyncRequest(t) : Ke(t);
            document[e] = t
        }
    }
    $a.internalUtils = {
        getSetter: (e, t) => {
            switch (e) {
                case "cookie":
                    return (new He).getSetter(t);
                default:
                    return n => (window.VWO._.native.JSON.stringify(document["__" + e]) === window.VWO._.native.JSON.stringify(n) || (document["__" + e] = n, t({
                        type: "sync",
                        data: {
                            propertyName: e,
                            value: document["__" + e]
                        },
                        syncType: We.Document
                    })), !0)
            }
        },
        isKeyNonConfigurable: e => {
            var t, n, o;
            const i = [document, null === (t = null === window || void 0 === window ? void 0 : window.Document) || void 0 === t ? void 0 : t.prototype, null === (n = null === window || void 0 === window ? void 0 : window.HTMLDocument) || void 0 === n ? void 0 : n.prototype];
            for (let t = 0; t < i.length; t++)
                if (!1 === (null === (o = Object.getOwnPropertyDescriptor(i[t] || {}, e)) || void 0 === o ? void 0 : o.configurable)) return !0;
            return !1
        }
    };
    class ja {
        static register(e, t, n, o) {
            n in e ? console.error("The property must not pre-exist inside the object.") : Object.defineProperty(e, n, {
                enumerable: !0,
                configurable: !1,
                get: () => e[`__${n}`],
                set: i => (e[`__${n}`] = i, o({
                    type: "sync",
                    data: {
                        identifier: t,
                        property: n,
                        value: i
                    },
                    syncType: We.Property
                }), !0)
            })
        }
    }

    function Ba() {
        {
            const e = window.fetcher.postMessage.bind(window.fetcher);
            It({
                _setItem: (t, n) => {
                    if (window.localStorage.getItem(t) !== n) return window.localStorage.setItem(t, n), e({
                        data: {
                            key: t,
                            value: n
                        },
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "setItem"
                        }
                    }), null
                },
                _removeItem: t => {
                    null !== window.localStorage.getItem(t) && (window.localStorage.removeItem(t), e({
                        data: {
                            key: t
                        },
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "removeItem"
                        }
                    }))
                },
                _clear: () => {
                    0 !== Object.keys(window.localStorage).length && (window.localStorage.clear(), e({
                        data: {},
                        type: "sync",
                        syncType: {
                            type: "custom",
                            method: "localStorage",
                            operation: "clear"
                        }
                    }))
                }
            })
        }
    }

    function Ha(e) {
        if ("number" != typeof e.syncType) {
            switch (window.localStorage.__transferData && (window.localStorage.__transferData = !1), e.syncType.operation) {
                case "setItem":
                    window.localStorage.setItem(e.data.key, e.data.value);
                    break;
                case "removeItem":
                    window.localStorage.removeItem(e.data.key);
                    break;
                case "clear":
                    window.localStorage.clear();
                    break;
                default:
                    return
            }
            window.localStorage.__transferData && (window.localStorage.__transferData = !0)
        }
    }
    class Ka {}
    Ka.syncLocalStorage = Ba;
    class Ja extends Ka {
        constructor() {
            super(), this.objectSyncer = new Fa
        }
        register(e, t, n = {}, o = "", i = !1) {
            if ("object" != typeof n || Array.isArray(n)) return;
            const r = window.fetcher.postMessage.bind(window.fetcher);
            switch (e) {
                case "custom":
                    switch (t) {
                        case "localStorage":
                            Ja.syncLocalStorage();
                            break;
                        default:
                            throw new Error("Unknown property name!")
                    }
                    break;
                case We.Object:
                    {
                        const e = this.objectSyncer.register(n, t, r);
                        return i && r({
                            data: {
                                value: window.VWO._.native.JSON.stringify(n),
                                path: t
                            },
                            type: "sync",
                            syncType: We.OverWrite
                        }),
                        e
                    }
                case We.Property:
                    ja.register(n, o, t, r);
                    break;
                case We.Document:
                    $a.register(t, r);
                    break;
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            }
        }
        append(e, t) {
            return this.objectSyncer.append(e, t)
        }
        static sync(e, t) {
            var n;
            const {
                data: o
            } = e;
            if ("object" != typeof e.syncType || "custom" !== e.syncType.type) switch (e.syncType) {
                case We.Object:
                    {
                        o.value = Da.parse(o.value);
                        const e = o.path.substring(0, o.path.lastIndexOf(".")).split(".");window[e[0]] = Fa.sync(window[e[0]], o.value, e[0], e.splice(1), t);
                        break
                    }
                case We.Document:
                    $a.sync(o);
                    break;
                case We.Property:
                case We.Variable:
                    t(o);
                    break;
                case We.OverWrite:
                    if (!("__transferData" in (null !== (n = window[o.path]) && void 0 !== n ? n : {}))) return void(window[o.path] = window.VWO._.native.JSON.parse(o.value));
                    window[o.path] = Fa.getProxy(window.VWO._.native.JSON.parse(o.value), t, o.path);
                    break;
                case We.Delete:
                    {
                        const e = window.VWO._.native.JSON.parse(o),
                            t = e.path.substring(0, e.path.lastIndexOf(".")).split(".").reduce(((e, t) => Object.keys(e).length ? e[t] : window[t]), {}),
                            n = e.key;n in t && (t.__transferData = !1, delete t[n], t.__transferData = !0);
                        break
                    }
                default:
                    console.error("Unknown 'syncAblesEnum' type!")
            } else switch (e.syncType.method) {
                case "localStorage":
                    Ha(e);
                    break;
                default:
                    return
            }
        }
        declare(e, t) {
            ja.register(window, "window", e, t)
        }
    }
    const qa = (e, t) => {
        if (e && "function" == typeof e && e.bind) try {
            e = e.bind(t)
        } catch (t) {
            if (/(cannot be invoked without 'new')|(Cannot call a class constructor without |new|)/i.test(t.message)) return e;
            console.error(t)
        }
        return e
    };

    function Ya(e, t, n = {}) {
        if ("window" === e) return window;
        let o = window;
        const {
            captureGroups: i = null,
            filter: r
        } = n, s = e.split("."), a = s.length;
        for (let e = 0; e < a; e++) {
            let t = s[e];
            if (t.endsWith(")")) {
                const e = t.substring(0, t.indexOf("("));
                let n = t.substring(t.indexOf("("));
                n = "[" + n.slice(1, n.length - 1) + "]";
                const r = n.slice(1, n.length - 1).split(",");
                r.forEach(((e, t) => {
                    e.startsWith('"') || (r[t] = '"vwoCurrThreadRef' + e + '"')
                }));
                const s = window.VWO._.native.JSON.parse(n, ((e, t) => {
                    let n;
                    if ("string" == typeof t) {
                        if (n = t.match(/\${{([0-9]*)}}/)) return i[n[1] - 1];
                        if (n = t.match(/vwoCurrThreadRef(.*)/)) return Ya(n[1])
                    }
                    return t
                }));
                o = o[e](...s)
            } else {
                let e = !1;
                t.endsWith("?") && (t = t.slice(0, -1), e = !0);
                const n = o[t];
                if (o = qa(n, o), e && null == o) return o
            }
        }
        if (r) {
            const e = {};
            r.forEach((t => {
                e[t] = o[t]
            })), o = e
        }
        return o
    }
    const Xa = function(e) {
            return window.functionWrapper.unwrap(e.id)(...Da.parse(e.args))
        },
        za = function(e) {
            var t, n;
            return c(this, void 0, void 0, (function*() {
                switch (e.type) {
                    case "callWrappedFunction":
                        {
                            let t = Xa(e);
                            return t && "function" == typeof t.then && (t = yield t),
                            Da.stringify(t)
                        }
                    case "vwoClassInstanceBridge":
                        {
                            const t = e.path.dest.lastIndexOf(".");
                            let n = window,
                                o = e.path.dest; - 1 !== t && (n = Ya(e.path.dest.slice(0, t)), o = e.path.dest.substr(t + 1));
                            const i = n[o],
                                [r, s] = new i(...e.args);
                            return s.otherSide = (...t) => {
                                const n = e.path.src + "." + r + "." + t[0];
                                return t[0] = n, window.fetcher.getValue(...t)
                            },
                            "" + r
                        }
                    default:
                        {
                            let o, i;
                            if ("setValue" === (e = Da.parse(e)).type) {
                                -1 == e.path.lastIndexOf(".") && (e.path = "window." + e.path);
                                const t = e.path;
                                e.path = t.slice(0, t.lastIndexOf(".")), o = t.slice(t.lastIndexOf(".") + 1)
                            }(null === (t = e.config) || void 0 === t ? void 0 : t.captureGroups) && (e.config.captureGroups = Da.parse(e.config.captureGroups));
                            const r = i = Ya(e.path, e.args, null == e ? void 0 : e.config);
                            return (null === (n = e.config) || void 0 === n ? void 0 : n.constructable) ? i = new r(...e.args) : "function" == typeof r && (i = r(...e.args || [])),
                            o && (i = r[o] = e.val),
                            i = yield i,
                            Da.stringify(i)
                        }
                }
            }))
        };
    class Qa {}
    class Za extends Qa {
        init() {
            this.isMTInstance = !!D((() => window.mainThread.webWorker)), this.thread = this.isMTInstance ? window.vwoChannelFW : null === window || void 0 === window ? void 0 : window.workerThread, this.request = Ga, this.response = ka, this.isMTInstance ? this.thread.port1.onmessage = this.onMessage.bind(this) : (this.thread.onmessage = this.isMessageChannel(this.thread) && this.onMessage.bind(this), this.auxiliaryMessageHandler())
        }
        auxiliaryMessageHandler() {
            const e = this,
                t = function(n) {
                    const {
                        vwoChannelToW: o,
                        vwoChannelFW: i
                    } = n.data;
                    o && i && (window.vwoChannelToW = o, window.vwoChannelFW = i, e.thread = o, e.thread.onmessage = e.onMessage.bind(e), self.removeEventListener("message", t))
                };
            self.addEventListener("message", t)
        }
        isMessageChannel(e) {
            return e && e.port1 instanceof MessagePort && e.port2 instanceof MessagePort
        }
        postMessage(e) {
            try {
                this.isMTInstance ? window.vwoChannelToW.port2.postMessage(e) : window.vwoChannelFW.postMessage(e)
            } catch (e) {
                console.error(e)
            }
        }
        onMessage(e) {
            var t, n, o, i;
            const {
                data: r
            } = e;
            switch (r.type) {
                case "initDone":
                    window.vwo_initDone(r);
                    break;
                case "request":
                    this.request(r).resolve(za);
                    break;
                case "response":
                    this.response(r).resolve(Da.parse.bind(Da));
                    break;
                case "sync":
                    {
                        let e = () => null;
                        switch (r.syncType) {
                            case We.OverWrite:
                            case We.Object:
                                e = this.postMessage.bind(this);
                                break;
                            case We.Property:
                            case We.Document:
                            case We.Variable:
                            case We.Delete:
                        }
                        Ja.sync(r, e);
                        break
                    }
                default:
                    window.VwoUnitTestsRunning && ("unit-test" === r.type ? eval(r.code) : "unit-test-result" === r.type && (null === (n = null === (t = window.PromiseResolver) || void 0 === t ? void 0 : t[r.id]) || void 0 === n || n.resolve(r))), null === (i = (o = this.thread)._onMessage) || void 0 === i || i.call(o, e)
            }
        }
        getValue(e, t, n = {}) {
            let o;
            (null == n ? void 0 : n.captureGroups) && (o = Da.stringify(n.captureGroups));
            const i = {
                path: e,
                args: t,
                config: Object.assign(Object.assign({}, n), {
                    captureGroups: o
                })
            };
            return this.request(Da.stringify(i)).send().catch((() => {}))
        }
        setValue(e, t) {
            const n = {
                type: "setValue",
                path: e,
                val: t
            };
            return this.request(Da.stringify(n)).send().catch((() => {}))
        }
    }
    const ed = Za;
    window.fetcher = new ed;
    class td {
        constructor() {
            this.storageLookUpKey = "_vwo_store_content"
        }
        otherSide(...e) {
            return e[0] = "VWO.modules.vwoUtils.contentSync." + e[0], e[2] && (e[2] = {
                captureGroups: e[2]
            }), window.fetcher.getValue(...e)
        }
    }
    class nd extends td {
        constructor() {
            super(...arguments), this.collectedData = {}, this.requestsChecker = {}
        }
        updateStorage() {
            return c(this, void 0, void 0, (function*() {
                if (!this.response) return;
                const e = window.VWO._.native.JSON.parse(this.response);
                Ne(e).length && (yield window.fetcher.getValue("VWO._.contentSyncService.updateStorage", [e]))
            }))
        }
        syncGet(e, t, n = !0) {
            return c(this, void 0, void 0, (function*() {
                return yield window.fetcher.getValue('VWO._.contentSyncService.syncGet("${{1}}", "${{2}}", "${{3}}", "${{4}}")', null, {
                    captureGroups: [e, t, n, !0]
                })
            }))
        }
        syncFromBackend(e, t, n, o) {
            const [i, r] = e.split(".");
            if (this.collectedData[i] = this.collectedData[i] || {}, this.collectedData[i][r] = this.collectedData[i][r] || [], this.requestsChecker[n]) return;
            this.requestsChecker[n] = 1, this.collectedData[i][r].push(t);
            const s = this;
            this.debouncedCall = this.debouncedCall || de((function() {
                return c(this, void 0, void 0, (function*() {
                    $({
                        url: o + "sync?a=" + window._vwo_acc_id,
                        data: window.VWO._.native.JSON.stringify(s.collectedData),
                        success: s.updateStorage
                    }), s.collectedData = {}
                }))
            }), 10), this.debouncedCall()
        }
    }
    window.VWO.modules.vwoUtils.contentSync = new nd;
    class od {
        get(e) {
            return this[e]
        }
        set(e, t) {
            this[e] = t
        }
    }
    var id = new od,
        rd;
    ! function(e) {
        e[e.EXCLUDE_PASSED = 1] = "EXCLUDE_PASSED", e[e.INCLUDE_PASSED = 2] = "INCLUDE_PASSED", e[e.INCLUDE_FAILED = 3] = "INCLUDE_FAILED"
    }(rd || (rd = {}));
    var sd = rd,
        ad;
    ! function(e) {
        e.OR = "o", e.AND = "a"
    }(ad || (ad = {}));
    var dd = ad;
    class cd {
        constructor() {
            this.experimentConfig = {}, this.pageConfig = {}, this.experimentConfigCache = {}, this.pageConfigCache = {}, this.previewParamsCleanedUrlCache = {}, cd.cleanerRegex = /(^https?:\/\/)?(w{3}\.)?(.*?)?((?:\/)(?:home|default|index)\.\w{3,4})?(\/)?([?#].*)?$/i, cd.logicalOperators = [dd.AND, dd.OR]
        }
        static get currentUrl() {
            return window.location.href
        }
        add(e, t) {
            if (Rr.debug("Adding pageGroup config to phoenix"), ke(e) && (Object.hasOwnProperty.call(e, "ec") && e.ec.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.experimentConfig[t] || (this.experimentConfig[t] = e[t])
                })), Object.hasOwnProperty.call(e, "pc") && e.pc.forEach((e => {
                    const t = Object.keys(e)[0];
                    this.pageConfig[t] || (this.pageConfig[t] = e[t])
                }))), ke(t)) {
                if (xe(t.pc)) {
                    const e = this.getCache(cd.currentUrl, !0);
                    t.pc.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: sd.INCLUDE_PASSED,
                            cacheHit: !0
                        }
                    }))
                }
                if (xe(t.ec)) {
                    const e = this.getCache(cd.currentUrl);
                    t.ec.forEach((t => {
                        e[t] = {
                            didMatch: !0,
                            reason: sd.INCLUDE_PASSED,
                            cacheHit: !0
                        }
                    }))
                }
            }
        }
        getCache(e, t) {
            return t ? (this.pageConfigCache = this.pageConfigCache || {}, this.pageConfigCache[e] = this.pageConfigCache[e] || {}, this.pageConfigCache[e]) : (this.experimentConfigCache = this.experimentConfigCache || {}, this.experimentConfigCache[e] = this.experimentConfigCache[e] || {}, this.experimentConfigCache[e])
        }
        getPreviewParamsCleanedUrl(e) {
            return e ? (this.previewParamsCleanedUrlCache = this.previewParamsCleanedUrlCache || {}, this.previewParamsCleanedUrlCache[e] || (this.previewParamsCleanedUrlCache[e] = id.get("jsLibUtils").getCleanedUrl(e, !0)), this.previewParamsCleanedUrlCache[e]) : e
        }
        getIndexFileCleanedUrl(e) {
            return e ? (this.indexFileCleanedUrlCache = this.indexFileCleanedUrlCache || {}, this.indexFileCleanedUrlCache[e] || (this.indexFileCleanedUrlCache[e] = e.replace(cd.cleanerRegex, "$1$2$3$5$6")), this.indexFileCleanedUrlCache[e]) : e
        }
        validatePage(e, t, n, o) {
            const i = t ? this.pageConfig[e] : this.experimentConfig[e];
            if (!i) return Rr.info(`ConfigId ${e} is not present inside ${t?"pageConfig":"experimentConfig"}`), {
                didMatch: !1,
                reason: sd.INCLUDE_FAILED,
                cacheHit: !1
            };
            const r = n || cd.currentUrl,
                s = this.getCache(r, t);
            if (s && Object.hasOwnProperty.call(s, e)) return Rr.info(`Fetching value from cache for ${t?"pageConfigId":"experimentConfigId"} = ${e}`), s[e].cacheHit = !0, s[e];
            let a;
            const d = i.exc,
                c = i.inc;
            if (Array.isArray(d) && d.length > 0) {
                const t = this.evaluateDSL(d, r, o || !1);
                if (t) return a = {
                    didMatch: !t,
                    reason: sd.EXCLUDE_PASSED,
                    cacheHit: !1
                }, o || (s[e] = a), a
            }
            if (Array.isArray(c))
                if (c.length) {
                    const e = this.evaluateDSL(c, r, o || !1);
                    a = e ? {
                        didMatch: e,
                        reason: sd.INCLUDE_PASSED,
                        cacheHit: !1
                    } : {
                        didMatch: e,
                        reason: sd.INCLUDE_FAILED,
                        cacheHit: !1
                    }
                } else a = {
                    didMatch: !0,
                    reason: sd.INCLUDE_PASSED,
                    cacheHit: !1
                };
            return a = a || {
                didMatch: !1,
                reason: sd.INCLUDE_FAILED,
                cacheHit: !1
            }, o || (s[e] = a), a
        }
        evaluateDSL(e, t, n) {
            if (!xe(e) || e.length < 2) return Rr.error("Invalid dsl tree", e), !1;
            const o = [];
            return e.forEach((e => {
                var i;
                let r;
                if (e || (r = !1), Fe(e) && (r = e), xe(e))
                    if (cd.logicalOperators.includes(e[0])) r = this.evaluateDSL(e, t, n);
                    else {
                        const [o, s, ...a] = e, d = null === (i = Wr.plugins[Pr.OPERATOR]) || void 0 === i ? void 0 : i.get(s);
                        let c;
                        if (o.includes("url")) c = this.getIndexFileCleanedUrl(this.getPreviewParamsCleanedUrl(t));
                        else {
                            const e = a[0];
                            c = this.validatePage(e, !0, t, n).didMatch, a[0] = !0
                        }
                        r = null == d ? void 0 : d(c, ...a, {
                            jsLibUtils: id.get("jsLibUtils"),
                            pageUrl: !0
                        })
                    }
                o.push(r || !1)
            })), this.evaluateTree(o)
        }
        evaluateTree(e) {
            let t = !1;
            switch (e[0]) {
                case dd.AND:
                    t = !e.includes(!1);
                    break;
                case dd.OR:
                    t = e.includes(!0)
            }
            return t
        }
    }
    var ld = new cd;
    const ud = {
            UNKNOWN_SET_API_TYPE: "Unknown type '{{type}}' found in set API.",
            EVENTS: {
                ALREADY_EXISTS: "Event with name '{{eventName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Event with name '{{eventName}}' has not been registered yet. Please use 'add' API to register it."
            },
            OPERATORS: {
                ALREADY_EXISTS: "Operator with name '{{operatorName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Operator with name '{{operatorName}}' has not been registered yet. Please use 'add' API to register it."
            },
            FORMULAS: {
                ALREADY_EXISTS: "Formula with name '{{formulaName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Formula with name '{{formulaName}}' has not been registered yet. Please use 'add' API to register it."
            },
            STORAGES: {
                ALREADY_EXISTS: "Storage with name '{{storageName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Storage with name '{{storageName}}' has not been registered yet. Please use 'add' API to register it."
            },
            TAGS: {
                ALREADY_EXISTS: "Tag with name '{{tagName}}' already exists. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Tag with name '{{tagName}}' has not been registered yet. Please use 'add' API to register it."
            },
            EVENT_PROP: {
                ALREADY_EXISTS: "Event property with name '{{propName}}' already exists for event '{{eventName}}'. Please use 'update' API if you want to override it.",
                NOT_REGISTERED: "Event property with name '{{propName}}' has not been registered yet for event '{{eventName}}'. Please use 'add' API to register it."
            }
        },
        wd = {
            EVENTS: {
                NO_EVENT_TO_REMOVE: "Unable to remove Event '{{eventName}}' as it's not been registered."
            },
            OPERATORS: {
                NO_OPERATOR_TO_REMOVE: "Unable to remove Operator '{{operatorName}}' as it's not been registered."
            },
            FORMULAS: {
                NO_FORMULA_TO_REMOVE: "Unable to remove Formula '{{formulaName}}' as it's not been registered."
            },
            STORAGES: {
                NO_STORAGE_TO_REMOVE: "Unable to remove Storage '{{storageName}}' as it's not been registered."
            },
            TAGS: {
                NO_TAG_TO_REMOVE: "Unable to remove Tag '{{tagName}}' as it's not been registered."
            },
            EVENT_PROP: {
                NO_EVENT_PROP_TO_REMOVE: "Unable to remove Event property '{{propName}}' for event '{{eventName}}' as it's not been registered."
            }
        };
    class _d extends Dr {
        constructor() {
            super(), this.pluginName = Pr.OPERATOR, this.operators = {}
        }
        add(e, t) {
            Rr.debug(`Adding operator '${e}' in OperatorsManager`), this.operators[e] ? Rr.error(ud.OPERATORS.ALREADY_EXISTS, {
                operatorName: e
            }) : this.operators[e] = t
        }
        update(e, t) {
            Rr.debug(`Updating operator '${e}' in OperatorsManager`), this.operators[e] = t
        }
        get(e) {
            return Rr.debug(`Getting operator '${e}' in OperatorsManager`), this.operators[e] ? this.operators[e] : (Rr.error(ud.OPERATORS.NOT_REGISTERED, {
                operatorName: e
            }), null)
        }
        remove(e) {
            Rr.debug(`Removing operator '${e}' in OperatorsManager`), this.operators[e] ? delete this.operators[e] : Rr.warn(wd.OPERATORS.NO_OPERATOR_TO_REMOVE, {
                operatorName: e
            })
        }
        removeAll() {
            Rr.debug("Removing all operators in OperatorsManager"), this.operators = {}
        }
        initialize(e) {
            Object.assign(this.operators, e)
        }
    }
    var pd = new _d,
        gd, hd;
    ! function(e) {
        e.EQUAL = "eq", e.NOT_EQUAL = "neq", e.EQUAL_CASE_SENSITIVE = "eqs", e.NOT_EQUAL_CASE_SENSITIVE = "neqs", e.REGEX = "reg", e.REGEX_CASE_SENSITIVE = "regs", e.CONTAINS = "cn", e.NOT_CONTAINS = "ncn", e.BLANK = "bl", e.NOT_BLANK = "nbl", e.GREATER_THAN = "gt", e.LESS_THAN = "lt", e.GREATER_THAN_EQUAL = "gte", e.LESS_THAN_EQUAL = "lte", e.IN = "in", e.NOT_IN = "nin", e.EXEC = "exec", e.SELECTOR = "sel", e.IN_LOCATION = "inloc", e.NOT_IN_LOCATION = "ninloc", e.URL_REGEX = "urlReg", e.NOT_URL_REGEX = "nUrlReg", e.RANGE_COMPARISON = "rg", e.PAGE_CONFIG_EVALUATION = "pgc"
    }(gd || (gd = {})),
    function(e) {
        e.PAGE = "PAGE", e.EVENT = "EVENT", e.JS_VARIABLE = "JS_VARIABLE"
    }(hd || (hd = {}));
    const vd = {
        [gd.EQUAL]: (e, t) => String(e).toLowerCase() === String(t).toLowerCase(),
        [gd.NOT_EQUAL]: (e, t) => !vd[gd.EQUAL](e, t),
        [gd.EQUAL_CASE_SENSITIVE]: (e, t) => String(e) === String(t),
        [gd.NOT_EQUAL_CASE_SENSITIVE]: (e, t) => !vd[gd.EQUAL_CASE_SENSITIVE](e, t),
        [gd.REGEX](e, t) {
            try {
                return new RegExp(t, "i").test(String(e))
            } catch (e) {
                return !1
            }
        },
        [gd.URL_REGEX](e, t, n) {
            const o = null == n ? void 0 : n.jsLibUtils;
            return o ? o.verifyUrl(e, t, null, null == n ? void 0 : n.pageUrl) : vd[gd.REGEX](e, t)
        },
        [gd.NOT_URL_REGEX]: (e, t, n) => !vd[gd.URL_REGEX](e, t, n),
        [gd.REGEX_CASE_SENSITIVE](e, t) {
            try {
                return new RegExp(t).test(String(e))
            } catch (e) {
                return !1
            }
        },
        [gd.CONTAINS]: (e, t) => String(e).toLowerCase().includes(String(t).toLowerCase()),
        [gd.NOT_CONTAINS]: (e, t) => !vd[gd.CONTAINS](e, t),
        [gd.BLANK]: e => !e,
        [gd.NOT_BLANK]: e => !vd[gd.BLANK](e),
        [gd.GREATER_THAN](e, t) {
            if (!ke(e) || !ke(t)) return !1;
            const n = +e,
                o = +t;
            return Ge(n) && Ge(o) && n > o
        },
        [gd.GREATER_THAN_EQUAL](e, t) {
            if (!ke(e) || !ke(t)) return !1;
            const n = +e,
                o = +t;
            return Ge(n) && Ge(o) && n >= o
        },
        [gd.LESS_THAN](e, t) {
            if (!ke(e) || !ke(t)) return !1;
            const n = +e,
                o = +t;
            return Ge(n) && Ge(o) && n < o
        },
        [gd.LESS_THAN_EQUAL](e, t) {
            if (!ke(e) || !ke(t)) return !1;
            const n = +e,
                o = +t;
            return Ge(n) && Ge(o) && n <= o
        },
        [gd.NOT_IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let o = 0; o < t.length; o++) {
                const i = t[o];
                if (i === e.countryCode || i === `${e.countryCode}-${e.region}` || i === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !1;
                    break
                }
                n = !0
            }
            return n
        },
        [gd.IN_LOCATION](e, t) {
            let n = !1;
            if (!t || 0 === t.length) return !1;
            for (let o = 0; o < t.length; o++) {
                const i = t[o];
                if (i === e.countryCode || i === `${e.countryCode}-${e.region}` || i === `${e.countryCode}-${e.region}-${e.city}`) {
                    n = !0;
                    break
                }
            }
            return n
        },
        [gd.IN]: (e, t) => t.map((e => String(e).toLowerCase())).includes(String(e).toLowerCase()),
        [gd.NOT_IN]: (e, t) => !vd[gd.IN](e, t),
        [gd.RANGE_COMPARISON](e, t) {
            try {
                let n = JSON.parse;
                try {
                    n = window.VWO._.native.JSON.parse || JSON.parse
                } catch (e) {}
                const o = n(e),
                    i = t.split("'")[1].split("-"),
                    r = i[0],
                    s = i[1];
                return vd[gd.GREATER_THAN_EQUAL](o[0], parseInt(r, 10)) && vd[gd.LESS_THAN_EQUAL](o[0], parseInt(s, 10))
            } catch (e) {
                return Rr.info(`RANGE OPERATOR ERROR: ${e&&e.stack}`), !1
            }
        },
        [gd.PAGE_CONFIG_EVALUATION]: (e, t) => ld.validatePage(t, !1, e).didMatch
    };
    var fd = Object.assign(vd, {
        sel(e, t) {
            try {
                return !!e.closest(t)
            } catch (e) {
                return !1
            }
        }
    });
    pd.initialize(fd);
    class Od {
        constructor() {
            this.listenerAdded = !1, this.queue = new Set
        }
        addListener(e) {
            this.queue.add(e), this.listenerAdded || (window.addEventListener("storage", (e => {
                this.queue.has(e.key) && this.otherSide("processQueue", [e.key, e.newValue])
            })), this.listenerAdded = !0)
        }
        otherSide(...e) {
            e[0] = "VWO.modules.utils.storageSyncer." + e[0], window.fetcher.getValue(...e)
        }
    }
    const Ed = new Od;

    function md(e, t) {
        window.VWO.phoenix('store.actions.addValues("${{1}}", "${{2}}")', null, {
            captureGroups: [e, t]
        })
    }
    window.VWO.modules.utils.storageSyncer = Ed;
    const Sd = function() {
            var e;
            const t = {},
                {
                    campaigns: n
                } = window.VWO._.allSettings.dataStore;
            let o = "";
            for (const e in n) {
                const i = n[e],
                    r = n[e].type,
                    s = "SPLIT_URL" === r;
                if ("FUNNEL" === r || !s && !i.eHIR && (i.ready || i.cA)) continue;
                if (i.manual) continue;
                const a = Gi.doExperimentHere(i)[0];
                if (t[e] = {}, t[e].dEH = a, a) {
                    if (s) {
                        Ye(e) || (o = window.VWO._.bodyPath + ",");
                        break
                    } {
                        let {
                            selector: n,
                            selectorPerVariation: r,
                            cPathSelector: s,
                            cPathSelectorPerVariation: a
                        } = yn.getCampaignXPath(i);
                        n = n || "", n && (t[e].xpath = {
                            selector: n,
                            selectorPerVariation: r
                        }, o.indexOf(n) > -1 || (o += n + ",")), s && (t[e].cpath = {
                            cPathSelector: s,
                            cPathSelectorPerVariation: a
                        }, -1 == o.indexOf(s) && (o += s + ","))
                    }
                }
            }
            o && (o = o.substr(0, o.length - 1), o += yn.hideElExpression, yn.insertCSS("_vis_opt_path_hides", o)), (null === (e = window._vwoCc) || void 0 === e ? void 0 : e.disableSpaVisPerf) || (window.VWO._.visibilityServiceCache = t, md({
                visibilityServiceCache: t
            }, "vwoInternalProperties"))
        },
        Td = e => !(0 !== e && !e),
        Cd = (e, t, n) => n.syncGet("fns.list", [e, t]),
        Id = (e, t, n) => c(void 0, void 0, void 0, (function*() {
            if (!Td(e)) return !1;
            const o = yield Cd(e, t, n);
            return !!o.dataPresent && o.val
        })),
        yd = (e, t, n) => c(void 0, void 0, void 0, (function*() {
            if ("" === e || !Td(e)) return !1;
            const o = yield Cd(e, t, n);
            return !!o.dataPresent && !o.val
        })),
        Ad = {
            f_in_list: Id,
            f_nin_list: yd
        },
        Nd = function(e) {
            var t;
            return c(this, void 0, void 0, (function*() {
                try {
                    ye("jI"), e._.allSettings.dataStore.vwoData = e._.allSettings.dataStore.vwoData || {};
                    const n = e._.allSettings.tags;
                    Object.keys(n).forEach((e => {
                        n[e].fn = Do(n[e].fn)
                    })), Ra(e);
                    const o = [];
                    let i;
                    o.push(null), o.push(ia.getPhoenixConfig()), window.fetcher.getValue('setVWO("${{1}}")', null, {
                        captureGroups: [e]
                    }), window.fetcher.setValue("fakeWindow.VWOSettings", o), window.fetcher.setValue("window._vwoCc", window._vwoCc);
                    const r = window.VWO._.allSettings.dataStore.CIF,
                        s = window.VWO._.cookies.get("_vwo_uuid");
                    if (r)
                        if (s) i = s;
                        else if (i = r(), !i) return void window._removeVwoGlobalStyle();
                    window.VWO._.allSettings.dataStore.uuid = window._vwo_uuid = i || D((() => window.VWO._.allSettings.dataStore.uuid)), window.fetcher.setValue("window._vwo_uuid", window._vwo_uuid), window._vwoCc && window.fetcher.setValue("window._vwoCc", window._vwoCc);
                    const [a, d] = sa();
                    e.phoenix = a, ia.postPhoenixMTHook();
                    const u = new Ja;
                    if (window._vwo_exp = u.register(We.Object, "_vwo_exp", window._vwo_exp, "", !1), window.VWO._.allSettings.dataStore.campaigns = window._vwo_exp, u.register(We.Document, "cookie"), u.register("custom", "localStorage"), window.VWO._.phoenixMT.trigger("vwo_phoenixInitCalled"), window._vis_debug) {
                        const e = Object.keys(window._vwo_exp)[0];
                        window._vwo_exp[e].debug.v = yn.getSelectedVariationForPreviewMode(window._vwo_exp[e])
                    }
                    const [w, _] = yield d;
                    window.VWO._.phoenixMT.on(l.SPA_VISIBILITY_SERVICE, Sd), e.data.tB = !0, e.addPhoenix(w), window.vwo_cInstJS && (e._.insightsOnConsentPromise = new Promise((e => {
                        window.VWO.phoenix('on("${{1}}", "${{2}}")', null, {
                            captureGroups: ["trigger.InsightsOnConsentTrigger", e]
                        })
                    }))), ba.init("jslib", e, null), ba.init("optOut", e, null), window._vwo_surveySettings = u.register(We.Object, "_vwo_surveySettings", window._vwo_surveySettings), window.VWO._.track = u.register(We.Object, "tracklib", window.VWO._.track, "", !1), window.VWO._.insightsUtils = u.register(We.Object, "insightsUtils", window.VWO._.insightsUtils, "", !1), id.set("jsLibUtils", {
                        verifyUrl: function() {
                            return Mi.verifyUrl.apply(Mi, arguments)
                        },
                        getCleanedUrl: function() {
                            return Mi.getCleanedUrl.apply(Mi, arguments)
                        }
                    }), Wr.register(pd), pd.add("inlist", (function(e, t) {
                        return c(this, void 0, void 0, (function*() {
                            return !!(yield Ad.f_in_list(e, t, window.VWO.modules.vwoUtils.contentSync))
                        }))
                    })), pd.add("ninlist", (function(e, t) {
                        return c(this, void 0, void 0, (function*() {
                            return !!(yield Ad.f_nin_list(e, t, window.VWO.modules.vwoUtils.contentSync))
                        }))
                    })), e.pageGroup = ld;
                    const {
                        pages: p,
                        pagesEval: g
                    } = e._.allSettings;
                    e.pageGroup.add(p, g), vt.init(), window.fetcher.getValue("VWO.modules.vwoUtils.referrer.init"), la.finish(), window.VWO._.phoenixMT.trigger("vwo_phoenixInitialized"), window.VwoUnitTestsRunning && (null === (t = window.resolveUnitTestPromise) || void 0 === t || t.call(window));
                    const h = window.VWO._.phoenixMT.on("vwo_urlChangeMt", (() => {
                        if (window.VWO._.phoenixMT.off(h), "object" != typeof window.VWO._.txtCfg || !window.VWO._.txtCfg.tn) return;
                        window.VWO._.txtCfg.o && window.VWO._.txtCfg.o.d(), window.VWO._.txtCfg.f(window.VWO._.txtCfg.tn);
                        const e = Object.assign({}, window.VWO._.txtCfg);
                        delete e.o, delete e.f, window.fetcher.setValue("window.VWO._.txtCfg", e)
                    }));
                    Yn()
                } catch (e) {
                    window._removeVwoGlobalStyle(), window.vwo_libExecuted = !0, d.error("Error in bootPhoenix:", e.stack)
                }
            }))
        },
        Vd = {},
        bd = function(e, t, n, o = {
            allowReload: !1
        }) {
            if (!(R() && e.indexOf("get_debugger_ui") < 0 || Vd[e])) {
                o.allowReload || (Vd[e] = 1);
                var i = document.createElement("script");
                i.src = e, i.type = "text/javascript", window.VWO.nonce && (i.nonce = window.VWO.nonce), t = t || function() {}, n = (n = n || function() {}) || function() {}, i.onerror = function() {
                    window.VWO._.gcpfb && window.VWO._.gcpfb(e, window.VWO.modules.utils.loadScript, null, t, n) || t()
                }, o.defer && (i.defer = o.defer), i.onload = n, document.getElementsByTagName("head")[0].appendChild(i), i.parentNode ? i.parentNode.removeChild(i) : window.setTimeout((function() {
                    i.parentNode && i.parentNode.removeChild(i)
                }), 100)
            }
        };
    window.VWO.modules.utils.loadScript = bd;
    const Rd = e => {
            e._.allSettings.triggers[A] = {
                cnds: ["a", {
                    id: 2,
                    event: l.SSR_COMPLETE
                }, {
                    event: l.NOT_REDIRECTING,
                    id: 4,
                    filters: {}
                }, {
                    event: l.VISIBILITY_TRIGGERED,
                    id: 5,
                    filters: {}
                }, {
                    event: l.PAGE_VIEW,
                    id: 1e3,
                    filters: {}
                }],
                dslv: 2
            }
        },
        Ld = function(e, t) {
            window._vwo_exp = e._.allSettings.dataStore.campaigns, e._.coreLib = {
                lS: bd
            };
            const n = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/";

            function o(e, t) {
                var n;
                if (!(null === (n = window.VWO.consentMode) || void 0 === n ? void 0 : n.wFC)) return;
                const o = ["o", {
                        filters: [
                            [`storage.cookies._vis_opt_exp_${t}_combi`, "nbl"]
                        ],
                        id: 500,
                        event: l.PAGE_VIEW
                    }, {
                        filters: [
                            ["window.VWO.consentMode.dT", "neq", !0]
                        ],
                        event: l.COOKIE_CONSENT_ACCEPTED,
                        id: +new Date
                    }],
                    i = window.VWO._.allSettings.triggers[e].cnds;
                1 === i.length ? i[0] = ["a", i[0], o] : i.push(o)
            }

            function i(t) {
                e._.allSettings.triggers.customPreviewTrigger = {
                    cnds: ["a", {
                        event: l.PAGE_VIEW,
                        id: +new Date
                    }, {
                        event: l.VISIBILITY_TRIGGERED,
                        id: +new Date
                    }]
                }, o("customPreviewTrigger", t), e._.allSettings.rules.push({
                    triggers: ["customPreviewTrigger"],
                    tags: [{
                        priority: 4,
                        data: `campaigns.${t}`,
                        id: "runCampaign"
                    }]
                });
                const n = e._.allSettings.dataStore.campaigns[t].triggers[0];
                if (delete e._.allSettings.triggers[n], e._.allSettings.dataStore.campaigns[t].triggers[0] = "customPreviewTrigger", yn.isPersonalizeCampaign(_vwo_exp[t]))
                    for (const t in e._.allSettings.triggers) {
                        const o = e._.allSettings.triggers[t].cnds;
                        if (Array.isArray(o))
                            for (const e of o)(null == e ? void 0 : e.event) && e.event.indexOf(`trigger.${n}`) > -1 && (e.event = "trigger.customPreviewTrigger")
                    }
            }
            Rd(e), window.vwo_cInstJS && (e._.allSettings.tags.ctInsightsOnConsent = {}, e._.allSettings.tags.ctInsightsOnConsent.fn = window.vwo_cInstJS, e._.allSettings.triggers.InsightsOnConsentTrigger = {
                cnds: [{
                    event: "vwo_postInit",
                    filters: [
                        [
                            ["tags.ctInsightsOnConsent"], "exec"
                        ]
                    ],
                    id: +new Date
                }]
            }), ia.setFunnelExps();
            const r = e._.allSettings.dataStore.previewExtraSettings;
            if (!r || "object" != typeof r) {
                if (Vt())
                    for (const t in e._.allSettings.dataStore.campaigns) i(t);
                return t(e), !1
            }
            const s = Ne(r);
            if (!s.length) return t(e), !1;
            const a = s[0],
                c = r[a].debug.s,
                u = r[a].debug.tg;
            for (var w in window._vwo_exp) window._vis_debug = !0, window.fetcher.setValue("fakeWindow._vis_debug", window._vis_debug), r[w] ? (_vwo_exp[w].previewHash = r[w].previewHash, _vwo_exp[w].debug = r[w].debug, r[w].debug.url && (_vwo_exp[w].url = decodeURIComponent(r[w].debug.url))) : delete _vwo_exp[w];
            let _;
            Ia(window._vwo_exp, r), Object.keys(e._.allSettings.dataStore.campaigns).length || d.error("Preview mode opened but no campaigns served");
            const p = window.name.indexOf("_vis_heatmap_") >= 0 || window._vwo_tm.indexOf("_vis_heatmap_") >= 0;
            if (!c || p) {
                const e = p ? s : [a];
                for (let t = 0; t < e.length; t++) i(e[t])
            }
            var g;
            if (g = a, e._.allSettings.triggers.customSegmentTestTrigger = {
                    cnds: [{
                        event: "checkSegmentation",
                        id: +new Date
                    }]
                }, e._.allSettings.rules.push({
                    triggers: ["customSegmentTestTrigger"],
                    tags: [{
                        data: `campaigns.${g}`,
                        id: "segmentEligibilityTest"
                    }],
                    occurance: 1
                }), function(t) {
                    e._.allSettings.triggers.customPatternTestTrigger = {
                            cnds: [{
                                id: +new Date,
                                event: l.PAGE_VIEW
                            }]
                        }, o("customPatternTestTrigger", t), e._.allSettings.rules.push({
                            triggers: ["customPatternTestTrigger"],
                            tags: [{
                                id: "compareUrlAndFireResultantEvent"
                            }]
                        }),
                        function() {
                            e._.allSettings.triggers.customVisibilityServiceTrigger = {
                                cnds: ["a", {
                                    id: +new Date,
                                    event: "vwo_groupCampTriggered"
                                }, {
                                    id: +new Date,
                                    event: "executePatternMatching"
                                }]
                            };
                            const t = e._.allSettings.rules;
                            e._.allSettings.rules = t.map((e => ("visibilityService" === e.tags[0].id && (e.triggers = ["customVisibilityServiceTrigger"]), e)))
                        }()
                }(a), !u) {
                const t = window._vwo_exp[a].debug.v;
                e._.allSettings.dataStore.campaigns[a].sections[1].triggers[t] && (e._.allSettings.dataStore.campaigns[a].sections[1].triggers[t] = "customPreviewTrigger")
            }
            if (window._vwo_surveySettings && !c) {
                const e = Ne(window._vwo_surveySettings);
                e.length && window._vwo_surveySettings[e[0]].t && (window._vwo_surveySettings[e[0]].t = "customPreviewTrigger")
            }
            if (p) {
                const e = D((() => window.VWO._.allSettings.dataStore.plugins.LIBINFO.HEATMAP_HELPER.HASH)),
                    t = `${n}7.0/heatmap.helper.js`,
                    o = `${window._vwo_cdn}7.0/heatmap.helper-${e}.js`;
                _ = tt ? o : t, window._vis_opt_heatmap = 1
            } else {
                if ("SURVEY" === e._.allSettings.dataStore.campaigns[a].type) return window.fetcher.setValue("fakeWindow._vwo_surveySettings", window._vwo_surveySettings), t(e), !0;
                if (window.VWO_d && window.VWO_d.bootDebugger) return t(e), !0;
                _ = `${n}7.0/debugger.js`
            }
            return bd(_, null, (function() {
                t(e)
            })), !0
        };
    class Wd {
        constructor() {
            this.id = 0, this.store = {}
        }
        wrap(e, t) {
            const n = this.id++;
            return this.store = this.store || {}, this.store[n] = t ? e.bind(t) : e, n
        }
        unwrap(e) {
            return this.store[e]
        }
    }
    const Pd = {
            primary: (e, t, n = !1, o, i) => new Proxy(t, {
                construct(t, r) {
                    this.store = this.store || ["1"];
                    const s = new t(...r),
                        a = this.store.length;
                    this.store.push(s);
                    let d = r;
                    n && (d = o(s)), Object.defineProperty(s, "otherSideCreated", {
                        value: !1,
                        enumerable: !1,
                        writable: !0
                    }), s.otherSide = (...e) => s.otherSideCreated.then((() => s.otherSide(...e).then((e => e))));
                    const c = {
                        type: "vwoClassInstanceBridge",
                        id: a,
                        args: d,
                        path: e
                    };
                    return s.otherSideCreated = new Promise((t => {
                        window.fetcher.request(c).send().then((n => {
                            s.otherSide = (...t) => {
                                const o = e.dest + "." + n + "." + t[0];
                                return t[0] = o, window.fetcher.getValue(...t)
                            }, t(null), i && i(n)
                        }))
                    })), s
                },
                get(e, t) {
                    return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
                }
            }),
            secondary: (e, t, n) => new Proxy(t, {
                construct(e, t) {
                    this.store = this.store || ["1"];
                    const o = new e(...t),
                        i = this.store.length;
                    return this.store.push(o), n && n(o), [i, o]
                },
                get(e, t) {
                    return "symbol" == typeof t || isNaN(+t) ? e : this.store[t]
                }
            })
        },
        Dd = {
            "event.target": e => D((() => e.target)) || null,
            "event.target.innerText": e => D((() => e.target.innerText.trim())) || "",
            "event.targetUrl": e => D((() => e.targetUrl)) || "",
            "page.url": () => D((() => ft.page.url)) || ""
        };

    function xd(e, t) {
        if (Qe && Dd[e]) return Dd[e](t);
        const n = e.split(".");
        let o;
        switch (n[0]) {
            case "event":
                {
                    let e = t;
                    for (let t = 1; t < n.length; t++) {
                        const i = n[t];
                        o = e[i], e = o, "innerText" === i && (o = null == o ? void 0 : o.trim())
                    }
                    break
                }
            case "page":
                {
                    const e = n[1];o = ft.page[e];
                    break
                }
        }
        return o
    }

    function Ud(e, t, n) {
        const o = {},
            i = e === l.DOM_CLICK && Qe;
        for (let r = n.length - 1; r >= 0; r--) {
            const s = n[r],
                [a, d, ...c] = s.condition,
                l = xd(a, t),
                u = D((() => Wr.plugins[Pr.OPERATOR].get(d))),
                w = D((() => u(l, ...c, {
                    eventName: e,
                    triggerName: s.triggerId,
                    jsLibUtils: id.get("jsLibUtils")
                })));
            o[s.triggerName] = o[s.triggerName] || {}, o[s.triggerName][s.condId] = o[s.triggerName][s.condId] || {}, o[s.triggerName][s.condId][s.filterId] = !!w, i && ("state" in o[s.triggerName] ? o[s.triggerName].state = !(!o[s.triggerName].state || !w) : o[s.triggerName].state = !!w)
        }
        return o
    }
    window.VWO.modules.utils.triggers = {
        triggersConditionsCheck: Ud
    };
    class Md {
        constructor(e, t, n, o) {
            this.eventName = e, this.domEventName = t, this.domEventsDebounceTime = n, this.attachedFilters = o
        }
        on(e) {
            this.domEventName !== r.CLICK && this.domEventName !== r.SUBMIT && (this.domEventName === r.DOM_CONTENT_LOADED ? "interactive" === document.readyState || "complete" === document.readyState ? setTimeout((() => {
                e()
            }), 0) : window.document.addEventListener(this.domEventName, this.callback = _n((t => {
                t.preComputedConds = Ud(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0) : this.domEventName === r.SCROLL ? window.document.addEventListener(this.domEventName, this.callback = _n((t => {
                const {
                    scrollY: n,
                    innerHeight: o
                } = window, i = vwo_$(document).height(), r = 100 * n / (i - o);
                Object.assign(t, {
                    pxTop: n,
                    pxBottom: i - o - n,
                    top: r,
                    bottom: 100 - r
                }), t.preComputedConds = Ud(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0) : window.document.addEventListener(this.domEventName, this.callback = _n((t => {
                t.preComputedConds = Ud(this.eventName, t, this.attachedFilters), e(t)
            }), this.domEventsDebounceTime), !0))
        }
        off() {
            window.document.removeEventListener(this.domEventName, this.callback, !0)
        }
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.GenericDOMEvent", Md);
    class kd {}
    class Gd extends kd {
        constructor() {
            super(), this.eventName = n.LEAVE_INTENT, this.threshold = 2, this.delay = 1e3
        }
        on(e) {
            window.document.addEventListener("mouseout", this.onMouseLeave(e).bind(this)), window.document.addEventListener("mouseover", this.onMouseEnter.bind(this))
        }
        off() {
            window.document.removeEventListener("mouseout", this.mouseLeaveCallback), window.document.removeEventListener("mouseover", this.onMouseEnter)
        }
        onMouseLeave(e) {
            const t = De(window._vwoCc) && window._vwoCc.usrExitLimit || this.delay;
            return this.mouseLeaveCallback = n => {
                this.isMouseMoveUpward(n) && (Math.abs(n.offsetY || n.clientY) <= this.threshold || (this.timeout = window.setTimeout((() => e(n)), t)))
            }, this.mouseLeaveCallback
        }
        onMouseEnter() {
            clearTimeout(this.timeout)
        }
        isMouseMoveUpward(e) {
            let t = !0;
            return /\b(MSIE|Trident.*?rv:|Edge\/)(\d+)/.test(navigator.userAgent) || (t = e.clientY < 0), t && e.screenY - window.innerHeight < 0 && (e.offsetX || e.clientX) - 3 > 0 && e.clientX + 3 - window.innerWidth < 0
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.LeaveIntentEvent", Gd);
    class Fd extends kd {
        constructor(e) {
            var t;
            super(), this.eventName = n.URL_CHANGE, this.originalCallbacks = {}, this.enableSpaVisibility = !!(null === (t = window._vwoCc) || void 0 === t ? void 0 : t.enableSpaVisibility), this.events = e || ["pushState", "replaceState", "hashchange", "popstate"]
        }
        on(e) {
            this.lastExecutedURL = window.location.href, this.events.forEach((t => {
                "popstate" === t ? window.addEventListener(t, (t => {
                    const n = window.location.href;
                    this.lastExecutedURL !== n && (window.VWO._.phoenixMT.trigger("vwo_reRun"), window.VWO._.urlChangeProcessingPending = !0, yn.resetAuxDependencies(), this.lastExecutedURL = n, window._vis_opt_url = void 0, yn.fireUrlChangeWildCardEvent(), e({
                        _event: yn.filterEventObjectForWT(t),
                        location: {
                            href: window.location.href,
                            search: window.location.search,
                            hash: window.location.hash,
                            visOptUrl: window._vis_opt_url
                        }
                    }), this.enableSpaVisibility && window.VWO._.phoenixMT.trigger(l.SPA_VISIBILITY_SERVICE), window.VWO._.phoenixMT.trigger("vwo_urlChangeMt"), Yn({
                        spa: 1
                    }))
                }), !1) : (this.originalCallbacks[t] = window.history[t], window.history[t] = (...n) => {
                    window._vis_opt_url = void 0, this.originalCallbacks[t].apply(window.history, n);
                    const o = window.location.href;
                    this.lastExecutedURL !== o && (window.VWO._.phoenixMT.trigger("vwo_reRun"), window.VWO._.urlChangeProcessingPending = !0, yn.resetAuxDependencies(), this.lastExecutedURL = o, yn.fireUrlChangeWildCardEvent(), e({
                        values: n,
                        location: {
                            href: window.location.href,
                            search: window.location.search,
                            hash: window.location.hash,
                            visOptUrl: window._vis_opt_url
                        }
                    }), this.enableSpaVisibility && window.VWO._.phoenixMT.trigger(l.SPA_VISIBILITY_SERVICE), window.VWO._.phoenixMT.trigger("vwo_urlChangeMt"), Yn({
                        spa: 1
                    }))
                })
            }))
        }
        off() {
            Object.keys(this.originalCallbacks).forEach((e => {
                window.history[e] = this.originalCallbacks[e]
            }))
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.UrlChangeEvent", Fd);
    class $d {}
    class jd extends $d {
        shouldWeTriggerMetric({
            currentUrl: e
        }, t, n, o = {}) {
            const i = t.isFirst,
                {
                    excludeUrl: r,
                    pExcludeUrl: s,
                    urlRegex: a,
                    pUrl: d
                } = n;
            let c;
            c = !(r || s || a || d) || $s.isGoalEligible(n, e);
            return !(!yn.isSessionBasedCampaign2(t) && i && o.name === l.PAGE_VIEW && "CUSTOM_GOAL" === n.type) && c
        }
    }
    var Bd = new jd;
    class Hd {
        constructor() {
            this.cacheBfClick = {}
        }
        initiate(e) {
            if (Qe) return;
            const t = this,
                n = e.closest("form");
            if (n) {
                const o = t.computeStateCache();
                n.addEventListener("input", (function e() {
                    t.end(n, e)
                })), this.targetClicked = e, this.cacheBfClick = o
            }
        }
        computeStateCache() {
            const e = {},
                t = window._vwo_exp;
            return Object.keys(t).forEach((n => {
                const o = t[n];
                e[n] = o.ready
            })), e
        }
        end(e, t) {
            this.cacheBfClick = {}, this.targetClicked = this.submitter = null, e && t && e.removeEventListener("input", t)
        }
        didCampConvertInBetween(e) {
            const t = e.id;
            return this.cacheBfClick[t] !== e.ready
        }
        updateCache(e) {
            this.submitter = e
        }
        isFinished() {
            return 0 === Object.keys(this.cacheBfClick).length || this.submitter !== this.targetClicked
        }
    }
    const Kd = new Hd;

    function Jd(e, t, n) {
        var o, i;
        const r = "o" === n[0];
        let s = !1;
        for (let a = 0; a < n.length; a++) {
            const d = n[a];
            if (!d.filters) continue;
            let c = !0;
            for (const n of d.filters) {
                const [r, s, ...a] = n, l = xd(r, t);
                if (!(null === (i = null === (o = Wr.plugins[Pr.OPERATOR]) || void 0 === o ? void 0 : o.get(s)) || void 0 === i ? void 0 : i(l, ...a, {
                        eventName: e,
                        triggerName: d.id,
                        jsLibUtils: id.get("jsLibUtils")
                    }))) {
                    c = !1;
                    break
                }
            }
            if (r && c) {
                s = !0;
                break
            }
            s = c
        }
        return s
    }
    class qd {
        constructor(e, t) {
            this.nameInStorage = e, this.goalsFilter = t
        }
        checkMissingComputations(e) {
            var t, n, o;
            try {
                const {
                    goalId: i,
                    campaignId: r,
                    eventData: s,
                    eventName: a
                } = e, d = window.VWO._.allSettings, c = d.triggers[null === (n = null === (t = d.dataStore.campaigns[r]) || void 0 === t ? void 0 : t.mt) || void 0 === n ? void 0 : n[i]].cnds;
                return !c || !(c.length > 1 || (null === (o = c[0].filters) || void 0 === o ? void 0 : o.length)) || Jd(a, s, c)
            } catch (e) {
                return !0
            }
        }
        isGoalTriggerValid(e, t) {
            if (!e) return this.checkMissingComputations(t);
            let n = !1;
            const o = Object.keys(e);
            for (const t of o) {
                const o = e[t];
                let i = !0;
                const r = Object.keys(o);
                for (const e of r)
                    if (!o[e]) {
                        i = !1;
                        break
                    }
                if (i) {
                    n = !0;
                    break
                }
            }
            return n
        }
        fireEventForConversion(e, t, n) {
            if (!mn.shouldWeTrackVisitor()) return Promise.resolve();
            const o = [],
                i = window._vis_opt_url || window.location.href,
                r = ao(null, e, t);
            return window.VWO._.goalsToBeConvertedSynchronously || yn.updateGoalsKind(window._vwo_exp), Object.keys(window.VWO._.goalsToBeConvertedSynchronously).forEach((r => {
                var s, a;
                const d = window.VWO._.goalsToBeConvertedSynchronously[r],
                    c = window._vwo_exp[r];
                if ("vwo_dom_submit" === e && !Kd.isFinished() && Kd.didCampConvertInBetween(c)) return;
                if (!(null === (s = window._vwoCc) || void 0 === s ? void 0 : s.ignoreCSAForGoals) && (null === (a = null == c ? void 0 : c.ss) || void 0 === a ? void 0 : a.csa) && !c.isTriggerValidated) return;
                if ((null == c ? void 0 : c.mE) && Gi.doExperimentHere(c)[0] && !c.combination_chosen) return;
                const l = yn.isSessionBasedCampaign2(c),
                    u = yn.hasInsightsMetric(c.type),
                    w = !l || u || D((() => window.VWO._.track.loaded));
                w && !Gi.getCombi(c) || yn.shouldTrackUserForCampaign(c) && Object.entries(d).forEach((([s, a]) => {
                    var d;
                    const l = Object.assign({
                        kind: a
                    }, c.goals[s]);
                    if (this.goalsFilter.includes(l.kind)) {
                        const a = null === (d = c.mt) || void 0 === d ? void 0 : d[s];
                        if (!a || !this.isGoalTriggerValid(t.preComputedConds[a], {
                                goalId: s,
                                campaignId: r,
                                eventData: null == n ? void 0 : n.eventData,
                                eventName: e
                            }) || !Bd.shouldWeTriggerMetric({
                                currentUrl: i
                            }, c, l)) return;
                        if (!w) return void Gi.getCombi(c);
                        Gi.isGoalTriggered(c, s) || o.push({
                            c: c.id,
                            g: s
                        })
                    }
                }))
            })), o.length && Hs(t, o), r
        }
    }
    window.VWO.modules.utils.goalUtils = {
        GoalConversion: qd
    };
    class Yd {
        constructor(e, t) {
            this.goalsToBeConvertedSynchronously = null, this.nameInStorage = e, this.goalsFilter = t, window.VWO._.phoenixMT.on("updateSettingSuccess", (() => {
                this.goalsToBeConvertedSynchronously = null
            }))
        }
        checkMissingComputations(e) {
            var t;
            return null === (t = D((() => {
                const {
                    goalId: t,
                    campaignId: n,
                    eventData: o,
                    eventName: i
                } = e, r = window.VWO._.allSettings, s = D((() => r.triggers[r.dataStore.campaigns[n].mt[t]].cnds));
                if (s && (s.length > 1 || s[0].filters.length)) return Jd(i, o, s)
            }))) || void 0 === t || t
        }
        isGoalTriggerValid(e, t) {
            return e ? e.state : this.checkMissingComputations(t)
        }
        updateGoalsKind() {
            this.goalsToBeConvertedSynchronously || (this.goalsToBeConvertedSynchronously = yn.updateGoalsKind(window._vwo_exp, this.goalsFilter))
        }
        fireEventForConversion(e, t, n) {
            var o, i, r;
            if (!mn.shouldWeTrackVisitor()) return Promise.resolve(null);
            const s = [],
                a = window._vis_opt_url || window.location.href,
                d = ao(null, e, t);
            this.updateGoalsKind();
            let c = null;
            for (const d in this.goalsToBeConvertedSynchronously) {
                if (!Object.prototype.hasOwnProperty.call(this.goalsToBeConvertedSynchronously, d)) continue;
                const l = this.goalsToBeConvertedSynchronously[d],
                    u = window._vwo_exp[d];
                if ("vwo_dom_submit" === e && !Kd.isFinished() && Kd.didCampConvertInBetween(u)) continue;
                if (!(null === (o = window._vwoCc) || void 0 === o ? void 0 : o.ignoreCSAForGoals) && (null === (i = null == u ? void 0 : u.ss) || void 0 === i ? void 0 : i.csa) && !u.isTriggerValidated) continue;
                if ((null == u ? void 0 : u.mE) && Gi.doExperimentHere(u)[0] && !u.combination_chosen) continue;
                const w = yn.isSessionBasedCampaign2(u),
                    _ = yn.hasInsightsMetric(u.type),
                    p = !w || _ || D((() => window.VWO._.track.loaded));
                if ((!p || Gi.getCombi(u)) && yn.shouldTrackUserForCampaign(u))
                    for (const o in l) {
                        if (!Object.prototype.hasOwnProperty.call(l, o)) continue;
                        const i = l[o],
                            w = Object.assign({
                                kind: i
                            }, u.goals[o]),
                            _ = null === (r = u.mt) || void 0 === r ? void 0 : r[o];
                        _ && this.isGoalTriggerValid(t.preComputedConds[_], {
                            goalId: o,
                            campaignId: d,
                            eventData: null == n ? void 0 : n.eventData,
                            eventName: e
                        }) && Bd.shouldWeTriggerMetric({
                            currentUrl: a
                        }, u, w) && (p ? Gi.isGoalTriggered(u, o) || (s.push({
                            c: u.id,
                            g: o
                        }), w.mca || (c = c || {}, c[_] = !0)) : Gi.getCombi(u))
                    }
            }
            return s.length && Hs(t, s), d.then((() => c))
        }
    }
    class Xd {
        static isBrowserChromiumBased() {
            const e = ft.navigator.userAgent;
            return !(!e.includes("Chrome/") || !e.includes("Safari/"))
        }
    }
    class zd {
        getTargetPathInfo(e) {
            let t, n, o, i, r, s, a, d, c;
            t = vwo_$(D((() => e.composedPath()[0])) || e.target), n = t.get(0);
            const l = xn(n);
            return l !== n && (n = l, t = vwo_$(n)), d = Dn(n), "string" != typeof d || "html" === d.toLowerCase() || yn.isBot2() || (c = t.offset(), "touchend" === e.type ? (r = e.originalEvent && e.originalEvent.changedTouches[0], r && (o = r.pageX, i = r.pageY)) : (o = e.pageX, i = e.pageY), s = Math.round(1e3 * (o - c.left) / (t.outerWidth() || Un(t))) / 1e3, a = Math.round(1e3 * (i - c.top) / (t.outerHeight() || Mn(t))) / 1e3, (0 > s || 1 < s) && (s = .5), (0 > a || 1 < a) && (a = .5)), "html" === d.toLowerCase() && (d = ""), {
                xpath: d,
                x_percent: s,
                y_percent: a
            }
        }
        evaluateHeatmapData(e) {
            let t, n, o, i, r, s, a = {};
            vwo_$(e.target).get(0);
            const d = window._vwo_acc_id,
                c = window._vwo_exp,
                u = Y(c);
            n = u.length;
            const {
                xpath: w,
                x_percent: _,
                y_percent: p
            } = this.getTargetPathInfo(e);
            for (; n--;)
                if (o = u[n], t = c[o], "RUNNING" === t.status && t.clickmap && (t.ready || t.gp)) {
                    const e = Gi.getCombi(t);
                    if (t.clicks = t.clicks || 0, e && w && ++t.clicks <= (window._vwo_clicks || 10) && yn.isEligibleToSendCall(o)) {
                        s = yn.getUUID(t), r = "h.gif?experiment_id=" + o + "&account_id=" + d + "&combination=" + e + yn.getUUIDString(s) + "&url=" + encodeURIComponent(window.location.href) + "&path=" + encodeURIComponent(w) + "&x=" + _ + "&y=" + p + "&mapEv=false", window.VWO._.isBeaconAvailable = !0, window.VWO._.isLinkRedirecting = undefined;
                        const n = () => Zn.sendCall({
                            serverUrl: ft.serverUrl,
                            accountId: d
                        }, {
                            url: r
                        });
                        Qe ? kn(n) : n(), window.VWO._.isLinkRedirecting = !1, i = i && window.VWO._.isBeaconAvailable, window.VWO.modules.tags.wildCardCallback({
                            oldArgs: [o, e, w, _, p]
                        }, l.HEATMAP_CLICK);
                        const c = {
                                x: _,
                                y: p,
                                path: w
                            },
                            u = "id_" + o;
                        a[s] ? a[s] = Object.assign(Object.assign({}, a[s]), {
                            [u]: e
                        }) : a = Object.assign(Object.assign({}, a), {
                            [s]: Object.assign({
                                [u]: e
                            }, c)
                        })
                    }
                }
            return a
        }
    }
    const Qd = new zd;
    window.VWO.modules.utils.heatmapUtils = Qd;
    class Zd {
        constructor(e) {
            this.eventName = n.CLICK_EVENT, this.attachedFilters = e, this.goalConverter = Qe ? new Yd("vwoClickGoalData", {
                CLICK_ELEMENT: !0,
                ENGAGEMENT: !0,
                ON_PAGE: !0
            }) : new qd("vwoClickGoalData", ["CLICK_ELEMENT", "ENGAGEMENT", "ON_PAGE"]), window.VWO._.phoenixMT.on(l.DOM_CLICK, (e => {
                x(this.performClick.call(this, e))
            }), {
                syncToDataLayer: !0
            })
        }
        handleShadowDOMClick(e) {
            let t = {};
            const n = new Proxy(e, {
                    get: (e, n) => {
                        let o = t[n] || e[n];
                        return "function" == typeof o && (o = o.bind(t[n] ? t : e)), o
                    },
                    set: (e, n, o) => (t[n] = o, !0)
                }),
                o = n.composedPath(),
                i = e.target;
            for (let r = 0; r < o.length; r++) {
                n.target = o[r];
                const s = {
                    e: n,
                    ignoreObj: {
                        heatmap: 0 != r
                    }
                };
                if (o[r] == i) {
                    this._click(s), e._vwo = s.e._vwo;
                    break
                }(0 == r || o[r].shadowRoot) && (this._click(s), e._vwo = s.e._vwo), t = {}
            }
        }
        performClick(e) {
            e.vwoEventName = l.DOM_CLICK, e.target.shadowRoot && e.composedPath ? this.handleShadowDOMClick(e) : this._click({
                e: e
            }), Bn({
                msg: "Clicked on an element!",
                event: e
            })
        }
        shouldTrackClick(e, t) {
            return "touchend" === e || void 0 === t || 1 === t
        }
        onPointerUp(e, t) {
            var n, o = e.target;
            (D((() => window.VWO.nls.canvasRec.isFlutterWeb)) || o.vwoPD && (!!(null !== (n = window.chrome) && void 0 !== n ? n : Xd.isBrowserChromiumBased()) || !t)) && (window.VWO._.phoenixMT.trigger(l.DOM_CLICK, e), window.VWO._.phoenixMT.trigger("vwo_domClicked", e))
        }
        onPointerDown(e) {
            e.target.vwoPD = 1
        }
        _click({
            _pause: e,
            e: t,
            ignoreObj: n
        }) {
            var o, i;
            let r, s;
            if ((null === (o = t._vwo) || void 0 === o ? void 0 : o.isDeadClick) || (null === (i = t._vwo) || void 0 === i ? void 0 : i.isRageClick)) return;
            n = n || {};
            const a = t.which,
                d = vwo_$(t.target),
                c = d.get(0);
            if (Kd.initiate(c), !this.shouldTrackClick(t.type, a) || void 0 === c.tagName) return;
            void 0 === e && (e = 500), "a" === c.tagName.toLowerCase() ? (r = d.attr("href"), s = !0) : 0 < d.parents("a").length ? (r = d.parents("a").eq(0).attr("href"), s = !0) : ("button" === c.tagName.toLowerCase() || 0 < d.parents("button").length || "input" === c.tagName.toLowerCase() && ("button" === d.attr("type") || "image" === d.attr("type") || "submit" === d.attr("type"))) && (s = !0), t.props = t.props || {}, t.userEngagement = t.props.userEngagement = !!s, t.eventUuid = t.eventUuid || yn.generateUUID(), r && (t.props.targetUrl = t.targetUrl = r), t.preComputedConds = Ud(this.eventName, t, this.attachedFilters);
            const l = {
                props: t.props,
                targetUrl: t.targetUrl,
                userEngagement: t.userEngagement,
                vwoEventName: t.vwoEventName,
                preComputedConds: t.preComputedConds,
                eventUuid: t.eventUuid
            };
            let u = {};
            u = n.heatmap ? {} : Qd.evaluateHeatmapData(t), this.goalConverter.fireEventForConversion(this.eventName, l, {
                eventData: t
            }).then((e => {
                if (e) {
                    const t = [];
                    for (let n = 0; n < this.attachedFilters.length; n++) {
                        const o = this.attachedFilters[n];
                        e[o.triggerName] || t.push(o)
                    }
                    this.attachedFilters = t
                }
            }));
            let w = D((() => l._vwo.eventDataConfig)) || {};
            Object.keys(w).length && Object.keys(u).length ? w = this.syncHeatmapAndEventsData(u, w) : Object.keys(u).length && (w = u), t._vwo = t._vwo || {}, Object.keys(w).length && (t._vwo.eventDataConfig = Po.mergeNestedObjectsV2({
                mergeArrays: !0
            }, w, t._vwo.eventDataConfig)), t._vwo.syncEventData = l
        }
        syncHeatmapAndEventsData(e, t) {
            const n = {};
            for (const o in t) Object.keys(e).find((e => e === o)) && (n[o] = Object.assign(Object.assign({}, t[o]), e[o]), delete t[o]);
            return n
        }
        on(e, t) {
            const n = this,
                o = Vt(),
                i = vwo_$(document)[0];
            o || function() {
                if (i && i.vwoCEvent) return;
                const e = vwo_$(i);
                let o = null,
                    r = !1;
                fi.addJqEventListener(e, "bind", "pointerdown", (e => {
                    null !== o && delete o.vwoPD, n.onPointerDown(e), o = e.target, r = !1
                }), null, t.useCapturePhase), fi.addJqEventListener(e, "bind", "pointermove", (e => {
                    "touch" === e.pointerType && (r = !0)
                }), null, t.useCapturePhase), fi.addJqEventListener(e, "bind", "pointerup", (e => {
                    n.onPointerUp(e, r)
                }), null, t.useCapturePhase), i && (i.vwoCEvent = 1)
            }()
        }
        off() {}
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.ClickDomEvent", Zd);
    class ec {
        constructor(e) {
            this.eventName = l.DOM_SUBMIT, this.attachedFilters = e, this.goalConverter = new qd("vwoSubmitGoalData", ["FORM_SUBMIT"]), window.VWO._.phoenixMT.on(l.DOM_SUBMIT, (e => this.onFormSubmit({
                e: e
            })), {
                syncToDataLayer: !0
            })
        }
        eventConditionsUpdate(e) {
            this.attachedFilters = e
        }
        otherSide(...e) {
            throw new Error("entered into outdated otherSide")
        }
        onFormSubmit({
            e: e
        }) {
            var t, n = vwo_$(e.target),
                o = n.get(0);
            if (Kd.updateCache(e.submitter), "string" == typeof o.tagName && "form" !== o.tagName.toLowerCase() && n.parents("form").length > 0 && (o = n.parents("form").get(0)), "string" == typeof o.tagName && "form" !== o.tagName.toLowerCase() || "vwo_form" === vwo_$(o).attr("id")) return;
            e.props = e.props || {}, e.props.targetUrl = e.targetUrl = vwo_$(o).attr("action"), e.userEngagement = e.props.userEngagement = !0, e.isBeaconAvailable = !0, e.isLinkRedirecting = !0, e.vwoEventName = this.eventName, e.preComputedConds = Ud(this.eventName, e, this.attachedFilters), t = {
                props: e.props,
                targetUrl: e.targetUrl,
                userEngagement: e.userEngagement,
                isBeaconAvailable: e.isBeaconAvailable,
                isLinkRedirecting: e.isLinkRedirecting,
                vwoEventName: e.vwoEventName,
                preComputedConds: e.preComputedConds
            }, this.goalConverter.fireEventForConversion(this.eventName, t, {
                eventData: e
            });
            const i = D((() => t._vwo.eventDataConfig)) || {};
            e._vwo = e._vwo || {}, Object.keys(i).length && (e._vwo.eventDataConfig = i), e._vwo.syncEventData = t, Kd.end()
        }
        on(e, t) {
            const n = Vt(),
                o = vwo_$(document)[0];
            o && (o.vwoFEvent = 1),
                function() {
                    var e = vwo_$(document)[0];
                    n || (fi.addJqEventListener(vwo_$(e), "bind", "submit", (e => {
                        window.VWO._.phoenixMT.trigger(l.DOM_SUBMIT, e)
                    }), null, t.useCapturePhase), e && (e.vwoFEvent = 1))
                }()
        }
        off() {}
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.SubmitDomEvent", ec);
    class tc extends kd {
        constructor() {
            super(...arguments), this.eventName = n.PAGE_LOAD_EVENT
        }
        on(e) {
            if ("complete" === document.readyState) e();
            else {
                const t = this.onPageLoad(e);
                window.addEventListener("load", (e => {
                    t(yn.filterEventObjectForWT(e))
                }), !0)
            }
        }
        off() {
            window.removeEventListener("load", (e => {
                this.pageLoadCallback(yn.filterEventObjectForWT(e))
            }), !0)
        }
        onPageLoad(e) {
            return this.pageLoadCallback = e, this.pageLoadCallback
        }
    }
    window.VWO.modules.phoenixPlugins.events.predefinedEvents.PageLoadEvent = Pd.secondary("VWO.modules.phoenixPlugins.events.predefinedEvents.PageLoadEvent", tc);
    let nc = !1;

    function oc() {
        let e = !1;

        function t(t) {
            e || (e = !0, window.VWO._.phoenixMT.trigger(l.PAGE_EXIT, t))
        }
        window.addEventListener("beforeunload", (function(e) {
            t(e)
        })), window.addEventListener("pagehide", (function(e) {
            t(e)
        })), document.addEventListener("visibilitychange", (function(n) {
            ! function(n) {
                "hidden" === document.visibilityState ? t(n) : e = !1
            }(n)
        })), window.addEventListener("pageshow", (function(t) {
            t.persisted && (e = !1)
        })), nc = !0
    }!nc && oc();
    const ic = function() {
        var e, t, n = function(e, t) {
                try {
                    Object.defineProperty(e, t, {
                        writable: !1
                    })
                } catch (e) {}
            },
            o = function() {
                if (!window.DISABLE_NATIVE_CONSTANTS) {
                    if (!document.body) return;
                    e = window.document.createElement("iframe"), n(e, "src"), e.setAttribute = function(e, t) {}, e.style.display = "none", e.onload = function() {
                        (t = e.contentWindow).onerror = function(e, t) {
                            P({
                                msg: e,
                                url: t,
                                source: "nativeConstants"
                            })
                        }
                    }, document.body.appendChild(e), (t = e.contentWindow) && n(t.location, "href")
                }
            };
        return void 0 === window.DISABLE_NATIVE_CONSTANTS ? window.DISABLE_NATIVE_CONSTANTS = !0 : !1 === window.DISABLE_NATIVE_CONSTANTS && o(), {
            get: function(n) {
                e && e.contentWindow || o();
                var i = t;
                const r = !i || !!window.DISABLE_NATIVE_CONSTANTS;
                if (r && (i = window), window.VWO._.enableInternalJSONStringify && "JSON" == n) {
                    if (r) {
                        return {
                            stringify: window.window.VWO._.native.JSON.stringify,
                            parse: window.window.VWO._.native.JSON.parse,
                            rawJSON: window.JSON.rawJSON,
                            isRawJSON: window.JSON.isRawJSON
                        }
                    }
                    i[n].stringify = window.window.VWO._.native.JSON.stringify
                }
                return i[n]
            }
        }
    };

    function rc() {
        const e = [
            [].map, [].filter, [].forEach, [].reverse
        ];
        for (const t of e)
            if (-1 == Function.prototype.toString.call(t).indexOf("[native code]")) return !0;
        return !1
    }
    const sc = function() {
            const e = !!D((() => window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG.eNC));
            void 0 === window.DISABLE_NATIVE_CONSTANTS && (window.DISABLE_NATIVE_CONSTANTS = !e), window.DISABLE_NATIVE_CONSTANTS && (window.DISABLE_NATIVE_CONSTANTS = 1 != rc()), window.VWO._.nativeConstants = ic()
        },
        ac = () => {
            const e = "function" == typeof Array.prototype.toJSON;
            window.VWO._.enableInternalJSONStringify = e;
            let t = window.DISABLE_NATIVE_CONSTANTS ? window.JSON : window.VWO._.nativeConstants.get("JSON");
            if (e) {
                const e = t.stringify;
                t = {
                    parse: t.parse,
                    rawJSON: t.rawJSON,
                    isRawJSON: t.isRawJSON,
                    stringify: (...t) => {
                        const n = Array.prototype.toJSON;
                        delete Array.prototype.toJSON;
                        const o = e.call(void 0, ...t);
                        return Array.prototype.toJSON = n, o
                    }
                }
            }
            window.VWO._.native.JSON = t
        },
        dc = () => {
            const e = window.VWO._.allSettings.dataStore.plugins.DACDNCONFIG,
                t = D((() => ft.vwoCode.getVersion()));
            if (!t) return;
            const n = `_vwo_${ft.accountId}_config`,
                o = (null == e ? void 0 : e.SCC) ? window.VWO._.native.JSON.parse(e.SCC) : null;
            if (o && t >= 2) {
                const {
                    sT: e,
                    hE: t
                } = o;
                window.localStorage.setItem(n, window.VWO._.native.JSON.stringify({
                    sT: e,
                    hE: t
                }))
            }
        };

    function cc(e) {
        var t, n, o, i, r, s, a, c, u;
        try {
            if (null === (t = window.VWO) || void 0 === t ? void 0 : t.phoenix) return;
            if (!e) return console.warn("VWO aborted as jQuery is not initialized!"), void(null === (n = window._vwo_code) || void 0 === n || n.finish());
            if (window.VWO.consentMode && !1 === window.VWO.consentMode.cReady) return window.clearTimeout(window._vwo_library_timer), 750455 === window._vwo_acc_id && (window._vwo_library_timer = null), window.VWO.initVWOLib = cc.bind(null, e);
            if (window._removeVwoGlobalStyle = (null === (o = window._vwo_code) || void 0 === o ? void 0 : o.finish) || yn.removeGlobalStyle, "function" == typeof window.VWO.siteWideCode) {
                try {
                    window.VWO.siteWideCode()
                } catch (e) {}
                delete window.VWO.siteWideCode
            }
            sc(), ac(), window.VWO._.bodyPath = 803786 === window._vwo_acc_id ? ":root body" : "body", window.VWO._.loadNonTestingLibraries = T;
            let w = window.performance.getEntriesByName("first-contentful-paint")[0] ? "" : window.VWO._.bodyPath;
            if ((null === (i = window.VWO.consentMode) || void 0 === i ? void 0 : i.wFC) && (w = ""), !window._vwo_code && !(null === (a = null === (s = null === (r = window.VWO._.allSettings.dataStore) || void 0 === r ? void 0 : r.plugins) || void 0 === s ? void 0 : s.DACDNCONFIG) || void 0 === a ? void 0 : a.PRTHD) && ![609620, 609623, 609617, 612803, 623469, 571025].includes(window._vwo_acc_id)) {
                const e = document.createElement("style");
                let t = "";
                (window._vwo_acc_id > 742099 || 718480 === window._vwo_acc_id) && (t = "-webkit-transform:none;-ms-transform:none;transform:none;");
                const n = w + "{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;" + t + "}",
                    o = document.getElementsByTagName("head")[0];
                if (e.setAttribute("id", "_vis_opt_path_hides"), e.setAttribute("type", "text/css"), e.styleSheet ? e.styleSheet.cssText = n : e.appendChild(document.createTextNode(n)), o.appendChild(e), [515823].includes(window._vwo_acc_id)) {
                    const e = window._vwoCc && window._vwoCc.wsT || 2e3,
                        t = () => {
                            const e = document.getElementById("_vis_opt_path_hides");
                            e && e.remove()
                        },
                        n = e => {
                            e.filename === window._vwoWorkerUrl && (t(), window.removeEventListener("error", n), clearTimeout(window._vwo_oscTimeout))
                        };
                    window.addEventListener("error", n), window._vwo_oscTimeout = setTimeout((() => {
                        t(), window.removeEventListener("error", n)
                    }), e)
                }
            }
            window.VWO.nonce = "";
            const _ = document.querySelector("#vwoCode");
            _ && (window.VWO.nonce = _.nonce), window.vwo_$ = e, yn.isBot2() || window.VWO._.selfHosted || yn.loadNcLib(), window.clearTimeout(window._vwo_library_timer), 750455 === window._vwo_acc_id && (window._vwo_library_timer = null);
            let p = !!(window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver);
            window.Zone && window.Zone.__symbol__ && (p = !!window[window.Zone.__symbol__("MutationObserver")]);
            const g = window.name.indexOf("_vis_heatmap_") >= 0 || window._vwo_tm.indexOf("_vis_heatmap_") >= 0;
            window.functionWrapper = new Wd;
            const h = {
                MutationObserver: p,
                name: window.name,
                navigator: {
                    userAgent: window.navigator.userAgent,
                    language: window.navigator.language || window.navigator.browserLanguage,
                    appVersion: window.navigator.appVersion
                },
                screen: {
                    colorDepth: window.screen.colorDepth,
                    pixelDepth: window.screen.pixelDepth
                },
                location: window.location,
                Document: {
                    prototype: {}
                },
                localStorage: window.localStorage,
                cachedSettingsInSessionStorage: yn.syncCachedSettingsInSessionStorage(),
                history: {},
                vwoCodeEndBeforeVA: null === (c = window._vwo_code) || void 0 === c ? void 0 : c.finished(),
                _vwo_code: window._vwo_code,
                _vwo_code_version: (null === (u = window._vwo_code) || void 0 === u ? void 0 : u.getVersion) && window._vwo_code.getVersion(),
                _vwo_server_url: window._vwo_server_url,
                _vwo_acc_id: window._vwo_acc_id,
                _vwo_clicks: window._vwo_clicks,
                _vis_opt_url: window._vis_opt_url,
                _vwo_cookieDomain: window._vwo_cookieDomain,
                _vis_opt_domain: window._vis_opt_domain,
                _vwo_style: window._vwo_style,
                _vwo_css: window._vwo_css,
                _vwo_uuid: window._vwo_uuid,
                _vis_apm_lib: window._vis_apm_lib,
                _vwo_api_section_callback: window._vwo_api_section_callback,
                _vis_heatmap: g,
                isInsightsOnConsentEnabled: !!window.vwo_cInstJS,
                document: {
                    cookie: document.cookie,
                    URL: document.URL,
                    referrer: document.referrer,
                    addEventListener: document.addEventListener,
                    domain: document.domain,
                    title: document.title,
                    characterSet: document.characterSet,
                    charset: document.charset,
                    baseURI: document.baseURI
                },
                _vwo_cdn: window._vwo_cdn,
                _vis_opt_cookieDays: window._vis_opt_cookieDays,
                _VWO: window._VWO
            };
            window.fetcher.init(), window.fetcher.setValue("fakeWindow", h), gn(e), vn(), window._vwo_server_url = window._vwo_server_url || "https://dev.visualwebsiteoptimizer.com/", Hn({
                msg: "vaInit",
                url: window.location.href
            }), Kn(), Jn(), qn();
            const v = new("function" == typeof window.URL ? window.URL : window.webkitURL)(document.URL).searchParams.get("vwoLogLevel");
            d.setLevel(v || "warn"), d.info("Initializing jslib");
            const f = new gi(window.VWO || []);
            if (B(f), H(f), ba.init("jslib", f, null, null, !1), mn.setOptOutStateConfig(), yn.syncThirdPartyGlobalCookies(), gt.domain = ft.cookieDomain, window.VWO._.cLFE = yn.isCookieLessModeEnabled(), !Vt() && !window._vis_debug && (!mn.shouldExecuteLibOnBasisOfCurrentOptOutState() || yn.isGloballyOptedOut())) return ba.init("optOut", f, null), window._removeVwoGlobalStyle(), void window.VWO._.triggerEvent(l.OPT_OUT, !0);
            window._vwo_spaR = Object.keys(window.VWO._.allSettings.tags).some((e => e.startsWith("R_"))), window.VWO._.phoenixMT.trigger("vwo_init"), window.VWO._.phoenixMT.on("syncDataToDataLayer", (({
                event: e,
                eventName: t,
                syncEventData: n
            }) => {
                var o;
                co(t, n, {}, n.postSyncCallback), (null === (o = e._vwo) || void 0 === o ? void 0 : o.eventDataConfig) && (e._vwo.eventDataConfig = {})
            })), window.VWO._.phoenixMT.on(l.END_APPLY_CHANGES, (() => {
                const e = window._vwo_code;
                e && e.removeLoaderAndOverlay && e.removeLoaderAndOverlay()
            })), window.VWO.consentMode && (L.initConsentMode(), L.overrideCookies(gt)), window.VWO._.phoenixMT.on(l.END_APPLY_CHANGES, (() => {
                window.VWO._.ncLib ? window.VWO._.ncLib.initNonCriticalLib() : window.VWO._.phoenixMT.on("vwo_InitNCLib", (() => {
                    window.VWO._.ncLib.initNonCriticalLib()
                })), window._VWO.uhdCp = 1
            }));
            ue((() => {
                Ld(f, Nd), dc()
            }), window._vwo_code && ![702077, 704345, 690758, 685475, 680279, 695984, 710456, 601996].includes(window._vwo_acc_id) && !window.location.href.includes("vwo_DisableAsp") && !ze), Xn()
        } catch (e) {
            D((() => window._removeVwoGlobalStyle())), window.vwo_libExecuted = !0, console.error(e)
        }
    }

    function lc(e, t) {
        P({
            msg: e,
            url: "gquery.js",
            source: t
        })
    }
    const uc = function() {
        var e = document,
            t = e.documentElement,
            n = [].slice,
            o = [].push,
            i = [].filter,
            r = e.createElement("div"),
            s = [].indexOf,
            a = [].splice,
            d = !1,
            c = !1,
            l = function() {
                try {
                    return [].reverse.call(this)
                } catch (e) {
                    if (d || P({
                            msg: "Native [].reverse Fn is overridden and Native Constants = " + !window.DISABLE_NATIVE_CONSTANTS,
                            url: "gQuery.ts",
                            source: "gQuery"
                        }), d = !0, 710129 === window._vwo_acc_id) return []._reverse.call(this)
                }
            },
            u = function() {
                try {
                    return [].map.apply(this, arguments)
                } catch (e) {
                    c || P({
                        msg: "Native [].map Fn is overridden and Native Constants = " + !window.DISABLE_NATIVE_CONSTANTS,
                        url: "gQuery.ts",
                        source: "gQuery"
                    }), c = !0
                }
            },
            w = window,
            _ = /^data-(.+)/,
            p = /\S+/g,
            g = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
            h = {
                animationIterationCount: !0,
                columnCount: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0
            };

        function v(e) {
            var t, n, r, s, a, d = !window.DISABLE_NATIVE_CONSTANTS && (null === (a = null === (s = null === (r = null === (n = null === (t = window.VWO._) || void 0 === t ? void 0 : t.nativeConstants) || void 0 === n ? void 0 : n.get) || void 0 === r ? void 0 : r.call(n, "Array")) || void 0 === s ? void 0 : s.prototype) || void 0 === a ? void 0 : a.filter) || i;
            return e.multiple && e.options ? function(e, t, n, i) {
                for (var r = [], s = $(t), a = i, d = 0, c = e.length; d < c; d++)
                    if (s) {
                        var l = t(e[d]);
                        l.length && o.apply(r, l)
                    } else
                        for (var u = e[d][t]; !(null == u || i && a(-1, u));) r.push(u), u = n ? u[t] : null;
                return r
            }(d.call(e.options, (function(e) {
                return e.selected && !e.disabled && !e.parentNode.disabled
            })), "value") : e.value || ""
        }

        function f(e) {
            return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        var O = {
                focus: "focusin",
                blur: "focusout"
            },
            E = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
        var m = /\S+/g;
        var S = {
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            mouseenter: {
                delegateType: "mouseover",
                bindType: "mouseover"
            },
            mouseleave: {
                delegateType: "mouseout",
                bindType: "mouseout"
            },
            pointerenter: {
                delegateType: "pointerover",
                bindType: "pointerover"
            },
            pointerleave: {
                delegateType: "pointerout",
                bindType: "pointerout"
            }
        };
        Element.prototype.closest || (Element.prototype.closest = function(e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (C(t, e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        });
        var T = function e(t, n) {
                return new e.fn.init(t, n)
            },
            C = T.matches = function(e, t) {
                var n = e && (e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector);
                return !!n && n.call(e, t)
            },
            I = T.isString = function(e) {
                return f(e) === f("")
            },
            y = /^--/;

        function A(e) {
            return y.test(e)
        }
        var N = /-([a-z])/g;

        function V(e, t) {
            return t.toUpperCase()
        }
        var b = T.camelCase = function(e) {
            return e.replace(N, V)
        };

        function R(e) {
            return !!e && 1 === e.nodeType
        }
        var L = {},
            W = r.style,
            D = ["webkit", "moz", "ms", "o"];

        function x(e, t) {
            if (void 0 === t && (t = A(e)), t) return e;
            if (!L[e]) {
                var n = b(e),
                    o = "" + n.charAt(0).toUpperCase() + n.slice(1);
                q((n + " " + D.join(o + " ") + o).split(" "), (function(t, n) {
                    if (n in W) return L[e] = n, !1
                }))
            }
            return L[e]
        }

        function U(e, t, n) {
            return void 0 === n && (n = A(e)), n || h[e] || !K(t) ? t : t + "px"
        }

        function M(e, t) {
            return parseInt(k(e, t), 10) || 0
        }

        function k(e, t, n) {
            if (R(e) && t) {
                var o = w.getComputedStyle(e, null);
                return t ? n ? o.getPropertyValue(t) || void 0 : o[t] : o
            }
        }
        var G, F = function() {},
            $ = T.isFunction = function(e) {
                return f(e) === f(F) && !!e.call
            },
            j = T.uid = "_gQ" + Date.now(),
            B = function(e) {
                return e[j] = e[j] || {}
            },
            H = T.isWindow = function(e) {
                return e === e.window
            },
            K = T.isNumeric = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            J = function(e) {
                return 9 === e.nodeType
            };

        function q(e, t) {
            for (var n = 0, o = e.length; n < o && !1 !== t.call(e[n], n, e[n]); n++);
        }

        function Y(e, t, n) {
            q(e, (function(e, o) {
                q(t, (function(t, i) {
                    X(o, e ? i.cloneNode(!0) : i, n, n && o.firstChild)
                }))
            }))
        }

        function X(e, t, n, o) {
            var i = [];
            if (q(3 === t.nodeType ? [] : T("script", t), (function(e, t) {
                    var n = document.createElement("script");
                    q(T(t).prop("attributes"), (function() {
                        T(n).attr(this.name, this.value)
                    })), n.text = t.innerHTML, i.push(n), t.parentElement.removeChild(t)
                })), n)
                if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                    var r = document.createElement(t.tagName.toLowerCase());
                    "SCRIPT" === t.tagName ? r.text = t.innerHTML : r.appendChild(document.createTextNode(t.innerHTML)), q(T(t).prop("attributes"), (function() {
                        T(r).attr(this.name, this.value)
                    })), r.classList = t.classList, e.insertBefore(r, o)
                } else e.insertBefore(t, o);
            else if ("SCRIPT" === t.tagName || "STYLE" === t.tagName) {
                r = document.createElement(t.tagName.toLowerCase());
                "SCRIPT" === t.tagName ? r.text = t.innerHTML : r.appendChild(document.createTextNode(t.innerHTML));
                q(T(t).prop("attributes"), (function() {
                    T(r).attr(this.name, this.value)
                })), r.classList = t.classList, e.appendChild(r)
            } else e.appendChild(t);
            for (var s = 0; s < i.length; s++) document.getElementsByTagName("head")[0].appendChild(i[s])
        }
        return T.extend = function() {
            var e, t, n, o, i = arguments[0] || {},
                r = 1,
                s = arguments.length,
                a = !1;
            for ("boolean" == typeof i && (a = i, i = arguments[1] || {}, r = 2), "object" === f(i) || $(i) || (i = {}), s === r && (i = this, --r); r < s; r++)
                if (null != (e = arguments[r]))
                    for (t in e)
                        if (n = i[t], o = e[t], "__proto__" !== t && i !== o)
                            if (a && o && (T.isPlainObject(o) || T.isArray(o))) {
                                var d = n && (T.isPlainObject(n) || T.isArray(n)) ? n : T.isArray(o) ? [] : {};
                                i[t] = T.extend(a, d, o)
                            } else void 0 !== o && (i[t] = o);
            return i
        }, T.isArray = Array.isArray, T.isPlainObject = function(e) {
            if (!e || "[object Object]" !== Object.prototype.toString.call(e) || e.nodeType || e.setInterval) return !1;
            if (e.constructor && !hasOwnProperty.call(e, "constructor") && !hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            var t;
            for (t in e);
            return void 0 === t || hasOwnProperty.call(e, t)
        }, T.parseJSON = function(e) {
            return "string" == typeof e && e ? /^[\],:{}\s]*$/.test(e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ? window.VWO._.native.JSON.parse(e) : void 0 : null
        }, T.getJSON = function(e, t, n, o) {
            return $(t) && (o = o || n, n = t, t = null), T.ajax({
                url: e,
                data: t,
                success: n,
                dataType: o
            })
        }, T.get = function(e, t, n, o) {
            return $(t) && (o = o || n, n = t, t = null), T.ajax({
                type: "GET",
                url: e,
                data: t,
                success: n,
                dataType: o
            })
        }, T.each = function() {
            var e, t, o = arguments;
            1 === o.length && $(o[0]) ? (e = n.call(this), t = o[0]) : (e = o[0], t = o[1]);
            for (var i = 0; i < e.length; i++) t.call(e[i], i, e[i]);
            return this
        }, T.ajax = function(e) {
            if ("script" === e.dataType) {
                var t = document.createElement("script");
                return t.src = e.url, document.getElementsByTagName("head")[0].appendChild(t), t.onload = e.success || F, void(t.onerror = e.error || F)
            }
            var n = new XMLHttpRequest;
            n.open(e.method ? e.method : "GET", e.url, !0), e.data || (e.data = null), n.onload = function() {
                this.status >= 200 && this.status < 400 && (e.dataType || (this.response = T.parseJSON(this.response)), e.success && e.success(this.response))
            }, n.onerror = function() {
                e.error && e.error(this.response)
            }, n.send(e.data)
        }, T.isEmptyObject = function(e) {
            return e && 0 === Object.keys(e).length
        }, (T.fn = T.prototype = {
            gQVersion: "0.0.1",
            toArray: function() {
                return n.call(this, 0)
            },
            constructor: T,
            hasClass: function(e) {
                return n.call(this).every((function(t) {
                    return 1 === t.nodeType && t.classList.contains(e)
                }))
            },
            ready: function(t) {
                return "loading" !== e.readyState ? setTimeout(t) : e.addEventListener("DOMContentLoaded", t), this
            },
            scrollTop: function() {
                var e = this[0];
                return H(e) ? e.pageYOffset : J(e) ? e.defaultView.pageYOffset : e.scrollTop
            },
            scrollLeft: function() {
                var e = this[0];
                return H(e) ? e.pageXOffset : J(e) ? e.defaultView.pageXOffset : e.scrollLeft
            },
            getComputedDimensionOuter: function(e, t) {
                let n = "height" === e.toLowerCase() ? 1 : 0,
                    o = this[0];
                if (o) return H(o) ? window["outer" + e] : this[0]["offset" + e] + (t ? M(this[0], "margin" + (n ? "Top" : "Left")) + M(this[0], "margin" + (n ? "Bottom" : "Right")) : 0)
            },
            getComputedDimension: function(e, t) {
                var n, o, i = this[0],
                    r = "height" === e.toLowerCase() ? 0 : 1;
                if (e = e.charAt(0).toUpperCase() + e.slice(1), J(i)) {
                    var s = i.documentElement;
                    return Math.max(i.body["scroll" + e], i.body["offset" + e], s["scroll" + e], s["offset" + e], s["client" + e])
                }
                if (H(i)) return "height" === e.toLowerCase() ? i.outerHeight : i.outerWidth;
                try {
                    return i.getBoundingClientRect()[e.toLowerCase()] - (M(n = i, "border" + ((o = r) ? "Left" : "Top") + "Width") + M(n, "padding" + (o ? "Left" : "Top")) + M(n, "padding" + (o ? "Right" : "Bottom")) + M(n, "border" + (o ? "Right" : "Bottom") + "Width"))
                } catch (e) {
                    lc(`Error is ${e} and elem is ${i}`, "getBoundingClientRect")
                }
            },
            height: function() {
                return this.getComputedDimension("height")
            },
            width: function() {
                return this.getComputedDimension("width")
            },
            is: function(e) {
                if (!e) return !1;
                var t = !1;
                return this.each((function(n, o) {
                    return !(t = "string" == typeof e ? C(o, e) : o === e)
                })), t
            },
            attr: function(e, t) {
                var n;
                if (e) {
                    if (I(e)) return void 0 === t ? null === (n = this[0] ? this[0].getAttribute ? this[0].getAttribute(e) : this[0][e] : void 0) ? void 0 : n : this.each((function(n, o) {
                        o.setAttribute ? o.setAttribute(e, t) : o[e] = t
                    }));
                    for (var o in e) this.attr(o, e[o]);
                    return this
                }
            },
            removeAttr: function(e) {
                return e = e.match(p) || [], this.each((function(t, n) {
                    q(e, (function(e, t) {
                        n.removeAttribute(t)
                    }))
                }))
            },
            outerWidth: function(e) {
                return this.getComputedDimensionOuter("Width", e)
            },
            outerHeight: function(e) {
                return this.getComputedDimensionOuter("Height", e)
            },
            offset: function() {
                var e = this[0];
                if (e.nodeType == Node.TEXT_NODE && (e = e.parentElement), !e) return {
                    top: 0,
                    left: 0
                };
                let n = {};
                try {
                    n = e.getBoundingClientRect()
                } catch (t) {
                    if (lc(`Error is ${t} and elem is ${e}`, "getBoundingClientRect"), e === document) return
                }
                var o = e.ownerDocument ? e.ownerDocument.defaultView : window;
                return {
                    top: n.top + o.pageYOffset - t.clientTop,
                    left: n.left + o.pageXOffset - t.clientLeft
                }
            },
            index: function(e) {
                var t = e ? T(e)[0] : this[0],
                    n = e ? this : T(t).parent().children();
                return s.call(n, t)
            },
            each: T.each,
            delegate: function(e, t, n, o) {
                return this.on(e, t, n, o)
            },
            on: function(e, t, n, o) {
                var i, r, s = this;
                return $(t) && (n = t, t = null), this[0] === document && "ready" === e ? (this.ready(n), this) : (t && (i = n, n = function(e) {
                    for (var n = e.target; !C(n, t);) {
                        if (n === this || !n) return !1;
                        n = n.parentNode
                    }
                    n && i.call(n, e)
                }), q(I(r = e) && r.match(m) || [], (function(i, r) {
                    S[r] && (t && S[r].delegateType ? e = S[r].delegateType : S[r].bindType && (e = S[r].bindType)), s.each((function(t, i) {
                        i.addEventListener(e, n, !!o)
                    }))
                })), this)
            },
            off: function(e, t, n) {
                return this.each((function(o, i) {
                    i.removeEventListener(e, t, !!n)
                }))
            },
            isChecked: function() {
                return null !== this[0].getAttribute("checked")
            },
            isFocussed: function() {
                return this[0] === e.activeElement
            },
            closest: function(e) {
                return new T(this[0].closest(e))
            },
            parent: function() {
                return new T(this[0] && this[0].parentNode)
            },
            val: function(e) {
                if (!arguments.length) return this[0] && v(this[0]);
                const t = !window.DISABLE_NATIVE_CONSTANTS && window.VWO._.nativeConstants.get("Array").prototype.map || u;
                return this.each((function(n, o) {
                    var i = o.multiple && o.options;
                    if (i || /radio|checkbox/i.test(o.type)) {
                        var r = Array.isArray(e) ? t.call(e, String) : null === e ? [] : [String(e)];
                        i ? q(o.options, (function(e, t) {
                            t.selected = r.indexOf(t.value) >= 0
                        })) : o.checked = r.indexOf(o.value) >= 0
                    } else o.value = null == e ? "" : e
                }))
            },
            prop: function(e, t) {
                if (e) {
                    if (I(e)) return void 0 === t ? this[0][e] : this.each((function(n, o) {
                        o[e] = t
                    }));
                    for (var n in e) this.prop(n, e[n]);
                    return this
                }
            },
            data: function(e, t) {
                var n = this;
                if (!e) {
                    if (!this[0]) return;
                    var o = {};
                    return q(this[0].attributes, (function(e, t) {
                        var i = t.name.match(_);
                        i && (o[i[1]] = n.data(i[1]))
                    })), o
                }
                if (I(e)) return void 0 === t ? function(e, t) {
                    var n = B(e)[t];
                    return void 0 === n && (n = e.dataset ? e.dataset[t] : T(e).attr("data-" + t)), n
                }(this[0], e) : this.each((function(n, o) {
                    return function(e, t, n) {
                        return B(e)[t] = n
                    }(o, e, t)
                }));
                for (var i in e) this.data(i, e[i]);
                return this
            },
            eq: function(e) {
                return T(this.get(e))
            },
            get: function(e) {
                return void 0 === e ? n.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            appendTo: function(e) {
                for (var t = T(e), n = 0; n < t.length; n++) t[n].appendChild(this[0]);
                return this
            },
            find: function(e) {
                return this[0] || (e = void 0), T(e, this[0])
            },
            toggleClass: function(e, t, n) {
                var o = [],
                    i = void 0 !== t;
                return I(e) && (o = e.match(p) || []), this.each((function(e, r) {
                    if (1 === r.nodeType)
                        for (var s = 0; s < o.length; s++) i ? (n = t ? "add" : "remove", r.classList[n](o[s])) : r.classList.toggle(o[s])
                }))
            },
            addClass: function(e) {
                return this.toggleClass(e, !0, "add"), this
            },
            removeClass: function(e) {
                return e ? this.toggleClass(e, !1, "remove") : this.attr("class", ""), this
            },
            remove: function() {
                return this.each((function(e, t) {
                    t.parentNode.removeChild(t)
                })), this
            },
            children: function() {
                var e = [];
                return this.each((function(t, n) {
                    o.apply(e, n.children)
                })), T(e)
            },
            map: function(e) {
                const t = !window.DISABLE_NATIVE_CONSTANTS && window.VWO._.nativeConstants.get("Array").prototype.map || [].map;
                return T(t.call(this, (function(t, n) {
                    return e.call(t, n, t)
                })))
            },
            clone: function() {
                return this.map((function(e, t) {
                    return t.cloneNode(!0)
                }))
            },
            filter: function(e) {
                var t, n, o, r, s, a = e;
                I(a) && (a = function(t, n) {
                    return C(n, e)
                });
                const d = !window.DISABLE_NATIVE_CONSTANTS && (null === (s = null === (r = null === (o = null === (n = null === (t = window.VWO._) || void 0 === t ? void 0 : t.nativeConstants) || void 0 === n ? void 0 : n.get) || void 0 === o ? void 0 : o.call(n, "Array")) || void 0 === r ? void 0 : r.prototype) || void 0 === s ? void 0 : s.filter) || i;
                return T(d.call(this, (function(e, t) {
                    return a.call(e, t, e)
                })))
            },
            parents: function(e) {
                var t = [];
                return this.each((function(e, n) {
                    for (var o = n.parentNode; o && 9 !== o.nodeType;) t.push(o), o = o.parentNode
                })), t = t.filter((function(e, n) {
                    return t.indexOf(e) === n
                })), e && (t = t.filter((function(t) {
                    return C(t, e)
                }))), T(t)
            },
            append: function() {
                var e = this;
                return q(arguments, (function(t, n) {
                    Y(e, T(n))
                })), this
            },
            prepend: function() {
                var e = this;
                return q(arguments, (function(t, n) {
                    Y(e, T(n), !0)
                })), this
            },
            html: function(e) {
                try {
                    if (!this.length) return this;
                    window._vwo_spaR && this.each((function(t, n) {
                        e !== n.innerHTML && (n.__vwoControlInnerHTML = n.innerHTML.replaceAll(/(?=<!--)([\s\S]*?)-->/gm, ""), n.__vwoExpInnerHTML = e)
                    }));
                    let t = e && e.includes("<br>");
                    return void 0 === e ? this[0] && this[0].innerHTML : this.each((function(n, o) {
                        1 === o.childNodes.length && 3 === o.childNodes[0].nodeType && o.childNodes[0].textContent && !t ? o.childNodes[0].textContent = e : o.innerHTML = e
                    }))
                } catch (e) {
                    lc(`Error is ${e}`, "html")
                }
            },
            css: function(e, t) {
                if (I(e)) {
                    var n = A(e);
                    return e = x(e, n), arguments.length < 2 ? this[0] && k(this[0], e, n) : e ? (t = U(e, t, n), this.each((function(o, i) {
                        R(i) && (n ? i.style.setProperty(e, t) : i.style[e] = t)
                    }))) : this
                }
                for (var o in e) this.css(o, e[o]);
                return this
            },
            hashchange: function(e) {
                window.addEventListener("hashchange", e)
            },
            replaceWith: function(e) {
                return this.each((function(t, n) {
                    var o = n.nextSibling,
                        i = n.parentNode;
                    T(n).remove(), o ? T(o).before(e) : T(i).append(e)
                }))
            },
            before: function() {
                var e = this;
                return q(arguments, (function(t, n) {
                    T(n).insertBefore(e)
                })), this
            },
            after: function() {
                var e = this;
                const t = !window.DISABLE_NATIVE_CONSTANTS && window.VWO._.nativeConstants.get("Array").prototype.reverse || l;
                return q(t.apply(arguments), (function(n, o) {
                    t.apply(T(o).slice()).insertAfter(e)
                })), this
            },
            insertBefore: function(e) {
                var t = this;
                return T(e).each((function(e, n) {
                    var o = n.parentNode;
                    o && t.each((function(t, i) {
                        X(o, e ? i.cloneNode(!0) : i, !0, n)
                    }))
                })), this
            },
            insertAfter: function(e) {
                var t = this;
                return T(e).each((function(e, n) {
                    var o = n.parentNode;
                    o && t.each((function(t, i) {
                        X(o, e ? i.cloneNode(!0) : i, !0, n.nextSibling)
                    }))
                })), this
            },
            trigger: function(t, n) {
                var o, i;
                if (I(t)) {
                    var r = [(i = t.split("."))[0], i.slice(1).sort()],
                        s = r[0],
                        a = r[1],
                        d = E.test(s) ? "MouseEvents" : "HTMLEvents";
                    (o = e.createEvent(d)).initEvent(s, !0, !0), o.namespace = a.join(".")
                } else o = t;
                o.data = n;
                var c = o.type in O;
                return this.each((function(e, t) {
                    c && $(t[o.type]) ? t[o.type]() : t.dispatchEvent(o)
                }))
            },
            contents: function() {
                return this[0] ? T(this[0].childNodes) : T("")
            },
            not: function(e) {
                return T(this).filter((function(t, n) {
                    return !C(n, e)
                }))
            }
        }).bind = T.fn.live = T.fn.on, T.inArray = function(e, t) {
            return s.call(t, e)
        }, T.trim = function(e) {
            return (e || "").replace(g, "")
        }, T.getScript = function(e, t) {
            return T.get(e, void 0, t, "script")
        }, T.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), (function(e, t) {
            T.fn[t] = function(e) {
                return "submit" === t ? this[0].submit() : e ? this.bind(t, e) : this.trigger(t)
            }, T.attrFn && (T.attrFn[t] = !0)
        })), T.guid = 1, T.proxy = function(e, t, n) {
            return 2 === arguments.length && ("string" == typeof t ? (e = (n = e)[t], t = void 0) : t && !$(t) && (n = t, t = void 0)), !t && e && (t = function() {
                return e.apply(n || this, arguments)
            }), e && (t.guid = e.guid = e.guid || t.guid || T.guid++), t
        }, (T.fn.init = function(t, n) {
            var i, r, s = !1;
            if (I(t) && /<.+>/.test(t)) {
                s = !0;
                try {
                    r = t, G || (G = e.implementation.createHTMLDocument(null)), G.body.innerHTML = r, t = G.body.childNodes
                } catch (e) {
                    throw e
                }
            }
            if (!t) return this;
            if (t && t.nodeType || H(t)) return this[0] = t, this.length = 1, this;
            if (I(t)) {
                n = n || e;
                var a = this.constructor(),
                    d = n instanceof T ? (null === (i = n) || void 0 === i ? void 0 : i.toArray()) || [] : [n];
                for (let e = 0; e < d.length; e++) try {
                    const n = d[e];
                    var c = /^#[\w-]*$/.test(t) && n.getElementById ? n.getElementById(t.slice(1)) : n.querySelectorAll(t);
                    c && c.nodeType && (c = [c]), o.apply(a, s ? t : c)
                } catch (e) {}
                return a
            }
            if ($(t)) return T.fn.ready(t);
            for (var l = 0; l < t.length; l++) this.length = t.length, this[l] = t[l]
        }).prototype = T.fn, T.fn.splice = a, "function" == typeof Symbol && (T.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]), T.prototype.slice = function() {
            return T(n.apply(this, arguments))
        }, T.prototype.length = 0, T.nodeName = function(e, t) {
            return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
        }, T
    }();
    cc(uc)
})();
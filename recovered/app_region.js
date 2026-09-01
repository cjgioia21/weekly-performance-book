        registered: [],
        submittals: [],
        clientInterviews: []
      }
    },
    sales: {
      weeks: [],
      totalCalls: [],
      prospectTouches: [],
      clientTouches: [],
      prospectEmails: [],
      clientEmails: [],
      prospectMeetings: [],
      clientMeetings: [],
      prospectDMCalls: [],
      contractsSent: [],
      contractsSigned: [],
      newClients: [],
      repTotals: {}
    },
    currentWeek: 0,
    weekEnding: ""
  };
  var U = Xe(Qp()),
    zrt = typeof window != "undefined" && window.__BTG_LOGO__ || "",
    q6 = "wpb_data_v2",
    fhe = "wpb_theme",
    hhe = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"],
    dhe = [{
      id: "ov_insights",
      tab: "Overview",
      label: "Auto-insights row"
    }, {
      id: "ov_hero",
      tab: "Overview",
      label: "Hero KPIs (GM$, Revenue, Perm, Paid)"
    }, {
      id: "ov_strip",
      tab: "Overview",
      label: "Secondary KPIs (fill, calls, clients)"
    }, {
      id: "ov_progress",
      tab: "Overview",
      label: "Progress vs goals"
    }, {
      id: "ov_period",
      tab: "Overview",
      label: "Period comparison"
    }, {
      id: "ov_charts",
      tab: "Overview",
      label: "Trend charts (GM, revenue, orders)"
    }, {
      id: "tg_kpis",
      tab: "Team Goals",
      label: "Goal KPIs"
    }, {
      id: "tg_charts",
      tab: "Team Goals",
      label: "Goal charts"
    }, {
      id: "rc_kpis",
      tab: "Recruitment (Current Team)",
      label: "Recruiting KPIs"
    }, {
      id: "rc_open",
      tab: "Recruitment (Current Team)",
      label: "Open temp / perm orders"
    }, {
      id: "rc_funnel",
      tab: "Recruitment (Current Team)",
      label: "Recruiting funnel chart"
    }, {
      id: "rc_gm",
      tab: "Recruitment (Current Team)",
      label: "GM$ contribution chart"
    }, {
      id: "rc_head",
      tab: "Recruitment (Current Team)",
      label: "Net headcount chart"
    }, {
      id: "rc_scorecard",
      tab: "Recruitment (Current Team)",
      label: "Recruiter scorecard"
    }, {
      id: "sa_funnel",
      tab: "Sales",
      label: "Sales funnel"
    }, {
      id: "sa_conversion",
      tab: "Sales",
      label: "Conversion & touches charts"
    }, {
      id: "sa_leaderboard",
      tab: "Sales",
      label: "Rep leaderboard"
    }],
    phe = {
      custom: {
        label: "Custom",
        tabs: null,
        widgets: null
      },
      executive: {
        label: "Executive",
        tabs: {
          Overview: !0,
          "Team Goals": !0,
          "Recruitment (Current Team)": !1,
          Sales: !1
        },
        widgets: {
          ov_insights: !0,
          ov_hero: !0,
          ov_strip: !0,
          ov_progress: !0,
          ov_period: !0,
          ov_charts: !0
        }
      },
      sales: {
        label: "Sales-Focused",
        tabs: {
          Overview: !0,
          "Team Goals": !1,
          "Recruitment (Current Team)": !1,
          Sales: !0
        },
        widgets: {
          ov_insights: !0,
          ov_hero: !0,
          ov_strip: !0,
          ov_progress: !1,
          ov_period: !0,
          ov_charts: !1
        }
      },
      recruitment: {
        label: "Recruitment-Focused",
        tabs: {
          Overview: !0,
          "Team Goals": !1,
          "Recruitment (Current Team)": !0,
          Sales: !1
        },
        widgets: {
          ov_insights: !0,
          ov_hero: !0,
          ov_strip: !1,
          ov_progress: !0,
          ov_period: !1,
          ov_charts: !1
        }
      },
      minimal: {
        label: "Minimal",
        tabs: {
          Overview: !0,
          "Team Goals": !1,
          "Recruitment (Current Team)": !1,
          Sales: !1
        },
        widgets: {
          ov_insights: !1,
          ov_hero: !0,
          ov_strip: !0,
          ov_progress: !1,
          ov_period: !1,
          ov_charts: !1
        }
      }
    },
    $rt = [
      ["primary", "Primary (buttons, funnel, links)"],
      ["secondary", "Secondary accent"],
      ["background", "Page background"],
      ["surface", "Card / surface"],
      ["text", "Text"],
      ["muted", "Muted text"],
      ["line", "Borders & grid lines"],
      ["chart1", "Chart series 1"],
      ["chart2", "Chart series 2"],
      ["chart3", "Chart series 3"],
      ["chart4", "Chart series 4"],
      ["chart5", "Chart series 5"],
      ["chart6", "Chart series 6"]
    ],
    U4 = {
      template: "custom",
      tabs: {},
      widgets: {},
      theme: {},
      brand: null
    };

  function Fb(e) {
    let t = e && e.config || {};
    return {
      template: t.template || "custom",
      tabs: {
        ...t.tabs || {}
      },
      widgets: {
        ...t.widgets || {}
      },
      theme: {
        ...t.theme || {}
      },
      brand: t.brand || e && e.brand || null
    }
  }
  var P1 = (e, t) => e.tabs[t] !== !1,
    R4 = (e, t) => e.widgets[t] !== !1,
    Ld = e => {
      let t = Fb(e);
      return t.brand && t.brand.name || "Weekly Performance Book"
    },
    Xrt = {
      primary: "--accent",
      secondary: "--accent2",
      background: "--bg",
      surface: "--panel",
      text: "--text",
      muted: "--muted",
      line: "--line"
    },
    I1 = {
      c1: "#2563EB",
      c2: "#0EA5E9",
      c3: "#16A34A",
      c4: "#DB2777",
      c5: "#7C3AED",
      c6: "#EA580C"
    };

  function She(e) {
    let t = e.theme || {};
    return {
      blue: t.chart1 || I1.c1,
      sky: t.chart2 || I1.c2,
      green: t.chart3 || I1.c3,
      rose: t.chart4 || I1.c4,
      violet: t.chart5 || I1.c5,
      orange: t.chart6 || I1.c6,
      amber: t.chart6 || "#A9B8CC",
      faint: t.muted || "#9AA6B6"
    }
  }

  function Yrt(e) {
    let t = e.theme || {},
      r = document.documentElement;
    for (let [n, i] of Object.entries(Xrt)) t[n] ? r.style.setProperty(i, t[n]) : r.style.removeProperty(i);
    t.line ? r.style.setProperty("--grid", t.line) : r.style.removeProperty("--grid"), !t.primary && e.brand && e.brand.accent && (r.style.setProperty("--accent", e.brand.accent), r.style.setProperty("--accent2", e.brand.accent)), Object.assign(Qr, She(e))
  }
  var Qr = {
    blue: "#2563EB",
    orange: "#EA580C",
    green: "#16A34A",
    sky: "#0EA5E9",
    violet: "#7C3AED",
    rose: "#DB2777",
    amber: "#F59E0B",
    faint: "#9AA6B6"
  };
  var Zr = e => (e || []).reduce((t, r) => t + (Number(r) || 0), 0),
    UA = e => e && e.length ? e[e.length - 1] : null;

  function Che(e) {
    e.gmPerHour = e.tempGM.map((n, i) => {
      let a = e.hours[i];
      return a ? +(n / a).toFixed(2) : 0
    }), e.gmPct = e.totalGM.map((n, i) => {
      let a = e.revenue[i];
      return a ? +(n / a).toFixed(2) : 0
    });
    let t = 0;
    e.cum2026 = e.totalGM.map(n => (t += n, +t.toFixed(2)));
    let r = 0;
    e.ytdFill = e.weeklyFill.map((n, i) => (r += Math.min(1, Math.max(0, +n || 0)), +(r / (i + 1)).toFixed(4)))
  }
  var L1 = ["tempGM", "totalGM", "budget", "revenue", "hours", "peoplePaid", "clientsBilled", "newClients", "newTempOrders", "openTempOrders", "openPerm", "weeklyFill"],
    Hp = ["gm", "peoplePaid", "starts", "ends", "interviews", "registered", "submittals", "clientInterviews"],
    kb = ["totalCalls", "prospectDMCalls", "prospectTouches", "clientTouches", "prospectEmails", "clientEmails", "prospectMeetings", "clientMeetings", "contractsSent", "contractsSigned", "newClients"],
    Id = ["calls", "prospectDMCalls", "prospectMeetings", "clientMeetings", "contracts", "signed", "firstOrder", "newAccounts", "gm", "prospectTouches", "clientTouches"],
    Jrt = {
      calls: "Prospect Attempts",
      prospectDMCalls: "DM Calls",
      prospectMeetings: "Prospect Mtg",
      clientMeetings: "Client Mtg",
      contracts: "Sent",
      signed: "Signed",
      firstOrder: "First Order",
      newAccounts: "New Accts",
      gm: "GM$",
      prospectTouches: "Prospect Touch",
      clientTouches: "Client Touch"
    };

  function LA(e) {
    return !!(e && e.teams && Object.keys(e.teams).length > 0)
  }

  function Zrt(e) {
    return LA(e) ? Object.keys(e.teams).map(t => ({
      id: t,
      name: e.teams[t] && e.teams[t].name || t
    })) : []
  }

  function P4(e) {
    let t = e.reduce((n, i) => Math.max(n, (i || []).length), 0),
      r = new Array(t).fill(0);
    for (let n of e)
      for (let i = 0; i < (n || []).length; i++) r[i] += +n[i] || 0;
    return r
  }

  function ghe(e) {
    let t = Object.values(e.teams || {});
    if (!t.length) return e;
    let r = t.reduce((f, h) => Math.max(f, h.currentWeek || (h.teamGoals && h.teamGoals.totalGM ? h.teamGoals.totalGM.length : 0)), 0),
      n = t.slice().sort((f, h) => (h.currentWeek || 0) - (f.currentWeek || 0))[0],
      i = {
        weeks: (n.teamGoals.weeks || []).slice(),
        weekDates: (n.teamGoals.weekDates || []).slice()
      },
      a = new Set(L1);
    for (let f of t)
      for (let h in f.teamGoals || {}) Array.isArray(f.teamGoals[h]) && !["weeks", "weekDates", "gmPerHour", "gmPct", "cum2026", "ytdFill", "ytdFillSheet"].includes(h) && a.add(h);
    for (let f of a) i[f] = P4(t.map(h => h.teamGoals[f]));
    i.goals = {};
    for (let f of t) {
      let h = f.teamGoals && f.teamGoals.goals || {};
      for (let p in h) i.goals[p] = (i.goals[p] || 0) + (+h[p] || 0)
    }
    i.cum2025 = P4(t.map(f => f.teamGoals.cum2025)), Che(i);
    let s = {};
    for (let f of t)
      for (let h of f.recruitment && f.recruitment.recruiters || []) {
        let p = h.name,
          d = s[p] || (s[p] = {
            name: h.name
          });
        for (let g in h) g !== "name" && Array.isArray(h[g]) && (d[g] = P4([d[g], h[g]]))
      }
    let o = {
        weeks: i.weeks.slice(0, r),
        recruiters: Object.values(s),
        total: {}
      },
      l = {
        weeks: i.weeks.slice(0, r)
      },
      A = new Set;
    for (let f of t)
      for (let h in f.sales || {}) h !== "weeks" && h !== "repTotals" && Array.isArray(f.sales[h]) && A.add(h);
    for (let f of A) l[f] = P4(t.map(h => h.sales && h.sales[f]));
    let u = {};
    for (let f of t)
      for (let [h, p] of Object.entries(f.sales && f.sales.repTotals || {})) {
        let d = u[h] || (u[h] = {
          calls: 0,
          prospectDMCalls: 0,
          prospectMeetings: 0,
          clientMeetings: 0,
          contracts: 0,
          signed: 0,
          firstOrder: 0,
          newAccounts: 0,
          gm: 0,
          meetings: 0,
          prospectTouches: 0,
          clientTouches: 0
        });
        for (let g of Id) d[g] = (d[g] || 0) + (+p[g] || 0);
        d.meetings = d.prospectMeetings + d.clientMeetings
      }
    l.repTotals = u;
    let c = {
      ...e,
      teamGoals: i,
      recruitment: o,
      sales: l,
      currentWeek: r,
      weekEnding: i.weekDates[r - 1] || e.weekEnding
    };
    return delete c.teams, ont(c), c
  }

  function ent(e) {
    if (!LA(e)) return [];
    let t = 52,
      r = Object.keys(e.teams).map(n => {
        let i = e.teams[n],
          a = i && i.teamGoals || {},
          s = i.currentWeek || (a.totalGM ? a.totalGM.length : 0),
          o = g => (g || []).slice(0, s).reduce((m, v) => m + (+v || 0), 0),
          l = o(a.totalGM),
          A = o(a.revenue),
          u = a.goals && +a.goals.margin || 0,
          c = a.goals && +a.goals.bill || 0,
          f = u ? u * (s / t) : 0,
          h = f ? l / f : null,
          p = s ? l * (t / s) : 0,
          d = "none";
        return h != null && (d = h >= 1 ? "ahead" : h >= .9 ? "ontrack" : "behind"), {
          id: n,
          name: i.name || n,
          weeks: s,
          gm: l,
          revenue: A,
          goalMargin: u,
          goalBill: c,
          expGM: f,
          pace: h,
          projGM: p,
          status: d
        }
      });
    return r.sort((n, i) => i.gm - n.gm), r.forEach((n, i) => {
      n.rank = i + 1
    }), r
  }
  var mhe = {
    ahead: {
      label: "Ahead",
      cls: "ahead"
    },
    ontrack: {
      label: "On track",
      cls: "ontrack"
    },
    behind: {
      label: "Behind",
      cls: "behind"
    },
    none: {
      label: "No goal",
      cls: "none"
    }
  };

  function Ehe({
    rows: e,
    compact: t,
    currentTeam: r,
    youTeam: n,
    onPick: i
  }) {
    if (!e || !e.length) return (0, U.jsx)("div", {
      className: "empty-hint",
      children: "No teams to rank yet. Add a second team to see the leaderboard."
    });
    let a = e.reduce((s, o) => Math.max(s, o.gm || 0), 0) || 1;
    return (0, U.jsxs)("div", {
      className: "tlb" + (t ? " compact" : ""),
      children: [(0, U.jsxs)("div", {
        className: "tlb-head",
        children: [(0, U.jsx)("span", {
          className: "tlb-c-rank",
          children: "#"
        }), (0, U.jsx)("span", {
          className: "tlb-c-team",
          children: "Team"
        }), (0, U.jsx)("span", {
          className: "tlb-c-gm",
          children: "GM$ YTD"
        }), !t && (0, U.jsx)("span", {
          className: "tlb-c-goal",
          children: "Goal"
        }), (0, U.jsx)("span", {
          className: "tlb-c-pace",
          children: "Pace vs goal"
        }), !t && (0, U.jsx)("span", {
          className: "tlb-c-proj",
          children: "Proj. year-end"
        }), (0, U.jsx)("span", {
          className: "tlb-c-status",
          children: "Status"
        })]
      }), e.map(s => {
        let o = mhe[s.status] || mhe.none,
          l = n && s.id === n,
          A = r && s.id === r;
        return (0, U.jsxs)("div", {
          className: "tlb-row" + (A ? " current" : "") + (l ? " you" : "") + (i ? " clickable" : ""),
          onClick: i ? () => i(s.id) : void 0,
          title: i ? "View " + s.name : void 0,
          children: [(0, U.jsx)("span", {
            className: "tlb-c-rank",
            children: (0, U.jsx)("span", {
              className: "tlb-rank r" + s.rank,
              children: s.rank
            })
          }), (0, U.jsxs)("span", {
            className: "tlb-c-team",
            children: [(0, U.jsx)("span", {
              className: "tlb-team-name",
              children: s.name
            }), l && (0, U.jsx)("span", {
              className: "tlb-you",
              children: "Your team"
            }), (0, U.jsxs)("span", {
              className: "tlb-weeks",
              children: [s.weeks, " ", s.weeks === 1 ? "week" : "weeks"]
            })]
          }), (0, U.jsxs)("span", {
            className: "tlb-c-gm",
            children: [(0, U.jsx)("span", {
              className: "tlb-gm-val",
              children: Lu(s.gm)
            }), (0, U.jsx)("span", {
              className: "tlb-bar",
              children: (0, U.jsx)("span", {
                className: "tlb-bar-fill",
                style: {
                  width: jp(s.gm / a) * 100 + "%"
                }
              })
            })]
          }), !t && (0, U.jsx)("span", {
            className: "tlb-c-goal",
            children: s.goalMargin ? Lu(s.goalMargin) : "\u2014"
          }), (0, U.jsx)("span", {
            className: "tlb-c-pace",
            children: s.pace == null ? "\u2014" : Math.round(s.pace * 100) + "%"
          }), !t && (0, U.jsx)("span", {
            className: "tlb-c-proj",
            children: s.projGM ? Lu(s.projGM) : "\u2014"
          }), (0, U.jsx)("span", {
            className: "tlb-c-status",
            children: (0, U.jsx)("span", {
              className: "tlb-pill " + o.cls,
              children: o.label
            })
          })]
        }, s.id)
      })]
    })
  }

  function The(e, t) {
    return !!(LA(e) && t && t !== "__all__" && e.teams && e.teams[t])
  }

  function tnt(e, t) {
    return The(e, t) ? e.teams[t] : e
  }

  function rnt(e, t, r) {
    return The(e, t) ? {
      ...e,
      teams: {
        ...e.teams,
        [t]: r
      }
    } : r
  }

  function nnt(e, t, r, n) {
    let i = e.teams && e.teams[t] || {},
      a = r.teamGoals && r.teamGoals.goals || {},
      s = Object.values(a).some(l => l) ? a : i.teamGoals && i.teamGoals.goals || {},
      o = {
        ...i,
        name: i.name || t,
        teamGoals: {
          ...r.teamGoals,
          goals: s
        },
        recruitment: r.recruitment,
        sales: r.sales,
        currentWeek: r.currentWeek,
        weekEnding: r.weekEnding,
        _year: r._year,
        _importMeta: {
          file: n,
          at: new Date().toISOString()
        }
      };
    return {
      ...e,
      teams: {
        ...e.teams,
        [t]: o
      }
    }
  }

  function int(e, t) {
    if (!LA(e)) return e;
    if (!t || t === "__all__") return ghe(e);
    let r = e.teams[t];
    return r ? {
      ...e,
      teamGoals: r.teamGoals,
      recruitment: r.recruitment,
      sales: r.sales,
      currentWeek: r.currentWeek,
      weekEnding: r.weekEnding,
      _year: r._year || e._year,
      archive: e.archive
    } : ghe(e)
  }

  function ant(e, t) {
    let r = JSON.parse(JSON.stringify(e)),
      n = r.teamGoals,
      i = r.recruitment,
      a = r.sales,
      s = (r.currentWeek || n.totalGM.length) + 1;
    (n.weeks = n.weeks || []).push("W" + s), (n.weekDates = n.weekDates || []).push((t.weekDate || "").trim() || "Week " + s);
    for (let u of L1)(n[u] = n[u] || []).push(+t.tg[u] || 0);
    n.cum2025 = n.cum2025 || [], n.cum2025.push(n.cum2025.length ? n.cum2025[n.cum2025.length - 1] : 0), Che(n);
    for (let u of i.recruiters || []) {
      let c = t.recruiters && t.recruiters[u.name] || {};
      for (let f of Hp)(u[f] = u[f] || []).push(+c[f] || 0)
    }
    i.weeks = n.weeks.slice(0, s);
    let o = u => (i.recruiters || []).reduce((c, f) => c + (+(f[u] || [])[s - 1] || 0), 0),
      l = i.total;
    for (let u of ["starts", "ends", "interviews", "registered", "submittals", "clientInterviews"])(l[u] = l[u] || []).push(o(u));
    let A = o("peoplePaid");
    (l.paidByRecruiter = l.paidByRecruiter || []).push(A), (l.paidHouse = l.paidHouse || []).push(Math.max(0, (+t.tg.peoplePaid || 0) - A)), (l.openOrders = l.openOrders || []).push(+t.openOrders || 0);
    for (let u of kb)(a[u] = a[u] || []).push(+t.sales[u] || 0);
    if (a.weeks = n.weeks.slice(0, s), t.reps) {
      a.repTotals = a.repTotals || {};
      for (let [u, c] of Object.entries(t.reps)) {
        let f = a.repTotals[u] || {
          calls: 0,
          prospectDMCalls: 0,
          prospectMeetings: 0,
          clientMeetings: 0,
          contracts: 0,
          signed: 0,
          firstOrder: 0,
          newAccounts: 0,
          gm: 0,
          meetings: 0,
          prospectTouches: 0,
          clientTouches: 0
        };
        for (let h of Id) f[h] = (f[h] || 0) + (+c[h] || 0);
        f.meetings = f.prospectMeetings + f.clientMeetings, a.repTotals[u] = f
      }
    }
    return r._weekLedger = r._weekLedger || [], r._weekLedger.push({
      week: s,
      reps: t.reps ? JSON.parse(JSON.stringify(t.reps)) : {}
    }), r.currentWeek = s, r.weekEnding = n.weekDates[s - 1], r
  }

  function snt(e) {
    let t = JSON.parse(JSON.stringify(e)),
      r = t.teamGoals,
      n = t.recruitment,
      i = t.sales,
      a = t.currentWeek || r.totalGM.length;
    if (a <= 1) return t;
    let s = A => {
      for (let u in A) Array.isArray(A[u]) && A[u].length >= a && A[u].pop()
    };
    s(r), (n.recruiters || []).forEach(A => s(A)), s(n.total), s(i);
    let o = t._weekLedger || [],
      l = o.length ? o[o.length - 1] : null;
    if (l && l.week === a && l.reps && i.repTotals) {
      for (let [A, u] of Object.entries(l.reps)) {
        let c = i.repTotals[A];
        if (c) {
          for (let f of Id) c[f] = (c[f] || 0) - (+u[f] || 0);
          c.meetings = (c.prospectMeetings || 0) + (c.clientMeetings || 0)
        }
      }
      o.pop()
    }
    return t.currentWeek = a - 1, t.weekEnding = r.weekDates[a - 2], t
  }

  function ont(e) {
    let t = e.recruitment,
      r = e.teamGoals,
      n = e.currentWeek || (r.totalGM ? r.totalGM.length : 0),
      i = t.recruiters || [],
      a = (s, o) => i.reduce((l, A) => l + (+(A[s] || [])[o] || 0), 0);
    t.total = t.total || {};
    for (let s of ["starts", "ends", "interviews", "registered", "submittals", "clientInterviews"]) t.total[s] = Array.from({
      length: n
    }, (o, l) => a(s, l));
    t.total.paidByRecruiter = Array.from({
      length: n
    }, (s, o) => a("peoplePaid", o)), t.total.paidHouse = Array.from({
      length: n
    }, (s, o) => Math.max(0, ((r.peoplePaid || [])[o] || 0) - t.total.paidByRecruiter[o]))
  }
  var z6 = e => (Ld(e) || "Weekly Performance Book").trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "") || "Weekly-Performance-Book",
    khe = () => new Date().toISOString().slice(0, 10);

  function lnt(e) {
    let t = JSON.parse(JSON.stringify(e)),
      r = 52,
      n = c => {
        let f = Array.isArray(c) ? c.slice(0, r) : [];
        for (; f.length < r;) f.push(0);
        return f
      },
      i = t.teamGoals;
    for (let c of L1) i[c] = n(i[c]);
    i.gmPerHour = n(i.gmPerHour), i.gmPct = n(i.gmPct), i.cum2026 = n(i.cum2026), i.cum2025 = n(i.cum2025), i.ytdFill = n(i.ytdFill), i.weeks = Array.from({
      length: r
    }, (c, f) => "W" + (f + 1)), i.weekDates = Array.from({
      length: r
    }, () => "");
    let a = t.recruitment.total || {};
    for (let c of ["paidByRecruiter", "paidHouse", "starts", "ends", "openOrders", "interviews", "registered", "submittals", "clientInterviews"]) a[c] = n(a[c]);
    (t.recruitment.recruiters || []).forEach(c => {
      for (let f of Hp) c[f] = n(c[f])
    }), t.recruitment.weeks = i.weeks.slice();
    for (let c of kb.concat(["prospectTouches", "clientTouches"])) t.sales[c] = n(t.sales[c]);
    t.sales.weeks = i.weeks.slice(), t.currentWeek = r;
    let s = Fhe(t),
      o = O5(s, {
        type: "array",
        bookType: "xlsx"
      }),
      l = new Blob([o], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      A = URL.createObjectURL(l),
      u = document.createElement("a");
    u.href = A, u.download = z6(e) + "_template.xlsx", document.body.appendChild(u), u.click(), u.remove(), setTimeout(() => URL.revokeObjectURL(A), 4e3)
  }

  function Fhe(e) {
    let t = e.teamGoals,
      r = e.recruitment,
      n = e.sales,
      i = e.currentWeek || t.totalGM.length,
      a = (t.weeks || []).slice(0, i),
      s = (t.weekDates || []).slice(0, i),
      o = (g, m) => [g, ...(m || []).slice(0, i).map(v => v == null ? 0 : v)],
      l = t.goals || {},
      A = [
        ["Week label", ...a],
        ["Week ending (text)", ...s], o("Temp GM$ (Margin)", t.tempGM), o("Total GM$", t.totalGM), o("Weekly Budget", t.budget), o("Temp Revenue (Bill)", t.revenue), o("Weekly Hours", t.hours), o("People Paid (Headcount)", t.peoplePaid), o("Clients Billed", t.clientsBilled), o("New Clients", t.newClients), o("Cumulative GM$ 2025", t.cum2025), o("New Temp Orders", t.newTempOrders), o("Open Temp Orders", t.openTempOrders), o("Open Perm Orders", t.openPerm), o("Weekly Fill Rate", t.weeklyFill), o("YTD Temp Order Filled %", t.ytdFillSheet || t.ytdFill || []), [],
        ["Goal - Bill", l.bill || 0],
        ["Goal - Pay", l.pay || 0],
        ["Goal - Margin", l.margin || 0],
        ["Goal - Headcount", l.headcount || 0]
      ],
      u = [
        ["Week label", ...a]
      ];
    for (let g of r.recruiters || []) u.push(["RECRUITER: " + g.name]), u.push(o("GM$ Contribution", g.gm)), u.push(o("People Paid", g.peoplePaid)), u.push(o("Starts", g.starts)), u.push(o("Ends", g.ends)), u.push(o("Interviews", g.interviews)), u.push(o("Registered", g.registered)), u.push(o("Submittals", g.submittals)), u.push(o("Client Interviews", g.clientInterviews));
    let c = r.total || {};
    u.push(["TOTALS"]), u.push(o("People Paid By Current Recruiters", c.paidByRecruiter)), u.push(o("House People Paid", c.paidHouse)), u.push(o("Starts", c.starts)), u.push(o("Ends", c.ends)), u.push(o("Open Orders", c.openOrders)), u.push(o("Interviews", c.interviews)), u.push(o("Registered", c.registered)), u.push(o("Submittals", c.submittals)), u.push(o("Client Interviews", c.clientInterviews));
    let f = [
      ["Week label", ...a],
      ["Week ending (text)", ...s], o("Total Calls", n.totalCalls), o("Prospect DM Calls", n.prospectDMCalls), o("Prospect Touches", n.prospectTouches), o("Client Touches", n.clientTouches), o("Prospect Emails", n.prospectEmails), o("Client Emails", n.clientEmails), o("Prospect Meetings", n.prospectMeetings), o("Client Meetings", n.clientMeetings), o("Contracts Sent", n.contractsSent), o("Contracts Signed", n.contractsSigned), o("New Clients", n.newClients), [],
      ["REP TOTALS"],
      ["Rep", "Total Prospect Attempts", "Prospect DM Calls", "Prospect Meetings", "Client Meetings", "Contracts Sent", "Contracts Signed", "First Order", "New Accounts", "New GM$", "Prospect Touches", "Client Touches"]
    ];
    for (let [g, m] of Object.entries(n.repTotals || {})) f.push([g, m.calls || 0, m.prospectDMCalls || 0, m.prospectMeetings || 0, m.clientMeetings || 0, m.contracts || 0, m.signed || 0, m.firstOrder || 0, m.newAccounts || 0, m.gm || 0, m.prospectTouches || 0, m.clientTouches || 0]);
    let h = Bu.book_new();
    Bu.book_append_sheet(h, Bu.aoa_to_sheet(A), "Team Goals"), Bu.book_append_sheet(h, Bu.aoa_to_sheet(u), "Recruitment"), Bu.book_append_sheet(h, Bu.aoa_to_sheet(f), "Sales");
    let p = Fb(e),
      d = [
        ["Report", Ld(e)],
        ["Generated", new Date().toLocaleString()],
        ["Theme primary", p.theme && p.theme.primary || "default"]
      ];
    return Bu.book_append_sheet(h, Bu.aoa_to_sheet(d), "About"), h
  }

  function vhe(e) {
    let t = Fhe(e),
      r = O5(t, {
        type: "array",
        bookType: "xlsx"
      }),
      n = new Blob([r], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }),
      i = URL.createObjectURL(n),
      a = document.createElement("a");
    a.href = i, a.download = z6(e) + "_data_" + khe() + ".xlsx", document.body.appendChild(a), a.click(), document.body.removeChild(a), setTimeout(() => URL.revokeObjectURL(i), 1500)
  }
  var Ant = (e, t) => t == null || t === 0 || e == null ? null : (e - t) / Math.abs(t) * 100,
    Ea = e => e == null ? "\u2013" : "$" + Number(e).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    Lu = e => e == null ? "\u2013" : Math.abs(e) >= 1e6 ? "$" + (e / 1e6).toFixed(1) + "M" : Math.abs(e) >= 1e3 ? "$" + Math.round(e / 1e3) + "k" : "$" + Math.round(e),
    U1 = e => e == null ? "\u2013" : "$" + Number(e).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    Pr = e => e == null ? "\u2013" : Number.isInteger(+e) ? (+e).toLocaleString() : (+e).toLocaleString("en-US", {
      maximumFractionDigits: 1
    }),
    Ob = e => e == null ? "\u2013" : (e * 100).toFixed(2) + "%",
    jp = e => Math.max(0, Math.min(1, e || 0));

  function Ohe(e) {
    return Bu.sheet_to_json(e, {
      header: 1,
      raw: !0,
      defval: null
    })
  }
  var vs = e => String(e == null ? "" : e).trim().toLowerCase().replace(/\s+/g, " ");

  function I4(e, t) {
    let r = [];
    for (let n = 1; n <= t; n++) {
      let i = e[n];
      r.push(i == null || i === "" ? 0 : Number(i) || 0)
    }
    return r
  }

  function Tb(e) {
    if (!e) return 0;
    let t = 0;
    for (let r = 1; r < e.length; r++) e[r] != null && e[r] !== "" && (t = r);
    return t
  }

  function K6(e) {
    let t = n => e.find(i => vs(i[0]) === n),
      r = Tb(t("week ending (text)")) || Tb(t("week ending"));
    return r || (r = Tb(t("total gm$")) || Tb(t("total calls")) || Tb(t("week label"))), r
  }
  var yhe = {
      "temp gm$ (margin)": "tempGM",
      "total gm$": "totalGM",
      "weekly budget": "budget",
      "temp revenue (bill)": "revenue",
      "weekly hours": "hours",
      "people paid (headcount)": "peoplePaid",
      "clients billed": "clientsBilled",
      "new clients": "newClients",
      "cumulative gm$ 2025": "cum2025",
      "new temp orders": "newTempOrders",
      "open temp orders": "openTempOrders",
      "open perm orders": "openPerm",
      "weekly fill rate": "weeklyFill",
      "ytd temp order filled %": "ytdFillSheet"
    },
    whe = {
      "gm$ contribution": "gm",
      "people paid": "peoplePaid",
      starts: "starts",
      ends: "ends",
      interviews: "interviews",
      registered: "registered",
      submittals: "submittals",
      "client interviews": "clientInterviews"
    },
    xhe = {
      "people paid by current recruiters": "paidByRecruiter",
      "house people paid": "paidHouse",
      starts: "starts",
      ends: "ends",
      "open orders": "openOrders",
      interviews: "interviews",
      registered: "registered",
      submittals: "submittals",
      "client interviews": "clientInterviews"
    },
    bhe = {
      "total calls": "totalCalls",
      "prospect dm calls": "prospectDMCalls",
      "prospect touches": "prospectTouches",
      "client touches": "clientTouches",
      "prospect emails": "prospectEmails",
      "client emails": "clientEmails",
      "prospect meetings": "prospectMeetings",
      "client meetings": "clientMeetings",
      "contracts sent": "contractsSent",
      "contracts signed": "contractsSigned",
      "new clients": "newClients"
    },
    unt = {
      calls: "calls",
      "total prospect attempts": "calls",
      "prospect attempts": "calls",
      "prospect dm calls": "prospectDMCalls",
      "prospect meetings": "prospectMeetings",
      "client meetings": "clientMeetings",
      "contracts sent": "contracts",
      "contracts signed": "signed",
      "first order": "firstOrder",
      "new accounts": "newAccounts",
      "new gm$": "gm",
      "new gm": "gm",
      gm$: "gm",
      gm: "gm",
      "prospect touches": "prospectTouches",
      "client touches": "clientTouches"
    },
    cnt = e => {
      let t = new Date((e - 25569) * 864e5);
      return isNaN(t) ? "" : t.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      })
    };

  function fnt(e) {
    let t = JSON.parse(JSON.stringify(N1)),
      r = {
        recruitment: ["recruitment", "recruitng", "recruiting"]
      },
      n = ne => {
        let fe = r[vs(ne)] || [vs(ne)],
          ie = e.SheetNames.find(xe => fe.includes(vs(xe)));
        return ie ? Ohe(e.Sheets[ie]) : null
      },
      i = n("Team Goals");
    if (!i) return null;
    let a = (ne, fe) => {
        let ie = 0;
        for (;
          /^week \d+$/i.test(String((ne || [])[fe + ie] == null ? "" : (ne || [])[fe + ie]).trim());) ie++;
        return ie
      },
      s = ne => typeof ne == "number" && ne > 4e4 && ne < 5e4,
      o = (ne, fe) => {
        let ie = 0;
        for (; s((ne || [])[fe + ie]);) ie++;
        return ie
      },
      l = (ne, fe) => String((ne || [])[fe]).trim() === "Week 1" || o(ne, fe) >= 3,
      A = -1;
    for (let ne = 0; ne < Math.min(i.length, 10); ne++)
      if ((i[ne] || []).some(fe => String(fe).trim() === "Week 1")) {
        A = ne;
        break
      } if (A < 0) return null;
    let u = (i[A] || []).findIndex(ne => String(ne).trim() === "Week 1"),
      c = i[A + 1] || [],
      f = (ne, fe) => ne.find(ie => vs(ie && ie[0]) === vs(fe)) || [],
      h = (ne, fe, ie) => Array.from({
        length: ie
      }, (xe, Ee) => Number(ne[fe + Ee]) || 0),
      p = a(i[A], u);
    if (!p) return null;
    let d = t.teamGoals;
    d.weeks = Array.from({
      length: p
    }, (ne, fe) => "W" + (fe + 1)), d.weekDates = Array.from({
      length: p
    }, (ne, fe) => {
      let ie = c[u + fe];
      return typeof ie == "number" ? cnt(ie) : String(ie || "")
    });
    {
      let ne = Array.from({
        length: p
      }, (fe, ie) => c[u + ie]).find(fe => typeof fe == "number");
      ne && (t._year = new Date((ne - 25569) * 864e5).getUTCFullYear())
    }
    let g = ne => h(f(i, ne), u, p);
    d.clientsBilled = g("Clients Billed"), d.newClients = g("New Clients"), d.hours = g("Weekly Hours"), d.revenue = g("Temp Revenue (Bill)"), d.tempGM = g("Weekly Temp GM$ (Margin)");
    let m = g("Total GM$"),
      v = g("Perm/ Other");
    d.totalGM = m.some(ne => ne) ? m : d.tempGM.map((ne, fe) => +(ne + (v[fe] || 0)).toFixed(2)), d.budget = g("Weekly Budget"), d.peoplePaid = g("People Paid (Headcount)"), d.newTempOrders = g("New Temp Orders"), d.openTempOrders = g("Open Temp Orders"), d.openPerm = g("Open DH Orders"), d.weeklyFill = g("Weekly Fill Rate"), d.gmPerHour = d.tempGM.map((ne, fe) => d.hours[fe] ? +(ne / d.hours[fe]).toFixed(2) : 0), d.gmPct = d.totalGM.map((ne, fe) => d.revenue[fe] ? +(ne / d.revenue[fe]).toFixed(2) : 0);
    {
      let ne = c.findIndex(fe => vs(fe) === "yearly goal");
      if (ne > 0) {
        let fe = ie => {
          let xe = f(i, ie)[ne];
          return typeof xe == "number" && xe > 0 ? Math.round(xe) : null
        };
        d.goals = {
          bill: fe("Temp Revenue (Bill)"),
          pay: fe("Pay-Burden"),
          margin: fe("Total GM$") || fe("Weekly Temp GM$ (Margin)"),
          headcount: fe("People Paid (Headcount)")
        }
      }
    }
    let y = 0;
    d.cum2026 = d.totalGM.map(ne => (y += ne, +y.toFixed(2)));
    let C = 0;
    d.ytdFill = d.weeklyFill.map((ne, fe) => (C += Math.min(1, Math.max(0, +ne || 0)), +(C / (fe + 1)).toFixed(4))), t.currentWeek = p, t.weekEnding = d.weekDates[p - 1] || "";
    let B = n("Recruitment") || [],
      T = {
        "gm$ contribution": "gm",
        "people paid": "peoplePaid",
        starts: "starts",
        ends: "ends",
        "temp interviews": "interviews",
        registered: "registered",
        submittals: "submittals",
        "client interviews": "clientInterviews"
      },
      E = null,
      F = p;
    for (let ne of B) {
      let fe = String(ne && ne[0] == null ? "" : ne[0]).trim();
      if (fe && l(ne, 1)) {
        if (/^totals?$/i.test(fe)) {
          E = null;
          continue
        }
        F = Math.min(p, a(ne, 1) || o(ne, 1) || p), E = {
          name: fe,
          gm: [],
          peoplePaid: [],
          starts: [],
          ends: [],
          interviews: [],
          registered: [],
          submittals: [],
          clientInterviews: []
        }, t.recruitment.recruiters.push(E);
        continue
      }
      if (!E || !fe) continue;
      let ie = T[vs(fe)];
      ie && (E[ie] = h(ne, 1, Math.min(p, F)).concat(Array.from({
        length: Math.max(0, p - F)
      }, () => 0)))
    }
    t.recruitment.recruiters = t.recruitment.recruiters.filter(ne => ["gm", "peoplePaid", "starts", "ends", "interviews", "registered", "submittals", "clientInterviews"].some(fe => (ne[fe] || []).some(ie => ie)));
    let N = ne => Array.from({
        length: p
      }, (fe, ie) => t.recruitment.recruiters.reduce((xe, Ee) => xe + ((Ee[ne] || [])[ie] || 0), 0)),
      M = t.recruitment.total;
    M.starts = N("starts"), M.ends = N("ends"), M.interviews = N("interviews"), M.registered = N("registered"), M.submittals = N("submittals"), M.clientInterviews = N("clientInterviews"), M.paidByRecruiter = N("peoplePaid"), M.paidHouse = d.peoplePaid.map((ne, fe) => Math.max(0, (ne || 0) - (M.paidByRecruiter[fe] || 0))), M.openOrders = d.openTempOrders.slice(), t.recruitment.weeks = d.weeks.slice();
    let L = n("Sales") || [],
      I = {},
      ee = null,
      K = p;
    for (let ne of L) {
      let fe = String(ne && ne[0] == null ? "" : ne[0]).trim();
      if (fe && l(ne, 2)) {
        if (/^totals?$/i.test(fe)) {
          ee = null;
          continue
        }
        K = Math.min(p, a(ne, 2) || o(ne, 2) || p), ee = fe, I[fe] = {};
        continue
      }!ee || !fe || (I[ee][vs(fe)] = h(ne, 2, K).concat(Array.from({
        length: Math.max(0, p - K)
      }, () => 0)))
    }
    let V = () => Array.from({
        length: p
      }, () => 0),
      R = (ne, fe) => fe.forEach((ie, xe) => {
        ne[xe] = (ne[xe] || 0) + (+ie || 0)
      }),
      Q = {
        totalCalls: V(),
        prospectDMCalls: V(),
        prospectTouches: V(),
        clientTouches: V(),
        prospectEmails: V(),
        clientEmails: V(),
        prospectMeetings: V(),
        clientMeetings: V(),
        contractsSent: V(),
        contractsSigned: V(),
        newClients: V()
      };
    for (let [ne, fe] of Object.entries(I)) {
      let ie = (...Ze) => {
          for (let ht of Ze) {
            let dt = fe[vs(ht)];
            if (dt && dt.some(Jt => Jt)) return dt
          }
          return fe[vs(Ze[0])] || V()
        },
        xe = Ze => {
          for (let ht in fe)
            if (Ze.test(ht) && fe[ht].some(dt => dt)) return fe[ht];
          return V()
        },
        Ee = Ze => Ze.reduce((ht, dt) => ht + (+dt || 0), 0),
        Z = ie("Prospect DM Calls", "DM Meeting/ Calls"),
        Ie = ie("Prospect Meetings Booked", "Prospect Meetings"),
        qe = ie("Client Meetings Booked", "Client Meetings"),
        we = ie("Client Calls DM", "Client DM Calls"),
        le = ie("Total Touchers (not incl blasts)", "Total Touches"),
        Re = xe(/^gm\$ generated new client/),
        Ye = Ee(ie("Total Prospect Attempts")) ? ie("Total Prospect Attempts") : ie("Prospect Emails").map((Ze, ht) => Ze + (ie("Prospect Cold Calls")[ht] || 0) + (Z[ht] || 0));
      Ee(Ye) || (Ye = le);
      let Ve = Ee(ie("Prospect Total Touches")) ? ie("Prospect Total Touches") : Ee(ie("Prospect Emails")) || Ee(Z) || Ee(Ie) ? ie("Prospect Emails").map((Ze, ht) => Ze + (Z[ht] || 0) + (Ie[ht] || 0)) : le,
        lt = ie("Client Emails").map((Ze, ht) => Ze + (we[ht] || 0) + (qe[ht] || 0));
      R(Q.totalCalls, Ye), R(Q.prospectDMCalls, Z), R(Q.prospectTouches, Ve), R(Q.clientTouches, lt), R(Q.prospectEmails, ie("Prospect Emails")), R(Q.clientEmails, ie("Client Emails")), R(Q.prospectMeetings, Ie), R(Q.clientMeetings, qe), R(Q.contractsSent, ie("Contracts Sent", "Quotes Sendouts")), R(Q.contractsSigned, ie("Contracts Signed", "Quotes/ Contracts Signed")), R(Q.newClients, ie("New Clients"));
      let nt = Ze => Math.round(Ze);
      t.sales.repTotals[ne] = {
        calls: nt(Ee(Ye)),
        prospectDMCalls: nt(Ee(Z)),
        prospectMeetings: nt(Ee(Ie)),
        clientMeetings: nt(Ee(qe)),
        contracts: nt(Ee(ie("Contracts Sent", "Quotes Sendouts"))),
        signed: nt(Ee(ie("Contracts Signed", "Quotes/ Contracts Signed"))),
        firstOrder: nt(Ee(ie("First Order"))),
        newAccounts: nt(Ee(ie("New Clients", "New Accounts/ Dept Billed"))),
        gm: Ee(Re) ? +Ee(Re).toFixed(2) : 0,
        meetings: nt(Ee(Ie) + Ee(qe)),
        prospectTouches: nt(Ee(Ve)),
        clientTouches: nt(Ee(lt))
      }
    }
    for (let ne in Q) t.sales[ne] = Q[ne].map(fe => Math.round(fe));
    t.sales.weeks = d.weeks.slice();
    let G = n("Weekly GM$") || [],
      W = 4,
      Y = 0;
    {
      let ne = G[0] || [];
      for (; typeof ne[W + Y] == "number";) Y++;
      Y || (Y = p)
    }
    let J = ne => {
        let fe = {};
        for (let ie of G)
          if (String(ie && ie[0] == null ? "" : ie[0]).trim() === ne) {
            let xe = String(ie[3] || "").trim();
            xe && (fe[xe] = ie.slice(W, W + Math.min(Y, p)).reduce((Ee, Z) => Ee + (+Z || 0), 0))
          } return fe
      },
      O = J("Total New GM$"),
      j = J("Sales Rep GM$"),
      H = Object.keys(t.sales.repTotals),
      z = H.some(ne => O[ne]);
    for (let ne of H) {
      let fe = z ? O[ne] : j[ne];
      fe && (t.sales.repTotals[ne].gm = +fe.toFixed(2))
    }
    let re = 0;
    for (let ne = 0; ne < p; ne++)((d.hours[ne] || 0) > 0 || (d.totalGM[ne] || 0) !== 0 || (t.sales.totalCalls[ne] || 0) > 0) && (re = ne + 1);
    if (re && re < p) {
      let ne = fe => {
        for (let ie in fe) Array.isArray(fe[ie]) && fe[ie].length === p && (fe[ie] = fe[ie].slice(0, re))
      };
      ne(d), ne(t.sales), ne(M), t.recruitment.recruiters.forEach(ne), d.weeks = d.weeks.slice(0, re), d.weekDates = d.weekDates.slice(0, re), t.recruitment.weeks = d.weeks.slice(), t.sales.weeks = d.weeks.slice(), t.currentWeek = re, t.weekEnding = d.weekDates[re - 1] || ""
    }
    return t
  }

  function W6(e) {
    let t = y5(e, {
        type: "array"
      }),
      r = o => {
        let l = t.SheetNames.find(A => vs(A) === vs(o));
        return l ? Ohe(t.Sheets[l]) : null
      };
    {
      let o = r("Team Goals");
      if (o && !o.some(l => vs(l && l[0]) === "week label")) {
        let l = fnt(t);
        if (l) return l
      }
    }
    let n = JSON.parse(JSON.stringify(N1)),
      i = r("Team Goals");
    if (i) {
      let o = K6(i),
        l = [],
        A = [];
      for (let f of i) {
        let h = vs(f[0]);
        if (h === "week label")
          for (let p = 1; p <= o; p++) l.push(String(f[p] == null ? "W" + p : f[p]));
        if (h === "week ending (text)" || h === "week ending")
          for (let p = 1; p <= o; p++) A.push(String(f[p] == null ? "" : f[p]));
        yhe[h] && (n.teamGoals[yhe[h]] = I4(f, o)), h === "goal - bill" && (n.teamGoals.goals.bill = Number(f[1]) || null), h === "goal - pay" && (n.teamGoals.goals.pay = Number(f[1]) || null), h === "goal - margin" && (n.teamGoals.goals.margin = Number(f[1]) || null), h === "goal - headcount" && (n.teamGoals.goals.headcount = Number(f[1]) || null)
      }
      n.teamGoals.weeks = l.length ? l : Array.from({
        length: o
      }, (f, h) => "W" + (h + 1)), n.teamGoals.weekDates = A.map(f => f.replace(/,\s*\d{4}\s*$/, "")), n.teamGoals.gmPerHour = n.teamGoals.tempGM.map((f, h) => {
        let p = n.teamGoals.hours[h];
        return p ? +(f / p).toFixed(2) : 0
      }), n.teamGoals.gmPct = n.teamGoals.totalGM.map((f, h) => {
        let p = n.teamGoals.revenue[h];
        return p ? +(f / p).toFixed(2) : 0
      });
      let u = 0;
      n.teamGoals.cum2026 = n.teamGoals.totalGM.map(f => (u += f, +u.toFixed(2)));
      let c = 0;
      n.teamGoals.ytdFill = n.teamGoals.weeklyFill.map((f, h) => (c += Math.min(1, Math.max(0, +f || 0)), +(c / (h + 1)).toFixed(4))), n.currentWeek = o, n.weekEnding = A[o - 1] || ""
    }
    let a = r("Recruitment");
    if (a) {
      let o = n.currentWeek || K6(a);
      n.recruitment.weeks = n.teamGoals.weeks.slice(0, o);
      let l = null;
      for (let A of a) {
        let u = String(A[0] == null ? "" : A[0]).trim(),
          c = vs(u);
        if (c.startsWith("recruiter:")) {
          l = {
            name: u.split(":")[1].trim(),
            gm: [],
            peoplePaid: [],
            starts: [],
            ends: [],
            interviews: [],
            registered: [],
            submittals: [],
            clientInterviews: []
          }, n.recruitment.recruiters.push(l);
          continue
        }
        if (c === "totals" || c.startsWith("totals")) {
          l = n.recruitment.total;
          continue
        }
        l && (l === n.recruitment.total ? xhe[c] && (l[xhe[c]] = I4(A, o)) : whe[c] && (l[whe[c]] = I4(A, o)))
      }
    }
    let s = r("Sales");
    if (s) {
      let o = n.currentWeek || K6(s);
      n.sales.weeks = n.teamGoals.weeks.slice(0, o);
      let l = "totals",
        A = null;
      for (let u of s) {
        let c = String(u[0] == null ? "" : u[0]).trim(),
          f = vs(c);
        if (!(f === "week label" || f === "week ending (text)" || f === "week ending")) {
          if (f.startsWith("rep totals")) {
            l = "repheader";
            continue
          }
          if (l === "totals") {
            bhe[f] && (n.sales[bhe[f]] = I4(u, o));
            continue
          }
          if (l === "repheader") {
            A = {};
            for (let h = 1; h < u.length; h++) {
              let p = unt[vs(u[h])];
              p && (A[h] = p)
            }
            l = "reprows";
            continue
          }
          if (l === "reprows" && c) {
            let h = {
              calls: 0,
              prospectDMCalls: 0,
              prospectMeetings: 0,
              clientMeetings: 0,
              contracts: 0,
              signed: 0,
              firstOrder: 0,
              newAccounts: 0,
              gm: 0,
              meetings: 0,
              prospectTouches: 0,
              clientTouches: 0
            };
            for (let p in A) h[A[p]] = Number(u[p]) || 0;
            h.meetings = h.prospectMeetings + h.clientMeetings, n.sales.repTotals[c] = h
          }
        }
      }
    } {
      let o = n.teamGoals,
        l = n.currentWeek || (o.totalGM || []).length,
        A = 0;
      for (let u = 0; u < l; u++)((o.hours[u] || 0) > 0 || (o.totalGM[u] || 0) !== 0 || ((n.sales.totalCalls || [])[u] || 0) > 0) && (A = u + 1);
      if (A && A < l) {
        let u = c => {
          for (let f in c) Array.isArray(c[f]) && c[f].length === l && (c[f] = c[f].slice(0, A))
        };
        u(o), u(n.sales), u(n.recruitment.total || {}), (n.recruitment.recruiters || []).forEach(u), o.weeks = (o.weeks || []).slice(0, A), o.weekDates = (o.weekDates || []).slice(0, A), n.recruitment.weeks = o.weeks.slice(), n.sales.weeks = o.weeks.slice(), n.currentWeek = A, n.weekEnding = o.weekDates[A - 1] || ""
      } else A || (n.currentWeek = 0)
    }
    return n._year || (n._year = new Date().getFullYear()), n
  }

  function as({
    label: e,
    value: t,
    sub: r,
    delta: n,
    big: i,
    yoy: a,
    yoyLabel: s
  }) {
    let o = n != null && n >= 0,
      l = a != null && a >= 0;
    return (0, U.jsxs)("div", {
      className: "card kpi" + (i ? " kpi-big" : ""),
      children: [(0, U.jsx)("div", {
        className: "kpi-label",
        children: e
      }), (0, U.jsx)("div", {
        className: "kpi-value",
        children: t
      }), (0, U.jsxs)("div", {
        className: "kpi-sub",
        children: [r, n != null && (0, U.jsxs)("span", {
          className: "chip " + (o ? "up" : "down"),
          children: [o ? "\u2191" : "\u2193", " ", Math.abs(n).toFixed(1), "%"]
        })]
      }), a != null && (0, U.jsxs)("div", {
        className: "kpi-yoy",
        children: [(0, U.jsxs)("span", {
          className: "chip " + (l ? "up" : "down"),
          children: [l ? "\u2191" : "\u2193", " ", Math.abs(a).toFixed(1), "%"]
        }), " ", s || "vs last year"]
      })]
    })
  }

  function L4({
    label: e,
    current: t,
    estimate: r,
    goal: n,
    ytdVal: i,
    estVal: a,
    fmt: s,
    explain: o
  }) {
    let l = y => Number.isFinite(y) ? jp(y) : 0,
      A = l(t),
      u = l(r),
      c = 57,
      f = 43,
      h = 6,
      p = 12,
      d = 2 * Math.PI * c,
      g = 2 * Math.PI * f,
      m = s || Pr,
      v = "rg-" + e;
    return (0, U.jsxs)("div", {
      className: "ring",
      children: [(0, U.jsxs)("svg", {
        viewBox: "0 0 130 130",
        width: "120",
        height: "120",
        children: [(0, U.jsx)("defs", {
          children: (0, U.jsxs)("linearGradient", {
            id: v,
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "1",
            children: [(0, U.jsx)("stop", {
              offset: "0%",
              stopColor: Qr.blue
            }), (0, U.jsx)("stop", {
              offset: "100%",
              stopColor: Qr.sky
            })]
          })
        }), (0, U.jsx)("circle", {
          cx: "65",
          cy: "65",
          r: c,
          fill: "none",
          stroke: "var(--ring-track)",
          strokeWidth: h
        }), (0, U.jsx)("circle", {
          cx: "65",
          cy: "65",
          r: c,
          fill: "none",
          stroke: Qr.orange,
          strokeWidth: h,
          strokeDasharray: `${d*u} ${d}`,
          strokeLinecap: "round",
          transform: "rotate(-90 65 65)"
        }), (0, U.jsx)("circle", {
          cx: "65",
          cy: "65",
          r: f,
          fill: "none",
          stroke: "var(--ring-track)",
          strokeWidth: p
        }), (0, U.jsx)("circle", {
          cx: "65",
          cy: "65",
          r: f,
          fill: "none",
          stroke: `url(#${v})`,
          strokeWidth: p,
          strokeDasharray: `${g*A} ${g}`,
          strokeLinecap: "round",
          transform: "rotate(-90 65 65)"
        }), (0, U.jsxs)("text", {
          x: "65",
          y: "62",
          textAnchor: "middle",
          className: "ring-pct",
          children: [Math.round(A * 100), "%"]
        }), (0, U.jsx)("text", {
          x: "65",
          y: "81",
          textAnchor: "middle",
          className: "ring-lab",
          children: e
        })]
      }), n != null && (0, U.jsxs)("div", {
        className: "ring-tip",
        role: "tooltip",
        children: [(0, U.jsx)("div", {
          className: "rt-title",
          children: e
        }), (0, U.jsxs)("div", {
          className: "rt-row",
          children: [(0, U.jsx)("span", {
            children: "Yearly Goal"
          }), (0, U.jsx)("b", {
            children: m(n)
          })]
        }), (0, U.jsxs)("div", {
          className: "rt-row",
          children: [(0, U.jsx)("span", {
            children: "Actual YTD"
          }), (0, U.jsx)("b", {
            className: "blue",
            children: m(i)
          })]
        }), (0, U.jsxs)("div", {
          className: "rt-row",
          children: [(0, U.jsx)("span", {
            children: "Estimated YE"
          }), (0, U.jsx)("b", {
            className: "orange",
            children: m(a)
          })]
        }), (0, U.jsxs)("div", {
          className: "rt-note",
          children: ["Inner ring = progress to date \xB7 outer ring = projected year-end.", o ? " " + o : ""]
        })]
      })]
    })
  }

  function hnt({
    d: e,
    wk: t,
    ytd: r
  }) {
    let [n, i] = (0, Ht.useState)("Margin"), a = e.teamGoals, s = a.goals || {}, o = e.currentWeek || a.totalGM.length, l = r ? o : t || o, A = jp(l / 52), u = V => (V || []).slice(0, l), c = Math.max(0, 52 - l), f = V => {
      let R = u(V),
        Q = R.reduce((Y, J) => Y + (+J || 0), 0),
        G = R.slice(-8),
        W = G.length ? G.reduce((Y, J) => Y + (+J || 0), 0) / G.length : 0;
      return {
        avg: W,
        total: Q + W * c
      }
    }, h = Zr(u(a.revenue)), p = a.cum2026 && a.cum2026[l - 1] != null ? a.cum2026[l - 1] : Zr(u(a.totalGM)), d = h - p, g = (a.peoplePaid || [])[l - 1] || 0, m = (a.revenue || []).map((V, R) => (V || 0) - ((a.totalGM || [])[R] || 0)), v = f(a.revenue).total, y = f(m).total, C = f(a.totalGM).total, B = f(a.peoplePaid).avg, T = (V, R, Q) => Q ? {
      cur: jp(V / Q),
      est: jp(R / Q)
    } : {
      cur: 0,
      est: 0
    }, E = T(h, v, s.bill), F = T(d, y, s.pay), N = T(p, C, s.margin), M = {
      cur: jp(g / (s.headcount || 1)),
      est: jp(B / (s.headcount || 1))
    }, L = N.cur;
    if (!(s.bill || s.pay || s.margin || s.headcount)) return (0, U.jsxs)("div", {
      className: "card progress",
      children: [(0, U.jsx)("div", {
        className: "card-title",
        children: "Progress"
      }), (0, U.jsx)("div", {
        className: "empty-hint",
        children: "Add annual targets (Bill, Pay, Margin, Headcount) on the Team Goals sheet to light up this card."
      })]
    });
    let ee = n === "Headcount",
      K = (a.weeks || []).slice(0, o).map((V, R) => ({
        w: (a.weekDates || [])[R] || V,
        Goal: ee ? s.headcount || null : (a.budget || [])[R] || 0,
        Performance: ee ? (a.peoplePaid || [])[R] || 0 : (a.totalGM || [])[R] || 0
      }));
    return (0, U.jsxs)("div", {
      className: "card progress",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Progress", (0, U.jsx)("span", {
          className: "card-hint",
          children: r ? "year to date" : "through week " + l
        })]
      }), (0, U.jsxs)("div", {
        className: "bars",
        children: [(0, U.jsxs)("div", {
          className: "bar-row",
          children: [(0, U.jsx)("div", {
            className: "bar-track",
            children: (0, U.jsx)("div", {
              className: "bar-fill blue",
              style: {
                width: A * 100 + "%"
              }
            })
          }), (0, U.jsxs)("span", {
            className: "bar-tag blue",
            children: [Math.round(A * 100), "% Year completed"]
          })]
        }), (0, U.jsxs)("div", {
          className: "bar-row",
          children: [(0, U.jsx)("div", {
            className: "bar-track",
            children: (0, U.jsx)("div", {
              className: "bar-fill orange",
              style: {
                width: L * 100 + "%"
              }
            })
          }), (0, U.jsxs)("span", {
            className: "bar-tag orange",
            children: [Math.round(L * 100), "% Goal completed"]
          })]
        })]
      }), (() => {
        let V = Q => {
            let G = Q - A;
            return G >= .03 ? "ahead" : G <= -.03 ? "behind" : "on"
          },
          R = ({
            l: Q,
            c: G,
            goal: W
          }) => W ? (() => {
            let Y = V(G);
            return (0, U.jsxs)("div", {
              className: "pace " + Y,
              children: [(0, U.jsx)("span", {
                className: "pace-lbl",
                children: Q
              }), (0, U.jsx)("span", {
                className: "pace-val",
                children: Y === "ahead" ? "Ahead" : Y === "behind" ? "Behind" : "On pace"
              })]
            })
          })() : (0, U.jsx)("div", {
            className: "pace-spacer"
          });
        return (0, U.jsxs)("div", {
          className: "rings",
          children: [(0, U.jsxs)("div", {
            className: "ring-col",
            children: [(0, U.jsx)(R, {
              l: "Bill",
              c: E.cur,
              goal: s.bill
            }), s.bill ? (0, U.jsx)(L4, {
              label: "Bill",
              current: E.cur,
              estimate: E.est,
              goal: s.bill,
              ytdVal: h,
              estVal: v,
              fmt: Ea,
              explain: "Year-end estimate: last 8 weeks' pace projected across the weeks left"
            }) : (0, U.jsxs)("div", {
              className: "ring-empty",
              children: [(0, U.jsx)("div", {
                className: "ring-empty-circle",
                children: "\u2014"
              }), (0, U.jsx)("div", {
                className: "ring-empty-l",
                children: "Bill"
              }), (0, U.jsx)("div", {
                className: "ring-empty-hint",
                children: "No goal set"
              })]
            })]
          }), (0, U.jsxs)("div", {
            className: "ring-col",
            children: [(0, U.jsx)(R, {
              l: "Pay",
              c: F.cur,
              goal: s.pay
            }), s.pay ? (0, U.jsx)(L4, {
              label: "Pay",
              current: F.cur,
              estimate: F.est,
              goal: s.pay,
              ytdVal: d,
              estVal: y,
              fmt: Ea,
              explain: "Year-end estimate: last 8 weeks' pace projected across the weeks left"
            }) : (0, U.jsxs)("div", {
              className: "ring-empty",
              children: [(0, U.jsx)("div", {
                className: "ring-empty-circle",
                children: "\u2014"
              }), (0, U.jsx)("div", {
                className: "ring-empty-l",
                children: "Pay"
              }), (0, U.jsx)("div", {
                className: "ring-empty-hint",
                children: "No goal set"
              })]
            })]
          }), (0, U.jsxs)("div", {
            className: "ring-col",
            children: [(0, U.jsx)(R, {
              l: "Margin",
              c: N.cur,
              goal: s.margin
            }), s.margin ? (0, U.jsx)(L4, {
              label: "Margin",
              current: N.cur,
              estimate: N.est,
              goal: s.margin,
              ytdVal: p,
              estVal: C,
              fmt: Ea,
              explain: "Year-end estimate: last 8 weeks' pace projected across the weeks left"
            }) : (0, U.jsxs)("div", {
              className: "ring-empty",
              children: [(0, U.jsx)("div", {
                className: "ring-empty-circle",
                children: "\u2014"
              }), (0, U.jsx)("div", {
                className: "ring-empty-l",
                children: "Margin"
              }), (0, U.jsx)("div", {
                className: "ring-empty-hint",
                children: "No goal set"
              })]
            })]
          }), (0, U.jsxs)("div", {
            className: "ring-col",
            children: [(0, U.jsx)(R, {
              l: "Headcount",
              c: M.cur,
              goal: s.headcount
            }), s.headcount ? (0, U.jsx)(L4, {
              label: "Headcount",
              current: M.cur,
              estimate: M.est,
              goal: s.headcount,
              ytdVal: g,
              estVal: B,
              fmt: Pr,
              explain: "Year-end estimate: average headcount over the last 8 weeks"
            }) : (0, U.jsxs)("div", {
              className: "ring-empty",
              children: [(0, U.jsx)("div", {
                className: "ring-empty-circle",
                children: "\u2014"
              }), (0, U.jsx)("div", {
                className: "ring-empty-l",
                children: "Headcount"
              }), (0, U.jsx)("div", {
                className: "ring-empty-hint",
                children: "No goal set"
              })]
            })]
          }), (0, U.jsxs)("div", {
            className: "ring-legend",
            children: [(0, U.jsxs)("div", {
              children: [(0, U.jsx)("span", {
                className: "dot",
                style: {
                  background: Qr.blue
                }
              }), " Inner \xB7 current progress"]
            }), (0, U.jsxs)("div", {
              children: [(0, U.jsx)("span", {
                className: "dot",
                style: {
                  background: Qr.orange
                }
              }), " Outer \xB7 projected year-end"]
            })]
          })]
        })
      })(), (0, U.jsxs)("div", {
        className: "gp-head",
        children: [(0, U.jsx)("div", {
          className: "seg",
          children: ["Margin", "Headcount"].map(V => (0, U.jsx)("button", {
            className: "seg-btn" + (n === V ? " on" : ""),
            onClick: () => i(V),
            children: V
          }, V))
        }), (0, U.jsxs)("div", {
          className: "gp-legend",
          children: [(0, U.jsxs)("span", {
            children: [(0, U.jsx)("i", {
              className: "dot",
              style: {
                background: Qr.orange
              }
            }), " Goal"]
          }), (0, U.jsxs)("span", {
            children: [(0, U.jsx)("i", {
              className: "dot",
              style: {
                background: Qr.blue
              }
            }), " Performance"]
          })]
        })]
      }), (0, U.jsx)("div", {
        className: "gp-chart",
        children: (0, U.jsx)(Pm, {
          width: "100%",
          height: "100%",
          children: (0, U.jsxs)(Rv, {
            data: K,
            margin: {
              left: 4,
              right: 10,
              top: 6,
              bottom: 0
            },
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1,
              strokeDasharray: "3 3"
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn,
              interval: Math.max(0, Math.ceil(o / 6) - 1)
            }), (0, U.jsx)(Si, {
              ...Yn,
              width: ee ? 30 : 50,
              tickFormatter: ee ? void 0 : Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: V => ee ? Pr(V) : U1(V)
            }), (0, U.jsx)(Ui, {
              dataKey: "Goal",
              stroke: Qr.orange,
              strokeWidth: 2.5,
              strokeDasharray: "5 4",
              dot: !1,
              type: "monotone"
            }), (0, U.jsx)(Ui, {
              dataKey: "Performance",
              stroke: Qr.blue,
              strokeWidth: 2.5,
              dot: !1,
              type: "monotone"
            })]
          })
        })
      })]
    })
  }

  function dnt({
    data: e,
    subtitle: t
  }) {
    let r = e[0] ? e[0].v : 0,
      n = e.length ? e[e.length - 1].v : 0,
      i = r ? n / r * 100 : 0,
      a = i < 1 ? i.toFixed(2) : Math.round(i) + "",
      s = [Qr.sky, Qr.blue, Qr.violet, Qr.green, Qr.orange];
    return (0, U.jsxs)("div", {
      className: "card",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Sales conversion", (0, U.jsx)("span", {
          className: "card-hint",
          children: t || "YTD"
        })]
      }), (0, U.jsxs)("div", {
        className: "funnel-summary",
        children: [(0, U.jsxs)("span", {
          className: "card-hint",
          children: [e[0] ? e[0].stage : "", " \u2192 ", e.length ? e[e.length - 1].stage : ""]
        }), (0, U.jsxs)("span", {
          className: "fs-val",
          children: [a, "% overall"]
        })]
      }), (0, U.jsx)("div", {
        className: "funnel",
        children: e.map((o, l) => {
          let A = r > 0 ? Math.max(7, o.v / r * 100) : 0,
            u = l > 0 ? e[l - 1].v : null,
            c = u ? o.v / u * 100 : null,
            f = c == null ? null : (c < 1 ? c.toFixed(1) : Math.round(c)) + "%";
          return (0, U.jsxs)("div", {
            children: [c != null && (0, U.jsxs)("div", {
              className: "fn-conv",
              children: [(0, U.jsx)("span", {
                className: "fn-arrow",
                children: "\u2193"
              }), " ", f, " ", (0, U.jsxs)("span", {
                className: "fn-from",
                children: ["from ", e[l - 1].stage]
              })]
            }), (0, U.jsxs)("div", {
              className: "fn-step",
              children: [(0, U.jsxs)("div", {
                className: "fn-head",
                children: [(0, U.jsx)("span", {
                  className: "fn-stage",
                  children: o.stage
                }), (0, U.jsx)("span", {
                  className: "fn-val",
                  children: Pr(o.v)
                })]
              }), (0, U.jsx)("div", {
                className: "fn-track",
                children: (0, U.jsx)("div", {
                  className: "fn-bar",
                  style: {
                    width: A + "%",
                    background: s[l % s.length]
                  }
                })
              })]
            })]
          }, o.stage)
        })
      })]
    })
  }

  function pnt({
    prospect: e,
    client: t,
    subtitle: r
  }) {
    let n = [{
        label: "Prospect",
        v: e,
        color: Qr.blue
      }, {
        label: "Client",
        v: t,
        color: Qr.sky
      }],
      i = e + t,
      a = Math.max(e, t, 1);
    return (0, U.jsxs)("div", {
      className: "card",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Total Touches", (0, U.jsx)("span", {
          className: "card-hint",
          children: r || "YTD \xB7 prospect vs client"
        })]
      }), (0, U.jsxs)("div", {
        className: "funnel-summary",
        children: [(0, U.jsx)("span", {
          className: "card-hint",
          children: "Total touches"
        }), (0, U.jsx)("span", {
          className: "fs-val",
          children: Pr(i)
        })]
      }), (0, U.jsx)("div", {
        className: "funnel",
        children: n.map(s => {
          let o = Math.max(7, s.v / a * 100),
            l = i ? Math.round(s.v / i * 100) : 0;
          return (0, U.jsx)("div", {
            children: (0, U.jsxs)("div", {
              className: "fn-step",
              children: [(0, U.jsxs)("div", {
                className: "fn-head",
                children: [(0, U.jsx)("span", {
                  className: "fn-stage",
                  children: s.label
                }), (0, U.jsxs)("span", {
                  className: "fn-val",
                  children: [Pr(s.v), " \xB7 ", l, "%"]
                })]
              }), (0, U.jsx)("div", {
                className: "fn-track",
                children: (0, U.jsx)("div", {
                  className: "fn-bar",
                  style: {
                    width: o + "%",
                    background: s.color
                  }
                })
              })]
            })
          }, s.label)
        })
      })]
    })
  }

  function gnt(e) {
    return e = e || {}, [{
      stage: "Prospect Meetings",
      v: +e.prospectMeetings || 0
    }, {
      stage: "Sent",
      v: +e.contracts || 0
    }, {
      stage: "Signed",
      v: +e.signed || 0
    }, {
      stage: "New Clients",
      v: +e.newAccounts || 0
    }]
  }

  function mnt({
    d: e,
    s: t,
    sel: r,
    setSel: n
  }) {
    let i = e.sales,
      a = Object.keys(i.repTotals || {}).sort((f, h) => f.localeCompare(h)),
      s = r === "All" || a.includes(r) ? r : "All",
      o = s === "All" ? null : i.repTotals[s] || {},
      l = s === "All" ? t.salesFunnel : gnt(o),
      A = s === "All" ? Zr(i.prospectTouches) : +o.prospectTouches || 0,
      u = s === "All" ? Zr(i.clientTouches) : +o.clientTouches || 0,
      c = s === "All" ? "YTD \xB7 prospect vs client" : "YTD \xB7 " + s;
    return (0, U.jsxs)("div", {
      className: "sales-focus",
      children: [(0, U.jsxs)("div", {
        className: "seg rep-seg",
        children: [(0, U.jsx)("button", {
          className: "seg-btn" + (s === "All" ? " on" : ""),
          onClick: () => n("All"),
          children: "All"
        }), a.map(f => (0, U.jsx)("button", {
          className: "seg-btn" + (s === f ? " on" : ""),
          onClick: () => n(f),
          children: f
        }, f))]
      }), (0, U.jsxs)("div", {
        className: "grid2",
        children: [(0, U.jsx)(pnt, {
          prospect: A,
          client: u,
          subtitle: c
        }), (0, U.jsx)(dnt, {
          data: l,
          subtitle: s === "All" ? "YTD \xB7 all reps" : "YTD \xB7 " + s
        })]
      })]
    })
  }

  function zf({
    title: e,
    hint: t,
    children: r,
    sm: n,
    lg: i,
    wide: a
  }) {
    return (0, U.jsxs)("div", {
      className: "card chart-card" + (a ? " chart-wide" : ""),
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: [e, t && (0, U.jsx)("span", {
          className: "card-hint",
          children: t
        })]
      }), (0, U.jsx)("div", {
        className: "chart-wrap" + (n ? " sm" : i ? " lg" : ""),
        children: (0, U.jsx)(Pm, {
          width: "100%",
          height: "100%",
          children: r
        })
      })]
    })
  }
  var Yn = {
      stroke: "var(--axis)",
      fontSize: 11
    },
    RA = () => ({
      contentStyle: {
        background: "var(--tip-bg)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        fontSize: 12,
        color: "var(--text)"
      },
      labelStyle: {
        color: "var(--text)"
      },
      itemStyle: {
        color: "var(--text)"
      }
    }),
    G6 = [{
      key: "rep",
      label: "Rep",
      type: "text"
    }, {
      key: "calls",
      label: "Prospect Attempts",
      type: "num"
    }, {
      key: "prospectDMCalls",
      label: "DM Calls",
      type: "num"
    }, {
      key: "prospectMeetings",
      label: "Prospect Mtgs",
      type: "num"
    }, {
      key: "clientMeetings",
      label: "Client Mtgs",
      type: "num"
    }, {
      key: "contracts",
      label: "Sent",
      type: "num"
    }, {
      key: "signed",
      label: "Signed",
      type: "num"
    }, {
      key: "firstOrder",
      label: "First Order",
      type: "num"
    }, {
      key: "newAccounts",
      label: "New Accounts",
      type: "num",
      rank: !0
    }, {
      key: "gm",
      label: "New GM$",
      type: "num",
      cur: !0
    }];

  function vnt({
    repTotals: e,
    onRepClick: t,
    onUpdateGM: r
  }) {
    let [n, i] = (0, Ht.useState)("newAccounts"), [a, s] = (0, Ht.useState)("desc"), [o, l] = (0, Ht.useState)(""), [A, u] = (0, Ht.useState)(!1), [c, f] = (0, Ht.useState)({}), h = (0, Ht.useMemo)(() => {
      let g = Object.entries(e || {}).map(([m, v]) => ({
        rep: m,
        calls: v.calls || 0,
        prospectDMCalls: v.prospectDMCalls || 0,
        prospectMeetings: v.prospectMeetings || 0,
        clientMeetings: v.clientMeetings || 0,
        contracts: v.contracts || 0,
        signed: v.signed || 0,
        firstOrder: v.firstOrder || 0,
        newAccounts: v.newAccounts || 0,
        gm: v.gm || 0
      }));
      return g.sort((m, v) => {
        let y;
        return n === "rep" ? y = m.rep.localeCompare(v.rep) : y = (m[n] || 0) - (v[n] || 0), a === "asc" ? y : -y
      }), g
    }, [e, n, a]), p = g => {
      g === n ? s(m => m === "asc" ? "desc" : "asc") : (i(g), s(g === "rep" ? "asc" : "desc"))
    }, d = g => n === g ? a === "asc" ? " \u25B2" : " \u25BC" : "";
    return (0, U.jsxs)("div", {
      className: "card lb-card",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Rep leaderboard", (0, U.jsx)("span", {
          className: "card-hint",
          children: A ? "enter season-to-date GM$ per rep, then Done" : "click a column to sort \xB7 ranked by " + G6.find(g => g.key === n).label.toLowerCase()
        }), (0, U.jsx)("input", {
          className: "tbl-search",
          placeholder: "Search rep\u2026",
          value: o,
          onChange: g => l(g.target.value)
        })]
      }), (0, U.jsx)("div", {
        className: "lb-scroll",
        children: (0, U.jsxs)("table", {
          className: "lb",
          children: [(0, U.jsx)("thead", {
            children: (0, U.jsx)("tr", {
              children: G6.map(g => (0, U.jsxs)("th", {
                className: (g.type === "num" ? "num " : "") + (g.key === n ? "active " : "") + (g.rank ? "rank-col" : ""),
                onClick: () => p(g.key),
                children: [g.label, d(g.key)]
              }, g.key))
            })
          }), (0, U.jsx)("tbody", {
            children: h.filter(g => !o || g.rep.toLowerCase().includes(o.toLowerCase())).map(g => {
              var m;
              return (0, U.jsxs)("tr", {
                className: t && !A ? "lb-row" : "",
                onClick: () => t && !A && t(g.rep),
                children: [(0, U.jsxs)("td", {
                  className: "rep-name",
                  children: [n !== "rep" && (0, U.jsx)("span", {
                    className: "rank-badge",
                    children: h.indexOf(g) + 1
                  }), g.rep]
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: Pr(g.calls)
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.prospectDMCalls
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.prospectMeetings
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.clientMeetings
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.contracts
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.signed
                }), (0, U.jsx)("td", {
                  className: "num",
                  children: g.firstOrder
                }), (0, U.jsx)("td", {
                  className: "num" + (G6.find(v => v.rank).key === n ? " active" : ""),
                  children: g.newAccounts
                }), (0, U.jsx)("td", {
                  className: "num" + (n === "gm" ? " active" : ""),
                  onClick: v => A && v.stopPropagation(),
                  children: A ? (0, U.jsx)("input", {
                    className: "gm-inp",
                    type: "number",
                    min: "0",
                    step: "0.01",
                    placeholder: "0",
                    value: (m = c[g.rep]) != null ? m : "",
                    onChange: v => f(y => ({
                      ...y,
                      [g.rep]: v.target.value
                    }))
                  }) : Ea(g.gm)
                })]
              }, g.rep)
            })
          })]
        })
      })]
    })
  }

  function ynt(e) {
    return (0, Ht.useMemo)(() => {
      let t = e.teamGoals,
        r = e.recruitment,
        n = e.sales;
      for (let d of ["cum2026", "cum2025", "gmPerHour", "gmPct", "ytdFill"]) Array.isArray(t[d]) || (t[d] = t.totalGM.map(() => 0));
      if (Array.isArray(t.ytdFillSheet) && t.ytdFillSheet.length) t.ytdFill = t.ytdFillSheet.map(d => +d || 0);
      else if (Array.isArray(t.weeklyFill)) {
        let d = 0;
        t.ytdFill = t.weeklyFill.map((g, m) => (d += Math.min(1, Math.max(0, +g || 0)), +(d / (m + 1)).toFixed(4)))
      }
      let i = d => t.weekDates[d] || t.weeks[d] || "W" + (d + 1),
        a = t.tempGM.map((d, g) => ({
          w: i(g),
          GM$: Math.round(d),
          Budget: Math.round(t.budget[g] || 0)
        })),
        s = t.cum2026.map((d, g) => ({
          w: i(g),
          2026: Math.round(d),
          2025: Math.round(t.cum2025[g] || 0)
        })),
        o = t.revenue.map((d, g) => ({
          w: i(g),
          Revenue: Math.round(d),
          Headcount: t.peoplePaid[g] || 0
        })),
        l = t.newTempOrders.map((d, g) => ({
          w: i(g),
          New: d || 0,
          Open: t.openTempOrders[g] || 0
        })),
        A = [{
          stage: "Interviews",
          v: Zr(r.total.interviews)
        }, {
          stage: "Submittals",
          v: Zr(r.total.submittals)
        }, {
          stage: "Registered",
          v: Zr(r.total.registered)
        }, {
          stage: "Starts",
          v: Zr(r.total.starts)
        }],
        u = r.total.starts.map((d, g) => ({
          w: i(g),
          Net: (d || 0) - (r.total.ends[g] || 0)
        })),
        c = (r.recruiters || []).map(d => ({
          name: d.name,
          v: Math.round(Zr(d.gm))
        })),
        f = n.totalCalls.map((d, g) => ({
          w: i(g),
          Calls: d || 0,
          Prospect: n.prospectTouches[g] || 0,
          Client: n.clientTouches[g] || 0
        })),
        h = [{
          name: "Prospect",
          v: Zr(n.prospectTouches)
        }, {
          name: "Client",
          v: Zr(n.clientTouches)
        }],
        p = [{
          stage: "Meetings",
          v: Zr(n.prospectMeetings) + Zr(n.clientMeetings)
        }, {
          stage: "Sent",
          v: Zr(n.contractsSent)
        }, {
          stage: "Signed",
          v: Zr(n.contractsSigned)
        }, {
          stage: "New Clients",
          v: Zr(n.newClients)
        }];
      return {
        gmVsBudget: a,
        cumRace: s,
        revHead: o,
        tempOrders: l,
        funnel: A,
        netHC: u,
        gmContrib: c,
        outreach: f,
        touchSplit: h,
        salesFunnel: p
      }
    }, [e])
  }

  function wnt({
    d: e
  }) {
    let t = e.teamGoals,
      r = e.recruitment,
      n = e.sales,
      i = (t.totalGM || []).length;
    if (!i) return null;
    let a = [];
    if (i >= 2) {
      let l = t.totalGM[i - 1],
        A = t.totalGM[i - 2],
        u = A ? (l - A) / A * 100 : 0;
      a.push({
        tag: "Trend",
        title: "Total GM$ " + (u >= 0 ? "up " : "down ") + Math.abs(u).toFixed(0) + "% WoW",
        sub: Ea(l) + " this week",
        tone: u >= 0 ? "up" : "down"
      })
    }
    let s = t.totalGM.reduce((l, A, u, c) => A > c[l] ? u : l, 0);
    a.push({
      tag: "Best week",
      title: t.weekDates[s] || "W" + (s + 1),
      sub: Ea(t.totalGM[s]) + " GM$",
      tone: "up"
    }), a.push({
      tag: "Hours",
      title: Pr((t.hours || [])[i - 1] || 0),
      sub: "this week",
      tone: ""
    }), a.push({
      tag: "Clients",
      title: Pr((t.clientsBilled || [])[i - 1] || (t.newClients || [])[i - 1] || 0),
      sub: "this week",
      tone: ""
    });
    let o = (t.weeklyFill || [])[i - 1];
    return o != null && a.push({
      tag: "Fill rate",
      title: Ob(o) + " this week",
      sub: o >= .8 ? "on target" : "below 80%",
      tone: o >= .8 ? "up" : "warn"
    }), (0, U.jsx)("div", {
      className: "insights",
      children: a.slice(0, 4).map((l, A) => (0, U.jsxs)("div", {
        className: "insight " + l.tone,
        children: [(0, U.jsx)("div", {
          className: "ins-tag",
          children: l.tag
        }), (0, U.jsx)("div", {
          className: "ins-title",
          children: l.title
        }), (0, U.jsx)("div", {
          className: "ins-sub",
          children: l.sub
        })]
      }, A))
    })
  }

  function xnt({
    d: e
  }) {
    let t = e.teamGoals,
      r = e.sales,
      n = (t.totalGM || []).length,
      [i, a] = (0, Ht.useState)(4),
      [s, o] = (0, Ht.useState)("prior"),
      l = String((e._year || new Date().getFullYear()) - 1),
      A = e.archive && e.archive[l],
      u = !!(A && A.teamGoals && (A.teamGoals.totalGM || []).length),
      c = s === "lastyear" && u,
      f = 0;
    for (let y = 0; y < n; y++)((t.totalGM[y] || 0) !== 0 || (t.hours[y] || 0) > 0 || (t.revenue[y] || 0) !== 0) && (f = y + 1);
    if (f || (f = n), f < 2) return null;
    let h = (y, C, B) => (y || []).slice(C, B).reduce((T, E) => T + (+E || 0), 0),
      p = Math.max(0, f - i),
      d = f,
      g = Math.max(0, f - 2 * i),
      m = p,
      v = [{
        label: "Total GM$",
        arr: t.totalGM,
        ly: c && A.teamGoals.totalGM,
        fmt: Ea
      }, {
        label: "Revenue",
        arr: t.revenue,
        ly: c && A.teamGoals.revenue,
        fmt: Ea
      }, {
        label: "Hours Worked",
        arr: t.hours,
        ly: c && A.teamGoals.hours,
        fmt: y => Pr(Math.round(y))
      }, {
        label: "Sales Calls",
        arr: r.totalCalls,
        ly: c && A.sales && A.sales.totalCalls,
        fmt: Pr
      }, {
        label: "New Clients",
        arr: t.newClients,
        ly: c && A.teamGoals.newClients,
        fmt: Pr
      }];
    return (0, U.jsxs)("div", {
      className: "card pc-card",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Period comparison", (0, U.jsx)("span", {
          className: "card-hint",
          children: c ? "vs same period " + l : "current vs prior"
        })]
      }), (0, U.jsxs)("div", {
        className: "pc-controls",
        children: [(0, U.jsx)("div", {
          className: "seg pc-seg",
          children: [
            ["Week", 1],
            ["4 Weeks", 4],
            ["13 Weeks", 13]
          ].map(([y, C]) => (0, U.jsx)("button", {
            className: "seg-btn" + (i === C ? " on" : ""),
            onClick: () => a(C),
            children: y
          }, C))
        }), u && (0, U.jsx)("div", {
          className: "seg pc-seg",
          children: [
            ["Prior period", "prior"],
            ["Last year", "lastyear"]
          ].map(([y, C]) => (0, U.jsx)("button", {
            className: "seg-btn" + (s === C ? " on" : ""),
            onClick: () => o(C),
            children: y
          }, C))
        })]
      }), (0, U.jsx)("div", {
        className: "pc-rows",
        children: v.map(y => {
          let C = (F, N) => {
              for (let M = Math.min(N, (F || []).length) - 1; M >= 0; M--)
                if ((F || [])[M]) return F[M];
              return 0
            },
            B = y.level ? C(y.arr, d) : h(y.arr, p, d),
            T;
          if (c) {
            let F = y.ly || [];
            T = y.level ? C(F, Math.min(d, F.length)) : h(F, Math.max(0, Math.min(p, F.length)), Math.min(d, F.length))
          } else T = y.level ? C(y.arr, p) : h(y.arr, g, m);
          let E = T ? (B - T) / T * 100 : B ? 100 : 0;
          return (0, U.jsxs)("div", {
            className: "pc-row",
            children: [(0, U.jsx)("span", {
              className: "pc-label",
              children: y.label
            }), (0, U.jsx)("span", {
              className: "pc-cur",
              children: y.fmt(Math.round(B))
            }), (0, U.jsxs)("span", {
              className: "pc-prev",
              children: ["from ", y.fmt(Math.round(T)), c ? " in " + l : ""]
            }), (0, U.jsxs)("span", {
              className: "pc-delta " + (B >= T ? "up" : "down"),
              children: [(E >= 0 ? "+" : "") + E.toFixed(0), "%"]
            })]
          }, y.label)
        })
      }), (0, U.jsx)("div", {
        className: "pc-note",
        children: c ? "Weeks " + (p + 1) + "\u2013" + d + " this year vs the same weeks in " + l + "." : "Last " + (i === 1 ? "week" : i + " weeks") + " vs the prior " + (i === 1 ? "week" : i + " weeks") + "."
      })]
    })
  }

  function D4(e) {
    (0, Ht.useEffect)(() => {
      let t = r => {
        r.key === "Escape" && e()
      };
      return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t)
    }, [e])
  }

  function bnt({
    rep: e,
    d: t,
    onClose: r
  }) {
    D4(r);
    let n = (t.sales.repTotals || {})[e] || {},
      a = (t._weekLedger || []).map(o => {
        let l = o.reps && o.reps[e] || {};
        return {
          w: "W" + o.week,
          Calls: +l.calls || 0,
          Meetings: (+l.prospectMeetings || 0) + (+l.clientMeetings || 0),
          Signed: +l.signed || 0,
          New: +l.newAccounts || 0
        }
      }),
      s = [
        ["Calls", n.calls],
        ["Prospect Mtgs", n.prospectMeetings],
        ["Client Mtgs", n.clientMeetings],
        ["Sent", n.contracts],
        ["Signed", n.signed],
        ["First Order", n.firstOrder],
        ["New Accts", n.newAccounts],
        ["GM$", n.gm]
      ];
    return (0, U.jsx)("div", {
      className: "modal-back",
      onClick: r,
      children: (0, U.jsxs)("div", {
        className: "modal wide",
        onClick: o => o.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsxs)("div", {
            className: "modal-title",
            children: [e, " \xB7 rep profile"]
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: r,
            "aria-label": "Close",
            children: "\xD7"
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-body",
          children: [(0, U.jsx)("div", {
            className: "rp-totals",
            children: s.map(([o, l]) => (0, U.jsxs)("div", {
              className: "rp-stat",
              children: [(0, U.jsx)("div", {
                className: "rp-stat-v",
                children: o === "GM$" ? Ea(+l || 0) : Pr(+l || 0)
              }), (0, U.jsx)("div", {
                className: "rp-stat-l",
                children: o
              })]
            }, o))
          }), a.length ? (0, U.jsx)("div", {
            className: "chart-wrap lg",
            children: (0, U.jsx)(Pm, {
              width: "100%",
              height: "100%",
              children: (0, U.jsxs)(Rv, {
                data: a,
                margin: {
                  left: 4,
                  right: 10,
                  top: 8,
                  bottom: 0
                },
                children: [(0, U.jsx)(Lo, {
                  stroke: "var(--grid)",
                  vertical: !1
                }), (0, U.jsx)(ra, {
                  dataKey: "w",
                  ...Yn
                }), (0, U.jsx)(Si, {
                  ...Yn
                }), (0, U.jsx)(bi, {
                  ...RA()
                }), (0, U.jsx)($s, {}), (0, U.jsx)(Ui, {
                  dataKey: "Calls",
                  stroke: Qr.sky,
                  strokeWidth: 2,
                  dot: !1
                }), (0, U.jsx)(Ui, {
                  dataKey: "Meetings",
                  stroke: Qr.blue,
                  strokeWidth: 2,
                  dot: !1
                }), (0, U.jsx)(Ui, {
                  dataKey: "Signed",
                  stroke: Qr.green,
                  strokeWidth: 2,
                  dot: !1
                }), (0, U.jsx)(Ui, {
                  dataKey: "New",
                  stroke: Qr.orange,
                  strokeWidth: 2,
                  dot: !1
                })]
              })
            })
          }) : (0, U.jsx)("div", {
            className: "empty-hint",
            children: "Week-by-week history appears here once weeks are added in-app. Imported spreadsheets only carry season-to-date totals."
          })]
        })]
      })
    })
  }

  function Bnt({
    d: e,
    s: t,
    wk: r,
    ytd: n,
    onNav: i,
    cfg: a,
    teamBoard: s,
    onPickTeam: o,
    youTeam: l
  }) {
    let A = N => R4(a || U4, N),
      u = e.teamGoals,
      c = e.recruitment,
      f = e.sales,
      [h, p] = (0, Ht.useState)("this"),
      d = (u.totalGM || []).length ? u.totalGM.reduce((N, M, L, I) => M > I[N] ? L : N, 0) : 0,
      g = h === "best",
      m = g ? d : (r || e.currentWeek) - 1,
      v = g ? !1 : n,
      y = N => v ? Zr(N || []) : (N || [])[m] || 0,
      C = N => v ? UA(N || []) || 0 : (N || [])[m] || 0,
      B = N => v ? void 0 : Ant((N || [])[m], (N || [])[m - 1]),
      T = g ? "best week \xB7 W" + (d + 1) : n ? "YTD" : "vs prior wk",
      E = y(u.totalGM) - y(u.tempGM),
      F = v ? (UA(u.peoplePaid) || 0) - (u.peoplePaid[0] || 0) : (u.peoplePaid[m] || 0) - (u.peoplePaid[m - 1] || 0);
    return (0, U.jsxs)(U.Fragment, {
      children: [(0, U.jsxs)("div", {
        className: "ov-toggle",
        children: [(0, U.jsx)("button", {
          className: g ? "" : "on",
          onClick: () => p("this"),
          children: "This week"
        }), (0, U.jsx)("button", {
          className: g ? "on" : "",
          onClick: () => p("best"),
          children: "Best week"
        })]
      }), s && s.length > 0 && A("ov_teamboard") && (0, U.jsxs)("div", {
        className: "card tlb-card",
        children: [(0, U.jsxs)("div", {
          className: "card-title",
          children: ["Team leaderboard ", (0, U.jsx)("span", {
            className: "card-hint",
            children: "ranked by GM$ \xB7 pace vs annual goal"
          }), i && (0, U.jsx)("button", {
            className: "tlb-viewall",
            onClick: () => i("Teams"),
            children: "View all teams \u2192"
          })]
        }), (0, U.jsx)(Ehe, {
          rows: s,
          compact: !0,
          youTeam: l,
          onPick: o
        })]
      }), A("ov_insights") && (0, U.jsx)(wnt, {
        d: e
      }), (() => {
        let N = !g && e.archive && e.archive[String((e._year || new Date().getFullYear()) - 1)] && e.archive[String((e._year || new Date().getFullYear()) - 1)].teamGoals,
          M = "vs " + String((e._year || new Date().getFullYear()) - 1),
          L = (ee, K) => {
            if (!N || !K || !K.length) return null;
            let V = m,
              R = n ? Zr((ee || []).slice(0, V + 1)) : (ee || [])[V] || 0,
              Q = n ? Zr(K.slice(0, Math.min(V + 1, K.length))) : V < K.length ? K[V] || 0 : null;
            return Q == null || Q === 0 ? null : (R - Q) / Math.abs(Q) * 100
          },
          I = (() => {
            if (!N) return null;
            let ee = R => n ? Zr((R || []).slice(0, Math.min(m + 1, (R || []).length))) : m < (R || []).length ? (R || [])[m] || 0 : null,
              K = R => n ? Zr((R || []).slice(0, m + 1)) : (R || [])[m] || 0,
              V = ee(N.totalGM) != null && ee(N.tempGM) != null ? ee(N.totalGM) - ee(N.tempGM) : null;
            return V == null || V === 0 ? null : (K(u.totalGM) - K(u.tempGM) - V) / Math.abs(V) * 100
          })();
        return A("ov_hero") && (0, U.jsxs)("div", {
          className: "kpi-hero",
          children: [(0, U.jsx)(as, {
            big: !0,
            label: "Total GM$",
            value: Ea(y(u.totalGM)),
            sub: T,
            delta: B(u.totalGM),
            yoy: L(u.totalGM, N && N.totalGM),
            yoyLabel: M
          }), (0, U.jsx)(as, {
            big: !0,
            label: "Revenue (Bill)",
            value: Ea(y(u.revenue)),
            sub: T,
            delta: B(u.revenue),
            yoy: L(u.revenue, N && N.revenue),
            yoyLabel: M
          }), (0, U.jsx)(as, {
            big: !0,
            label: "Perm GM$",
            value: Ea(E),
            sub: T,
            yoy: I,
            yoyLabel: M
          }), (0, U.jsx)(as, {
            big: !0,
            label: "People Paid",
            value: Pr((() => {
              let ee = u.peoplePaid || [];
              for (let K = (n ? ee.length : m + 1) - 1; K >= 0; K--)
                if (ee[K]) return ee[K];
              return 0
            })()),
            sub: g ? T : n ? "latest" : "headcount",
            delta: B(u.peoplePaid),
            yoy: L(u.peoplePaid, N && N.peoplePaid),
            yoyLabel: M
          })]
        })
      })(), A("ov_strip") && (0, U.jsxs)("div", {
        className: "kpi-strip",
        children: [(0, U.jsx)(as, {
          label: "People Paid +/-",
          value: (F >= 0 ? "+" : "") + F,
          sub: g ? T : n ? "net YTD" : "vs prior wk"
        }), (0, U.jsx)(as, {
          label: "Weekly Fill Rate",
          value: Ob((u.weeklyFill || [])[m] || 0),
          sub: "this week"
        }), (0, U.jsx)(as, {
          label: "Sales Calls",
          value: Pr(y(f.totalCalls)),
          sub: T,
          delta: B(f.totalCalls)
        }), (0, U.jsx)(as, {
          label: "New Clients This Week",
          value: Pr((u.newClients || [])[m] || 0),
          sub: "this week"
        })]
      }), A("ov_progress") && (0, U.jsx)("div", {
        className: "grid-progress solo",
        children: (0, U.jsx)(hnt, {
          d: e,
          wk: r,
          ytd: n
        })
      }), A("ov_period") && (0, U.jsx)(xnt, {
        d: e
      }), A("ov_charts") && (0, U.jsxs)("div", {
        className: "grid2",
        children: [(0, U.jsx)(zf, {
          title: "Weekly gross margin vs budget",
          children: (0, U.jsxs)(Mv, {
            data: t.gmVsBudget,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: N => U1(N)
            }), (0, U.jsx)(ta, {
              dataKey: "GM$",
              fill: Qr.blue,
              radius: [3, 3, 0, 0]
            }), (0, U.jsx)(Ui, {
              dataKey: "Budget",
              stroke: Qr.orange,
              strokeWidth: 2,
              dot: !1
            })]
          })
        }), (0, U.jsx)(zf, {
          title: "Cumulative GM$: 2026 vs 2025",
          children: (0, U.jsxs)(Rv, {
            data: t.cumRace,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: N => U1(N)
            }), (0, U.jsx)($s, {}), (0, U.jsx)(Ui, {
              dataKey: "2026",
              stroke: Qr.blue,
              strokeWidth: 2.5,
              dot: !1
            }), (0, U.jsx)(Ui, {
              dataKey: "2025",
              stroke: Qr.faint,
              strokeWidth: 2,
              strokeDasharray: "4 4",
              dot: !1
            })]
          })
        })]
      })]
    })
  }

  function _nt({
    d: e,
    s: t,
    wk: r,
    ytd: n,
    cfg: i
  }) {
    let a = c => R4(i || U4, c),
      s = e.teamGoals,
      o = (r || e.currentWeek) - 1,
      l = c => n ? Zr(c) : c[o] || 0,
      A = n ? Zr(s.revenue) ? Zr(s.totalGM) / Zr(s.revenue) : 0 : s.gmPct[o] || 0,
      u = n ? UA(s.ytdFill) || 0 : s.ytdFill[o] || 0;
    return (0, U.jsxs)(U.Fragment, {
      children: [a("tg_kpis") && (0, U.jsxs)("div", {
        className: "kpis k4 tight",
        children: [(0, U.jsx)(as, {
          label: "Temp GM$",
          value: Ea(l(s.tempGM)),
          sub: n ? "YTD" : "this week"
        }), (0, U.jsx)(as, {
          label: "Revenue (Bill)",
          value: Ea(l(s.revenue)),
          sub: n ? "YTD" : "this week"
        }), (0, U.jsx)(as, {
          label: "GM% (Mark-Up)",
          value: Ob(A),
          sub: "margin rate"
        }), (0, U.jsx)(as, {
          label: "YTD Fill",
          value: Ob(u),
          sub: "orders filled"
        })]
      }), a("tg_charts") && (0, U.jsxs)("div", {
        className: "grid2",
        children: [(0, U.jsx)(zf, {
          title: "Weekly gross margin vs budget",
          children: (0, U.jsxs)(Mv, {
            data: t.gmVsBudget,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: c => U1(c)
            }), (0, U.jsx)(od, {
              y: n ? UA(s.budget) || 0 : s.budget[o],
              stroke: Qr.orange,
              strokeDasharray: "4 4"
            }), (0, U.jsx)(ta, {
              dataKey: "GM$",
              fill: Qr.blue,
              radius: [3, 3, 0, 0]
            }), (0, U.jsx)(Ui, {
              dataKey: "Budget",
              stroke: Qr.orange,
              strokeWidth: 2,
              dot: !1
            })]
          })
        }), (0, U.jsx)(zf, {
          title: "Cumulative GM$: 2026 vs 2025",
          children: (0, U.jsxs)(Rv, {
            data: t.cumRace,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: c => U1(c)
            }), (0, U.jsx)($s, {}), (0, U.jsx)(Ui, {
              dataKey: "2026",
              stroke: Qr.blue,
              strokeWidth: 2.5,
              dot: !1
            }), (0, U.jsx)(Ui, {
              dataKey: "2025",
              stroke: Qr.faint,
              strokeWidth: 2,
              strokeDasharray: "4 4",
              dot: !1
            })]
          })
        }), (0, U.jsx)(zf, {
          title: "Revenue & headcount",
          children: (0, U.jsxs)(Mv, {
            data: t.revHead,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              yAxisId: "l",
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(Si, {
              yAxisId: "r",
              orientation: "right",
              ...Yn
            }), (0, U.jsx)(bi, {
              ...RA()
            }), (0, U.jsx)($s, {}), (0, U.jsx)(gu, {
              yAxisId: "l",
              dataKey: "Revenue",
              stroke: Qr.sky,
              fill: Qr.sky,
              fillOpacity: .18,
              strokeWidth: 2
            }), (0, U.jsx)(Ui, {
              yAxisId: "r",
              dataKey: "Headcount",
              stroke: Qr.orange,
              strokeWidth: 2,
              dot: !1
            })]
          })
        }), (0, U.jsx)(zf, {
          title: "Temp orders",
          children: (0, U.jsxs)(Dv, {
            data: t.tempOrders,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn
            }), (0, U.jsx)(bi, {
              ...RA()
            }), (0, U.jsx)($s, {}), (0, U.jsx)(ta, {
              dataKey: "New",
              stackId: "a",
              fill: Qr.blue
            }), (0, U.jsx)(ta, {
              dataKey: "Open",
              stackId: "a",
              fill: Qr.sky,
              radius: [3, 3, 0, 0]
            })]
          })
        })]
      })]
    })
  }
  var Bhe = [{
    key: "gm",
    label: "Total GM$",
    cur: !0,
    ytdAlways: !0
  }, {
    key: "gm",
    label: "GM$ Week",
    cur: !0
  }, {
    key: "interviews",
    label: "Interviews"
  }, {
    key: "registered",
    label: "Registered"
  }, {
    key: "submittals",
    label: "Submittals"
  }, {
    key: "clientInterviews",
    label: "Client Int."
  }, {
    key: "starts",
    label: "Starts"
  }, {
    key: "peoplePaid",
    label: "Paid",
    stock: !0
  }];

  function Snt({
    rc: e,
    i: t,
    ytd: r,
    onRecClick: n
  }) {
    let [i, a] = (0, Ht.useState)(""), s = (e.recruiters || []).map(o => ({
      name: o.name,
      r: o
    })).filter(o => !i || o.name.toLowerCase().includes(i.toLowerCase()));
    return (0, U.jsxs)("div", {
      className: "card lb-card",
      children: [(0, U.jsxs)("div", {
        className: "card-title",
        children: ["Recruiter scorecard", (0, U.jsx)("span", {
          className: "card-hint",
          children: r ? "YTD \xB7 full year" : "selected week"
        }), (0, U.jsx)("input", {
          className: "tbl-search",
          placeholder: "Search recruiter\u2026",
          value: i,
          onChange: o => a(o.target.value)
        })]
      }), (0, U.jsx)("div", {
        className: "lb-scroll",
        children: (0, U.jsxs)("table", {
          className: "lb",
          children: [(0, U.jsx)("thead", {
            children: (0, U.jsxs)("tr", {
              children: [(0, U.jsx)("th", {
                children: "Recruiter"
              }), Bhe.map((o, l) => (0, U.jsx)("th", {
                className: "num",
                children: o.label
              }, l))]
            })
          }), (0, U.jsx)("tbody", {
            children: s.map(({
              name: o,
              r: l
            }) => (0, U.jsxs)("tr", {
              className: n ? "lb-row" : "",
              onClick: () => n && n(l),
              children: [(0, U.jsx)("td", {
                className: "rep-name",
                children: o
              }), Bhe.map((A, u) => {
                let c = l[A.key] || [],
                  f = A.ytdAlways ? Zr(c) : A.stock ? r ? UA(c) || 0 : c[t] || 0 : r ? Zr(c) : c[t] || 0;
                return (0, U.jsx)("td", {
                  className: "num",
                  children: A.cur ? Ea(f) : Pr(f)
                }, u)
              })]
            }, o))
          })]
        })
      })]
    })
  }

  function Cnt({
    d: e,
    s: t,
    wk: r,
    ytd: n,
    cfg: i
  }) {
    let a = p => R4(i || U4, p),
      s = e.recruitment,
      o = e.teamGoals,
      l = (r || e.currentWeek) - 1,
      [A, u] = (0, Ht.useState)(null),
      c = Zr(s.total.paidByRecruiter),
      f = Zr(s.total.paidHouse),
      h = n ? (UA(o.peoplePaid) || 0) - (o.peoplePaid[0] || 0) : (o.peoplePaid[l] || 0) - (o.peoplePaid[l - 1] || 0);
    return (0, U.jsxs)(U.Fragment, {
      children: [a("rc_kpis") && (0, U.jsxs)("div", {
        className: "kpis k5 tight",
        children: [(0, U.jsx)(as, {
          label: "People Paid By Current Recruiters",
          value: Pr(n ? UA(s.total.paidByRecruiter) || 0 : s.total.paidByRecruiter[l]),
          sub: n ? "latest week" : "selected week"
        }), (0, U.jsx)(as, {
          label: "House People Paid",
          value: Pr(n ? UA(s.total.paidHouse) || 0 : s.total.paidHouse[l]),
          sub: n ? "latest week" : "selected week"
        }), (0, U.jsx)(as, {
          label: "People Paid +/-",
          value: (h >= 0 ? "+" : "") + h,
          sub: n ? "net YTD" : "vs prior wk"
        }), (0, U.jsx)(as, {
          label: "Starts",
          value: Pr(n ? Zr(s.total.starts) : s.total.starts[l] || 0),
          sub: n ? "YTD" : "selected week"
        }), (0, U.jsx)(as, {
          label: "Ends",
          value: Pr(n ? Zr(s.total.ends) : s.total.ends[l] || 0),
          sub: n ? "YTD" : "selected week"
        })]
      }), a("rc_open") && (0, U.jsxs)("div", {
        className: "kpi-strip cols2",
        children: [(0, U.jsx)(as, {
          label: "Open Temp Order",
          value: Pr(n ? UA(o.openTempOrders) || 0 : (o.openTempOrders || [])[l] || 0),
          sub: n ? "latest" : "selected week"
        }), (0, U.jsx)(as, {
          label: "Open Perm",
          value: Pr(n ? UA(o.openPerm) || 0 : (o.openPerm || [])[l] || 0),
          sub: n ? "latest" : "selected week"
        })]
      }), (0, U.jsxs)("div", {
        className: "grid2",
        children: [a("rc_funnel") && (0, U.jsx)(zf, {
          title: "Recruiting funnel",
          hint: "YTD",
          children: (0, U.jsxs)(Dv, {
            data: t.funnel,
            layout: "vertical",
            margin: {
              left: 24
            },
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              horizontal: !1
            }), (0, U.jsx)(ra, {
              type: "number",
              ...Yn
            }), (0, U.jsx)(Si, {
              type: "category",
              dataKey: "stage",
              ...Yn,
              width: 80
            }), (0, U.jsx)(bi, {
              ...RA()
            }), (0, U.jsx)(ta, {
              dataKey: "v",
              fill: Qr.blue,
              radius: [0, 4, 4, 0]
            })]
          })
        }), a("rc_gm") && (0, U.jsx)(zf, {
          title: "GM$ contribution by recruiter",
          hint: "YTD",
          children: (0, U.jsxs)(Dv, {
            data: t.gmContrib,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "name",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn,
              tickFormatter: Lu
            }), (0, U.jsx)(bi, {
              ...RA(),
              formatter: p => U1(p)
            }), (0, U.jsx)(ta, {
              dataKey: "v",
              fill: Qr.blue,
              radius: [4, 4, 0, 0]
            })]
          })
        }), a("rc_head") && (0, U.jsx)(zf, {
          title: "Net headcount change",
          sm: !0,
          wide: !0,
          children: (0, U.jsxs)(Dv, {
            data: t.netHC,
            children: [(0, U.jsx)(Lo, {
              stroke: "var(--grid)",
              vertical: !1
            }), (0, U.jsx)(ra, {
              dataKey: "w",
              ...Yn
            }), (0, U.jsx)(Si, {
              ...Yn
            }), (0, U.jsx)(bi, {
              ...RA()
            }), (0, U.jsx)(od, {
              y: 0,
              stroke: "var(--axis)"
            }), (0, U.jsx)(ta, {
              dataKey: "Net",
              radius: [3, 3, 0, 0],
              children: t.netHC.map((p, d) => (0, U.jsx)(Xh, {
                fill: p.Net >= 0 ? Qr.green : Qr.rose
              }, d))
            })]
          })
        })]
      }), a("rc_scorecard") && (0, U.jsx)(Snt, {
        rc: s,
        i: l,
        ytd: n,
        onRecClick: u
      }), A && (0, U.jsx)(knt, {
        rec: A,
        weekDates: o.weekDates,
        onClose: () => u(null)
      })]
    })
  }

  function Ent({
    d: e,
    s: t,
    wk: r,
    ytd: n,
    onUpdateGM: i,
    cfg: a
  }) {
    let s = m => R4(a || U4, m),
      o = e.sales,
      l = (r || e.currentWeek) - 1,
      [A, u] = (0, Ht.useState)(null),
      [c, f] = (0, Ht.useState)("All"),
      h = m => n ? Zr(m || []) : (m || [])[l] || 0,
      p = Object.values(o.repTotals || {}).reduce((m, v) => m + (+v.firstOrder || 0), 0),
      d = c !== "All" && (o.repTotals || {})[c],
      g = d ? [{
        label: "Total Calls",
        value: +d.calls || 0
      }, {
        label: "Prospect DM Calls",
        value: +d.prospectDMCalls || 0
      }, {
        label: "Prospect Meetings",
        value: +d.prospectMeetings || 0
      }, {
        label: "Contracts Sent",
        value: +d.contracts || 0
      }, {
        label: "Contracts Signed",
        value: +d.signed || 0
      }, {
        label: "First Order",
        value: +d.firstOrder || 0
      }, {
        label: "New Client",
        value: +d.newAccounts || 0
      }] : [{
        label: "Total Calls",
        value: h(o.totalCalls)
      }, {
        label: "Prospect DM Calls",
        value: h(o.prospectDMCalls)
      }, {
        label: "Prospect Meetings",
        value: h(o.prospectMeetings)
      }, {
        label: "Contracts Sent",
        value: h(o.contractsSent)
      }, {
        label: "Contracts Signed",
        value: h(o.contractsSigned)
      }, {
        label: "First Order",
        value: p
      }, {
        label: "New Client",
        value: h(o.newClients)
      }];
    return (0, U.jsxs)(U.Fragment, {
      children: [(0, U.jsxs)("div", {
        className: "sales-funnel-layout",
        children: [s("sa_funnel") && (0, U.jsxs)("div", {
          className: "card vfunnel-card",
          children: [(0, U.jsxs)("div", {
            className: "card-title",
            children: ["Sales funnel ", (0, U.jsx)("span", {
              className: "card-hint",
              children: d ? "YTD \xB7 " + c : n ? "YTD" : "this week"
            })]
          }), (0, U.jsx)("div", {
            className: "vfunnel",
            children: g.map((m, v) => (0, U.jsxs)("div", {
              className: "vfunnel-row",
              style: {
                width: 100 - v * 11 + "%"
              },
              children: [(0, U.jsx)("span", {
                className: "vfunnel-label",
                children: m.label
              }), (0, U.jsx)("span", {
                className: "vfunnel-val",
                children: Pr(m.value)
              })]
            }, m.label))
          })]
        }), s("sa_conversion") && (0, U.jsx)(mnt, {
          d: e,
          s: t,
          sel: c,
          setSel: f
        })]
      }), s("sa_leaderboard") && (0, U.jsx)(vnt, {
        repTotals: o.repTotals,
        onRepClick: u,
        onUpdateGM: i
      }), A && (0, U.jsx)(bnt, {
        rep: A,
        d: e,
        onClose: () => u(null)
      })]
    })
  }

  function Tnt(e, t, r) {
    let n = e.teamGoals,
      i = e.recruitment,
      a = e.sales,
      s = e.currentWeek || n.totalGM.length,
      o = (t || s) - 1,
      l = T => r ? Zr(T || []) : (T || [])[o] || 0,
      A = new pr({
        unit: "pt",
        format: "letter"
      }),
      u = A.internal.pageSize.getWidth(),
      c = Fb(e),
      f = c.theme && c.theme.primary || c.brand && c.brand.accent || "#233041",
      h = [parseInt(f.slice(1, 3), 16), parseInt(f.slice(3, 5), 16), parseInt(f.slice(5, 7), 16)],
      p = r ? "YTD \xB7 Weeks 1\u2013" + s : "Week " + (t || s) + (n.weekDates && n.weekDates[o] ? " \xB7 ending " + n.weekDates[o] : "");
    A.setFont("helvetica", "bold"), A.setFontSize(18), A.setTextColor(20), A.text(Ld(e), 40, 50), A.setFont("helvetica", "normal"), A.setFontSize(11), A.setTextColor(110), A.text(p, 40, 68), A.setDrawColor(225), A.line(40, 80, u - 40, 80);
    let d = (T, E, F, N) => {
        T && (A.setFont("helvetica", "bold"), A.setFontSize(12), A.setTextColor(20), A.text(T, 40, N));
        let M = E.reduce((L, I, ee) => (L[ee] = {
          halign: ee ? "right" : "left"
        }, L), {});
        return (0, _he.default)(A, {
          startY: T ? N + 8 : N,
          head: [E],
          body: F,
          theme: "striped",
          headStyles: {
            fillColor: h,
            halign: "left"
          },
          styles: {
            fontSize: 10,
            cellPadding: 5
          },
          columnStyles: M,
          didParseCell: L => {
            L.section === "head" && L.column.index > 0 && (L.cell.styles.halign = "right")
          },
          margin: {
            left: 40,
            right: 40
          }
        }), A.lastAutoTable.finalY
      },
      g = l(n.totalGM) - l(n.tempGM),
      m = (n.weeklyFill || [])[o],
      v = d(null, ["Key metric", "Value"], [
        ["Total GM$", Ea(l(n.totalGM))],
        ["Revenue (Bill)", Ea(l(n.revenue))],
        ["Perm GM$", Ea(g)],
        ["People Paid", Pr(r ? UA(n.peoplePaid) || 0 : n.peoplePaid[o] || 0)],
        ["Weekly Fill Rate", m != null ? Ob(m) : "\u2014"],
        ["New Clients (this week)", Pr((n.newClients || [])[o] || 0)],
        ["Open Temp Orders", Pr(r ? UA(n.openTempOrders) || 0 : n.openTempOrders[o] || 0)],
        ["Starts / Ends", (r ? Zr(i.total.starts) : i.total.starts[o] || 0) + " / " + (r ? Zr(i.total.ends) : i.total.ends[o] || 0)]
      ], 92);
    v = d("Recruiters", ["Recruiter", "GM$", "Starts", "Ends"], (i.recruiters || []).map(T => [T.name, Ea(r ? Zr(T.gm) : (T.gm || [])[o] || 0), Pr(r ? Zr(T.starts) : (T.starts || [])[o] || 0), Pr(r ? Zr(T.ends) : (T.ends || [])[o] || 0)]), v + 22);
    let y = Object.values(a.repTotals || {}).reduce((T, E) => T + (+E.firstOrder || 0), 0);
    v = d("Sales funnel", ["Stage", "Count"], [
      ["Total Calls", Pr(l(a.totalCalls))],
      ["Prospect DM Calls", Pr(l(a.prospectDMCalls))],
      ["Prospect Meetings", Pr(l(a.prospectMeetings))],
      ["Contracts Sent", Pr(l(a.contractsSent))],
      ["Contracts Signed", Pr(l(a.contractsSigned))],
      ["First Order", Pr(y)],
      ["New Client", Pr(l(a.newClients))]
    ], v + 22);
    let C = Object.entries(a.repTotals || {}).map(([T, E]) => ({
      rep: T,
      v: E
    })).sort((T, E) => (+E.v.gm || 0) - (+T.v.gm || 0)).map(({
      rep: T,
      v: E
    }) => [T, Pr(+E.calls || 0), Pr(+E.signed || 0), Pr(+E.newAccounts || 0), Ea(+E.gm || 0)]);
    v = d("Sales leaderboard", ["Rep", "Calls", "Signed", "New Accts", "New GM$"], C, v + 22);
    let B = A.internal.getNumberOfPages();
    for (let T = 1; T <= B; T++) A.setPage(T), A.setFont("helvetica", "normal"), A.setFontSize(8), A.setTextColor(150), A.text("Generated " + new Date().toLocaleDateString() + " \xB7 " + Ld(e), 40, A.internal.pageSize.getHeight() - 24);
    A.save(z6(e) + "-" + (r ? "YTD" : "Week-" + (t || s)) + "-" + khe() + ".pdf")
  }

  function knt({
    rec: e,
    weekDates: t,
    onClose: r
  }) {
    D4(r);
    let n = l => e[l] || [],
      i = Math.max(n("gm").length, n("starts").length, n("ends").length, (t || []).length),
      a = Array.from({
        length: i
      }, (l, A) => ({
        w: (t || [])[A] || "W" + (A + 1),
        GM: +n("gm")[A] || 0,
        Starts: +n("starts")[A] || 0,
        Ends: +n("ends")[A] || 0,
        Submittals: +n("submittals")[A] || 0
      })),
      s = l => n(l).reduce((A, u) => A + (+u || 0), 0),
      o = [
        ["GM$", Ea(s("gm"))],
        ["Starts", Pr(s("starts"))],
        ["Ends", Pr(s("ends"))],
        ["Interviews", Pr(s("interviews"))],
        ["Registered", Pr(s("registered"))],
        ["Submittals", Pr(s("submittals"))],
        ["Client Intvw", Pr(s("clientInterviews"))],
        ["People Paid", Pr(s("peoplePaid"))]
      ];
    return (0, U.jsx)("div", {
      className: "modal-back",
      onClick: r,
      children: (0, U.jsxs)("div", {
        className: "modal wide",
        onClick: l => l.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsx)("div", {
            className: "modal-title",
            children: e.name + " \xB7 recruiter profile"
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: r,
            "aria-label": "Close",
            children: "\xD7"
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-body",
          children: [(0, U.jsx)("div", {
            className: "rp-totals",
            children: o.map(([l, A]) => (0, U.jsxs)("div", {
              className: "rp-stat",
              children: [(0, U.jsx)("div", {
                className: "rp-stat-v",
                children: A
              }), (0, U.jsx)("div", {
                className: "rp-stat-l",
                children: l
              })]
            }, l))
          }), i ? (0, U.jsx)("div", {
            className: "chart-wrap lg",
            children: (0, U.jsx)(Pm, {
              width: "100%",
              height: "100%",
              children: (0, U.jsxs)(Mv, {
                data: a,
                margin: {
                  left: 4,
                  right: 10,
                  top: 8,
                  bottom: 0
                },
                children: [(0, U.jsx)(Lo, {
                  stroke: "var(--grid)",
                  vertical: !1
                }), (0, U.jsx)(ra, {
                  dataKey: "w",
                  ...Yn
                }), (0, U.jsx)(Si, {
                  yAxisId: "l",
                  ...Yn
                }), (0, U.jsx)(Si, {
                  yAxisId: "r",
                  orientation: "right",
                  ...Yn,
                  tickFormatter: Lu
                }), (0, U.jsx)(bi, {
                  ...RA()
                }), (0, U.jsx)($s, {}), (0, U.jsx)(ta, {
                  yAxisId: "l",
                  dataKey: "Starts",
                  stackId: "a",
                  fill: Qr.green
                }), (0, U.jsx)(ta, {
                  yAxisId: "l",
                  dataKey: "Ends",
                  stackId: "a",
                  fill: Qr.rose
                }), (0, U.jsx)(ta, {
                  yAxisId: "l",
                  dataKey: "Submittals",
                  stackId: "a",
                  fill: Qr.violet,
                  radius: [3, 3, 0, 0]
                }), (0, U.jsx)(Ui, {
                  yAxisId: "r",
                  dataKey: "GM",
                  stroke: Qr.blue,
                  strokeWidth: 2.5,
                  dot: !1
                })]
              })
            })
          }) : (0, U.jsx)("div", {
            className: "empty-hint",
            children: "No weekly history yet for this recruiter."
          })]
        })]
      })
    })
  }

  function Nhe(e, t) {
    let r = new Image;
    r.onload = () => {
      let n = document.createElement("canvas"),
        i = 64;
      n.width = i, n.height = i;
      let a = n.getContext("2d");
      a.drawImage(r, 0, 0, i, i);
      let s = a.getImageData(0, 0, i, i).data,
        o = {};
      for (let f = 0; f < s.length; f += 4) {
        let h = s[f],
          p = s[f + 1],
          d = s[f + 2];
        if (s[f + 3] < 200) continue;
        let m = Math.max(h, p, d),
          v = Math.min(h, p, d);
        if (m - v < 18 || m > 242 || m < 26) continue;
        let y = (h >> 4) + "," + (p >> 4) + "," + (d >> 4);
        o[y] = o[y] || {
          n: 0,
          r: 0,
          g: 0,
          b: 0
        };
        let C = o[y];
        C.n++, C.r += h, C.g += p, C.b += d
      }
      let l = Object.values(o).sort((f, h) => h.n - f.n).slice(0, 3).map(f => "#" + [f.r, f.g, f.b].map(h => Math.round(h / f.n).toString(16).padStart(2, "0")).join("")),
        A = document.createElement("canvas"),
        u = 96,
        c = Math.min(u / r.width, u / r.height, 1);
      A.width = Math.max(1, Math.round(r.width * c)), A.height = Math.max(1, Math.round(r.height * c)), A.getContext("2d").drawImage(r, 0, 0, A.width, A.height), t({
        logo: A.toDataURL("image/png"),
        logoColors: l,
        primary: l[0] || null,
        secondary: l[1] || null
      })
    }, r.src = URL.createObjectURL(e)
  }

  function Fnt({
    data: e,
    cfg: t,
    onPreview: r,
    onSave: n,
    onClose: i,
    dark: a,
    setDark: s,
    onDeleteWeek: o,
    onReset: l,
    weekCount: A
  }) {
    D4(i);
    let [u, c] = (0, Ht.useState)(() => JSON.parse(JSON.stringify(t))), [f, h] = (0, Ht.useState)(!1), [p, d] = (0, Ht.useState)(!1), g = N => c(M => {
      let L = JSON.parse(JSON.stringify(M));
      return N(L), r(L), L
    }), m = N => g(M => {
      M.template = N;
      let L = phe[N];
      L && L.tabs && (M.tabs = {
        ...L.tabs
      }, M.widgets = {}, dhe.forEach(I => {
        I.id in (L.widgets || {}) && (M.widgets[I.id] = L.widgets[I.id])
      }))
    }), v = (N, M) => g(L => {
      M ? L.theme[N] = M : delete L.theme[N]
    }), y = N => u.theme[N] || "", [C, B] = (0, Ht.useState)("Layout"), T = ["Layout", "Branding", "Theme", "Display", "Danger"], E = (0, Ht.useRef)(null), F = N => {
      let M = N.target.files && N.target.files[0];
      M && (Nhe(M, L => g(I => {
        L.primary && (I.theme.primary = L.primary), L.secondary && (I.theme.secondary = L.secondary), I.brand = {
          ...I.brand || {},
          logo: L.logo,
          logoColors: L.logoColors
        }
      })), N.target.value = "")
    };
    return (0, U.jsx)("div", {
      className: "modal-back",
      onClick: i,
      children: (0, U.jsxs)("div", {
        className: "modal wide settings",
        onClick: N => N.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsx)("div", {
            className: "modal-title",
            children: "Dashboard settings"
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: i,
            "aria-label": "Close",
            children: "\xD7"
          })]
        }), (0, U.jsx)("div", {
          className: "set-nav",
          children: T.map(N => (0, U.jsx)("button", {
            className: "seg-btn" + (C === N ? " on" : ""),
            onClick: () => B(N),
            children: N
          }, N))
        }), (0, U.jsxs)("div", {
          className: "modal-body",
          children: [C === "Layout" && (0, U.jsxs)(U.Fragment, {
            children: [(0, U.jsxs)("div", {
              className: "set-sec",
              children: [(0, U.jsx)("div", {
                className: "set-h",
                children: "Template"
              }), (0, U.jsx)("div", {
                className: "set-hint",
                children: "Presets that set which tabs and widgets show. You can still fine-tune everything below after picking one."
              }), (0, U.jsx)("div", {
                className: "seg",
                children: Object.entries(phe).map(([N, M]) => (0, U.jsx)("button", {
                  className: "seg-btn" + (u.template === N ? " on" : ""),
                  onClick: () => m(N),
                  children: M.label
                }, N))
              })]
            }), (0, U.jsxs)("div", {
              className: "set-sec",
              children: [(0, U.jsx)("div", {
                className: "set-h",
                children: "Tabs"
              }), hhe.map(N => (0, U.jsxs)("label", {
                className: "set-row",
                children: [(0, U.jsx)("input", {
                  type: "checkbox",
                  checked: u.tabs[N] !== !1,
                  onChange: M => g(L => {
                    L.tabs[N] = M.target.checked, L.template = "custom"
                  })
                }), (0, U.jsx)("span", {
                  children: N
                })]
              }, N))]
            }), (0, U.jsxs)("div", {
              className: "set-sec",
              children: [(0, U.jsx)("div", {
                className: "set-h",
                children: "Widgets"
              }), hhe.filter(N => u.tabs[N] !== !1).map(N => (0, U.jsxs)("div", {
                className: "set-group",
                children: [(0, U.jsx)("div", {
                  className: "set-sub",
                  children: N
                }), dhe.filter(M => M.tab === N).map(M => (0, U.jsxs)("label", {
                  className: "set-row",
                  children: [(0, U.jsx)("input", {
                    type: "checkbox",
                    checked: u.widgets[M.id] !== !1,
                    onChange: L => g(I => {
                      I.widgets[M.id] = L.target.checked, I.template = "custom"
                    })
                  }), (0, U.jsx)("span", {
                    children: M.label
                  })]
                }, M.id))]
              }, N))]
            })]
          }), C === "Branding" && (0, U.jsxs)("div", {
            className: "set-sec",
            children: [(0, U.jsx)("div", {
              className: "set-h",
              children: "Branding"
            }), (0, U.jsxs)("div", {
              className: "cm-field",
              children: [(0, U.jsxs)("label", {
                children: ["Company logo ", (0, U.jsx)("span", {
                  className: "cm-hint",
                  children: "(theme colors are generated from it)"
                })]
              }), (0, U.jsx)("button", {
                className: "btn ghost sm",
                onClick: () => E.current.click(),
                children: "Upload logo \\u2192 auto-generate theme"
              }), (0, U.jsx)("input", {
                ref: E,
                type: "file",
                accept: "image/*",
                hidden: !0,
                onChange: F
              }), u.brand && u.brand.logoColors && (0, U.jsx)("div", {
                className: "swatches",
                style: {
                  marginTop: 8
                },
                children: u.brand.logoColors.map(N => (0, U.jsx)("span", {
                  className: "swatch",
                  style: {
                    background: N,
                    cursor: "default"
                  }
                }, N))
              })]
            }), (0, U.jsxs)("div", {
              className: "cm-field",
              children: [(0, U.jsxs)("label", {
                children: ["Company name ", (0, U.jsx)("span", {
                  className: "cm-hint",
                  children: "(header, PDF title, export filenames)"
                })]
              }), (0, U.jsx)("input", {
                className: "inp",
                placeholder: "Weekly Performance Book",
                value: u.brand && u.brand.name || "",
                onChange: N => g(M => {
                  M.brand = {
                    ...M.brand || {},
                    name: N.target.value
                  }
                })
              })]
            })]
          }), C === "Theme" && (0, U.jsxs)("div", {
            className: "set-sec",
            children: [(0, U.jsx)("div", {
              className: "set-h",
              children: "Theme colors"
            }), (0, U.jsx)("div", {
              className: "set-hint",
              children: "Leave a color empty to use the default. Changes preview live; nothing saves until you hit Save."
            }), (0, U.jsx)("div", {
              className: "theme-grid",
              children: $rt.map(([N, M]) => (0, U.jsxs)("div", {
                className: "theme-row",
                children: [(0, U.jsx)("input", {
                  type: "color",
                  value: y(N) || "#233041",
                  onChange: L => v(N, L.target.value)
                }), (0, U.jsx)("span", {
                  className: "theme-lbl",
                  children: M
                }), y(N) && (0, U.jsx)("button", {
                  className: "theme-clear",
                  title: "Reset to default",
                  onClick: () => v(N, ""),
                  children: "\xD7"
                })]
              }, N))
            }), (0, U.jsx)("button", {
              className: "btn ghost sm",
              style: {
                marginTop: 8
              },
              onClick: () => g(N => {
                N.theme = {}
              }),
              children: "Reset all colors to default"
            })]
          }), C === "Display" && (0, U.jsxs)("div", {
            className: "set-sec",
            children: [(0, U.jsx)("div", {
              className: "set-h",
              children: "Display"
            }), (0, U.jsxs)("label", {
              className: "set-row",
              children: [(0, U.jsx)("input", {
                type: "checkbox",
                checked: a,
                onChange: N => s(N.target.checked)
              }), (0, U.jsx)("span", {
                children: "Dark mode (this device)"
              })]
            })]
          }), C === "Danger" && (0, U.jsxs)("div", {
            className: "set-sec danger-zone",
            children: [(0, U.jsx)("div", {
              className: "set-h",
              children: "Danger zone"
            }), A > 1 && (0, U.jsx)("button", {
              className: "btn ghost sm" + (f ? " danger" : ""),
              onClick: () => {
                f ? (o(), h(!1)) : (h(!0), setTimeout(() => h(!1), 4e3))
              },
              children: f ? "Confirm delete Week " + A : "Delete latest week (W" + A + ")"
            }), (0, U.jsx)("button", {
              className: "btn ghost sm" + (p ? " danger" : ""),
              style: {
                marginLeft: 8
              },
              onClick: () => {
                p ? (l(), d(!1)) : (d(!0), setTimeout(() => d(!1), 4e3))
              },
              children: p ? "Confirm full reset" : "Reset all data"
            })]
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-foot",
          children: [(0, U.jsx)("button", {
            className: "btn ghost",
            onClick: i,
            children: "Cancel"
          }), (0, U.jsx)("button", {
            className: "btn primary",
            onClick: () => n(u),
            children: "Save settings"
          })]
        })]
      })
    })
  }
  var V6 = ["Overview", "Team Goals", "Recruitment (Current Team)", "Sales"];

  function Vf({
    label: e,
    value: t,
    onChange: r
  }) {
    return (0, U.jsxs)("label", {
      className: "nf",
      children: [(0, U.jsx)("span", {
        children: e
      }), (0, U.jsx)("input", {
        type: "number",
        inputMode: "decimal",
        step: "any",
        value: t,
        onChange: n => r(n.target.value)
      })]
    })
  }
  var Ont = {
      revenue: "Revenue / Bill ($)",
      tempGM: "Temp GM$ (Margin)",
      totalGM: "Total GM$",
      budget: "Weekly Budget ($)",
      hours: "Weekly Hours",
      peoplePaid: "People Paid (Headcount)",
      clientsBilled: "Clients Billed",
      newClients: "New Clients",
      newTempOrders: "New Temp Orders",
      openTempOrders: "Open Temp Orders",
      openPerm: "Open Perm Orders",
      weeklyFill: "Weekly Fill Rate (0\u20131)"
    },
    Nnt = {
      gm: "GM$",
      peoplePaid: "Paid",
      starts: "Starts",
      ends: "Ends",
      interviews: "Interviews",
      registered: "Registered",
      submittals: "Submittals",
      clientInterviews: "Client Int."
    },
    Pnt = {
      totalCalls: "Total Calls",
      prospectTouches: "Prospect Touches",
      clientTouches: "Client Touches",
      prospectEmails: "Prospect Emails",
      clientEmails: "Client Emails",
      prospectMeetings: "Prospect Meetings",
      clientMeetings: "Client Meetings",
      contractsSent: "Contracts Sent",
      contractsSigned: "Contracts Signed",
      newClients: "New Clients",
      prospectDMCalls: "Prospect DM Calls"
    };

  function Int({
    onCancel: e,
    onCreate: t
  }) {
    let [r, n] = (0, Ht.useState)([]), [i, a] = (0, Ht.useState)([]), [s, o] = (0, Ht.useState)(""), [l, A] = (0, Ht.useState)(""), [u, c] = (0, Ht.useState)({
      bill: "",
      pay: "",
      margin: "",
      headcount: ""
    }), f = () => {
      let p = s.trim();
      p && !r.includes(p) && n([...r, p]), o("")
    }, h = () => {
      let p = l.trim();
      p && !i.includes(p) && a([...i, p]), A("")
    };
    return (0, U.jsx)("div", {
      className: "modal-back",
      onClick: e,
      children: (0, U.jsxs)("div", {
        className: "modal",
        onClick: p => p.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsx)("div", {
            className: "modal-title",
            children: "Set up your team"
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: e,
            "aria-label": "Close",
            children: "\xD7"
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-body",
          children: [(0, U.jsx)("p", {
            className: "setup-intro",
            children: "Add your recruiters and salespeople. You can add, remove, or rename people anytime later from the Add Data screen."
          }), (0, U.jsx)("div", {
            className: "msec",
            children: "Recruiters"
          }), (0, U.jsxs)("div", {
            className: "chip-row",
            children: [r.length === 0 && (0, U.jsx)("span", {
              className: "chip-empty",
              children: "None yet"
            }), r.map(p => (0, U.jsxs)("span", {
              className: "chip",
              children: [p, (0, U.jsx)("button", {
                type: "button",
                onClick: () => n(r.filter(d => d !== p)),
                "aria-label": "Remove " + p,
                children: "\xD7"
              })]
            }, p))]
          }), (0, U.jsxs)("div", {
            className: "create-form",
            children: [(0, U.jsx)("input", {
              className: "inp",
              placeholder: "Recruiter name",
              value: s,
              onChange: p => o(p.target.value),
              onKeyDown: p => {
                p.key === "Enter" && f()
              }
            }), (0, U.jsx)("button", {
              className: "btn sm",
              onClick: f,
              children: "Add"
            })]
          }), (0, U.jsx)("div", {
            className: "msec",
            style: {
              marginTop: 14
            },
            children: "Salespeople"
          }), (0, U.jsxs)("div", {
            className: "chip-row",
            children: [i.length === 0 && (0, U.jsx)("span", {
              className: "chip-empty",
              children: "None yet"
            }), i.map(p => (0, U.jsxs)("span", {
              className: "chip",
              children: [p, (0, U.jsx)("button", {
                type: "button",
                onClick: () => a(i.filter(d => d !== p)),
                "aria-label": "Remove " + p,
                children: "\xD7"
              })]
            }, p))]
          }), (0, U.jsxs)("div", {
            className: "create-form",
            children: [(0, U.jsx)("input", {
              className: "inp",
              placeholder: "Salesperson name",
              value: l,
              onChange: p => A(p.target.value),
              onKeyDown: p => {
                p.key === "Enter" && h()
              }
            }), (0, U.jsx)("button", {
              className: "btn sm",
              onClick: h,
              children: "Add"
            })]
          }), (0, U.jsxs)("div", {
            className: "msec",
            style: {
              marginTop: 14
            },
            children: ["Weekly goals ", (0, U.jsx)("span", {
              className: "setup-opt",
              children: "(optional \u2014 you can set these later)"
            })]
          }), (0, U.jsxs)("div", {
            className: "nf-grid",
            children: [(0, U.jsx)(Vf, {
              label: "Bill $",
              value: u.bill,
              onChange: p => c({
                ...u,
                bill: p
              })
            }), (0, U.jsx)(Vf, {
              label: "Pay $",
              value: u.pay,
              onChange: p => c({
                ...u,
                pay: p
              })
            }), (0, U.jsx)(Vf, {
              label: "Margin %",
              value: u.margin,
              onChange: p => c({
                ...u,
                margin: p
              })
            }), (0, U.jsx)(Vf, {
              label: "Headcount",
              value: u.headcount,
              onChange: p => c({
                ...u,
                headcount: p
              })
            })]
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-foot",
          children: [(0, U.jsx)("button", {
            className: "btn ghost",
            onClick: e,
            children: "Cancel"
          }), (0, U.jsx)("button", {
            className: "btn primary",
            onClick: () => t({
              recruiters: r,
              salespeople: i,
              goals: u
            }),
            children: "Create dashboard"
          })]
        })]
      })
    })
  }

  function Lnt({
    d: e,
    onClose: t,
    onSave: r,
    onAddRep: n,
    onRemoveRep: i,
    onAddRecruiter: a,
    onRemoveRecruiter: s
  }) {
    let o = (0, Ht.useRef)(!1),
      l = () => {
        o.current && !window.confirm("You have unsaved entries for this week. Discard them?") || t()
      };
    D4(l);
    let A = (e.currentWeek || e.teamGoals.totalGM.length) + 1,
      u = we => Object.fromEntries(we.map(le => [le, ""])),
      [c, f] = (0, Ht.useState)(""),
      [h, p] = (0, Ht.useState)(""),
      [d, g] = (0, Ht.useState)(u(L1)),
      [m, v] = (0, Ht.useState)(""),
      [y, C] = (0, Ht.useState)(u(kb)),
      [B, T] = (0, Ht.useState)({}),
      [E, F] = (0, Ht.useState)({}),
      N = (e.recruitment.recruiters || []).map(we => we.name),
      M = Object.keys(e.sales.repTotals || {}),
      [L, I] = (0, Ht.useState)("tg"),
      [ee, K] = (0, Ht.useState)(""),
      [V, R] = (0, Ht.useState)(null),
      [Q, G] = (0, Ht.useState)(""),
      W = () => {
        o.current = !0
      },
      Y = (we, le) => {
        W(), g(Re => ({
          ...Re,
          [we]: le
        }))
      },
      J = (we, le) => {
        W(), C(Re => ({
          ...Re,
          [we]: le
        }))
      },
      O = (we, le, Re) => (W(), T(Ye => ({
        ...Ye,
        [we]: {
          ...Ye[we] || u(Hp),
          [le]: Re
        }
      }))),
      j = (we, le, Re) => (W(), F(Ye => ({
        ...Ye,
        [we]: {
          ...Ye[we] || u(Id),
          [le]: Re
        }
      }))),
      H = we => {
        I(we), R(null), K("")
      },
      z = A - 2,
      re = z >= 0,
      ne = () => {
        if (!re) return;
        let we = Re => {
          let Ye = (Re || [])[z];
          return Ye == null || Ye === 0 ? "" : String(Ye)
        };
        g(Object.fromEntries(L1.map(Re => [Re, we(e.teamGoals[Re])]))), v(we(e.recruitment.total && e.recruitment.total.openOrders)), C(Object.fromEntries(kb.map(Re => [Re, we(e.sales[Re])]))), T(Object.fromEntries((e.recruitment.recruiters || []).map(Re => [Re.name, Object.fromEntries(Hp.map(Ye => [Ye, we(Re[Ye])]))])));
        let le = (e._weekLedger || []).find(Re => Re.week === A - 1);
        le && le.reps && F(Object.fromEntries(Object.entries(le.reps).map(([Re, Ye]) => [Re, Object.fromEntries(Id.map(Ve => [Ve, Ye[Ve] == null || +Ye[Ve] == 0 ? "" : String(Ye[Ve])]))])))
      },
      fe = we => {
        let le = ee.trim();
        if (le) {
          if (we === "rep") {
            if (M.includes(le)) return;
            n(le), F(Re => ({
              ...Re,
              [le]: u(Id)
            })), I("rep::" + le)
          } else {
            if (N.includes(le)) return;
            a(le), T(Re => ({
              ...Re,
              [le]: u(Hp)
            })), I("rec::" + le)
          }
          K("")
        }
      },
      ie = (we, le) => {
        let Re = we + "::" + le;
        if (V === Re) {
          if (we === "rep") {
            i(le);
            let Ye = M.filter(Ve => Ve !== le);
            I(Ye[0] ? "rep::" + Ye[0] : "tg")
          } else {
            s(le);
            let Ye = N.filter(Ve => Ve !== le);
            I(Ye[0] ? "rec::" + Ye[0] : "tg")
          }
          R(null)
        } else R(Re)
      },
      xe = () => Object.fromEntries(M.map(we => [we, E[we] || u(Id)])),
      Ee = () => Object.fromEntries(N.map(we => [we, B[we] || u(Hp)])),
      Z = L.startsWith("rec::") && L !== "rec::__add__" ? L.slice(5) : null,
      Ie = L.startsWith("rep::") && L !== "rep::__add__" ? L.slice(5) : null,
      qe = ({
        type: we,
        name: le
      }) => (0, U.jsx)("div", {
        className: "rep-remove",
        children: (0, U.jsx)("button", {
          type: "button",
          className: "btn ghost xs" + (V === we + "::" + le ? " danger" : ""),
          onClick: () => ie(we, le),
          children: V === we + "::" + le ? "Confirm remove " + le : "Remove " + le
        })
      });
    return (0, U.jsx)("div", {
      className: "modal-back",
      onClick: l,
      children: (0, U.jsxs)("div", {
        className: "modal",
        onClick: we => we.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsxs)("div", {
            className: "modal-title",
            children: ["Add data \u2014 Week ", A]
          }), re && (0, U.jsx)("button", {
            className: "btn ghost sm prefill-btn",
            onClick: ne,
            title: "Copy last week's numbers into the form so you only change what moved",
            children: "\u293A Prefill from last week"
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: l,
            "aria-label": "Close",
            children: "\xD7"
          })]
        }), (0, U.jsxs)("div", {
          className: "modal-body",
          children: [(0, U.jsxs)("label", {
            className: "nf wide",
            children: [(0, U.jsx)("span", {
              children: "Week ending (date)"
            }), (0, U.jsx)("input", {
              type: "date",
              value: h,
              onChange: we => {
                let le = we.target.value;
                if (p(le), !le) {
                  f("");
                  return
                }
                let Re = le.split("-");
                f(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][+Re[1] - 1] + " " + Re[2])
              }
            })]
          }), (0, U.jsx)("div", {
            className: "msec",
            children: "Section"
          }), (0, U.jsx)("div", {
            className: "rep-manage",
            children: (0, U.jsxs)("select", {
              className: "rep-select",
              value: L,
              onChange: we => H(we.target.value),
              children: [(0, U.jsxs)("optgroup", {
                label: "Team",
                children: [(0, U.jsx)("option", {
                  value: "tg",
                  children: "Team goals"
                }), (0, U.jsx)("option", {
                  value: "salestot",
                  children: "Sales totals"
                })]
              }), (0, U.jsxs)("optgroup", {
                label: "Recruiters",
                children: [N.map(we => (0, U.jsx)("option", {
                  value: "rec::" + we,
                  children: we
                }, we)), (0, U.jsx)("option", {
                  value: "rec::__add__",
                  children: "\uFF0B Add recruiter\u2026"
                })]
              }), (0, U.jsxs)("optgroup", {
                label: "Sales reps",
                children: [M.map(we => (0, U.jsx)("option", {
                  value: "rep::" + we,
                  children: we
                }, we)), (0, U.jsx)("option", {
                  value: "rep::__add__",
                  children: "\uFF0B Add sales rep\u2026"
                })]
              })]
            })
          }), L === "tg" && (0, U.jsxs)("div", {
            className: "nf-grid",
            children: [L1.map(we => (0, U.jsx)(Vf, {
              label: Ont[we],
              value: d[we],
              onChange: le => Y(we, le)
            }, we)), (0, U.jsx)(Vf, {
              label: "Open Orders (total)",
              value: m,
              onChange: v
            })]
          }), L === "salestot" && (0, U.jsx)("div", {
            className: "nf-grid",
            children: kb.map(we => (0, U.jsx)(Vf, {
              label: Pnt[we],
              value: y[we],
              onChange: le => J(we, le)
            }, we))
          }), Z && (0, U.jsx)("div", {
            className: "nf-grid rep-fields",
            children: Hp.map(we => (0, U.jsx)(Vf, {
              label: Nnt[we],
              value: (B[Z] || {})[we] || "",
              onChange: le => O(Z, we, le)
            }, we))
          }), Ie && (0, U.jsx)("div", {
            className: "nf-grid rep-fields",
            children: Id.map(we => (0, U.jsx)(Vf, {
              label: Jrt[we],
              value: (E[Ie] || {})[we] || "",
              onChange: le => j(Ie, we, le)
            }, we))
          }), (L === "rep::__add__" || L === "rec::__add__") && (0, U.jsxs)("div", {
            className: "rep-add",
            children: [(0, U.jsx)("input", {
              placeholder: L === "rep::__add__" ? "New sales rep name" : "New recruiter name",
              value: ee,
              onChange: we => K(we.target.value),
              onKeyDown: we => {
                we.key === "Enter" && (we.preventDefault(), fe(L === "rep::__add__" ? "rep" : "rec"))
              }
            }), (0, U.jsx)("button", {
              type: "button",
              className: "btn primary xs",
              onClick: () => fe(L === "rep::__add__" ? "rep" : "rec"),
              children: "Add"
            })]
          }), (0, U.jsxs)("div", {
            className: "mnote",
            children: [(0, U.jsx)("b", {
              children: "To add or remove a person:"
            }), " pick them (or \u201CAdd\u2026\u201D) from the dropdown \u2014 those roster changes save instantly, so you can just close this window. ", (0, U.jsx)("b", {
              children: "To log a new week:"
            }), " fill in the numbers, then Save. (Saving with everything blank is blocked so you don't create an empty week.)"]
          }), Q && (0, U.jsx)("div", {
            className: "mnote merr",
            children: Q
          }), (() => {
            let we = Ye => +Ye || 0,
              le = [];
            return we(y.contractsSigned) > we(y.contractsSent) && le.push("Contracts signed exceeds contracts sent."), Object.entries(E).forEach(([Ye, Ve]) => {
              we(Ve.signed) > we(Ve.contracts) && le.push(Ye + ": signed exceeds contracts sent.")
            }), we(d.weeklyFill) > 1 && le.push("Weekly fill rate is over 100% \u2014 enter it as a decimal (0.85 = 85%)."), ([...Object.values(d), ...Object.values(y)].some(Ye => we(Ye) < 0) || Object.values(E).some(Ye => Object.values(Ye).some(Ve => we(Ve) < 0)) || Object.values(B).some(Ye => Object.values(Ye).some(Ve => we(Ve) < 0))) && le.push("A negative number was entered."), le.length ? (0, U.jsxs)("div", {
              className: "entry-warn",
              children: [(0, U.jsx)("b", {
                children: "Double-check:"
              }), (0, U.jsx)("ul", {
                children: le.map((Ye, Ve) => (0, U.jsx)("li", {
                  children: Ye
                }, Ve))
              })]
            }) : null
          })()]
        }), (0, U.jsxs)("div", {
          className: "modal-foot",
          children: [(0, U.jsx)("button", {
            className: "btn ghost",
            onClick: l,
            children: "Close"
          }), (0, U.jsxs)("button", {
            className: "btn primary",
            onClick: () => {
              let we = Ve => Object.values(Ve || {}).some(lt => (+lt || 0) != 0),
                le = Ee(),
                Re = xe();
              if (!(we(d) || (+m || 0) != 0 || we(y) || Object.values(le).some(we) || Object.values(Re).some(we))) {
                G("Nothing to save yet \u2014 enter at least one number for Week " + A + ". (Adding or removing people already saved on its own.)");
                return
              }
              r({
                weekDate: c,
                tg: d,
                sales: y,
                openOrders: m,
                recruiters: le,
                reps: Re
              })
            },
            children: ["Save Week ", A]
          })]
        })]
      })
    })
  }

  function Unt({
    data: e,
    teams: t,
    multiTeam: r,
    onClose: n,
    onSplit: i,
    onAdd: a,
    onRename: s,
    onRemove: o,
    onImport: l,
    onImportInto: A
  }) {
    let [u, c] = (0, Ht.useState)(""), [f, h] = (0, Ht.useState)("Team 1"), [p, d] = (0, Ht.useState)(null), [g, m] = (0, Ht.useState)(""), [v, y] = (0, Ht.useState)(null);
    return (0, U.jsx)("div", {
      className: "modal-backdrop",
      onClick: n,
      children: (0, U.jsxs)("div", {
        className: "modal team-modal",
        onClick: C => C.stopPropagation(),
        children: [(0, U.jsxs)("div", {
          className: "modal-head",
          children: [(0, U.jsx)("h3", {
            children: r ? "Manage teams" : "Set up teams"
          }), (0, U.jsx)("button", {
            className: "x",
            onClick: n,
            children: "\xD7"
          })]
        }), (0, U.jsx)("div", {
          className: "modal-body",
          children: r ? (0, U.jsxs)(U.Fragment, {
            children: [(0, U.jsx)("div", {
              className: "tm-list",
              children: t.map(C => (0, U.jsx)("div", {
                className: "tm-row",
                children: p === C.id ? (0, U.jsxs)(U.Fragment, {
                  children: [(0, U.jsx)("input", {
                    className: "inp tm-edit",
                    value: g,
                    autoFocus: !0,
                    onChange: B => m(B.target.value),
                    onKeyDown: B => {
                      B.key === "Enter" && (s(C.id, g), d(null))
                    }
                  }), (0, U.jsx)("button", {
                    className: "btn sm primary",
                    onClick: () => {
                      s(C.id, g), d(null)
                    },
                    children: "Save"
                  }), (0, U.jsx)("button", {
                    className: "btn sm ghost",
                    onClick: () => d(null),
                    children: "Cancel"
                  })]
                }) : v === C.id ? (0, U.jsxs)(U.Fragment, {
                  children: [(0, U.jsxs)("span", {
                    className: "tm-name",
                    children: ['Remove "', C.name, '"?']
                  }), (0, U.jsx)("button", {
                    className: "btn sm danger",
                    onClick: () => {
                      o(C.id), y(null)
                    },
                    children: "Remove"
                  }), (0, U.jsx)("button", {
                    className: "btn sm ghost",
                    onClick: () => y(null),
                    children: "Keep"
                  })]
                }) : (0, U.jsxs)(U.Fragment, {
                  children: [(0, U.jsx)("span", {
                    className: "tm-name",
                    children: C.name
                  }), (0, U.jsxs)("span", {
                    className: "tm-meta",
                    children: [e.teams[C.id] && e.teams[C.id].currentWeek || 0, " weeks"]
                  }), A && (0, U.jsx)("button", {
                    className: "btn sm ghost",
                    title: "Replace " + C.name + "'s data from a spreadsheet",
                    onClick: () => A(C.id),
                    children: "Import data"
                  }), (0, U.jsx)("button", {
                    className: "btn sm ghost",
                    onClick: () => {
                      d(C.id), m(C.name)
                    },
                    children: "Rename"
                  }), (0, U.jsx)("button", {
                    className: "btn sm ghost danger-text",
                    onClick: () => y(C.id),
                    children: "Remove"
                  })]
                })
              }, C.id))
            }), (0, U.jsxs)("div", {
              className: "tm-add",
              children: [(0, U.jsx)("div", {
                className: "tm-label",
                children: "Add a team"
              }), (0, U.jsxs)("div", {
                className: "tm-add-row",
                children: [(0, U.jsx)("input", {
                  className: "inp",
                  value: u,
                  onChange: C => c(C.target.value),
                  placeholder: "New team / location name"
                }), (0, U.jsx)("button", {
                  className: "btn ghost",
                  disabled: !u.trim(),
                  onClick: () => {
                    a(u), c("")
                  },
                  title: "Create an empty team",
                  children: "+ Empty"
                }), (0, U.jsx)("button", {
                  className: "btn primary",
                  disabled: !u.trim(),
                  onClick: () => {
                    l(u.trim())
                  },
                  title: "Create the team by importing a workbook",
                  children: "+ Import"
                })]
              }), (0, U.jsx)("div", {
                className: "tm-hint",
                children: '"Empty" creates a team you can enter weeks into. "Import" creates it from a spreadsheet.'
              })]
            })]
          }) : (0, U.jsxs)("div", {
            className: "tm-intro",
            children: [(0, U.jsx)("p", {
              children: 'Split this company into multiple teams or locations. Your current data becomes the first team \\u2014 then you can add more, each with its own weekly numbers. The company admin sees an "All teams" roll-up plus each team on its own.'
            }), (0, U.jsx)("label", {
              className: "tm-label",
              children: "Name your current team"
            }), (0, U.jsx)("input", {
              className: "inp",
              value: f,
              onChange: C => h(C.target.value),
              placeholder: "e.g. Toronto, Head Office"
            }), (0, U.jsx)("button", {
              className: "btn primary",
              onClick: () => {
                i(f), n()
              },
              children: "Split into teams"
            })]
          })
        })]
      })
    })
  }

  function M4({
    session: e = null,
    initialData: t = void 0,
    onPersist: r = null,
    canEdit: n = !0,
    agencyName: i = "",
    editableTeam: a = null
  }) {
    let s = !!a,
      o = n && !s,
      [l, A] = (0, Ht.useState)(null),
      [u, c] = (0, Ht.useState)(() => {
        try {
          let Le = localStorage.getItem("wpb_default_tab");
          return V6.includes(Le) ? Le : "Overview"
        } catch (Le) {
          return "Overview"
        }
      }),
      [f, h] = (0, Ht.useState)(null),
      [p, d] = (0, Ht.useState)(null),
      [g, m] = (0, Ht.useState)(a || "__all__"),
      v = (0, Ht.useRef)(null),
      [y, C] = (0, Ht.useState)(!1),
      [B, T] = (0, Ht.useState)(1),
      [E, F] = (0, Ht.useState)({
        name: "",
        logo: null,
        logoColors: null,
        primary: null,
        secondary: null
      });
    (0, Ht.useEffect)(() => {
      i && F(Le => Le.name ? Le : {
        ...Le,
        name: i
      })
    }, [i]);
    let N = (0, Ht.useRef)(null),
      M = () => E.name || E.logo ? {
        template: "custom",
        tabs: {},
        widgets: {},
        theme: {
          ...E.primary ? {
            primary: E.primary
          } : {},
          ...E.secondary ? {
            secondary: E.secondary
          } : {}
        },
        brand: {
          name: (E.name || "").trim(),
          ...E.logo ? {
            logo: E.logo,
            logoColors: E.logoColors
          } : {}
        }
      } : null,
      [L, I] = (0, Ht.useState)(!1),
      [ee, K] = (0, Ht.useState)(null),
      [V, R] = (0, Ht.useState)(!1),
      [Q, G] = (0, Ht.useState)(!1),
      [W, Y] = (0, Ht.useState)(!1),
      [J, O] = (0, Ht.useState)(() => {
        try {
          return localStorage.getItem(fhe) === "dark"
        } catch (Le) {
          return !1
        }
      }),
      [j, H] = (0, Ht.useState)(""),
      z = (0, Ht.useRef)(null);
    (0, Ht.useEffect)(() => {
      if (!e) try {
        let Le = localStorage.getItem(q6);
        Le && A(JSON.parse(Le))
      } catch (Le) {}
    }, []), (0, Ht.useEffect)(() => {
      e && t !== void 0 && A(t)
    }, [e, t]), (0, Ht.useEffect)(() => {
      document.documentElement.classList.toggle("wpb-dark", J);
      try {
        localStorage.setItem(fhe, J ? "dark" : "light")
      } catch (Le) {}
    }, [J]);
    let re = ee || Fb(l);
    Object.assign(Qr, She(re)), (0, Ht.useEffect)(() => {
      Yrt(re)
    }, [JSON.stringify(re.theme), JSON.stringify(re.brand)]), (0, Ht.useEffect)(() => {
      try {
        document.title = Ld({
          ...l,
          config: ee || l.config
        })
      } catch (Le) {}
    }, [re.brand && re.brand.name]);
    let ne = Le => {
      try {
        localStorage.setItem(q6, JSON.stringify(Le))
      } catch (mt) {}
      r && r(Le), ie(Date.now())
    };
    (0, Ht.useEffect)(() => {
      let Le = mt => {
        let ct = mt.target && mt.target.tagName || "";
        if (/INPUT|TEXTAREA|SELECT/.test(ct) || mt.metaKey || mt.ctrlKey || mt.altKey || y || L) return;
        let Nt = V6.filter($t => P1(re, $t));
        /^[1-4]$/.test(mt.key) && Nt[+mt.key - 1] ? c(Nt[+mt.key - 1]) : mt.key === "a" && l && !hr && !(Lt && g === "__all__") && (o || s && g === a) ? C(!0) : mt.key === "e" && l && vhe(l)
      };
      return window.addEventListener("keydown", Le), () => window.removeEventListener("keydown", Le)
    });
    let [fe, ie] = (0, Ht.useState)(0), [xe, Ee] = (0, Ht.useState)(!1);
    (0, Ht.useEffect)(() => {
      if (!fe) return;
      Ee(!0);
      let Le = setTimeout(() => Ee(!1), 2500);
      return () => clearTimeout(Le)
    }, [fe]);
    let Z = ({
        recruiters: Le = [],
        salespeople: mt = [],
        goals: ct = {}
      }) => {
        let Nt = JSON.parse(JSON.stringify(N1));
        Nt.recruitment.recruiters = Le.map(Wt => ({
          name: Wt,
          gm: [],
          peoplePaid: [],
          starts: [],
          ends: [],
          interviews: [],
          registered: [],
          submittals: [],
          clientInterviews: []
        })), Nt.sales.repTotals = {}, mt.forEach(Wt => {
          Nt.sales.repTotals[Wt] = {
            calls: 0,
            prospectDMCalls: 0,
            prospectMeetings: 0,
            clientMeetings: 0,
            contracts: 0,
            signed: 0,
            firstOrder: 0,
            newAccounts: 0,
            gm: 0,
            meetings: 0,
            prospectTouches: 0,
            clientTouches: 0
          }
        }), Nt.teamGoals.goals = {
          bill: ct.bill != null && ct.bill !== "" ? +ct.bill : null,
          pay: ct.pay != null && ct.pay !== "" ? +ct.pay : null,
          margin: ct.margin != null && ct.margin !== "" ? +ct.margin : null,
          headcount: ct.headcount != null && ct.headcount !== "" ? +ct.headcount : null
        }, Nt.currentWeek = 0, Nt.weekEnding = "";
        let $t = M();
        $t && (Nt.config = $t), A(Nt), ne(Nt), R(!1), h(null)
      },
      Ie = tnt(l, g),
      qe = Le => {
        let mt = rnt(l, g, Le);
        A(mt), ne(mt)
      },
      we = () => y && (0, U.jsx)(Lnt, {
        d: Ie,
        onClose: () => C(!1),
        onSave: Le => {
          qe(ant(Ie, Le)), h(null), C(!1)
        },
        onAddRep: Le => {
          let mt = JSON.parse(JSON.stringify(Ie));
          mt.sales.repTotals = mt.sales.repTotals || {}, mt.sales.repTotals[Le] || (mt.sales.repTotals[Le] = {
            calls: 0,
            prospectDMCalls: 0,
            prospectMeetings: 0,
            clientMeetings: 0,
            contracts: 0,
            signed: 0,
            firstOrder: 0,
            newAccounts: 0,
            gm: 0,
            meetings: 0,
            prospectTouches: 0,
            clientTouches: 0
          }), qe(mt)
        },
        onRemoveRep: Le => {
          let mt = JSON.parse(JSON.stringify(Ie));
          mt.sales.repTotals && delete mt.sales.repTotals[Le], qe(mt)
        },
        onAddRecruiter: Le => {
          let mt = JSON.parse(JSON.stringify(Ie)),
            ct = mt.currentWeek || mt.teamGoals.totalGM.length;
          if (mt.recruitment.recruiters = mt.recruitment.recruiters || [], !mt.recruitment.recruiters.some(Nt => Nt.name === Le)) {
            let Nt = () => Array(ct).fill(0);
            mt.recruitment.recruiters.push({
              name: Le,
              gm: Nt(),
              peoplePaid: Nt(),
              starts: Nt(),
              ends: Nt(),
              interviews: Nt(),
              registered: Nt(),
              submittals: Nt(),
              clientInterviews: Nt()
            })
          }
          qe(mt)
        },
        onRemoveRecruiter: Le => {
          let mt = JSON.parse(JSON.stringify(Ie));
          mt.recruitment.recruiters = (mt.recruitment.recruiters || []).filter(ct => ct.name !== Le), qe(mt)
        }
      }),
      le = async Le => {
        let mt = Le.target.files && Le.target.files[0],
          ct = nt.current;
        if (nt.current = null, !mt) {
          Le.target.value = "";
          return
        }
        H("");
        try {
          let Nt = await mt.arrayBuffer(),
            $t = W6(Nt);
          if (!$t.currentWeek) throw new Error("No weekly data found \u2014 fill in at least one week before importing");
          if (l && LA(l)) {
            let Wt = ct && l.teams[ct] ? ct : g !== "__all__" ? g : null;
            if (!Wt || !l.teams[Wt]) {
              H("Pick a team first (top-left), then Import replaces that team\u2019s data. On \u201CAll teams\u201D there\u2019s no single team to import into."), Le.target.value = "";
              return
            }
            let oe = nnt(l, Wt, $t, mt.name);
            A(oe), ne(oe), m(Wt), h(null), Le.target.value = "";
            return
          }
          if (!l) {
            let Wt = M();
            Wt && ($t.config = Wt)
          }
          if (l) {
            let Wt = $t.teamGoals.goals || {},
              oe = l.teamGoals && l.teamGoals.goals || {};
            Object.values(Wt).some(Be => Be) || ($t.teamGoals.goals = oe), !$t.config && l.config && ($t.config = l.config), !$t.brand && l.brand && ($t.brand = l.brand), !$t.commission && l.commission && ($t.commission = l.commission)
          }
          $t._importMeta = {
            file: mt.name,
            at: new Date().toISOString()
          }, A($t), ne($t), h(null), Le.target.value = ""
        } catch (Nt) {
          H("Couldn't read that file: " + Nt.message), Le.target.value = ""
        }
      }, Re = async Le => {
        let mt = Le.target.files && Le.target.files[0];
        if (mt) {
          H("");
          try {
            let ct = await mt.arrayBuffer(),
              Nt = W6(ct);
            if (!Nt.currentWeek) throw new Error("No weekly data found in that file");
            let $t = String(Nt._year || "");
            if (!$t) throw new Error("Couldn't determine the file's year");
            if (delete Nt.archive, delete Nt.config, !l) {
              M() && (Nt.config = M()), Nt._importMeta = {
                file: mt.name,
                at: new Date().toISOString()
              }, A(Nt), ne(Nt), d(null), h(null), Le.target.value = "";
              return
            }
            if ($t === String(br)) throw new Error("That year (" + $t + ") is already loaded as the current year. Use Import to replace it.");
            if (delete Nt.brand, +$t > +br) {
              let Wt = JSON.parse(JSON.stringify(l)),
                oe = String(br),
                Be = Wt.archive || {};
              delete Wt.archive;
              let ge = {
                ...Nt,
                config: l.config,
                brand: l.brand,
                _importMeta: {
                  file: mt.name,
                  at: new Date().toISOString()
                },
                archive: {
                  ...Be,
                  [oe]: Wt
                }
              };
              A(ge), ne(ge), d(null), h(null)
            } else {
              let Wt = {
                ...l,
                archive: {
                  ...Fr,
                  [$t]: Nt
                }
              };
              A(Wt), ne(Wt), d($t), h(null)
            }
          } catch (ct) {
            H("Couldn't add that year: " + ct.message)
          }
          Le.target.value = ""
        }
      }, Ye = () => {
        A(null), h(null);
        try {
          localStorage.removeItem(q6)
        } catch (Le) {}
      }, Ve = Le => (Le || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "team-" + Date.now(), lt = (0, Ht.useRef)(null), nt = (0, Ht.useRef)(null), [Ze, ht] = (0, Ht.useState)(!1), [dt, Jt] = (0, Ht.useState)(""), tt = Le => {
        !l || !LA(l) || !l.teams[Le] || (nt.current = Le, z.current && z.current.click())
      }, At = Le => {
        if (!l || LA(l)) return;
        let mt = Ve(Le || "Team 1"),
          ct = {
            name: (Le || "Team 1").trim(),
            teamGoals: l.teamGoals,
            recruitment: l.recruitment,
            sales: l.sales,
            currentWeek: l.currentWeek,
            weekEnding: l.weekEnding,
            _year: l._year,
            _importMeta: l._importMeta
          },
          Nt = {
            teams: {
              [mt]: ct
            },
            config: l.config,
            brand: l.brand,
            archive: l.archive,
            _year: l._year
          };
        A(Nt), ne(Nt), m(mt), h(null)
      }, bt = Le => {
        if (!l) return;
        let mt = (Le || "").trim();
        if (!mt) return;
        let ct = Ve(mt),
          Nt = JSON.parse(JSON.stringify(N1)),
          $t = {
            name: mt,
            teamGoals: Nt.teamGoals,
            recruitment: Nt.recruitment,
            sales: Nt.sales,
            currentWeek: 0,
            weekEnding: "",
            _year: l._year || new Date().getFullYear()
          },
          Wt = LA(l) ? {
            ...l,
            teams: {
              ...l.teams,
              [ct]: $t
            }
          } : (At("Team 1"), null);
        Wt && (A(Wt), ne(Wt), m(ct), h(null))
      }, xt = (Le, mt) => {
        if (!LA(l) || !l.teams[Le]) return;
        let ct = (mt || "").trim();
        if (!ct) return;
        let Nt = {
          ...l,
          teams: {
            ...l.teams,
            [Le]: {
              ...l.teams[Le],
              name: ct
            }
          }
        };
        A(Nt), ne(Nt)
      }, vt = Le => {
        if (!LA(l) || !l.teams[Le]) return;
        let mt = {
          ...l.teams
        };
        delete mt[Le];
        let ct, Nt = Object.keys(mt);
        if (Nt.length === 0) {
          ht(!1);
          return
        }
        if (Nt.length === 1) {
          let $t = mt[Nt[0]];
          ct = {
            ...l,
            teamGoals: $t.teamGoals,
            recruitment: $t.recruitment,
            sales: $t.sales,
            currentWeek: $t.currentWeek,
            weekEnding: $t.weekEnding
          }, delete ct.teams, m("__all__")
        } else ct = {
          ...l,
          teams: mt
        }, g === Le && m("__all__");
        A(ct), ne(ct), h(null)
      }, st = async Le => {
        let mt = Le.target.files && Le.target.files[0];
        if (!mt || !dt) {
          Le.target.value = "";
          return
        }
        H("");
        try {
          let ct = W6(await mt.arrayBuffer());
          if (!ct.currentWeek) throw new Error("No weekly data found in that file");
          let Nt = Ve(dt),
            $t = {
              name: dt.trim(),
              teamGoals: ct.teamGoals,
              recruitment: ct.recruitment,
              sales: ct.sales,
              currentWeek: ct.currentWeek,
              weekEnding: ct.weekEnding,
              _year: ct._year,
              _importMeta: {
                file: mt.name,
                at: new Date().toISOString()
              }
            },
            Wt;
          if (LA(l)) Wt = {
            ...l,
            teams: {
              ...l.teams,
              [Nt]: $t
            }
          };
          else if (l) {
            let oe = Ve(Ld(l) || "Team 1"),
              Be = {
                name: "Team 1",
                teamGoals: l.teamGoals,
                recruitment: l.recruitment,
                sales: l.sales,
                currentWeek: l.currentWeek,
                weekEnding: l.weekEnding,
                _year: l._year
              };
            Wt = {
              teams: {
                [oe === Nt ? oe + "-1" : oe]: Be,
                [Nt]: $t
              },
              config: l.config,
              brand: l.brand,
              archive: l.archive,
              _year: l._year
            }
          } else Wt = {
            teams: {
              [Nt]: $t
            },
            _year: ct._year,
            config: {
              template: "custom",
              tabs: {},
              widgets: {},
              theme: {},
              brand: {}
            }
          };
          A(Wt), ne(Wt), m(Nt), h(null), Jt("")
        } catch (ct) {
          H("Couldn't import that team: " + ct.message)
        }
        Le.target.value = ""
      }, or = Zrt(l), Lt = LA(l), kr = l ? Lt ? int(l, g) : l : null, br = kr && kr._year || new Date().getFullYear(), Fr = kr && kr.archive || {}, Ci = Object.keys(Fr).sort((Le, mt) => mt.localeCompare(Le)), hr = !!(p && p !== String(br) && Fr[p]), en = l ? hr ? {
        ...Fr[p],
        config: l.config,
        brand: l.brand
      } : (() => {
        let Le = Fr[String(br - 1)];
        if (!Le || !Le.teamGoals) return kr;
        let mt = 0,
          ct = (Le.teamGoals.totalGM || []).map(Nt => mt += +Nt || 0);
        return {
          ...kr,
          teamGoals: {
            ...kr.teamGoals,
            cum2025: (kr.teamGoals.totalGM || []).map((Nt, $t) => +(ct[$t] != null ? ct[$t] : ct[ct.length - 1] || 0).toFixed(2))
          }
        }
      })() : null, Ur = ynt(en || N1);
    if (!l) return n ? (0, U.jsxs)("div", {
      className: "welcome onboard",
      children: [(0, U.jsxs)("div", {
        className: "w-eyebrow",
        children: ["WELCOME", E.name ? " \xB7 " + E.name.toUpperCase() : ""]
      }), (0, U.jsxs)("div", {
        className: "ob-steps",
        children: [(0, U.jsx)("span", {
          className: "ob-dot" + (B === 1 ? " on" : " done"),
          children: "1"
        }), (0, U.jsx)("span", {
          className: "ob-line"
        }), (0, U.jsx)("span", {
          className: "ob-dot" + (B === 2 ? " on" : ""),
          children: "2"
        })]
      }), B === 1 && (0, U.jsxs)(U.Fragment, {
        children: [(0, U.jsx)("h1", {
          children: "Make it yours."
        }), (0, U.jsx)("p", {
          children: "Confirm your company name and add your logo \u2014 we'll build your color theme from it automatically. You can change all of this later in Settings."
        }), (0, U.jsxs)("div", {
          className: "ob-card",
          children: [(0, U.jsxs)("div", {
            className: "cm-field",
            children: [(0, U.jsx)("label", {
              children: "Company name"
            }), (0, U.jsx)("input", {
              className: "inp",
              placeholder: "Acme Staffing",
              value: E.name,
              onChange: Le => F(mt => ({
                ...mt,
                name: Le.target.value
              }))
            })]
          }), (0, U.jsxs)("div", {
            className: "cm-field",
            children: [(0, U.jsxs)("label", {
              children: ["Logo ", (0, U.jsx)("span", {
                className: "cm-hint",
                children: "(optional \u2014 generates your theme colors)"
              })]
            }), (0, U.jsxs)("div", {
              className: "ob-logo-row",
              children: [E.logo ? (0, U.jsx)("img", {
                className: "ob-logo-preview",
                src: E.logo,
                alt: "logo"
              }) : (0, U.jsx)("span", {
                className: "brand-mark ob-mark",
                children: (E.name || "?").replace(/^The /i, "").split(/\s+/).map(Le => Le[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?"
              }), (0, U.jsx)("button", {
                className: "btn ghost sm",
                onClick: () => N.current.click(),
                children: E.logo ? "Replace logo" : "Upload logo"
              }), (0, U.jsx)("input", {
                ref: N,
                type: "file",
                accept: "image/*",
                hidden: !0,
                onChange: Le => {
                  let mt = Le.target.files && Le.target.files[0];
                  mt && (Nhe(mt, ct => F(Nt => ({
                    ...Nt,
                    ...ct
                  }))), Le.target.value = "")
                }
              })]
            }), E.logoColors && E.logoColors.length > 0 && (0, U.jsxs)("div", {
              className: "ob-palette",
              children: [(0, U.jsx)("span", {
                className: "cm-hint",
                children: "Your theme:"
              }), E.logoColors.map(Le => (0, U.jsx)("span", {
                className: "swatch",
                style: {
                  background: Le,
                  cursor: "default"
                }
              }, Le))]
            })]
          })]
        }), (0, U.jsxs)("div", {
          className: "w-actions",
          children: [(0, U.jsx)("button", {
            className: "btn primary",
            onClick: () => T(2),
            children: "Continue"
          }), (0, U.jsx)("button", {
            className: "btn ghost",
            onClick: () => {
              F({
                name: "",
                logo: null,
                logoColors: null,
                primary: null,
                secondary: null
              }), T(2)
            },
            children: "Skip for now"
          })]
        })]
      }), B === 2 && (0, U.jsxs)(U.Fragment, {
        children: [(0, U.jsx)("h1", {
          children: "Bring in your numbers."
        }), (0, U.jsx)("p", {
          children: "Import your existing Weekly Stats workbook \u2014 we read it as-is \u2014 or set up your team from scratch and enter weeks manually."
        }), (0, U.jsxs)("div", {
          className: "ob-choices",
          children: [(0, U.jsxs)("button", {
            className: "ob-choice",
            onClick: () => z.current.click(),
            children: [(0, U.jsx)("div", {
              className: "ob-choice-icon",
              children: "\u2B06"
            }), (0, U.jsx)("div", {
              className: "ob-choice-t",
              children: "Import spreadsheet"
            }), (0, U.jsx)("div", {
              className: "ob-choice-d",
              children: "Your raw Weekly Stats workbook or a Performance Book export. Recruiters, reps, goals, and every week come in automatically."
            })]
          }), (0, U.jsxs)("button", {
            className: "ob-choice",
            onClick: () => R(!0),
            children: [(0, U.jsx)("div", {
              className: "ob-choice-icon",
              children: "\u270E"
            }), (0, U.jsx)("div", {
              className: "ob-choice-t",
              children: "Set up manually"
            }), (0, U.jsx)("div", {
              className: "ob-choice-d",
              children: "Enter your recruiters, salespeople, and goals, then add numbers week by week."
            })]
          })]
        }), (0, U.jsx)("div", {
          className: "w-actions",
          children: (0, U.jsx)("button", {
            className: "btn ghost sm",
            onClick: () => T(1),
            children: "\u2190 Back to branding"
          })
        })]
      }), n && (0, U.jsx)("input", {
        ref: z,
        type: "file",
        accept: ".xlsx,.xlsm,.csv",
        hidden: !0,
        onChange: le
      }), j && (0, U.jsx)("div", {
        className: "err",
        children: j
      }), V && (0, U.jsx)(Int, {
        onCancel: () => R(!1),
        onCreate: Z
      })]
    }) : (0, U.jsxs)("div", {
      className: "welcome",
      children: [(0, U.jsx)("div", {
        className: "w-eyebrow",
        children: "WEEKLY PERFORMANCE BOOK"
      }), (0, U.jsx)("h1", {
        children: "Nothing here yet."
      }), (0, U.jsx)("p", {
        children: "Ask your company admin to set up the dashboard."
      })]
    });
    if (!Lt && !l.currentWeek) {
      let Le = (l.recruitment && l.recruitment.recruiters || []).map(ct => ct.name),
        mt = Object.keys(l.sales && l.sales.repTotals || {});
      return (0, U.jsxs)("div", {
        className: "welcome",
        children: [(0, U.jsx)("div", {
          className: "w-eyebrow",
          children: "WEEKLY PERFORMANCE BOOK"
        }), (0, U.jsx)("h1", {
          children: "Your team is set up."
        }), (0, U.jsx)("p", {
          children: "Download the Excel template \u2014 it's pre-built with your team. Fill in your weekly numbers, import it back, and your dashboard comes to life. Prefer typing? You can also add weeks manually."
        }), (0, U.jsxs)("div", {
          className: "setup-roster",
          children: [(0, U.jsxs)("div", {
            children: [(0, U.jsx)("b", {
              children: "Recruiters:"
            }), " ", Le.length ? Le.join(", ") : "none yet"]
          }), (0, U.jsxs)("div", {
            children: [(0, U.jsx)("b", {
              children: "Salespeople:"
            }), " ", mt.length ? mt.join(", ") : "none yet"]
          })]
        }), (0, U.jsx)("div", {
          className: "w-actions",
          children: n ? (0, U.jsxs)(U.Fragment, {
            children: [(0, U.jsx)("button", {
              className: "btn primary",
              onClick: () => lnt(l),
              title: "Excel template pre-built with your team \u2014 fill weeks in, then import it back",
              children: "\u2B07 Download data template"
            }), (0, U.jsx)("button", {
              className: "btn primary",
              onClick: () => z.current.click(),
              children: "\u2B06 Import spreadsheet"
            }), (0, U.jsx)("button", {
              className: "btn ghost",
              onClick: () => C(!0),
              children: "+ Add a week manually"
            })]
          }) : (0, U.jsx)("div", {
            className: "empty-note",
            children: "No data yet. Ask your company admin to add this week's numbers."
          })
        }), n && (0, U.jsx)("input", {
          ref: z,
          type: "file",
          accept: ".xlsx,.xlsm,.csv",
          hidden: !0,
          onChange: le
        }), j && (0, U.jsx)("div", {
          className: "err",
          children: j
        }), we()]
      })
    }
    let ln = en.currentWeek,
      Hr = f === "ytd",
      Sr = Hr ? ln : Math.min(f || ln, ln),
      lr = (en.teamGoals.weekDates || [])[Sr - 1] || en.weekEnding || "",
      Rr = Lt && g === "__all__",
      Fn = n && !hr && !Rr && (!s || g === a),
      _n = Lt ? ent(l) : [],
      Ei = Le => {
        m(Le), h(null)
      },
      qi = Le => h(Math.max(1, Math.min(ln, Le)));
    return (0, U.jsxs)("div", {
      className: "app",
      children: [(0, U.jsxs)("header", {
        className: "topbar",
        children: [(0, U.jsxs)("div", {
          className: "brand",
          children: [(() => {
            let Le = Ld({
                ...l,
                config: ee || l.config
              }),
              mt = re.brand && re.brand.logo || zrt;
            if (mt) return (0, U.jsx)("img", {
              className: "brand-logo",
              src: mt,
              alt: Le
            });
            let ct = Le.replace(/^The /i, "").split(/\s+/).map(Nt => Nt[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
            return (0, U.jsx)("span", {
              className: "brand-mark",
              children: ct || "W"
            })
          })(), (0, U.jsxs)("div", {
            children: [(0, U.jsx)("div", {
              className: "brand-title",
              children: Ld({
                ...l,
                config: ee || l.config
              })
            }), (0, U.jsxs)("div", {
              className: "brand-sub",
              children: ["Viewing ", Hr ? "YTD \xB7 Weeks 1\u2013" + ln : "Week " + Sr + " of " + ln + (lr ? " \xB7 ending " + lr : ""), l._importMeta ? (0, U.jsx)("span", {
                className: "fresh-badge",
                title: "Imported " + l._importMeta.file,
                children: "\u21E9 " + (l._importMeta.file.length > 28 ? l._importMeta.file.slice(0, 26) + "\u2026" : l._importMeta.file) + " \xB7 " + new Date(l._importMeta.at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })
              }) : null, hr ? " \xB7 " + p + " archive (read-only)" : "", Lt && g === "__all__" ? (0, U.jsx)("span", {
                className: "rollup-banner",
                children: "\u25C9 All teams \xB7 company roll-up (read-only)"
              }) : null, Lt && g !== "__all__" ? (0, U.jsx)("span", {
                className: "rollup-banner",
                children: "\u25C9 " + (l.teams[g] && l.teams[g].name || g)
              }) : null, xe && (0, U.jsx)("span", {
                className: "saved-flash",
                children: "\u2713 Saved"
              })]
            })]
          })]
        }), (0, U.jsxs)("div", {
          className: "top-actions",
          children: [Lt && (0, U.jsxs)("div", {
            className: "seg teamseg",
            title: "Choose team",
            children: [(0, U.jsx)("button", {
              className: "seg-btn" + (g === "__all__" ? " on" : ""),
              onClick: () => {
                m("__all__"), h(null)
              },
              children: "All teams"
            }), or.map(Le => (0, U.jsx)("button", {
              className: "seg-btn" + (g === Le.id ? " on" : "") + (s && Le.id === a ? " yours" : ""),
              onClick: () => {
                m(Le.id), h(null)
              },
              children: Le.name
            }, Le.id)), o && (0, U.jsx)("button", {
              className: "seg-btn teamadd",
              title: "Manage teams",
              onClick: () => ht(!0),
              children: "\u2699"
            })]
          }), !Lt && o && l && l.currentWeek > 0 && (0, U.jsx)("button", {
            className: "btn ghost sm",
            title: "Split this company into multiple teams / locations",
            onClick: () => ht(!0),
            children: "+ Teams"
          }), (Ci.length > 0 || o) && (0, U.jsxs)("div", {
            className: "seg yearseg",
            title: "Choose year",
            children: [(0, U.jsx)("button", {
              className: "seg-btn" + (hr ? "" : " on"),
              onClick: () => {
                d(null), h(null)
              },
              children: String(br)
            }), Ci.map(Le => (0, U.jsx)("button", {
              className: "seg-btn" + (hr && p === Le ? " on" : ""),
              onClick: () => {
                d(Le), h(null)
              },
              children: Le
            }, Le)), o && (0, U.jsx)("button", {
              className: "seg-btn yearadd",
              title: "Import a previous year's workbook",
              onClick: () => v.current.click(),
              children: "+"
            })]
          }), (0, U.jsxs)("div", {
            className: "weeksel",
            title: "Choose which week to view",
            children: [(0, U.jsx)("button", {
              className: "wk-btn",
              onClick: () => qi(Sr - 1),
              disabled: Hr || Sr <= 1,
              "aria-label": "Previous week",
              children: "\u2039"
            }), (0, U.jsxs)("select", {
              className: "wk-select",
              value: Hr ? "ytd" : String(Sr),
              onChange: Le => Le.target.value === "ytd" ? h("ytd") : qi(+Le.target.value),
              children: [(0, U.jsx)("option", {
                value: "ytd",
                children: "YTD \xB7 full year"
              }), Array.from({
                length: ln
              }, (Le, mt) => mt + 1).map(Le => {
                let mt = (en.teamGoals.weekDates || [])[Le - 1];
                return (0, U.jsxs)("option", {
                  value: Le,
                  children: ["Week ", Le, mt ? " \xB7 " + mt : ""]
                }, Le)
              })]
            }), (0, U.jsx)("button", {
              className: "wk-btn",
              onClick: () => qi(Sr + 1),
              disabled: Hr || Sr >= ln,
              "aria-label": "Next week",
              children: "\u203A"
            })]
          }), (0, U.jsx)("button", {
            className: "btn primary sm",
            onClick: () => C(!0),
            style: Fn ? void 0 : {
              display: "none"
            },
            children: "+ Add Data"
          }), (0, U.jsx)("button", {
            className: "btn ghost sm",
            onClick: () => vhe(en),
            children: "Export"
          }), (0, U.jsx)("button", {
            className: "btn ghost sm no-print",
            onClick: () => Tnt(en, Sr, Hr),
            title: "Download a formatted PDF of this view",
            children: "\u2B07 PDF"
          }), o && (0, U.jsx)("button", {
            className: "btn ghost sm",
            onClick: () => z.current.click(),
            disabled: hr,
            title: hr ? "Switch back to the current year to import" : Lt ? g === "__all__" ? "Pick a team first \u2014 Import replaces that team's data" : "Replaces " + (l.teams[g] && l.teams[g].name || "this team") + "'s data" : "Import a workbook (replaces the current data)",
            children: "Import"
          }), o && (0, U.jsx)("button", {
            className: "btn ghost sm no-print",
            onClick: () => I(!0),
            children: "\u2699 Settings"
          }), o && (0, U.jsx)("input", {
            ref: z,
            type: "file",
            accept: ".xlsx,.xlsm,.csv",
            hidden: !0,
            onChange: le
          }), o && (0, U.jsx)("input", {
            ref: v,
            type: "file",
            accept: ".xlsx,.xlsm,.csv",
            hidden: !0,
            onChange: Re
          }), o && (0, U.jsx)("input", {
            ref: lt,
            type: "file",
            accept: ".xlsx,.xlsm,.csv",
            hidden: !0,
            onChange: st
          })]
        })]
      }), (0, U.jsxs)("nav", {
        className: "tabs",
        children: [V6.filter(Le => P1(re, Le)).map(Le => (0, U.jsx)("button", {
          className: "tab" + (Le === u ? " active" : ""),
          onClick: () => c(Le),
          children: Le
        }, Le)), Lt && (0, U.jsx)("button", {
          className: "tab" + (u === "Teams" ? " active" : ""),
          onClick: () => c("Teams"),
          children: "Teams"
        }), (0, U.jsx)("button", {
          className: "tab-pin",
          title: "Make \u201C" + u + "\u201D your default landing tab",
          onClick: () => {
            try {
              localStorage.setItem("wpb_default_tab", u), H("")
            } catch (Le) {}
          },
          children: "\u2605 Set default"
        })]
      }), j && (0, U.jsx)("div", {
        className: "err",
        children: j
      }), (0, U.jsxs)("main", {
        children: ["        ", u === "Overview" && P1(re, "Overview") && (0, U.jsx)(Bnt, {
          d: en,
          s: Ur,
          wk: Sr,
          ytd: Hr,
          onNav: c,
          cfg: re,
          teamBoard: Rr ? _n : null,
          onPickTeam: Ei,
          youTeam: a || null
        }), u === "Teams" && Lt && (0, U.jsx)("div", {
          className: "teams-view",
          children: (0, U.jsxs)("div", {
            className: "card tlb-card",
            children: [(0, U.jsxs)("div", {
              className: "card-title",
              children: ["Team leaderboard ", (0, U.jsx)("span", {
                className: "card-hint",
                children: "ranked by GM$ \xB7 pace = actual vs goal-to-date \xB7 projection at current run-rate"
              })]
            }), (0, U.jsx)(Ehe, {
              rows: _n,
              currentTeam: g === "__all__" ? null : g,
              youTeam: a || null,
              onPick: Ei
            }), (0, U.jsxs)("div", {
              className: "tlb-legend",
              children: [(0, U.jsxs)("span", {
                children: [(0, U.jsx)("span", {
                  className: "tlb-pill ahead",
                  children: "Ahead"
                }), " at or above goal pace"]
              }), (0, U.jsxs)("span", {
                children: [(0, U.jsx)("span", {
                  className: "tlb-pill ontrack",
                  children: "On track"
                }), " within 10% of pace"]
              }), (0, U.jsxs)("span", {
                children: [(0, U.jsx)("span", {
                  className: "tlb-pill behind",
                  children: "Behind"
                }), " more than 10% behind"]
              })]
            })]
          })
        }), u === "Team Goals" && P1(re, "Team Goals") && (0, U.jsx)(_nt, {
          d: en,
          s: Ur,
          wk: Sr,
          ytd: Hr,
          cfg: re
        }), u === "Recruitment (Current Team)" && P1(re, "Recruitment (Current Team)") && (0, U.jsx)(Cnt, {
          d: en,
          s: Ur,
          wk: Sr,
          ytd: Hr,
          cfg: re
        }), u === "Sales" && P1(re, "Sales") && (0, U.jsx)(Ent, {
          d: en,
          s: Ur,
          wk: Sr,
          ytd: Hr,
          cfg: re,
          onUpdateGM: Fn ? Le => {
            let mt = JSON.parse(JSON.stringify(Ie));
            for (let [ct, Nt] of Object.entries(Le)) mt.sales.repTotals[ct] && (mt.sales.repTotals[ct].gm = +Nt || 0);
            qe(mt)
          } : null
        })]
      }), we(), Ze && o && (0, U.jsx)(Unt, {
        data: l,
        teams: or,
        multiTeam: Lt,
        onClose: () => {
          ht(!1), Jt("")
        },
        onSplit: At,
        onAdd: bt,
        onRename: xt,
        onRemove: vt,
        onImport: Le => {
          Jt(Le), lt.current.click()
        },
        onImportInto: Le => {
          ht(!1), tt(Le)
        }
      }), L && (0, U.jsx)(Fnt, {
        data: l,
        cfg: Fb(l),
        dark: J,
        setDark: O,
        onPreview: Le => K(Le),
        onSave: Le => {
          let mt = {
            ...l,
            config: Le,
            brand: Le.brand || l.brand
          };
          A(mt), ne(mt), K(null), I(!1)
        },
        onClose: () => {
          K(null), I(!1)
        },
        onDeleteWeek: () => {
          qe(snt(Ie)), h(null)
        },
        onReset: () => {
          Ye(), I(!1)
        },
        weekCount: ln
      })]
    })
  }

  function qp(e, t) {
    var r = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]);
    return r
  }

  function Phe(e, t, r, n) {
    function i(a) {
      return a instanceof r ? a : new r(function(s) {
        s(a)
      })
    }
    return new(r || (r = Promise))(function(a, s) {
      function o(u) {
        try {
          A(n.next(u))
        } catch (c) {
          s(c)
        }
      }

      function l(u) {
        try {
          A(n.throw(u))
        } catch (c) {
          s(c)
        }
      }

      function A(u) {
        u.done ? a(u.value) : i(u.value).then(o, l)
      }
      A((n = n.apply(e, t || [])).next())
    })
  }
  var Ihe = e => e ? (...t) => e(...t) : (...t) => fetch(...t);
  var R1 = class extends Error {
      constructor(t, r = "FunctionsError", n) {
        super(t), this.name = r, this.context = n
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          context: this.context
        }
      }
    },
    Nb = class extends R1 {
      constructor(t) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", t)
      }
    },
    D1 = class extends R1 {
      constructor(t) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", t)
      }
    },
    M1 = class extends R1 {
      constructor(t) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", t)
      }
    },
    Pb;
  (function(e) {
    e.Any = "any", e.ApNortheast1 = "ap-northeast-1", e.ApNortheast2 = "ap-northeast-2", e.ApSouth1 = "ap-south-1", e.ApSoutheast1 = "ap-southeast-1", e.ApSoutheast2 = "ap-southeast-2", e.CaCentral1 = "ca-central-1", e.EuCentral1 = "eu-central-1", e.EuWest1 = "eu-west-1", e.EuWest2 = "eu-west-2", e.EuWest3 = "eu-west-3", e.SaEast1 = "sa-east-1", e.UsEast1 = "us-east-1", e.UsWest1 = "us-west-1", e.UsWest2 = "us-west-2"
  })(Pb || (Pb = {}));
  var Ib = class {
    constructor(t, {
      headers: r = {},
      customFetch: n,
      region: i = Pb.Any
    } = {}) {
      this.url = t, this.headers = r, this.region = i, this.fetch = Ihe(n)
    }
    setAuth(t) {
      this.headers.Authorization = `Bearer ${t}`
    }
    invoke(t) {
      return Phe(this, arguments, void 0, function*(r, n = {}) {
        var i;
        let a, s;
        try {
          let {
            headers: o,
            method: l,
            body: A,
            signal: u,
            timeout: c
          } = n, f = {}, {
            region: h
          } = n;
          h || (h = this.region);
          let p = new URL(`${this.url}/${r}`);
          h && h !== "any" && (f["x-region"] = h, p.searchParams.set("forceFunctionRegion", h));
          let d;
          A && (o && !Object.prototype.hasOwnProperty.call(o, "Content-Type") || !o) ? typeof Blob != "undefined" && A instanceof Blob || A instanceof ArrayBuffer ? (f["Content-Type"] = "application/octet-stream", d = A) : typeof A == "string" ? (f["Content-Type"] = "text/plain", d = A) : typeof FormData != "undefined" && A instanceof FormData ? d = A : (f["Content-Type"] = "application/json", d = JSON.stringify(A)) : A && typeof A != "string" && !(typeof Blob != "undefined" && A instanceof Blob) && !(A instanceof ArrayBuffer) && !(typeof FormData != "undefined" && A instanceof FormData) ? d = JSON.stringify(A) : d = A;
          let g = u;
          c && (s = new AbortController, a = setTimeout(() => s.abort(), c), u ? (g = s.signal, u.addEventListener("abort", () => s.abort())) : g = s.signal);
          let m = yield this.fetch(p.toString(), {
            method: l || "POST",
            headers: Object.assign(Object.assign(Object.assign({}, f), this.headers), o),
            body: d,
            signal: g
          }).catch(B => {
            throw new Nb(B)
          }), v = m.headers.get("x-relay-error");
          if (v && v === "true") throw new D1(m);
          if (!m.ok) throw new M1(m);
          let y = ((i = m.headers.get("Content-Type")) !== null && i !== void 0 ? i : "text/plain").split(";")[0].trim(),
            C;
          return y === "application/json" ? C = yield m.json(): y === "application/octet-stream" || y === "application/pdf" ? C = yield m.blob(): y === "text/event-stream" ? C = m : y === "multipart/form-data" ? C = yield m.formData(): C = yield m.text(), {
            data: C,
            error: null,
            response: m
          }
        } catch (o) {
          return {
            data: null,
            error: o,
            response: o instanceof M1 || o instanceof D1 ? o.context : void 0
          }
        } finally {
          a && clearTimeout(a)
        }
      })
    }
  };
  var Lhe = e => Math.min(1e3 * 2 ** e, 3e4),
    Rnt = [520, 503],
    Mhe = ["GET", "HEAD", "OPTIONS"],
    $6 = class extends Error {
      constructor(e) {
        super(e.message), this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          details: this.details,
          hint: this.hint,
          code: this.code
        }
      }
    };

  function Uhe(e, t) {
    return new Promise(r => {
      if (t != null && t.aborted) {
        r();
        return
      }
      let n = setTimeout(() => {
        t == null || t.removeEventListener("abort", i), r()
      }, e);

      function i() {
        clearTimeout(n), r()
      }
      t == null || t.addEventListener("abort", i)
    })
  }

  function Dnt(e, t, r, n) {
    return !(!n || r >= 3 || !Mhe.includes(e) || !Rnt.includes(t))
  }
  var Mnt = class {
      constructor(e) {
        var t, r, n, i, a;
        this.shouldThrowOnError = !1, this.retryEnabled = !0, this.method = e.method, this.url = e.url, this.headers = new Headers(e.headers), this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = (t = e.shouldThrowOnError) !== null && t !== void 0 ? t : !1, this.signal = e.signal, this.isMaybeSingle = (r = e.isMaybeSingle) !== null && r !== void 0 ? r : !1, this.shouldStripNulls = (n = e.shouldStripNulls) !== null && n !== void 0 ? n : !1, this.urlLengthLimit = (i = e.urlLengthLimit) !== null && i !== void 0 ? i : 8e3, this.retryEnabled = (a = e.retry) !== null && a !== void 0 ? a : !0, e.fetch ? this.fetch = e.fetch : this.fetch = fetch
      }
      throwOnError() {
        return this.shouldThrowOnError = !0, this
      }
      stripNulls() {
        if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
        return this.shouldStripNulls = !0, this
      }
      setHeader(e, t) {
        return this.headers = new Headers(this.headers), this.headers.set(e, t), this
      }
      retry(e) {
        return this.retryEnabled = e, this
      }
      then(e, t) {
        var r = this;
        if (this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
          let s = this.headers.get("Accept");
          s === "application/vnd.pgrst.object+json" ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : (!s || s === "application/json") && this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped")
        }
        let n = this.fetch,
          a = (async () => {
            let s = 0;
            for (;;) {
              let A = new Headers(r.headers);
              s > 0 && A.set("X-Retry-Count", String(s));
              let u;
              try {
                u = await n(r.url.toString(), {
                  method: r.method,
                  headers: A,
                  body: JSON.stringify(r.body, (c, f) => typeof f == "bigint" ? f.toString() : f),
                  signal: r.signal
                })
              } catch (c) {
                if ((c == null ? void 0 : c.name) === "AbortError" || (c == null ? void 0 : c.code) === "ABORT_ERR" || !Mhe.includes(r.method)) throw c;
                if (r.retryEnabled && s < 3) {
                  let f = Lhe(s);
                  s++, await Uhe(f, r.signal);
                  continue
                }
                throw c
              }
              if (Dnt(r.method, u.status, s, r.retryEnabled)) {
                var o, l;
                let c = (o = (l = u.headers) === null || l === void 0 ? void 0 : l.get("Retry-After")) !== null && o !== void 0 ? o : null,
                  f = c !== null ? Math.max(0, parseInt(c, 10) || 0) * 1e3 : Lhe(s);
                await u.text(), s++, await Uhe(f, r.signal);
                continue
              }
              return await r.processResponse(u)
            }
          })();
        return this.shouldThrowOnError || (a = a.catch(s => {
          var o;
          let l = "",
            A = "",
            u = "",
            c = s == null ? void 0 : s.cause;
          if (c) {
            var f, h, p, d;
            let v = (f = c == null ? void 0 : c.message) !== null && f !== void 0 ? f : "",
              y = (h = c == null ? void 0 : c.code) !== null && h !== void 0 ? h : "";
            l = `${(p=s==null?void 0:s.name)!==null&&p!==void 0?p:"FetchError"}: ${s==null?void 0:s.message}`, l += `

Caused by: ${(d=c==null?void 0:c.name)!==null&&d!==void 0?d:"Error"}: ${v}`, y && (l += ` (${y})`), c != null && c.stack && (l += `
${c.stack}`)
          } else {
            var g;
            l = (g = s == null ? void 0 : s.stack) !== null && g !== void 0 ? g : ""
          }
          let m = this.url.toString().length;
          return (s == null ? void 0 : s.name) === "AbortError" || (s == null ? void 0 : s.code) === "ABORT_ERR" ? (u = "", A = "Request was aborted (timeout or manual cancellation)", m > this.urlLengthLimit && (A += `. Note: Your request URL is ${m} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : ((c == null ? void 0 : c.name) === "HeadersOverflowError" || (c == null ? void 0 : c.code) === "UND_ERR_HEADERS_OVERFLOW") && (u = "", A = "HTTP headers exceeded server limits (typically 16KB)", m > this.urlLengthLimit && (A += `. Your request URL is ${m} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), {
            success: !1,
            error: {
              message: `${(o=s==null?void 0:s.name)!==null&&o!==void 0?o:"FetchError"}: ${s==null?void 0:s.message}`,
              details: l,
              hint: A,
              code: u
            },
            data: null,
            count: null,
            status: 0,
            statusText: ""
          }
        })), a.then(e, t)
      }
      async processResponse(e) {
        var t = this;
        let r = null,
          n = null,
          i = null,
          a = e.status,
          s = e.statusText;
        if (e.ok) {
          var o, l;
          if (t.method !== "HEAD") {
            var A;
            let f = await e.text();
            if (f !== "")
              if (t.headers.get("Accept") === "text/csv") n = f;
              else if (t.headers.get("Accept") && (!((A = t.headers.get("Accept")) === null || A === void 0) && A.includes("application/vnd.pgrst.plan+text"))) n = f;
            else try {
              n = JSON.parse(f)
            } catch (h) {
              if (r = {
                  message: f
                }, n = null, t.shouldThrowOnError) throw new $6({
                message: f,
                details: "",
                hint: "",
                code: ""
              })
            }
          }
          let u = (o = t.headers.get("Prefer")) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/),
            c = (l = e.headers.get("content-range")) === null || l === void 0 ? void 0 : l.split("/");
          u && c && c.length > 1 && (i = parseInt(c[1])), t.isMaybeSingle && Array.isArray(n) && (n.length > 1 ? (r = {
            code: "PGRST116",
            details: `Results contain ${n.length} rows, application/vnd.pgrst.object+json requires 1 row`,
            hint: null,
            message: "JSON object requested, multiple (or no) rows returned"
          }, n = null, i = null, a = 406, s = "Not Acceptable") : n.length === 1 ? n = n[0] : n = null)
        } else {
          let u = await e.text();
          try {
            r = JSON.parse(u), Array.isArray(r) && e.status === 404 && (n = [], r = null, a = 200, s = "OK")
          } catch (c) {
            e.status === 404 && u === "" ? (a = 204, s = "No Content") : r = {
              message: u
            }
          }
          if (r && t.shouldThrowOnError) throw new $6(r)
        }
        return {
          success: r === null,
          error: r,
          data: n,
          count: i,
          status: a,
          statusText: s
        }
      }
      returns() {
        return this
      }
      overrideTypes() {
        return this
      }
    },
    Qnt = class extends Mnt {
      select(e) {
        let t = !1,
          r = (e != null ? e : "*").split("").map(n => /\s/.test(n) && !t ? "" : (n === '"' && (t = !t), n)).join("");
        return this.url.searchParams.set("select", r), this.headers.append("Prefer", "return=representation"), this
      }
      order(e, {
        ascending: t = !0,
        nullsFirst: r,
        foreignTable: n,
        referencedTable: i = n
      } = {}) {
        let a = i ? `${i}.order` : "order",
          s = this.url.searchParams.get(a);
        return this.url.searchParams.set(a, `${s?`${s},`:""}${e}.${t?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`), this
      }
      limit(e, {
        foreignTable: t,
        referencedTable: r = t
      } = {}) {
        let n = typeof r == "undefined" ? "limit" : `${r}.limit`;
        return this.url.searchParams.set(n, `${e}`), this
      }
      range(e, t, {
        foreignTable: r,
        referencedTable: n = r
      } = {}) {
        let i = typeof n == "undefined" ? "offset" : `${n}.offset`,
          a = typeof n == "undefined" ? "limit" : `${n}.limit`;
        return this.url.searchParams.set(i, `${e}`), this.url.searchParams.set(a, `${t-e+1}`), this
      }
      abortSignal(e) {
        return this.signal = e, this
      }
      single() {
        return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this
      }
      maybeSingle() {
        return this.isMaybeSingle = !0, this
      }
      csv() {
        return this.headers.set("Accept", "text/csv"), this
      }
      geojson() {
        return this.headers.set("Accept", "application/geo+json"), this
      }
      explain({
        analyze: e = !1,
        verbose: t = !1,
        settings: r = !1,
        buffers: n = !1,
        wal: i = !1,
        format: a = "text"
      } = {}) {
        var s;
        let o = [e ? "analyze" : null, t ? "verbose" : null, r ? "settings" : null, n ? "buffers" : null, i ? "wal" : null].filter(Boolean).join("|"),
          l = (s = this.headers.get("Accept")) !== null && s !== void 0 ? s : "application/json";
        return this.headers.set("Accept", `application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`), a === "json" ? this : this
      }
      rollback() {
        return this.headers.append("Prefer", "tx=rollback"), this
      }
      returns() {
        return this
      }
      maxAffected(e) {
        return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e}`), this
      }
    },
    Rhe = new RegExp("[,()]"),
    Q1 = class extends Qnt {
      eq(e, t) {
        return this.url.searchParams.append(e, `eq.${t}`), this
      }
      neq(e, t) {
        return this.url.searchParams.append(e, `neq.${t}`), this
      }
      gt(e, t) {
        return this.url.searchParams.append(e, `gt.${t}`), this
      }
      gte(e, t) {
        return this.url.searchParams.append(e, `gte.${t}`), this
      }
      lt(e, t) {
        return this.url.searchParams.append(e, `lt.${t}`), this
      }
      lte(e, t) {
        return this.url.searchParams.append(e, `lte.${t}`), this
      }
      like(e, t) {
        return this.url.searchParams.append(e, `like.${t}`), this
      }
      likeAllOf(e, t) {
        return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this
      }
      likeAnyOf(e, t) {
        return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this
      }
      ilike(e, t) {
        return this.url.searchParams.append(e, `ilike.${t}`), this
      }
      ilikeAllOf(e, t) {
        return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this
      }
      ilikeAnyOf(e, t) {
        return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this
      }
      regexMatch(e, t) {
        return this.url.searchParams.append(e, `match.${t}`), this
      }
      regexIMatch(e, t) {
        return this.url.searchParams.append(e, `imatch.${t}`), this
      }
      is(e, t) {
        return this.url.searchParams.append(e, `is.${t}`), this
      }
      isDistinct(e, t) {
        return this.url.searchParams.append(e, `isdistinct.${t}`), this
      }
      in(e, t) {
        let r = Array.from(new Set(t)).map(n => typeof n == "string" && Rhe.test(n) ? `"${n}"` : `${n}`).join(",");
        return this.url.searchParams.append(e, `in.(${r})`), this
      }
      notIn(e, t) {
        let r = Array.from(new Set(t)).map(n => typeof n == "string" && Rhe.test(n) ? `"${n}"` : `${n}`).join(",");
        return this.url.searchParams.append(e, `not.in.(${r})`), this
      }
      contains(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this
      }
      containedBy(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this
      }
      rangeGt(e, t) {
        return this.url.searchParams.append(e, `sr.${t}`), this
      }
      rangeGte(e, t) {
        return this.url.searchParams.append(e, `nxl.${t}`), this
      }
      rangeLt(e, t) {
        return this.url.searchParams.append(e, `sl.${t}`), this
      }
      rangeLte(e, t) {
        return this.url.searchParams.append(e, `nxr.${t}`), this
      }
      rangeAdjacent(e, t) {
        return this.url.searchParams.append(e, `adj.${t}`), this
      }
      overlaps(e, t) {
        return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this
      }
      textSearch(e, t, {
        config: r,
        type: n
      } = {}) {
        let i = "";
        n === "plain" ? i = "pl" : n === "phrase" ? i = "ph" : n === "websearch" && (i = "w");
        let a = r === void 0 ? "" : `(${r})`;
        return this.url.searchParams.append(e, `${i}fts${a}.${t}`), this
      }
      match(e) {
        return Object.entries(e).filter(([t, r]) => r !== void 0).forEach(([t, r]) => {
          this.url.searchParams.append(t, `eq.${r}`)
        }), this
      }
      not(e, t, r) {
        return this.url.searchParams.append(e, `not.${t}.${r}`), this
      }
      or(e, {
        foreignTable: t,
        referencedTable: r = t
      } = {}) {
        let n = r ? `${r}.or` : "or";
        return this.url.searchParams.append(n, `(${e})`), this
      }
      filter(e, t, r) {
        return this.url.searchParams.append(e, `${t}.${r}`), this
      }
    },
    Hnt = class {
      constructor(e, {
        headers: t = {},
        schema: r,
        fetch: n,
        urlLengthLimit: i = 8e3,
        retry: a
      }) {
        this.url = e, this.headers = new Headers(t), this.schema = r, this.fetch = n, this.urlLengthLimit = i, this.retry = a
      }
      cloneRequestState() {
        return {
          url: new URL(this.url.toString()),
          headers: new Headers(this.headers)
        }
      }
      select(e, t) {
        let {
          head: r = !1,
          count: n
        } = t != null ? t : {}, i = r ? "HEAD" : "GET", a = !1, s = (e != null ? e : "*").split("").map(A => /\s/.test(A) && !a ? "" : (A === '"' && (a = !a), A)).join(""), {
          url: o,
          headers: l
        } = this.cloneRequestState();
        return o.searchParams.set("select", s), n && l.append("Prefer", `count=${n}`), new Q1({
          method: i,
          url: o,
          headers: l,
          schema: this.schema,
          fetch: this.fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry
        })
      }
      insert(e, {
        count: t,
        defaultToNull: r = !0
      } = {}) {
        var n;
        let i = "POST",
          {
            url: a,
            headers: s
          } = this.cloneRequestState();
        if (t && s.append("Prefer", `count=${t}`), r || s.append("Prefer", "missing=default"), Array.isArray(e)) {
          let o = e.reduce((l, A) => l.concat(Object.keys(A)), []);
          if (o.length > 0) {
            let l = [...new Set(o)].map(A => `"${A}"`);
            a.searchParams.set("columns", l.join(","))
          }
        }
        return new Q1({
          method: i,
          url: a,
          headers: s,
          schema: this.schema,
          body: e,
          fetch: (n = this.fetch) !== null && n !== void 0 ? n : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry
        })
      }
      upsert(e, {
        onConflict: t,
        ignoreDuplicates: r = !1,
        count: n,
        defaultToNull: i = !0
      } = {}) {
        var a;
        let s = "POST",
          {
            url: o,
            headers: l
          } = this.cloneRequestState();
        if (l.append("Prefer", `resolution=${r?"ignore":"merge"}-duplicates`), t !== void 0 && o.searchParams.set("on_conflict", t), n && l.append("Prefer", `count=${n}`), i || l.append("Prefer", "missing=default"), Array.isArray(e)) {
          let A = e.reduce((u, c) => u.concat(Object.keys(c)), []);
          if (A.length > 0) {
            let u = [...new Set(A)].map(c => `"${c}"`);
            o.searchParams.set("columns", u.join(","))
          }
        }
        return new Q1({
          method: s,
          url: o,
          headers: l,
          schema: this.schema,
          body: e,
          fetch: (a = this.fetch) !== null && a !== void 0 ? a : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry
        })
      }
      update(e, {
        count: t
      } = {}) {
        var r;
        let n = "PATCH",
          {
            url: i,
            headers: a
          } = this.cloneRequestState();
        return t && a.append("Prefer", `count=${t}`), new Q1({
          method: n,
          url: i,
          headers: a,
          schema: this.schema,
          body: e,
          fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry
        })
      }
      delete({
        count: e
      } = {}) {
        var t;
        let r = "DELETE",
          {
            url: n,
            headers: i
          } = this.cloneRequestState();
        return e && i.append("Prefer", `count=${e}`), new Q1({
          method: r,
          url: n,
          headers: i,
          schema: this.schema,
          fetch: (t = this.fetch) !== null && t !== void 0 ? t : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry
        })
      }
    };

  function Lb(e) {
    "@babel/helpers - typeof";
    return Lb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Lb(e)
  }

  function jnt(e, t) {
    if (Lb(e) != "object" || !e) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t || "default");
      if (Lb(n) != "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (t === "string" ? String : Number)(e)
  }

  function qnt(e) {
    var t = jnt(e, "string");
    return Lb(t) == "symbol" ? t : t + ""
  }

  function Knt(e, t, r) {
    return (t = qnt(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e
  }

  function Dhe(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })), r.push.apply(r, n)
    }
    return r
  }

  function Q4(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? Dhe(Object(r), !0).forEach(function(n) {
        Knt(e, n, r[n])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Dhe(Object(r)).forEach(function(n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
      })
    }
    return e
  }
  var Qhe = class Hhe {
    constructor(t, {
      headers: r = {},
      schema: n,
      fetch: i,
      timeout: a,
      urlLengthLimit: s = 8e3,
      retry: o
    } = {}) {
      this.url = t, this.headers = new Headers(r), this.schemaName = n, this.urlLengthLimit = s;
      let l = i != null ? i : globalThis.fetch;
      a !== void 0 && a > 0 ? this.fetch = (A, u) => {
        let c = new AbortController,
          f = setTimeout(() => c.abort(), a),
          h = u == null ? void 0 : u.signal;
        if (h) {
          if (h.aborted) return clearTimeout(f), l(A, u);
          let p = () => {
            clearTimeout(f), c.abort()
          };
          return h.addEventListener("abort", p, {
            once: !0
          }), l(A, Q4(Q4({}, u), {}, {
            signal: c.signal
          })).finally(() => {
            clearTimeout(f), h.removeEventListener("abort", p)
          })
        }
        return l(A, Q4(Q4({}, u), {}, {
          signal: c.signal
        })).finally(() => clearTimeout(f))
      } : this.fetch = l, this.retry = o
    }
    from(t) {
      if (!t || typeof t != "string" || t.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
      return new Hnt(new URL(`${this.url}/${t}`), {
        headers: new Headers(this.headers),
        schema: this.schemaName,
        fetch: this.fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry
      })
    }
    schema(t) {
      return new Hhe(this.url, {
        headers: this.headers,
        schema: t,
        fetch: this.fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry
      })
    }
    rpc(t, r = {}, {
      head: n = !1,
      get: i = !1,
      count: a
    } = {}) {
      var s;
      let o, l = new URL(`${this.url}/rpc/${t}`),
        A, u = h => h !== null && typeof h == "object" && (!Array.isArray(h) || h.some(u)),
        c = n && Object.values(r).some(u);
      c ? (o = "POST", A = r) : n || i ? (o = n ? "HEAD" : "GET", Object.entries(r).filter(([h, p]) => p !== void 0).map(([h, p]) => [h, Array.isArray(p) ? `{${p.join(",")}}` : `${p}`]).forEach(([h, p]) => {
        l.searchParams.append(h, p)
      })) : (o = "POST", A = r);
      let f = new Headers(this.headers);
      return c ? f.set("Prefer", a ? `count=${a},return=minimal` : "return=minimal") : a && f.set("Prefer", `count=${a}`), new Q1({
        method: o,
        url: l,
        headers: f,
        schema: this.schemaName,
        body: A,
        fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry
      })
    }
  };
  var X6 = class {
      constructor() {}
      static detectEnvironment() {
        var t;
        if (typeof WebSocket != "undefined") return {
          type: "native",
          wsConstructor: WebSocket
        };
        let r = globalThis;
        if (typeof globalThis != "undefined" && typeof r.WebSocket != "undefined") return {
          type: "native",
          wsConstructor: r.WebSocket
        };
        let n = typeof global != "undefined" ? global : void 0;
        if (n && typeof n.WebSocket != "undefined") return {
          type: "native",
          wsConstructor: n.WebSocket
        };
        if (typeof globalThis != "undefined" && typeof r.WebSocketPair != "undefined" && typeof globalThis.WebSocket == "undefined") return {
          type: "cloudflare",
          error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
          workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
        };
        if (typeof globalThis != "undefined" && r.EdgeRuntime || typeof navigator != "undefined" && (!((t = navigator.userAgent) === null || t === void 0) && t.includes("Vercel-Edge"))) return {
          type: "unsupported",
          error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
          workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
        };
        let i = globalThis.process;
        if (i) {
          let a = i.versions;
          if (a && a.node) {
            let s = a.node,
              o = parseInt(s.replace(/^v/, "").split(".")[0]);
            return o >= 22 ? typeof globalThis.WebSocket != "undefined" ? {
              type: "native",
              wsConstructor: globalThis.WebSocket
            } : {
              type: "unsupported",
              error: `Node.js ${o} detected but native WebSocket not found.`,
              workaround: "Provide a WebSocket implementation via the transport option."
            } : {
              type: "unsupported",
              error: `Node.js ${o} detected without native WebSocket support.`,
              workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`
            }
          }
        }
        return {
          type: "unsupported",
          error: "Unknown JavaScript runtime without WebSocket support.",
          workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
        }
      }
      static getWebSocketConstructor() {
        let t = this.detectEnvironment();
        if (t.wsConstructor) return t.wsConstructor;
        let r = t.error || "WebSocket not supported in this environment.";
        throw t.workaround && (r += `

Suggested solution: ${t.workaround}`), new Error(r)
      }
      static isWebSocketSupported() {
        try {
          let t = this.detectEnvironment();
          return t.type === "native" || t.type === "ws"
        } catch (t) {
          return !1
        }
      }
    },
    Y6 = X6;
  var jhe = "2.107.0";
  var qhe = `realtime-js/${jhe}`,
    Khe = "1.0.0",
    J6 = "2.0.0",
    Whe = J6;
  var Ghe = 1e4;
  var Vhe = 100;
  var Lc = {
      closed: "closed",
      errored: "errored",
      joined: "joined",
      joining: "joining",
      leaving: "leaving"
    },
    H4 = {
      close: "phx_close",
      error: "phx_error",
      join: "phx_join",
      reply: "phx_reply",
      leave: "phx_leave",
      access_token: "access_token"
    };
  var Ub = {
    connecting: "connecting",
    open: "open",
    closing: "closing",
    closed: "closed"
  };
  var Rb = class {
    constructor(t) {
      this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = {
        userBroadcastPush: 3,
        userBroadcast: 4
      }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = t != null ? t : []
    }
    encode(t, r) {
      if (t.event === this.BROADCAST_EVENT && !(t.payload instanceof ArrayBuffer) && typeof t.payload.event == "string") return r(this._binaryEncodeUserBroadcastPush(t));
      let n = [t.join_ref, t.ref, t.topic, t.event, t.payload];
      return r(JSON.stringify(n))
    }
    _binaryEncodeUserBroadcastPush(t) {
      var r;
      return this._isArrayBuffer((r = t.payload) === null || r === void 0 ? void 0 : r.payload) ? this._encodeBinaryUserBroadcastPush(t) : this._encodeJsonUserBroadcastPush(t)
    }
    _encodeBinaryUserBroadcastPush(t) {
      var r, n;
      let i = (n = (r = t.payload) === null || r === void 0 ? void 0 : r.payload) !== null && n !== void 0 ? n : new ArrayBuffer(0);
      return this._encodeUserBroadcastPush(t, this.BINARY_ENCODING, i)
    }
    _encodeJsonUserBroadcastPush(t) {
      var r, n;
      let i = (n = (r = t.payload) === null || r === void 0 ? void 0 : r.payload) !== null && n !== void 0 ? n : {},
        s = new TextEncoder().encode(JSON.stringify(i)).buffer;
      return this._encodeUserBroadcastPush(t, this.JSON_ENCODING, s)
    }
    _encodeUserBroadcastPush(t, r, n) {
      var i, a;
      let s = t.topic,
        o = (i = t.ref) !== null && i !== void 0 ? i : "",
        l = (a = t.join_ref) !== null && a !== void 0 ? a : "",
        A = t.payload.event,
        u = this.allowedMetadataKeys ? this._pick(t.payload, this.allowedMetadataKeys) : {},
        c = Object.keys(u).length === 0 ? "" : JSON.stringify(u);
      if (l.length > 255) throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);
      if (o.length > 255) throw new Error(`ref length ${o.length} exceeds maximum of 255`);
      if (s.length > 255) throw new Error(`topic length ${s.length} exceeds maximum of 255`);
      if (A.length > 255) throw new Error(`userEvent length ${A.length} exceeds maximum of 255`);
      if (c.length > 255) throw new Error(`metadata length ${c.length} exceeds maximum of 255`);
      let f = this.USER_BROADCAST_PUSH_META_LENGTH + l.length + o.length + s.length + A.length + c.length,
        h = new ArrayBuffer(this.HEADER_LENGTH + f),
        p = new DataView(h),
        d = 0;
      p.setUint8(d++, this.KINDS.userBroadcastPush), p.setUint8(d++, l.length), p.setUint8(d++, o.length), p.setUint8(d++, s.length), p.setUint8(d++, A.length), p.setUint8(d++, c.length), p.setUint8(d++, r), Array.from(l, m => p.setUint8(d++, m.charCodeAt(0))), Array.from(o, m => p.setUint8(d++, m.charCodeAt(0))), Array.from(s, m => p.setUint8(d++, m.charCodeAt(0))), Array.from(A, m => p.setUint8(d++, m.charCodeAt(0))), Array.from(c, m => p.setUint8(d++, m.charCodeAt(0)));
      var g = new Uint8Array(h.byteLength + n.byteLength);
      return g.set(new Uint8Array(h), 0), g.set(new Uint8Array(n), h.byteLength), g.buffer
    }
    decode(t, r) {
      if (this._isArrayBuffer(t)) {
        let n = this._binaryDecode(t);
        return r(n)
      }
      if (typeof t == "string") {
        let n = JSON.parse(t),
          [i, a, s, o, l] = n;
        return r({
          join_ref: i,
          ref: a,
          topic: s,
          event: o,
          payload: l
        })
      }
      return r({})
    }
    _binaryDecode(t) {
      let r = new DataView(t),
        n = r.getUint8(0),
        i = new TextDecoder;
      switch (n) {
        case this.KINDS.userBroadcast:
          return this._decodeUserBroadcast(t, r, i)
      }
    }
    _decodeUserBroadcast(t, r, n) {
      let i = r.getUint8(1),
        a = r.getUint8(2),
        s = r.getUint8(3),
        o = r.getUint8(4),
        l = this.HEADER_LENGTH + 4,
        A = n.decode(t.slice(l, l + i));
      l = l + i;
      let u = n.decode(t.slice(l, l + a));
      l = l + a;
      let c = n.decode(t.slice(l, l + s));
      l = l + s;
      let f = t.slice(l, t.byteLength),
        h = o === this.JSON_ENCODING ? JSON.parse(n.decode(f)) : f,
        p = {
          type: this.BROADCAST_EVENT,
          event: u,
          payload: h
        };
      return s > 0 && (p.meta = JSON.parse(c)), {
        join_ref: null,
        ref: null,
        topic: A,
        event: this.BROADCAST_EVENT,
        payload: p
      }
    }
    _isArrayBuffer(t) {
      var r;
      return t instanceof ArrayBuffer || ((r = t == null ? void 0 : t.constructor) === null || r === void 0 ? void 0 : r.name) === "ArrayBuffer"
    }
    _pick(t, r) {
      return !t || typeof t != "object" ? {} : Object.fromEntries(Object.entries(t).filter(([n]) => r.includes(n)))
    }
  };
  var Jn;
  (function(e) {
    e.abstime = "abstime", e.bool = "bool", e.date = "date", e.daterange = "daterange", e.float4 = "float4", e.float8 = "float8", e.int2 = "int2", e.int4 = "int4", e.int4range = "int4range", e.int8 = "int8", e.int8range = "int8range", e.json = "json", e.jsonb = "jsonb", e.money = "money", e.numeric = "numeric", e.oid = "oid", e.reltime = "reltime", e.text = "text", e.time = "time", e.timestamp = "timestamp", e.timestamptz = "timestamptz", e.timetz = "timetz", e.tsrange = "tsrange", e.tstzrange = "tstzrange"
  })(Jn || (Jn = {}));
  var eM = (e, t, r = {}) => {
      var n;
      let i = (n = r.skipTypes) !== null && n !== void 0 ? n : [];
      return t ? Object.keys(t).reduce((a, s) => (a[s] = Wnt(s, e, t, i), a), {}) : {}
    },
    Wnt = (e, t, r, n) => {
      let i = t.find(o => o.name === e),
        a = i == null ? void 0 : i.type,
        s = r[e];
      return a && !n.includes(a) ? zhe(a, s) : Z6(s)
    },
    zhe = (e, t) => {
      if (e.charAt(0) === "_") {
        let r = e.slice(1, e.length);
        return $nt(t, r)
      }
      switch (e) {
        case Jn.bool:
          return Gnt(t);
        case Jn.float4:
        case Jn.float8:
        case Jn.int2:
        case Jn.int4:
        case Jn.int8:
        case Jn.numeric:
        case Jn.oid:
          return Vnt(t);
        case Jn.json:
        case Jn.jsonb:
          return znt(t);
        case Jn.timestamp:
          return Xnt(t);
        case Jn.abstime:
        case Jn.date:
        case Jn.daterange:
        case Jn.int4range:
        case Jn.int8range:
        case Jn.money:
        case Jn.reltime:
        case Jn.text:
        case Jn.time:
        case Jn.timestamptz:
        case Jn.timetz:
        case Jn.tsrange:
        case Jn.tstzrange:
          return Z6(t);
        default:
          return Z6(t)
      }
    },
    Z6 = e => e,
    Gnt = e => {
      switch (e) {
        case "t":
          return !0;
        case "f":
          return !1;
        default:
          return e
      }
    },
    Vnt = e => {
      if (typeof e == "string") {
        let t = parseFloat(e);
        if (!Number.isNaN(t)) return t
      }
      return e
    },
    znt = e => {
      if (typeof e == "string") try {
        return JSON.parse(e)
      } catch (t) {
        return e
      }
      return e
    },
    $nt = (e, t) => {
      if (typeof e != "string") return e;
      let r = e.length - 1,
        n = e[r];
      if (e[0] === "{" && n === "}") {
        let a, s = e.slice(1, r);
        try {
          a = JSON.parse("[" + s + "]")
        } catch (o) {
          a = s ? s.split(",") : []
        }
        return a.map(o => zhe(t, o))
      }
      return e
    },
    Xnt = e => typeof e == "string" ? e.replace(" ", "T") : e,
    j4 = e => {
      let t = new URL(e);
      return t.protocol = t.protocol.replace(/^ws/i, "http"), t.pathname = t.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), t.pathname === "" || t.pathname === "/" ? t.pathname = "/api/broadcast" : t.pathname = t.pathname + "/api/broadcast", t.href
    };
  var Mb = e => typeof e == "function" ? e : function() {
      return e
    },
    Jnt = typeof self != "undefined" ? self : null,
    j1 = typeof window != "undefined" ? window : null,
    Uc = Jnt || j1 || globalThis,
    Znt = "2.0.0",
    eit = 1e4,
    tit = 1e3,
    Rc = {
      connecting: 0,
      open: 1,
      closing: 2,
      closed: 3
    },
    ml = {
      closed: "closed",
      errored: "errored",
      joined: "joined",
      joining: "joining",
      leaving: "leaving"
    },
    $f = {
      close: "phx_close",
      error: "phx_error",
      join: "phx_join",
      reply: "phx_reply",
      leave: "phx_leave"
    },
    tM = {
      longpoll: "longpoll",
      websocket: "websocket"
    },
    rit = {
      complete: 4
    },
    rM = "base64url.bearer.phx.",
    q4 = class {
      constructor(e, t, r, n) {
        this.channel = e, this.event = t, this.payload = r || function() {
          return {}
        }, this.receivedResp = null, this.timeout = n, this.timeoutTimer = null, this.recHooks = [], this.sent = !1, this.ref = void 0
      }
      resend(e) {
        this.timeout = e, this.reset(), this.send()
      }
      send() {
        this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload(),
          ref: this.ref,
          join_ref: this.channel.joinRef()
        }))
      }
      receive(e, t) {
        return this.hasReceived(e) && t(this.receivedResp.response), this.recHooks.push({
          status: e,
          callback: t
        }), this
      }
      reset() {
        this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1
      }
      destroy() {
        this.cancelRefEvent(), this.cancelTimeout()
      }
      matchReceive({
        status: e,
        response: t,
        _ref: r
      }) {
        this.recHooks.filter(n => n.status === e).forEach(n => n.callback(t))
      }
      cancelRefEvent() {
        this.refEvent && this.channel.off(this.refEvent)
      }
      cancelTimeout() {
        clearTimeout(this.timeoutTimer), this.timeoutTimer = null
      }
      startTimeout() {
        this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, e => {
          this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = e, this.matchReceive(e)
        }), this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {})
        }, this.timeout)
      }
      hasReceived(e) {
        return this.receivedResp && this.receivedResp.status === e
      }
      trigger(e, t) {
        this.channel.trigger(this.refEvent, {
          status: e,
          response: t
        })
      }
    },
    $he = class {
      constructor(e, t) {
        this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0
      }
      reset() {
        this.tries = 0, clearTimeout(this.timer)
      }
      scheduleTimeout() {
        clearTimeout(this.timer), this.timer = setTimeout(() => {
          this.tries = this.tries + 1, this.callback()
        }, this.timerCalc(this.tries + 1))
      }
    },
    nit = class {
      constructor(e, t, r) {
        this.state = ml.closed, this.topic = e, this.params = Mb(t || {}), this.socket = r, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new q4(this, $f.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new $he(() => {
          this.socket.isConnected() && this.rejoin()
        }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
          this.rejoinTimer.reset(), this.isErrored() && this.rejoin()
        })), this.joinPush.receive("ok", () => {
          this.state = ml.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach(n => n.send()), this.pushBuffer = []
        }), this.joinPush.receive("error", n => {
          this.state = ml.errored, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, n), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
        }), this.onClose(() => {
          this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = ml.closed, this.socket.remove(this)
        }), this.onError(n => {
          this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, n), this.isJoining() && this.joinPush.reset(), this.state = ml.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
        }), this.joinPush.receive("timeout", () => {
          this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new q4(this, $f.leave, Mb({}), this.timeout).send(), this.state = ml.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
        }), this.on($f.reply, (n, i) => {
          this.trigger(this.replyEventName(i), n)
        })
      }
      join(e = this.timeout) {
        if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
        return this.timeout = e, this.joinedOnce = !0, this.rejoin(), this.joinPush
      }
      teardown() {
        this.pushBuffer.forEach(e => e.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = ml.closed, this.bindings = []
      }
      onClose(e) {
        this.on($f.close, e)
      }
      onError(e) {
        return this.on($f.error, t => e(t))
      }
      on(e, t) {
        let r = this.bindingRef++;
        return this.bindings.push({
          event: e,
          ref: r,
          callback: t
        }), r
      }
      off(e, t) {
        this.bindings = this.bindings.filter(r => !(r.event === e && (typeof t == "undefined" || t === r.ref)))
      }
      canPush() {
        return this.socket.isConnected() && this.isJoined()
      }
      push(e, t, r = this.timeout) {
        if (t = t || {}, !this.joinedOnce) throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
        let n = new q4(this, e, function() {
          return t
        }, r);
        return this.canPush() ? n.send() : (n.startTimeout(), this.pushBuffer.push(n)), n
      }
      leave(e = this.timeout) {
        this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = ml.leaving;
        let t = () => {
            this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger($f.close, "leave")
          },
          r = new q4(this, $f.leave, Mb({}), e);
        return r.receive("ok", () => t()).receive("timeout", () => t()), r.send(), this.canPush() || r.trigger("ok", {}), r
      }
      onMessage(e, t, r) {
        return t
      }
      filterBindings(e, t, r) {
        return !0
      }
      isMember(e, t, r, n) {
        return this.topic !== e ? !1 : n && n !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", {
          topic: e,
          event: t,
          payload: r,
          joinRef: n
        }), !1) : !0
      }
      joinRef() {
        return this.joinPush.ref
      }
      rejoin(e = this.timeout) {
        this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = ml.joining, this.joinPush.resend(e))
      }
      trigger(e, t, r, n) {
        let i = this.onMessage(e, t, r, n);
        if (t && !i) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
        let a = this.bindings.filter(s => s.event === e && this.filterBindings(s, t, r));
        for (let s = 0; s < a.length; s++) a[s].callback(i, r, n || this.joinRef())
      }
      replyEventName(e) {
        return `chan_reply_${e}`
      }
      isClosed() {
        return this.state === ml.closed
      }
      isErrored() {
        return this.state === ml.errored
      }
      isJoined() {
        return this.state === ml.joined
      }
      isJoining() {
        return this.state === ml.joining
      }
      isLeaving() {
        return this.state === ml.leaving
      }
    },
    W4 = class {
      static request(e, t, r, n, i, a, s) {
        if (Uc.XDomainRequest) {
          let o = new Uc.XDomainRequest;
          return this.xdomainRequest(o, e, t, n, i, a, s)
        } else if (Uc.XMLHttpRequest) {
          let o = new Uc.XMLHttpRequest;
          return this.xhrRequest(o, e, t, r, n, i, a, s)
        } else {
          if (Uc.fetch && Uc.AbortController) return this.fetchRequest(e, t, r, n, i, a, s);
          throw new Error("No suitable XMLHttpRequest implementation found")
        }
      }
      static fetchRequest(e, t, r, n, i, a, s) {
        let o = {
            method: e,
            headers: r,
            body: n
          },
          l = null;
        if (i) {
          l = new AbortController;
          let A = setTimeout(() => l.abort(), i);
          o.signal = l.signal
        }
        return Uc.fetch(t, o).then(A => A.text()).then(A => this.parseJSON(A)).then(A => s && s(A)).catch(A => {
          A.name === "AbortError" && a ? a() : s && s(null)
        }), l
      }
      static xdomainRequest(e, t, r, n, i, a, s) {
        return e.timeout = i, e.open(t, r), e.onload = () => {
          let o = this.parseJSON(e.responseText);
          s && s(o)
        }, a && (e.ontimeout = a), e.onprogress = () => {}, e.send(n), e
      }
      static xhrRequest(e, t, r, n, i, a, s, o) {
        e.open(t, r, !0), e.timeout = a;
        for (let [l, A] of Object.entries(n)) e.setRequestHeader(l, A);
        return e.onerror = () => o && o(null), e.onreadystatechange = () => {
          if (e.readyState === rit.complete && o) {
            let l = this.parseJSON(e.responseText);
            o(l)
          }
        }, s && (e.ontimeout = s), e.send(i), e
      }
      static parseJSON(e) {
        if (!e || e === "") return null;
        try {
          return JSON.parse(e)
        } catch (t) {
          return console && console.log("failed to parse JSON response", e), null
        }
      }
      static serialize(e, t) {
        let r = [];
        for (var n in e) {
          if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
          let i = t ? `${t}[${n}]` : n,
            a = e[n];
          typeof a == "object" ? r.push(this.serialize(a, i)) : r.push(encodeURIComponent(i) + "=" + encodeURIComponent(a))
        }
        return r.join("&")
      }
      static appendParams(e, t) {
        if (Object.keys(t).length === 0) return e;
        let r = e.match(/\?/) ? "&" : "?";
        return `${e}${r}${this.serialize(t)}`
      }
    },
    iit = e => {
      let t = "",
        r = new Uint8Array(e),
        n = r.byteLength;
      for (let i = 0; i < n; i++) t += String.fromCharCode(r[i]);
      return btoa(t)
    },
    H1 = class {
      constructor(e, t) {
        t && t.length === 2 && t[1].startsWith(rM) && (this.authToken = atob(t[1].slice(rM.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = new Set, this.awaitingBatchAck = !1, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {}, this.onerror = function() {}, this.onmessage = function() {}, this.onclose = function() {}, this.pollEndpoint = this.normalizeEndpoint(e), this.readyState = Rc.connecting, setTimeout(() => this.poll(), 0)
      }
      normalizeEndpoint(e) {
        return e.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + tM.websocket), "$1/" + tM.longpoll)
      }
      endpointURL() {
        return W4.appendParams(this.pollEndpoint, {
          token: this.token
        })
      }
      closeAndRetry(e, t, r) {
        this.close(e, t, r), this.readyState = Rc.connecting
      }
      ontimeout() {
        this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1)
      }
      isActive() {
        return this.readyState === Rc.open || this.readyState === Rc.connecting
      }
      poll() {
        let e = {
          Accept: "application/json"
        };
        this.authToken && (e["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", e, null, () => this.ontimeout(), t => {
          if (t) {
            var {
              status: r,
              token: n,
              messages: i
            } = t;
            if (r === 410 && this.token !== null) {
              this.onerror(410), this.closeAndRetry(3410, "session_gone", !1);
              return
            }
            this.token = n
          } else r = 0;
          switch (r) {
            case 200:
              i.forEach(a => {
                setTimeout(() => this.onmessage({
                  data: a
                }), 0)
              }), this.poll();
              break;
            case 204:
              this.poll();
              break;
            case 410:
              this.readyState = Rc.open, this.onopen({}), this.poll();
              break;
            case 403:
              this.onerror(403), this.close(1008, "forbidden", !1);
              break;
            case 0:
            case 500:
              this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
              break;
            default:
              throw new Error(`unhandled poll status ${r}`)
          }
        })
      }
      send(e) {
        typeof e != "string" && (e = iit(e)), this.currentBatch ? this.currentBatch.push(e) : this.awaitingBatchAck ? this.batchBuffer.push(e) : (this.currentBatch = [e], this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch), this.currentBatch = null
        }, 0))
      }
      batchSend(e) {
        this.awaitingBatchAck = !0, this.ajax("POST", {
          "Content-Type": "application/x-ndjson"
        }, e.join(`
`), () => this.onerror("timeout"), t => {
          this.awaitingBatchAck = !1, !t || t.status !== 200 ? (this.onerror(t && t.status), this.closeAndRetry(1011, "internal server error", !1)) : this.batchBuffer.length > 0 && (this.batchSend(this.batchBuffer), this.batchBuffer = [])
        })
      }
      close(e, t, r) {
        for (let i of this.reqs) i.abort();
        this.readyState = Rc.closed;
        let n = Object.assign({
          code: 1e3,
          reason: void 0,
          wasClean: !0
        }, {
          code: e,
          reason: t,
          wasClean: r
        });
        this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, typeof CloseEvent != "undefined" ? this.onclose(new CloseEvent("close", n)) : this.onclose(n)
      }
      ajax(e, t, r, n, i) {
        let a, s = () => {
          this.reqs.delete(a), n()
        };
        a = W4.request(e, this.endpointURL(), t, r, this.timeout, s, o => {
          this.reqs.delete(a), this.isActive() && i(o)
        }), this.reqs.add(a)
      }
    },
    Xhe = class Db {
      constructor(t, r = {}) {
        let n = r.events || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.state = {}, this.pendingDiffs = [], this.channel = t, this.joinRef = null, this.caller = {
          onJoin: function() {},
          onLeave: function() {},
          onSync: function() {}
        }, this.channel.on(n.state, i => {
          let {
            onJoin: a,
            onLeave: s,
            onSync: o
          } = this.caller;
          this.joinRef = this.channel.joinRef(), this.state = Db.syncState(this.state, i, a, s), this.pendingDiffs.forEach(l => {
            this.state = Db.syncDiff(this.state, l, a, s)
          }), this.pendingDiffs = [], o()
        }), this.channel.on(n.diff, i => {
          let {
            onJoin: a,
            onLeave: s,
            onSync: o
          } = this.caller;
          this.inPendingSyncState() ? this.pendingDiffs.push(i) : (this.state = Db.syncDiff(this.state, i, a, s), o())
        })
      }
      onJoin(t) {
        this.caller.onJoin = t
      }
      onLeave(t) {
        this.caller.onLeave = t
      }
      onSync(t) {
        this.caller.onSync = t
      }
      list(t) {
        return Db.list(this.state, t)
      }
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel.joinRef()
      }
      static syncState(t, r, n, i) {
        let a = this.clone(t),
          s = {},
          o = {};
        return this.map(a, (l, A) => {
          r[l] || (o[l] = A)
        }), this.map(r, (l, A) => {
          let u = a[l];
          if (u) {
            let c = A.metas.map(d => d.phx_ref),
              f = u.metas.map(d => d.phx_ref),
              h = A.metas.filter(d => f.indexOf(d.phx_ref) < 0),
              p = u.metas.filter(d => c.indexOf(d.phx_ref) < 0);
            h.length > 0 && (s[l] = A, s[l].metas = h), p.length > 0 && (o[l] = this.clone(u), o[l].metas = p)
          } else s[l] = A
        }), this.syncDiff(a, {
          joins: s,
          leaves: o
        }, n, i)
      }
      static syncDiff(t, r, n, i) {
        let {
          joins: a,
          leaves: s
        } = this.clone(r);
        return n || (n = function() {}), i || (i = function() {}), this.map(a, (o, l) => {
          let A = t[o];
          if (t[o] = this.clone(l), A) {
            let u = t[o].metas.map(f => f.phx_ref),
              c = A.metas.filter(f => u.indexOf(f.phx_ref) < 0);
            t[o].metas.unshift(...c)
          }
          n(o, A, l)
        }), this.map(s, (o, l) => {
          let A = t[o];
          if (!A) return;
          let u = l.metas.map(c => c.phx_ref);
          A.metas = A.metas.filter(c => u.indexOf(c.phx_ref) < 0), i(o, A, l), A.metas.length === 0 && delete t[o]
        }), t
      }
      static list(t, r) {
        return r || (r = function(n, i) {
          return i
        }), this.map(t, (n, i) => r(n, i))
      }
      static map(t, r) {
        return Object.getOwnPropertyNames(t).map(n => r(n, t[n]))
      }
      static clone(t) {
        return JSON.parse(JSON.stringify(t))
      }
    },
    K4 = {
      HEADER_LENGTH: 1,
      META_LENGTH: 4,
      KINDS: {
        push: 0,
        reply: 1,
        broadcast: 2
      },
      encode(e, t) {
        if (e.payload.constructor === ArrayBuffer) return t(this.binaryEncode(e));
        {
          let r = [e.join_ref, e.ref, e.topic, e.event, e.payload];
          return t(JSON.stringify(r))
        }
      },
      decode(e, t) {
        if (e.constructor === ArrayBuffer) return t(this.binaryDecode(e));
        {
          let [r, n, i, a, s] = JSON.parse(e);
          return t({
            join_ref: r,
            ref: n,
            topic: i,
            event: a,
            payload: s
          })
        }
      },
      binaryEncode(e) {
        let {
          join_ref: t,
          ref: r,
          event: n,
          topic: i,
          payload: a
        } = e, s = this.META_LENGTH + t.length + r.length + i.length + n.length, o = new ArrayBuffer(this.HEADER_LENGTH + s), l = new DataView(o), A = 0;
        l.setUint8(A++, this.KINDS.push), l.setUint8(A++, t.length), l.setUint8(A++, r.length), l.setUint8(A++, i.length), l.setUint8(A++, n.length), Array.from(t, c => l.setUint8(A++, c.charCodeAt(0))), Array.from(r, c => l.setUint8(A++, c.charCodeAt(0))), Array.from(i, c => l.setUint8(A++, c.charCodeAt(0))), Array.from(n, c => l.setUint8(A++, c.charCodeAt(0)));
        var u = new Uint8Array(o.byteLength + a.byteLength);
        return u.set(new Uint8Array(o), 0), u.set(new Uint8Array(a), o.byteLength), u.buffer
      },
      binaryDecode(e) {
        let t = new DataView(e),
          r = t.getUint8(0),
          n = new TextDecoder;
        switch (r) {
          case this.KINDS.push:
            return this.decodePush(e, t, n);
          case this.KINDS.reply:
            return this.decodeReply(e, t, n);
          case this.KINDS.broadcast:
            return this.decodeBroadcast(e, t, n)
        }
      },
      decodePush(e, t, r) {
        let n = t.getUint8(1),
          i = t.getUint8(2),
          a = t.getUint8(3),
          s = this.HEADER_LENGTH + this.META_LENGTH - 1,
          o = r.decode(e.slice(s, s + n));
        s = s + n;
        let l = r.decode(e.slice(s, s + i));
        s = s + i;
        let A = r.decode(e.slice(s, s + a));
        s = s + a;
        let u = e.slice(s, e.byteLength);
        return {
          join_ref: o,
          ref: null,
          topic: l,
          event: A,
          payload: u
        }
      },
      decodeReply(e, t, r) {
        let n = t.getUint8(1),
          i = t.getUint8(2),
          a = t.getUint8(3),
          s = t.getUint8(4),
          o = this.HEADER_LENGTH + this.META_LENGTH,
          l = r.decode(e.slice(o, o + n));
        o = o + n;
        let A = r.decode(e.slice(o, o + i));
        o = o + i;
        let u = r.decode(e.slice(o, o + a));
        o = o + a;
        let c = r.decode(e.slice(o, o + s));
        o = o + s;
        let f = e.slice(o, e.byteLength),
          h = {
            status: c,
            response: f
          };
        return {
          join_ref: l,
          ref: A,
          topic: u,
          event: $f.reply,
          payload: h
        }
      },
      decodeBroadcast(e, t, r) {
        let n = t.getUint8(1),
          i = t.getUint8(2),
          a = this.HEADER_LENGTH + 2,
          s = r.decode(e.slice(a, a + n));
        a = a + n;
        let o = r.decode(e.slice(a, a + i));
        a = a + i;
        let l = e.slice(a, e.byteLength);
        return {
          join_ref: null,
          ref: null,
          topic: s,
          event: o,
          payload: l
        }
      }
    },
    Yhe = class {
      constructor(e, t = {}) {
        var i, a;
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = t.timeout || eit, this.transport = t.transport || Uc.WebSocket || H1, this.conn = void 0, this.primaryPassedHealthCheck = !1, this.longPollFallbackMs = t.longPollFallbackMs, this.fallbackTimer = null;
        let r = null;
        try {
          r = Uc && Uc.sessionStorage
        } catch (s) {}
        this.sessionStore = t.sessionStorage || r, this.establishedConnections = 0, this.defaultEncoder = K4.encode.bind(K4), this.defaultDecoder = K4.decode.bind(K4), this.closeWasClean = !0, this.disconnecting = !1, this.binaryType = t.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = !1, this.encode = void 0, this.decode = void 0, this.transport !== H1 ? (this.encode = t.encode || this.defaultEncoder, this.decode = t.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
        let n = null;
        j1 && j1.addEventListener && (j1.addEventListener("pagehide", s => {
          this.conn && (this.disconnect(), n = this.connectClock)
        }), j1.addEventListener("pageshow", s => {
          n === this.connectClock && (n = null, this.connect())
        }), j1.addEventListener("visibilitychange", () => {
          document.visibilityState === "hidden" ? this.pageHidden = !0 : (this.pageHidden = !1, !this.isConnected() && !this.closeWasClean && this.teardown(() => this.connect()))
        })), this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = (i = t.autoSendHeartbeat) != null ? i : !0, this.heartbeatCallback = (a = t.heartbeatCallback) != null ? a : () => {}, this.rejoinAfterMs = s => t.rejoinAfterMs ? t.rejoinAfterMs(s) : [1e3, 2e3, 5e3][s - 1] || 1e4, this.reconnectAfterMs = s => t.reconnectAfterMs ? t.reconnectAfterMs(s) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][s - 1] || 5e3, this.logger = t.logger || null, !this.logger && t.debug && (this.logger = (s, o, l) => {
          console.log(`${s}: ${o}`, l)
        }), this.longpollerTimeout = t.longpollerTimeout || 2e4, this.params = Mb(t.params || {}), this.endPoint = `${e}/${tM.websocket}`, this.vsn = t.vsn || Znt, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new $he(() => {
          if (this.pageHidden) {
            this.log("Not reconnecting as page is hidden!"), this.teardown();
            return
          }
          this.teardown(async () => {
            t.beforeReconnect && await t.beforeReconnect(), this.connect()
          })
        }, this.reconnectAfterMs), this.authToken = t.authToken
      }
      getLongPollTransport() {
        return H1
      }
      replaceTransport(e) {
        this.connectClock++, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = e
      }
      protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws"
      }
      endPointURL() {
        let e = W4.appendParams(W4.appendParams(this.endPoint, this.params()), {
          vsn: this.vsn
        });
        return e.charAt(0) !== "/" ? e : e.charAt(1) === "/" ? `${this.protocol()}:${e}` : `${this.protocol()}://${location.host}${e}`
      }
      disconnect(e, t, r) {
        this.connectClock++, this.disconnecting = !0, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
          this.disconnecting = !1, e && e()
        }, t, r)
      }
      connect(e) {
        e && (console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"), this.params = Mb(e)), !(this.conn && !this.disconnecting) && (this.longPollFallbackMs && this.transport !== H1 ? this.connectWithFallback(H1, this.longPollFallbackMs) : this.transportConnect())
      }
      log(e, t, r) {
        this.logger && this.logger(e, t, r)
      }
      hasLogger() {
        return this.logger !== null
      }
      onOpen(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.open.push([t, e]), t
      }
      onClose(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.close.push([t, e]), t
      }
      onError(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.error.push([t, e]), t
      }
      onMessage(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.message.push([t, e]), t
      }
      onHeartbeat(e) {
        this.heartbeatCallback = e
      }
      ping(e) {
        if (!this.isConnected()) return !1;
        let t = this.makeRef(),
          r = Date.now();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: t
        });
        let n = this.onMessage(i => {
          i.ref === t && (this.off([n]), e(Date.now() - r))
        });
        return !0
      }
      transportName(e) {
        switch (e) {
          case H1:
            return "LongPoll";
          default:
            return e.name
        }
      }
      transportConnect() {
        this.connectClock++, this.closeWasClean = !1;
        let e;
        this.authToken && (e = ["phoenix", `${rM}${btoa(this.authToken).replace(/=/g,"")}`]), this.conn = new this.transport(this.endPointURL(), e), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = t => this.onConnError(t), this.conn.onmessage = t => this.onConnMessage(t), this.conn.onclose = t => this.onConnClose(t)
      }
      getSession(e) {
        return this.sessionStore && this.sessionStore.getItem(e)
      }
      storeSession(e, t) {
        this.sessionStore && this.sessionStore.setItem(e, t)
      }
      connectWithFallback(e, t = 2500) {
        clearTimeout(this.fallbackTimer);
        let r = !1,
          n = !0,
          i, a, s = this.transportName(e),
          o = l => {
            this.log("transport", `falling back to ${s}...`, l), this.off([i, a]), n = !1, this.replaceTransport(e), this.transportConnect()
          };
        if (this.getSession(`phx:fallback:${s}`)) return o("memorized");
        this.fallbackTimer = setTimeout(o, t), a = this.onError(l => {
          this.log("transport", "error", l), n && !r && (clearTimeout(this.fallbackTimer), o(l))
        }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
          if (r = !0, !n) {
            let l = this.transportName(e);
            return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${l}`, "true"), this.log("transport", `established ${l} fallback`)
          }
          clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(o, t), this.ping(l => {
            this.log("transport", "connected to primary after", l), this.primaryPassedHealthCheck = !0, clearTimeout(this.fallbackTimer)
          })
        }), this.transportConnect()
      }
      clearHeartbeats() {
        clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer)
      }
      onConnOpen() {
        this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.disconnecting = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open")
      }
      heartbeatTimeout() {
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          try {
            this.heartbeatCallback("timeout")
          } catch (e) {
            this.log("error", "error in heartbeat callback", e)
          }
          this.triggerChanError(new Error("heartbeat timeout")), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), tit, "heartbeat timeout")
        }
      }
      resetHeartbeat() {
        this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs))
      }
      teardown(e, t, r) {
        if (!this.conn) return e && e();
        let n = this.conn;
        this.waitForBufferDone(n, () => {
          t ? n.close(t, r || "") : n.close(), this.waitForSocketClosed(n, () => {
            this.conn === n && (this.conn.onopen = function() {}, this.conn.onerror = function() {}, this.conn.onmessage = function() {}, this.conn.onclose = function() {}, this.conn = null), e && e()
          })
        })
      }
      waitForBufferDone(e, t, r = 1) {
        if (r === 5 || !e.bufferedAmount) {
          t();
          return
        }
        setTimeout(() => {
          this.waitForBufferDone(e, t, r + 1)
        }, 150 * r)
      }
      waitForSocketClosed(e, t, r = 1) {
        if (r === 5 || e.readyState === Rc.closed) {
          t();
          return
        }
        setTimeout(() => {
          this.waitForSocketClosed(e, t, r + 1)
        }, 150 * r)
      }
      onConnClose(e) {
        this.conn && (this.conn.onclose = () => {}), this.hasLogger() && this.log("transport", "close", e), this.triggerChanError(e), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", e)
      }
      onConnError(e) {
        this.hasLogger() && this.log("transport", "error", e);
        let t = this.transport,
          r = this.establishedConnections;
        this.triggerStateCallbacks("error", e, t, r), (t === this.transport || r > 0) && this.triggerChanError(e)
      }
      triggerChanError(e) {
        this.channels.forEach(t => {
          t.isErrored() || t.isLeaving() || t.isClosed() || t.trigger($f.error, e)
        })
      }
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case Rc.connecting:
            return "connecting";
          case Rc.open:
            return "open";
          case Rc.closing:
            return "closing";
          default:
            return "closed"
        }
      }
      isConnected() {
        return this.connectionState() === "open"
      }
      remove(e) {
        this.off(e.stateChangeRefs), this.channels = this.channels.filter(t => t !== e)
      }
      off(e) {
        for (let t in this.stateChangeCallbacks) this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(([r]) => e.indexOf(r) === -1)
      }
      channel(e, t = {}) {
        let r = new nit(e, t, this);
        return this.channels.push(r), r
      }
      push(e) {
        if (this.hasLogger()) {
          let {
            topic: t,
            event: r,
            payload: n,
            ref: i,
            join_ref: a
          } = e;
          this.log("push", `${t} ${r} (${a}, ${i})`, n)
        }
        this.isConnected() ? this.encode(e, t => this.conn.send(t)) : this.sendBuffer.push(() => this.encode(e, t => this.conn.send(t)))
      }
      makeRef() {
        let e = this.ref + 1;
        return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString()
      }
      sendHeartbeat() {
        if (!this.isConnected()) {
          try {
            this.heartbeatCallback("disconnected")
          } catch (e) {
            this.log("error", "error in heartbeat callback", e)
          }
          return
        }
        if (this.pendingHeartbeatRef) {
          this.heartbeatTimeout();
          return
        }
        this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        try {
          this.heartbeatCallback("sent")
        } catch (e) {
          this.log("error", "error in heartbeat callback", e)
        }
        this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs)
      }
      flushSendBuffer() {
        this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach(e => e()), this.sendBuffer = [])
      }
      onConnMessage(e) {
        this.decode(e.data, t => {
          let {
            topic: r,
            event: n,
            payload: i,
            ref: a,
            join_ref: s
          } = t;
          if (a && a === this.pendingHeartbeatRef) {
            let o = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
            this.clearHeartbeats();
            try {
              this.heartbeatCallback(i.status === "ok" ? "ok" : "error", o)
            } catch (l) {
              this.log("error", "error in heartbeat callback", l)
            }
            this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs))
          }
          this.hasLogger() && this.log("receive", `${i.status||""} ${r} ${n} ${a&&"("+a+")"||""}`.trim(), i);
          for (let o = 0; o < this.channels.length; o++) {
            let l = this.channels[o];
            l.isMember(r, n, i, s) && l.trigger(n, i, a, s)
          }
          this.triggerStateCallbacks("message", t)
        })
      }
      triggerStateCallbacks(e, ...t) {
        try {
          this.stateChangeCallbacks[e].forEach(([r, n]) => {
            try {
              n(...t)
            } catch (i) {
              this.log("error", `error in ${e} callback`, i)
            }
          })
        } catch (r) {
          this.log("error", `error triggering ${e} callbacks`, r)
        }
      }
      leaveOpenTopic(e) {
        let t = this.channels.find(r => r.topic === e && (r.isJoined() || r.isJoining()));
        t && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${e}"`), t.leave())
      }
    };
  var Qb = class e {
    constructor(t, r) {
      let n = sit(r);
      this.presence = new Xhe(t.getChannel(), n), this.presence.onJoin((i, a, s) => {
        let o = e.onJoinPayload(i, a, s);
        t.getChannel().trigger("presence", o)
      }), this.presence.onLeave((i, a, s) => {
        let o = e.onLeavePayload(i, a, s);
        t.getChannel().trigger("presence", o)
      }), this.presence.onSync(() => {
        t.getChannel().trigger("presence", {
          event: "sync"
        })
      })
    }
    get state() {
      return e.transformState(this.presence.state)
    }
    static transformState(t) {
      return t = ait(t), Object.getOwnPropertyNames(t).reduce((r, n) => {
        let i = t[n];
        return r[n] = G4(i), r
      }, {})
    }
    static onJoinPayload(t, r, n) {
      let i = Jhe(r),
        a = G4(n);
      return {
        event: "join",
        key: t,
        currentPresences: i,
        newPresences: a
      }
    }
    static onLeavePayload(t, r, n) {
      let i = Jhe(r),
        a = G4(n);
      return {
        event: "leave",
        key: t,
        currentPresences: i,
        leftPresences: a
      }
    }
  };

  function G4(e) {
    return e.metas.map(t => (t.presence_ref = t.phx_ref, delete t.phx_ref, delete t.phx_ref_prev, t))
  }

  function ait(e) {
    return JSON.parse(JSON.stringify(e))
  }

  function sit(e) {
    return (e == null ? void 0 : e.events) && {
      events: e.events
    }
  }

  function Jhe(e) {
    return e != null && e.metas ? G4(e) : []
  }
  var nM;
  (function(e) {
    e.SYNC = "sync", e.JOIN = "join", e.LEAVE = "leave"
  })(nM || (nM = {}));
  var q1 = class {
    get state() {
      return this.presenceAdapter.state
    }
    constructor(t, r) {
      this.channel = t, this.presenceAdapter = new Qb(this.channel.channelAdapter, r)
    }
  };

  function Zhe(e) {
    if (e instanceof Error) return e;
    if (typeof e == "string") return new Error(e);
    if (e && typeof e == "object") {
      let t = e;
      if (typeof t.code == "number") {
        let r = typeof t.reason == "string" && t.reason ? ` (${t.reason})` : "";
        return new Error(`socket closed: ${t.code}${r}`, {
          cause: e
        })
      }
      return new Error("channel error: transport failure", {
        cause: e
      })
    }
    return new Error("channel error: connection lost")
  }
  var Hb = class {
    constructor(t, r, n) {
      let i = oit(n);
      this.channel = t.getSocket().channel(r, i), this.socket = t
    }
    get state() {
      return this.channel.state
    }
    set state(t) {
      this.channel.state = t
    }
    get joinedOnce() {
      return this.channel.joinedOnce
    }
    get joinPush() {
      return this.channel.joinPush
    }
    get rejoinTimer() {
      return this.channel.rejoinTimer
    }
    on(t, r) {
      return this.channel.on(t, r)
    }
    off(t, r) {
      this.channel.off(t, r)
    }
    subscribe(t) {
      return this.channel.join(t)
    }
    unsubscribe(t) {
      return this.channel.leave(t)
    }
    teardown() {
      this.channel.teardown()
    }
    onClose(t) {
      this.channel.onClose(t)
    }
    onError(t) {
      return this.channel.onError(t)
    }
    push(t, r, n) {
      let i;
      try {
        i = this.channel.push(t, r, n)
      } catch (a) {
        throw new Error(`tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)
      }
      if (this.channel.pushBuffer.length > Vhe) {
        let a = this.channel.pushBuffer.shift();
        a.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${a.event}`, a.payload())
      }
      return i
    }
    updateJoinPayload(t) {
      let r = this.channel.joinPush.payload();
      this.channel.joinPush.payload = () => Object.assign(Object.assign({}, r), t)
    }
    canPush() {
      return this.socket.isConnected() && this.state === Lc.joined
    }
    isJoined() {
      return this.state === Lc.joined
    }
    isJoining() {
      return this.state === Lc.joining
    }
    isClosed() {
      return this.state === Lc.closed
    }
    isLeaving() {
      return this.state === Lc.leaving
    }
    updateFilterBindings(t) {
      this.channel.filterBindings = t
    }
    updatePayloadTransform(t) {
      this.channel.onMessage = t
    }
    getChannel() {
      return this.channel
    }
  };

  function oit(e) {
    return {
      config: Object.assign({
        broadcast: {
          ack: !1,
          self: !1
        },
        presence: {
          key: "",
          enabled: !1
        },
        private: !1
      }, e.config)
    }
  }
  var iM;
  (function(e) {
    e.ALL = "*", e.INSERT = "INSERT", e.UPDATE = "UPDATE", e.DELETE = "DELETE"
  })(iM || (iM = {}));
  var Kp;
  (function(e) {
    e.BROADCAST = "broadcast", e.PRESENCE = "presence", e.POSTGRES_CHANGES = "postgres_changes", e.SYSTEM = "system"
  })(Kp || (Kp = {}));
  var Dc;
  (function(e) {
    e.SUBSCRIBED = "SUBSCRIBED", e.TIMED_OUT = "TIMED_OUT", e.CLOSED = "CLOSED", e.CHANNEL_ERROR = "CHANNEL_ERROR"
  })(Dc || (Dc = {}));
  var K1 = class e {
    get state() {
      return this.channelAdapter.state
    }
    set state(t) {
      this.channelAdapter.state = t
    }
    get joinedOnce() {
      return this.channelAdapter.joinedOnce
    }
    get timeout() {
      return this.socket.timeout
    }
    get joinPush() {
      return this.channelAdapter.joinPush
    }
    get rejoinTimer() {
      return this.channelAdapter.rejoinTimer
    }
    constructor(t, r = {
      config: {}
    }, n) {
      var i, a;
      if (this.topic = t, this.params = r, this.socket = n, this.bindings = {}, this.subTopic = t.replace(/^realtime:/i, ""), this.params.config = Object.assign({
          broadcast: {
            ack: !1,
            self: !1
          },
          presence: {
            key: "",
            enabled: !1
          },
          private: !1
        }, r.config), this.channelAdapter = new Hb(this.socket.socketAdapter, t, this.params), this.presence = new q1(this), this._onClose(() => {
          this.socket._remove(this)
        }), this._updateFilterTransform(), this.broadcastEndpointURL = j4(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || !1, !this.private && (!((a = (i = this.params.config) === null || i === void 0 ? void 0 : i.broadcast) === null || a === void 0) && a.replay)) throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)
    }
    subscribe(t, r = this.timeout) {
      var n, i, a;
      if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
        let {
          config: {
            broadcast: s,
            presence: o,
            private: l
          }
        } = this.params, A = (i = (n = this.bindings.postgres_changes) === null || n === void 0 ? void 0 : n.map(h => h.filter)) !== null && i !== void 0 ? i : [], u = !!this.bindings[Kp.PRESENCE] && this.bindings[Kp.PRESENCE].length > 0 || ((a = this.params.config.presence) === null || a === void 0 ? void 0 : a.enabled) === !0, c = {}, f = {
          broadcast: s,
          presence: Object.assign(Object.assign({}, o), {
            enabled: u
          }),
          postgres_changes: A,
          private: l
        };
        this.socket.accessTokenValue && (c.access_token = this.socket.accessTokenValue), this._onError(h => {
          t == null || t(Dc.CHANNEL_ERROR, Zhe(h))
        }), this._onClose(() => t == null ? void 0 : t(Dc.CLOSED)), this.updateJoinPayload(Object.assign({
          config: f
        }, c)), this._updateFilterMessage(), this.channelAdapter.subscribe(r).receive("ok", async ({
          postgres_changes: h
        }) => {
          if (this.socket._isManualToken() || this.socket.setAuth(), h === void 0) {
            t == null || t(Dc.SUBSCRIBED);
            return
          }
          this._updatePostgresBindings(h, t)
        }).receive("error", h => {
          this.state = Lc.errored;
          let p = Object.values(h).join(", ") || "error";
          t == null || t(Dc.CHANNEL_ERROR, new Error(p, {
            cause: h
          }))
        }).receive("timeout", () => {
          t == null || t(Dc.TIMED_OUT)
        })
      }
      return this
    }
    _updatePostgresBindings(t, r) {
      var n;
      let i = this.bindings.postgres_changes,
        a = (n = i == null ? void 0 : i.length) !== null && n !== void 0 ? n : 0,
        s = [];
      for (let o = 0; o < a; o++) {
        let l = i[o],
          {
            filter: {
              event: A,
              schema: u,
              table: c,
              filter: f
            }
          } = l,
          h = t && t[o];
        if (h && h.event === A && e.isFilterValueEqual(h.schema, u) && e.isFilterValueEqual(h.table, c) && e.isFilterValueEqual(h.filter, f)) s.push(Object.assign(Object.assign({}, l), {
          id: h.id
        }));
        else {
          this.unsubscribe(), this.state = Lc.errored, r == null || r(Dc.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
          return
        }
      }
      this.bindings.postgres_changes = s, this.state != Lc.errored && r && r(Dc.SUBSCRIBED)
    }
    presenceState() {
      return this.presence.state
    }
    async track(t, r = {}) {
      return await this.send({
        type: "presence",
        event: "track",
        payload: t
      }, r.timeout || this.timeout)
    }
    async untrack(t = {}) {
      return await this.send({
        type: "presence",
        event: "untrack"
      }, t)
    }
    on(t, r, n) {
      let i = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(),
        a = t === Kp.PRESENCE || t === Kp.POSTGRES_CHANGES;
      if (i && a) throw this.socket.log("channel", `cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`), new Error(`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`);
      return this._on(t, r, n)
    }
    async httpSend(t, r, n = {}) {
      var i;
      if (r == null) return Promise.reject(new Error("Payload is required for httpSend()"));
      let a = r instanceof ArrayBuffer || ArrayBuffer.isView(r),
        s = {
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": a ? "application/octet-stream" : "application/json"
        };
      this.socket.accessTokenValue && (s.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      let o = new URL(this.broadcastEndpointURL);
      o.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(t)}`, this.private && o.searchParams.set("private", "true");
      let l = {
          method: "POST",
          headers: s,
          body: a ? r : JSON.stringify(r)
        },
        A = await this._fetchWithTimeout(o.toString(), l, (i = n.timeout) !== null && i !== void 0 ? i : this.timeout);
      if (A.status === 202) return {
        success: !0
      };
      let u = A.statusText;
      try {
        let c = await A.json();
        u = c.error || c.message || u
      } catch (c) {}
      return Promise.reject(new Error(u))
    }
    async send(t, r = {}) {
      var n, i;
      if (!this.channelAdapter.canPush() && t.type === "broadcast") {
        console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
        let {
          event: a,
          payload: s
        } = t, o = {
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        };
        this.socket.accessTokenValue && (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
        let l = {
          method: "POST",
          headers: o,
          body: JSON.stringify({
            messages: [{
              topic: this.subTopic,
              event: a,
              payload: s,
              private: this.private
            }]
          })
        };
        try {
          let A = await this._fetchWithTimeout(this.broadcastEndpointURL, l, (n = r.timeout) !== null && n !== void 0 ? n : this.timeout);
          return await ((i = A.body) === null || i === void 0 ? void 0 : i.cancel()), A.ok ? "ok" : "error"
        } catch (A) {
          return A instanceof Error && A.name === "AbortError" ? "timed out" : "error"
        }
      } else return new Promise(a => {
        var s, o, l;
        let A = this.channelAdapter.push(t.type, t, r.timeout || this.timeout);
        t.type === "broadcast" && !(!((l = (o = (s = this.params) === null || s === void 0 ? void 0 : s.config) === null || o === void 0 ? void 0 : o.broadcast) === null || l === void 0) && l.ack) && a("ok"), A.receive("ok", () => a("ok")), A.receive("error", () => a("error")), A.receive("timeout", () => a("timed out"))
      })
    }
    updateJoinPayload(t) {
      this.channelAdapter.updateJoinPayload(t)
    }
    async unsubscribe(t = this.timeout) {
      return new Promise(r => {
        this.channelAdapter.unsubscribe(t).receive("ok", () => r("ok")).receive("timeout", () => r("timed out")).receive("error", () => r("error"))
      })
    }
    teardown() {
      this.channelAdapter.teardown()
    }
    async _fetchWithTimeout(t, r, n) {
      let i = new AbortController,
        a = setTimeout(() => i.abort(), n),
        s = await this.socket.fetch(t, Object.assign(Object.assign({}, r), {
          signal: i.signal
        }));
      return clearTimeout(a), s
    }
    _on(t, r, n) {
      let i = t.toLocaleLowerCase(),
        a = this.channelAdapter.on(t, n),
        s = {
          type: i,
          filter: r,
          callback: n,
          ref: a
        };
      return this.bindings[i] ? this.bindings[i].push(s) : this.bindings[i] = [s], this._updateFilterMessage(), this
    }
    _onClose(t) {
      this.channelAdapter.onClose(t)
    }
    _onError(t) {
      this.channelAdapter.onError(t)
    }
    _updateFilterMessage() {
      this.channelAdapter.updateFilterBindings((t, r, n) => {
        var i, a, s, o, l, A, u;
        let c = t.event.toLocaleLowerCase();
        if (this._notThisChannelEvent(c, n)) return !1;
        let f = (i = this.bindings[c]) === null || i === void 0 ? void 0 : i.find(h => h.ref === t.ref);
        if (!f) return !0;
        if (["broadcast", "presence", "postgres_changes"].includes(c))
          if ("id" in f) {
            let h = f.id,
              p = (a = f.filter) === null || a === void 0 ? void 0 : a.event;
            return h && ((s = r.ids) === null || s === void 0 ? void 0 : s.includes(h)) && (p === "*" || (p == null ? void 0 : p.toLocaleLowerCase()) === ((o = r.data) === null || o === void 0 ? void 0 : o.type.toLocaleLowerCase()))
          } else {
            let h = (A = (l = f == null ? void 0 : f.filter) === null || l === void 0 ? void 0 : l.event) === null || A === void 0 ? void 0 : A.toLocaleLowerCase();
            return h === "*" || h === ((u = r == null ? void 0 : r.event) === null || u === void 0 ? void 0 : u.toLocaleLowerCase())
          }
        else return f.type.toLocaleLowerCase() === c
      })
    }
    _notThisChannelEvent(t, r) {
      let {
        close: n,
        error: i,
        leave: a,
        join: s
      } = H4;
      return r && [n, i, a, s].includes(t) && r !== this.joinPush.ref
    }
    _updateFilterTransform() {
      this.channelAdapter.updatePayloadTransform((t, r, n) => {
        if (typeof r == "object" && "ids" in r) {
          let i = r.data,
            {
              schema: a,
              table: s,
              commit_timestamp: o,
              type: l,
              errors: A
            } = i;
          return Object.assign(Object.assign({}, {
            schema: a,
            table: s,
            commit_timestamp: o,
            eventType: l,
            new: {},
            old: {},
            errors: A
          }), this._getPayloadRecords(i))
        }
        return r
      })
    }
    copyBindings(t) {
      if (this.joinedOnce) throw new Error("cannot copy bindings into joined channel");
      for (let r in t.bindings)
        for (let n of t.bindings[r]) this._on(n.type, n.filter, n.callback)
    }
    static isFilterValueEqual(t, r) {
      let n = t != null ? t : void 0,
        i = r != null ? r : void 0;
      return n === i
    }
    _getPayloadRecords(t) {
      let r = {
        new: {},
        old: {}
      };
      return (t.type === "INSERT" || t.type === "UPDATE") && (r.new = eM(t.columns, t.record)), (t.type === "UPDATE" || t.type === "DELETE") && (r.old = eM(t.columns, t.old_record)), r
    }
  };
  var jb = class {
    constructor(t, r) {
      this.socket = new Yhe(t, r)
    }
    get timeout() {
      return this.socket.timeout
    }
    get endPoint() {
      return this.socket.endPoint
    }
    get transport() {
      return this.socket.transport
    }
    get heartbeatIntervalMs() {
      return this.socket.heartbeatIntervalMs
    }
    get heartbeatCallback() {
      return this.socket.heartbeatCallback
    }
    set heartbeatCallback(t) {
      this.socket.heartbeatCallback = t
    }
    get heartbeatTimer() {
      return this.socket.heartbeatTimer
    }
    get pendingHeartbeatRef() {
      return this.socket.pendingHeartbeatRef
    }
    get reconnectTimer() {
      return this.socket.reconnectTimer
    }
    get vsn() {
      return this.socket.vsn
    }
    get encode() {
      return this.socket.encode
    }
    get decode() {
      return this.socket.decode
    }
    get reconnectAfterMs() {
      return this.socket.reconnectAfterMs
    }
    get sendBuffer() {
      return this.socket.sendBuffer
    }
    get stateChangeCallbacks() {
      return this.socket.stateChangeCallbacks
    }
    connect() {
      this.socket.connect()
    }
    disconnect(t, r, n, i = 1e4) {
      return new Promise(a => {
        setTimeout(() => a("timeout"), i), this.socket.disconnect(() => {
          t(), a("ok")
        }, r, n)
      })
    }
    push(t) {
      this.socket.push(t)
    }
    log(t, r, n) {
      this.socket.log(t, r, n)
    }
    makeRef() {
      return this.socket.makeRef()
    }
    onOpen(t) {
      this.socket.onOpen(t)
    }
    onClose(t) {
      this.socket.onClose(t)
    }
    onError(t) {
      this.socket.onError(t)
    }
    onMessage(t) {
      this.socket.onMessage(t)
    }
    isConnected() {
      return this.socket.isConnected()
    }
    isConnecting() {
      return this.socket.connectionState() == Ub.connecting
    }
    isDisconnecting() {
      return this.socket.connectionState() == Ub.closing
    }
    connectionState() {
      return this.socket.connectionState()
    }
    endPointURL() {
      return this.socket.endPointURL()
    }
    sendHeartbeat() {
      this.socket.sendHeartbeat()
    }
    getSocket() {
      return this.socket
    }
  };
  var ede = {
      HEARTBEAT_INTERVAL: 25e3,
      RECONNECT_DELAY: 10,
      HEARTBEAT_TIMEOUT_FALLBACK: 100
    },
    lit = [1e3, 2e3, 5e3, 1e4],
    Ait = 1e4;

  function uit() {
    let e = new Map;
    return {
      get length() {
        return e.size
      },
      clear() {
        e.clear()
      },
      getItem(t) {
        return e.has(t) ? e.get(t) : null
      },
      key(t) {
        var r;
        return (r = Array.from(e.keys())[t]) !== null && r !== void 0 ? r : null
      },
      removeItem(t) {
        e.delete(t)
      },
      setItem(t, r) {
        e.set(t, String(r))
      }
    }
  }

  function cit() {
    try {
      if (typeof globalThis != "undefined" && globalThis.sessionStorage) return globalThis.sessionStorage
    } catch (e) {}
    return uit()
  }
  var fit = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
    W1 = class {
      get endPoint() {
        return this.socketAdapter.endPoint
      }
      get timeout() {
        return this.socketAdapter.timeout
      }
      get transport() {
        return this.socketAdapter.transport
      }
      get heartbeatCallback() {
        return this.socketAdapter.heartbeatCallback
      }
      get heartbeatIntervalMs() {
        return this.socketAdapter.heartbeatIntervalMs
      }
      get heartbeatTimer() {
        return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer
      }
      get pendingHeartbeatRef() {
        return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef
      }
      get reconnectTimer() {
        return this.socketAdapter.reconnectTimer
      }
      get vsn() {
        return this.socketAdapter.vsn
      }
      get encode() {
        return this.socketAdapter.encode
      }
      get decode() {
        return this.socketAdapter.decode
      }
      get reconnectAfterMs() {
        return this.socketAdapter.reconnectAfterMs
      }
      get sendBuffer() {
        return this.socketAdapter.sendBuffer
      }
      get stateChangeCallbacks() {
        return this.socketAdapter.stateChangeCallbacks
      }
      constructor(t, r) {
        var n;
        if (this.channels = new Array, this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new Rb, this._manuallySetToken = !1, this._authPromise = null, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = a => a ? (...s) => a(...s) : (...s) => fetch(...s), !(!((n = r == null ? void 0 : r.params) === null || n === void 0) && n.apikey)) throw new Error("API key is required to connect to Realtime");
        this.apiKey = r.params.apikey;
        let i = this._initializeOptions(r);
        this.socketAdapter = new jb(t, i), this.httpEndpoint = j4(t), this.fetch = this._resolveFetch(r == null ? void 0 : r.fetch)
      }
      connect() {
        if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
          this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
          try {
            this.socketAdapter.connect()
          } catch (t) {
            let r = t.message;
            throw r.includes("Node.js") ? new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`) : new Error(`WebSocket not available: ${r}`)
          }
          this._handleNodeJsRaceCondition()
        }
      }
      endpointURL() {
        return this.socketAdapter.endPointURL()
      }
      async disconnect(t, r) {
        return this._cancelPendingDisconnect(), this.isDisconnecting() ? "ok" : await this.socketAdapter.disconnect(() => {
          clearInterval(this._workerHeartbeatTimer), this._terminateWorker()
        }, t, r)
      }
      getChannels() {
        return this.channels
      }
      async removeChannel(t) {
        let r = await t.unsubscribe();
        return r === "ok" && t.teardown(), r
      }
      async removeAllChannels() {
        let t = this.channels.map(async n => {
            let i = await n.unsubscribe();
            return n.teardown(), i
          }),
          r = await Promise.all(t);
        return await this.disconnect(), r
      }
      log(t, r, n) {
        this.socketAdapter.log(t, r, n)
      }
      connectionState() {
        return this.socketAdapter.connectionState() || Ub.closed
      }
      isConnected() {
        return this.socketAdapter.isConnected()
      }
      isConnecting() {
        return this.socketAdapter.isConnecting()
      }
      isDisconnecting() {
        return this.socketAdapter.isDisconnecting()
      }
      channel(t, r = {
        config: {}
      }) {
        let n = `realtime:${t}`,
          i = this.getChannels().find(a => a.topic === n);
        if (i) return i;
        {
          let a = new K1(`realtime:${t}`, r, this);
          return this._cancelPendingDisconnect(), this.channels.push(a), a
        }
      }
      push(t) {
        this.socketAdapter.push(t)
      }
      async setAuth(t = null) {
        this._authPromise = this._performAuth(t);
        try {
          await this._authPromise
        } finally {
          this._authPromise = null
        }
      }
      _isManualToken() {
        return this._manuallySetToken
      }
      async sendHeartbeat() {
        this.socketAdapter.sendHeartbeat()
      }
      onHeartbeat(t) {
        this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(t)
      }
      _makeRef() {
        return this.socketAdapter.makeRef()
      }
      _remove(t) {
        this.channels = this.channels.filter(r => r.topic !== t.topic), this.channels.length === 0 && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect())
      }
      _schedulePendingDisconnect() {
        if (this._cancelPendingDisconnect(), this._disconnectOnEmptyChannelsAfterMs === 0) {
          this.log("transport", "disconnecting immediately - no channels"), this.disconnect();
          return
        }
        this._pendingDisconnectTimer = setTimeout(() => {
          this._pendingDisconnectTimer = null, this.channels.length === 0 && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect())
        }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)
      }
      _cancelPendingDisconnect() {
        this._pendingDisconnectTimer !== null && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null)
      }
      async _performAuth(t = null) {
        let r, n = !1;
        if (t) r = t, n = !0;
        else if (this.accessToken) try {
          r = await this.accessToken()
        } catch (i) {
          this.log("error", "Error fetching access token from callback", i), r = this.accessTokenValue
        } else r = this.accessTokenValue;
        n ? this._manuallySetToken = !0 : this.accessToken && (this._manuallySetToken = !1), this.accessTokenValue != r && (this.accessTokenValue = r, this.channels.forEach(i => {
          let a = {
            access_token: r,
            version: qhe
          };
          r && i.updateJoinPayload(a), i.joinedOnce && i.channelAdapter.isJoined() && i.channelAdapter.push(H4.access_token, {
            access_token: r
          })
        }))
      }
      async _waitForAuthIfNeeded() {
        this._authPromise && await this._authPromise
      }
      _setAuthSafely(t = "general") {
        this._isManualToken() || this.setAuth().catch(r => {
          this.log("error", `Error setting auth in ${t}`, r)
        })
      }
      _setupConnectionHandlers() {
        this.socketAdapter.onOpen(() => {
          (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch(r => {
            this.log("error", "error waiting for auth on connect", r)
          }), this.worker && !this.workerRef && this._startWorkerHeartbeat()
        }), this.socketAdapter.onClose(() => {
          this.worker && this.workerRef && this._terminateWorker()
        }), this.socketAdapter.onMessage(t => {
          t.ref && t.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null)
        })
      }
      _handleNodeJsRaceCondition() {
        this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen()
      }
      _wrapHeartbeatCallback(t) {
        return (r, n) => {
          r == "sent" && this._setAuthSafely(), t && t(r, n)
        }
      }
      _startWorkerHeartbeat() {
        this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
        let t = this._workerObjectUrl(this.workerUrl);
        this.workerRef = new Worker(t), this.workerRef.onerror = r => {
          this.log("worker", "worker error", r.message), this._terminateWorker(), this.disconnect()
        }, this.workerRef.onmessage = r => {
          r.data.event === "keepAlive" && this.sendHeartbeat()
        }, this.workerRef.postMessage({
          event: "start",
          interval: this.heartbeatIntervalMs
        })
      }
      _terminateWorker() {
        this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0)
      }
      _workerObjectUrl(t) {
        let r;
        if (t) r = t;
        else {
          let n = new Blob([fit], {
            type: "application/javascript"
          });
          r = URL.createObjectURL(n)
        }
        return r
      }
      _initializeOptions(t) {
        var r, n, i, a, s, o, l, A, u, c, f, h;
        this.worker = (r = t == null ? void 0 : t.worker) !== null && r !== void 0 ? r : !1, this.accessToken = (n = t == null ? void 0 : t.accessToken) !== null && n !== void 0 ? n : null;
        let p = {};
        p.timeout = (i = t == null ? void 0 : t.timeout) !== null && i !== void 0 ? i : Ghe, p.heartbeatIntervalMs = (a = t == null ? void 0 : t.heartbeatIntervalMs) !== null && a !== void 0 ? a : ede.HEARTBEAT_INTERVAL, this._disconnectOnEmptyChannelsAfterMs = (s = t == null ? void 0 : t.disconnectOnEmptyChannelsAfterMs) !== null && s !== void 0 ? s : 2 * ((o = t == null ? void 0 : t.heartbeatIntervalMs) !== null && o !== void 0 ? o : ede.HEARTBEAT_INTERVAL), p.transport = (l = t == null ? void 0 : t.transport) !== null && l !== void 0 ? l : Y6.getWebSocketConstructor(), p.params = t == null ? void 0 : t.params, p.logger = t == null ? void 0 : t.logger, p.heartbeatCallback = this._wrapHeartbeatCallback(t == null ? void 0 : t.heartbeatCallback), p.sessionStorage = (A = t == null ? void 0 : t.sessionStorage) !== null && A !== void 0 ? A : cit(), p.reconnectAfterMs = (u = t == null ? void 0 : t.reconnectAfterMs) !== null && u !== void 0 ? u : v => lit[v - 1] || Ait;
        let d, g, m = (c = t == null ? void 0 : t.vsn) !== null && c !== void 0 ? c : Whe;
        switch (m) {
          case Khe:
            d = (v, y) => y(JSON.stringify(v)), g = (v, y) => y(JSON.parse(v));
            break;
          case J6:
            d = this.serializer.encode.bind(this.serializer), g = this.serializer.decode.bind(this.serializer);
            break;
          default:
            throw new Error(`Unsupported serializer version: ${p.vsn}`)
        }
        if (p.vsn = m, p.encode = (f = t == null ? void 0 : t.encode) !== null && f !== void 0 ? f : d, p.decode = (h = t == null ? void 0 : t.decode) !== null && h !== void 0 ? h : g, p.beforeReconnect = this._reconnectAuth.bind(this), (t != null && t.logLevel || t != null && t.log_level) && (this.logLevel = t.logLevel || t.log_level, p.params = Object.assign(Object.assign({}, p.params), {
            log_level: this.logLevel
          })), this.worker) {
          if (typeof window != "undefined" && !window.Worker) throw new Error("Web Worker is not supported");
          this.workerUrl = t == null ? void 0 : t.workerUrl, p.autoSendHeartbeat = !this.worker
        }
        return p
      }
      async _reconnectAuth() {
        await this._waitForAuthIfNeeded(), this.isConnected() || this.connect()
      }
    };
  var qb = class extends Error {
    constructor(e, t) {
      var r;
      super(e), this.name = "IcebergError", this.status = t.status, this.icebergType = t.icebergType, this.icebergCode = t.icebergCode, this.details = t.details, this.isCommitStateUnknown = t.icebergType === "CommitStateUnknownException" || [500, 502, 504].includes(t.status) && ((r = t.icebergType) == null ? void 0 : r.includes("CommitState")) === !0
    }
    isNotFound() {
      return this.status === 404
    }
    isConflict() {
      return this.status === 409
    }
    isAuthenticationTimeout() {
      return this.status === 419
    }
  };

  function hit(e, t, r) {
    let n = new URL(t, e);
    if (r)
      for (let [i, a] of Object.entries(r)) a !== void 0 && n.searchParams.set(i, a);
    return n.toString()
  }
  async function dit(e) {
    return !e || e.type === "none" ? {} : e.type === "bearer" ? {
      Authorization: `Bearer ${e.token}`
    } : e.type === "header" ? {
      [e.name]: e.value
    } : e.type === "custom" ? await e.getHeaders() : {}
  }

  function pit(e) {
    var r;
    let t = (r = e.fetchImpl) != null ? r : globalThis.fetch;
    return {
      async request({
        method: n,
        path: i,
        query: a,
        body: s,
        headers: o
      }) {
        var p;
        let l = hit(e.baseUrl, i, a),
          A = await dit(e.auth),
          u = await t(l, {
            method: n,
            headers: {
              ...s ? {
                "Content-Type": "application/json"
              } : {},
              ...A,
              ...o
            },
            body: s ? JSON.stringify(s) : void 0
          }),
          c = await u.text(),
          f = (u.headers.get("content-type") || "").includes("application/json"),
          h = f && c ? JSON.parse(c) : c;
        if (!u.ok) {
          let d = f ? h : void 0,
            g = d == null ? void 0 : d.error;
          throw new qb((p = g == null ? void 0 : g.message) != null ? p : `Request failed with status ${u.status}`, {
            status: u.status,
            icebergType: g == null ? void 0 : g.type,
            icebergCode: g == null ? void 0 : g.code,
            details: d
          })
        }
        return {
          status: u.status,
          headers: u.headers,
          data: h
        }
      }
    }
  }

  function V4(e) {
    return e.join("")
  }
  var git = class {
    constructor(e, t = "") {
      this.client = e, this.prefix = t
    }
    async listNamespaces(e) {
      let t = e ? {
        parent: V4(e.namespace)
      } : void 0;
      return (await this.client.request({
        method: "GET",
        path: `${this.prefix}/namespaces`,
        query: t
      })).data.namespaces.map(n => ({
        namespace: n
      }))
    }
    async createNamespace(e, t) {
      let r = {
        namespace: e.namespace,
        properties: t == null ? void 0 : t.properties
      };
      return (await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces`,
        body: r
      })).data
    }
    async dropNamespace(e) {
      await this.client.request({
        method: "DELETE",
        path: `${this.prefix}/namespaces/${V4(e.namespace)}`
      })
    }
    async loadNamespaceMetadata(e) {
      return {
        properties: (await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${V4(e.namespace)}`
        })).data.properties
      }
    }
    async namespaceExists(e) {
      try {
        return await this.client.request({
          method: "HEAD",
          path: `${this.prefix}/namespaces/${V4(e.namespace)}`
        }), !0
      } catch (t) {
        if (t instanceof qb && t.status === 404) return !1;
        throw t
      }
    }
    async createNamespaceIfNotExists(e, t) {
      try {
        return await this.createNamespace(e, t)
      } catch (r) {
        if (r instanceof qb && r.status === 409) return;
        throw r
      }
    }
  };

  function G1(e) {
    return e.join("")
  }
  var mit = class {
      constructor(e, t = "", r) {
        this.client = e, this.prefix = t, this.accessDelegation = r
      }
      async listTables(e) {
        return (await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables`
        })).data.identifiers
      }
      async createTable(e, t) {
        let r = {};
        return this.accessDelegation && (r["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
          method: "POST",
          path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables`,
          body: t,
          headers: r
        })).data.metadata
      }
      async updateTable(e, t) {
        let r = await this.client.request({
          method: "POST",
          path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables/${e.name}`,
          body: t
        });
        return {
          "metadata-location": r.data["metadata-location"],
          metadata: r.data.metadata
        }
      }
      async dropTable(e, t) {
        var r;
        await this.client.request({
          method: "DELETE",
          path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables/${e.name}`,
          query: {
            purgeRequested: String((r = t == null ? void 0 : t.purge) != null ? r : !1)
          }
        })
      }
      async loadTable(e) {
        let t = {};
        return this.accessDelegation && (t["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables/${e.name}`,
          headers: t
        })).data.metadata
      }
      async tableExists(e) {
        let t = {};
        this.accessDelegation && (t["X-Iceberg-Access-Delegation"] = this.accessDelegation);
        try {
          return await this.client.request({
            method: "HEAD",
            path: `${this.prefix}/namespaces/${G1(e.namespace)}/tables/${e.name}`,
            headers: t
          }), !0
        } catch (r) {
          if (r instanceof qb && r.status === 404) return !1;
          throw r
        }
      }
      async createTableIfNotExists(e, t) {
        try {
          return await this.createTable(e, t)
        } catch (r) {
          if (r instanceof qb && r.status === 409) return await this.loadTable({
            namespace: e.namespace,
            name: t.name
          });
          throw r
        }
      }
    },
    tde = class {
      constructor(e) {
        var n;
        let t = "v1";
        e.catalogName && (t += `/${e.catalogName}`);
        let r = e.baseUrl.endsWith("/") ? e.baseUrl : `${e.baseUrl}/`;
        this.client = pit({
          baseUrl: r,
          auth: e.auth,
          fetchImpl: e.fetch
        }), this.accessDelegation = (n = e.accessDelegation) == null ? void 0 : n.join(","), this.namespaceOps = new git(this.client, t), this.tableOps = new mit(this.client, t, this.accessDelegation)
      }
      async listNamespaces(e) {
        return this.namespaceOps.listNamespaces(e)
      }
      async createNamespace(e, t) {
        return this.namespaceOps.createNamespace(e, t)
      }
      async dropNamespace(e) {
        await this.namespaceOps.dropNamespace(e)
      }
      async loadNamespaceMetadata(e) {
        return this.namespaceOps.loadNamespaceMetadata(e)
      }
      async listTables(e) {
        return this.tableOps.listTables(e)
      }
      async createTable(e, t) {
        return this.tableOps.createTable(e, t)
      }
      async updateTable(e, t) {
        return this.tableOps.updateTable(e, t)
      }
      async dropTable(e, t) {
        await this.tableOps.dropTable(e, t)
      }
      async loadTable(e) {
        return this.tableOps.loadTable(e)
      }
      async namespaceExists(e) {
        return this.namespaceOps.namespaceExists(e)
      }
      async tableExists(e) {
        return this.tableOps.tableExists(e)
      }
      async createNamespaceIfNotExists(e, t) {
        return this.namespaceOps.createNamespaceIfNotExists(e, t)
      }
      async createTableIfNotExists(e, t) {
        return this.tableOps.createTableIfNotExists(e, t)
      }
    };

  function Wb(e) {
    "@babel/helpers - typeof";
    return Wb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Wb(e)
  }

  function vit(e, t) {
    if (Wb(e) != "object" || !e) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t || "default");
      if (Wb(n) != "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (t === "string" ? String : Number)(e)
  }

  function yit(e) {
    var t = vit(e, "string");
    return Wb(t) == "symbol" ? t : t + ""
  }

  function wit(e, t, r) {
    return (t = yit(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e
  }

  function rde(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })), r.push.apply(r, n)
    }
    return r
  }

  function xr(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? rde(Object(r), !0).forEach(function(n) {
        wit(e, n, r[n])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rde(Object(r)).forEach(function(n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
      })
    }
    return e
  }
  var X4 = class extends Error {
    constructor(e, t = "storage", r, n) {
      super(e), this.__isStorageError = !0, this.namespace = t, this.name = t === "vectors" ? "StorageVectorsError" : "StorageError", this.status = r, this.statusCode = n
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        statusCode: this.statusCode
      }
    }
  };

  function Y4(e) {
    return typeof e == "object" && e !== null && "__isStorageError" in e
  }
  var z4 = class extends X4 {
      constructor(e, t, r, n = "storage") {
        super(e, n, t, r), this.name = n === "vectors" ? "StorageVectorsApiError" : "StorageApiError", this.status = t, this.statusCode = r
      }
      toJSON() {
        return xr({}, super.toJSON())
      }
    },
    ade = class extends X4 {
      constructor(e, t, r = "storage") {
        super(e, r), this.name = r === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = t
      }
    };

  function $4(e, t, r) {
    let n = xr({}, e),
      i = t.toLowerCase();
    for (let a of Object.keys(n)) a.toLowerCase() === i && delete n[a];
    return n[i] = r, n
  }

  function xit(e) {
    let t = {};
    for (let [r, n] of Object.entries(e)) t[r.toLowerCase()] = n;
    return t
  }
  var bit = e => e ? (...t) => e(...t) : (...t) => fetch(...t),
    Bit = e => {
      if (typeof e != "object" || e === null) return !1;
      let t = Object.getPrototypeOf(e);
      return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    },
    aM = e => {
      if (Array.isArray(e)) return e.map(r => aM(r));
      if (typeof e == "function" || e !== Object(e)) return e;
      let t = {};
      return Object.entries(e).forEach(([r, n]) => {
        let i = r.replace(/([-_][a-z])/gi, a => a.toUpperCase().replace(/[-_]/g, ""));
        t[i] = aM(n)
      }), t
    },
    _it = e => !e || typeof e != "string" || e.length === 0 || e.length > 100 || e.trim() !== e || e.includes("/") || e.includes("\\") ? !1 : /^[\w!.\*'() &$@=;:+,?-]+$/.test(e),
    nde = e => {
      if (typeof e == "object" && e !== null) {
        let t = e;
        if (typeof t.msg == "string") return t.msg;
        if (typeof t.message == "string") return t.message;
        if (typeof t.error_description == "string") return t.error_description;
        if (typeof t.error == "string") return t.error;
        if (typeof t.error == "object" && t.error !== null) {
          let r = t.error;
          if (typeof r.message == "string") return r.message
        }
      }
      return JSON.stringify(e)
    },
    Sit = async (e, t, r, n) => {
      if (e !== null && typeof e == "object" && "json" in e && typeof e.json == "function") {
        let i = e,
          a = parseInt(String(i.status), 10);
        Number.isFinite(a) || (a = 500), i.json().then(s => {
          let o = (s == null ? void 0 : s.statusCode) || (s == null ? void 0 : s.code) || a + "";
          t(new z4(nde(s), a, o, n))
        }).catch(() => {
          let s = a + "";
          t(new z4(i.statusText || `HTTP ${a} error`, a, s, n))
        })
      } else t(new ade(nde(e), e, n))
    }, Cit = (e, t, r, n) => {
      let i = {
        method: e,
        headers: (t == null ? void 0 : t.headers) || {}
      };
      if (e === "GET" || e === "HEAD" || !n) return xr(xr({}, i), r);
      if (Bit(n)) {
        var a;
        let s = (t == null ? void 0 : t.headers) || {},
          o;
        for (let [l, A] of Object.entries(s)) l.toLowerCase() === "content-type" && (o = A);
        i.headers = $4(s, "Content-Type", (a = o) !== null && a !== void 0 ? a : "application/json"), i.body = JSON.stringify(n)
      } else i.body = n;
      return t != null && t.duplex && (i.duplex = t.duplex), xr(xr({}, i), r)
    };
  async function Kb(e, t, r, n, i, a, s) {
    return new Promise((o, l) => {
      e(r, Cit(t, n, i, a)).then(A => {
        if (!A.ok) throw A;
        if (n != null && n.noResolveJson) return A;
        if (s === "vectors") {
          let u = A.headers.get("content-type");
          if (A.headers.get("content-length") === "0" || A.status === 204) return {};
          if (!u || !u.includes("application/json")) return {}
        }
        return A.json()
      }).then(A => o(A)).catch(A => Sit(A, l, n, s))
    })
  }

  function sde(e = "storage") {
    return {
      get: async (t, r, n, i) => Kb(t, "GET", r, n, i, void 0, e),
      post: async (t, r, n, i, a) => Kb(t, "POST", r, i, a, n, e),
      put: async (t, r, n, i, a) => Kb(t, "PUT", r, i, a, n, e),
      head: async (t, r, n, i) => Kb(t, "HEAD", r, xr(xr({}, n), {}, {
        noResolveJson: !0
      }), i, void 0, e),
      remove: async (t, r, n, i, a) => Kb(t, "DELETE", r, i, a, n, e)
    }
  }
  var Eit = sde("storage"),
    {
      get: Gb,
      post: Uu,
      put: sM,
      head: Tit,
      remove: oM
    } = Eit,
    $l = sde("vectors"),
    V1 = class {
      constructor(e, t = {}, r, n = "storage") {
        this.shouldThrowOnError = !1, this.url = e, this.headers = xit(t), this.fetch = bit(r), this.namespace = n
      }
      throwOnError() {
        return this.shouldThrowOnError = !0, this
      }
      setHeader(e, t) {
        return this.headers = $4(this.headers, e, t), this
      }
      async handleOperation(e) {
        var t = this;
        try {
          return {
            data: await e(),
            error: null
          }
        } catch (r) {
          if (t.shouldThrowOnError) throw r;
          if (Y4(r)) return {
            data: null,
            error: r
          };
          throw r
        }
      }
    },
    ode;
  ode = Symbol.toStringTag;
  var kit = class {
      constructor(e, t) {
        this.downloadFn = e, this.shouldThrowOnError = t, this[ode] = "StreamDownloadBuilder", this.promise = null
      }
      then(e, t) {
        return this.getPromise().then(e, t)
      } catch (e) {
        return this.getPromise().catch(e)
      } finally(e) {
        return this.getPromise().finally(e)
      }
      getPromise() {
        return this.promise || (this.promise = this.execute()), this.promise
      }
      async execute() {
        var e = this;
        try {
          return {
            data: (await e.downloadFn()).body,
            error: null
          }
        } catch (t) {
          if (e.shouldThrowOnError) throw t;
          if (Y4(t)) return {
            data: null,
            error: t
          };
          throw t
        }
      }
    },
    lde;
  lde = Symbol.toStringTag;
  var Fit = class {
      constructor(e, t) {
        this.downloadFn = e, this.shouldThrowOnError = t, this[lde] = "BlobDownloadBuilder", this.promise = null
      }
      asStream() {
        return new kit(this.downloadFn, this.shouldThrowOnError)
      }
      then(e, t) {
        return this.getPromise().then(e, t)
      } catch (e) {
        return this.getPromise().catch(e)
      } finally(e) {
        return this.getPromise().finally(e)
      }
      getPromise() {
        return this.promise || (this.promise = this.execute()), this.promise
      }
      async execute() {
        var e = this;
        try {
          return {
            data: await (await e.downloadFn()).blob(),
            error: null
          }
        } catch (t) {
          if (e.shouldThrowOnError) throw t;
          if (Y4(t)) return {
            data: null,
            error: t
          };
          throw t
        }
      }
    },
    Oit = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    },
    ide = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: !1
    },
    Nit = class extends V1 {
      constructor(e, t = {}, r, n) {
        super(e, t, n, "storage"), this.bucketId = r
      }
      async uploadOrUpdate(e, t, r, n) {
        var i = this;
        return i.handleOperation(async () => {
          let a, s = xr(xr({}, ide), n),
            o = xr(xr({}, i.headers), e === "POST" && {
              "x-upsert": String(s.upsert)
            }),
            l = s.metadata;
          if (typeof Blob != "undefined" && r instanceof Blob ? (a = new FormData, a.append("cacheControl", s.cacheControl), l && a.append("metadata", i.encodeMetadata(l)), a.append("", r)) : typeof FormData != "undefined" && r instanceof FormData ? (a = r, a.has("cacheControl") || a.append("cacheControl", s.cacheControl), l && !a.has("metadata") && a.append("metadata", i.encodeMetadata(l))) : (a = r, o["cache-control"] = `max-age=${s.cacheControl}`, o["content-type"] = s.contentType, l && (o["x-metadata"] = i.toBase64(i.encodeMetadata(l))), (typeof ReadableStream != "undefined" && a instanceof ReadableStream || a && typeof a == "object" && "pipe" in a && typeof a.pipe == "function") && !s.duplex && (s.duplex = "half")), n != null && n.headers)
            for (let [f, h] of Object.entries(n.headers)) o = $4(o, f, h);
          let A = i._removeEmptyFolders(t),
            u = i._getFinalPath(A),
            c = await (e == "PUT" ? sM : Uu)(i.fetch, `${i.url}/object/${u}`, a, xr({
              headers: o
            }, s != null && s.duplex ? {
              duplex: s.duplex
            } : {}));
          return {
            path: A,
            id: c.Id,
            fullPath: c.Key
          }
        })
      }
      async upload(e, t, r) {
        return this.uploadOrUpdate("POST", e, t, r)
      }
      async uploadToSignedUrl(e, t, r, n) {
        var i = this;
        let a = i._removeEmptyFolders(e),
          s = i._getFinalPath(a),
          o = new URL(i.url + `/object/upload/sign/${s}`);
        return o.searchParams.set("token", t), i.handleOperation(async () => {
          let l, A = xr(xr({}, ide), n),
            u = xr(xr({}, i.headers), {
              "x-upsert": String(A.upsert)
            }),
            c = A.metadata;
          if (typeof Blob != "undefined" && r instanceof Blob ? (l = new FormData, l.append("cacheControl", A.cacheControl), c && l.append("metadata", i.encodeMetadata(c)), l.append("", r)) : typeof FormData != "undefined" && r instanceof FormData ? (l = r, l.has("cacheControl") || l.append("cacheControl", A.cacheControl), c && !l.has("metadata") && l.append("metadata", i.encodeMetadata(c))) : (l = r, u["cache-control"] = `max-age=${A.cacheControl}`, u["content-type"] = A.contentType, c && (u["x-metadata"] = i.toBase64(i.encodeMetadata(c))), (typeof ReadableStream != "undefined" && l instanceof ReadableStream || l && typeof l == "object" && "pipe" in l && typeof l.pipe == "function") && !A.duplex && (A.duplex = "half")), n != null && n.headers)
            for (let [f, h] of Object.entries(n.headers)) u = $4(u, f, h);
          return {
            path: a,
            fullPath: (await sM(i.fetch, o.toString(), l, xr({
              headers: u
            }, A != null && A.duplex ? {
              duplex: A.duplex
            } : {}))).Key
          }
        })
      }
      async createSignedUploadUrl(e, t) {
        var r = this;
        return r.handleOperation(async () => {
          let n = r._getFinalPath(e),
            i = xr({}, r.headers);
          t != null && t.upsert && (i["x-upsert"] = "true");
          let a = await Uu(r.fetch, `${r.url}/object/upload/sign/${n}`, {}, {
              headers: i
            }),
            s = new URL(r.url + a.url),
            o = s.searchParams.get("token");
          if (!o) throw new X4("No token returned by API");
          return {
            signedUrl: s.toString(),
            path: e,
            token: o
          }
        })
      }
      async update(e, t, r) {
        return this.uploadOrUpdate("PUT", e, t, r)
      }
      async move(e, t, r) {
        var n = this;
        return n.handleOperation(async () => await Uu(n.fetch, `${n.url}/object/move`, {
          bucketId: n.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: r == null ? void 0 : r.destinationBucket
        }, {
          headers: n.headers
        }))
      }
      async copy(e, t, r) {
        var n = this;
        return n.handleOperation(async () => ({
          path: (await Uu(n.fetch, `${n.url}/object/copy`, {
            bucketId: n.bucketId,
            sourceKey: e,
            destinationKey: t,
            destinationBucket: r == null ? void 0 : r.destinationBucket
          }, {
            headers: n.headers
          })).Key
        }))
      }
      async createSignedUrl(e, t, r) {
        var n = this;
        return n.handleOperation(async () => {
          let i = n._getFinalPath(e),
            a = typeof(r == null ? void 0 : r.transform) == "object" && r.transform !== null && Object.keys(r.transform).length > 0,
            s = await Uu(n.fetch, `${n.url}/object/sign/${i}`, xr({
              expiresIn: t
            }, a ? {
              transform: r.transform
            } : {}), {
              headers: n.headers
            }),
            o = new URLSearchParams;
          r != null && r.download && o.set("download", r.download === !0 ? "" : r.download), (r == null ? void 0 : r.cacheNonce) != null && o.set("cacheNonce", String(r.cacheNonce));
          let l = o.toString();
          return {
            signedUrl: encodeURI(`${n.url}${s.signedURL}${l?`&${l}`:""}`)
          }
        })
      }
      async createSignedUrls(e, t, r) {
        var n = this;
        return n.handleOperation(async () => {
          let i = await Uu(n.fetch, `${n.url}/object/sign/${n.bucketId}`, {
              expiresIn: t,
              paths: e
            }, {
              headers: n.headers
            }),
            a = new URLSearchParams;
          r != null && r.download && a.set("download", r.download === !0 ? "" : r.download), (r == null ? void 0 : r.cacheNonce) != null && a.set("cacheNonce", String(r.cacheNonce));
          let s = a.toString();
          return i.map(o => xr(xr({}, o), {}, {
            signedUrl: o.signedURL ? encodeURI(`${n.url}${o.signedURL}${s?`&${s}`:""}`) : null
          }))
        })
      }
      download(e, t, r) {
        let n = typeof(t == null ? void 0 : t.transform) == "object" && t.transform !== null && Object.keys(t.transform).length > 0 ? "render/image/authenticated" : "object",
          i = new URLSearchParams;
        t != null && t.transform && this.applyTransformOptsToQuery(i, t.transform), (t == null ? void 0 : t.cacheNonce) != null && i.set("cacheNonce", String(t.cacheNonce));
        let a = i.toString(),
          s = this._getFinalPath(e),
          o = () => Gb(this.fetch, `${this.url}/${n}/${s}${a?`?${a}`:""}`, {
            headers: this.headers,
            noResolveJson: !0
          }, r);
        return new Fit(o, this.shouldThrowOnError)
      }
      async info(e) {
        var t = this;
        let r = t._getFinalPath(e);
        return t.handleOperation(async () => aM(await Gb(t.fetch, `${t.url}/object/info/${r}`, {
          headers: t.headers
        })))
      }
      async exists(e) {
        var t = this;
        let r = t._getFinalPath(e);
        try {
          return await Tit(t.fetch, `${t.url}/object/${r}`, {
            headers: t.headers
          }), {
            data: !0,
            error: null
          }
        } catch (i) {
          if (t.shouldThrowOnError) throw i;
          if (Y4(i)) {
            var n;
            let a = i instanceof z4 ? i.status : i instanceof ade ? (n = i.originalError) === null || n === void 0 ? void 0 : n.status : void 0;
            if (a !== void 0 && [400, 404].includes(a)) return {
              data: !1,
              error: i
            }
          }
          throw i
        }
      }
      getPublicUrl(e, t) {
        let r = this._getFinalPath(e),
          n = new URLSearchParams;
        t != null && t.download && n.set("download", t.download === !0 ? "" : t.download), t != null && t.transform && this.applyTransformOptsToQuery(n, t.transform), (t == null ? void 0 : t.cacheNonce) != null && n.set("cacheNonce", String(t.cacheNonce));
        let i = n.toString(),
          a = typeof(t == null ? void 0 : t.transform) == "object" && t.transform !== null && Object.keys(t.transform).length > 0 ? "render/image" : "object";
        return {
          data: {
            publicUrl: encodeURI(`${this.url}/${a}/public/${r}`) + (i ? `?${i}` : "")
          }
        }
      }
      async remove(e) {
        var t = this;
        return t.handleOperation(async () => await oM(t.fetch, `${t.url}/object/${t.bucketId}`, {
          prefixes: e
        }, {
          headers: t.headers
        }))
      }
      async list(e, t, r) {
        var n = this;
        return n.handleOperation(async () => {
          let i = xr(xr(xr({}, Oit), t), {}, {
            prefix: e || ""
          });
          return await Uu(n.fetch, `${n.url}/object/list/${n.bucketId}`, i, {
            headers: n.headers
          }, r)
        })
      }
      async listV2(e, t) {
        var r = this;
        return r.handleOperation(async () => {
          let n = xr({}, e);
          return await Uu(r.fetch, `${r.url}/object/list-v2/${r.bucketId}`, n, {
            headers: r.headers
          }, t)
        })
      }
      encodeMetadata(e) {
        return JSON.stringify(e)
      }
      toBase64(e) {
        return typeof Buffer != "undefined" ? Buffer.from(e).toString("base64") : btoa(e)
      }
      _getFinalPath(e) {
        return `${this.bucketId}/${e.replace(/^\/+/,"")}`
      }
      _removeEmptyFolders(e) {
        return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/")
      }
      applyTransformOptsToQuery(e, t) {
        return t.width && e.set("width", t.width.toString()), t.height && e.set("height", t.height.toString()), t.resize && e.set("resize", t.resize), t.format && e.set("format", t.format), t.quality && e.set("quality", t.quality.toString()), e
      }
    },
    Pit = "2.107.0",
    Vb = {
      "X-Client-Info": `storage-js/${Pit}`
    },
    Iit = class extends V1 {
      constructor(e, t = {}, r, n) {
        let i = new URL(e);
        n != null && n.useNewHostname && /supabase\.(co|in|red)$/.test(i.hostname) && !i.hostname.includes("storage.supabase.") && (i.hostname = i.hostname.replace("supabase.", "storage.supabase."));
        let a = i.href.replace(/\/$/, ""),
          s = xr(xr({}, Vb), t);
        super(a, s, r, "storage")
      }
      async listBuckets(e) {
        var t = this;
        return t.handleOperation(async () => {
          let r = t.listBucketOptionsToQueryString(e);
          return await Gb(t.fetch, `${t.url}/bucket${r}`, {
            headers: t.headers
          })
        })
      }
      async getBucket(e) {
        var t = this;
        return t.handleOperation(async () => await Gb(t.fetch, `${t.url}/bucket/${e}`, {
          headers: t.headers
        }))
      }
      async createBucket(e, t = {
        public: !1
      }) {
        var r = this;
        return r.handleOperation(async () => await Uu(r.fetch, `${r.url}/bucket`, {
          id: e,
          name: e,
          type: t.type,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, {
          headers: r.headers
        }))
      }
      async updateBucket(e, t) {
        var r = this;
        return r.handleOperation(async () => await sM(r.fetch, `${r.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, {
          headers: r.headers
        }))
      }
      async emptyBucket(e) {
        var t = this;
        return t.handleOperation(async () => await Uu(t.fetch, `${t.url}/bucket/${e}/empty`, {}, {
          headers: t.headers
        }))
      }
      async deleteBucket(e) {
        var t = this;
        return t.handleOperation(async () => await oM(t.fetch, `${t.url}/bucket/${e}`, {}, {
          headers: t.headers
        }))
      }
      listBucketOptionsToQueryString(e) {
        let t = {};
        return e && ("limit" in e && (t.limit = String(e.limit)), "offset" in e && (t.offset = String(e.offset)), e.search && (t.search = e.search), e.sortColumn && (t.sortColumn = e.sortColumn), e.sortOrder && (t.sortOrder = e.sortOrder)), Object.keys(t).length > 0 ? "?" + new URLSearchParams(t).toString() : ""
      }
    },
    Lit = class extends V1 {
      constructor(e, t = {}, r) {
        let n = e.replace(/\/$/, ""),
          i = xr(xr({}, Vb), t);
        super(n, i, r, "storage")
      }
      async createBucket(e) {
        var t = this;
        return t.handleOperation(async () => await Uu(t.fetch, `${t.url}/bucket`, {
          name: e
        }, {
          headers: t.headers
        }))
      }
      async listBuckets(e) {
        var t = this;
        return t.handleOperation(async () => {
          let r = new URLSearchParams;
          (e == null ? void 0 : e.limit) !== void 0 && r.set("limit", e.limit.toString()), (e == null ? void 0 : e.offset) !== void 0 && r.set("offset", e.offset.toString()), e != null && e.sortColumn && r.set("sortColumn", e.sortColumn), e != null && e.sortOrder && r.set("sortOrder", e.sortOrder), e != null && e.search && r.set("search", e.search);
          let n = r.toString(),
            i = n ? `${t.url}/bucket?${n}` : `${t.url}/bucket`;
          return await Gb(t.fetch, i, {
            headers: t.headers
          })
        })
      }
      async deleteBucket(e) {
        var t = this;
        return t.handleOperation(async () => await oM(t.fetch, `${t.url}/bucket/${e}`, {}, {
          headers: t.headers
        }))
      }
      from(e) {
        var t = this;
        if (!_it(e)) throw new X4("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
        let r = new tde({
            baseUrl: this.url,
            catalogName: e,
            auth: {
              type: "custom",
              getHeaders: async () => t.headers
            },
            fetch: this.fetch
          }),
          n = this.shouldThrowOnError;
        return new Proxy(r, {
          get(i, a) {
            let s = i[a];
            return typeof s != "function" ? s : async (...o) => {
              try {
                return {
                  data: await s.apply(i, o),
                  error: null
                }
              } catch (l) {
                if (n) throw l;
                return {
                  data: null,
                  error: l
                }
              }
            }
          }
        })
      }
    },
    Uit = class extends V1 {
      constructor(e, t = {}, r) {
        let n = e.replace(/\/$/, ""),
          i = xr(xr({}, Vb), {}, {
            "Content-Type": "application/json"
          }, t);
        super(n, i, r, "vectors")
      }
      async createIndex(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/CreateIndex`, e, {
          headers: t.headers
        }) || {})
      }
      async getIndex(e, t) {
        var r = this;
        return r.handleOperation(async () => await $l.post(r.fetch, `${r.url}/GetIndex`, {
          vectorBucketName: e,
          indexName: t
        }, {
          headers: r.headers
        }))
      }
      async listIndexes(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/ListIndexes`, e, {
          headers: t.headers
        }))
      }
      async deleteIndex(e, t) {
        var r = this;
        return r.handleOperation(async () => await $l.post(r.fetch, `${r.url}/DeleteIndex`, {
          vectorBucketName: e,
          indexName: t
        }, {
          headers: r.headers
        }) || {})
      }
    },
    Rit = class extends V1 {
      constructor(e, t = {}, r) {
        let n = e.replace(/\/$/, ""),
          i = xr(xr({}, Vb), {}, {
            "Content-Type": "application/json"
          }, t);
        super(n, i, r, "vectors")
      }
      async putVectors(e) {
        var t = this;
        if (e.vectors.length < 1 || e.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/PutVectors`, e, {
          headers: t.headers
        }) || {})
      }
      async getVectors(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/GetVectors`, e, {
          headers: t.headers
        }))
      }
      async listVectors(e) {
        var t = this;
        if (e.segmentCount !== void 0) {
          if (e.segmentCount < 1 || e.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
          if (e.segmentIndex !== void 0 && (e.segmentIndex < 0 || e.segmentIndex >= e.segmentCount)) throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)
        }
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/ListVectors`, e, {
          headers: t.headers
        }))
      }
      async queryVectors(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/QueryVectors`, e, {
          headers: t.headers
        }))
      }
      async deleteVectors(e) {
        var t = this;
        if (e.keys.length < 1 || e.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/DeleteVectors`, e, {
          headers: t.headers
        }) || {})
      }
    },
    Dit = class extends V1 {
      constructor(e, t = {}, r) {
        let n = e.replace(/\/$/, ""),
          i = xr(xr({}, Vb), {}, {
            "Content-Type": "application/json"
          }, t);
        super(n, i, r, "vectors")
      }
      async createBucket(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/CreateVectorBucket`, {
          vectorBucketName: e
        }, {
          headers: t.headers
        }) || {})
      }
      async getBucket(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/GetVectorBucket`, {
          vectorBucketName: e
        }, {
          headers: t.headers
        }))
      }
      async listBuckets(e = {}) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/ListVectorBuckets`, e, {
          headers: t.headers
        }))
      }
      async deleteBucket(e) {
        var t = this;
        return t.handleOperation(async () => await $l.post(t.fetch, `${t.url}/DeleteVectorBucket`, {
          vectorBucketName: e
        }, {
          headers: t.headers
        }) || {})
      }
    },
    Mit = class extends Dit {
      constructor(e, t = {}) {
        super(e, t.headers || {}, t.fetch)
      }
      from(e) {
        return new Qit(this.url, this.headers, e, this.fetch)
      }
      async createBucket(e) {
        var t = () => super.createBucket,
          r = this;
        return t().call(r, e)
      }
      async getBucket(e) {
        var t = () => super.getBucket,
          r = this;
        return t().call(r, e)
      }
      async listBuckets(e = {}) {
        var t = () => super.listBuckets,
          r = this;
        return t().call(r, e)
      }
      async deleteBucket(e) {
        var t = () => super.deleteBucket,
          r = this;
        return t().call(r, e)
      }
    },
    Qit = class extends Uit {
      constructor(e, t, r, n) {
        super(e, t, n), this.vectorBucketName = r
      }
      async createIndex(e) {
        var t = () => super.createIndex,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName
        }))
      }
      async listIndexes(e = {}) {
        var t = () => super.listIndexes,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName
        }))
      }
      async getIndex(e) {
        var t = () => super.getIndex,
          r = this;
        return t().call(r, r.vectorBucketName, e)
      }
      async deleteIndex(e) {
        var t = () => super.deleteIndex,
          r = this;
        return t().call(r, r.vectorBucketName, e)
      }
      index(e) {
        return new Hit(this.url, this.headers, this.vectorBucketName, e, this.fetch)
      }
    },
    Hit = class extends Rit {
      constructor(e, t, r, n, i) {
        super(e, t, i), this.vectorBucketName = r, this.indexName = n
      }
      async putVectors(e) {
        var t = () => super.putVectors,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName,
          indexName: r.indexName
        }))
      }
      async getVectors(e) {
        var t = () => super.getVectors,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName,
          indexName: r.indexName
        }))
      }
      async listVectors(e = {}) {
        var t = () => super.listVectors,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName,
          indexName: r.indexName
        }))
      }
      async queryVectors(e) {
        var t = () => super.queryVectors,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName,
          indexName: r.indexName
        }))
      }
      async deleteVectors(e) {
        var t = () => super.deleteVectors,
          r = this;
        return t().call(r, xr(xr({}, e), {}, {
          vectorBucketName: r.vectorBucketName,
          indexName: r.indexName
        }))
      }
    },
    Ade = class extends Iit {
      constructor(e, t = {}, r, n) {
        super(e, t, r, n)
      }
      from(e) {
        return new Nit(this.url, this.headers, e, this.fetch)
      }
      get vectors() {
        return new Mit(this.url + "/vector", {
          headers: this.headers,
          fetch: this.fetch
        })
      }
      get analytics() {
        return new Lit(this.url + "/iceberg", this.headers, this.fetch)
      }
    };
  var J4 = "2.107.0";
  var Xf = 30 * 1e3,
    z1 = 3,
    Z4 = z1 * Xf,
    ude = "http://localhost:9999",
    cde = "supabase.auth.token";
  var fde = {
    "X-Client-Info": `gotrue-js/${J4}`
  };
  var zb = "X-Supabase-Api-Version",
    lM = {
      "2024-01-01": {
        timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
        name: "2024-01-01"
      }
    },
    hde = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
    dde = 10 * 60 * 1e3;
  var Ud = class extends Error {
    constructor(t, r, n) {
      super(t), this.__isAuthError = !0, this.name = "AuthError", this.status = r, this.code = n
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        code: this.code
      }
    }
  };

  function jt(e) {
    return typeof e == "object" && e !== null && "__isAuthError" in e
  }
  var ek = class extends Ud {
    constructor(t, r, n) {
      super(t, r, n), this.name = "AuthApiError", this.status = r, this.code = n
    }
  };

  function pde(e) {
    return jt(e) && e.name === "AuthApiError"
  }
  var go = class extends Ud {
      constructor(t, r) {
        super(t), this.name = "AuthUnknownError", this.originalError = r
      }
    },
    DA = class extends Ud {
      constructor(t, r, n, i) {
        super(t, n, i), this.name = r, this.status = n
      }
    },
    Aa = class extends DA {
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400, void 0)
      }
    };

  function Jb(e) {
    return jt(e) && e.name === "AuthSessionMissingError"
  }
  var Yf = class extends DA {
      constructor() {
        super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0)
      }
    },
    Wp = class extends DA {
      constructor(t) {
        super(t, "AuthInvalidCredentialsError", 400, void 0)
      }
    },
    Gp = class extends DA {
      constructor(t, r = null) {
        super(t, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = r
      }
      toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), {
          details: this.details
        })
      }
    };

  function gde(e) {
    return jt(e) && e.name === "AuthImplicitGrantRedirectError"
  }
  var $b = class extends DA {
      constructor(t, r = null) {
        super(t, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = r
      }
      toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), {
          details: this.details
        })
      }
    },
    tk = class extends DA {
      constructor() {
        super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found")
      }
    };
  var $1 = class extends DA {
    constructor(t, r) {
      super(t, "AuthRetryableFetchError", r, void 0)
    }
  };

  function rk(e) {
    return jt(e) && e.name === "AuthRetryableFetchError"
  }
  var Xb = class extends DA {
    constructor(t = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
      super(t, "AuthRefreshDiscardedError", 409, void 0)
    }
  };

  function mde(e) {
    return jt(e) && e.name === "AuthRefreshDiscardedError"
  }
  var Yb = class extends DA {
    constructor(t, r, n) {
      super(t, "AuthWeakPasswordError", r, "weak_password"), this.reasons = n
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), {
        reasons: this.reasons
      })
    }
  };
  var Rd = class extends DA {
    constructor(t) {
      super(t, "AuthInvalidJwtError", 400, "invalid_jwt")
    }
  };
  var nk = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),
    vde = ` 	
\r=`.split(""),
    jit = (() => {
      let e = new Array(128);
      for (let t = 0; t < e.length; t += 1) e[t] = -1;
      for (let t = 0; t < vde.length; t += 1) e[vde[t].charCodeAt(0)] = -2;
      for (let t = 0; t < nk.length; t += 1) e[nk[t].charCodeAt(0)] = t;
      return e
    })();

  function yde(e, t, r) {
    if (e !== null)
      for (t.queue = t.queue << 8 | e, t.queuedBits += 8; t.queuedBits >= 6;) {
        let n = t.queue >> t.queuedBits - 6 & 63;
        r(nk[n]), t.queuedBits -= 6
      } else if (t.queuedBits > 0)
        for (t.queue = t.queue << 6 - t.queuedBits, t.queuedBits = 6; t.queuedBits >= 6;) {
          let n = t.queue >> t.queuedBits - 6 & 63;
          r(nk[n]), t.queuedBits -= 6
        }
  }

  function wde(e, t, r) {
    let n = jit[e];
    if (n > -1)
      for (t.queue = t.queue << 6 | n, t.queuedBits += 6; t.queuedBits >= 8;) r(t.queue >> t.queuedBits - 8 & 255), t.queuedBits -= 8;
    else {
      if (n === -2) return;
      throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)
    }
  }

  function AM(e) {
    let t = [],
      r = s => {
        t.push(String.fromCodePoint(s))
      },
      n = {
        utf8seq: 0,
        codepoint: 0
      },
      i = {
        queue: 0,
        queuedBits: 0
      },
      a = s => {
        Wit(s, n, r)
      };
    for (let s = 0; s < e.length; s += 1) wde(e.charCodeAt(s), i, a);
    return t.join("")
  }

  function qit(e, t) {
    if (e <= 127) {
      t(e);
      return
    } else if (e <= 2047) {
      t(192 | e >> 6), t(128 | e & 63);
      return
    } else if (e <= 65535) {
      t(224 | e >> 12), t(128 | e >> 6 & 63), t(128 | e & 63);
      return
    } else if (e <= 1114111) {
      t(240 | e >> 18), t(128 | e >> 12 & 63), t(128 | e >> 6 & 63), t(128 | e & 63);
      return
    }
    throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)
  }

  function Kit(e, t) {
    for (let r = 0; r < e.length; r += 1) {
      let n = e.charCodeAt(r);
      if (n > 55295 && n <= 56319) {
        let i = (n - 55296) * 1024 & 65535;
        n = (e.charCodeAt(r + 1) - 56320 & 65535 | i) + 65536, r += 1
      }
      qit(n, t)
    }
  }

  function Wit(e, t, r) {
    if (t.utf8seq === 0) {
      if (e <= 127) {
        r(e);
        return
      }
      for (let n = 1; n < 6; n += 1)
        if (!(e >> 7 - n & 1)) {
          t.utf8seq = n;
          break
        } if (t.utf8seq === 2) t.codepoint = e & 31;
      else if (t.utf8seq === 3) t.codepoint = e & 15;
      else if (t.utf8seq === 4) t.codepoint = e & 7;
      else throw new Error("Invalid UTF-8 sequence");
      t.utf8seq -= 1
    } else if (t.utf8seq > 0) {
      if (e <= 127) throw new Error("Invalid UTF-8 sequence");
      t.codepoint = t.codepoint << 6 | e & 63, t.utf8seq -= 1, t.utf8seq === 0 && r(t.codepoint)
    }
  }

  function Dd(e) {
    let t = [],
      r = {
        queue: 0,
        queuedBits: 0
      },
      n = i => {
        t.push(i)
      };
    for (let i = 0; i < e.length; i += 1) wde(e.charCodeAt(i), r, n);
    return new Uint8Array(t)
  }

  function xde(e) {
    let t = [];
    return Kit(e, r => t.push(r)), new Uint8Array(t)
  }

  function Jf(e) {
    let t = [],
      r = {
        queue: 0,
        queuedBits: 0
      },
      n = i => {
        t.push(i)
      };
    return e.forEach(i => yde(i, r, n)), yde(null, r, n), t.join("")
  }

  function bde(e) {
    return Math.round(Date.now() / 1e3) + e
  }

  function Bde() {
    return Symbol("auth-callback")
  }
  var ys = () => typeof window != "undefined" && typeof document != "undefined",
    Vp = {
      tested: !1,
      writable: !1
    },
    ik = () => {
      if (!ys()) return !1;
      try {
        if (typeof globalThis.localStorage != "object") return !1
      } catch (t) {
        return !1
      }
      if (Vp.tested) return Vp.writable;
      let e = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(e, e), globalThis.localStorage.removeItem(e), Vp.tested = !0, Vp.writable = !0
      } catch (t) {
        Vp.tested = !0, Vp.writable = !1
      }
      return Vp.writable
    };

  function _de(e) {
    let t = {},
      r = new URL(e);
    if (r.hash && r.hash[0] === "#") try {
      new URLSearchParams(r.hash.substring(1)).forEach((i, a) => {
        t[a] = i
      })
    } catch (n) {}
    return r.searchParams.forEach((n, i) => {
      t[i] = n
    }), t
  }
  var ak = e => e ? (...t) => e(...t) : (...t) => fetch(...t),
    Sde = e => typeof e == "object" && e !== null && "status" in e && "ok" in e && "json" in e && typeof e.json == "function",
    zp = async (e, t, r) => {
      await e.setItem(t, JSON.stringify(r))
    }, Mc = async (e, t) => {
      let r = await e.getItem(t);
      if (!r) return null;
      try {
        return JSON.parse(r)
      } catch (n) {
        return null
      }
    }, Qa = async (e, t) => {
      await e.removeItem(t)
    }, Zb = class e {
      constructor() {
        this.promise = new e.promiseConstructor((t, r) => {
          this.resolve = t, this.reject = r
        })
      }
    };
  Zb.promiseConstructor = Promise;

  function eB(e) {
    let t = e.split(".");
    if (t.length !== 3) throw new Rd("Invalid JWT structure");
    for (let n = 0; n < t.length; n++)
      if (!hde.test(t[n])) throw new Rd("JWT not in base64url format");
    return {
      header: JSON.parse(AM(t[0])),
      payload: JSON.parse(AM(t[1])),
      signature: Dd(t[2]),
      raw: {
        header: t[0],
        payload: t[1]
      }
    }
  }
  async function Cde(e) {
    return await new Promise(t => {
      setTimeout(() => t(null), e)
    })
  }

  function Ede(e, t) {
    return new Promise((n, i) => {
      (async () => {
        for (let a = 0; a < 1 / 0; a++) try {
          let s = await e(a);
          if (!t(a, null, s)) {
            n(s);
            return
          }
        } catch (s) {
          if (!t(a, s)) {
            i(s);
            return
          }
        }
      })()
    })
  }

  function Git(e) {
    return ("0" + e.toString(16)).substr(-2)
  }

  function Vit() {
    let t = new Uint32Array(56);
    if (typeof crypto == "undefined") {
      let r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
        n = r.length,
        i = "";
      for (let a = 0; a < 56; a++) i += r.charAt(Math.floor(Math.random() * n));
      return i
    }
    return crypto.getRandomValues(t), Array.from(t, Git).join("")
  }
  async function zit(e) {
    let r = new TextEncoder().encode(e),
      n = await crypto.subtle.digest("SHA-256", r),
      i = new Uint8Array(n);
    return Array.from(i).map(a => String.fromCharCode(a)).join("")
  }
  async function $it(e) {
    if (!(typeof crypto != "undefined" && typeof crypto.subtle != "undefined" && typeof TextEncoder != "undefined")) return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e;
    let r = await zit(e);
    return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
  }
  async function $p(e, t, r = !1) {
    let n = Vit(),
      i = n;
    r && (i += "/recovery"), await zp(e, `${t}-code-verifier`, i);
    let a = await $it(n);
    return [a, n === a ? "plain" : "s256"]
  }
  var Xit = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;

  function Tde(e) {
    let t = e.headers.get(zb);
    if (!t || !t.match(Xit)) return null;
    try {
      return new Date(`${t}T00:00:00.0Z`)
    } catch (r) {
      return null
    }
  }

  function kde(e) {
    if (!e) throw new Error("Missing exp claim");
    let t = Math.floor(Date.now() / 1e3);
    if (e <= t) throw new Error("JWT has expired")
  }

  function Fde(e) {
    switch (e) {
      case "RS256":
        return {
          name: "RSASSA-PKCS1-v1_5", hash: {
            name: "SHA-256"
          }
        };
      case "ES256":
        return {
          name: "ECDSA", namedCurve: "P-256", hash: {
            name: "SHA-256"
          }
        };
      default:
        throw new Error("Invalid alg claim")
    }
  }
  var Yit = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  function Qc(e) {
    if (!Yit.test(e)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")
  }

  function Xl(e) {
    if (!e.passkey) throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")
  }

  function sk() {
    let e = {};
    return new Proxy(e, {
      get: (t, r) => {
        if (r === "__isUserNotAvailableProxy") return !0;
        if (typeof r == "symbol") {
          let n = r.toString();
          if (n === "Symbol(Symbol.toPrimitive)" || n === "Symbol(Symbol.toStringTag)" || n === "Symbol(util.inspect.custom)") return
        }
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)
      },
      set: (t, r) => {
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)
      },
      deleteProperty: (t, r) => {
        throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)
      }
    })
  }

  function Ode(e, t) {
    return new Proxy(e, {
      get: (r, n, i) => {
        if (n === "__isInsecureUserWarningProxy") return !0;
        if (typeof n == "symbol") {
          let a = n.toString();
          if (a === "Symbol(Symbol.toPrimitive)" || a === "Symbol(Symbol.toStringTag)" || a === "Symbol(util.inspect.custom)" || a === "Symbol(nodejs.util.inspect.custom)") return Reflect.get(r, n, i)
        }
        return !t.value && typeof n == "string" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), t.value = !0), Reflect.get(r, n, i)
      }
    })
  }

  function uM(e) {
    return JSON.parse(JSON.stringify(e))
  }
  var Xp = e => {
      if (typeof e == "object" && e !== null) {
        let t = e;
        if (typeof t.msg == "string") return t.msg;
        if (typeof t.message == "string") return t.message;
        if (typeof t.error_description == "string") return t.error_description;
        if (typeof t.error == "string") return t.error
      }
      return JSON.stringify(e)
    },
    Jit = [502, 503, 504, 520, 521, 522, 523, 524, 530];
  async function Nde(e) {
    var t;
    if (!Sde(e)) throw new $1(Xp(e), 0);
    if (Jit.includes(e.status)) throw new $1(Xp(e), e.status);
    let r;
    try {
      r = await e.json()
    } catch (a) {
      throw new go(Xp(a), a)
    }
    let n, i = Tde(e);
    if (i && i.getTime() >= lM["2024-01-01"].timestamp && typeof r == "object" && r && typeof r.code == "string" ? n = r.code : typeof r == "object" && r && typeof r.error_code == "string" && (n = r.error_code), n) {
      if (n === "weak_password") throw new Yb(Xp(r), e.status, ((t = r.weak_password) === null || t === void 0 ? void 0 : t.reasons) || []);
      if (n === "session_not_found") throw new Aa
    } else if (typeof r == "object" && r && typeof r.weak_password == "object" && r.weak_password && Array.isArray(r.weak_password.reasons) && r.weak_password.reasons.length && r.weak_password.reasons.reduce((a, s) => a && typeof s == "string", !0)) throw new Yb(Xp(r), e.status, r.weak_password.reasons);
    throw new ek(Xp(r), e.status || 500, n)
  }
  var Zit = (e, t, r, n) => {
    let i = {
      method: e,
      headers: (t == null ? void 0 : t.headers) || {}
    };
    return e === "GET" ? i : (i.headers = Object.assign({
      "Content-Type": "application/json;charset=UTF-8"
    }, t == null ? void 0 : t.headers), i.body = JSON.stringify(n), Object.assign(Object.assign({}, i), r))
  };
  async function er(e, t, r, n) {
    var i;
    let a = Object.assign({}, n == null ? void 0 : n.headers);
    a[zb] || (a[zb] = lM["2024-01-01"].name), n != null && n.jwt && (a.Authorization = `Bearer ${n.jwt}`);
    let s = (i = n == null ? void 0 : n.query) !== null && i !== void 0 ? i : {};
    n != null && n.redirectTo && (s.redirect_to = n.redirectTo);
    let o = Object.keys(s).length ? "?" + new URLSearchParams(s).toString() : "",
      l = await eat(e, t, r + o, {
        headers: a,
        noResolveJson: n == null ? void 0 : n.noResolveJson
      }, {}, n == null ? void 0 : n.body);
    return n != null && n.xform ? n == null ? void 0 : n.xform(l) : {
      data: Object.assign({}, l),
      error: null
    }
  }
  async function eat(e, t, r, n, i, a) {
    let s = Zit(t, n, i, a),
      o;
    try {
      o = await e(r, Object.assign({}, s))
    } catch (l) {
      throw console.error(l), new $1(Xp(l), 0)
    }
    if (o.ok || await Nde(o), n != null && n.noResolveJson) return o;
    try {
      return await o.json()
    } catch (l) {
      await Nde(l)
    }
  }

  function Yl(e) {
    var t;
    let r = null;
    tat(e) && (r = Object.assign({}, e), e.expires_at || (r.expires_at = bde(e.expires_in)));
    let n = (t = e.user) !== null && t !== void 0 ? t : typeof(e == null ? void 0 : e.id) == "string" ? e : null;
    return {
      data: {
        session: r,
        user: n
      },
      error: null
    }
  }

  function cM(e) {
    let t = Yl(e);
    return !t.error && e.weak_password && typeof e.weak_password == "object" && Array.isArray(e.weak_password.reasons) && e.weak_password.reasons.length && e.weak_password.message && typeof e.weak_password.message == "string" && e.weak_password.reasons.reduce((r, n) => r && typeof n == "string", !0) && (t.data.weak_password = e.weak_password), t
  }

  function Hc(e) {
    var t;
    return {
      data: {
        user: (t = e.user) !== null && t !== void 0 ? t : e
      },
      error: null
    }
  }

  function Pde(e) {
    return {
      data: e,
      error: null
    }
  }

  function Ide(e) {
    let {
      action_link: t,
      email_otp: r,
      hashed_token: n,
      redirect_to: i,
      verification_type: a
    } = e, s = qp(e, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), o = {
      action_link: t,
      email_otp: r,
      hashed_token: n,
      redirect_to: i,
      verification_type: a
    }, l = Object.assign({}, s);
    return {
      data: {
        properties: o,
        user: l
      },
      error: null
    }
  }

  function fM(e) {
    return e
  }

  function tat(e) {
    return !!e.access_token && !!e.refresh_token && !!e.expires_in
  }
  var ok = ["global", "local", "others"];
  var Yp = class {
    constructor({
      url: t = "",
      headers: r = {},
      fetch: n,
      experimental: i
    }) {
      this.url = t, this.headers = r, this.fetch = ak(n), this.experimental = i != null ? i : {}, this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this)
      }, this.oauth = {
        listClients: this._listOAuthClients.bind(this),
        createClient: this._createOAuthClient.bind(this),
        getClient: this._getOAuthClient.bind(this),
        updateClient: this._updateOAuthClient.bind(this),
        deleteClient: this._deleteOAuthClient.bind(this),
        regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
      }, this.customProviders = {
        listProviders: this._listCustomProviders.bind(this),
        createProvider: this._createCustomProvider.bind(this),
        getProvider: this._getCustomProvider.bind(this),
        updateProvider: this._updateCustomProvider.bind(this),
        deleteProvider: this._deleteCustomProvider.bind(this)
      }, this.passkey = {
        listPasskeys: this._adminListPasskeys.bind(this),
        deletePasskey: this._adminDeletePasskey.bind(this)
      }
    }
    async signOut(t, r = ok[0]) {
      if (ok.indexOf(r) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ok.join(", ")}`);
      try {
        return await er(this.fetch, "POST", `${this.url}/logout?scope=${r}`, {
          headers: this.headers,
          jwt: t,
          noResolveJson: !0
        }), {
          data: null,
          error: null
        }
      } catch (n) {
        if (jt(n)) return {
          data: null,
          error: n
        };
        throw n
      }
    }
    async inviteUserByEmail(t, r = {}) {
      try {
        return await er(this.fetch, "POST", `${this.url}/invite`, {
          body: {
            email: t,
            data: r.data
          },
          headers: this.headers,
          redirectTo: r.redirectTo,
          xform: Hc
        })
      } catch (n) {
        if (jt(n)) return {
          data: {
            user: null
          },
          error: n
        };
        throw n
      }
    }
    async generateLink(t) {
      try {
        let {
          options: r
        } = t, n = qp(t, ["options"]), i = Object.assign(Object.assign({}, n), r);
        return "newEmail" in n && (i.new_email = n == null ? void 0 : n.newEmail, delete i.newEmail), await er(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body: i,
          headers: this.headers,
          xform: Ide,
          redirectTo: r == null ? void 0 : r.redirectTo
        })
      } catch (r) {
        if (jt(r)) return {
          data: {
            properties: null,
            user: null
          },
          error: r
        };
        throw r
      }
    }
    async createUser(t) {
      try {
        return await er(this.fetch, "POST", `${this.url}/admin/users`, {
          body: t,
          headers: this.headers,
          xform: Hc
        })
      } catch (r) {
        if (jt(r)) return {
          data: {
            user: null
          },
          error: r
        };
        throw r
      }
    }
    async listUsers(t) {
      var r, n, i, a, s, o, l;
      try {
        let A = {
            nextPage: null,
            lastPage: 0,
            total: 0
          },
          u = await er(this.fetch, "GET", `${this.url}/admin/users`, {
            headers: this.headers,
            noResolveJson: !0,
            query: {
              page: (n = (r = t == null ? void 0 : t.page) === null || r === void 0 ? void 0 : r.toString()) !== null && n !== void 0 ? n : "",
              per_page: (a = (i = t == null ? void 0 : t.perPage) === null || i === void 0 ? void 0 : i.toString()) !== null && a !== void 0 ? a : ""
            },
            xform: fM
          });
        if (u.error) throw u.error;
        let c = await u.json(),
          f = (s = u.headers.get("x-total-count")) !== null && s !== void 0 ? s : 0,
          h = (l = (o = u.headers.get("link")) === null || o === void 0 ? void 0 : o.split(",")) !== null && l !== void 0 ? l : [];
        return h.length > 0 && (h.forEach(p => {
          let d = parseInt(p.split(";")[0].split("=")[1].substring(0, 1)),
            g = JSON.parse(p.split(";")[1].split("=")[1]);
          A[`${g}Page`] = d
        }), A.total = parseInt(f)), {
          data: Object.assign(Object.assign({}, c), A),
          error: null
        }
      } catch (A) {
        if (jt(A)) return {
          data: {
            users: []
          },
          error: A
        };
        throw A
      }
    }
    async getUserById(t) {
      Qc(t);
      try {
        return await er(this.fetch, "GET", `${this.url}/admin/users/${t}`, {
          headers: this.headers,
          xform: Hc
        })
      } catch (r) {
        if (jt(r)) return {
          data: {
            user: null
          },
          error: r
        };
        throw r
      }
    }
    async updateUserById(t, r) {
      Qc(t);
      try {
        return await er(this.fetch, "PUT", `${this.url}/admin/users/${t}`, {
          body: r,
          headers: this.headers,
          xform: Hc
        })
      } catch (n) {
        if (jt(n)) return {
          data: {
            user: null
          },
          error: n
        };
        throw n
      }
    }
    async deleteUser(t, r = !1) {
      Qc(t);
      try {
        return await er(this.fetch, "DELETE", `${this.url}/admin/users/${t}`, {
          headers: this.headers,
          body: {
            should_soft_delete: r
          },
          xform: Hc
        })
      } catch (n) {
        if (jt(n)) return {
          data: {
            user: null
          },
          error: n
        };
        throw n
      }
    }
    async _listFactors(t) {
      Qc(t.userId);
      try {
        let {
          data: r,
          error: n
        } = await er(this.fetch, "GET", `${this.url}/admin/users/${t.userId}/factors`, {
          headers: this.headers,
          xform: i => ({
            data: {
              factors: i
            },
            error: null
          })
        });
        return {
          data: r,
          error: n
        }
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _deleteFactor(t) {
      Qc(t.userId), Qc(t.id);
      try {
        return {
          data: await er(this.fetch, "DELETE", `${this.url}/admin/users/${t.userId}/factors/${t.id}`, {
            headers: this.headers
          }),
          error: null
        }
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _listOAuthClients(t) {
      var r, n, i, a, s, o, l;
      try {
        let A = {
            nextPage: null,
            lastPage: 0,
            total: 0
          },
          u = await er(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
            headers: this.headers,
            noResolveJson: !0,
            query: {
              page: (n = (r = t == null ? void 0 : t.page) === null || r === void 0 ? void 0 : r.toString()) !== null && n !== void 0 ? n : "",
              per_page: (a = (i = t == null ? void 0 : t.perPage) === null || i === void 0 ? void 0 : i.toString()) !== null && a !== void 0 ? a : ""
            },
            xform: fM
          });
        if (u.error) throw u.error;
        let c = await u.json(),
          f = (s = u.headers.get("x-total-count")) !== null && s !== void 0 ? s : 0,
          h = (l = (o = u.headers.get("link")) === null || o === void 0 ? void 0 : o.split(",")) !== null && l !== void 0 ? l : [];
        return h.length > 0 && (h.forEach(p => {
          let d = parseInt(p.split(";")[0].split("=")[1].substring(0, 1)),
            g = JSON.parse(p.split(";")[1].split("=")[1]);
          A[`${g}Page`] = d
        }), A.total = parseInt(f)), {
          data: Object.assign(Object.assign({}, c), A),
          error: null
        }
      } catch (A) {
        if (jt(A)) return {
          data: {
            clients: []
          },
          error: A
        };
        throw A
      }
    }
    async _createOAuthClient(t) {
      try {
        return await er(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
          body: t,
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _getOAuthClient(t) {
      try {
        return await er(this.fetch, "GET", `${this.url}/admin/oauth/clients/${t}`, {
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _updateOAuthClient(t, r) {
      try {
        return await er(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${t}`, {
          body: r,
          headers: this.headers,
          xform: n => ({
            data: n,
            error: null
          })
        })
      } catch (n) {
        if (jt(n)) return {
          data: null,
          error: n
        };
        throw n
      }
    }
    async _deleteOAuthClient(t) {
      try {
        return await er(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${t}`, {
          headers: this.headers,
          noResolveJson: !0
        }), {
          data: null,
          error: null
        }
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _regenerateOAuthClientSecret(t) {
      try {
        return await er(this.fetch, "POST", `${this.url}/admin/oauth/clients/${t}/regenerate_secret`, {
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _listCustomProviders(t) {
      try {
        let r = {};
        return t != null && t.type && (r.type = t.type), await er(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
          headers: this.headers,
          query: r,
          xform: n => {
            var i;
            return {
              data: {
                providers: (i = n == null ? void 0 : n.providers) !== null && i !== void 0 ? i : []
              },
              error: null
            }
          }
        })
      } catch (r) {
        if (jt(r)) return {
          data: {
            providers: []
          },
          error: r
        };
        throw r
      }
    }
    async _createCustomProvider(t) {
      try {
        return await er(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
          body: t,
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _getCustomProvider(t) {
      try {
        return await er(this.fetch, "GET", `${this.url}/admin/custom-providers/${t}`, {
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _updateCustomProvider(t, r) {
      try {
        return await er(this.fetch, "PUT", `${this.url}/admin/custom-providers/${t}`, {
          body: r,
          headers: this.headers,
          xform: n => ({
            data: n,
            error: null
          })
        })
      } catch (n) {
        if (jt(n)) return {
          data: null,
          error: n
        };
        throw n
      }
    }
    async _deleteCustomProvider(t) {
      try {
        return await er(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${t}`, {
          headers: this.headers,
          noResolveJson: !0
        }), {
          data: null,
          error: null
        }
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _adminListPasskeys(t) {
      Xl(this.experimental), Qc(t.userId);
      try {
        return await er(this.fetch, "GET", `${this.url}/admin/users/${t.userId}/passkeys`, {
          headers: this.headers,
          xform: r => ({
            data: r,
            error: null
          })
        })
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
    async _adminDeletePasskey(t) {
      Xl(this.experimental), Qc(t.userId), Qc(t.passkeyId);
      try {
        return await er(this.fetch, "DELETE", `${this.url}/admin/users/${t.userId}/passkeys/${t.passkeyId}`, {
          headers: this.headers,
          noResolveJson: !0
        }), {
          data: null,
          error: null
        }
      } catch (r) {
        if (jt(r)) return {
          data: null,
          error: r
        };
        throw r
      }
    }
  };

  function hM(e = {}) {
    return {
      getItem: t => e[t] || null,
      setItem: (t, r) => {
        e[t] = r
      },
      removeItem: t => {
        delete e[t]
      }
    }
  }
  var rat = {
      debug: !!(globalThis && ik() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
    },
    lk = class extends Error {
      constructor(t) {
        super(t), this.isAcquireTimeout = !0
      }
    };

  function Lde() {
    if (typeof globalThis != "object") try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this
        },
        configurable: !0
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__
    } catch (e) {
      typeof self != "undefined" && (self.globalThis = self)
    }
  }

  function dM(e) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(e)) throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);
    return e.toLowerCase()
  }

  function Ude(e) {
    return parseInt(e, 16)
  }

  function Rde(e) {
    let t = new TextEncoder().encode(e);
    return "0x" + Array.from(t, n => n.toString(16).padStart(2, "0")).join("")
  }

  function Dde(e) {
    var t;
    let {
      chainId: r,
      domain: n,
      expirationTime: i,
      issuedAt: a = new Date,
      nonce: s,
      notBefore: o,
      requestId: l,
      resources: A,
      scheme: u,
      uri: c,
      version: f
    } = e;
    {
      if (!Number.isInteger(r)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);
      if (!n) throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
      if (s && s.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${s}`);
      if (!c) throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
      if (f !== "1") throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);
      if (!((t = e.statement) === null || t === void 0) && t.includes(`
`)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)
    }
    let h = dM(e.address),
      p = u ? `${u}://${n}` : n,
      d = e.statement ? `${e.statement}
` : "",
      g = `${p} wants you to sign in with your Ethereum account:
${h}

${d}`,
      m = `URI: ${c}
Version: ${f}
Chain ID: ${r}${s?`
Nonce: ${s}`:""}
Issued At: ${a.toISOString()}`;
    if (i && (m += `
Expiration Time: ${i.toISOString()}`), o && (m += `
Not Before: ${o.toISOString()}`), l && (m += `
Request ID: ${l}`), A) {
      let v = `
Resources:`;
      for (let y of A) {
        if (!y || typeof y != "string") throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${y}`);
        v += `
- ${y}`
      }
      m += v
    }
    return `${g}
${m}`
  }
  var Hi = class extends Error {
      constructor({
        message: t,
        code: r,
        cause: n,
        name: i
      }) {
        var a;
        super(t, {
          cause: n
        }), this.__isWebAuthnError = !0, this.name = (a = i != null ? i : n instanceof Error ? n.name : void 0) !== null && a !== void 0 ? a : "Unknown Error", this.code = r
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          code: this.code
        }
      }
    },
    Jp = class extends Hi {
      constructor(t, r) {
        super({
          code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
          cause: r,
          message: t
        }), this.name = "WebAuthnUnknownError", this.originalError = r
      }
    };

  function Mde({
    error: e,
    options: t
  }) {
    var r, n, i;
    let {
      publicKey: a
    } = t;
    if (!a) throw Error("options was missing required publicKey property");
    if (e.name === "AbortError") {
      if (t.signal instanceof AbortSignal) return new Hi({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: e
      })
    } else if (e.name === "ConstraintError") {
      if (((r = a.authenticatorSelection) === null || r === void 0 ? void 0 : r.requireResidentKey) === !0) return new Hi({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: e
      });
      if (t.mediation === "conditional" && ((n = a.authenticatorSelection) === null || n === void 0 ? void 0 : n.userVerification) === "required") return new Hi({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: e
      });
      if (((i = a.authenticatorSelection) === null || i === void 0 ? void 0 : i.userVerification) === "required") return new Hi({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: e
      })
    } else {
      if (e.name === "InvalidStateError") return new Hi({
        message: "The authenticator was previously registered",
        code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
        cause: e
      });
      if (e.name === "NotAllowedError") return new Hi({
        message: e.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: e
      });
      if (e.name === "NotSupportedError") return a.pubKeyCredParams.filter(o => o.type === "public-key").length === 0 ? new Hi({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: e
      }) : new Hi({
        message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
        code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
        cause: e
      });
      if (e.name === "SecurityError") {
        let s = window.location.hostname;
        if (pM(s)) {
          if (a.rp.id !== s) return new Hi({
            message: `The RP ID "${a.rp.id}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: e
          })
        } else return new Hi({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: e
        })
      } else if (e.name === "TypeError") {
        if (a.user.id.byteLength < 1 || a.user.id.byteLength > 64) return new Hi({
          message: "User ID was not between 1 and 64 characters",
          code: "ERROR_INVALID_USER_ID_LENGTH",
          cause: e
        })
      } else if (e.name === "UnknownError") return new Hi({
        message: "The authenticator was unable to process the specified options, or could not create a new credential",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: e
      })
    }
    return new Hi({
      message: "a Non-Webauthn related error has occurred",
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: e
    })
  }

  function Qde({
    error: e,
    options: t
  }) {
    let {
      publicKey: r
    } = t;
    if (!r) throw Error("options was missing required publicKey property");
    if (e.name === "AbortError") {
      if (t.signal instanceof AbortSignal) return new Hi({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: e
      })
    } else {
      if (e.name === "NotAllowedError") return new Hi({
        message: e.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: e
      });
      if (e.name === "SecurityError") {
        let n = window.location.hostname;
        if (pM(n)) {
          if (r.rpId !== n) return new Hi({
            message: `The RP ID "${r.rpId}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: e
          })
        } else return new Hi({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: e
        })
      } else if (e.name === "UnknownError") return new Hi({
        message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: e
      })
    }
    return new Hi({
      message: "a Non-Webauthn related error has occurred",
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: e
    })
  }
  var gM = class {
      createNewAbortSignal() {
        if (this.controller) {
          let r = new Error("Cancelling existing WebAuthn API call for new one");
          r.name = "AbortError", this.controller.abort(r)
        }
        let t = new AbortController;
        return this.controller = t, t.signal
      }
      cancelCeremony() {
        if (this.controller) {
          let t = new Error("Manually cancelling existing WebAuthn API call");
          t.name = "AbortError", this.controller.abort(t), this.controller = void 0
        }
      }
    },
    ck = new gM;

  function mM(e) {
    if (!e) throw new Error("Credential creation options are required");
    if (typeof PublicKeyCredential != "undefined" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function") return PublicKeyCredential.parseCreationOptionsFromJSON(e);
    let {
      challenge: t,
      user: r,
      excludeCredentials: n
    } = e, i = qp(e, ["challenge", "user", "excludeCredentials"]), a = Dd(t).buffer, s = Object.assign(Object.assign({}, r), {
      id: Dd(r.id).buffer
    }), o = Object.assign(Object.assign({}, i), {
      challenge: a,
      user: s
    });
    if (n && n.length > 0) {
      o.excludeCredentials = new Array(n.length);
      for (let l = 0; l < n.length; l++) {
        let A = n[l];
        o.excludeCredentials[l] = Object.assign(Object.assign({}, A), {
          id: Dd(A.id).buffer,
          type: A.type || "public-key",
          transports: A.transports
        })
      }
    }
    return o
  }

  function vM(e) {
    if (!e) throw new Error("Credential request options are required");
    if (typeof PublicKeyCredential != "undefined" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function") return PublicKeyCredential.parseRequestOptionsFromJSON(e);
    let {
      challenge: t,
      allowCredentials: r
    } = e, n = qp(e, ["challenge", "allowCredentials"]), i = Dd(t).buffer, a = Object.assign(Object.assign({}, n), {
      challenge: i
    });
    if (r && r.length > 0) {
      a.allowCredentials = new Array(r.length);
      for (let s = 0; s < r.length; s++) {
        let o = r[s];
        a.allowCredentials[s] = Object.assign(Object.assign({}, o), {
          id: Dd(o.id).buffer,
          type: o.type || "public-key",
          transports: o.transports
        })
      }
    }
    return a
  }

  function yM(e) {
    var t;
    if ("toJSON" in e && typeof e.toJSON == "function") return e.toJSON();
    let r = e;
    return {
      id: e.id,
      rawId: e.id,
      response: {
        attestationObject: Jf(new Uint8Array(e.response.attestationObject)),
        clientDataJSON: Jf(new Uint8Array(e.response.clientDataJSON))
      },
      type: "public-key",
      clientExtensionResults: e.getClientExtensionResults(),
      authenticatorAttachment: (t = r.authenticatorAttachment) !== null && t !== void 0 ? t : void 0
    }
  }

  function wM(e) {
    var t;
    if ("toJSON" in e && typeof e.toJSON == "function") return e.toJSON();
    let r = e,
      n = e.getClientExtensionResults(),
      i = e.response;
    return {
      id: e.id,
      rawId: e.id,
      response: {
        authenticatorData: Jf(new Uint8Array(i.authenticatorData)),
        clientDataJSON: Jf(new Uint8Array(i.clientDataJSON)),
        signature: Jf(new Uint8Array(i.signature)),
        userHandle: i.userHandle ? Jf(new Uint8Array(i.userHandle)) : void 0
      },
      type: "public-key",
      clientExtensionResults: n,
      authenticatorAttachment: (t = r.authenticatorAttachment) !== null && t !== void 0 ? t : void 0
    }
  }

  function pM(e) {
    return e === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)
  }

  function tB() {
    var e, t;
    return !!(ys() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof((e = navigator == null ? void 0 : navigator.credentials) === null || e === void 0 ? void 0 : e.create) == "function" && typeof((t = navigator == null ? void 0 : navigator.credentials) === null || t === void 0 ? void 0 : t.get) == "function")
  }
  async function xM(e) {
    try {
      let t = await navigator.credentials.create(e);
      return t ? t instanceof PublicKeyCredential ? {
        data: t,
        error: null
      } : {
        data: null,
        error: new Jp("Browser returned unexpected credential type", t)
      } : {
        data: null,
        error: new Jp("Empty credential response", t)
      }
    } catch (t) {
      return {
        data: null,
        error: Mde({
          error: t,
          options: e
        })
      }
    }
  }
  async function bM(e) {
    try {
      let t = await navigator.credentials.get(e);
      return t ? t instanceof PublicKeyCredential ? {
        data: t,
        error: null
      } : {
        data: null,
        error: new Jp("Browser returned unexpected credential type", t)
      } : {
        data: null,
        error: new Jp("Empty credential response", t)
      }
    } catch (t) {
      return {
        data: null,
        error: Qde({
          error: t,
          options: e
        })
      }
    }
  }
  var nat = {
      hints: ["security-key"],
      authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
        requireResidentKey: !1,
        userVerification: "preferred",
        residentKey: "discouraged"
      },
      attestation: "direct"
    },
    iat = {
      userVerification: "preferred",
      hints: ["security-key"],
      attestation: "direct"
    };

  function Ak(...e) {
    let t = i => i !== null && typeof i == "object" && !Array.isArray(i),
      r = i => i instanceof ArrayBuffer || ArrayBuffer.isView(i),
      n = {};
    for (let i of e)
      if (i)
        for (let a in i) {
          let s = i[a];
          if (s !== void 0)
            if (Array.isArray(s)) n[a] = s;
            else if (r(s)) n[a] = s;
          else if (t(s)) {
            let o = n[a];
            t(o) ? n[a] = Ak(o, s) : n[a] = Ak(s)
          } else n[a] = s
        }
    return n
  }

  function aat(e, t) {
    return Ak(nat, e, t || {})
  }

  function sat(e, t) {
    return Ak(iat, e, t || {})
  }
  var uk = class {
    constructor(t) {
      this.client = t, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this)
    }
    async _enroll(t) {
      return this.client.mfa.enroll(Object.assign(Object.assign({}, t), {
        factorType: "webauthn"
      }))
    }
    async _challenge({
      factorId: t,
      webauthn: r,
      friendlyName: n,
      signal: i
    }, a) {
      var s;
      try {
        let {
          data: o,
          error: l
        } = await this.client.mfa.challenge({
          factorId: t,
          webauthn: r
        });
        if (!o) return {
          data: null,
          error: l
        };
        let A = i != null ? i : ck.createNewAbortSignal();
        if (o.webauthn.type === "create") {
          let {
            user: u
          } = o.webauthn.credential_options.publicKey;
          if (!u.name) {
            let c = n;
            if (c) u.name = `${u.id}:${c}`;
            else {
              let h = (await this.client.getUser()).data.user,
                p = ((s = h == null ? void 0 : h.user_metadata) === null || s === void 0 ? void 0 : s.name) || (h == null ? void 0 : h.email) || (h == null ? void 0 : h.id) || "User";
              u.name = `${u.id}:${p}`
            }
          }
          u.displayName || (u.displayName = u.name)
        }
        switch (o.webauthn.type) {
          case "create": {
            let u = aat(o.webauthn.credential_options.publicKey, a == null ? void 0 : a.create),
              {
                data: c,
                error: f
              } = await xM({
                publicKey: u,
                signal: A
              });
            return c ? {
              data: {
                factorId: t,
                challengeId: o.id,
                webauthn: {
                  type: o.webauthn.type,
                  credential_response: c
                }
              },
              error: null
            } : {
              data: null,
              error: f
            }
          }
          case "request": {
            let u = sat(o.webauthn.credential_options.publicKey, a == null ? void 0 : a.request),
              {
                data: c,
                error: f
              } = await bM(Object.assign(Object.assign({}, o.webauthn.credential_options), {
                publicKey: u,
                signal: A
              }));
            return c ? {
              data: {
                factorId: t,
                challengeId: o.id,
                webauthn: {
                  type: o.webauthn.type,
                  credential_response: c
                }
              },
              error: null
            } : {
              data: null,
              error: f
            }
          }
        }
      } catch (o) {
        return jt(o) ? {
          data: null,
          error: o
        } : {
          data: null,
          error: new go("Unexpected error in challenge", o)
        }
      }
    }
    async _verify({
      challengeId: t,
      factorId: r,
      webauthn: n
    }) {
      return this.client.mfa.verify({
        factorId: r,
        challengeId: t,
        webauthn: n
      })
    }
    async _authenticate({
      factorId: t,
      webauthn: {
        rpId: r = typeof window != "undefined" ? window.location.hostname : void 0,
        rpOrigins: n = typeof window != "undefined" ? [window.location.origin] : void 0,
        signal: i
      } = {}
    }, a) {
      if (!r) return {
        data: null,
        error: new Ud("rpId is required for WebAuthn authentication")
      };
      try {
        if (!tB()) return {
          data: null,
          error: new go("Browser does not support WebAuthn", null)
        };
        let {
          data: s,
          error: o
        } = await this.challenge({
          factorId: t,
          webauthn: {
            rpId: r,
            rpOrigins: n
          },
          signal: i
        }, {
          request: a
        });
        if (!s) return {
          data: null,
          error: o
        };
        let {
          webauthn: l
        } = s;
        return this._verify({
          factorId: t,
          challengeId: s.challengeId,
          webauthn: {
            type: l.type,
            rpId: r,
            rpOrigins: n,
            credential_response: l.credential_response
          }
        })
      } catch (s) {
        return jt(s) ? {
          data: null,
          error: s
        } : {
          data: null,
          error: new go("Unexpected error in authenticate", s)
        }
      }
    }
    async _register({
      friendlyName: t,
      webauthn: {
        rpId: r = typeof window != "undefined" ? window.location.hostname : void 0,
        rpOrigins: n = typeof window != "undefined" ? [window.location.origin] : void 0,
        signal: i
      } = {}
    }, a) {
      if (!r) return {
        data: null,
        error: new Ud("rpId is required for WebAuthn registration")
      };
      try {
        if (!tB()) return {
          data: null,
          error: new go("Browser does not support WebAuthn", null)
        };
        let {
          data: s,
          error: o
        } = await this._enroll({
          friendlyName: t
        });
        if (!s) return await this.client.mfa.listFactors().then(u => {
          var c;
          return (c = u.data) === null || c === void 0 ? void 0 : c.all.find(f => f.factor_type === "webauthn" && f.friendly_name === t && f.status !== "unverified")
        }).then(u => u ? this.client.mfa.unenroll({
          factorId: u == null ? void 0 : u.id
        }) : void 0), {
          data: null,
          error: o
        };
        let {
          data: l,
          error: A
        } = await this._challenge({
          factorId: s.id,
          friendlyName: s.friendly_name,
          webauthn: {
            rpId: r,
            rpOrigins: n
          },
          signal: i
        }, {
          create: a
        });
        return l ? this._verify({
          factorId: s.id,
          challengeId: l.challengeId,
          webauthn: {
            rpId: r,
            rpOrigins: n,
            type: l.webauthn.type,
            credential_response: l.webauthn.credential_response
          }
        }) : {
          data: null,
          error: A
        }
      } catch (s) {
        return jt(s) ? {
          data: null,
          error: s
        } : {
          data: null,
          error: new go("Unexpected error in register", s)
        }
      }
    }
  };
  Lde();
  var oat = {
    url: ude,
    storageKey: cde,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: fde,
    flowType: "implicit",
    debug: !1,
    hasCustomAuthorizationHeader: !1,
    throwOnError: !1,
    lockAcquireTimeout: 5e3,
    skipAutoInitialize: !1,
    experimental: {}
  };
  var X1 = {},
    fk = class e {
      get jwks() {
        var t, r;
        return (r = (t = X1[this.storageKey]) === null || t === void 0 ? void 0 : t.jwks) !== null && r !== void 0 ? r : {
          keys: []
        }
      }
      set jwks(t) {
        X1[this.storageKey] = Object.assign(Object.assign({}, X1[this.storageKey]), {
          jwks: t
        })
      }
      get jwks_cached_at() {
        var t, r;
        return (r = (t = X1[this.storageKey]) === null || t === void 0 ? void 0 : t.cachedAt) !== null && r !== void 0 ? r : Number.MIN_SAFE_INTEGER
      }
      set jwks_cached_at(t) {
        X1[this.storageKey] = Object.assign(Object.assign({}, X1[this.storageKey]), {
          cachedAt: t
        })
      }
      constructor(t) {
        var r, n, i;
        this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = new Map, this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lock = null, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
        let a = Object.assign(Object.assign({}, oat), t);
        if (this.storageKey = a.storageKey, this.instanceID = (r = e.nextInstanceID[this.storageKey]) !== null && r !== void 0 ? r : 0, e.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!a.debug, typeof a.debug == "function" && (this.logger = a.debug), this.instanceID > 0 && ys()) {
          let s = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
          console.warn(s), this.logDebugMessages && console.trace(s)
        }
        if (this.persistSession = a.persistSession, this.autoRefreshToken = a.autoRefreshToken, this.experimental = (n = a.experimental) !== null && n !== void 0 ? n : {}, this.admin = new Yp({
            url: a.url,
            headers: a.headers,
            fetch: a.fetch,
            experimental: this.experimental
          }), this.url = a.url, this.headers = a.headers, this.fetch = ak(a.fetch), this.detectSessionInUrl = a.detectSessionInUrl, this.flowType = a.flowType, this.hasCustomAuthorizationHeader = a.hasCustomAuthorizationHeader, this.throwOnError = a.throwOnError, this.lockAcquireTimeout = a.lockAcquireTimeout, a.lock != null && (this.lock = a.lock), this.jwks || (this.jwks = {
            keys: []
          }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
            webauthn: new uk(this)
          }, this.oauth = {
            getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
            approveAuthorization: this._approveAuthorization.bind(this),
            denyAuthorization: this._denyAuthorization.bind(this),
            listGrants: this._listOAuthGrants.bind(this),
            revokeGrant: this._revokeOAuthGrant.bind(this)
          }, this.passkey = {
            startRegistration: this._startPasskeyRegistration.bind(this),
            verifyRegistration: this._verifyPasskeyRegistration.bind(this),
            startAuthentication: this._startPasskeyAuthentication.bind(this),
            verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
            list: this._listPasskeys.bind(this),
            update: this._updatePasskey.bind(this),
            delete: this._deletePasskey.bind(this)
          }, this.persistSession ? (a.storage ? this.storage = a.storage : ik() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = hM(this.memoryStorage)), a.userStorage && (this.userStorage = a.userStorage)) : (this.memoryStorage = {}, this.storage = hM(this.memoryStorage)), ys() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey)
          } catch (s) {
            console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", s)
          }(i = this.broadcastChannel) === null || i === void 0 || i.addEventListener("message", async s => {
            this._debug("received broadcast notification from other tab or client", s);
            try {
              await this._notifyAllSubscribers(s.data.event, s.data.session, !1)
            } catch (o) {
              this._debug("#broadcastChannel", "error", o)
            }
          })
        }
        a.skipAutoInitialize || this.initialize().catch(s => {
          this._debug("#initialize()", "error", s)
        })
      }
      isThrowOnErrorEnabled() {
        return this.throwOnError
      }
      _returnResult(t) {
        if (this.throwOnError && t && t.error) throw t.error;
        return t
      }
      _logPrefix() {
        return `GoTrueClient@${this.storageKey}:${this.instanceID} (${J4}) ${new Date().toISOString()}`
      }
      _debug(...t) {
        return this.logDebugMessages && this.logger(this._logPrefix(), ...t), this
      }
      async initialize() {
        return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())(), await this.initializePromise)
      }
      async _initialize() {
        var t;
        try {
          let r = {},
            n = "none";
          if (ys() && (r = _de(window.location.href), this._isImplicitGrantCallback(r) ? n = "implicit" : await this._isPKCECallback(r) && (n = "pkce")), ys() && this.detectSessionInUrl && n !== "none") {
            let {
              data: i,
              error: a
            } = await this._getSessionFromURL(r, n);
            if (a) {
              if (this._debug("#_initialize()", "error detecting session from URL", a), gde(a)) {
                let l = (t = a.details) === null || t === void 0 ? void 0 : t.code;
                if (l === "identity_already_exists" || l === "identity_not_found" || l === "single_identity_not_deletable") return {
                  error: a
                }
              }
              return {
                error: a
              }
            }
            let {
              session: s,
              redirectType: o
            } = i;
            return this._debug("#_initialize()", "detected session in URL", s, "redirect type", o), await this._saveSession(s), setTimeout(async () => {
              o === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", s) : await this._notifyAllSubscribers("SIGNED_IN", s)
            }, 0), {
              error: null
            }
          }
          return await this._recoverAndRefresh(), {
            error: null
          }
        } catch (r) {
          return jt(r) ? this._returnResult({
            error: r
          }) : this._returnResult({
            error: new go("Unexpected error during initialization", r)
          })
        } finally {
          await this._handleVisibilityChange(), this._debug("#_initialize()", "end")
        }
      }
      async signInAnonymously(t) {
        var r, n, i;
        try {
          let a = await er(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                data: (n = (r = t == null ? void 0 : t.options) === null || r === void 0 ? void 0 : r.data) !== null && n !== void 0 ? n : {},
                gotrue_meta_security: {
                  captcha_token: (i = t == null ? void 0 : t.options) === null || i === void 0 ? void 0 : i.captchaToken
                }
              },
              xform: Yl
            }),
            {
              data: s,
              error: o
            } = a;
          if (o || !s) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: o
          });
          let l = s.session,
            A = s.user;
          return s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", l)), this._returnResult({
            data: {
              user: A,
              session: l
            },
            error: null
          })
        } catch (a) {
          if (jt(a)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: a
          });
          throw a
        }
      }
      async signUp(t) {
        var r, n, i;
        try {
          let a;
          if ("email" in t) {
            let {
              email: u,
              password: c,
              options: f
            } = t, h = null, p = null;
            this.flowType === "pkce" && ([h, p] = await $p(this.storage, this.storageKey)), a = await er(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              redirectTo: f == null ? void 0 : f.emailRedirectTo,
              body: {
                email: u,
                password: c,
                data: (r = f == null ? void 0 : f.data) !== null && r !== void 0 ? r : {},
                gotrue_meta_security: {
                  captcha_token: f == null ? void 0 : f.captchaToken
                },
                code_challenge: h,
                code_challenge_method: p
              },
              xform: Yl
            })
          } else if ("phone" in t) {
            let {
              phone: u,
              password: c,
              options: f
            } = t;
            a = await er(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone: u,
                password: c,
                data: (n = f == null ? void 0 : f.data) !== null && n !== void 0 ? n : {},
                channel: (i = f == null ? void 0 : f.channel) !== null && i !== void 0 ? i : "sms",
                gotrue_meta_security: {
                  captcha_token: f == null ? void 0 : f.captchaToken
                }
              },
              xform: Yl
            })
          } else throw new Wp("You must provide either an email or phone number and a password");
          let {
            data: s,
            error: o
          } = a;
          if (o || !s) return await Qa(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: o
          });
          let l = s.session,
            A = s.user;
          return s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", l)), this._returnResult({
            data: {
              user: A,
              session: l
            },
            error: null
          })
        } catch (a) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(a)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: a
          });
          throw a
        }
      }
      async signInWithPassword(t) {
        try {
          let r;
          if ("email" in t) {
            let {
              email: a,
              password: s,
              options: o
            } = t;
            r = await er(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                email: a,
                password: s,
                gotrue_meta_security: {
                  captcha_token: o == null ? void 0 : o.captchaToken
                }
              },
              xform: cM
            })
          } else if ("phone" in t) {
            let {
              phone: a,
              password: s,
              options: o
            } = t;
            r = await er(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                phone: a,
                password: s,
                gotrue_meta_security: {
                  captcha_token: o == null ? void 0 : o.captchaToken
                }
              },
              xform: cM
            })
          } else throw new Wp("You must provide either an email or phone number and a password");
          let {
            data: n,
            error: i
          } = r;
          if (i) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: i
          });
          if (!n || !n.session || !n.user) {
            let a = new Yf;
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: a
            })
          }
          return n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", n.session)), this._returnResult({
            data: Object.assign({
              user: n.user,
              session: n.session
            }, n.weak_password ? {
              weakPassword: n.weak_password
            } : null),
            error: i
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: r
          });
          throw r
        }
      }
      async signInWithOAuth(t) {
        var r, n, i, a;
        return await this._handleProviderSignIn(t.provider, {
          redirectTo: (r = t.options) === null || r === void 0 ? void 0 : r.redirectTo,
          scopes: (n = t.options) === null || n === void 0 ? void 0 : n.scopes,
          queryParams: (i = t.options) === null || i === void 0 ? void 0 : i.queryParams,
          skipBrowserRedirect: (a = t.options) === null || a === void 0 ? void 0 : a.skipBrowserRedirect
        })
      }
      async exchangeCodeForSession(t) {
        return await this.initializePromise, this.lock != null ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(t)) : this._exchangeCodeForSession(t)
      }
      async signInWithWeb3(t) {
        let {
          chain: r
        } = t;
        switch (r) {
          case "ethereum":
            return await this.signInWithEthereum(t);
          case "solana":
            return await this.signInWithSolana(t);
          default:
            throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)
        }
      }
      async signInWithEthereum(t) {
        var r, n, i, a, s, o, l, A, u, c, f;
        let h, p;
        if ("message" in t) h = t.message, p = t.signature;
        else {
          let {
            chain: d,
            wallet: g,
            statement: m,
            options: v
          } = t, y;
          if (ys())
            if (typeof g == "object") y = g;
            else {
              let N = window;
              if ("ethereum" in N && typeof N.ethereum == "object" && "request" in N.ethereum && typeof N.ethereum.request == "function") y = N.ethereum;
              else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")
            }
          else {
            if (typeof g != "object" || !(v != null && v.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            y = g
          }
          let C = new URL((r = v == null ? void 0 : v.url) !== null && r !== void 0 ? r : window.location.href),
            B = await y.request({
              method: "eth_requestAccounts"
            }).then(N => N).catch(() => {
              throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")
            });
          if (!B || B.length === 0) throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
          let T = dM(B[0]),
            E = (n = v == null ? void 0 : v.signInWithEthereum) === null || n === void 0 ? void 0 : n.chainId;
          if (!E) {
            let N = await y.request({
              method: "eth_chainId"
            });
            E = Ude(N)
          }
          let F = {
            domain: C.host,
            address: T,
            statement: m,
            uri: C.href,
            version: "1",
            chainId: E,
            nonce: (i = v == null ? void 0 : v.signInWithEthereum) === null || i === void 0 ? void 0 : i.nonce,
            issuedAt: (s = (a = v == null ? void 0 : v.signInWithEthereum) === null || a === void 0 ? void 0 : a.issuedAt) !== null && s !== void 0 ? s : new Date,
            expirationTime: (o = v == null ? void 0 : v.signInWithEthereum) === null || o === void 0 ? void 0 : o.expirationTime,
            notBefore: (l = v == null ? void 0 : v.signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
            requestId: (A = v == null ? void 0 : v.signInWithEthereum) === null || A === void 0 ? void 0 : A.requestId,
            resources: (u = v == null ? void 0 : v.signInWithEthereum) === null || u === void 0 ? void 0 : u.resources
          };
          h = Dde(F), p = await y.request({
            method: "personal_sign",
            params: [Rde(h), T]
          })
        }
        try {
          let {
            data: d,
            error: g
          } = await er(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
            headers: this.headers,
            body: Object.assign({
              chain: "ethereum",
              message: h,
              signature: p
            }, !((c = t.options) === null || c === void 0) && c.captchaToken ? {
              gotrue_meta_security: {
                captcha_token: (f = t.options) === null || f === void 0 ? void 0 : f.captchaToken
              }
            } : null),
            xform: Yl
          });
          if (g) throw g;
          if (!d || !d.session || !d.user) {
            let m = new Yf;
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: m
            })
          }
          return d.session && (await this._saveSession(d.session), await this._notifyAllSubscribers("SIGNED_IN", d.session)), this._returnResult({
            data: Object.assign({}, d),
            error: g
          })
        } catch (d) {
          if (jt(d)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: d
          });
          throw d
        }
      }
      async signInWithSolana(t) {
        var r, n, i, a, s, o, l, A, u, c, f, h;
        let p, d;
        if ("message" in t) p = t.message, d = t.signature;
        else {
          let {
            chain: g,
            wallet: m,
            statement: v,
            options: y
          } = t, C;
          if (ys())
            if (typeof m == "object") C = m;
            else {
              let T = window;
              if ("solana" in T && typeof T.solana == "object" && ("signIn" in T.solana && typeof T.solana.signIn == "function" || "signMessage" in T.solana && typeof T.solana.signMessage == "function")) C = T.solana;
              else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")
            }
          else {
            if (typeof m != "object" || !(y != null && y.url)) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            C = m
          }
          let B = new URL((r = y == null ? void 0 : y.url) !== null && r !== void 0 ? r : window.location.href);
          if ("signIn" in C && C.signIn) {
            let T = await C.signIn(Object.assign(Object.assign(Object.assign({
                issuedAt: new Date().toISOString()
              }, y == null ? void 0 : y.signInWithSolana), {
                version: "1",
                domain: B.host,
                uri: B.href
              }), v ? {
                statement: v
              } : null)),
              E;
            if (Array.isArray(T) && T[0] && typeof T[0] == "object") E = T[0];
            else if (T && typeof T == "object" && "signedMessage" in T && "signature" in T) E = T;
            else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
            if ("signedMessage" in E && "signature" in E && (typeof E.signedMessage == "string" || E.signedMessage instanceof Uint8Array) && E.signature instanceof Uint8Array) p = typeof E.signedMessage == "string" ? E.signedMessage : new TextDecoder().decode(E.signedMessage), d = E.signature;
            else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")
          } else {
            if (!("signMessage" in C) || typeof C.signMessage != "function" || !("publicKey" in C) || typeof C != "object" || !C.publicKey || !("toBase58" in C.publicKey) || typeof C.publicKey.toBase58 != "function") throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
            p = [`${B.host} wants you to sign in with your Solana account:`, C.publicKey.toBase58(), ...v ? ["", v, ""] : [""], "Version: 1", `URI: ${B.href}`, `Issued At: ${(i=(n=y==null?void 0:y.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`, ...!((a = y == null ? void 0 : y.signInWithSolana) === null || a === void 0) && a.notBefore ? [`Not Before: ${y.signInWithSolana.notBefore}`] : [], ...!((s = y == null ? void 0 : y.signInWithSolana) === null || s === void 0) && s.expirationTime ? [`Expiration Time: ${y.signInWithSolana.expirationTime}`] : [], ...!((o = y == null ? void 0 : y.signInWithSolana) === null || o === void 0) && o.chainId ? [`Chain ID: ${y.signInWithSolana.chainId}`] : [], ...!((l = y == null ? void 0 : y.signInWithSolana) === null || l === void 0) && l.nonce ? [`Nonce: ${y.signInWithSolana.nonce}`] : [], ...!((A = y == null ? void 0 : y.signInWithSolana) === null || A === void 0) && A.requestId ? [`Request ID: ${y.signInWithSolana.requestId}`] : [], ...!((c = (u = y == null ? void 0 : y.signInWithSolana) === null || u === void 0 ? void 0 : u.resources) === null || c === void 0) && c.length ? ["Resources", ...y.signInWithSolana.resources.map(E => `- ${E}`)] : []].join(`
`);
            let T = await C.signMessage(new TextEncoder().encode(p), "utf8");
            if (!T || !(T instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
            d = T
          }
        }
        try {
          let {
            data: g,
            error: m
          } = await er(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
            headers: this.headers,
            body: Object.assign({
              chain: "solana",
              message: p,
              signature: Jf(d)
            }, !((f = t.options) === null || f === void 0) && f.captchaToken ? {
              gotrue_meta_security: {
                captcha_token: (h = t.options) === null || h === void 0 ? void 0 : h.captchaToken
              }
            } : null),
            xform: Yl
          });
          if (m) throw m;
          if (!g || !g.session || !g.user) {
            let v = new Yf;
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: v
            })
          }
          return g.session && (await this._saveSession(g.session), await this._notifyAllSubscribers("SIGNED_IN", g.session)), this._returnResult({
            data: Object.assign({}, g),
            error: m
          })
        } catch (g) {
          if (jt(g)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: g
          });
          throw g
        }
      }
      async _exchangeCodeForSession(t) {
        let r = await Mc(this.storage, `${this.storageKey}-code-verifier`),
          [n, i] = (r != null ? r : "").split("/");
        try {
          if (!n && this.flowType === "pkce") throw new tk;
          let {
            data: a,
            error: s
          } = await er(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
            headers: this.headers,
            body: {
              auth_code: t,
              code_verifier: n
            },
            xform: Yl
          });
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), s) throw s;
          if (!a || !a.session || !a.user) {
            let o = new Yf;
            return this._returnResult({
              data: {
                user: null,
                session: null,
                redirectType: null
              },
              error: o
            })
          }
          return a.session && (await this._saveSession(a.session), await this._notifyAllSubscribers(i === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", a.session)), this._returnResult({
            data: Object.assign(Object.assign({}, a), {
              redirectType: i != null ? i : null
            }),
            error: s
          })
        } catch (a) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(a)) return this._returnResult({
            data: {
              user: null,
              session: null,
              redirectType: null
            },
            error: a
          });
          throw a
        }
      }
      async signInWithIdToken(t) {
        try {
          let {
            options: r,
            provider: n,
            token: i,
            access_token: a,
            nonce: s
          } = t, o = await er(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
            headers: this.headers,
            body: {
              provider: n,
              id_token: i,
              access_token: a,
              nonce: s,
              gotrue_meta_security: {
                captcha_token: r == null ? void 0 : r.captchaToken
              }
            },
            xform: Yl
          }), {
            data: l,
            error: A
          } = o;
          if (A) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: A
          });
          if (!l || !l.session || !l.user) {
            let u = new Yf;
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: u
            })
          }
          return l.session && (await this._saveSession(l.session), await this._notifyAllSubscribers("SIGNED_IN", l.session)), this._returnResult({
            data: l,
            error: A
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: r
          });
          throw r
        }
      }
      async signInWithOtp(t) {
        var r, n, i, a, s;
        try {
          if ("email" in t) {
            let {
              email: o,
              options: l
            } = t, A = null, u = null;
            this.flowType === "pkce" && ([A, u] = await $p(this.storage, this.storageKey));
            let {
              error: c
            } = await er(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                email: o,
                data: (r = l == null ? void 0 : l.data) !== null && r !== void 0 ? r : {},
                create_user: (n = l == null ? void 0 : l.shouldCreateUser) !== null && n !== void 0 ? n : !0,
                gotrue_meta_security: {
                  captcha_token: l == null ? void 0 : l.captchaToken
                },
                code_challenge: A,
                code_challenge_method: u
              },
              redirectTo: l == null ? void 0 : l.emailRedirectTo
            });
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: c
            })
          }
          if ("phone" in t) {
            let {
              phone: o,
              options: l
            } = t, {
              data: A,
              error: u
            } = await er(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                phone: o,
                data: (i = l == null ? void 0 : l.data) !== null && i !== void 0 ? i : {},
                create_user: (a = l == null ? void 0 : l.shouldCreateUser) !== null && a !== void 0 ? a : !0,
                gotrue_meta_security: {
                  captcha_token: l == null ? void 0 : l.captchaToken
                },
                channel: (s = l == null ? void 0 : l.channel) !== null && s !== void 0 ? s : "sms"
              }
            });
            return this._returnResult({
              data: {
                user: null,
                session: null,
                messageId: A == null ? void 0 : A.message_id
              },
              error: u
            })
          }
          throw new Wp("You must provide either an email or phone number.")
        } catch (o) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(o)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: o
          });
          throw o
        }
      }
      async verifyOtp(t) {
        var r, n;
        try {
          let i, a;
          "options" in t && (i = (r = t.options) === null || r === void 0 ? void 0 : r.redirectTo, a = (n = t.options) === null || n === void 0 ? void 0 : n.captchaToken);
          let {
            data: s,
            error: o
          } = await er(this.fetch, "POST", `${this.url}/verify`, {
            headers: this.headers,
            body: Object.assign(Object.assign({}, t), {
              gotrue_meta_security: {
                captcha_token: a
              }
            }),
            redirectTo: i,
            xform: Yl
          });
          if (o) throw o;
          if (!s) throw new Error("An error occurred on token verification.");
          let l = s.session,
            A = s.user;
          return l != null && l.access_token && (await this._saveSession(l), await this._notifyAllSubscribers(t.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), this._returnResult({
            data: {
              user: A,
              session: l
            },
            error: null
          })
        } catch (i) {
          if (jt(i)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: i
          });
          throw i
        }
      }
      async signInWithSSO(t) {
        var r, n, i, a, s;
        try {
          let o = null,
            l = null;
          this.flowType === "pkce" && ([o, l] = await $p(this.storage, this.storageKey));
          let A = await er(this.fetch, "POST", `${this.url}/sso`, {
            body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in t ? {
              provider_id: t.providerId
            } : null), "domain" in t ? {
              domain: t.domain
            } : null), {
              redirect_to: (n = (r = t.options) === null || r === void 0 ? void 0 : r.redirectTo) !== null && n !== void 0 ? n : void 0
            }), !((i = t == null ? void 0 : t.options) === null || i === void 0) && i.captchaToken ? {
              gotrue_meta_security: {
                captcha_token: t.options.captchaToken
              }
            } : null), {
              skip_http_redirect: !0,
              code_challenge: o,
              code_challenge_method: l
            }),
            headers: this.headers,
            xform: Pde
          });
          return !((a = A.data) === null || a === void 0) && a.url && ys() && !(!((s = t.options) === null || s === void 0) && s.skipBrowserRedirect) && window.location.assign(A.data.url), this._returnResult(A)
        } catch (o) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(o)) return this._returnResult({
            data: null,
            error: o
          });
          throw o
        }
      }
      async reauthenticate() {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate()
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async t => {
            let {
              data: {
                session: r
              },
              error: n
            } = t;
            if (n) throw n;
            if (!r) throw new Aa;
            let {
              error: i
            } = await er(this.fetch, "GET", `${this.url}/reauthenticate`, {
              headers: this.headers,
              jwt: r.access_token
            });
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: i
            })
          })
        } catch (t) {
          if (jt(t)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: t
          });
          throw t
        }
      }
      async resend(t) {
        try {
          let r = `${this.url}/resend`;
          if ("email" in t) {
            let {
              email: n,
              type: i,
              options: a
            } = t, {
              error: s
            } = await er(this.fetch, "POST", r, {
              headers: this.headers,
              body: {
                email: n,
                type: i,
                gotrue_meta_security: {
                  captcha_token: a == null ? void 0 : a.captchaToken
                }
              },
              redirectTo: a == null ? void 0 : a.emailRedirectTo
            });
            return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: s
            })
          } else if ("phone" in t) {
            let {
              phone: n,
              type: i,
              options: a
            } = t, {
              data: s,
              error: o
            } = await er(this.fetch, "POST", r, {
              headers: this.headers,
              body: {
                phone: n,
                type: i,
                gotrue_meta_security: {
                  captcha_token: a == null ? void 0 : a.captchaToken
                }
              }
            });
            return this._returnResult({
              data: {
                user: null,
                session: null,
                messageId: s == null ? void 0 : s.message_id
              },
              error: o
            })
          }
          throw new Wp("You must provide either an email or phone number and a type")
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: r
          });
          throw r
        }
      }
      async getSession() {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async t => t)) : await this._useSession(async t => t)
      }
      async _acquireLock(t, r) {
        this._debug("#_acquireLock", "begin", t);
        try {
          if (this.lockAcquired) {
            let n = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(),
              i = (async () => (await n, await r()))();
            return this.pendingInLock.push((async () => {
              try {
                await i
              } catch (a) {}
            })()), i
          }
          return await this.lock(`lock:${this.storageKey}`, t, async () => {
            this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
            try {
              this.lockAcquired = !0;
              let n = r();
              for (this.pendingInLock.push((async () => {
                  try {
                    await n
                  } catch (i) {}
                })()), await n; this.pendingInLock.length;) {
                let i = [...this.pendingInLock];
                await Promise.all(i), this.pendingInLock.splice(0, i.length)
              }
              return await n
            } finally {
              this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1
            }
          })
        } finally {
          this._debug("#_acquireLock", "end")
        }
      }
      async _useSession(t) {
        this._debug("#_useSession", "begin");
        try {
          let r = await this.__loadSession();
          return await t(r)
        } finally {
          this._debug("#_useSession", "end")
        }
      }
      async __loadSession() {
        this._debug("#__loadSession()", "begin"), this.lock != null && !this.lockAcquired && this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
        try {
          let t = null,
            r = await Mc(this.storage, this.storageKey);
          if (this._debug("#getSession()", "session from storage", r), r !== null && (this._isValidSession(r) ? t = r : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t) return {
            data: {
              session: null
            },
            error: null
          };
          let n = t.expires_at ? t.expires_at * 1e3 - Date.now() < Z4 : !1;
          if (this._debug("#__loadSession()", `session has${n?"":" not"} expired`, "expires_at", t.expires_at), !n) {
            if (this.userStorage) {
              let s = await Mc(this.userStorage, this.storageKey + "-user");
              s != null && s.user ? t.user = s.user : t.user = sk()
            }
            if (this.storage.isServer && t.user && !t.user.__isUserNotAvailableProxy) {
              let s = {
                value: this.suppressGetSessionWarning
              };
              t.user = Ode(t.user, s), s.value && (this.suppressGetSessionWarning = !0)
            }
            return {
              data: {
                session: t
              },
              error: null
            }
          }
          let {
            data: i,
            error: a
          } = await this._callRefreshToken(t.refresh_token);
          return a ? this._returnResult({
            data: {
              session: null
            },
            error: a
          }) : this._returnResult({
            data: {
              session: i
            },
            error: null
          })
        } finally {
          this._debug("#__loadSession()", "end")
        }
      }
      async getUser(t) {
        if (t) return await this._getUser(t);
        await this.initializePromise;
        let r;
        return this.lock != null ? r = await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : r = await this._getUser(), r.data.user && (this.suppressGetSessionWarning = !0), r
      }
      async _getUser(t) {
        try {
          return t ? await er(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: t,
            xform: Hc
          }) : await this._useSession(async r => {
            var n, i, a;
            let {
              data: s,
              error: o
            } = r;
            if (o) throw o;
            return !(!((n = s.session) === null || n === void 0) && n.access_token) && !this.hasCustomAuthorizationHeader ? {
              data: {
                user: null
              },
              error: new Aa
            } : await er(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt: (a = (i = s.session) === null || i === void 0 ? void 0 : i.access_token) !== null && a !== void 0 ? a : void 0,
              xform: Hc
            })
          })
        } catch (r) {
          if (jt(r)) return Jb(r) && (await this._removeSession(), await Qa(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({
            data: {
              user: null
            },
            error: r
          });
          throw r
        }
      }
      async updateUser(t, r = {}) {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(t, r)) : await this._updateUser(t, r)
      }
      async _updateUser(t, r = {}) {
        try {
          return await this._useSession(async n => {
            let {
              data: i,
              error: a
            } = n;
            if (a) throw a;
            if (!i.session) throw new Aa;
            let s = i.session,
              o = null,
              l = null;
            this.flowType === "pkce" && t.email != null && ([o, l] = await $p(this.storage, this.storageKey));
            let {
              data: A,
              error: u
            } = await er(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              redirectTo: r == null ? void 0 : r.emailRedirectTo,
              body: Object.assign(Object.assign({}, t), {
                code_challenge: o,
                code_challenge_method: l
              }),
              jwt: s.access_token,
              xform: Hc
            });
            if (u) throw u;
            return s.user = A.user, await this._saveSession(s), await this._notifyAllSubscribers("USER_UPDATED", s), this._returnResult({
              data: {
                user: s.user
              },
              error: null
            })
          })
        } catch (n) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(n)) return this._returnResult({
            data: {
              user: null
            },
            error: n
          });
          throw n
        }
      }
      async setSession(t) {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(t)) : await this._setSession(t)
      }
      async _setSession(t) {
        try {
          if (!t.access_token || !t.refresh_token) throw new Aa;
          let r = Date.now() / 1e3,
            n = r,
            i = !0,
            a = null,
            {
              payload: s
            } = eB(t.access_token);
          if (s.exp && (n = s.exp, i = n <= r), i) {
            let {
              data: o,
              error: l
            } = await this._callRefreshToken(t.refresh_token);
            if (l) return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: l
            });
            if (!o) return {
              data: {
                user: null,
                session: null
              },
              error: null
            };
            a = o
          } else {
            let {
              data: o,
              error: l
            } = await this._getUser(t.access_token);
            if (l) return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: l
            });
            a = {
              access_token: t.access_token,
              refresh_token: t.refresh_token,
              user: o.user,
              token_type: "bearer",
              expires_in: n - r,
              expires_at: n
            }, await this._saveSession(a), await this._notifyAllSubscribers("SIGNED_IN", a)
          }
          return this._returnResult({
            data: {
              user: a.user,
              session: a
            },
            error: null
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: {
              session: null,
              user: null
            },
            error: r
          });
          throw r
        }
      }
      async refreshSession(t) {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(t)) : await this._refreshSession(t)
      }
      async _refreshSession(t) {
        try {
          return await this._useSession(async r => {
            var n;
            if (!t) {
              let {
                data: s,
                error: o
              } = r;
              if (o) throw o;
              t = (n = s.session) !== null && n !== void 0 ? n : void 0
            }
            if (!(t != null && t.refresh_token)) throw new Aa;
            let {
              data: i,
              error: a
            } = await this._callRefreshToken(t.refresh_token);
            return a ? this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: a
            }) : i ? this._returnResult({
              data: {
                user: i.user,
                session: i
              },
              error: null
            }) : this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: null
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: {
              user: null,
              session: null
            },
            error: r
          });
          throw r
        }
      }
      async _getSessionFromURL(t, r) {
        var n;
        try {
          if (!ys()) throw new Gp("No browser detected.");
          if (t.error || t.error_description || t.error_code) throw new Gp(t.error_description || "Error in URL with unspecified error_description", {
            error: t.error || "unspecified_error",
            code: t.error_code || "unspecified_code"
          });
          switch (r) {
            case "implicit":
              if (this.flowType === "pkce") throw new $b("Not a valid PKCE flow url.");
              break;
            case "pkce":
              if (this.flowType === "implicit") throw new Gp("Not a valid implicit grant flow url.");
              break;
            default:
          }
          if (r === "pkce") {
            if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !t.code) throw new $b("No code detected.");
            let {
              data: y,
              error: C
            } = await this._exchangeCodeForSession(t.code);
            if (C) throw C;
            let B = new URL(window.location.href);
            return B.searchParams.delete("code"), window.history.replaceState(window.history.state, "", B.toString()), {
              data: {
                session: y.session,
                redirectType: (n = y.redirectType) !== null && n !== void 0 ? n : null
              },
              error: null
            }
          }
          let {
            provider_token: i,
            provider_refresh_token: a,
            access_token: s,
            refresh_token: o,
            expires_in: l,
            expires_at: A,
            token_type: u
          } = t;
          if (!s || !l || !o || !u) throw new Gp("No session defined in URL");
          let c = Math.round(Date.now() / 1e3),
            f = parseInt(l),
            h = c + f;
          A && (h = parseInt(A));
          let p = h - c;
          p * 1e3 <= Xf && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${f}s`);
          let d = h - f;
          c - d >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", d, h, c) : c - d < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", d, h, c);
          let {
            data: g,
            error: m
          } = await this._getUser(s);
          if (m) throw m;
          let v = {
            provider_token: i,
            provider_refresh_token: a,
            access_token: s,
            expires_in: f,
            expires_at: h,
            refresh_token: o,
            token_type: u,
            user: g.user
          };
          return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({
            data: {
              session: v,
              redirectType: t.type
            },
            error: null
          })
        } catch (i) {
          if (jt(i)) return this._returnResult({
            data: {
              session: null,
              redirectType: null
            },
            error: i
          });
          throw i
        }
      }
      _isImplicitGrantCallback(t) {
        return typeof this.detectSessionInUrl == "function" ? this.detectSessionInUrl(new URL(window.location.href), t) : !!(t.access_token || t.error || t.error_description || t.error_code)
      }
      async _isPKCECallback(t) {
        let r = await Mc(this.storage, `${this.storageKey}-code-verifier`);
        return !!(t.code && r)
      }
      async signOut(t = {
        scope: "global"
      }) {
        return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(t)) : await this._signOut(t)
      }
      async _signOut({
        scope: t
      } = {
        scope: "global"
      }) {
        return await this._useSession(async r => {
          var n;
          let {
            data: i,
            error: a
          } = r;
          if (a && !Jb(a)) return this._returnResult({
            error: a
          });
          let s = (n = i.session) === null || n === void 0 ? void 0 : n.access_token;
          if (s) {
            let {
              error: o
            } = await this.admin.signOut(s, t);
            if (o && !(pde(o) && (o.status === 404 || o.status === 401 || o.status === 403) || Jb(o))) return this._returnResult({
              error: o
            })
          }
          return t !== "others" && (await this._removeSession(), await Qa(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({
            error: null
          })
        })
      }
      onAuthStateChange(t) {
        let r = Bde(),
          n = {
            id: r,
            callback: t,
            unsubscribe: () => {
              this._debug("#unsubscribe()", "state change callback with id removed", r), this.stateChangeEmitters.delete(r)
            }
          };
        return this._debug("#onAuthStateChange()", "registered callback with id", r), this.stateChangeEmitters.set(r, n), (async () => (await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => {
          this._emitInitialSession(r)
        }) : await this._emitInitialSession(r)))(), {
          data: {
            subscription: n
          }
        }
      }
      async _emitInitialSession(t) {
        return await this._useSession(async r => {
          var n, i;
          try {
            let {
              data: {
                session: a
              },
              error: s
            } = r;
            if (s) throw s;
            await ((n = this.stateChangeEmitters.get(t)) === null || n === void 0 ? void 0 : n.callback("INITIAL_SESSION", a)), this._debug("INITIAL_SESSION", "callback id", t, "session", a)
          } catch (a) {
            await ((i = this.stateChangeEmitters.get(t)) === null || i === void 0 ? void 0 : i.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", t, "error", a), Jb(a) ? console.warn(a) : console.error(a)
          }
        })
      }
      async resetPasswordForEmail(t, r = {}) {
        let n = null,
          i = null;
        this.flowType === "pkce" && ([n, i] = await $p(this.storage, this.storageKey, !0));
        try {
          return await er(this.fetch, "POST", `${this.url}/recover`, {
            body: {
              email: t,
              code_challenge: n,
              code_challenge_method: i,
              gotrue_meta_security: {
                captcha_token: r.captchaToken
              }
            },
            headers: this.headers,
            redirectTo: r.redirectTo
          })
        } catch (a) {
          if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(a)) return this._returnResult({
            data: null,
            error: a
          });
          throw a
        }
      }
      async getUserIdentities() {
        var t;
        try {
          let {
            data: r,
            error: n
          } = await this.getUser();
          if (n) throw n;
          return this._returnResult({
            data: {
              identities: (t = r.user.identities) !== null && t !== void 0 ? t : []
            },
            error: null
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async linkIdentity(t) {
        return "token" in t ? this.linkIdentityIdToken(t) : this.linkIdentityOAuth(t)
      }
      async linkIdentityOAuth(t) {
        var r;
        try {
          let {
            data: n,
            error: i
          } = await this._useSession(async a => {
            var s, o, l, A, u;
            let {
              data: c,
              error: f
            } = a;
            if (f) throw f;
            let h = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, t.provider, {
              redirectTo: (s = t.options) === null || s === void 0 ? void 0 : s.redirectTo,
              scopes: (o = t.options) === null || o === void 0 ? void 0 : o.scopes,
              queryParams: (l = t.options) === null || l === void 0 ? void 0 : l.queryParams,
              skipBrowserRedirect: !0
            });
            return await er(this.fetch, "GET", h, {
              headers: this.headers,
              jwt: (u = (A = c.session) === null || A === void 0 ? void 0 : A.access_token) !== null && u !== void 0 ? u : void 0
            })
          });
          if (i) throw i;
          return ys() && !(!((r = t.options) === null || r === void 0) && r.skipBrowserRedirect) && window.location.assign(n == null ? void 0 : n.url), this._returnResult({
            data: {
              provider: t.provider,
              url: n == null ? void 0 : n.url
            },
            error: null
          })
        } catch (n) {
          if (jt(n)) return this._returnResult({
            data: {
              provider: t.provider,
              url: null
            },
            error: n
          });
          throw n
        }
      }
      async linkIdentityIdToken(t) {
        return await this._useSession(async r => {
          var n;
          try {
            let {
              error: i,
              data: {
                session: a
              }
            } = r;
            if (i) throw i;
            let {
              options: s,
              provider: o,
              token: l,
              access_token: A,
              nonce: u
            } = t, c = await er(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
              headers: this.headers,
              jwt: (n = a == null ? void 0 : a.access_token) !== null && n !== void 0 ? n : void 0,
              body: {
                provider: o,
                id_token: l,
                access_token: A,
                nonce: u,
                link_identity: !0,
                gotrue_meta_security: {
                  captcha_token: s == null ? void 0 : s.captchaToken
                }
              },
              xform: Yl
            }), {
              data: f,
              error: h
            } = c;
            return h ? this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: h
            }) : !f || !f.session || !f.user ? this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: new Yf
            }) : (f.session && (await this._saveSession(f.session), await this._notifyAllSubscribers("USER_UPDATED", f.session)), this._returnResult({
              data: f,
              error: h
            }))
          } catch (i) {
            if (await Qa(this.storage, `${this.storageKey}-code-verifier`), jt(i)) return this._returnResult({
              data: {
                user: null,
                session: null
              },
              error: i
            });
            throw i
          }
        })
      }
      async unlinkIdentity(t) {
        try {
          return await this._useSession(async r => {
            var n, i;
            let {
              data: a,
              error: s
            } = r;
            if (s) throw s;
            return await er(this.fetch, "DELETE", `${this.url}/user/identities/${t.identity_id}`, {
              headers: this.headers,
              jwt: (i = (n = a.session) === null || n === void 0 ? void 0 : n.access_token) !== null && i !== void 0 ? i : void 0
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _refreshAccessToken(t) {
        let r = "#_refreshAccessToken()";
        this._debug(r, "begin");
        try {
          let n = Date.now();
          return await Ede(async i => (i > 0 && await Cde(200 * Math.pow(2, i - 1)), this._debug(r, "refreshing attempt", i), await er(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
            body: {
              refresh_token: t
            },
            headers: this.headers,
            xform: Yl
          })), (i, a) => {
            let s = 200 * Math.pow(2, i);
            return a && rk(a) && Date.now() + s - n < Xf
          })
        } catch (n) {
          if (this._debug(r, "error", n), jt(n)) return this._returnResult({
            data: {
              session: null,
              user: null
            },
            error: n
          });
          throw n
        } finally {
          this._debug(r, "end")
        }
      }
      _isValidSession(t) {
        return typeof t == "object" && t !== null && "access_token" in t && "refresh_token" in t && "expires_at" in t
      }
      async _handleProviderSignIn(t, r) {
        let n = await this._getUrlForProvider(`${this.url}/authorize`, t, {
          redirectTo: r.redirectTo,
          scopes: r.scopes,
          queryParams: r.queryParams
        });
        return this._debug("#_handleProviderSignIn()", "provider", t, "options", r, "url", n), ys() && !r.skipBrowserRedirect && window.location.assign(n), {
          data: {
            provider: t,
            url: n
          },
          error: null
        }
      }
      async _recoverAndRefresh() {
        var t, r;
        let n = "#_recoverAndRefresh()";
        this._debug(n, "begin");
        try {
          let i = await Mc(this.storage, this.storageKey);
          if (i && this.userStorage) {
            let s = await Mc(this.userStorage, this.storageKey + "-user");
            !this.storage.isServer && Object.is(this.storage, this.userStorage) && !s && (s = {
              user: i.user
            }, await zp(this.userStorage, this.storageKey + "-user", s)), i.user = (t = s == null ? void 0 : s.user) !== null && t !== void 0 ? t : sk()
          } else if (i && !i.user && !i.user) {
            let s = await Mc(this.storage, this.storageKey + "-user");
            s && (s != null && s.user) ? (i.user = s.user, await Qa(this.storage, this.storageKey + "-user"), await zp(this.storage, this.storageKey, i)) : i.user = sk()
          }
          if (this._debug(n, "session from storage", i), !this._isValidSession(i)) {
            this._debug(n, "session is not valid"), i !== null && await this._removeSession();
            return
          }
          let a = ((r = i.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 - Date.now() < Z4;
          if (this._debug(n, `session has${a?"":" not"} expired with margin of ${Z4}s`), a) {
            if (this.autoRefreshToken && i.refresh_token) {
              let {
                error: s
              } = await this._callRefreshToken(i.refresh_token);
              s && (mde(s) ? this._debug(n, "refresh discarded by commit guard", s) : (console.error(s), rk(s) || (this._debug(n, "refresh failed with a non-retryable error, removing the session", s), await this._removeSession())))
            }
          } else if (i.user && i.user.__isUserNotAvailableProxy === !0) try {
            let {
              data: s,
              error: o
            } = await this._getUser(i.access_token);
            !o && (s != null && s.user) ? (i.user = s.user, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i)) : this._debug(n, "could not get user data, skipping SIGNED_IN notification")
          } catch (s) {
            console.error("Error getting user data:", s), this._debug(n, "error getting user data, skipping SIGNED_IN notification", s)
          } else await this._notifyAllSubscribers("SIGNED_IN", i)
        } catch (i) {
          this._debug(n, "error", i), console.error(i);
          return
        } finally {
          this._debug(n, "end")
        }
      }
      async _callRefreshToken(t) {
        var r, n;
        if (!t) throw new Aa;
        if (this.refreshingDeferred) return this.refreshingDeferred.promise;
        let i = "#_callRefreshToken()";
        this._debug(i, "begin");
        try {
          this.refreshingDeferred = new Zb;
          let a = await Mc(this.storage, this.storageKey),
            {
              data: s,
              error: o
            } = await this._refreshAccessToken(t);
          if (o) throw o;
          if (!s.session) throw new Aa;
          let l = await Mc(this.storage, this.storageKey);
          if (a !== null && (l === null || l.refresh_token !== a.refresh_token)) {
            this._debug(i, "commit guard: storage changed since refresh started, discarding rotated tokens", {
              startedWith: "present",
              nowHolds: l ? "replaced" : "cleared"
            });
            let f = {
              data: null,
              error: new Xb
            };
            return this.refreshingDeferred.resolve(f), f
          }
          let u = this._sessionRemovalEpoch;
          if (await this._saveSession(s.session), this._sessionRemovalEpoch !== u) {
            this._debug(i, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await Qa(this.storage, this.storageKey), this.userStorage && await Qa(this.userStorage, this.storageKey + "-user");
            let f = {
              data: null,
              error: new Xb
            };
            return this.refreshingDeferred.resolve(f), f
          }
          await this._notifyAllSubscribers("TOKEN_REFRESHED", s.session);
          let c = {
            data: s.session,
            error: null
          };
          return this.refreshingDeferred.resolve(c), c
        } catch (a) {
          if (this._debug(i, "error", a), jt(a)) {
            let s = {
              data: null,
              error: a
            };
            return rk(a) || await this._removeSession(), (r = this.refreshingDeferred) === null || r === void 0 || r.resolve(s), s
          }
          throw (n = this.refreshingDeferred) === null || n === void 0 || n.reject(a), a
        } finally {
          this.refreshingDeferred = null, this._debug(i, "end")
        }
      }
      async _notifyAllSubscribers(t, r, n = !0) {
        let i = `#_notifyAllSubscribers(${t})`;
        this._debug(i, "begin", r, `broadcast = ${n}`);
        try {
          this.broadcastChannel && n && this.broadcastChannel.postMessage({
            event: t,
            session: r
          });
          let a = [],
            s = Array.from(this.stateChangeEmitters.values()).map(async o => {
              try {
                await o.callback(t, r)
              } catch (l) {
                a.push(l)
              }
            });
          if (await Promise.all(s), a.length > 0) {
            for (let o = 0; o < a.length; o += 1) console.error(a[o]);
            throw a[0]
          }
        } finally {
          this._debug(i, "end")
        }
      }
      async _saveSession(t) {
        this._debug("#_saveSession()", t), this.suppressGetSessionWarning = !0, await Qa(this.storage, `${this.storageKey}-code-verifier`);
        let r = Object.assign({}, t),
          n = r.user && r.user.__isUserNotAvailableProxy === !0;
        if (this.userStorage) {
          !n && r.user && await zp(this.userStorage, this.storageKey + "-user", {
            user: r.user
          });
          let i = Object.assign({}, r);
          delete i.user;
          let a = uM(i);
          await zp(this.storage, this.storageKey, a)
        } else {
          let i = uM(r);
          await zp(this.storage, this.storageKey, i)
        }
      }
      async _removeSession() {
        this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.suppressGetSessionWarning = !1, await Qa(this.storage, this.storageKey), await Qa(this.storage, this.storageKey + "-code-verifier"), await Qa(this.storage, this.storageKey + "-user"), this.userStorage && await Qa(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null)
      }
      _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        let t = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          t && ys() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", t)
        } catch (r) {
          console.error("removing visibilitychange callback failed", r)
        }
      }
      async _startAutoRefresh() {
        await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
        let t = setInterval(() => this._autoRefreshTokenTick(), Xf);
        this.autoRefreshTicker = t, t && typeof t == "object" && typeof t.unref == "function" ? t.unref() : typeof Deno != "undefined" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(t);
        let r = setTimeout(async () => {
          await this.initializePromise, await this._autoRefreshTokenTick()
        }, 0);
        this.autoRefreshTickTimeout = r, r && typeof r == "object" && typeof r.unref == "function" ? r.unref() : typeof Deno != "undefined" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(r)
      }
      async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        let t = this.autoRefreshTicker;
        this.autoRefreshTicker = null, t && clearInterval(t);
        let r = this.autoRefreshTickTimeout;
        this.autoRefreshTickTimeout = null, r && clearTimeout(r)
      }
      async startAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._startAutoRefresh()
      }
      async stopAutoRefresh() {
        this._removeVisibilityChangedCallback(), await this._stopAutoRefresh()
      }
      async dispose() {
        var t;
        this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), (t = this.broadcastChannel) === null || t === void 0 || t.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear()
      }
      async _autoRefreshTokenTick() {
        if (this._debug("#_autoRefreshTokenTick()", "begin"), this.lock != null) {
          try {
            await this._acquireLock(0, async () => {
              try {
                let t = Date.now();
                try {
                  return await this._useSession(async r => {
                    let {
                      data: {
                        session: n
                      }
                    } = r;
                    if (!n || !n.refresh_token || !n.expires_at) {
                      this._debug("#_autoRefreshTokenTick()", "no session");
                      return
                    }
                    let i = Math.floor((n.expires_at * 1e3 - t) / Xf);
                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${i} ticks, a tick lasts ${Xf}ms, refresh threshold is ${z1} ticks`), i <= z1 && await this._callRefreshToken(n.refresh_token)
                  })
                } catch (r) {
                  console.error("Auto refresh tick failed with error. This is likely a transient error.", r)
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end")
              }
            })
          } catch (t) {
            if (t instanceof lk) this._debug("auto refresh token tick lock not available");
            else throw t
          }
          return
        }
        if (this.refreshingDeferred !== null) {
          this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
          return
        }
        try {
          let t = Date.now();
          try {
            await this._useSession(async r => {
              let {
                data: {
                  session: n
                }
              } = r;
              if (!n || !n.refresh_token || !n.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return
              }
              let i = Math.floor((n.expires_at * 1e3 - t) / Xf);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${i} ticks, a tick lasts ${Xf}ms, refresh threshold is ${z1} ticks`), i <= z1 && await this._callRefreshToken(n.refresh_token)
            })
          } catch (r) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", r)
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end")
        }
      }
      async _handleVisibilityChange() {
        if (this._debug("#_handleVisibilityChange()"), !ys() || !(window != null && window.addEventListener)) return this.autoRefreshToken && this.startAutoRefresh(), !1;
        try {
          this.visibilityChangedCallback = async () => {
            try {
              await this._onVisibilityChanged(!1)
            } catch (t) {
              this._debug("#visibilityChangedCallback", "error", t)
            }
          }, window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0)
        } catch (t) {
          console.error("_handleVisibilityChange", t)
        }
      }
      async _onVisibilityChanged(t) {
        let r = `#_onVisibilityChanged(${t})`;
        if (this._debug(r, "visibilityState", document.visibilityState), document.visibilityState === "visible") {
          if (this.autoRefreshToken && this._startAutoRefresh(), !t)
            if (await this.initializePromise, this.lock != null) await this._acquireLock(this.lockAcquireTimeout, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(r, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                return
              }
              await this._recoverAndRefresh()
            });
            else {
              if (document.visibilityState !== "visible") {
                this._debug(r, "visibilityState is no longer visible, skipping recovery");
                return
              }
              await this._recoverAndRefresh()
            }
        } else document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh()
      }
      async _getUrlForProvider(t, r, n) {
        let i = [`provider=${encodeURIComponent(r)}`];
        if (n != null && n.redirectTo && i.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`), n != null && n.scopes && i.push(`scopes=${encodeURIComponent(n.scopes)}`), this.flowType === "pkce") {
          let [a, s] = await $p(this.storage, this.storageKey), o = new URLSearchParams({
            code_challenge: `${encodeURIComponent(a)}`,
            code_challenge_method: `${encodeURIComponent(s)}`
          });
          i.push(o.toString())
        }
        if (n != null && n.queryParams) {
          let a = new URLSearchParams(n.queryParams);
          i.push(a.toString())
        }
        return n != null && n.skipBrowserRedirect && i.push(`skip_http_redirect=${n.skipBrowserRedirect}`), `${t}?${i.join("&")}`
      }
      async _unenroll(t) {
        try {
          return await this._useSession(async r => {
            var n;
            let {
              data: i,
              error: a
            } = r;
            return a ? this._returnResult({
              data: null,
              error: a
            }) : await er(this.fetch, "DELETE", `${this.url}/factors/${t.factorId}`, {
              headers: this.headers,
              jwt: (n = i == null ? void 0 : i.session) === null || n === void 0 ? void 0 : n.access_token
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _enroll(t) {
        try {
          return await this._useSession(async r => {
            var n, i;
            let {
              data: a,
              error: s
            } = r;
            if (s) return this._returnResult({
              data: null,
              error: s
            });
            let o = Object.assign({
                friendly_name: t.friendlyName,
                factor_type: t.factorType
              }, t.factorType === "phone" ? {
                phone: t.phone
              } : t.factorType === "totp" ? {
                issuer: t.issuer
              } : {}),
              {
                data: l,
                error: A
              } = await er(this.fetch, "POST", `${this.url}/factors`, {
                body: o,
                headers: this.headers,
                jwt: (n = a == null ? void 0 : a.session) === null || n === void 0 ? void 0 : n.access_token
              });
            return A ? this._returnResult({
              data: null,
              error: A
            }) : (t.factorType === "totp" && l.type === "totp" && (!((i = l == null ? void 0 : l.totp) === null || i === void 0) && i.qr_code) && (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`), this._returnResult({
              data: l,
              error: null
            }))
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _verify(t) {
        let r = async () => {
          try {
            return await this._useSession(async n => {
              var i;
              let {
                data: a,
                error: s
              } = n;
              if (s) return this._returnResult({
                data: null,
                error: s
              });
              let o = Object.assign({
                  challenge_id: t.challengeId
                }, "webauthn" in t ? {
                  webauthn: Object.assign(Object.assign({}, t.webauthn), {
                    credential_response: t.webauthn.type === "create" ? yM(t.webauthn.credential_response) : wM(t.webauthn.credential_response)
                  })
                } : {
                  code: t.code
                }),
                {
                  data: l,
                  error: A
                } = await er(this.fetch, "POST", `${this.url}/factors/${t.factorId}/verify`, {
                  body: o,
                  headers: this.headers,
                  jwt: (i = a == null ? void 0 : a.session) === null || i === void 0 ? void 0 : i.access_token
                });
              return A ? this._returnResult({
                data: null,
                error: A
              }) : (await this._saveSession(Object.assign({
                expires_at: Math.round(Date.now() / 1e3) + l.expires_in
              }, l)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l), this._returnResult({
                data: l,
                error: A
              }))
            })
          } catch (n) {
            if (jt(n)) return this._returnResult({
              data: null,
              error: n
            });
            throw n
          }
        };
        return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r()
      }
      async _challenge(t) {
        let r = async () => {
          try {
            return await this._useSession(async n => {
              var i;
              let {
                data: a,
                error: s
              } = n;
              if (s) return this._returnResult({
                data: null,
                error: s
              });
              let o = await er(this.fetch, "POST", `${this.url}/factors/${t.factorId}/challenge`, {
                body: t,
                headers: this.headers,
                jwt: (i = a == null ? void 0 : a.session) === null || i === void 0 ? void 0 : i.access_token
              });
              if (o.error) return o;
              let {
                data: l
              } = o;
              if (l.type !== "webauthn") return {
                data: l,
                error: null
              };
              switch (l.webauthn.type) {
                case "create":
                  return {
                    data: Object.assign(Object.assign({}, l), {
                      webauthn: Object.assign(Object.assign({}, l.webauthn), {
                        credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), {
                          publicKey: mM(l.webauthn.credential_options.publicKey)
                        })
                      })
                    }), error: null
                  };
                case "request":
                  return {
                    data: Object.assign(Object.assign({}, l), {
                      webauthn: Object.assign(Object.assign({}, l.webauthn), {
                        credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), {
                          publicKey: vM(l.webauthn.credential_options.publicKey)
                        })
                      })
                    }), error: null
                  }
              }
            })
          } catch (n) {
            if (jt(n)) return this._returnResult({
              data: null,
              error: n
            });
            throw n
          }
        };
        return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r()
      }
      async _challengeAndVerify(t) {
        let {
          data: r,
          error: n
        } = await this._challenge({
          factorId: t.factorId
        });
        return n ? this._returnResult({
          data: null,
          error: n
        }) : await this._verify({
          factorId: t.factorId,
          challengeId: r.id,
          code: t.code
        })
      }
      async _listFactors() {
        var t;
        let {
          data: {
            user: r
          },
          error: n
        } = await this.getUser();
        if (n) return {
          data: null,
          error: n
        };
        let i = {
          all: [],
          phone: [],
          totp: [],
          webauthn: []
        };
        for (let a of (t = r == null ? void 0 : r.factors) !== null && t !== void 0 ? t : []) i.all.push(a), a.status === "verified" && i[a.factor_type].push(a);
        return {
          data: i,
          error: null
        }
      }
      async _getAuthenticatorAssuranceLevel(t) {
        var r, n, i, a;
        if (t) try {
          let {
            payload: h
          } = eB(t), p = null;
          h.aal && (p = h.aal);
          let d = p,
            {
              data: {
                user: g
              },
              error: m
            } = await this.getUser(t);
          if (m) return this._returnResult({
            data: null,
            error: m
          });
          ((n = (r = g == null ? void 0 : g.factors) === null || r === void 0 ? void 0 : r.filter(C => C.status === "verified")) !== null && n !== void 0 ? n : []).length > 0 && (d = "aal2");
          let y = h.amr || [];
          return {
            data: {
              currentLevel: p,
              nextLevel: d,
              currentAuthenticationMethods: y
            },
            error: null
          }
        } catch (h) {
          if (jt(h)) return this._returnResult({
            data: null,
            error: h
          });
          throw h
        }
        let {
          data: {
            session: s
          },
          error: o
        } = await this.getSession();
        if (o) return this._returnResult({
          data: null,
          error: o
        });
        if (!s) return {
          data: {
            currentLevel: null,
            nextLevel: null,
            currentAuthenticationMethods: []
          },
          error: null
        };
        let {
          payload: l
        } = eB(s.access_token), A = null;
        l.aal && (A = l.aal);
        let u = A;
        ((a = (i = s.user.factors) === null || i === void 0 ? void 0 : i.filter(h => h.status === "verified")) !== null && a !== void 0 ? a : []).length > 0 && (u = "aal2");
        let f = l.amr || [];
        return {
          data: {
            currentLevel: A,
            nextLevel: u,
            currentAuthenticationMethods: f
          },
          error: null
        }
      }
      async _getAuthorizationDetails(t) {
        try {
          return await this._useSession(async r => {
            let {
              data: {
                session: n
              },
              error: i
            } = r;
            return i ? this._returnResult({
              data: null,
              error: i
            }) : n ? await er(this.fetch, "GET", `${this.url}/oauth/authorizations/${t}`, {
              headers: this.headers,
              jwt: n.access_token,
              xform: a => ({
                data: a,
                error: null
              })
            }) : this._returnResult({
              data: null,
              error: new Aa
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _approveAuthorization(t, r) {
        try {
          return await this._useSession(async n => {
            let {
              data: {
                session: i
              },
              error: a
            } = n;
            if (a) return this._returnResult({
              data: null,
              error: a
            });
            if (!i) return this._returnResult({
              data: null,
              error: new Aa
            });
            let s = await er(this.fetch, "POST", `${this.url}/oauth/authorizations/${t}/consent`, {
              headers: this.headers,
              jwt: i.access_token,
              body: {
                action: "approve"
              },
              xform: o => ({
                data: o,
                error: null
              })
            });
            return s.data && s.data.redirect_url && ys() && !(r != null && r.skipBrowserRedirect) && window.location.assign(s.data.redirect_url), s
          })
        } catch (n) {
          if (jt(n)) return this._returnResult({
            data: null,
            error: n
          });
          throw n
        }
      }
      async _denyAuthorization(t, r) {
        try {
          return await this._useSession(async n => {
            let {
              data: {
                session: i
              },
              error: a
            } = n;
            if (a) return this._returnResult({
              data: null,
              error: a
            });
            if (!i) return this._returnResult({
              data: null,
              error: new Aa
            });
            let s = await er(this.fetch, "POST", `${this.url}/oauth/authorizations/${t}/consent`, {
              headers: this.headers,
              jwt: i.access_token,
              body: {
                action: "deny"
              },
              xform: o => ({
                data: o,
                error: null
              })
            });
            return s.data && s.data.redirect_url && ys() && !(r != null && r.skipBrowserRedirect) && window.location.assign(s.data.redirect_url), s
          })
        } catch (n) {
          if (jt(n)) return this._returnResult({
            data: null,
            error: n
          });
          throw n
        }
      }
      async _listOAuthGrants() {
        try {
          return await this._useSession(async t => {
            let {
              data: {
                session: r
              },
              error: n
            } = t;
            return n ? this._returnResult({
              data: null,
              error: n
            }) : r ? await er(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
              headers: this.headers,
              jwt: r.access_token,
              xform: i => ({
                data: i,
                error: null
              })
            }) : this._returnResult({
              data: null,
              error: new Aa
            })
          })
        } catch (t) {
          if (jt(t)) return this._returnResult({
            data: null,
            error: t
          });
          throw t
        }
      }
      async _revokeOAuthGrant(t) {
        try {
          return await this._useSession(async r => {
            let {
              data: {
                session: n
              },
              error: i
            } = r;
            return i ? this._returnResult({
              data: null,
              error: i
            }) : n ? (await er(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
              headers: this.headers,
              jwt: n.access_token,
              query: {
                client_id: t.clientId
              },
              noResolveJson: !0
            }), {
              data: {},
              error: null
            }) : this._returnResult({
              data: null,
              error: new Aa
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async fetchJwk(t, r = {
        keys: []
      }) {
        let n = r.keys.find(o => o.kid === t);
        if (n) return n;
        let i = Date.now();
        if (n = this.jwks.keys.find(o => o.kid === t), n && this.jwks_cached_at + dde > i) return n;
        let {
          data: a,
          error: s
        } = await er(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
          headers: this.headers
        });
        if (s) throw s;
        return !a.keys || a.keys.length === 0 || (this.jwks = a, this.jwks_cached_at = i, n = a.keys.find(o => o.kid === t), !n) ? null : n
      }
      async getClaims(t, r = {}) {
        try {
          let n = t;
          if (!n) {
            let {
              data: h,
              error: p
            } = await this.getSession();
            if (p || !h.session) return this._returnResult({
              data: null,
              error: p
            });
            n = h.session.access_token
          }
          let {
            header: i,
            payload: a,
            signature: s,
            raw: {
              header: o,
              payload: l
            }
          } = eB(n);
          if (!(r != null && r.allowExpired)) try {
            kde(a.exp)
          } catch (h) {
            throw new Rd(h instanceof Error ? h.message : "JWT validation failed")
          }
          let A = !i.alg || i.alg.startsWith("HS") || !i.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(i.kid, r != null && r.keys ? {
            keys: r.keys
          } : r == null ? void 0 : r.jwks);
          if (!A) {
            let {
              error: h
            } = await this.getUser(n);
            if (h) throw h;
            return {
              data: {
                claims: a,
                header: i,
                signature: s
              },
              error: null
            }
          }
          let u = Fde(i.alg),
            c = await crypto.subtle.importKey("jwk", A, u, !0, ["verify"]);
          if (!await crypto.subtle.verify(u, c, s, xde(`${o}.${l}`))) throw new Rd("Invalid JWT signature");
          return {
            data: {
              claims: a,
              header: i,
              signature: s
            },
            error: null
          }
        } catch (n) {
          if (jt(n)) return this._returnResult({
            data: null,
            error: n
          });
          throw n
        }
      }
      async signInWithPasskey(t) {
        var r, n, i;
        Xl(this.experimental);
        try {
          if (!tB()) return this._returnResult({
            data: null,
            error: new go("Browser does not support WebAuthn", null)
          });
          let {
            data: a,
            error: s
          } = await this._startPasskeyAuthentication({
            options: {
              captchaToken: (r = t == null ? void 0 : t.options) === null || r === void 0 ? void 0 : r.captchaToken
            }
          });
          if (s || !a) return this._returnResult({
            data: null,
            error: s
          });
          let o = vM(a.options),
            l = (i = (n = t == null ? void 0 : t.options) === null || n === void 0 ? void 0 : n.signal) !== null && i !== void 0 ? i : ck.createNewAbortSignal(),
            {
              data: A,
              error: u
            } = await bM({
              publicKey: o,
              signal: l
            });
          if (u || !A) return this._returnResult({
            data: null,
            error: u != null ? u : new go("WebAuthn ceremony failed", null)
          });
          let c = wM(A);
          return this._verifyPasskeyAuthentication({
            challengeId: a.challenge_id,
            credential: c
          })
        } catch (a) {
          if (jt(a)) return this._returnResult({
            data: null,
            error: a
          });
          throw a
        }
      }
      async registerPasskey(t) {
        var r, n;
        Xl(this.experimental);
        try {
          if (!tB()) return this._returnResult({
            data: null,
            error: new go("Browser does not support WebAuthn", null)
          });
          let {
            data: i,
            error: a
          } = await this._startPasskeyRegistration();
          if (a || !i) return this._returnResult({
            data: null,
            error: a
          });
          let s = mM(i.options),
            o = (n = (r = t == null ? void 0 : t.options) === null || r === void 0 ? void 0 : r.signal) !== null && n !== void 0 ? n : ck.createNewAbortSignal(),
            {
              data: l,
              error: A
            } = await xM({
              publicKey: s,
              signal: o
            });
          if (A || !l) return this._returnResult({
            data: null,
            error: A != null ? A : new go("WebAuthn ceremony failed", null)
          });
          let u = yM(l);
          return this._verifyPasskeyRegistration({
            challengeId: i.challenge_id,
            credential: u
          })
        } catch (i) {
          if (jt(i)) return this._returnResult({
            data: null,
            error: i
          });
          throw i
        }
      }
      async _startPasskeyRegistration() {
        Xl(this.experimental);
        try {
          return await this._useSession(async t => {
            let {
              data: {
                session: r
              },
              error: n
            } = t;
            if (n) return this._returnResult({
              data: null,
              error: n
            });
            if (!r) return this._returnResult({
              data: null,
              error: new Aa
            });
            let {
              data: i,
              error: a
            } = await er(this.fetch, "POST", `${this.url}/passkeys/registration/options`, {
              headers: this.headers,
              jwt: r.access_token,
              body: {}
            });
            return a ? this._returnResult({
              data: null,
              error: a
            }) : this._returnResult({
              data: i,
              error: null
            })
          })
        } catch (t) {
          if (jt(t)) return this._returnResult({
            data: null,
            error: t
          });
          throw t
        }
      }
      async _verifyPasskeyRegistration(t) {
        Xl(this.experimental);
        try {
          return await this._useSession(async r => {
            let {
              data: {
                session: n
              },
              error: i
            } = r;
            if (i) return this._returnResult({
              data: null,
              error: i
            });
            if (!n) return this._returnResult({
              data: null,
              error: new Aa
            });
            let {
              data: a,
              error: s
            } = await er(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, {
              headers: this.headers,
              jwt: n.access_token,
              body: {
                challenge_id: t.challengeId,
                credential: t.credential
              }
            });
            return s ? this._returnResult({
              data: null,
              error: s
            }) : this._returnResult({
              data: a,
              error: null
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _startPasskeyAuthentication(t) {
        var r;
        Xl(this.experimental);
        try {
          let {
            data: n,
            error: i
          } = await er(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, {
            headers: this.headers,
            body: {
              gotrue_meta_security: {
                captcha_token: (r = t == null ? void 0 : t.options) === null || r === void 0 ? void 0 : r.captchaToken
              }
            }
          });
          return i ? this._returnResult({
            data: null,
            error: i
          }) : this._returnResult({
            data: n,
            error: null
          })
        } catch (n) {
          if (jt(n)) return this._returnResult({
            data: null,
            error: n
          });
          throw n
        }
      }
      async _verifyPasskeyAuthentication(t) {
        Xl(this.experimental);
        try {
          let {
            data: r,
            error: n
          } = await er(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, {
            headers: this.headers,
            body: {
              challenge_id: t.challengeId,
              credential: t.credential
            },
            xform: Yl
          });
          return n ? this._returnResult({
            data: null,
            error: n
          }) : (r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), this._returnResult({
            data: r,
            error: null
          }))
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _listPasskeys() {
        Xl(this.experimental);
        try {
          return await this._useSession(async t => {
            let {
              data: {
                session: r
              },
              error: n
            } = t;
            if (n) return this._returnResult({
              data: null,
              error: n
            });
            if (!r) return this._returnResult({
              data: null,
              error: new Aa
            });
            let {
              data: i,
              error: a
            } = await er(this.fetch, "GET", `${this.url}/passkeys`, {
              headers: this.headers,
              jwt: r.access_token,
              xform: s => ({
                data: s,
                error: null
              })
            });
            return a ? this._returnResult({
              data: null,
              error: a
            }) : this._returnResult({
              data: i,
              error: null
            })
          })
        } catch (t) {
          if (jt(t)) return this._returnResult({
            data: null,
            error: t
          });
          throw t
        }
      }
      async _updatePasskey(t) {
        Xl(this.experimental);
        try {
          return await this._useSession(async r => {
            let {
              data: {
                session: n
              },
              error: i
            } = r;
            if (i) return this._returnResult({
              data: null,
              error: i
            });
            if (!n) return this._returnResult({
              data: null,
              error: new Aa
            });
            let {
              data: a,
              error: s
            } = await er(this.fetch, "PATCH", `${this.url}/passkeys/${t.passkeyId}`, {
              headers: this.headers,
              jwt: n.access_token,
              body: {
                friendly_name: t.friendlyName
              }
            });
            return s ? this._returnResult({
              data: null,
              error: s
            }) : this._returnResult({
              data: a,
              error: null
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
      async _deletePasskey(t) {
        Xl(this.experimental);
        try {
          return await this._useSession(async r => {
            let {
              data: {
                session: n
              },
              error: i
            } = r;
            if (i) return this._returnResult({
              data: null,
              error: i
            });
            if (!n) return this._returnResult({
              data: null,
              error: new Aa
            });
            let {
              error: a
            } = await er(this.fetch, "DELETE", `${this.url}/passkeys/${t.passkeyId}`, {
              headers: this.headers,
              jwt: n.access_token,
              noResolveJson: !0
            });
            return a ? this._returnResult({
              data: null,
              error: a
            }) : this._returnResult({
              data: null,
              error: null
            })
          })
        } catch (r) {
          if (jt(r)) return this._returnResult({
            data: null,
            error: r
          });
          throw r
        }
      }
    };
  fk.nextInstanceID = {};
  var BM = fk;
  var lat = BM,
    _M = lat;
  var Aat = "2.107.0",
    rB = "",
    pk;
  typeof Deno != "undefined" ? (rB = "deno", pk = (hk = Deno.version) === null || hk === void 0 ? void 0 : hk.deno) : typeof document != "undefined" ? rB = "web" : typeof navigator != "undefined" && navigator.product === "ReactNative" ? rB = "react-native" : (rB = "node", pk = typeof process != "undefined" ? (dk = process.version) === null || dk === void 0 ? void 0 : dk.replace(/^v/, "") : void 0);
  var hk, dk, qde = [`runtime=${rB}`];
  pk && qde.push(`runtime-version=${pk}`);
  var uat = {
      "X-Client-Info": `supabase-js/${Aat}; ${qde.join("; ")}`
    },
    cat = {
      headers: uat
    },
    fat = {
      schema: "public"
    },
    hat = {
      autoRefreshToken: !0,
      persistSession: !0,
      detectSessionInUrl: !0,
      flowType: "implicit"
    },
    dat = {},
    pat = {
      enabled: !1,
      respectSamplingDecision: !0
    };

  function gat(e, t, r, n) {
    function i(a) {
      return a instanceof r ? a : new r(function(s) {
        s(a)
      })
    }
    return new(r || (r = Promise))(function(a, s) {
      function o(u) {
        try {
          A(n.next(u))
        } catch (c) {
          s(c)
        }
      }

      function l(u) {
        try {
          A(n.throw(u))
        } catch (c) {
          s(c)
        }
      }

      function A(u) {
        u.done ? a(u.value) : i(u.value).then(o, l)
      }
      A((n = n.apply(e, t || [])).next())
    })
  }
  var SM = null,
    mat = "@opentelemetry/api";

  function vat() {
    return SM === null && (SM = import(mat).catch(() => null)), SM
  }

  function yat() {
    return gat(this, void 0, void 0, function*() {
      try {
        let e = yield vat();
        if (!e || !e.propagation || !e.context) return null;
        let t = {};
        e.propagation.inject(e.context.active(), t);
        let r = t.traceparent;
        return r ? {
          traceparent: r,
          tracestate: t.tracestate,
          baggage: t.baggage
        } : null
      } catch (e) {
        return null
      }
    })
  }

  function wat(e) {
    if (!e || typeof e != "string") return null;
    let t = e.split("-");
    if (t.length !== 4) return null;
    let [r, n, i, a] = t;
    if (r.length !== 2 || n.length !== 32 || i.length !== 16 || a.length !== 2) return null;
    let s = /^[0-9a-f]+$/i;
    return !s.test(r) || !s.test(n) || !s.test(i) || !s.test(a) || n === "00000000000000000000000000000000" || i === "0000000000000000" ? null : {
      version: r,
      traceId: n,
      parentId: i,
      traceFlags: a,
      isSampled: (parseInt(a, 16) & 1) === 1
    }
  }

  function xat(e, t) {
    if (!e || !t || t.length === 0) return !1;
    let r;
    if (e instanceof URL) r = e;
    else try {
      r = new URL(e)
    } catch (n) {
      return !1
    }
    for (let n of t) try {
      if (typeof n == "string") {
        if (bat(r.hostname, n)) return !0
      } else if (n instanceof RegExp) {
        if (n.test(r.hostname)) return !0
      } else if (typeof n == "function" && n(r)) return !0
    } catch (i) {
      continue
    }
    return !1
  }

  function bat(e, t) {
    if (t === e) return !0;
    if (t.startsWith("*.")) {
      let r = t.slice(2);
      if (e.endsWith(r) && (e === r || e.endsWith("." + r))) return !0
    }
    return !1
  }

  function Bat(e) {
    let t = [];
    try {
      let r = new URL(e);
      t.push(r.hostname)
    } catch (r) {}
    return t.push("*.supabase.co", "*.supabase.in"), t.push("localhost", "127.0.0.1", "[::1]"), t
  }

  function nB(e) {
    "@babel/helpers - typeof";
    return nB = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, nB(e)
  }

  function _at(e, t) {
    if (nB(e) != "object" || !e) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t || "default");
      if (nB(n) != "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (t === "string" ? String : Number)(e)
  }

  function Sat(e) {
    var t = _at(e, "string");
    return nB(t) == "symbol" ? t : t + ""
  }

  function Cat(e, t, r) {
    return (t = Sat(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = r, e
  }

  function Hde(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function(i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })), r.push.apply(r, n)
    }
    return r
  }

  function ua(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? Hde(Object(r), !0).forEach(function(n) {
        Cat(e, n, r[n])
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hde(Object(r)).forEach(function(n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
      })
    }
    return e
  }
  var Eat = e => e ? (...t) => e(...t) : (...t) => fetch(...t),
    Tat = () => Headers,
    kat = (e, t, r, n, i) => {
      let a = Eat(n),
        s = Tat(),
        o = (i == null ? void 0 : i.enabled) === !0,
        l = (i == null ? void 0 : i.respectSamplingDecision) !== !1,
        A = o ? Bat(t) : null;
      return async (u, c) => {
        var f;
        let h = (f = await r()) !== null && f !== void 0 ? f : e,
          p = new s(c == null ? void 0 : c.headers);
        if (p.has("apikey") || p.set("apikey", e), p.has("Authorization") || p.set("Authorization", `Bearer ${h}`), A) {
          let d = await Fat(u, A, l);
          d && (d.traceparent && !p.has("traceparent") && p.set("traceparent", d.traceparent), d.tracestate && !p.has("tracestate") && p.set("tracestate", d.tracestate), d.baggage && !p.has("baggage") && p.set("baggage", d.baggage))
        }
        return a(u, ua(ua({}, c), {}, {
          headers: p
        }))
      }
    };
  async function Fat(e, t, r) {
    if (!xat(typeof e == "string" || e instanceof URL ? e : e.url, t)) return null;
    let n = await yat();
    if (!n || !n.traceparent) return null;
    if (r) {
      let i = wat(n.traceparent);
      if (i && !i.isSampled) return null
    }
    return n
  }

  function jde(e) {
    return typeof e == "boolean" ? {
      enabled: e
    } : e
  }

  function Oat(e) {
    return e.endsWith("/") ? e : e + "/"
  }

  function Nat(e, t) {
    var r, n, i, a, s, o;
    let {
      db: l,
      auth: A,
      realtime: u,
      global: c
    } = e, {
      db: f,
      auth: h,
      realtime: p,
      global: d
    } = t, g = jde(e.tracePropagation), m = jde(t.tracePropagation), v = {
      db: ua(ua({}, f), l),
      auth: ua(ua({}, h), A),
      realtime: ua(ua({}, p), u),
      storage: {},
      global: ua(ua(ua({}, d), c), {}, {
        headers: ua(ua({}, (r = d == null ? void 0 : d.headers) !== null && r !== void 0 ? r : {}), (n = c == null ? void 0 : c.headers) !== null && n !== void 0 ? n : {})
      }),
      tracePropagation: {
        enabled: (i = (a = g == null ? void 0 : g.enabled) !== null && a !== void 0 ? a : m == null ? void 0 : m.enabled) !== null && i !== void 0 ? i : !1,
        respectSamplingDecision: (s = (o = g == null ? void 0 : g.respectSamplingDecision) !== null && o !== void 0 ? o : m == null ? void 0 : m.respectSamplingDecision) !== null && s !== void 0 ? s : !0
      },
      accessToken: async () => ""
    };
    return e.accessToken ? v.accessToken = e.accessToken : delete v.accessToken, v
  }

  function Pat(e) {
    let t = e == null ? void 0 : e.trim();
    if (!t) throw new Error("supabaseUrl is required.");
    if (!t.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
      return new URL(Oat(t))
    } catch (r) {
      throw Error("Invalid supabaseUrl: Provided URL is malformed.")
    }
  }
  var Iat = class extends _M {
      constructor(e) {
        super(e)
      }
    },
    Lat = class {
      constructor(e, t, r) {
        var n, i;
        this.supabaseUrl = e, this.supabaseKey = t;
        let a = Pat(e);
        if (!t) throw new Error("supabaseKey is required.");
        this.realtimeUrl = new URL("realtime/v1", a), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a), this.storageUrl = new URL("storage/v1", a), this.functionsUrl = new URL("functions/v1", a);
        let s = `sb-${a.hostname.split(".")[0]}-auth-token`,
          o = {
            db: fat,
            realtime: dat,
            auth: ua(ua({}, hat), {}, {
              storageKey: s
            }),
            global: cat,
            tracePropagation: pat
          },
          l = Nat(r != null ? r : {}, o);
        if (this.settings = l, this.storageKey = (n = l.auth.storageKey) !== null && n !== void 0 ? n : "", this.headers = (i = l.global.headers) !== null && i !== void 0 ? i : {}, l.accessToken) this.accessToken = l.accessToken, this.auth = new Proxy({}, {
          get: (u, c) => {
            throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(c)} is not possible`)
          }
        });
        else {
          var A;
          this.auth = this._initSupabaseAuthClient((A = l.auth) !== null && A !== void 0 ? A : {}, this.headers, l.global.fetch)
        }
        this.fetch = kat(t, e, this._getAccessToken.bind(this), l.global.fetch, l.tracePropagation), this.realtime = this._initRealtimeClient(ua({
          headers: this.headers,
          accessToken: this._getAccessToken.bind(this),
          fetch: this.fetch
        }, l.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then(u => this.realtime.setAuth(u)).catch(u => console.warn("Failed to set initial Realtime auth token:", u)), this.rest = new Qhe(new URL("rest/v1", a).href, {
          headers: this.headers,
          schema: l.db.schema,
          fetch: this.fetch,
          timeout: l.db.timeout,
          urlLengthLimit: l.db.urlLengthLimit
        }), this.storage = new Ade(this.storageUrl.href, this.headers, this.fetch, r == null ? void 0 : r.storage), l.accessToken || this._listenForAuthEvents()
      }
      get functions() {
        return new Ib(this.functionsUrl.href, {
          headers: this.headers,
          customFetch: this.fetch
        })
      }
      from(e) {
        return this.rest.from(e)
      }
      schema(e) {
        return this.rest.schema(e)
      }
      rpc(e, t = {}, r = {
        head: !1,
        get: !1,
        count: void 0
      }) {
        return this.rest.rpc(e, t, r)
      }
      channel(e, t = {
        config: {}
      }) {
        return this.realtime.channel(e, t)
      }
      getChannels() {
        return this.realtime.getChannels()
      }
      removeChannel(e) {
        return this.realtime.removeChannel(e)
      }
      removeAllChannels() {
        return this.realtime.removeAllChannels()
      }
      async _getAccessToken() {
        var e = this,
          t, r;
        if (e.accessToken) return await e.accessToken();
        let {
          data: n
        } = await e.auth.getSession();
        return (t = (r = n.session) === null || r === void 0 ? void 0 : r.access_token) !== null && t !== void 0 ? t : e.supabaseKey
      }
      _initSupabaseAuthClient({
        autoRefreshToken: e,
        persistSession: t,
        detectSessionInUrl: r,
        storage: n,
        userStorage: i,
        storageKey: a,
        flowType: s,
        lock: o,
        debug: l,
        throwOnError: A,
        experimental: u,
        lockAcquireTimeout: c,
        skipAutoInitialize: f
      }, h, p) {
        let d = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new Iat({
          url: this.authUrl.href,
          headers: ua(ua({}, d), h),
          storageKey: a,
          autoRefreshToken: e,
          persistSession: t,
          detectSessionInUrl: r,
          storage: n,
          userStorage: i,
          flowType: s,
          lock: o,
          debug: l,
          throwOnError: A,
          experimental: u,
          fetch: p,
          lockAcquireTimeout: c,
          skipAutoInitialize: f,
          hasCustomAuthorizationHeader: Object.keys(this.headers).some(g => g.toLowerCase() === "authorization")
        })
      }
      _initRealtimeClient(e) {
        return new W1(this.realtimeUrl.href, ua(ua({}, e), {}, {
          params: ua(ua({}, {
            apikey: this.supabaseKey
          }), e == null ? void 0 : e.params)
        }))
      }
      _listenForAuthEvents() {
        return this.auth.onAuthStateChange((e, t) => {
          this._handleTokenChanged(e, "CLIENT", t == null ? void 0 : t.access_token)
        })
      }
      _handleTokenChanged(e, t, r) {
        (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== r ? (this.changedAccessToken = r, this.realtime.setAuth(r)) : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0)
      }
    },
    Kde = (e, t, r) => new Lat(e, t, r);

  function Uat() {
    if (typeof window != "undefined") return !1;
    let e = globalThis.process;
    if (!e) return !1;
    let t = e.version;
    if (t == null) return !1;
    let r = t.match(/^v(\d+)\./);
    return r ? parseInt(r[1], 10) <= 18 : !1
  }
  Uat() && console.warn("\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
  var CM = "https://ifykttcsgsvrvvyozwog.supabase.co",
    EM = "sb_publishable_MwckZjHNIuhpIIMBbFGiqQ_YPO3ypCV",
    TM = !!CM && !!EM && !CM.includes("YOUR_") && !EM.includes("YOUR_"),
    ji = TM ? Kde(CM, EM) : null;
  async function Wde({

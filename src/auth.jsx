import React, { useEffect, useState, useRef } from "react";
import App from "./app.jsx";
import {
  sbEnabled, signInWithPassword, signUpWithPassword,
  signOut, onAuth, getSession, getProfile, getAgency,
  loadAgencyData, saveAgencyData,
  createCompany, deleteAgency, inviteAdmin, inviteViewer, inviteTeamLead, setMemberTeam,
  listInvites, revokeInvite, listMembers, listAgencies,
  sendPasswordReset, updatePassword, updateDisplayName, listDataMeta, isEmailInvited,
} from "./supabase.js";

const fmtDate = (s) => { try { return new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric" }); } catch { return ""; } };

const LOGO = typeof window !== "undefined" ? window.__BTG_LOGO__ : null;
const emailOk = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const ROLE_LABEL = { super_admin: "Owner", admin: "Admin", team_lead: "Team lead", viewer: "Viewer", pending: "No access" };

/* ============================ Login screen ============================ */
function Auth() {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const reset = () => setMsg(null);

  const doLogin = async () => {
    reset();
    if (!emailOk(email)) return setMsg({ kind: "err", text: "Enter a valid email address." });
    if (!pw) return setMsg({ kind: "err", text: "Enter your password." });
    setBusy(true);
    const { error } = await signInWithPassword({ email: email.trim().toLowerCase(), password: pw });
    setBusy(false);
    if (error) setMsg({ kind: "err", text: error.message });
  };
  const doRegister = async () => {
    reset();
    if (!name.trim()) return setMsg({ kind: "err", text: "Enter your full name." });
    if (!emailOk(email)) return setMsg({ kind: "err", text: "Enter a valid email." });
    if (pw.length < 6) return setMsg({ kind: "err", text: "Password must be at least 6 characters." });
    if (pw !== pw2) return setMsg({ kind: "err", text: "Passwords do not match." });
    setBusy(true);
    const allowed = await isEmailInvited(email);
    if (!allowed) {
      setBusy(false);
      return setMsg({ kind: "err", text: "This email hasn't been invited. Ask your administrator to invite it first, then register." });
    }
    const { data, error } = await signUpWithPassword({ email: email.trim().toLowerCase(), password: pw, fullName: name.trim() });
    setBusy(false);
    if (error) return setMsg({ kind: "err", text: error.message });
    if (data && data.session) return;
    setMsg({ kind: "ok", text: "Account created. If asked, confirm via email, then log in." });
    setTab("login");
  };
  const submit = () => (tab === "login" ? doLogin() : tab === "reg" ? doRegister() : doForgot());

  const doForgot = async () => {
    reset();
    if (!emailOk(email)) return setMsg({ kind: "err", text: "Enter your email address." });
    setBusy(true);
    await sendPasswordReset(email);
    setBusy(false);
    setMsg({ kind: "ok", text: "If that email has an account, a reset link is on its way. Check your inbox (and spam)." });
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-head">
          {LOGO && <img className="auth-logo" src={LOGO} alt="Weekly Performance Book" />}
          <div className="auth-title">Weekly Performance Book</div>
          <div className="auth-by">by Christopher Gioia</div>
          <div className="auth-sub">Sign in with the email you were invited with.</div>
        </div>
        <div className="auth-body">
          {msg && <div className={"auth-msg " + msg.kind}>{msg.text}</div>}
          {tab !== "forgot" && (
            <div className="auth-tabs">
              <button className={tab === "login" ? "on" : ""} onClick={() => { setTab("login"); reset(); }}>Log in</button>
              <button className={tab === "reg" ? "on" : ""} onClick={() => { setTab("reg"); reset(); }}>Register</button>
            </div>
          )}
          {tab === "forgot" && <div className="auth-sub" style={{ marginBottom: 8 }}>Enter your email and we'll send a reset link.</div>}
          {tab === "reg" && (
            <label className="auth-f"><span>Full name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" /></label>
          )}
          <label className="auth-f"><span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} placeholder="you@example.com" autoComplete="username" /></label>
          {tab !== "forgot" && (
            <label className="auth-f"><span>Password</span>
              <div className="pw-wrap">
                <input type={showPass ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} placeholder={tab === "reg" ? "At least 6 characters" : "••••••••"} autoComplete={tab === "reg" ? "new-password" : "current-password"} />
                <button type="button" className="pw-toggle" onClick={() => setShowPass((v) => !v)}>{showPass ? "Hide" : "Show"}</button>
              </div></label>
          )}
          {tab === "reg" && (
            <label className="auth-f"><span>Confirm password</span>
              <div className="pw-wrap">
                <input type={showPass ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submit(); }} placeholder="Re-enter password" />
              </div></label>
          )}
          <button className="btn primary auth-go" disabled={busy} onClick={submit}>
            {busy ? "Please wait…" : tab === "login" ? "Log in" : tab === "reg" ? "Create account" : "Send reset link"}
          </button>
          {tab === "login" && (
            <button className="auth-link" onClick={() => { setTab("forgot"); reset(); }}>Forgot password?</button>
          )}
          {tab === "forgot" && (
            <button className="auth-link" onClick={() => { setTab("login"); reset(); }}>Back to log in</button>
          )}
          <div className="auth-hint">Access is by invitation. If you haven't been invited, ask your administrator to send one to your email.</div>
        </div>
      </div>
    </div>
  );
}

/* ===================== set new password (recovery) ===================== */
function ResetPassword({ onDone }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const save = async () => {
    setMsg(null);
    if (pw.length < 6) return setMsg({ kind: "err", text: "Password must be at least 6 characters." });
    if (pw !== pw2) return setMsg({ kind: "err", text: "Passwords do not match." });
    setBusy(true);
    const { error } = await updatePassword(pw);
    setBusy(false);
    if (error) return setMsg({ kind: "err", text: error.message });
    onDone();
  };
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-head">
          <div className="auth-title">Set a new password</div>
          <div className="auth-sub">Choose a new password for your account.</div>
        </div>
        <div className="auth-body">
          {msg && <div className={"auth-msg " + msg.kind}>{msg.text}</div>}
          <label className="auth-f"><span>New password</span>
            <div className="pw-wrap">
              <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="At least 6 characters" />
              <button type="button" className="pw-toggle" onClick={() => setShow((v) => !v)}>{show ? "Hide" : "Show"}</button>
            </div></label>
          <label className="auth-f"><span>Confirm password</span>
            <div className="pw-wrap">
              <input type={show ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Re-enter password" />
            </div></label>
          <button className="btn primary auth-go" disabled={busy} onClick={save}>{busy ? "Saving…" : "Update password"}</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== account settings (modal) ===================== */
function AccountModal({ profile, onClose }) {
  const [name, setName] = useState(profile.full_name || "");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const saveName = async () => {
    setMsg(null);
    if (!name.trim()) return setMsg({ kind: "err", text: "Enter a display name." });
    setBusy(true);
    const { error } = await updateDisplayName(profile.id, name);
    setBusy(false);
    setMsg(error ? { kind: "err", text: error.message } : { kind: "ok", text: "Name updated. It'll show next time the page loads." });
  };
  const savePw = async () => {
    setMsg(null);
    if (pw.length < 6) return setMsg({ kind: "err", text: "Password must be at least 6 characters." });
    if (pw !== pw2) return setMsg({ kind: "err", text: "Passwords do not match." });
    setBusy(true);
    const { error } = await updatePassword(pw);
    setBusy(false);
    if (error) return setMsg({ kind: "err", text: error.message });
    setPw(""); setPw2("");
    setMsg({ kind: "ok", text: "Password updated." });
  };

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Account</div>
          <button className="btn ghost sm" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          {msg && <div className={"auth-msg " + msg.kind}>{msg.text}</div>}

          <div className="acct-hero">
            <div className="acct-avatar">{(profile.full_name || profile.email || "?").slice(0, 1).toUpperCase()}</div>
            <div>
              <div className="acct-name">{profile.full_name || "Unnamed"}</div>
              <div className="acct-email">{profile.email}</div>
              <div className="acct-badges">
                <span className="acct-badge role">{ROLE_LABEL[profile.role] || "Viewer"}</span>
                {profile.agency_name && <span className="acct-badge">{profile.agency_name}</span>}
              </div>
            </div>
          </div>

          <div className="card-title">Profile</div>
          <div className="create-form">
            <input className="inp" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            <button className="btn primary" disabled={busy} onClick={saveName}>Save</button>
          </div>

          <div className="card-title" style={{ marginTop: 16 }}>Change password</div>
          <label className="auth-f"><span>New password</span>
            <div className="pw-wrap">
              <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="At least 6 characters" autoComplete="new-password" />
              <button type="button" className="pw-toggle" onClick={() => setShow((v) => !v)}>{show ? "Hide" : "Show"}</button>
            </div></label>
          <label className="auth-f"><span>Confirm new password</span>
            <div className="pw-wrap">
              <input type={show ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Re-enter password" autoComplete="new-password" />
            </div></label>
          <button className="btn primary" disabled={busy} onClick={savePw}>Update password</button>

          <div className="card-title" style={{ marginTop: 16 }}>Session</div>
          <p className="acct-hint">Signing out ends your session on this device only.</p>
          <button className="btn ghost" onClick={async () => { await signOut(); window.location.reload(); }}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== "not invited yet" screen ===================== */
function NoAccess({ email, onSignOut }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-head">
          {LOGO && <img className="auth-logo" src={LOGO} alt="Weekly Performance Book" />}
          <div className="auth-title">You're signed in, but not invited yet</div>
          <div className="auth-sub">{email}</div>
        </div>
        <div className="auth-body">
          <div className="noaccess">
            This email hasn't been added to a dashboard. Ask your administrator to send an invite
            to <b>{email}</b>, then sign in again with the same email.
          </div>
          <button className="btn auth-go" onClick={onSignOut}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== small row helpers ===================== */
function InviteRow({ inv, companyName, onRevoke, onCopy, copied }) {
  return (
    <div className="mrow">
      <div className="mrow-main">
        <span className="mrow-email">{inv.email}</span>
        <span className={"role-pill " + inv.role}>{ROLE_LABEL[inv.role] || inv.role}</span>
        {companyName && <span className="mrow-co">{companyName}</span>}
      </div>
      <div className="mrow-side">
        <span className="mrow-status">Invited · pending</span>
        {onCopy && <button className="btn ghost xs" onClick={() => onCopy(inv)}>{copied === inv.id ? "✓ Copied" : "Copy invite"}</button>}
        <button className="btn ghost xs" onClick={() => onRevoke(inv.id)}>Revoke</button>
      </div>
    </div>
  );
}
function MemberRow({ m, companyName }) {
  return (
    <div className="mrow">
      <div className="mrow-main">
        <span className="mrow-email">{m.full_name || m.email}</span>
        <span className={"role-pill " + m.role}>{ROLE_LABEL[m.role] || m.role}</span>
        {companyName && <span className="mrow-co">{companyName}</span>}
      </div>
      <div className="mrow-side"><span className="mrow-status ok">Active</span></div>
    </div>
  );
}

/* ===================== Owner console (super admin) ===================== */
function SuperConsole({ profile, onSignOut }) {
  const [companies, setCompanies] = useState([]);
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [coName, setCoName] = useState("");
  const [createBusy, setCreateBusy] = useState(false);
  const [createMsg, setCreateMsg] = useState(null);
  const [openInvite, setOpenInvite] = useState(null); // agency id with its invite box open
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [inviteMsg, setInviteMsg] = useState(null);
  const [delId, setDelId] = useState(null);
  const [query, setQuery] = useState("");
  const [dataMeta, setDataMeta] = useState([]);
  const [account, setAccount] = useState(false);

  const refresh = async () => {
    setCompanies(await listAgencies());
    setMembers(await listMembers(null));
    setInvites(await listInvites());
    setDataMeta(await listDataMeta());
  };
  useEffect(() => { refresh(); }, []);

  const metaFor = (id) => dataMeta.find((d) => d.agency_id === id);

  const createCo = async () => {
    setCreateMsg(null);
    if (!coName.trim()) return setCreateMsg({ kind: "err", text: "Enter a company name." });
    setCreateBusy(true);
    const { agency, error } = await createCompany({ name: coName.trim(), createdBy: profile.id });
    setCreateBusy(false);
    if (error || !agency) return setCreateMsg({ kind: "err", text: (error && error.message) || "Couldn't create company." });
    setCoName("");
    await refresh();
    // open the invite box on the new company so "invite admin" is right there
    setInviteMsg(null); setInviteEmail(""); setOpenInvite(agency.id);
  };


  const toggleInvite = (id) => {
    setInviteMsg(null); setInviteEmail("");
    setOpenInvite((cur) => (cur === id ? null : id));
  };
  const sendInvite = async (id) => {
    setInviteMsg(null);
    if (!emailOk(inviteEmail)) return setInviteMsg({ kind: "err", text: "Enter a valid email." });
    setInviteBusy(true);
    const { error } = await inviteAdmin({ email: inviteEmail, agencyId: id, invitedBy: profile.id });
    setInviteBusy(false);
    if (error) return setInviteMsg({ kind: "err", text: error.message });
    setInviteMsg({ kind: "ok", text: "Invited " + inviteEmail.trim().toLowerCase() + " as admin." });
    setInviteEmail(""); refresh();
  };

  const revoke = async (id) => { await revokeInvite(id); refresh(); };
  const removeCompany = async (id) => {
    if (delId !== id) { setDelId(id); setTimeout(() => setDelId(null), 4000); return; }
    setDelId(null);
    const { error } = await deleteAgency(id);
    if (error) setCreateMsg({ kind: "err", text: error.message });
    if (openInvite === id) setOpenInvite(null);
    refresh();
  };

  const pendingFor = (id) => invites.filter((i) => !i.consumed_at && i.agency_id === id);
  const DAY = 86400000;
  const activity = (id) => {
    const meta = metaFor(id);
    if (!meta || !meta.updated_at) return { cls: "none", label: "No data" };
    const age = Date.now() - new Date(meta.updated_at).getTime();
    return age < 7 * DAY ? { cls: "live", label: "Active" } : age < 30 * DAY ? { cls: "quiet", label: "Quiet" } : { cls: "stale", label: "Stale" };
  };
  const pendAll = invites.filter((i) => !i.consumed_at).length;
  const activeWk = companies.filter((c) => { const m = metaFor(c.id); return m && m.updated_at && Date.now() - new Date(m.updated_at).getTime() < 7 * DAY; }).length;
  const [copied, setCopied] = useState(null);
  const copyInvite = (inv, coName) => {
    const url = (typeof window !== "undefined" && window.location && window.location.origin) || "";
    const txt = "You've been invited to the " + coName + " performance dashboard as " + (inv.role === "admin" ? "an admin" : "a viewer") +
      ".\n\n1. Go to " + url + "\n2. Click “Register” and sign up with this email: " + inv.email + "\n3. You'll land in the dashboard automatically.";
    try { navigator.clipboard.writeText(txt); setCopied(inv.id); setTimeout(() => setCopied(null), 2000); } catch {}
  };
  const q = query.trim().toLowerCase();
  const sorted = [...companies].sort((a, b) => {
    const ua = (metaFor(a.id) || {}).updated_at || "", ub = (metaFor(b.id) || {}).updated_at || "";
    return ub.localeCompare(ua) || a.name.localeCompare(b.name);
  });
  const shown = q
    ? sorted.filter((c) => c.name.toLowerCase().includes(q)
        || members.some((m) => m.agency_id === c.id && ((m.email || "").toLowerCase().includes(q) || (m.full_name || "").toLowerCase().includes(q))))
    : sorted;

  return (
    <div className="console">
      <div className="console-top">
        <div className="brand">
          {LOGO ? <img className="brand-logo" src={LOGO} alt="" /> : <span className="dot-logo" />}
          <div>
            <div className="brand-title">Weekly Performance Book</div>
            <div className="brand-sub">Owner console · {profile.email}</div>
          </div>
        </div>
        <div className="console-actions">
          <button className="btn sm" onClick={() => setAccount(true)}>Account</button>
          <button className="btn ghost sm" onClick={onSignOut}>Sign out</button>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat"><div className="stat-v">{companies.length}</div><div className="stat-l">Companies</div></div>
        <div className="stat"><div className="stat-v">{members.length}</div><div className="stat-l">People</div></div>
        <div className="stat"><div className="stat-v">{pendAll}</div><div className="stat-l">Pending invites</div></div>
        <div className="stat"><div className="stat-v">{activeWk}</div><div className="stat-l">Active this week</div></div>
      </div>

      <div className="card">
        <div className="card-title">Create a company</div>
        {createMsg && <div className={"auth-msg " + createMsg.kind}>{createMsg.text}</div>}
        <div className="create-form">
          <input className="inp" placeholder="Company name (e.g. Acme Staffing)" value={coName}
            onChange={(e) => setCoName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") createCo(); }} />
          <button className="btn primary" disabled={createBusy} onClick={createCo}>{createBusy ? "Creating…" : "Create company"}</button>
        </div>
        <div className="card-hint">Create the company first, then use its <b>Invite admin</b> button below to add one or more admins.</div>
      </div>

      <div className="card">
        <div className="co-list-head">
          <div className="card-title">Companies <span className="card-hint">{companies.length}</span></div>
          {companies.length > 0 && (
            <input className="inp co-search" placeholder="Search companies or people…" value={query} onChange={(e) => setQuery(e.target.value)} />
          )}
        </div>
        {companies.length === 0 && <div className="empty-note">No companies yet — create your first one above.</div>}
        {companies.length > 0 && shown.length === 0 && <div className="empty-note">No matches for "{query}".</div>}
        {shown.map((c) => {
          const teamM = members.filter((m) => m.agency_id === c.id);
          const pend = pendingFor(c.id);
          const isOpen = openInvite === c.id;
          const nAdmin = teamM.filter((m) => m.role === "admin").length;
          const nView = teamM.filter((m) => m.role === "viewer").length;
          const meta = metaFor(c.id);
          const counts = [
            nAdmin + (nAdmin === 1 ? " admin" : " admins"),
            nView + (nView === 1 ? " viewer" : " viewers"),
            pend.length ? pend.length + " pending" : null,
            meta && meta.currentWeek ? "W" + meta.currentWeek + " of data" : null,
            meta && meta.updated_at ? "updated " + fmtDate(meta.updated_at) : "no data yet",
          ].filter(Boolean).join(" · ");
          const act = activity(c.id);
          const initials = c.name.replace(/^The /i, "").split(/\s+/).map((x) => x[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
          return (
            <div key={c.id} className="co-block">
              <div className="co-head">
                <div className="co-id">
                  <span className="co-avatar">{initials}</span>
                  <div>
                    <div className="co-name">{c.name} <span className={"act-badge " + act.cls}>{act.label}</span></div>
                    <div className="co-meta">{counts}</div>
                  </div>
                </div>
                <div className="co-actions">
                  <button className={"btn sm" + (isOpen ? " active" : "")} onClick={() => toggleInvite(c.id)}>Invite admin</button>
                  <button className={"btn ghost sm" + (delId === c.id ? " danger" : "")} onClick={() => removeCompany(c.id)}>
                    {delId === c.id ? "Confirm remove" : "Remove"}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="co-invite">
                  {inviteMsg && <div className={"auth-msg " + inviteMsg.kind}>{inviteMsg.text}</div>}
                  <div className="create-form">
                    <input className="inp" placeholder="Admin email" value={inviteEmail} autoFocus
                      onChange={(e) => setInviteEmail(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendInvite(c.id); }} />
                    <button className="btn primary" disabled={inviteBusy} onClick={() => sendInvite(c.id)}>{inviteBusy ? "Sending…" : "Send invite"}</button>
                  </div>
                </div>
              )}

              {teamM.length === 0 && pend.length === 0 && <div className="empty-note sm">No one yet — invite an admin to get started.</div>}
              {teamM.map((m) => <MemberRow key={m.id} m={m} />)}
              {pend.map((i) => <InviteRow key={i.id} inv={i} onRevoke={revoke} onCopy={(inv) => copyInvite(inv, c.name)} copied={copied} />)}
            </div>
          );
        })}
      </div>
      {account && <AccountModal profile={profile} onClose={() => setAccount(false)} />}
    </div>
  );
}

/* ===================== Admin team panel (modal) ===================== */
// One member row with an inline team / role assignment control (admin only).
function ManageMemberRow({ m, teams, onAssign }) {
  const isLead = m.role === "team_lead";
  const assignable = m.role === "viewer" || m.role === "team_lead";
  const teamName = (id) => { const t = teams.find((x) => x.id === id); return t ? t.name : null; };
  const onChange = (val) => {
    if (val === "__viewer__") onAssign(m, { role: "viewer", teamId: null });
    else onAssign(m, { role: "team_lead", teamId: val });
  };
  return (
    <div className="mrow">
      <div className="mrow-main">
        <span className="mrow-email">{m.full_name || m.email}</span>
        <span className={"role-pill " + m.role}>{ROLE_LABEL[m.role] || m.role}</span>
        {isLead && m.team_id && <span className="mrow-co">{teamName(m.team_id) || "team removed"}</span>}
      </div>
      <div className="mrow-side">
        {assignable && teams.length > 0 ? (
          <select className="inp inp-sm" value={isLead ? (m.team_id || "") : "__viewer__"} onChange={(e) => onChange(e.target.value)} title="Assign this person as a team lead for a team, or keep them a viewer">
            <option value="__viewer__">Viewer (no team)</option>
            <optgroup label="Team lead for…">
              {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </optgroup>
          </select>
        ) : <span className="mrow-status ok">Active</span>}
      </div>
    </div>
  );
}

function TeamPanel({ profile, agency, teams = [], onClose }) {
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");      // viewer | team_lead
  const [teamId, setTeamId] = useState(teams[0] ? teams[0].id : "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const teamName = (id) => { const t = teams.find((x) => x.id === id); return t ? t.name : null; };

  const refresh = async () => {
    setMembers(await listMembers(profile.agency_id));
    setInvites((await listInvites()).filter((i) => i.agency_id === profile.agency_id && !i.consumed_at));
  };
  useEffect(() => { refresh(); }, []);

  const send = async () => {
    setMsg(null);
    if (!emailOk(email)) return setMsg({ kind: "err", text: "Enter a valid email." });
    if (role === "team_lead" && !teamId) return setMsg({ kind: "err", text: "Pick which team this lead will manage." });
    setBusy(true);
    const { error } = role === "team_lead"
      ? await inviteTeamLead({ email, agencyId: profile.agency_id, teamId, invitedBy: profile.id })
      : await inviteViewer({ email, agencyId: profile.agency_id, invitedBy: profile.id });
    setBusy(false);
    if (error) return setMsg({ kind: "err", text: error.message });
    setMsg({ kind: "ok", text: "Invited " + email.trim().toLowerCase() + (role === "team_lead" ? " as team lead for " + (teamName(teamId) || "their team") + "." : " as a viewer.") });
    setEmail(""); refresh();
  };
  const revoke = async (id) => { await revokeInvite(id); refresh(); };
  const assign = async (m, patch) => {
    setMsg(null);
    const { error } = await setMemberTeam(m.id, patch);
    if (error) return setMsg({ kind: "err", text: error.message });
    setMsg({ kind: "ok", text: (patch.role === "team_lead" ? (m.full_name || m.email) + " now leads " + (teamName(patch.teamId) || "their team") + "." : (m.full_name || m.email) + " is now a viewer.") });
    refresh();
  };

  const noTeams = teams.length === 0;
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Team · {agency?.name || "Your company"}</div>
          <button className="btn ghost sm" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div className="card-title">Invite someone</div>
          {msg && <div className={"auth-msg " + msg.kind}>{msg.text}</div>}
          <div className="invite-form">
            <input className="inp" placeholder="Their email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <select className="inp inp-sm" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="team_lead" disabled={noTeams}>Team lead</option>
            </select>
            {role === "team_lead" && !noTeams && (
              <select className="inp inp-sm" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
            <button className="btn primary" disabled={busy} onClick={send}>{busy ? "Sending…" : "Invite"}</button>
          </div>
          <div className="card-hint">
            Viewers can see this company's dashboard but can't edit. <b>Team leads</b> can add and edit data for the one team you assign them — nothing else.
            {noTeams && <><br /><b>No teams yet —</b> to invite a team lead you first need teams. Close this, click <b>+ Teams</b> in the top bar to split your company into teams (add a second team from the <b>⚙</b> after), then reopen <b>Team</b> and the “Team lead” option will be available.</>}
          </div>

          <div className="card-title" style={{ marginTop: 18 }}>People with access</div>
          {members.map((m) => <ManageMemberRow key={m.id} m={m} teams={teams} onAssign={assign} />)}
          {invites.map((i) => <InviteRow key={i.id} inv={i} companyName={i.role === "team_lead" ? teamName(i.team_id) : null} onRevoke={revoke} />)}
        </div>
      </div>
    </div>
  );
}

/* ===================== top bar (admin / viewer) ===================== */
function AuthBar({ profile, agency, sync, canEdit, isAdmin, onTeam, onAccount, onSignOut }) {
  const label = { idle: "", saving: "Saving…", saved: "All changes saved", error: "Save failed — retrying on next change" }[sync] || "";
  return (
    <div className="authbar">
      <div className="authbar-l">
        <span className="authbar-dom">{agency?.name || ""}</span>
        <span className={"role-pill " + profile.role}>{ROLE_LABEL[profile.role]}</span>
        {canEdit && label && <span className={"authbar-sync " + sync}>{label}</span>}
      </div>
      <div className="authbar-r">
        <span className="authbar-who">{!canEdit && profile.full_name ? "Welcome back, " + profile.full_name.split(" ")[0] : (profile.full_name || profile.email)}</span>
        {isAdmin && <button className="btn sm" onClick={onTeam}>Team</button>}
        <button className="btn sm" onClick={onAccount}>Account</button>
        <button className="btn ghost sm" onClick={onSignOut}>Log out</button>
      </div>
    </div>
  );
}

/* ============================== Root ============================== */
export default function Root() {
  // Offline build (no Supabase configured) → original app, unchanged.
  if (!sbEnabled) return <App />;

  const [session, setSession] = useState(undefined); // undefined = checking
  const [profile, setProfile] = useState(null);
  const [agency, setAgency] = useState(null);
  const [cloud, setCloud] = useState(undefined);     // undefined = not loaded
  const [sync, setSync] = useState("idle");
  const [team, setTeam] = useState(false);
  const [account, setAccount] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const tmr = useRef(null);

  useEffect(() => {
    getSession().then(setSession);
    const { data } = onAuth((event, s) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      setSession(s);
    });
    return () => { try { data.subscription.unsubscribe(); } catch {} };
  }, []);

  useEffect(() => {
    if (!session) { setProfile(null); setAgency(null); setCloud(undefined); return; }
    let alive = true;
    (async () => {
      const p = await getProfile(session.user.id);
      if (!alive) return;
      setProfile(p);
      if (!p || p.role === "pending" || p.role === "super_admin" || !p.agency_id) { setCloud(null); return; }
      try { const a = await getAgency(p.agency_id); if (alive) setAgency(a); } catch {}
      try { const d = await loadAgencyData(p.agency_id); if (alive) setCloud(d); }
      catch { if (alive) setCloud(null); }
    })();
    return () => { alive = false; };
  }, [session]);

  const onPersist = (d) => {
    if (!profile || profile.role === "viewer" || !profile.agency_id) return;
    setSync("saving");
    clearTimeout(tmr.current);
    tmr.current = setTimeout(async () => {
      const { error } = await saveAgencyData(profile.agency_id, d, session.user.id);
      setSync(error ? "error" : "saved");
    }, 700);
  };

  if (session === undefined) return <div className="auth-loading">Loading…</div>;
  if (recovery && session) return <ResetPassword onDone={() => setRecovery(false)} />;
  if (!session) return <Auth />;
  if (!profile) return <div className="auth-loading">Loading…</div>;
  if (profile.role === "super_admin") return <SuperConsole profile={profile} onSignOut={signOut} />;
  if (profile.role === "pending" || !profile.agency_id) return <NoAccess email={profile.email || session.user.email} onSignOut={signOut} />;
  if (cloud === undefined) return <div className="auth-loading">Loading your dashboard…</div>;

  const isAdmin = profile.role === "admin";
  const isLead = profile.role === "team_lead";
  const canEdit = isAdmin || isLead;
  const teamsList = cloud && cloud.teams
    ? Object.keys(cloud.teams).map((id) => ({ id, name: (cloud.teams[id] && cloud.teams[id].name) || id }))
    : [];
  return (
    <>
      <AuthBar profile={profile} agency={agency} sync={sync} canEdit={canEdit} isAdmin={isAdmin} onTeam={() => setTeam(true)} onAccount={() => setAccount(true)} onSignOut={signOut} />
      <App session={session} initialData={cloud} onPersist={onPersist} canEdit={canEdit} editableTeam={isLead ? (profile.team_id || null) : null} agencyName={agency && agency.name} />
      {team && isAdmin && <TeamPanel profile={profile} agency={agency} teams={teamsList} onClose={() => setTeam(false)} />}
      {account && <AccountModal profile={profile} onClose={() => setAccount(false)} />}
    </>
  );
}

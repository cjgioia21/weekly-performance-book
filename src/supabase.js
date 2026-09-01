import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
//  Supabase project values (Dashboard → Project Settings → API)
//  Safe to ship in the browser: the anon/publishable key is public;
//  Row-Level Security in the database is what actually protects data.
// ─────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://ifykttcsgsvrvvyozwog.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MwckZjHNIuhpIIMBbFGiqQ_YPO3ypCV";

export const sbEnabled =
  !!SUPABASE_URL && !!SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes("YOUR_") && !SUPABASE_ANON_KEY.includes("YOUR_");

export const sb = sbEnabled ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ============================ AUTH ============================ */
export async function signInWithPassword({ email, password }) {
  return sb.auth.signInWithPassword({ email, password });
}
export async function signUpWithPassword({ email, password, fullName }) {
  return sb.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
}
// Checks (before signup) whether an email is allowed to register.
export async function isEmailInvited(email) {
  try {
    const { data } = await sb.rpc("is_email_invited", { check_email: email.trim().toLowerCase() });
    return !!data;
  } catch { return false; }
}
export async function signOut() { return sb.auth.signOut(); }

export async function getSession() {
  try { const { data } = await sb.auth.getSession(); return data.session || null; }
  catch { return null; }
}
export function onAuth(cb) {
  return sb.auth.onAuthStateChange((event, session) => cb(event, session || null));
}

// Sends a reset link to the email (depends on email delivery being configured).
export async function sendPasswordReset(email) {
  return sb.auth.resetPasswordForEmail(email.trim().toLowerCase(),
    { redirectTo: window.location.origin + window.location.pathname });
}
// Set a new password for the signed-in (or recovery) session.
export async function updatePassword(password) {
  return sb.auth.updateUser({ password });
}
// Change display name (profiles row + auth metadata).
export async function updateDisplayName(userId, fullName) {
  const { error } = await sb.from("profiles").update({ full_name: fullName.trim() }).eq("id", userId);
  if (error) return { error };
  return sb.auth.updateUser({ data: { full_name: fullName.trim() } });
}

/* ===================== PROFILE / COMPANY ===================== */
export async function getProfile(userId) {
  const { data } = await sb.from("profiles")
    .select("id,email,full_name,role,agency_id,team_id").eq("id", userId).maybeSingle();
  return data || null;
}
export async function getAgency(agencyId) {
  if (!agencyId) return null;
  const { data } = await sb.from("agencies").select("id,name").eq("id", agencyId).maybeSingle();
  return data || null;
}

/* ============= DASHBOARD DATA (one blob per company) ============ */
export async function loadAgencyData(agencyId) {
  if (!agencyId) return null;
  const { data, error } = await sb.from("agency_data").select("data").eq("agency_id", agencyId).maybeSingle();
  if (error) throw error;
  return data ? data.data : null;
}
export async function saveAgencyData(agencyId, payload, userId) {
  return sb.from("agency_data").upsert(
    { agency_id: agencyId, data: payload, updated_by: userId, updated_at: new Date().toISOString() },
    { onConflict: "agency_id" }
  );
}

/* ===================== COMPANIES / INVITES / MEMBERS ===================== */
// Super admin: create a new company.
export async function createCompany({ name, createdBy }) {
  const { data, error } = await sb.from("agencies")
    .insert({ name: name.trim(), created_by: createdBy }).select("id,name").single();
  return { agency: data || null, error };
}
// Super admin: permanently remove a company (cascades to its data + invites;
// its members lose access). RLS allows only the owner to do this.
export async function deleteAgency(agencyId) {
  return sb.from("agencies").delete().eq("id", agencyId);
}
// Generic invite. role = 'admin' (super admin only), or 'viewer'/'team_lead' (admin only).
// teamId binds a team_lead to the team the admin assigns them.
export async function inviteToCompany({ email, role, agencyId, teamId = null, invitedBy }) {
  const { error } = await sb.from("invites")
    .insert({ email: email.trim().toLowerCase(), role, agency_id: agencyId, team_id: teamId, invited_by: invitedBy });
  return { error };
}
// Convenience wrappers
export async function inviteAdmin({ email, agencyId, invitedBy }) {
  return inviteToCompany({ email, role: "admin", agencyId, invitedBy });
}
export async function inviteViewer({ email, agencyId, invitedBy }) {
  return inviteToCompany({ email, role: "viewer", agencyId, invitedBy });
}
// Invite a team lead, pre-assigned by the admin to a specific team.
export async function inviteTeamLead({ email, agencyId, teamId, invitedBy }) {
  return inviteToCompany({ email, role: "team_lead", agencyId, teamId, invitedBy });
}
// Admin assigns / reassigns a member's team (and optionally promotes them to team_lead).
export async function setMemberTeam(userId, { role, teamId } = {}) {
  const patch = {};
  if (role !== undefined) patch.role = role;
  if (teamId !== undefined) patch.team_id = teamId;
  return sb.from("profiles").update(patch).eq("id", userId);
}
export async function listInvites() {
  const { data } = await sb.from("invites")
    .select("id,email,role,agency_id,team_id,created_at,consumed_at").order("created_at", { ascending: false });
  return data || [];
}
export async function revokeInvite(id) { return sb.from("invites").delete().eq("id", id); }

export async function listMembers(agencyId) {
  let q = sb.from("profiles").select("id,email,full_name,role,agency_id,team_id");
  if (agencyId) q = q.eq("agency_id", agencyId);
  const { data } = await q;
  return data || [];
}
export async function listAgencies() {
  const { data } = await sb.from("agencies")
    .select("id,name,created_at").order("created_at", { ascending: false });
  return data || [];
}
// Last-saved timestamp per company (owner can read all via RLS).
export async function listDataMeta() {
  const { data } = await sb.from("agency_data").select("agency_id,updated_at,currentWeek:data->currentWeek");
  return data || [];
}

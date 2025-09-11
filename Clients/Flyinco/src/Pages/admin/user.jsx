// src/pages/UserManagement.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../../lib/api"; // axios wrapper
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Trash, Edit2, Plus, Search, UserCheck, User,
  Clock, Settings, Check, ChevronDown, SortAsc, SortDesc,
} from "lucide-react";

export default function UserManagement() {
  // --- state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [targetDeleteId, setTargetDeleteId] = useState(null);

  const emptyForm = { firstName: "", lastName: "", email: "", phone: "", password: "", role: "customer" };
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // controls
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name_asc");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [openActionId, setOpenActionId] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  // --- Fetch users
  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await api.get("/auth/users"); // ✅ correct route
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { fetchUsers(); }, []);

  // utils
  function hashStringToColor(str) { let h=0; for (let i=0;i<str.length;i++) h=str.charCodeAt(i)+((h<<5)-h); const c=(h&0x00ffffff).toString(16).toUpperCase(); return `#${"00000".substring(0,6-c.length)+c}`; }
  function avatarStyle(name) { return { backgroundColor: hashStringToColor(name || "user") }; }
  function initials(first="", last="") { const a=first.trim()?first[0]:""; const b=last.trim()?last[0]:""; return (a+b).toUpperCase().slice(0,2)||"?"; }
  function formatDate(iso) { try { return new Date(iso).toLocaleString(); } catch { return iso; } }
  function roleBadge(role) {
    const base = "inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold";
    if (role === "admin") return <span className={`${base} bg-red-50 text-red-700`}><UserCheck size={14}/> Admin</span>;
    if (role === "driver") return <span className={`${base} bg-amber-50 text-amber-700`}><User size={14}/> Driver</span>;
    return <span className={`${base} bg-sky-50 text-sky-700`}><User size={14}/> Customer</span>;
  }

  // form validation
  function validateForm(currentForm = form) {
    const errs = {};
    if (!currentForm.firstName.trim()) errs.firstName = "First name required";
    if (!currentForm.lastName.trim()) errs.lastName = "Last name required";
    if (!/^\S+@\S+\.\S+$/.test(currentForm.email || "")) errs.email = "Enter a valid email";
    if (!/^\+?[0-9\-\s]{7,20}$/.test(currentForm.phone || "")) errs.phone = "Enter a valid phone";
    if (!editingId) { if (!currentForm.password || currentForm.password.length < 6) errs.password = "Password min 6 chars"; }
    else if (currentForm.password && currentForm.password.length < 6) errs.password = "Password min 6 chars";
    return errs;
  }

  // handlers
  function openCreate() { setEditingId(null); setForm(emptyForm); setFormErrors({}); setOpenForm(true); }
  function openEdit(id) {
    const u = users.find((x) => x._id === id); if (!u) return;
    setEditingId(id);
    setForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone, password: "", role: u.role });
    setFormErrors({}); setOpenForm(true);
  }

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    const errs = validateForm();
    setFormErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/auth/users/${editingId}`, form); // ✅ update
      } else {
        await api.post("/auth/register", form); // ✅ create
      }
      await fetchUsers();
      setOpenForm(false); setForm(emptyForm); setEditingId(null);
    } catch (err) {
      console.error("Save user failed", err);
    } finally { setSubmitting(false); }
  }

  function promptDelete(id) { setTargetDeleteId(id); setOpenDelete(true); }
  async function handleDeleteConfirmed() {
    try {
      await api.delete(`/auth/users/${targetDeleteId}`); // ✅ delete
      await fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setOpenDelete(false); setTargetDeleteId(null);
    }
  }

  // derived list (filter + sort)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = users.slice();
    if (roleFilter !== "all") arr = arr.filter((u) => u.role === roleFilter);
    if (q) arr = arr.filter((u) => `${u.firstName} ${u.lastName} ${u.email} ${u.phone}`.toLowerCase().includes(q));

    if (sortBy === "name_asc") arr.sort((a,b)=>`${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
    else if (sortBy === "name_desc") arr.sort((a,b)=>`${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
    else if (sortBy === "created_desc") arr.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    else if (sortBy === "created_asc") arr.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    return arr;
  }, [users, query, roleFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => { setPage(1); }, [query, roleFilter, sortBy]);
  React.useEffect(() => { const close=()=>setOpenActionId(null); window.addEventListener("click", close); return ()=>window.removeEventListener("click", close); }, []);
  React.useEffect(() => {
    function onDoc() { if (openSort) setOpenSort(false); }
    function onKey(e) { if (e.key==="Escape") setOpenSort(false); }
    window.addEventListener("click", onDoc); window.addEventListener("keydown", onKey);
    return ()=>{ window.removeEventListener("click", onDoc); window.removeEventListener("keydown", onKey); };
  }, [openSort]);

  const sortOptions = [
    { value: "name_asc", label: "Name A → Z", icon: <SortAsc size={14} /> },
    { value: "name_desc", label: "Name Z → A", icon: <SortDesc size={14} /> },
    { value: "created_desc", label: "Created newest", icon: <SortDesc size={14} /> },
    { value: "created_asc", label: "Created oldest", icon: <SortAsc size={14} /> },
  ];
  const currentSort = sortOptions.find((s) => s.value === sortBy) || sortOptions[0];

  // render
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage accounts for customers, drivers and admins.</p>
        </div>
        <div>
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus size={14}/> <span className="hidden sm:inline">Add User</span>
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent>
          {/* toolbar */}
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-3 w-full max-w-3xl">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border rounded-md px-3 py-1 flex-1 min-w-0">
                <Search size={16} className="text-muted-foreground" />
                <Input
                  className="bg-transparent border-0 p-0 w-full min-w-0 text-sm"
                  placeholder="Search name, email or phone..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)} className="w-36 text-sm rounded-md border px-3 py-2 bg-white/5">
                <option value="all">All roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
              </select>

              <div className="relative">
                <button type="button" onClick={(e)=>{ e.stopPropagation(); setOpenSort(s=>!s); }}
                  className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm bg-white/80 hover:shadow-sm">
                  {currentSort.icon}
                  <span className="truncate">{currentSort.label}</span>
                  <ChevronDown size={14} />
                </button>
                {openSort && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border rounded-md shadow-lg z-50 animate-fade-in" onClick={(e)=>e.stopPropagation()}>
                    {sortOptions.map((opt)=>(
                      <button key={opt.value} onClick={()=>{ setSortBy(opt.value); setOpenSort(false); }}
                        className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800"
                        aria-pressed={sortBy===opt.value}>
                        <div className="w-4">{opt.icon}</div>
                        <div className="flex-1 text-sm">{opt.label}</div>
                        {sortBy===opt.value && <Check size={14} className="text-green-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* table */}
          <div className="w-full overflow-hidden rounded-md border">
            <div className="grid items-center gap-4 px-4 py-3 text-sm font-medium text-muted-foreground bg-slate-50 dark:bg-slate-900"
                 style={{ gridTemplateColumns: "2fr 1.6fr 1fr 1fr 72px" }}>
              <div>User</div>
              <div className="hidden sm:block">Email</div>
              <div className="hidden md:block">Phone</div>
              <div>Role</div>
              <div></div>
            </div>

            <div className="divide-y">
              {loading && <div className="px-6 py-12 text-center text-sm text-muted-foreground">Loading users…</div>}
              {!loading && paginated.map((u,i)=>(
                <div key={u._id} className={`grid gap-4 px-4 py-4 items-start ${i%2===0?"bg-white":"bg-slate-50 dark:bg-slate-900"}`}
                     style={{ gridTemplateColumns: "2fr 1.6fr 1fr 1fr 72px" }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold shadow-sm" style={avatarStyle(`${u.firstName} ${u.lastName}`)}>
                      {initials(u.firstName,u.lastName)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{u.firstName} {u.lastName}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block truncate">{u.email}</div>
                    </div>
                  </div>

                  <div className="hidden sm:block text-sm truncate">{u.email}</div>
                  <div className="hidden md:block text-sm truncate">{u.phone}</div>
                  <div>{roleBadge(u.role)}</div>

                  <div className="flex justify-end items-center relative">
                    <button type="button" onClick={(e)=>{ e.stopPropagation(); setOpenActionId(openActionId===u._id?null:u._id); }}
                      className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                      <Settings size={18}/>
                    </button>
                    {openActionId===u._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border rounded-md shadow-lg z-50">
                        <div className="px-3 py-2 border-b text-xs text-muted-foreground flex items-center gap-2">
                          <Clock size={14}/> <span>Created: {formatDate(u.createdAt)}</span>
                        </div>
                        <button onClick={()=>{ openEdit(u._id); setOpenActionId(null); }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <Edit2 size={14}/> Edit
                        </button>
                        <button onClick={()=>{ promptDelete(u._id); setOpenActionId(null); }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 text-red-600">
                          <Trash size={14}/> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {!loading && paginated.length===0 && <div className="px-6 py-12 text-center text-sm text-muted-foreground">No users found</div>}
            </div>
          </div>

          {/* pagination */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              Showing {(page-1)*pageSize+(paginated.length?1:0)}–{(page-1)*pageSize+paginated.length} of {filtered.length}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</Button>
              <div className="px-3 py-1 border rounded-md text-sm">{page} / {totalPages}</div>
              <Button size="sm" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingId ? "Edit User" : "Add New User"}</DialogTitle></DialogHeader>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={form.firstName} onChange={(e)=>setForm({...form, firstName:e.target.value})}/>
                {formErrors.firstName && <p className="text-red-600 text-sm">{formErrors.firstName}</p>}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={form.lastName} onChange={(e)=>setForm({...form, lastName:e.target.value})}/>
                {formErrors.lastName && <p className="text-red-600 text-sm">{formErrors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
              {formErrors.email && <p className="text-red-600 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})}/>
              {formErrors.phone && <p className="text-red-600 text-sm">{formErrors.phone}</p>}
            </div>
            <div>
              <Label>{editingId?"Password (optional)":"Password"}</Label>
              <Input type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}/>
              {formErrors.password && <p className="text-red-600 text-sm">{formErrors.password}</p>}
            </div>
            <div>
              <Label>Role</Label>
              <select value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})} className="w-full rounded-md border px-3 py-2">
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={()=>{setOpenForm(false); setEditingId(null); setForm(emptyForm);}}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting?"Saving...":editingId?"Save changes":"Create user"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Delete user?</DialogTitle></DialogHeader>
          <div className="py-2 text-sm text-muted-foreground">This action is permanent.</div>
          <DialogFooter>
            <Button onClick={()=>setOpenDelete(false)} variant="ghost">Cancel</Button>
            <Button onClick={handleDeleteConfirmed} variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}} .animate-fade-in{animation:fadeIn 140ms ease-out;}`}</style>
    </div>
  );
}

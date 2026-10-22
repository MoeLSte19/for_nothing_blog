"use client";

import { useEffect, useState } from 'react';

interface PubForm {
  type: 'post' | 'chatter' | 'moment';
  title: string;
  slug: string;
  date: string;
  description: string;
  cover: string;
  tags: string;
  mood: string;
  content: string;
}

const emptyForm: PubForm = {
  type: 'post',
  title: '',
  slug: '',
  date: '',
  description: '',
  cover: '',
  tags: '',
  mood: '',
  content: '',
};

function nowLocal(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

export default function AdminClient() {
  const [auth, setAuth] = useState<'checking' | 'ok' | 'no' | 'not_configured'>('checking');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<PubForm>({ ...emptyForm, date: nowLocal() });

  useEffect(() => {
    fetch('/api/admin/me')
      .then(async (r) => {
        if (r.ok) setAuth('ok');
        else {
          const d = await r.json().catch(() => null);
          setAuth(d?.reason === 'not_configured' ? 'not_configured' : 'no');
        }
      })
      .catch(() => setAuth('no'));
  }, []);

  const set = (k: keyof PubForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submitLogin = async () => {
    setBusy(true); setMsg('');
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) setAuth('ok');
      else setMsg((await r.json().catch(() => ({})))?.error || '登录失败');
    } catch { setMsg('网络错误'); }
    setBusy(false);
  };

  const submitPublish = async () => {
    setBusy(true); setMsg('');
    try {
      const payload: Record<string, unknown> = {
        type: form.type,
        title: form.type === 'post' ? form.title : form.title || (form.type === 'moment' ? '说说' : '杂谈'),
        slug: form.slug,
        date: form.date || nowLocal(),
        description: form.description,
        cover: form.cover,
        mood: form.mood,
        content: form.content,
        tags: form.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean),
      };
      const r = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        setMsg(`✅ ${d.notice || '发布成功'}（${d.file}）`);
        setForm({ ...emptyForm, date: nowLocal() });
      } else {
        setMsg(`❌ ${d.error || '发布失败'}`);
      }
    } catch { setMsg('❌ 网络错误'); }
    setBusy(false);
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuth('no'); setPw(''); setMsg('');
  };

  const card = 'w-full max-w-3xl rounded-3xl bg-white/40 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-xl p-6 md:p-8';
  const label = 'block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wide';
  const input = 'w-full bg-white/50 dark:bg-slate-900/60 border border-white/40 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400';
  const btn = 'px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 disabled:opacity-50 transition';
  const tab = (t: PubForm['type'], name: string) => (
    <button onClick={() => set('type', t)} className={`px-4 py-2 rounded-full text-sm font-bold transition ${form.type === t ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-white/40 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'}`}>{name}</button>
  );

  if (auth === 'checking') {
    return <div className="min-h-screen flex items-center justify-center bg-transparent text-slate-500">加载中…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 pb-16">
      {auth === 'no' && (
        <div className={card}>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-6">管理员登录</h1>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitLogin()} placeholder="管理密码" className={input} autoFocus />
          <button onClick={submitLogin} disabled={busy || !pw} className={`${btn} mt-4 w-full`}>{busy ? '登录中…' : '登录'}</button>
          {msg && <p className="mt-3 text-sm font-bold text-red-500">{msg}</p>}
        </div>
      )}
      {auth === 'not_configured' && (
        <div className={card}>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-4">后台未启用</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">服务器尚未配置 ADMIN_PASSWORD 环境变量（见 /root/xhblogs.env），配置后重启 PM2 即可使用。</p>
        </div>
      )}
      {auth === 'ok' && (
        <div className={card}>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">发布内容</h1>
            <button onClick={logout} className="text-xs font-bold text-slate-500 hover:text-red-500 transition">退出登录</button>
          </div>

          <div className="flex gap-2 mb-6">{tab('post', '文章')}{tab('chatter', '杂谈')}{tab('moment', '说说')}</div>

          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <div>
              <label className={label}>标题</label>
              <input className={input} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder={form.type === 'moment' ? '（说说可不填）' : '标题'} />
            </div>
            {form.type === 'post' && (
              <div>
                <label className={label}>slug（URL 后缀，留空自动生成）</label>
                <input className={input} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="my-first-post" />
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-4">
            <div>
              <label className={label}>日期时间</label>
              <input className={input} value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
            {form.type === 'post' && (
              <div>
                <label className={label}>封面（路径或 URL）</label>
                <input className={input} value={form.cover} onChange={(e) => set('cover', e.target.value)} placeholder="/me.png" />
              </div>
            )}
            {form.type === 'post' && (
              <div>
                <label className={label}>标签（逗号分隔）</label>
                <input className={input} value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="AI, 学习" />
              </div>
            )}
          </div>

          {form.type === 'post' && (
            <div className="mb-4">
              <label className={label}>摘要 description</label>
              <input className={input} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
          )}

          <div className="mb-4">
            <label className={label}>正文 Markdown</label>
            <textarea className={`${input} min-h-[260px] font-mono text-xs leading-relaxed`} value={form.content} onChange={(e) => set('content', e.target.value)} placeholder={'---\ntitle: "文章标题"\ndate: "2026-10-22 12:00:00"\n...\n\n# 正文写这里，支持 Markdown / KaTeX / 代码高亮'} />
          </div>

          <button onClick={submitPublish} disabled={busy || !form.content.trim()} className={btn}>{busy ? '发布中…' : '发布（保存并自动构建，约 1-2 分钟生效）'}</button>
          {msg && <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-pre-line">{msg}</p>}
        </div>
      )}
    </div>
  );
}
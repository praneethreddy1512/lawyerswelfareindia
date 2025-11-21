// Lightweight frontend API client for the backend (LAWYERS)
const BASE = import.meta.env.VITE_BACKEND_URL;

function getToken() {
  return localStorage.getItem('token');
}

function buildHeaders(isJson = true) {
  const headers: Record<string, string> = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const t = getToken();
  if (t) headers['Authorization'] = `Bearer ${t}`;
  return headers;
}

async function request(path: string, opts: RequestInit = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, opts);
  const text = await res.text();
  let body: any = text;

  try {
    body = text ? JSON.parse(text) : undefined;
  } catch (e) {
    // not JSON, ignore
  }

  if (!res.ok) {
    const err = new Error(body?.message || `Request failed: ${res.status}`);
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }

  return body;
}

export const api = {
  health: {
    check: () => request('/api/health'),
  },

  debug: {
    cloudinary: () => request('/api/debug/cloudinary'),
  },

  contacts: {
    create: (payload: { name: string; email: string; phone?: string; message: string }) =>
      request('/api/contacts', {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),
    list: () => request('/api/contacts'),
  },

  admin: {
    register: (payload: { name: string; email: string; password: string; phone?: string }) =>
      request('/api/admin/register', {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),

    login: (payload: { email: string; password: string }) =>
      request('/api/admin/login', {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),
  },

  lawyers: {
    // register expects multipart/form-data with passportPhoto and certificates files
    register: (form: FormData) =>
      request('/api/lawyers/register', { method: 'POST', body: form }),

    login: (payload: { email: string; password: string }) =>
      request('/api/lawyers/login', {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),

    list: (status?: string) => {
      const q = status ? `?status=${encodeURIComponent(status)}` : '';
      return request(`/api/lawyers${q}`);
    },

    get: (id: string) =>
      request(`/api/lawyers/${id}`, { headers: buildHeaders(true) }),

    updateProfile: (id: string, form: FormData) =>
      request(`/api/lawyers/${id}/profile`, {
        method: 'PATCH',
        headers: buildHeaders(false),
        body: form,
      }),

    update: (id: string, form: FormData) =>
      request(`/api/lawyers/${id}`, {
        method: 'PATCH',
        headers: buildHeaders(false),
        body: form,
      }),

    approve: (id: string, payload: { caseName: string; message?: string }) =>
      request(`/api/lawyers/${id}/approve`, {
        method: 'PATCH',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),

    deceased: (id: string, payload: { reason?: string; caseName?: string }) =>
      request(`/api/lawyers/${id}/deceased`, {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(payload),
      }),
  },
};

export default api;

export const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
export const auth = { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` } }

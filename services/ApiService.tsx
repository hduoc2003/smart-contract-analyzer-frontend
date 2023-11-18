const SERVER_BASE_API = process.env.SERVER_BASE_API;
const CLIENT_APT = `${SERVER_BASE_API}/client`
const ADMIN_API = `${SERVER_BASE_API}/admin`

export const urlLogin = `${CLIENT_APT}/auth/login`
export const urlSignup = `${CLIENT_APT}/auth/signup`

export const urlGetUser = `${ADMIN_API}/user`
export const urlUpdateUser = `${ADMIN_API}/user/update`
export const urlDeleteUser = `${ADMIN_API}/user/delete`

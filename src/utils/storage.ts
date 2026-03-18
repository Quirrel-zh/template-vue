import { STORAGE_KEYS } from '@/constants/app'

export function setUserInfo(userInfo: UserInfo) {
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFO) || '{}') as UserInfo
}

export function removeUserInfo() {
  localStorage.removeItem(STORAGE_KEYS.USER_INFO)
}

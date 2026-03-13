import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'
import { Config } from '@/config'

export const request = createAlova({
  baseURL: Config.baseURL,
  statesHook: vueHook,
  requestAdapter: adapterFetch(),
})

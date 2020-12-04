
export interface WifiSettings{
  ssidList:SsidSettings[] | null
}

export interface SsidSettings {
  index: string,
  ssid: string,
  password: string,
  enabled: boolean,
  autoChannelEnabled: boolean,
  ssidAdvertisementEnabled: boolean,
  bandSteeringEnabled: boolean
}

export enum SsidSettingsActionTypes {
  SET_SSID_LIST = "@@ssidSettings/SET_SSID_LIST",
  SET_SSID_SETTINGS = "@@ssidSettings/SET_SSID_SETTINGS"
}
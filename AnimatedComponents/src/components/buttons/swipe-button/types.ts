export interface ITaskStatus {
  icon: string
  iconColor: string
  text: string
  waveColor: Array<string>
}

export interface ITaskStatusData {
  fail: ITaskStatus
  success: ITaskStatus
}

/* eslint-disable no-process-env */
/** Provides process.env for Testing. */
export default class TestEnvProvider<T> {
  /** Stored process.env */
  private readonly storedEnv: NodeJS.ProcessEnv
  private readonly keys: Set<Extract<keyof T, string>>

  constructor(...keys: Extract<keyof T, string>[]) {
    this.storedEnv = { ...process.env }
    this.keys = new Set(keys)
  }

  initialize(obj?: Partial<T>) {
    const env = { ...this.storedEnv }
    this.keys.forEach((k) => delete env[k])
    process.env = { ...env, ...obj }
  }

  restore() {
    process.env = { ...this.storedEnv }
  }
}

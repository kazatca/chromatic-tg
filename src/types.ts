import { ChromaticConfig } from "./chromatic/types"

interface TGConfig {
  token: string
  chatIds: string[]
}

export interface Config {
  tg: TGConfig
  port: number
  chromatic: ChromaticConfig
}

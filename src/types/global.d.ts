import { IStaticMethods } from "flyonui/flyonui"

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

window.HSStaticMethods.autoInit() // No TS warnings/errors now

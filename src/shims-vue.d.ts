import { PluginFunction } from "vue";
import type { AttributifyNames } from "@unocss/preset-attributify";
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

type Prefix = "un-";
declare module "@vue/runtime-dom" {
  interface HTMLAttributes
    extends Partial<Record<AttributifyNames<Prefix>, string>> {}
}

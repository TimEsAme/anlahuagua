import type { App } from "vue";
import { permission } from "./permission";

export default function registerDirectives(app: App) {
  app.directive("permission", permission);
}

// src/components/jojo/index.d.ts
import { DefineComponent } from "vue";

export interface JojoProps {
  name?: string;
  hobby?: string;
}

declare const Jojo: DefineComponent<JojoProps>;
export default Jojo;

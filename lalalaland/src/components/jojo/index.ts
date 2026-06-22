import { defineComponent, h } from "vue";
import styles from "./index.module.css";

export default defineComponent({
  name: "jojo",
  props: {
    name: String,
    hobby: String,
  },
  setup(props) {
    return () => {
      return h(
        "div",
        {
          class: styles.userCard,
        },
        [
          h(
            "h1",
            {
              class: styles.userH2,
            },
            props.name,
          ),
          h(
            "p",
            {
              class: styles.userP,
            },
            props.hobby,
          ),
        ],
      );
    };
  },
});

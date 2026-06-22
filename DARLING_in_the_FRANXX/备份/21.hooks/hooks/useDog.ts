import { onMounted, reactive } from "vue";
import axios from "axios";

export default function () {
  let imgList = reactive<string[]>([]);

  async function getDog() {
    try {
      let res = await axios.get(
        "https://dog.ceo/api/breed/pembroke/images/random",
      );
      imgList.push(res.data.message);
    } catch (error) {
      alert(error);
    }
  }

  onMounted(() => {
    getDog();
  });
  return { imgList, getDog };
}

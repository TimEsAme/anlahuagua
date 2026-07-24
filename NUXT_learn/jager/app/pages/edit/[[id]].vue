<template>
  <div class="container">
    <el-form
      class="form"
      :model="user"
      ref="myForm"
      id="myForm"
      label-width="100px"
    >
      <div>
        <el-form-item label="姓名" prop="name">
          <el-input
            type="text"
            placeholder="请填写用户姓名"
            v-model.trim="user.name"
          />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            type="text"
            placeholder="请填写用户年龄"
            v-model.trim="user.age"
          />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            type="text"
            placeholder="请填写用户电话号码"
            v-model.trim="user.phone"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            placeholder="请填写用户邮箱地址"
            v-model.trim="user.email"
          />
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="user.education" placeholder="请选择学历">
            <el-option label="小学" value="小学" />
            <el-option label="初中或职中" value="初中或职中" />
            <el-option label="高中或职高" value="高中或职高" />
            <el-option label="专科" value="专科" />
            <el-option label="本科" value="本科" />
            <el-option label="硕士" value="硕士" />
            <el-option label="博士" value="博士" />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业学校" prop="graduationschool">
          <el-input
            type="text"
            placeholder="请填写用户毕业院校"
            v-model.trim="user.graduationschool"
          />
        </el-form-item>
        <el-form-item label="职业" prop="profession">
          <el-input
            type="text"
            placeholder="请填写用户从事的相关职业"
            v-model.trim="user.profession"
          />
        </el-form-item>
        <el-form-item label="个人简介" prop="profile">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请简单的介绍一下你自己，包括兴趣、爱好等信息..."
            v-model.trim="user.profile"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUserInfo($refs.myForm)">{{
            id ? "确认修改" : "确认添加"
          }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores";
const store = useUserStore();
const router = useRouter();
const route = useRoute();
const id = computed(() => route.params.id);

const user = reactive({
  name: "",
  age: "",
  phone: "",
  email: "",
  education: "本科",
  graduationschool: "",
  profession: "",
  profile: "",
});

// onMounted(async () => {
//   if (id) {
//     // 说明是修改，需要做用户数据的回填
//     const data = await store.getUserById(id);
//     Object.assign(user, data);
//   }
// });

const { data } = await useAsyncData("user", () => {
  if (!id.value) return null;
  return store.getUserById(id.value);
});

if (data.value) {
  Object.assign(user, data.value);
}

const submitUserInfo = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      //说明验证通过，可以新增或者保存
      if (id.value) {
        // 修改
        await store.editUserById(id.value, user);
        ElMessage.success("修改成功");
        router.push("/");
      } else {
        // 新增
        await store.addUser(user);
        ElMessage.success("新增成功");
        router.push("/");
      }
    } else {
      // 验证不通过
      ElMessage.error("请检查表单填写是否正确");
      return false;
    }
  });
};

// 添加表单的验证规则
const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 5, message: "姓名长度在2-5个字符之间", trigger: "blur" },
  ],
  age: [
    { required: true, message: "年龄不能为空", trigger: "blur" },
    {
      pattern: /^[1-9][0-9]*$/,
      message: "年龄必须是正整数",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "电话不能为空", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    {
      type: "email",
      message: "请输入有效的邮箱地址",
      trigger: "blur",
    },
  ],
  education: [{ required: true, message: "请选择学历", trigger: "change" }],
  graduationschool: [
    { required: true, message: "毕业学校不能为空", trigger: "blur" },
  ],
  profession: [{ required: true, message: "职业不能为空", trigger: "blur" }],
  profile: [
    { required: true, message: "个人简介不能为空", trigger: "blur" },
    { min: 10, message: "个人简介至少需要10个字符", trigger: "blur" },
  ],
};
</script>

<style scoped>
.form {
  margin: 20px;
}
</style>

<template>
  <div class="father">
    <h1>父组件</h1>
    <div class="content">
      <Game>
        <template #jojo="{ games }">
          <ul>
            <li v-for="e in games" :key="e.id">{{ e.name }}</li>
          </ul>
        </template>
      </Game>
      <Game>
        <template v-slot:jojo="{ games }">
          <ol>
            <li v-for="e in games" :key="e.id">{{ e.name }}</li>
          </ol>
        </template>
      </Game>
      <Game>
        <template #jojo="{ games }">
          <h3 v-for="e in games" :key="e.id">{{ e.name }}</h3>
        </template>
      </Game>
    </div>
  </div>
</template>

<script setup lang="ts">
import Game from "./Game.vue";
defineOptions({
  name: "Father",
});
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
.content {
  display: flex;
  justify-content: space-evenly;
}
h3 {
  margin-left: 15px;
}
</style>

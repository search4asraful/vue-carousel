<template>
  <VueCarousel :slidesData="sliders" :dragging="false">
    <template #slide="{ slide }">
      <div class="px-14 flex justify-center flex-col items-center pb-10">
        <p class="leading-relaxed text-lg text-blue-400">
          {{ slide.text }}
        </p>
        <h2
          class="text-gray-900 dark:text-white font-medium title-font tracking-wider text-sm"
        >
          {{ slide.author }}
        </h2>
        <!-- :slidesData="dyamicData" pass is mandatory -->
      </div>
    </template>
  </VueCarousel>
</template>

<script>
import VueCarousel from "./components/VueCarousel.vue";

export default {
  components: {
    VueCarousel,
  },
  data() {
    return {
      sliders: [
        {
          key: 1,
          text: "Item 1",
          author: "HOLDEN CAULFIELD",
        },
        {
          key: 2,
          text: "Item 2",
          author: "JANE DOE",
        },
        {
          key: 3,
          text: "Item 3",
          author: "JOHN SMITH",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add your preferd styles here */
</style>

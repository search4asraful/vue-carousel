<template>

  <section class="slider-section">
  <div class="wrapper-container">
    <div
      class="slider"
      ref="slider"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
    >
      <div
        class="slides-wrapper"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
        >
          <slot name="slide" :slide="slide" :index="index">
            <!-- Default content if slot is not provided -->
            <div class="slide-content">
              <h2 class="slide-title">
                {{ slide.text }}
              </h2>
              <p>{{ slide.author }}</p>
              <small>{{ slide.role }}</small>
            </div>
          </slot>
        </div>
      </div>

      <!-- Navigation prev -->
      <button
        v-if="props.navigation"
        @click="prevSlide"
        class="nav-button prev"
      >
        <svg
          class="nav-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <!-- Navigation next -->
      <button
        v-if="props.navigation"
        @click="nextSlide"
        class="nav-button next"
      >
        <svg
          class="nav-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <!-- Indicators -->
      <div
        v-if="props.indicators"
        class="indicators"
      >
        <span
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          :class="{
            'active-indicator': activeIndex === index,
            'inactive-indicator': activeIndex !== index,
          }"
          class="indicator"
        ></span>
      </div>
    </div>
  </div>
</section>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  slidesData: {
    type: Array,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  autoplaydelay: {
    type: Number,
    default: 2500,
  },
  dragging: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  indicators: {
    type: Boolean,
    default: true,
  },
});

const slides = ref(props.slidesData);
const activeIndex = ref(0);
const startX = ref(0);
const isDragging = ref(false);
let autoplayInterval;

const restartAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
  if (props.autoplay) {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, props.autoplaydelay);
  }
};

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.value.length;
  restartAutoplay();
};

const prevSlide = () => {
  activeIndex.value =
    (activeIndex.value - 1 + slides.value.length) % slides.value.length;
  restartAutoplay();
};

const goToSlide = (index) => {
  activeIndex.value = index;
};

const onDragStart = (event) => {
  if (!props.dragging) return;
  startX.value = event.clientX;
  isDragging.value = true;
};

const onDragMove = (event) => {
  if (!isDragging.value) return;
};

const onDragEnd = (event) => {
  if (!isDragging.value) return;

  const dragDistance = startX.value - event.clientX;

  if (Math.abs(dragDistance) > 50) {
    if (dragDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  isDragging.value = false;
};

onMounted(() => {
  restartAutoplay();
});

onBeforeUnmount(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
});
</script>

<style scoped>
  .slider-section {
    color: #4a4a4a;
    font-family: sans-serif;
  }

  .wrapper-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .slider {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .slides-wrapper {
    display: flex;
    transition: transform 0.7s ease-in-out;
  }

  .slide {
    flex-shrink: 0;
    width: 100%;
    user-select: none;
  }

  .slide-content {
    padding: 1rem;
    text-align: center;
  }

  .slide-title {
    font-size: 1.125rem;
    font-weight: bold;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(107, 114, 128, 0.5); /* Tailwind's bg-gray-400/50 */
    color: white;
    padding: 0.5rem;
    border-radius: 9999px;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s;
  }

  .nav-button:hover {
    background-color: rgba(107, 114, 128, 0.3); /* Tailwind's hover:bg-gray-500/30 */
  }

  .nav-button.prev {
    left: 1rem;
  }
  .nav-button.prev > svg{
    rotate: 180deg;
  }

  .nav-button.next {
    right: 1rem;
  }

  .nav-icon {
    width: 1rem;
  }

  .indicators {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  .indicator {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all .3s ease;
  }

  .active-indicator {
    background-color: rgba(156, 163, 175, 0.3); /* Tailwind's bg-gray-800/20 */
    width: 1.4rem;
  }

  .inactive-indicator {
    background-color: rgba(56, 63, 73, 0.3); /* Tailwind's bg-gray-400/20 */
  }

  @media (max-width: 768px) {
    .wrapper-container {
      padding: 0 0.5rem;
    }

    .slide-title {
      font-size: 1rem;
    }
  }
</style>
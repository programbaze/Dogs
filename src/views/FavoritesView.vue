<template>
  <div class="container mx-auto px-2">
    <div class="mx-auto w-full px-1 text-center lg:w-6/12">
      <p class="block antialiased font-sans text-xl leading-relaxed text-inherit font-semibold pt-6">Избранное</p>
    </div>

    <DogsList
        :dogs="dogs"
    />

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import DogsList from "../components/DogsList.vue";
import {useDogsStore} from "@/store/DogsStore";
import {useDogsBreedStore} from "@/store/DogsBreedStore";

export default defineComponent({
  name: 'FavoritesView',
  components: {
    DogsList
  },
  setup(){
    const dogsStore = useDogsStore();
    const dogs = computed(() => dogsStore.favoriteStore)

    return { dogs}
  }
});
</script>

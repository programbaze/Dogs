<template>
  <div class="container mx-auto px-2">
    <div class="mx-auto w-full px-1 text-center lg:w-6/12">
      <p class="block antialiased font-sans text-xl leading-relaxed text-inherit font-semibold pt-6">Главная</p>
    </div>
    <DogsList
        :dogs="dogs"
    />
    <LasyLoad
        :route-name="routeName"
        :route-id="routeId"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useDogsStore} from "@/store/DogsStore";
import DogsList from "../components/DogsList.vue";
import LasyLoad from "../components/LasyLoad.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";
export default defineComponent({
  name: 'HomeView',
  components: {
    DogsList,
    LasyLoad
  },
  setup(){
    const route = useRoute()
    const routeName = route.name
    const routeId =  route.params.id
    const dogsStore = useDogsStore();
    const dogs = computed(() => dogsStore.dogsSort)
    dogsStore.delDogs()
    dogsStore.getDogs('https://dog.ceo/api/breeds/image/random/20')

    return { dogs, routeName, routeId }
  }

});
</script>

<template>
  <div class="container mx-auto px-2">
    <div class="mx-auto w-full px-1 text-center lg:w-6/12">
      <p class="block antialiased font-sans text-xl leading-relaxed text-inherit font-semibold pt-6">Главная</p>
    </div>
    <div class="mx-auto w-full px-1">
      <p class="block antialiased font-sans leading-relaxed text-inherit font-semibold pt-6">Выберите породу:</p>
    </div>

    <div class="flex flex-wrap mt-2">
      <span v-for="dog in listBogsBreed" :key="dog" :value="dog" @click="onChange(dog)" class="mr-1 mb-1 cursor-pointer relative grid select-none items-center whitespace-nowrap rounded-lg bg-blue-500 hover:bg-blue-700 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
        {{ dog }}
      </span>
    </div>
    <DogsList
        :dogs="dogs"
    />
    <div class="mt-8 mb-8 justify-center flex">
      <button @click="moreDogs()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Показать еще
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useDogsStore} from "@/store/DogsStore";
import DogsList from "../components/DogsList.vue";
import {useDogsBreedStore} from "@/store/DogsBreedStore";
import {computed} from "vue";
export default defineComponent({
  name: 'HomeView',
  components: {
    DogsList
  },
  setup(){
    const dogsStore = useDogsStore();
    const dogsSortStore = dogsStore.getDogs('https://dog.ceo/api/breeds/image/random/20');
    const dogs = computed(() => dogsStore.dogsSort)

    const dogsBreedStore = useDogsBreedStore();
    const breedDogs = dogsBreedStore.getDogs();
    const listBogsBreed = computed(() => dogsBreedStore.dogsBreed)

    const allDogs = ref()

    const selected = ref()

    const onChange = (select: string) => {
      selected.value = select
      useDogsStore().delDogs()
      useDogsStore().getDogs('https://dog.ceo/api/breed/' + select + '/images/random/20')
    }
    const moreDogs = () => {
      if(selected.value){
        useDogsStore().getDogs('https://dog.ceo/api/breed/' + selected.value + '/images/random/20')
      }
      else{
        useDogsStore().getDogs('https://dog.ceo/api/breeds/image/random/20')
      }
    }
    return { dogs, breedDogs, dogsBreedStore, listBogsBreed, dogsSortStore, moreDogs, allDogs, onChange }
  }

});
</script>

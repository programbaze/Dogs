<template>
    <div class="mt-8 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">

      <div class="group relative card-fav" v-for="dog in sortDogs" :key="dog.img" @click="addRemomeFavorite(dog)">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img :src="dog.img" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
        </div>
        <div class="text-fav font-medium text-gray-900">
          <span v-if="dog.isFavorites==true">Уже в избранном (Удалить?)</span>
          <span v-else>Добавить в избранное?</span>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"></span>
                Порода:
              </a>
            </h3>
          </div>
          <p class="text-sm font-medium text-gray-900">{{dog.breed}}</p>
        </div>
      </div>

    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {PropType} from "vue";
import Dog from "../types/Dog";
import {useDogsStore} from "@/store/DogsStore";

export default defineComponent({
  name: 'DogsList',
  props: {
    dogs: {
      required: true,
      type: Array as PropType<Dog[]>
    }
  },
  setup(props){

    const sortDogs = computed(() => {
      let breed = props.dogs;
      return breed
    })

    const addRemomeFavorite = (obj: { breed: string; img: string; isFavorites: boolean; }) => {
      const dogsStore = useDogsStore();
      dogsStore.addRemomeFavoriteStore(obj)
    }

    return {sortDogs, addRemomeFavorite}
  }
});
</script>

<style scoped>
.text-fav{
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
}
.card-fav:hover .text-fav{
  display: block;
}
</style>

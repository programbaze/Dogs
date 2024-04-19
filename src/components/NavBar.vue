<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link :to="{ name: 'home' }" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Главная</router-link>
              <div class="relative dropdown">
                <div @click="visibleList=!visibleList" ref="todoItem" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer text-center inline-flex items-center">
                  <span class="mr-1">Выбор породы</span>
                  <svg v-show="!visibleList" class="w-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                  </svg>
                  <svg v-show="visibleList" class="w-4 text-white" display="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                  </svg>

                </div>
                <div v-show="visibleList" class="absolute z-10 bg-gray-700 rounded-md w-25 text-white mt-2 px-1 overflow-scroll-y dropdown__wrap-list">
                  <ul class="dropdown__list max-h-60 px-1 py-1">
                    <li v-for="dog in listBogsBreed" :key="dog" :value="dog">
                      <router-link :to="{ name: 'breed', params: { id: dog } }"  @click="onChange(dog)" class="block hover:bg-gray-800 px-2 rounded-md cursor-pointer">
                        {{ dog }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <router-link :to="{ name: 'favorites' }" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Избранное</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Главная</router-link>
        <router-link to="/favorites" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Избранное</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useDogsStore} from "@/store/DogsStore";
import {useDogsBreedStore} from "@/store/DogsBreedStore";
import {onClickOutside} from "@vueuse/core";
import {computed} from "vue";
export default defineComponent({
  name: 'NavBar',
  components: {},
  setup(){
    const dogsBreedStore = useDogsBreedStore();
    const listBogsBreed = computed(() => dogsBreedStore.dogsBreed)

    const breedDogs = dogsBreedStore.getDogs();

    const selected = ref()
    const visibleList = ref()
    const todoItem = ref(null)

    const onChange = (select: string) => {
      selected.value = select
      useDogsStore().delDogs()
      useDogsStore().getDogs('https://dog.ceo/api/breed/' + select + '/images/random/20')
    }


    onClickOutside(todoItem, () => {
      visibleList.value = false
    })


    return { listBogsBreed, onChange, visibleList, breedDogs, todoItem }
  }

});
</script>

<style scoped lang="scss">
.dropdown{
  &__list{
    overflow-y: scroll;
    &::-webkit-scrollbar{
      background-color: #5b6b85;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #42b983;
      border-radius: 22px;
    }
    &::-webkit-scrollbar-track{
      margin: 10px 0;
    }
  }
}
</style>
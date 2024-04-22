import {defineStore} from "pinia";
import { ref } from 'vue';
import { useLocalStorage } from "@vueuse/core"
import Dog from "@/types/Dog";
export const useDogsStore = defineStore('dogsStore',  () => {

    const dogsSort = ref<Dog[]>([])
    const keys = ref<Dog[]>([])
    const favoriteStore = ref<Dog[]>([])
    const favoriеTempStore = ref<Dog[]>([])
    const getDogs = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();
        for (const value of Object.values(data.message)) {
            keys.value.push({'img': value, 'breed': defineBreed(`${value}`), 'isFavorites': false})
        }
        dogsSort.value = keys.value
    }

    const defineBreed = (text: string) => {
        const strStart = text.replace('https://images.dog.ceo/breeds/','')
        const strFinal = strStart.split('/')[0];
        return strFinal
    }

    const delDogs = () => {
        keys.value = []
    }

    const addFavoriteStore = (obj: Dog) =>{
        dogsSort.value.map( (item) => {
            if(item.img == obj.img && item.isFavorites == false){
                item.isFavorites = true
                favoriеTempStore.value.push(item)
                favoriteStore.value = []
                favoriеTempStore.value.forEach(function(entry: Dog) {
                    if(entry.isFavorites == true){
                        favoriteStore.value.push(entry)
                    }
                });
            }
        })
    }

    const delFavoriteStore = (obj: Dog) =>{
        favoriеTempStore.value.map( (item) => {
            if(item.img == obj.img){
                item.isFavorites = false
                favoriteStore.value = []
                favoriеTempStore.value.forEach(function(entry: Dog) {
                    if(entry.isFavorites == true){
                        favoriteStore.value.push(entry)
                    }
                });
            }
        })
        dogsSort.value.map( (item) => {
            if(item.img == obj.img && item.isFavorites == true){
                item.isFavorites = false
                favoriеTempStore.value.push(item)
            }
        })

    }

    return {
        getDogs, delDogs, addFavoriteStore, delFavoriteStore,  favoriteStore: useLocalStorage('favoriteStore', favoriteStore), dogsSort: useLocalStorage('dogsSort', dogsSort),
    }
}
)

import {defineStore} from "pinia";
const url = 'https://dog.ceo/api/breeds/list/all'
import { ref } from 'vue';

export const useDogsBreedStore = defineStore('dogsBreedStore', () => {

    const dogsBreed = ref()
    const getDogs = async () => {
        const res = await fetch(url);
        const data = await res.json();
        const keys = []
        for (const key in data.message) {
            keys.push(key)
        }
        dogsBreed.value = keys
        return keys
    }

    return {
        getDogs, dogsBreed
    }
})

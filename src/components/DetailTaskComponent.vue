<template>
    <div class="relative h-screen col-span-3 pt-14 px-5 bg-neutral-800">
        <button @click="Task.closeDetailTask()" type="submit" class="absolute right-4 top-4">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="w-full bg-neutral-700 rounded-sm  px-4 pt-4">
            <div class="flex items-center">
            <div class="block mt-1">
                <input type="checkbox" class="w-7 h-7 accent-neutral-300 bg-neutral-700">
            </div>
            <div class="mx-3">
                <h1 class="text-lg">Mengerjakan tugas</h1>
            </div>
            <div class="absolute right-9">
                <span class="material-symbols-outlined">star</span>
            </div>
            </div>
            <div class="flex justify-center mt-4">
            <div class="h-11">
                <span class="material-symbols-outlined">add</span>
            </div>
            <div class="ml-3 h-11 w-full">
                <input type="text" class="bg-neutral-700 focus:outline-none w-full" placeholder="Add a step">
            </div>
            </div>
        </div>
        <div class="w-full mt-4 bg-neutral-700 rounded-sm  px-4 pt-4">
            <div class="ml-3 h-11 w-full">
                <input type="text" class="bg-neutral-700 focus:outline-none w-full" placeholder="Add a notes">
            </div>
        </div>
        <div class="absolute bottom-0 h-10">
            <div class="grid grid-cols-6">
            <div class="col-start-3 col-span-2">
                <h1>Created an hour ago</h1>
            </div>
            <div class="absolute -right-11">
                <button type="submit">
                <span class="material-symbols-outlined">
                    delete
                </span>
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTask } from '@/store';
export default {
    data() {
        const Task = useTask();
        return {
            Task,
        }
    }
}
</script>
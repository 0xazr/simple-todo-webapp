<template>
    <div @click="Task.detailTask(task.id)" class="mt-2 w-full px-3 py-2 bg-neutral-700 bg-opacity-70 rounded-lg flex">
        <div class="block mt-1">
            <input @click="Task.toggleTaskDone(task.id)" type="checkbox" :checked="task.is_done" class="w-7 h-7 accent-neutral-300 bg-neutral-700">
        </div>
        <div class="mx-3">
            <h1 class="text-lg" :class="{'line-through': task.is_done}">{{task.title}}</h1>
            <h1 class="text-md font-light">Tasks</h1>
        </div>
        <div class="absolute right-3 mt-3">
            <span class="material-symbols-outlined">star</span>
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
    },
    props: {
        task: Object
    }
}
</script>
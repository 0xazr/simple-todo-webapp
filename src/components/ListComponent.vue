<template>
    <button class="w-full group">
        <div class="relative p-1 m-1 hover:bg-neutral-700 group-focus:bg-neutral-700 rounded-md grid grid-cols-6 gap-4 cursor-pointer select-none" :class="[this.$route.path === '/list/'+list.id ? 'bg-neutral-700' : '']">
            <div class="absolute h-9 w-1 bg-blue-500 rounded-full left-0 top-[7px]" :class="[this.$route.path === '/list/'+list.id ? 'block' : 'hidden']"></div>
            <div class="flex items-center justify-center h-10">
                <span class="material-symbols-outlined">
                    menu
                </span>
            </div>
            <div class="col-span-4 flex items-center h-10">
                <h1 class="text-lg">{{list.title}}</h1>
            </div>
        </div>
    </button>
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
        list: Object
    }
}
</script>
<template>
    <div class="absolute bottom-0 w-full bg-black bg-opacity-70 rounded-lg cursor-pointer">
        <div class="flex px-3 py-2">
            <div class="mt-3 flex justify-center items-center rounded-md w-full">
                <div class="h-10">
                  <span class="material-symbols-outlined">add</span>
                </div>
                <div class="ml-3 h-10 w-full">
                  <input @keyup.enter="Task.pushTask()" type="text" class="bg-black focus:outline-none w-full" placeholder="New Task" v-model="Task.new_task.title">
                </div>
                <div class="h-10">
                    <span @click="Task.pushTask()" class="material-symbols-outlined mx-3">
                        send
                    </span>
                </div>
              </div>
        </div>
    </div>
</template>

<script>
import {useTask} from '@/store/index'

export default {
  data() {
    return {

    }
  },
  setup() {
    const Task = useTask();
    return {
      Task,
    }
  },
  methods: {
  },
  mounted() {
  },
};
</script>
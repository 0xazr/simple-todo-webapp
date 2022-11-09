<template>
    <div class="relative h-full">
        <div class="grid grid-cols-7">
            <div class="col-span-5 flex items-center">
                <span class="material-symbols-outlined text-4xl mr-3">
                    star
                </span>
                <h1 class="text-4xl font-bold text-neutral-50">Important</h1>
            </div>
            <!-- <div class="col-start-7 w-full">
                <div class="relative">
                    <div class="absolute right-0 top-3">
                        <button @click="Task.deleteAllTasks()" type="submit" class="w-10 h-10 rounded-lg bg-neutral-300 bg-opacity-20">
                            <span class="material-symbols-outlined flex items-center justify-center">
                                restart_alt
                            </span>
                        </button>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="mt-7">
            <div v-for="(task, index) in Task.tasks" :key="index">
                <TaskComponent coll="general-task" :list_id="null" :task="task" v-if="!task.is_done && task.is_important" />
            </div>
            <div v-if="Task.tasks.length > 0" class="mt-4 w-[9.5rem] px-3 py-2 bg-neutral-700 bg-opacity-70 rounded-lg flex font-semibold">
                <span class="material-symbols-sharp mr-1 mt-[1px]">
                    expand_more
                </span>
                <h1>Completed</h1>
            </div>
            <div v-for="(task, index) in Task.tasks" :key="index">
                <TaskComponent coll="general-task" :list_id="null" :task="task" v-if="task.is_done && task.is_important" />
            </div>
        </div>
        <AddTask coll="general-task" id="important-task"/>
    </div>
    <DetailTaskComponent v-if="Task.detail_task.show_task" :id="Task.detail_task.data.id" coll="general-task" :list_id="null"/>
</template>

<script>
import TaskComponent from "@/components/TaskComponent.vue";
import DetailTaskComponent from "@/components/DetailTaskComponent.vue";
import AddTask from "@/components/AddTask.vue";
import {useTime, useTask} from "@/store/index";

export default {
    data() {
        const Time = useTime();
        const Task = useTask();
        return {
            Time,
            Task,
        }
    },
    components: {
        TaskComponent,
        DetailTaskComponent,
        AddTask,
    },
    created() {
        this.Task.getAllTasks();
        setInterval(this.Time.getDate, 100);
    },
}
</script>
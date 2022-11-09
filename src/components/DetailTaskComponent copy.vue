<template>
    <div class="absolute right-0 top-0">
        <div class="relative h-screen col-span-3 pt-14 px-5 bg-neutral-800">
            <button @click="Task.closeDetailTask()" type="submit" class="absolute right-4 top-4">
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="w-full bg-neutral-700 rounded-sm  px-4 pt-4">
                <div class="flex items-center">
                    <div class="block mt-1">
                        <input @click="Task.toggleTaskDone(coll, list_id, id)" type="checkbox" class="w-7 h-7 accent-neutral-300 bg-neutral-700 rounded-full text-neutral-800 focus:ring-0" :checked="this.Task.tasks.find(task => task.id === this.id).is_done">
                    </div>
                    <div class="w-full ml-1 mr-8">
                        <input type="text" v-model="Task.detail_task.data.title" class="w-full bg-neutral-700 border-0 focus:ring-0" :class="{'line-through': this.Task.tasks.find(task => task.id === this.id).is_done}">
                    </div>
                    <div class="absolute right-9">
                        <button type="submit" @click="Task.toggleTaskImportant(coll, list_id, id)">
                            <span :class="Task.detail_task.data.is_important ?'material-symbols-sharp' : 'material-symbols-outlined'">star</span>
                        </button>
                    </div>
                </div>
                <div v-for="(step, index) in Task.detail_task.data.steps" :key="index">
                    <div class="flex items-center">
                        <div class="block ml-[0.2rem]">
                            <input @click="Task.toggleStepDone(coll, list_id, id, index)" type="checkbox" class="w-5 h-5 accent-neutral-300 bg-neutral-700 rounded-full text-neutral-800 focus:ring-0" :checked="step.is_done">
                        </div>
                        <div class="mx-1 border-b-[1px] w-full mr-7">
                            <input type="text" :value="step.title" class="w-full bg-neutral-700 border-0 focus:ring-0 text-sm    " :class="{'line-through': step.is_done}">
                        </div>
                        <div class="absolute right-9 mt-5">
                            <button type="submit" @click="Task.removeStep(coll, list_id, id, index)">
                                <span class="material-symbols-outlined text-lg">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-4">
                <div class="h-11 mt-1">
                    <span class="material-symbols-outlined">add</span>
                </div>
                <div class="ml-3 h-11 w-full">
                    <input @keyup.enter="Task.addStepTask(coll, list_id, id, Task.step)" type="text" class="bg-neutral-700 focus:outline-none w-full border-0 focus:ring-0" placeholder="Add a step" v-model="Task.step">
                </div>
                </div>
            </div>
            <!-- <div class="w-full mt-4 bg-neutral-700 rounded-sm  px-4 py-4">
                <div class="w-full">
                    <textarea @keyup.enter="Task.addNotesTask(id, Task.notes)" rows="4" class="bg-neutral-700 focus:outline-none w-full border-0 focus:ring-0" placeholder="Add a notes" :value="Task.tasks.find(task => task.id === this.id).notes"></textarea>
                </div>
            </div> -->
            <div class="absolute bottom-3 right-3">
                <button @click="Task.deleteTask(coll, list_id, id)" type="submit">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useTask } from '@/store';
export default {
    data() {
        const Task = useTask();
        let task = {};
        let step = "";
        return {
            Task,
            step
        }
    },
    props: {
        coll: String,
        list_id: String,
        id: String,
    },
    created() {
        // console.log(this.Task.detail_task.data);
    },
    watch: {
        "Task.tasks": {
            handler() {
                if(this.coll == "general-task") {
                    this.Task.detail_task.data = this.Task.tasks.find(task => task.id === this.id);
                } else {
                    let list = this.Task.lists.find(list => list.id === this.list_id);
                    this.Task.detail_task.data = list.tasks.find(task => task.id === this.id);
                    console.log("list : ",list)
                }
            }
        }
    }
}
</script>
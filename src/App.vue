<template>
  <!-- Base -->
  <div class="flex h-screen bg-[url('https://images.unsplash.com/photo-1546825032-3d886e13b53f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover text-neutral-100">
    <!-- Sidebar -->
    <div class="relative h-screen max-w-72 pt-4 px-2 bg-neutral-800 text-sm">
      <!-- User Section -->
      <div class="flex items-center h-24 px-4 mb-3">
        <div class="h-20 w-20 bg-[url('https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg')] bg-cover rounded-full"></div>
        <div class="ml-2 text-neutral-100">
          <h1 class="font-bold">Muhammad Azril</h1>
          <h1>akuazril12@gmail.com</h1>
        </div>
      </div>
      <!-- Search Box -->
      <div class="relative mt-1 mx-3 text-neutral-100">
      <input v-model="Task.search" @keyup.enter="Task.searchTask()" type="text" class="w-full p-2 bg-neutral-800 rounded-lg border-2 border-neutral-600 border-b-2 border-b-neutral-100">
        <button type="submit" class="absolute text-neutral-100 right-3 top-3 cursor-pointer">
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
      <hr class="mt-5 border-neutral-700">
      <div class="mt-1 text-neutral-100">
        <RouterLink to="/" class="w-full group">
          <div class="relative p-1 m-1 hover:bg-neutral-700 group-focus:bg-neutral-700 rounded-md grid grid-cols-6 gap-4 cursor-pointer select-none">
            <div class="absolute h-9 w-1 bg-blue-500 rounded-full left-0 top-[7px] hidden group-focus:block"></div>
            <div class="flex items-center justify-center h-10">
              <span class="material-symbols-outlined">wb_sunny</span>
            </div>
            <div class="col-span-4 flex items-center h-10">
              <h1 class="text-lg">My Day</h1>
            </div>
          </div>
        </RouterLink>
        <RouterLink to="/important" class="w-full group">
        <div class="relative p-1 m-1 hover:bg-neutral-700 group-focus:bg-neutral-700 rounded-md grid grid-cols-6 gap-4 cursor-pointer select-none">
            <div class="absolute h-9 w-1 bg-blue-500 rounded-full left-0 top-[7px] hidden group-focus:block"></div>
            <div class="flex items-center justify-center h-10">
              <span class="material-symbols-outlined">star</span>
            </div>
            <div class="col-span-4 flex items-center h-10">
              <h1 class="text-lg">Important</h1>
            </div>
          </div>
        </RouterLink>
        <!-- <button class="w-full group">
          <div class="relative p-1 m-1 hover:bg-neutral-700 group-focus:bg-neutral-700 rounded-md grid grid-cols-6 gap-4 cursor-pointer select-none">
            <div class="absolute h-9 w-1 bg-blue-500 rounded-full left-0 top-[7px] hidden group-focus:block"></div>
            <div class="flex items-center justify-center h-10">
              <span class="material-symbols-outlined">calendar_today</span>
            </div>
            <div class="col-span-4 flex items-center h-10">
              <h1 class="text-lg">Planned</h1>
            </div>
          </div>
        </button> -->
        <RouterLink to="/tasks" class="w-full group">
          <div class="relative p-1 m-1 hover:bg-neutral-700 group-focus:bg-neutral-700 rounded-md grid grid-cols-6 gap-4 cursor-pointer select-none">
            <div class="absolute h-9 w-1 bg-blue-500 rounded-full left-0 top-[7px] hidden group-focus:block"></div>
              <div class="flex items-center justify-center h-10">
                <span class="material-symbols-outlined">home</span>
              </div>
            <div class="col-span-4 flex items-center h-10">
              <h1 class="text-lg">Tasks</h1>
            </div>
          </div>
        </RouterLink>

        <hr class="border-neutral-700">
        <!-- Custom Lists -->
        <div v-for="list in Task.lists">
          <RouterLink :to="'/list/'+list.id">
            <ListComponent :list="list"/>
          </RouterLink>
        </div>
      </div>
      <!-- Add new list -->
      <div class="absolute bottom-0 w-[16.5rem]">
        <div class="p-2 rounded-md cursor-pointer">
          <div class="flex items-center w-full">
            <div>
              <input type="text" class="w-[14rem] bg-neutral-800 border-0 focus:ring-0" placeholder="New List" v-model="Task.new_list.title">
            </div>
            <div class="mt-1">
              <span @click="Task.newList()" class="material-symbols-outlined hover:bg-neutral-700 rounded-md">add</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div class="h-screen p-20 rounded-l-lg" :class="[Task.detail_task.show_task ? 'w-[57rem]' : 'w-full']">
      <RouterView></RouterView>
    </div>
    
    <!-- <DetailTaskComponent v-if="Task.detail_task.show_task" :id="Task.detail_task.data.id"/> -->
    <!-- <AddList/> -->
  </div>
</template>

<script>
import ListComponent from '@/components/ListComponent.vue'
import DetailTaskComponent from '@/components/DetailTaskComponent.vue'
import AddList from './components/AddList.vue'

import { useTask } from '@/store'
export default {
    data() {
      const Task = useTask();
      return {
        Task
      }
    },
    components: {
        ListComponent,
        DetailTaskComponent,
        AddList,
    },
    created() {
      this.Task.getLists();
    }
}
</script>
import { defineStore } from 'pinia'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBgZYJoUhN2if_IeCB-RQB2Hz_yV_ZCfV8",
  authDomain: "simple-todo-app-c5a3b.firebaseapp.com",
  projectId: "simple-todo-app-c5a3b",
  storageBucket: "simple-todo-app-c5a3b.appspot.com",
  messagingSenderId: "740962103721",
  appId: "1:740962103721:web:d847f722b57dc69d2894b8",
  measurementId: "G-J6X7HZLJ46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dayjs = require('dayjs');
export const useApp = defineStore({
    id: 'App',
    state: () => ({
    }),
    actions: {
    }
})

export const useTask = defineStore({
    id: 'Task',
    state: () => ({
        new_task: {
            title: "",
            list: "",
            steps: [],
            date_created: "",
            is_important: false,
            is_done: false,
        },
        tasks: [],
        detail_task: {
            show_task: false,
            data: {}
        }
    }),
    actions: {
        getAllTasks() {
        },
        async pushTask() {
            const push = await addDoc(collection(db, "todo-app"), {
                title: this.new_task.title,
                list: "",
                steps: [],
                date_created: dayjs().format(),
                is_important: false,
                is_done: false,
            });

            this.new_task.title = "";
            this.new_task.date_created = "";
        },
        async getAllTasks() {
            const snapshot = await onSnapshot(collection(db, "todo-app"), (datas) => {
                this.tasks = [];
                datas.forEach((data) => {
                    this.tasks.push({
                        id: data.id,
                        ...data.data()
                    });
                })
            })
        },

        async toggleTaskDone(id) {
            let task = this.tasks.find(task => task.id === id);
            await updateDoc(doc(db, "todo-app", id), {
                is_done: !task.is_done,
            })
        },
        async deleteAllTasks() {
            this.tasks.forEach((task) => {
                deleteDoc(doc(db, "todo-app", task.id));
            })
        },
        detailTask(id) {
            this.detail_task.show_task = true;
            this.detail_task.data = this.tasks.find(task => task.id === id);
        },
        closeDetailTask() {
            this.detail_task.show_task = false;
            this.detail_task.data = {};
        }
    }
})

export const useTime = defineStore({
    id: 'Time',
    state: () => ({
        date: "", 
    }),
    actions: {
        getDate() {
            this.date = dayjs().format("dddd, MMMM D");
        }
    }
})
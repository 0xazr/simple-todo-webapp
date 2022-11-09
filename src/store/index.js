import { defineStore } from 'pinia'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc, query, where, setDoc } from "firebase/firestore"; 

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
        new_list: {
            title: '',
        },
        lists: [],
        new_task: {
            title: "",
            list: "",
            steps: [],
            notes: "",
            date_created: "",
            is_important: false,
            is_done: false,
        },
        tasks: [],
        detail_task: {
            show_task: false,
            data: {}
        },
        step: "",
        steps: [],
        notes: "",
        search: "",
    }),
    actions: {
        // DONT DELETE THIS!! //
        // Needed for delete firestore document //
        async deleteCollection(db, collectionPath, batchSize) {
            const collectionRef = db.collection(collectionPath);
            const query = collectionRef.orderBy('__name__').limit(batchSize);
          
            return new Promise((resolve, reject) => {
              deleteQueryBatch(db, query, resolve).catch(reject);
            });
        },
        async deleteQueryBatch(db, query, resolve) {
            const snapshot = await query.get();
          
            const batchSize = snapshot.size;
            if (batchSize === 0) {
              // When there are no documents left, we are done
              resolve();
              return;
            }
          
            // Delete documents in a batch
            const batch = db.batch();
            snapshot.docs.forEach((doc) => {
              batch.delete(doc.ref);
            });
            await batch.commit();
          
            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
              deleteQueryBatch(db, query, resolve);
            });
        },
        // End //

        async pushTask(coll, id=null) {
            if(coll == "general-task") {
                if (id == "important-task") {
                    await addDoc(collection(db, coll), {
                        title: this.new_task.title,
                        list: "",
                        steps: [],
                        notes: "",
                        date_created: "",
                        is_important: true,
                        is_done: false,
                    });
                } else if (id == "my-day") {
                    await addDoc(collection(db, coll), {
                        title: this.new_task.title,
                        list: "",
                        steps: [],
                        notes: "",
                        date_created: dayjs().format("YYYY-MM-DD"),
                        is_important: false,
                        is_done: false,
                    });
                } else {
                    await addDoc(collection(db, coll), {
                        title: this.new_task.title,
                        list: "",
                        steps: [],
                        notes: "",
                        date_created: "",
                        is_important: false,
                        is_done: false,
                    });
                }
    
                this.new_task.title = "";
                this.new_task.date_created = "";
            } else {
                // console.log(id);
                let list = this.lists.find(list => list.id == id);
                
                list.tasks.push({
                    id: crypto.randomUUID(),
                    title: this.new_task.title,
                    steps: [],
                    notes: "",
                    date_created: dayjs().format("YYYY-MM-DD"),
                    is_important: false,
                    is_done: false,
                })
                updateDoc(doc(db, "custom-list", id), {
                    tasks: list.tasks
                });
                this.new_task.title = "";
                this.new_task.date_created = "";
            }
        },
        async newList() {
            let id = this.new_list.title.toLocaleLowerCase().replace(/ /g, "-");
            await setDoc(doc(db, "custom-list", id), {
                title: this.new_list.title,
                tasks: [],
            });
            this.new_list.title = "";
        },
        updateTaskTitle(id) {
            console.log('updateTaskTitle');
            if (this.tasks.find(task => task.id === id)) {
                updateDoc(doc(db, "general-task", id), {
                    title: this.detail_task.data.title,
                });
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let task = list.tasks.find(task => task.id === id);
                    task.title = this.detail_task.data.title;
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: list.tasks,
                    });
                });
            }
        },
        async updateStepTitle(id, index, step) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                task.steps[index].title = step;
                await updateDoc(doc(db, "general-task", id), {
                    steps: task.steps,
                });
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let tasks = list.tasks;
                    tasks.find(task => task.id === id).steps[index].title = step;
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: tasks
                    });
                });
            }
        },
        getLists() {
            onSnapshot(collection(db, "custom-list"), (querySnapshot) => {
                this.lists = [];
                querySnapshot.forEach((doc) => {
                    this.lists.push({id: doc.id, ...doc.data()});
                });
            });
        },
        getAllTasks() {
            onSnapshot(collection(db, "general-task"), (datas) => {
                this.tasks = [];
                datas.forEach((data) => {
                    this.tasks.push({
                        id: data.id,
                        ...data.data()
                    });
                })
            });
            this.closeDetailTask();
        },
        getImportantTasks() {
            const q = query(collection(db, "general-task"), where("is_important", "==", true));
            onSnapshot(q, (datas) => {
                this.tasks = [];
                datas.forEach((data) => {
                    this.tasks.push({
                        id: data.id,
                        ...data.data()
                    });
                })
            });
            this.closeDetailTask();
        },
        addStepTask(id, step) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                task.steps.push({
                    title: step,
                    is_done: false,
                });
                updateDoc(doc(db, "general-task", id), {
                    steps: task.steps,
                });
                this.step = "";
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let task = list.tasks.find(task => task.id === id);
                    task.steps.push({
                        title: step,
                        is_done: false,
                    });
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: list.tasks,
                    });
                    this.step = "";
                });
            }
        },
        async toggleTaskDone(id) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                await updateDoc(doc(db, "general-task", id), {
                    is_done: !task.is_done,
                });
                task.steps.forEach((step, index) => {
                    task.steps[index].is_done = !task.is_done;
                    updateDoc(doc(db, "general-task", id), {
                        steps: task.steps,
                    });
                })
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: list.tasks.map((task) => {
                            if(task.id == id) {
                                task.is_done = !task.is_done;
                                task.steps.forEach((step, index) => {
                                    task.steps[index].is_done = task.is_done;
                                })
                            }
                            return task;
                        })
                    });
                });
            }
        },
        async toggleTaskImportant(id) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                await updateDoc(doc(db, "general-task", id), {
                    is_important: !task.is_important,
                });
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: list.tasks.map((task) => {
                            if(task.id == id) {
                                task.is_important = !task.is_important;
                            }
                            return task;
                        })
                    });
                });
            }
        },
        async toggleStepDone(id, index) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                task.steps[index].is_done = !task.steps[index].is_done;
                await updateDoc(doc(db, "general-task", id), {
                    steps: task.steps,
                });
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let tasks = list.tasks;
                    tasks.find(task => task.id === id).steps[index].is_done = !tasks.find(task => task.id === id).steps[index].is_done;
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: tasks
                    });
                });
            }
        },
        async removeStep(id, index) {
            if (this.tasks.find(task => task.id === id)) {
                let task = this.tasks.find(task => task.id === id);
                task.steps.splice(index, 1);
                await updateDoc(doc(db, "general-task", id), {
                    steps: task.steps,
                });
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let tasks = list.tasks;
                    tasks.find(task => task.id === id).steps.splice(index, 1);
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: tasks
                    });
                });
                
            }
        },
        // async deleteAllTasks(coll = "general-task", list_id=null) {
        //     if (coll === "general-task") {
        //         this.tasks.forEach((task) => {
        //             deleteDoc(doc(db, "general-task", task.id));
        //         });
        //         this.closeDetailTask();
        //     } else {
        //         let list = this.lists.find(list => list.id === list_id);
        //         list.tasks.forEach((task) => {
        //             deleteDoc(doc(db, "custom-list", list_id));
        //         });
        //         this.closeDetailTask();
        //     }
        // },
        async deleteTask(id) {
            if (this.tasks.find(task => task.id === id)) {
                deleteDoc(doc(db, "general-task", id));
                this.detail_task.show_task = false;
                this.detail_task.data = {};
            } else {
                this.lists.filter(list => list.tasks.find(task => task.id === id)).forEach((list) => { 
                    let task_index = list.tasks.findIndex(task => task.id === id);
                    list.tasks.splice(task_index, 1);
                    console.log(list.tasks);
                    updateDoc(doc(db, "custom-list", list.id), {
                        tasks: list.tasks,
                    });
                    this.detail_task.show_task = false;
                    this.detail_task.data = {};
                });
            }
        },
        detailTask(coll, list_id, id) {
            console.log(coll, list_id, id);
            if (coll == "general-task") {
                this.detail_task.show_task = true;
                this.detail_task.data = this.tasks.find(task => task.id === id);
                console.log(this.detail_task.data);
            } else {
                let list = this.lists.find(list => list.id === list_id);
                this.detail_task.show_task = true;
                this.detail_task.data = list.tasks.find(task => task.id === id);
                console.log(this.detail_task.data);
            }
        },
        closeDetailTask() {
            this.detail_task.show_task = false;
            this.detail_task.data = {};
        },
        searchTask() {
            this.router.push("/search");
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
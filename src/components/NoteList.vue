<template>
    <div class="d-flex flex-column gap-3">
        <input type="search" name="" class="form-control rounded-5 bg-body-secondary px-4 py-2" placeholder="Search" id=""/>
        <button class="btn btn-secondary text-center p-2 rounded-5" @click="createNote">
            Create new 📝
        </button>
        <NoteListRow v-for="notes in allNotes" :notes="notes" @clickEvent="goTo" :key="notes.uuid" />
    </div>
</template>

<script setup>
    import {ref,computed,watch,onMounted} from 'vue';
    import NoteListRow from "./NoteListRow.vue";
    import {useRouter} from "vue-router";
    const router = useRouter();
    const allNotes = ref([]);
    const createNote = () => {
        const uuid = self.crypto.randomUUID();
        allNotes.value.push({uuid:uuid,title:"No name", date: new Date().toLocaleString()});
        router.push(`/${uuid}`)
    };

    const goTo = (uuid) => {
        if(!uuid) return;
        router.push(`/${uuid}`);
    }

    watch(allNotes,(newNotes)=>{
        window.localStorage.setItem("notes",JSON.stringify(newNotes))
    },{deep:true})

    const renderList = computed(()=>{
        return allNotes.value;
    });

    onMounted(()=>{
        const saved = window.localStorage.getItem("notes");
        if(saved) {
            allNotes.value = JSON.parse(saved);
        }
    })
</script>
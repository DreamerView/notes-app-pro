<template>
    <div class="container" style="max-width: 600px;width:100%" v-if="showNotes">
        <input type="text" name="" class="form-control bg-body shadow-sm px-4 py-2 rounded-4 mt-4" id="" v-model="title" />
        <textarea name="" id="" style="min-height: 300px;" class="form-control bg-body px-4 py-2 rounded-4 shadow-sm mt-4" v-model="desc"></textarea>
        <p class="m-0 mt-4 text-center text-secondary">Created at <b>{{ date }}</b></p>
        <button class="btn bg-body-secondary mt-4 w-50 rounded-4" @click="goHome">Go Home</button>
        <button class="btn btn-outline-danger border-0 mt-4 w-50 rounded-4" @click="deleteNote">Delete</button>
    </div>
    <div class="container" style="max-width: 600px;width:100%" v-else="showNotes">
        <h4 class="text-center m-0 mt-5">{{ alertNotes }}</h4>
        <button class="btn bg-body-secondary mt-4 w-100 rounded-4" @click="goHome">Go Home</button>
    </div>
</template>

<script setup>
    import {useRoute,useRouter} from "vue-router";
    import {onMounted,ref,watch} from "vue";
    const showNotes = ref(false);
    const alertNotes = ref("Loading");
    const title = ref("Loading");
    const date = ref("loading");
    const desc = ref("Loading");
    const route = useRoute();
    const router = useRouter();
    const uuid = route.params.uuid;
    const changeOnDatabase = (key,value) =>{
        const saved = localStorage.getItem("notes");
        if(!saved) return;
        const res = JSON.parse(saved);
        const search = res.find(f=>f.uuid===uuid);
        search[key] = value;
        localStorage.setItem("notes",JSON.stringify(res));
    }
    watch(title,(newTitle)=>{
        changeOnDatabase("title",newTitle);
    });
    watch(desc,(newDesc)=>{
        changeOnDatabase("desc",newDesc);
    });
    onMounted(()=>{

        const saved = localStorage.getItem("notes");
        if(!saved) {
            showNotes.value = false;
            alertNotes.value = "Notes are empty"; 
            return;
        }
        const res = JSON.parse(localStorage.getItem("notes"));
        const search = res.find(f=>f.uuid===uuid);
        if(!search) {
            showNotes.value = false;
            alertNotes.value = "Not found note"; 
            return;
        }
        showNotes.value = true;
        title.value=search.title;
        desc.value=search.desc;
        date.value=search.date;
    });
    const goHome = () => {
        router.push("/");
    }
    const deleteNote = () => {
        if(confirm("Do you really want to delete this note")===false) return;
        const saved = localStorage.getItem("notes");
        if(!saved) return;
        const res = JSON.parse(saved);
        const delThis = res.filter(f=>f.uuid!==uuid);
        localStorage.setItem("notes",JSON.stringify(delThis));
        router.push("/");
    }
</script>
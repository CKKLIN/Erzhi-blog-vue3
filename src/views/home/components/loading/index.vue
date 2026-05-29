<template>
    <div class="container">
        <div class="gif">
            <img class="img":src="loading6">
        </div>
        <div class="gif">
            <img class="img":src="loading2">
        </div>
        <div class="gif">
            <img class="img":src="loading3">
        </div>
        <div class="gif">
            <img class="img":src="loading4">
        </div>
        <div class="gif">
            <img class="img":src="loading5">
        </div>
        <div class="gif">
            <img class="img":src="loading1">
        </div>
    </div>
    </template>
    <script setup lang="ts">
    import loading1 from "@/assets/gif/loading1.gif"
    import loading2 from "@/assets/gif/loading2.gif"
    import loading3 from "@/assets/gif/loading3.gif"
    import loading4 from "@/assets/gif/loading4.gif"
    import loading5 from "@/assets/gif/loading5.gif"
    import loading6 from "@/assets/gif/loading6.gif"
</script>
<style scoped > 
.container{
    
    width:100%;
    height:200px;
    /* background-color:red; */
    display:flex;
    flex-direction:row;
    /* flex:1; */
}
.gif{
    flex: 1;
}
.img{
    width: 100%;
    object-fit: contain;
}
img{
    /* height:fit-content; */
    /* aspect-ratio:1/1; */
}
</style>
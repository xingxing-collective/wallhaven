<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
import { useLatest } from "@/composables/wallhaven";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";

const latest = ref<Array<any>>([]);

useTabBar(0);

onShow(async () => {
    const { data } = await useLatest();
    latest.value = data.data;
})

</script>
<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            {{ latest[0] }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    .content {
        display: flex;
        flex-direction: column;
    }
}
</style>
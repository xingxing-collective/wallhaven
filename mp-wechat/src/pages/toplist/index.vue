<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
useTabBar(0);
</script>
<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class=""></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    .content{
        display: flex;
        flex-direction: column;
    }
}
</style>
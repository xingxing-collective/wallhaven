<script setup lang="ts">
import { useTabBar } from "@/composables/useTabBar";
useTabBar(3);
</script>
<template>
    <div class="container">
        <div class="header"></div>
        <div class="content">
            <div class="avatar">
                <img class="avatar-img" src="/static/images/avatar.jpg">
            </div>
            <div class="nickname"><div>{{ '星星魔法术OvO' }}</div></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    $text-color:#FFFFFF;
    $text-color-gray:#333333;
    .content {
        padding-top: 5.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            .avatar-img {
                border-radius: 50%;
                border: 0.1rem solid #ffffff;
                object-fit: fill;
                background-size: cover;
                width: 6rem;
                height: 6rem;
            }
        }
        .nickname{
            color: $text-color;
            display: flex;
            justify-content: center;
            font-size: 2.25vh;
            font-weight: 600;
        }
    }
}
</style>
<template>
    <div class="header">
        <slot></slot>
    </div>
</template>
<style scoped lang="scss">
.header {
    width: 100%;
    height: 10.5%;
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 0.5rem;
}
</style>
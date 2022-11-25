<template>
    <div class="layout1-header">
        <div style="z-index: 99999">
            <slot name="left"/>
        </div>
        <div class="layout1-header-center">
            <img class="img" src="@/assets/layout/layout1/img/logo.png" alt="" style="width: 90px"/>
            {{ title }}
        </div>
        <div style="z-index: 99999">
            <slot name="right"/>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        require: true
    }
})
</script>
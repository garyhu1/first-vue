/**
* 多级组件的方法使用，可以通过$listeners传递下去
*/
<template>
    <div>
        <p>我是 mytabone-min-sub</p>
        <button v-on="$listeners">click</button>
    </div>
</template>

<script>

export default {
    name : 'MyTabOneMinSub',
    inheritAttrs: false,
}
</script>
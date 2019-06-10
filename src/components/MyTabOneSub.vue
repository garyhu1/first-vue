/**
* 多级组件的方法使用，可以通过$listeners传递下去
*/
<template>
    <div>
        <my-tab-one-min-sub v-on="$listeners"/>
    </div>
</template>

<script>
import MyTabOneMinSub from "./MyTabOneMinSub.vue"
export default {
    name : 'MyTabOneSub',
    inheritAttrs: false,
    components: {
        MyTabOneMinSub
    }
}
</script>
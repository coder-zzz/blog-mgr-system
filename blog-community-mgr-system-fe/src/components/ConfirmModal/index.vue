<template>
  <div>
    <!--  -->
    <a-modal :visible="props.show" @cancel="close" title="确认框" @ok="handleOk">
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props:{
      show:Boolean,
    },

  setup(props,context){

    const handleOk = () => {
      context.emit('logout');
    }

    const close = () => {
      context.emit('close');
    }

    return{
      props,
      handleOk,
      close,
    }
  }
})
</script>

<style lang="scss" scoped></style>

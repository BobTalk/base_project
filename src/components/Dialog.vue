/**
* @summary: 基于element二次封装
*/
<template>
  <el-dialog
    v-if="visible"
    class="hq-dialog"
    :title="title"
    :top="top"
    :fullscreen="fullscreen"
    :visible.sync="visible"
    :width="width"
    :style="styleObj"
    :modal="modal"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    @close="closeHandler"
  >
    <slot name="title" />
    <slot />
    <span slot="footer" class="dialog-footer">
      <slot name="footer" />
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    isBodyHeight: {
      type: Boolean,
      default: false
    },
    styleObj: {
      type: String,
      default: 'height: 100%'
    },
    //   弹窗提示框
    title: {
      type: String,
      default: ''
    },
    //   是否需要遮罩
    modal: {
      type: Boolean,
      default: true
    },
    //   控制弹窗显示隐藏
    value: {
      type: Boolean,
      default: false
    },
    //   弹窗显示宽度
    width: {
      type: String,
      default: '50%'
    },
    //   是否全屏
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 弹窗距离浏览器顶部高度
    top: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    value: {
      handler: function(newVal) {
        this.visible = newVal
      }
    },
    map: {
      handler: function() {
        this.closeHandler()
      }
    },
    toggle: {
      handler: function(newVal) {
        if (!newVal) {
          this.closeHandler()
        }
      }
    },
    immediate: true
  },
  methods: {
    closeHandler() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.hq-dialog{
    >>>.el-dialog{
        margin: 0 auto 0;
        top: 50%;
        transform: translateY(-50%);
        // max-height: 50vh;
    }
    >>>.el-dialog__title{
        font-size: 14px;
    }
    >>>.el-dialog__header{
        position: relative;
        height: 50px;
        padding: 10px 20px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        .el-dialog__headerbtn{
            top: 50%;
            transform: translateY(-50%);
        }
    }
    >>>.el-dialog__body{
        // max-height: calc(50vh - 110px);
        // height: calc(50vh - 110px);
        overflow: hidden;
        padding: 0 20px;
        box-sizing:border-box;
    }
    >>>.el-dialog__footer{
        padding: 0;
        .el-button--primary{
            background-color: rgb(28, 105, 212);
        }
    }
}
</style>

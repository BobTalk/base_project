/** * @summary: 按钮集合 */
<template>
  <div class="button-list">
    <slot name="btn">
      <template v-if="buttonList.length <=3">
        <el-button v-for="(item, key) in buttonList" :key="_uid+''+key" :icon="item.icon" :style="{background: item.bg||'', color:item.color||''}" @click="()=>{item.complyFn && item.complyFn(currenData)}">{{ item.label }}</el-button>
      </template>
      <template v-else>
        <template v-for="(item, key) in buttonList">
          <el-button v-if="key < 2" :key="_uid+''+key" :icon="item.icon" :style="{background: item.bg||'', color:item.color||''}" @click="()=>{item.complyFn && item.complyFn(currenData)}">{{ item.label }}</el-button>
        </template>
        <el-dropdown class="btn-drop">
          <el-button type="primary">
            更多<em class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item, key) in buttonList">
              <el-dropdown-item v-if="key > 1" :key="_uid+''+key">
                <p @click="()=>{item.complyFn && item.complyFn(currenData)}">{{ item.label }}</p>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>

      </template>
    </slot>
  </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        currenData: {
            type: Object,
            default: () => {}
        },
        buttonList: {
            type: Array,
            default: () => []
        }
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
  .button-list {
    >>>.el-button{
      font-size: 12px;
    }
    >>>.el-button--primary{
      span{
        font-size: 12px;
      }
    }
  }
</style>

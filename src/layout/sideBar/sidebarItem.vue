<template>
  	<div class="menu-wrapper">
    	<template v-for="item in routes" v-if="!item.hidden && item.children">
      		<router-link
          		v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow"
          		:to="item.children[0].path"
          		:key="item.children[0].name">
          		<el-menu-item :index="item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
              		<span v-if="item.children[0].meta && item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
          		</el-menu-item>
      		</router-link>

      		<el-submenu v-else :index="item.name || item.path" :key="item.name">
          		<template slot="title">
            		<span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
        		</template>
        		<template v-for="child in item.children" v-if="!child.hidden">
          			<sidebar-item
            			:is-nest="true"
            			class="nest-menu"
            			v-if="child.children && child.children.length > 0"
            			:routes="[child]"
            			:key="child.path">
					</sidebar-item>
          			<router-link v-else :to="child.path" :key="child.name">
            			<el-menu-item :index="child.path">
              				<span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
            			</el-menu-item>
          			</router-link>
        		</template>
      		</el-submenu>
    	</template>
  	</div>
</template>
<script>
export default {
  name: 'sidebarItem',
  props: {
    routes: { type: Array },
    isNest: {
    	type: Boolean,
    	default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.nest-menu .el-submenu > .el-submenu__title,.el-submenu .el-menu-item {min-width: 180px !important;background-color: #1f2d3d !important;}
.nest-menu .el-submenu > .el-submenu__title,.el-submenu .el-menu-item :hover {background-color: #001528 !important;}
.el-menu--collapse .el-menu .el-submenu {min-width: 180px !important;}
</style>
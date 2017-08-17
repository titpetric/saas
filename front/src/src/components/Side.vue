<template>
	<nav>
		<a class="logo" href="/">
			<i class="mdi mdi-arrow-right-bold-hexagon-outline logo-icon"></i><span class="large-text">{{ options.title_short }}</span>
		</a>

		<icon name="bars" scale="2" class="toggle-btn" data-toggle="collapse" data-target="#menu-content"></icon>

		<div class="menu-list">

			<ul id="menu-content" class="menu-content collapse out">

				<router-link v-for="(item,index) in menu" :to="item.link" tag="li" :ref="item.title">
					<a :class="item.class">
						<i v-if="item.icon" :class="'mdi mdi-' + item.icon"></i>
						<span>{{item.title}}</span>
					</a>
				</router-link>

			</ul>
		</div>
	</nav>
</template>

<script>
import menu from '@/api/menu.json'
import config from '@/api/config.json'

export default {
  data () {
    return {
      options: config.options,
      menu: menu['back']['side']
    }
  }
}
</script>

<style lang="scss" scoped>
a.logo {
	padding: 12px;
	line-height: 1.0;
	&:hover {
		text-decoration: none;
	}
	.mdi {
		color: #c44;
		font-size: 2.5em;
	}
	.large-text {
		color: #c44;
		font-size: 1.5em;
		vertical-align: .28em;
	}
}


nav {
  overflow: auto;
  font-family: verdana;
  font-size: 12px;
  font-weight: 200;
  background-color: #2e353d;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
}
nav .toggle-btn {
  display: none;
}
nav ul,
nav li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;
}
nav ul :not(collapsed) .arrow,
nav li :not(collapsed) .arrow {
  display: inline-block;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
  float: right;
}
nav ul .active,
nav li .active {
  background-color: #4f5b69;
}
nav li {
  padding: 12px;
  border-bottom: 1px solid #733;
}
nav li a {
  text-decoration: none;
  color: #e1ffff;
}
nav li a i {
  padding-right: 0.2em;
}
nav li:hover {
  background-color: #4f5b69;
  transition: all 1s ease;
}
@media (max-width: 767px) {
  nav {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
  }
  nav .toggle-btn {
    display: block;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10 !important;
    padding: 3px;
    background-color: #ffffff;
    color: #000;
    width: 40px;
    text-align: center;
  }
}
@media (min-width: 767px) {
  nav .menu-list .menu-content {
    display: block;
  }
}
</style>

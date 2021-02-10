<template>
  <div>
    <div v-for="(item,index) in userList" :key="index" class="list" @click="toHomePage(item.userId)">
        <img :src="item.imagePath">
        <div>{{item.userName}}</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      userList: []
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      req('getFansList', {userId: this.userId}).then(data => {
        this.userList = data.data.data
      })
    },
    toHomePage (item) {
        sessionStorage.setItem('homeUserId',item)
        this.$router.push({path:'home-page'})
    }
  }
}
</script>

<style lang="scss">
.list{
    display: flex;
    margin-left: 30px;
    margin-top: 20px;
    img{
        width: 50px;
        height: 50px;
    }
    div{
        flex: 1;
    }
}
</style>

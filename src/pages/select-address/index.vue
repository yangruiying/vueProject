<template>
  <div>
    <!-- <div class="stap">
      <el-steps :space="1000" :active="0" finish-status="success" align-center>
        <el-step title="选择地址"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="等待收货"></el-step>
      </el-steps>
    </div> -->
    <van-nav-bar
      title="提交订单"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="publish()"
    />
    <div class="goodsInfo">
      <img :src="indexPath" />
      <span>{{ title }}</span>
      <h3>￥{{ price }}</h3>
    </div>
    <h3>选择地址</h3>
    <van-address-list
      v-model="formData.addressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="toAddAddress"
      @edit="onEdit"
    />
    <el-select v-model="formData.addressId" class="selectAddress">
      <el-option
        v-for="(item, index) in addressList"
        :key="index"
        :label="
          item.name +
          ' ' +
          item.phone +
          ' ' +
          item.privinceName +
          item.cityName +
          item.regionName +
          item.detailAddress
        "
        :value="item.addressId"
      >
      </el-option>
    </el-select>
    <button @click="toAddAddress">新增地址</button>
    <button @click="addOrder">提交订单</button>
  </div>
</template>

<script>
import req from "@/api/address.js";
import req2 from "@/api/order.js";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      userId: sessionStorage.getItem("userId"),
      addressList: [],
      info: "",
      indexPath: JSON.parse(sessionStorage.getItem("goodsDetail")).indexPath,
      title: JSON.parse(sessionStorage.getItem("goodsDetail")).title,
      price: JSON.parse(sessionStorage.getItem("goodsDetail")).price,
      ToUser: JSON.parse(sessionStorage.getItem("goodsDetail")).userId,
      websocket: null,
      formData: {
        goodsId: JSON.parse(sessionStorage.getItem("goodsDetail")).goodsId,
        buyer: sessionStorage.getItem("userId"),
        addressId: "",
      },
      formData2: {
        user1: sessionStorage.getItem("userId"),
        user2: JSON.parse(sessionStorage.getItem("goodsDetail")).userId,
        goodsId: JSON.parse(sessionStorage.getItem("goodsDetail")).goodsId,
        msg: "我已购买，请尽快发货",
      },
    };
  },
  mounted() {
    this.getUserAddress();
    this.conectWebSocket();
  },
  methods: {
    onEdit(item, index) {
      console.log(JSON.stringify(item))
      this.$router.push({path:"/edit-address",query:{addressId:item.id,name:item.name,phone:item.tel,privinceId:item.privinceId,
      cityId:item.cityId,regionId:item.regionId,detailAddress:item.detailAddress}})
    },
    back() {
      window.location.href = document.referrer;
      window.history.back(-1);
    },
    toAddAddress() {
      this.$router.push({ path: "/add-address" });
    },
    getUserAddress() {
      req("userAddress", { userId: this.userId }).then((data) => {
        this.addressList = data.data.data;
        console.log(JSON.stringify(this.addressList))
        this.list = this.addressList.map((item, index) => {
          if (index == 0) {
            this.chosenAddressId = item.addressId
            return {
              id: item.addressId,
              name: item.name,
              tel: item.phone,
              address:
                item.privinceName +
                item.cityName +
                item.regionName +
                item.detailAddress,
              isDefault: true,
              privinceId:item.privinceId,
              cityId:item.cityId,
              regionId:item.regionId,
              detailAddress:item.detailAddress
              
            };
          } else {
            return {
              id: item.addressId,
              name: item.name,
              tel: item.phone,
              address:
                item.privinceName +
                item.cityName +
                item.regionName +
                item.detailAddress,
                privinceId:item.privinceId,
                cityId:item.cityId,
                regionId:item.regionId,
                detailAddress:item.detailAddress
            };
          }
        });
      });
    },
    addOrder() {
      req2("addOrder", { ...this.formData }).then((data) => {
        this.send();
        this.$router.push({ path: "/chat" });
      });
    },
    sentOrderInfo() {},
    // 发送消息
    send() {
      // var toUser = document.getElementById('toUser').value
      var socketMsg = { msg: "我已购买，请尽快发货", toUser: this.ToUser };
      // alert(this.ToUser)
      if (this.toUser === "") {
        // 群聊
        socketMsg.type = 1;
      } else {
        // 单聊.
        socketMsg.type = 1;
      }
      req("addChat", { ...this.formData2 }).then((data) => {
        // this.nickname = data.data.data
        this.websocket.send(JSON.stringify(socketMsg));
      });
    },
    conectWebSocket() {
      var sel = this;
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          "ws://localhost:8080/websocket/" +
            sel.userId +
            "/" +
            sel.formData.goodsId
        );
      } else {
        alert("Not support websocket");
      }
      // 连接发生错误的回调方法
      this.websocket.onerror = function () {
        sel.setMessageInnerHTML("error");
      };
      // 连接成功建立的回调方法
      this.websocket.onopen = function (event) {
        sel.setMessageInnerHTML("Loc MSG: 成功建立连接");
      };
      // 接收到消息的回调方法
      this.websocket.onmessage = function (event) {
        sel.setRead();
        setTimeout(() => {
          sel.ini();
        }, 500);
        sel.test = event.data;
        sel.setMessageInnerHTML(event.data);
      };
      // 连接关闭的回调方法
      this.websocket.onclose = function () {
        sel.setMessageInnerHTML("Loc MSG:关闭连接");
      };
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        this.websocket.close();
      };
    },
    setMessageInnerHTML() {},
  },
};
</script>

<style lang="scss" scoped>
.stap {
  text-align: left;
  width: 100%;
  margin: 0 auto;

  .el-steps {
  }
}
.el-select {
  width: 100%;
}
.goodsInfo {
  width: 100%;
  height: 100px;
  padding-right: 30px;
  img {
    float: left;
    width: 60px;
    height: 60px;
    margin-left: 20px;
  }
  span {
    float: left;
    margin-left: 20px;
  }
  h3 {
    width: 50px;
    margin-left: auto;
    color: red;
  }
}
</style>

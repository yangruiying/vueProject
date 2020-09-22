<template>
  <div>
    <form action name="fileinfo">
      <div class="img_box">
        <div
          class="img_size"
          v-for="(item,index) of imgList"
          :key="index"
          v-show="imgList.length!=0"
        >
          <img v-if="item.file.type.indexOf('image') !== -1" :src="item.file.src">
          <div class="remove_logo" @click="fileDel">×</div>
        </div>
        <div class="add_img" @click="fileClick" v-show="addState">
          <span>十</span>
        </div>
        <div @click="uploadImage">
            tijiao
        </div>
        <div style="width:100px">{{imgList}}</div>
        <input
          id="inpu"
          name="files"
          style="display: none;"
          @change="fileChange($event)"
          type="file"
          ref="file"
          accept="image/*"
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [],
      addState: true
    }
  },
  watch: {
    imgList () {
      if (this.imgList.length === 9) {
        this.addState = false
      } else {
        this.addState = true
      }
    }
  },
  methods: {
    fileClick () {
      document.getElementById('inpu').click()
    },
    fileChange (el) {
    //   const list = this.$refs.file.files
      if (!el.target.files[0].size) return
      this.fileList(el.target)
      el.target.value = ''
    },
    fileList (fileList) {
      let files = fileList.files
      for (let i = 0; i < files.length; i++) {
        // 判断是否为文件夹
        if (files[i].type !== '') {
          this.fileAdd(files[i])
        } else {
          // 文件夹处理
          this.folders(fileList.items[i])
        }
      }
    },
    // 文件夹处理
    folders (files) {
      let _this = this
      // 判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry()
      }
      files.createReader().readEntries(function (file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i])
          } else {
            _this.folders(file[i])
          }
        }
      })
    },
    foldersAdd (entry) {
      let _this = this
      entry.file(function (file) {
        _this.fileAdd(file)
      })
    },
    fileAdd (file) {
      // 总大小
      this.size = this.size + file.size
      let reader = new FileReader()
      reader.vue = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        file.src = this.result
        this.vue.imgList.push({
          file
        })
      }
    },
    fileDel (index) {
      this.imgList.splice(index, 1)
    },
    bytesToSize (bytes) {
      if (bytes === 0) return '0 B'
      let k = 1000 // or 1024
      let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + '' + sizes[i]
    },
    uploadImage: function () {
      var form = document.forms.namedItem('fileinfo')
      var formData = new FormData(form)
      for (var i = 0; i < this.imgList.length; i++) {
        formData.append('file' + [i + 1], this.imgList[i].file)
        console.log(this.imgList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img_box {
  width: 100%;
  padding: 0 2%;
  display: flex;
  flex-wrap: wrap;
  .img_size {
    position: relative;
    width: 1.8rem;
    height: 1.65rem;
    padding: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .remove_logo {
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      background: red;
      border-radius: 25px;
      top: 5px;
      right: 5px;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.5rem;
      color: #777777;
    }
  }
  .add_img {
    width: 1.3rem;
    height: 1.3rem;
    margin-top: 5px;
    text-align: center;
    line-height: 1.3rem;
    font-size: 30px;
    color: #777777;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
}
</style>

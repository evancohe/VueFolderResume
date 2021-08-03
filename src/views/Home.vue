<template>
  <div class="container">
    <!-- Container Area -->
    <div class="area" :style="adjustSize">
      <!-- NavBar Area -->
      <div class="navBar" @dblclick="maxHome">
        <div class="path">
          <div class="backBtn" v-if="!isMin" @click="goHome">&lt;</div>
          <!-- Url Path Area -->
          <input class="url" v-if="!isMin" type="text" :value="currentUrl" />
          <div
            class="plusBtn"
            v-if="!isFolderSelecting && !isMin"
            @click="addFolder"
          >
            +
          </div>
        </div>
        <!-- Control Area -->
        <div class="controlBtn">
          <div class="btn min" @click="minHome"></div>
          <div class="btn max" @click="maxHome"></div>
          <div class="btn close" @click="closeHome"></div>
        </div>
      </div>

      <div
        v-if="!isFolderSelecting && !isMin"
        :class="handleFolderStyle"
        @click.left="leftClicked()"
      >
        <div
          class="folder-layout"
          v-for="(folder, index) in folderArr"
          :key="index"
        >
          <div
            class="folder-cell"
            @click="selectFolder(folder)"
            @click.left="leftClicked"
            @contextmenu.prevent="rightClicked(index)"
            @touchstart="touchStart(index)"
            @touchend="touchEnd"
          >
            <Folder
              class="folder-item"
              :viewStyle="viewStyle"
              :folderName="folder.name"
            />
            <div class="rightMenu" v-if="folder.edit" :style="menuStyle">
              <div class="rightMenuLayout">
                <div
                  class="rightMenuItem delete"
                  @click="deleteFolder(index, $event)"
                >
                  Delete
                </div>
                <div
                  class="rightMenuItem rename"
                  @click="renameFolder(index, $event)"
                >
                  Rename
                </div>
              </div>
            </div>
          </div>

          <input
            class="folder-input"
            ref="myInput"
            type="text"
            v-if="folderArr[index].name == ''"
            v-focus
            @blur="blur"
          />
        </div>
      </div>

      <Content
        v-if="isFolderSelecting && currentFolder != '' && !isMin"
        :contentType="currentFolder"
      >
      </Content>

      <!-- Footer Area -->
      <div class="footer" v-if="!isFolderSelecting && !isMin">
        <div class="footer-count">{{ folderArr.length }} items</div>
        <div class="footer-type">
          <div class="typeBtn list" @click="switchType('list')"></div>
          <div class="typeBtn folder" @click="switchType('folder')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Folder from "@/components/Folder.vue";
import Content from "@/components/Content";

export default {
  name: "Home",
  components: {
    Folder,
    Content,
  },
  data() {
    return {
      currentUrl: "evanH:\\",
      folderArr: [
        { id: 0, name: "About", edit: false },
        { id: 1, name: "Projects", edit: false },
        { id: 2, name: "Exp", edit: false },
        { id: 3, name: "Blog", edit: false },
      ],
      isFolderSelecting: false,
      isMin: false,
      isMax: false,
      isPhone: false,
      top: "15%",
      width: "95%",
      minHeight: "70%",
      maxHeight: "70%",
      opacity: "1",
      menuStyle: "visibility: 0;",
      currentFolder: "",
      viewStyle: "folder",
      beforeRenameVal: "",
      lastIndex: -1,
      editIndex: -1,
      longPressTimer: "",
    };
  },
  mounted() {
    this.isMobile();
  },
  computed: {
    adjustSize() {
      return `top: ${this.top}; width: ${this.width}; min-height: ${this.minHeight}; max-height: ${this.maxHeight}; opacity: ${this.opacity}`;
    },
    handleFolderStyle() {
      return this.viewStyle == "folder" ? "folder-list" : "folder-list-l";
    },
  },
  methods: {
    selectFolder(folder) {
      setTimeout(() => {
        this.currentUrl = "evanH:\\";
        this.currentUrl += folder.name;
        this.currentFolder = folder.name;
        this.isFolderSelecting = true;
      }, 200);
    },
    deleteFolder(index, e) {
      e.stopPropagation();
      this.leftClicked();
      this.folderArr.splice(index, 1);
      this.lastIndex = -1;
    },
    renameFolder(index, e) {
      e.stopPropagation();
      this.leftClicked();
      this.beforeRenameVal = this.folderArr[index].name;
      this.folderArr[index].name = "";
      this.lastIndex = -1;
      this.editIndex = index;
    },
    switchType(type) {
      this.viewStyle = type;
    },
    goHome() {
      this.currentUrl = "evanH:\\";
      this.isFolderSelecting = false;
    },
    addFolder() {
      let obj = { id: this.folderArr.length - 1, name: "", edit: false };
      this.folderArr.push(obj);
    },
    blur(e) {
      if (e.target.value != "") {
        this.editIndex != -1
          ? (this.folderArr[this.editIndex].name = e.target.value)
          : (this.folderArr[this.folderArr.length - 1].name = e.target.value);
      } else {
        this.editIndex != -1
          ? (this.folderArr[this.editIndex].name = this.beforeRenameVal)
          : (this.folderArr[this.folderArr.length - 1].name = "untitled");
      }
      this.editIndex = -1;
    },
    leftClicked() {
      this.lastIndex != -1
        ? (this.folderArr[this.lastIndex].edit = false)
        : null;
    },
    rightClicked(index) {
      console.log(this.folderArr);
      this.lastIndex != -1
        ? (this.folderArr[this.lastIndex].edit = false)
        : null;

      this.menuStyle = "visibility: 1;";
      this.lastIndex = index;
      this.folderArr[index].edit = true;
    },
    resetSize() {
      this.configSize("15%", "95%", "70%", false, false);
      this.maxHeight = "70vh";
    },
    minHome() {
      this.configSize("90%", "30vw", "1vh", true, false);
      this.opacity = "0";
      setTimeout(() => {
        this.$emit("minHome");
      }, 520);
    },
    maxHome() {
      this.isPhone
        ? this.configSize("5%", "95%", "75vh", false)
        : this.configSize("3%", "95%", "90vh", false);
      this.isMax = !this.isMax;
      this.isMax ? "" : this.resetSize();
    },
    closeHome() {
      this.isMin = false;
      this.isMax = false;
      this.$emit("closeHome");
    },
    configSize(top, width, minHeight, min, max) {
      this.top = top;
      this.width = width;
      this.minHeight = minHeight;
      min != null ? (this.isMin = min) : "";
      max != null ? (this.isMax = max) : "";
    },
    isMobile() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        console.log("isPhone");
        this.isPhone = true;
      } else {
        console.log("isWeb");
        this.isPhone = false;
      }
    },
    touchStart(index) {
      clearTimeout(this.longPressTimer); //再次清空定时器，防止重复注册定时器
      this.longPressTimer = setTimeout(() => {
        this.rightClicked(index);
      }, 400);
    },
    touchEnd() {
      clearTimeout(this.longPressTimer);
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.area {
  position: absolute;
  margin: 0 auto;
  border: 2px solid #2c2c2c;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 0px #2c2c2c;
  // background-clip: content-box;
  transition: all 0.5s;
  overflow: hidden;
  .navBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #2c2c2c;
    background-color: #fff;
    // flex: 0.1;
    .path {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      margin: 5px;
      .url {
        width: 60%;
        height: 60%;
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        margin: 6px;
        padding-left: 6px;
        color: #2c2c2c;
        border: 2px solid #2c2c2c;
        border-radius: 12px;
        box-shadow: 2px 1px 0px #2c2c2c;
      }
      .backBtn {
        margin: 5px;
        padding: 5px;
        width: 10px;
        height: 10px;
        transition: all 0.3s;
        cursor: default;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
        font-weight: bold;
        &:hover {
          background-color: #e2e2e2;
        }
        &:active {
          padding-left: 1px;
        }
      }
      .plusBtn {
        margin: 5px;
        padding: 5px;
        width: 10px;
        height: 10px;
        transition: all 0.3s;
        cursor: default;

        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        &:hover {
          background-color: #e2e2e2;
        }
        &:active {
          padding: 4px;
        }
      }
    }
    .controlBtn {
      display: flex;
      align-items: center;
      .btn {
        margin: 1px 6px 1px 1px;
        width: 15px;
        height: 15px;
        padding: 0px;
        transition: all 0.3s;
        cursor: default;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 20px;
        // font-weight: bold;
        // background-color: #757575;
        border: 2px solid #2c2c2c;
        border-radius: 50px;
      }
      .btn.min {
        background-color: #e2e2e2;
        &:hover {
          box-shadow: 1px 2px 0px #aaaaaa;
          background-color: #aaaaaa;
        }
      }
      .btn.max {
        background-color: #aaaaaa;
        &:hover {
          box-shadow: 1px 2px 0px #818181;
          background-color: #818181;
        }
      }
      .btn.close {
        background-color: #ffa2a2;
        &:hover {
          box-shadow: 1px 2px 0px #ff7474;
          background-color: #ff7474;
        }
      }
    }
  }

  .folder-cell {
    position: relative;
  }
  .rightMenu {
    position: absolute;
    top: 50%;
    left: 90%;
    background-color: #fff;
    z-index: 999;
    border: 1px solid #757575;
    border-radius: 3px;
    font-size: 12px;
    // padding: 3px;
    // box-shadow: 2px 2px 3px #757575;
    overflow: hidden;
    transition: all 0.2s;

    .rightMenuLayout {
      .rightMenuItem {
        padding: 3px;

        &.delete {
          &:hover {
            background-color: #ff7474;
            color: #fff;
          }
        }

        &.rename {
          &:hover {
            background-color: #757575;
            color: #fff;
          }
        }
      }
    }
  }
  .folder-list {
    // position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
    flex: 8;
    padding: 5px;
    background-color: #fff;
    // transition: all 0.3s;
    .folder-item {
      // background-color: #fff;
      transition: all 0.3s;
      &:hover {
        cursor: pointer;
        background-color: #eeeeee;
        border-radius: 10px;
      }
    }
    .folder-input {
      width: 60px;
    }

    &::-webkit-scrollbar {
      width: 6px;
      transition: all 0.2s;
      // background-color: #000;
    }
    &:hover::-webkit-scrollbar-thumb:hover {
      background-color: #c0cecc;
    }

    &:hover::-webkit-scrollbar-thumb:vertical {
      background-color: #b9b9b9;
      border-radius: 6px;
      outline: 2px solid #fff;
      outline-offset: -2px;
      border: 2px solid #fff;
    }
  }
  .folder-list-l {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 90vh;
    overflow-y: hidden;
    overflow-x: scroll;
    flex: 8;
    padding: 5px;
    background-color: #fff;
    .folder-layout {
      display: flex;
      align-items: center;
      transition: all 0.15s;
      &:hover {
        cursor: default;
        background-color: #e6e6e6;
        border-radius: 10px;
      }
      .folder-item {
        transition: all 0.3s;
      }
      .folder-input {
        width: 100px;
        height: 50%;
      }
    }
    &::-webkit-scrollbar {
      height: 6px;
      transition: all 0.2s;
      // background-color: #000;
    }
    &:hover::-webkit-scrollbar-thumb:hover {
      background-color: #c0cecc;
    }

    &:hover::-webkit-scrollbar-thumb:horizontal {
      background-color: #b9b9b9;
      border-radius: 6px;
      outline: 2px solid #fff;
      outline-offset: -2px;
      border: 2px solid #fff;
    }
  }
  .footer {
    border-top: 2px solid #2c2c2c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    background-color: #fff;
    // flex: 0.1;
    .footer-count {
      padding-left: 10px;
      font-size: 14px;
      cursor: default;
    }
    .footer-type {
      display: flex;
      justify-content: center;
      align-items: center;
      .typeBtn.list {
        margin: 6px;
        border: 2px solid #2c2c2c;
        border-radius: 5px;
        width: 14px;
        height: 20px;
        // background-color: #629caa;
        &:hover {
          box-shadow: 2px 2px 0px #d8d8d8;
          background-color: #d8d8d8;
        }
      }
      .typeBtn.folder {
        margin: 6px;
        border: 2px solid #2c2c2c;
        border-radius: 5px;
        width: 14px;
        height: 14px;
        // background-color: #3a636d;
        &:hover {
          box-shadow: 2px 2px 0px #d8d8d8;
          background-color: #d8d8d8;
        }
      }
    }
  }
}
</style>
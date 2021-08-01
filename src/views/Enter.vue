<template>
  <div class="container">
    <!-- <div @click="enterFolder"> -->
    <vue-draggable-resizable
      class="draggable-folder"
      :w="w"
      :h="h"
      :resizable="false"
      @dragstop="onDragging"
    >
      <div @click="enterFolder">
        <Folder
          class="mainFolder"
          ref="folder"
          v-if="isDisplay"
          :folderName="enterName"
        ></Folder>
      </div>
    </vue-draggable-resizable>
    <Home v-if="!isDisplay" @minHome="minHome" @closeHome="closeHome" />

    <div class="footer">
      <div class="windowStart" :style="{ flex: !isClose ? '8' : '0.15' }">
        <div class="start" ref="startWindow" @click="onStart">START</div>
        <div
          class="startWindow"
          :style="{ width: startWindowWidth, top: startTop }"
        ></div>
        <div
          v-if="!isClose"
          class="minWindow"
          @mouseenter="hoverTime('showPreview')"
          @mouseleave="hoverTime('hidePreviewDelay')"
        >
          <div
            class="winText"
            ref="windowText"
            :style="handleColor"
            @click="reOpen"
          >
            D:\evancohe\...
          </div>
          <div
            class="winPreview"
            v-if="isDisplayPreview"
            @mouseleave="hoverTime('hidePreview')"
            @click="reOpen"
          >
            <div class="preview-header" :style="{ width: windowWidth }">
              <div class="closeBtn" @click="closeHome($event)"></div>
            </div>
            <div class="preview-body"></div>
            <div class="preview-body"></div>
            <div class="preview-body"></div>
            <div class="preview-body"></div>
            <div class="preview-body"></div>
          </div>
        </div>
      </div>

      <div class="clock">
        <div
          class="clock-time"
          @mouseenter="hoverTime('showDate')"
          @mouseleave="hoverTime('hideDate')"
        >
          {{ time }}
        </div>
        <div class="clock-date" v-if="isDisplayDate">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Folder from "@/components/Folder";
import Home from "@/views/Home";

export default {
  components: {
    Folder,
    Home,
  },
  data() {
    return {
      isDisplay: true,
      enterName: "Evancohe",
      time: "",
      date: "",
      isDisplayPreview: false,
      isDisplayDate: false,
      isClose: true,
      hoverTimer: "",
      windowWidth: "",
      startWindowWidth: "",
      w: 1,
      h: 1,
      left: 0,
      top: 0,
      isDragged: false,
      isStart: false,
      startTop: '-2px',
    };
  },
  mounted() {
    this.getTime();
    this.w = this.$refs.folder.$el.offsetWidth;
    this.h = this.$refs.folder.$el.offsetHeight;
    this.startWindowWidth = this.$refs.startWindow.offsetWidth * 1.5 + "px";
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  computed: {
    handleColor() {
      return this.isDisplay
        ? "background-color: #fff"
        : "background-color: #eeeeee;";
    },
  },
  watch: {
    isDisplay() {
      // this.windowWidth = this.$refs.windowText.$el.offsetWidth       ;
      setTimeout(() => {
        try {
          this.windowWidth = this.$refs.windowText.offsetWidth + "px";
        } catch (error) {
          console.log(error);
        }
      }, 200);
    },
  },
  methods: {
    onStart() {
      this.isStart = !this.isStart;
      this.isStart ? this.startTop = '-130px' : this.startTop ='-2px'
    },
    onDragging(left, top) {
      this.left = left;
      this.top = top;
      console.log("dragged");
      this.isDragged = true;
    },
    enterFolder() {
      console.log("before", this.isDragged);
      this.isDragged
        ? (this.isDragged = false)
        : setTimeout(() => {
            this.isClose = false;
            this.isDisplay = false;
            this.isDragged = false;
          }, 220);
    },
    minHome() {
      this.isClose = false;
      this.isDisplay = true;
    },
    reOpen() {
      this.isClose = false;
      this.isDisplay = !this.isDisplay;
    },
    closeHome(event) {
      event ? event.stopPropagation() : "";
      this.isDisplayPreview ? (this.isDisplayPreview = false) : "";
      this.isDisplay = true;
      this.isClose = true;
      this.enterName = "Peace!";
      setTimeout(() => {
        this.enterName = "Evancohe";
      }, 2000);
    },
    getTime() {
      let that = this;
      this.timer = setInterval(() => {
        let currentDate = new Date();
        let hours, minutes, seconds;
        currentDate.getHours() < 10
          ? (hours = "0" + currentDate.getHours())
          : (hours = currentDate.getHours());
        currentDate.getMinutes() < 10
          ? (minutes = "0" + currentDate.getMinutes())
          : (minutes = currentDate.getMinutes());
        currentDate.getSeconds() < 10
          ? (seconds = "0" + currentDate.getSeconds())
          : (seconds = currentDate.getSeconds());
        that.time = `${hours}:${minutes}:${seconds}`;
        that.date = `${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}-${currentDate.getFullYear()}: D${currentDate.getDay()}`;
      }, 1000);
    },
    hoverTime(val) {
      if (this.hoverTimer) {
        clearInterval(this.hoverTimer); // 在Vue实例销毁前，清除我们的定时器
      }

      switch (val) {
        case "showDate":
          this.hoverTimer = setInterval(() => {
            this.isDisplayDate = true;
          }, 500);
          break;
        case "hideDate":
          this.isDisplayDate = false;
          break;
        case "showPreview":
          this.isDisplayPreview = true;
          break;
        case "hidePreview":
          this.hoverTimer = setInterval(() => {
            this.isDisplayPreview = false;
          }, 100);
          break;
        case "hidePreviewDelay":
          this.hoverTimer = setInterval(() => {
            this.isDisplayPreview = false;
          }, 300);

          break;
        default:
          break;
      }
      // if (val) {
      //   setTimeout(() => {
      //     this.isDisplayDate = val;
      //   }, 500);
      // } else {
      //   this.isDisplayDate = val;
      // }
    },
  },
};
</script>
<style lang='scss' scoped>
.container {
  .draggable-folder {
    position: absolute;
    top: 40%;
    left: 43%;
    border: none;
    .mainFolder {
      padding: 0;
      // background-color: bisque;
      &:active {
        padding-left: 1px;
        padding-top: 1px;
      }
    }
  }
  .footer {
    position: fixed;
    background-color: #fff;
    min-height: 30px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #2c2c2c;
    border-left: 2px solid #2c2c2c;
    border-bottom: 6px solid #2c2c2c;
    border-right: 6px solid #2c2c2c;
    
    .windowStart {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      flex: 1;
      
      .start {
        border-right: 2px solid #2c2c2c;
        // border-right-color: #757575;
        padding: 3px 6px;
        margin: 0 6px;
        transition: all 0.3s;
        color: #2c2c2c;
        &:hover {
          background-color: #757575;
          color: #fff;
          border-radius: 3px;
        }
        &:active {
          background-color: #2c2c2c;
          color: #fff;
          border-radius: 3px;
        }
      }
      .startWindow {
        transition: all 0.5s;
        position: absolute;
        background-color: #eeeeee;
        border-right: 2px solid #2c2c2c;
        border-top: 2px solid #2c2c2c;
        border-left: 2px solid #2c2c2c;
        bottom: 32px;
        left: -2px;
      }
      .minWindow {
        flex: 9;
        margin: 0px 10px;
        position: relative;
        .winText {
          width: fit-content;
          padding: 3px 15px 3px 5px;
          display: flex;
          align-items: center;
          text-align: left;
          transition: all 0.3s;
          border-bottom: 2px solid #2c2c2c;
          // border-radius: 3px;
          margin: 3px;
          &:hover {
            opacity: 0.8;
          }
          &:active {
            color: #000;
          }
        }
        .winPreview {
          position: absolute;
          // padding: 0px 3px;
          margin-bottom: 3px;
          top: -100px;
          bottom: 32px;
          left: 5px;
          // width: fit-content;
          // right: 32px;
          background-color: #fff;
          border: 1px solid #dbdbdb;
          border-radius: 3px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          &:hover {
            filter: contrast(95%);
          }
          .preview-header {
            flex: 1;
            display: flex;
            color: #ebebeb;
            justify-content: flex-end;
            align-items: center;
            // margin: 3px;
            .urlArea {
              .url-item {
                background-color: #ebebeb;
                margin: 3px;
                border-radius: 3px;
              }
            }
            .closeBtn {
              color: #2c2c2c;
              width: 15px;
              height: 15px;
              margin: 3px;
              background-color: #ffa2a2;
              border-radius: 50%;
              color: #fff;
              &:hover {
                background-color: #e74242;
              }
            }
          }
          .preview-body {
            flex: 9;
            background-color: #ebebeb;
            margin: 3px 5px 3px 5px;
            border-radius: 3px;
            box-shadow: 1px 1px 0px #d8d8d8;
            // border-top: 1px solid #757575;
            // background-color: #757575;
          }
        }
      }
    }
    .clock {
      position: relative;
      font-size: 14px;
      flex: 2;
      text-align: right;
      padding-right: 3px;
      display: flex;
      justify-content: flex-end;

      .clock-time {
        width: fit-content;
        padding: 3px;
        border-left: 2px solid #2c2c2c;
        transition: all 0.3s;
        &:hover {
          border-radius: 3px;
          background-color: #757575;
          color: #fff;
        }
        &:active {
          background-color: #2c2c2c;
          color: #fff;
          border-radius: 3px;
        }
      }
      .clock-date {
        position: absolute;
        right: 0;
        bottom: 32px;
        background-color: #fff;
        border: 1px solid #757575;
        border-radius: 5px;
        padding: 0 3px;
      }
    }
  }
}
</style>
<template>
  <div class="container" @click="quickStart">
    <!-- 1 Entry Point Folder -->
    <vue-draggable-resizable
      class="draggable-folder"
      :w="folderWidth"
      :h="folderHeight"
      :resizable="false"
      @dragstop="onDragging"
    >
      <div @click="enterFolder">
        <!-- 1.1 Folder -->
        <Folder
          class="mainFolder"
          ref="folder"
          v-if="isDisplay"
          :folderName="enterName"
        ></Folder>
      </div>
    </vue-draggable-resizable>

    <!-- 2 Main File Folder -->
    <Home v-if="!isDisplay" @minHome="minHome" @closeHome="closeHome" />

    <!-- 3 Desktop Footer -->
    <div class="footer">
      <div class="footerBottomLayer">
        <!-- 3.1 Copyright content -->
        <div class="copyright" v-if="isDisplay">Evan Huang &copy; 2021</div>
        <!-- 3.2 Start Area -->
        <div class="windowStart" :style="handleStart">
          <div class="start" ref="startWindow" @click.stop.prevent="onStart">
            START
          </div>
          <div class="startWindow" :style="handleStartWindow">
            <div class="startMenu" v-if="isStart">
              <div class="menu close" @click="closeWindow">POWER OFF</div>
            </div>
          </div>
          <!-- 3.3 Min Window Area -->
          <div
            v-if="!isClose"
            class="minWindow"
            @mouseenter="hoverShowDate('showPreview')"
            @mouseleave="hoverShowDate('hidePreviewDelay')"
          >
            <div
              class="winText"
              ref="windowText"
              :style="handleMinColor"
              @click="reOpen"
            >
              D:\evanH\...
            </div>
            <div
              class="winPreview"
              v-if="isDisplayPreview"
              @mouseleave="hoverShowDate('hidePreview')"
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
        <!-- 3.4 Clock Area -->
        <div class="clock">
          <div
            class="clock-time"
            @mouseenter="hoverShowDate('showDate')"
            @mouseleave="hoverShowDate('hideDate')"
          >
            {{ time }}
          </div>
          <div class="clock-date" v-if="isDisplayDate">{{ date }}</div>
        </div>
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
      isDisplayPreview: false,
      isDisplayDate: false,
      isClose: true,
      isDragged: false,
      isStart: false,
      folderWidth: 1,
      folderHeight: 1,
      left: 0,
      top: 0,
      enterName: "Evan H",
      time: "",
      date: "",
      hoverTimer: "",
      windowWidth: "",
      startWindowWidth: "",
      opacity: "0",
      startTop: "-2px",
    };
  },
  mounted() {
    this.getTime();
    this.getElementSize();
    this.globalClick(this.quickStart);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.hoverTimer);
  },
  computed: {
    handleStart() {
      return !this.isClose ? "flex: '8'" : "flex: '0.15'";
    },
    handleStartWindow() {
      return `width: ${this.startWindowWidth}; top: ${this.startTop}; opacity: ${this.opacity}`;
    },
    handleMinColor() {
      return this.isDisplay
        ? "background-color: rgba(255, 255, 255, 0);"
        : "background-color: rgba(0, 0, 0, 0.5);color: #fff;border-radius: 6px;border:none";
    },
  },
  watch: {
    isDisplay() {
      setTimeout(() => {
        try {
          this.windowWidth = this.$refs.windowText.offsetWidth + "px";
        } catch (error) {
          console.log(error);
        }
      }, 200);
    },
    isStart() {
      this.isStart
        ? ((this.startTop = "-130px"), (this.opacity = 1))
        : ((this.startTop = "-2px"), (this.opacity = 0));
    },
  },
  methods: {
    // Universal Methods
    getTime() {
      let that = this;
      this.timer = setInterval(() => {
        let currentDate = new Date();
        let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        let hours, minutes, seconds, week;
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
        week = weekDays[currentDate.getDay()];
        that.date = `${
          currentDate.getMonth() + 1
        }/${currentDate.getDate()}/${currentDate.getFullYear()} ${week}`;
      }, 1000);
    },
    getElementSize() {
      this.folderWidth = this.$refs.folder.$el.offsetWidth;
      this.folderHeight = this.$refs.folder.$el.offsetHeight;
      this.startWindowWidth = this.$refs.startWindow.offsetWidth * 2.5 + "px";
    },

    // Desktop Methods
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
    onDragging(left, top) {
      this.left = left;
      this.top = top;
      this.isDragged = true;
      this.isStart = false;
    },
    quickStart() {
      this.isStart = false;
    },

    // Footer Methods
    onStart() {
      this.isStart = !this.isStart;
    },
    closeWindow() {
      window.close();
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
      this.enterName = "Thank You!";
      setTimeout(() => {
        this.enterName = "Evan H";
      }, 2000);
    },
    hoverShowDate(val) {
      if (this.hoverTimer) {
        clearInterval(this.hoverTimer);
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
      &:active {
        padding-left: 1px;
        padding-top: 1px;
      }
    }
  }

  .footer {
    position: fixed;
    min-height: 30px;
    bottom: 2px;
    border-radius: 10px;
    left: 10px;
    right: 2px;
    .footerBottomLayer {
      position: fixed;
      background-color: rgba(255, 255, 255, 0);
      min-height: 34px;
      bottom: 2px;
      left: 2px;
      right: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid #2c2c2c;
      border-left: 2px solid #2c2c2c;
      border-bottom: 6px solid #2c2c2c;
      border-right: 6px solid #2c2c2c;
      border-radius: 10px;
      .copyright {
        position: absolute;
        right: 0;
        bottom: 38px;
        font-size: 12px;
        font-weight: bold;
        color: #bbbbbb;
      }
      .windowStart {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        flex: 1;

        .start {
          border-right: 2px solid #2c2c2c;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          padding: 3px 6px;
          margin: 0 6px;
          transition: all 0.3s;
          color: #2c2c2c;
          font-weight: bold;
          &:hover {
            border-color: #fff;
            background-color: #757575;
            color: #fff;
            border-radius: 6px;
          }
          &:active {
            background-color: #2c2c2c;
            color: #fff;
            border-radius: 6px;
          }
        }
        .startWindow {
          transition: all 0.3s ease-in-out;
          position: absolute;
          background-color: #fff;
          border: 2px solid #2c2c2c;
          border-radius: 10px;
          bottom: 38px;
          left: -1px;
          font-weight: bold;
          .startMenu {
            height: 100%;
            margin: 3px;
            margin-top: -3px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            font-size: 14px;
            color: #fff;
            .menu {
              width: 100%;
              background-color: #e95e5e;
              border-radius: 6px 6px 6px 6px;
              &:hover {
                background-color: #e74242;
              }
            }
          }
        }
        .minWindow {
          flex: 9;
          margin: 0px 10px;
          position: relative;
          font-weight: bold;
          .winText {
            width: fit-content;
            padding: 3px 15px 3px 5px;
            display: flex;
            align-items: center;
            text-align: left;
            transition: all 0.3s;

            border-bottom: 2px solid #2c2c2c;
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
          font-weight: bold;
          &:hover {
            border-radius: 6px;
            background-color: #757575;
            border-color: #fff;
            color: #fff;
          }
          &:active {
            background-color: #2c2c2c;
            color: #fff;
            border-radius: 6px;
          }
        }
        .clock-date {
          position: absolute;
          right: 0;
          bottom: 32px;
          background-color: #fff;
          border: 1px solid #757575;
          border-radius: 6px;
          padding: 0 3px;
        }
      }
    }
  }
}
</style>
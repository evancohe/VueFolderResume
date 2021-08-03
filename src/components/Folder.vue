<template>
  <div :class="handleContainerStyle">
    <div :class="handleFolderContainerStyle">
      <div class="folder-head"></div>
      <div class="folder-body"></div>
    </div>
    <div :class="handleFolderNameStyle">
      {{ folderName }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Folder",
  props: {
    folderName: String,
    viewStyle: {
      type: String,
      default: "folder",
    },
  },
  computed: {
    handleContainerStyle() {
      return this.viewStyle == "folder" ? "container" : "container-l";
    },
    handleFolderContainerStyle() {
      return this.viewStyle == "folder"
        ? "folder-container"
        : "folder-container-l";
    },
    handleFolderNameStyle() {
      return this.viewStyle == "folder" ? "folder-name" : "folder-name-l";
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px;
  &:active {
    padding-left: 15px;
    padding-top: 15px;
  }
}
.container-l {
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  padding-left: 4px;
  &:active {
    padding-left: 5px;
    padding-top: 1px;
  }
}
.folder-container {
  display: flex;
  flex-direction: column;
  // align-content: flex-start;
  background: rgba(0, 0, 0, 0);
  .folder-head {
    width: 25px;
    height: 4px;
    background-color: #c2c2c2;
    border: 1px solid #2c2c2c;
    border-bottom: none;
    border-radius: 5px 5px 0px 0px;
  }
  .folder-body {
    width: 60px;
    height: 40px;
    background-color: #eeeeee;
    border: 1px solid #2c2c2c;
    border-radius: 0px 6px 6px 6px;
    box-shadow: 3px 3px 0px #2c2c2c;
    // background: linear-gradient(-deg, #f0f0f0, #fff);
  }
}
.folder-container-l {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  margin: 10px;
  .folder-head {
    width: 12px;
    height: 1px;
    background-color: #c2c2c2;
    border: 1px solid #2c2c2c;
    border-bottom: none;
    border-radius: 3px 3px 0px 0px;
  }
  .folder-body {
    width: 30px;
    height: 20px;
    background-color: #eeeeee;
    border: 1px solid #2c2c2c;
    border-radius: 0px 4px 4px 4px;
    box-shadow: 2px 3px 0px #2c2c2c;
  }
}
.folder-name {
  width: 80px;
  margin-top: 5px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}

.folder-name-l {
  width: 60px;
  // display: flex;
  // align-items: center;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>

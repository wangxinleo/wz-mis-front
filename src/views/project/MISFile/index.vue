<template>
  <div class="MISFile-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip">
              <el-alert
                title="只能上传jpg/png文件"
                type="info"
                :closable="false"
                effect="dark"
              >
              </el-alert>
            </div>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MisFile",
  components: {},
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.MISFile-container {
  ::v-deep {
    .el-card__body {
      width: 100%;
      height: 600px;
    }

    .el-alert {
      margin: 10px 0;
    }
  }
}
</style>

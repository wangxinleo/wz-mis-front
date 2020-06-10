<template>
  <div class="MISFile-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <el-upload
            ref="upload"
            action="http://127.0.0.1:3000/api/private/v1/upload/MISFile"
            :before-upload="beforeUpload"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="false"
            multiple
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
              <el-alert
                title="提示:"
                type="info"
                description="请按照 【李阳20200108（825322）.jpg】 名称格式上传文件"
                show-icon
                :closable="false"
              ></el-alert>
            </div>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "MisFile",
  components: {},
  data() {
    return {
      fileList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitUpload() {
      console.log(123);
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      console.log(file);
      const filename = file.name;
      console.log(filename);
      if (
        (filename.indexOf("(") !== -1 && filename.indexOf(")") !== -1) ||
        (filename.indexOf("（") !== -1 && filename.indexOf("）") !== -1)
      ) {
        return true;
      } else {
        Message({
          message: "请按照 【李阳20200108（825322）.jpg】 名称格式上传文件",
          type: "error",
          duration: 3000,
        });
        return false;
      }
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

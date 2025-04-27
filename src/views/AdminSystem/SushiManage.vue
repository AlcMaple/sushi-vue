<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  adminGetSushiList,
  addSushi,
  updateSushi,
  deleteSushi,
  // 上传图片
  uploadFile,
} from "@/apis/admin";
import { ElMessage, ElMessageBox } from "element-plus";

const tableData = ref([]);
const loading = ref(false);
const allSushi = ref([]); // 存储所有寿司数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 对话框相关
const dialogVisible = ref(false);
const isEdit = ref(false);
const sushiForm = ref({
  name: "",
  image: "",
  price: "",
  details: {
    name_en: "",
    description: "",
    steps: [],
  },
});
const formTitle = ref("");

// 步骤管理
const newStep = ref("");
const addStep = () => {
  if (newStep.value.trim()) {
    sushiForm.value.details.steps.push(newStep.value);
    newStep.value = "";
  }
};
const removeStep = (index) => {
  sushiForm.value.details.steps.splice(index, 1);
};

// 上传图片
const uploadLoading = ref(false);
const imageUrl = ref("");

// 上传图片
const handleUpload = async (file) => {
  uploadLoading.value = true;
  try {
    const res = await uploadFile(file);
    sushiForm.value.image = res.data.filename;
    imageUrl.value = `http://localhost:5001/${res.data.path}`;
    ElMessage.success("上传成功");
  } catch (error) {
    console.error("上传失败", error);
    ElMessage.error("上传失败");
  } finally {
    uploadLoading.value = false;
  }
};

// 上传检查
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error("只能上传图片文件!");
    return false;
  }
  if (!isLt2M) {
    ElMessage.error("图片大小不能超过 2MB!");
    return false;
  }
  return true;
};

// 预览图片
const previewImage = computed(() => {
  if (imageUrl.value) return imageUrl.value;
  if (sushiForm.value.image) {
    return `http://localhost:5001/controllers/sushi_img/${sushiForm.value.image}`;
  }
  return "";
});

// 重置上传表单
const resetUpload = () => {
  imageUrl.value = "";
  if (isEdit.value && sushiForm.value.image) {
    // 编辑模式下保留原图片预览
    imageUrl.value = `http://localhost:5001/controllers/sushi_img/${sushiForm.value.image}`;
  }
};

// 加载寿司数据
const loadSushi = async () => {
  loading.value = true;
  try {
    const res = await adminGetSushiList();
    allSushi.value = res.data || [];
    total.value = allSushi.value.length;
    updatePageData();
  } catch (error) {
    console.error("获取寿司列表失败", error);
    ElMessage.error("获取寿司列表失败");
  } finally {
    loading.value = false;
  }
};

// 更新分页数据
const updatePageData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  tableData.value = allSushi.value.slice(start, end);
};

// 分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
  updatePageData();
};

// 删除寿司
const handleDelete = (name) => {
  ElMessageBox.confirm(`确定要删除寿司 "${name}" 吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteSushi(name);
        ElMessage.success("删除成功");
        loadSushi();
      } catch (error) {
        console.error("删除寿司失败", error);
        ElMessage.error("删除寿司失败");
      }
    })
    .catch(() => {});
};

// 编辑寿司
const handleEdit = (row) => {
  isEdit.value = true;
  formTitle.value = "编辑寿司";
  sushiForm.value = {
    name: row.name,
    image: row.image.replace("controllers/sushi_img/", ""),
    price: row.price,
    details: { ...row.details },
  };
  resetUpload();
  dialogVisible.value = true;
};

// 添加寿司
const handleAdd = () => {
  isEdit.value = false;
  formTitle.value = "添加寿司";
  sushiForm.value = {
    name: "",
    image: "",
    price: "",
    details: {
      name_en: "",
      description: "",
      steps: [],
    },
  };
  resetUpload();
  dialogVisible.value = true;
};

// 提交表单
const submitForm = async () => {
  if (
    !sushiForm.value.name ||
    !sushiForm.value.image ||
    !sushiForm.value.price
  ) {
    ElMessage.warning("请填写所有必填字段");
    return;
  }

  try {
    if (isEdit.value) {
      await updateSushi(sushiForm.value.name, {
        image: sushiForm.value.image,
        price: parseFloat(sushiForm.value.price),
        details: sushiForm.value.details,
      });
      ElMessage.success("更新成功");
    } else {
      await addSushi({
        name: sushiForm.value.name,
        image: sushiForm.value.image,
        price: parseFloat(sushiForm.value.price),
        details: sushiForm.value.details,
      });
      ElMessage.success("添加成功");
    }
    dialogVisible.value = false;
    loadSushi();
  } catch (error) {
    console.error("操作失败", error);
    ElMessage.error(error.response?.data?.message || "操作失败");
  }
};

onMounted(() => {
  loadSushi();
});
</script>

<template>
  <div class="sushi-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>寿司管理</span>
          <el-button type="primary" @click="handleAdd">添加寿司</el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column prop="name" label="寿司名称" width="150" />
        <el-table-column label="图片" width="120">
          <template #default="scope">
            <img
              :src="`http://localhost:5001/${scope.row.image}`"
              alt="寿司图片"
              style="width: 80px; height: 80px; object-fit: cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template #default="scope"> ¥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column label="描述" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.details?.description || "暂无描述" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 编辑对话框部分 -->
    <el-dialog v-model="dialogVisible" :title="formTitle" width="50%">
      <el-form :model="sushiForm" label-width="100px">
        <el-form-item label="寿司名称" required>
          <el-input v-model="sushiForm.name" :disabled="isEdit" />
        </el-form-item>

        <el-form-item label="寿司图片" required>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="(options) => handleUpload(options.file)"
          >
            <img v-if="previewImage" :src="previewImage" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"
              ><i class="fas fa-plus"></i
            ></el-icon>
          </el-upload>
          <div class="form-tip">上传图片，大小不超过2MB</div>
        </el-form-item>

        <el-form-item label="价格" required>
          <el-input-number v-model="sushiForm.price" :min="0" :precision="2" />
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="sushiForm.details.description"
            type="textarea"
            :rows="3"
          />
        </el-form-item>

        <el-form-item label="制作步骤">
          <div class="steps-container">
            <div
              v-for="(step, index) in sushiForm.details.steps"
              :key="index"
              class="step-item"
            >
              <el-input v-model="sushiForm.details.steps[index]" />
              <el-button
                type="danger"
                size="small"
                @click="removeStep(index)"
                circle
              >
                <i class="fas fa-times"></i>
              </el-button>
            </div>
            <div class="add-step">
              <el-input
                v-model="newStep"
                placeholder="输入新步骤"
                @keyup.enter="addStep"
              />
              <el-button type="primary" @click="addStep">添加步骤</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-tip {
  color: #909399;
  font-size: 12px;
  margin-top: 5px;
}
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.add-step {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.upload-hint {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
}

/* 上传样式 */
.avatar-uploader {
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}
</style>
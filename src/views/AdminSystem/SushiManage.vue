<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  adminGetSushiList,
  addSushi,
  updateSushi,
  deleteSushi,
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

        <el-form-item label="上传图片" required>
          <!-- 当前图片 -->
          <el-input
            v-model="sushiForm.image"
            placeholder="例如: salmon_sushi.jpg"
          />
          <div class="form-tip">图片路径: controllers/sushi_img/xxx.jpg</div>

          <!-- 这里仅是示意性的上传控件，实际需要后端支持 -->
          <div class="upload-hint">
            <p>
              提示：请将图片文件上传至服务器 controllers/sushi_img/
              目录下，并在上方输入文件名
            </p>
          </div>
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
</style>
import axios from 'axios';
import { ElMessage, ElLoading, ElOption } from 'element-plus';

const httpInstance = axios.create({
    // baseURL: 'http://python.alcmaple.cn/',
    baseURL: 'http://127.0.0.1:5001/api',
    timeout: 5000
});

httpInstance.interceptors.response.use(res => {
    let data = res.data;
    // 隐藏加载
    ElLoading.service().close();
    if (res.status == 200) {
        return res.data;
    } else if (res.status == 401) {
        ElMessage.error("未授权！！！");
    } else {
        ElMessage.error(res.data.msg);
    }
}, e => {
    // 隐藏加载
    ElLoading.service().close();
    return Promise.reject(e);
});

httpInstance.interceptors.request.use(
    config => {
        // 显示加载
        ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        ElLoading.service().close();
        return Promise.reject(error);
    }
);

export default httpInstance;
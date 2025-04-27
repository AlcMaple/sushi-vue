import httpInstance from "@/utils/http";

// 管理员登录
export function adminLogin(data) {
    return httpInstance({
        url: '/admin/login',
        method: 'post',
        data
    })
}

// 用户管理
export function getUsers(page = 1, per_page = 10) {
    return httpInstance({
        url: '/admin/users',
        method: 'get',
        params: { page, per_page }
    })
}

export function deleteUser(username) {
    return httpInstance({
        url: `/admin/users/${username}`,
        method: 'delete'
    })
}

export function updateUser(username, data) {
    return httpInstance({
        url: `/admin/users/${username}`,
        method: 'put',
        data
    })
}

// 评论管理
export function getCommentsList(page = 1, per_page = 10) {
    return httpInstance({
        url: '/admin/comments',
        method: 'get',
        params: { page, per_page }
    })
}

export function deleteComment(commentId) {
    return httpInstance({
        url: `/admin/comments/${commentId}`,
        method: 'delete'
    })
}

// 寿司管理
export function adminGetSushiList() {
    return httpInstance({
        url: '/admin/sushi',
        method: 'get'
    })
}

export function addSushi(data) {
    return httpInstance({
        url: '/admin/sushi',
        method: 'post',
        data
    })
}

export function updateSushi(name, data) {
    return httpInstance({
        url: `/admin/sushi/${name}`,
        method: 'put',
        data
    })
}

export function deleteSushi(name) {
    return httpInstance({
        url: `/admin/sushi/${name}`,
        method: 'delete'
    })
}

// 文件上传
export function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return httpInstance({
        url: '/admin/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
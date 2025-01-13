import httpInstance from "@/utils/http";

// 获取用户对某商品互动信息
export function getShopInteraction(sushiName, username) {
    return httpInstance({
        url: `/sushi/actions/status/${sushiName}`,
        method: 'get',
        params: {
            username: username
        }
    })
}

// 点赞
export function likeShopInteraction(sushiName, username) {
    return httpInstance({
        url: `/sushi/actions/like`,
        method: 'post',
        data: {
            username: username,
            sushi_name: sushiName
        }
    })
}

// 取消点赞
export function cancelLikeShopInteraction(sushiName, username) {
    return httpInstance({
        url: `/sushi/actions/unlike`,
        method: 'post',
        data: {
            username: username,
            sushi_name: sushiName
        }
    })
}

// 收藏
export function collectShopInteraction(sushiName, username) {
    return httpInstance({
        url: `/sushi/actions/favorite`,
        method: 'post',
        data: {
            username: username,
            sushi_name: sushiName
        }
    })
}

// 取消收藏
export function cancelCollectShopInteraction(sushiName, username) {
    return httpInstance({
        url: `/sushi/actions/unfavorite`,
        method: 'post',
        data: {
            username: username,
            sushi_name: sushiName
        }
    })
}

// 获取寿司评论
export function getShopComments(sushiName) {
    return httpInstance({
        url: `/sushi/actions/comments/${sushiName}`,
        method: 'get'
    })
}

// 发表评论
export function postShopComment(sushiName, username, content, score) {
    return httpInstance({
        url: `/sushi/actions/comment`,
        method: 'post',
        data: {
            username: username,
            sushi_name: sushiName,
            content: content,
            score: score
        }
    })
}

// 获取用户发表的评论
export function getUserComments(username) {
    return httpInstance({
        url: `/sushi/actions/user/comments/${username}`,
        method: 'get',
    })
}

// 获取用户收藏过的寿司
export function getUserFavorites(username) {
    return httpInstance({
        url: `/sushi/actions/user/favorites/${username}`,
        method: 'get',
    })
}
import httpInstance from "@/utils/http";

// 获取商品列表
export function getShopList() {
    return httpInstance({
        url: '/sushi/',
        method: 'get'
    })
}

// 查询商品列表
export function searchShopList(params) {
    return httpInstance({
        url: '/sushi/search',
        method: 'get',
        params
    })
}

// 获取商品详情
export function getShopDetail() {
    return httpInstance({
        url: `/sushi/content`,
        method: 'get'
    })
}
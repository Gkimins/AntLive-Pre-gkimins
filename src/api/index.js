import request from '@/utils/request'

export default {
    login(username, password) {
        const data = {
            username,
            password
        }
        return request({
            url: '/live/login',
            method: 'post',
            data
        })
    },
    logout() {
        return request.post('/logout')
    },
    // getUserInfo(token){
    //     return request({
    //         url:'/info',
    //         method:'get',
    //         params:{
    //             token
    //         }
    //     })
    // },
    foo(rid) {
        return request({
            url: '/live/info',
            method: 'get',
            params: {
                rid
            }
        })
    },
    register(data) {
        return request({
            url: '/live/register',
            method: 'post',
            data
        })
    },
    sendCode(account) {
        return request({
            url: '/live/code',
            method: 'post',
            params: {
                account
            }
        })
    },
    bind(data){
        return request({
            url: '/live/bind',
            method: 'post',
            params: {
                account:data.account,
                code:data.code
            }
        })
    },
    auth(data) {
        return request({
            url: '/live/auth',
            method: 'post',
            data
        })
    },
    getAuthInfo(){
        return request({
            url: '/live/auth/info',
            method: 'get',
        })
    },
    userBlock(ids,type){
        return request({
            url: '/live/admin/user/block/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authPass(ids,type){
        return request({
            url: '/live/admin/auth/pass/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authDel(ids){
        return request({
            url: '/live/admin/auth/del/',
            method: 'post',
            data:{
                ids
            }
        })
    },
    getSecurityInfo() {
        return request({
            url: '/live/getSecurityInfo',
            method: 'get'
        })
    },
    getUserInfo() {
        return request({
            url: '/live/getUserInfo',
            method: 'get'
        })
    },
    saveRole(data){
        return request({
            url: '/live/admin/role/save',
            method: 'post',
            data
        })
    },
    getRoleList() {
        return request({
            url: '/live/admin/role/list',
            method: 'get'
        })
    },
    getHasRoleUserList(){
        return request({
            url: '/live/admin/user/hasRole/list',
            method: 'get'
        })
    },
    getRoleListByUserId(uid){
        return request({
            url: '/live/admin/role/listByUserId',
            method: 'get',
            params:{
                uid
            }
        })
    },
    getRoomInfo(rid) {
        return request({
            url: '/live/room',
            method: 'get',
            params: {
                rid
            }
        })
    },
    getRoomSettingInfo() {
        return request({
            url: '/live/room/setting/info',
            method: 'get',
        })
    },
    getPresentInfo() {
        return request({
            url: '/live/present',
            method: 'get'
        })
    },
    getMenuList() {
        return request({
            url: '/live/admin/menu/list',
            method: 'get'
        })
    },
    getMenuListByRole(rid) {
        return request({
            url: '/live/admin/menu/listByRole',
            method: 'get',
            params:{
                rid
            }
        })
    },
    getMenuListByRoleIds(roleIds) {
        return request({
            url: '/live/admin/menu/listByRoleIds',
            method: 'post',
            data:{
                ids:roleIds
            }
        })
    },
    getSystemMonitor(){
        return request({
            url: '/live/admin/monitor',
            method: 'get'
        })
    },
    getLivingRoomInfo(cid) {
        return request({
            url: '/live/room/living',
            method: 'get',
            params: {
                cid
            }
        })
    },
    getLiveStatInfo(page,limit,dateRange) {
        return request({
            url: '/live/live/info/list',
            method: 'get',
            params: {
                page,
                limit,
                dateRange
            }
        })
    },
    getBalance() {
        return request({
            url: '/live/bill',
            method: 'get',
        })
    },
    recharge(num) {
        return request({
            url: '/live/bill/recharge',
            method: 'get',
            params: {
                num
            }
        })
    },
    getCategory(page,limit){
        return request({
            url: '/live/category/query',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    getBillList(month, page, limit) {
        return request({
            url: '/live/bill/list',
            method: 'get',
            params: {
                page,
                limit,
                month
            }
        })
    },
    getRoomPresentList(page, limit, dateRange) {
        return request({
            url: '/live/room/present/list',
            method: 'get',
            params: {
                page,
                limit,
                dateRange
            }
        })
    },
    getWithdrawalList(month, page, limit) {
        return request({
            url: '/live/bill/withdrawal/list',
            method: 'get',
            params: {
                page,
                limit, month
            }
        })
    },
    getWatctList(type, page, limit) {
        return request({
            url: '/live/watch/list',
            method: 'get',
            params: {
                type,
                page,
                limit
            }
        })
    },
    saveWatch(data) {
        return request({
            url: '/live/watch',
            method: 'post',
            data
        })
    },
    updateMenu(data){
        return request({
            url: '/live/admin/menu/update',
            method: 'post',
            data
        })
    },

    saveMenu(data){
        return request({
            url: '/live/admin/menu/save',
            method: 'post',
            data
        })
    },
    getSystemPushInfo(){
        return request({
            url: '/live/admin/push/info',
            method: 'get',
        })
    },
    getSystemPushLog(sysPushId){
        return request({
            url: '/live/admin/push/log',
            method: 'get',
            params:{
                sysPushId
            }
        })
    },
    updateSystemPushInfo(data){
        return request({
            url: '/live/admin/push/update',
            method: 'post',
            data
        })
    },
    delWatch(id) {
        return request({
            url: '/live/watch',
            method: 'delete',
            params: {
                id
            }
        })
    },
    liveOpen() {
        return request({
            url: '/live/open',
            method: 'post'
        })
    },
    updateRoleMenu(data){
        return request({
            url: '/live/admin/role/menu/update',
            method: 'post',
            data
        })
    },
    updateUserRole(data){
        return request({
            url: '/live/admin/user/role/update',
            method: 'post',
            data
        })
    },
    savePresent(data){
        return request({
            url: '/live/admin/present/save',
            method: 'post',
            data
        })
    },
    editPresent(data){
        return request({
            url: '/live/admin/present/edit',
            method: 'post',
            data
        })
    },
    removePresent(id){
        return request({
            url: '/live/admin/present/del',
            method: 'post',
            params: {
                id
            }
        })
    },
    liveClose(rid) {
        return request({
            url: '/live/live/on_done',
            method: 'post',
            params: {
                name: rid
            }
        })
    },
    sendPresent(data) {
        return request({
            url: '/live/present/send',
            method: 'post',
            data
        })
    },
    saveRoomInfo(data) {
        return request({
            url: '/live/room/info/save',
            method: 'post',
            data
        })
    },
    updateUserInfo(data) {
        return request({
            url: '/live/user/info/update',
            method: 'post',
            data
        })
    },
    getDashboardData() {
        return request({
            url: '/live/admin/dashboard/data',
            method: 'get'
        })
    },
    adminGetUserList(page, limit, uid, disabled) {
        return request({
            url: '/live/admin/user/list',
            method: 'get',
            params: {
                page,
                limit,
                uid,
                disabled
            }
        })
    },
    adminGetRoomList(page, limit) {
        return request({
            url: '/live/admin/room/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminAuthInfoList(page, limit,status) {
        return request({
            url: '/live/admin/auth/list',
            method: 'get',
            params: {
                page,
                limit,
                status
            }
        })
    },
    adminPresentList(page, limit) {
        return request({
            url: '/live/admin/present/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminBillList(page, limit, type, dateRange) {
        return request({
            url: '/live/admin/bill/list',
            method: 'get',
            params: {
                page,
                limit,
                type,
                dateRange
            }
        })
    },
    adminLiveInfoList(page, limit, rid, dateRange) {
        return request({
            url: '/live/admin/liveInfo/list',
            method: 'get',
            params: {
                page,
                limit,
                rid,
                dateRange
            }
        })
    },
    adminLiveBanList(page, limit) {
        return request({
            url: '/live/admin/live/ban/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    liveDetectList(page, limit){
        return request({
            url: '/live/admin/live/detect/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    openLive() {
        return request({
            url: '/live/tencent/live/open',
            method: 'get',
        })
    },
    withdrawal(data) {
        return request({
            url: '/live/bill/withdrawal',
            method: 'post',
            data
        })
    },
    getStatView(params) {
        return request({
            url: '/live/admin/stat/view/list',
            method: 'get',
            params
        })
    },
    getStatSpeak(params) {
        return request({
            url: '/live/admin/stat/speak/list',
            method: 'get',
            params
        })
    },
    getSnapshotTempaltes(){
        return request({
            url: '/live/admin/live/snapshot/template/list',
            method: 'get',
        })
    },
    updateSnapshotTemplate(data){
        return request({
            url: '/live/admin/live/snapshot/template/update',
            method: 'post',
            data
        })
    },
    getBanRecordList(params){
        return request({
            url: '/live/admin/live/ban/record/list',
            method: 'get',
            params
        })
    },
    getVodSignature(){
        return request({
            url: '/live/vod/signature',
            method: 'post',
        })
    },
    saveUploadVodInfo(data){
        return request({
            url: '/live/vod/video/info/save',
            method: 'post',
            data
        })
    },
    getVodList(params){
        return request({
            url: '/live/vod/video/list',
            method: 'get',
            params
        })
    },
    getVodNormalList(params){
        return request({
            url: '/live/vod/video/list/normal',
            method: 'get',
            params
        })
    },
    getVodVideoInfo(params){
        return request({
            url: '/live/vod/video/info',
            method: 'get',
            params
        })
    },
    applySecret() {
        return request({
            url: '/live/ant/live/applySecret',
            method: 'post',
        })
    },
    stopLive() {
        return request({
            url: '/live/ant/live/stopLive',
            method: 'post',
        })
    },
    getLiveStatus() {
        return request({
            url: '/live/ant/live/getLiveStatus',
            method: 'get',
        })
    },
}

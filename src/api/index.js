import request from '@/utils/request'

export default {
    login(username, password, vcode, vcodeId) {
        const data = {
            username,
            password,
            vcode,
            vcodeId,
        }
        return request({
            url: '/api/live/login',
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
            url: '/api/live/info',
            method: 'get',
            params: {
                rid
            }
        })
    },
    register(data) {
        return request({
            url: '/api/live/register',
            method: 'post',
            data
        })
    },
    sendCode(account) {
        return request({
            url: '/api/live/code',
            method: 'post',
            params: {
                account
            }
        })
    },
    bind(data){
        return request({
            url: '/api/live/bind',
            method: 'post',
            params: {
                account:data.account,
                code:data.code
            }
        })
    },
    auth(data) {
        return request({
            url: '/api/live/auth',
            method: 'post',
            data
        })
    },
    getAuthInfo(){
        return request({
            url: '/api/live/auth/info',
            method: 'get',
        })
    },
    userBlock(ids,type){
        return request({
            url: '/api/live/admin/user/block/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authPass(ids,type){
        return request({
            url: '/api/live/admin/auth/pass/'+type,
            method: 'post',
            data:{
                ids
            }
        })
    },
    authDel(ids){
        return request({
            url: '/api/live/admin/auth/del/',
            method: 'post',
            data:{
                ids
            }
        })
    },
    getSecurityInfo() {
        return request({
            url: '/api/live/getSecurityInfo',
            method: 'get'
        })
    },
    getUserInfo() {
        return request({
            url: '/api/live/getUserInfo',
            method: 'get'
        })
    },
    saveRole(data){
        return request({
            url: '/api/live/admin/role/save',
            method: 'post',
            data
        })
    },
    getRoleList() {
        return request({
            url: '/api/live/admin/role/list',
            method: 'get'
        })
    },
    getHasRoleUserList(){
        return request({
            url: '/api/live/admin/user/hasRole/list',
            method: 'get'
        })
    },
    getRoleListByUserId(uid){
        return request({
            url: '/api/live/admin/role/listByUserId',
            method: 'get',
            params:{
                uid
            }
        })
    },
    getRoomInfo(rid) {
        return request({
            url: '/api/live/room',
            method: 'get',
            params: {
                rid
            }
        })
    },
    getRoomSettingInfo() {
        return request({
            url: '/api/live/room/setting/info',
            method: 'get',
        })
    },
    getPresentInfo() {
        return request({
            url: '/api/live/present',
            method: 'get'
        })
    },
    getIsWatch(rid) {
        return request({
            url: '/api/live/watch/isFollow',
            method: 'get',
            params:{
                rid
            }
        })
    },
    getMenuList() {
        return request({
            url: '/api/live/admin/menu/list',
            method: 'get'
        })
    },
    getMenuListByRole(rid) {
        return request({
            url: '/api/live/admin/menu/listByRole',
            method: 'get',
            params:{
                rid
            }
        })
    },
    getMenuListByRoleIds(roleIds) {
        return request({
            url: '/api/live/admin/menu/listByRoleIds',
            method: 'post',
            data:{
                ids:roleIds
            }
        })
    },
    searchRoom(roomName){
        return request({
            url: '/api/live/room/living',
            method: 'get',
            params: {
                roomName
            }
        })
    },
    getSystemMonitor(){
        return request({
            url: '/api/live/admin/monitor',
            method: 'get'
        })
    },

    getLivingRoomInfo(cid) {
        return request({
            url: '/api/live/room/living',
            method: 'get',
            params: {
                cid
            }
        })
    },
    getLiveStatInfo(page,limit,dateRange) {
        return request({
            url: '/api/live/info/list',
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
            url: '/api/live/bill',
            method: 'get',
        })
    },
    recharge(num) {
        return request({
            url: '/api/live/bill/recharge',
            method: 'get',
            params: {
                num
            }
        })
    },
    getCategory(page,limit){
        return request({
            url: '/api/live/category/query',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    getBillList(month, page, limit) {
        return request({
            url: '/api/live/bill/list',
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
            url: '/api/live/room/present/list',
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
            url: '/api/live/bill/withdrawal/list',
            method: 'get',
            params: {
                page,
                limit, month
            }
        })
    },
    getWatctList(type, page, limit) {
        return request({
            url: '/api/live/watch/list',
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
            url: '/api/live/watch',
            method: 'post',
            data
        })
    },
    updateMenu(data){
        return request({
            url: '/api/live/admin/menu/update',
            method: 'post',
            data
        })
    },

    saveMenu(data){
        return request({
            url: '/api/live/admin/menu/save',
            method: 'post',
            data
        })
    },
    getSystemPushInfo(){
        return request({
            url: '/api/live/admin/push/info',
            method: 'get',
        })
    },
    getSystemPushLog(sysPushId){
        return request({
            url: '/api/live/admin/push/log',
            method: 'get',
            params:{
                sysPushId
            }
        })
    },
    updateSystemPushInfo(data){
        return request({
            url: '/api/live/admin/push/update',
            method: 'post',
            data
        })
    },
    delWatch(id) {
        return request({
            url: '/api/live/watch',
            method: 'delete',
            params: {
                id
            }
        })
    },
    cancelFollow(rid) {
        return request({
            url: '/api/live/watch/cancelFollow',
            method: 'delete',
            params: {
                rid
            }
        })
    },
    liveOpen() {
        return request({
            url: '/api/live/open',
            method: 'post'
        })
    },
    updateRoleMenu(data){
        return request({
            url: '/api/live/admin/role/menu/update',
            method: 'post',
            data
        })
    },
    updateUserRole(data){
        return request({
            url: '/api/live/admin/user/role/update',
            method: 'post',
            data
        })
    },
    savePresent(data){
        return request({
            url: '/api/live/admin/present/save',
            method: 'post',
            data
        })
    },
    editPresent(data){
        return request({
            url: '/api/live/admin/present/edit',
            method: 'post',
            data
        })
    },
    removePresent(id){
        return request({
            url: '/api/live/admin/present/del',
            method: 'post',
            params: {
                id
            }
        })
    },
    liveClose(rid) {
        return request({
            url: '/api/live/on_done',
            method: 'post',
            params: {
                name: rid
            }
        })
    },
    sendPresent(data) {
        return request({
            url: '/api/live/present/live/reward',
            method: 'post',
            data
        })
    },
    saveRoomInfo(data) {
        return request({
            url: '/api/live/room/info/save',
            method: 'post',
            data
        })
    },
    updateUserInfo(data) {
        return request({
            url: '/api/live/user/info/update',
            method: 'post',
            data
        })
    },
    getDashboardData() {
        return request({
            url: '/api/live/admin/dashboard',
            method: 'get'
        })
    },
    adminGetUserList(page, limit, name, disabled) {
        return request({
            url: '/api/live/admin/user/list',
            method: 'get',
            params: {
                page,
                limit,
                name,
                disabled
            }
        })
    },
    adminGetRoomList(page, limit) {
        return request({
            url: '/api/live/admin/room/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminAuthInfoList(page, limit,status) {
        return request({
            url: '/api/live/admin/auth/list',
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
            url: '/api/live/admin/present/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    adminBillList(page, limit, type, dateRange) {
        return request({
            url: '/api/live/admin/bill/list',
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
            url: '/api/live/admin/liveInfo/list',
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
            url: '/api/live/admin/live/ban/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    liveDetectList(page, limit){
        return request({
            url: '/api/live/admin/live/detect/list',
            method: 'get',
            params: {
                page,
                limit
            }
        })
    },
    openLive() {
        return request({
            url: '/api/live/tencent/live/secret',
            method: 'get',
        })
    },
    withdrawal(data) {
        return request({
            url: '/api/live/bill/withdrawal',
            method: 'post',
            data
        })
    },
    getStatView(params) {
        return request({
            url: '/api/live/statistic/stat/view/list',
            method: 'get',
            params
        })
    },
    getStatSpeak(params) {
        return request({
            url: '/api/live/statistic/stat/speak/list',
            method: 'get',
            params
        })
    },
    getSnapshotTempaltes(){
        return request({
            url: '/api/live/admin/live/snapshot/template/list',
            method: 'get',
        })
    },
    updateSnapshotTemplate(data){
        return request({
            url: '/api/live/admin/live/snapshot/template/update',
            method: 'post',
            data
        })
    },
    getBanRecordList(params){
        return request({
            url: '/api/live/admin/live/ban/record/list',
            method: 'get',
            params
        })
    },
    getVodSignature(){
        return request({
            url: '/api/live/vod/signature',
            method: 'post',
        })
    },
    saveUploadVodInfo(data){
        return request({
            url: '/api/live/vod/video/info/save',
            method: 'post',
            data
        })
    },
    getVodList(params){
        return request({
            url: '/api/live/vod/video/list',
            method: 'get',
            params
        })
    },
    getVodNormalList(params){
        return request({
            url: '/api/live/vod/video/list/normal',
            method: 'get',
            params
        })
    },
    getVodVideoInfo(params){
        return request({
            url: '/api/live/vod/video/info',
            method: 'get',
            params
        })
    },
    applySecret() {
        return request({
            url: '/api/live/ant/live/applySecret',
            method: 'post',
        })
    },
    stopLive(rid) {
        return request({
            url: '/api/live/tencent/live/stopLive',
            method: 'get',
            params:{
                rid:rid
            }
        })
    },
    getLiveStatus() {
        return request({
            url: '/api/live/ant/live/getLiveStatus',
            method: 'get',
        })
    },
    uploadImg(data) {
        return request({
            url: '/api/live/upload/img',
            methods: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    },
    deleteRecommandItem(id) {
        return request({
            url: '/api/live/banner/' + id,
            method: 'delete',
        })

    },
    updateRecommandStatus(id, status) {
        return request({
            url: '/api/live/banner/' + id + '/' + status,
            method: 'put',
        })
    },
    getBanners(param) {
        return request({
            url: '/api/live/banner',
            method: 'get',
            params: param
        })
    },
    saveOrUpdateBanner(dialogForm) {
        return request({
            url: '/api/live/banner',
            method: 'post',
            data: dialogForm
        })
    },
    addBannerClick(id) {
        return request({
            url: '/api/live/banner/click/' + id,
            method: 'post',
        })
    }
}

module.exports = {
    publicPath:'',
    devServer:{
        allowedHosts: [
            'arca.serveo.net', // 允许访问的域名地址，即花生壳内网穿透的地址
            'omitto.serveo.net', // 允许访问的域名地址，即花生壳内网穿透的地址
        ],
        host:'127.0.0.1',
        port:8088,
        proxy:{
            '/api':{
                target:'http://127.0.0.1:9011/',
                changeOrigin:true,
                secure: false,
                pathRewrite:{
                    '^/api':''
                }
            },
        }
    }
}

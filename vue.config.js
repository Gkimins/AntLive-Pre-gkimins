module.exports = {
    publicPath:'',
    devServer:{
        host:'127.0.0.1',
        port:8088,
        proxy:{
            '/api':{
                target:'http://119.23.255.187:9090',
                changeOrigin:true,
            },
        }
    }
}

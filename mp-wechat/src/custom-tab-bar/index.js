Component({
    data: {
        selected: 0,
        list: [
            {
                pagePath: "/pages/toplist/index",
                text: "Toplist",
                iconPath: "/static/images/tabbar/recommend.png",
                selectedIconPath: "/static/images/tabbar/selected-recommend.png"
            },{
                pagePath: "/pages/random/index",
                text: "Random",
                iconPath: "/static/images/tabbar/recommend.png",
                selectedIconPath: "/static/images/tabbar/selected-recommend.png"
            },{
                pagePath: "/pages/latest/index",
                text: "Latest",
                iconPath: "/static/images/tabbar/recommend.png",
                selectedIconPath: "/static/images/tabbar/selected-recommend.png"
            }, {
                pagePath: "/pages/mine/index",
                text: "Mine",
                iconPath: "/static/images/tabbar/mine.png",
                selectedIconPath: "/static/images/tabbar/selected-mine.png"
            }
        ]
    },

    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({ url:url })
        }
    }
});
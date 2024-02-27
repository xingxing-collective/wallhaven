Component({
    data: {
        selected: 0,
        list: [
            {
                pagePath: "/pages/toplist/index",
                text: "Toplist",
                iconPath: "/static/images/tabbar/toplist.png",
                selectedIconPath: "/static/images/tabbar/toplist-fill.png"
            },{
                pagePath: "/pages/random/index",
                text: "Random",
                iconPath: "/static/images/tabbar/random.png",
                selectedIconPath: "/static/images/tabbar/random-fill.png"
            },{
                pagePath: "/pages/latest/index",
                text: "Latest",
                iconPath: "/static/images/tabbar/latest.png",
                selectedIconPath: "/static/images/tabbar/latest-fill.png"
            },{
                pagePath: "/pages/hot/index",
                text: "Hot",
                iconPath: "/static/images/tabbar/hot.png",
                selectedIconPath: "/static/images/tabbar/hot-fill.png"
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
import { onShow } from "@dcloudio/uni-app";
import { getCurrentInstance } from "vue";


export const useTabBar = (selected: number) => {
    const instance = getCurrentInstance();
    onShow(() => {
        //@ts-ignore
        if (typeof instance?.ctx.$scope.getTabBar == "function") {
            //@ts-ignore
            instance?.ctx.$scope.getTabBar().setData({
                selected
            })
        }
    })
}
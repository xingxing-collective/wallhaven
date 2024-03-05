<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import 'virtual:uno.css'
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style>
page {
  object-fit: fill;
  background-size: cover;
  background-image: url(https://7072-prod-xingxing-music-7cdbce8de59b-1318958897.tcb.qcloud.la/wallhaven.jpg?sign=ef0cdd6f98231af3267ac11697b28f95&t=1708936774);
}
</style>
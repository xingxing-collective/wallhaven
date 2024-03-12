import { $fetch } from "../ofetch/src"

async function main() {
   return await $fetch( 'https://baidu.com')
}
main().then(r=>{
    console.log(r)
}).catch(e=>{
    process.exit(1);
})
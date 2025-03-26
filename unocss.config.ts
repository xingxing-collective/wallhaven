import { defineConfig,presetIcons } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer"

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()


export default defineConfig({
    presets: [
        presetIcons(),
        presetWeapp(),
        presetWeappAttributify(),

    ],
    transformers: [
        transformerClass(),
        transformerAttributify()
    ]
})
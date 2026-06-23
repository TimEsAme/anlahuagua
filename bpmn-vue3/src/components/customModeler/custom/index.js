import CustomPalette from "./CustomPalette";
import CustomRenderer from "./CustomRenderer";
import CustomContextPadProvider from "./CustomContextPadProvider";
export default {
  // paletteProvider contextPadProvider是官方名称,使用官方名称就会让自己的组件替换掉所有的官方工具
  __init__: ['paletteProvider', 'contextPadProvider', 'customRenderer'],
  paletteProvider: ['type', CustomPalette],
  contextPadProvider: ['type', CustomContextPadProvider],
  customRenderer: ['type', CustomRenderer],


  // 不使用官方名称自己取名字就会合并自己的和官方的工具
  // __init__: ['custompPaletteProvider', 'contextPadProvider', 'customRenderer'],
  // custompPaletteProvider: ['type', CustomPalette],
  // contextPadProvider: ['type', CustomContextPadProvider],
  // customRenderer: ['type', CustomRenderer],

}
const treeData = [
  {
    label: "水果",
    checked: false,
    children: [
      {
        label: "苹果",
        checked: false,
        children: [
          { label: "红富士", checked: false },
          { label: "黄元帅", checked: false },
        ],
      },
      {
        label: "香蕉",
        checked: false,
        children: [{ label: "皇帝蕉", checked: false }],
      },
    ],
  },
  {
    label: "游戏",
    checked: false,
    children: [
      {
        label: "角色扮演",
        checked: false,
        children: [
          { label: "最终幻想", checked: false },
          { label: "巫师3", checked: false },
        ],
      },
      {
        label: "动作冒险",
        checked: false,
        children: [
          { label: "塞尔达传说", checked: false },
          { label: "刺客信条", checked: false },
        ],
      },
      {
        label: "独立游戏",
        checked: false,
        children: [{ label: "星露谷物语", checked: false }],
      },
    ],
  },
  {
    label: "电影",
    checked: false,
    children: [
      {
        label: "科幻",
        checked: false,
        children: [
          { label: "星际穿越", checked: false },
          { label: "盗梦空间", checked: false },
        ],
      },
      {
        label: "动画",
        checked: false,
        children: [
          { label: "千与千寻", checked: false },
          { label: "寻梦环游记", checked: false },
        ],
      },
      {
        label: "经典",
        checked: false,
        children: [{ label: "肖申克的救赎", checked: false }],
      },
    ],
  },
];

export default treeData;

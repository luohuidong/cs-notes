import type { DefaultTheme } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "Frontend",
    items: [
      { text: "JavaScript 对象", link: "/frontend/object/object-property" },
      { text: "Web Components", link: "/frontend/web-components/custom-element/create" },
    ],
  },
  {
    text: "Linux",
    items: [{ text: "Shell Script", link: "/linux/shell-script/what-is-shell-script" }],
  },
];

export default nav;

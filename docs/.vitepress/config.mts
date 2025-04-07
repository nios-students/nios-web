import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
// Used this as reference: https://github.com/FOSSonTop/website/tree/main/docs/.vitepress/config.mts
function genSidebarConfig(doc: string){
  return {
    documentRootPath: 'docs',
    scanStartPath: doc,
    resolvePath: `/${doc}/`,
    collapsed: true,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    underscoreToSpace: true,
    includeEmptyFolder: false,
    sortMenusByName: false,
    excludePattern: ['README**'],
    sortMenusByFrontmatterOrder: true,
    includeFolderIndexFile: true,
    useTitleFromFrontmatter: true
  }
};

const vitePressSidebarOptions = [genSidebarConfig("wiki")]

const vitePressOptions = {
  title: "NIOS Students",
  description: "Simple Guides made by NIOS Students for NIOS Students.",
  markdown: {
    math: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // Used this as reference: https://github.com/FOSSonTop/website/blob/main/docs/.vitepress/config.mts
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Contribute', link: "/contribute" },
      { text: 'Request Takedown', link: "/takedown" },
      { text: 'Typography', link: "/typography" },
      { text: 'Queries and Suggestions', link: "https://github.com/nios-students/docs/discussions" },
      {
        text: 'Wiki Navigation',
        items: [
          { text: 'Getting Started', link: '/home/start/' },
          { text: 'How To', link: '/home/how-to/' },
          { text: 'Chat Groups', link: '/wiki/chat/' }
        ],
      }
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/eunfcuvHud' },
      { icon: 'youtube', link: 'https://www.youtube.com/@NIOSUnofficial' },
      { icon: 'github', link: 'https://github.com/nios-students' }
    ],
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: [
      '/\S+@\S+\.\S+/'
    ],
    editLink: {
      pattern: ({ filePath }) => {
        const rest = filePath.split("/").slice(1).join("/")
        if (filePath.includes('wiki')) {
          return `https://github.dev/nios-students/docs/blob/contents/wiki/${rest}`
        } else if (filePath.includes('home')) {
          return `https://github.dev/nios-students/docs/blob/contents/home/${rest}`
        } else if (filePath.includes('contribute')) {
          return `https://github.dev/nios-students/helper_scripts/blob/main/md/contribute.md`
        } else if (filePath.includes('takedown')) {
          return `https://github.dev/nios-students/helper_scripts/blob/main/md/takedown.md`
        } else if (filePath.includes('typography')) {
          return `https://github.dev/nios-students/helper_scripts/blob/main/md/typography.md`
        } else {
          return `https://github.dev/nios-students/docs/blob/contents/${rest}`
        }
      }
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.3
          }
        }
      }
    }
  }
};

const config = defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
const configWithMermaid = withMermaid(config)

export default configWithMermaid

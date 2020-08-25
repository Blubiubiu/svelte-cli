const program = require('commander')
// 用户判断，是否执行
const inquirer = require('inquirer')
// 执行创建命令
const createProject = require('../src/create')

// 版本号
program.version(require('../package.json').version)
// 检验http | https | git开头
const urlRegExp = /(http|https|git)([\w]+\/?)\S*/
// 命令参数
const args = process.argv.slice(2)[0]
// 使用输入git链接方法
if (args) {
  if (urlRegExp.test(args)) {
    createProject(args)
  } else {
    console.log("\033[41;30m Error \033[40;37m 请输入正确的项目地址 \033[41;0m");
  }
} else {
  // 使用选择方式创建项目
  program
    .description('创建项目')
    .action(() => {
      const choices = ['svelte-template', 'svelte-next'];
      const questions = [{
        type: 'list',
        name: 'Project',
        message: '选择你要下载的项目',
        choices
      }]
      inquirer.prompt(questions)
        .then(answers => {
          switch (answers.Project) {
            case choices[0]:
              // template项目地址
              createProject('https://github.com/Blubiubiu/svelte-template.git')
              break;
            case choices[1]:
              // next项目地址
              // createProject('')
              console.log("\033[41;30m Error \033[40;37m 项目正在紧锣密鼓的开发中 \033[41;0m");
              break;
            default:
              break;
          }
        })
    })
}

// 定义用法
program.parse(process.argv)


const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const OraLoading = require('../utils/oraLoading');

/**
 * @desc 创建项目 
 * @param {string} [args] - 项目地址
 */
module.exports = function create (args) {
  inquirer.prompt([{
    type: 'input',
    message: '请输入项目名称',
    name: 'name',
    default: 'svelte-project'
  }]).then(answer => {
    const remote = args || 'https://github.com/Blubiubiu/svelte-template.git';
    const tarName = answer.name;

    fs.exists(tarName, function (exists) {
      if (exists) {
        console.log("\033[41;30m Error \033[40;37m 存在同名文件，为确保项目正常运行，请您更换项目名称 \033[41;0m");
        return
      }
    })

    let loader = OraLoading('Loading');

    shell.exec(`
        git clone ${remote} ${tarName} --depth=1 
        rm -rf ${tarName}/.git
    `, (error, stdout, stderr) => {
        if (error) {
          loader.fail(`exec error: ${error}`);
          return
        }
        loader.succeed('Download success');
      })
  })
}
/*
 * @Author: zihao.chen
 * @Date: 2021-02-23 10:58:39
 * @LastEditors: zihao.chen
 * @LastEditTime: 2021-02-23 11:03:18
 * @Description: 提交配置
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
        2,
        'always',
        [
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'test', // 增加测试
        'revert', // 回滚
        'config', // 构建过程或辅助工具的变动
        'chore', // 其他改动
        ],
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  }
}

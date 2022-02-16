---
title: Vscode快速设置文档
date: 2022-01-14
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-wq37kp-min.jpg
tags:
 - Vscode
categories: 
 - Vscode
---

::: tip 介绍
Vscode快速设置文档 涉及到settings和eslint<br>
:::

<!-- more -->

## 如何设置Vscode?

* 第一波找到左下角的齿轮

![image-20220114111717240](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220114111717240.png)

* 然后进入后在搜索框搜索settings 点击进入即可

![image-20220114111929918](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220114111929918.png)

## settings设置

* 这个是Vscode设置的`settings`保存后会根据`eslint`格式保存 很方便

```json
{
    "workbench.startupEditor": "newUntitledFile",
    "workbench.iconTheme": "vscode-icons",
    "window.menuBarVisibility": "default",
    "workbench.activityBar.visible": true,
    "liveServer.settings.port": 5500,
    "git.enabled": false,
    "vsicons.dontShowNewVersionMessage": true,
    "workbench.settings.useSplitJSON": true,
    "less.compile": {
        // "compress":  true,  // 是否删除多余空白字符
        // "sourceMap": true,  // 是否创建文件目录树，true的话会自动生成一个 .css.map 文件
        "outExt": ".wxss" // 输出文件的后缀,默认为.css
    },
    "editor.tokenColorCustomizations": {
        "comments": "#82e0aa", // 注释
    },
    "editor.tabSize": 2,
    "editor.mouseWheelZoom": true,
    "emmet.triggerExpansionOnTab": true,
    "emmet.showAbbreviationSuggestions": true,
    "emmet.showExpandedAbbreviation": "always",
    "emmet.includeLanguages": {
        "javascript": "html"
    },
    "workbench.colorTheme": "Default Dark+",
    "git.ignoreWindowsGit27Warning": true,
    // 每次保存的时候自动格式化 
    "editor.formatOnSave": true,
    // #每次保存的时候将代码按eslint格式进行修复
    // "eslint.autoFixOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "files.associations": {
        "*.vue": "vue"
    },
    "eslint.codeAction.showDocumentation": {
        "enable": false
    },
    // 关闭v-model检测
    "vetur.validation.template": false,
    // "eslint.run": "onType",
    // "eslint.options": {
    //     "extensions": [".js",".vue"]
    // },
    // "eslint.validate": [
    //    "html",
    //    "javascript",
    //    "vue"
    // ],
    // "vetur.format.defaultFormatter.js": "none",
    // "vetur.format.options.tabSize": 2,
    // "vetur.format.options.useTabs": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.scss": "prettier",
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false, //不加分号
            "singleQuote": true, //用单引号
            "trailingComma": "none",
            "bracketSpacing": true,
            "tabWidth": 2,
            "arrowParens": "avoid"
        },
        "js-beautify-html": {
            // "wrap_line_length": 250, //换行长度
            "wrap_attributes": "auto", //属性换行 force-aligned
            // "end_with_newline": false
        }
    },
    // 设置不同颜色括号
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": "active",
    // 设置颜色
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    // 底部菜单
    "workbench.statusBar.visible": true,
    "workbench.colorCustomizations": {
        "statusBar.background": "#1e1e1e",
        "statusBar.noFolderBackground": "#1e1e1e",
        "statusBar.debuggingBackground": "#1e1e1e"
    },
    "terminal.integrated.defaultProfile.windows": "C:\\WINDOWS\\System32\\cmd.exe (migrated)",
    "terminal.integrated.profiles.windows": {
        "PowerShell": {
            "source": "PowerShell",
            "icon": "terminal-powershell"
        },
        "Command Prompt": {
            "path": [
                "${env:windir}\\Sysnative\\cmd.exe",
                "${env:windir}\\System32\\cmd.exe"
            ],
            "args": [],
            "icon": "terminal-cmd"
        },
        "Git Bash": {
            "source": "Git Bash"
        },
        "Windows PowerShell": {
            "path": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
        },
        "C:\\WINDOWS\\System32\\cmd.exe (migrated)": {
            "path": "C:\\WINDOWS\\System32\\cmd.exe",
            "args": []
        }
    },
    "workbench.editor.showTabs": true,
    "workbench.editor.enablePreview": false,
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "terminal.integrated.tabs.enabled": true,
    "editor.cursorBlinking": "phase",
    "editor.cursorSmoothCaretAnimation": true,
    "editor.quickSuggestions": {
        "strings": true
    },
    "explorer.confirmDelete": false,
    "security.workspace.trust.untrustedFiles": "open",
    "[scss]": {
        "editor.defaultFormatter": "sibiraj-s.vscode-scss-formatter"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    }
}
```

## eslint设置

* 为了前端规范性 需要用到`eslint`设置

```js
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 30, // 单行最长
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    // 设置name时候自动转大小写  ["error", "PascalCase" | "kebab-case"]
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    // 'eqeqeq': ["error", "always", { "null": "ignore" }], // 全等双等 取消注释为全等
    'eqeqeq': 'off',
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': ['off', 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'always'], // 可以允许有函数前空格
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: true
    }],
    'array-bracket-spacing': [2, 'never'] // 不允许数组括号内的空格
  }
}
```

## 展示效果

![image-20220114111118349](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220114111118349.png)


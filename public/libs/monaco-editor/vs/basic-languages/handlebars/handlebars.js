/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 2.3.0(57af10ae0184db4e0f7f9a92ff972629c39ccb53)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/handlebars/handlebars', [
  'require',
  'exports',
  '../fillers/monaco-editor-core'
], function(e, t, n) {
  'use strict'
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.language = t.conf = void 0)
  var a = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
  ;(t.conf = {
    wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
    comments: { blockComment: ['{{!--', '--}}'] },
    brackets: [
      ['\x3c!--', '--\x3e'],
      ['<', '>'],
      ['{{', '}}'],
      ['{', '}'],
      ['(', ')']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    surroundingPairs: [
      { open: '<', close: '>' },
      { open: '"', close: '"' },
      { open: "'", close: "'" }
    ],
    onEnterRules: [
      {
        beforeText: new RegExp(
          '<(?!(?:' + a.join('|') + '))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$',
          'i'
        ),
        afterText: /^<\/(\w[\w\d]*)\s*>$/i,
        action: { indentAction: n.languages.IndentAction.IndentOutdent }
      },
      {
        beforeText: new RegExp(
          '<(?!(?:' + a.join('|') + '))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$',
          'i'
        ),
        action: { indentAction: n.languages.IndentAction.Indent }
      }
    ]
  }),
    (t.language = {
      defaultToken: '',
      tokenPostfix: '',
      tokenizer: {
        root: [
          [/\{\{!--/, 'comment.block.start.handlebars', '@commentBlock'],
          [/\{\{!/, 'comment.start.handlebars', '@comment'],
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.root' }
          ],
          [/<!DOCTYPE/, 'metatag.html', '@doctype'],
          [/<!--/, 'comment.html', '@commentHtml'],
          [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
          [
            /(<)(script)/,
            ['delimiter.html', { token: 'tag.html', next: '@script' }]
          ],
          [
            /(<)(style)/,
            ['delimiter.html', { token: 'tag.html', next: '@style' }]
          ],
          [
            /(<)([:\w]+)/,
            ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]
          ],
          [
            /(<\/)(\w+)/,
            ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]
          ],
          [/</, 'delimiter.html'],
          [/\{/, 'delimiter.html'],
          [/[^<{]+/]
        ],
        doctype: [
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }
          ],
          [/[^>]+/, 'metatag.content.html'],
          [/>/, 'metatag.html', '@pop']
        ],
        comment: [
          [/\}\}/, 'comment.end.handlebars', '@pop'],
          [/./, 'comment.content.handlebars']
        ],
        commentBlock: [
          [/--\}\}/, 'comment.block.end.handlebars', '@pop'],
          [/./, 'comment.content.handlebars']
        ],
        commentHtml: [
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }
          ],
          [/-->/, 'comment.html', '@pop'],
          [/[^-]+/, 'comment.content.html'],
          [/./, 'comment.content.html']
        ],
        otherTag: [
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.otherTag' }
          ],
          [/\/?>/, 'delimiter.html', '@pop'],
          [/"([^"]*)"/, 'attribute.value'],
          [/'([^']*)'/, 'attribute.value'],
          [/[\w\-]+/, 'attribute.name'],
          [/=/, 'delimiter'],
          [/[ \t\r\n]+/]
        ],
        script: [
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.script' }
          ],
          [/type/, 'attribute.name', '@scriptAfterType'],
          [/"([^"]*)"/, 'attribute.value'],
          [/'([^']*)'/, 'attribute.value'],
          [/[\w\-]+/, 'attribute.name'],
          [/=/, 'delimiter'],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@scriptEmbedded.text/javascript',
              nextEmbedded: 'text/javascript'
            }
          ],
          [/[ \t\r\n]+/],
          [
            /(<\/)(script\s*)(>)/,
            [
              'delimiter.html',
              'tag.html',
              { token: 'delimiter.html', next: '@pop' }
            ]
          ]
        ],
        scriptAfterType: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.scriptAfterType'
            }
          ],
          [/=/, 'delimiter', '@scriptAfterTypeEquals'],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@scriptEmbedded.text/javascript',
              nextEmbedded: 'text/javascript'
            }
          ],
          [/[ \t\r\n]+/],
          [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptAfterTypeEquals: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.scriptAfterTypeEquals'
            }
          ],
          [
            /"([^"]*)"/,
            { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }
          ],
          [
            /'([^']*)'/,
            { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }
          ],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@scriptEmbedded.text/javascript',
              nextEmbedded: 'text/javascript'
            }
          ],
          [/[ \t\r\n]+/],
          [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptWithCustomType: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.scriptWithCustomType.$S2'
            }
          ],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@scriptEmbedded.$S2',
              nextEmbedded: '$S2'
            }
          ],
          [/"([^"]*)"/, 'attribute.value'],
          [/'([^']*)'/, 'attribute.value'],
          [/[\w\-]+/, 'attribute.name'],
          [/=/, 'delimiter'],
          [/[ \t\r\n]+/],
          [/<\/script\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        scriptEmbedded: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInEmbeddedState.scriptEmbedded.$S2',
              nextEmbedded: '@pop'
            }
          ],
          [
            /<\/script/,
            { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }
          ]
        ],
        style: [
          [
            /\{\{/,
            { token: '@rematch', switchTo: '@handlebarsInSimpleState.style' }
          ],
          [/type/, 'attribute.name', '@styleAfterType'],
          [/"([^"]*)"/, 'attribute.value'],
          [/'([^']*)'/, 'attribute.value'],
          [/[\w\-]+/, 'attribute.name'],
          [/=/, 'delimiter'],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@styleEmbedded.text/css',
              nextEmbedded: 'text/css'
            }
          ],
          [/[ \t\r\n]+/],
          [
            /(<\/)(style\s*)(>)/,
            [
              'delimiter.html',
              'tag.html',
              { token: 'delimiter.html', next: '@pop' }
            ]
          ]
        ],
        styleAfterType: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.styleAfterType'
            }
          ],
          [/=/, 'delimiter', '@styleAfterTypeEquals'],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@styleEmbedded.text/css',
              nextEmbedded: 'text/css'
            }
          ],
          [/[ \t\r\n]+/],
          [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleAfterTypeEquals: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.styleAfterTypeEquals'
            }
          ],
          [
            /"([^"]*)"/,
            { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }
          ],
          [
            /'([^']*)'/,
            { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' }
          ],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@styleEmbedded.text/css',
              nextEmbedded: 'text/css'
            }
          ],
          [/[ \t\r\n]+/],
          [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleWithCustomType: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInSimpleState.styleWithCustomType.$S2'
            }
          ],
          [
            />/,
            {
              token: 'delimiter.html',
              next: '@styleEmbedded.$S2',
              nextEmbedded: '$S2'
            }
          ],
          [/"([^"]*)"/, 'attribute.value'],
          [/'([^']*)'/, 'attribute.value'],
          [/[\w\-]+/, 'attribute.name'],
          [/=/, 'delimiter'],
          [/[ \t\r\n]+/],
          [/<\/style\s*>/, { token: '@rematch', next: '@pop' }]
        ],
        styleEmbedded: [
          [
            /\{\{/,
            {
              token: '@rematch',
              switchTo: '@handlebarsInEmbeddedState.styleEmbedded.$S2',
              nextEmbedded: '@pop'
            }
          ],
          [
            /<\/style/,
            { token: '@rematch', next: '@pop', nextEmbedded: '@pop' }
          ]
        ],
        handlebarsInSimpleState: [
          [/\{\{\{?/, 'delimiter.handlebars'],
          [/\}\}\}?/, { token: 'delimiter.handlebars', switchTo: '@$S2.$S3' }],
          { include: 'handlebarsRoot' }
        ],
        handlebarsInEmbeddedState: [
          [/\{\{\{?/, 'delimiter.handlebars'],
          [
            /\}\}\}?/,
            {
              token: 'delimiter.handlebars',
              switchTo: '@$S2.$S3',
              nextEmbedded: '$S3'
            }
          ],
          { include: 'handlebarsRoot' }
        ],
        handlebarsRoot: [
          [/"[^"]*"/, 'string.handlebars'],
          [/[#/][^\s}]+/, 'keyword.helper.handlebars'],
          [/else\b/, 'keyword.helper.handlebars'],
          [/[\s]+/],
          [/[^}]/, 'variable.parameter.handlebars']
        ]
      }
    })
})

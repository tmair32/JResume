module.exports = {
  extends: '@antfu',
  rules: {
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'TWO_WAY_BINDING',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/static-class-names-order': 'error',
  },
}

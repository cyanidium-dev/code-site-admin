import {defineField, defineType, Rule, defineArrayMember} from 'sanity'

const languages = [
  {id: 'uk', title: 'Українська'},
  {id: 'en', title: 'English'},
  {id: 'ru', title: 'Русский'},
]

export default defineType({
  name: 'post',
  title: 'Пост блогу',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: languages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        validation: (rule: Rule) => rule.required(),
      })),
    }),
    defineField({
      name: 'slug',
      title: 'Слаг',
      type: 'slug',
      options: {
        source: 'title.uk',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Основне зображення',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Альтернативний текст',
          type: 'string',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: languages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'string',
        validation: (rule: Rule) => rule.required(),
      })),
    }),
    defineField({
      name: 'content',
      title: 'Основний контент',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: languages.map((lang) => ({
        title: lang.title,
        name: lang.id,
        type: 'array',
        of: [
          defineArrayMember({
            type: 'block',
            styles: [
              {title: 'Звичайний текст', value: 'normal'},
              {title: 'Заголовок H2', value: 'h2'},
              {title: 'Заголовок H3', value: 'h3'},
            ],
            lists: [
              {title: 'Нумерований список', value: 'number'},
              {title: 'Маркерований список', value: 'bullet'},
            ],
            marks: {
              decorators: [
                {title: 'Жирний', value: 'strong'},
                {title: 'Курсив', value: 'em'},
                {title: 'Закреслений', value: 'strike-through'},
              ],
              annotations: [],
            },
          }),
          defineArrayMember({
            type: 'image',
            options: {hotspot: true},
            fields: [
              {
                name: 'alt',
                title: 'Альтернативний текст',
                type: 'string',
              },
            ],
          }),
        ],
        validation: (rule: Rule) => rule.required(),
      })),
    }),
  ],
  preview: {
    select: {
      title: 'title.uk',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'За датою створення (спочатку нові)',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})

import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    
    // Título
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),

    // Data de Publicação
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    // Trecho/Resumo
    defineField({
      name: 'excerpt',
      title: 'Trecho/Resumo',
      type: 'text',
      rows: 3,
    }),

    // Imagem Principal
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Imagens adicionais
    defineField({
      name: 'additionalImages',
      title: 'Imagens Adicionais',
      description: 'Adicione plantas, diagramas e outras imagens para complementar o artigo',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
              description: 'Descrição da imagem (ex: "Planta baixa do térreo")',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              description: 'Importante para acessibilidade e SEO',
            },
            {
              name: 'imageType',
              title: 'Tipo de Imagem',
              type: 'string',
              options: {
                list: [
                  {title: 'Fotografia', value: 'photo'},
                  {title: 'Planta', value: 'floorplan'},
                  {title: 'Diagrama', value: 'diagram'},
                  {title: 'Render', value: 'render'},
                  {title: 'Detalhe', value: 'detail'},
                  {title: 'Outro', value: 'other'},
                ],
              },
            }
          ]
        }
      ],
    }),

    // Seções da Galeria
    defineField({
      name: 'galleries',
      title: 'Galerias de Imagens',
      description: 'Crie seções de galeria para organizar as imagens por tema',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'gallery',
          title: 'Galeria',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título da Galeria',
            },
            {
              name: 'images',
              type: 'array',
              title: 'Imagens',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Legenda',
                    },
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Texto alternativo',
                    }
                  ]
                }
              ]
            },
            {
              name: 'description',
              type: 'text',
              title: 'Descrição da Galeria',
              rows: 2,
            }
          ]
        }
      ]
    }),

    // Links Externos
    defineField({
      name: 'externalLinks',
      title: 'Links Externos',
      description: 'Adicione links para pastas no Google Drive, projetos relacionados, etc.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título do Link',
              description: 'Ex: "Pasta com plantas detalhadas" ou "Documentos históricos"',
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (rule) => rule.required().uri({
                scheme: ['http', 'https', 'mailto', 'tel']
              }),
            },
            {
              name: 'linkType',
              title: 'Tipo de Link',
              type: 'string',
              options: {
                list: [
                  {title: 'Google Drive', value: 'gdrive'},
                  {title: 'Documento', value: 'document'},
                  {title: 'Vídeo', value: 'video'},
                  {title: 'Website', value: 'website'},
                  {title: 'Outro', value: 'other'},
                ],
              },
            }
          ]
        }
      ]
    }),

    // Categorias
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),

    // Autoria
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),

    // Corpo do Texto
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
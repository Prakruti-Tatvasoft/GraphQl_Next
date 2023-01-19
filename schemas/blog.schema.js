import * as Yup from 'yup';

const blogSchema =Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required()
})
export { blogSchema }
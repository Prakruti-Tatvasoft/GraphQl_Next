import { EDIT_BLOG, GET_ALL_BLOGS, GET_BLOG_DETAIL } from '@/queries'
import { blogSchema } from '@/schemas/blog.schema'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { Formik, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const EditBlog = () => {

    const router = useRouter()
    const [blogId, setBlogId] = useState("")

    const { loading, data } = useQuery(GET_BLOG_DETAIL, {
        variables: {
            blogId: blogId
        }
    })

    useEffect(() => {
        if (router.isReady) setBlogId(router?.query?.blogId)
    }, [router.isReady])
    
    const [editBlog] = useMutation(EDIT_BLOG);

    let initialValues = {
        title:data?.getBlogDetail?.title ?? null,
        description: data?.getBlogDetail?.description ?? null,
        category: ''
    }

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue
    } = useFormik({
        initialValues,
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            await editBlog({
                variables: {
                    blogTitle: values.title,
                    blogDesc: values.description,
                    blogCategory: values.category,
                    blogId: blogId
                }
            })
            router.push('/')
        }
    })

    useEffect(() => {
        setFieldValue("title", data?.getBlogDetail.title)
        setFieldValue("description", data?.getBlogDetail.description)
        setFieldValue("category", data?.getBlogDetail.category)
    }, [data?.getBlogDetail])    

    return (
        <>
            {loading ? <h1>Loading....</h1> :
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Edit Blog
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoFocus
                                onChange={handleChange}
                                value={values.title}
                                error={Boolean(errors.title) && touched.title}
                                helperText={touched.title ? errors.title : ''}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="category"
                                label="Category"
                                name="category"
                                onChange={handleChange}
                                value={values.category}
                                error={Boolean(errors.category) && touched.category}
                                helperText={touched.category ? errors.category : ''}

                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                multiline
                                rows={5}
                                onChange={handleChange}
                                value={values.description}
                                error={Boolean(errors.description) && touched.description}
                                helperText={touched.description ? errors.description : ''}

                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Edit Blog
                            </Button>
                        </form>
                    </Box>
                </Container>
            }
        </>
    )
}

export default EditBlog

import { Box, Button, Container, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import { blogSchema } from '@/schemas/blog.schema'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ADD_BLOG } from '@/queries'


const Blog = () => {

    const router = useRouter()

    const initialValues = {
        title: '',
        description: '',
        category: ''
    }

    const [addBlog] = useMutation(ADD_BLOG);

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange
    } = useFormik({
        initialValues,
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            await addBlog({
                variables: {
                    blogTitle: values.title,
                    blogDesc: values.description,
                    blogCategory: values.category
                }
            })
            router.push('/')
        }
    })

    return (
        <div>
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
                        Add Blog
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
                            Add Blog
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    )
}

export default Blog

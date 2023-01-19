import { DELETE_BLOG, GET_ALL_BLOGS } from '@/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@mui/material'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter()
  const { data, loading, error } = useQuery(GET_ALL_BLOGS)

  const [deleteBlog] = useMutation(DELETE_BLOG);
  const handleSubmit = async (id) => {
    await deleteBlog({
      variables: {
        blogId: id
      }
    })
    router.push('/')
  }

  return (
    <>
      <Button
        href='/blog'
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Blog
      </Button>
      {
        loading ? <h1>Loading....</h1> :
          data?.getBlogs.map((blog) => {
            return (
              <div key={blog.id}  style={{ padding: '10px', border: '1px solid black' }}>
                  <Link href={`blog/${blog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div>
                      <p>{blog.title}</p>
                      <p>{blog.description}</p>
                      <p>{blog.category}</p>
                    </div>
                  </Link>
                  <Button
                    href={`/edit-blog/${blog.id}`}
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                  >
                    Edit Blog
                  </Button>
                  <Button
                    onClick={() => handleSubmit(blog.id)}
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Delete Blog
                  </Button>
              </div>
            )
          })
      }
    </>
  )
}

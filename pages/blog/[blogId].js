import { GET_BLOG_DETAIL } from '@/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

const BlogDetail = () => {

    const router = useRouter()
    const { data, error, loading } = useQuery(GET_BLOG_DETAIL, {
        variables: {
            blogId: router.query.blogId
        }
    })

    if (loading) return <h2>Loading....</h2>
    if (error) return <p>{error}</p>

    const blog = data?.getBlogDetail

    return (
        <div>
            <h1>Blog details</h1>
            <p>{blog.title}</p>
            <p>{blog.description}</p>
            <p>{blog.category}</p>
        </div>
    )
}

export default BlogDetail

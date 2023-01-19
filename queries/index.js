import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
query GetBlogs {
    getBlogs {
        title
        description
        category
        id
    }
  }
`

export const ADD_BLOG = gql`
mutation AddBlog($blogTitle: String!, $blogCategory: String!, $blogDesc: String!){
    addBlog(title: $blogTitle, category: $blogCategory, description: $blogDesc) {
      title
      id
      description
    }
}
`

export const GET_BLOG_DETAIL = gql`
query ($blogId: ID!) {
    getBlogDetail(id: $blogId) {
      title,
      description,
      id,
      category
    }
}
`

export const EDIT_BLOG = gql`
mutation UpdateBlog($blogTitle: String!, $blogCategory: String!, $blogDesc: String!, $blogId: ID!){
  updateBlog(title: $blogTitle, category: $blogCategory, description: $blogDesc, id: $blogId) {
    title
    id
    description
  }
}
`

export const DELETE_BLOG = gql`
mutation DeleteBlog($blogId: ID!) {
  deleteBlog(id: $blogId) 
}
`
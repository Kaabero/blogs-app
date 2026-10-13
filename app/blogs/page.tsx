import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <strong>{blog.title}</strong>
            <br />
            Author: {blog.author} 
            <br />
            URL: <a href={blog.url} >
              {blog.url}
              </a>
            <br />
            Likes: {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
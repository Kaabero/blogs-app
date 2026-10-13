const blogs = [
   {
      id: 1,
      title: 'Types and Tests',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2017/01/13/TypesAndTests.html',
      likes: 3,
    },
     {
      id: 2,
      title: 'The Cycles of TDD',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html',
      likes: 2,
    }
]




let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}
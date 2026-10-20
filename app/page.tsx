const Home = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs app</h2>
      <p className="mt-3 break-words text-sm text-slate-600">
       An application for the{" "}
        <a
          className="link"
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
        >
          Full Stack Open Next.js
        </a>
        {" "}course.
      </p>        
      </div>
    </div>
  )
}
export default Home
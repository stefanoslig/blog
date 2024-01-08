type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="prose md:prose-xl lg:prose-xxl xl:prose-xxl max-w-screen-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody

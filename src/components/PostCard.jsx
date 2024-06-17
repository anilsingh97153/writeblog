/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config.js"

function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} 
            className='h-[300px] w-[100%] object-cover'
            />
        </div>
        <h3 className='text-lg font-semibold'>{title}</h3>
    </Link>
  )
}

export default PostCard

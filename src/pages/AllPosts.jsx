import {useState, useEffect} from 'react';
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts) {
                setPosts(posts.documents);
            }
        });
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap gap-4 justify-center items-center'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-3 w-[100%] xs:w-1/2 md:w-1/3 lg:w:1/4 shadow-md rounded-md'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config"

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        console.log('delete btn clicked');
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 flex items-center justify-start">
            <Container className=" md:w-1/2">
                <div className="w-full flex justify-start items-center mb-4 relative p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="h-[400px] w-[100%] object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-black" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <span onClick={deletePost}><Button bgColor="bg-red-500 hover:bg-black">
                                Delete
                            </Button></span>
                        </div>
                    )}
                </div>
                <div className="mb-6 px-2">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css px-2">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

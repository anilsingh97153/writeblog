/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import loader from "../../assets/images/loader.svg"

// to continuously monitor a field, we can watch field with useForm

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setIsLoading(true)
    // if there is already a post, means, we are in just editing a post
    // react allows users to directly upload the data, example the image
    if (post) {
      // upload from user, upload in the database
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      // delete the old image, if image is uplaoded by user in the editor
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      // updation in post on UI now
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // TODO: improvement as done in if statement above
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setIsLoading(false);
  };
  // watch the title field, and generate the slug accordingly - if found space between the words, replace by hyphens.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    // cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    isLoading ? (<img src={loader} alt="loader" className="w-20 h-20 object-contain m-auto"/> ) : 
    ( <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    {/* Left part of the form */}
    <div className="w-2/3 px-2">
      <Input
        label="Title :"
        placeholder="Title"
        className="mb-4"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug :"
        placeholder="Slug"
        className="mb-4"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>
    {/* Right part of the form */}
    <div className="w-1/3 px-2 flex flex-col justify-start items-start gap-2">
      <Input
        label="Upload image:"
        type="file"
        className=""
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />
      {post && (
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg h-[500px] w-[100%] object-cover"
          />
        </div>
      )}
      <Select
        options={["active", "inactive"]}
        label="Status:"
        className="mb-4"
        {...register("status", { required: true })}
      />
      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full hover:bg-slate-950 hover:shadow-xl max-sm:w-[80%]"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  </form> )
  );
};

export default PostForm;

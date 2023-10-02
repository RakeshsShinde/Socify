import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostsByTagNLocation } from '../actions/postActions';

const Posts = () => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const location = params.get('location');
    const { results, loading } = useSelector((state) => state.PostsByTagNLocation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsByTagNLocation({ tag, location }));
    }, [tag, location, dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="container mx-auto flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-2/3 mx-[auto]">
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex justify-center">
                        <div className="flex items-center ">
                            <img
                                src={results?.coverImage?.secure_url}
                                alt="Profile"
                                className="w-20 h-20 rounded-full"
                            />
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold">{results?.title}</h1>
                                <p className="text-gray-500">{results?.totalPosts} posts</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-[20px] min-w-[900px] min-h-[500px] bg-white">
                        {results?.posts?.map((post, index) => (
                            <div key={index}>
                                <Link to={`/view/singlePost/${post._id}`}>
                                    <div className="relative bg-slate-400 h-[250px] rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
                                        <img
                                            src={post.images[0].secure_url}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-full  object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 text-white flex flex-col justify-center text-center opacity-0 transform translateY-full hover:opacity-100 hover:translateY-0 transition-opacity duration-300">
                                            <Box className='flex gap-[35px] p-[10px 25px] w-full justify-center items-center'>
                                                <Stack direction={'row'} className='flex gap-[4px] items-center'>
                                                    <AiOutlineHeart size={30} />
                                                    <span>{post.likes?.length}</span>
                                                </Stack>
                                                <Stack direction={'row'} className='flex gap-[4px] items-center'>
                                                    <FaRegComment size={30} />
                                                    <span>{post.comments?.length}</span>
                                                </Stack>
                                                <Stack direction={'row'} className='flex gap-[4px] items-center'>
                                                    <AiOutlineSave size={30} />
                                                    <span>{post.saveBy?.length}</span>
                                                </Stack>
                                            </Box>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;

import React, { useEffect } from 'react';

import { loadData, selectIsLoading } from './postSlice.js';
import Post from '../components/Post.js';
import { useSelector } from 'react-redux';
import { selectData } from './postSlice.js';
import { useDispatch } from 'react-redux';

export const PostList = () => {
    const posts = useSelector(selectData)
    const postsLoading = useSelector(selectIsLoading)

    console.log(posts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadData())
    }, [])


    return (
        <div>
            {posts.posts.map(post => <p>{post}</p>)}
        </div>
    )

}

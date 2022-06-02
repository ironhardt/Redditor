import React, { useEffect } from 'react';

import { loadData, selectIsLoading, selectPageAfter } from './postSlice.js';
import Post from '../components/Post.js';
import { useSelector } from 'react-redux';
import { selectData } from './postSlice.js';
import { useDispatch } from 'react-redux';

export const PostList = () => {
    const postList = useSelector(selectData)
    const postsLoading = useSelector(selectIsLoading)
    const pageAfter = useSelector(selectPageAfter)
    const postTitles = postList.posts.map(post => post.data.title)


    const dispatch = useDispatch()

    let page = {
        sub: 'javascript',
        division: 'hot',
        after: ''
    }

    const onFirstRender = () => {
        dispatch(loadData(page))
    }
    useEffect(onFirstRender, [])


    const handleEndScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            page.after = pageAfter
            dispatch(loadData(page))
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleEndScroll)
        console.log(postTitles.length)
    }, [postList])



    return (
        <div>
            {postTitles.map(post => <p>{post}</p>)}
        </div>
    )

}

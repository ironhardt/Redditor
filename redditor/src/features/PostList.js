import React, { useEffect, useRef } from 'react';

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
    console.log(pageAfter)

    const dispatch = useDispatch()


    let page = {
        sub: 'wow',
        listing: 'hot',
        after: ''
    }

    const scrollRef = useRef(false)
    const afterRef = useRef(pageAfter)

    const handleEndScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (scrollRef.current) return
            page.after = afterRef.current
            console.log(page.after)
            dispatch(loadData(page))
            scrollRef.current = true
            setTimeout(() => scrollRef.current = false, 500)
        }
    }

    useEffect(() => {
        afterRef.current = pageAfter
    }, [pageAfter])



    const executedRef = useRef(false);

    useEffect(() => {
        document.addEventListener('scroll', handleEndScroll)
        if (executedRef.current) return
        dispatch(loadData(page))
        executedRef.current = true
        return () => {
            document.removeEventListener('scroll', handleEndScroll)
        }
    }, [])



    return (
        <div>
            {postTitles.map(post => <p>{post}</p>)}
        </div>
    )

}

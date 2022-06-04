import React, { useEffect, useRef } from 'react';

import { loadData, selectPageAfter } from './postSlice.js';
import Post from '../components/Post.js';
import { useSelector } from 'react-redux';
import { selectData } from './postSlice.js';
import { useDispatch } from 'react-redux';

export const PostList = () => {
    const postList = useSelector(selectData)
    const pageAfter = useSelector(selectPageAfter)
    const posts = postList.posts.map(post => post.data.title)

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

    const sortPosts = postList.posts.map((post, index) => {
        const { title, is_self, selftext, url, post_hint } = post.data
        let content = null

        if (is_self) {
            content = selftext
        } else {
            switch (post_hint) {
                case 'image':
                    content = <img src={url} />
                    break;
                case 'link':
                    content = <a href={url}>{url}</a>
                    break;
                default:
                    break;
            }
        }

        return (
            <Post
                key={index}
                title={title}
                content={content}
            />
        )
    })

    return (
        <div>
            {sortPosts}
        </div>
    )

}

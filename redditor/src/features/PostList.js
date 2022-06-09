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

    const createMarkup = source => {
        if (source.includes('iframe') && !source.includes('https://www.youtube.com/')) {
            return null
        }
        return { __html: source }
    }

    const sortPosts = postList.posts.map((post, index) => {
        const { title, is_self, selftext_html, url, post_hint, secure_media, author, score, num_comments, permalink } = post.data
        let content = null

        if (is_self) {
            content = <div dangerouslySetInnerHTML={createMarkup(selftext_html)}></div>
        } else {
            switch (post_hint) {
                case 'image':
                    content = <img src={url} />
                    break;
                case 'hosted:video':
                    content = (
                        <video loop muted preload="auto" controls>
                            <source src={secure_media.reddit_video.fallback_url} />
                        </video>)
                    break;
                case 'rich:video':


                    content = <div dangerouslySetInnerHTML={createMarkup(secure_media.oembed.html)}></div>
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
                author={author}
                score={score}
                num_comments={num_comments}
                comments={permalink}
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

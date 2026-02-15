import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchComments, addComment } from "../store/slices/commentSlice";
import { deletePost } from "../store/slices/exhibitSlices";
import { incrementCommentCount } from "../store/slices/exhibitSlices";
import type { User } from '../store/slices/userSlice'

import PostUI from "./PostUI";

interface Props {
    item: {
        id: number;
        createdAt: string;
        imageUrl: string;
        description: string;
        commentCount: number;
        user: User
    };
}

const Post = ({ item }: Props) => {
    const dispatch = useAppDispatch();

    const comments = useAppSelector(
        (state) => state.comments.commentsByPostId[item.id]
    );

    const user = useAppSelector((state) => state.user.user);

    const safeComments = comments ?? [];

    const [isOpen, setIsOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [addCommentError, setAddCommentError] = useState<string | null>(null);


    const handleComments = async (id: number) => {
        setIsOpen((prev) => !prev);

        if (!comments || comments.length === 0) {
            setIsLoadingComments(true);
            setFetchError(null); // Clear previous errors

            try {
                await dispatch(fetchComments(id)).unwrap();
            } catch (error) {
                console.error('Failed to fetch comments:', error);
                setFetchError('Failed to load comments. Please try again.');
            } finally {
                setIsLoadingComments(false);
            }
        }
    };

    const handleDeletePost = (id: number) => {
        try {
            const res = dispatch(deletePost(id)).unwrap()
            console.log(res);
        } catch (error) {
            console.log('Error: ' + error);
        }

    }

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setAddCommentError(null); // Clear previous errors
        try {
            await dispatch(addComment({ postId: item.id, text: newComment })).unwrap();
            dispatch(incrementCommentCount(item.id));
            setNewComment("");
        } catch (error) {
            console.log("Failed to add comment:", error);
            setAddCommentError('Failed to add comment. Please try again.');
        }
    };

    return (
        <PostUI
            item={item}
            onShowComments={handleComments}
            handleDeletePost={handleDeletePost}
            comments={isOpen ? safeComments : []}
            user={user}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            isLoadingComments={isLoadingComments}
            fetchError={fetchError}
            addCommentError={addCommentError}
        />
    );
};

export default Post;
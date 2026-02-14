import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchComments, addComment } from "../store/slices/commentSlice";
import { deletePost } from "../store/slices/exhibitSlices";
import type { User } from "../store/slices/exhibitSlices";

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

    const handleComments = (id: number) => {
        setIsOpen((prev) => !prev);

        if (!comments || comments.length === 0) {
            dispatch(fetchComments(id));
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

        try {
            await dispatch(addComment({ postId: item.id, text: newComment })).unwrap();
            setNewComment("");
        } catch (error) {
            console.log("Failed to add comment:", error);
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
        />
    );
};

export default Post;
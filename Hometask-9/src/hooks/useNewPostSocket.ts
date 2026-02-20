import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useAppDispatch } from "../store/hooks";
import { sendPost } from "../store/slices/exhibitSlices";

export function useNewPostSocket() {
    const socket = useSocket();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket) return;

        socket.on("newPost", (post) => {
            console.log("📡 New post received:", post);
            dispatch(sendPost(post));
        });

        return () => {
            socket.off("newPost");
        };
    }, [socket, dispatch]);
}
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useInfiniteScroll = ({ listState, fetchThunk, resetAction }) => {
    const dispatch = useDispatch();
    const { items, loading, error, page, hasMore } = listState; 
    
    const observer = useRef();

    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                if (typeof page === 'number' && !isNaN(page) && page > 0) {
                    dispatch(fetchThunk({ page, limit: 10 }));
                } else {
                    console.error("Lỗi Infinite Scroll: Số trang không hợp lệ:", page);
                }
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore, page, dispatch, fetchThunk, items.length]); 

    useEffect(() => {
        return () => {
            if (resetAction) {
                dispatch(resetAction());
            }
        }
    }, [dispatch, resetAction]); 

    useEffect(() => {
        if (items.length === 0 && !loading && hasMore) {
             dispatch(fetchThunk({ page: 1, limit: 10 }));
        }
    }, [items.length, loading, hasMore, dispatch, fetchThunk]);

    return { items, loading, error, hasMore, lastElementRef };
};
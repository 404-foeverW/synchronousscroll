import { debounce, throttle } from '@/utils/common';
import { ref } from 'vue';

export function userScroll() {
    const scrollEl = ref([]);
    const scroll_time = ref(0);
    const targetEl = ref(null);
	const scrollTop = ref(0);
    let scrollFuncThrottle = throttle(handleScroll, scroll_time, true);
    let scrollClearDebounce = debounce(clearTargetEl, scroll_time);
    let isSyncing = false;
    
    function addScrollEl(el) {
        scrollEl.value = [...scrollEl.value, ...el];
    }

    function clearScroll() {
        scrollEl.value = [];
        clearTargetEl();
    }

    function clearTargetEl() {
        targetEl.value = null;
    }

    function initScroll(el, time) {
        addScrollEl(el);
        scroll_time.value = time || 16;
    }

    function onScroll(e) {
        if(isSyncing) return;
        targetEl.value = e.target;
        scrollFuncThrottle(e)
    }

    function handleScroll(e) {
        isSyncing = true;
        try {
            if (scrollEl.value.length) {
                scrollEl.value.forEach(el => {
                    if(el.value !== targetEl.value) {
						scrollTop.value = e.target.scrollTop;
                    }
                })
            }
        } finally {
            Promise.resolve().then(() => {
                isSyncing = false;
            })
            scrollClearDebounce();
        }
    }
    return {
        clearScroll,
        initScroll,
        onScroll,
		scrollTop
    }
}
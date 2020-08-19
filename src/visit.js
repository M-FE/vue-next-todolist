/**
 * 实在不知道怎么把composition api加入到一个简单的todo list里面
 * 就写一个简单的监听访问当前页面的次数（刷新次数）和当前鼠标点击的次数
 */
import { onMounted, ref, onUnmounted } from 'vue';

export default () => {
    const visitCount = (localStorage.getItem('visit') || 1) * 1 + 1;
    const clickCount = ref(0);

    localStorage.setItem('visit', visitCount);

    const handleClick = () => {
        clickCount.value++;
    }

    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });

    return {
        visitCount,
        clickCount
    }
}

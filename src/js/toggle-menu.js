
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // 初始化状态
    const init = () => {
        // 检查本地存储状态
        const savedState = localStorage.getItem('navExpanded');
        if (savedState) {
            navLinks.classList.toggle('active', savedState === 'false');
            navToggle.setAttribute('aria-expanded', savedState);
        }
    };

    function toggleNav() {
        const isActive = navLinks.classList.toggle('active');
        const blurOverlay = document.getElementById('blur-overlay');

        // 同步模糊层状态
        blurOverlay.style.opacity = isActive ? '1' : '0';
        blurOverlay.style.pointerEvents = isActive ? 'auto' : 'none';
    }

    // 点击按钮切换
    navToggle.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止事件冒泡
        toggleNav();
    });

    // 点击模糊层关闭导航
    const blurOverlay = document.getElementById('blur-overlay');
        blurOverlay.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
    });

    // 点击链接切换
    navToggle.addEventListener('click', (e) => {
        // 检查点击目标是否为 <a> 标签或其子元素
        const clickedLink = e.target.closest('a');
        if (clickedLink) {
            toggleNav(); // 关闭导航
            // 不需要阻止默认行为，链接会正常跳转
        }
    });

    // 点击外部区域关闭
    document.addEventListener('click', (e) => {
        // 检查点击目标是否在导航内
        const isNavLink = navLinks.contains(e.target);
        const isNavToggle = navToggle.contains(e.target);
        if (!isNavLink && !isNavToggle) {
            navLinks.classList.remove('active');
            //navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');

            const blurOverlay = document.getElementById('blur-overlay');

            // 同步模糊层状态
            blurOverlay.style.opacity = '0';
            blurOverlay.style.pointerEvents = 'none';
        }
    });

    // 初始化
    init();
});

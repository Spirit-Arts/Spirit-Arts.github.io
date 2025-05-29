const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

// Chỉ cho phép tìm kiếm các mục sau (bỏ Home)
const allowedMenus = [
    { icon: 'bx-store-alt', text: 'Game' },
    { icon: 'bx-message-square-dots', text: 'Fanpage' },
    { icon: 'bx-group', text: 'Group' },
    { icon: 'bx-store-alt', text: 'Pokemon ChiBi H5' } // Chỉ mục Game cho Pokemon ChiBi H5
];

searchBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn reload trang

    if (window.innerWidth < 576) {
        // Nếu form chưa mở thì chỉ mở form
        if (!searchForm.classList.contains('show')) {
            searchForm.classList.add('show');
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
            searchInput.focus();
            return;
        }
        // Nếu form đã mở thì thực hiện tìm kiếm
        searchForm.classList.remove('show');
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
    }

    // Xử lý tìm kiếm (dùng cho cả mobile và desktop)
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    const found = allowedMenus.find(menu =>
        menu.text.toLowerCase().includes(keyword)
    );

    if (found) {
        const menuItem = Array.from(menuItems).find(li =>
            li.querySelector(`i.${found.icon}`)
        );
        if (menuItem) {
            menuItems.forEach(i => i.classList.remove('active'));
            menuItem.classList.add('active');
            hideAllMain();
            if (menuItem.querySelector('i.bxs-dashboard')) {
                homeMain && (homeMain.style.display = 'block');
            }
            if (menuItem.querySelector('i.bx-group')) {
                groupMain && (groupMain.style.display = 'block');
            }
            if (menuItem.querySelector('i.bx-store-alt')) {
                gameMain && (gameMain.style.display = 'block');
            }
            if (menuItem.querySelector('i.bx-message-square-dots')) {
                fanpageMain && (fanpageMain.style.display = 'block');
            }
        }
    } else {
        alert('Không tìm thấy mục phù hợp!');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.side-menu li');
    const homeMain = document.getElementById('home-main');
    const groupMain = document.getElementById('group-main');
    const gameMain = document.getElementById('game-main');
    const fanpageMain = document.getElementById('fanpage-main');
    const napMain = document.getElementById('nap-main');
    const searchBtn = document.querySelector('.search-btn');
    const searchBtnIcon = document.querySelector('.search-btn .bx');
    const searchForm = document.querySelector('.content nav form');
    const searchInput = document.querySelector('.content nav form .form-input input[type="search"]');

    // Chỉ cho phép tìm kiếm các mục sau (bỏ Home)
    const allowedMenus = [
        { icon: 'bx-store-alt', text: 'Game' },
        { icon: 'bx-message-square-dots', text: 'Fanpage' },
        { icon: 'bx-group', text: 'Group' },
        { icon: 'bx-store-alt', text: 'Pokemon ChiBi H5' }
    ];

    function hideAllMain() {
        homeMain && (homeMain.style.display = 'none');
        groupMain && (groupMain.style.display = 'none');
        gameMain && (gameMain.style.display = 'none');
        fanpageMain && (fanpageMain.style.display = 'none');
        napMain && (napMain.style.display = 'none');
    }

    menuItems.forEach((item) => {
        item.addEventListener('click', function (e) {
            hideAllMain();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            if (this.querySelector('i.bxs-dashboard')) {
                homeMain && (homeMain.style.display = 'block');
            }
            if (this.querySelector('i.bx-group')) {
                groupMain && (groupMain.style.display = 'block');
            }
            if (this.querySelector('i.bx-store-alt')) {
                gameMain && (gameMain.style.display = 'block');
            }
            if (this.querySelector('i.bx-message-square-dots')) {
                fanpageMain && (fanpageMain.style.display = 'block');
            }
            if (this.querySelector('i.bx-analyse')) {
                napMain && (napMain.style.display = 'block');
            }
        });
    });

    // Hiển thị Home mặc định khi load trang
    hideAllMain();
    homeMain && (homeMain.style.display = 'block');

    // Xử lý chuyển đổi giữa 2 game
    const game1Btn = document.getElementById('game1-btn');
    const game2Btn = document.getElementById('game2-btn');
    const game1Content = document.getElementById('game1-content');
    const game2Content = document.getElementById('game2-content');

    if (game1Btn && game2Btn && game1Content && game2Content) {
        game1Btn.addEventListener('click', function () {
            game1Content.style.display = 'block';
            game2Content.style.display = 'none';
        });
        game2Btn.addEventListener('click', function () {
            game1Content.style.display = 'none';
            game2Content.style.display = 'block';
        });
        // Hiển thị mặc định game 1
        game1Content.style.display = 'block';
        game2Content.style.display = 'none';
    }

    // Giữ lại phần xử lý 2 nút chọn game như cũ
    const gameOnlineBtn = document.getElementById('game-online-btn');
    const gameDownloadBtn = document.getElementById('game-download-btn');
    const gameOnlineContent = document.getElementById('game-online-content');
    const gameDownloadContent = document.getElementById('game-download-content');

    if (gameOnlineBtn && gameDownloadBtn && gameOnlineContent && gameDownloadContent) {
        gameOnlineBtn.addEventListener('click', function () {
            gameOnlineContent.style.display = 'block';
            gameDownloadContent.style.display = 'none';
        });
        gameDownloadBtn.addEventListener('click', function () {
            gameOnlineContent.style.display = 'none';
            gameDownloadContent.style.display = 'block';
        });
        // Ẩn cả 2 nội dung khi mới vào mục Game
        gameOnlineContent.style.display = 'none';
        gameDownloadContent.style.display = 'none';
    }

    // Hiện 2 nút khi nhấn vào Game Hot
    const gameHotTitle = document.getElementById('game-hot-title');
    const gameSelectGroup = document.getElementById('game-select-group');
    if (gameHotTitle && gameSelectGroup) {
        gameHotTitle.addEventListener('click', function () {
            gameSelectGroup.style.display = 'block';
        });
    }


    // Sửa: Đưa xử lý tìm kiếm vào đây
    searchBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn reload trang

        if (window.innerWidth < 576) {
            // Nếu form chưa mở thì chỉ mở form
            if (!searchForm.classList.contains('show')) {
                searchForm.classList.add('show');
                searchBtnIcon.classList.replace('bx-search', 'bx-x');
                searchInput.focus();
                return;
            }
            // Nếu form đã mở thì thực hiện tìm kiếm
            searchForm.classList.remove('show');
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }

        // Xử lý tìm kiếm (dùng cho cả mobile và desktop)
        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword) return;

        const found = allowedMenus.find(menu =>
            menu.text.toLowerCase().includes(keyword)
        );

        if (found) {
            const menuItem = Array.from(menuItems).find(li =>
                li.querySelector(`i.${found.icon}`)
            );
            if (menuItem) {
                menuItems.forEach(i => i.classList.remove('active'));
                menuItem.classList.add('active');
                hideAllMain();
                if (menuItem.querySelector('i.bxs-dashboard')) {
                    homeMain && (homeMain.style.display = 'block');
                }
                if (menuItem.querySelector('i.bx-group')) {
                    groupMain && (groupMain.style.display = 'block');
                }
                if (menuItem.querySelector('i.bx-store-alt')) {
                    gameMain && (gameMain.style.display = 'block');
                }
                if (menuItem.querySelector('i.bx-message-square-dots')) {
                    fanpageMain && (fanpageMain.style.display = 'block');
                }
            }
        } else {
            alert('Không tìm thấy mục phù hợp!');
        }
    });
});

// Chặn F12 mở DevTools
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});

// Chặn chuột phải (context menu)
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
});
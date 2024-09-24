import React from "react";

export const menu = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Trang chủ",
                url: "/admin",
                icon: "/home.svg",
            },
        ],
    },
    {
        id: 2,
        title: "danh sách",
        listItems: [
            {
                id: 1,
                title: "Danh sách tài khoản",
                url: "/admin/user/danh-sach",
                icon: "/user.svg",
            },
            {
                id: 2,
                title: "Danh sách tác giả",
                url: "/admin/actor/danh-sach",
                icon: "/user.svg",
            },
            {
                id: 3,
                title: "Danh sách thể loại",
                url: "/admin/category/danh-sach",
                icon: "/product.svg",
            },
            {
                id: 4,
                title: "Danh sách phim",
                url: "/admin/movie/danh-sach",
                icon: "/order.svg",
            },
        ],
    },
];
export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Tổng số user",
    link: "/admin/user/danh-sach",
    number: "0",
    dataKey: "users",
    percentage: 45,
    chartData: [
        {name: "Sun", users: 400},
        {name: "Mon", users: 600},
        {name: "Tue", users: 500},
        {name: "Wed", users: 700},
        {name: "Thu", users: 400},
        {name: "Fri", users: 500},
        {name: "Sat", users: 450},
    ],
};

export const chartBoxMovie = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Tổng số phim",
    link: "/admin/movie/danh-sach",
    number: "0",
    dataKey: "products",
    percentage: 21,
    chartData: [
        {name: "Sun", products: 400},
        {name: "Mon", products: 600},
        {name: "Tue", products: 500},
        {name: "Wed", products: 700},
        {name: "Thu", products: 400},
        {name: "Fri", products: 500},
        {name: "Sat", products: 450},
    ],
};
export const chartBoxActor = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Tổng số diễn viên",
    number: "0",
    link: "/admin/actor/danh-sach",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
        {name: "Sun", revenue: 400},
        {name: "Mon", revenue: 600},
        {name: "Tue", revenue: 500},
        {name: "Wed", revenue: 700},
        {name: "Thu", revenue: 400},
        {name: "Fri", revenue: 500},
        {name: "Sat", revenue: 450},
    ],
};
export const chartBoxCategory = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Tổng số thể loại",
    link: "/admin/category/danh-sach",
    number: "0",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
        {name: "Sun", ratio: 400},
        {name: "Mon", ratio: 600},
        {name: "Tue", ratio: 500},
        {name: "Wed", ratio: 700},
        {name: "Thu", ratio: 400},
        {name: "Fri", ratio: 500},
        {name: "Sat", ratio: 450},
    ],
};

export const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "profit",
    chartData: [
        {
            name: "Sun",
            profit: 4000,
        },
        {
            name: "Mon",
            profit: 3000,
        },
        {
            name: "Tue",
            profit: 2000,
        },
        {
            name: "Wed",
            profit: 2780,
        },
        {
            name: "Thu",
            profit: 1890,
        },
        {
            name: "Fri",
            profit: 2390,
        },
        {
            name: "Sat",
            profit: 3490,
        },
    ],
};

export const barChartBoxVisit = {
    title: "Total Visit",
    color: "#FF8042",
    dataKey: "visit",
    chartData: [
        {
            name: "Sun",
            visit: 4000,
        },
        {
            name: "Mon",
            visit: 3000,
        },
        {
            name: "Tue",
            visit: 2000,
        },
        {
            name: "Wed",
            visit: 2780,
        },
        {
            name: "Thu",
            visit: 1890,
        },
        {
            name: "Fri",
            visit: 2390,
        },
        {
            name: "Sat",
            visit: 3490,
        },
    ],
};
export const iconArrow = <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="#003E9C" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="#003E9C" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>
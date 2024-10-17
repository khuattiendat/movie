export const TransactionColumns = [
    {
        field: "user_id",
        type: "string",
        headerName: "ID người dùng",
        required: true,
        width: 200,
    },
    {
        field: "full_name",
        type: "string",
        headerName: "Họ tên",
        required: true,
        width: 200,
    },
    {
        field: "phone",
        type: "string",
        headerName: "Số điện thoại",
        required: true,
        width: 200,
    },
    {
        field: "amount",
        type: "string",
        headerName: "Số tiền",
        required: true,
        width: 200,
    },
    {
        field: "content",
        type: "string",
        headerName: "Nội dung giao dịch",
        required: true,
        class: 'content',
        width: 200,
    },
    {
        field: "status",
        type: "string",
        headerName: "Trạng thái",
        required: true,
        width: 200,
    },
    {
        field: "createdAt",
        type: "string",
        headerName: "Ngày tạo",
        required: true,
        width: 200,
    },

]
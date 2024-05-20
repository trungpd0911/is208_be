const teacherData = [
    {
        "email": "phandinhthetrung@gmail.com",
        "teacherName": "Phan Đình Thế Trung",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd7b",
        // 'Ngoại Ngữ'
        "class": "10A1"
    },
    {
        "email": "truongthienloc@gmail.com",
        "teacherName": "Trương Thiên Lộc",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd7c",
        // "Lý"
        "class": "10A2"
    },
    {
        "email": "vutiendat@gmail.com",
        "teacherName": "Vũ Tiến Đạt",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd7d",
        // "Hóa"
        "class": "10A3"
    },
    {
        "email": "lethanhhai@gmail.com",
        "teacherName": "Lê Thanh Hải",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd7e",
        // "Toán"
        "class": "11A1"
    },
    {
        "email": "phammanhtan@gmail.com",
        "teacherName": "Phạm Mạnh Tấn",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd7f",
        // "Văn"
        "class": "11A2"
    },
    {
        "email": "honhathuy@gmail.com",
        "teacherName": "Hồ Nhật Huy",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd80",
        // "Sử"
        "class": "11A3"
    },
    {
        "email": "nguyenhuyhoang@gmail.com",
        "teacherName": "Nguyễn Huy Hoàng",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd81",
        // "Địa"
        "class": "12A1"
    },
    {
        "email": "lenamthanh@gmail.com",
        "teacherName": "Lê Nam Thành",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd82",
        // "Sinh "
        "class": "12A2"
    },
    {
        "email": "phanthanhduong@gmail.com",
        "teacherName": "Phan Thanh Dương",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd83",
        // "Công Nghệ"
        "class": "12A3"
    },
    {
        "email": "trandinhkhanh@gmail.com",
        "teacherName": "Trần Đình Khánh",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd84",
        // "Tin Học"
    },
    {
        "email": "luongquoctoan@gmail.com",
        "teacherName": "Lương Quốc Toàn",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd85",
        // "Giáo Dục Công Dân"
    },
    {
        "email": "nguyenanhtuanngoc@gmail.com",
        "teacherName": "Nguyễn Anh Tuấn Ngọc",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd86",
        // "Thể Dục"
    },
    {
        "email": "nguyenvanphong@gmail.com",
        "teacherName": "Nguyễn Văn Phong",
        "password": "12345678",
        "mainSubject" : "66408cd5108e84eabf17dd87",
        // "Sinh Hoạt"
    }
]

// return teacher.teacherName, email, password;
const teacherInput = teacherData.map(teacher => {
    return {
        teacherName: teacher.teacherName,
        email: teacher.email,
        password: teacher.password,
        mainSubject: teacher.mainSubject,
    }
})

export default { teacherInput, teacherData }; 

// [
//  "66408cd5108e84eabf17dd7b"
//  "66408cd5108e84eabf17dd7c"
//  "66408cd5108e84eabf17dd7d"
//  "66408cd5108e84eabf17dd7e"
//  "66408cd5108e84eabf17dd7f"
//  "66408cd5108e84eabf17dd80"
//  "66408cd5108e84eabf17dd81"
//  "66408cd5108e84eabf17dd82"
//  "66408cd5108e84eabf17dd83"
//  "66408cd5108e84eabf17dd84"
//  "66408cd5108e84eabf17dd85"
//  "66408cd5108e84eabf17dd86"
//  "66408cd5108e84eabf17dd87"
// ]
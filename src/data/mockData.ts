export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  teacher: string;
  teacherEmail: string;
  room: string;
  scheduleDay: string;
  scheduleTime: string;
  semester: string;
  description: string;
  syllabus: string[];
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  dayOfWeek: number; // 2: Thứ 2, 3: Thứ 3, ..., 7: Thứ 7
  dayName: string;
  time: string;
  periods: string;
  room: string;
  building: string;
  teacher: string;
  type: string;
  note: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string; // ISO or readable date
  dueTime: string;
  isUrgent: boolean;
  isCompleted: boolean;
  submissionFormat: string;
}

export interface StudentProfile {
  studentId: string;
  fullName: string;
  className: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
  dob: string;
  academicYear: string;
  gpa: number;
  totalCredits: number;
  completedCredits: number;
}

export interface SubjectGrade {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  attendanceScore: number; // 10%
  midtermScore: number; // 20%
  assignmentScore: number; // 20%
  finalScore: number; // 50%
  totalScore10: number;
  letterGrade: string;
  isPassed: boolean;
}

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  studentId: 'B23DCCC127',
  fullName: 'ĐỖ ĐỨC PHONG',
  className: 'D23CCPM02',
  major: 'Công nghệ Thông tin (UDU)',
  faculty: 'Viện khoa học kỹ thuật Bưu điện',
  email: 'b23dccc127@stu.ptit.edu.vn',
  phone: '0987654321',
  dob: '08/012/2003',
  academicYear: '2023 - 2027',
  gpa: 3.48,
  totalCredits: 135,
  completedCredits: 45,
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    code: 'INT1412',
    name: 'Lập trình ứng dụng di động',
    credits: 3,
    teacher: 'TS. Trần Văn Hùng',
    teacherEmail: 'hungtv@ptit.edu.vn',
    room: '302-A2',
    scheduleDay: 'Thứ 2',
    scheduleTime: '07:00 - 09:15',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Trang bị kiến thức và kỹ năng phát triển ứng dụng di động đa nền tảng bằng React Native, quản lý trạng thái, navigation, và kết nối API.',
    syllabus: [
      'Tổng quan React Native và Kiến trúc di động',
      'Layout & Styling với Flexbox',
      'React Navigation (Stack, Bottom Tabs)',
      'State Management & AsyncStorage',
      'Kết nối REST API & Xử lý bất đồng bộ',
      'Kiểm thử và đóng gói ứng dụng',
    ],
  },
  {
    id: 'sub-2',
    code: 'INT1434',
    name: 'Kiến trúc phần mềm',
    credits: 3,
    teacher: 'PGS. TS. Lê Thị Mai',
    teacherEmail: 'mailt@ptit.edu.vn',
    room: '405-A3',
    scheduleDay: 'Thứ 3',
    scheduleTime: '09:30 - 11:45',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Nghiên cứu các mẫu kiến trúc phần mềm, nguyên lý thiết kế SOLID, kiến trúc Clean Architecture và Microservices.',
    syllabus: [
      'Tổng quan về kiến trúc phần mềm',
      'Mẫu thiết kế (Design Patterns)',
      'Kiến trúc phân tầng & Clean Architecture',
      'Microservices & Message Broker',
      'Đánh giá chất lượng kiến trúc',
    ],
  },
  {
    id: 'sub-3',
    code: 'INT1406',
    name: 'Cơ sở dữ liệu phân tán',
    credits: 3,
    teacher: 'ThS. Nguyễn Hoàng Nam',
    teacherEmail: 'namnh@ptit.edu.vn',
    room: '201-A2',
    scheduleDay: 'Thứ 4',
    scheduleTime: '13:00 - 15:15',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Cung cấp kiến thức về thiết kế phân mảnh, truy vấn phân tán, tối ưu hóa truy vấn và tính nhất quán dữ liệu.',
    syllabus: [
      'Khái niệm CSDL phân tán',
      'Phân mảnh ngang, dọc và hỗn hợp',
      'Tối ưu hóa truy vấn phân tán',
      'Quản lý giao dịch và khóa phân tán',
      'Các hệ quản trị NoSQL phân tán',
    ],
  },
  {
    id: 'sub-4',
    code: 'INT1450',
    name: 'An toàn và bảo mật hệ thống',
    credits: 2,
    teacher: 'TS. Vũ Đình Tuấn',
    teacherEmail: 'tuanvd@ptit.edu.vn',
    room: '104-A3',
    scheduleDay: 'Thứ 5',
    scheduleTime: '15:30 - 17:00',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Tìm hiểu về các lỗ hổng bảo mật phổ biến, mã hóa dữ liệu, xác thực và phân quyền trong hệ thống phần mềm.',
    syllabus: [
      'Mật mã học cơ bản & Khóa công khai',
      'Các lỗ hổng OWASP Top 10',
      'Xác thực JWT & OAuth 2.0',
      'Bảo mật mạng và máy chủ',
    ],
  },
  {
    id: 'sub-5',
    code: 'INT1478',
    name: 'Xử lý ngôn ngữ tự nhiên',
    credits: 3,
    teacher: 'TS. Đặng Quốc Bảo',
    teacherEmail: 'baodq@ptit.edu.vn',
    room: '305-A2',
    scheduleDay: 'Thứ 6',
    scheduleTime: '07:00 - 09:15',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Khai phá dữ liệu văn bản, phân loại cảm xúc, mô hình Transformer và ứng dụng mô hình ngôn ngữ lớn.',
    syllabus: [
      'Tiền xử lý văn bản tiếng Việt',
      'Mô hình biểu diễn Word2Vec, TF-IDF',
      'Mạng nơ-ron hồi quy RNN/LSTM',
      'Kiến trúc Transformer & BERT',
    ],
  },
  {
    id: 'sub-6',
    code: 'BAS1224',
    name: 'Kỹ năng làm việc nhóm và thuyết trình',
    credits: 2,
    teacher: 'ThS. Phạm Hải Yến',
    teacherEmail: 'yenph@ptit.edu.vn',
    room: '501-A1',
    scheduleDay: 'Thứ 7',
    scheduleTime: '09:30 - 11:45',
    semester: 'Học kỳ 1 (2026 - 2027)',
    description:
      'Rèn luyện kỹ năng mềm, giải quyết xung đột, quản lý thời gian và kỹ năng thuyết trình trước đám đông.',
    syllabus: [
      'Tâm lý học nhóm và vai trò thành viên',
      'Kỹ năng lắng nghe & phản hồi tích cực',
      'Kỹ thuật xây dựng slide & thuyết trình lôi cuốn',
    ],
  },
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    subjectId: 'sub-1',
    subjectCode: 'INT1412',
    subjectName: 'Lập trình ứng dụng di động',
    dayOfWeek: 2,
    dayName: 'Thứ Hai',
    time: '07:00 - 09:15',
    periods: 'Tiết 1 - 3',
    room: '302-A2',
    building: 'Nhà A2 - Giảng đường trung tâm',
    teacher: 'TS. Trần Văn Hùng',
    type: 'Lý thuyết & Thực hành',
    note: 'Cần mang theo laptop đã cài sẵn Node.js và môi trường React Native.',
  },
  {
    id: 'sch-2',
    subjectId: 'sub-2',
    subjectCode: 'INT1434',
    subjectName: 'Kiến trúc phần mềm',
    dayOfWeek: 3,
    dayName: 'Thứ Ba',
    time: '09:30 - 11:45',
    periods: 'Tiết 4 - 6',
    room: '405-A3',
    building: 'Nhà A3 - Khu thực hành CNTT',
    teacher: 'PGS. TS. Lê Thị Mai',
    type: 'Lý thuyết chuyên sâu',
    note: 'Đọc trước tài liệu Chương 3: Clean Architecture.',
  },
  {
    id: 'sch-3',
    subjectId: 'sub-3',
    subjectCode: 'INT1406',
    subjectName: 'Cơ sở dữ liệu phân tán',
    dayOfWeek: 4,
    dayName: 'Thứ Tư',
    time: '13:00 - 15:15',
    periods: 'Tiết 7 - 9',
    room: '201-A2',
    building: 'Nhà A2 - Giảng đường trung tâm',
    teacher: 'ThS. Nguyễn Hoàng Nam',
    type: 'Lý thuyết & Bài tập',
    note: 'Kiểm tra 15 phút bài tập phân mảnh ngang.',
  },
  {
    id: 'sch-4',
    subjectId: 'sub-4',
    subjectCode: 'INT1450',
    subjectName: 'An toàn và bảo mật hệ thống',
    dayOfWeek: 5,
    dayName: 'Thứ Năm',
    time: '15:30 - 17:00',
    periods: 'Tiết 10 - 11',
    room: '104-A3',
    building: 'Nhà A3 - Khu thực hành CNTT',
    teacher: 'TS. Vũ Đình Tuấn',
    type: 'Thực hành bảo mật',
    note: 'Lab thực hành tấn công SQL Injection và phòng chống.',
  },
  {
    id: 'sch-5',
    subjectId: 'sub-5',
    subjectCode: 'INT1478',
    subjectName: 'Xử lý ngôn ngữ tự nhiên',
    dayOfWeek: 6,
    dayName: 'Thứ Sáu',
    time: '07:00 - 09:15',
    periods: 'Tiết 1 - 3',
    room: '305-A2',
    building: 'Nhà A2 - Giảng đường trung tâm',
    teacher: 'TS. Đặng Quốc Bảo',
    type: 'Lý thuyết & Thảo luận',
    note: 'Báo cáo tiến độ đồ án nhóm.',
  },
  {
    id: 'sch-6',
    subjectId: 'sub-6',
    subjectCode: 'BAS1224',
    subjectName: 'Kỹ năng làm việc nhóm',
    dayOfWeek: 7,
    dayName: 'Thứ Bảy',
    time: '09:30 - 11:45',
    periods: 'Tiết 4 - 6',
    room: '501-A1',
    building: 'Nhà A1 - Tòa nhà hiệu bộ',
    teacher: 'ThS. Phạm Hải Yến',
    type: 'Thực hành kỹ năng',
    note: 'Thuyết trình nhóm chủ đề Quản trị xung đột.',
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asm-1',
    subjectId: 'sub-1',
    subjectCode: 'INT1412',
    subjectName: 'Lập trình ứng dụng di động',
    title: 'Bài thực hành 3: Xây dựng App Quản lý học tập',
    description:
      'Xây dựng ứng dụng hoàn chỉnh kết hợp Bottom Tab Navigator và Native Stack Navigator, quản lý dữ liệu bằng FlatList và AsyncStorage.',
    dueDate: '25/10/2026',
    dueTime: '23:59',
    isUrgent: true,
    isCompleted: false,
    submissionFormat:
      'Nộp link GitHub repository và file nén mã nguồn lên hệ thống.',
  },
  {
    id: 'asm-2',
    subjectId: 'sub-2',
    subjectCode: 'INT1434',
    subjectName: 'Kiến trúc phần mềm',
    title: 'Bài tập nhóm: Thiết kế sơ đồ Component Microservices',
    description:
      'Thiết kế kiến trúc hệ thống thương mại điện tử với tối thiểu 4 microservices độc lập và API Gateway.',
    dueDate: '28/10/2026',
    dueTime: '21:00',
    isUrgent: true,
    isCompleted: false,
    submissionFormat: 'File báo cáo PDF và file thiết kế draw.io.',
  },
  {
    id: 'asm-3',
    subjectId: 'sub-3',
    subjectCode: 'INT1406',
    subjectName: 'Cơ sở dữ liệu phân tán',
    title: 'Bài tập 2: Tối ưu hóa câu truy vấn phân tán',
    description:
      'Phân tích cây toán tử đại số quan hệ và đề xuất phương án truyền dữ liệu giảm thiểu chi phí mạng.',
    dueDate: '02/11/2026',
    dueTime: '23:59',
    isUrgent: false,
    isCompleted: false,
    submissionFormat: 'Nộp bài trực tiếp trên hệ thống LMS.',
  },
  {
    id: 'asm-4',
    subjectId: 'sub-4',
    subjectCode: 'INT1450',
    subjectName: 'An toàn và bảo mật hệ thống',
    title: 'Báo cáo Lab 1: Khai thác và vá lỗi XSS',
    description:
      'Thực hiện mô phỏng khai thác Stored XSS trên môi trường DVWA và viết code filter phòng tránh.',
    dueDate: '15/10/2026',
    dueTime: '23:59',
    isUrgent: false,
    isCompleted: true,
    submissionFormat:
      'File Word/PDF kèm ảnh chụp minh chứng từng bước thực hiện.',
  },
  {
    id: 'asm-5',
    subjectId: 'sub-5',
    subjectCode: 'INT1478',
    subjectName: 'Xử lý ngôn ngữ tự nhiên',
    title: 'Mini Project: Phân loại sắc thái bình luận khách hàng',
    description:
      'Xây dựng pipeline tiền xử lý tiếng Việt bằng Underthesea và huấn luyện mô hình phân loại Logistic Regression.',
    dueDate: '10/11/2026',
    dueTime: '22:00',
    isUrgent: false,
    isCompleted: false,
    submissionFormat: 'Jupyter Notebook (.ipynb) kèm file weight mô hình.',
  },
];

export const INITIAL_GRADES: SubjectGrade[] = [
  {
    id: 'grd-1',
    subjectCode: 'INT1412',
    subjectName: 'Lập trình ứng dụng di động',
    credits: 3,
    attendanceScore: 9.5,
    midtermScore: 9.0,
    assignmentScore: 9.2,
    finalScore: 8.8,
    totalScore10: 9.0,
    letterGrade: 'A',
    isPassed: true,
  },
  {
    id: 'grd-2',
    subjectCode: 'INT1434',
    subjectName: 'Kiến trúc phần mềm',
    credits: 3,
    attendanceScore: 10.0,
    midtermScore: 8.5,
    assignmentScore: 8.5,
    finalScore: 8.0,
    totalScore10: 8.4,
    letterGrade: 'B+',
    isPassed: true,
  },
  {
    id: 'grd-3',
    subjectCode: 'INT1406',
    subjectName: 'Cơ sở dữ liệu phân tán',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 8.0,
    assignmentScore: 8.5,
    finalScore: 8.5,
    totalScore10: 8.4,
    letterGrade: 'B+',
    isPassed: true,
  },
  {
    id: 'grd-4',
    subjectCode: 'INT1450',
    subjectName: 'An toàn và bảo mật hệ thống',
    credits: 2,
    attendanceScore: 9.0,
    midtermScore: 9.0,
    assignmentScore: 9.5,
    finalScore: 9.0,
    totalScore10: 9.1,
    letterGrade: 'A',
    isPassed: true,
  },
  {
    id: 'grd-5',
    subjectCode: 'BAS1224',
    subjectName: 'Kỹ năng làm việc nhóm',
    credits: 2,
    attendanceScore: 10.0,
    midtermScore: 9.5,
    assignmentScore: 9.5,
    finalScore: 9.0,
    totalScore10: 9.3,
    letterGrade: 'A',
    isPassed: true,
  },
];

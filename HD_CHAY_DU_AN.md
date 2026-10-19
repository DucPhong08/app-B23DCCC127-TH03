# BÁO CÁO & HƯỚNG DẪN CHẠY DỰ ÁN
## BÀI TẬP THỰC HÀNH 3: XÂY DỰNG ỨNG DỤNG QUẢN LÝ HỌC TẬP BẰNG REACT NATIVE CLI
**Mã lớp / Học phần:** RIPT1412-20261-01  
**Nền tảng:** React Native CLI (TypeScript)  
**Kiến trúc:** Bottom Tab Navigation kết hợp Native Stack Navigation  

---

### 1. Cấu trúc thư mục mã nguồn (`src/`)

```text
├── App.tsx                     # Entry point (bọc SafeAreaProvider, AppProvider, AppNavigator)
├── src/
│   ├── navigation/
│   │   ├── types.ts            # Khai báo RootStackParamList, BottomTabParamList, RouteProps
│   │   ├── BottomTabNavigator.tsx # 5 Tabs chính: Tổng quan, Môn học, Lịch học, Bài tập, Cá nhân
│   │   └── AppNavigator.tsx    # Native Stack Navigator (bọc Tabs + 4 màn hình Chi tiết)
│   ├── screens/
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx  # Màn 1: Trang chủ (Thông tin SV, thẻ thống kê, bài tập sắp đến hạn, môn học)
│   │   ├── Subjects/
│   │   │   ├── SubjectListScreen.tsx   # Màn 2: Danh sách môn học (FlatList + Tìm kiếm + EmptyState)
│   │   │   └── SubjectDetailScreen.tsx # Chi tiết môn học: Giảng viên, lịch, mô tả, đề cương
│   │   ├── Schedule/
│   │   │   ├── ScheduleScreen.tsx      # Màn 3: Thời khóa biểu trong tuần (Lọc ngày + FlatList)
│   │   │   └── ScheduleDetailScreen.tsx# Chi tiết buổi học: Thời gian, phòng, tiết, giảng viên, ghi chú
│   │   ├── Assignments/
│   │   │   ├── AssignmentListScreen.tsx  # Màn 4: Danh sách bài tập (Lọc trạng thái + Cập nhật nhanh)
│   │   │   └── AssignmentDetailScreen.tsx# Chi tiết bài tập: Yêu cầu, hạn nộp, nút chuyển đổi trạng thái
│   │   └── Profile/
│   │       ├── ProfileScreen.tsx       # Màn 5: Hồ sơ sinh viên, modal sửa thông tin, tóm tắt GPA
│   │       └── GradeDetailScreen.tsx   # Chi tiết kết quả học tập: Bảng điểm chi tiết từng môn
│   ├── context/
│   │   └── AppContext.tsx      # Global State (quản lý trạng thái và đồng bộ 2 chiều dữ liệu toàn app)
│   ├── data/
│   │   └── mockData.ts         # Dữ liệu thực tế chuẩn đại học (PTIT), liên kết khóa ngoại nhất quán
│   ├── components/             # Reusable UI: AppIcon, StatusBadge, SearchBar, EmptyState
│   └── utils/
│       └── storage.ts          # Đọc/ghi dữ liệu bền vững bằng AsyncStorage
```

---

### 2. Các yêu cầu đề bài đã hoàn thành 100%

| Yêu cầu đề bài | Thành phần thực thi | Trạng thái |
| :--- | :--- | :---: |
| **Màn 1. Trang chủ** | Họ tên, MSSV, danh sách môn đang học, bài tập sắp đến hạn, thẻ thống kê nhanh | **Đạt** |
| **Màn 2. Môn học** | Hiển thị môn học bằng `FlatList`, mã môn, tên môn, số tín chỉ, tìm kiếm theo tên, bấm vào xem chi tiết | **Đạt** |
| **Màn 3. Thời khóa biểu** | Lịch học trong tuần, tên môn, thời gian, phòng học, lọc theo thứ (Thứ 2 - Thứ 7), bấm vào xem chi tiết | **Đạt** |
| **Màn 4. Bài tập** | Danh sách bài tập, môn học, hạn nộp, trạng thái Đã xong / Chưa xong, nút cập nhật trạng thái, lọc trạng thái | **Đạt** |
| **Màn 5. Cá nhân** | Thông tin sinh viên (MSSV, Họ tên, Lớp, Ngành), Modal chỉnh sửa họ tên, email, SĐT lưu vào `AsyncStorage` | **Đạt** |
| **Bottom Tab Navigation** | 5 Tab dưới màn hình tương ứng với 5 màn hình chính, có badge số lượng bài tập chưa làm | **Đạt** |
| **Stack Navigation** | Mở 4 màn hình chi tiết (`SubjectDetail`, `ScheduleDetail`, `AssignmentDetail`, `GradeDetail`) kèm nút Back | **Đạt** |
| **Quản lý trạng thái** | Sử dụng `useState`, `useEffect`, `React Context` đồng bộ realtime giữa Trang chủ và các Tab | **Đạt** |
| **Lưu trữ dữ liệu** | Sử dụng `@react-native-async-storage/async-storage` lưu lại bài tập và hồ sơ sinh viên sau khi tắt app | **Đạt** |
| **Xử lý Empty State** | Hiển thị thông báo thân thiện khi tìm kiếm hoặc lọc không có kết quả | **Đạt** |

---

### 3. Hướng dẫn chạy ứng dụng

#### Bước 1: Khởi động Metro Bundler
Mở terminal tại thư mục dự án và chạy:
```bash
npm start
```
*(hoặc `npx react-native start`)*

#### Bước 2: Chạy ứng dụng trên thiết bị Android / Giả lập
Mở một cửa sổ terminal mới và chạy:
```bash
npm run android
```
*(hoặc `npx react-native run-android`)*

#### Bước 3: Kiểm tra Type-check & Build bundle (Đã xác minh)
```bash
# Kiểm tra TypeScript:
npx tsc --noEmit

# Kiểm tra đóng gói Metro bundle:
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output /dev/null
```
*(Cả 2 lệnh kiểm tra đều vượt qua 0 lỗi)*

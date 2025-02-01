Here's a **README.md** file for your **Next.js + TypeScript Car Tracking App**, covering **installation, features, usage, and configuration**.

---

### 📄 **README.md**
```md
# 🚗 Car Tracking System

A **Car Tracking System** built with **Next.js, TypeScript, Leaflet, and Tailwind CSS**. This app allows users to track vehicle movement, monitor driver activities, view speed data, and switch between **dark/light mode**.

---

## 🚀 Features

✅ **User Authentication**  
- 🔑 Login / Signup  
- 🔄 Forgot Password  
- 🚪 Logout  

✅ **Car Tracking & Monitoring**  
- 📍 Live Vehicle Location (Latitude & Longitude)  
- 🔄 Real-Time Car Movement with Rotation  
- 📅 Select Date to View Past Data  
- 🚘 Driver Activity Log  
- 📊 Speed Monitoring  

✅ **UI & Customization**  
- 🌙 **Dark Mode & Light Mode**  
- 📡 Fetch Data from API  
- 🗺️ Interactive Map (Leaflet.js)  
- 🎨 Responsive Tailwind CSS  

---

## 🛠️ Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-repo/car-tracking.git
cd car-tracking
```

### 2️⃣ **Install Dependencies**
```sh
npm install
# or
yarn install
```

### 3️⃣ **Environment Variables**
Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_API_BASE_URL=http://15.184.158.127:8809/api/v1
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

---

## 🚀 **Run the App**
```sh
npm run dev
# or
yarn dev
```
> Runs on `http://localhost:3000`

---

## 🗺️ **Map & Tracking**
- Uses **Leaflet.js** for real-time tracking.
- Custom **SVG car icon** that **rotates dynamically**.

```tsx
const getRotatingCarIcon = (rotationAngle: number) =>
  L.divIcon({
    className: "rotating-car-icon",
    html: `<svg width="40" height="40" viewBox="0 0 90 90" style="transform: rotate(${rotationAngle}deg);">
      <g fill="none">
        <path d="M 2.037 60.824 v 15.764 c 0 1.594 1.292 2.885 2.885 2.885 h 12.725 c 1.594 0 2.885 -1.292 2.885 -2.885 V 60.824 H 2.037 z" fill="rgb(47,72,89)"/>
        <path d="M 69.467 60.824 v 15.764 c 0 1.594 1.292 2.885 2.885 2.885 h 12.725 c 1.594 0 2.885 -1.292 2.885 -2.885 V 60.824 H 69.467 z" fill="rgb(47,72,89)"/>
        <path d="M 88.441 61.246 l 0.526 -9.521 c 0.34 -6.151 -1.894 -12.166 -6.167 -16.603 l -4.87 -5.057 l -5.753 -14.372 c -0.84 -2.098 -2.747 -3.597 -4.991 -3.862 c -14.791 -1.749 -29.581 -1.749 -44.372 0 c -2.244 0.265 -4.151 1.765 -4.991 3.862 l -5.753 14.372 l -4.87 5.057 c -4.273 4.437 -6.507 10.452 -6.167 16.603 l 0.526 9.521 c 0.268 4.843 4.273 8.633 9.123 8.633 h 68.634 C 84.168 69.879 88.173 66.089 88.441 61.246 z" fill="rgb(244,78,78)"/>
      </g>
    </svg>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
```

---

## 🔐 **Authentication System**
- Uses **NextAuth.js** for login/signup.
```

---

## 🌙 **Dark & Light Mode**
- Uses **Tailwind CSS Theme Switching**.
- Saves preference in **localStorage**.

### 🎨 **Example Dark Mode Toggle**
```tsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  setDarkMode(localStorage.getItem("theme") === "dark");
}, []);

const toggleTheme = () => {
  const newTheme = darkMode ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  setDarkMode(!darkMode);
};

<button onClick={toggleTheme}>
  {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
</button>;
```

---

## ⚡ **API Endpoints**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `http://15.184.158.127:8809/api/v1/getVehicleHistoryDatas` | `POST` | User data |


---

## 🛠 **Deployment**
Deploy on **Vercel**:
```sh
vercel
```

---

## ✨ **Future Improvements**
- 📌 Live location updates via **WebSockets**.
- 📊 Advanced analytics for **driver behavior**.
- 🏎️ Real-time **speed alerts**.
- 📱 Mobile-friendly UI.

---

## 📝 **Contributing**
1. **Fork** the repo
2. **Clone**: `git clonehttps://github.com/GOWTHAM2523/car-tracker.git`
3. **Create a branch**: `git checkout -b feature-name`
4. **Commit changes**: `git commit -m "Added feature"`
5. **Push**: `git push origin feature-name`
6. **Submit a Pull Request** 🚀

---

## 👨‍💻 **Author**
- [Gowtham] (https://github.com/GOWTHAM2523/car-tracker.git)
- ✉️ Contact: `your-email@example.com`

---

## 🏁 **License**
MIT License © 2025 Your Name
```

---

### 🚀 **Let me know if you need modifications!** 🚗💨
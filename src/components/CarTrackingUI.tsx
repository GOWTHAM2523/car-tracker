import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { FaSpinner } from "react-icons/fa";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlay, FaStop, FaTachometerAlt } from 'react-icons/fa';
// import car from "../asstes/img/car.png"

const carIcon = new L.Icon({
  iconUrl: "../asstes/img/car.png",
  iconSize: [40, 40], // Adjust size
  iconAnchor: [20, 20], // Center the icon properly
  popupAnchor: [0, -20],
});

const getCarSVG = (rotationAngle: number) => `
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" 
  style="transform: rotate(${rotationAngle}deg);">
    <g stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <!-- Car body -->
      <path d="M10 65 L20 40 L80 40 L90 65 Z" fill="red"/>
      <rect x="25" y="30" width="50" height="15" fill="black"/>
      <!-- Windows -->
      <rect x="30" y="32" width="15" height="10" fill="lightblue"/>
      <rect x="55" y="32" width="15" height="10" fill="lightblue"/>
      <!-- Wheels -->
      <circle cx="25" cy="70" r="8" fill="black"/>
      <circle cx="75" cy="70" r="8" fill="black"/>
      <circle cx="25" cy="70" r="3" fill="gray"/>
      <circle cx="75" cy="70" r="3" fill="gray"/>
    </g>
  </svg>
`;



const getRotatingCarIcon = (rotationAngle: number) =>
 
  L.divIcon({
    className: "rotating-car-icon",
    html: getCarSVG(rotationAngle),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });


L.Marker.prototype.options.icon = carIcon;

interface RouteData {
  latitude: number;
  longitude: number;
  receivedtime: string;
  bearing?: number;
}

const CarTrackingUI: React.FC = () => {
  const [routeData, setRouteData] = useState<RouteData[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [fromDate, setFromDate] = useState<Date>(new Date('2025-01-30'));
  const [toDate, setToDate] = useState<Date>(new Date('2025-01-31'));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const userId = [21996, 13433, 13233, 292, 20165, 282, 12253, 21342, 338, 14391]

  const getRandomUserId = () => userId[Math.floor(Math.random() * userId.length)];
  const fetchData = async (fromTimestamp: number, toTimestamp: number) => {
    try {
      const randomUserId = getRandomUserId();
      const response = await axios.post('http://15.184.158.127:8809/api/v1/getVehicleHistoryDatas', {
        userId: randomUserId,
        fromTimeStamp: fromTimestamp,
        toTimeStamp: toTimestamp,
      });
      if (response.data.status === '1' && response.data.routeData.length > 0) {
          setRouteData(response.data.routeData);
      } else {
        toast.error('No data available for the selected date range.');
      }
    } catch (error) {
      console.error("Fetch Error:", error); // ✅ Logs error in the console
      toast.error("Failed to fetch data. Please try again.");
    }
    
  };

  useEffect(() => {
    fetchData(fromDate.getTime(), toDate.getTime())
  }, [])

  const MapLoader = () => {
    return (
      <div className="flex items-center justify-center h-[300px] w-full  rounded-lg">
        <FaSpinner className="animate-spin text-green-600  text-4xl" />
      </div>
    );
  };

  const startMoving = () => setIsMoving(true);
  const stopMoving = () => {
    setIsMoving(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const increaseSpeed = () => setSpeed((prevSpeed) => (prevSpeed % 3) + 1);

  useEffect(() => {
    if (isMoving) {
      intervalRef.current = setInterval(() => {
        setCurrentPositionIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= routeData.length) {
            stopMoving();
            return prevIndex;
          }
          return nextIndex;
        });
      }, 1000 / speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMoving, speed, routeData]);

  const currentPosition = routeData[currentPositionIndex] || {};
  const bearings = routeData.map((data) => data.bearing);
  const currentBearing = routeData[currentPositionIndex]?.bearing ?? 0;
console.log(currentBearing);

console.log(bearings);

  return (
    <div className="container">
      <ToastContainer />
      <div className="card">
        <div className='wrapper'>
          <div className="date-picker date-seleted">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">From:</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date: Date | null) => date && setFromDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">To:</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date: Date | null) => date && setToDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-indigo-200"
                />
              </div>
            </div>
            <button
              onClick={() => fetchData(fromDate?.getTime() || 0, toDate?.getTime() || 0)}
              className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
          <div className='map-wrapper'>
            {routeData.length > 0 ? (
              <div className="map">
                <MapContainer
                  center={[currentPosition.latitude, currentPosition.longitude]}
                  zoom={15}
                  style={{ height: '300px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  <Marker position={[currentPosition.latitude, currentPosition.longitude]} icon={getRotatingCarIcon(currentBearing)}>
                    <Popup>Car Position</Popup>
                  </Marker>
                  <Polyline positions={routeData.map((point) => [point.latitude, point.longitude])} />
                  {routeData.map((point, index) => (
                    <Circle key={index} center={[point.latitude, point.longitude]} radius={5} color="red" />
                  ))}
                </MapContainer>
              </div>
            ) : (
              <MapLoader />
            )}


            <div className="info">
              <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full ">
                <div className="flex gap-3 mb-4 justify-center">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${isMoving ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                      }`}
                    onClick={startMoving}
                    disabled={isMoving}
                  >
                    <FaPlay className="text-white" /> Start
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${!isMoving ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                      }`}
                    onClick={stopMoving}
                    disabled={!isMoving}
                  >
                    <FaStop className="text-white" /> Stop
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
                    onClick={increaseSpeed}
                  >
                    <FaTachometerAlt className="text-white" /> Speed: {speed}x
                  </button>
                </div>
                <div className="flex gap-3 mb-4 text-sm justify-center">
                  <p><strong>Date & Time:</strong> {currentPosition?.receivedtime || 'N/A'}</p>
                  <p><strong>Latitude:</strong> {currentPosition?.latitude || 'N/A'}</p>
                  <p><strong>Longitude:</strong> {currentPosition?.longitude || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarTrackingUI;

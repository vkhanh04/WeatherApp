// ==================== CONFIGURATION ====================
        const CONFIG = {
            API_KEY: 'bd9c3a0b1476e99d3187e06003562b1e', // Replace with your OpenWeatherMap API key
            BASE_URL: 'https://api.openweathermap.org/data/2.5',
            UNITS: 'metric',
            LANG: 'vi'
        };

        // ==================== WEATHER DATA (Demo) ====================
        const DEMO_DATA = {
            current: {
                location: 'Hà Nội, Việt Nam',
                temp: 28,
                feelsLike: 30,
                humidity: 65,
                windSpeed: 12,
                windDirection: 'Đông Nam',
                pressure: 1013,
                uvIndex: 6,
                rainChance: 20,
                condition: 'Trời nắng',
                icon: '☀️',
                weatherCode: 800
            },
            hourly: [
                { time: 'Bây giờ', temp: 28, icon: '☀️', rain: 5 },
                { time: '15:00', temp: 29, icon: '🌤️', rain: 10 },
                { time: '16:00', temp: 28, icon: '⛅', rain: 15 },
                { time: '17:00', temp: 27, icon: '🌥️', rain: 25 },
                { time: '18:00', temp: 26, icon: '🌧️', rain: 40 },
                { time: '19:00', temp: 25, icon: '🌧️', rain: 60 },
                { time: '20:00', temp: 24, icon: '🌧️', rain: 55 },
                { time: '21:00', temp: 24, icon: '🌙', rain: 30 },
                { time: '22:00', temp: 23, icon: '🌙', rain: 20 },
                { time: '23:00', temp: 23, icon: '🌙', rain: 15 },
                { time: '00:00', temp: 22, icon: '🌙', rain: 10 },
                { time: '01:00', temp: 22, icon: '🌙', rain: 5 }
            ],
            weekly: [
                { day: 'Hôm nay', date: '15/01', icon: '☀️', condition: 'Nắng', high: 30, low: 22, rain: 20 },
                { day: 'Thứ Ba', date: '16/01', icon: '🌤️', condition: 'Nắng nhẹ', high: 29, low: 21, rain: 15 },
                { day: 'Thứ Tư', date: '17/01', icon: '⛅', condition: 'Có mây', high: 28, low: 20, rain: 30 },
                { day: 'Thứ Năm', date: '18/01', icon: '🌧️', condition: 'Mưa rào', high: 26, low: 19, rain: 70 },
                { day: 'Thứ Sáu', date: '19/01', icon: '⛈️', condition: 'Giông bão', high: 24, low: 18, rain: 90 },
                { day: 'Thứ Bảy', date: '20/01', icon: '🌧️', condition: 'Mưa', high: 25, low: 19, rain: 60 },
                { day: 'Chủ Nhật', date: '21/01', icon: '🌤️', condition: 'Nắng nhẹ', high: 27, low: 20, rain: 25 }
            ],
            alerts: [
                {
                    type: 'danger',
                    icon: '⛈️',
                    title: 'Cảnh báo bão cấp 3',
                    text: 'Bão số 5 đang tiến vào vùng biển miền Trung, dự kiến đổ bộ vào ngày 19/01',
                    time: '2 giờ trước'
                },
                {
                    type: 'warning',
                    icon: '🌧️',
                    title: 'Mưa lớn kéo dài',
                    text: 'Dự báo mưa to đến rất to từ ngày 18-20/01 tại các tỉnh Nghệ An đến Quảng Bình',
                    time: '5 giờ trước'
                },
                {
                    type: 'info',
                    icon: '🌡️',
                    title: 'Nhiệt độ giảm sâu',
                    text: 'Đợt không khí lạnh tăng cường sẽ ảnh hưởng đến miền Bắc từ đêm 17/01',
                    time: '8 giờ trước'
                }
            ]
        };

        // ==================== WEATHER ICONS MAPPING ====================
        const WEATHER_ICONS = {
            '01d': '☀️', '01n': '🌙',
            '02d': '🌤️', '02n': '☁️',
            '03d': '⛅', '03n': '☁️',
            '04d': '🌥️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };

        // ==================== DOM ELEMENTS ====================
        const elements = {
            searchInput: document.getElementById('searchInput'),
            searchBtn: document.getElementById('searchBtn'),
            locationBtn: document.getElementById('locationBtn'),
            loading: document.getElementById('loading'),
            toastContainer: document.getElementById('toastContainer'),
            alertBanner: document.getElementById('alertBanner'),
            alertClose: document.getElementById('alertClose'),
            alertText: document.getElementById('alertText'),
            locationName: document.getElementById('locationName'),
            dateTime: document.getElementById('dateTime'),
            weatherIcon: document.getElementById('weatherIcon'),
            temperature: document.getElementById('temperature'),
            weatherCondition: document.getElementById('weatherCondition'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            windDirection: document.getElementById('windDirection'),
            pressure: document.getElementById('pressure'),
            uvIndex: document.getElementById('uvIndex'),
            rainChance: document.getElementById('rainChance'),
            hourlyScroll: document.getElementById('hourlyScroll'),
            weeklyForecast: document.getElementById('weeklyForecast'),
            alertsList: document.getElementById('alertsList'),
            rainContainer: document.getElementById('rainContainer'),
            sun: document.getElementById('sun'),
            moon: document.getElementById('moon')
        };

        // ==================== UTILITY FUNCTIONS ====================
        function showLoading() {
            elements.loading.classList.add('active');
        }

        function hideLoading() {
            elements.loading.classList.remove('active');
        }

        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            `;
            elements.toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }

        function formatDate(date) {
            const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            
            return `${days[date.getDay()]}, ${date.getDate()} tháng ${months[date.getMonth()]}, ${date.getFullYear()} | ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }

        function getTempClass(temp) {
            if (temp < 10) return 'temp-cold';
            if (temp < 18) return 'temp-cool';
            if (temp < 25) return 'temp-mild';
            if (temp < 32) return 'temp-warm';
            if (temp < 38) return 'temp-hot';
            return 'temp-extreme';
        }

        function getWindDirection(degrees) {
            const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
            return directions[Math.round(degrees / 45) % 8];
        }

        function getUVLevel(uv) {
            if (uv <= 2) return 'Thấp';
            if (uv <= 5) return 'Trung bình';
            if (uv <= 7) return 'Cao';
            if (uv <= 10) return 'Rất cao';
            return 'Cực kỳ cao';
        }

        // ==================== BACKGROUND ANIMATIONS ====================
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                starsContainer.appendChild(star);
            }
        }

        function createBubbles() {
            const bubblesContainer = document.getElementById('bubbles');
            for (let i = 0; i < 15; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.left = Math.random() * 100 + '%';
                bubble.style.width = Math.random() * 20 + 10 + 'px';
                bubble.style.height = bubble.style.width;
                bubble.style.animationDelay = Math.random() * 5 + 's';
                bubble.style.animationDuration = Math.random() * 5 + 5 + 's';
                bubblesContainer.appendChild(bubble);
            }
        }

        function createRaindrops() {
            const container = elements.rainContainer;
            container.innerHTML = '';
            for (let i = 0; i < 100; i++) {
                const drop = document.createElement('div');
                drop.className = 'raindrop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
                drop.style.animationDelay = Math.random() * 2 + 's';
                drop.style.height = Math.random() * 20 + 10 + 'px';
                container.appendChild(drop);
            }
        }

        function updateBackgroundForWeather(weatherCode) {
            const hour = new Date().getHours();
            const isNight = hour < 6 || hour > 18;

            // Show/hide sun and moon
            elements.sun.style.display = isNight ? 'none' : 'block';
            elements.moon.style.display = isNight ? 'block' : 'none';

            // Rain animation for rainy weather
            if (weatherCode >= 200 && weatherCode < 700) {
                elements.rainContainer.classList.add('active');
                createRaindrops();
            } else {
                elements.rainContainer.classList.remove('active');
            }

            // Update body background based on weather and time
            if (isNight) {
                document.body.style.background = 'linear-gradient(180deg, #0d1b2a 0%, #1b263b 30%, #415a77 60%, #778da9 100%)';
            } else if (weatherCode >= 200 && weatherCode < 300) {
                // Thunderstorm
                document.body.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #2d3436 30%, #636e72 60%, #b2bec3 100%)';
            } else if (weatherCode >= 300 && weatherCode < 600) {
                // Rain
                document.body.style.background = 'linear-gradient(180deg, #2c3e50 0%, #3498db 50%, #1abc9c 100%)';
            } else if (weatherCode >= 600 && weatherCode < 700) {
                // Snow
                document.body.style.background = 'linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #636e72 100%)';
            } else {
                // Clear/Cloudy
                document.body.style.background = 'var(--sky-gradient)';
            }
        }

        // ==================== RENDER FUNCTIONS ====================
        function renderCurrentWeather(data) {
            elements.locationName.textContent = data.location;
            elements.dateTime.textContent = formatDate(new Date());
            elements.weatherIcon.textContent = data.icon;
            elements.temperature.textContent = `${Math.round(data.temp)}°`;
            elements.weatherCondition.textContent = data.condition;
            elements.feelsLike.textContent = `${Math.round(data.feelsLike)}°C`;
            elements.humidity.textContent = `${data.humidity}%`;
            elements.windSpeed.textContent = `${data.windSpeed} km/h`;
            elements.windDirection.textContent = data.windDirection;
            elements.pressure.textContent = `${data.pressure} hPa`;
            elements.uvIndex.textContent = `${data.uvIndex} (${getUVLevel(data.uvIndex)})`;
            elements.rainChance.textContent = `${data.rainChance}%`;

            // Update background based on weather
            updateBackgroundForWeather(data.weatherCode);

            // Animate the main card
            const mainWeather = document.getElementById('mainWeather');
            mainWeather.style.animation = 'none';
            mainWeather.offsetHeight; // Trigger reflow
            mainWeather.style.animation = 'fadeInUp 0.5s ease-out';
        }

        function renderHourlyForecast(data) {
            elements.hourlyScroll.innerHTML = data.map((hour, index) => `
                <div class="hour-card ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <div class="hour-time">${hour.time}</div>
                    <div class="hour-icon">${hour.icon}</div>
                    <div class="hour-temp ${getTempClass(hour.temp)}">${hour.temp}°</div>
                    <div class="hour-rain">
                        <i class="fas fa-tint"></i>
                        ${hour.rain}%
                    </div>
                </div>
            `).join('');

            // Add click event to hourly cards
            document.querySelectorAll('.hour-card').forEach(card => {
                card.addEventListener('click', function() {
                    document.querySelectorAll('.hour-card').forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        function renderWeeklyForecast(data) {
            elements.weeklyForecast.innerHTML = data.map((day, index) => {
                const tempRange = 40; // Max temp range
                const barWidth = ((day.high - day.low) / tempRange) * 100;
                const barOffset = ((day.low + 10) / tempRange) * 100; // Offset from min temp (-10)

                return `
                    <div class="day-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both">
                        <div class="day-name">${day.day}</div>
                        <div class="day-date">${day.date}</div>
                        <div class="day-icon">${day.icon}</div>
                        <div class="day-condition">${day.condition}</div>
                        <div class="day-temps">
                            <span class="temp-high ${getTempClass(day.high)}">${day.high}°</span>
                            <div class="temp-bar">
                                <div class="temp-bar-fill" style="width: ${barWidth}%; margin-left: ${barOffset}%"></div>
                            </div>
                            <span class="temp-low">${day.low}°</span>
                        </div>
                        <div class="day-rain-chance">
                            <i class="fas fa-tint"></i>
                            ${day.rain}%
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderAlerts(data) {
            if (data.length === 0) {
                elements.alertsList.innerHTML = `
                    <div class="alert-card info">
                        <div class="alert-card-icon">✅</div>
                        <div class="alert-card-content">
                            <div class="alert-card-title">Không có cảnh báo</div>
                            <div class="alert-card-text">Thời tiết ổn định, không có cảnh báo đặc biệt.</div>
                        </div>
                    </div>
                `;
                return;
            }

            elements.alertsList.innerHTML = data.map((alert, index) => `
                <div class="alert-card ${alert.type}" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both">
                    <div class="alert-card-icon">${alert.icon}</div>
                    <div class="alert-card-content">
                        <div class="alert-card-title">${alert.title}</div>
                        <div class="alert-card-text">${alert.text}</div>
                    </div>
                    <div class="alert-card-time">${alert.time}</div>
                </div>
            `).join('');

            // Update main alert banner
            if (data.some(a => a.type === 'danger')) {
                const dangerAlert = data.find(a => a.type === 'danger');
                elements.alertText.textContent = dangerAlert.text;
                elements.alertBanner.classList.remove('hidden');
            }
        }

        // ==================== API FUNCTIONS ====================
        async function fetchWeatherData(city) {
            showLoading();

            // Simulate API call with demo data
            // In production, replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Demo: Update data based on city name
            const updatedData = { ...DEMO_DATA };
            
            // Update location name
            if (city) {
                updatedData.current.location = city;
            }

            hideLoading();
            return updatedData;
        }

        async function fetchWeatherByCoords(lat, lon) {
            showLoading();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In production, use actual coordinates
            const updatedData = { ...DEMO_DATA };
            updatedData.current.location = 'Vị trí của bạn';

            hideLoading();
            return updatedData;
        }

        async function fetchRealWeatherData(city) {
            try {
                showLoading();
                
                // Current weather
                const currentRes = await fetch(
                    `${CONFIG.BASE_URL}/weather?q=${city}&units=${CONFIG.UNITS}&lang=${CONFIG.LANG}&appid=${CONFIG.API_KEY}`
                );
                const currentData = await currentRes.json();
                
                if (currentData.cod !== 200) {
                    throw new Error(currentData.message);
                }

                // Forecast
                const forecastRes = await fetch(
                    `${CONFIG.BASE_URL}/forecast?q=${city}&units=${CONFIG.UNITS}&lang=${CONFIG.LANG}&appid=${CONFIG.API_KEY}`
                );
                const forecastData = await forecastRes.json();

                hideLoading();
                return processAPIData(currentData, forecastData);
            } catch (error) {
                hideLoading();
                showToast(`Lỗi: ${error.message}`, 'error');
                throw error;
            }
        }

        function processAPIData(current, forecast) {
            return {
                current: {
                    location: `${current.name}, ${current.sys.country}`,
                    temp: current.main.temp,
                    feelsLike: current.main.feels_like,
                    humidity: current.main.humidity,
                    windSpeed: Math.round(current.wind.speed * 3.6),
                    windDirection: getWindDirection(current.wind.deg),
                    pressure: current.main.pressure,
                    uvIndex: 5, // UV needs separate API call
                    rainChance: current.clouds.all,
                    condition: current.weather[0].description,
                    icon: WEATHER_ICONS[current.weather[0].icon] || '🌤️',
                    weatherCode: current.weather[0].id
                },
                hourly: forecast.list.slice(0, 12).map(item => ({
                    time: new Date(item.dt * 1000).getHours() + ':00',
                    temp: Math.round(item.main.temp),
                    icon: WEATHER_ICONS[item.weather[0].icon] || '🌤️',
                    rain: Math.round(item.pop * 100)
                })),
                weekly: processWeeklyForecast(forecast.list),
                alerts: [] // OpenWeather doesn't include alerts in basic API
            };
        }

        // ==================== MAIN FUNCTIONS ====================
        async function searchWeather(city) {
            if (!city.trim()) {
                showToast('Vui lòng nhập tên thành phố', 'error');
                return;
            }

            try {
                const data = await fetchWeatherData(city);
                renderCurrentWeather(data.current);
                renderHourlyForecast(data.hourly);
                renderWeeklyForecast(data.weekly);
                renderAlerts(data.alerts);
                showToast(`Đã cập nhật thời tiết cho ${city}`, 'success');
            } catch (error) {
                showToast('Không thể tìm thấy thành phố', 'error');
            }
        }

        async function getLocationWeather() {
            if (!navigator.geolocation) {
                showToast('Trình duyệt không hỗ trợ định vị', 'error');
                return;
            }

            showLoading();
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    renderCurrentWeather(data.current);
                    renderHourlyForecast(data.hourly);
                    renderWeeklyForecast(data.weekly);
                    renderAlerts(data.alerts);
                    showToast('Đã lấy thời tiết theo vị trí của bạn', 'success');
                },
                (error) => {
                    hideLoading();
                    showToast('Không thể lấy vị trí của bạn', 'error');
                },
                { timeout: 10000 }
            );
        }

        function updateDateTime() {
            elements.dateTime.textContent = formatDate(new Date());
        }

        // ==================== EVENT LISTENERS ====================
        elements.searchBtn.addEventListener('click', () => {
            searchWeather(elements.searchInput.value);
        });

        elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather(elements.searchInput.value);
            }
        });

        elements.locationBtn.addEventListener('click', getLocationWeather);

        elements.alertClose.addEventListener('click', () => {
            elements.alertBanner.style.animation = 'fadeInUp 0.3s ease-out reverse';
            setTimeout(() => {
                elements.alertBanner.classList.add('hidden');
            }, 300);
        });

        // Map buttons
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                showToast(`Đã chuyển sang chế độ: ${this.textContent}`, 'info');
            });
        });

        // ==================== INITIALIZATION ====================
        function init() {
            // Create background animations
            createStars();
            createBubbles();

            // Load demo data
            renderCurrentWeather(DEMO_DATA.current);
            renderHourlyForecast(DEMO_DATA.hourly);
            renderWeeklyForecast(DEMO_DATA.weekly);
            renderAlerts(DEMO_DATA.alerts);

            // Update time every minute
            setInterval(updateDateTime, 60000);

            // Show welcome toast
            setTimeout(() => {
                showToast('Chào mừng đến với Sky & Ocean Weather! 🌊', 'success');
            }, 1000);
        }

        // Start the app
        document.addEventListener('DOMContentLoaded', init);
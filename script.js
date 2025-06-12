class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.shortBreakTime = 5 * 60; // 5分
        this.longBreakTime = 15 * 60; // 15分
        this.currentTime = this.workTime;
        this.isRunning = false;
        
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.workBtn = document.getElementById('workBtn');
        this.shortBreakBtn = document.getElementById('shortBreakBtn');
        this.longBreakBtn = document.getElementById('longBreakBtn');
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        
        this.workBtn.addEventListener('click', () => this.setMode('work'));
        this.shortBreakBtn.addEventListener('click', () => this.setMode('shortBreak'));
        this.longBreakBtn.addEventListener('click', () => this.setMode('longBreak'));
    }

    toggleTimer() {
        this.isRunning = !this.isRunning;
        this.startBtn.textContent = this.isRunning ? '停止' : '開始';
        
        if (this.isRunning) {
            this.startCountdown();
        }
    }

    startCountdown() {
        const interval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(interval);
                return;
            }
            
            if (this.currentTime > 0) {
                this.currentTime--;
                this.updateDisplay();
            } else {
                clearInterval(interval);
                this.isRunning = false;
                this.startBtn.textContent = '開始';
                this.playAlarm();
            }
        }, 1000);
    }

    resetTimer() {
        this.isRunning = false;
        this.startBtn.textContent = '開始';
        this.currentTime = this.getCurrentModeTime();
        this.updateDisplay();
    }

    setMode(mode) {
        this.workBtn.classList.remove('active');
        this.shortBreakBtn.classList.remove('active');
        this.longBreakBtn.classList.remove('active');
        
        switch(mode) {
            case 'work':
                this.currentTime = this.workTime;
                this.workBtn.classList.add('active');
                break;
            case 'shortBreak':
                this.currentTime = this.shortBreakTime;
                this.shortBreakBtn.classList.add('active');
                break;
            case 'longBreak':
                this.currentTime = this.longBreakTime;
                this.longBreakBtn.classList.add('active');
                break;
        }
        this.resetTimer();
    }

    getCurrentModeTime() {
        if (this.workBtn.classList.contains('active')) return this.workTime;
        if (this.shortBreakBtn.classList.contains('active')) return this.shortBreakTime;
        if (this.longBreakBtn.classList.contains('active')) return this.longBreakTime;
        return this.workTime;
    }

    updateDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        this.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    playAlarm() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.play();
    }
}

// インスタンスを作成
const pomodoro = new PomodoroTimer();
